import SiteAd from "widgets/Common/Responsive/SiteAd";

export const IPL_YEAR = '2024';

export const displayAds = (adsType) => {
    return adsType && (
        <div className="add">
            <div className="addinner-box">
              <SiteAd
                  width={336}
                  height={280}
                  adUnit={adsType}
                  sizes={[[300, 250], [336, 280]]}
                  lazyload={true}
                ></SiteAd>
            </div>
          </div>
    );
};

export const getConvertedDateFormat = (time) => {
  return time
    .toString()
    .replace(
      /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
      "$1-$2-$3 $4:$5:$6"
    );
};

export const PURPLE_CAP_HEADER = [
  { id: 2, name: "Player" },
  { id: 3, name: "Team" },
  { id: 4, name: "Matches" },
  { id: 5, name: "WKTS" },
];

export const ORANGE_CAP_HEADER = [
  { id: 2, name: "Player" },
  { id: 3, name: "Team" },
  { id: 4, name: "Matches" },
  { id: 5, name: "Runs" },
];

export const IPL_SERIES_ID = '5970';
export const IPL_SERIES_NAME = `ipl-${IPL_YEAR}`;

export const getTeamNameSlug = (teamName) => {
  const team = teamName.toLowerCase();
  return team.replace(/ /gi, "-");
};

export const filterTrackerData = (dataList) => {
  const field = {};
  dataList?.forEach((data) => {
    if (typeof data === "object") {
      const title = data.title || "";
      const key = (title || "")?.replace(/ /g, "_").toLowerCase();
      field[key] = data["title_value"];
    }
  });
  return field;
};

export const TEST_DESCRIPTION = `आईसीसी की ओर से 12 देशों को टेस्ट खेलने की अनुमति दी गई है. वे ही देश टेस्ट खेल सकते हैं, जिन्हें आईसीसी (ICC) की पूर्ण सदस्यता मिली हुई हो. आईसीसी के आज 100 से अधिक सदस्य हैं. टेस्ट रैंकिंग (ICC Test Rankings) हर सीरीज के बाद बदलती है. 2019 में वर्ल्ड टेस्ट चैंपियनशिप की शुरुआत की गई. इससे पहले टॉप पर रहने वाली टीम के पास गदा रहती है. 1 अप्रैल को उसे गदा के साथ प्राइज मनी भी आईसीसी की ओर से दी जाती थी. अब वर्ल्ड टेस्ट चैंपियनशिप का फाइनल जीतने वाली टीम को गदा दी जाती है. 2003 में आधिकारिक तौर पर इसकी शुरुआत की गई थी. 2003 से 2019 तक की बात करें तो ऑस्ट्रेलिया की टीम 8 बार साल के अंत में नंबर-1 पर रही. टीम इंडिया 5 बार, साउथ अफ्रीका 3 और इंग्लैंड की टीम एक बार नंबर-1 पर काबिज रही. टेस्ट क्रिकेट का सबसे पुराना फॉर्मेट है. इसकी शुरुआत 1877 में हुई थी. जून 2021 में खत्म हुए पहले वर्ल्ड टेस्ट चैंपियनशिप का खिताब न्यूजीलैंड ने जीता. फाइनल में न्यूजीलैंड ने भारत को हराया था. वर्ल्ड टेस्ट चैंपियनशिप के दूसरे सीजन की भी शुरुआत हो चुकी है. टेस्ट को रोमांचक बनाने के लिए आईसीसी ने इसे शुरू किया है.`;
export const ODI_DESCRIPTION = `आईसीसी की ओर से वनडे रैंकिंग में (ICC ODI Rankings) 20 देशों को शामिल किया गया है. हर मैच के बाद रैंकिंग में बदलाव होता है. 2002 में इसकी टीम रैंकिंग की आधिकारिक तौर पर शुरुआत की गई थी. 2013 तक 1 अप्रैल को टॉप पर रहने वाली टीम को ट्रॉफी और प्राइज मनी दी जाती थी. इसके बाद रैंकिंग का उपयोग वर्ल्ड कप क्वालिफिकेशन के लिए किया जाने लगा. 2002 से 2013 तक की बात करें तो ऑस्ट्रेलिया की टीम 9 बार 1 अप्रैल को नंबर पर रही. साउथ अफ्रीका 2 बार जबकि टीम इंडिया एक बार टॉप पर रही. वनडे क्रिकेट की शुरुआत 1971 में हुई थी. अब तक 28 टीमें कम से कम एक वनडे खेल चुकी हैं. आईसीसी की ओर से अब वर्ल्ड कप सुपर लीग की शुरुआत की गई. इसमें टेस्ट खेलने वाले 12 देशों के अलावा वर्ल्ड क्रिकेट लीग चैंपियनशिप का खिताब जीतने वाली नीदरलैंड्स को मौका दिया गया है. हर टीम को 8 सीरीज खेलनी हैं. 4 घर पर और 4 घर के बाहर. हर सीरीज में तीन मैच होंगे. यह मार्च 2023 तक चलेगा. टॉप-8 में रहने वाली टीमों को सीधे वनडे वर्ल्ड कप का टिकट मिलेगा. अन्य को क्वालिफाइंग मुकाबले खेलने होंगे.`;
export const T20_DESCRIPTION = `आईसीसी के दुनिया में 100 से अधिक सदस्य है. टी20 फॉर्मेट में अधिकांश एसोसिएट सदस्यों को इंटरनेशनल मुकाबले खेलने की मान्यता मिली हुई है. अभी कुल 86 देशों को मान्यता मिली हुई है. टी20 रैंकिंग की शुरुआत 2011 में की गई थी. 28 अक्टूबर 2011 को इंग्लैंड की टीम को पहली बार टॉप रैंकिंग मिली थी. श्रीलंका की टीम सबसे कम एक दिन के लिए टॉप पर रह चुकी है. 3 अप्रैल 2014 को टीम नंबर पर पहुंची, लेकिन अगले दिन हार के कारण उसे टॉप रैंकिंग गंवानी पड़ी थी. पाकिस्तान लगातार 824 दिन तक नंबर-1 पर रहने वाली एकमात्र टीम है. टीम 28 जनवरी 2018 से 30 अप्रैल 2020 तक टॉप पर रही. पाकिस्तान की टीम 100 से अधिक टी20 मैच जीतने वाली दुनिया की एकमात्र टीम है. 78 देशों ने अब तक कम से कम एक टी20 इंटरनेशनल का मुकाबला खेला है. टी20 इंटरनेशनल की शुरुआत 17 फरवरी 2005 को हुई थी. टी20 इंटरनेशनल शुरू होने के बाद दुनिया भर टी20 लीग भी शुरू हो गई हैं. इस कारण टेस्ट क्रिकेट पर खतरा बताया जा रहा है. कई बड़े खिलाड़ी अब टी20 के कारण क्रिकेट के सबसे बड़े फॉर्मेट में नहीं खेल रहे हैं. 2007 में पहली बार टी20 वर्ल्ड कप का आयोजन किया गया था. टीम इंडिया ने पहले सीजन का खिताब भी जीता था.`;

export const getActiveInning = (data) => {
  let activeInning;
  if(data?.matchType=='Test' || data?.matchType=="first-class") {
    if(data?.firstInnings?.status==1) {
      activeInning = 1;
    }
    if(data?.secondInnings?.status==1) {
      activeInning = 2;
    }
    if(data.thirdInnings.status==1) {
      activeInning = 3;
    }
    if(data.fourthInnings.status==1) {
      activeInning = 4;
    }
  } else {
    if(data?.firstInnings?.status==1) {
      activeInning = 1;
    }
    if(data?.secondInnings?.status==1) {
      activeInning = 2;
    }
  }
  return activeInning;
};

export const getMatchSlug = (teama_en, teamb_en) => {
  return `${(teama_en || "").toLowerCase().replace(/ /gi, "-")}-vs-${(teamb_en || "")
  .toLowerCase()
  .replace(/ /gi, "-")}`;
};

export const getSEOMetaTitle = (status, tabname) => {
  let hTag = '';
  if (status && status.toLowerCase() == "मैच खत्म") {
    if (tabname == "live-score-full") {
      hTag = " मैच रिजल्ट फुल स्कोरकार्ड";
    } else if (tabname == "live-score") {
      hTag = " मैच रिजल्ट स्कोरकार्ड";
    } else if (tabname == "ball-by-ball-live-commentary") {
      hTag = " मैच रिजल्ट बॉल by बॉल कॉमेंट्री";
    } else if (tabname == "team-squads") {
      hTag = " टीम";
    } else if (tabname == "team-news") {
      hTag = " टीम न्यूज";
    }
  } else {
    if (tabname == "live-score-full") {
      hTag = " लाइव मैच फुल स्कोरकार्ड";
    } else if (tabname == "live-score") {
      hTag = " लाइव मैच स्कोरकार्ड";
    } else if (tabname == "ball-by-ball-live-commentary") {
      hTag = " बॉल by बॉल कॉमेंट्री";
    } else if (tabname == "team-squads") {
      hTag = " टीम";
    } else if (tabname == "team-news") {
      hTag = " टीम न्यूज";
    }
  }
  return hTag;
};

export const getIsLiveMatch = (status) => {
  let isLive = true;
  if(status === 'मैच समाप्त') {
    isLive = false;
  } else if(status === 'मैच रद्द') {
    isLive = false;
  }
  return isLive;
};

export const getHeadingOne = (newMatchData) => {
  const headingOne =
      (newMatchData?.teamb || "").toLowerCase() == "भारत"
        ? `${newMatchData?.teamfb || newMatchData?.teamb} vs ${newMatchData?.teamfa || newMatchData?.teamfa} ${getSEOMetaTitle(newMatchData?.status, newMatchData?.tabname)}`
        : `${newMatchData?.teamfa || newMatchData?.teama} vs ${newMatchData?.teamfb || newMatchData?.teamb} ${getSEOMetaTitle(newMatchData?.status, newMatchData?.tabname)}`;
  return headingOne;
};

export const getCommentryURL = (matchCode, currentInning) => `https://xmlns.cricketnext.com/cktnxt/scorecard/Hindi/${matchCode}_commentary_all_${currentInning}_hi.json`;

export const getInningData = (newMatchData) => {
  let teamName, overs, total, wickets; 
  if(newMatchData.currentInnings === 1) {
    teamName = newMatchData?.firstInnings?.Battingteam
    overs = newMatchData?.firstInnings?.Equation?.Overs
    total = newMatchData?.firstInnings?.Equation?.Total
    wickets = newMatchData?.firstInnings?.Equation?.Wickets
  } else if(newMatchData.currentInnings === 2) {
    teamName = newMatchData?.secondInnings?.Battingteam
    overs = newMatchData?.secondInnings?.Equation?.Overs
    total = newMatchData?.secondInnings?.Equation?.Total
    wickets = newMatchData?.secondInnings?.Equation?.Wickets
  } else if(newMatchData.currentInnings === 3) {
    teamName = newMatchData?.thirdInnings?.Battingteam
    overs = newMatchData?.thirdInnings?.Equation?.Overs
    total = newMatchData?.thirdInnings?.Equation?.Total
    wickets = newMatchData?.thirdInnings?.Equation?.Wickets
  } else if(newMatchData.currentInnings === 4) {
    teamName = newMatchData?.fourthInnings?.Battingteam
    overs = newMatchData?.fourthInnings?.Equation?.Overs
    total = newMatchData?.fourthInnings?.Equation?.Total
    wickets = newMatchData?.fourthInnings?.Equation?.Wickets
  }

  return `${teamName} ${overs} ओवर के बाद ${total}/${wickets}`;
}