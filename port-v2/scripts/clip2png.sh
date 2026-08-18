#!/usr/bin/env bash
# Write the current clipboard image to a PNG. Exits 3 if the clipboard has no image.
OUT="${1:-/tmp/clipboard-image.png}"
rm -f "$OUT"
osascript <<EOF 2>/dev/null
try
    set imgData to (the clipboard as «class PNGf»)
on error
    return "NOIMAGE"
end try
set f to open for access POSIX file "$OUT" with write permission
set eof f to 0
write imgData to f
close access f
return "OK"
EOF
