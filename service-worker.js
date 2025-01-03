self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('oussama-apk-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/script.js',
                '/icons/icon-192x192.png',
                '/icons/icon-512x512.png'
            ]);
        }).catch(error => {
            console.error('Error caching assets during install:', error);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // إذا كانت الاستجابة في الـ cache موجودة، فسيتم استخدامها
            if (cachedResponse) {
                return cachedResponse;
            }
            // إذا لم تكن موجودة في الـ cache، سيتم جلبها من الشبكة
            return fetch(event.request).catch(error => {
                console.error('Fetch failed:', error);
                // في حالة فشل fetch، يمكن إظهار صفحة مخصصة أو العودة إلى بيانات معينة
                return caches.match('/offline.html'); // يجب أن يكون لديك صفحة offline.html محجوزة في الـ cache
            });
        })
    );
});
