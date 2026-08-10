# 🎰 LottoPick - 모바일 최적화 로또 번호 추출 PWA (Micro SaaS)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA Ready](https://img.shields.io/badge/PWA-Supported-purple.svg)
![Deploy](https://img.shields.io/badge/Deploy-Vercel%20%2F%20Netlify-000000.svg)

> **"복잡한 백엔드 없이 빠르게 시작하는 모바일 퍼스트 로또 번호 추출 마이크로 SaaS"**  
> 모바일 환경에 특화된 UX, 세밀한 조건 필터링 알고리즘, PWA(홈 화면 추가) 기술을 탑재한 경량 웹 애플리케이션입니다.

---

## 🌟 주요 기능 (Key Features)

- 📱 **Mobile-First Responsive Design**: 스마트폰 터치 환경에 완벽히 최적화된 앱 스타일 UI/UX 제공
- 🎛️ **커스텀 필터링 알고리즘**:
  - **제외수 설정**: 사용자가 지정한 번호를 제외한 추첨
  - **홀짝 비율 필터**: 원하는 홀/짝 비율(3:3, 4:2 등) 자동 조합
  - **총합 범위 필터**: 당첨 통계 기반의 안전 총합 구간 설정 (기본값 100~170)
- ⚡ **PWA (Progressive Web App)**: 
  - 앱스토어 설치 없이 스마트폰 "홈 화면에 추가" 지원
  - 오프라인 환경에서도 빠른 로딩 지원 (Service Worker)
- 📳 **Haptic Feedback**: 번호 생성 시 실제 앱 느낌의 모바일 진동 효과 제공
- 📜 **히스토리 저장**: 최근 생성한 번호 조합을 로컬에 자동 기록 (최신 5개)
- 🚀 **Zero-Backend**: Serverless 구조로 유지비 0원 배포 가능

---

## 🛠 기술 스택 (Tech Stack)

| 구분 | 사용 기술 |
| :--- | :--- |
| **Frontend** | Vanilla HTML5, Modern CSS3, ES6+ JavaScript |
| **PWA** | Web App Manifest (`manifest.json`), Service Worker (`sw.js`) |
| **Deployment** | Vercel / Netlify / GitHub Pages (Static Hosting) |
| **API/State** | Web Vibration API, LocalStorage (클라이언트 사이드 전용) |

---

## 📁 디렉토리 구조 (Directory Structure)

```text
.
├── index.html        # 메인 웹앱 UI 구조
├── style.css         # 모바일 전용 레이아웃 및 로또 공 CSS 애니메이션
├── app.js            # 조건 검증 알고리즘 및 이벤트 핸들러
├── manifest.json     # PWA 설치 메타데이터 설정
└── sw.js             # PWA 오프라인 캐싱 서비스 워커
```

---

## 🚀 시작하기 (Getting Started)

별도의 패키지 설치(`npm install` 등)나 빌드 파이프라인 없이 **단독 정적 파일**로 동작합니다.

### 로컬 환경 실행

1. 저장소 클론 (Clone)
   ```bash
   git clone https://github.com/your-username/lotto-pick-pwa.git
   cd lotto-pick-pwa
   ```
2. `index.html` 파일을 브라우저에서 바로 열거나, VS Code의 `Live Server` 확장 프로그램을 사용하여 실행합니다.

---

## ☁️ 배포 가이드 (Deployment)

이 프로젝트는 정적 파일로만 구성되어 있어 **1분 이내로 무료 배포**가 가능합니다.

### Vercel 배포 방법
1. [Vercel](https://vercel.com) 로그인 후 **[New Project]** 클릭
2. GitHub 저장소(`lotto-pick-pwa`) 선택
3. 별도의 Build Command 설정 없이 **[Deploy]** 클릭

### Netlify 배포 방법
1. [Netlify](https://netlify.com) 로그인 후 **[Add new site] -> [Import an existing project]**
2. 저장소 선택 후 **[Deploy Site]** 클릭

---

## 🧠 번호 추출 알고리즘 (Algorithm Details)

1. **번호 풀 생성**: 1~45 숫자 중 사용자가 입력한 `제외수`를 제거합니다.
2. **랜덤 픽**: 남아있는 숫자 풀에서 임의의 6개 번호를 중복 없이 무작위 추출 후 정렬합니다.
3. **조건 검증 (Retry Pattern)**:
   - 선택된 조합의 **홀/짝 비율**이 사용자가 지정한 조건과 일치하는지 확인합니다.
   - 선택된 조합의 **숫자 총합**이 지정된 범위를 충족하는지 확인합니다.
4. **안전 장치**: 무한 루프를 방지하기 위해 최대 2,000회 시도 후 조건에 만족하는 조합을 찾지 못할 경우 사용자에게 알림 메시지를 표시합니다.

---

## 💡 수익화 및 확장 로드맵 (Micro SaaS Roadmap)

마이크로 SaaS 서비스로 발전시키기 위한 향후 기능 추가 계획입니다.

- [ ] **구글 애드센스 (AdSense) / 카카오 애드핏 연동**: 하단 Banner 광고 노출
- [ ] **카카오톡/SNS 공유 기능**: 생성된 번호를 친구에게 바로 공유하는 Web Share API 구현
- [ ] **QR코드 당첨 확인**: 모바일 카메라를 통한 로또 용지 QR코드 스캔 기능 추가
- [ ] **프리미엄 통계 알고리즘**: 역대 당첨 번호 빅데이터 패턴 분석 기반의 고급 추출 모드 (수익화 옵션)

---

## 📄 라이선스 (License)

이 프로젝트는 **MIT License**에 따라 자유롭게 수정, 재배포 및 상업적 이용이 가능합니다.