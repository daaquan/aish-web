#!/usr/bin/env sh
# SPDX-License-Identifier: AGPL-3.0-only
#
# aish installer — downloads the latest release binary from GitHub.
#
#   curl -fsSL https://openaish.com/install.sh | bash
#
# Environment overrides:
#   AISH_VERSION    pin a release tag (default: latest)   e.g. AISH_VERSION=v0.1.0
#   AISH_INSTALL_DIR  target bin dir (default: /usr/local/bin or ~/.local/bin)
#
set -eu

REPO="daaquan/aish"
BIN="aish"

err() { printf 'aish-install: %s\n' "$1" >&2; exit 1; }
info() { printf '\033[32m==>\033[0m %s\n' "$1"; }

# --- Detect platform ---------------------------------------------------------
# Asset names use the RAW `uname` output: aish-$(uname -s)-$(uname -m).
# OS:   Linux | Darwin
# Arch: x86_64 | aarch64 (Linux) · x86_64 | arm64 (macOS — arm64, NOT aarch64).
os="$(uname -s)"
arch="$(uname -m)"

case "$os" in
  Linux | Darwin) ;;
  *) err "unsupported OS '$os' — build from source: https://github.com/$REPO" ;;
esac

case "$arch" in
  amd64) arch="x86_64" ;;       # normalize the odd reporter; keep arm64/aarch64 as-is
  x86_64 | aarch64 | arm64) ;;
  *) err "unsupported architecture '$arch' — build from source: https://github.com/$REPO" ;;
esac

asset="${BIN}-${os}-${arch}"

# --- Resolve download URL ----------------------------------------------------
version="${AISH_VERSION:-latest}"
if [ "$version" = "latest" ]; then
  url="https://github.com/$REPO/releases/latest/download/$asset"
else
  url="https://github.com/$REPO/releases/download/$version/$asset"
fi

# --- Pick a downloader -------------------------------------------------------
if command -v curl >/dev/null 2>&1; then
  fetch() { curl -fsSL "$1" -o "$2"; }
elif command -v wget >/dev/null 2>&1; then
  fetch() { wget -qO "$2" "$1"; }
else
  err "need curl or wget to download"
fi

# --- Choose install dir ------------------------------------------------------
if [ -n "${AISH_INSTALL_DIR:-}" ]; then
  dir="$AISH_INSTALL_DIR"
elif [ -w /usr/local/bin ] 2>/dev/null; then
  dir="/usr/local/bin"
else
  dir="$HOME/.local/bin"
fi
mkdir -p "$dir" || err "cannot create install dir '$dir'"

# --- Download to temp, then atomically move ----------------------------------
tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT INT TERM

info "downloading $asset ($version)"
if ! fetch "$url" "$tmp"; then
  err "download failed: $url
no prebuilt binary for ${arch}-${os}? build from source: https://github.com/$REPO"
fi

# Reject HTML/empty payloads (e.g. 404 page slipping through).
if [ ! -s "$tmp" ]; then
  err "downloaded file is empty — release asset '$asset' may not exist for $version"
fi

chmod +x "$tmp"
mv -f "$tmp" "$dir/$BIN"
trap - EXIT INT TERM

info "installed $BIN -> $dir/$BIN"

# --- PATH hint ---------------------------------------------------------------
case ":$PATH:" in
  *":$dir:"*) ;;
  *) printf '\033[33m==>\033[0m %s is not on your PATH. Add it:\n    export PATH="%s:$PATH"\n' "$dir" "$dir" ;;
esac

info "run '$BIN --version' to verify, then '$BIN config init' to get started"
