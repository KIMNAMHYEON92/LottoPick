# 🤝 Global Lotto AI Picker 기여 가이드라인

Global Lotto SaaS 프로젝트에 기여해 주셔서 감사합니다! 

## 📌 신규 기능 기여 방법

### 1. 새로운 국가의 복권 추가하기
`app.js` 파일의 `LOTTO_CONFIGS` 객체에 새로운 복권 규칙을 등록합니다:

```javascript
LOTTO_CONFIGS.new_lotto = {
  id: 'new_lotto',
  name: { ko: '🇯🇵 일본 로또 6', en: '🇯🇵 Japan Lotto 6' },
  main: { min: 1, max: 43, count: 6 },
  bonus: null,
  defaultSum: [95, 165]
};
```

### 2. 새로운 언어(i18n) 번역 추가하기
`app.js` 파일의 `I18N` 객체에 신규 언어 팩(예: `ja`, `es`)을 추가하고 `updateLanguage` 함수에 연결합니다.

---

## 📐 개발 원칙

1. **Zero-Dependency**: 번들러(Webpack/Vite)나 무거운 프레임워크 없이 순수 Vanilla JS 환경을 유지합니다.
2. **Mobile-First**: 모바일 뷰포트(가로 480px 이하)에서의 터치 편의성을 최우선으로 고려합니다.
3. **Cross-Platform**: iOS Safari와 Android Chrome 모두에서 PWA 및 Web Share API가 정상 동작해야 합니다.