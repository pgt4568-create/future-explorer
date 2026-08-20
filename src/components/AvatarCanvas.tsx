import React from 'react';
import { AvatarConfig, WhiteboardItem } from '../types';

interface AvatarCanvasProps {
  avatar: AvatarConfig;
  className?: string;
  size?: number;
  hideBackground?: boolean;
  hideBaseCharacter?: boolean;
}

export const AvatarCanvas: React.FC<AvatarCanvasProps> = ({
  avatar,
  className = '',
  size = 300,
  hideBackground = false,
  hideBaseCharacter = false,
}) => {
  const {
    skinTone = '#FFE0BD',
    hairStyle = 'short',
    hairColor = '#3b2f2f',
    eyeExpression = 'happy',
    mouthExpression = 'smile',
    glasses = 'none',
    outfit = 'scientist',
    prop = 'tablet',
    background = 'lab',
    showBaseCharacter = true,
    canvasItems = [],
    drawings = '',
    drawLayerOrder = 'front',
  } = avatar;

  const shouldRenderBase = !hideBaseCharacter && showBaseCharacter !== false;
  // If base character is hidden (whiteboard mode without guide), don't force background unless explicitly custom
  const effectiveBackground = shouldRenderBase ? background : (background === 'lab' ? 'whiteboard' : background);

  const renderCanvasItemsLayer = () => {
    if (!canvasItems || canvasItems.length === 0) return null;
    return (
      <g id="custom-canvas-items-layer">
        {canvasItems.map((item) => (
          <g
            key={item.id}
            transform={`translate(${item.x}, ${item.y}) rotate(${item.rotation || 0}) scale(${item.scale || 1})`}
            className="pointer-events-none"
          >
            {renderWhiteboardItemContent(item)}
          </g>
        ))}
      </g>
    );
  };

  const renderDrawingsLayer = () => {
    if (!drawings) return null;
    return (
      <image
        id="custom-drawings-layer"
        href={drawings}
        x="0"
        y="0"
        width="300"
        height="300"
        className="pointer-events-none"
      />
    );
  };

  return (
    <svg
      id="avatar-svg-canvas"
      className={`rounded-2xl shadow-md ${className}`}
      width={size}
      height={size}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. Background Scene */}
      {!hideBackground && renderBackground(effectiveBackground)}

      {/* 2. Base Character (Head, Body, Face, Hair, Prop) - Only rendered when shouldRenderBase is true */}
      {shouldRenderBase && (
        <g id="base-character-layer">
          {/* Hair Back (Long hair / Pigtails behind ears & shoulders) */}
          {renderHairBack(hairStyle, hairColor)}

          {/* Outfit & Shoulders */}
          {renderOutfit(outfit)}

          {/* Neck */}
          <rect x="136" y="146" width="28" height="26" fill={skinTone} rx="4" />

          {/* Head & Face Base (Center: 150, 108. Radius X: 42, Radius Y: 46) */}
          <ellipse cx="150" cy="108" rx="42" ry="46" fill={skinTone} />

          {/* Ears */}
          <ellipse cx="107" cy="112" rx="7" ry="11" fill={skinTone} stroke="#d49574" strokeWidth="1" />
          <ellipse cx="193" cy="112" rx="7" ry="11" fill={skinTone} stroke="#d49574" strokeWidth="1" />

          {/* Rosy Cheeks */}
          <ellipse cx="124" cy="122" rx="7" ry="4.5" fill="#f87171" opacity="0.45" />
          <ellipse cx="176" cy="122" rx="7" ry="4.5" fill="#f87171" opacity="0.45" />

          {/* Eyes & Eyebrows */}
          {renderEyes(eyeExpression)}

          {/* Nose */}
          <path d="M 148 112 Q 150 116 153 114" stroke="#b45309" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6" />

          {/* Mouth */}
          {renderMouth(mouthExpression)}

          {/* Glasses */}
          {renderGlasses(glasses)}

          {/* Hair Front (Lush, rich volume covering skull and forehead naturally) */}
          {renderHairFront(hairStyle, hairColor)}

          {/* Prop */}
          {renderProp(prop)}
        </g>
      )}

      {/* 3 & 4. Custom Whiteboard Items and Drawings Layer according to drawLayerOrder */}
      {drawLayerOrder === 'back' ? (
        <>
          {renderDrawingsLayer()}
          {renderCanvasItemsLayer()}
        </>
      ) : (
        <>
          {renderCanvasItemsLayer()}
          {renderDrawingsLayer()}
        </>
      )}
    </svg>
  );
};

function renderWhiteboardItemContent(item: WhiteboardItem) {
  if (item.category === 'sticker' || item.category === 'prop' || item.category === 'pet') {
    return (
      <text
        x="0"
        y="0"
        fontSize="32"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {item.icon}
      </text>
    );
  }

  // If item is hair / hat / costume icon or custom SVG graphic
  return (
    <text
      x="0"
      y="0"
      fontSize="36"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {item.icon}
    </text>
  );
}

function renderBackground(bg: string) {
  switch (bg) {
    case 'lab':
      return (
        <g>
          <rect width="300" height="300" fill="#1e1b4b" />
          <circle cx="150" cy="150" r="130" fill="#4338ca" opacity="0.3" />
          <circle cx="60" cy="60" r="4" fill="#a5b4fc" opacity="0.6" />
          <circle cx="240" cy="80" r="3" fill="#a5b4fc" opacity="0.6" />
          <circle cx="220" cy="220" r="5" fill="#6ee7b7" opacity="0.4" />
          <line x1="0" y1="230" x2="300" y2="230" stroke="#6366f1" strokeWidth="2" opacity="0.4" />
          <line x1="50" y1="230" x2="30" y2="300" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
          <line x1="150" y1="230" x2="150" y2="300" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
          <line x1="250" y1="230" x2="270" y2="300" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
        </g>
      );
    case 'stadium':
      return (
        <g>
          <rect width="300" height="300" fill="#0284c7" />
          <rect x="0" y="190" width="300" height="110" fill="#15803d" />
          <line x1="0" y1="240" x2="300" y2="240" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
          <circle cx="150" cy="240" r="40" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.8" />
          <polygon points="40,20 100,190 200,190 60,20" fill="#ffffff" opacity="0.15" />
          <polygon points="260,20 200,190 100,190 240,20" fill="#ffffff" opacity="0.15" />
        </g>
      );
    case 'studio':
      return (
        <g>
          <rect width="300" height="300" fill="#0f172a" />
          <polygon points="30,0 120,300 180,300 70,0" fill="#ec4899" opacity="0.25" />
          <polygon points="270,0 180,300 120,300 230,0" fill="#3b82f6" opacity="0.25" />
          <circle cx="50" cy="80" r="15" fill="#facc15" opacity="0.2" />
          <circle cx="250" cy="100" r="20" fill="#f43f5e" opacity="0.2" />
        </g>
      );
    case 'nature':
      return (
        <g>
          <rect width="300" height="300" fill="#67e8f9" />
          <circle cx="250" cy="50" r="30" fill="#fde047" opacity="0.8" />
          <ellipse cx="60" cy="260" rx="140" ry="80" fill="#22c55e" />
          <ellipse cx="240" cy="270" rx="150" ry="90" fill="#16a34a" />
          <polygon points="40,160 20,200 60,200" fill="#15803d" />
          <polygon points="260,150 240,190 280,190" fill="#15803d" />
        </g>
      );
    case 'space':
      return (
        <g>
          <rect width="300" height="300" fill="#030712" />
          <circle cx="40" cy="50" r="2" fill="#ffffff" />
          <circle cx="80" cy="110" r="1.5" fill="#ffffff" />
          <circle cx="230" cy="40" r="2" fill="#ffffff" />
          <circle cx="270" cy="90" r="1.5" fill="#ffffff" />
          <circle cx="250" cy="220" r="2.5" fill="#ffffff" />
          <circle cx="260" cy="260" r="60" fill="#38bdf8" />
          <circle cx="250" cy="250" r="40" fill="#22c55e" opacity="0.7" />
          <ellipse cx="100" cy="80" rx="60" ry="30" fill="#c084fc" opacity="0.25" />
        </g>
      );
    case 'whiteboard':
      return (
        <g>
          <rect width="300" height="300" fill="#ffffff" />
          {/* Subtle grid pattern */}
          <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="100" x2="300" y2="100" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="150" x2="300" y2="150" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="200" x2="300" y2="200" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="250" x2="300" y2="250" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="50" y1="0" x2="50" y2="300" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="100" y1="0" x2="100" y2="300" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="150" y1="0" x2="150" y2="300" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="200" y1="0" x2="200" y2="300" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="250" y1="0" x2="250" y2="300" stroke="#f1f5f9" strokeWidth="1" />
        </g>
      );
    case 'classroom':
    default:
      return (
        <g>
          <rect width="300" height="300" fill="#fef3c7" />
          <rect x="25" y="25" width="250" height="130" rx="8" fill="#15803d" stroke="#b45309" strokeWidth="4" />
          <text x="50" y="70" fill="#ffffff" fontSize="13" fontWeight="bold" opacity="0.85">★ 2036 꿈의 무대 ★</text>
          <line x1="50" y1="85" x2="250" y2="85" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
        </g>
      );
  }
}

function renderOutfit(outfit: string) {
  switch (outfit) {
    case 'scientist': // White Lab Coat + Blue Shirt + Tie
      return (
        <g>
          <path d="M 75 168 L 225 168 L 245 285 L 55 285 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <polygon points="135,168 165,168 150,210" fill="#3b82f6" />
          <polygon points="147,175 153,175 150,205" fill="#ef4444" />
          <path d="M 75 168 L 125 210 L 125 285 L 55 285 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M 225 168 L 175 210 L 175 285 L 245 285 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="75" y="225" width="28" height="22" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="82" y1="215" x2="82" y2="230" stroke="#ef4444" strokeWidth="2" />
          <line x1="90" y1="212" x2="90" y2="230" stroke="#3b82f6" strokeWidth="2" />
        </g>
      );
    case 'doctor': // Teal Medical Scrubs + Stethoscope
      return (
        <g>
          <path d="M 75 168 L 225 168 L 245 285 L 55 285 Z" fill="#0d9488" />
          <polygon points="130,168 170,168 150,195" fill="#115e59" />
          <path d="M 115 168 Q 110 220 140 230 Q 150 235 160 230 Q 190 220 185 168" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
          <circle cx="150" cy="242" r="9" fill="#94a3b8" stroke="#f8fafc" strokeWidth="2" />
        </g>
      );
    case 'soccer': // Red/Blue Athlete Jersey with Gold Number 7
      return (
        <g>
          <path d="M 75 168 L 225 168 L 245 285 L 55 285 Z" fill="#dc2626" />
          <polygon points="135,168 165,168 150,188" fill="#1e3a8a" />
          <text x="142" y="240" fill="#facc15" fontSize="38" fontWeight="black">7</text>
          <line x1="90" y1="168" x2="68" y2="285" stroke="#ffffff" strokeWidth="3" />
          <line x1="210" y1="168" x2="232" y2="285" stroke="#ffffff" strokeWidth="3" />
        </g>
      );
    case 'astronaut': // High-tech Space Suit with Blue Neon Accents
      return (
        <g>
          <path d="M 75 168 L 225 168 L 245 285 L 55 285 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
          <rect x="110" y="195" width="80" height="50" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="130" cy="220" r="5" fill="#22c55e" />
          <circle cx="150" cy="220" r="5" fill="#ef4444" />
          <circle cx="170" cy="220" r="5" fill="#3b82f6" />
          <polygon points="100,168 115,168 105,285 90,285" fill="#38bdf8" />
          <polygon points="200,168 185,168 195,285 210,285" fill="#38bdf8" />
        </g>
      );
    case 'hanbok': // Traditional Royal Red Gonryongpo Robe with Dragon Emblem
      return (
        <g>
          <path d="M 75 168 L 225 168 L 245 285 L 55 285 Z" fill="#991b1b" />
          <path d="M 125 168 L 155 210 L 155 285 L 55 285 Z" fill="#b91c1c" stroke="#fef08a" strokeWidth="2" />
          <polygon points="135,168 165,168 150,195" fill="#fef08a" />
          <circle cx="150" cy="235" r="22" fill="#fbbf24" stroke="#78350f" strokeWidth="2" />
          <text x="141" y="243" fontSize="16" fontWeight="bold" fill="#78350f">龍</text>
        </g>
      );
    case 'chef': // Chef Double-breasted Jacket
      return (
        <g>
          <path d="M 75 168 L 225 168 L 245 285 L 55 285 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="135" cy="195" r="4" fill="#0f172a" />
          <circle cx="165" cy="195" r="4" fill="#0f172a" />
          <circle cx="135" cy="225" r="4" fill="#0f172a" />
          <circle cx="165" cy="225" r="4" fill="#0f172a" />
          <polygon points="135,168 165,168 150,195" fill="#ef4444" />
        </g>
      );
    case 'mc': // Stylish Tuxedo / Suit with Bowtie
      return (
        <g>
          <path d="M 75 168 L 225 168 L 245 285 L 55 285 Z" fill="#0f172a" />
          <polygon points="125,168 175,168 150,230" fill="#ffffff" />
          {/* Red Bowtie */}
          <polygon points="140,175 160,185 140,185" fill="#dc2626" />
          <polygon points="160,175 140,185 160,185" fill="#dc2626" />
          <circle cx="150" cy="180" r="3" fill="#991b1b" />
          <line x1="125" y1="168" x2="140" y2="285" stroke="#334155" strokeWidth="2" />
          <line x1="175" y1="168" x2="160" y2="285" stroke="#334155" strokeWidth="2" />
        </g>
      );
    case 'artist':
    default:
      return (
        <g>
          <path d="M 75 168 L 225 168 L 245 285 L 55 285 Z" fill="#f59e0b" />
          <rect x="110" y="190" width="80" height="90" rx="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <line x1="120" y1="168" x2="125" y2="190" stroke="#1d4ed8" strokeWidth="4" />
          <line x1="180" y1="168" x2="175" y2="190" stroke="#1d4ed8" strokeWidth="4" />
          <circle cx="130" cy="220" r="5" fill="#ec4899" />
          <circle cx="160" cy="240" r="6" fill="#10b981" />
          <circle cx="170" cy="215" r="4" fill="#eab308" />
        </g>
      );
  }
}

function renderHairBack(style: string, color: string) {
  if (style === 'long') {
    return (
      <g fill={color}>
        <path
          d="M 94 95 C 80 130 75 185 78 250 L 222 250 C 225 185 220 130 206 95 Z"
        />
        {/* Hair shading / gradient line */}
        <path
          d="M 94 130 C 88 180 88 220 90 250 L 105 250 C 102 210 102 170 108 130 Z"
          fill="#000000"
          opacity="0.15"
        />
        <path
          d="M 206 130 C 212 180 212 220 210 250 L 195 250 C 198 210 198 170 192 130 Z"
          fill="#000000"
          opacity="0.15"
        />
      </g>
    );
  }
  if (style === 'pigtails') {
    return (
      <g>
        {/* Left bunch */}
        <path d="M 104 100 C 70 120 62 165 72 205 C 82 205 92 175 106 145 Z" fill={color} />
        {/* Right bunch */}
        <path d="M 196 100 C 230 120 238 165 228 205 C 218 205 208 175 194 145 Z" fill={color} />
        {/* Ribbon ties */}
        <circle cx="86" cy="135" r="7" fill="#f43f5e" />
        <circle cx="214" cy="135" r="7" fill="#f43f5e" />
        <path d="M 80 140 L 72 154 L 84 148 Z" fill="#f43f5e" />
        <path d="M 220 140 L 228 154 L 216 148 Z" fill="#f43f5e" />
      </g>
    );
  }
  return null;
}

function renderHairFront(style: string, color: string) {
  // Head geometry: center is (150, 108), top apex is y=62, left temple x=108, right temple x=192, eyebrows at y=96
  switch (style) {
    case 'curly': // Full bouncy curly hair nicely covering head top and temples
      return (
        <g fill={color}>
          {/* Base lush crown */}
          <path d="M 96 115 C 92 38 208 38 204 115 C 196 100 186 92 175 92 C 160 92 150 96 140 92 C 125 92 115 100 96 115 Z" />
          {/* Curly bumps along hairline & perimeter */}
          <circle cx="102" cy="74" r="18" />
          <circle cx="122" cy="54" r="20" />
          <circle cx="150" cy="46" r="22" />
          <circle cx="178" cy="54" r="20" />
          <circle cx="198" cy="74" r="18" />
          <circle cx="96" cy="96" r="16" />
          <circle cx="204" cy="96" r="16" />
          <circle cx="98" cy="118" r="13" />
          <circle cx="202" cy="118" r="13" />
          {/* Forehead curls */}
          <circle cx="120" cy="86" r="14" />
          <circle cx="142" cy="88" r="15" />
          <circle cx="164" cy="86" r="14" />
          <circle cx="178" cy="88" r="12" />
          <circle cx="108" cy="90" r="11" />
          {/* Hair shine */}
          <ellipse cx="142" cy="54" rx="14" ry="4" fill="#ffffff" opacity="0.3" transform="rotate(-15 142 54)" />
        </g>
      );
    case 'bob': // Sleek curved bob hair with stylish bangs
      return (
        <g fill={color}>
          {/* Full rounded bob hugging the skull and cheeks */}
          <path d="M 94 115 C 90 38 210 38 206 115 C 212 145 208 170 192 172 C 182 145 186 98 150 96 C 114 98 118 145 108 172 C 92 170 88 145 94 115 Z" />
          {/* Forehead straight soft bangs */}
          <path d="M 106 90 Q 128 102 150 94 Q 172 102 194 90 Q 150 80 106 90 Z" />
          <path d="M 116 90 L 184 90 L 180 98 L 120 98 Z" />
          {/* Gloss highlight */}
          <path d="M 120 58 Q 150 50 180 58" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.35" fill="none" />
        </g>
      );
    case 'long': // Long sleek hair front bangs
      return (
        <g fill={color}>
          {/* Lush skull cap */}
          <path d="M 94 115 C 92 38 208 38 206 115 C 198 145 200 180 194 180 C 186 145 188 98 150 96 C 112 98 114 145 106 180 C 100 180 102 145 94 115 Z" />
          {/* Stylish straight bangs down to y=96 */}
          <path d="M 110 88 L 190 88 L 186 98 L 114 98 Z" />
          <polygon points="125,98 132,103 138,98" />
          <polygon points="152,98 159,103 165,98" />
          {/* Gloss highlight */}
          <path d="M 120 56 Q 150 48 180 56" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.35" fill="none" />
        </g>
      );
    case 'pigtails':
      return (
        <g fill={color}>
          {/* Main top dome */}
          <path d="M 96 115 C 92 40 208 40 204 115 C 196 95 184 92 170 94 C 150 88 130 94 116 92 C 104 95 98 105 96 115 Z" />
          {/* Soft fringe across forehead */}
          <path d="M 112 90 Q 150 102 188 90 Q 150 82 112 90 Z" />
          {/* Side strands framing face */}
          <polygon points="98,110 98,135 106,125" />
          <polygon points="202,110 202,135 194,125" />
          {/* Gloss highlight */}
          <path d="M 124 58 Q 150 52 176 58" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.35" fill="none" />
        </g>
      );
    case 'undercut': // Modern two-block undercut with side fade
      return (
        <g fill={color}>
          {/* Voluminous styled top swoop */}
          <path d="M 98 105 C 94 38 206 38 202 105 C 188 88 155 86 120 88 Z" />
          {/* Fringe sweeping across forehead */}
          <path d="M 114 86 C 130 102 165 102 188 92 C 172 84 135 84 114 86 Z" />
          <polygon points="120,86 172,100 156,86" />
          {/* Side fades & neat sideburns */}
          <rect x="102" y="100" width="7" height="24" rx="2" opacity="0.5" />
          <rect x="191" y="100" width="7" height="24" rx="2" opacity="0.5" />
          {/* Gloss highlight */}
          <path d="M 125 54 Q 155 48 180 56" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.35" fill="none" />
        </g>
      );
    case 'short':
    default: // Clean, well-proportioned parted short hair
      return (
        <g fill={color}>
          {/* Main hair cap with rich volume covering skull and sides */}
          <path d="M 96 118 C 92 42 208 42 204 118 C 196 118 190 98 184 94 C 172 100 162 92 150 96 C 138 92 126 100 116 94 C 110 98 104 118 96 118 Z" />
          {/* Natural layered bangs across forehead down to y=96 */}
          <path d="M 110 92 C 122 102 136 102 145 94 C 150 100 164 100 174 93 C 182 99 188 94 190 90 C 180 82 120 82 110 92 Z" />
          {/* Left & Right sideburns */}
          <polygon points="98,108 98,126 106,118" />
          <polygon points="202,108 202,126 194,118" />
          {/* Gloss highlight */}
          <path d="M 122 58 Q 150 50 178 58" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.35" fill="none" />
        </g>
      );
  }
}

function renderEyes(expression: string) {
  switch (expression) {
    case 'sparkle': // Sparkling anime eyes
      return (
        <g>
          {/* Eyebrows */}
          <path d="M 122 96 Q 132 91 141 96" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 159 96 Q 168 91 178 96" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Eyes */}
          <ellipse cx="132" cy="108" rx="8" ry="9.5" fill="#0f172a" />
          <ellipse cx="168" cy="108" rx="8" ry="9.5" fill="#0f172a" />
          {/* Sparkles */}
          <circle cx="130" cy="105" r="3.2" fill="#ffffff" />
          <circle cx="135" cy="111" r="1.5" fill="#ffffff" />
          <circle cx="166" cy="105" r="3.2" fill="#ffffff" />
          <circle cx="171" cy="111" r="1.5" fill="#ffffff" />
        </g>
      );
    case 'wink':
      return (
        <g>
          {/* Left wink */}
          <path d="M 124 108 Q 132 101 140 108" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* Right open eye */}
          <ellipse cx="168" cy="108" rx="7.5" ry="9" fill="#0f172a" />
          <circle cx="166" cy="105" r="3" fill="#ffffff" />
          {/* Eyebrows */}
          <path d="M 122 94 Q 132 89 141 94" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 159 94 Q 168 89 178 94" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      );
    case 'determined':
      return (
        <g>
          <path d="M 122 96 L 141 92" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 178 96 L 159 92" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="132" cy="108" rx="6.5" ry="8.5" fill="#0f172a" />
          <ellipse cx="168" cy="108" rx="6.5" ry="8.5" fill="#0f172a" />
          <circle cx="130" cy="106" r="2.5" fill="#ffffff" />
          <circle cx="166" cy="106" r="2.5" fill="#ffffff" />
        </g>
      );
    case 'happy':
    default:
      return (
        <g>
          <path d="M 122 95 Q 132 90 141 95" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 159 95 Q 168 90 178 95" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 124 108 Q 132 99 140 108" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 160 108 Q 168 99 176 108" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </g>
      );
  }
}

function renderMouth(expression: string) {
  switch (expression) {
    case 'open_smile':
      return (
        <g>
          <path d="M 136 128 Q 150 146 164 128 Z" fill="#e11d48" stroke="#9f1239" strokeWidth="1.5" />
          <path d="M 140 128 Q 150 133 160 128 Z" fill="#ffffff" />
        </g>
      );
    case 'confident':
      return (
        <path d="M 138 130 Q 152 133 164 126" stroke="#9f1239" strokeWidth="3" fill="none" strokeLinecap="round" />
      );
    case 'smile':
    default:
      return (
        <path d="M 138 126 Q 150 138 162 126" stroke="#9f1239" strokeWidth="3" fill="none" strokeLinecap="round" />
      );
  }
}

function renderGlasses(glasses: string) {
  if (glasses === 'round') {
    return (
      <g stroke="#0f172a" strokeWidth="2.5" fill="none">
        <circle cx="132" cy="107" r="14" fill="#ffffff" fillOpacity="0.2" />
        <circle cx="168" cy="107" r="14" fill="#ffffff" fillOpacity="0.2" />
        <line x1="146" y1="107" x2="154" y2="107" />
      </g>
    );
  }
  if (glasses === 'smart') {
    return (
      <g stroke="#2563eb" strokeWidth="2.5" fill="none">
        <rect x="118" y="98" width="28" height="18" rx="4" fill="#ffffff" fillOpacity="0.2" />
        <rect x="154" y="98" width="28" height="18" rx="4" fill="#ffffff" fillOpacity="0.2" />
        <line x1="146" y1="107" x2="154" y2="107" />
      </g>
    );
  }
  return null;
}

function renderProp(prop: string) {
  switch (prop) {
    case 'flask':
      return (
        <g transform="translate(195, 185) scale(0.9)">
          <path d="M 20 0 L 30 0 L 30 15 L 45 45 L 5 45 L 20 15 Z" fill="#0284c7" opacity="0.8" stroke="#38bdf8" strokeWidth="2" />
          <path d="M 9 37 L 41 37 L 45 45 L 5 45 Z" fill="#38bdf8" />
          <circle cx="25" cy="30" r="3" fill="#ffffff" />
        </g>
      );
    case 'soccer':
      return (
        <g transform="translate(205, 195) scale(0.85)">
          <circle cx="20" cy="20" r="20" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          <polygon points="20,10 28,16 25,26 15,26 12,16" fill="#0f172a" />
        </g>
      );
    case 'mic':
      return (
        <g transform="translate(205, 185) scale(0.85)">
          <circle cx="15" cy="15" r="10" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
          <rect x="12" y="25" width="6" height="25" rx="3" fill="#0f172a" />
          <line x1="9" y1="15" x2="21" y2="15" stroke="#475569" strokeWidth="1.5" />
        </g>
      );
    case 'palette':
      return (
        <g transform="translate(195, 190) scale(0.85)">
          <ellipse cx="25" cy="25" rx="25" ry="18" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <circle cx="15" cy="20" r="3.5" fill="#ef4444" />
          <circle cx="25" cy="15" r="3.5" fill="#3b82f6" />
          <circle cx="35" cy="20" r="3.5" fill="#22c55e" />
          <circle cx="28" cy="30" r="3.5" fill="#a855f7" />
        </g>
      );
    case 'trophy':
      return (
        <g transform="translate(200, 185) scale(0.85)">
          <path d="M 10 10 L 30 10 L 25 30 L 15 30 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          <rect x="18" y="30" width="4" height="10" fill="#d97706" />
          <rect x="12" y="40" width="16" height="8" rx="2" fill="#78350f" />
          <text x="17" y="24" fontSize="12" fill="#78350f" fontWeight="bold">★</text>
        </g>
      );
    case 'tablet':
    default:
      return (
        <g transform="translate(200, 190) scale(0.85)">
          <rect x="0" y="0" width="34" height="46" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
          <rect x="3" y="4" width="28" height="34" rx="2" fill="#38bdf8" opacity="0.85" />
          <circle cx="17" cy="42" r="2" fill="#ffffff" />
        </g>
      );
  }
}
