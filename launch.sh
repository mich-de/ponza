#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

if [ ! -d node_modules ]; then
  echo "→ node_modules non trovato. Installo dipendenze..."
  npm ci
fi

case "${1:-dev}" in
  build)
    echo "→ Build in corso..."
    npm run build
    echo "✓ Build completata."
    ;;
  dev)
    echo "→ Build statica + preview su http://localhost:3000/ponza"
    npm run build
    echo "→ Avvio server locale..."
    npx serve@latest out -l 3000 --no-clipboard
    ;;
  *)
    echo "Uso: $0 [dev|build]"
    exit 1
    ;;
esac
