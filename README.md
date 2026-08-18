# 🎰 Global Lotto AI Picker - 글로벌 수익형 마이크로 SaaS PWA

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA Ready](https://img.shields.io/badge/PWA-Supported-purple.svg)
![i18n](https://img.shields.io/badge/i18n-KO%20%7C%20EN-orange.svg)
![Deploy](https://img.shields.io/badge/Deploy-Netlify%20%2F%20Vercel-000000.svg)

> **"글로벌 복권 지원, 다국어 엔진, 광고 수익화 모델을 탑재한 무서버(Serverless) 마이크로 SaaS"**  
> 백엔드 서버 비용 0원으로 운영 가능하며, 글로벌 트래픽 유입 및 광고 수익 창출에 최적화된 모바일 퍼스트 PWA 애플리케이션입니다.

---

## 🌟 주요 기능 (Key Features)

### 1. 🌐 글로벌 복권 엔진 (Multi-Lottery Support)
- **한국 로또 6/45**: 1~45 중 6개 번호 추첨 (국내 표준 5색 볼 테마 적용)
- **미국 파워볼 (US Powerball)**: 화이트볼 1~69 중 5개 + 레드 파워볼 1~26 중 1개
- **미국 메가밀리언 (US Mega Millions)**: 화이트볼 1~70 중 5개 + 골드 메가볼 1~25 중 1개
- **유럽 유로밀리언 (EuroMillions)**: 메인볼 1~50 중 5개 + 럭키 스타볼 1~12 중 2개
- *좌측 사이드 드로어(Hamburger Menu)를 통해 즉각적인 복권 전환 및 전용 알고리즘 가동*

### 2. 🌍 실시간 다국어 지원 (Zero-Dependency i18n)
- **한국어(KO) 및 영어(EN)** 원클릭 실시간 토글 지원
- 드로어 메뉴, 입력 힌트(Placeholder), 추출 통계, 알림창까지 100% 실시간 번역
- JSON 딕셔너리 구조로 일본어(JA), 스페인어(ES) 등 추가 언어 확장 용이

### 3. 💰 수익화 및 짠테크(보상형 잠금) 아키텍처
- **Google AdSense 대응 배너 슬롯**: 상단/하단 반응형 광고 영역(320x50, 300x100 등) 기본 탑재
- **골드 AI VIP 추천 (보상형 광고 모달)**: 3초 가상 동영상 광고 시청 후 고확률 VIP 추천 조합 제공 (실제 AdMob / AdSense 보상형 광고 SDK 연동 가능 구조)

### 4. 🚀 실시간 소셜 프루프 (Live Social Proof Ticker)
- 화면 상단에 5초 주기로 전 세계 유저들의 당첨 및 번호 추출 현황을 롤링 노출하여 서비스 신뢰도 및 체류 시간 증대

### 5. 📱 모바일 네이티브 UX & PWA
- **스마트폰 홈 화면 추가 (A2HS)**: 앱스토어 심사 없이 네이티브 앱 형태로 설치 가능
- **Web Share API**: 스마트폰 카카오톡, 문자메시지, 메모장 등으로 이모지 서식 자동 공유 및 클립보드 복사
- **Haptic Vibration**: 번호 생성 시 모바일 햅틱 진동 피드백 제공

---

## 🛠 기술 스택 (Tech Stack)

| 영역 | 사용 기술 |
| :--- | :--- |
| **Frontend** | Vanilla HTML5, CSS3 (Modern Flex/Grid, Safe-Area), ES6+ JavaScript |
| **PWA** | Web App Manifest (`manifest.json`), Service Worker (`sw.js`) |
| **i18n** | Lightweight Dynamic Translation Engine |
| **APIs** | Web Share API, Clipboard API, Vibration API, Web Cache API |
| **Deployment** | Netlify / Vercel (CI/CD Automated via GitHub Push) |

---

## 📁 디렉토리 구조 (Directory Structure)

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages 배포 워크플로우 (선택 사항)
├── .gitignore              # 불필요한 OS/임시 파일 추적 방지
├── LICENSE                 # MIT License
├── README.md               # 프로젝트 상세 가이드 문서
├── CONTRIBUTING.md         # 오픈소스 기여 가이드
├── index.html              # 메인 웹앱 마크업 (드로어, 광고 슬롯, 모달 포함)
├── style.css               # 모바일 최적화 및 복권 볼/광고/드로어 CSS
├── app.js                  # 글로벌 복권 알고리즘, i18n 엔진, 이벤트 제어
├── manifest.json           # PWA 설치 메타데이터
└── sw.js                   # 오프라인 캐싱 서비스 워커
```

---

## 🧠 번호 추출 알고리즘 명세

```text
[복권 선택] 
   │
   ├──> 1. 제외수(Excluded Numbers) 파싱 및 메인 번호 풀에서 차집합 제거
   ├──> 2. 무작위 셔플 후 메인 볼(Main Balls) N개 추출 및 오름차순 정렬
   ├──> 3. 조건 검증 (홀짝 비율 일치 여부 & 총합 구간 일치 여부 판별)
   │        └── 불일치 시 최대 2,000회 재추출 (Safety Retry Pattern)
   ├──> 4. 복권별 특수 보너스 볼(Powerball / Mega Ball / Lucky Star) 독립 풀에서 별도 추첨
   └──> 5. 햅틱 진동 + 팝업 애니메이션과 함께 결과 렌더링
```

---

## 💵 실제 광고(AdSense) 연동 가이드

현재 `index.html` 내에 배치된 더미 광고 영역을 실제 광고 코드로 교체하는 방법:

1. `index.html`에서 `<div class="ad-slot ad-slot-top">` 및 `ad-slot-bottom` 영역을 탐색합니다.
2. Google AdSense 대시보드에서 발급받은 `<ins class="adsbygoogle" ...>` 반응형 디스플레이 광고 태그를 해당 위치에 붙여넣습니다.

---

## 🤝 기여 방법 (Contributing)

새로운 국가의 복권 추가나 신규 언어 번역 기여는 언제나 환영합니다! 자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md) 문서를 참고해 주세요.

---

## 📄 라이선스 (License)

이 프로젝트는 **MIT License**를 따르며, 개인적/상업적 용도로 자유롭게 수정 및 재배포할 수 있습니다.