const urls = [
  {
    source: "/news18local/",
    destination: "/local18/",
    permanent: true,
  },
  {
    source: "/nodeapi/cr/topslider/",
    destination: "/",
    permanent: true,
  },
  {
    source: "/cricketnext/:slug*",
    destination: "/cricket/",
    permanent: true,
  },
  {
    source: "/news/career/board-results/:slug*",
    destination: "/india-result/:slug*",
    permanent: true,
  },
  {
    source: "/blogs/author/:id/:slug*",
    destination: "/byline/author-:id/",
    permanent: true,
  },
  {
    source: "/lok-sabha-election-2019/:slug*",
    destination: "/tag/lok-sabha-election-2024/",
    permanent: true,
  },
  {
    source: "/icc-cricket-world-cup-2019/:slug*",
    destination: "/world-cup/",
    permanent: true,
  },
  {
    source: "/jharkhand/:slug*.html",
    destination: "/news/jharkhand/:slug*.html/",
    permanent: true,
  },
  {
    source: "/uttarakhand/:slug*.html",
    destination: "/news/uttarakhand/:slug*.html/",
    permanent: true,
  },
  {
    source: "/haryana/:slug*.html",
    destination: "/news/haryana/:slug*.html/",
    permanent: true,
  },
  {
    source: "/madhya-pradesh/:slug*.html",
    destination: "/news/madhya-pradesh/:slug*.html/",
    permanent: true,
  },
  {
    source: "/rajasthan/:slug*.html",
    destination: "/news/rajasthan/:slug*.html/",
    permanent: true,
  },
  {
    source: "/himachal-pradesh/:slug*.html",
    destination: "/news/himachal-pradesh/:slug*.html/",
    permanent: true,
  },
  {
    source: "/regional-shows/:slug*",
    destination: "/news/etv-shows/:slug*/",
    permanent: true,
  },
  {
    source: "/complaint-redressal.html",
    destination: "/complaint-redressal/",
    permanent: true,
  },
  {
    source: "/news/astro/capricorn/",
    destination: "/news/astro/",
    permanent: true,
  },
  // {
  //   source: "/ipl-:slug*/",
  //   destination: "/cricket/ipl/",
  //   permanent: true,
  // },
  {
    source: "/election-result-:slug*/",
    destination: "/elections/",
    permanent: true,
  },
  {
    source: "/coronavirus-latest-news/",
    destination: "/tag/coronavirus/",
    permanent: true,
  },
  {
    source: "/amp/assembly-elections-2022/:slug*/",
    destination: "/elections/",
    permanent: true,
  },
  {
    source: "/assembly-elections-2022/:slug*/",
    destination: "/elections/",
    permanent: true,
  },
  {
    source: "/news/entertainment/bhojpuri/",
    destination: "/news/entertainment/",
    permanent: true,
  },
  {
    source: "/news/entertainment/hollywood/",
    destination: "/news/entertainment/",
    permanent: true,
  },
  {
    source: "/news/sports/cricket/",
    destination: "/cricket/",
    permanent: true,
  },
  {
    source: "/byline/deepali-porwal-2797.html",
    destination: "/byline/deepali-porwal-2239.html",
    permanent: true,
  },
  {
    source: "/agency/ganeshas-grace/",
    destination: "/agency/ganeshagrace/",
    permanent: true,
  },
];

module.exports = [...urls];