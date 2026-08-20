import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Sparkles, ZoomIn, Film, ExternalLink, X } from 'lucide-react';
import { useResolvedImage } from './WikimediaImage';

interface SceneIllustrationProps {
  illustrationKey: string;
  figureId: string;
  stageNumber: number;
  realPhotoUrl?: string;
  realPhotoSearchQuery?: string;
  realPhotoDescription?: string;
}

const HistoricalPhotoViewer: React.FC<{
  url?: string;
  searchQuery?: string;
  description?: string;
  figureId: string;
  onZoom: (resolvedSrc: string, sourcePage?: string, sourceTitle?: string) => void;
}> = ({ url, searchQuery, description, figureId, onZoom }) => {
  const image = useResolvedImage({ url, searchQuery, width: 1000 });

  const getFigureEmoji = (id: string) => {
    switch (id) {
      case 'sejong': return '👑';
      case 'yisunsin': return '🛡️';
      case 'marie_curie': return '🧪';
      case 'walt_disney': return '🏰';
      case 'thomas_edison': return '💡';
      case 'jane_goodall': return '🌿';
      case 'helen_keller': return '🌟';
      case 'kim_gu': return '🇰🇷';
      case 'son_heungmin': return '⚽';
      case 'yoo_jaeseok': return '🎤';
      default: return '📜';
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center p-3 group overflow-hidden select-none">
      {image.status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10 p-4">
          <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-xs text-slate-300 font-bold animate-pulse">상황에 맞는 실제 사진 찾는 중...</p>
        </div>
      )}

      {image.status !== 'error' && image.src && (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            key={image.src}
            src={image.src}
            alt={description || '역사 실제 사진'}
            referrerPolicy="no-referrer"
            onLoad={image.onLoad}
            onError={image.onError}
            className={`max-h-56 sm:max-h-64 max-w-full object-contain rounded-xl shadow-md transition-all duration-300 group-hover:scale-[1.02] cursor-pointer ${
              image.status === 'loaded' ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => onZoom(image.src, image.sourcePage, image.sourceTitle)}
          />

          {image.status === 'loaded' && (
            <button
              onClick={() => onZoom(image.src, image.sourcePage, image.sourceTitle)}
              className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-indigo-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md cursor-pointer flex items-center gap-1 text-xs font-bold"
              title="사진 크게 보기"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              확대
            </button>
          )}
        </div>
      )}

      {image.status === 'error' && (
        <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-4 rounded-xl border-2 border-indigo-500/30 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-900/60 border border-indigo-400/40 flex items-center justify-center text-3xl shadow-inner mb-2">
            {getFigureEmoji(figureId)}
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black mb-1">
            📚 관련 역사 자료
          </span>
          <h4 className="text-xs sm:text-sm font-black text-white line-clamp-2 max-w-xs">
            {description || '이 장면과 관련된 실제 사진'}
          </h4>
          <p className="text-[10px] text-slate-400 mt-2">사진을 찾지 못해 애니메이션 자료를 함께 제공합니다.</p>
        </div>
      )}

      {description && image.status === 'loaded' && (
        <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 text-[11px] font-black text-amber-200 truncate text-center shadow-lg pointer-events-none">
          📷 {description}
        </div>
      )}
    </div>
  );
};

export const SceneIllustration: React.FC<SceneIllustrationProps> = ({
  illustrationKey,
  figureId,
  stageNumber,
  realPhotoUrl,
  realPhotoSearchQuery,
  realPhotoDescription,
}) => {
  const [viewMode, setViewMode] = useState<'both' | 'photo' | 'anim'>('both');
  const [zoomData, setZoomData] = useState<{ src: string; sourcePage?: string; sourceTitle?: string } | null>(null);
  const hasPhoto = Boolean(realPhotoUrl || realPhotoSearchQuery);

  return (
    <div
      id={`scene-illustration-${illustrationKey}`}
      className="relative w-full rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-500/20 bg-slate-900"
    >
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-md">
        {hasPhoto && (
          <>
            <button
              onClick={() => setViewMode('both')}
              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'both' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              함께 보기
            </button>
            <button
              onClick={() => setViewMode('photo')}
              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'photo' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              실제 사진
            </button>
          </>
        )}
        <button
          onClick={() => setViewMode('anim')}
          className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
            viewMode === 'anim' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          애니메이션
        </button>
      </div>

      <div className="absolute top-3 left-3 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-xs font-extrabold text-amber-300 flex items-center gap-1.5 shadow-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        STAGE {stageNumber}
      </div>

      <div className="w-full h-64 sm:h-72 md:h-80 relative flex items-center justify-center overflow-hidden">
        {viewMode === 'both' && hasPhoto && (
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <HistoricalPhotoViewer
              url={realPhotoUrl}
              searchQuery={realPhotoSearchQuery}
              description={realPhotoDescription}
              figureId={figureId}
              onZoom={(src, sourcePage, sourceTitle) => setZoomData({ src, sourcePage, sourceTitle })}
            />
            <div className="relative h-full flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950">
              {renderScene(illustrationKey, figureId, stageNumber)}
            </div>
          </div>
        )}

        {viewMode === 'photo' && hasPhoto && (
          <div className="w-full h-full bg-slate-950 flex items-center justify-center relative">
            <HistoricalPhotoViewer
              url={realPhotoUrl}
              searchQuery={realPhotoSearchQuery}
              description={realPhotoDescription}
              figureId={figureId}
              onZoom={(src, sourcePage, sourceTitle) => setZoomData({ src, sourcePage, sourceTitle })}
            />
          </div>
        )}

        {(viewMode === 'anim' || !hasPhoto) && (
          <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950">
            {renderScene(illustrationKey, figureId, stageNumber)}
          </div>
        )}
      </div>

      <AnimatePresence>
        {zoomData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
            onClick={() => setZoomData(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[85vh] bg-slate-900 rounded-3xl p-4 border-2 border-indigo-500/40 shadow-2xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomData(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={zoomData.src}
                alt={realPhotoDescription || '실제 사진'}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto object-contain rounded-2xl shadow-xl"
              />
              <div className="mt-4 text-center max-w-2xl">
                {realPhotoDescription && (
                  <div className="text-sm sm:text-base font-black text-amber-200">📜 {realPhotoDescription}</div>
                )}
                {zoomData.sourceTitle && <div className="text-xs text-slate-400 mt-1">Wikimedia Commons: {zoomData.sourceTitle}</div>}
                {zoomData.sourcePage && (
                  <a
                    href={zoomData.sourcePage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 hover:text-indigo-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> 원본·라이선스 확인
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function renderScene(key: string, figureId: string, stageNumber: number) {
  // 1. Sejong
  if (key.includes('sejong') || figureId === 'sejong') {
    if (key === 'sejong_reading' || stageNumber === 1) {
      return (
        <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
          <rect width="400" height="240" fill="#1e1b4b" />
          <path d="M 0 180 L 400 180 L 400 240 L 0 240 Z" fill="#312e81" />
          <circle cx="200" cy="110" r="75" fill="#fbbf24" opacity="0.18" />
          <motion.ellipse
            cx="200"
            cy="105"
            rx="12"
            ry="20"
            fill="#f59e0b"
            animate={{ scaleY: [1, 1.25, 0.9, 1], scaleX: [1, 0.9, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <ellipse cx="200" cy="110" rx="6" ry="10" fill="#fef08a" />
          {/* Books pile */}
          <rect x="140" y="160" width="120" height="16" rx="3" fill="#dc2626" />
          <rect x="145" y="144" width="110" height="14" rx="3" fill="#2563eb" />
          <rect x="150" y="130" width="100" height="12" rx="3" fill="#16a34a" />
          {/* Open Book */}
          <motion.g animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
            <path d="M 160 120 Q 200 135 200 115 Q 200 135 240 120 L 240 95 Q 200 110 200 90 Q 200 110 160 95 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
            <text x="172" y="110" fontSize="10" fontWeight="bold" fill="#78350f">百讀</text>
            <text x="212" y="110" fontSize="10" fontWeight="bold" fill="#78350f">百習</text>
          </motion.g>
          <text x="135" y="215" fill="#fbbf24" fontSize="13" fontWeight="bold">병풍 뒤 발견한 책 한 권의 기적</text>
        </svg>
      );
    }
    if (key === 'sejong_jangyeongsil' || stageNumber === 2) {
      return (
        <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
          <rect width="400" height="240" fill="#0f172a" />
          {/* Water clock gears & bowls */}
          <circle cx="200" cy="100" r="60" fill="#38bdf8" opacity="0.15" />
          {/* Jagyeongnu Water clock jar */}
          <rect x="160" y="60" width="80" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
          {/* Water drops */}
          <motion.circle
            cx="200"
            cy="115"
            r="4"
            fill="#38bdf8"
            animate={{ y: [0, 45, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          />
          {/* Bell & Hammer */}
          <circle cx="140" cy="150" r="18" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          <motion.rect
            x="145"
            y="125"
            width="6"
            height="25"
            fill="#e2e8f0"
            animate={{ rotate: [0, -25, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          />
          {/* Sun dial Angbuilgu */}
          <circle cx="260" cy="150" r="22" fill="#78716c" stroke="#d6d3d1" strokeWidth="2" />
          <line x1="260" y1="150" x2="270" y2="135" stroke="#f59e0b" strokeWidth="3" />
          <text x="120" y="215" fill="#38bdf8" fontSize="13" fontWeight="bold">장영실과 함께 만든 조선의 과학 발명</text>
        </svg>
      );
    }
    if (key === 'sejong_4gun6jin' || stageNumber === 3) {
      return (
        <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
          <rect width="400" height="240" fill="#14532d" />
          {/* Fortress wall */}
          <path d="M 0 170 L 400 170 L 400 240 L 0 240 Z" fill="#3f3f46" />
          {/* Battlements */}
          {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
            <rect key={x} x={x + 5} y="155" width="25" height="15" fill="#3f3f46" />
          ))}
          {/* Tiger General Flag */}
          <rect x="195" y="60" width="8" height="100" fill="#78350f" />
          <polygon points="203,65 290,95 203,125" fill="#dc2626" />
          <text x="215" y="100" fontSize="16" fontWeight="bold" fill="#fef08a">鎭</text>
          <text x="130" y="215" fill="#86efac" fontSize="13" fontWeight="bold">4군 6진 개척과 국경선 확립</text>
        </svg>
      );
    }
    if (key === 'sejong_vote' || stageNumber === 4) {
      return (
        <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
          <rect width="400" height="240" fill="#451a03" />
          {/* People icons gathering */}
          <circle cx="150" cy="110" r="24" fill="#fbbf24" />
          <circle cx="200" cy="95" r="28" fill="#f59e0b" />
          <circle cx="250" cy="110" r="24" fill="#d97706" />
          {/* Vote scroll */}
          <rect x="140" y="145" width="120" height="40" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
          <text x="160" y="170" fill="#78350f" fontSize="12" fontWeight="bold">17만 농민 여론조사</text>
          <text x="125" y="215" fill="#fde68a" fontSize="13" fontWeight="bold">백성의 뜻을 물어 완성한 공평한 세법</text>
        </svg>
      );
    }
    // Hangul
    return (
      <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#3b0764" />
        {['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅎ', 'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'].map((letter, i) => (
          <motion.text
            key={letter}
            x={45 + (i % 5) * 75}
            y={45 + Math.floor(i / 5) * 45}
            fontSize="22"
            fontWeight="bold"
            fill="#fbbf24"
            opacity="0.85"
            animate={{
              y: [45 + Math.floor(i / 5) * 45, 38 + Math.floor(i / 5) * 45, 45 + Math.floor(i / 5) * 45],
              scale: [1, 1.15, 1],
            }}
            transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.1 }}
          >
            {letter}
          </motion.text>
        ))}
        <rect x="135" y="80" width="130" height="75" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
        <text x="155" y="112" fontSize="14" fontWeight="bold" fill="#b45309">訓民正音</text>
        <text x="158" y="135" fontSize="10" fill="#78350f">나랏말싸미</text>
      </svg>
    );
  }

  // 2. Yi Sun-sin
  if (key.includes('yisunsin') || figureId === 'yisunsin') {
    if (key === 'yisunsin_horse' || stageNumber === 1) {
      return (
        <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
          <rect width="400" height="240" fill="#1e293b" />
          {/* Ground */}
          <path d="M 0 170 L 400 170 L 400 240 L 0 240 Z" fill="#334155" />
          {/* Willow Branch */}
          <motion.path
            d="M 120 180 Q 180 130 280 180"
            stroke="#22c55e"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <text x="180" y="120" fontSize="36">🐎</text>
          <text x="110" y="215" fill="#86efac" fontSize="13" fontWeight="bold">부러진 다리를 버드나무로 묶고 완주!</text>
        </svg>
      );
    }
    if (key === 'yisunsin_turtle' || stageNumber === 3) {
      return (
        <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
          <rect width="400" height="240" fill="#0c4a6e" />
          {/* Sea waves */}
          <motion.path
            d="M 0 180 Q 100 160 200 180 Q 300 200 400 180 L 400 240 L 0 240 Z"
            fill="#0369a1"
            animate={{ d: [
              "M 0 180 Q 100 160 200 180 Q 300 200 400 180 L 400 240 L 0 240 Z",
              "M 0 180 Q 100 200 200 180 Q 300 160 400 180 L 400 240 L 0 240 Z",
              "M 0 180 Q 100 160 200 180 Q 300 200 400 180 L 400 240 L 0 240 Z"
            ]}}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          {/* Turtle Ship Body */}
          <ellipse cx="200" cy="140" rx="90" ry="38" fill="#334155" stroke="#0f172a" strokeWidth="4" />
          {/* Spikes */}
          {[-60, -40, -20, 0, 20, 40, 60].map((dx) => (
            <polygon key={dx} points={`${200+dx},120 ${205+dx},105 ${210+dx},120`} fill="#94a3b8" />
          ))}
          {/* Dragon Head */}
          <path d="M 110 140 Q 90 120 80 95 Q 110 90 120 125 Z" fill="#15803d" stroke="#166534" strokeWidth="2" />
          <motion.circle cx="70" cy="90" r="10" fill="#ef4444" opacity="0.8" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
          <text x="130" y="215" fill="#38bdf8" fontSize="13" fontWeight="bold">철갑 거북선 건조와 바다의 수호</text>
        </svg>
      );
    }
    if (key === 'yisunsin_crane' || stageNumber === 4) {
      return (
        <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
          <rect width="400" height="240" fill="#082f49" />
          {/* Crane wing formation arc */}
          <path d="M 60 80 Q 200 150 340 80" stroke="#38bdf8" strokeWidth="4" strokeDasharray="8 6" fill="none" />
          {/* Korean Ships */}
          {[
            { x: 70, y: 90 }, { x: 130, y: 120 }, { x: 200, y: 145 }, { x: 270, y: 120 }, { x: 330, y: 90 }
          ].map((pos, idx) => (
            <g key={idx}>
              <ellipse cx={pos.x} cy={pos.y} rx="18" ry="10" fill="#38bdf8" />
              <polygon points={`${pos.x-10},${pos.y-5} ${pos.x},${pos.y-20} ${pos.x+10},${pos.y-5}`} fill="#ffffff" />
            </g>
          ))}
          <text x="125" y="215" fill="#7dd3fc" fontSize="13" fontWeight="bold">한산도 대첩 - 전설의 학익진 전술</text>
        </svg>
      );
    }
    // Myeongnyang 13 vs 133
    return (
      <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#022c22" />
        {/* Whirlpool */}
        <motion.circle
          cx="200"
          cy="120"
          r="80"
          stroke="#10b981"
          strokeWidth="3"
          strokeDasharray="15 10"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        />
        <circle cx="200" cy="120" r="40" stroke="#34d399" strokeWidth="2" strokeDasharray="10 8" fill="none" />
        {/* Joseon Flagship */}
        <g transform="translate(180, 105)">
          <ellipse cx="20" cy="15" rx="25" ry="12" fill="#059669" stroke="#ffffff" strokeWidth="2" />
          <text x="10" y="20" fill="#ffffff" fontSize="11" fontWeight="bold">13척</text>
        </g>
        <text x="120" y="215" fill="#6ee7b7" fontSize="13" fontWeight="bold">신에게는 아직 12척의 배가 있습니다!</text>
      </svg>
    );
  }

  // 3. Marie Curie
  if (key.includes('curie') || figureId === 'marie_curie') {
    return (
      <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#2e1065" />
        {/* Radium Glow Effect */}
        <motion.circle
          cx="200"
          cy="110"
          r="70"
          fill="#38bdf8"
          opacity="0.25"
          animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        />
        {/* Laboratory Flask */}
        <path d="M 190 70 L 210 70 L 210 95 L 235 150 L 165 150 L 190 95 Z" fill="#0284c7" opacity="0.8" stroke="#38bdf8" strokeWidth="3" />
        {/* Glowing Radium liquid */}
        <path d="M 172 135 L 228 135 L 235 150 L 165 150 Z" fill="#38bdf8" />
        {/* Bubbles */}
        <motion.circle cx="195" cy="125" r="4" fill="#ffffff" animate={{ y: [-5, -25, -5] }} transition={{ repeat: Infinity, duration: 1.5 }} />
        <motion.circle cx="210" cy="130" r="3" fill="#ffffff" animate={{ y: [-5, -20, -5] }} transition={{ repeat: Infinity, duration: 1.8 }} />
        <text x="120" y="215" fill="#a7f3d0" fontSize="13" fontWeight="bold">어둠을 밝히는 푸른빛 원소 라듐의 발견</text>
      </svg>
    );
  }

  // 4. Walt Disney
  if (key.includes('disney') || figureId === 'walt_disney') {
    return (
      <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#4a044e" />
        {/* Castle Silhouettes */}
        <rect x="175" y="80" width="50" height="90" fill="#701a75" />
        <polygon points="175,80 200,40 225,80" fill="#d946ef" />
        <rect x="145" y="110" width="30" height="60" fill="#701a75" />
        <polygon points="145,110 160,85 175,110" fill="#ec4899" />
        <rect x="225" y="110" width="30" height="60" fill="#701a75" />
        <polygon points="225,110 240,85 255,110" fill="#ec4899" />
        {/* Magic Fireworks Stars */}
        {[[100, 60], [300, 50], [200, 30], [80, 130], [320, 120]].map(([sx, sy], idx) => (
          <motion.text
            key={idx}
            x={sx}
            y={sy}
            fontSize="18"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.8, delay: idx * 0.3 }}
          >
            ✨
          </motion.text>
        ))}
        <text x="130" y="215" fill="#fbcfe8" fontSize="13" fontWeight="bold">꿈과 상상이 살아 숨 쉬는 마법의 세계</text>
      </svg>
    );
  }

  // 5. Thomas Edison
  if (key.includes('edison') || figureId === 'thomas_edison') {
    return (
      <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#451a03" />
        {/* Glowing Light Bulb */}
        <motion.circle
          cx="200"
          cy="95"
          r="65"
          fill="#f59e0b"
          opacity="0.25"
          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <ellipse cx="200" cy="95" rx="35" ry="40" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
        <path d="M 190 135 L 210 135 L 206 150 L 194 150 Z" fill="#a1a1aa" />
        {/* Filament */}
        <path d="M 190 100 Q 200 80 200 95 Q 200 80 210 100" stroke="#d97706" strokeWidth="3" fill="none" />
        <text x="120" y="215" fill="#fef08a" fontSize="13" fontWeight="bold">6,000번의 실패를 이겨낸 1,200시간 전구</text>
      </svg>
    );
  }

  // 6. Jane Goodall
  if (key.includes('goodall') || figureId === 'jane_goodall') {
    return (
      <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#064e3b" />
        {/* Jungle Leaves & Trees */}
        <circle cx="80" cy="80" r="60" fill="#047857" opacity="0.6" />
        <circle cx="320" cy="70" r="70" fill="#047857" opacity="0.6" />
        <text x="170" y="115" fontSize="48">🐒</text>
        <text x="220" y="115" fontSize="42">🌿</text>
        <text x="120" y="215" fill="#a7f3d0" fontSize="13" fontWeight="bold">곰베 숲에서 피어난 인간과 자연의 교감</text>
      </svg>
    );
  }

  // 7. Helen Keller
  if (key.includes('keller') || figureId === 'helen_keller') {
    return (
      <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#1e3a5f" />
        {/* Water Flow from pump */}
        <motion.path
          d="M 160 90 Q 200 130 240 170"
          stroke="#38bdf8"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <text x="145" y="130" fill="#ffffff" fontSize="24" fontWeight="black">W - A - T - E - R</text>
        <text x="110" y="215" fill="#bae6fd" fontSize="13" fontWeight="bold">어둠과 침묵을 깨부순 생명의 첫 단어</text>
      </svg>
    );
  }

  // 8. Kim Gu
  if (key.includes('kimgu') || figureId === 'kim_gu') {
    return (
      <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#134e4a" />
        {/* Taegeuk pattern background */}
        <circle cx="200" cy="100" r="55" fill="#ffffff" opacity="0.15" />
        <text x="170" y="115" fontSize="50">🇰🇷</text>
        <text x="125" y="170" fill="#fef08a" fontSize="14" fontWeight="bold">"오직 한없이 가지고 싶은 것은 높은 문화의 힘이다"</text>
        <text x="120" y="215" fill="#99f6e4" fontSize="13" fontWeight="bold">대한민국 임시정부와 문화강국의 꿈</text>
      </svg>
    );
  }

  // 9. Son Heung-min
  if (key.includes('son') || figureId === 'son_heungmin') {
    return (
      <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#1e3a8a" />
        {/* Golden Boot trophy glow */}
        <motion.circle cx="200" cy="100" r="60" fill="#fbbf24" opacity="0.2" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
        <text x="175" y="115" fontSize="48">👟</text>
        <text x="210" y="85" fontSize="36">⚽</text>
        <text x="120" y="215" fill="#93c5fd" fontSize="13" fontWeight="bold">아시아 최초 프리미어리그 득점왕 (골든부트)</text>
      </svg>
    );
  }

  // 10. Yoo Jae-suk
  if (key.includes('yoo') || figureId === 'yoo_jaeseok') {
    return (
      <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
        <rect width="400" height="240" fill="#064e3b" />
        {/* Studio spotlight */}
        <polygon points="200,20 100,200 300,200" fill="#fbbf24" opacity="0.12" />
        <text x="175" y="115" fontSize="50">🎤</text>
        <text x="120" y="215" fill="#a7f3d0" fontSize="13" fontWeight="bold">상대를 먼저 배려하고 빛내주는 국민 MC</text>
      </svg>
    );
  }

  // Fallback
  return (
    <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
      <rect width="400" height="240" fill="#1e1b4b" />
      <text x="180" y="115" fontSize="45">🌟</text>
      <text x="140" y="180" fill="#e0e7ff" fontSize="14" fontWeight="bold">인생 탐험 스테이지</text>
    </svg>
  );
}
