const izCacheVer = 1;
importScripts(
  'https://cdn.izooto.com/scripts/workers/bbb67b29306b45dfa1a7ccd866c1f6a55f8dc9dd.js'
);
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

const installEvent = () => {
  self.addEventListener('install', () => {
    console.log('service worker installed');
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener('activate', () => {
    console.log('service worker activated');
  });
};
activateEvent();

registerRoute(
  new RegExp('/.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i'),
  new CacheFirst({
    cacheName: 'static-font-assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 365 Days
      }),
    ],
  })
);
registerRoute(
  new RegExp('/.(?:js)$/i'),
  new CacheFirst({
    cacheName: 'static-js-assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 3 * 24 * 60 * 60, // 365 Day
      }),
    ],
  })
);
registerRoute(
  new RegExp('/.(?:css|less)$/i'),
  new CacheFirst({
    cacheName: 'static-style-assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 3 * 24 * 60 * 60, // 365 Day
      }),
    ],
  })
);
precacheAndRoute([
  {
    url: 'https://images.news18.com/ibnkhabar/uploads/2023/03/news18-hindi-logo.png',
    revision: 'v1',
  },
  {
    url: 'https://images.news18.com/ibnkhabar/uploads/2019/07/news18hindilogo-homeiconnew.png',
    revision: 'v1',
  },
  {
    url: 'https://images.news18.com/ibnkhabar/uploads/2020/01/hindimobile-navicon-new5.png',
    revision: 'v1',
  },
]);
precacheAndRoute(self.__WB_MANIFEST);
