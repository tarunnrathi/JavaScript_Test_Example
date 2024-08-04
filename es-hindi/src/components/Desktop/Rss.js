import { TaboolaList } from "includes/Tabola.helper";
import getConfig from "next/config";
import React, { memo } from "react";
import dynamic from "next/dynamic";

const RhsCommon = memo(dynamic(() => import("widgets/Common/Desktop/RhsCommon")));

const rssData = [
  {
    label: "OMG",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/ajab-gajab.xml",
  },
  {
    label: "States",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/states.xml",
  },
  {
    label: "अन्य खेल",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/sports/others.xml",
  },
  {
    label: "अन्य देश",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/world/rest-of-world.xml",
  },
  {
    label: "अमेरिका",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/world/america.xml",
  },
  {
    label: "इनोवेशन",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/business/innovation.xml",
  },
  {
    label: "उत्तर प्रदेश",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/uttar-pradesh/uttar-pradesh.xml",
  },
  {
    label: "उत्तराखंड",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/uttarakhand/uttarakhand.xml",
  },
  {
    label: "एसेसरीज़",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/tech/accessories.xml",
  },
  {
    label: "ऐप्स",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/tech/apps.xml",
  },
  {
    label: "ऑटो",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/auto/auto.xml",
  },
  {
    label: "ऑनलाइन बिज़नेस",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/business/online-business.xml",
  },
  {
    label: "करियर",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/career/career-career.xml",
  },
  {
    label: "कल्चर",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/lifestyle/culture.xml",
  },
  {
    label: "कार",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/auto/cars.xml",
  },
  {
    label: "क्राइम",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/crime/crime.xml",
  },
  {
    label: "क्रिकेट",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/sports/cricket.xml",
  },
  {
    label: "चीन",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/world/china.xml",
  },
  {
    label: "छत्तीसगढ़",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/chhattisgarh/chhattisgarh.xml",
  },
  {
    label: "झारखंड",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/jharkhand/jharkhand.xml",
  },
  {
    label: "टीवी",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/entertainment/tv.xml",
  },
  {
    label: "टेनिस",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/sports/tennis.xml",
  },
  {
    label: "ट्रेंड्स",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/lifestyle/trends.xml",
  },
  {
    label: "ट्रैवल",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/lifestyle/travel.xml",
  },
  {
    label: "डीआईवाई",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/tech/diy.xml",
  },
  {
    label: "देश",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/nation/nation.xml",
  },
  {
    label: "पाकिस्तान",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/world/pakistan.xml",
  },
  {
    label: "पैसा बनाओ",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/business/money-making-tips.xml",
  },
  {
    label: "फ़िल्म रिव्यू",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/entertainment/film-review.xml",
  },
  {
    label: "फुटबॉल",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/sports/football.xml",
  },
  {
    label: "फूड",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/lifestyle/recipe.xml",
  },
  {
    label: "बाइक",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/auto/bikes.xml",
  },
  {
    label: "बिहार",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/bihar/bihar.xml",
  },
  {
    label: "बॉलीवुड",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/entertainment/bollywood.xml",
  },
  {
    label: "मध्य प्रदेश",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/madhya-pradesh/madhya-pradesh.xml",
  },
  {
    label: "मनी",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/business/business.xml",
  },
  {
    label: "मनोरंजन",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/entertainment/entertainment.xml",
  },
  {
    label: "मोबाइल-टेक",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/tech/tech.xml",
  },
  {
    label: "यंग पेरेंट्स",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/lifestyle/young-parents.xml",
  },
  {
    label: "राजस्थान",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/rajasthan/rajasthan.xml",
  },
  {
    label: "राशि",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/astro/astro.xml",
  },
  {
    label: "रिलेशनशिप",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/lifestyle/relationships.xml",
  },
  {
    label: "लाइफ़",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/lifestyle/lifestyle.xml",
  },
  {
    label: "लॉन्ग रीड",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/lifestyle/long-read.xml",
  },
  {
    label: "लॉन्च/रिव्यू",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/tech/launch-review.xml",
  },
  {
    label: "शो",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/shows/shows.xml",
  },
  {
    label: "सक्सेस स्टोरी",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/business/success-story.xml",
  },
  {
    label: "हरियाणा",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/haryana/haryana.xml",
  },
  {
    label: "हिमाचल प्रदेश",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/himachal-pradesh/himachal-pradesh.xml",
  },
  {
    label: "हेल्थ & फिटनेस",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/lifestyle/health.xml",
  },
  {
    label: "हॉलीवुड",
    url: "https://hindi.news18.com/commonfeeds/v1/hin/rss/entertainment/hollywood.xml",
  },
  {
    label: "",
    url: "",
  },
];
const Rss = (props = {}) => {
  const { publicRuntimeConfig } = getConfig();
  const outBrainUrl = publicRuntimeConfig.siteUrl + "khabar-rss";
  const {
    photoStories = [],
    topStories = [],
    datedAstroData = [],
  } = props.data || {};
  return (
    <>
      <div className="outer">
        <div className="section-blog-left">
          <div className="pd15 section-blog-left-aricle">
            <h1 className="rsfdhd">connect with us</h1>
            <p className="rsfdtxt">
              News18India आपके लिए लेकर आता है अपने सभी सेक्शन और ब्रेकिंग न्यूज
              के लिए आरएसएस फीड ताकि वेबसाइट की कोई भी खबर आपसे छूट न सके।
              आरएसएस का अर्थ है रियली सिंपल सिंडिकेशन। ये एक ऐसी तकनीक है जिसके
              जरिए आईबीएनखबर की हर गतिविधि का आपको तुरंत पता चल जाएगा। ये दरअसल
              XML फॉरमेट वाली फाइलें होती हैं जिन्हें क्लाइंट द्वारा इस्तेमाल
              किया जाता है। क्लाइंट को डेस्कटॉप एग्रीगेटर और आरएसएस रीडर भी कहते
              हैं। जैसे ही कोई खबर या न्यूज फ्लैश आईबीएनखबर पर प्रकाशित होती है
              तो उसका लिंक तुरंत आपके कंप्यूटर या मोबाइल पर पहुंच जाएगा जिन्हें
              आप आरएसएस रीडर की मदद से पढ़ सकेंगे।
            </p>
            <h3 className="rsfdhdscn">सेक्शन RSS फीड्स</h3>
            <ul className="sfdlist">
              {rssData.map((itm, index) => (
                <li key={"rss" + index}>
                  {itm.label && itm.url && (
                    <img
                      src="https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/rss.png"
                      alt="rss"
                    />
                  )}
                  <a href={itm.url}>{itm.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rightwrap">
          <RhsCommon
            pageAds={props?.data?.pageAds}
            currentURL={outBrainUrl}
            photoStories={photoStories}
            topStories={topStories}
            astroStories={props?.data?.astroStories}
            section="categorynews"
            panchangData={datedAstroData}
            taboolaList={TaboolaList?.category}
            isRss={true}
          />
        </div>
      </div>
      <style jsx global>
        {`
          body {
            font-family: "Mukta", sans-serif;
          }
          .outer {
            margin: auto;
            max-width: 1245px;
            padding: 0 10px;
            position: relative;
          }
          .section-blog-left {
            width: calc(100% - 315px);
            float: left;
          }
          .pd15 {
            padding: 15px;
          }
          .rsfdhd {
            font-size: 24px !important;
            font-weight: bold;
            color: #323232;
            border-bottom: 1px solid #dbdbdb;
            padding: 0px 0 10px 0;
            text-transform: uppercase;
          }
          .rsfdhdscn {
            font-size: 18px;
            color: #ec1c23;
            text-transform: uppercase;
            font-weight: bold;
            margin: 10px 0;
          }
          .rsfdtxt {
            color: #2e2e2e;
            font-size: 14px;
            line-height: 24px;
            padding-top: 10px;
          }
          .sfdlist {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .sfdlist li {
            padding-top: 18px;
            width: 25%;
          }
          .sfdlist li a {
            color: #000;
            font-size: 13px;
            padding-left: 25px;
          }
        `}
      </style>
    </>
  );
};
export default Rss;
