import React from 'react';
import { searchWikimediaImage, directCandidates } from '../utils/wikimedia';

interface UseResolvedImageOptions {
  url?: string;
  searchQuery?: string;
  width?: number;
}

export function useResolvedImage({ url, searchQuery, width = 1000 }: UseResolvedImageOptions) {
  const [src, setSrc] = React.useState('');
  const [sourcePage, setSourcePage] = React.useState<string | undefined>();
  const [sourceTitle, setSourceTitle] = React.useState<string | undefined>();
  const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  const [rawCandidates, setRawCandidates] = React.useState<string[]>([]);
  const [rawIndex, setRawIndex] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setSrc('');
    setSourcePage(undefined);
    setSourceTitle(undefined);
    setRawCandidates(directCandidates(url));
    setRawIndex(0);

    const resolve = async () => {
      // Search first. The API only returns URLs for files that actually exist,
      // which avoids the broken hard-coded Wikimedia filenames that caused 404s.
      if (searchQuery) {
        try {
          const found = await searchWikimediaImage(searchQuery, width);
          if (!cancelled && found?.url) {
            setSrc(found.url);
            setSourcePage(found.pageUrl);
            setSourceTitle(found.title);
            return;
          }
        } catch {
          // fall through to the configured direct URL
        }
      }

      const fallbacks = directCandidates(url);
      if (!cancelled && fallbacks[0]) {
        setRawCandidates(fallbacks);
        setRawIndex(0);
        setSrc(fallbacks[0]);
      } else if (!cancelled) {
        setStatus('error');
      }
    };

    resolve();
    return () => {
      cancelled = true;
    };
  }, [url, searchQuery, width]);

  const onLoad = React.useCallback(() => setStatus('loaded'), []);
  const onError = React.useCallback(() => {
    // If an API result ever becomes unavailable, try the explicitly configured URL.
    const fallbacks = rawCandidates.length ? rawCandidates : directCandidates(url);
    const current = fallbacks.indexOf(src);
    const next = current >= 0 ? current + 1 : rawIndex;
    if (next < fallbacks.length) {
      setRawIndex(next + 1);
      setStatus('loading');
      setSrc(fallbacks[next]);
    } else {
      setStatus('error');
    }
  }, [rawCandidates, rawIndex, src, url]);

  return { src, sourcePage, sourceTitle, status, onLoad, onError };
}

interface FigurePortraitProps {
  url?: string;
  searchQuery?: string;
  name: string;
  emoji: string;
  className?: string;
}

export const FigurePortrait: React.FC<FigurePortraitProps> = ({
  url,
  searchQuery,
  name,
  emoji,
  className = '',
}) => {
  const image = useResolvedImage({ url, searchQuery, width: 500 });

  if (image.status === 'error' || !image.src) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-3xl ${className}`}>
        {emoji}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-700 ${className}`}>
      {image.status === 'loading' && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse" />
      )}
      <img
        src={image.src}
        alt={`${name} 실제 사진`}
        referrerPolicy="no-referrer"
        onLoad={image.onLoad}
        onError={image.onError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${image.status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
