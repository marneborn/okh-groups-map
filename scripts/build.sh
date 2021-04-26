#!/usr/bin/env bash
set -e;

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null 2>&1 && pwd )"

rm -rf dist

mkdir -p dist/okh-map
node -r ts-node/register --eval "console.log(require('$ROOT_DIR/app/okh-map/index.ts').default)" >> dist/okh-map/index.js
cp "$ROOT_DIR/app/okh-map/index.css" dist/okh-map/index.css
cp "$ROOT_DIR/app/okh-map/partial.html" dist/okh-map/partial.html