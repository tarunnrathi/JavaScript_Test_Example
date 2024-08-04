import { STATIC_IMAGE } from "constant/global/Constant";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const getHomePageDefaultMeta = (metaDetails = {}) => {
  return {
    title:
      metaDetails.page_title ||
      "Hindi News: Hindi Samachar, Hindi News Live TV, India News in Hindi, हिंदी न्यूज़ लाइव, हिन्दी समाचार - News18 हिंदी",
    description:
      metaDetails.page_desc ||
      "Hindi News: Read Breaking News, Live Samachar in Hindi of Business, Sports, India, Education, Bollywood, Watch Live Hindi News TV and more on News18 हिंदी. हिंदी समाचार की लोकप्रिय वेबसाइट पर देश, दुनिया, कारोबार, खेल, मनोरंजन से जुड़ी साडी खबरें विस्तार मैं पढ़े - News18 हिंदी",
    keywords:
      metaDetails.page_keywords ||
      "Hindi news, news in hindi, breaking news in hindi, latest news in hindi, latest hindi news, today news in hindi, hindi news today, News18 हिंदी, India News, India Hindi News, हिंदी समाचार, ताजा समाचार",
    canonical: publicRuntimeConfig.siteUrl,
    og_image: STATIC_IMAGE.MAIN_SITE_LOGO,
    page: "Home",
  };
};

export const getSponsers = () => {
  return {
    "associate-partner": [
      {
        sponser_label: "ASSOCIATE PARTNER",
        click_tracker_logo:
          "http://pubads.g.doubleclick.net/gampad/clk?id=6086391509&iu=/1039154/NW18_HIND_Desktop/NW18_HIND_Desktop_CLICK_TRACKER/NW18_HIND_INDEPENDENCE_DAY_CLICK_TRACKER",
        impression_tracker_logo:
          "<script>\r\nvar a = \"https://pubads.g.doubleclick.net/gampad/adx?iu=/1039154/NW18_HIND_Desktop/NW18_HIND_Desktop_IMPRSN_TRACKER/NW18_HIND_INDEPENDENCE_DAY_IMPS_TRACKER_1x1&sz=1x1&d_imp=1&d_imp_hdr=1&c=\"\r\nvar randomnm = Math.random();$(document).ready(function(){$('#trackfrm').attr('src', a+randomnm.toString());});\r\n</script>",
        amp_impression_tracker_logo: "",
        uploaded_img_path:
          "https://images.news18.com/ibnkhabar/uploads/2022/08/105x45.jpg",
        upload_image_mobile:
          "https://images.news18.com/ibnkhabar/uploads/2022/08/105x45.jpg",
        uploaded_img_on_off: "1",
        image_alt: "INDIABULLS",
      },
      {
        sponser_label: "ASSOCIATE PARTNER",
        click_tracker_logo:
          "http://pubads.g.doubleclick.net/gampad/clk?id=6086391509&iu=/1039154/NW18_HIND_Desktop/NW18_HIND_Desktop_CLICK_TRACKER/NW18_HIND_INDEPENDENCE_DAY_CLICK_TRACKER",
        impression_tracker_logo:
          "<script>\r\nvar a = \"https://pubads.g.doubleclick.net/gampad/adx?iu=/1039154/NW18_HIND_Desktop/NW18_HIND_Desktop_IMPRSN_TRACKER/NW18_HIND_INDEPENDENCE_DAY_IMPS_TRACKER_1x1&sz=1x1&d_imp=1&d_imp_hdr=1&c=\"\r\nvar randomnm = Math.random();$(document).ready(function(){$('#trackfrm').attr('src', a+randomnm.toString());});\r\n</script>",
        amp_impression_tracker_logo: "",
        uploaded_img_path:
          "https://images.news18.com/ibnkhabar/uploads/2022/08/105x45.jpg",
        upload_image_mobile:
          "https://images.news18.com/ibnkhabar/uploads/2022/08/105x45.jpg",
        uploaded_img_on_off: "1",
        image_alt: "INDIABULLS",
      },
      {
        sponser_label: "ASSOCIATE PARTNER",
        click_tracker_logo:
          "http://pubads.g.doubleclick.net/gampad/clk?id=6086391509&iu=/1039154/NW18_HIND_Desktop/NW18_HIND_Desktop_CLICK_TRACKER/NW18_HIND_INDEPENDENCE_DAY_CLICK_TRACKER",
        impression_tracker_logo:
          "<script>\r\nvar a = \"https://pubads.g.doubleclick.net/gampad/adx?iu=/1039154/NW18_HIND_Desktop/NW18_HIND_Desktop_IMPRSN_TRACKER/NW18_HIND_INDEPENDENCE_DAY_IMPS_TRACKER_1x1&sz=1x1&d_imp=1&d_imp_hdr=1&c=\"\r\nvar randomnm = Math.random();$(document).ready(function(){$('#trackfrm').attr('src', a+randomnm.toString());});\r\n</script>",
        amp_impression_tracker_logo: "",
        uploaded_img_path:
          "https://images.news18.com/ibnkhabar/uploads/2022/08/105x45.jpg",
        upload_image_mobile:
          "https://images.news18.com/ibnkhabar/uploads/2022/08/105x45.jpg",
        uploaded_img_on_off: "1",
        image_alt: "INDIABULLS",
      },
    ],
    "co-presenting": [
      {
        sponser_label: "ASSOCIATE PARTNER",
        click_tracker_logo:
          "http://pubads.g.doubleclick.net/gampad/clk?id=6062457543&iu=/1039154/NW18_HIND_Desktop/NW18_HIND_Desktop_CLICK_TRACKER/NW18_HIND_1XBET_CRICKET_CLICK_TRACKER",
        impression_tracker_logo: "",
        amp_impression_tracker_logo: "",
        uploaded_img_path:
          "https://images.news18.com/staging/ibnkhabar/uploads/2022/07/11472935003921127199.jpg",
        upload_image_mobile:
          "https://images.news18.com/staging/ibnkhabar/uploads/2022/07/button_105x45_B.jpg",
        uploaded_img_on_off: "1",
        image_alt: "1XBET",
      },
    ],
  };
};

export const getTitle = (item) => {
  return item?.post_type === "webstory"
    ? item?.blog_title || item?.hindi_title
    : item?.display_headline || item?.headline;
};

export const getImage = (item) => {
  return item?.post_type === "webstory"
    ? item?.feature_img
    : item?.gif_n18_images && item?.gif_n18_images?.url
    ? item?.gif_n18_images?.url
    : item?.images?.url;
};

export const getAlt = (item) => {
  return item?.post_type === "webstory"
    ? item?.blog_title || item?.hindi_title
    : item?.gif_n18_images && item?.gif_n18_images?.alt
    ? item?.gif_n18_images?.alt
    : item?.display_headline || item?.headline;
};
