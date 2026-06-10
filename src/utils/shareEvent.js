function canUseNativeShare(shareData) {
  if (!navigator.share) {
    return false;
  }

  if (!navigator.canShare) {
    return true;
  }

  return navigator.canShare(shareData);
}

function copyWithFallback(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const copied = document.execCommand('copy');
    if (!copied) {
      throw new Error('Copy failed');
    }
  } finally {
    document.body.removeChild(textArea);
  }
}

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  copyWithFallback(text);
}

export async function shareEvent({ title, text, url }) {
  const shareData = {
    title,
    text,
    url,
  };

  if (canUseNativeShare(shareData)) {
    await navigator.share(shareData);
    return 'shared';
  }

  await copyToClipboard(url);
  return 'copied';
}
