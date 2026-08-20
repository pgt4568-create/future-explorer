# 위인과 함께하는 나의 미래 탐험대

초등 진로·역사 체험용 React/Vite 웹앱입니다.

## 이번 수정본의 사진 정책

- 위인 선택 대표사진 10개와 인생게임 단계 사진 37개를 **모두 고정 파일명으로 지정**했습니다.
- Wikimedia Commons 실시간 검색 결과를 사용하지 않으므로 엉뚱한 사진이 랜덤으로 바뀌지 않습니다.
- 같은 대표사진으로 반복 대체하지 않습니다.
- 각 사진의 출처 파일은 확대 화면에서 Wikimedia Commons 원문으로 확인할 수 있습니다.
- 사진 전수 매핑은 `PHOTO_AUDIT.md`에서 확인할 수 있습니다.
- GitHub Actions는 배포 전에 47개 Commons 파일의 실제 존재 여부와 이미지 URL 제공 여부를 자동 검사합니다.

## GitHub Pages 배포

1. ZIP을 풀고 저장소 루트에 전체 파일을 덮어씁니다.
2. `.github/workflows/deploy-pages.yml`이 정확히 그 경로에 있는지 확인합니다.
3. GitHub 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
4. `main` 브랜치에 커밋하면 `사진 점검 → TypeScript 검사 → Vite build → Pages 배포` 순서로 자동 실행됩니다.
5. Actions에서 `Deploy to GitHub Pages`가 초록 체크가 되면 배포 완료입니다.

## 로컬 실행

```bash
npm install
npm run dev
```
