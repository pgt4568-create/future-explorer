// Elementary School Dictionary helper for complex historical and conceptual words
export interface WordDefinition {
  word: string;
  simple: string;
  example?: string;
  emoji?: string;
}

export const ELEMENTARY_DICTIONARY: Record<string, WordDefinition> = {
  // 세종대왕 관련
  '성군': { word: '성군', simple: '백성을 진심으로 사랑하고 나라를 훌륭하게 다스린 착한 임금님', emoji: '👑' },
  '훈민정음': { word: '훈민정음', simple: '백성을 가르치는 바른 소리라는 뜻으로, 오늘날 우리가 쓰는 한글의 옛 이름', emoji: '📜' },
  '창제': { word: '창제', simple: '세상에 없던 새로운 것을 처음으로 만들어 냄', emoji: '💡' },
  '관노': { word: '관노', simple: '옛날 나라의 관청에서 일하던 노비(일꾼)', emoji: '🧑‍🌾' },
  '등용': { word: '등용', simple: '재능과 능력이 뛰어난 사람을 뽑아서 중요한 일을 맡김', emoji: '🌟' },
  '집현전': { word: '집현전', simple: '세종대왕과 똑똑한 학자들이 모여 공부하고 연구하던 궁궐 안 연구소', emoji: '🏛️' },
  '자격루': { word: '자격루', simple: '물이 떨어지는 힘으로 스스로 종을 쳐서 시간을 알려주던 옛날 자동 물시계', emoji: '⏰' },
  '측우기': { word: '측우기', simple: '비가 얼마나 내렸는지 그 양을 정확히 재는 세계 최초의 원통 모양 그릇', emoji: '🌧️' },
  '앙부일구': { word: '앙부일구', simple: '가마솥 모양의 오목한 판에 해 그림자가 비쳐 시간을 알 수 있는 해시계', emoji: '☀️' },
  '여진족': { word: '여진족', simple: '조선 북쪽 국경 너머에 살며 자주 국경을 넘어와 괴롭히던 다른 민족', emoji: '🏹' },
  '4군 6진': { word: '4군 6진', simple: '세종대왕이 북쪽 국경(압록강과 두만강)을 튼튼히 지키기 위해 설치한 군사 기지', emoji: '🛡️' },
  '공법': { word: '공법', simple: '농사가 잘된 정도에 따라 공평하게 세금을 내도록 만든 세종대왕의 세금 법', emoji: '⚖️' },
  '해례본': { word: '해례본', simple: '한글(훈민정음)을 왜 만들었고 어떻게 읽는지 친절하게 설명해 놓은 책', emoji: '📖' },
  '애민정신': { word: '애민정신', simple: '백성을 가족처럼 아끼고 사랑하는 따뜻한 마음', emoji: '❤️' },

  // 이순신 장군 관련
  '삼도수군통제사': { word: '삼도수군통제사', simple: '조선의 남쪽 바다를 지키는 모든 해군을 총지휘하는 최고 대장군', emoji: '🎖️' },
  '임진왜란': { word: '임진왜란', simple: '1592년 일본(왜군)이 바다를 건너 조선을 침략해 일어난 큰 전쟁', emoji: '⚔️' },
  '거북선': { word: '거북선', simple: '거북이 모양 등딱지에 쇠못을 꽂고 대포를 쏘아 적선을 격파한 무적의 전투함', emoji: '🐢' },
  '판옥선': { word: '판옥선', simple: '조선 수군의 튼튼한 2층짜리 주력 전투 배', emoji: '⛵' },
  '학익진': { word: '학익진', simple: '학이 날개를 쫙 펼친 모양처럼 배들을 반원형으로 둘러싸 적을 공격하는 전술', emoji: '🦅' },
  '명량대첩': { word: '명량대첩', simple: '이순신 장군이 단 13척의 배로 133척이 넘는 왜군 함대를 물리친 기적의 바다 싸움', emoji: '🌊' },
  '울돌목': { word: '울돌목', simple: '바위가 우는 소리가 날 정도로 바닷물이 아주 빠르고 소용돌이치는 좁은 바다 길', emoji: '🌀' },
  '난중일기': { word: '난중일기', simple: '이순신 장군이 7년 동안 전쟁 중에 날마다 솔직하게 적은 일기책', emoji: '📓' },
  '무과': { word: '무과', simple: '옛날 나라를 지키는 군인(장수)을 뽑기 위해 치르던 무술 시험', emoji: '🎯' },

  // 마리 퀴리 관련
  '방사능': { word: '방사능', simple: '눈에 보이지 않지만 아주 강한 빛이나 에너지를 스스로 내뿜는 신비한 성질', emoji: '⚛️' },
  '라듐': { word: '라듐', simple: '어두운 곳에서 푸른빛을 내며 병을 치료하는 데 쓰이는 신비한 원소 물질', emoji: '✨' },
  '폴로늄': { word: '폴로늄', simple: '마리 퀴리가 자신의 조국인 폴란드를 잊지 않으려고 이름 붙인 새로운 원소', emoji: '🧪' },
  '피치블렌드': { word: '피치블렌드', simple: '라듐과 우라늄이 조금 들어 있는 무겁고 검은 천연 광석(돌)', emoji: '🪨' },
  '노벨상': { word: '노벨상', simple: '인류를 위해 세상에서 가장 위대한 발견이나 평화를 이룬 사람에게 주는 세계 최고의 상', emoji: '🥇' },
  '소르본 대학': { word: '소르본 대학', simple: '프랑스 파리에 있는 오랜 역사와 명성을 가진 유명한 대학교', emoji: '🎓' },

  // 제인 구달 관련
  '영장류': { word: '영장류', simple: '사람, 원숭이, 침팬지, 고릴라처럼 손발을 잘 쓰고 영리한 동물 무리', emoji: '🐒' },
  '곰비': { word: '곰비', simple: '아프리카 탄자니아에 있는 침팬지들이 자유롭게 살아가는 국립공원 숲', emoji: '🌳' },
  '침팬지': { word: '침팬지', simple: '도구를 사용하고 감정을 표현할 줄 아는 인간과 가장 가까운 동물 친구', emoji: '🐵' },

  // 스티브 잡스 관련
  '그래픽 사용자 인터페이스': { word: 'GUI', simple: '어려운 컴퓨터 명령어 대신 마우스로 화면의 그림 아이콘을 눌러 쉽게 작동시키는 방식', emoji: '🖥️' },
  '혁신': { word: '혁신', simple: '모두의 생활이 더 편리하고 즐거워지도록 완전히 새로운 방식으로 바꾸는 것', emoji: '🚀' },
  '스마트폰': { word: '스마트폰', simple: '전화기 속에 컴퓨터, 카메라, 음악 플레이어, 인터넷을 모두 담은 똑똑한 손안의 기기', emoji: '📱' },

  // 손흥민 관련
  '프리미어리그': { word: '프리미어리그', simple: '전 세계에서 가장 축구를 잘하는 선수들이 모여 경기하는 영국의 프로 축구 리그', emoji: '⚽' },
  '골든 부트': { word: '골든 부트', simple: '축구 경기 시즌 동안 골을 가장 많이 넣은 1등 득점왕에게 주는 황금 축구화 상', emoji: '🏆' },
  '푸스카스상': { word: '푸스카스상', simple: '한 해 동안 전 세계 축구 경기 중 가장 환상적이고 멋진 골을 넣은 선수에게 주는 상', emoji: '⭐' },
  '양발잡이': { word: '양발잡이', simple: '왼발과 오른발을 둘 다 똑같이 자유자재로 잘 차는 대단한 축구 실력', emoji: '👟' },

  // 공통 개념어
  '가상 분기': { word: '만약에?', simple: '실제 역사와 다르게 내가 다른 선택을 했을 때 일어날 수 있는 상상 이야기', emoji: '🔮' },
  '역량': { word: '슈퍼 파워', simple: '내가 가진 뛰어난 능력과 마음의 힘', emoji: '💪' },
  '어진': { word: '어진', simple: '옛날 왕의 얼굴을 정성껏 그린 공식 초상화 그림', emoji: '🖼️' },
  '유네스코': { word: '유네스코', simple: '전 세계의 소중한 문화재와 자연을 함께 지켜주는 국제기구', emoji: '🌍' },
  '세계기록유산': { word: '세계기록유산', simple: '인류 역사의 위대한 책이나 기록물을 전 세계가 함께 영원히 보존하는 보물', emoji: '📜' },
};

// Returns definition if text contains keywords
export function findDefinitionsInText(text: string): WordDefinition[] {
  const found: WordDefinition[] = [];
  const lower = text.toLowerCase();
  
  for (const [key, def] of Object.entries(ELEMENTARY_DICTIONARY)) {
    if (text.includes(key)) {
      found.push(def);
    }
  }
  return found;
}
