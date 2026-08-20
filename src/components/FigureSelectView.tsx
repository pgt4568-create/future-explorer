import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Figure } from '../types';
import { HISTORICAL_FIGURES } from '../data/figuresData';
import { soundManager } from '../utils/audio';
import { Sparkles, Compass, Bookmark, Search, ArrowRight } from 'lucide-react';
import { FigurePortrait } from './WikimediaImage';

interface FigureSelectViewProps {
  onSelectFigure: (figure: Figure) => void;
  onOpenGallery: () => void;
}

export const FigureSelectView: React.FC<FigureSelectViewProps> = ({
  onSelectFigure,
  onOpenGallery,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'korea' | 'world'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFigures = HISTORICAL_FIGURES.filter((fig) => {
    const matchesCat = filterCategory === 'all' || fig.nationality === filterCategory;
    const matchesSearch =
      fig.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fig.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fig.superPower.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="figure-select-view" className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Hero Welcome Banner */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-indigo-100 dark:from-amber-950/60 dark:to-indigo-950/60 text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm font-black mb-3 shadow-sm"
        >
          <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          초등학생을 위한 역사 속 진로 인생게임
        </motion.div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">
          위인의 삶을 선택하며 체험하는 <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            나만의 10년 후 미래 탐험대
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium mt-3 leading-relaxed">
          역사 속 결정적인 순간, 내가 주인공이라면 어떤 선택을 했을까요? <br />
          위인의 슈퍼 파워를 배우고, 10년 후 나의 멋진 미래 캐릭터를 꾸며보세요!
        </p>

        {/* Gallery Navigation button */}
        <div className="mt-4 flex justify-center">
          <button
            id="btn-open-gallery"
            onClick={() => {
              soundManager.playClick();
              onOpenGallery();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-sm hover:bg-slate-50 transition-all active:scale-95"
          >
            <Bookmark className="w-4 h-4 text-indigo-600" />
            내가 만든 미래 카드 보관함 가기
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
        {/* Category Pills */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              soundManager.playClick();
              setFilterCategory('all');
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all ${
              filterCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            전체 보기 ({HISTORICAL_FIGURES.length})
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setFilterCategory('korea');
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all ${
              filterCategory === 'korea'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            🇰🇷 한국의 위인 (5)
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setFilterCategory('world');
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all ${
              filterCategory === 'world'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            🌍 세계의 위인 (5)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="위인 이름, 직업, 슈퍼파워 검색"
            className="w-full pl-9 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-600 text-xs sm:text-sm font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Figures Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredFigures.map((figure) => {
          return (
            <motion.div
              key={figure.id}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-md hover:shadow-xl border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between transition-all group relative overflow-hidden"
            >
              {/* Category Color Ribbon */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: figure.color }}
              />

              <div>
                {/* Top Avatar & Category Badge */}
                <div className="flex items-start justify-between mb-3.5">
                  <FigurePortrait
                    url={figure.photoUrl}
                    searchQuery={figure.photoSearchQuery}
                    name={figure.name}
                    emoji={figure.avatarIcon}
                    className="w-16 h-16 rounded-2xl shadow-md border-2 border-white dark:border-slate-700"
                  />
                  <span className="px-2.5 py-1 rounded-full text-2xs font-extrabold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {figure.nationality === 'korea' ? '🇰🇷 한국' : '🌍 세계'} • {figure.era}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {figure.name}
                </h3>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {figure.role}
                </div>

                {/* Motto */}
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic mb-4 line-clamp-2">
                  "{figure.motto}"
                </p>

                {/* Super Power Tag */}
                <div className="bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-2xl border border-amber-200/60 dark:border-amber-900/60 mb-4">
                  <div className="flex items-center gap-1 text-2xs font-extrabold text-amber-800 dark:text-amber-300">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    전수받을 슈퍼 파워
                  </div>
                  <div className="text-xs font-black text-slate-800 dark:text-slate-100 mt-0.5">
                    「{figure.superPower}」
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <button
                id={`btn-start-game-${figure.id}`}
                onClick={() => {
                  soundManager.playClick();
                  onSelectFigure(figure);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all group-hover:shadow-indigo-300/50"
              >
                인생게임 시작하기 ({figure.stages.length}단계)
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
