# 🤝 Contributing to LottoPick

LottoPick 오픈소스 프로젝트에 기여해 주셔서 감사합니다!

## 📌 기여 가이드라인

### 1. 신규 복권 규칙 추가
`app.js` 파일의 `LOTTO_CONFIGS` 객체에 새로운 복권 사양을 정의합니다.

### 2. 새로운 자가 프로모션 배너 추가
`app.js`의 `PROMO_BANNERS` 배열에 새 객체를 추가하고, 필요시 `style.css`에 고유한 배경 그라데이션 클래스를 등록합니다.

### 3. 다국어(i18n) 언어 팩 확장
`app.js`의 `I18N` 객체에 신규 언어(예: 일본어 `ja`, 스페인어 `es`) 키-값을 추가합니다.

---

## 📐 개발 원칙
- **Zero-Dependency**: 외부 무거운 라이브러리 없이 순수 Vanilla Web API 환경을 고수합니다.
- **Mobile-First & Lightweight**: 이미지 파일 의존도를 낮추고 CSS 그라데이션 및 시스템 폰트를 우선합니다.