document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. 다국어 사전 (i18n Dictionaries)
  // ==========================================
  const I18N = {
    ko: {
      select_lotto: "복권 선택",
      lotto_korea_name: "한국 로또 6/45",
      lotto_korea_desc: "6개 번호 (1~45)",
      lotto_powerball_name: "미국 파워볼 (Powerball)",
      lotto_powerball_desc: "5개 (1~69) + 파워볼 1개 (1~26)",
      lotto_megamillions_name: "미국 메가밀리언",
      lotto_megamillions_desc: "5개 (1~70) + 메가볼 1개 (1~25)",
      lotto_euromillions_name: "유럽 유로밀리언",
      lotto_euromillions_desc: "5개 (1~50) + 스타볼 2개 (1~12)",
      result_title: "이번 주 추천 번호",
      placeholder: "번호 생성 버튼을 눌러주세요",
      generate_btn: "기본 번호 생성",
      gold_btn: "👑 골드 AI VIP 번호 (광고 시청)",
      filter_title: "필터 옵션",
      exclude_label: "제외할 번호 (쉼표 구분)",
      exclude_ph: "예: 3, 14, 25",
      oddeven_label: "홀 : 짝 비율",
      opt_any: "상관없음",
      sum_label: "총합 범위",
      history_title: "최근 생성 이력",
      share_btn: "📤 행운의 번호 공유 / 복사하기",
      ad_loading: "고급 AI 패턴 분석 중...",
      ad_modal_title: "💎 프리미엄 당첨 알고리즘 가동 중",
      ad_sec_left: "초 후 번호가 지급됩니다...",
      toast_copied: "📋 클립보드에 복사되었습니다!",
      toast_shared: "성공적으로 공유되었습니다!",
      alert_too_many: "제외수가 너무 많습니다.",
      alert_no_match: "조건을 만족하는 번호 조합을 찾지 못했습니다. 필터를 완화해 주세요.",
      sum: "총합",
      oddeven: "홀:짝",
      social_feeds: [
        "🇺🇸 미국 캘리포니아 유저가 파워볼 3등 조합을 생성했습니다!",
        "🇰🇷 서울 강남구 유저가 로또 6/45 추천 조합을 확인했습니다.",
        "🇪🇺 프랑스 파리 유저가 유로밀리언 행운 조합을 추출했습니다.",
        "🇺🇸 뉴욕 유저가 메가밀리언 AI 골드 번호를 획득했습니다!",
        "🇰🇷 부산 해운대구 유저가 로또 4등 조합에 당첨되었습니다!"
      ]
    },
    en: {
      select_lotto: "Select Lottery",
      lotto_korea_name: "Korea Lotto 6/45",
      lotto_korea_desc: "6 Balls (1~45)",
      lotto_powerball_name: "US Powerball",
      lotto_powerball_desc: "5 Balls (1~69) + 1 PB (1~26)",
      lotto_megamillions_name: "US Mega Millions",
      lotto_megamillions_desc: "5 Balls (1~70) + 1 MB (1~25)",
      lotto_euromillions_name: "EuroMillions",
      lotto_euromillions_desc: "5 Balls (1~50) + 2 Stars (1~12)",
      result_title: "Recommended Numbers",
      placeholder: "Tap Generate to pick numbers",
      generate_btn: "Generate Numbers",
      gold_btn: "👑 Gold AI VIP Pick (Watch Ad)",
      filter_title: "Filter Options",
      exclude_label: "Exclude Numbers (comma separated)",
      exclude_ph: "e.g. 3, 14, 25",
      oddeven_label: "Odd : Even Ratio",
      opt_any: "Any Ratio",
      sum_label: "Sum Range",
      history_title: "Recent History",
      share_btn: "📤 Share / Copy Lucky Numbers",
      ad_loading: "Analyzing AI Patterns...",
      ad_modal_title: "💎 Unlocking Premium Pick",
      ad_sec_left: "s remaining until reward...",
      toast_copied: "📋 Copied to clipboard!",
      toast_shared: "Shared successfully!",
      alert_too_many: "Too many excluded numbers.",
      alert_no_match: "No valid combination found. Please relax filter conditions.",
      sum: "Sum",
      oddeven: "Odd:Even",
      social_feeds: [
        "🇺🇸 A user in California just generated a Powerball winning combination!",
        "🇰🇷 A user in Seoul generated a 6/45 recommended set.",
        "🇪🇺 A user in Paris unlocked a EuroMillions lucky combination.",
        "🇺🇸 A user in New York unlocked a Mega Millions VIP Pick!",
        "🇬🇧 A user in London generated a EuroMillions set."
      ]
    }
  };

  // ==========================================
  // 2. 글로벌 복권 규칙 설정
  // ==========================================
  const LOTTO_CONFIGS = {
    korea: {
      id: 'korea',
      name: { ko: '🎰 한국 로또 6/45', en: '🎰 Korea Lotto 6/45' },
      main: { min: 1, max: 45, count: 6 },
      bonus: null,
      defaultSum: [100, 170]
    },
    powerball: {
      id: 'powerball',
      name: { ko: '🇺🇸 미국 파워볼', en: '🇺🇸 US Powerball' },
      main: { min: 1, max: 69, count: 5 },
      bonus: { min: 1, max: 26, count: 1, name: 'PB', class: 'ball-powerball' },
      defaultSum: [130, 220]
    },
    megamillions: {
      id: 'megamillions',
      name: { ko: '🇺🇸 미국 메가밀리언', en: '🇺🇸 US Mega Millions' },
      main: { min: 1, max: 70, count: 5 },
      bonus: { min: 1, max: 25, count: 1, name: 'MB', class: 'ball-megaball' },
      defaultSum: [130, 220]
    },
    euromillions: {
      id: 'euromillions',
      name: { ko: '🇪🇺 유럽 유로밀리언', en: '🇪🇺 EuroMillions' },
      main: { min: 1, max: 50, count: 5 },
      bonus: { min: 1, max: 12, count: 2, name: '★', class: 'ball-star' },
      defaultSum: [90, 160]
    }
  };

  // 상태 관리
  let currentLang = 'ko';
  let currentLottoKey = 'korea';
  let currentResult = null;
  let history = [];

  // ==========================================
  // 3. UI 렌더링 및 i18n 언어 전환
  // ==========================================
  function updateLanguage(lang) {
    currentLang = lang;
    document.getElementById('lang-toggle-btn').textContent = lang === 'ko' ? 'EN' : 'KO';

    // 1) 텍스트 일괄 변환 (data-i18n)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N[lang][key]) el.textContent = I18N[lang][key];
    });

    // 2) Placeholder 변환 (data-i18n-ph)
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (I18N[lang][key]) el.placeholder = I18N[lang][key];
    });

    // 3) 헤더 타이틀 업데이트
    document.getElementById('header-title').textContent = LOTTO_CONFIGS[currentLottoKey].name[lang];

    // 4) 현재 추출 결과가 없을 때 placeholder 갱신
    if (!currentResult) {
      const ballContainer = document.getElementById('ball-container');
      const placeholder = ballContainer.querySelector('.placeholder-text');
      if (placeholder) placeholder.textContent = I18N[lang].placeholder;
    } else {
      // 통계 라벨 갱신
      document.getElementById('stats-info').textContent = 
        `${I18N[lang].sum}: ${currentResult.sum} | ${I18N[lang].oddeven}: ${currentResult.odds}:${currentResult.evens}`;
    }

    // 5) 소셜 피드 즉시 갱신
    rotateSocialProof(true);
  }

  document.getElementById('lang-toggle-btn').addEventListener('click', () => {
    updateLanguage(currentLang === 'ko' ? 'en' : 'ko');
  });

  // ==========================================
  // 4. 드로어 메뉴 핸들러
  // ==========================================
  const menuBtn = document.getElementById('menu-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const sideDrawer = document.getElementById('side-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');

  function toggleDrawer(open) {
    sideDrawer.classList.toggle('open', open);
    drawerOverlay.classList.toggle('hidden', !open);
  }

  menuBtn.addEventListener('click', () => toggleDrawer(true));
  drawerCloseBtn.addEventListener('click', () => toggleDrawer(false));
  drawerOverlay.addEventListener('click', () => toggleDrawer(false));

  document.querySelectorAll('.lotto-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.lotto-menu-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      currentLottoKey = item.getAttribute('data-lotto');
      
      const config = LOTTO_CONFIGS[currentLottoKey];
      document.getElementById('header-title').textContent = config.name[currentLang];
      document.getElementById('min-sum').value = config.defaultSum[0];
      document.getElementById('max-sum').value = config.defaultSum[1];
      
      // 결과 초기화
      currentResult = null;
      document.getElementById('ball-container').innerHTML = `<span class="placeholder-text">${I18N[currentLang].placeholder}</span>`;
      document.getElementById('stats-info').textContent = '';
      document.getElementById('share-btn').classList.add('hidden');
      document.getElementById('vip-badge').classList.add('hidden');

      toggleDrawer(false);
    });
  });

  // ==========================================
  // 5. 가상 소셜 프루프 롤링 배너
  // ==========================================
  const socialText = document.getElementById('social-proof-text');
  let feedIndex = 0;

  function rotateSocialProof(immediate = false) {
    const feeds = I18N[currentLang].social_feeds;
    if (immediate) {
      socialText.textContent = feeds[feedIndex % feeds.length];
      return;
    }
    socialText.style.opacity = 0;
    setTimeout(() => {
      socialText.textContent = feeds[feedIndex];
      socialText.style.opacity = 1;
      feedIndex = (feedIndex + 1) % feeds.length;
    }, 300);
  }
  rotateSocialProof();
  setInterval(() => rotateSocialProof(false), 5000);

  // ==========================================
  // 6. 다국가 복권 번호 추출 알고리즘
  // ==========================================
  function generateNumbers(isVIP = false) {
    const config = LOTTO_CONFIGS[currentLottoKey];
    
    // 제외수 파싱
    const excludeInput = document.getElementById('exclude-input').value;
    const excludeNumbers = excludeInput.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
    
    const oddEvenTarget = document.getElementById('odd-even-select').value;
    const minSum = parseInt(document.getElementById('min-sum').value, 10) || 0;
    const maxSum = parseInt(document.getElementById('max-sum').value, 10) || 999;

    // 메인 풀 생성
    const mainPool = Array.from(
      { length: config.main.max - config.main.min + 1 },
      (_, i) => i + config.main.min
    ).filter(n => !excludeNumbers.includes(n));

    if (mainPool.length < config.main.count) {
      alert(I18N[currentLang].alert_too_many);
      return null;
    }

    let attempts = 0;
    while (attempts < 2000) {
      attempts++;
      const shuffled = [...mainPool].sort(() => 0.5 - Math.random());
      const mainSelected = shuffled.slice(0, config.main.count).sort((a, b) => a - b);

      // 홀짝 검증
      const odds = mainSelected.filter(n => n % 2 !== 0).length;
      const evens = config.main.count - odds;
      if (!isVIP && oddEvenTarget !== 'ANY') {
        const [targetOdd, targetEven] = oddEvenTarget.split(':').map(Number);
        if (odds !== targetOdd || evens !== targetEven) continue;
      }

      // 합계 검증
      const sum = mainSelected.reduce((a, b) => a + b, 0);
      if (!isVIP && (sum < minSum || sum > maxSum)) continue;

      // 보너스볼 추첨 (파워볼 / 메가볼 / 스타볼)
      let bonusSelected = [];
      if (config.bonus) {
        const bonusPool = Array.from(
          { length: config.bonus.max - config.bonus.min + 1 },
          (_, i) => i + config.bonus.min
        );
        bonusSelected = [...bonusPool].sort(() => 0.5 - Math.random()).slice(0, config.bonus.count).sort((a, b) => a - b);
      }

      return {
        lottoKey: currentLottoKey,
        mainNumbers: mainSelected,
        bonusNumbers: bonusSelected,
        sum,
        odds,
        evens,
        isVIP
      };
    }

    alert(I18N[currentLang].alert_no_match);
    return null;
  }

  function getKoreaBallColor(num) {
    if (num <= 10) return 'yellow';
    if (num <= 20) return 'blue';
    if (num <= 30) return 'red';
    if (num <= 40) return 'gray';
    return 'green';
  }

  function renderResult(result) {
    currentResult = result;
    const container = document.getElementById('ball-container');
    container.innerHTML = '';

    if (navigator.vibrate) navigator.vibrate(40);

    const config = LOTTO_CONFIGS[result.lottoKey];

    // 메인 볼
    result.mainNumbers.forEach((num, idx) => {
      const ball = document.createElement('div');
      ball.className = `ball ${result.lottoKey === 'korea' ? getKoreaBallColor(num) : 'ball-white'}`;
      ball.textContent = num;
      ball.style.animationDelay = `${idx * 0.05}s`;
      container.appendChild(ball);
    });

    // 보너스 볼
    if (result.bonusNumbers.length > 0) {
      result.bonusNumbers.forEach((bNum) => {
        const bBall = document.createElement('div');
        bBall.className = `ball ${config.bonus.class}`;
        bBall.textContent = bNum;
        container.appendChild(bBall);
      });
    }

    // 통계 표시
    const lang = I18N[currentLang];
    document.getElementById('stats-info').textContent = 
      `${lang.sum}: ${result.sum} | ${lang.oddeven}: ${result.odds}:${result.evens}`;

    document.getElementById('vip-badge').classList.toggle('hidden', !result.isVIP);
    document.getElementById('share-btn').classList.remove('hidden');

    addHistory(result);
  }

  function addHistory(result) {
    const text = `${result.mainNumbers.join(', ')} ${result.bonusNumbers.length ? `[+${result.bonusNumbers.join(',')}]` : ''}`;
    history.unshift(text);
    if (history.length > 5) history.pop();

    document.getElementById('history-list').innerHTML = history
      .map(item => `<li class="history-item"><span>${item}</span></li>`)
      .join('');
  }

  // ==========================================
  // 7. 보상형 짠테크 (골드 AI VIP) 시뮬레이션
  // ==========================================
  const goldBtn = document.getElementById('gold-ai-btn');
  const adModal = document.getElementById('ad-modal');
  const adTimer = document.getElementById('ad-timer');

  goldBtn.addEventListener('click', () => {
    adModal.classList.remove('hidden');
    let timeLeft = 3;
    adTimer.textContent = timeLeft;

    const countdown = setInterval(() => {
      timeLeft--;
      adTimer.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(countdown);
        adModal.classList.add('hidden');
        const vipResult = generateNumbers(true);
        if (vipResult) renderResult(vipResult);
      }
    }, 1000);
  });

  document.getElementById('generate-btn').addEventListener('click', () => {
    const result = generateNumbers(false);
    if (result) renderResult(result);
  });

  // ==========================================
  // 8. 공유 및 클립보드 복사
  // ==========================================
  document.getElementById('share-btn').addEventListener('click', async () => {
    if (!currentResult) return;
    const config = LOTTO_CONFIGS[currentResult.lottoKey];
    
    const formatted = 
`🍀 [${config.name[currentLang]}]
👉 ${currentResult.mainNumbers.join(', ')} ${currentResult.bonusNumbers.length ? `(Bonus: ${currentResult.bonusNumbers.join(', ')})` : ''}
📊 ${I18N[currentLang].sum}: ${currentResult.sum} | ${I18N[currentLang].oddeven} = ${currentResult.odds}:${currentResult.evens}
✨ Good Luck!`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Lucky Pick', text: formatted, url: window.location.href });
      } catch (err) {
        copyToClipboard(formatted);
      }
    } else {
      copyToClipboard(formatted);
    }
  });

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(I18N[currentLang].toast_copied);
    });
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2500);
  }

  // PWA 서비스 워커 등록
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});