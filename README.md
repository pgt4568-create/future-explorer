<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/88aa7387-d0ca-4ca7-87fe-863be6fb9493

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## GitHub Pages 배포

이 저장소는 `.github/workflows/deploy-pages.yml`을 통해 `main` 브랜치 푸시 시 자동으로 빌드되어 GitHub Pages에 배포됩니다.
GitHub 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정하세요.
