import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Figure, ReflectionData, AvatarConfig, FutureCardData } from '../types';
import { AvatarCanvas } from './AvatarCanvas';
import { WhiteboardStudio } from './WhiteboardStudio';
import { soundManager } from '../utils/audio';
import {
  Sparkles,
  Palette,
  Shirt,
  Wand2,
  ArrowLeft,
  Briefcase,
  Smile,
  Image as ImageIcon,
  Check,
  Pencil,
  SlidersHorizontal,
} from 'lucide-react';

interface AvatarBuilderViewProps {
  figure: Figure;
  reflection: ReflectionData;
  studentName: string;
  gradeClass: string;
  onBackToReflection: () => void;
  onCompleteCard: (card: FutureCardData) => void;
}

const SKIN_TONES = [
  { id: '#FFE0BD', name: '밝은 피부', color: '#FFE0BD' },
  { id: '#FFCD94', name: '자연스러운 피부', color: '#FFCD94' },
  { id: '#EAC086', name: '건강한 피부', color: '#EAC086' },
  { id: '#8D5524', name: '짙은 피부', color: '#8D5524' },
];

const HAIR_STYLES = [
  { id: 'short', name: '단정한 숏컷', icon: '👦' },
  { id: 'bob', name: '단발머리', icon: '👧' },
  { id: 'long', name: '긴 생머리', icon: '👩' },
  { id: 'curly', name: '볼륨 펌', icon: '🧑‍🦱' },
  { id: 'undercut', name: '투블럭컷', icon: '💇' },
  { id: 'pigtails', name: '양갈래 묶음', icon: '🎀' },
];

const HAIR_COLORS = [
  { id: '#3b2f2f', name: '자연 흑발', color: '#3b2f2f' },
  { id: '#78350f', name: '초코 브라운', color: '#78350f' },
  { id: '#b45309', name: '골드 브라운', color: '#b45309' },
  { id: '#db2777', name: '핑크 틴트', color: '#db2777' },
  { id: '#2563eb', name: '오션 블루', color: '#2563eb' },
];

const EYE_EXPRESSIONS = [
  { id: 'happy', name: '활짝 웃는 눈', label: '^_^' },
  { id: 'sparkle', name: '초롱초롱 별빛눈', label: '★_★' },
  { id: 'determined', name: '자신만만한 눈', label: 'ò_ó' },
  { id: 'wink', name: '깜찍 윙크', label: '^_-' },
];

const MOUTH_EXPRESSIONS = [
  { id: 'smile', name: '따뜻한 미소' },
  { id: 'open_smile', name: '활짝 웃음' },
  { id: 'confident', name: '당당한 미소' },
];

const GLASSES_OPTIONS = [
  { id: 'none', name: '안경 없음' },
  { id: 'round', name: '동글이 안경' },
  { id: 'smart', name: '스마트 사각안경' },
];

const OUTFITS = [
  { id: 'scientist', name: '미래 과학자 연구 가운', icon: '🔬', color: '#6366F1' },
  { id: 'doctor', name: '생명을 살리는 의사 가운', icon: '🩺', color: '#14B8A6' },
  { id: 'soccer', name: '국가대표 스포츠 유니폼', icon: '⚽', color: '#3B82F6' },
  { id: 'artist', name: '창의적인 예술가 멜빵', icon: '🎨', color: '#EC4899' },
  { id: 'mc', name: '신뢰의 방송인 멋진 정장', icon: '🎤', color: '#10B981' },
  { id: 'astronaut', name: '첨단 우주비행사 수트', icon: '🚀', color: '#8B5CF6' },
  { id: 'chef', name: '맛을 창조하는 셰프복', icon: '🍳', color: '#EF4444' },
  { id: 'hanbok', name: '품격 있는 왕실 한복', icon: '👑', color: '#DC2626' },
];

const PROPS = [
  { id: 'tablet', name: '스마트 태블릿', icon: '📱' },
  { id: 'flask', name: '신비의 실험 플라스크', icon: '🧪' },
  { id: 'soccer', name: '월드 매치 축구공', icon: '⚽' },
  { id: 'mic', name: '골든 마이크', icon: '🎤' },
  { id: 'palette', name: '컬러풀 팔레트 & 붓', icon: '🎨' },
  { id: 'trophy', name: '챔피언 황금 트로피', icon: '🏆' },
];

const BACKGROUNDS = [
  { id: 'lab', name: '첨단 미래 연구실', icon: '🔬' },
  { id: 'stadium', name: '열광의 축구 경기장', icon: '⚽' },
  { id: 'studio', name: '화려한 방송 스튜디오', icon: '🎤' },
  { id: 'space', name: '신비로운 은하수 우주', icon: '🚀' },
  { id: 'nature', name: '푸른 자연과 숲', icon: '🌿' },
  { id: 'whiteboard', name: '깨끗한 화이트보드', icon: '⬜' },
  { id: 'classroom', name: '꿈을 키우는 교실', icon: '📚' },
];

export const AvatarBuilderView: React.FC<AvatarBuilderViewProps> = ({
  figure,
  reflection,
  studentName,
  gradeClass,
  onBackToReflection,
  onCompleteCard,
}) => {
  const [editorMode, setEditorMode] = useState<'whiteboard' | 'avatar'>('whiteboard');
  const [activeTab, setActiveTab] = useState<'hair' | 'face' | 'outfit' | 'prop' | 'bg' | 'profile'>('hair');

  const [avatar, setAvatar] = useState<AvatarConfig>({
    gender: 'neutral',
    skinTone: '#FFE0BD',
    hairStyle: 'short',
    hairColor: '#3b2f2f',
    eyeExpression: 'sparkle',
    mouthExpression: 'open_smile',
    glasses: 'none',
    outfit: 'scientist',
    prop: 'tablet',
    background: 'whiteboard',
    showBaseCharacter: false, // Starts as clean blank whiteboard canvas
    badge: figure.avatarIcon,
    canvasItems: [],
    drawings: '',
  });

  const [futureJob, setFutureJob] = useState<string>('인공지능 로봇 과학자');
  const [slogan, setSlogan] = useState<string>(
    `${figure.name}처럼 포기하지 않고 세상을 이롭게 만들자!`
  );
  const [targetYear, setTargetYear] = useState<number>(2036);

  const updateAvatar = (key: keyof AvatarConfig, value: any) => {
    soundManager.playClick();
    setAvatar((prev) => ({ ...prev, [key]: value }));
  };

  const handleFinish = () => {
    soundManager.playFanfare();
    const cardData: FutureCardData = {
      id: `card_${Date.now()}`,
      figureId: figure.id,
      figureName: figure.name,
      studentName: studentName || '꿈나무',
      gradeClass: gradeClass || '초등학교',
      targetYear,
      futureJob: futureJob || '미래 리더',
      slogan: slogan || `${figure.name}의 정신을 이어받은 멋진 리더!`,
      superPower: reflection.customSuperPowerText || reflection.learnedSuperPower || figure.superPower,
      reflection,
      avatar,
      createdAt: new Date().toLocaleDateString('ko-KR'),
    };

    onCompleteCard(cardData);
  };

  return (
    <div id="avatar-builder-view" className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Top Breadcrumb & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <button
          onClick={() => {
            soundManager.playClick();
            onBackToReflection();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-slate-100 font-black text-sm hover:bg-slate-50 transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          성찰 워크시트로
        </button>

        {/* Mode Selector (Whiteboard Drawing vs Avatar Dress-up) */}
        <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-800 rounded-2xl border-2 border-slate-300 dark:border-slate-700">
          <button
            onClick={() => {
              soundManager.playClick();
              setEditorMode('whiteboard');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              editorMode === 'whiteboard'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-800 dark:text-slate-200 hover:text-indigo-600'
            }`}
          >
            <Pencil className="w-4 h-4" />
            화이트보드 그리기 & 자유 배치
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setEditorMode('avatar');
              if (avatar.showBaseCharacter === false) {
                setAvatar((prev) => ({
                  ...prev,
                  showBaseCharacter: true,
                  background: prev.background === 'whiteboard' ? 'lab' : prev.background,
                }));
              }
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              editorMode === 'avatar'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-800 dark:text-slate-200 hover:text-indigo-600'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            캐릭터 옷입히기 템플릿
          </button>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border-2 border-purple-300 dark:border-purple-800">
          <span className="text-base">✨</span>
          <span className="font-black text-xs sm:text-sm text-purple-950 dark:text-purple-200">
            10년 후 나의 미래 모습 만들기
          </span>
        </div>
      </div>

      {/* MODE 1: WHITEBOARD & FREE ITEM PLACEMENT STUDIO */}
      {editorMode === 'whiteboard' && (
        <div className="space-y-6">
          <WhiteboardStudio
            avatar={avatar}
            onChangeAvatar={setAvatar}
            figureName={figure.name}
          />

          {/* Profile & Slogan Section for Whiteboard */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-xl border-2 border-slate-300 dark:border-slate-700">
            <h3 className="text-sm font-black text-slate-950 dark:text-white mb-3 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              10년 후 미래 프로필 & 슬로건 입력
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">
                  목표 년도
                </label>
                <div className="flex gap-1.5">
                  {[2034, 2035, 2036, 2037, 2038].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTargetYear(yr)}
                      className={`flex-1 py-2 rounded-xl text-xs font-black border cursor-pointer ${
                        targetYear === yr
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {yr}년
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">
                  10년 후 꿈꾸는 역할 / 직업
                </label>
                <input
                  type="text"
                  value={futureJob}
                  onChange={(e) => setFutureJob(e.target.value)}
                  placeholder="예: 지혜로운 생명과학자"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-xs sm:text-sm font-bold text-slate-950 dark:text-white outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">
                  나만의 미래 좌우명 / 슬로건
                </label>
                <input
                  type="text"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  placeholder="예: 포기하지 않고 세상을 이롭게 만들자!"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-xs sm:text-sm font-bold text-slate-950 dark:text-white outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            {/* Complete Card Button */}
            <div className="mt-5 text-center">
              <button
                id="btn-finish-from-whiteboard"
                onClick={handleFinish}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-black text-base shadow-xl flex items-center justify-center gap-2 mx-auto active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                진로 카드 & 리포트 완성하기!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: CLASSIC AVATAR BUILDER TEMPLATE */}
      {editorMode === 'avatar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side: Avatar Live Preview & Mini Card info */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-xl border-2 border-slate-300 dark:border-slate-700 flex flex-col items-center sticky top-4">
              <div className="w-full flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                  10년 후 내 모습 (미리보기)
                </span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/80 text-amber-950 dark:text-amber-100 border border-amber-300">
                  {targetYear}년 ({studentName || '나'})
                </span>
              </div>

              {/* Avatar SVG Render */}
              <div className="relative group">
                <AvatarCanvas avatar={avatar} size={280} className="shadow-xl" />
                {/* Inherited Badge Icon */}
                <div
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 dark:bg-slate-900/95 shadow-md flex items-center justify-center text-xl border-2 border-amber-400"
                  title={`전수받은 슈퍼 파워: ${figure.superPower}`}
                >
                  {figure.avatarIcon}
                </div>
              </div>

              {/* Profile Info Summary Box */}
              <div className="w-full mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-center">
                <div className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                  {futureJob || '꿈을 향해 달리는 미래 리더'}
                </div>
                <div className="text-xs text-slate-950 dark:text-slate-100 font-bold mt-1 line-clamp-2 italic">
                  "{slogan}"
                </div>
                <div className="mt-2 text-xs text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  슈퍼 파워: {reflection.customSuperPowerText || reflection.learnedSuperPower || figure.superPower}
                </div>
              </div>

              {/* Finish Action Button */}
              <button
                id="btn-generate-future-card"
                onClick={handleFinish}
                className="w-full mt-4 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-black text-base shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                진로 카드 & 리포트 완성!
              </button>
            </div>
          </div>

          {/* Right Side: Customization Studio Tabs & Controls */}
          <div className="lg:col-span-7 space-y-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border-2 border-slate-300 dark:border-slate-700">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('hair');
                }}
                className={`flex-1 min-w-[70px] py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'hair'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm border border-slate-200 dark:border-slate-600'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                헤어·피부
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('face');
                }}
                className={`flex-1 min-w-[70px] py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'face'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm border border-slate-200 dark:border-slate-600'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950'
                }`}
              >
                <Smile className="w-3.5 h-3.5" />
                표정·안경
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('outfit');
                }}
                className={`flex-1 min-w-[70px] py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'outfit'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm border border-slate-200 dark:border-slate-600'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950'
                }`}
              >
                <Shirt className="w-3.5 h-3.5" />
                직업의상
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('prop');
                }}
                className={`flex-1 min-w-[70px] py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'prop'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm border border-slate-200 dark:border-slate-600'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                소품아이템
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('bg');
                }}
                className={`flex-1 min-w-[70px] py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'bg'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm border border-slate-200 dark:border-slate-600'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                꿈의배경
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('profile');
                }}
                className={`flex-1 min-w-[70px] py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm border border-slate-200 dark:border-slate-600'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                명함정보
              </button>
            </div>

            {/* Tab Content Box */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-xl border-2 border-slate-300 dark:border-slate-700 min-h-[360px]">
              {/* TAB 1: Hair & Skin */}
              {activeTab === 'hair' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 mb-2">
                      피부 톤 선택
                    </h4>
                    <div className="flex gap-3">
                      {SKIN_TONES.map((tone) => (
                        <button
                          key={tone.id}
                          onClick={() => updateAvatar('skinTone', tone.id)}
                          className={`w-10 h-10 rounded-full border-2 transition-transform cursor-pointer ${
                            avatar.skinTone === tone.id
                              ? 'scale-110 border-indigo-600 ring-2 ring-indigo-400'
                              : 'border-slate-300 dark:border-slate-600 hover:scale-105'
                          }`}
                          style={{ backgroundColor: tone.color }}
                          title={tone.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 mb-2">
                      헤어스타일
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {HAIR_STYLES.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => updateAvatar('hairStyle', style.id)}
                          className={`p-3 rounded-2xl border-2 text-left flex items-center gap-2 transition-all cursor-pointer ${
                            avatar.hairStyle === style.id
                              ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 font-black text-indigo-950 dark:text-indigo-200'
                              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-900 dark:text-slate-200'
                          }`}
                        >
                          <span className="text-xl">{style.icon}</span>
                          <span className="text-xs font-black">{style.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 mb-2">
                      헤어 컬러
                    </h4>
                    <div className="flex gap-3">
                      {HAIR_COLORS.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => updateAvatar('hairColor', color.id)}
                          className={`w-10 h-10 rounded-full border-2 transition-transform cursor-pointer ${
                            avatar.hairColor === color.id
                              ? 'scale-110 border-indigo-600 ring-2 ring-indigo-400'
                              : 'border-slate-300 dark:border-slate-600 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.color }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Face & Expressions */}
              {activeTab === 'face' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 mb-2">
                      눈빛 & 표정
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {EYE_EXPRESSIONS.map((eye) => (
                        <button
                          key={eye.id}
                          onClick={() => updateAvatar('eyeExpression', eye.id)}
                          className={`p-3 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                            avatar.eyeExpression === eye.id
                              ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-200 font-black'
                              : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200'
                          }`}
                        >
                          <span className="text-xs font-black">{eye.name}</span>
                          <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded font-black">
                            {eye.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 mb-2">
                      입 모양
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {MOUTH_EXPRESSIONS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => updateAvatar('mouthExpression', m.id)}
                          className={`p-2.5 rounded-xl border-2 text-center text-xs font-black transition-all cursor-pointer ${
                            avatar.mouthExpression === m.id
                              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-200'
                              : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200'
                          }`}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 mb-2">
                      안경 스타일
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {GLASSES_OPTIONS.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => updateAvatar('glasses', g.id)}
                          className={`p-2.5 rounded-xl border-2 text-center text-xs font-black transition-all cursor-pointer ${
                            avatar.glasses === g.id
                              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-950 dark:text-indigo-200'
                              : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200'
                          }`}
                        >
                          {g.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Outfits */}
              {activeTab === 'outfit' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-900 dark:text-slate-100">
                    미래의 나를 상징하는 멋진 직업 의상을 골라보세요!
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {OUTFITS.map((out) => {
                      const isSelected = avatar.outfit === out.id;
                      return (
                        <button
                          key={out.id}
                          onClick={() => {
                            updateAvatar('outfit', out.id);
                            if (out.id === 'scientist') setFutureJob('인공지능 생명과학 연구원');
                            if (out.id === 'doctor') setFutureJob('소아청소년과 전문의');
                            if (out.id === 'soccer') setFutureJob('국가대표 축구 에이스');
                            if (out.id === 'artist') setFutureJob('글로벌 애니메이션 감독');
                            if (out.id === 'mc') setFutureJob('국민 방송인 & MC');
                            if (out.id === 'astronaut') setFutureJob('우주 탐사 대장');
                            if (out.id === 'chef') setFutureJob('미슐랭 스타 수석 셰프');
                            if (out.id === 'hanbok') setFutureJob('전통 문화 크리에이터');
                          }}
                          className={`p-3 rounded-2xl border-2 text-left flex items-center gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 shadow-sm'
                              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400'
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                            style={{ backgroundColor: `${out.color}20`, color: out.color }}
                          >
                            {out.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-black text-slate-950 dark:text-white">
                              {out.name}
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: Props */}
              {activeTab === 'prop' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-900 dark:text-slate-100">
                    손에 들거나 함께할 아이템 소품을 선택하세요!
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {PROPS.map((p) => {
                      const isSelected = avatar.prop === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => updateAvatar('prop', p.id)}
                          className={`p-3.5 rounded-2xl border-2 text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 shadow-sm font-black'
                              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400'
                          }`}
                        >
                          <span className="text-2xl">{p.icon}</span>
                          <span className="text-xs font-black text-slate-950 dark:text-slate-100">
                            {p.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 5: Backgrounds */}
              {activeTab === 'bg' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-900 dark:text-slate-100">
                    내가 활약할 미래의 멋진 무대(배경)를 선택하세요!
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {BACKGROUNDS.map((b) => {
                      const isSelected = avatar.background === b.id;
                      return (
                        <button
                          key={b.id}
                          onClick={() => updateAvatar('background', b.id)}
                          className={`p-3.5 rounded-2xl border-2 text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 shadow-sm font-black'
                              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400'
                          }`}
                        >
                          <span className="text-2xl">{b.icon}</span>
                          <span className="text-xs font-black text-slate-950 dark:text-slate-100">
                            {b.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 6: Profile & Slogan */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">
                      목표 년도 (10년 후)
                    </label>
                    <div className="flex items-center gap-2">
                      {[2034, 2035, 2036, 2037, 2038].map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setTargetYear(yr)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer ${
                            targetYear === yr
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-200'
                          }`}
                        >
                          {yr}년
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">
                      10년 후 나의 직업 / 꿈꾸는 역할
                    </label>
                    <input
                      type="text"
                      value={futureJob}
                      onChange={(e) => setFutureJob(e.target.value)}
                      placeholder="예: 따뜻한 로봇 공학자"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-sm font-bold text-slate-950 dark:text-white outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">
                      나만의 슬로건 / 좌우명
                    </label>
                    <input
                      type="text"
                      value={slogan}
                      onChange={(e) => setSlogan(e.target.value)}
                      placeholder="예: 끈기와 호기심으로 어두운 곳을 밝히는 사람이 되자!"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-sm font-bold text-slate-950 dark:text-white outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/60 p-4 rounded-2xl border-2 border-amber-300 dark:border-amber-700 text-xs text-amber-950 dark:text-amber-100">
                    <strong className="font-black">💡 {figure.name}에게 전수받은 슈퍼 파워:</strong>
                    <div className="font-black text-sm mt-0.5 text-indigo-700 dark:text-indigo-300">
                      「{reflection.customSuperPowerText || reflection.learnedSuperPower || figure.superPower}」
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
