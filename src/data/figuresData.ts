import { Figure } from '../types';

const commonsFile = (filename: string, width = 1000) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;

export const FIGURES_DATA: Figure[] = [
  // 1. 세종대왕
  {
    id: 'sejong',
    name: '세종대왕',
    title: '백성을 사랑한 성군 & 훈민정음 창제자',
    role: '조선의 제4대 국왕 / 언어학자 / 과학 진흥가',
    nationality: 'korea',
    category: 'leadership',
    era: '조선 전기 (1397 ~ 1450)',
    motto: '백성은 나라의 근본이니, 백성을 이롭게 하는 것이 나의 길이다.',
    superPower: '창의적 애민정신과 배움의 끈기',
    superPowerDescription: '문제를 깊이 탐구하고 다른 사람의 아픔에 공감하여 세상을 바꾸는 혁신을 만들어내는 힘!',
    color: '#DC2626',
    accentColor: '#FEF3C7',
    avatarIcon: '👑',
    photoUrl: commonsFile('Portrait of King Sejong 1965.jpg', 700),
    summary: '조선의 황금기를 이끈 성군으로, 백성들이 쉽게 글을 읽고 쓸 수 있도록 훈민정음을 창제하고 장영실 등 인재를 신분 차별 없이 등용해 과학기술과 문화를 꽃피웠습니다.',
    stages: [
      {
        stageNumber: 1,
        period: '유년기 (10세)',
        title: '형들 사이에서 책에 푹 빠진 충녕대군',
        situation: '어린 충녕은 눈병이 나고 몸이 아플 때까지 책만 읽어 아버지 태종이 방 안의 모든 책을 치워버렸어요. 그런데 방구석 병풍 뒤에서 우연히 책 한 권(구소수간)을 발견했어요! 나는 어떻게 할까요?',
        characterDialogue: '"책 속에 세상의 모든 지혜와 백성을 도울 방법이 담겨 있구나..."',
        visualTheme: 'ancient_library',
        illustrationKey: 'sejong_reading',
        realPhotoUrl: commonsFile('Korea-Domun.daejak-01.jpg', 1000),
        realPhotoDescription: '조선시대 고서 《도문대작》(1611) — 충녕대군이 읽었다는 《구소수간》 실물 사진은 확인하기 어려워, 조선의 책 문화를 보여 주는 관련 고서 자료입니다.',
        funFact: '세종대왕은 마음에 드는 책은 무려 100번 넘게 읽는 ‘백독백습(百讀百習)’을 실천한 독서광이었어요.',
        choices: [
          {
            id: 'c1',
            text: '책을 몰래 궁 밖으로 빼돌려 친구들에게 자랑만 하고 놀러 간다.',
            isCorrect: false,
            feedback: '가상 분기: 깊은 학문적 소양을 쌓지 못해 훗날 신하들과 국정을 토론할 깊은 실력을 갖추지 못하게 됩니다. 다시 도전해볼까요?'
          },
          {
            id: 'c2',
            text: '아픈 눈을 비비며 남은 책 한 권을 100번 넘게 반복해서 깊이 읽는다.',
            isCorrect: true,
            feedback: '정답입니다! 반복해서 깊이 읽은 지식이 훗날 집현전 학자들을 이끌고 나라를 다스리는 든든한 밑거름이 되었어요!',
            historicalNote: '태종 임금은 충녕의 지독한 독서 열정에 감탄해 결국 다시 책을 읽게 허락해 주었답니다.'
          },
          {
            id: 'c3',
            text: '아버지의 명을 어겼다고 혼날까 봐 책을 발견하지 않은 척 그냥 덮어둔다.',
            isCorrect: false,
            feedback: '가상 분기: 배움의 기회를 스스로 놓치게 됩니다. 배움에 대한 뜨거운 열정을 발휘해 보세요!'
          }
        ]
      },
      {
        stageNumber: 2,
        period: '청년기 (22세)',
        title: '즉위와 집현전의 인재 등용',
        situation: '왕위에 오른 후 나라를 발전시키기 위해 학문 연구 기관인 \'집현전\'을 넓히려 해요. 이때 관노(노비) 출신이지만 손재주와 발명 능력이 뛰어난 \'장영실\'을 어떻게 대할까요?',
        characterDialogue: '"신분보다 더 중요한 것은 나라와 백성을 향한 뛰어난 재능과 열정이다!"',
        visualTheme: 'palace_hall',
        illustrationKey: 'sejong_jangyeongsil',
        realPhotoUrl: commonsFile('Jang Youngsil 1.jpg', 1000),
        realPhotoDescription: '장영실 동상 — 신분보다 재능을 보고 발탁한 세종의 인재 등용을 보여 주는 인물 자료입니다.',
        funFact: '장영실은 노비였지만 세종대왕의 파격적인 지지로 종3품 대호군(고위 관직)까지 올랐어요.',
        choices: [
          {
            id: 'c1',
            text: '신분 제도에 얽매이지 않고 능력을 인정해 궁궐 기술자로 발탁하고 관직을 내린다.',
            isCorrect: true,
            feedback: '정답입니다! 세종은 장영실의 재능을 적극 활용했고, 장영실을 비롯한 세종 시대 기술자들은 자격루·앙부일구 등 뛰어난 과학기구를 제작하며 조선의 과학기술을 크게 발전시켰어요!',
            historicalNote: '세종은 중국으로 장영실을 유학까지 보내며 전폭적으로 후원했습니다.'
          },
          {
            id: 'c2',
            text: '신분 질서가 엄격하니 노비 신분을 유지시키고 단순 잔심부름만 시킨다.',
            isCorrect: false,
            feedback: '가상 분기: 장영실의 천재적인 재능이 묻혀 자격루와 측우기 같은 과학 유산들이 영영 탄생하지 못합니다.'
          },
          {
            id: 'c3',
            text: '신하들의 반발이 두려워 장영실을 궁궐 밖으로 내보낸다.',
            isCorrect: false,
            feedback: '가상 분기: 편견에 가로막혀 뛰어난 인재를 잃게 됩니다. 용기 있는 리더십을 발휘해 보세요!'
          }
        ]
      },
      {
        stageNumber: 3,
        period: '국방·영토 (36세)',
        title: '북방 국경의 여진족 침입과 4군 6진',
        situation: '압록강과 두만강 유역에서 여진족이 국경을 넘어와 백성들을 계속 약탈하고 있어요. 신하들은 전쟁 비용이 많이 드니 방어만 하자고 주장하는데, 세종의 결단은?',
        characterDialogue: '"우리 백성이 안심하고 농사를 지을 수 있도록 국경을 확실히 지켜내야 한다."',
        visualTheme: 'fortress_border',
        illustrationKey: 'sejong_4gun6jin',
        realPhotoUrl: commonsFile('Yukchin.jpg', 1000),
        realPhotoDescription: '《대동여지도》에서 세종이 15세기에 설치한 북동 6진 지역을 보여 주는 지도 자료 — 4군 6진 개척의 북방 경계를 구체적으로 살펴볼 수 있습니다.',
        funFact: '세종대왕 때 개척한 4군 6진 덕분에 오늘날 한반도의 압록강-두만강 국경선이 완성되었어요.',
        choices: [
          {
            id: 'c1',
            text: '전쟁을 피하기 위해 북쪽 땅을 포기하고 군사를 남쪽으로 후퇴시킨다.',
            isCorrect: false,
            feedback: '가상 분기: 국토를 잃고 북방 백성들이 끊임없이 약탈에 시달리게 됩니다. 백성을 지키는 결단을 내려보세요!'
          },
          {
            id: 'c2',
            text: '성벽만 높이 쌓고 여진족이 침입할 때마다 조공(선물)을 바쳐 달랜다.',
            isCorrect: false,
            feedback: '가상 분기: 근본적인 해결책이 되지 못해 백성들의 불안이 지속됩니다.'
          },
          {
            id: 'c3',
            text: '최윤덕과 김종서 장군을 파견해 4군 6진을 개척하고 국경선을 튼튼히 확립한다.',
            isCorrect: true,
            feedback: '훌륭한 리더십! 백성들을 이주시켜 북쪽 땅을 살기 좋은 터전으로 만들고 오늘날의 국경선을 확립했어요!',
            historicalNote: '용맹한 호랑이 김종서와 최윤덕 장군이 세종의 뜻을 받들어 국토를 넓혔습니다.'
          }
        ]
      },
      {
        stageNumber: 4,
        period: '민생·복지 (43세)',
        title: '토지 세금 제도(공법) 개혁과 최초의 여론조사',
        situation: '관리들의 부정을 막고 가난한 농민의 세금 부담을 줄이기 위해 새 세금 제도(공법)를 만들려 해요. 신하들이 반대하자 세종은 어떤 방법을 선택할까요?',
        characterDialogue: '"백성에게 편리하지 않다면 아무리 좋은 법이라도 시행할 수 없다."',
        visualTheme: 'village_people',
        illustrationKey: 'sejong_vote',
        realPhotoUrl: commonsFile('세종실록 표지.gif', 1000),
        realPhotoDescription: '《세종실록》 6~8권 표지 — 공법 개혁과 백성 의견 수렴 과정이 기록된 세종 시대의 핵심 국가 기록 자료입니다. 장영실 사진은 바로 앞 인재 등용 단계에서 확인할 수 있습니다.',
        funFact: '세종 12년(1430년), 무려 17만 2,806명의 백성을 대상으로 5개월간 대규모 여론조사를 실시했어요.',
        choices: [
          {
            id: 'c1',
            text: '왕의 절대 권력으로 밀어붙여 반대하는 신하들을 가두고 강제로 법을 시행한다.',
            isCorrect: false,
            feedback: '가상 분기: 백성들의 실정을 고려하지 못한 졸속 법이 되어 원망이 커집니다.'
          },
          {
            id: 'c2',
            text: '약 17만 명의 일반 백성에게 찬반 의견을 직접 묻는 대규모 여론조사를 실시한다.',
            isCorrect: true,
            feedback: '대단한 소통! 백성들의 찬반 의견을 꼼꼼히 듣고 오랜 기간 제도를 보완해 더 공평한 세법을 만들어 갔어요!',
            historicalNote: '당시 찬성 9만 8천여 표, 반대 7만 4천여 표의 결과를 토대로 풍흉에 따라 9등급으로 세금을 매기는 전분6등 연분9등법이 만들어졌습니다.'
          },
          {
            id: 'c3',
            text: '신하들이 반대하니 세금 제도 개혁을 전면 취소하고 원래대로 둔다.',
            isCorrect: false,
            feedback: '가상 분기: 가난한 농민들이 계속 불공평한 세금 고통을 겪게 됩니다.'
          }
        ]
      },
      {
        stageNumber: 5,
        period: '결실기 (46세)',
        title: '눈병 악화와 한글(훈민정음) 창제',
        situation: '백성들이 글을 몰라 억울한 벌을 받는 것을 보고 새 글자를 만들려 하자, 최만리 등 유학자들이 명나라와의 관계와 유교 예법을 들며 결사반대했어요. 눈병으로 앞이 흐려진 세종의 결단은?',
        characterDialogue: '"나랏말이 중국과 달라 문자로 서로 통하지 아니하니... 내 이를 가엾게 여겨 새로 스물여덟 자를 만드노라."',
        visualTheme: 'hunminjeongeum_room',
        illustrationKey: 'sejong_hangul',
        realPhotoUrl: commonsFile('Hunminjeongum.jpg', 1000),
        realPhotoDescription: '1446년 훈민정음 해례본 — 새 문자의 원리와 사용법을 설명한 핵심 기록입니다.',
        funFact: '훈민정음은 만든 사람과 창제 원리, 사용법이 명확히 기록된 전 세계 유일무이한 문자입니다.',
        choices: [
          {
            id: 'c1',
            text: '신하들의 거센 반대에 부딪혀 연구를 중단하고 어려운 한문만 쓰게 한다.',
            isCorrect: false,
            feedback: '가상 분기: 일반 백성들은 영영 글을 배우지 못하고 한글의 위대한 탄생이 사라집니다.'
          },
          {
            id: 'c2',
            text: '귀족 양반들만 쓸 수 있도록 글자를 더 어렵고 복잡하게 만든다.',
            isCorrect: false,
            feedback: '가상 분기: 백성을 사랑하는 애민정신의 본래 뜻과 정반대의 결과가 됩니다.'
          },
          {
            id: 'c3',
            text: '끝까지 신하들을 설득하고 독자적으로 연구를 이어가 마침내 누구나 배우기 쉬운 \'훈민정음 28자\'를 반포한다.',
            isCorrect: true,
            feedback: '감동적인 역사 완성! 세종대왕의 따뜻한 사랑 덕분에 오늘날 전 세계에서 가장 과학적인 우리글 한글이 탄생했어요!',
            historicalNote: '1443년 창제되어 1446년 반포된 훈민정음은 유네스코 세계기록유산으로 등재되었습니다.'
          }
        ]
      }
    ]
  },

  // 2. 충무공 이순신
  {
    id: 'yisunsin',
    name: '충무공 이순신',
    title: '불패의 신화 & 나라를 구한 구국의 영웅',
    role: '조선 삼도수군통제사 / 전략가 / 참군인',
    nationality: 'korea',
    category: 'leadership',
    era: '조선 중기 (1545 ~ 1598)',
    motto: '죽고자 하면 살고, 살고자 하면 죽는다! (필사즉생 필생즉사)',
    superPower: '강직한 원칙주의와 불굴의 책임감',
    superPowerDescription: '어떤 절망적인 상황에서도 포기하지 않고 철저한 준비와 지혜로 위기를 기회로 바꾸는 힘!',
    color: '#0284C7',
    accentColor: '#E0F2FE',
    avatarIcon: '🛡️',
    photoUrl: commonsFile('전 이순신 초상 (cropped).jpg', 700),
    summary: '임진왜란에서 23전 23승 무패의 신화를 쓰며 바다를 지켜 나라를 구한 명장. 철저한 준비정신으로 거북선을 만들고 명량대첩의 기적을 이뤄냈습니다.',
    stages: [
      {
        stageNumber: 1,
        period: '청년기 (32세)',
        title: '무과 시험 중 낙마 사고와 의지',
        situation: '32세 늦은 나이에 치른 무과 시험에서 말을 타고 달리던 중 말이 발을 헛디뎌 떨어져 다리가 부러졌어요! 큰 고통 속에서 이순신은 어떻게 할까요?',
        characterDialogue: '"여기서 포기한다면 나라를 지키는 군인이 될 자격이 없다!"',
        visualTheme: 'exam_ground',
        illustrationKey: 'yisunsin_horse',
        realPhotoUrl: commonsFile('Yi Sun-sin, Chungminsa, The Chosun Ilbo 1929.jpg', 1000),
        realPhotoDescription: '1929년 신문에 남은 충민사 이순신 초상 자료 — 무과 낙마 순간의 사진은 존재하지 않아 청년기의 도전을 설명하는 관련 사료로 사용합니다.',
        funFact: '이순신은 4년 후 다시 무과에 도전해 당당히 합격하며 불굴의 뚝심을 증명했어요.',
        choices: [
          {
            id: 'c1',
            text: '주변의 버드나무 가지를 꺾어 부러진 다리를 동여매고 끝까지 시험을 마친다.',
            isCorrect: true,
            feedback: '불굴의 투혼! 비록 그해 시험엔 불합격했지만, 그의 강인한 정신력은 훗날 모든 장병들에게 엄청난 귀감이 되었어요!',
            historicalNote: '이 일화는 조선왕조실록과 난중일기에 생생하게 기록되어 전해집니다.'
          },
          {
            id: 'c2',
            text: '다리가 아프니 울면서 시험을 포기하고 집으로 돌아가 무인의 길을 접는다.',
            isCorrect: false,
            feedback: '가상 분기: 조선 수군을 이끌 구국의 명장이 탄생하지 못하게 됩니다.'
          },
          {
            id: 'c3',
            text: '시험 감독관에게 시험장을 잘못 관리했다며 화를 내고 항의한다.',
            isCorrect: false,
            feedback: '가상 분기: 무인으로서의 품격을 잃고 맙니다. 어떤 역경에도 의연하게 대처하는 참군인의 자세를 보여주세요!'
          }
        ]
      },
      {
        stageNumber: 2,
        period: '관직 생활 (35세)',
        title: '상관의 부당한 명령과 오동나무 사건',
        situation: '훈련원 봉관 시절, 직속 상관인 병조정랑이 자기 집 거문고를 만들겠다며 관청 뜰의 오동나무를 베어오라고 명령했어요. 강직한 이순신의 선택은?',
        characterDialogue: '"관청의 나무는 나라의 공공재산이니 사사로이 벨 수 없습니다."',
        visualTheme: 'barracks_tree',
        illustrationKey: 'yisunsin_tree',
        realPhotoUrl: commonsFile('SignatureYiSunSin.png', 1000),
        realPhotoDescription: '이순신의 친필 수결(서명) — 부당한 명령 앞에서도 원칙을 지킨 관직 생활을 보여 주는 직접 사료입니다.',
        funFact: '이순신은 원칙을 지키느라 승진에서 번번이 누락되었지만, 청렴하고 바른 성품으로 유명해졌어요.',
        choices: [
          {
            id: 'c1',
            text: '상관에게 잘 보여 빨리 승진하기 위해 제일 좋은 오동나무를 베어 바친다.',
            isCorrect: false,
            feedback: '가상 분기: 부정부패에 타협하여 훗날 수많은 부하들이 목숨을 바쳐 따르는 청렴한 통제사가 되지 못합니다.'
          },
          {
            id: 'c2',
            text: '"나라의 나무는 관청의 물건이라 벨 수 없다"며 단호히 거절한다.',
            isCorrect: true,
            feedback: '대쪽 같은 청렴함! 상관에게 밉보여 승진은 늦어졌지만, 부하들과 백성들의 절대적인 신뢰를 얻는 참군인의 기초가 되었어요!',
            historicalNote: '이순신 장군은 평생 뇌물과 청탁을 단 한 번도 용납하지 않았습니다.'
          },
          {
            id: 'c3',
            text: '동료에게 몰래 시켜서 대신 나무를 베어오게 한다.',
            isCorrect: false,
            feedback: '가상 분기: 책임을 회피하는 행동은 진정한 리더의 모습이 아닙니다.'
          }
        ]
      },
      {
        stageNumber: 3,
        period: '전쟁 준비 (47세)',
        title: '왜란의 조짐과 거북선 건조',
        situation: '전라좌수사로 부임한 이순신은 일본의 침략 징후를 감지했어요. 조정에서는 설마 전쟁이 나겠냐며 태평한데, 이순신은 어떻게 대비할까요?',
        characterDialogue: '"유비무환! 미리 준비가 되어 있으면 근심이 없다."',
        visualTheme: 'dockyard_turtle',
        illustrationKey: 'yisunsin_turtle',
        realPhotoUrl: commonsFile('TurtleShipPainting.jpg', 1000),
        realPhotoDescription: '1795년 《이충무공전서》에 실린 거북선 그림 — 임진왜란 직전 거북선 건조를 전하는 후대 기록 자료입니다.',
        funFact: '거북선에서 대포를 시험 발사한 바로 다음 날, 실제로 왜군이 쳐들어오며 임진왜란이 일어났어요!',
        choices: [
          {
            id: 'c1',
            text: '조정의 눈치만 보며 병사들의 훈련을 줄이고 편하게 쉬게 한다.',
            isCorrect: false,
            feedback: '가상 분기: 무방비 상태로 왜군의 기습을 맞아 바다를 빼앗기게 됩니다.'
          },
          {
            id: 'c2',
            text: '나주호 등 기술자와 함께 철갑을 두른 거북선을 만들고 판옥선과 화포를 완벽히 정비한다.',
            isCorrect: true,
            feedback: '완벽한 대비! 임진왜란 발발 직전 완성된 거북선과 판옥선은 해전에서 왜군 선단을 격파하는 최강의 비밀병기가 되었어요!',
            historicalNote: '거북선은 적진 한가운데로 돌진해 왜선의 지휘부를 무너뜨리는 돌격선 역할을 했습니다.'
          },
          {
            id: 'c3',
            text: '다른 장수들처럼 술을 마시고 잔치를 열며 세월을 보낸다.',
            isCorrect: false,
            feedback: '가상 분기: 전쟁에 대비하지 못해 큰 재앙을 겪게 됩니다.'
          }
        ]
      },
      {
        stageNumber: 4,
        period: '대첩 (48세)',
        title: '한산도 대첩과 학익진 전술',
        situation: '왜군의 대규모 정예 함대가 견내량에 집결했어요. 좁은 해협에서 무리하게 싸우면 아군이 불리한데, 어떤 전략을 펼칠까요?',
        characterDialogue: '"적을 넓은 바다로 유인하여 학의 날개를 펼쳐 일제히 격멸한다!"',
        visualTheme: 'sea_battle_crane',
        illustrationKey: 'yisunsin_crane',
        realPhotoUrl: commonsFile('Documentary painting of the Battle of Hansan Island.jpg', 1000),
        realPhotoDescription: '한산도대첩을 재현한 전쟁기념관 공개 기록화 — 1592년 전투를 이해하기 위한 후대 그림 자료입니다.',
        funFact: '한산도 대첩은 살라미스 해전, 칼레 해전, 트라팔가르 해전과 함께 세계 4대 해전으로 꼽혀요.',
        choices: [
          {
            id: 'c1',
            text: '좁은 견내량 수로 안으로 아군 함대를 무작정 돌진시켜 백병전을 벌인다.',
            isCorrect: false,
            feedback: '가상 분기: 칼싸움에 능한 왜군에게 말려들어 아군 판옥선이 포위당할 위험에 처합니다.'
          },
          {
            id: 'c2',
            text: '싸우지 않고 바다를 버린 채 육지로 도망친다.',
            isCorrect: false,
            feedback: '가상 분기: 남해 바다의 통제권을 완전히 빼앗기게 됩니다.'
          },
          {
            id: 'c3',
            text: '몇 척의 배로 거짓 후퇴하여 왜선을 넓은 한산도 앞바다로 유인한 뒤 학익진을 펼쳐 화포로 섬멸한다.',
            isCorrect: true,
            feedback: '완벽한 승리! 왜선 59척을 격파하며 왜군의 서해 진출을 완전히 차단하고 임진왜란의 전세를 뒤집었습니다!',
            historicalNote: '학익진은 학이 날개를 펼치듯 포위하여 아군의 강력한 천·지·현·황자총통을 일제 사격하는 진법입니다.'
          }
        ]
      },
      {
        stageNumber: 5,
        period: '기적 (53세)',
        title: '절망 속의 명량대첩 (13척 대 133척)',
        situation: '원균의 칠천량 패전으로 수군이 궤멸되고 겨우 12척(후에 13척)만 남았어요. 선조 임금이 수군을 폐지하고 육군에 합류하라 명하는데, 이순신의 결단은?',
        characterDialogue: '"신에게는 아직 열두 척의 전선이 남아 있사옵니다... (금유십이 전선미괴)"',
        visualTheme: 'myeongnyang_whirlpool',
        illustrationKey: 'yisunsin_myeongnyang',
        realPhotoUrl: commonsFile('진도 울돌목 (1379).jpeg', 1000),
        realPhotoDescription: '현재의 진도 울돌목 실제 모습(2020) — 명량대첩 당시와 같은 좁고 거센 해협 지형을 보여 주는 현장 자료입니다.',
        funFact: '이순신은 울돌목의 좁은 지형과 빠른 조류(바닷물 흐름)의 변화를 치밀하게 계산해 싸웠어요.',
        choices: [
          {
            id: 'c1',
            text: '13척으로는 승산이 전혀 없으니 배를 불태우고 육군으로 편입한다.',
            isCorrect: false,
            feedback: '가상 분기: 바다가 뚫려 왜군이 한양과 서해 곡창지대를 직격하게 됩니다.'
          },
          {
            id: 'c2',
            text: '"신에게는 아직 12척의 배가 있습니다!" 장계를 올리고, 울돌목의 거센 물살을 이용해 133척의 왜선을 기적처럼 격파한다.',
            isCorrect: true,
            feedback: '인류 역사상 가장 위대한 승리! 단 13척으로 왜선 31척을 침몰시키고 왜군을 퇴각시켜 조선을 절체절명의 위기에서 구했습니다!',
            historicalNote: '이순신 장군의 불멸의 명언 "필사즉생 필생즉사"가 바로 이 명량 해전을 앞두고 장병들에게 전한 훈시입니다.'
          },
          {
            id: 'c3',
            text: '바다 깊숙한 곳으로 도망쳐 숨어 왜군이 지나가기만을 기다린다.',
            isCorrect: false,
            feedback: '가상 분기: 백성들이 도륙당하고 국토가 유린됩니다. 나라를 위해 당당히 맞서 싸우는 용기를 발휘해 보세요!'
          }
        ]
      }
    ]
  },

  // 3. 마리 퀴리
  {
    id: 'marie_curie',
    name: '마리 퀴리',
    title: '두 번의 노벨상을 수상한 최초의 여성 과학자',
    role: '물리학자 / 화학자 / 방사능 연구의 개척자',
    nationality: 'world',
    category: 'science',
    era: '근현대 (1867 ~ 1934)',
    motto: '삶에서 두려워해야 할 것은 아무것도 없다. 단지 이해해야 할 뿐이다.',
    superPower: '칠흑 같은 어둠을 밝히는 끈기와 탐구열',
    superPowerDescription: '수천 번의 실패와 가난 속에서도 진리를 향해 묵묵히 나아가는 집념의 힘!',
    color: '#8B5CF6',
    accentColor: '#EDE9FE',
    avatarIcon: '🧪',
    photoUrl: commonsFile('Marie Curie c. 1898 (cropped).jpg', 700),
    summary: '폴란드 출신의 위대한 과학자로 여성 최초로 노벨 물리학상과 노벨 화학상을 모두 수상했습니다. 피치블렌드 원석을 정제하여 폴로늄과 라듐을 발견하고 의학 발전에 기여했습니다.',
    stages: [
      {
        stageNumber: 1,
        period: '청년기 (24세)',
        title: '폴란드의 억압을 넘어 파리 소르본으로',
        situation: '당시 폴란드에서는 여성에게 대학 교육의 기회가 매우 제한되어 있었어요. 마리아는 비밀 교육 활동과 가정교사 일을 하며 공부를 이어가다가, 24세에 더 깊이 배우기 위해 프랑스 파리의 소르본으로 떠나기로 합니다. 낯선 나라와 가난을 감수하고도 도전할까요?',
        characterDialogue: '"배울 수 있는 곳이 있다면, 가난하고 낯설어도 나는 그 길을 선택하겠어."',
        visualTheme: 'secret_classroom',
        illustrationKey: 'curie_secret_school',
        realPhotoUrl: commonsFile('Maria Skłodowska arrives in Paris, 1891.jpg', 1000),
        realPhotoDescription: '1891년 파리에 도착해 소르본 학생이 된 24세 마리아 스클로도프스카(훗날 마리 퀴리)의 실제 사진입니다.',
        funFact: '마리와 언니 브로니아는 서로의 유학비를 벌어주기 위해 가정교사 일을 번갈아 가며 도왔어요.',
        choices: [
          {
            id: 'c1',
            text: '여성은 대학에 갈 수 없다는 법을 순순히 따르고 공부를 완전히 그만둔다.',
            isCorrect: false,
            feedback: '가상 분기: 인류 역사상 가장 위대한 여성 과학자의 연구가 시작조차 되지 못합니다.'
          },
          {
            id: 'c2',
            text: '부유한 귀족에게 시집을 가서 편안한 삶을 누린다.',
            isCorrect: false,
            feedback: '가상 분기: 마리의 뛰어난 지적 탐구심이 평범하게 묻히고 맙니다.'
          },
          {
            id: 'c3',
            text: '비밀 지하 대학인 \'비행 대학(Flying University)\'에서 공부하고, 프랑스 소르본 대학 유학을 위해 가정교사로 돈을 모은다.',
            isCorrect: true,
            feedback: '정답입니다! 극심한 가난 속에서도 배움을 포기하지 않고 파리로 유학을 떠나 물리학과 수학을 수석으로 졸업했어요!',
            historicalNote: '마리 퀴리는 파리 다락방에서 빵과 차로 끼니를 때우며 하루 14시간씩 공부했습니다.'
          }
        ]
      },
      {
        stageNumber: 2,
        period: '연구기 (31세)',
        title: '피치블렌드 광석과 4년간의 고된 정제 작업',
        situation: '우라늄 광석 찌꺼기인 무거운 피치블렌드 톤 단위 원석에서 미지의 강한 방사성 물질을 추출하려 해요. 낡은 창고에서 유독가스를 마시며 쇠막대로 저어야 하는 고된 노동 속에서 마리의 선택은?',
        characterDialogue: '"이 검은 돌 속에 분명 세상을 밝힐 새로운 원소가 숨어 있어!"',
        visualTheme: 'cold_lab_flask',
        illustrationKey: 'curie_pitchblende',
        realPhotoUrl: commonsFile('Pierre and Marie Curie.jpg', 1000),
        realPhotoDescription: '약 1904년 연구실에서 방사능 측정 장치를 다루는 피에르와 마리 퀴리 — 피치블렌드 연구와 라듐 발견 과정에 직접 연결되는 사진입니다.',
        funFact: '마리 퀴리는 무려 8톤의 광석을 손수 끓이고 저어 단 0.1g의 순수 염화라듐을 추출해 냈어요!',
        choices: [
          {
            id: 'c1',
            text: '피에르 퀴리와 함께 4년간 수천 번의 분별 결정화 작업을 거쳐 \'라듐\'과 \'폴로늄\'을 발견한다.',
            isCorrect: true,
            feedback: '경이로운 집념! 조국 폴란드의 이름을 딴 \'폴로늄\'과 어둠 속에서 푸른빛을 내는 \'라듐\'을 마침내 분리해 냈습니다!',
            historicalNote: '1903년 마리 퀴리는 여성 최초로 노벨 물리학상을 수상했습니다.'
          },
          {
            id: 'c2',
            text: '몸이 너무 힘들고 손에 화상을 입자 광석을 내다 버리고 연구를 포기한다.',
            isCorrect: false,
            feedback: '가상 분기: 방사능 원소 라듐의 발견이 수십 년 뒤로 미뤄지게 됩니다.'
          },
          {
            id: 'c3',
            text: '연구를 대충 마무리하고 가짜 결과를 학회에 발표한다.',
            isCorrect: false,
            feedback: '가상 분기: 과학자로서의 진실성과 명예를 잃게 됩니다.'
          }
        ]
      },
      {
        stageNumber: 3,
        period: '특허 포기 (35세)',
        title: '라듐 추출 특허와 과학의 공공성',
        situation: '라듐이 암 치료에 효과가 있다는 사실이 밝혀지자 전 세계 기업들이 거액의 특허료를 제안했어요. 특허를 등록하면 엄청난 백만장자가 될 수 있는데, 마리 부부의 결단은?',
        characterDialogue: '"라듐은 어떤 사람의 소유가 될 수 없다. 그것은 모든 인류를 위한 것이다."',
        visualTheme: 'radium_glow',
        illustrationKey: 'curie_patent',
        realPhotoUrl: commonsFile('Marie Curie in her laboratory.jpg', 1000),
        realPhotoDescription: '약 1900년 연구실에서 방사능을 측정하는 마리 퀴리 — 연구를 공개하고 과학을 확산한 활동을 보여 주는 실제 연구 현장 사진입니다.',
        funFact: '마리 퀴리의 특허 포기 덕분에 전 세계 병원에서 라듐을 이용한 암 방사선 치료법이 빠르게 보급되었어요.',
        choices: [
          {
            id: 'c1',
            text: '특허권을 비싸게 팔아 개인 호화 저택을 짓고 연구실을 닫는다.',
            isCorrect: false,
            feedback: '가상 분기: 가난한 암 환자들이 비싼 치료비 때문에 치료를 받지 못하게 됩니다.'
          },
          {
            id: 'c2',
            text: '라듐 제조법에 대한 모든 특허권을 포기하고 연구 결과를 전 세계 과학자들에게 무료로 공개한다.',
            isCorrect: true,
            feedback: '위대한 인류애! 마리의 이타적인 결단 덕분에 의학계는 즉시 라듐 방사선 암 치료 기술을 발전시킬 수 있었습니다!',
            historicalNote: '아인슈타인은 "마리 퀴리는 명예 때문에 오염되지 않은 유일한 사람"이라고 극찬했습니다.'
          },
          {
            id: 'c3',
            text: '프랑스 제약회사에만 독점 판매권을 주어 다른 나라에는 비밀로 한다.',
            isCorrect: false,
            feedback: '가상 분기: 전 세계 인류에게 공헌하고자 한 마리 퀴리의 고결한 신념에 어긋납니다.'
          }
        ]
      },
      {
        stageNumber: 4,
        period: '제1차 세계대전 (47세)',
        title: '전장의 이동식 엑스선 트럭 \'리틀 퀴리\'',
        situation: '제1차 세계대전이 발발하자 부상병들이 총알 파편의 위치를 몰라 헛되이 목숨을 잃고 있었어요. 퀴리는 전선으로 어떻게 달려갈까요?',
        characterDialogue: '"과학은 고통받는 사람들의 생명을 구할 때 가장 빛나는 법입니다."',
        visualTheme: 'war_xray_car',
        illustrationKey: 'curie_little_curie',
        realPhotoUrl: commonsFile('Marie Curie - Mobile X-Ray-Unit.jpg', 1000),
        realPhotoDescription: '제1차 세계대전 중 이동식 군 병원의 X선 장비와 함께한 마리 퀴리(약 1915) — ‘리틀 퀴리’ 활동과 직접 연결되는 실제 사진입니다.',
        funFact: '마리 퀴리는 직접 운전면허와 자동차 정비 기술을 배워 18대의 X선 차량을 이끌고 100만 명이 넘는 부상병을 치료했어요.',
        choices: [
          {
            id: 'c1',
            text: '위험한 전쟁터와 상관없이 안전한 스위스로 도피한다.',
            isCorrect: false,
            feedback: '가상 분기: 수많은 군인들이 전장에서 파편을 찾지 못해 다리를 절단당하거나 목숨을 잃습니다.'
          },
          {
            id: 'c2',
            text: '자신의 노벨상 금메달을 녹여 전쟁 성금으로 기부하려 하고, 자동차에 X선 장비를 장착한 \'리틀 퀴리\'를 이끌고 전선으로 향한다.',
            isCorrect: true,
            feedback: '진정한 인도주의 영웅! 직접 전선에서 X선 사진을 찍어 부상병들의 총알 파편을 찾아내 수많은 목숨을 살려냈습니다!',
            historicalNote: '딸 이렌과 함께 전선을 누비며 방사선 치료사들을 직접 교육했습니다.'
          },
          {
            id: 'c3',
            text: '연구소 문을 걸어 잠그고 전쟁이 끝나기만을 기다린다.',
            isCorrect: false,
            feedback: '가상 분기: 세상의 고통을 외면하지 않고 행동한 마리 퀴리의 용기를 본받아 보세요!'
          }
        ]
      },
      {
        stageNumber: 5,
        period: '결실기 (67세)',
        title: '두 번째 노벨상과 라듐 연구소 설립',
        situation: '1911년 단독으로 노벨 화학상을 수상한 마리 퀴리는 바르샤바와 파리에 세계적인 라듐 연구소를 설립하려 해요. 후배 연구자들에게 전할 그녀의 철학은?',
        characterDialogue: '"인류는 더 많은 선한 몽상가(Dreamer)를 필요로 합니다."',
        visualTheme: 'radium_institute',
        illustrationKey: 'curie_nobel_chem',
        realPhotoUrl: commonsFile('Marie Curie (Nobel-Chem).jpg', 1000),
        realPhotoDescription: '1911년 노벨 화학상 공식 사진 — 마리 퀴리가 두 번째 노벨상을 받은 바로 그 해의 실제 공식 초상입니다.',
        funFact: '마리 퀴리의 딸 이렌 졸리오퀴리와 사위 프레데리크 역시 1935년 노벨 화학상을 수상하여 세계 유일의 노벨상 가문이 되었어요.',
        choices: [
          {
            id: 'c1',
            text: '자신만의 비밀 연구 노트에 암호를 걸어두고 아무에게도 제자를 키우지 않는다.',
            isCorrect: false,
            feedback: '가상 분기: 퀴리의 훌륭한 학문적 유산이 후대에 이어지지 못합니다.'
          },
          {
            id: 'c2',
            text: '라듐 연구소를 설립하고 전 세계 젊은 과학자들을 지도하며 평생을 기초 과학과 의학 연구에 헌신한다.',
            isCorrect: true,
            feedback: '영원한 과학의 어머니! 그녀의 연구실에서 수많은 노벨상 수상자가 배출되었고 인류 암 치료의 토대가 완성되었습니다!',
            historicalNote: '마리 퀴리는 현재 프랑스 위인들의 국립 묘지인 파리 팡테옹에 여성 최초로 자신의 업적으로 안장되었습니다.'
          },
          {
            id: 'c3',
            text: '과학 연구를 그만두고 정치인이 되어 권력을 추구한다.',
            isCorrect: false,
            feedback: '가상 분기: 순수한 진리 탐구에 일생을 바친 마리 퀴리의 삶과 멀어집니다.'
          }
        ]
      }
    ]
  },

  // 4. 월트 디즈니
  {
    id: 'walt_disney',
    name: '월트 디즈니',
    title: '상상을 현실로 만든 꿈의 마술사 & 애니메이션 선구자',
    role: '애니메이터 / 영화 제작자 / 테마파크 창시자',
    nationality: 'world',
    category: 'arts',
    era: '근현대 (1901 ~ 1966)',
    motto: '꿈을 꿀 수 있다면, 그것을 이룰 수도 있다.',
    superPower: '무한한 상상력과 실패를 두려워하지 않는 도전 정신',
    superPowerDescription: '남들이 불가능하다고 비웃는 아이디어를 끝없는 열정과 창의성으로 마법처럼 구현하는 힘!',
    color: '#EC4899',
    accentColor: '#FDF2F8',
    avatarIcon: '🏰',
    photoUrl: commonsFile('Walt Disney 1946.JPG', 700),
    summary: '미키 마우스를 창조하고 초기 유성 애니메이션의 대중화를 이끌었으며, 장편 애니메이션 <백설공주>와 온 가족이 함께 즐기는 디즈니랜드를 만들어 대중문화의 새로운 기준을 세웠습니다.',
    stages: [
      {
        stageNumber: 1,
        period: '유년·청년기 (21세)',
        title: '첫 회사 파산과 차고에서의 재도전',
        situation: '캔자스시티에서 처음 차린 애니메이션 회사가 빚더미에 앉아 파산하고 말았어요. 주머니에 단돈 40달러만 남은 월트는 어떻게 할까요?',
        characterDialogue: '"실패는 성공의 훌륭한 디딤돌일 뿐이야. 할리우드로 가자!"',
        visualTheme: 'hollywood_train',
        illustrationKey: 'disney_train',
        realPhotoUrl: commonsFile('Walt Disney envelope ca. 1921.jpg', 1000),
        realPhotoDescription: '약 1921년 월트 디즈니가 사용한 사업용 봉투와 자화상 — 첫 회사를 시작하던 청년기의 실제 자료입니다.',
        funFact: '월트 디즈니는 파산 후 헐리우드로 가는 기차 안에서 종이와 연필 하나만 들고 새 애니메이션을 구상했어요.',
        choices: [
          {
            id: 'c1',
            text: '좌절하여 그림 도구를 모두 버리고 평범한 공장 노동자로 일한다.',
            isCorrect: false,
            feedback: '가상 분기: 전 세계 어린이들의 꿈과 희망이 된 디즈니의 캐릭터들이 탄생하지 못합니다.'
          },
          {
            id: 'c2',
            text: '형 로이와 함께 할리우드로 가 삼촌의 낡은 차고에서 카메라 한 대로 다시 애니메이션을 그린다.',
            isCorrect: true,
            feedback: '용기 있는 결단! 낡은 차고에서 시작한 디즈니 브라더스 스튜디오가 바로 오늘날 월트 디즈니 컴퍼니의 시작이 되었습니다!',
            historicalNote: '월트는 앨리스 시리즈와 오스왈드 토끼를 연달아 히트시키며 할리우드에 안착했습니다.'
          },
          {
            id: 'c3',
            text: '부모님께 용돈을 달라고 떼를 쓰며 방 안에서 게임만 한다.',
            isCorrect: false,
            feedback: '가상 분기: 스스로 일어서는 독립심과 도전 정신을 발휘해 보세요!'
          }
        ]
      },
      {
        stageNumber: 2,
        period: '캐릭터 창작 (27세)',
        title: '판권을 빼앗긴 후 탄생한 미키 마우스',
        situation: '배급업자의 배신으로 애써 키운 인기 캐릭터 \'오스왈드 럭키 래빗\'의 판권과 애니메이터들을 몽땅 빼앗겼어요. 돌아오는 기차 안에서 월트는 무엇을 할까요?',
        characterDialogue: '"모든 것은 한 마리의 작은 생쥐에서부터 시작되었다."',
        visualTheme: 'mickey_sketch',
        illustrationKey: 'disney_mickey',
        realPhotoUrl: commonsFile('Steamboat willie.jpg', 1000),
        realPhotoDescription: '1928년 《증기선 윌리》 이미지 — 미키 마우스가 대중적으로 알려지는 계기가 된 초기 작품 자료입니다.',
        funFact: '원래 이름은 \'모티머 마우스\'였지만, 아내 릴리안이 너무 거만해 보인다며 친근한 \'미키 마우스\'로 바꾸자고 제안했어요.',
        choices: [
          {
            id: 'c1',
            text: '기차 안에서 차고 시절 친해졌던 생쥐를 떠올리며 명랑하고 장난기 넘치는 \'미키 마우스\'를 스케치한다.',
            isCorrect: true,
            feedback: '위대한 반전! 1928년 최초의 유성 애니메이션 <증기선 윌리>로 데뷔한 미키 마우스는 전 세계 최고의 슈퍼스타가 되었습니다!',
            historicalNote: '월트 디즈니가 직접 수년 동안 미키 마우스의 목소리 연기를 맡았습니다.'
          },
          {
            id: 'c2',
            text: '배신한 배급업자에게 복수하겠다며 매일 쫓아다니며 싸운다.',
            isCorrect: false,
            feedback: '가상 분기: 분노에 에너지를 낭비하다 새 작품을 창작할 기회를 잃게 됩니다.'
          },
          {
            id: 'c3',
            text: '캐릭터 사업은 위험하니 만화 영화 제작을 영원히 포기한다.',
            isCorrect: false,
            feedback: '가상 분기: 위기를 새로운 기회로 전환하는 디즈니의 마법 같은 창의력을 믿어보세요!'
          }
        ]
      },
      {
        stageNumber: 3,
        period: '대혁신 (36세)',
        title: '모두가 미쳤다고 한 최초의 장편 <백설공주>',
        situation: '80분이 넘는 풀컬러 장편 애니메이션 <백설공주와 일곱 난쟁이>를 만들겠다고 하자, 투자자들과 가족들까지 "누가 극장에서 만화를 1시간 반 동안 보겠냐"며 파산할 거라고 말렸어요. 월트의 결단은?',
        characterDialogue: '"우리는 관객들에게 웃음뿐만 아니라 눈물과 감동을 선사할 수 있어!"',
        visualTheme: 'snow_white_studio',
        illustrationKey: 'disney_snow_white',
        realPhotoUrl: commonsFile('Walt Disney Snow white 1937 trailer screenshot (13).jpg', 1000),
        realPhotoDescription: '1937년 《백설공주와 일곱 난쟁이》 극장용 예고편에서 월트 디즈니가 일곱 난쟁이를 직접 소개하는 장면 — 작품과 제작자를 한 화면에서 확인할 수 있는 당시 자료입니다.',
        funFact: '월트는 집까지 담보로 잡혀 150만 달러(당시 엄청난 거액)를 쏟아부었지만, 영화 개봉 후 당시 영화 역사상 최고 흥행 기록을 세웠어요.',
        choices: [
          {
            id: 'c1',
            text: '주변 사람들의 만류를 듣고 안전하게 5분짜리 짧은 단편 만화만 계속 만든다.',
            isCorrect: false,
            feedback: '가상 분기: 애니메이션이 영화 예술의 한 장르로 인정받지 못하고 단순한 막간 코미디에 머물게 됩니다.'
          },
          {
            id: 'c2',
            text: '집을 담보로 대출을 받아 애니메이터들에게 실제 동물과 사람의 움직임을 가르치며 혁신적인 3년의 제작을 밀어붙인다.',
            isCorrect: true,
            feedback: '영화 역사의 새 지평! 1937년 개봉한 <백설공주>는 전 세계적인 신드롬을 일으키며 아카데미 특별상(큰 오스카 트로피 1개 + 작은 트로피 7개)을 받았습니다!',
            historicalNote: '이 성공을 바탕으로 피노키오, 덤보, 밤비, 신데렐라 등 명작 애니메이션이 쏟아져 나왔습니다.'
          },
          {
            id: 'c3',
            text: '제작비를 아끼기 위해 흑백으로 대충 그리고 줄거리를 절반으로 줄인다.',
            isCorrect: false,
            feedback: '가상 분기: 완성도 낮은 작품이 되어 관객의 감동을 이끌어내지 못합니다.'
          }
        ]
      },
      {
        stageNumber: 4,
        period: '테마파크 (54세)',
        title: '딸들과 함께 갈 놀이공원이 없어 만든 디즈니랜드',
        situation: '두 딸과 주말에 놀이공원에 갔는데 부모는 벤치에 앉아 지루하게 기다리고 놀이기구는 낡고 더러웠어요. "어른과 아이가 함께 행복해지는 마법의 왕국을 만들겠다"는 월트의 구상은?',
        characterDialogue: '"디즈니랜드는 세상에 상상력이 남아 있는 한 영원히 완성되지 않고 계속 발전할 것이다."',
        visualTheme: 'disneyland_castle',
        illustrationKey: 'disney_castle',
        realPhotoUrl: commonsFile('Opening Day at Disneyland.jpg', 1000),
        realPhotoDescription: '1955년 7월 17일 디즈니랜드 개장일, 판타지랜드 성으로 달려가는 어린이들 — 테마파크의 꿈이 현실이 된 날의 실제 사진입니다.',
        funFact: '1955년 7월 17일 문을 연 캘리포니아 디즈니랜드는 개장 7주 만에 100만 명의 방문객을 돌파했어요.',
        choices: [
          {
            id: 'c1',
            text: '어린이용 미끄럼틀과 그네 몇 개만 있는 작은 동네 놀이터를 짓는다.',
            isCorrect: false,
            feedback: '가상 분기: 세계적인 테마파크의 개념이 탄생하지 못합니다.'
          },
          {
            id: 'c2',
            text: '오렌지 과수원 부지를 사들여 최첨단 로봇(이매지니어링)과 동화 속 성이 어우러진 세계 최초의 테마파크 \'디즈니랜드\'를 건설한다.',
            isCorrect: true,
            feedback: '꿈의 공간 탄생! 전 세계 수억 명의 사람들에게 잊지 못할 마법 같은 추억과 감동을 주는 지구상에서 가장 행복한 장소가 탄생했습니다!',
            historicalNote: '디즈니랜드는 테마파크라는 새로운 문화 산업의 표준이 되었습니다.'
          },
          {
            id: 'c3',
            text: '입장료를 너무 비싸게 책정해서 부유한 성인들만 들어오는 카지노를 만든다.',
            isCorrect: false,
            feedback: '가상 분기: 온 가족이 함께 즐기는 동화 속 세상이라는 디즈니의 본래 철학이 훼손됩니다.'
          }
        ]
      }
    ]
  },

  // 5. 토머스 에디슨
  {
    id: 'thomas_edison',
    name: '토머스 에디슨',
    title: '1,093개 특허를 남긴 20세기 발명왕',
    role: '발명가 / 사업가 / 현대 기술 문명의 개척자',
    nationality: 'world',
    category: 'science',
    era: '근현대 (1847 ~ 1931)',
    motto: '천재는 1%의 영감과 99%의 땀으로 만들어진다.',
    superPower: '포기를 모르는 끈질긴 실험정신',
    superPowerDescription: '실패를 실패로 보지 않고 성공으로 가는 과정으로 여기며 끊임없이 가설을 검증하는 힘!',
    color: '#F59E0B',
    accentColor: '#FEF3C7',
    avatarIcon: '💡',
    photoUrl: commonsFile('Portrait of Thomas A. Edison.jpg', 700),
    summary: '백열전구의 상용화, 축음기, 영사기(키네토스코프) 등 1,000개가 넘는 발명품을 개발하여 인류의 밤을 밝히고 소리와 영상을 기록하는 시대를 열었습니다.',
    stages: [
      {
        stageNumber: 1,
        period: '유년기 (8세)',
        title: '퇴학 위기와 어머니의 믿음',
        situation: '호기심이 너무 많아 "오리는 왜 물에 뜨나요?", "거위 알을 품으면 부화하나요?" 엉뚱한 질문을 계속하다가 학교 교장선생님으로부터 학습 부진아라며 퇴학을 당했어요. 어린 에디슨과 어머니는?',
        characterDialogue: '"나는 실패한 적이 없다. 단지 잘 작동하지 않는 만 가지 방법을 발견했을 뿐이다."',
        visualTheme: 'basement_lab',
        illustrationKey: 'edison_egg',
        realPhotoUrl: commonsFile('Young Thomas Edison.jpg', 1000),
        realPhotoDescription: '14세의 토머스 에디슨(1861) — 8세 퇴학 위기 순간 사진은 아니지만, 어머니의 교육을 거쳐 스스로 배우던 청소년기의 실제 사진입니다.',
        funFact: '에디슨의 어머니 낸시는 교사 출신으로, 아들의 남다른 호기심을 인정하고 집 지하실에 실험실을 차려주었어요.',
        choices: [
          {
            id: 'c1',
            text: '퇴학당한 슬픔에 호기심을 버리고 질문을 일절 하지 않는 아이가 된다.',
            isCorrect: false,
            feedback: '가상 분기: 인류를 바꿀 창의적인 발명왕의 싹이 꺾이고 맙니다.'
          },
          {
            id: 'c2',
            text: '어머니와 함께 지하실에 화학 실험실을 꾸미고 책을 닥치는 대로 읽으며 끝없는 실험을 시작한다.',
            isCorrect: true,
            feedback: '위대한 어머니와 아들의 하모니! 직접 손으로 만지고 실험하는 습관이 훗날 1,093개 발명품의 원동력이 되었습니다!',
            historicalNote: '에디슨은 12세 때 기차에서 신문과 사탕을 팔며 실험 기구를 살 돈을 직접 벌었습니다.'
          },
          {
            id: 'c3',
            text: '학교를 찾아가 불을 지르고 난동을 부린다.',
            isCorrect: false,
            feedback: '가상 분기: 잘못된 행동으로 꿈을 망치게 됩니다.'
          }
        ]
      },
      {
        stageNumber: 2,
        period: '발명기 (30세)',
        title: '소리를 기록하는 기계 \'축음기(Phonograph)\'',
        situation: '전화선 진동판을 연구하다가 "소리의 파동을 바늘로 금속박에 새겨두면 다시 재생할 수 있지 않을까?"라는 기발한 아이디어가 떠올랐어요. 조수 크루에시에게 스케치를 건네며 에디슨이 한 행동은?',
        characterDialogue: '"메리는 아기 양을 가지고 있었네(Mary had a little lamb)..."',
        visualTheme: 'phonograph_room',
        illustrationKey: 'edison_phonograph',
        realPhotoUrl: commonsFile('Edison and phonograph.jpg', 1000),
        realPhotoDescription: '1877~1878년경 초기 축음기와 함께한 에디슨 — 소리를 기록·재생하는 발명과 직접 연결되는 실제 사진입니다.',
        funFact: '에디슨이 축음기에 대고 최초로 녹음하고 재생한 말은 동요 "메리에게는 작은 어린 양이 있었네"였어요.',
        choices: [
          {
            id: 'c1',
            text: '직접 제작한 기계의 원통을 돌리며 동요를 부르고, 자신의 목소리가 그대로 다시 흘러나오는 축음기를 완성한다.',
            isCorrect: true,
            feedback: '세계 최초의 소리 기록! 인류 역사상 최초로 음악과 목소리를 영구히 보존하고 재생하는 혁명이 일어났습니다!',
            historicalNote: '이 발명으로 에디슨은 \'멘로파크의 마법사\'라는 세계적인 명성을 얻게 되었습니다.'
          },
          {
            id: 'c2',
            text: '소리를 기록하는 것은 불가능하다며 스케치를 찢어버린다.',
            isCorrect: false,
            feedback: '가상 분기: 레코드판과 카세트테이프, 오늘날의 디지털 음악 산업의 기틀이 늦어지게 됩니다.'
          },
          {
            id: 'c3',
            text: '축음기를 만들었지만 혼자만 듣고 아무에게도 공개하지 않는다.',
            isCorrect: false,
            feedback: '가상 분기: 발명의 가치를 세상과 나누는 에디슨의 사업가적 기질을 발휘해 보세요!'
          }
        ]
      },
      {
        stageNumber: 3,
        period: '대도전 (32세)',
        title: '6,000번의 실패 끝에 빛난 백열전구',
        situation: '가스등 대신 안전하고 오래 켜지는 전구를 만들기 위해 전구 안의 필라멘트 재료를 찾고 있어요. 쇠, 백금, 종이, 머리카락 등 수천 가지 재료가 타버렸는데, 포기해야 할까요?',
        characterDialogue: '"우리는 실패한 것이 아니다. 적합하지 않은 수천 가지 재료를 알아냈으니 이제 거의 다 왔다!"',
        visualTheme: 'lightbulb_lab',
        illustrationKey: 'edison_bulb',
        realPhotoUrl: commonsFile('Edison Carbon Bulb.jpg', 1000),
        realPhotoDescription: '멘로파크의 1879년 에디슨 탄소 필라멘트 전구로 전해지는 실물 자료입니다.',
        funFact: '에디슨은 전 세계에서 수집한 6,000여 가지 식물 중 일본 교토의 대나무를 태운 탄소 필라멘트로 1,200시간 이상 켜지는 전구를 개발했어요.',
        choices: [
          {
            id: 'c1',
            text: '100번쯤 실패했을 때 가스등 회사에 전구 개발 포기 선언을 한다.',
            isCorrect: false,
            feedback: '가상 분기: 인류의 밤은 여전히 화재 위험이 크고 어두운 가스등에 의존하게 됩니다.'
          },
          {
            id: 'c2',
            text: '대나무와 식물 섬유를 탄화시키는 6,000번의 실험 끝에 40시간 이상 오래 타는 탄소 필라멘트 전구를 상용화한다.',
            isCorrect: true,
            feedback: '인류의 밤을 환하게 밝힌 기적! 발전소와 배전 시스템까지 함께 구축하여 현대 전기 문명 시대를 활짝 열었습니다!',
            historicalNote: '1882년 뉴욕 맨해튼 거리에 에디슨의 중앙 발전소에서 보낸 전기로 수백 개의 가로등과 전등이 일제히 켜졌습니다.'
          },
          {
            id: 'c3',
            text: '불이 잘 안 붙는 플라스틱만 고집하며 다른 재료를 찾지 않는다.',
            isCorrect: false,
            feedback: '가상 분기: 열린 사고와 끈기 있는 재료 탐색이 성공의 열쇠입니다!'
          }
        ]
      }
    ]
  },

  // 6. 제인 구달
  {
    id: 'jane_goodall',
    name: '제인 구달',
    title: '침팬지의 친구 & 지구를 지키는 환경 희망 대사',
    role: '동물행동학자 / 인류학자 / 환경운동가',
    nationality: 'world',
    category: 'welfare',
    era: '현대 (1934 ~ 현재)',
    motto: '우리가 진정으로 관심을 가질 때만 도울 수 있고, 도울 때만 모든 것이 구원받을 수 있다.',
    superPower: '생명에 대한 깊은 공감과 인내심',
    superPowerDescription: '자연과 동물의 언어에 귀 기울이고 사랑으로 지구 생태계를 지켜나가는 따뜻한 용기의 힘!',
    color: '#10B981',
    accentColor: '#D1FAE5',
    avatarIcon: '🌿',
    photoUrl: commonsFile('Jane Goodall close-up (cropped).jpg', 700),
    summary: '아프리카 탄자니아 곰베 국립공원에서 60년 넘게 침팬지를 연구하며 동물도 감정과 도구 제작 능력이 있음을 최초로 밝혔으며, 뿌리와 새싹(Roots & Shoots) 운동으로 전 세계 청소년 환경 운동을 이끌고 있습니다.',
    stages: [
      {
        stageNumber: 1,
        period: '청년기 (26세)',
        title: '홀로 아프리카 곰베 숲으로 떠나다',
        situation: '대학 학위도 없는 26세의 영국 여성 제인 구달이 아프리카 탄자니아 곰베 정글로 가 야생 침팬지를 연구하겠다고 나섰어요. 맹수와 말라리아가 가득한 밀림에서 제인은 어떻게 할까요?',
        characterDialogue: '"침팬지들의 눈을 들여다보면 그 안에 우리와 똑같은 영혼이 깃들어 있어요."',
        visualTheme: 'gombe_jungle',
        illustrationKey: 'goodall_binoculars',
        realPhotoUrl: commonsFile('LT0230-02 (48539452661).jpg', 1000),
        realPhotoDescription: '곰베 국립공원 현장에 있는 제인 구달 박사(2015) — 젊은 시절 첫 입성 사진은 아니지만, 그녀가 평생 연구한 바로 그 현장과 인물을 함께 보여 주는 실제 사진입니다.',
        funFact: '당시 영국 정부는 젊은 여성이 혼자 정글에 가는 것을 허락하지 않아 어머니 반(Vanne)이 첫 몇 달 동안 곰베 숲에 동행해 주었어요.',
        choices: [
          {
            id: 'c1',
            text: '정글이 무서워 텐트를 치자마자 다음 날 첫 배를 타고 영국으로 도망친다.',
            isCorrect: false,
            feedback: '가상 분기: 인류학 역사상 가장 위대한 동물행동학 연구가 탄생하지 못합니다.'
          },
          {
            id: 'c2',
            text: '쌍안경을 들고 매일 봉우리(The Peak)에 올라 침팬지들이 경계심을 풀 때까지 수개월간 묵묵히 기다리며 관찰한다.',
            isCorrect: true,
            feedback: '감동적인 인내심! 침팬지 무리의 우두머리 \'데이비드 그레이비어드\'가 마침내 제인을 동료로 받아들이며 역사적인 교감이 시작되었습니다!',
            historicalNote: '학자들은 침팬지에게 번호를 붙였지만, 제인은 최초로 이름을 지어주며 개성과 감정을 기록했습니다.'
          },
          {
            id: 'c3',
            text: '침팬지를 억지로 잡기 위해 마취총을 쏘고 우리에 가둔다.',
            isCorrect: false,
            feedback: '가상 분기: 동물을 존중하고 자연 그대로 관찰하는 제인 구달의 철학과 정반대입니다.'
          }
        ]
      },
      {
        stageNumber: 2,
        period: '대발견 (26세)',
        title: '도구를 만드는 침팬지 \'데이비드 그레이비어드\'',
        situation: '비 오는 날, 턱수염 침팬지 데이비드가 나뭇가지의 잎을 뜯어내 다듬은 뒤 흰개미집 구멍에 넣어 개미를 낚아채 먹는 모습을 목격했어요! 당시 과학계는 오직 인간만이 도구를 만든다고 믿었는데?',
        characterDialogue: '"이제 우리는 \'도구\'를 다시 정의하거나, \'인간\'을 다시 정의하거나, 침팬지를 인간으로 인정해야 한다."',
        visualTheme: 'chimpanzee_tool',
        illustrationKey: 'goodall_chimp_tool',
        realPhotoUrl: commonsFile('Chimpanzee using grass tool to feed on insects in tree - DPLA - c0c56f0f323395e9454c022c16eed1e7.jpg', 1000),
        realPhotoDescription: '풀줄기 도구로 나무 속 곤충을 먹는 침팬지 — 구달의 “침팬지도 도구를 사용한다”는 발견과 직접 연결되는 행동 자료입니다.',
        funFact: '제인의 스승 루이스 리키 박사는 이 발견 보고를 받고 "우리는 이제 인간의 정의를 바꿔야 한다"는 명언을 남겼어요.',
        choices: [
          {
            id: 'c1',
            text: '침팬지가 나뭇가지를 가공해 흰개미를 잡는 도구 사용 장면을 상세히 기록해 학계에 보고한다.',
            isCorrect: true,
            feedback: '인류학을 뒤흔든 20세기 최고의 발견! 오직 인간만이 도구를 만든다는 수백 년 된 과학계의 편견을 완전히 깨뜨렸습니다!',
            historicalNote: '이 연구로 제인 구달은 학사 학위 없이 케임브리지 대학교 박사 학위를 받았습니다.'
          },
          {
            id: 'c2',
            text: '동물이 도구를 쓸 리 없다며 착각으로 치부하고 기록장에 적지 않는다.',
            isCorrect: false,
            feedback: '가상 분기: 위대한 과학적 진실이 묻히고 맙니다.'
          },
          {
            id: 'c3',
            text: '흰개미집을 발로 차서 부수고 침팬지를 쫓아낸다.',
            isCorrect: false,
            feedback: '가상 분기: 자연 생태계를 훼손하지 않고 있는 그대로 관찰하는 태도를 지녀보세요!'
          }
        ]
      },
      {
        stageNumber: 3,
        period: '환경운동 (52세~현재)',
        title: '정글을 나와 전 세계로! \'뿌리와 새싹\' 운동',
        situation: '숲이 벌목되고 밀렵으로 침팬지와 야생동물 서식지가 사라지는 것을 보았어요. 숲속에서 편히 연구만 할 수도 있지만, 밖으로 나가 지구를 지키려는 제인의 결단은?',
        characterDialogue: '"모든 개인은 변화를 만들 수 있습니다. 당신이 내리는 작은 선택이 세상을 바꿉니다."',
        visualTheme: 'roots_and_shoots',
        illustrationKey: 'goodall_roots',
        realPhotoUrl: commonsFile('Jane Goodall at RS Hungary.JPG', 1000),
        realPhotoDescription: '2009년 헝가리에서 Roots & Shoots 참가자들과 함께한 제인 구달 — 청소년 환경운동 활동과 직접 연결되는 실제 사진입니다.',
        funFact: '제인 구달은 90세가 넘은 지금도 1년에 300일 이상 전 세계를 돌며 강연과 희망의 메시지를 전하고 있어요.',
        choices: [
          {
            id: 'c1',
            text: '탄자니아 청소년 12명과 함께 시작해 전 세계 100여 개국으로 번진 청소년 환경 풀뿌리 운동 \'뿌리와 새싹\'을 창설한다.',
            isCorrect: true,
            feedback: '세상을 바꾸는 거대한 희망! 전 세계 수백만 명의 어린이와 청소년들이 나무를 심고 동물과 이웃을 돕는 글로벌 환경 리더로 성장하고 있습니다!',
            historicalNote: 'UN 평화의 대사로 임명되어 지구 환경 보호에 평생을 바치고 있습니다.'
          },
          {
            id: 'c2',
            text: '지구 온난화와 벌목은 어쩔 수 없다며 방관하고 연구소 안에만 머문다.',
            isCorrect: false,
            feedback: '가상 분기: 서식지가 파괴되어 침팬지와 정글이 영영 사라지게 됩니다.'
          },
          {
            id: 'c3',
            text: '모든 환경 운동은 어른들만 해야 한다며 어린이들의 참여를 금지한다.',
            isCorrect: false,
            feedback: '가상 분기: 미래 세대 청소년들이 지구의 주인공으로 설 기회를 잃게 됩니다.'
          }
        ]
      }
    ]
  },

  // 7. 헬렌 켈러
  {
    id: 'helen_keller',
    name: '헬렌 켈러',
    title: '보이지 않고 들리지 않아도 세상을 바꾼 불굴의 작가',
    role: '작가 / 사회운동가 / 시청각 중복 장애인 인권 옹호자',
    nationality: 'world',
    category: 'welfare',
    era: '근현대 (1880 ~ 1968)',
    motto: '세상은 고통으로 가득하지만, 그것을 극복하는 일로도 가득 차 있다.',
    superPower: '암흑 속에서도 피어나는 배움과 소통의 빛',
    superPowerDescription: '신체적 한계와 절망을 뛰어넘어 마음의 눈으로 세상을 포용하고 약자를 위해 헌신하는 사랑의 힘!',
    color: '#3B82F6',
    accentColor: '#DBEAFE',
    avatarIcon: '🤝',
    photoUrl: commonsFile('Helen Keller LCCN2014692492.jpg', 700),
    summary: '어린 시절 질병으로 시각과 청각을 모두 잃었으나 앤 설리번 선생님의 헌신적인 지도로 언어를 터득하고, 래드클리프 칼리지를 졸업한 뒤 전 세계 장애인의 교육과 권리를 위해 활동했습니다.',
    stages: [
      {
        stageNumber: 1,
        period: '유년기 (7세)',
        title: '물 펌프와 단어(W-A-T-E-R)의 깨달음',
        situation: '생후 19개월에 시력과 청력을 잃어 어둠과 침묵 속에 갇혀 거칠게 떼를 쓰던 헬렌에게 앤 설리번 선생님이 찾아왔어요. 펌프가에서 손바닥에 흐르는 차가운 물을 맞으며 헬렌은?',
        characterDialogue: '"물! 내 손바닥 위로 쏟아지던 그 차가운 생명의 느낌이 나의 닫힌 영혼을 깨웠다!"',
        visualTheme: 'water_pump',
        illustrationKey: 'keller_water_pump',
        realPhotoUrl: commonsFile('Helen Keller with Anne Sullivan in July 1888.jpg', 1000),
        realPhotoDescription: '1888년 8세 헬렌 켈러와 스승 앤 설리번 — 물 펌프 사건 직후 언어를 배우던 시기의 실제 사진입니다.',
        funFact: '헬렌 켈러는 물(WATER)이라는 단어를 깨달은 바로 그날 하루 만에 30개의 새로운 단어를 배웠어요.',
        choices: [
          {
            id: 'c1',
            text: '선생님의 손을 뿌리치고 물 펌프를 부수며 평생 아무 단어도 배우지 않는다.',
            isCorrect: false,
            feedback: '가상 분기: 어둠과 침묵의 감옥에서 영영 빠져나오지 못하게 됩니다.'
          },
          {
            id: 'c2',
            text: '선생님이 손바닥에 써주는 글자 \'W-A-T-E-R\'가 손에 흐르는 액체의 이름임을 온몸으로 전율하며 깨닫는다.',
            isCorrect: true,
            feedback: '기적의 순간! 사물에 이름이 있고 세상과 소통할 수 있다는 진리를 깨닫고 폭발적인 배움의 여정이 시작되었습니다!',
            historicalNote: '이 감동적인 일화는 희곡 및 영화 <미라클 워커(The Miracle Worker)>로 전 세계에 알려졌습니다.'
          },
          {
            id: 'c3',
            text: '물을 먹고 싶지 않다며 집 밖으로 뛰쳐나간다.',
            isCorrect: false,
            feedback: '가상 분기: 선생님의 따뜻한 손길을 믿고 마음의 문을 열어보세요!'
          }
        ]
      },
      {
        stageNumber: 2,
        period: '대학 생활 (24세)',
        title: '래드클리프 칼리지 졸업과 배움의 결실',
        situation: '점자책과 설리번 선생님의 손바닥 통역 도움을 받으며 래드클리프 칼리지(당시 하버드와 연계된 여자대학)에서 공부하려 해요. 엄청난 학업량과 편견 속에서 헬렌의 선택은?',
        characterDialogue: '"비관론자가 별의 비밀을 발견하거나 미지의 땅을 항해한 적은 한 번도 없다."',
        visualTheme: 'radcliffe_college',
        illustrationKey: 'keller_radcliffe',
        realPhotoUrl: commonsFile('Helen Keller graduation.jpg', 1000),
        realPhotoDescription: '1904년경 래드클리프 칼리지 졸업 사진 — 시청각 장애를 딛고 학사 학위를 받은 실제 기록입니다.',
        funFact: '헬렌 켈러는 영어뿐 아니라 프랑스어, 독일어, 그리스어, 라틴어 등 5개 국어를 능숙하게 구사했어요.',
        choices: [
          {
            id: 'c1',
            text: '손가락 끝의 피가 맺힐 정도로 점자책을 읽고 타자기로 글을 써서 1904년 우등(Cum Laude) 학사 학위를 받는다.',
            isCorrect: true,
            feedback: '인간 승리의 표상! 시청각 중복 장애인 최초로 정규 대학 학위를 취득하며 전 세계 장애인들에게 무한한 가능성을 심어주었습니다!',
            historicalNote: '대학 재학 중 자신의 자서전 <내 삶의 이야기(The Story of My Life)>를 출간해 전 세계적인 베스트셀러가 되었습니다.'
          },
          {
            id: 'c2',
            text: '점자책이 너무 무겁고 힘들어 1주일 만에 자퇴하고 집에서 쉰다.',
            isCorrect: false,
            feedback: '가상 분기: 신체적 한계를 극복하려는 헬렌의 위대한 도전이 멈추게 됩니다.'
          },
          {
            id: 'c3',
            text: '시험을 볼 때 다른 학생들의 답안지를 훔쳐보려고 한다.',
            isCorrect: false,
            feedback: '가상 분기: 정직과 성실로 당당히 공부한 헬렌 켈러의 삶과 맞지 않습니다.'
          }
        ]
      },
      {
        stageNumber: 3,
        period: '인권운동 (30세~88세)',
        title: '전 세계 약자들을 위한 평화·복지 순회강연',
        situation: '자신의 성공에 안주하지 않고 시각장애인 점자 도서 보급, 아동 노동 금지, 여성 참정권 운동을 위해 전 세계 35개국을 돌며 연설하려 해요. 헬렌의 연설 내용은?',
        characterDialogue: '"혼자서는 작은 일만 할 수 있지만, 함께라면 우리는 아주 많은 일을 해낼 수 있습니다."',
        visualTheme: 'speech_hall_peace',
        illustrationKey: 'keller_peace_speech',
        realPhotoUrl: commonsFile('Helen Keller visit to Japan in 1948 01.jpg', 1000),
        realPhotoDescription: '1948년 일본을 방문한 헬렌 켈러의 실제 사진 — 세계 여러 나라를 돌며 장애인 복지와 평화를 알린 순회 활동과 직접 연결되는 기록입니다.',
        funFact: '헬렌 켈러는 한국에도 방문해 전쟁 고아들과 맹아학교 학생들을 따뜻하게 안아주었어요.',
        choices: [
          {
            id: 'c1',
            text: '미국 시각장애인 재단을 설립하고 평생 전 세계를 돌며 장애인 복지와 인권을 위해 목소리를 높인다.',
            isCorrect: true,
            feedback: '위대한 사랑의 실천! 그녀의 헌신 덕분에 전 세계 점자 도서관과 특수교육 법률이 제정되었습니다!',
            historicalNote: '미국 최고 훈장인 \'대통령 자유 훈장\'을 수상했습니다.'
          },
          {
            id: 'c2',
            text: '자신은 유명해졌으니 다른 가난한 장애인들의 어려움은 나 몰라라 한다.',
            isCorrect: false,
            feedback: '가상 분기: 타인의 아픔을 나의 아픔으로 보듬은 헬렌 켈러의 박애주의 정신을 기억해 보세요!'
          },
          {
            id: 'c3',
            text: '강연료를 너무 많이 요구하여 가난한 나라에는 방문하지 않는다.',
            isCorrect: false,
            feedback: '가상 분기: 헬렌 켈러는 평생 모든 수익을 시각장애인 구호 기금에 기부했습니다.'
          }
        ]
      }
    ]
  },

  // 8. 백범 김구
  {
    id: 'kim_gu',
    name: '백범 김구',
    title: '대한민국 임시정부의 문지기 & 문화강국을 꿈꾼 민족의 지도자',
    role: '독립운동가 / 대한민국 임시정부 주석 / 사상가',
    nationality: 'korea',
    category: 'leadership',
    era: '근현대 (1876 ~ 1949)',
    motto: '오직 한없이 가지고 싶은 것은 높은 문화의 힘이다.',
    superPower: '흔들리지 않는 애국심과 대통합의 리더십',
    superPowerDescription: '가장 낮은 곳에서 스스로를 낮추며 조국의 완전한 독립과 아름다운 문화 국가를 세우기 위해 온몸을 바치는 헌신의 힘!',
    color: '#0D9488',
    accentColor: '#CCFBF1',
    avatarIcon: '🇰🇷',
    photoUrl: commonsFile('Kim Gu in 1949.jpg', 700),
    summary: '상하이 대한민국 임시정부를 27년간 끝까지 지켜내고 한인애국단을 조직하여 윤봉길·이봉창 의사의 의거를 이끌었으며, 해방 후 완전한 자주독립과 높은 문화의 힘을 지닌 나라를 꿈꾸었습니다.',
    stages: [
      {
        stageNumber: 1,
        period: '망명기 (43세)',
        title: '상하이 임시정부의 \'문지기\'가 되겠다!',
        situation: '3·1 운동 직후 중국 상하이로 망명해 대한민국 임시정부를 찾아갔어요. 안창호 선생이 어떤 직책을 맡고 싶냐고 묻자 김구의 대답은?',
        characterDialogue: '"내가 원하는 것은 임시정부 청사의 문지기요. 조국의 독립을 위해서라면 빗자루를 들고 마당을 쓸겠소."',
        visualTheme: 'shanghai_provisional',
        illustrationKey: 'kimgu_shanghai',
        realPhotoUrl: commonsFile('Kim Gu in 1919.gif', 1000),
        realPhotoDescription: '1919년의 김구 선생 — 상하이 대한민국 임시정부에 참여하던 시기의 실제 인물 사진입니다.',
        funFact: '‘백범(白凡)’이라는 호는 가장 낮은 신분인 백정(白)과 평범한 범부(凡)까지 모두 애국심을 갖기를 바라는 뜻에서 스스로 지은 이름이에요.',
        choices: [
          {
            id: 'c1',
            text: '가장 높은 장관 자리를 달라고 요구하며 안 주면 독립운동을 하지 않겠다고 고집부린다.',
            isCorrect: false,
            feedback: '가상 분기: 자리 욕심을 부리면 큰 뜻을 함께 모으기 어렵습니다.'
          },
          {
            id: 'c2',
            text: '가장 낮은 경무국장(문지기)을 자청하여 청사를 경비하고 요인들을 헌신적으로 보좌한다.',
            isCorrect: true,
            feedback: '위대한 겸손과 헌신! 가장 낮은 곳에서 묵묵히 궂은일을 도맡아 임시정부의 기틀을 든든하게 다졌습니다!',
            historicalNote: '김구는 훗날 국무령과 임시정부 주석에 올라 광복군 창설과 대일 선전포고를 이끌었습니다.'
          },
          {
            id: 'c3',
            text: '상하이 거리가 위험하니 임시정부에 가지 않고 외국 무역상으로 돈만 번다.',
            isCorrect: false,
            feedback: '가상 분기: 조국의 독립을 위해 헌신한 백범 김구의 숭고한 정신을 본받아 보세요!'
          }
        ]
      },
      {
        stageNumber: 2,
        period: '결사항전 (56세)',
        title: '한인애국단 조직과 윤봉길 의사의 시계 교환',
        situation: '임시정부가 재정난과 일제의 탄압으로 꺼져갈 때, 윤봉길 의사가 상하이 홍커우 공원 의거를 결심하고 떠나기 직전 김구에게 "제 6원짜리 새 시계와 선생님의 2원짜리 낡은 시계를 바꿔 찹시다. 제 시계는 앞으로 한 시간밖에 쓸모가 없으니까요"라고 말했어요. 김구의 눈물의 화답은?',
        characterDialogue: '"후일 지하에서 다시 만납시다!"',
        visualTheme: 'watch_exchange',
        illustrationKey: 'kimgu_watch',
        realPhotoUrl: commonsFile('사진2(김구선생과 윤봉길).jpg', 1000),
        realPhotoDescription: '1932년 4월 27일 상하이에서 함께한 김구 선생과 윤봉길 의사 — 홍커우 공원 의거 직전 두 사람을 기록한 실제 사진입니다.',
        funFact: '윤봉길 의사의 의거는 중국 장제스 총통이 "중국의 100만 대군도 해내지 못한 일을 조선의 한 청년이 해냈다"며 임시정부를 전폭 지원하는 결정적 계기가 되었어요.',
        choices: [
          {
            id: 'c1',
            text: '두 청년(이봉창·윤봉길)의 숭고한 뜻을 기리며 시계를 맞바꾸고, 독립투쟁의 불꽃을 전 세계에 알린다.',
            isCorrect: true,
            feedback: '민족의 가슴을 울린 결의! 윤봉길 의사의 의거로 한국인의 독립 의지가 전 세계에 타올랐고 중국 정부의 전폭적인 지원을 얻어냈습니다!',
            historicalNote: '김구 선생은 해방 후 귀국할 때까지 평생 윤봉길 의사의 시계를 소중히 품에 지니고 다녔습니다.'
          },
          {
            id: 'c2',
            text: '위험하니 거사를 즉시 취소하고 도망가라고 말린다.',
            isCorrect: false,
            feedback: '가상 분기: 침체되었던 독립운동의 불씨가 사그라들게 됩니다.'
          },
          {
            id: 'c3',
            text: '시계를 비싼 값에 전당포에 팔아버린다.',
            isCorrect: false,
            feedback: '가상 분기: 목숨을 바친 독립투사의 숭고한 뜻을 훼손할 수 없습니다.'
          }
        ]
      },
      {
        stageNumber: 3,
        period: '광복과 비전 (71세)',
        title: '나의 소원 - 오직 높은 문화의 힘',
        situation: '광복 후 조국으로 돌아온 김구 선생은 백범일지 말미의 <나의 소원>에서 우리가 어떤 나라가 되어야 하는지 비전을 제시했어요. 김구 선생이 가장 갈망한 나라는?',
        characterDialogue: '"나는 우리나라가 세상에서 가장 아름다운 나라가 되기를 원한다. 남의 것을 모방하는 나라가 아니라, 새로운 문화의 근원이 되는 나라가 되기를 원한다."',
        visualTheme: 'baekbeom_korea',
        illustrationKey: 'kimgu_culture',
        realPhotoUrl: commonsFile('Diary of Kim Ku (백범일지).jpg', 1000),
        realPhotoDescription: '1947년 출판된 《백범일지》 원본 자료 — 김구 선생이 자신의 삶과 “나의 소원”을 남긴 핵심 기록입니다.',
        funFact: '오늘날 K-팝, K-드라마 등 한국의 문화가 전 세계를 휩쓰는 모습을 보며 김구 선생의 <나의 소원> 혜안이 다시금 큰 주목을 받고 있어요.',
        choices: [
          {
            id: 'c1',
            text: '군사력으로 다른 약소국을 침략하고 정복하는 무서운 군사 대국',
            isCorrect: false,
            feedback: '가상 분기: 다른 나라를 억압하는 패권 국가는 김구 선생의 평화 사상과 정반대입니다.'
          },
          {
            id: 'c2',
            text: '오직 돈만 많이 벌어 다른 나라를 멸시하는 부유한 졸부의 나라',
            isCorrect: false,
            feedback: '가상 분기: 물질보다 마음과 덕성을 중시한 백범의 철학에 어긋납니다.'
          },
          {
            id: 'c3',
            text: '자신을 행복하게 하고 남에게도 행복을 주는 \'높은 문화의 힘\'을 지닌 세계 평화의 중심 나라',
            isCorrect: true,
            feedback: '시대를 앞서간 위대한 혜안! 문화의 힘으로 인류에게 평화와 감동을 주는 대한민국의 미래 청사진을 완성했습니다!',
            historicalNote: '김구 선생의 문화강국 비전은 오늘날 K-컬처의 눈부신 발전으로 전 세계에 실현되고 있습니다.'
          }
        ]
      }
    ]
  },

  // 9. 손흥민
  {
    id: 'son_heungmin',
    name: '손흥민',
    title: '아시아 최초 EPL 득점왕 & 캡틴 손',
    role: '축구 국가대표팀 주장 / 프리미어리그 토트넘 홋스퍼 공격수',
    nationality: 'korea',
    category: 'sports',
    era: '현대 (1992 ~ 현재)',
    motto: '어제보다 더 나은 오늘을 위해, 겸손과 기본기에 충실하자.',
    superPower: '지치지 않는 슛 연습과 팀을 위한 헌신',
    superPowerDescription: '화려함 뒤에 숨은 매일 1,000개의 기본기 훈련과 동료를 먼저 빛내주는 캡틴의 이타적인 힘!',
    color: '#2563EB',
    accentColor: '#DBEAFE',
    avatarIcon: '⚽',
    photoUrl: commonsFile('Son Heung-min - 2022 (52552243725) (cropped).jpg', 700),
    summary: '춘천에서 아버지 손웅정 감독 밑에서 혹독한 기본기 훈련을 거쳐 독일 분데스리가를 거쳐 잉글랜드 프리미어리그(EPL)에서 아시아 선수 최초 득점왕(골든부트)을 수상한 월드클래스 축구 스타입니다.',
    stages: [
      {
        stageNumber: 1,
        period: '유소년기 (13세)',
        title: '춘천 공지천에서의 매일 4시간 기본기 훈련',
        situation: '어릴 때 다른 친구들은 경기(시합)를 뛰며 골을 넣고 신나게 노는데, 아버지 손웅정 감독은 "기본기가 안 된 상태에서 슈팅만 때리면 몸이 망가진다"며 공 리프팅과 양발 드리블만 매일 4시간씩 시켰어요. 흥민의 선택은?',
        characterDialogue: '"왼발이든 오른발이든 언제 어디서나 생각 없이 자연스럽게 공을 다룰 수 있어야 한다."',
        visualTheme: 'soccer_grass_field',
        illustrationKey: 'son_training',
        realPhotoUrl: commonsFile('Son Heung-Min.jpg', 1000),
        realPhotoDescription: '2011년 함부르크 시절의 젊은 손흥민 — 춘천 유소년 훈련 당시 사진은 아니지만 기본기 훈련의 성과가 유럽 무대에서 이어진 실제 사진입니다.',
        funFact: '손흥민은 양발을 모두 완벽하게 쓰기 위해 축구 양말이나 바지를 입을 때도 늘 왼발부터 넣는 습관을 들였어요.',
        choices: [
          {
            id: 'c1',
            text: '기본기 연습이 지루하다며 투정을 부리고 연습장을 뛰쳐나간다.',
            isCorrect: false,
            feedback: '가상 분기: 탄탄한 기본기가 없어 유럽 빅리그의 거친 수비를 뚫지 못하게 됩니다.'
          },
          {
            id: 'c2',
            text: '공이 땅에 떨어지지 않도록 하루 1,000개씩 양발 리프팅을 하며 완벽한 양발잡이 감각을 몸에 새긴다.',
            isCorrect: true,
            feedback: '양발 슈팅 마스터의 탄생! 혹독한 기본기 훈련 덕분에 양발 자유자재로 환상적인 감아차기 궤적을 그리는 월드클래스 슈터가 되었습니다!',
            historicalNote: '손흥민의 \'손흥민 존(Son Zone)\' 페널티 박스 좌우 모서리 감아차기는 이 기본기에서 탄생했습니다.'
          },
          {
            id: 'c3',
            text: '부모님 몰래 축구화를 버리고 게임방으로 도망간다.',
            isCorrect: false,
            feedback: '가상 분기: 자신의 꿈을 향한 땀방울의 가치를 믿어보세요!'
          }
        ]
      },
      {
        stageNumber: 2,
        period: '독일 유학기 (16세)',
        title: '함부르크에서의 언어 장벽과 외로움 극복',
        situation: '16세 어린 나이에 홀로 독일 함부르크 SV 유스팀으로 떠났어요. 말도 통하지 않고 인종차별과 차가운 텃세가 기다리고 있었어요. 흥민은 어떻게 버텨낼까요?',
        characterDialogue: '"내가 여기서 지면 한국 축구 전체가 무시당한다. 실력으로 반드시 보여주겠다!"',
        visualTheme: 'germany_stadium',
        illustrationKey: 'son_hamburg',
        realPhotoUrl: commonsFile('Elia son.JPG', 1000),
        realPhotoDescription: '2012년 함부르크 소속으로 분데스리가 경기에 출전한 손흥민 — 독일 무대에서 성장하던 시기의 실제 경기 사진입니다.',
        funFact: '손흥민은 독일어를 빨리 배우기 위해 매일 독일 만화영화를 보며 입술 모양을 따라 연습했어요.',
        choices: [
          {
            id: 'c1',
            text: '외로움을 견디지 못하고 계약을 파기한 뒤 한국으로 돌아온다.',
            isCorrect: false,
            feedback: '가상 분기: 유럽 무대에서의 큰 도전이 멈추게 됩니다.'
          },
          {
            id: 'c2',
            text: '독일어 만화를 보며 악착같이 언어를 배우고, 남들보다 2시간 일찍 훈련장에 나와 슈팅 연습을 거듭해 데뷔골을 터뜨린다.',
            isCorrect: true,
            feedback: '분데스리가를 뒤흔든 신성! 함부르크 구단 역사상 최연소 득점 기록을 세우며 레버쿠젠을 거쳐 프리미어리그로 진출했습니다!',
            historicalNote: '손흥민의 지칠 줄 모르는 성실함은 모든 감독들이 가장 사랑하는 무기가 되었습니다.'
          },
          {
            id: 'c3',
            text: '동료 선수들과 훈련 중에 시비가 붙어 주먹다짐을 하고 퇴출당한다.',
            isCorrect: false,
            feedback: '가상 분기: 프로 선수로서의 침착함과 인성을 길러야 합니다.'
          }
        ]
      },
      {
        stageNumber: 3,
        period: '전성기 (30세)',
        title: '아시아 최초 EPL 득점왕 (골든 부트)',
        situation: '2021-2022 시즌 마지막 38라운드 노리치 시티전, 페널티킥 골 하나 없이 필드골로만 21골을 넣고 살라(리버풀)와 득점왕 경쟁 중이에요. 2골을 더 넣어야 단독 득점왕이 되는데?',
        characterDialogue: '"개인 기록보다 팀의 챔피언스리그 진출이 먼저다. 하지만 기회가 오면 절대 놓치지 않는다!"',
        visualTheme: 'epl_golden_boot',
        illustrationKey: 'son_golden_boot',
        realPhotoUrl: commonsFile('Manchester United v Tottenham Hotspur, 12 March 2022 (07).jpg', 1000),
        realPhotoDescription: '2021-22 EPL 득점왕 시즌인 2022년 3월 토트넘 경기의 손흥민 — 골든부트 수상 장면 자체는 아니지만 바로 그 시즌의 실제 경기 사진입니다.',
        funFact: '손흥민은 23골 전골을 페널티킥 없이 순수 필드골(오른발 11골, 왼발 12골)로만 기록하는 경이로운 기록을 세웠어요.',
        choices: [
          {
            id: 'c1',
            text: '개인 욕심으로 아무 각도에서나 무리하게 슛만 날리다가 팀 공격 흐름을 끊는다.',
            isCorrect: false,
            feedback: '가상 분기: 팀 플레이를 망치고 동료들의 신뢰를 잃게 됩니다.'
          },
          {
            id: 'c2',
            text: '동료들과 완벽한 패스 플레이를 펼치다 후반 환상적인 중거리 감아차기로 멀티골을 폭발시켜 23골로 골든부트를 차지한다.',
            isCorrect: true,
            feedback: '아시아 축구 역사의 새 이정표! 세계 최고 리그인 EPL에서 아시아인 최초 득점왕에 오르며 전 세계 축구 팬들의 기립박수를 받았습니다!',
            historicalNote: '토트넘 홋스퍼의 주장이자 대한민국 축구대표팀 캡틴으로서 전 세계 축구 유망주들의 롤모델이 되고 있습니다.'
          },
          {
            id: 'c3',
            text: '부담감이 너무 커서 감독에게 교체해 달라고 요청한다.',
            isCorrect: false,
            feedback: '가상 분기: 결정적인 순간에 도망치지 않는 캡틴의 승부사 기질을 발휘해 보세요!'
          }
        ]
      }
    ]
  },

  // 10. 유재석
  {
    id: 'yoo_jaeseok',
    name: '유재석',
    title: '국민 MC & 20년 정상의 자리를 지킨 배려의 리더',
    role: '방송인 / 희극인 / 국민 MC',
    nationality: 'korea',
    category: 'arts',
    era: '현대 (1972 ~ 현재)',
    motto: '내가 귀를 기울이면 상대의 마음이 열리고, 내가 배려하면 모두가 함께 빛난다.',
    superPower: '경청과 배려로 상대를 돋보이게 하는 리더십',
    superPowerDescription: '자신을 낮추고 다른 사람의 이야기를 진심으로 들으며 모든 출연진과 시청자에게 웃음과 감동을 선물하는 힘!',
    color: '#10B981',
    accentColor: '#D1FAE5',
    avatarIcon: '🎤',
    photoUrl: commonsFile('Yoo Jae Suk going to work at Happy Together on August 19, 2017 (1).jpg', 700),
    summary: '10년의 긴 무명 시절을 눈물과 겸손으로 버텨내고, 무한도전·유 퀴즈 온 더 블럭·런닝맨 등을 이끌며 지상파 3사 및 백상예술대상에서 통산 19회 대상을 수상한 대한민국 최고의 국민 MC입니다.',
    stages: [
      {
        stageNumber: 1,
        period: '청년기 (20세)',
        title: '1991년 대학개그제 수상과 오만의 눈물',
        situation: '1991년 제1회 KBS 대학개그제에서 장려상을 수상할 때, 자기가 대상감이라고 착각해 건방지게 귀를 파며 시상대에 올랐다가 큰 비난을 받고 방송에서 자취를 감추게 되었어요. 유재석의 참회는?',
        characterDialogue: '"그때의 교만했던 내 모습이 너무 부끄러웠다. 이제는 나를 낮추고 남을 섬기자."',
        visualTheme: 'kbs_comedy_stage',
        illustrationKey: 'yoo_debut',
        realPhotoUrl: commonsFile('Yoo Jae-suk in September 2013 01.jpg', 1000),
        realPhotoDescription: '1991년 대학개그제 당시 자유 이용 가능한 사진은 확인하기 어려워, 훗날 방송 활동 중인 2013년 유재석의 실제 인물 사진을 관련 자료로 사용합니다.',
        funFact: '유재석은 메뚜기 탈을 쓰고 리포터를 하던 무명 시절, 매일 밤 "한 번만 기회를 주시면 평생 겸손하겠다"고 눈물로 기도했어요.',
        choices: [
          {
            id: 'c1',
            text: '방송국 PD들을 원망하며 술만 마시고 개그맨을 그만둔다.',
            isCorrect: false,
            feedback: '가상 분기: 국민 MC 유재석의 성숙한 인품과 진행 실력이 탄생하지 못합니다.'
          },
          {
            id: 'c2',
            text: '자신의 오만함을 깊이 반성하고, 메뚜기 탈을 쓰며 10년 동안 궂은 보조 리포터 역할을 성실히 수행한다.',
            isCorrect: true,
            feedback: '10년 무명 시절이 낳은 명품 MC! 실패를 통해 진정한 겸손을 배우고 작은 기회에도 온 힘을 다하는 프로 방송인으로 거듭났습니다!',
            historicalNote: '유재석은 이 시절 배운 겸손함으로 동료 개그맨들과 스태프들을 가장 잘 챙기는 미담 제조기가 되었습니다.'
          },
          {
            id: 'c3',
            text: '선배들에게 계속 건방지게 굴며 사과하지 않는다.',
            isCorrect: false,
            feedback: '가상 분기: 방송계에서 완전히 외면당하고 맙니다.'
          }
        ]
      },
      {
        stageNumber: 2,
        period: '도약기 (34세)',
        title: '대한민국 예능의 전설 <무한도전>과 배려의 진행',
        situation: '6명의 개성 강한 멤버들이 서로 싸우고 오디오가 겹쳐 정신없는 리얼 버라이어티 <무한도전>을 이끌게 되었어요. 유재석의 진행 비결은?',
        characterDialogue: '"내가 웃기려고 욕심부리기보다 다른 멤버들이 마음껏 웃길 수 있는 멍석을 깔아주자."',
        visualTheme: 'infinite_challenge_studio',
        illustrationKey: 'yoo_muhandaojeon',
        realPhotoUrl: commonsFile('140807 유재석 01.jpg', 1000),
        realPhotoDescription: '2014년 《무한도전》 촬영 행사에서의 유재석 — 국민 MC로 프로그램을 이끌던 시기의 실제 사진입니다.',
        funFact: '유재석은 무한도전 추격전과 스포츠 장기 프로젝트를 위해 평생 좋아하던 담배를 끊고 매일 2시간씩 헬스 트레이닝을 했어요.',
        choices: [
          {
            id: 'c1',
            text: '남의 말을 끊고 혼자서만 멘트를 독점하며 원맨쇼를 한다.',
            isCorrect: false,
            feedback: '가상 분기: 다른 멤버들의 캐릭터가 살지 못하고 프로그램의 균형이 무너집니다.'
          },
          {
            id: 'c2',
            text: '자신을 기꺼이 희생하며 망가져 주고, 말수가 적은 멤버에게 질문을 던져 모든 멤버의 매력을 살려낸다.',
            isCorrect: true,
            feedback: '배려형 리더십의 정석! 멤버 전원이 스타가 되고 13년간 전 국민의 사랑을 받는 국민 예능을 일궈냈습니다!',
            historicalNote: '무한도전은 대한민국 방송 최초로 한국 갤럽 선호도 1위를 수년간 독점했습니다.'
          },
          {
            id: 'c3',
            text: '스튜디오 녹화만 고집하고 힘든 야외 촬영이나 레슬링 도전은 모두 거부한다.',
            isCorrect: false,
            feedback: '가상 분기: 몸을 사리지 않는 도전 정신이 무한도전의 핵심 매력입니다!'
          }
        ]
      },
      {
        stageNumber: 3,
        period: '성숙기 (48세~현재)',
        title: '길거리 시민들의 이야기 <유 퀴즈 온 더 블럭>',
        situation: '화려한 세트장을 벗어나 길거리에서 평범한 시민들, 청소 노동자, 소방관, 학생, 떡볶이집 사장님을 만나 인생 이야기를 들어요. 유재석이 인터뷰할 때 가장 집중하는 것은?',
        characterDialogue: '"세상에 평범한 삶이란 없습니다. 모든 분들의 이야기 속에는 한 편의 위대한 영화가 담겨 있습니다."',
        visualTheme: 'youquiz_street',
        illustrationKey: 'yoo_youquiz',
        realPhotoUrl: commonsFile('Yoo Jae Suk going to work at Happy Together on August 19, 2017 (2).jpg', 1000),
        realPhotoDescription: '2017년 《해피투게더》 녹화 출근길의 유재석 — 《유 퀴즈》 촬영 장면 자체는 아니지만 오랜 기간 사람들의 이야기를 듣는 MC로 활동해 온 실제 방송 활동 사진입니다.',
        funFact: '유재석은 <유 퀴즈> 녹화 중 비가 오면 스태프와 시민들에게 우산을 먼저 씌워주고 자신은 비를 맞는 따뜻한 태도로 감동을 주었어요.',
        choices: [
          {
            id: 'c1',
            text: '시민의 눈높이에 맞춰 무릎을 굽히고 따뜻한 눈빛으로 경청하며 눈물과 웃음을 나눈다.',
            isCorrect: true,
            feedback: '진심이 통하는 명품 소통! 우리 이웃들의 소중한 땀과 사랑을 따뜻하게 조명하는 힐링 프로그램으로 큰 사랑을 받고 있습니다!',
            historicalNote: '유재석은 끊임없는 자기관리와 선한 영향력으로 연예계 최고 롱런의 롤모델이 되었습니다.'
          },
          {
            id: 'c2',
            text: '시민들의 이야기가 지루하다며 말을 자르고 퀴즈 상금만 주고 빨리 끝낸다.',
            isCorrect: false,
            feedback: '가상 분기: 사람의 마음에 공감하는 유 퀴즈의 따뜻한 감동이 사라집니다.'
          },
          {
            id: 'c3',
            text: '시민들을 가르치려 들며 자신의 성공담만 1시간 동안 자랑한다.',
            isCorrect: false,
            feedback: '가상 분기: 경청과 겸손의 리더십을 발휘해 보세요!'
          }
        ]
      }
    ]
  }
];

export const HISTORICAL_FIGURES = FIGURES_DATA;

export const SUPER_POWER_TAGS = [
  '창의적 애민정신과 배움의 끈기',
  '필사즉생의 불굴의 용기와 철저한 준비',
  '매일의 기본기 훈련과 성실한 루틴',
  '겸손과 경청, 배려의 소통 리더십',
  '끝없는 탐구열과 끈기 있는 실험정신',
  '장애와 역경을 이겨내는 불굴의 도전정신',
  '소외된 이웃을 향한 따뜻한 인류애',
  '인류 평화와 비폭력 정의 실현',
  '실패를 두려워하지 않는 창의적 발명력',
  '자신에 대한 굳은 믿음과 포기하지 않는 열정'
];
