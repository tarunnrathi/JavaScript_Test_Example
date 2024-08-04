import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const URL = {
  // Getting With Base URL
  getURL: (pageURL, isCSRCall = false, baseUrl = "") => {
    if (baseUrl) {
      return baseUrl + pageURL;
    } else if (isCSRCall) {
      return publicRuntimeConfig.apiUrl + pageURL;
    } else {
      return publicRuntimeConfig.GLOBAL_API_BASE_URL + pageURL;
    }
  },
  // Key Values Below
  GET_REDIS: publicRuntimeConfig.GLOBAL_API_BASE_URL + "get-redis",
  TOP_NEWS: "get-home-topnews",
  CRICKET_NEXT_APIURL: publicRuntimeConfig.cricketNextApiUrl,
  CRICKET_NEXT_APIURL_ENG: publicRuntimeConfig.cricketNextApiUrlEng,
  CRICKET_NEXT_APIURL_ENG_CSR: "https://events.nw18.com/n18sports/cricket/v1/en/",
  HINDI_API_URL: publicRuntimeConfig.apiUrl,
  GET_MENU: "get-menu",
  GET_REDIS_URL: "get-redis",
  GET_WEBSTORY_CATEGORY: "get-webstories-categorylist",
  GET_WEBSTORY: "get-webstories-list",
  GET_PRIORITY: "get-priority",
  GET_ARTICLE_LIST: "get-article-list",
  GET_ARTICLE_ADJACENTS: "get-article-adjacents",
  GET_ARTICLE_BY_ID: "get-article",
  GET_PAGE_META: "get-page-meta",
  GET_LIVE_BLOG: "get-liveblog",
  GET_AQI_DATA: "get-aqidata",
  GET_CONFIG: "get-redis?key=NEWS18:GRC",
  GET_EVENT_SLIDER: "event-slider",
  GET_COMMON_MENU: "get-common-menu",
  GET_CATEGORY_ARTICLE: "get-category-article",
  GET_MOBILE_LIST: "get-mobile-list",
  GET_MOBILE: "get-mobile",
  GET_MOBILE_BRAND: "get-mobile-brands",
  GET_MOBILE_SEARCH: "get-mobile-search",
  GET_SILO_ID: "get-silo",
  GET_SILO_LIST: "get-silo-list",
  GET_ASTRO_ALL: "get-astrology-list",
  GET_NEW_ICON: "https://kannada.news18.com/images/icons/new-blinker.gif",
  GET_AUTHOR_LIST: "get-author-list",
  GET_TAGS_LIST: "get-tags-list",
  GET_SUBCATEGORY: "get-subcategory",
  GET_REDIRECTION_URL: "get-redirection",
  GET_PETROL_DIESEL: "get-commodity-list",
  GET_BOARD_LIST: "get-static-list",
  GET_BOARD_DATA: "get-static",
  GET_BOARD_FAQ: "get-questionnaire",
  GET_OLYMPICS_MEDALS_Widget:"top",
  GET_OLYMPICS_MEDALS_ALL:"all",
  GET_OLYMPICS_SCHEDULE:"olympics-schedule",
  GET_OLYMPICS_SCHEDULE_WITH_DATE:"olympics-schedule-w",
  GET_OLYMPICS_SCHEDULE_ALL : "olympics-schedule-all",
  GET_OLYMPICS_RESULTS:"olympics-results",
  GET_OLYMPICS_MEDALS:"olympics-medals"
};

export const REDIS_KEYS = {
  LOCAL_STATE: "LOCAL_STATE",
  LOCAL_CATEGORY: "LOCAL_CATEGORY",
  NW_HM_DATA: "nw_hm_data",
  NEW_FMS_SYSTEM: "new_fms_system",
  TRENDING_NAV: "trendingnav",
  TRENDING_TAG: "TRADINGTAGS",
  PODCAST_DATA: "KHABARN18-nw_prodcast_data_home_page",
  TOP_SPECIAL_WIDGET: "topspecialwidget",
  STICKY_FOOTER_DATA: "mobile_sticky_footer",
  NW_BLOGGER_DATA: "nw_bloger_data",
  CATLIST_KEY: "CATEGORIES",
  HOMEPAGE_DYNAMIC_BANNER: "SPONSER_MODULE_POSITION-home-page-banners",
  HOMEPAGE_STATE_MENU: "nw_home_state_menu",
  BREAKINGALERT: "BREAKINGALERT",
  SILO_CATEGORY: "silo-categories",
  HOMEPAGE_CRICKET: "homepagecricket",
  MOBILE_STICKY_FOOTER: "mobile_sticky_footer",
  STICKEY_FOOTER: "msf",
  ADS_TXT_KEY: "KHABARN18-ads_txt_news18hindi",
  RASHIFAL_DETAIL: "rashifal_home_detail",
  SPECIAL_LIVE_BLOG: "special-live-blog",
  LIVETV_POSITION:"KHABARN18-live_tv",
  EVENT_COVERAGE_SWITCHER :"KHABARN18-fe_theme_switcher",
  EVENT_COVERAGE_DETAIL : "KHABARN18-event-coverage-widget", 
  FLIP_LOGO: "flip_logo"
};

export const CONST_CAT_PAGE = {
  IGNORE_SHEHERCHUNE_STATES: [
    "delhi-ncr",
    "punjab"
  ],
  STATES: {
    "delhi-ncr": "दिल्ली-एनसीआर",
    "uttar-pradesh": "उत्तर प्रदेश",
    bihar: "बिहार",
    "madhya-pradesh": "मध्य प्रदेश",
    rajasthan: "राजस्थान",
    uttarakhand: "उत्तराखंड",
    haryana: "हरियाणा",
    jharkhand: "झारखंड",
    chhattisgarh: "छत्तीसगढ़",
    "himachal-pradesh": "हिमाचल प्रदेश",
    maharashtra: "महाराष्ट्र",
    punjab: "पंजाब",
  },
  SECTION_LIST_TR: {
    nation: "राष्ट्र",
    sports: "खेल",
    entertainment: "मनोरंजन",
    "family-and-welfare": "परिवार और कल्याण",
    business: "व्यवसाय",
    travel: "यात्रा",
    world: "दुनिया",
    spirituality: "आध्यात्मिकता",
    states: "राज्यों",
    election: "चुनाव",
    recipe: "विधि",
    knowledge: "ज्ञान",
    jobs: "नौकरियां",
    tech: "तकनीक",
    lifestyle: "जीवन शैली",
    astro: "एस्ट्रो",
    "ajab-gajab": "अजब गजब",
    auto: "ऑटो",
    dharm: "धर्म",
    career: "करियर",
    literature: "साहित्य",
    bollywood: "बॉलीवुड",
    "viral-social": "सोशल / वायरल",
    tv: "टीवी",
    bhojpuri: "भोजपुरी",
    "film-review": "फ़िल्म रिव्यू",
    youtube: "यूट्यूब",
    hollywood: "हॉलीवुड",
    "web-series": "ओटीटी वेब सीरीज़",
    "launch-review": "लॉन्च/रिव्यू",
    apps: "ऐप्स",
    accessories: "एसेसरीज़",
    cricket: "क्रिकेट",
    mobiletech: "मोबाइल-टेक",
    "mobile-tech": "मोबाइल-टेक",
    life: "लाइफ़",
    "tips-and-tricks": "टिप्स एंड ट्रिक्स",
    "agriculture": "कृषि"
  },
};

export const STATE_ARRAY = [
  {
    slug: "uttar-pradesh",
    state_name: "उत्तर प्रदेश",
  },
  {
    slug: "rajasthan",
    state_name: "राजस्थान",
  },
  {
    slug: "bihar",
    state_name: "बिहार",
  },
  {
    slug: "delhi-ncr",
    state_name: "दिल्ली-एनसीआर",
  },
  {
    slug: "madhya-pradesh",
    state_name: "मध्य प्रदेश",
  },
  {
    slug: "haryana",
    state_name: "हरियाणा",
  },
  {
    slug: "jharkhand",
    state_name: "झारखंड",
  },
  {
    slug: "himachal-pradesh",
    state_name: "हिमाचल प्रदेश",
  },
  {
    slug: "uttarakhand",
    state_name: "उत्तराखंड",
  },
  {
    slug: "chhattisgarh",
    state_name: "छत्तीसगढ़",
  },
  {
    slug: "punjab",
    state_name: "पंजाब",
  },
  {
    slug: "maharashtra",
    state_name: "महाराष्ट्र",
  },
];

export const SUBCATEGORYS = {
  photogallery: {
    id: 1,
    label: "फोटो",
    slug: "photogallery",
    parent: 0,
    children: [
      {
        id: 4064,
        label: "सभी",
        slug: "photogallery",
        link: "filter"
      },
      {
        id: 4064,
        label: "मनोरंजन",
        slug: "entertainment",
        link: "filter"
      },
      {
        id: 4064,
        label: "क्रिकेट",
        slug: "cricket",
        link: "filter"
      },
      {
        id: 4064,
        label: "मोबाइल-टेक",
        slug: "tech",
        link: "filter"
      },
      {
        id: 4064,
        label: "ऑटो",
        slug: "auto",
        link: "filter"
      },
      {
        id: 4064,
        label: "लाइफ़",
        slug: "lifestyle",
        link: "filter"
      },
    ],
  },
  entertainment: {
    id: 1,
    label: "बॉलीवुड",
    slug: "entertainment",
    parent: 0,
    children: [
      {
        id: 4064,
        label: "सभी",
        slug: "entertainment",
        link: "filter"
      },
      {
        id: 4064,
        label: "सोशल / वायरल",
        slug: "viral-social",
        link: "filter"
      },
      {
        id: 4064,
        label: "TV",
        slug: "tv",
        link: "filter"
      },
      // {
      //   id: 4064,
      //   label: "भोजपुरी",
      //   slug: "bhojpuri",
      //   link: "filter"
      // },
      {
        id: 4064,
        label: "फ़िल्म रिव्यू",
        slug: "film-review",
        link: "filter"
      },
      {
        id: 4064,
        label: "साउथ सिनेमा",
        slug: "south-cinema",
        link: "filter"
      },
      // {
      //   id: 4064,
      //   label: "हॉलीवुड",
      //   slug: "hollywood",
      //   link: "filter"
      // },
      {
        id: 4064,
        label: "फोटो",
        slug: "photogallery__entertainment",
        link: "filter"
      },
      {
        id: 4064,
        label: "वीडियो",
        slug: "videos__entertainment",
        link: "filter"
      },
    ],
  },
  business: {
    id: 1,
    label: "मनी",
    slug: "business",
    parent: 0,
    children: [
      {
        id: 4064,
        label: "सभी",
        slug: "business",
        link: "filter"
      },
      {
        id: 4064,
        label: "पैसा बनाओ",
        slug: "money-making-tips",
        link: "filter"
      },
      {
        id: 4064,
        label: "सक्सेस स्टोरी",
        slug: "success-story",
        link: "filter"
      },
      {
        id: 4064,
        label: "ऑनलाइन बिज़नेस",
        slug: "online-business",
        link: "filter"
      },
      {
        id: 4064,
        label: "इनोवेशन",
        slug: "innovation",
        link: "filter"
      },
    ],
  },
  sports: {
    id: 1,
    label: "खेल",
    slug: "sports",
    parent: 0,
    children: [
      {
        id: 4064,
        label: "सभी",
        slug: "sports",
        link: "filter"
      },
      {
        id: 4064,
        label: "क्रिकेट",
        slug: "cricket",
        link: "filter"
      },
      {
        id: 4064,
        label: "फुटबॉल",
        slug: "football",
        link: "filter"
      },
      {
        id: 4064,
        label: "टेनिस",
        slug: "tennis",
        link: "filter"
      },
      {
        id: 4064,
        label: "अन्य खेल",
        slug: "others",
        link: "filter"
      },
    ],
  },
  tech: {
    id: 1,
    label: "मोबाइल-टेक",
    slug: "tech",
    parent: 0,
    children: [
      {
        id: 4064,
        label: "सभी",
        slug: "tech",
        link: "filter"
      },
      {
        id: 4064,
        label: "लॉन्च/रिव्यू",
        slug: "launch-review",
        link: "filter"
      },
      {
        id: 4064,
        label: "ऐप्स",
        slug: "apps",
        link: "filter"
      },
      {
        id: 4064,
        label: "एसेसरीज़",
        slug: "accessories",
        link: "filter"
      },
      {
        id: 4064,
        label: "डीआईवाई",
        slug: "diy",
        link: "filter"
      },
      {
        id: 4064,
        label: "गैजेट्स",
        slug: "gadgets",
        link: "filter"
      },
      {
        id: 4064,
        label: "वीडियो",
        slug: "videos",
        link: "filter"
      },
    ],
  },
  asian_game_2023: {
    id: 1,
    label: "एशियन गेम्स 2023",
    slug: "asian_game_2023",
    parent: 0,
    children: [
      {
        id: 4064,
        label: "सभी",
        slug: "asian_game_2023",
        link: "filter"
      },
      {
        id: 4064,
        label: "पदक तालिका",
        slug: "sports/asian-games/medal-tally/",
        link: "external"
      },      
    ],
  },
  'cricket': {
    id: 1,
    label: "वर्ल्ड कप",
    slug: "cricket",
    parent: 0,
    children: [
      {
        id: 4064,
        label: "सभी",
        slug: "cricket",
        link: "filter"
      },
      {
        id: 4064,
        label: "शेड्यूल",
        slug: "world-cup/schedule/",
        link: "external"
      },
      {
        id: 4064,
        label: "नतीजे",
        slug: "world-cup/results/",
        link: "external"
      },
      {
        id: 4064,
        label: "अंक तालिका",
        slug: "world-cup/points-table/",
        link: "external"
      }
    ],
  }
};

export const rashi = ["taurus", "gemini", "cancer", "leo", "virgo", "aries", "pisces","libra","scorpio","sagittarius","capricorn","aquarius"];

export const breadCrumbSchema = (currentUrl , key) => {
   let breadCrumb = [
      { slug: publicRuntimeConfig.siteUrl, value: 'NEWS18 हिंदी' },
      { slug: publicRuntimeConfig.siteUrl + "cricket/", value: 'CRICKET' },
      { slug: publicRuntimeConfig.siteUrl + "world-cup/", value: 'World Cup 2023' },      
    ]
    key !== "" && breadCrumb.push({ slug: currentUrl, value: key });
    return breadCrumb;
}


export const getFilteredFields = (type) => {
  let fields = "*";
  switch (type) {
    case "video":
      fields = "agency,agency_full,body,video_details,author,author_byline,auto_youtube_import,breadcrumb,categories,created_at,subsection,display_headline,edited_by,external_video,ff_source,headline,images,intro,local18_video,ff_video_duration,ff_video_mp4_path,meta_description,meta_keyword,meta_titile,og_title,post_type,nw_auto_yt_video_type,publish_by,story_id,tags,updated_at,translated_by,weburl,weburl_r,written_by,youtube,youtube_thumbnail,youtubeid,disclaimer,reported_by";
      break;
    case "short_video":
      fields = "agency,agency_full,video_details,author,author_byline,auto_youtube_import,breadcrumb,categories,created_at,display_headline,edited_by,external_video,ff_source,headline,images,intro,local18_video,ff_video_duration,ff_video_mp4_path,meta_description,meta_keyword,meta_titile,og_title,post_type,nw_auto_yt_video_type,publish_by,story_id,tags,updated_at,translated_by,weburl,weburl_r,written_by,youtube,youtube_thumbnail,youtubeid,disclaimer,reported_by";
      break;
    case "photogallery":
      fields = "agency,agency_full,author,author_byline,byline,city_name,breadcrumb,categories,created_at,display_headline,edited_by,ff_source,headline,images,intro,meta_description,meta_keyword,meta_titile,og_title,post_type,publish_by,story_id,tags,updated_at,translated_by,weburl,weburl_r,written_by,body,gallery,gallery_count,images_all_sizes,intro,is_adult_content,tag_topic,section,disclaimer,reported_by,subsection";
      break;
      
    default:
  }
  return fields;
};

export const imgURL = "https://images.news18.com/ibnkhabar/uploads/2024/04/News18-OG-Img-2024-04-914440a5edfbe158cab06a971711917d.jpg?impolicy=website&width=170&height=128";

export const IccT20TeamList = [
  { teamName: "अफ़ग़ानिस्तान", teamUrl: "/cricket/teams/afghanistan-squad-1188.html", teamId: 1188 },
  { teamName: "इंग्लैंड", teamUrl: "/cricket/teams/england-squad-3.html", teamId: 3 },
  { teamName: "नामीबिया", teamUrl: "/cricket/teams/namibia-squad-20.html", teamId: 20 },
  // { teamName: "यूएई", teamUrl: "/cricket/teams/united-arab-emirates-squad-21.html", teamId: 21 },
  { teamName: "स्कॉटलैंड", teamUrl: "/cricket/teams/scotland-squad-16.html", teamId: 16 },
  { teamName: "वेस्ट इंडीज़", teamUrl: "/cricket/teams/west-indies-squad-9.html", teamId: 9 },
  { teamName: "ऑस्ट्रेलिया", teamUrl: "/cricket/teams/australia-squad-1.html", teamId: 1 },
  { teamName: "भारत", teamUrl: "/cricket/teams/india-squad-4.html", teamId: 4 },
  { teamName: "नीदरलैंड्स", teamUrl: "/cricket/teams/netherlands-squad-15.html", teamId: 15 },
  { teamName: "पाकिस्तान", teamUrl: "/cricket/teams/pakistan-squad-6.html", teamId: 6 },
  { teamName: "दक्षिण अफ्रीका", teamUrl: "/cricket/teams/south-africa-squad-7.html", teamId: 7 },
  { teamName: "बांग्लादेश", teamUrl: "/cricket/teams/bangladesh-squad-2.html", teamId: 2 },
  { teamName: "आयरलैंड", teamUrl: "/cricket/teams/ireland-squad-13.html", teamId: 13 },
  { teamName: "न्यूज़ीलैंड", teamUrl: "/cricket/teams/new-zealand-squad-5.html", teamId: 5 },
  // { teamName: "जिम्बाब्वे", teamUrl: "/cricket/teams/zimbabwe-squad-10.html", teamId: 10 },
  { teamName: "श्रीलंका", teamUrl: "/cricket/teams/sri-squad-8.html", teamId: 8 },
  { teamName: "कनाडा", teamUrl: "/cricket/teams/canada-squad-12.html", teamId: 12 },
  { teamName: "नेपाल", teamUrl: "/cricket/teams/nepal-squad-637.html", teamId: 637 },
  { teamName: "ओमान", teamUrl: "/cricket/teams/oman-squad-28.html", teamId: 28 },
  { teamName: "पापुआ न्यू गिनी", teamUrl: "/cricket/teams/nepal-squad-750.html", teamId: 750 },
  { teamName: "युगांडा", teamUrl: "/cricket/teams/nepal-squad-29.html", teamId: 29 },
  { teamName: "यूएसए", teamUrl: "/cricket/teams/usa-squad-22.html", teamId: 22 },
];

export const getDistrictListArr=[
  'Bihar',
  'Chhattisgarh',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Madhya Pradesh',
  'Rajasthan',
  'Uttar Pradesh',
  'Uttarakhand',
]

export const flagUrl = "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/160x90";
export const player_images = "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/";
export const t20_world_cup_series_id = 6122;
export const t20_world_cup_year= 2024;
export const olympics_id = 39;
export const olympics_year = 2024;
export const dateArray = ['2024-07-24','2024-07-25','2024-07-26', '2024-07-27', '2024-07-28', '2024-07-29', '2024-07-30', '2024-07-31', '2024-08-1', '2024-08-2', '2024-08-3', '2024-08-4', '2024-08-5', '2024-08-6', '2024-08-7', '2024-08-8','2024-08-9','2024-08-10','2024-08-11'];