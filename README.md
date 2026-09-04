# 🍀 LottoPick - 글로벌 복권 AI 추천 & 마이크로 SaaS PWA

![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA Ready](https://img.shields.io/badge/PWA-Supported-purple.svg)
![i18n](https://img.shields.io/badge/i18n-KO%20%7C%20EN-orange.svg)
![Deploy](https://img.shields.io/badge/Deploy-Netlify%20%2F%20Vercel-000000.svg)
![Support](https://img.shields.io/badge/Ko--fi-Support-ffdd00.svg)

> **"글로벌 4대 복권 지원, 자가 프로모션 배너 엔진, 실시간 다국어 및 후원 시스템이 결합된 완성형 마이크로 SaaS"**  
> 외부 이미지 파일 없이 순수 HTML/CSS/JS로 가볍게 동작하며, 백엔드 서버 비용 0원으로 글로벌 트래픽 유입 및 수익화를 실현합니다.

---

## 🌟 주요 기능 (Key Features)

### 1. 🔄 자가 프로모션 배너 롤링 엔진 (Self-Promo Fallback Ads)
- 외부 광고 미송출 시 상·하단 슬롯에 **3종 자체 서비스 배너가 5초 주기로 자동 페이드 롤링**:
  1. 🐱 **MemeCats**: "내 성격과 똑닮은 밈고양이는? [테스트 시작]" (핑크/퍼플 그라데이션)
  2. 📖 **EMHS Gallery**: "웹소설: 영원한 모태솔로 갤러리 무료 연재 중 [읽어보기]" (다크 블루 그라데이션)
  3. 💻 **GitHub Open Source**: "이 프로젝트의 코드가 궁금하다면? [GitHub 보기]" (다크 그레이 그라데이션)
- 외부 이미지 에셋 0개! 순수 CSS 그라데이션 렌더링으로 번개 같은 로딩 속도 보장
- 다국어(KO/EN) 전환 시 배너 타이틀 및 CTA 문구 실시간 자동 번역

### 2. ☕ 글로벌 후원 및 개발자 네트워크 (Side Drawer Menu)
- 사이드 드로어 최하단에 전용 구분선과 함께 네트워크 링크 탑재:
  - **Ko-fi 후원 버튼**: 고대비 옐로우/오렌지 포인트 버튼 연동 (`https://ko-fi.com/emhsolo`)
  - **Developer's Lab**: 패밀리 서비스 및 기타 프로젝트 포털 링크 영역

### 3. 🌐 글로벌 4대 복권 지원 (Multi-Lottery Engine)
- **🇰🇷 한국 로또 6/45**: 1~45 중 6개 (국내 표준 5색 볼 테마)
- **🇺🇸 미국 파워볼 (Powerball)**: 화이트볼 5개 (1~69) + 레드 파워볼 1개 (1~26)
- **🇺🇸 미국 메가밀리언 (Mega Millions)**: 화이트볼 5개 (1~70) + 골드 메가볼 1개 (1~25)
- **🇪🇺 유럽 유로밀리언 (EuroMillions)**: 메인볼 5개 (1~50) + 럭키 스타볼 2개 (1~12)

### 4. 🏷️ SNS 바이럴 Open Graph 메타태그 탑재
- 카카오톡, X(Twitter), 페이스북, 슬랙 링크 공유 시 매력적인 요약 카드(OG Title, Description) 자동 출력

### 5. 💰 짠테크 보상형 VIP 추출 & 실시간 소셜 피드
- **골드 AI VIP 추출 모달**: 3초 카운트다운 보상형 모달 시뮬레이션
- **라이브 소셜 프루프 바**: 전 세계 유저들의 실시간 추출 현황 5초 주기 롤링 노출

---

## 🛠 기술 스택 (Tech Stack)

| 영역 | 기술 |
| :--- | :--- |
| **Frontend** | Vanilla HTML5, CSS3 (Safe-Area, Pure Gradients), ES6+ JavaScript |
| **PWA** | Web App Manifest (`manifest.json`), Service Worker (`sw.js`) |
| **i18n** | Zero-Dependency Lightweight Translation Dictionary (KO / EN) |
| **Ad / Promo** | Custom Interval Rotating Banner System (AdSense Mock + Fallback) |
| **APIs** | Web Share API, Clipboard API, Web Vibration API, Web Cache API |

---

## 📁 프로젝트 디렉토리 구조

```text
.
├── .gitignore              # Git 추적 제외 설정
├── LICENSE                 # MIT License
├── README.md               # 메인 프로젝트 문서 (v2.1)
├── CONTRIBUTING.md         # 기여 가이드라인
├── index.html              # OG 태그, 드로어, 프로모션 배너 컨테이너 포함
├── style.css               # 그라데이션 배너, 페이드 애니메이션, Ko-fi 버튼 스타일
├── app.js                  # 복권 엔진, 5초 배너 롤링, i18n, 이벤트 핸들러
├── manifest.json           # PWA 설치 메타데이터
└── sw.js                   # 서비스 워커 캐싱
```

---

## ⚙️ 자가 프로모션 배너 커스텀 방법

`app.js` 상단의 `PROMO_BANNERS` 배열에서 링크 URL, 타이틀, CTA 문구를 원하는 서비스로 손쉽게 수정할 수 있습니다:

```javascript
const PROMO_BANNERS = [
  {
    id: 'my-service',
    badge: '🚀 My Service',
    title: { ko: '내 서비스 한 줄 소개', en: 'My Service Description' },
    cta: { ko: '[바로가기]', en: '[Visit Now]' },
    themeClass: 'banner-memecats', // style.css에 정의된 그라데이션 클래스
    url: 'https://your-domain.com'
  },
  // ...
];
```

---

## 🚀 배포 및 실습 안내

1. 수정된 파일들을 저장소에 푸시합니다:
   ```bash
   git add .
   git commit -m "feat: v2.1 Update - Add Self-Promo Banners, Ko-fi Button & OG Tags"
   git push origin main
   ```
2. Netlify 또는 Vercel에서 약 15~30초 후 빌드 없이 자동 라이브 배포가 완료됩니다.