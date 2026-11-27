#!/usr/bin/env bash
# Stop: once Claude has edited library or playground files in this turn (marker left by
# lint-edited-file.sh), typecheck the library and the playground (ngc, templates included) and the specs
# (tsc), and run projects/quang/architecture.spec.ts. Exit 2 sends the errors back to Claude, which
# fixes them before stopping. Whole-project checks run here and not per edit because a multi-file
# change does not compile half done.
cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0
if ! command -v node >/dev/null; then
  mise=$(command -v mise || echo "$HOME/.local/bin/mise")
  [ -x "$mise" ] && eval "$("$mise" env -s bash 2>/dev/null)"
fi
command -v node >/dev/null || { echo "check hook: node not found (install mise, see README)" >&2; exit 0; }
session=$(node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{process.stdout.write(JSON.parse(s).session_id||"")}catch{}})')
marker="${TMPDIR:-/tmp}/claude-checks-${session:-none}"
[ -f "$marker" ] || exit 0
# Removed whatever the outcome: at most one block per batch of edits, so no stop loop.
rm -f "$marker"

out=$(mktemp -d)
bin=node_modules/.bin
"$bin/ngc" -p projects/quang/tsconfig.lib.json --noEmit >"$out/lib" 2>&1 &
p1=$!
# --rootDir: the playground compiles the library sources through the quang/* paths.
"$bin/ngc" -p projects/playground/tsconfig.app.json --noEmit --rootDir . >"$out/app" 2>&1 &
p2=$!
"$bin/tsc" --noEmit -p projects/quang/tsconfig.spec.json >"$out/spec" 2>&1 &
p3=$!
"$bin/vitest" run --reporter dot projects/quang/architecture.spec.ts >"$out/arch" 2>&1 &
p4=$!

failed=0
report() { # $1 pid, $2 file, $3 title
  wait "$1" && return
  failed=1
  printf '\n== %s ==\n' "$3" >&2
  sed $'s/\x1b\[[0-9;]*m//g' "$out/$2" | head -n 40 >&2
}
report $p1 lib 'Typecheck library + templates (ngc -p projects/quang/tsconfig.lib.json)'
report $p2 app 'Typecheck playground + templates (ngc -p projects/playground/tsconfig.app.json)'
report $p3 spec 'Typecheck specs (tsc -p projects/quang/tsconfig.spec.json)'
report $p4 arch 'projects/quang/architecture.spec.ts (entrypoint boundaries, cycles, declared packages)'
rm -rf "$out"
[ $failed = 0 ] && exit 0
echo 'Fix these problems before finishing.' >&2
exit 2
