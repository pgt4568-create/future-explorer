import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Figure, Choice } from '../types';
import { SceneIllustration } from './SceneIllustration';
import { soundManager } from '../utils/audio';
import { speechManager } from '../utils/speech';
import { findDefinitionsInText, WordDefinition } from '../utils/dictionary';
import { Volume2, VolumeX, ArrowLeft, RotateCcw, CheckCircle2, Award, Sparkles, HelpCircle, BookOpen, Bookmark } from 'lucide-react';

interface LifeGameViewProps {
  figure: Figure;
  onBack: () => void;
  onCompleteGame: (figure: Figure) => void;
}

export const LifeGameView: React.FC<LifeGameViewProps> = ({
  figure,
  onBack,
  onCompleteGame,
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showHistoryNote, setShowHistoryNote] = useState<boolean>(false);
  const [showDictModal, setShowDictModal] = useState<boolean>(true);

  const stage = figure.stages[currentStageIndex];
  const totalStages = figure.stages.length;
  const isFinalStage = currentStageIndex === totalStages - 1;

  // Find difficult words in the current stage situation, dialogue, and choices
  const combinedStageText = `${stage.title} ${stage.situation} ${stage.characterDialogue || ''} ${stage.funFact || ''} ${stage.choices.map((c) => c.text).join(' ')}`;
  const stageDefinitions = findDefinitionsInText(combinedStageText);

  useEffect(() => {
    // Reset state on stage change
    setSelectedChoice(null);
    setShowResultModal(false);
    setShowHistoryNote(false);
    speechManager.stop();
    setIsSpeaking(false);
  }, [currentStageIndex, figure.id]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  const handleTTS = () => {
    if (isSpeaking) {
      speechManager.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = `${stage.title}. ${stage.situation} ${stage.characterDialogue || ''}`;
      speechManager.speak(textToRead, () => {
        setIsSpeaking(false);
      });
    }
  };

  const handleSelectChoice = (choice: Choice) => {
    soundManager.playClick();
    speechManager.stop();
    setIsSpeaking(false);
    setSelectedChoice(choice);
    setShowResultModal(true);

    if (choice.isCorrect) {
      soundManager.playCorrect();
      if (isFinalStage) {
        // Grand celebration
        setTimeout(() => {
          soundManager.playFanfare();
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 200);
      }
    } else {
      soundManager.playWrong();
    }
  };

  const handleNextStage = () => {
    soundManager.playClick();
    if (isFinalStage) {
      onCompleteGame(figure);
    } else {
      setCurrentStageIndex((prev) => prev + 1);
    }
  };

  const handleRetryChoice = () => {
    soundManager.playClick();
    setSelectedChoice(null);
    setShowResultModal(false);
  };

  return (
    <div id="life-game-view" className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between mb-4">
        <button
          id="btn-back-to-select"
          onClick={() => {
            soundManager.playClick();
            speechManager.stop();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          위인 목록으로
        </button>

        {/* Figure Mini Tag */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
          <span className="text-xl">{figure.avatarIcon}</span>
          <span className="font-extrabold text-sm text-indigo-900 dark:text-indigo-200">
            {figure.name}의 인생 탐험
          </span>
        </div>

        {/* TTS Button */}
        <button
          id="btn-tts-toggle"
          onClick={handleTTS}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all shadow-sm active:scale-95 ${
            isSpeaking
              ? 'bg-amber-500 text-white animate-pulse'
              : 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100'
          }`}
          title="이야기 소리로 듣기"
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {isSpeaking ? '음성 멈춤' : '이야기 읽어주기'}
        </button>
      </div>

      {/* Progress Step Bar */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-200/80 dark:border-slate-700 mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            성장 여정 진행도
          </span>
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md">
            {currentStageIndex + 1} / {totalStages} 단계 ({stage.period})
          </span>
        </div>
        {/* Step dots */}
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
          {figure.stages.map((st, idx) => {
            const isPassed = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div
                key={st.stageNumber}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  isPassed
                    ? 'bg-emerald-500 shadow-sm shadow-emerald-200 dark:shadow-none'
                    : isCurrent
                    ? 'bg-gradient-to-r from-amber-400 to-indigo-500 ring-2 ring-indigo-400 ring-offset-1 dark:ring-offset-slate-900 animate-pulse'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
                title={`Stage ${st.stageNumber}: ${st.period}`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Game Stage Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200/90 dark:border-slate-700">
        {/* Animated Scene Graphic */}
        <div className="mb-5">
          <SceneIllustration
            illustrationKey={stage.illustrationKey}
            figureId={figure.id}
            stageNumber={stage.stageNumber}
            realPhotoUrl={stage.realPhotoUrl || figure.photoUrl}
            realPhotoDescription={stage.realPhotoDescription}
            fallbackPhotoUrl={figure.photoUrl}
          />
        </div>

        {/* Stage Title & Dialogue Box */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/80 text-amber-950 dark:text-amber-100 rounded-lg text-xs font-black border border-amber-300 dark:border-amber-700">
              {stage.period}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
              {stage.title}
            </h2>
          </div>

          {/* Situation Narrative */}
          <p className="text-sm sm:text-base text-slate-950 dark:text-slate-100 leading-relaxed font-semibold bg-white dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-xs">
            {stage.situation}
          </p>

          {/* Character Voice Quote Bubble */}
          {stage.characterDialogue && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/70 dark:to-purple-950/70 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 shadow-xs"
            >
              <div className="text-3xl flex-shrink-0">{figure.avatarIcon}</div>
              <div className="flex-1">
                <div className="text-xs font-black text-indigo-900 dark:text-indigo-300 mb-0.5">
                  {figure.name}의 한마디:
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-white italic leading-snug">
                  {stage.characterDialogue}
                </div>
              </div>
            </motion.div>
          )}

          {/* Fun Fact Accordion */}
          {stage.funFact && (
            <div className="pt-1">
              <button
                onClick={() => setShowHistoryNote(!showHistoryNote)}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-800 dark:text-amber-300 hover:underline bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                {showHistoryNote ? '역사 돋보기 닫기' : '💡 꿀잼 역사 돋보기 펼쳐보기'}
              </button>
              {showHistoryNote && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 text-xs sm:text-sm bg-amber-50/95 dark:bg-amber-950/60 text-slate-950 dark:text-amber-100 p-4 rounded-xl border-2 border-amber-300 dark:border-amber-700 leading-relaxed font-semibold"
                >
                  {stage.funFact}
                </motion.div>
              )}
            </div>
          )}

          {/* Elementary 1st Grader Friendly Word Helper (어려운 낱말 쏙쏙 풀이) */}
          {stageDefinitions.length > 0 && (
            <div className="pt-1">
              <div className="bg-emerald-50/90 dark:bg-emerald-950/40 p-3.5 rounded-2xl border-2 border-emerald-300 dark:border-emerald-700/80 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-black text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
                    <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    🌱 1학년도 술술 읽히는 쉬운 낱말 풀이 ({stageDefinitions.length}개)
                  </span>
                  <button
                    onClick={() => setShowDictModal(!showDictModal)}
                    className="text-[11px] font-black text-emerald-800 dark:text-emerald-300 hover:underline cursor-pointer bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-emerald-200"
                  >
                    {showDictModal ? '접기' : '모두 보기'}
                  </button>
                </div>

                {showDictModal && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {stageDefinitions.map((item) => (
                      <div
                        key={item.word}
                        className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-2xs flex items-start gap-2"
                      >
                        <span className="text-xl flex-shrink-0">{item.emoji || '✨'}</span>
                        <div className="flex-1">
                          <div className="font-black text-xs text-slate-900 dark:text-white">
                            {item.word}
                          </div>
                          <div className="text-[11px] text-slate-700 dark:text-slate-200 font-bold leading-tight mt-0.5">
                            {item.simple}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Question Prompt */}
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black rounded-full shadow-md shadow-indigo-300 dark:shadow-none">
            <HelpCircle className="w-4 h-4" />
            내가 {figure.name}이라면 어떤 선택을 할까요?
          </span>
        </div>

        {/* Choice Buttons */}
        <div className="grid grid-cols-1 gap-3">
          {stage.choices.map((choice, index) => (
            <motion.button
              key={choice.id}
              id={`choice-btn-${index + 1}`}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => handleSelectChoice(choice)}
              className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 hover:border-indigo-600 dark:hover:border-indigo-400 bg-white dark:bg-slate-800 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/50 transition-all shadow-xs hover:shadow-md flex items-start gap-3.5 group cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-black text-sm flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-slate-300 dark:border-slate-600">
                {index + 1}
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-950 dark:text-slate-100 group-hover:text-indigo-950 dark:group-hover:text-white leading-snug">
                {choice.text}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Result / Branch Modal */}
      <AnimatePresence>
        {showResultModal && selectedChoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl border-4 ${
                selectedChoice.isCorrect
                  ? 'bg-white dark:bg-slate-900 border-emerald-500'
                  : 'bg-white dark:bg-slate-900 border-amber-500'
              }`}
            >
              {/* Header Icon */}
              <div className="text-center mb-4">
                <span className="text-5xl inline-block animate-bounce">
                  {selectedChoice.isCorrect ? (isFinalStage ? '🏆' : '🎉') : '🤔'}
                </span>
                <h3
                  className={`text-xl font-black mt-2 ${
                    selectedChoice.isCorrect
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {selectedChoice.isCorrect
                    ? isFinalStage
                      ? '인생 탐험 대성공! 위인의 길을 완성했습니다!'
                      : '정답입니다! 실제 역사 속 선택이에요!'
                    : '만약 그랬다면? (가상 분기)'}
                </h3>
              </div>

              {/* Feedback Text */}
              <div
                className={`p-4 rounded-2xl text-sm sm:text-base leading-relaxed font-semibold mb-4 ${
                  selectedChoice.isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 border border-amber-200 dark:border-amber-800'
                }`}
              >
                {selectedChoice.feedback}
              </div>

              {/* Real History Note */}
              {selectedChoice.isCorrect && selectedChoice.historicalNote && (
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-950 dark:text-slate-100 font-medium mb-5">
                  <span className="font-black text-indigo-700 dark:text-indigo-400 block mb-1 text-sm">
                    📜 역사 속 실제 이야기:
                  </span>
                  {selectedChoice.historicalNote}
                </div>
              )}

              {/* If Final Stage Super Power Banner */}
              {selectedChoice.isCorrect && isFinalStage && (
                <div className="bg-gradient-to-r from-amber-100 to-indigo-100 dark:from-amber-950/60 dark:to-indigo-950/60 p-4 rounded-2xl border-2 border-amber-300 dark:border-amber-700 text-center mb-5">
                  <div className="flex items-center justify-center gap-1 text-amber-900 dark:text-amber-300 text-xs font-black mb-1">
                    <Award className="w-4 h-4" />
                    새로운 슈퍼 파워 획득!
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                    「{figure.superPower}」
                  </div>
                  <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-1 font-semibold">
                    {figure.superPowerDescription}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3">
                {!selectedChoice.isCorrect ? (
                  <button
                    id="btn-retry-choice"
                    onClick={handleRetryChoice}
                    className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base shadow-lg shadow-amber-200 dark:shadow-none flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <RotateCcw className="w-5 h-5" />
                    다시 도전하기
                  </button>
                ) : (
                  <button
                    id="btn-next-stage"
                    onClick={handleNextStage}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white font-black text-base shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    {isFinalStage ? (
                      <>
                        <Sparkles className="w-5 h-5" />
                        진로 성찰 워크시트 쓰러 가기
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        다음 단계 ({currentStageIndex + 2}단계)로!
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
