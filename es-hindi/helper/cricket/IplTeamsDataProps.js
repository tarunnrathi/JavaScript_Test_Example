import { checkDevice, getSetTargettingValues } from "includes/helper";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import {
  jsonLdForCricketSiteNavigation,
  jsonLdForWebPage,
} from "includes/schema.util";
import { arrayOnly } from "includes/article.util";
import { IPLPage as homeAds } from "includes/Desktop/dfpAdIds";
import { IPLPage as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { IPL_SERIES_ID ,IPL_YEAR} from "includes/ipl.helper";
import { TaboolaList } from "includes/Tabola.helper";
import { getRedisDataByMultiKey, getCricketData, getMenu, getRedisDataByKey } from "api_dns/global/Common";
const teamsIdByName = {
  "gujarat-titans-gt": 2955,
  "rajasthan-royals-rr": 1110,
  "lucknow-super-giants-lsg": 2954,
  "royal-challengers-bengaluru-rcb": 1105,
  "delhi-capitals-dc": 1109,
  "punjab-kings-pbks": 1107,
  "kolkata-knight-riders-kkr": 1106,
  "sunrisers-hyderabad-srh": 1379,
  "chennai-super-kings-csk": 1108,
  "mumbai-indians-mi": 1111,
};
const teamsMetaData = {
  "royal-challengers-bengaluru-rcb": {
    title: `Royal Challengers Bangalore ${IPL_YEAR} - Latest News, Records, Stats, Squad & History of RCB, IPL ( Indian premier league) | News18 हिंदी`,
    desc: `रॉयल चैलेंजर्स बैंगलोर (RCB): विराट कोहली की अगुवाई में लंबे समय तक खेलने वाली आरसीबी की टीम इस बार नए कप्तान के साथ उतरेगी. उसने आईपीएल नीलामी के जरिये दक्षिण अफ्रीका के फाफ डू
     प्लेसी को अपनी टीम में शामिल किया और उन्हें कप्तान बनाए जाने की घोषणा कर दी है. रॉयल चैलेंजर्स बैंगलोर (Royal Challengers Bangalore) ने विराट कोहली के अलावा ग्लेन मैक्सवेल
      और मोहम्मद सिराज को रीटेन किया. उसने मेगा ऑक्शन में 19 खिलाड़ी खरीदे. इनमें सुयश प्रभुदेसाई, अनुज रावत, शाहबाज अहमद, आकाश दीप, अनीश्वर गौतम, जेसन बेहरनड्रॉफ,
      जोश हेजलवुड, दिनेश कार्तिक, हर्षल पटेल, फाफ डुप्लेसी, क्षमा मिलिंद, वानिंदु हसरंगा, महिलाल लोमरोर, शरफेन रदरफोर्ड, फिन एलेन, कर्ण शर्मा, डेविड विली, लुवनिथ सिसोदिया, सिद्धार्थ कॉल शामिल हैं.`,
    keyword: "RCB today squad, Royal Challengers Bangalore updated records, Royal Challengers Bangalore stats, RCB history, RCB team sponsors, RCB latest news, Royal Challengers Bangalore News"
  },
  "kolkata-knight-riders-kkr": {
    title: `Kolkata Knight Riders ${IPL_YEAR} - Latest News, Records, Stats, Squad & History of KKR, IPL ( Indian premier league) | News18 हिंदी`,
    desc: `कोलकाता नाइट राइडर्स (KKR): 2 बार की चैंपियन कोलकाता नाइट राइडर्स (Kolkata Knight Riders) इस बार नए कप्तान श्रेयस अय्यर के साथ उतरेगी. श्रेयस पिछले साल दिल्ली के साथ थे और केकेआर ने 
    इस बार उन्हें 12 करोड़ से अधिक बोली लगाकर टीम में जोड़ लिया. केकेआर ने रीटेंशन पॉलिसी के तहत आंद्रे रसेल, सुनील नरेन,
     वेंकटेश अय्यर और वरुण चक्रवर्ती को पहले ही रीटेन रखा था. उसने नीलामी के जरिये नीतीश राणा,
     अनुकूल राय, अजिंक्य रहाणे, रिंकू सिंह, रासिख सलाम, पैट कमिंस, शिवम मावी, शेल्डन जैक्शन, बाबा इंद्रजीत, अभिजीत तोमर,
      चमिका करुणारत्ने, प्रथम सिंह, अशोक शर्मा, रमेश कुमार, टिम साउदी, एलेक्स हेल्स, सैम बिलिंग्स,
      उमेश यादव, मोहम्मद नबी को भी अपने साथ जोड़ लिया है.`,
    keyword: "KKR today squad, Kolkata Knight Riders updated records, Kolkata Knight Riders stats, KKR history, KKR team sponsors, KKR latest news, Kolkata Knight Riders News"
  },
  "punjab-kings-pbks": {
    title: `Punjab Kings ${IPL_YEAR} - Latest News, Records, Stats, Squad & History of PBKS, IPL ( Indian premier league) | News18 हिंदी`,
    desc: `पंजाब किंग्स (PBKS): पंजाब किंग्स (Punjab Kings) ने पिछले दो सीजन में खराब प्रदर्शन के बाद आईपीएल ${IPL_YEAR} के लिए अपनी 
    टीम को पूरी तरह बदल दिया है. पंजाब किंग्स ने अपने कप्तान केएल राहुल तक को रिलीज कर दिया. उसने सिर्फ दो खिलाड़ियों मयंक अग्रवाल
     और अनकैप्ड अर्शदीप सिंह को ही रीटेन किया. ज्यादा खिलाड़ियों को रिलीज करने के चलते पंजाब किंग्स आईपीएल ऑक्शन में सबसे अधिक
      72 करोड़ के पर्स के साथ उतरी. इसी दमदार पर्स की बदौलत पंजाब ने 23 खिलाड़ी खरीदे. इनमें शिखर धवन, कैगिसो रबाडा, जॉनी बेयरस्टो,
       राहुल चाहर, हरप्रीत बरार, शाहरुख खान, जितेश शर्मा, प्रभसिमरन सिंह, ईशान पोरेल, लियाम लिविंगस्टोन, ओडियन स्मिथ, संदीप शर्मा,
        राज बावा, ऋषि धवन, नाथन एलिस, अथर्व तांडे, प्रेरक मांकड़, भानुका राजपक्शे, बेनी हॉवेल, वैभव अरोड़ा, रितिक चटर्जी, बलतेज ढांडा,
         अंश पटेल शामिल हैं.`,
    keyword: "PBKS today squad, Punjab Kings updated records, Punjab Kings stats, PBKS history, PBKS team sponsors, PBKS latest news, Punjab Kings News"
  },
  "delhi-capitals-dc": {
    title: `Delhi Capitals ${IPL_YEAR} - Latest News, Records, Stats, Squad & History of DC, IPL ( Indian premier league) | News18 हिंदी`,
    desc: `दिल्ली कैपिटल्स (DC): दिल्ली कैपिटल्स (Delhi Capitals) ने एक बार फिर मजबूत टीम बनाई है. दिल्ली ने रीटेंशन पॉलिसी के
     तहत अपने कप्तान ऋषभ पंत (Rishabh Pant), पृथ्वी शॉ (Prithvi Shaw), एनरिक नॉर्किया (Anrich Nortje) और अक्षर पटेल
      (Axar Patel) को पहले ही अपने साथ जोड़ रखा था. रीटेंशन पॉलिसी के चलते टीम को शिखर धवन (Shikhar Dhawan),
       कैगिसो रबाडा (Kagiso Rabada) श्रेयस अय्यर और मार्कस स्टोइनिस को छोड़ना पड़ा. दिल्ली ने इसकी भरपाई नीलामी में डेविड वार्नर,
        मिचेल मार्श, सरफराज खान, केएस भरत, शार्दुल ठाकुर, कुलदीप यादव, कमलेश नागरकोटी, मुस्तफिजुर रहमान, अश्विन हेब्बार,
         मनदीप सिंह, खलील अहमद, चेतन सकारिया, ललित यादव, रिपल पटेल, यश धुल, रोवमैन पॉवेल, प्रवीण दुबे, लुंगी एनगिडी, टिम साइफर्ट को
          अपने साथ जोड़कर की.`,
    keyword: "DC today squad, Delhi Capitals updated records, Delhi Capitals stats, DC history, DC team sponsors, DC latest news, Delhi Capitals News"
  },
  "mumbai-indians-mi": {
    title: `Mumbai Indians ${IPL_YEAR} - Latest News, Records, Stats, Squad & History of MI, IPL ( Indian premier league) | News18 हिंदी`,
    desc: `मुंबई इंडियंस (MI): पांच बार की चैंपियन मुंबई इंडियंस (Mumbai Indians) की कमान इस बार भी रोहित शर्मा के हाथों में है, लेकिन टीम
     की सूरत काफी बदल गई है. आईपीएल के मेगा ऑक्शन के बाद पिछले साल की टीम के कई सितारे अब दूसरी टीमों की ताकत बन चुके हैं.
      हालांकि, कोर टीम अब भी मजबूत है. इसकी वजह यह है कि मुंबई इंडियंस ने रीटेंशन पॉलिसी (Retention Policy) के तहत अपने
       कप्तान रोहित शर्मा के साथ-साथ जसप्रीत बुमराह, कायरन पोलार्ड और सूर्यकुमार यादव को रीटेन कर लिया था. इसके बाद उसने ईशान
        किशन को भी बड़ी बोली लगाकर अपनी टीम से जोड़ लिया. मुंबई इंडियंस ने सिंगापुर के टिम डेविड डेवाल्ड ब्रेविस, एम अश्विन, बासिल थंपी,
         फैबियन एलन, आर्यन जुयाल, अर्जुन तेंदुलकर, हृतिक शौकीन, राहुल बुद्धि, रमनदीप सिंह, अनमोलप्रीत सिंह, अरशद खान, राइली मेडरिथ,
          टायमल मिल्स, डेनियल सेम्स, जोफ्रा आर्चर, संजय यादव, एन तिलक वर्मा, मयंक मार्कंडे, जयदेव उनादकट को भी अपनी टीम में जोड़ लिया है. `,
    keyword: "MI today squad, Mumbai Indians updated records, Mumbai Indians stats, MI history, MI team sponsors, MI latest news, Mumbai Indians News"
  },
  "sunrisers-hyderabad-srh": {
    title: `Sunrisers Hyderabad ${IPL_YEAR} - Latest News, Records, Stats, Squad & History of SRH, IPL ( Indian premier league) | News18 हिंदी`,
    desc: `सनराइजर्स हैदराबाद (SRH): सनराइजर्स हैदराबाद (Sunrisers Hyderabad) आईपीएल ${IPL_YEAR} के मेगा ऑक्शन में एक बार फिर कप्तान केन
     विलियम्सन की अगुवाई में उतरेगी. सनराइजर्स ने विलियम्सन के अलावा ऑलराउंडर अब्दुल समद और उमरान मलिक को रीटेन किया. इसके बाद
      उसने राहुल त्रिपाठी, अभिषेक शर्मा, निकोलस पूरन, प्रियम गर्ग,  वॉशिंगटन सुंदर, भुवनेश्वर कुमार, जे सुचित, श्रेयस गोपाल, कार्तिक त्यागी, टी नटराजन,
       फजल फारुखी, विष्णु विनोद, सौरभ दूबे, शशांक सिंह, आर. समर्थ, सीन एबॉट, रोमारियो शेफर्ड, मार्को यानसेन, एडेन मार्करम को अपनी टीम में शामिल कर लिया है. `,
    keyword: "SRH today squad, Sunrisers Hyderabad updated records, Sunrisers Hyderabad stats, SRH history, SRH team sponsors, SRH latest news, Sunrisers Hyderabad News"
  },
  "rajasthan-royals-rr": {
    title: `Rajasthan Royals ${IPL_YEAR} - Latest News, Records, Stats, Squad & History of RR, IPL ( Indian premier league) | News18 हिंदी`,
    desc: `राजस्थान रॉयल्स (RR): राजस्थान रॉयल्स ( Rajasthan Royals) ने आईपीएल ${IPL_YEAR} के मेगा ऑक्शन के माध्यम से बेहतरीन टीम बनाई है.
     उसने रीटेंशन पॉलिसी के तहत तीन अहम खिलाड़ियों संजू सैमसन, जोस बटलर और यशस्वी जायसवाल को अपने साथ बरकरार रखा था. इसके बाद उसने देवदत्त
      पडिक्कल, शिमरोन हेटमायर, रियान पराग, आर अश्विन, ट्रेंट बोल्ट, युजवेंद्र चहल, प्रसिद्ध कृष्णा, केसी करियप्पा, नवदीप सैनी, ओबेड मेकॉय, अनुनय सिंह, कुलदीप सेन,
       करुण नायर, ध्रुव जुरेल, तेजस बारोका, कुलदीप यादव, शुभमन गढ़वाल, नाथन कूल्टर नाइल, रासी वेन डर डुसेन, डेरिल मिचेल को अपनी टीम से जोड़ लिया है. `,
    keyword: "RR today squad, Rajasthan Royals updated records, Rajasthan Royals stats, RR history, RR team sponsors, RR latest news, Rajasthan Royals News"
  },
  "chennai-super-kings-csk": {
    title: `Chennai Super Kings ${IPL_YEAR} - Latest News, Records, Stats, Squad & History of CSK, IPL ( Indian premier league) | News18 हिंदी`,
    desc: `चेन्नई सुपर किंग्स (CSK): 4 बार की चैंपियन चेन्नई सुपरकिंग्स (Chennai Super Kings) एक बार फिर महेंद्र सिंह धोनी की अगुवाई में उतरेगी.
     डिफेंडिंग चैंपियन चेन्नई ने कप्तान धोनी (MS Dhoni) के अलावा रवींद्र जडेजा (Ravindra Jadeja), मोईन अली (Moeen Ali) और ऋतुराज गायकवाड़ 
     (Ruturaj Gaikwad) को रीटेन किया है. इसके अलावा उसने नीलामी के जरिये अंबाती रायडू, रॉबिन उथप्पा, डेवोन कॉनवे, ड्वेन ब्रावो, क्रिस जॉर्डन, शिवम दुबे, दीपक चाहर,
      सिमरजीत सिंह, ड्वेन प्रिटोरियस, मिचेल सैंटनर, एडम मिल्ने, राजवर्धन हंगरगेकर, प्रशांत सोलंकी, महेश तीक्षणा, मुकेश चौधरी, शुभांशु सेनापति, केएम आसिफ, तुषार देशपांडे, सी. हरि निशांत,
       एन. जगदीशन, के. भगत वर्मा को अपनी टीम में शामिल किया है. `,
    keyword: "CSK today squad, Chennai Super Kings updated records, Chennai Super Kings stats, CSK history, CSK team sponsors, CSK latest news, Chennai Super Kings News"
  },
  "gujarat-titans-gt": {
    title: `Gujarat Titans ${IPL_YEAR} - Latest News, Records, Stats, Squad & History of GT, IPL ( Indian premier league) | News18 हिंदी`,
    desc: `गुजरात टाइटंस (GT): अहमदाबाद की फ्रेंचाइजी को सीवीसी कैपिटल (CVC Capital) ने खरीदा है. इस टीम का आधिकारिक नाम गुजरात टाइटंस (Gujarat Titans) है.
     टीम ने ऑलराउंडर हार्दिक पंड्या (15 करोड़), लेग स्पिनर राशिद खान (15 करोड़) और टॉप ऑर्डर के बल्लेबाज शुभमन गिल (8 करोड़) को ऑक्शन से पहले रीटेन किया है.
      हार्दिक को ही कप्तान बनाया गया है. गुजरात टाइटंस ने इसके बाद आईपीएल ऑक्शन के जरिये मोहम्मद शमी, डेविड मिलर, ऋद्धिमान साहा, मैथ्यू वेड, जेसन रॉय, लॉकी फर्ग्युसन,
       अभिनव सदारंगनी, राहुल तेवतिया, नूर अहमद, आर साई किशोर, डॉमिनिक ड्रेक्स, विजय शंकर, जयंत यादव, दर्शन नालकंडे, यश दयाल, बी साई सुदर्शन, गुरकीरत सिंह, अल्जारी जोसेफ, वरुण आरोन,
        प्रदीप सांगवान को अपने साथ जोड़ लिया है. सीवीसी ने 5,625 करोड़ रुपए में अहमदाबाद की फ्रेंचाइजी खरीदी है. `,
    keyword: "GT today squad, Gujarat Titans updated records, Gujarat Titans stats, GT history, GT team sponsors, GT latest news, Gujarat Titans News"
  },
  "lucknow-super-giants-lsg": {
    title: `Lucknow Super Giants ${IPL_YEAR} - Latest News, Records, Stats, Squad & History of LSG, IPL ( Indian premier league) | News18 हिंदी`,
    desc: `लखनऊ सुपर जायंट्स (LSG): आईपीएल की नई फ्रेंचाइजी लखनऊ ने टीम का नाम लखनऊ सुपर जायंट्स (Lucknow Super Giants) रखा है. आरपी-संजीव गोयनका ग्रुप,
     ने ही 2016 और 2017 में राइजिंग पुणे सुपरजायंट्स टीम खरीदी थी. इसी ग्रुप ने अक्टूबर 2021 में लखनऊ टीम को भी 7,090 करोड़ रुपए में खरीदा. आक्रामक बल्लेबाज केएल राहुल
      (KL Rahul) को टीम का कप्तान बनाया गया है. उन्हें टीम की ओर 17 करोड़ रुपए दिए गए हैं. इसके अलावा ऑस्ट्रेलिया के ऑलराउंडर मार्कस स्टोइनिस (Marcus Stoinis) और लेग स्पिनर रवि बिश्नोई
       (Ravi Bishnoi) को भी नीलामी से पहले ही टीम में शामिल किया है. लखनऊ सुपर जायंट्स ने इसके अलावा नीलामी के जरिये क्विंटन डिकॉक, मनीष पांडे, दीपक हुडा,  क्रुणाल पंड्या, जेसन होल्डर,
        आवेश खान, मार्क वुड, अंकित राजपूत, कृष्णप्पा गौतम, दुष्मंता चमीरा, शाहबाज नदीम, मनन वोहरा, मोहसिन खान, आयुष बधोनी, काइली मेयर्स, करण शर्मा, एविन लुईस को अपनी टीम से जोड़ लिया है. `,
    keyword: "LSG today squad, Lucknow Super Giants updated records, Lucknow Super Giants stats, LSG history, LSG team sponsors, LSG latest news, Lucknow Super Giants News"
  },
};
const getCurrentURL = (context) => {
  let protocol = "https://";
  const { host = "" }= context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  return protocol + host + context.req.url;
};
const getPlayersDataBySkill = (players = []) => {
  const batsman = players.filter((player) => player.skill_id === "1");
  const allRounder = players.filter((player) => player.skill_id === "3");
  const wicketKeeper = players.filter(
    (player) => player.skill_id === "4"
  );
  const bowler = players.filter((player) => player.skill_id === "2");
  return { batsman, allRounder, wicketKeeper, bowler };
};
const iplTeamsProps = async (context) => {
  const { teamId } = context.query || {};
  const teamSerial = teamsIdByName[teamId] || "";
  const isMobile = checkDevice(context);
  const currentUrl = getCurrentURL(context);
  const teamMetaData = teamsMetaData[teamId] || {};
  let name = "";
  let short_name = "";
  if (!teamId || !teamSerial) {
    return {
      notFound: true,
    };
  }
  if (teamId) {
    const teamWordArr = teamId.split("-");
    short_name = teamWordArr.pop();
    name = teamWordArr
      .map((str) => str[0].toUpperCase() + str.substring(1))
      .join(" ");
  }
  const paramObj = {
    teamName: name,
    teamShortName: short_name.toUpperCase(),
  };
  const multiRedisString = "KHABARN18-new_fms_system,CRICKETNEXT:mainmenu,KHABARN18-NW_SALES_BANNERS_hindi,KHABARN18-NW_IPL_SEO_MANAGE_2022";
  let footerData = [], crMenu = [], sales_banner = [], seoData = {};
  let [
      menuData = {},
      teamsData = [],
      // districtList = {},
      ImageIdsAvailable = [],
      redisMultiResults = [],
      liveTvFlag= {},
  ] = await Promise.allSettled([
      getMenu(isMobile),
      getCricketData(`squad/${teamSerial}/${IPL_SERIES_ID}`),
      // getDistricts(),
      [],
      getRedisDataByMultiKey(multiRedisString),
      getRedisDataByKey("rammandirtv", "KHABARN18-")
  ]).then(temp => temp?.map(r=>r.value)).catch();
  if (Object.keys(redisMultiResults)?.length > 0) { 
      let keys = Object.keys(redisMultiResults);   
      [footerData, crMenu, sales_banner, seoData] = keys.map(i => redisMultiResults[i]? redisMultiResults[i]: []);
  }
  let _1xbetData = {};
  let showBannerInIPL = false;
  let bannerData1 = Object.values(sales_banner);
  bannerData1 = bannerData1.filter((banner) => (banner.campagin_name?.includes("IPL 2023 - Hindi")||banner.campagin_name?.includes("Lok Sabha Election 2024")));
  if (bannerData1.length > 1) {
    const sponserObj = {};
    bannerData1?.forEach((banner) => {
      Object.assign(sponserObj,banner?.sponserdata);
    })
    _1xbetData = sponserObj;
  }else{
    _1xbetData = bannerData1[0]?.sponserdata || {};
  }
  const pageAds = isMobile ? homeMobileAds() : homeAds();
  const teamBySkill = getPlayersDataBySkill(
    teamsData?.player || []
  );
  let breadCrumbArray = [];
  const baseURL = publicRuntimeConfig.siteUrl;
  breadCrumbArray = [
    { slug: baseURL, value: 'होम' },
    { slug: baseURL + "cricket/", value: 'क्रिकेट' },
    { slug: baseURL + "cricket/ipl/", value: `IPL ${IPL_YEAR}`},
    { slug: currentUrl, value: paramObj.teamName }
  ];
  const pageSeo = {
    title: teamMetaData.title,
    keywords: teamMetaData.keyword,
    description: teamMetaData.desc,
    canonical: publicRuntimeConfig.siteUrl + `cricket/ipl/${teamId}/`,
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/newsogimg_1632296929.jpg",
    isCricketNextHome: true,
    page: "points-tables",
    breadCrumbArray
  };
  const jsonLdName = teamsMetaData[teamId].title;
  const jsonLdDesc = teamsMetaData[teamId].desc;
  const jsonLdKeyword = teamsMetaData[teamId].keyword;
  pageSeo.jsonLdForWebPage =
    jsonLdForWebPage(
      jsonLdName,
      jsonLdDesc,
      jsonLdKeyword,
      publicRuntimeConfig.siteUrl + `cricket/ipl/${teamId}/`,
      null,
      false,
      false,
      false
    ) || "";
  pageSeo.jsonLdForCricketSiteNavigation = jsonLdForCricketSiteNavigation(
    arrayOnly(crMenu)
  );
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: "IPL",
    block_ads: "no",
  });
  const taboolaList = TaboolaList.category;
  const pageData = {
    isMobile,
    currentUrl,
    pageAds,
    pageSeo,
    footerData,
    // districtList,
    seoData: pageSeo,
    teamsData: teamBySkill,
    paramObj,
    ImageIdsAvailable,
    teamId,
    showBannerInIPL,
    _1xbetData,
    taboolaList,
    menuData,
    liveTvFlag
  };
  return { props: { pageData } };
};
export default iplTeamsProps;