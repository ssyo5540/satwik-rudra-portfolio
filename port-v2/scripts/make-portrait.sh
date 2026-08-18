#!/usr/bin/env bash
# Turn a headshot into the hero portrait: public/assets/portrait.png
#
#   ./scripts/make-portrait.sh ~/Desktop/headshot.jpg
#
# Removes the background with the macOS Vision framework, falling back to a
# flat-background key, then frames the subject on a transparent 1200x1600
# canvas bottom-anchored the way the hero renders it.
set -euo pipefail

SRC="${1:-}"
if [[ -z "$SRC" || ! -f "$SRC" ]]; then
  echo "usage: $0 <path-to-headshot>" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/assets/portrait.png"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$(dirname "$OUT")"

# Build the Vision helper on first run.
if [[ ! -x "$ROOT/scripts/cutout" ]]; then
  echo "building cutout tool..."
  swiftc -O -o "$ROOT/scripts/cutout" "$ROOT/scripts/cutout.swift"
fi

echo "removing background..."
if "$ROOT/scripts/cutout" "$SRC" "$TMP/cut.png"; then
  STAGE="$TMP/cut.png"
else
  echo "Vision found no subject - falling back to flat-background key"
  STAGE="$SRC"
fi

echo "framing..."
python3 "$ROOT/scripts/frame_portrait.py" "$STAGE" "$OUT"
echo "done -> $OUT"
