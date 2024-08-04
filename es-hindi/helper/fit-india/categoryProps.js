import getConfig from "next/config";
import { getArticleList } from "api_dns/global/Common";
import { ignoreQueryParams } from "includes/article.util";
import { getSetTargettingValues } from "includes/helper";
import sfetchUtilityDirect from "includes/sFetchUtilityDirect";

const { publicRuntimeConfig } = getConfig();

const categoryProps = async (context) => {
    let protocol = "https://";
    const { host } = context.req.headers;
    if (host.indexOf("localhost") > -1) {
        protocol = "http://";
    }
    const headerData =
        context.req.headers && JSON.parse(JSON.stringify(context.req.headers));
    let isMobile = false;

    if (
        headerData &&
        typeof headerData["x-akamai-device-characteristics"] !== "undefined"
    ) {
        if (
            headerData &&
            headerData["x-akamai-device-characteristics"] === "is_mobile=true"
        ) {
            isMobile = true;
        }
    } else {
        const userAgent =
            context.req.headers && context.req.headers["user-agent"];
        isMobile = Boolean(
            userAgent.match(
                /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
            )
        );
    }

    const currentUrl = ignoreQueryParams(protocol + host + context.req.url, false).toLowerCase();
    const urlParam = context.query;
    let category_slug = (urlParam?.slug || "")?.toLowerCase();
    let eventDayData = {};
    eventDayData = await sfetchUtilityDirect(
        `${publicRuntimeConfig.engApiUrl}/get-redis?key=NEWS18:microsite_data_speaker_85&allow_prefix=false`, []);
    const sponsorData = await sfetchUtilityDirect(
        `${publicRuntimeConfig.engApiUrl}/get-redis?key=NEWS18:microsite_sponsor_1&allow_prefix=false`, []);
    const foodDescription = `इस सेक्शन में खान-पान, आहार और पोषण से जुड़े विषयों को शामिल किया जाता है, जिनसे आपको अपने रोजमर्रा के जीवन में क्या खाना है और कैसे जीना है,
     के मसलों पर सही और विशेष मदद मिल सके.`;
    const healthDescription = `इस सेक्शन में कई तरह की बीमारियों और विकारों के बारे में जानकारी दी जाती है. रोग और उसके उपचार से जुड़ी यह कैटिगरी आपको
     सटीक और नवीनतम सूचना देती है ताकि आप अपनी सेहत से जुड़े फैसले सही जानकारी के आधार पर ले सकें.`;
    const fitnessDescription = `इसमें एक्सरसाइज़ से जुड़े रुटीन, वर्कआउट प्लान, फिटनेस उपकरण, और डायट को लेकर परामर्श दिए जाते हैं जिनसे आपके
     शारीरिक स्वास्थ्य और फिटनेस को बेहतर करने में मदद मिलती है. हमारा मकसद आपको सही और व्यावहारिक सलाह देकर स्वस्थ्य जीवनशैली अपनाने के लिए प्रोत्साहित करना है जिसे
      आप नियमित एक्सरसाइज़ और संतुलित भोजन से कायम रख सकते हैं.`;
    const diseaseDescription = `इसमें कई तरह की बीमारियों और विकारों के बारे में जानकारी दी जाती है. रोग और उसके उपचार से जुड़ी यह कैटिगरी आपको सटीक और नवीनतम सूचना देती है ताकि
     आप अपनी सेहत से जुड़े फैसले सही जानकारी के आधार पर ले सकें.`;
    const parentingDescription = `यह नए और भावी पैरेंट्स पर केंद्रित सेक्शन है जिसमें उन्हें व्यापक जानकारी, टिप्स, और परामर्श दिए जाते हैं.
     हमारा मकसद अभिभावकों को इस रोमांचक मगर मुश्किल यात्रा में सहयोग करना और मार्गदर्शन देना है,
      जिसके लिए हम उन्हें एक्सपर्ट सलाह, मददगार संसाधन और गहरी बारीक दृष्टि प्रदान करते हैं. ताकि, नए माता-पिता
       अपने जीवन के इस चरण को आत्मविश्वास और आराम से नेविगेट कर सकें.`;
    const womenHealthDescription = `इस सेक्शन में महिलाओं के शारीरिक, मानसिक, और भावनात्मक स्वास्थ्य से जुड़े तमाम विषयों को शामिल किया गया है.
     हमारा मकसद महिलाओं को बेहतर स्वास्थ्य के लिए एजुकेट करते हुए मदद मुहैया करवाना है. इसमें स्वस्थ्य जीवनशैली के विकल्प,
      प्रीवेंटिव देखभाल, और स्वास्थ्य समस्याओं का समय से पता लगा पाना जैसे विषय शामिल है.`;
    const ayurvedaDescription = `इस सेक्शन में आयुर्वेद के सिद्धातों के मुताबिक उपचार और थेरेपी को शामिल किया गया है. साथ ही, यह भी बताया गया है कि
     अपने रोज़मर्रा के जीवन में बेहतरीन सेहत कैसे प्राप्त की जा सकती है.`;
    let categoryTitle = '';
    let categoryDescription = '';
    let topic_category = '';
    if (category_slug === 'food-nutrition/') {
        topic_category = "nutrition";
        categoryTitle = 'फूड और न्यूट्रिशन';
        categoryDescription = foodDescription;
    } else if (category_slug === 'mental-health/') {
        topic_category = "mental-health";
        categoryTitle = 'मानसिक स्वास्थ्य';
        categoryDescription = healthDescription;
    } else if (category_slug === 'fitness/') {
        topic_category = "fitness";
        categoryTitle = 'फिटनेस';
        categoryDescription = fitnessDescription;
    } else if (category_slug === 'diseases-treatment/') {
        topic_category = "disease";
        categoryTitle = 'रोग और उपचार';
        categoryDescription = diseaseDescription;
    } else if (category_slug === 'pregnancy-parenting/') {
        topic_category = "pregnancy";
        categoryTitle = 'प्रेग्नेंसी और पैरेंटिग';
        categoryDescription = parentingDescription;
    } else if (category_slug === 'women-health/') {
        topic_category = "women-health";
        categoryTitle = 'महिला स्वास्थ्य';
        categoryDescription = womenHealthDescription;
    } else if (category_slug === 'ayurveda/') {
        topic_category = "ayurvedic";
        categoryTitle = 'आयुर्वेद';
        categoryDescription = ayurvedaDescription;
    }
    else {
        eventDayData && eventDayData !== undefined ? (eventDayData?.data['NEWS18:microsite_data_speaker_85']?.data?.[0]?.data || []).forEach((item) => {
            category_slug = item.designation;
            topic_category= item.designation;
            categoryTitle = item.name;
            categoryDescription = item.company;

        }) : "";
    }

    const topic = topic_category;

    let articleTagResult = [];
    // const subString = topic ? `tag_topic:("${topic}")` : '';

    const pageNumber = parseInt(urlParam.page) || 1;
    const pageLimit = (isMobile) ? 16 : 24;
    const offset = (pageNumber) ? (pageNumber - 1) * pageLimit : 0;
    articleTagResult =await getArticleList({
        count: pageLimit,
        offset: offset,
        fields: "display_headline,post_type,weburl,images,intro",
        filter: { post_type: "text", "tags.slug": topic },
      });

    const { siteUrl } = publicRuntimeConfig;
    let page_title = '';
    let page_description = '';
    let page_keywords = '';
    let og_image_i = '';

    page_title = "Fit India Hit India - Get Daily Health and Wellness Tips, Mental Health, Anxiety, Women’s Health News - News18";
    page_description = `Fit India Hit India: News18 is set to bring in India’s largest digital-only 
    health initiative, focusing on health and wellness on how to build a strong immune system and all
     aspects of Mental health issues, Get Daily Health and Wellness Tips including, Women’s Health,
      depression and anxiety, Sexual Health, Diabetes, Latest Health news updates - News18.com`;
    page_keywords = `Health, Health news, Mental health issues, anxiety, spiritual health, food & nutrition,
     Mental Health, Women’s Health, Ayurveda, Sexual Health, Health Tips, Diabetes, Nutrition, Infertility,
      Fitness, Hypertension, Healthy Recipes, lifestyle articles,`;
    og_image_i = "https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/health-logo.jpg";

    const pageSeo = {
        title: page_title || "404 Not Found",
        description: page_description,
        keywords: page_keywords,
        canonical: (currentUrl.split('page')[0] || "").toLowerCase(),
        ogImage: og_image_i,
        pageUrl: siteUrl,
        og_title: page_title,
        og_description: page_description
    };

    const pageAds = {};
    pageAds.setTargetingValues = getSetTargettingValues({
        headline: pageSeo.title,
        description: pageSeo.description,
        seo_keywords: pageSeo.keywords,
        weburl: currentUrl,
        article_id: "",
        content_type: "fit-india-hit-india",
        block_ads: "no",
    });

    const pageData = {
        articleTagResult,
        categoryTitle,
        categoryDescription,
        currentUrl,
        urlParam,
        isMobile,
        topic,
        pageSeo,
        pageAds,
        eventDayData,
        sponsorData,
    };
    // Pass data to the page via props
    return { props: { pageData } };
};
export default categoryProps;
