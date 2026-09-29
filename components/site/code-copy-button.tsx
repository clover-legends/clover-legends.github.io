"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CodeCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (permissions or HTTP context): leave code visible.
    }
  }

  return (
    <button
      type="button"
      className="code-copy-button"
      aria-label={`Copy code ${code}`}
      onClick={copy}
    >
      {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
