document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const ballContainer = document.getElementById('ball-container');
  const statsInfo = document.getElementById('stats-info');
  const historyList = document.getElementById('history-list');
  const shareBtn = document.getElementById('share-btn');
  const toast = document.getElementById('toast');

  let currentResult = null;
  let history = [];

  // ==========================================
  // 1. PWA 서비스 워커 등록 및 설치 프롬프트
  // ==========================================
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('PWA Service Worker Registered!'))
      .catch((err) => console.error('Service Worker Register Failed:', err));
  }

  let deferredPrompt;
  const pwaBanner = document.getElementById('pwa-install-banner');
  const pwaInstallBtn = document.getElementById('pwa-install-btn');

  // 크롬/Android에서 PWA 설치 가능 시 이벤트 감지
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    pwaBanner.classList.remove('hidden'); // 상단 설치 유도 배너 노출
  });

  pwaInstallBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        pwaBanner.classList.add('hidden');
      }
      deferredPrompt = null;
    }
  });

  // ==========================================
  // 2. 로또 번호 추출 핵심 로직
  // ==========================================
  function generateLottoNumbers() {
    const excludeInput = document.getElementById('exclude-input').value;
    const excludeNumbers = excludeInput
      .split(',')
      .map(n => parseInt(n.trim(), 10))
      .filter(n => !isNaN(n) && n >= 1 && n <= 45);

    const oddEvenTarget = document.getElementById('odd-even-select').value;
    const minSum = parseInt(document.getElementById('min-sum').value, 10) || 21;
    const maxSum = parseInt(document.getElementById('max-sum').value, 10) || 255;

    const availablePool = Array.from({ length: 45 }, (_, i) => i + 1)
      .filter(num => !excludeNumbers.includes(num));

    if (availablePool.length < 6) {
      alert("제외수가 너무 많아 6개 이상의 번호를 선택할 수 없습니다.");
      return null;
    }

    let attempts = 0;
    const maxAttempts = 2000;

    while (attempts < maxAttempts) {
      attempts++;
      const shuffled = [...availablePool].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 6).sort((a, b) => a - b);

      const oddCount = selected.filter(n => n % 2 !== 0).length;
      const evenCount = 6 - oddCount;
      if (oddEvenTarget !== 'ANY') {
        const [targetOdd, targetEven] = oddEvenTarget.split(':').map(Number);
        if (oddCount !== targetOdd || evenCount !== targetEven) continue;
      }

      const sum = selected.reduce((acc, curr) => acc + curr, 0);
      if (sum < minSum || sum > maxSum) continue;

      return { numbers: selected, sum, oddCount, evenCount };
    }

    alert("설정한 조건(제외수, 홀짝, 총합)을 동시에 만족하는 번호를 찾지 못했습니다. 필터를 완화해 주세요.");
    return null;
  }

  function getBallColorClass(num) {
    if (num <= 10) return 'yellow';
    if (num <= 20) return 'blue';
    if (num <= 30) return 'red';
    if (num <= 40) return 'gray';
    return 'green';
  }

  function renderResult(result) {
    currentResult = result;
    ballContainer.innerHTML = '';
    
    if (navigator.vibrate) {
      navigator.vibrate(40);
    }

    result.numbers.forEach((num, idx) => {
      const ball = document.createElement('div');
      ball.className = `ball ${getBallColorClass(num)}`;
      ball.textContent = num;
      ball.style.animationDelay = `${idx * 0.05}s`;
      ballContainer.appendChild(ball);
    });

    statsInfo.textContent = `합계: ${result.sum} | 홀:짝 = ${result.oddCount}:${result.evenCount}`;
    
    // 번호 생성 성공 시 공유 버튼 노출
    shareBtn.classList.remove('hidden');

    addHistory(result.numbers);
  }

  function addHistory(numbers) {
    history.unshift(numbers.join(', '));
    if (history.length > 5) history.pop();

    historyList.innerHTML = history
      .map(item => `<li class="history-item"><span>${item}</span></li>`)
      .join('');
  }

  // ==========================================
  // 3. [신규] Web Share API & 클립보드 복사
  // ==========================================
  shareBtn.addEventListener('click', async () => {
    if (!currentResult) return;

    const formattedText = 
`🍀 [로또 6/45 행운의 추천 번호]

👉 번호: ${currentResult.numbers.join(', ')}

📊 분석 정보:
- 총합계: ${currentResult.sum}
- 홀짝 비율: ${currentResult.oddCount} : ${currentResult.evenCount}

✨ 이번 주 당첨을 기원합니다! 🎯`;

    // 스마트폰 네이티브 공유하기 API 지원 여부 확인
    if (navigator.share) {
      try {
        await navigator.share({
          title: '로또 행운의 번호',
          text: formattedText,
          url: window.location.href,
        });
        showToast('성공적으로 공유되었습니다!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(formattedText);
        }
      }
    } else {
      // 데스크톱 / 지원하지 않는 모바일 브라우저는 클립보드 복사로 대처
      copyToClipboard(formattedText);
    }
  });

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 번호가 클립보드에 복사되었습니다!');
    }).catch(() => {
      showToast('복사에 실패했습니다.');
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2500);
  }

  generateBtn.addEventListener('click', () => {
    const result = generateLottoNumbers();
    if (result) {
      renderResult(result);
    }
  });
});