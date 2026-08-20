// Safe Image URL handler with global CDN proxy for Wikimedia and historical archives
export function getSafeImageUrl(url?: string, width = 600): string {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('blob:')) return url;

  // Clean up any double encoding
  const cleanUrl = url.trim();

  // If already a wsrv.nl proxy, return as is
  if (cleanUrl.includes('wsrv.nl')) return cleanUrl;

  // For Wikimedia/Wikipedia images, route through wsrv.nl to bypass hotlinking 403 Forbidden blocks and ensure high performance
  if (cleanUrl.includes('wikimedia.org') || cleanUrl.includes('wikipedia.org')) {
    return `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}&fit=contain&output=webp&q=85`;
  }

  return cleanUrl;
}

export function getDirectWikimediaUrl(url?: string): string {
  if (!url) return '';
  // Extract filename from wikimedia url if possible
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  if (url.includes('wikimedia.org') && filename) {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;
  }
  return url;
}
