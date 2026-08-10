document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const ballContainer = document.getElementById('ball-container');
  const statsInfo = document.getElementById('stats-info');
  const historyList = document.getElementById('history-list');

  let history = [];

  // 로또 번호 추출 및 필터링 핵심 로직
  function generateLottoNumbers() {
    // 1. 제외수 파싱
    const excludeInput = document.getElementById('exclude-input').value;
    const excludeNumbers = excludeInput
      .split(',')
      .map(n => parseInt(n.trim(), 10))
      .filter(n => !isNaN(n) && n >= 1 && n <= 45);

    // 2. 필터 옵션 값 취득
    const oddEvenTarget = document.getElementById('odd-even-select').value;
    const minSum = parseInt(document.getElementById('min-sum').value, 10) || 21;
    const maxSum = parseInt(document.getElementById('max-sum').value, 10) || 255;

    // 3. 사용 가능한 번호 풀 생성 (1~45에서 제외수 차집합)
    const availablePool = Array.from({ length: 45 }, (_, i) => i + 1)
      .filter(num => !excludeNumbers.includes(num));

    if (availablePool.length < 6) {
      alert("제외수가 너무 많아 6개 이상의 번호를 선택할 수 없습니다.");
      return null;
    }

    // 4. 조건 만족 알고리즘 (무한 루프 방지 maxAttempts 설정)
    let attempts = 0;
    const maxAttempts = 2000;

    while (attempts < maxAttempts) {
      attempts++;
      
      // 랜덤 6개 추첨
      const shuffled = [...availablePool].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 6).sort((a, b) => a - b);

      // [필터 1] 홀짝 비율 검증
      const oddCount = selected.filter(n => n % 2 !== 0).length;
      const evenCount = 6 - oddCount;
      if (oddEvenTarget !== 'ANY') {
        const [targetOdd, targetEven] = oddEvenTarget.split(':').map(Number);
        if (oddCount !== targetOdd || evenCount !== targetEven) continue;
      }

      // [필터 2] 총합 범위 검증
      const sum = selected.reduce((acc, curr) => acc + curr, 0);
      if (sum < minSum || sum > maxSum) continue;

      // 모든 조건을 만족하면 결과 반환
      return { numbers: selected, sum, oddCount, evenCount, attempts };
    }

    alert("설정한 조건(제외수, 홀짝, 총합)을 동시에 만족하는 번호를 찾지 못했습니다. 필터를 완화해 주세요.");
    return null;
  }

  // 로또 공 색상 반환 함수
  function getBallColorClass(num) {
    if (num <= 10) return 'yellow';
    if (num <= 20) return 'blue';
    if (num <= 30) return 'red';
    if (num <= 40) return 'gray';
    return 'green';
  }

  // 화면 렌더링
  function renderResult(result) {
    ballContainer.innerHTML = '';
    
    // 모바일 진동 효과 (지원 기기만)
    if (navigator.vibrate) {
      navigator.vibrate(40);
    }

    result.numbers.forEach((num, idx) => {
      const ball = document.createElement('div');
      ball.className = `ball ${getBallColorClass(num)}`;
      ball.textContent = num;
      // 순차적 팝업 애니메이션 지연 처리
      ball.style.animationDelay = `${idx * 0.05}s`;
      ballContainer.appendChild(ball);
    });

    statsInfo.textContent = `합계: ${result.sum} | 홀:짝 = ${result.oddCount}:${result.evenCount}`;

    // 히스토리 추가
    addHistory(result.numbers);
  }

  function addHistory(numbers) {
    history.unshift(numbers.join(', '));
    if (history.length > 5) history.pop();

    historyList.innerHTML = history
      .map(item => `<li class="history-item"><span>${item}</span></li>`)
      .join('');
  }

  // 이벤트 리스너
  generateBtn.addEventListener('click', () => {
    const result = generateLottoNumbers();
    if (result) {
      renderResult(result);
    }
  });
});