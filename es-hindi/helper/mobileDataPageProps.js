import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import {
  jsonLdForWebPage,
  jsonLdForHomeOrganization,
  jsonLdForItemList,
  jsonLdForSingleProductPage,
} from "includes/schema.util";
import { ignoreQueryParams, capIt } from "includes/article.util";
import { dataPages as dataPagesAds } from "includes/Desktop/dfpAdIds";
import { dataPages as dataPagesMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { getSetTargettingValues, checkDevice } from "includes/helper";
import {
  getDistricts,
  getMenu,
  getMiscData,
  getRedisDataByKey,
  getArticleList,
  getMobilelist,
  getGoogleConfig,
  getMobile,
  // getMobileBrand,
} from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";
import { validSlugChecker } from "includes/_app.util";

let { brandInHindi } = require("/src/includes/brand.helper");

const mobileDataPage = async (context, isAmp = false, pageName = "") => {
  const date = Date.now();
  let u = new Date(date);
  let month = u.getMonth() + 1;
  const isMobile = checkDevice(context);
  let tomorrowDate =
    u.getFullYear() +
    "-" +
    ("0" + month).slice(-2) +
    "-" +
    ("0" + u.getDate()).slice(-2) +
    " " +
    ("0" + u.getHours()).slice(-2) +
    ":" +
    ("0" + u.getMinutes()).slice(-2) +
    ":" +
    ("0" + u.getSeconds()).slice(-2);
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = ignoreQueryParams(
    protocol + host + context.req.url,
    false
  );
  const urlParam = context.query;
  // const category = urlParam.cat || "";

  let arr = urlParam?.mobileName?.split("-");
  let id = arr && arr[arr?.length - 1];

  let imageUrl =
    "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/";

  let subStringforNews = urlParam?.name
    ? { "tags.slug": `${urlParam?.name?.toLowerCase()}`, post_type: "text" }
    : { tag_topic: "mobile", post_type: "text" };
  let subStringforVideos = { tag_topic: "mobile", post_type: "videos" };

  let brandname = `${arr && arr[0]}`;
  brandname = validSlugChecker(brandname) ? brandname : "";
  let latestnews_startpoint = urlParam?.brandName
    ? 0
    : urlParam?.page
    ? (parseInt(urlParam?.page, 10) - 1) * 19
    : 0;
  let Mobiles_of_brand_startpoint = urlParam?.page
    ? (parseInt(urlParam?.page, 10) - 1) * 10
    : 0;

  // const filter = (brandname , obj1 ={}) =>{
  //   let tempArray = {"brand":[`${brandname}`,`${brandname?.toUpperCase()}`,`${capIt(brandname)}`]}
  //   if(Object.values(obj1).length > 0 ){
  //     tempArray = {...tempArray,...obj1}
  //   }
  //   return tempArray
  // }

  const filter = (brandname) => {
    let tempFilter = { brand_slug: brandname };
    return tempFilter;
  };
  const filter_range = (item, operator, range) => {
    let tempRange =
      operator === "btw"
        ? { [item]: { gte: range[0], lte: range[1] } }
        : operator === "lte"
        ? { [item]: { lte: range } }
        : { [item]: { gte: range } };
    return tempRange;
  };

  let faq = [];

  if (urlParam?.brandName) {
    let [
      firstQ = [],
      secQ = [],
      thirdQ = [],
      fourQ = [],
      fiveQ = [],
      sixQ = [],
      sevenQ = [],
      eightQ = [],
      nineQ = [],
      tenQ = [],
    ] = await Promise.all([
      getMobilelist({
        count: 5,
        fields: "id,title",
        filter: filter(urlParam?.brandName),
        filterRange: filter_range("camera_i", "gte", 50),
      }),
      getMobilelist({
        fields: "id,price,title",
        filter: filter(urlParam?.brandName, { no_of_rear_cameras_type: "4" }),
        filterRange: filter_range("price", "lte", 15000),
      }),
      getMobilelist({
        count: 5,
        fields: "id,price,title,camera_i",
        filter: filter(urlParam?.brandName),
        filterRange: filter_range("frontcamera_i", "gte", 32),
      }),
      getMobilelist({
        fields: "id,price,title,battery_capacity",
        filter: filter(urlParam?.brandName, { battery_capacity: "6000" }),
      }),
      getMobilelist({
        count: 5,
        fields: "id,price,ram_display,title,battery_capacity",
        filter: filter(urlParam?.brandName, { ram_display: "6 GB" }),
        filterRange: filter_range("price", "lte", 15000),
      }),
      getMobilelist({
        fields: "id,price,ram_display,title,battery_capacity",
        filter: filter(urlParam?.brandName, { battery_capacity: "5000" }),
      }),
      getMobilelist({
        count: 5,
        fields: "id,price,ram_display,title,battery_capacity",
        filter: filter(urlParam?.brandName),
        filterRange: filter_range("price", "btw", [15000, 20000]),
      }),
      getMobilelist({
        count: 5,
        fields: "id,price,title,processor_cores,battery_capacity",
        filter: filter(urlParam?.brandName, { ram_display: "4 GB" }),
        filterRange: filter_range("price", "btw", [5000, 10000]),
      }),
      getMobilelist({
        count: 5,
        fields: "id,price,ram_display,title,processor_cores,refresh_rate_i",
        filter: filter(urlParam?.brandName),
        filterRange: filter_range("refresh_rate_i", "gte", 90),
      }),
      getMobilelist({
        count: 5,
        fields: "id,ram_display,title,camera_i,processor_cores",
        filter: filter(urlParam?.brandName, { camera_i: "108" }),
      }),
    ]);

    let brandName = brandInHindi[urlParam?.brandName];
    faq = [
      {
        title: `${brandName} के बेस्ट कैमरा क्वालिटी वाले मोबाइल फोन कौन से हैं`,
        description: firstQ,
        startAnsWith: `${brandName} के बेस्ट कैमरा क्वालिटी वाले ${firstQ?.length} मोबाइल फोन की लिस्ट नीचे दी गई है`,
        show: firstQ?.length,
        headerData: ["प्रोडक्ट का नाम"],
      },
      {
        title: `15 हज़ार रुपये से कम कीमत में ${brandName} के 4 कैमरे वाले फोन`,
        description: secQ,
        startAnsWith: `${brandName} के 4 कैमरे वाले फोन जो मिल सकते हैं 15 हज़ार रुपये से कम कीमत में`,
        show: secQ?.length,
        headerData: ["प्रोडक्ट का नाम", "कीमत"],
      },
      {
        title: `${brandName} के बेस्ट सेल्फी कैमरा वाले मोबाइल फोन`,
        description: thirdQ,
        startAnsWith: `${brandName} के बेस्ट सेल्फी कैमरा वाले मोबाइल फोन की लिस्ट नीचे दी गई है`,
        show: thirdQ?.length,
        headerData: ["प्रोडक्ट का नाम", "कीमत", "कैमरा"],
      },
      {
        title: `${brandName} के 6000mAh बैटरी वाले मोबाइल फोन`,
        description: fourQ,
        startAnsWith: `${brandName} के 6000mAh बैटरी वाले मोबाइल फोन की लिस्ट नीचे दी गई है`,
        show: fourQ?.length,
        headerData: ["प्रोडक्ट का नाम", "कीमत", "बैटरी"],
      },
      {
        title: `15000 रुपये से कम कीमत वाले ${brandName} के 6GB RAM मोबाइल फोन`,
        description: fiveQ,
        startAnsWith: `${brandName} के 6GB RAM मोबाइल फोन जो मिल सकते हैं 15 हज़ार रुपये से कम कीमत में`,
        show: fiveQ?.length,
        headerData: ["प्रोडक्ट का नाम", "कीमत", "रैम", "बैटरी"],
      },
      {
        title: `5000mAh बैटरी वाले ${brandName} के बेस्ट मोबाइल फोन`,
        description: sixQ,
        startAnsWith: `${brandName} के 5000mAh बैटरी वाले मोबाइल फोन की लिस्ट नीचे दी गई है`,
        show: sixQ?.length,
        headerData: ["प्रोडक्ट का नाम", "कीमत", "रैम", "बैटरी"],
      },
      {
        title: `20 हज़ार रुपये से कम कीमत वाले ${brandName} के मिड-रेंज फोन`,
        description: sevenQ,
        startAnsWith: `${brandName} के मोबाइल फोन जो मिल सकते हैं 20 हज़ार रुपये से कम कीमत में`,
        show: sevenQ?.length,
        headerData: ["प्रोडक्ट का नाम", "कीमत", "रैम", "बैटरी"],
      },
      {
        title: `10,000 रुपये से कम कीमत वाले ${brandName} के 4GB RAM मोबाइल फोन`,
        description: eightQ,
        startAnsWith: ` ${brandName} के 4GB RAM मोबाइल फोन जो मिल सकते हैं 10 हज़ार रुपये से कम कीमत में`,
        show: eightQ?.length,
        headerData: ["प्रोडक्ट का नाम", "कीमत", "बैटरी", "प्रोसेसर"],
      },
      {
        title: `हाई-रिफ्रेश रेट डिस्प्ले वाले ${brandName} के टॉप मोबाइल फोन`,
        description: nineQ,
        startAnsWith: `${brandName} के टॉप मोबाइल फोन`,
        show: nineQ?.length,
        headerData: [
          "प्रोडक्ट का नाम",
          "कीमत",
          "रैम",
          "प्रोसेसर",
          "रिफ्रेश रेट",
        ],
      },
      {
        title: `${brandName} के 108 मेगापिक्सल कैमरे वाले मोबाइल फोन`,
        description: tenQ,
        startAnsWith: `${brandName} के मोबाइल फोन जिनमें मिलता है 108 मेगापिक्सल का कैमरा`,
        show: tenQ?.length,
        headerData: ["प्रोडक्ट का नाम", "रैम", "प्रोसेसर", "कैमरा"],
      },
    ];
  }

  let [
    menuData = {},
    miscData = {},
    topTrending = [],
    footerData = [],
    topStories = [],
    photoStories = [],
    astroStories = {},
    allMobileData = [],
    trendingMobileInStock = [],
    upcomingMobiles = [],
    latestNews = [],
    mobileComparison = [],
    videos = [],
    MobilesOfBrand = [],
    specificationDetails = {},
    otherMobilesOfBrand = {},
    brandDescription = {},
    specificationDescription = {},
    googleRemoteConfig = {},
    districtList = [],
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getMiscData({ trendingTags: true }),
    !(isMobile || isAmp)
      ? getRedisDataByKey(REDIS_KEYS.TRENDING_TAG, false)
      : [],
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    getArticleList({
      count: 4,
      fields: "display_headline,weburl_r,weburl,story_id,images",
    }),
    !isMobile
      ? getArticleList({
          count: 3,
          filter: { post_type: "photogallery" },
          fields: "gallery_count,display_headline,weburl_r,story_id,images",
        })
      : [],
    [],
    // getMobileBrand(), @todo https://stg-api.news18.com/nodeapi/v1/tel/get-redis?key=mobile_brands Correct API(Since Not Working from Migration not Fixing Until required)
    [],
    getMobilelist({
      fields:
        "id,price,stock,popularity,title,volte,no_of_sim_cards,fm_radio,finger_print_sensor,feature_image,brand,internal_storage_display,release_date,general_specs_91,operating_system",
      filter: { stock: "IN_STOCK" },
    }),
    getMobilelist({
      sortOrder: "asc",
      sortBy: "release_date",
      fields:
        "id,price,stock,popularity,title,volte,no_of_sim_cards,fm_radio,finger_print_sensor,feature_image,internal_storage_display,brand,release_date,general_specs_91,operating_system",
      filter: { stock: "UPCOMING" },
      filterRange: { release_date: { gte: tomorrowDate } },
    }),
    getArticleList({
      count: 7,
      offset: latestnews_startpoint,
      fields: "story_id,headline,display_headline,intro,weburl_r,weburl,images",
      filter: subStringforNews,
    }),
    [],
    pageName === "mobile"
      ? getArticleList({
          count: 6,
          offset: 0,
          fields:
            "story_id,headline,display_headline,intro,weburl_r,weburl,images",
          filter: subStringforVideos,
        })
      : [],
    urlParam?.brandName
      ? getMobilelist({
          offset: Mobiles_of_brand_startpoint,
          filter: filter(urlParam?.brandName),
          fields: `*,`,
        })
      : [],
    urlParam?.mobileName?.includes("-") && id ? getMobile({ id: id }) : {},
    pageName == "specification"
      ? getMobilelist({ filter: filter(brandname) })
      : [],
    urlParam?.brandName
      ? getRedisDataByKey(urlParam?.brandName, "KHABARN18-MOBILE_BRAND-")
      : [],
    id ? getRedisDataByKey(id, "KHABARN18-MOBILE-BRAND-MOBILE-") : [],
    getGoogleConfig(),
    isAmp && getDistricts(),
  ]);

  let brandImages = {
    Apple: `${imageUrl}Apple_logo_1644296725.png`,
    Asus: `${imageUrl}Asus_logo_1644296760.png`,
    Celkon: `${imageUrl}celkon_logo_1644296781.png`,
    Google: `${imageUrl}Google_logo_1644296803.png`,
    Iball: `${imageUrl}iball_logo_1644296845.png`,
    Honor: `${imageUrl}honor_logo_1644296824.png`,
    Intex: `${imageUrl}intex_logo_1644296861.png`,
    karbonn: `${imageUrl}karbonn_logo_1644296884.png`,
    Lava: `${imageUrl}lava_logo_1644296907.png`,
    LG: `${imageUrl}Lg_logo_1644296926.png`,
    Yu: `${imageUrl}yu_logo_1644297329.png`,
    Xolo: `${imageUrl}xolo_logo_1644297308.png`,
    Xiaomi: `${imageUrl}xiaomi_logo_1644297288.png`,
    Vivo: `${imageUrl}vivo_logo_1644297263.png`,
    Nokia: `${imageUrl}Nokia_logo_1644296985.png`,
    OnePlus: `${imageUrl}oneplus_logo_1644297010.png`,
    OPPO: `${imageUrl}oppo_logo_1644297043.png`,
    Poco: `${imageUrl}poco_logo_1644297065.png`,
    Realme: `${imageUrl}realme_logo_1644297087.png`,
    Reliance: `${imageUrl}reliance_logo_1644297128.png`,
    Samsung: `${imageUrl}Samsung_logo_1644297187.png`,
    Spice: `${imageUrl}spice_logo_1644297207.png`,
    Swipe: `${imageUrl}swipe_logo_1644297232.png`,
    Micromax: `${imageUrl}micromax_logo_1644296945.png`,
    Motorola: `${imageUrl}motorola_logo_1644296966.png`,
  };

  let brandData = {};
  let sortable = (Array.isArray(allMobileData) ? allMobileData : [])?.map(
    (item) => item.key
  );
  // ?.filter((value, index, self) => self.indexOf(value) === index);
  for (let mob = 0; mob < sortable.length; mob++) {
    if (brandImages[sortable[mob]]) {
      brandData[sortable[mob]] = {
        name: sortable[mob],
        image: brandImages[sortable[mob]],
      };
    }
  }

  const pageAds = isMobile ? dataPagesMobileAds() : dataPagesAds();

  let mobileName = specificationDetails?.title;
  let { ram_display, display_specs, camera_specs, brand } =
    specificationDetails || {};

  let title, description, keywords;
  switch (pageName) {
    case "mobile":
      title =
        "Latest Mobile Phone News & Updates: Upcoming Mobile Phones; पढ़ें मोबाइल फ़ोन्स से जुड़े अपडेट्स यहाँ";
      description =
        "Mobile Phone News & Updates: Find Mobile Phones Prices, Features, Specifications and other updates on News18 Hindi Mobiles section.";
      keywords =
        "Mobile Phones, New Mobile Phones, Mobile Phones Latest News, Upcoming Mobile Phones, Mobile Phones Price, Mobile Phone Specification, Mobile Phone Features";
      break;
    case "brand":
      title =
        brandDescription?.seo_title ||
        `${capIt(urlParam?.brandName)} Mobile Phones Price List in India | ${
          brandInHindi[urlParam?.brandName]
        } मोबाइल फ़ोन्स की कीमत, फीचर और स्पेसिफिकेशन्स से जुड़ी जानकारी पढ़े यहाँ`;
      description =
        brandDescription?.seo_keyword ||
        `${capIt(
          urlParam?.brandName
        )} New and Upcoming Mobile Phones: Find ${capIt(
          urlParam?.brandName
        )} All Mobile Phones Price List on News18 Hindi Mobile Section Page.`;
      keywords =
        brandDescription?.seo_description ||
        `${capIt(urlParam?.brandName)} Mobile Phones, ${capIt(
          urlParam?.brandName
        )} Mobile Price List, ${capIt(
          urlParam?.brandName
        )} Upcoming Mobile Phones, ${capIt(urlParam?.brandName)} New Mobile, ${
          brandInHindi[urlParam?.brandName]
        } मोबाइल फ़ोन्स, ${
          brandInHindi[urlParam?.brandName]
        } मोबाइल फ़ोन्स की कीमत, ${
          brandInHindi[urlParam?.brandName]
        } के नए मोबाइल फ़ोन्स `;
      break;
    case "specification":
      title =
        specificationDescription?.seo_title ||
        `${mobileName} Price in India, ${mobileName} Full Specifications, ${mobileName} Features in Hindi`;
      description =
        specificationDescription?.seo_keyword ||
        `${mobileName} Complete Specification: ${mobileName} comes up with ${ram_display} RAM, ${display_specs?.[1]} display size, ${camera_specs?.[0]} and ${camera_specs?.[4]}.`;
      keywords =
        specificationDescription?.seo_description ||
        `${mobileName}, ${mobileName} Price, ${mobileName} 5G Features, ${mobileName} Specification, ${mobileName} Camera, ${mobileName} Display Size`;
      break;
    case "news":
      title =
        "Mobiles Latest News & Updates: Upcoming Mobile Phones, मोबाइल फ़ोन में तकनीकी अपग्रेड और अन्य अपडेट के लिए पढ़ें News18 हिंदी";
      description =
        "Mobile Phones Latest News & Updates: Find Mobile Phone Technology Upgrades, Feature Change and other latest updates on News18 Hindi.";
      keywords =
        "Mobile Phone Updates, Mobile Phone Technology Updates, Mobile Phone Latest News, Mobile Phones Price";
      break;

    default:
      title =
        "Hindi News: Hindi Samachar, Hindi News Live TV, India News in Hindi, हिंदी न्यूज़ लाइव, हिन्दी समाचार - News18 हिन्दी";
      description =
        "Hindi News: Read Breaking News, Live Samachar in Hindi of Business, Sports, India, Education, Bollywood, Watch Live Hindi News TV and more on News18 Hindi. हिंदी समाचार की लोकप्रिय वेबसाइट पर देश, दुनिया, कारोबार, खेल, मनोरंजन से जुड़ी साडी खबरें विस्तार मैं पढ़े - न्यूज़18 हिंदी";
      keywords =
        "Hindi news, news in hindi, breaking news in hindi, latest news in hindi, latest hindi news, today news in hindi, hindi news today, News18 Hindi, India News, India Hindi News, हिंदी समाचार, ताजा समाचार";
      break;
  }

  const pageSeo = {
    title: title,
    description: description,
    keywords: keywords,
    canonical: currentUrl.split("page")[0],
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    pageUrl: publicRuntimeConfig.siteUrl,
    og_title: title,
    og_description: description,
    cat: urlParam?.brandName || brand || "",
    pageName,
    page: pageName,
  };

  pageSeo.jsonLdForOrganization = jsonLdForHomeOrganization() || "";

  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      title,
      description,
      keywords,
      `${publicRuntimeConfig.siteUrl}`,
      "",
      false
    ) || "";

  let singleMobile = specificationDetails || MobilesOfBrand?.[0] || {};

  if (pageName === "brand" || pageName === "specification") {
    pageSeo.jsonLdForSingleProductPage =
      jsonLdForSingleProductPage(
        mobileName || singleMobile?.title || "",
        description || "",
        singleMobile?.media || [],
        urlParam?.brandName || brand || singleMobile?.brand || "",
        { price: singleMobile?.price, priceCurrency: "Rs" }
      ) || "";
  }

  let itemList = latestNews?.slice(0, 5);

  pageSeo.jsonLdForItemList = jsonLdForItemList(
    currentUrl,
    itemList?.length,
    itemList
  );

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: title,
    description: description,
    seo_keywords: keywords,
    weburl: currentUrl,
  });

  let dynaMenu = [
    {
      label: "होम",
      url: "/",
      slug: "home",
    },
    {
      label: "टेक",
      url: "/news/tech/",
      target: "0",
      slug: "newstech",
    },
    {
      label: "मोबाइल",
      url: "/mobiles/",
      target: "0",
      slug: "mobiles",
    },
    {
      label: "न्यूज",
      url: "/mobiles/news/",
      target: "0",
      slug: "news",
    },
    {
      label: "लॉन्च/रिव्यू ",
      url: "/news/tech/launch-review/",
      target: "0",
      slug: "launch-review",
    },
    {
      label: "ऐप्स",
      url: "/news/tech/apps/",
      target: "0",
      slug: "apps",
    },
    {
      label: "एसेसरीज़",
      url: "/news/tech/accessories/",
      target: "0",
      slug: "accessories",
    },
  ];

  let specDetails = specificationDetails || {};

  let { screen_protection, screen_size, refresh_rate } =
    (specDetails?.display_specs_91?.length &&
      JSON.parse(specDetails?.display_specs_91)) ||
    {};

  let { chipset } =
    (specDetails?.performance_specs_91?.length &&
      JSON.parse(specDetails?.performance_specs_91)) ||
    {};

  let { capacity } =
    (specDetails?.battery_specs_91?.length &&
      JSON.parse(specDetails?.battery_specs_91)) ||
    {};

  let { front_camera, rear_camera } =
    (specDetails?.special_specs_91?.length &&
      JSON.parse(specDetails?.special_specs_91)) ||
    {};

  let { operating_system } =
    (specDetails?.general_specs_91?.length &&
      JSON.parse(specDetails?.general_specs_91)) ||
    {};

  let specFaq = [
    {
      question: `${mobileName} में कितने इंच का डिस्प्ले मिलेगा`,
      answer: `${mobileName} में ${screen_size} इंच का डिस्प्ले है, वहीं मोबाइल में रैम और प्रोसेसर की बात करें तो ${specDetails?.brand} इस मोबाइल फ़ोन में आपको ${specDetails?.ram_display} रैम और ${chipset} का प्रोसेसर मिलता है`,
      show: true,
    },
    {
      question: `${mobileName} में कितने हर्ट्ज का रिफ्रेश रेट मिलेगा`,
      answer: `${mobileName} में ${refresh_rate} रिफ्रेश रेट का डिस्प्ले है. ${specDetails?.brand} के इस मोबाइल फ़ोन में आपको ${specDetails?.ram_display} रैम के साथ ${capacity} की बैटरी और ${rear_camera} मेगा पिक्सेल का कैमरा मिलता है.`,
      show: true,
    },
    {
      question: `${mobileName} में डिस्प्ले कौन सा मिलेगा`,
      answer: `${mobileName} के डिस्प्ले पर ${screen_protection} प्रोटेक्शन है. ${specDetails?.brand} का यह मोबाइल फ़ोन ${capacity} बैटरी के साथ आता है और इसमें ${chipset} प्रोसेसर लगा हुआ है`,
      show: true,
    },
    {
      question: `${mobileName} में ऑपरेटिंग सिस्टम का कौन सा वर्जन मिलेगा`,
      answer: `${mobileName} मोबाइल फोन  ${operating_system} पर काम करता है. ${specDetails?.brand} के इस मोबाइल फ़ोन में यूजर्स को ${screen_size} इंच का डिस्प्ले मिलता है, यह मोबाइल फ़ोन ${rear_camera} मेगा पिक्सेल के प्राइमरी कैमरा और ${capacity} की बैटरी से लेस है.`,
      show: true,
    },
    {
      question: `${mobileName} में कितने मेगा पिक्सेल का कैमरा मिलेगा`,
      answer: `${mobileName} में ${rear_camera} का कैमरा है. ${mobileName} के इस मोबाइल फ़ोन में आपको ${front_camera} मेगापिक्सल का सेल्फी कैमरा भी मिलता है तो वहीं अगर मोबाइल की बैटरी लाइफ की बात की जाये तो इस मोबाइल में आपको ${capacity} की बैटरी भी मिलेगी।`,
      show: true,
    },
    { question: `${mobileName} में डिस्प्ले`, answer: ``, show: false },
    { question: `${mobileName} में डिस्प्ले`, answer: ``, show: false },
    { question: `${mobileName} में डिस्प्ले`, answer: ``, show: false },
    { question: `${mobileName} में डिस्प्ले`, answer: ``, show: false },
    { question: `${mobileName} में डिस्प्ले`, answer: ``, show: false },
  ];

  let pageData = {
    // webstories,
    menuData,
    pageAds,
    pageSeo,
    trendingTags: miscData.trendingTags || [],
    topTrending,
    footerData,
    currentUrl,
    districtList,
    urlParam,
    isMobile,
    topStories,
    photoStories,
    astroStories: astroStories["daily"] || astroStories,
    // categories: categories.data || categories,
    allMobileData,
    config: googleRemoteConfig,
    trendingMobileInStock,
    upcomingMobiles,
    latestNews,
    videos,
    mobileComparison,
    MobilesOfBrand,
    brandData,
    brandTitle: urlParam?.brandName || (arr && arr[0]) || urlParam?.name || "",
    specificationDetails: specificationDetails || {},
    otherMobilesOfBrand: otherMobilesOfBrand || [],
    brandDescription,
    specificationDescription,
    categoryName: "मोबाइल",
    dynaMenu,
    faq,
    specFaq,
    isMobile,
  };
  return { props: { pageData } };
};
export default mobileDataPage;
