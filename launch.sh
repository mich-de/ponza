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
    echo "→ Build produzione (export statico per GitHub Pages)..."
    BASE_PATH=/ponza npm run build
    echo "✓ Build completata in out/"
    ;;
  dev)
    echo "→ Avvio server dev su http://localhost:3000"
    npm run dev
    ;;
  preview)
    echo "→ Build + preview locale su http://localhost:3000"
    BASE_PATH=/ponza npm run build
    npx serve@latest out -l 3000 --no-clipboard
    ;;
  *)
    echo "Uso: $0 [dev|build|preview]"
    exit 1
    ;;
esac
