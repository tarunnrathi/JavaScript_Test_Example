let isEnv = "production_404";
if (process.env.APP_ENV != undefined) {
  isEnv = process.env.APP_ENV;
}
let aqi_email = "cnn@aqi.in";
if (process.env.NW18_HINDI_AQI_EMAIL != undefined) {
  aqi_email = process.env.NW18_HINDI_AQI_EMAIL;
}
let aqi_pwd = "";
if (process.env.NW18_HINDI_AQI_PWD != undefined) {
  aqi_pwd = process.env.NW18_HINDI_AQI_PWD;
}
let aqi_url = "https://api.aqi.in/api/v1/login";
if (process.env.NW18_HINDI_AQI_URL != undefined) {
  aqi_url = process.env.NW18_HINDI_AQI_URL;
}
let siteUrl = "http://localhost:3050/";
let apiUrl = "https://api-hi.news18.com/nodeapi/v1/hin/";
let siteEnv = "stg";
let ssoUrl = "";
const inHousePlayer = true;
const cricketNextDomain = "http://cricketnext.s3.amazonaws.com/";
let CLEVERTAP_ACCOUNT_ID = "TEST-794-R65-566Z";
let cricketNextApiUrl = "http://pvt-events.nw18.com/n18sports/cricket/v1/hi/";
let GLOBAL_API_BASE_URL = "https://api-hi.news18.com/nodeapi/v1/hin/";
let cricketNextApiUrlEng = "https://events.nw18.com/n18sports/cricket/v1/en/";
// let VIDGYOR_ACCESS_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWUyMjZhMDIxNWEyNzg0ODE4NTA1YjEiLCJzY29wZSI6IldFQlNJVEUiLCJzZXNzaW9uX2lkIjoiNjFhN2JiMjEtYTJkMy00NGYyLWE5NzYtOThkNDQ4NDRmOWY2IiwiaWF0IjoxNTk5OTg3Njk2fQ.faoXfaKgAPdxpWIW2OhVrpROELMWsIVLd66C4Omba3M";

let VIDGYOR_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjhjZGM0ZDFmZGJhYjVjOTI4MTY4Y2YiLCJzY29wZSI6IklOX0hPVVNFIiwic2Vzc2lvbl9pZCI6IjNhZTY5MWQ0LWFmODgtNGRjMC05NGFhLTRkNzg0Y2Q2ZTUzOSIsImZpcnN0bmFtZSI6IlByZWV0YW0iLCJsYXN0bmFtZSI6IkNoYWtyYWJvcnR5IiwiZW1haWxfaWQiOiJQcmVldGFtLkNAbncxOC5jb20iLCJpYXQiOjE3MTY3ODY4NzMsImV4cCI6MTc0ODMyMjg3M30.xBmWsOROTrS0ky94A971lzOU9javMno1XJ3joor_WJo";
let VIDGYOR_ENV = "production";
switch (isEnv) {
  case "production":
    siteUrl = "https://hindi.news18.com/";
    apiUrl = "https://api-hi.news18.com/nodeapi/v1/hin/";
    siteEnv = "";
    ssoUrl = "https://sso.news18.com/";
    CLEVERTAP_ACCOUNT_ID = "694-R65-566Z";
    cricketNextApiUrl = "http://pvt-events.nw18.com/n18sports/cricket/v1/hi/";
    cricketNextApiUrlEng =
      "http://pvt-events.nw18.com/n18sports/cricket/v1/en/";
    GLOBAL_API_BASE_URL = "http://pvt-api-hi.news18.internal/nodeapi/v1/hin/";
    break;
  case "production_404":
    siteUrl = "https://hindi.news18.com/";
    apiUrl = "https://api-hi.news18.com/nodeapi/v1/hin/";
    siteEnv = "";
    ssoUrl = "https://sso.news18.com/";
    CLEVERTAP_ACCOUNT_ID = "694-R65-566Z";
    cricketNextApiUrl = "https://events.nw18.com/n18sports/cricket/v1/hi/";
    cricketNextApiUrlEng = "https://events.nw18.com/n18sports/cricket/v1/en/";
    GLOBAL_API_BASE_URL = "https://api-hi.news18.com/nodeapi/v1/hin/";
    break;
  case "beta":
    siteUrl = "https://betahindi.news18.com/";
    apiUrl = "https://api-hi.news18.com/nodeapi/v1/hin/";
    siteEnv = "beta";
    ssoUrl = "https://beta-sso.news18.com/";
    cricketNextApiUrl = "http://pvt-events.nw18.com/n18sports/cricket/v1/hi/";
    cricketNextApiUrlEng =
      "http://pvt-events.nw18.com/n18sports/cricket/v1/en/";
    GLOBAL_API_BASE_URL = "https://api-hi.news18.com/nodeapi/v1/hin/";
    break;
  case "stg":
    siteUrl = "https://stg-hindi-multi.news18.com/";
    apiUrl = "https://api-hi.news18.com/nodeapi/v1/hin/";
    siteEnv = "stg";
    ssoUrl = "https://stg-sso.news18.com/";
    cricketNextApiUrl = "http://pvt-events.nw18.com/n18sports/cricket/v1/hi/";
    GLOBAL_API_BASE_URL = "https://stg-api.news18.com/nodeapi/v1/hin/";
    // GLOBAL_API_BASE_URL = 'http://pvt-api-hi.news18.internal/nodeapi/v1/hin/';
    // VIDGYOR_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWZlY2FiNzE0ZDJmZDMxMTY3ZmQxNmEiLCJzY29wZSI6IldFQlNJVEUiLCJzZXNzaW9uX2lkIjoiYzc4OTljNTItNzkzOC00YzNiLTk1YTktZGI4M2E4MDRmNTBhIiwiaWF0IjoxNTkzNzU2MzQzfQ.jGtzMEvLXLcLUsdxDCUbS1LuVuRBJy5Ul1Cd0mTv8Ko"
    // VIDGYOR_ENV = "staging"
    break;
  case "development":
    siteUrl = "https://stg-hindi-multi.news18.com/";
    apiUrl = "https://api-hi.news18.com/nodeapi/v1/hin/";
    siteEnv = "dev";
    ssoUrl = "https://stg-sso.news18.com/";
    cricketNextApiUrl = "https://events.nw18.com/n18sports/cricket/v1/hi/";
    GLOBAL_API_BASE_URL = "https://api-hi.news18.com/nodeapi/v1/hin/";
    // GLOBAL_API_BASE_URL = 'https://api-hi.news18.com/nodeapi/v1/hin/';
    break;
  default:
    siteUrl = "https://hindi.news18.com/";
    apiUrl = "https://stg-api.news18.com/nodeapi/v1/hin/";
    siteEnv = "production";
    ssoUrl = "https://sso.news18.com/";
    CLEVERTAP_ACCOUNT_ID = "694-R65-566Z";
    cricketNextApiUrl = "http://pvt-events.nw18.com/n18sports/cricket/v1/hi/";
    GLOBAL_API_BASE_URL = "https://stg-api.news18.com/nodeapi/v1/hin/";
    break;
}
const SITE_CONfIG = {
  IMG_STATIC_PATH_OLD: "http://static.hindi.news18.com/static-hindi/uploads/",
  IMG_STATIC_PATH: "https://images.news18.com/static-hindi/uploads/",
  IMG_STATIC_PATH_NEW: "https://images.news18.com/static-hindi/uploads/",
  CRICKET_NEXT_CSR_API: "https://cricketnext.nw18.com/sports/csr/feed/",
  PRO_KABADDI_API: "http://xmlns.cricketnext.com/cktnxt/scorecard/kabaddi/",
  PRO_KABADDI_OG_IMAGE:
    "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
  REDIS_KEY_PREFIX: "KHABARN18-",
  redisPrefix: "KHABARN18-",
  redisCatPrefix: "KHABAR",
  apiUrl,
  siteUrl,
  CLEVERTAP_ACCOUNT_ID,
  GLOBAL_API_BASE_URL,
  isEnv,
  logFilePath: "./logs/access_log",
  errorFilePath: "./logs/error_log",
  mainUrl: "https://hindi.news18.com/",
  THUMBNAIL_IMAGE_PLACEHOLDER_PATH:
    "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg",
  schemaImagePlaceholder:
    "https://images.news18.com/ibnkhabar/uploads/2021/08/News18_Hindi_logo_1600x900.png",
  gceCode: "f0b7fff1dd9019261",
  imageBase: "images.news18.com/hindi/uploads/",
  imageBasePKL: `https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/css/pro_kabaddi/images`,
  siteEnv,
  ssoUrl,
  cricketImageProfileBase:
    "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/",
  cricketImageFlagBase:
    "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/160x90/",
  flagHolder:
    "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/DefaultFlag-90x50-new.png",
  capHolder:
    "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/icon_player.png",
  aqi: {
    email: "", //aqi_email,
    password: "", //aqi_pwd,
    login: aqi_url,
  },
  lang: "hindi",
  cricketNextDomain,
  budgetCompaninName: "Union Budget 2023",
  cricketNextApiUrl,
  cricketNextApiUrlEng,
  VIDGYOR_ACCESS_TOKEN,
  VIDGYOR_ENV,
  inHousePlayer,
  EnglishApiUrl: "https://www.news18.com/nodeapi",
  engApiUrl: "https://api-en.news18.com/nodeapi/v1/eng/",
  EnglishSiteUrl: "https://www.news18.com",
};
// if (isEnv === 'production') {
//   console.log = function no_console() { };
// }
module.exports = SITE_CONfIG;
