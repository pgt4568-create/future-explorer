import fs from 'node:fs/promises';

const DATA_FILE = new URL('../src/data/figuresData.ts', import.meta.url);
const source = await fs.readFile(DATA_FILE, 'utf8');

const filenames = [...source.matchAll(/(?:photoUrl|realPhotoUrl): commonsFile\('([^']+)'/g)].map((m) => m[1]);
const profileCount = (source.match(/\n    photoUrl: commonsFile\(/g) || []).length;
const stageCount = (source.match(/\n        realPhotoUrl: commonsFile\(/g) || []).length;
const duplicateFiles = filenames.filter((name, index) => filenames.indexOf(name) !== index);
const liveSearchLeft = /(?:photoSearchQuery|realPhotoSearchQuery):/.test(source);

const fail = (message) => {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
};

console.log(`📸 고정 사진 매핑: 대표사진 ${profileCount}개 + 인생게임 ${stageCount}개 = 총 ${filenames.length}개`);
if (profileCount !== 10) fail(`대표사진은 10개여야 하지만 ${profileCount}개입니다.`);
if (stageCount !== 37) fail(`인생게임 사진은 37개여야 하지만 ${stageCount}개입니다.`);
if (filenames.length !== 47) fail(`전체 사진은 47개여야 하지만 ${filenames.length}개입니다.`);
if (duplicateFiles.length) fail(`같은 사진 파일이 반복 사용됩니다: ${[...new Set(duplicateFiles)].join(', ')}`);
if (liveSearchLeft) fail('실시간 Wikimedia 검색 쿼리가 데이터에 남아 있습니다.');

// 사용자가 직접 지적한 핵심 사진 회귀 방지
const criticalMappings = [
  ["백범 김구 대표사진", "photoUrl: commonsFile('Kim Gu in 1949.jpg'"],
  ["마리 퀴리 파리 유학 첫 단계", "realPhotoUrl: commonsFile('Maria Skłodowska arrives in Paris, 1891.jpg'"],
  ["마리 퀴리 1911 두 번째 노벨상", "realPhotoUrl: commonsFile('Marie Curie (Nobel-Chem).jpg'"],
  ["세종 인재 등용 - 장영실", "realPhotoUrl: commonsFile('Jang Youngsil 1.jpg'"],
  ["세종 공법 개혁 - 세종실록", "realPhotoUrl: commonsFile('세종실록 표지.gif'"],
  ["제인 구달 곰베 현장", "realPhotoUrl: commonsFile('LT0230-02 (48539452661).jpg'"],
  ["헬렌 켈러 세계 순회", "realPhotoUrl: commonsFile('Helen Keller visit to Japan in 1948 01.jpg'"],
  ["월트 디즈니 백설공주", "realPhotoUrl: commonsFile('Walt Disney Snow white 1937 trailer screenshot (13).jpg'"],
];
for (const [label, snippet] of criticalMappings) {
  if (!source.includes(snippet)) fail(`${label} 사진 매핑이 의도한 확정 파일에서 변경되었습니다.`);
}

if (process.exitCode) process.exit(process.exitCode);

console.log('✅ 정적 사진 매핑 검사 통과: 47개 모두 서로 다른 확정 파일이며 랜덤 검색이 없습니다.');

if (process.env.PHOTO_AUDIT_NETWORK !== '1') {
  console.log('ℹ️ 네트워크 검사는 생략했습니다. GitHub Actions에서는 PHOTO_AUDIT_NETWORK=1로 실제 Commons 파일 존재 여부를 검사합니다.');
  process.exit(0);
}

const batches = [];
for (let i = 0; i < filenames.length; i += 20) batches.push(filenames.slice(i, i + 20));
const missing = [];
const invalid = [];

for (const batch of batches) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    prop: 'imageinfo',
    iiprop: 'url|mime',
    iiurlwidth: '1000',
    titles: batch.map((name) => `File:${name}`).join('|'),
  });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`, {
    headers: { 'User-Agent': 'future-explorer-photo-audit/1.0 (GitHub Pages educational app)' },
  });
  if (!response.ok) throw new Error(`Wikimedia API HTTP ${response.status}`);
  const json = await response.json();
  const pages = Object.values(json?.query?.pages || {});
  const returned = new Set();

  for (const page of pages) {
    const title = String(page?.title || '').replace(/^File:/, '');
    returned.add(title);
    if ('missing' in page) {
      missing.push(title);
      continue;
    }
    const info = page?.imageinfo?.[0];
    if (!info || !String(info.mime || '').startsWith('image/') || !(info.thumburl || info.url)) {
      invalid.push(title);
    }
  }

  // API normalization may alter underscores/spaces; compare after normalization.
  const normalize = (s) => s.replace(/_/g, ' ').normalize('NFC').toLowerCase();
  const returnedNorm = new Set([...returned].map(normalize));
  for (const expected of batch) {
    if (!returnedNorm.has(normalize(expected))) missing.push(expected);
  }
}

const uniqueMissing = [...new Set(missing)];
const uniqueInvalid = [...new Set(invalid)];
if (uniqueMissing.length) fail(`Commons에서 찾지 못한 파일: ${uniqueMissing.join(' | ')}`);
if (uniqueInvalid.length) fail(`이미지 URL을 얻지 못한 파일: ${uniqueInvalid.join(' | ')}`);
if (process.exitCode) process.exit(process.exitCode);

console.log(`✅ Wikimedia Commons 네트워크 검사 통과: ${filenames.length}개 확정 파일 모두 존재하고 이미지 URL을 제공합니다.`);
