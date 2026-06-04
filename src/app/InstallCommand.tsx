"use client";

import { useState } from "react";

const CMD = "curl -fsSL https://openaish.com/install.sh | bash";

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (insecure context / denied) — the command stays
      // selectable, so the user can copy it manually.
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-md border border-[var(--border-strong)] bg-[var(--panel)] py-3 pl-4 pr-3 font-mono text-[13px] sm:text-sm">
      <span className="select-none text-faint">$</span>
      <code className="flex-1 overflow-x-auto whitespace-nowrap text-text">
        {CMD}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy install command"
        className="shrink-0 rounded border border-[var(--border-strong)] px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:bg-[var(--panel-2)] hover:text-text"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
