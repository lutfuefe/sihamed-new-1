#!/bin/sh
set -e
# Bind mount genelde root sahipli gelir; nextjs (UID 1001) yazabilsin diye düzelt
UPLOAD_DIR="/app/public/images/haberler/yuklenen"
mkdir -p "$UPLOAD_DIR"
chown -R nextjs:nodejs "$UPLOAD_DIR"
exec su-exec nextjs:nodejs "$@"
