const Routes = [
  //   {
  //     source: "/bitbns",
  //     destination: "microsite/bitbns",
  //   },
  {
    source: '/pro-kabaddi-league/:teama-:teamb-vs-:matchId/',
    destination: '/pro-kabaddi-league/match-center',
  },
  {
    source: '/pro-kabaddi-league/:teamName-:teamId/',
    destination: '/pro-kabaddi-league/team-details',
  },
  {
    source: '/pro-kabaddi-league/:teamName/:playerName-:playerId/',
    destination: '/pro-kabaddi-league/player-details',
  },
  {
    source: "/ipl-auction/:teamId/",
    destination: "/ipl-auction/",
  },
  {
    source: "/cricket/ipl/:teamId/",
    destination: "/cricket/ipl/team/",
  },
  {
    source: "/cricket/ipl/news-in-hindi/page-:page(\\d+)/",
    destination: "/cricket/ipl/news-in-hindi/",
  },
  {
    source: "/cricket/ipl/videos/page-:page(\\d+)/",
    destination: "/cricket/ipl/videos/",
  },
  {
    source: "/cricket/ipl/photos/page-:page(\\d+)/",
    destination: "/cricket/ipl/photos/",
  },
  {
    source: "/cricket/:ranktype?-ranking.html",
    destination: "/cricket/teamRanking",
  },
  {
    source: "/cricket/live-score/(.*?)-:tabname(live-score-full)-:id(.*?).html",
    destination: "/cricketnext/liveScorecard",
  },
  {
    source: "/cricket/live-score/(.*?)-:tabname(live-score)-:id(.*?).html",
    destination: "/cricketnext/liveScorecard",
  },
  {
    source:
      "/cricket/live-score/(.*?)-:tabname(ball-by-ball-live-commentary)-:id(.*?).html",
    destination: "/cricketnext/liveScorecard",
  },
  {
    source:
      "/cricket/live-score/:tabname(team-squads)/:teamone([a-z0-9-]*)-vs-:teamtwo([a-z0-9-]*)-:id(.*?).html",
    destination: "/cricketnext/liveScorecard",
  },
  {
    source:
      "/cricket/live-score/:tabname(team-news)/:teamone([a-z0-9-]*)-vs-:teamtwo([a-z0-9-]*)-:id(.*?).html",
    destination: "/cricketnext/liveScorecard",
  },
  {
    source: "/cricket/news/page-:page(\\d+)?",
    destination: "/cricket/news/",
  },
  {
    source: "/cricket/photos/page-:page(\\d+)?",
    destination: "/cricket/photos/",
  },
  // {
  //   source: '/cricket/photos',
  //   destination: '/cricketnext/photoListing',
  // },
  {
    source: "/cricket/videos/page-:page(\\d+)?",
    destination: "/cricket/videos/",
  },
  {
    source: "/cricket/match-schedule",
    destination: "/cricketnext/matchSchedule/",
  },
  {
    source: "/cricket/profile/:playerName(.*)/:playerId(\\d+).html",
    destination: "/cricket/profile",
  },
  {
    source:
      "/cricket/profile/:playerName(.*)/:pageType(batting|bowling|news)-:playerId(\\d+).html",
    destination: "/cricket/profile",
  },
  // {
  //   source:
  //     "/cricket/profile/:playerName(.*)/:pageType(batting|bowling|news)-:playerId(\\d+)",
  //   destination: "/cricket/profile",
  // },
  // {
  //   source:
  //     "/cricket/profile/:playerName(.*)/:pageType(batting|bowling|news)-:playerId(\\d+)/page-:page(\\d+)",
  //   destination: "/cricket/profile",
  // },
  {
    source: "/cricket/teams/:teamName(.*)-squad-:teamId(\\d+).html",
    destination: "/cricket/teams",
  },
  {
    source: "/cricket/series/:seriesName(.*).html",
    destination: "/cricket/series",
  },
  {
    source: "/cricket/series/:seriesName(.*)/page-:page(\\d+)",
    destination: "/cricket/series",
  },
  {
    source:
      "/cricket/:pageType(news|match-schedule|result|photos|videos|)/series/:seriesName(.*).html",
    destination: "/cricket/series",
  },
  {
    source:
      "/cricket/:pageType(news|photos|videos)/series/:seriesName(.*)/page-:page(\\d+)",
    destination: "/cricket/series",
  },
  {
    source: "/short-videos/:section?/:slug(.*)-:video_id(\\d+).html",
    destination: "/shortvideos/svConsumptionPage",
  },
  {
    source: "/electralhydrationforhealth",
    destination: "/microsite/electral-hydration/electral_hydration",
  },
  {
    source: "/fit-india-hit-india",
    destination: "/microsite/fit-india/fit_india",
  },
  {
    source: "/fit-india-hit-india/web-stories",
    destination: "/microsite/fit-india/web_story",
  },
  {
    source: "/fit-india-hit-india/:slug(.*)",
    destination: "/microsite/fit-india/category",
  },
  {
    source: "/health-check.html",
    destination: "/healthcheck",
  },

  {
    source:
      "/agriculture/:cat?/:subcat?/:slug(.*)-:post_id(\\d+).html",
    destination: "/article",
  },
  {
    source:
      "/news/:cat?/:subcat?/:slug(.*)-:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/article",
  },
  {
    source:
      "/news/:cat?/:subcat?/:slug(.*)-live-updates-:slug2(.*)?-:post_id(\\d+).html",
    destination: "/article",
  },
  {
    source:
      "/news/:cat?/:subcat?/:slug(.*)-live-update-:slug2(.*)?-:post_id(\\d+).html",
    destination: "/article",
  },
  {
    source: "/videos/:channel?/:plist?/:slug(.*)-:video_id(\\d+).html",
    destination: "/video",
  },
  {
    source: "/blogs/page-:page(\\d+)?",
    destination: "/blogs",
  },
  {
    source: "/blogs/experts",
    destination: "/blogs",
  },
  {
    source: "/blogs/:author-:authorId(\\d+)",
    destination: "/blogs",
  },
  {
    source: "/blogs/:author-:authorId(\\d+)/page-:page(\\d+)?",
    destination: "/blogs",
  },
  {
    source: "/blogs/:author-:authorId(\\d+).html/page-:page(\\d+)?",
    destination: "/blogs",
  },
  {
    source: "/blogs/:author-:authorId(\\d+).html",
    destination: "/blogs",
  },
  {
    source: "/blogs/:author/:topic-:blogId(\\d+)",
    destination: "/blogs",
  },
  {
    source: "/blogs/:author/:topic-:blogId(\\d+).html",
    destination: "/blogs",
  },
  {
    source: "/rashifal/:time/",
    destination: "/rashifal",
  },
  {
    source: "/rashifal/:name/:time/",
    destination: "/rashifal",
  },
  {
    source:
      "/news/:cat?/:subcat?/:slug(.*)-:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/article",
  },
  {
    source: "/news/:cat?/:subcat?/:post_id(\\d+).html",
    destination: "/article",
  },
  {
    source: "/news/:cat?/:subcat?/:slug(.*)-:post_id(\\d+).html",
    destination: "/article",
  },
  {
    source: "/news/:slug(.*)-:post_id(\\d+).html",
    destination: "/article",
  },
  {
    source: "/news//:post_id(\\d+).html",
    destination: "/article",
  },
  {
    source: "/states/news/:cat?/:subcat?/:slug(.*)-:post_id(\\d+).html",
    destination: "/article",
  },
  {
    source:
      "/photogallery/:cat?/:subcat?/:slug(.*)-:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/photoGalleryConsumption",
  },
  {
    source: "/photogallery/:cat?/:subcat?/:post_id(\\d+).html",
    destination: "/photoGalleryConsumption",
  },
  {
    source: "/photogallery/:cat?/:subcat?/:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/photoGalleryConsumption",
  },
  {
    source: "/photogallery/:cat?/:subcat?/:slug(.*)-:post_id(\\d+).html",
    destination: "/photoGalleryConsumption",
  },
  {
    source: "/photogallery/:slug(.*)-:post_id(\\d+).html",
    destination: "/photoGalleryConsumption",
  },
  {
    source: "/photogallery/:slug(.*)-:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/photoGalleryConsumption",
  },
  {
    source: "/cricket/photos/page-:page(\\d+)?",
    destination: "/cricket/photos",
  },
  {
    source: "/mission-paani",
    destination: "/tag/mission-paani/",
  },
  {
    source: "/tag/:topic?/:ct(news|videos|photogallery)?/page-:page(\\d+)?",
    destination: "/tag",
  },
  {
    source: "/tag/:topic?/:ct(news|videos|photogallery)?",
    destination: "/tag",
  },
  {
    source:
      "/assembly-elections/:topic?/:ct(news|videos|photogallery)?/page-:page(\\d+)?",
    destination: "/tag",
  },
  {
    source: "/assembly-elections/:topic?/:ct(news|videos|photogallery)?",
    destination: "/tag",
  },
  // {
  //   source:
  //     "/pro-kabaddi-league/:topic?/:ct(news|videos|photogallery)?/page-:page(\\d+)?",
  //   destination: "/tag",
  // },
  // {
  //   source: "/pro-kabaddi-league/:topic?/:ct(news|videos|photogallery)?",
  //   destination: "/tag",
  // },
  {
    source: "/:isCricket(cricket)/news/:slug(.*)-:post_id(\\d+).html",
    destination: "/article",
  },
  {
    source:
      "/:isCricket(cricket)/photogallery/:slug(.*)-:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/photogallerydetail",
  },
  {
    source: "/:isCricket(cricket)/photogallery/:post_id(\\d+).html",
    destination: "/photogallerydetail",
  },
  {
    source:
      "/:isCricket(cricket)/photogallery/:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/photogallerydetail",
  },
  {
    source: "/:cat(cricket)/:slug(.*)-:post_id(\\d+).html",
    destination: "/article",
  },
  {
    source: "/amp/:cat(cricket)/:slug(.*)-:post_id(\\d+).html",
    destination: "/amp/article",
  },
  {
    source: "/videos/:channel/:plist/",
    destination: "/playlist",
  },
  {
    source: "/videos/:channel/:plist/page-:page(\\d+)/",
    destination: "/playlist",
  },
  {
    source: "/videos/:channel?/:plist?/:video_id(\\d+).html",
    destination: "/video",
  },
  {
    source: "/videopub/:guid/:platform/:lang/",
    destination: "/videopub",
  },
  {
    source: "/news/business/cryptocurrency/bitcoin-price-in-india-today-inr/",
    destination: "/bitbns",
  },
  {
    source: "/news/business/cryptocurrency/trade-bitcoin/:coin/",
    destination: "/bitbnscoins",
  },
  {
    source: "/podcast/:category/page-:page(\\d+)",
    destination: "/podcast",
  },
  {
    source: "/podcast/:category/:article",
    destination: "/podcast",
  },
  {
    source: "/podcast/:category/",
    destination: "/podcast",
  },
  {
    source: "/topics/",
    destination: "/siloListing",
  },
  {
    source: "/:topic/info-:id(\\d+)",
    destination: "/siloDetail",
  },
  {
    source: "/:topic/:subtopic(.*)-info-:id(\\d+)",
    destination: "/siloDetail",
  },
  {
    source: "/byline.html",
    destination: "/byline",
  },
  {
    source: "/byline/:ct(news|videos|photogallery)?",
    destination: "/byline",
  },
  {
    source: "/byline/:ct(news|videos|photogallery)?/page-:page(\\d+)?",
    destination: "/byline",
  },
  {
    source:
      "/byline/:topic-:authId(\\d+)?/:ct(news|videos|photogallery)?/page-:page(\\d+)?",
    destination: "/byline",
  },
  {
    source: "/byline/:topic-:authId(\\d+)?/:ct(news|videos|photogallery)?",
    destination: "/byline",
  },
  {
    source: "/byline/:topic-:authId(\\d+).html",
    destination: "/byline",
  },
  {
    source: "/byline/:topic-:authId(\\d+)?/page-:page(\\d+)?.html",
    destination: "/byline",
  },
  {
    source: "/byline/:topic-:authId(\\d+)?.html/page-:page(\\d+)?",
    destination: "/byline",
  },
  {
    source: "/agency/:topic?/:ct(news|videos|photogallery)?/page-:page(\\d+)?",
    destination: "/agency",
  },
  {
    source: "/agency/:topic?/:ct(news|videos|photogallery)?",
    destination: "/agency",
  },
  {
    source: "/india-result/",
    destination: "/india-result",
  },
  {
    source: "/india-result/:board/",
    destination: "/india-result",
  },
  {
    source: "/budget/:section/",
    destination: "/budget",
  },
  {
    source: "/budget/:section/:filter/",
    destination: "/budget",
  },
  // {
  //   source: "/mobiles",
  //   destination: "/mobiles/mobile",
  // },
  {
    source: "/mobiles/specification/:mobileName/",
    destination: "/mobiles/specificationPage",
  },
  {
    source: "/mobiles/news/page-:page(\\d+)",
    destination: "/mobiles/news",
  },
  {
    source: "/mobiles/news/:name/",
    destination: "/mobiles/news",
  },
  {
    source: "/mobiles/news/:name/page-:page(\\d+)",
    destination: "/mobiles/news",
  },
  {
    source: "/mobiles/:brandName/",
    destination: "/mobiles/brandPage",
  },
  {
    source: "/mobiles/:brandName/page-:page(\\d+)",
    destination: "/mobiles/brandPage",
  },
  // {
  //   source: "/amp/web-stories/",
  //   destination: "/amp/webstory",
  // },
  // {
  //   source: "/amp/web-stories/:cat?/",
  //   destination: "/amp/webstory",
  // },
  // {
  //   source: "/:t(news)/:section(states|world|lifestyle)/",
  //   destination: "/states",
  // },
  {
    source: "/:t(news)/",
    destination: "/category",
  },
  {
    source: "/:t(news)/page-:page(\\d+)/",
    destination: "/category",
  },
  {
    source: "/:t(news)/:section/",
    destination: "/category",
  },
  {
    source: "/:t(news)/:section/page-:page(\\d+)/",
    destination: "/category",
  },
  {
    source: "/:t(news)/:section/:subsection/",
    destination: "/category",
  },
  {
    source: "/:t(news)/:section/:subsection/page-:page(\\d+)/",
    destination: "/category",
  },
  {
    source: "/video-wall/:cat?/",
    destination: "/video-wall",
  },
  {
    source: "/photo-story/:cat/:slug(.*)-:post_id(\\d+).html",
    destination: "/photo-story",
  },
  {
    source: "/crypto-ki-samajh/webinar/:slug?/",
    destination: "/crypto-ki-samajh/webinar",
  },
  {
    source: "/crypto-ki-samajh/live-cryptocurrency-trading/page-:page(\\d+)/",
    destination: "/crypto-ki-samajh/live-cryptocurrency-trading",
  },
  {
    source: "/:t(astrology)/",
    destination: "/category",
  },
  {
    source: "/:section(agriculture)/",
    destination: "/category",
  },
  {
    source: "/cookie-policy.html",
    destination: "/cookie-policy",
  },
  {
    source: "/home-(desktop|mobile).html",
    destination: "/testPage/",
  },
  {
    source: "/ads.txt",
    destination: "/ads",
  }
];

const AmpRoutes = [
  {
    source: "/amp/videos/:channel?/:plist?/:video_id(\\d+).html",
    destination: "/amp/video",
  },
  {
    source:
      "/amp/photogallery/:cat?/:subcat?/:slug(.*)-:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/amp/photogallery",
  },
  {
    source: "/amp/photogallery/:cat?/:subcat?/:post_id(\\d+).html",
    destination: "/amp/photogallery",
  },
  {
    source:
      "/amp/photogallery/:cat?/:subcat?/:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/amp/photogallery",
  },
  {
    source: "/amp/photogallery/:slug(.*)-:post_id(\\d+).html",
    destination: "/amp/photogallery",
  },
  {
    source: "/amp/photogallery/:slug(.*)-:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/amp/photogallery",
  },
  {
    source:
      "/amp/news/:cat?/:subcat?/:slug(.*)-live-updates-:slug2(.*)?-:post_id(\\d+).html",
    destination: "/amp/article",
  },
  {
    source:
      "/amp/news/:cat?/:subcat?/:slug(.*)-live-update-:slug2(.*)?-:post_id(\\d+).html",
    destination: "/amp/article",
  },
  {
    source: "/amp/videos/:channel?/:plist?/:slug(.*)-:video_id(\\d+).html",
    destination: "/amp/video",
  },
  {
    source: "/ampnews/:cat?/:subcat?/:slug(.*)-:post_id(\\d+).html",
    destination: "/amp/article",
  },
  //amp article
  {
    source: "/amp/news/:cat?/:subcat?/:slug(.*)-:post_id(\\d+).html",
    destination: "/amp/article",
  },
  {
    source: "/amp/news/:cat?/:subcat?/:post_id(\\d+).html",
    destination: "/amp/article",
  },
  {
    source:
      "/amp/news/:cat?/:subcat?/:slug(.*)-:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/amp/article",
  },
  {
    source: "/amp/news/:slug(.*)-:post_id(\\d+).html",
    destination: "/amp/article",
  },
  {
    source: "/amp/news/:cat?/:subcat?/:slug(.*)-:post_id(\\d+).html/",
    destination: "/amp/article",
  },
  {
    source: "/amp/news/:cat?/:subcat?/:slug(.*)-:post_id(\\d+).html/",
    destination: "/amp/article",
  },
  {
    source: "/amp/news/:cat?/:subcat?/:post_id(\\d+).html/",
    destination: "/amp/article",
  },
  {
    source:
      "/amp/news/:cat?/:subcat?/:slug(.*)-:post_id(\\d+)-page-:gid(\\d+).html/",
    destination: "/amp/article",
  },
  {
    source: "/amp/news/:slug(.*)-:post_id(\\d+).html/",
    destination: "/amp/article",
  },
  {
    source: "/amp/news/",
    destination: "/amp/category",
  },
  {
    source: "/amp/news/page-:page(\\d+)/",
    destination: "/amp/category",
  },
  {
    source: "/amp/news/:section/",
    destination: "/amp/category",
  },
  {
    source: "/amp/news/:section/page-:page(\\d+)/",
    destination: "/amp/category",
  },
  {
    source: "/amp/news/:section/:subsection",
    destination: "/amp/category",
  },
  {
    source: "/amp/news/:section/:subsection/page-:page(\\d+)/",
    destination: "/amp/category",
  },
  {
    source:
      "/amp/photogallery/:cat?/:subcat?/:slug(.*)-:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/amp/photogallery",
  },
  {
    source: "/amp/photogallery/:cat?/:subcat?/:post_id(\\d+).html",
    destination: "/amp/photogallery",
  },
  {
    source:
      "/amp/photogallery/:cat?/:subcat?/:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/amp/photogallery",
  },
  {
    source: "/amp/photogallery/:cat?/:subcat?/:slug(.*)-:post_id(\\d+).html",
    destination: "/amp/photogallery",
  },
  {
    source: "/amp/photogallery/:slug(.*)-:post_id(\\d+).html",
    destination: "/amp/photogallery",
  },
  {
    source: "/amp/web-stories/",
    destination: "/amp/webstory",
  },
  {
    source: "/amp/web-stories/:cat?/",
    destination: "/amp/webstory",
  },
  {
    source: "/amp/photogallery/:slug(.*)-:post_id(\\d+)-page-:gid(\\d+).html",
    destination: "/amp/photogallery",
  },
  {
    source: "/amp/blogs/:author/:topic-:blogId(\\d+).html",
    destination: "/amp/blogs/",
  },
  {
    source: "/rashifal/:time/",
    destination: "/rashifal",
  },
  {
    source: "/rashifal/:name/:time/",
    destination: "/rashifal",
  },
  {
    source: "/amp/photo-story/:cat/:slug(.*)-:post_id(\\d+).html",
    destination: "/amp/photo-story",
  },
  {
    source: "/cricket/amp/:ranktype?-ranking.html",
    destination: "/amp/teamRanking",
  },
  {
    source: "/amp/budget/iframe",
    destination: "/amp/budget",
  },
  {
    source: "/amp/news/:section/",
    destination: "/amp/category",
  },
  {
    source: "/amp/news/:section/page-:page(\\d+)/",
    destination: "/amp/category",
  },
  {
    source: "/amp/news/:section/:subsection",
    destination: "/amp/category",
  },
  {
    source: "/amp/news/:section/:subsection/page-:page(\\d+)/",
    destination: "/amp/category",
  },
];

module.exports = [...AmpRoutes, ...Routes];
