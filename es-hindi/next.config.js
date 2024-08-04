const fs = require("fs");
const SITE_CONfIG = require("./src/config/site.config.js");
const ENV_CONfIG = require("./src/config/env.config.js");
const beforeFiles = require("./rewrites/beforeFiles");
const runtimeCaching = require("./helper/cache");
const MomentTimezoneDataPlugin = require("moment-timezone-data-webpack-plugin");
const redirectURLs = require("./rewrites/redirectURLs");
const withPWA = require("next-pwa");

const advancedHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const plugin = new MomentTimezoneDataPlugin({
  matchZones: "Asia/Kolkata",
});
const nextConfig = {
  generateEtags: false,
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  webpack: (config) => {
    config.plugins.push(plugin);
    config.node = {
      global: true,
      __filename: false,
      __dirname: true,
    };
    return config;
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  trailingSlash: true,
  useFileSystemPublicRoutes: true,
  redirects() {
    return redirectURLs;
  },
  rewrites() {
    return beforeFiles;
  },
  headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: advancedHeaders,
      },
    ];
  },
  env: {
    ...ENV_CONfIG,
    newrelicrum: fs.readFileSync("./newrelic.js").toString(),
    newrelicevents: fs
      .readFileSync("./public/scripts/newrelicevents.js")
      .toString(),
  },
  publicRuntimeConfig: {
    ...SITE_CONfIG,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "images.news18.com",
      "img.youtube.com",
      "lbimg.in.com",
      "static.hindi.news18.com",
      "xmlns.cricketnext.com",
      "img01.ibnlive.in",
      "images.hindi.news18.com",
      "kannada.news18.com",
      "wallpapers.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
//module.exports = nextConfig;
module.exports = (_phase, { defaultConfig }) => {
  const plugins = [
    withPWA({
      disable: true,
      dest: "public",
      scope: "/",
      sw: "sw.js",
      register: true,
      publicExcludes: [
        "!images/**/*",
        "!robots.txt",
        "!manifest.json",
        "!sw.js",
        "!service-worker.js",
        "!workbox-*.js",
        "!fonts/**/*",
        "!scripts/**/*",
      ],
      customWorkerDir: "worker",
      buildExcludes: [() => true],
      runtimeCaching,
    }),
  ];
  return plugins.reduce((acc, plug) => plug(acc), {
    ...defaultConfig,
    ...nextConfig,
  });
};
