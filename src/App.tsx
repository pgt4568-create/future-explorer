import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView, Figure, ReflectionData, FutureCardData } from './types';
import { HISTORICAL_FIGURES } from './data/figuresData';
import { FigureSelectView } from './components/FigureSelectView';
import { LifeGameView } from './components/LifeGameView';
import { ReflectionView } from './components/ReflectionView';
import { AvatarBuilderView } from './components/AvatarBuilderView';
import { ResultCardView } from './components/ResultCardView';
import { GalleryView } from './components/GalleryView';
import { soundManager } from './utils/audio';
import { Compass, Sparkles, Volume2, VolumeX, Bookmark, Home, User } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('figure_select');
  const [selectedFigure, setSelectedFigure] = useState<Figure | null>(null);
  const [reflectionData, setReflectionData] = useState<ReflectionData | null>(null);
  const [futureCardData, setFutureCardData] = useState<FutureCardData | null>(null);
  const [studentName, setStudentName] = useState<string>('');
  const [gradeClass, setGradeClass] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Load saved student profile from localStorage if any
  useEffect(() => {
    try {
      const savedName = localStorage.getItem('student_name');
      const savedGrade = localStorage.getItem('student_grade_class');
      if (savedName) setStudentName(savedName);
      if (savedGrade) setGradeClass(savedGrade);
    } catch {
      // ignore
    }
  }, []);

  const handleUpdateStudentInfo = (name: string, cls: string) => {
    setStudentName(name);
    setGradeClass(cls);
    try {
      localStorage.setItem('student_name', name);
      localStorage.setItem('student_grade_class', cls);
    } catch {
      // ignore
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.setEnabled(next);
    if (next) soundManager.playClick();
  };

  // Flow handlers
  const handleSelectFigure = (figure: Figure) => {
    setSelectedFigure(figure);
    setCurrentView('life_game');
  };

  const handleCompleteGame = (figure: Figure) => {
    setSelectedFigure(figure);
    setCurrentView('reflection');
  };

  const handleSubmitReflection = (data: ReflectionData) => {
    setReflectionData(data);
    setCurrentView('avatar_builder');
  };

  const handleCompleteCard = (card: FutureCardData) => {
    setFutureCardData(card);
    setCurrentView('result_card');
  };

  const handleSelectExistingCard = (card: FutureCardData, figure: Figure) => {
    setSelectedFigure(figure);
    setFutureCardData(card);
    setCurrentView('result_card');
  };

  const handleGoHome = () => {
    soundManager.playClick();
    setCurrentView('figure_select');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">
      {/* Global Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo / Home link */}
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2.5 group text-left cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 dark:shadow-none group-hover:rotate-6 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 tracking-wider">
                초등 진로 인생게임
              </div>
              <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-none">
                나의 미래 탐험대
              </div>
            </div>
          </button>

          {/* Current Process Stepper (if in game flow) */}
          {currentView !== 'figure_select' && currentView !== 'gallery' && selectedFigure && (
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-black">
              <span className={`px-2 py-0.5 rounded-md ${currentView === 'life_game' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>
                1. 인생게임
              </span>
              <span className="text-slate-300">→</span>
              <span className={`px-2 py-0.5 rounded-md ${currentView === 'reflection' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>
                2. 성찰 워크시트
              </span>
              <span className="text-slate-300">→</span>
              <span className={`px-2 py-0.5 rounded-md ${currentView === 'avatar_builder' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>
                3. 미래 캐릭터
              </span>
              <span className="text-slate-300">→</span>
              <span className={`px-2 py-0.5 rounded-md ${currentView === 'result_card' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>
                4. 미래 카드
              </span>
            </div>
          )}

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Gallery Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setCurrentView('gallery');
              }}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 ${
                currentView === 'gallery'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
              }`}
              title="내 보관함"
            >
              <Bookmark className="w-4 h-4 text-indigo-500" />
              <span className="hidden sm:inline">내 보관함</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 ${
                soundEnabled
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
              title={soundEnabled ? '효과음 켜짐' : '효과음 꺼짐'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? '소리 ON' : '소리 OFF'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'figure_select' && (
            <motion.div
              key="figure_select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <FigureSelectView
                onSelectFigure={handleSelectFigure}
                onOpenGallery={() => setCurrentView('gallery')}
              />
            </motion.div>
          )}

          {currentView === 'life_game' && selectedFigure && (
            <motion.div
              key={`life_game_${selectedFigure.id}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <LifeGameView
                figure={selectedFigure}
                onBack={() => setCurrentView('figure_select')}
                onCompleteGame={handleCompleteGame}
              />
            </motion.div>
          )}

          {currentView === 'reflection' && selectedFigure && (
            <motion.div
              key={`reflection_${selectedFigure.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <ReflectionView
                figure={selectedFigure}
                initialData={reflectionData || undefined}
                studentName={studentName}
                gradeClass={gradeClass}
                onUpdateStudentInfo={handleUpdateStudentInfo}
                onBackToGame={() => setCurrentView('life_game')}
                onSubmitReflection={handleSubmitReflection}
              />
            </motion.div>
          )}

          {currentView === 'avatar_builder' && selectedFigure && reflectionData && (
            <motion.div
              key="avatar_builder"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <AvatarBuilderView
                figure={selectedFigure}
                reflection={reflectionData}
                studentName={studentName}
                gradeClass={gradeClass}
                onBackToReflection={() => setCurrentView('reflection')}
                onCompleteCard={handleCompleteCard}
              />
            </motion.div>
          )}

          {currentView === 'result_card' && futureCardData && (
            <motion.div
              key="result_card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <ResultCardView
                card={futureCardData}
                figure={selectedFigure || HISTORICAL_FIGURES[0]}
                onExploreAnother={() => setCurrentView('figure_select')}
                onGoToGallery={() => setCurrentView('gallery')}
              />
            </motion.div>
          )}

          {currentView === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <GalleryView
                onBackToSelect={() => setCurrentView('figure_select')}
                onSelectExistingCard={handleSelectExistingCard}
                onStartNewGame={() => setCurrentView('figure_select')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Child-Friendly Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌟</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              위인과 함께하는 나의 미래 탐험대
            </span>
            <span>• 초등학생 맞춤형 진로 교육 웹앱</span>
          </div>
          <div className="text-2xs text-slate-400">
            한국 및 세계 위인 10인의 역사 기반 인생게임 & 10년 후 미래 비전 설계
          </div>
        </div>
      </footer>
    </div>
  );
}
