export interface ResolvedWikimediaImage {
  url: string;
  pageUrl?: string;
  title?: string;
}

const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

export async function searchWikimediaImage(
  query: string,
  width = 1000,
): Promise<ResolvedWikimediaImage | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: trimmed,
    gsrnamespace: '6',
    gsrlimit: '10',
    prop: 'imageinfo',
    iiprop: 'url|mime',
    iiurlwidth: String(width),
    format: 'json',
    origin: '*',
  });

  const response = await fetch(`${COMMONS_API}?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) return null;

  const payload = await response.json();
  const pages = Object.values(payload?.query?.pages || {}) as any[];
  const candidates = pages
    .map((page) => {
      const info = page?.imageinfo?.[0];
      if (!info || !String(info.mime || '').startsWith('image/')) return null;
      const url = info.thumburl || info.url;
      if (!url) return null;
      return {
        url,
        pageUrl: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title || '')}`,
        title: String(page.title || '').replace(/^File:/, ''),
        index: typeof page.index === 'number' ? page.index : 9999,
      };
    })
    .filter(Boolean)
    .sort((a: any, b: any) => a.index - b.index);

  return candidates[0] || null;
}

export function directCandidates(raw?: string): string[] {
  if (!raw) return [];
  const cleanUrl = raw.trim();
  if (!cleanUrl) return [];

  const candidates = [cleanUrl];
  const thumbMatch = cleanUrl.match(/\/commons\/thumb\/[a-f0-9]\/[^/]+\/([^/]+)\//i);
  const fileName = thumbMatch?.[1];
  if (fileName) {
    candidates.push(`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=1000`);
  }
  return Array.from(new Set(candidates));
}
