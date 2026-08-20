import React from 'react';

interface UseResolvedImageOptions {
  url?: string;
}

function buildCandidates(raw?: string): string[] {
  if (!raw) return [];
  const clean = raw.trim();
  if (!clean) return [];

  const candidates = [clean];
  // Commons Special:FilePath의 thumbnail 파라미터가 일시적으로 실패할 경우
  // 같은 "확정 파일"의 원본으로만 재시도합니다. 다른 사진/검색 결과로 대체하지 않습니다.
  if (clean.includes('/wiki/Special:FilePath/') && clean.includes('?')) {
    candidates.push(clean.split('?')[0]);
  }
  return Array.from(new Set(candidates));
}

function commonsMetadata(raw?: string) {
  if (!raw) return {};
  try {
    const url = new URL(raw);
    const marker = '/wiki/Special:FilePath/';
    const idx = url.pathname.indexOf(marker);
    if (idx === -1) return {};
    const encoded = url.pathname.slice(idx + marker.length);
    const title = decodeURIComponent(encoded);
    return {
      sourceTitle: title,
      sourcePage: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title)}`,
    };
  } catch {
    return {};
  }
}

export function useResolvedImage({ url }: UseResolvedImageOptions) {
  const candidates = React.useMemo(() => buildCandidates(url), [url]);
  const metadata = React.useMemo(() => commonsMetadata(url), [url]);
  const [candidateIndex, setCandidateIndex] = React.useState(0);
  const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>(
    candidates.length ? 'loading' : 'error',
  );

  React.useEffect(() => {
    setCandidateIndex(0);
    setStatus(candidates.length ? 'loading' : 'error');
  }, [candidates]);

  const src = candidates[candidateIndex] || '';
  const onLoad = React.useCallback(() => setStatus('loaded'), []);
  const onError = React.useCallback(() => {
    setCandidateIndex((current) => {
      const next = current + 1;
      if (next < candidates.length) {
        setStatus('loading');
        return next;
      }
      setStatus('error');
      return current;
    });
  }, [candidates.length]);

  return {
    src,
    sourcePage: metadata.sourcePage,
    sourceTitle: metadata.sourceTitle,
    status,
    onLoad,
    onError,
  };
}

interface FigurePortraitProps {
  url?: string;
  name: string;
  emoji: string;
  className?: string;
}

export const FigurePortrait: React.FC<FigurePortraitProps> = ({
  url,
  name,
  emoji,
  className = '',
}) => {
  const image = useResolvedImage({ url });

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
        alt={`${name} 실제 인물 사진`}
        referrerPolicy="no-referrer"
        onLoad={image.onLoad}
        onError={image.onError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${image.status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
