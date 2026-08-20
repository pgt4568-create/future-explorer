import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Pencil,
  Eraser,
  RotateCcw,
  Trash2,
  Plus,
  Minus,
  RotateCw,
  Move,
  Sparkles,
  Layers,
  Palette as PaletteIcon,
  Smile,
  Crown,
  Shirt,
  Briefcase,
  Cat,
  Stamp,
  Sliders,
  Check,
  Undo2,
} from 'lucide-react';
import { AvatarConfig, WhiteboardItem } from '../types';
import { AvatarCanvas } from './AvatarCanvas';
import { soundManager } from '../utils/audio';

interface WhiteboardStudioProps {
  avatar: AvatarConfig;
  onChangeAvatar: (newAvatar: AvatarConfig) => void;
  figureName: string;
}

// Rich item library for freeform placement
const STICKER_LIBRARY: {
  category: 'character' | 'hair' | 'face' | 'outfit' | 'prop' | 'pet' | 'sticker';
  label: string;
  items: { id: string; name: string; icon: string; defaultScale?: number }[];
}[] = [
  {
    category: 'character',
    label: '캐릭터 바디 & 얼굴',
    items: [
      { id: 'c_boy', name: '소년 캐릭터', icon: '👦', defaultScale: 2.2 },
      { id: 'c_girl', name: '소녀 캐릭터', icon: '👧', defaultScale: 2.2 },
      { id: 'c_smile', name: '스마일 얼굴', icon: '😊', defaultScale: 1.8 },
      { id: 'c_cool', name: '자신감 얼굴', icon: '😎', defaultScale: 1.8 },
      { id: 'c_robot', name: '미래 로봇', icon: '🤖', defaultScale: 2.0 },
      { id: 'c_alien', name: '우주 탐험가', icon: '👽', defaultScale: 1.8 },
    ],
  },
  {
    category: 'hair',
    label: '헤어 & 모자',
    items: [
      { id: 'h_crown', name: '조선 왕의 익선관', icon: '👑', defaultScale: 1.4 },
      { id: 'h_helmet', name: '이순신 장군 투구', icon: '🪖', defaultScale: 1.4 },
      { id: 'h_space', name: '우주 헬멧', icon: '🧑‍🚀', defaultScale: 1.4 },
      { id: 'h_chef', name: '마스터 셰프 모자', icon: '👨‍🍳', defaultScale: 1.3 },
      { id: 'h_grad', name: '학사모 (졸업 모자)', icon: '🎓', defaultScale: 1.3 },
      { id: 'h_cap', name: '힙합 캡 모자', icon: '🧢', defaultScale: 1.2 },
      { id: 'h_headset', name: '게이밍 헤드셋', icon: '🎧', defaultScale: 1.2 },
      { id: 'h_ribbon', name: '러블리 리본', icon: '🎀', defaultScale: 1.2 },
      { id: 'h_flower', name: '꽃 화관', icon: '🌸', defaultScale: 1.2 },
      { id: 'h_beret', name: '예술가 베레모', icon: '🎨', defaultScale: 1.2 },
    ],
  },
  {
    category: 'face',
    label: '표정 & 안경',
    items: [
      { id: 'f_glasses', name: '스마트 사각안경', icon: '👓', defaultScale: 1.2 },
      { id: 'f_sun', name: '스타 썬글라스', icon: '🕶️', defaultScale: 1.3 },
      { id: 'f_goggles', name: '과학 연구 고글', icon: '🥽', defaultScale: 1.3 },
      { id: 'f_sparkle', name: '반짝이는 눈빛', icon: '✨', defaultScale: 1.1 },
      { id: 'f_heart_eyes', name: '하트 뿅뿅', icon: '😍', defaultScale: 1.2 },
      { id: 'f_wink', name: '자신감 윙크', icon: '😉', defaultScale: 1.2 },
      { id: 'f_fire', name: '열정의 불꽃 눈빛', icon: '🔥', defaultScale: 1.1 },
      { id: 'f_mask', name: '위생 마스크', icon: '😷', defaultScale: 1.1 },
    ],
  },
  {
    category: 'outfit',
    label: '의상 & 뱃지',
    items: [
      { id: 'o_lab', name: '과학자 가운', icon: '🥼', defaultScale: 1.5 },
      { id: 'o_hanbok', name: '전통 한복', icon: '👘', defaultScale: 1.5 },
      { id: 'o_suit', name: '멋진 정장', icon: '👔', defaultScale: 1.4 },
      { id: 'o_medal', name: '금메달 훈장', icon: '🥇', defaultScale: 1.2 },
      { id: 'o_badge', name: '명예 리더 뱃지', icon: '🎖️', defaultScale: 1.2 },
      { id: 'o_cape', name: '슈퍼히어로 망토', icon: '🦸', defaultScale: 1.4 },
      { id: 'o_apron', name: '디자인 앞치마', icon: '🎨', defaultScale: 1.3 },
    ],
  },
  {
    category: 'prop',
    label: '미래 도구 & 아이템',
    items: [
      { id: 'p_tablet', name: 'AI 홀로그램 태블릿', icon: '📱', defaultScale: 1.1 },
      { id: 'p_flask', name: '라듐 실험 플라스크', icon: '🧪', defaultScale: 1.2 },
      { id: 'p_mic', name: '골든 마이크', icon: '🎤', defaultScale: 1.2 },
      { id: 'p_soccer', name: '월드컵 축구공', icon: '⚽', defaultScale: 1.2 },
      { id: 'p_trophy', name: '골든 부트 트로피', icon: '🏆', defaultScale: 1.3 },
      { id: 'p_palette', name: '마법의 팔레트', icon: '🎨', defaultScale: 1.2 },
      { id: 'p_telescope', name: '우주 망원경', icon: '🔭', defaultScale: 1.3 },
      { id: 'p_microscope', name: '전자 현미경', icon: '🔬', defaultScale: 1.3 },
      { id: 'p_rocket', name: '화성 탐사 로켓', icon: '🚀', defaultScale: 1.3 },
      { id: 'p_lightbulb', name: '반짝이는 발명 전구', icon: '💡', defaultScale: 1.2 },
      { id: 'p_book', name: '훈민정음 책', icon: '📖', defaultScale: 1.2 },
      { id: 'p_plant', name: '신비의 생명 새싹', icon: '🌱', defaultScale: 1.1 },
    ],
  },
  {
    category: 'pet',
    label: '파트너 & 동물 친구',
    items: [
      { id: 'pet_chimp', name: '지혜로운 침팬지', icon: '🐒', defaultScale: 1.3 },
      { id: 'pet_dog', name: '충성스러운 로봇 강아지', icon: '🐶', defaultScale: 1.2 },
      { id: 'pet_cat', name: '우주 고양이', icon: '🐱', defaultScale: 1.2 },
      { id: 'pet_dolphin', name: '푸른 바다 돌고래', icon: '🐬', defaultScale: 1.3 },
      { id: 'pet_turtle', name: '거북선의 상징 거북이', icon: '🐢', defaultScale: 1.2 },
      { id: 'pet_bird', name: '자유의 파랑새', icon: '🕊️', defaultScale: 1.1 },
    ],
  },
  {
    category: 'sticker',
    label: '말풍선 & 꾸미기',
    items: [
      { id: 's_bubble1', name: '2036 나의 꿈!', icon: '💬', defaultScale: 1.4 },
      { id: 's_star', name: '슈퍼스타 별', icon: '⭐', defaultScale: 1.1 },
      { id: 's_rainbow', name: '희망의 무지개', icon: '🌈', defaultScale: 1.4 },
      { id: 's_firework', name: '축하 불꽃놀이', icon: '🎆', defaultScale: 1.3 },
      { id: 's_heart', name: '따뜻한 마음 하트', icon: '💖', defaultScale: 1.1 },
      { id: 's_flag', name: '승리의 깃발', icon: '🚩', defaultScale: 1.2 },
      { id: 's_clover', name: '행운의 네잎클로버', icon: '🍀', defaultScale: 1.1 },
      { id: 's_diamond', name: '빛나는 다이아몬드', icon: '💎', defaultScale: 1.1 },
    ],
  },
];

const DRAWING_COLORS = [
  '#000000', // Black
  '#dc2626', // Red
  '#f97316', // Orange
  '#eab308', // Yellow
  '#16a34a', // Green
  '#2563eb', // Blue
  '#9333ea', // Purple
  '#db2777', // Pink
  '#78350f', // Brown
  '#ffffff', // White
];

export const WhiteboardStudio: React.FC<WhiteboardStudioProps> = ({
  avatar,
  onChangeAvatar,
  figureName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('hair');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Drawing tools state
  const [drawTool, setDrawTool] = useState<'select' | 'pen' | 'highlighter' | 'eraser'>('select');
  const [brushColor, setBrushColor] = useState<string>('#2563eb');
  const [brushWidth, setBrushWidth] = useState<number>(4);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Canvas drawing ref
  const drawingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const whiteboardBoxRef = useRef<HTMLDivElement | null>(null);

  // Dragging item state
  const [isDraggingItem, setIsDraggingItem] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize whiteboard canvas
  useEffect(() => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // If drawing exists in avatar, load it
    if (avatar.drawings) {
      const img = new Image();
      img.src = avatar.drawings;
      img.onload = () => {
        ctx.clearRect(0, 0, 300, 300);
        ctx.drawImage(img, 0, 0, 300, 300);
      };
    }
  }, []);

  const saveCanvasDrawingToAvatar = () => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onChangeAvatar({
      ...avatar,
      drawings: dataUrl,
    });
  };

  // Drawing event handlers
  const handlePointerDownCanvas = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (drawTool === 'select') return;
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 300;
    const y = ((e.clientY - rect.top) / rect.height) * 300;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (drawTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushWidth * 2.5;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (drawTool === 'highlighter') {
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = brushWidth * 3;
      } else {
        ctx.globalAlpha = 1.0;
      }
    }
  };

  const handlePointerMoveCanvas = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || drawTool === 'select') return;
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 300;
    const y = ((e.clientY - rect.top) / rect.height) * 300;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUpCanvas = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.closePath();
    saveCanvasDrawingToAvatar();
  };

  const handleClearDrawing = () => {
    soundManager.playClick();
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, 300, 300);
    onChangeAvatar({
      ...avatar,
      drawings: '',
    });
  };

  // Add Item to Canvas
  const handleAddItem = (item: { id: string; name: string; icon: string; defaultScale?: number }, category: any) => {
    soundManager.playClick();
    const newItem: WhiteboardItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      type: item.id,
      category,
      x: 150 + (Math.random() * 40 - 20),
      y: 150 + (Math.random() * 40 - 20),
      scale: item.defaultScale || 1.0,
      rotation: 0,
      icon: item.icon,
      color: '#000000',
    };

    const updatedItems = [...(avatar.canvasItems || []), newItem];
    onChangeAvatar({
      ...avatar,
      canvasItems: updatedItems,
    });
    setSelectedItemId(newItem.id);
    setDrawTool('select');
  };

  // Select Item
  const handleSelectItem = (id: string, e: React.PointerEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    setSelectedItemId(id);
    setDrawTool('select');

    // Setup dragging
    const item = avatar.canvasItems?.find((it) => it.id === id);
    if (item && whiteboardBoxRef.current) {
      const rect = whiteboardBoxRef.current.getBoundingClientRect();
      const currentX = ((e.clientX - rect.left) / rect.width) * 300;
      const currentY = ((e.clientY - rect.top) / rect.height) * 300;
      setDragOffset({
        x: currentX - item.x,
        y: currentY - item.y,
      });
      setIsDraggingItem(true);
    }
  };

  const handlePointerMoveWhiteboard = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingItem || !selectedItemId || !whiteboardBoxRef.current) return;
    const rect = whiteboardBoxRef.current.getBoundingClientRect();
    const currentX = ((e.clientX - rect.left) / rect.width) * 300;
    const currentY = ((e.clientY - rect.top) / rect.height) * 300;

    const newX = Math.max(10, Math.min(290, currentX - dragOffset.x));
    const newY = Math.max(10, Math.min(290, currentY - dragOffset.y));

    const updated = (avatar.canvasItems || []).map((it) =>
      it.id === selectedItemId ? { ...it, x: Math.round(newX), y: Math.round(newY) } : it
    );
    onChangeAvatar({ ...avatar, canvasItems: updated });
  };

  const handlePointerUpWhiteboard = () => {
    setIsDraggingItem(false);
  };

  // Item Transformations
  const handleUpdateItemScale = (delta: number) => {
    if (!selectedItemId) return;
    soundManager.playClick();
    const updated = (avatar.canvasItems || []).map((it) => {
      if (it.id === selectedItemId) {
        const nextScale = Math.max(0.4, Math.min(2.8, (it.scale || 1) + delta));
        return { ...it, scale: Number(nextScale.toFixed(2)) };
      }
      return it;
    });
    onChangeAvatar({ ...avatar, canvasItems: updated });
  };

  const handleRotateItem = (angle: number) => {
    if (!selectedItemId) return;
    soundManager.playClick();
    const updated = (avatar.canvasItems || []).map((it) => {
      if (it.id === selectedItemId) {
        return { ...it, rotation: ((it.rotation || 0) + angle) % 360 };
      }
      return it;
    });
    onChangeAvatar({ ...avatar, canvasItems: updated });
  };

  const handleDeleteSelectedItem = () => {
    if (!selectedItemId) return;
    soundManager.playClick();
    const updated = (avatar.canvasItems || []).filter((it) => it.id !== selectedItemId);
    onChangeAvatar({ ...avatar, canvasItems: updated });
    setSelectedItemId(null);
  };

  const handleBringToFront = () => {
    if (!selectedItemId) return;
    soundManager.playClick();
    const items = avatar.canvasItems || [];
    const item = items.find((it) => it.id === selectedItemId);
    if (!item) return;
    const rest = items.filter((it) => it.id !== selectedItemId);
    onChangeAvatar({ ...avatar, canvasItems: [...rest, item] });
  };

  const handleSendToBack = () => {
    if (!selectedItemId) return;
    soundManager.playClick();
    const items = avatar.canvasItems || [];
    const item = items.find((it) => it.id === selectedItemId);
    if (!item) return;
    const rest = items.filter((it) => it.id !== selectedItemId);
    onChangeAvatar({ ...avatar, canvasItems: [item, ...rest] });
  };

  const handleToggleDrawLayerOrder = () => {
    soundManager.playClick();
    const nextOrder = avatar.drawLayerOrder === 'back' ? 'front' : 'back';
    onChangeAvatar({
      ...avatar,
      drawLayerOrder: nextOrder,
    });
  };

  const handleResetToCleanWhiteboard = () => {
    soundManager.playClick();
    onChangeAvatar({
      ...avatar,
      background: 'whiteboard',
      showBaseCharacter: false,
      canvasItems: [],
      drawings: '',
      drawLayerOrder: 'front',
    });
    handleClearDrawing();
    setSelectedItemId(null);
  };

  const handleToggleBaseCharacter = () => {
    soundManager.playClick();
    onChangeAvatar({
      ...avatar,
      showBaseCharacter: !avatar.showBaseCharacter,
    });
  };

  const selectedItem = (avatar.canvasItems || []).find((it) => it.id === selectedItemId);

  return (
    <div id="whiteboard-studio-container" className="space-y-4">
      {/* Top Toolbar: Mode Switch & Clean Canvas */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border-2 border-slate-300 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            자유 배치 화이트보드 스튜디오
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
            {avatar.showBaseCharacter ? '기본 캐릭터 켜짐' : '빈 화이트보드 모드'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleBaseCharacter}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer border ${
              avatar.showBaseCharacter
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-50'
            }`}
          >
            {avatar.showBaseCharacter ? '👤 캐릭터 가이드 끄기 (빈 보드)' : '👤 캐릭터 가이드 켜기'}
          </button>

          <button
            onClick={handleResetToCleanWhiteboard}
            className="px-3 py-1.5 bg-white dark:bg-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-black transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            화이트보드 비우기
          </button>
        </div>
      </div>

      {/* Main Workspace: Left Interactive Stage, Right Tool Palettes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: THE INTERACTIVE CANVAS (lg:col-span-6) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {/* Drawing Tool Bar */}
          <div className="w-full flex items-center justify-between bg-white dark:bg-slate-850 p-2 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-xs mb-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setDrawTool('select')}
                className={`p-2 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                  drawTool === 'select'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200'
                }`}
                title="아이템 선택 및 이동"
              >
                <Move className="w-4 h-4" />
                선택/이동
              </button>

              <button
                onClick={() => setDrawTool('pen')}
                className={`p-2 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                  drawTool === 'pen'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200'
                }`}
                title="그리기 펜"
              >
                <Pencil className="w-4 h-4" />
                펜
              </button>

              <button
                onClick={() => setDrawTool('highlighter')}
                className={`p-2 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                  drawTool === 'highlighter'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200'
                }`}
                title="형광펜"
              >
                <Sparkles className="w-4 h-4" />
                형광펜
              </button>

              <button
                onClick={() => setDrawTool('eraser')}
                className={`p-2 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                  drawTool === 'eraser'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200'
                }`}
                title="지우개"
              >
                <Eraser className="w-4 h-4" />
                지우개
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleToggleDrawLayerOrder}
                className={`p-2 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer border ${
                  avatar.drawLayerOrder === 'back'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700'
                    : 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/70 dark:text-indigo-200 dark:border-indigo-700'
                }`}
                title="손그림과 스티커 아이템의 앞/뒤 순서를 바꿉니다"
              >
                <Layers className="w-3.5 h-3.5" />
                {avatar.drawLayerOrder === 'back' ? '그림이 뒤로 (배경)' : '그림이 앞으로 (맨앞)'}
              </button>

              <button
                onClick={handleClearDrawing}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-rose-600 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors cursor-pointer"
                title="손그림만 지우기"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Color & Thickness Bar (When Drawing is Active) */}
          {drawTool !== 'select' && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 mb-3"
            >
              {/* Color Swatches */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {DRAWING_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setBrushColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer flex-shrink-0 ${
                      brushColor === c ? 'scale-125 border-indigo-600 ring-2 ring-indigo-400' : 'border-slate-300'
                    }`}
                  />
                ))}
              </div>

              {/* Stroke Width Buttons */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-300 dark:border-slate-600">
                {[2, 4, 8, 16].map((w) => (
                  <button
                    key={w}
                    onClick={() => setBrushWidth(w)}
                    className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black cursor-pointer ${
                      brushWidth === w
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {w === 2 ? '얇게' : w === 4 ? '보통' : w === 8 ? '굵게' : '왕'}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* THE STAGE BOX (Contains SVG Avatar + Free Placement Items + Drawing Canvas) */}
          <div
            ref={whiteboardBoxRef}
            onPointerMove={handlePointerMoveWhiteboard}
            onPointerUp={handlePointerUpWhiteboard}
            className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] rounded-3xl overflow-hidden shadow-2xl border-4 border-indigo-500/30 bg-white select-none touch-none cursor-crosshair"
          >
            {/* Layer 1: Base Character SVG Canvas */}
            <AvatarCanvas
              avatar={avatar}
              size={340}
              className="w-full h-full pointer-events-none"
            />

            {/* Layer 2: Interactive Placed Items Overlay */}
            <div className="absolute inset-0 pointer-events-auto">
              {(avatar.canvasItems || []).map((item) => {
                const isSelected = item.id === selectedItemId;
                // Calculate percentage position
                const leftPercent = (item.x / 300) * 100;
                const topPercent = (item.y / 300) * 100;

                return (
                  <div
                    key={item.id}
                    onPointerDown={(e) => handleSelectItem(item.id, e)}
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg) scale(${item.scale || 1})`,
                    }}
                    className={`absolute cursor-grab active:cursor-grabbing p-1.5 rounded-xl transition-shadow select-none ${
                      isSelected
                        ? 'ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50/40 shadow-lg'
                        : 'hover:ring-1 hover:ring-indigo-300'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl block leading-none filter drop-shadow">
                      {item.icon}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Layer 3: Freehand Drawing HTML5 Canvas */}
            <canvas
              ref={drawingCanvasRef}
              width={300}
              height={300}
              onPointerDown={handlePointerDownCanvas}
              onPointerMove={handlePointerMoveCanvas}
              onPointerUp={handlePointerUpCanvas}
              className={`absolute inset-0 w-full h-full ${
                drawTool === 'select' ? 'pointer-events-none' : 'pointer-events-auto cursor-crosshair'
              }`}
            />
          </div>

          {/* Selected Item Control Bar */}
          {selectedItem && drawTool === 'select' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full mt-3 p-3 bg-white dark:bg-slate-800 rounded-2xl border-2 border-indigo-300 dark:border-indigo-700 shadow-md flex flex-wrap items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedItem.icon}</span>
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  선택한 아이템 조절
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Scale buttons */}
                <button
                  onClick={() => handleUpdateItemScale(-0.15)}
                  className="p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-indigo-100 text-slate-800 dark:text-slate-100 rounded-lg text-xs font-black cursor-pointer"
                  title="크기 축소"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 min-w-[36px] text-center">
                  {Math.round((selectedItem.scale || 1) * 100)}%
                </span>
                <button
                  onClick={() => handleUpdateItemScale(0.15)}
                  className="p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-indigo-100 text-slate-800 dark:text-slate-100 rounded-lg text-xs font-black cursor-pointer"
                  title="크기 확대"
                >
                  <Plus className="w-4 h-4" />
                </button>

                {/* Rotate button */}
                <button
                  onClick={() => handleRotateItem(15)}
                  className="p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-amber-100 text-slate-800 dark:text-slate-100 rounded-lg text-xs font-black cursor-pointer"
                  title="15도 회전"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                {/* Bring to front */}
                <button
                  onClick={handleBringToFront}
                  className="px-2 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 text-slate-800 dark:text-slate-100 rounded-lg text-xs font-black cursor-pointer flex items-center gap-1"
                  title="선택한 아이템을 맨 앞으로"
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  맨앞
                </button>

                {/* Send to back */}
                <button
                  onClick={handleSendToBack}
                  className="px-2 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-slate-800 dark:text-slate-100 rounded-lg text-xs font-black cursor-pointer flex items-center gap-1"
                  title="선택한 아이템을 맨 뒤로"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  맨뒤
                </button>

                {/* Delete button */}
                <button
                  onClick={handleDeleteSelectedItem}
                  className="p-1.5 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-black cursor-pointer"
                  title="아이템 삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          <p className="text-[11px] text-slate-700 dark:text-slate-300 font-bold mt-2 text-center">
            💡 팁: 마우스나 손가락으로 원하는 곳에 아이템을 끌어다 놓고 크기를 맞춰보세요!
          </p>
        </div>

        {/* RIGHT COLUMN: STICKER & ITEM LIBRARY PALETTE (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-800/95 p-4 rounded-3xl border-2 border-slate-300 dark:border-slate-700 shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
            {STICKER_LIBRARY.map((cat) => (
              <button
                key={cat.category}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat.category);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.category
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items Grid for Current Category */}
          <div className="max-h-[380px] overflow-y-auto pr-1">
            {STICKER_LIBRARY.filter((cat) => cat.category === selectedCategory).map((cat) => (
              <div key={cat.category} className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {cat.items.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAddItem(item, cat.category)}
                    className="p-3 bg-slate-50 dark:bg-slate-750 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all group cursor-pointer shadow-xs"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="text-xs font-black text-slate-900 dark:text-slate-100 text-center leading-tight">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      + 캔버스에 추가
                    </span>
                  </motion.button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
