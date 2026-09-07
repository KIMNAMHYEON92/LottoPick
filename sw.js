// 캐시 버전을 v2.1로 판올림하여 구버전 캐시를 강제 삭제합니다.
const CACHE_NAME = 'lottopick-v2.1';
const ASSETS = [
  './',
  './index.html',
  './style.css?v=2.1',
  './app.js?v=2.1',
  './manifest.json'
];

// 1. 서비스 워커 설치 시 즉시 활성화 대기 건너뛰기
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. 활성화 시 구버전(v1, v2) 캐시 즉시 전체 삭제
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] 구버전 캐시 제거:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // 현재 열려있는 모든 모바일 탭을 즉시 장악
  );
});

// 3. 네트워크 우선 (Network-First) 전략: 항상 최신 파일을 우선 요청
self.addEventListener('fetch', (e) => {
  // 브라우저 확장 프로그램 등 비-GET 요청 무시
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        // 네트워크 연결이 정상이면 새 파일을 캐시에 최신화하고 응답 반환
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // 오프라인이거나 네트워크 실패 시에만 로컬 캐시 사용
        return caches.match(e.request);
      })
  );
});