---
name: meeting-intelligence
description: Transcribes and analyzes meeting recordings, calls, and interviews. Use when user uploads audio/video files or asks to transcribe, analyze, or extract insights from meetings.
---

# Meeting Intelligence Pipeline

## Tools

| Tool | Function |
|------|----------|
| `Bash` | Run cache check/write scripts |
| `mcp__audio_processing__extract_audio` | Video to audio |
| `mcp__audio_processing__chunk_audio` | Split audio >20min |
| `mcp__google_stt__transcribe_audio` | Audio to transcript (returns GCS URI) |
| `mcp__gemini_large_file__analyze_multiple_files` | Analyze transcripts |

## Workflow

### 0. Check Manifest & Log Progress (MANDATORY FIRST STEP)

Read `{project_root}/manifest.json` if it exists. It shows completed steps and cached URIs from prior runs. Resume from where you left off.

**Manifest structure (flat JSON):**
```json
{
  "video_uri": "gs://...",
  "audio_uri": "gs://...",
  "language": "hi-IN",
  "language_detected": true,
  "transcript_uris": ["gs://...chunk_0.json", "gs://...chunk_1.json"],
  "transcript_html_url": "https://storage.googleapis.com/...",
  "analysis_uri": "gs://...",
  "analysis_json": {"summary": "...", "action_items": [...], ...},
  "completed_steps": ["Step 1: Language Detection", "Step 4: Transcription", ...],
  "updated_at": "2026-01-31T..."
}
```

**Cache logic:**
- If `manifest.video_uri` matches input AND `transcript_uris` exists → **skip to step 5** (use cached transcripts)
- Otherwise → start from step 1

**Log your progress** after completing each step:
```bash
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json video_uri "gs://..."
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json step "Step 4: Transcription"
```

This prevents re-running $0.50+ / 20+ minute transcription on follow-up requests.

### 1. Detect Language (if not provided)

If language is provided (e.g., "en-US", "ta-IN"), skip to step 2.

If language is empty, "auto", or "detect":

**Step 1a: Extract short audio sample**
```
mcp__audio_processing__extract_audio(gcs_uri, output_format="flac", duration_limit=90)
→ {audio_uri, duration_seconds}
```

**Step 1b: Detect language via Gemini**
```
mcp__gemini_large_file__analyze_large_file(
  gcs_uri=sample_audio_uri,
  prompt="Listen to this audio and identify the primary language spoken. Return ONLY the BCP-47 language code (e.g., en-US, ta-IN, es-ES, fr-FR, de-DE, ja-JP, cmn-Hans-CN). If multiple languages, return the dominant one. Response format: just the code, nothing else."
)
→ detected language code (e.g., "ta-IN")
```

**Language code reference:** See [LANGUAGE_CODES.md](LANGUAGE_CODES.md) for valid BCP-47 codes.

Store detected language in manifest:
```bash
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json language {detected_code}
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json language_detected true
```

### 2. Extract Audio (if video)

```
mcp__audio_processing__extract_audio(gcs_uri, output_format="flac")
→ {audio_uri, duration_seconds}
```

### 3. Chunk (if duration > 1200s)

```
mcp__audio_processing__chunk_audio(audio_uri, chunk_minutes=19, overlap_seconds=30)
→ {chunks: [{uri, index, start_seconds, duration_seconds}, ...]}
```

### 4. Transcribe

For each chunk (can run in parallel):

```
mcp__google_stt__transcribe_audio(gcs_uri, language, encoding="FLAC", sample_rate=16000)
→ {transcript_uri, word_count}
```

Collect all `transcript_uri` values for step 5.

### 5. Persist Cache (MANDATORY AFTER TRANSCRIPTION)

Write manifest entries incrementally:

```bash
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json video_uri {video_uri}
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json audio_uri {audio_uri}
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json language {language}
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json duration_seconds {duration}
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json total_words {word_count}
# For each transcript chunk:
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json transcript_uri {uri}
```


If language was auto-detected:
```bash
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json language_detected true
```

### 5.5. Merge Transcript Chunks (if multiple chunks)

If transcription produced multiple chunks, merge them into a single file with corrected timestamps:

```bash
python {skill_dir}/scripts/merge_stt_transcripts.py {project_root}/manifest.json {task_id}/transcript_merged.json
```

Output: `gs_uri=gs://metaphi-ai/{task_id}/transcript_merged.json`

Update manifest with merged URI:
```bash
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json merged_transcript_uri {gs_uri}
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json step "Step 5.5: Transcripts Merged"
```

### 6. Generate HTML Transcript

Convert merged transcript JSON to branded HTML and upload to public bucket:

```bash
python {skill_dir}/scripts/json_to_html.py {project_root}/manifest.json {task_id} --title "Meeting Title"
```

Output: `html_url=https://storage.googleapis.com/metaphi-agent/{task_id}/transcript.html`

Update manifest:
```bash
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json transcript_html_url {html_url}
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json step "Step 6: HTML Transcript Generated"
```

**Note:** For single-chunk transcripts (no merging), the script reads directly from `transcript_uris[0]`.

### 7. Translate with Gemini (if non-English)

For non-English transcripts, generate full English translation (saved to GCS):

```
mcp__gemini_large_file__analyze_multiple_files(
  gcs_uris=[transcript_uri_1, transcript_uri_2, ...],
  prompt="Translate this transcript to English. Preserve all content, speaker turns, and timestamps. Output the complete translated transcript.",
  output_gcs_uri="gs://metaphi-ai/{task_id}/translation.txt"
)
→ {output_uri, summary, char_count, word_count}
```

### 8. Analyze with Gemini

```
mcp__gemini_large_file__analyze_multiple_files(
  gcs_uris=[transcript_uri_1, transcript_uri_2, ...],
  prompt="Analyze this meeting transcript and provide:
    - Executive summary (2-3 paragraphs)
    - Key discussion points with context
    - Action items with owners and deadlines
    - Decisions made
    - Important quotes with timestamps",
  output_gcs_uri="gs://metaphi-ai/{task_id}/analysis.txt"
)
→ {output_uri, summary, char_count, word_count}
```

### 9. Update Manifest with Outputs

```bash
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json translation_uri {translation_output_uri}
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json analysis_uri {analysis_output_uri}
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json step "Step 9: Analysis Complete"
```

### 10. Create Structured Analysis JSON (MANDATORY - DO NOT SKIP)

Read the Gemini analysis output from step 8 and create a structured JSON object for the database.

**Required structure:**
```json
{
  "summary": "2-3 paragraph executive summary of the meeting",
  "action_items": [
    {"owner": "Person Name", "task": "Task description", "deadline": "Date or null"}
  ],
  "key_decisions": ["Decision 1", "Decision 2"],
  "topics": ["Topic 1", "Topic 2"],
  "participants": ["Name 1", "Name 2"]
}
```

**Write to LOCAL manifest (REQUIRED):**
```bash
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json analysis_json '{"summary": "...", "action_items": [...], "key_decisions": [...], "topics": [...], "participants": [...]}'
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json step "Step 10: Structured Analysis Created"
```

**CRITICAL:**
- This step populates the database `analysis` column - DO NOT SKIP
- Write to `{project_root}/manifest.json` (local file), NOT to GCS
- Extract participants from transcript speaker turns
- Action items should have clear owners when mentioned
- The JSON must be valid - escape quotes properly

### 11. Score Against Rubric (IF RUBRIC PROVIDED)

**Skip this step if no formalized_rubric is provided in your context.**

If a formalized rubric is provided, evaluate the meeting against each dimension in the rubric.

**Scoring process:**

1. For each dimension in the rubric:
   - Read the dimension description, scale points, and evaluation tips
   - Find specific evidence in the transcript (quotes with timestamps)
   - Match evidence to scale point definitions
   - Assign a score (1-5) based on where the evidence fits
   - Be calibrated: reserve 5 for truly excellent, 1 for truly poor

2. Calculate overall score as weighted average of dimension scores

**Write evaluation to file:**
```bash
cat > {project_root}/evaluation.json << 'EOF'
{
  "dimensions": {
    "dimension_id": {
      "score": 4,
      "evidence": ["[12:34] Quote...", "[15:20] Another..."],
      "rationale": "Explanation..."
    }
  },
  "overall": 4.2,
  "rubric_version": "1.0",
  "summary": "Brief summary of scoring..."
}
EOF
```

**Update manifest with overall score:**
```bash
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json overall_score 4.2
python {skill_dir}/scripts/write_manifest.py {project_root}/manifest.json step "Step 11: Rubric Scoring Complete"
```

**Scoring guidelines:**
- Evidence MUST be actual quotes or paraphrases from the transcript
- If no evidence found for a dimension, score it 3 (Average) with note "No clear evidence found"
- Use the weight from each dimension to calculate overall: `overall = sum(score * weight)`
- Include timestamps in evidence when available: `[MM:SS] quote`

## Quality Standards

Analysis should be:
- **Specific**: Names, numbers, dates, commitments
- **Actionable**: Clear next steps with owners
- **Evidence-backed**: Cite quotes with timestamps

## Edge Cases

- **Cache hit but different analysis needed**: Use cached transcript_uris, run new Gemini prompt
- **Single chunk**: Still use `analyze_multiple_files` (works with one file)
- **Gemini fails**: Use `analyze_large_file` on each transcript individually
