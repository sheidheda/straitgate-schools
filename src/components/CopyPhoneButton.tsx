'use client';

import { useState } from 'react';

interface CopyPhoneButtonProps {
  phone: string;
  className?: string;
}

export default function CopyPhoneButton({ phone, className }: CopyPhoneButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = phone;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button type="button" onClick={copyPhone} className={className}>
      {phone}
      <span className="ml-2 text-xs text-white/40" aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
