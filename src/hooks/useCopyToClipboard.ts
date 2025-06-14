
import { useState } from 'react';

export default function useCopyToClipboard() {
  const [copiedIdx, setCopiedIdx] = useState<number|null>(null);

  function copy(text: string, idx: number) {
    navigator.clipboard.writeText(`#${text}`).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    });
  }

  function copyAll(text?: string) {
    navigator.clipboard.writeText(text || "").then(() => {
      setCopiedIdx(-1);
      setTimeout(() => setCopiedIdx(null), 1200);
    });
  }

  return { copy, copiedIdx, copyAll };
}
