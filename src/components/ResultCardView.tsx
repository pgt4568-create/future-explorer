import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { FutureCardData, Figure } from '../types';
import { AvatarCanvas } from './AvatarCanvas';
import { soundManager } from '../utils/audio';
import { Download, Printer, Share2, ArrowLeft, Sparkles, Check, Bookmark, BookOpen, Award } from 'lucide-react';

interface ResultCardViewProps {
  card: FutureCardData;
  figure: Figure;
  onExploreAnother: () => void;
  onGoToGallery: () => void;
}

export const ResultCardView: React.FC<ResultCardViewProps> = ({
  card,
  figure,
  onExploreAnother,
  onGoToGallery,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'card' | 'report'>('card');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Save to localStorage collection on load
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('my_future_cards');
      const list: FutureCardData[] = stored ? JSON.parse(stored) : [];
      const exists = list.some((item) => item.id === card.id);
      if (!exists) {
        list.unshift(card);
        localStorage.setItem('my_future_cards', JSON.stringify(list));
      }
      setSavedSuccess(true);
    } catch {
      // Ignore localStorage errors
    }
  }, [card]);

  // Download Card as PNG
  const handleDownloadCardPng = async () => {
    if (!cardRef.current) return;
    try {
      soundManager.playClick();
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `${card.studentName}_${card.targetYear}년_미래명함_${card.futureJob}.png`;
      link.href = dataUrl;
      link.click();
      soundManager.playBadgeSparkle();
    } catch (err) {
      console.error('PNG export failed:', err);
      alert('이미지 생성에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsExporting(false);
    }
  };

  // Download 1-Page Comprehensive Report as PDF
  const handleDownloadReportPdf = async () => {
    if (!reportRef.current) return;
    try {
      soundManager.playClick();
      setIsExporting(true);
      const dataUrl = await toPng(reportRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width
      const imgHeight = 297; // A4 height

      pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${card.studentName}_${figure.name}_진로탐험보고서.pdf`);
      soundManager.playBadgeSparkle();
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF 생성에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsExporting(false);
    }
  };

  // Print directly
  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  // Share link
  const handleShare = async () => {
    soundManager.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `[위인과 함께하는 나의 미래 탐험대] ${card.studentName}의 10년 후 미래 카드`,
          text: `저는 ${figure.name}의 인생게임을 완료하고 ${card.targetYear}년 ${card.futureJob}의 꿈을 세웠어요!`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="result-card-view" className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Top Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={() => {
            soundManager.playClick();
            onExploreAnother();
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-black text-sm hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          다른 위인 탐험하기
        </button>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('card');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === 'card'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            10년 후 미래 명함
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('report');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === 'report'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            진로 탐험 종합 보고서
          </button>
        </div>

        {/* Gallery button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onGoToGallery();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-all"
        >
          <Bookmark className="w-4 h-4" />
          내 보관함 보기
        </button>
      </div>

      {/* Main Preview Area */}
      <div className="space-y-6">
        {activeTab === 'card' && (
          <div className="flex flex-col items-center">
            {/* Downloadable Business Card Canvas */}
            <motion.div
              ref={cardRef}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-indigo-500/40 relative overflow-hidden"
            >
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-indigo-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{figure.avatarIcon}</span>
                  <div>
                    <div className="text-2xs font-extrabold tracking-widest text-amber-300 uppercase">
                      FUTURE CAREER EXPLORER
                    </div>
                    <div className="text-xs font-bold text-slate-300">
                      {figure.name}의 정신을 잇는 미래 인재
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs rounded-full shadow">
                    {card.targetYear}년 비전
                  </span>
                </div>
              </div>

              {/* Card Main Body */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                {/* Left: Avatar */}
                <div className="sm:col-span-5 flex justify-center">
                  <div className="relative p-1 bg-gradient-to-b from-indigo-400 to-purple-600 rounded-2xl shadow-lg">
                    <AvatarCanvas avatar={card.avatar} size={180} className="rounded-xl" />
                  </div>
                </div>

                {/* Right: Info */}
                <div className="sm:col-span-7 space-y-2.5 text-center sm:text-left">
                  <div>
                    <div className="text-xs font-bold text-indigo-300">
                      {card.gradeClass || '대한민국 꿈나무'}
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      {card.studentName}
                    </h2>
                  </div>

                  <div className="inline-block px-3 py-1 bg-indigo-500/30 rounded-xl border border-indigo-400/40 text-xs font-black text-amber-300">
                    {card.futureJob}
                  </div>

                  <p className="text-xs text-slate-200 italic font-medium leading-relaxed bg-black/30 p-2.5 rounded-xl border border-white/10">
                    "{card.slogan}"
                  </p>

                  <div className="pt-1 flex items-center justify-center sm:justify-start gap-1.5 text-2xs text-slate-400 font-bold">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    핵심 슈퍼 파워: <span className="text-amber-200 font-black">{card.superPower}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-indigo-500/20 flex items-center justify-between text-2xs text-slate-400 font-medium">
                <span>발급일자: {card.createdAt}</span>
                <span className="text-indigo-400 font-bold">위인과 함께하는 나의 미래 탐험대</span>
              </div>
            </motion.div>

            {/* Action Buttons for Card */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                id="btn-download-card-png"
                onClick={handleDownloadCardPng}
                disabled={isExporting}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                {isExporting ? '이미지 만드는 중...' : '미래 명함 이미지 저장 (PNG)'}
              </button>

              <button
                onClick={handleShare}
                className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-extrabold text-sm hover:bg-slate-50 transition-all flex items-center gap-2 active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                {copied ? '링크 복사 완료!' : '친구들에게 공유하기'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Printable 1-Page Report */}
        {activeTab === 'report' && (
          <div className="flex flex-col items-center">
            {/* Printable Report Sheet */}
            <div
              ref={reportRef}
              className="w-full max-w-2xl bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-300 space-y-5"
              style={{ minHeight: '800px' }}
            >
              {/* Official Header */}
              <div className="text-center pb-4 border-b-2 border-slate-800">
                <div className="text-xs font-black tracking-widest text-indigo-700 mb-1">
                  [ 진로 교육 활동 결과 보고서 ]
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  위인과 함께하는 나의 미래 탐험 학습지
                </h1>
              </div>

              {/* Student Meta Table */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-300 text-xs">
                <div>
                  <strong className="text-slate-600">학교/학급:</strong> {card.gradeClass || '초등학교'}
                </div>
                <div>
                  <strong className="text-slate-600">이름:</strong> <span className="font-bold text-indigo-900">{card.studentName}</span>
                </div>
                <div className="text-right">
                  <strong className="text-slate-600">탐험일:</strong> {card.createdAt}
                </div>
              </div>

              {/* 1. Explored Figure Info */}
              <div className="space-y-1.5 p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-200 text-xs">
                <div className="font-black text-indigo-900 text-sm flex items-center gap-1.5">
                  <span>{figure.avatarIcon}</span>
                  1. 내가 탐험한 위인: {figure.name} ({figure.era})
                </div>
                <div className="text-slate-700 leading-relaxed font-medium">
                  • <strong>역할 및 분야:</strong> {figure.role}
                </div>
                <div className="text-slate-700 leading-relaxed font-medium">
                  • <strong>대표 명언:</strong> "{figure.motto}"
                </div>
              </div>

              {/* 2. Reflection Section */}
              <div className="space-y-3">
                <div className="font-black text-slate-900 text-sm border-b pb-1">
                  2. 나의 진로 성찰 워크시트
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-slate-800">
                    Q1. 가장 기억에 남는 위인의 장면:
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                    {card.reflection.mostImpressiveScene}
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-slate-800">
                    Q2. 위인에게서 전수받은 슈퍼 파워:
                  </div>
                  <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 font-extrabold">
                    ✨ 「{card.superPower}」
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-slate-800">
                    Q3. 10년 후 세상에 도움을 주는 나의 꿈과 다짐:
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 font-medium leading-relaxed">
                    {card.reflection.myFutureContribution}
                  </div>
                </div>
              </div>

              {/* 3. 10-Year Future Avatar & Vision */}
              <div className="pt-2">
                <div className="font-black text-slate-900 text-sm border-b pb-1 mb-3">
                  3. 10년 후 나의 미래 모습 ({card.targetYear}년)
                </div>

                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-300">
                  <AvatarCanvas avatar={card.avatar} size={110} className="flex-shrink-0" />
                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="font-bold text-slate-600">미래의 직업:</span>{' '}
                      <strong className="text-sm font-black text-indigo-700">{card.futureJob}</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600">나의 슬로건:</span>{' '}
                      <span className="italic font-bold text-slate-800">"{card.slogan}"</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Teacher / Parent Stamp Seal */}
              <div className="pt-2 flex items-center justify-between bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 text-xs">
                <div className="space-y-0.5">
                  <div className="font-black text-emerald-900">
                    ⭐ 선생님 / 부모님의 칭찬 한마디 & 격려 도장
                  </div>
                  <div className="text-emerald-700 font-medium">
                    {figure.name}처럼 멋진 꿈을 향해 꿋꿋하게 도전하는 {card.studentName} 어린이를 응원합니다!
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-400 bg-white flex flex-col items-center justify-center text-2xs text-emerald-700 font-extrabold flex-shrink-0 shadow-inner">
                  <span>참 잘했어요</span>
                  <span className="text-base">💮</span>
                </div>
              </div>
            </div>

            {/* Action Buttons for Report */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                id="btn-download-report-pdf"
                onClick={handleDownloadReportPdf}
                disabled={isExporting}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                {isExporting ? 'PDF 생성 중...' : '1장짜리 진로 학습지 PDF 다운로드'}
              </button>

              <button
                onClick={handlePrint}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-sm shadow-sm flex items-center gap-2 active:scale-95 transition-all"
              >
                <Printer className="w-4 h-4" />
                바로 인쇄하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
