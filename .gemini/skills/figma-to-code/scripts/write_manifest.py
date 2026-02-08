#!/usr/bin/env python3
"""
Simple manifest writer - flat JSON structure.

Usage:
    python write_manifest.py <manifest_path> <key> <value>

Example:
    python write_manifest.py /work/123/manifest.json preview_url https://...
    python write_manifest.py /work/123/manifest.json deployed_url https://...
    python write_manifest.py /work/123/manifest.json step "Build Components"
"""
import json
import sys
import os
from datetime import datetime, timezone


def main():
    if len(sys.argv) < 4:
        print("Usage: python write_manifest.py <path> <key> <value>", file=sys.stderr)
        sys.exit(1)

    manifest_path = sys.argv[1]
    key = sys.argv[2]
    value = sys.argv[3]

    # Load or create manifest
    try:
        with open(manifest_path) as f:
            manifest = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        manifest = {}

    # Handle special keys
    if key == "step":
        steps = manifest.get("completed_steps", [])
        if value not in steps:
            steps.append(value)
        manifest["completed_steps"] = steps
    else:
        manifest[key] = value

    manifest["updated_at"] = datetime.now(timezone.utc).isoformat()

    os.makedirs(os.path.dirname(manifest_path), exist_ok=True)
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"SUCCESS:{manifest_path}")


if __name__ == "__main__":
    main()
