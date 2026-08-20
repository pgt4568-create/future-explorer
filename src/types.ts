export type Category = 
  | 'all'
  | 'leadership' // 리더십/역사
  | 'science'    // 과학/발명/기술
  | 'arts'       // 문화/예술/미디어
  | 'sports'     // 스포츠/체육
  | 'welfare';   // 인권/사회복지/환경

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  historicalNote?: string;
}

export interface LifeStage {
  stageNumber: number;
  period: string; // e.g. "유년기", "청년기", "위기 극복", "대도전", "결실기"
  title: string;
  situation: string;
  characterDialogue?: string;
  visualTheme: string;
  illustrationKey: string;
  realPhotoUrl?: string;
  realPhotoDescription?: string;
  soundCue?: string;
  choices: Choice[];
  funFact?: string;
}

export interface Figure {
  id: string;
  name: string;
  title: string;
  role: string;
  nationality: 'korea' | 'world';
  category: Category;
  era: string;
  motto: string;
  superPower: string;
  superPowerDescription: string;
  color: string;
  accentColor: string;
  avatarIcon: string;
  photoUrl?: string;
  summary: string;
  stages: LifeStage[];
}

export interface ReflectionData {
  figureId: string;
  figureName: string;
  mostImpressiveScene: string;
  learnedSuperPower: string;
  customSuperPowerText: string;
  myFutureContribution: string;
  createdAt: string;
}

export interface WhiteboardItem {
  id: string;
  type?: string;
  category?: 'hair' | 'hat' | 'outfit' | 'prop' | 'sticker' | 'pet' | 'badge' | 'text' | string;
  content?: string;
  name?: string;
  icon?: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  zIndex?: number;
  color?: string;
  skinTone?: string;
  flipped?: boolean;
}

export interface AvatarConfig {
  gender: 'boy' | 'girl' | 'neutral';
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  eyeExpression: string;
  mouthExpression: string;
  glasses: string;
  outfit: string;
  prop: string;
  background: string;
  badge: string;
  showBaseCharacter?: boolean;
  mode?: 'avatar' | 'whiteboard';
  drawings?: string;
  drawLayerOrder?: 'front' | 'back'; // Whether drawings appear in front of or behind items
  customDrawingUrl?: string;
  canvasItems?: WhiteboardItem[];
}

export interface FutureCardData {
  id: string;
  figureId: string;
  figureName: string;
  studentName: string;
  gradeClass: string;
  targetYear: number;
  futureJob: string;
  slogan: string;
  superPower: string;
  reflection: ReflectionData;
  avatar: AvatarConfig;
  customDrawingUrl?: string;
  createdAt: string;
}

export type AppView = 
  | 'figure_select'
  | 'life_game'
  | 'reflection'
  | 'avatar_builder'
  | 'result_card'
  | 'gallery';

