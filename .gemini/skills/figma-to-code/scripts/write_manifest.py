#!/usr/bin/env python3
"""
Generic manifest logger for agent workflows.

The agent reads SKILL.md to understand workflow steps, then uses this
generic tool to document progress. This script knows nothing about
workflow structure - it just provides logging primitives.

Usage:
    # Log step progress
    python write_manifest.py <path> step "Extract from Figma" --status=done
    python write_manifest.py <path> step "Build Components" --status=in_progress

    # Record artifacts (key-value)
    python write_manifest.py <path> artifact figma_file_key abc123
    python write_manifest.py <path> artifact preview_url https://...

    # Add context notes
    python write_manifest.py <path> note "Built Header, Footer. Pending: Hero"

Output:
    SUCCESS:<manifest_path>
    ERROR:<error_message>
"""
import argparse
import json
import os
import sys
from datetime import datetime, timezone


def load_manifest(path: str) -> dict:
    """Load existing manifest or return empty structure."""
    try:
        with open(path) as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def save_manifest(path: str, manifest: dict) -> None:
    """Save manifest to file."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump(manifest, f, indent=2)


def main():
    parser = argparse.ArgumentParser(description="Generic manifest logger")
    parser.add_argument("manifest_path", help="Path to manifest.json")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # step - log workflow step progress
    p_step = subparsers.add_parser("step", help="Log step progress")
    p_step.add_argument("name", help="Step name (from SKILL.md)")
    p_step.add_argument("--status", choices=["pending", "in_progress", "done", "failed"], default="done")
    p_step.add_argument("--note", help="Optional note about this step")

    # artifact - record key-value artifact
    p_artifact = subparsers.add_parser("artifact", help="Record an artifact")
    p_artifact.add_argument("key", help="Artifact key (e.g., preview_url, figma_file_key)")
    p_artifact.add_argument("value", help="Artifact value")

    # note - free-form context
    p_note = subparsers.add_parser("note", help="Add a context note")
    p_note.add_argument("text", help="Note text")

    args = parser.parse_args()

    try:
        manifest = load_manifest(args.manifest_path)
        now = datetime.now(timezone.utc).isoformat()

        # Initialize structure
        if "session_id" not in manifest:
            manifest["session_id"] = f"session_{datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')}"
            manifest["created_at"] = now
        if "steps" not in manifest:
            manifest["steps"] = []
        if "artifacts" not in manifest:
            manifest["artifacts"] = {}
        if "notes" not in manifest:
            manifest["notes"] = []

        manifest["updated_at"] = now

        if args.command == "step":
            # Find existing step or create new
            existing = next((s for s in manifest["steps"] if s["name"] == args.name), None)
            if existing:
                existing["status"] = args.status
                existing["updated_at"] = now
                if args.note:
                    existing["note"] = args.note
            else:
                step_entry = {"name": args.name, "status": args.status, "at": now}
                if args.note:
                    step_entry["note"] = args.note
                manifest["steps"].append(step_entry)

        elif args.command == "artifact":
            manifest["artifacts"][args.key] = args.value
            manifest["artifacts"][f"{args.key}_at"] = now

        elif args.command == "note":
            manifest["notes"].append({"text": args.text, "at": now})

        save_manifest(args.manifest_path, manifest)
        print(f"SUCCESS:{args.manifest_path}")

    except Exception as e:
        print(f"ERROR:{str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
