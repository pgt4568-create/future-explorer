import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Figure, ReflectionData } from '../types';
import { SUPER_POWER_TAGS } from '../data/figuresData';
import { soundManager } from '../utils/audio';
import { Sparkles, BookHeart, User, ArrowRight, ArrowLeft, Lightbulb, Check } from 'lucide-react';

interface ReflectionViewProps {
  figure: Figure;
  initialData?: Partial<ReflectionData>;
  studentName: string;
  gradeClass: string;
  onUpdateStudentInfo: (name: string, gradeClass: string) => void;
  onBackToGame: () => void;
  onSubmitReflection: (data: ReflectionData) => void;
}

export const ReflectionView: React.FC<ReflectionViewProps> = ({
  figure,
  initialData,
  studentName,
  gradeClass,
  onUpdateStudentInfo,
  onBackToGame,
  onSubmitReflection,
}) => {
  const [mostImpressiveScene, setMostImpressiveScene] = useState<string>(
    initialData?.mostImpressiveScene || ''
  );
  const [learnedSuperPower, setLearnedSuperPower] = useState<string>(
    initialData?.learnedSuperPower || figure.superPower
  );
  const [customSuperPowerText, setCustomSuperPowerText] = useState<string>(
    initialData?.customSuperPowerText || ''
  );
  const [myFutureContribution, setMyFutureContribution] = useState<string>(
    initialData?.myFutureContribution || ''
  );
  const [name, setName] = useState<string>(studentName || '');
  const [cls, setCls] = useState<string>(gradeClass || '');

  // Quick chips for impressive scenes
  const quickScenes = figure.stages.map((st) => st.title);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('친구의 멋진 이름을 적어주세요!');
      return;
    }
    if (!myFutureContribution.trim()) {
      alert('10년 후 나의 다짐을 한 줄 이상 적어주세요!');
      return;
    }

    soundManager.playClick();
    onUpdateStudentInfo(name, cls);

    const reflection: ReflectionData = {
      figureId: figure.id,
      figureName: figure.name,
      mostImpressiveScene: mostImpressiveScene || quickScenes[0],
      learnedSuperPower: learnedSuperPower || figure.superPower,
      customSuperPowerText,
      myFutureContribution,
      createdAt: new Date().toLocaleDateString('ko-KR'),
    };

    onSubmitReflection(reflection);
  };

  return (
    <div id="reflection-view" className="w-full max-w-3xl mx-auto px-4 py-6">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            soundManager.playClick();
            onBackToGame();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          게임 다시 보기
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
          <span className="text-lg">{figure.avatarIcon}</span>
          <span className="font-extrabold text-xs sm:text-sm text-emerald-800 dark:text-emerald-200">
            {figure.name}에게 배우는 나의 진로 성찰
          </span>
        </div>
      </div>

      {/* Main Worksheet Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700"
      >
        {/* Banner Header */}
        <div className="flex items-center gap-3.5 pb-5 mb-6 border-b border-slate-200 dark:border-slate-700">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-indigo-500 flex items-center justify-center text-2xl text-white shadow-md">
            <BookHeart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
              나의 진로 탐험 워크시트
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {figure.name}의 삶을 체험하며 느낀 점과 10년 후 나의 멋진 미래를 그려보아요!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Info Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-indigo-50/70 dark:bg-indigo-950/40 p-4 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900">
            <div>
              <label className="block text-xs sm:text-sm font-black text-slate-950 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                내 이름 (필수)
              </label>
              <input
                id="input-student-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 김민준"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-slate-950 dark:text-white font-bold text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-black text-slate-950 dark:text-slate-100 mb-1">
                학교 / 학년·반 (선택)
              </label>
              <input
                id="input-student-grade"
                type="text"
                value={cls}
                onChange={(e) => setCls(e.target.value)}
                placeholder="예: 서울꿈초 4학년 2반"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-slate-950 dark:text-white font-bold text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
              />
            </div>
          </div>

          {/* Q1. Most Impressive Scene */}
          <div className="space-y-2.5">
            <label className="block text-sm sm:text-base font-black text-slate-950 dark:text-white">
              Q1. {figure.name}의 인생 중 가장 기억에 남고 인상 깊었던 장면은?
            </label>
            {/* Quick Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {quickScenes.map((sceneTitle) => {
                const isSelected = mostImpressiveScene === sceneTitle;
                return (
                  <button
                    key={sceneTitle}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setMostImpressiveScene(sceneTitle);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer border-2 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm ring-2 ring-indigo-300'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="inline w-3.5 h-3.5 mr-1" />}
                    {sceneTitle}
                  </button>
                );
              })}
            </div>
            <textarea
              id="textarea-impressive-scene"
              value={mostImpressiveScene}
              onChange={(e) => setMostImpressiveScene(e.target.value)}
              rows={2}
              placeholder="위의 보기 중에서 고르거나, 내가 가장 감동받은 순간과 이유를 자유롭게 적어보세요."
              className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-slate-950 dark:text-white font-bold text-sm sm:text-base focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 outline-none leading-relaxed placeholder:text-slate-500 dark:placeholder:text-slate-400 shadow-xs"
            />
          </div>

          {/* Q2. Super Power / Core Competency to learn */}
          <div className="space-y-2.5">
            <label className="block text-sm sm:text-base font-black text-slate-950 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Q2. 이 위인에게서 배우고 싶은 ‘나만의 슈퍼 파워(핵심 역량)’는?
            </label>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-bold">
              {figure.name}의 대표 파워: <strong className="text-indigo-600 dark:text-indigo-400 font-black">「{figure.superPower}」</strong>
            </p>
            {/* Tag selector */}
            <div className="flex flex-wrap gap-2">
              {SUPER_POWER_TAGS.map((tag) => {
                const isSelected = learnedSuperPower === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setLearnedSuperPower(tag);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer border-2 ${
                      isSelected
                        ? 'bg-amber-500 text-white border-amber-600 shadow-sm ring-2 ring-amber-300'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="inline w-3.5 h-3.5 mr-1" />}
                    ✨ {tag}
                  </button>
                );
              })}
            </div>
            <input
              id="input-custom-power"
              type="text"
              value={customSuperPowerText}
              onChange={(e) => setCustomSuperPowerText(e.target.value)}
              placeholder="직접 입력하고 싶다면 여기에 적어주세요 (예: 어려움에 굴하지 않는 밝은 웃음)"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-slate-950 dark:text-white font-bold text-xs sm:text-sm focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400 shadow-xs"
            />
          </div>

          {/* Q3. 10 Years Later My Contribution & Future Slogan */}
          <div className="space-y-2.5">
            <label className="block text-sm sm:text-base font-black text-slate-950 dark:text-white flex items-center gap-1.5">
              <Lightbulb className="w-5 h-5 text-emerald-500" />
              Q3. 10년 후, 나는 세상에 어떤 도움을 주는 멋진 사람이 되고 싶나요? (나의 꿈과 다짐)
            </label>
            <textarea
              id="textarea-future-contribution"
              value={myFutureContribution}
              onChange={(e) => setMyFutureContribution(e.target.value)}
              rows={3}
              placeholder="예: 10년 후 저는 아픈 사람들의 마음을 따뜻하게 위로해 주는 의사가 되어, 마리 퀴리처럼 새로운 치료법을 연구하여 많은 사람에게 희망을 선물하고 싶습니다!"
              className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-slate-950 dark:text-white font-bold text-sm sm:text-base focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 outline-none leading-relaxed placeholder:text-slate-500 dark:placeholder:text-slate-400 shadow-xs"
              required
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex justify-end">
            <button
              id="btn-go-to-avatar-builder"
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-base shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              10년 후 나의 미래 캐릭터 꾸미러 가기
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
