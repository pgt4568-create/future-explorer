import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FutureCardData, Figure } from '../types';
import { HISTORICAL_FIGURES } from '../data/figuresData';
import { AvatarCanvas } from './AvatarCanvas';
import { soundManager } from '../utils/audio';
import { ArrowLeft, Trash2, Eye, Plus, Sparkles, Award } from 'lucide-react';

interface GalleryViewProps {
  onBackToSelect: () => void;
  onSelectExistingCard: (card: FutureCardData, figure: Figure) => void;
  onStartNewGame: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  onBackToSelect,
  onSelectExistingCard,
  onStartNewGame,
}) => {
  const [cards, setCards] = useState<FutureCardData[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('my_future_cards');
      if (stored) {
        setCards(JSON.parse(stored));
      }
    } catch {
      setCards([]);
    }
  }, []);

  const handleDeleteCard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    if (confirm('이 미래 카드를 보관함에서 삭제할까요?')) {
      const updated = cards.filter((c) => c.id !== id);
      setCards(updated);
      try {
        localStorage.setItem('my_future_cards', JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  const handleOpenCard = (card: FutureCardData) => {
    soundManager.playClick();
    const figure = HISTORICAL_FIGURES.find((f) => f.id === card.figureId) || HISTORICAL_FIGURES[0];
    onSelectExistingCard(card, figure);
  };

  return (
    <div id="gallery-view" className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => {
            soundManager.playClick();
            onBackToSelect();
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-black text-sm hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          위인 목록으로 돌아가기
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onStartNewGame();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          새로운 위인 탐험하기
        </button>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-xs font-black mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          나의 꿈 보물상자
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
          내가 완성한 10년 후 미래 카드 보관함
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
          탐험을 완료하고 발행한 미래 명함과 학습지를 언제든 다시 보고 출력할 수 있어요.
        </p>
      </div>

      {/* Cards Grid */}
      {cards.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8">
          <div className="text-5xl mb-3">🪪</div>
          <h3 className="text-lg font-black text-slate-700 dark:text-slate-300">
            아직 보관된 미래 카드가 없어요!
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
            세종대왕, 이순신, 마리 퀴리 등 멋진 위인들의 인생게임을 완료하고 나만의 카드를 만들어보세요.
          </p>
          <button
            onClick={() => {
              soundManager.playClick();
              onStartNewGame();
            }}
            className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95"
          >
            첫 번째 인생게임 도전하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const fig = HISTORICAL_FIGURES.find((f) => f.id === card.figureId);
            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -5 }}
                onClick={() => handleOpenCard(card)}
                className="cursor-pointer bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-5 shadow-xl border-2 border-indigo-500/40 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-indigo-500/30">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl">{fig?.avatarIcon || '✨'}</span>
                    <span className="text-xs font-black text-amber-300">
                      {card.figureName} 탐험 완료
                    </span>
                  </div>
                  <span className="text-2xs font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                    {card.targetYear}년
                  </span>
                </div>

                {/* Body with Avatar */}
                <div className="my-4 flex items-center gap-3.5">
                  <div className="p-1 bg-indigo-500/20 rounded-xl flex-shrink-0">
                    <AvatarCanvas avatar={card.avatar} size={88} className="rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-indigo-300 font-bold">
                      {card.studentName} ({card.gradeClass})
                    </div>
                    <div className="text-sm font-black text-white line-clamp-1">
                      {card.futureJob}
                    </div>
                    <div className="text-2xs text-slate-300 italic line-clamp-2">
                      "{card.slogan}"
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-indigo-500/20 flex items-center justify-between">
                  <span className="text-2xs text-slate-400 font-medium">
                    {card.createdAt}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDeleteCard(card.id, e)}
                      className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 transition-colors"
                      title="삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenCard(card)}
                      className="flex items-center gap-1 px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      보기
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
