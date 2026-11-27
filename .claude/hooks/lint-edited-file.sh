#!/usr/bin/env bash
# PostToolUse (Edit|Write): ESLint on the file just written, with its project's config (selector
# prefixes live there). Exit 2 sends the errors back to Claude, which fixes them in the same turn.
# Files lint does not cover (outside quang and the playground sources, not .ts/.html) pass silently.
cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0
# Claude Code may start without mise in the shell: load the toolchain of mise.toml if node is missing.
if ! command -v node >/dev/null; then
  mise=$(command -v mise || echo "$HOME/.local/bin/mise")
  [ -x "$mise" ] && eval "$("$mise" env -s bash 2>/dev/null)"
fi
command -v node >/dev/null || { echo "lint hook: node not found (install mise, see README)" >&2; exit 0; }
{ read -r file; read -r session; } < <(node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);process.stdout.write(((j.tool_response&&j.tool_response.filePath)||(j.tool_input&&j.tool_input.file_path)||"")+"\n"+(j.session_id||"")+"\n")})')
rel=${file#"$PWD/"}
case "$rel" in
  projects/quang/*.ts | projects/quang/*.html) config=projects/quang/eslint.config.mjs ;;
  projects/playground/src/*.ts | projects/playground/src/*.html) config=projects/playground/eslint.config.mjs ;;
  *) exit 0 ;;
esac
# Tells check-project.sh (Stop) to typecheck and run the architecture spec at the end of the turn.
touch "${TMPDIR:-/tmp}/claude-checks-${session:-none}"
out=$(node_modules/.bin/eslint -c "$config" --no-warn-ignored "$rel" 2>&1) && exit 0
printf 'ESLint found problems in %s (rules in eslint.config.mjs and %s):\n%s\n' "$rel" "$config" "$out" >&2
exit 2
