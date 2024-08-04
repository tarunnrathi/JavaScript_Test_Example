import {
  PlayerProfileTabs,
  SeriesTabs,
} from "components/Cricketnext/CricketNextUtils";

const getCrPageDetails = ({ ta, tb, tabname, tae, tbe }) => {
  let title, desc, keywords;
  switch (tabname) {
    case "live-score": {
      title = `${tae} vs ${tbe} Live Score in Hindi, ${tae} vs ${tbe} Scorecard, ${ta} vs ${tb} लाइव क्रिकेट मैच स्कोर`;
      desc = `Get ${tae} vs ${tbe} Live Cricket Score in Hindi (${ta} vs ${tb} लाइव क्रिकेट मैच स्कोर) at News18 हिंदी, Leading Run Getter, Wicket Taker and more.`;
      keywords = `${tae} vs ${tbe} Live Score, ${tae} vs ${tbe} live score today, ${ta} vs ${tb} लाइव स्कोर, ${ta} vs ${tb} लाइव क्रिकेट स्कोर`;
      break;
    }
    case "live-score-full": {
      title = `${tae} vs ${tbe} Live Scorecard in Hindi, ${tae} vs ${tbe} Full Scorecard, ${ta} vs ${tb} लाइव स्कोरकार्ड`;
      desc = `Get ${tae} vs ${tbe} Full Scorecard in Hindi (${ta} vs ${tb} लाइव स्कोरकार्ड)  at News18 हिंदी, Players Stats, Run, Wickets, Catches, Result and more.`;
      keywords = `${tae} vs ${tbe} scorecard, ${tae} vs ${tbe} final scorecard, ${tae} vs ${tbe} full scorecard, ${tae} vs ${tbe} live scorecard, ${ta} vs ${tb} स्कोरकार्ड, ${ta} vs ${tb} क्रिकेट स्कोरकार्ड `;
      break;
    }
    case "team-squads": {
      title = `${tae} vs ${tbe} Live Match Update in Hindi, ${tae} vs ${tbe} Match Information, ${ta} vs ${tb} ताज़ा क्रिकेट अपडेट`;
      desc = `Get ${tae} vs ${tbe} Match Update in Hindi (${ta} vs ${tb} क्रिकेट अपडेट)  at News18 हिंदी, Match Information, Players, Captain, Toss, Pitch Report, Weather and more.`;
      keywords = `${tae} vs ${tbe} Match information, ${tae} vs ${tbe} Players, ${tae} vs ${tbe} Ground, ${tae} vs ${tbe} Captain, ${tae} vs ${tbe} Weather`;
      break;
    }
    case "team-news": {
      title = `${tae} vs ${tbe} News in Hindi, ${tae} vs ${tbe} Samachar, ${ta} vs ${tb} समाचार`;
      desc = `Get ${tae} vs ${tbe} Match News in Hindi (${ta} vs ${tb} क्रिकेट समाचार)  at News18 हिंदी, Breaking Match News, Players Samachar, Weather Report, Interviews and more.`;
      keywords = `${tae} vs ${tbe} Cricket news, ${tae} vs ${tbe} News, ${tae} vs ${tbe} Cricket news in Hindi, ${tae} vs ${tbe} Samachar, ${ta} vs ${tb} क्रिकेट न्यूज़,  ${ta} vs ${tb} क्रिकेट का समाचार`;
      break;
    }
    case "ball-by-ball-live-commentary": {
      title = `${tae} vs ${tbe} Live Commentary in Hindi, ${tae} vs ${tbe} Match Commentary, ${ta} vs ${tb} लाइव क्रिकेट कमेंट्री`;
      desc = `Get ${tae} vs ${tbe} Commentary in Hindi (${ta} vs ${tb} क्रिकेट कमेंट्री)  at News18 हिंदी, Listen excerpt comment, Match Analysis, Ball-by-Ball Match Update and more.`;
      keywords = `${tae} vs ${tbe} commentary, ${tae} vs ${tbe} cricket commentary, ${tae} vs ${tbe} live commentary, live ${tae} vs ${tbe} commentary, ${ta} vs ${tb} लाइव क्रिकेट कमेंट्री, ${ta} vs ${tb} कमेंट्री, ${ta} vs ${tb} क्रिकेट कमेंट्री`;
      break;
    }
  }

  return {
    title,
    desc,
    keywords,
  };
};

const getCrPageTitles = ({ ta, tb, tae, tbe }) => {
  return [
    `${tae} vs ${tbe} Live Score in Hindi, ${tae} vs ${tbe} Scorecard, ${ta} vs ${tb} लाइव क्रिकेट मैच स्कोर`,
    `${tae} vs ${tbe} Live Scorecard in Hindi, ${tae} vs ${tbe} Full Scorecard, ${ta} vs ${tb} लाइव स्कोरकार्ड`,
    `${tae} vs ${tbe} Live Commentary in Hindi, ${tae} vs ${tbe} Match Commentary, ${ta} vs ${tb} लाइव क्रिकेट कमेंट्री`,
    "",
    `${tae} vs ${tbe} Live Match Update in Hindi, ${tae} vs ${tbe} Match Information, ${ta} vs ${tb} ताज़ा क्रिकेट अपडेट`,
    `${tae} vs ${tbe} News in Hindi, ${tae} vs ${tbe} Samachar, ${ta} vs ${tb} समाचार`,
  ];
};

const getCricketHomeDetails = () => {
  return {
    title: "Cricket News, Live Scores, Series, Match Schedule, Teams",
    desc: "Get cricket news, live coverage of cricket score, series, cricket match schedule, photos, videos on News18 हिंदी.",
    keywords: "Cricket Scores, Cricket Schedule, Cricket Series, Cricket News",
  };
};

const getIPLHomeDetails = () => {
  return {
    title:
      "Indian Premier League 2023 Live Score Updates, IPL 2023 Schedule, IPL Result, TATA IPL Points Table, Latest News | News18 India",
    desc: "Get the live updates on IPL t20 match score, IPL full schedule, point table and team squad list News18 Hindi. Find Latest news on VIVO IPL 2023, head-to-head records, pitch reports on News18 हिंदी.",
    keywords:
      "IPL 2023, Indian Premier League 2023, Tata IPL 2023 latest updates, Ipl season 16, IPL match previews, IPL 15 team profile, points table, players profile, IPL 2023 venue details, Ipl 2023",
  };
};

const getIPLVideoDetails = () => {
  return {
    title:
      "IPL 2023: Indian Premier League News, Matches, Players, Points Table - News18 IPL",
    desc: "Indian Premier League (IPL) 2023: Get Latest Match updates, News, Match Result, points table, player’s stats, leadership table and more on News18 Indian",
    keywords:
      "IPL 2023 Videos, Latest Indian Premier League videos, Indian Premier League Matches Highlight, आईपीएल वीडियो 2023",
  };
};

const getIPLPointsTableDetails = () => {
  return {
    title:
      "IPL 2023: Indian Premier League News, Matches, Players, Points Table - News18 IPL",
    desc: "Indian Premier League (IPL) 2022: Get Latest Match updates, News, Match Result, points table, player’s stats, leadership table and more on News18 Indian",
    keywords:
      "आईपीएल पॉइंट्स टेबल, Ipl 2022 Points Table, आईपीएल 2022 पॉइंट्स टेबल, आईपीएल 2022, जानें प्वॉइंट टेबल में कहां है कौन सी टीम, आईपीएल 2022 प्वॉइंट्स टेबल, आईपीएल प्लेऑफ टीम लिस्ट, आईपीएल प्वॉइंट्स टेबल, आईपीएल प्लेऑफ,  आईपीएल न्यूज, आईपीएल 2022",
  };
};

const getIPLScheduleDetails = () => {
  return {
    title:
      "Get complete IPL 2023 Match schedule, including match dates, time, venue details and Indian Premier League match list at News18 India. Find आईपीएल 2023 का पूरा शेड्यूल, today's IPL match details at hindi.news18.com",
    desc: "Get complete IPL 2023 Match schedule, including match dates, time, venue details and Indian Premier League match list at News18 India. Find आईपीएल 2023 का पूरा शेड्यूल, today's IPL match details at hindi.news18.com",
    keywords:
      "IPL 16 Schedule, Indian Premier League 2023, IPL 2023 full schedule, IPL 2023 schedule, IPL 16 Schedule, इंडियन प्रीमियर लीग (आईपीएल) मैच शेड्यूल 2023, Tata IPL 2023 full schedule, Vivo IPL 2023 schedule, IPL 2023 full schedule and Fixture, , इंडियन प्रीमियर लीग, आईपीएल 2023 शेड्यूल, आईपीएल 2023 पूरा शेड्यूल, इंडियन प्रीमियर लीग,",
  };
};

const getIPLResultDetails = () => {
  return {
    title:
      "IPL 2023 Fixtures and Results - आईपीएल रिजल्ट, IPL 2023 Match Results, Indian Premier League Results |News18 India",
    desc: "IPL 2023 Results Season 16: Check out Indian Premier League match results 2023, आज के मैच का रिजल्ट at News18 India. Get all updates related to आईपीएल रिजल्ट्स 2023, Ipl match live Report, Statistics, win and loss reports at hindi.news18.com",
    keywords:
      "IPL T20 Match Results 2023, IPL 2023 Cricket Result in Hindi, आईपीएल 2023 क्रिकेट मैच रिजल्ट, आईपीएल क्रिकेट रिजल्ट, IPL 2023 Results, आईपीएल रिजल्ट्स २०२१, IPL results 2023, आईपीएल मैच रिजल्ट, आई पी एल 2023, आज के मैच का रिजल्ट, आईपीएल रिजल्ट 2023",
  };
};

const getCricketNewsDetails = () => {
  return {
    title: "Cricket News in Hindi, Match Live Updates, Match Report, Scorecard",
    desc: "Get Cricket News in Hindi, LIve Matchs Report, Breaking News, Ball by ball Match Updates, Upcoming Cricket Series News and More.",
    keywords:
      "Cricket News, Cricket Match Report, Live Score, Cricket Editorial, Cricket Breaking News",
  };
};

const getCricketPhotosDetails = () => {
  return {
    title:
      "Cricket Photogallery: Matches Photos, Cricket Photographs, Cricket News Images",
    desc: "Get latest photos, pictures, Pics, Images of Cricket Matches, players, actions, galleries of latest cricket news and live events.",
    keywords:
      "Cricket Matches Photos, Photos, Pictures, Galleries, photos, Cricket News",
  };
};

const getCricketVideoDetails = () => {
  return {
    title:
      "Cricket Videos in Hindi, Latest Match Videos, Highlights, Interviews",
    desc: "Watch Latest cricket videos, Live Coverage, news, Interviews, Match Highlights and more.",
    keywords: "Cricket Videos, Cricket Video Galleries, Videos News, Photos",
  };
};

const getCricketMatchScheduledDetails = () => {
  return {
    title:
      "Cricket Schedule, ODI, Test, T20I Matches Schedule, Cricket Fixture",
    desc: "Find cricket schedule, Get all upcoming cricket schedules for all ODIs, Tests, T20Is cricket series.",
    keywords: "Cricket Schedule, ODI Schedule, Test Schedule, T20I Schedule",
  };
};

const getIPLPhotos = () => {
  return {
    title:
      "IPL 2022 Photos, IPL Viral Pics, Matches Coverages Gallery 2022, Latest Indian Premier League images and Pictures | News18 India",
    desc: "Indian Premier League Images 2022 - Get all Latest आईपीएल 2022 फोटोज, आईपीएल २०२२ वायरल फोटोज (Viral Photos) at hindi.news18.com. Follow News18 India for latest IPL 2022 Photos, Ipl 2022 Images, Ipl 2022 pictures",
    keywords:
      "आईपीएल 2022 फोटोज, आईपीएल २०२२ वायरल फोटोज (Viral Photos), IPL 2022 Photos, IPL Viral Pics, Matches Coverages Gallery 2022, latest IPL 2022 Photos, latest IPL 2022 Photos",
  };
};

const getIPLNews = () => {
  return {
    title:
      "IPL 2022 New - Indian Premier League 2022 Live News, IPL Live Updates, Tata IPL Breaking News| News18 India",
    desc: "IPL 2022 News, Live Match Coverage, photo-galleries, videos on News18 India in Hindi. Indian Premier League 2021 Teams, Match Schedule, Players, Points Table, Live Score and More.",
    keywords:
      "IPL 2022 news, IPL latest updates, Indian Premier league 2022 Live news, इंडियन प्रीमियर लीग, आईपीएल 2022 न्यूज, IPL Samachar, IPL Cricket, इंडियन प्रीमियर लीग समाचार, indian premier league, टी20 लीग, IPL 2022 news, IPL live scores, squads, fixtures, injury updates, match results & fantasy tips",
  };
};

const getIPLVideos = () => {
  return {
    title:
      "IPL 2022 Video, clips, video gallery, live coverage, match highlights |News18 India",
    desc: "IPL 2020 Video Gallery: Get Latest Videos, आईपीएल वीडियो 2022, Live action updates, Match highlights clips of all the Indian Premier League matches on News18 India.",
    keywords:
      "IPL 2020 Videos, Latest Indian Premier League videos, Indian Premier League Matches Highlight, आईपीएल वीडियो 2022",
  };
};

const getPointsTable = () => {
  return {
    title:
      "आईपीएल पॉइंट्स टेबल 2022 | Indian Premier League (IPL) Points Table, Standings and Team Ranking | News18 India",
    desc: "Indian Premier League Points Table2022 - Check here for Tata IPL team rankings, points, matches won, net run rate and updated team standings ranking point chart details, आईपीएल पॉइंट्स टेबल 2022 at hindi.news18.com",
    keywords:
      "आईपीएल पॉइंट्स टेबल, Ipl 2022 Points Table, आईपीएल 2022 पॉइंट्स टेबल, आईपीएल 2022, जानें प्वॉइंट टेबल में कहां है कौन सी टीम, आईपीएल 2022 प्वॉइंट्स टेबल, आईपीएल प्लेऑफ टीम लिस्ट, आईपीएल प्वॉइंट्स टेबल, आईपीएल प्लेऑफ,  आईपीएल न्यूज, आईपीएल 2022",
  };
};

const getPlayerProfileDetails = (pageType, playerName) => {
  let title = "";
  let description = "";
  let keywords = "";

  if (pageType === PlayerProfileTabs.PLAYER_INFO) {
    title = `${playerName} Profile | ${playerName} Cricket Career | Cricket Stats`;
    description = `View cricket profile of ${playerName} including batting, bowling and fielding statistics for Tests, ODIs, T20Is, Twenty20 and more that achieved in his cricket career, Match Result.`;
    keywords = `${playerName} Profile, ${playerName} Cricket Career, ${playerName} Stats, ${playerName}`;
  } else if (pageType === PlayerProfileTabs.BATTING) {
    title = `${playerName} Batting Records: Total Runs of ${playerName} in ODIs, Tests, T20Is, First Class, Twenty Twenty Matches, ICC World Cup 2019`;
    description = `${playerName} Batting Records - Get batting records of ${playerName} in ODIs, Tests, T20Is, First Class and Twenty Twenty Matches including ICC World Cup 2019 and many more at hindi.news18.com.`;
    keywords = `${playerName} Batting Record, Total Runs of ${playerName} in ODIs, Total Runs of ${playerName} Tests, Total Runs of ${playerName} T20Is, First Class Total Runs, Twenty Twenty Total Runs`;
  } else if (pageType === PlayerProfileTabs.BOWLING) {
    title = `${playerName} Bowling Records: Total Wickets by ${playerName} in ODIs, Tests, T20Is, First Class, Twenty Twenty Matches, ICC World Cup 2019`;
    description = `${playerName} Bowling Records - Get bowling records by ${playerName} in ODIs, Tests, T20Is, First Class and Twenty Twenty Matches including ICC World Cup 2019 and many more at hindi.news18.com.`;
    keywords = `${playerName} Bowling Record, Total wickets by ${playerName} in ODIs, Total wickets by ${playerName} Tests, Total wickets by ${playerName} T20Is, First Class Total wickets, Twenty Twenty Total wickets`;
  } else if (pageType === PlayerProfileTabs.NEWS) {
    title = `${playerName} News: Latest News on ${playerName}, A Well Known Cricket Player, Recent Matches, ICC World Cup 2019`;
    description = `Read latest news and updates on ${playerName} including the news on last match played by ${playerName} in ICC World Cup 2019, ODIs, Tests, T20Is, First Class and Twenty Twenty Matches and many more at hindi.news18.com.`;
    keywords = `${playerName}, ${playerName} news, Cricketer ${playerName}, ${playerName} Videos News, ICC World Cup 2019 News`;
  }

  return { title, description, keywords };
};

const getTeamSquadDetails = (teamName, seriesName) => {
  const transformedTeamName = teamName
    .split("-")
    .map((str) => str[0]?.toUpperCase() + str.slice(1))
    .join(" ");
  return {
    title: `${transformedTeamName} ${seriesName} Squad: ${transformedTeamName} Cricket Team Points Table, ${transformedTeamName} Team Top Batsman, ${transformedTeamName} Team Top Bowler`,
    description: `${transformedTeamName} ${seriesName} Team: Find ${transformedTeamName} Cricket Team Match Schedule, Top Batsman, Top Bowler and Other Stats`,
    keywords: `${seriesName}, ${transformedTeamName} ${seriesName} Team, ${transformedTeamName} ${seriesName} Squad, ${transformedTeamName} ${seriesName} Top Bowler, ${transformedTeamName} ${seriesName} Top Batsman`,
  };
};

const getCricketSeriesDetails = (pageType, seriesName) => {
  let title = "";
  let description = "";
  let keywords = "";

  if (pageType === SeriesTabs.NEWS) {
    title = `${seriesName} Series, ${seriesName} Latest News, ${seriesName} Matches & Schedule`;
    description = `${seriesName} Series: Get latest ${seriesName} Series Details, Latest News, Matches Schedule, Result, Photos, Videos`;
    keywords = `${seriesName} Series, ${seriesName}, ${seriesName} News`;
  } else if (pageType === SeriesTabs.MATCH_SCHEDULE) {
    title = `${seriesName} Series Match Schedule, ${seriesName} Time Table, ${seriesName} Matches Date and Time`;
    description = `${seriesName} Series Match Schedule: Get ${seriesName} Series Matches Schedule, Date, Time and Venue.`;
    keywords = `${seriesName} Series Schedule, ${seriesName} Matches, ${seriesName} Match Schedule, ${seriesName} Time Table`;
  } else if (pageType === SeriesTabs.RESULT) {
    title = `${seriesName} Series Match Results, ${seriesName} Result, ${seriesName} Matches Win and Loss`;
    description = `${seriesName} Series Match Results, Matches Scorecard, ${seriesName} Series Live Updates.`;
    keywords = `${seriesName} Result, ${seriesName} Cricket Result, ${seriesName} Match Results`;
  } else if (pageType === SeriesTabs.PHOTO) {
    title = `${seriesName} Series Match Photos, ${seriesName} Images, ${seriesName} Photogallery`;
    description = `Get latest ${seriesName} Series africa Photos, Image gallery of ${seriesName}, Pics of ${seriesName} including latest cricket news`;
    keywords = `${seriesName} Photos, ${seriesName} Images, ${seriesName} Pictures`;
  } else if (pageType === SeriesTabs.VIDEO) {
    title = `${seriesName} Series Match Videos, ${seriesName} Clips, ${seriesName} Highlights`;
    description = `Get latest ${seriesName} Series videos, videos gallery of India vs South, news of ${seriesName} including latest cricket news and live updates`;
    keywords = `${seriesName} Videos, ${seriesName} Clips, ${seriesName} Highlights`;
  }

  return { title, description, keywords };
};

const getBudgetDetails = (pageType, BUDGET_PAGES) => {
  let title =
    "Budget 2024: India Aam Budget (आम बजट) News Update, Income Tax Slab Changes, Economic Survey and Tax Details";
  let description =
    "Budget 2024 : Aam Budget (आम बजट) 2024-25 Latest News Updates, Live Finance Minister Nirmala Sitharaman Speech & Announcements, Budget Expectations Key Highlights, Income Tax Slab Changes Full Coverage";
  let keywords =
    "India Budget 2024 News, Budget Expectations, Latest Union Budget 2024 Updates, Nirmala Sitharaman, India Budget Date, Budget News, Budget 2024 Expectations, Budget Announcements, Budget Impact, Union Budget Highlights, Budget 2024, India Budget 2024-25, Indian Budget, Rail Budget, Railway Budget, Income Tax Slabs, Rail Fare, List of New Trains, Budget Speech, FM Nirmala Sitharaman, Union Budget 2024, India Budget 2024-25 Live Announcements, आम बजट 2024";

  if (pageType === BUDGET_PAGES.TIMELINE) {
    title = `India Budget History: Union Budget आम बजट टाइमलाइन Indian Budget Timeline with Highlights`;
    description = `India Budget History: Key Highlights of Indian Aam Budget year on year form 1991 By Finance Ministers of India`;
    keywords = `Union Budget 2024, Budget 2024, India Budget 2024-25, Budget News, Inion Budget 2024-25, Aam Budget 2024, General Budget 2024, Inion Budget History, Aam Budget History, General Budget History, आम बजट समाचार, रेल बजट समाचार`;
  } else if (pageType === BUDGET_PAGES.GLOSSARY) {
    title = ` Budget Glossary: Aam Budget Of India Glossary, Know All Budget Related Key Terms And Definitions`;
    description = `Budget Glossary: Get Budget of India Glossary Financial Terms and definitions that may Finance Minister Nirmala Sitharaman include in her speech in Parliament  
    Get Latest News Updates About Aam Budget 2024-25 (आम बजट) Direct and Indirect Taxes, GST, Custom Duty, Monetary Policy, Inflation Rates`;
    keywords = `Budget 2024, Budget 2024-25, यूनियन बजट 2024, Union budget 2024, India GDP, Budget 2024 Direct Taxes, Budget 2024 Indirect Taxes, Budget 2024 GST, Budget 2024 Monetary Policy, Budget 2024 Inflation Rates, Union Budget 2024-25`;
  } else if (pageType === BUDGET_PAGES.HIGHLIGHTS) {
    title = `India Budget History: Union Budget आम बजट टाइमलाइन Indian Budget Timeline with Highlights`;
    description = `India Budget History: Key Highlights of Indian Aam Budget year on year form 1991 By Finance Ministers of India`;
    keywords = `Union Budget 2024, Budget 2024, India Budget 2024-25, Budget News, Inion Budget 2024-25, Aam Budget 2024, General Budget 2024, Inion Budget History, Aam Budget History, General Budget History, आम बजट समाचार, रेल बजट समाचार`;
  }

  return { title, description, keywords };
};

const getBoardDetails = (pageType, seo) => {
  const { title } = seo;
  const { description } = seo;
  const { keywords } = seo;
  const { metatitle } = seo;
  const og_image =
    seo.og_image ||
    `https://static.hindi.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png`;

  return { title, description, keywords, metatitle, og_image };
};

const getWcHomeDetails = () => {
  return {
    title:
      "ICC Cricket World Cup 2023: Get Latest News Update of Cricket World Cup Cricket Match Time Table Schedule Points Table Result Player List on News18 Hindi",
    desc: "ICC Cricket World Cup 2023: Get ready for unparalleled cricket excitement with ICC World Cup 2023! Stay updated on thrilling World Cup Cricket Matches, standout performances, and unforgettable moments in this pinnacle of international cricket",
    keywords:
      "Cricket World Cup 2023, World Cup 2023, Men's World Cup 2023 Schedule, ICC Cricket World Cup Points Table, ICC World Cup Match Time Table, World Cup News, World Cup Match Result, World Cup Latest News, World Cup Photos, World Cup Highlights, World Cup News Today",
  };
};

const getWcPointsTableDetails = () => {
  return {
    title:
      "ICC Cricket World Cup 2023 Points Table: Tracking Team Standings and Progress",
    desc: "ICC Cricket World Cup 2023 Points Table: Keep an eye on Cricket World Cup 2023 points table Follow the evolving rankings, team performances, and match outcomes as the battle for supremacy unfolds",
    keywords:
      "Cricket World Cup 2023, World Cup 2023 Points Table, Men’s World Cup 2023 Points Table, ICC World Cup Standings, Cricket World Cup Match Progress, World Cup Matches Standings, World Cup Cricket Point Tables, World Cup Latest News, World Cup Photos, World Cup Highlights, World Cup News Today",
  };
};

const getWcScheduleDetails = () => {
  return {
    title:
      "ICC Cricket World Cup 2023 Schedule: Your Ultimate Guide to Cricket World Cup Fixtures, Match Date and venue on News18 Hindi",
    desc: "ICC Cricket World Cup 2023: Plan your cricket journey with the comprehensive ICC World Cup 2023 schedule. Stay informed about World Cup Matches Dates, Cricket World Cup Venues, and matchups to witness the excitement of this global sporting spectacle",
    keywords:
      "Cricket World Cup 2023, World Cup 2023, Men’s World Cup 2023 Schedule, ICC World Cup Fixtures, Cricket World Cup Match Time Table, World Cup Matches Dates, World Cup Match Details, World Cup Latest News, World Cup Photos, World Cup Highlights, World Cup News Today",
  };
};

const getWcResultDetails = () => {
  return {
    title:
      "ICC Cricket World Cup 2023 Results Live Score: Instant Access to Latest Match Results and Outcomes Cricket World Cup Cricket Match on News18 Hindi",
    desc: "ICC Cricket World Cup 2023 Result: Stay updated with real-time Cricket World Cup 2023 match results and outcomes. From thrilling victories to surprising upsets, get the latest scoop on team performances and player achievements",
    keywords:
      "Cricket World Cup 2023, World Cup 2023 Result, Men’s World Cup 2023 Score, ICC World Cup Results, Cricket World Cup Match Results, World Cup Matches Score, World Cup Cricket Matches Results, World Cup Latest News, World Cup Photos, World Cup Highlights, World Cup News Today",
  };
};

const getWcPhotos = () => {
  return {
    title:
      "ICC Cricket World Cup 2023 Photo: Capturing the Essence of Cricket World Cup 2023: Browse Exclusive Photos!",
    desc: "ICC Cricket World Cup 2023: Immerse yourself in the visual journey of Cricket World Cup 2023 through a captivating collection of exclusive photos. Relive the excitement, emotions, and defining moments of the tournament through stunning images that capture the essence of this global cricket spectacle.",
    keywords:
      "Cricket World Cup 2023, World Cup 2023 Photos, Men’s World Cup 2023 Images, ICC World Cup Pictures, Cricket World Cup Match Progress Photos, World Cup Matches Result Images, World Cup Cricket Pictures, World Cup Latest Photos, World Cup Photos, World Cup Highlights, World Cup News Today",
  };
};

const getWcNews = () => {
  return {
    title:
      "ICC World Cup 2023 News: Stay Informed with Cricket World Cup Live News Updates & Insights!",
    desc: "ICC World Cup 2023: Stay informed and engaged with the latest Cricket World Cup 2023 news. From match previews and player insights to key moments and tournament analysis, dive into comprehensive coverage that brings you closer to the heart of the action.",
    keywords:
      "Cricket World Cup 2023, World Cup 2023 News, Men’s World Cup 2023 News, ICC World Cup News, Cricket World Cup Match Progress News, World Cup Matches Result News, World Cup Cricket Point Tables, World Cup Latest News, World Cup Photos, World Cup Highlights, World Cup News Today",
  };
};

const getWcMostWicketDetails = () => {
  return {
    title:
      "ICC World Cup Cricket 2023 Wicket Tacker List: आईसीसी World Cup में सर्वाधिक विकेट लेने वाले सभी खिलाड़ियों की पूरी लिस्ट",
    desc: "Most Wicket by players in ICC World Cup 2023 (सर्वाधिक विकेट लेने वाले खिलाड़ियों की लिस्ट): Get the Complete List of Players who have taken highest wickets in World Cup 2023",
    keywords:
      "World cup most wicket, leading wicket taker in world cup, most wicket by player, most wicket in world cup, most wicket in ODI wc",
  };
};

const getWcMostRunsDetails = () => {
  return {
    title:
      "ICC World Cup 2023 Highest Scorer: Get Complete List of Players by Most 100s, Most 50s",
    desc: "Highest Runs by players in ICC World Cup 2023 (सर्वाधिक रन बनाने वाले खिलाड़ियों की लिस्ट): Get the Complete List of Players who have score highest runs in World Cup 2023.",
    keywords:
      "wc most run, world cup most runs, leading run getter in world cup, most run by player most run in world cup, most runs in wc",
  };
};

export {
  getCrPageDetails,
  getCricketHomeDetails,
  getIPLHomeDetails,
  getIPLVideoDetails,
  getIPLPointsTableDetails,
  getCrPageTitles,
  getCricketNewsDetails,
  getCricketPhotosDetails,
  getCricketVideoDetails,
  getCricketMatchScheduledDetails,
  getPlayerProfileDetails,
  getTeamSquadDetails,
  getCricketSeriesDetails,
  getBudgetDetails,
  getBoardDetails,
  getIPLScheduleDetails,
  getIPLResultDetails,
  getIPLNews,
  getIPLPhotos,
  getIPLVideos,
  getPointsTable,
  getWcHomeDetails,
  getWcPointsTableDetails,
  getWcScheduleDetails,
  getWcResultDetails,
  getWcPhotos,
  getWcNews,
  getWcMostWicketDetails,
  getWcMostRunsDetails,
};
