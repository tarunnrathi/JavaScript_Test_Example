import React from "react";
import ExclusiveNews from "components/Common/ExclusiveNews";
import HomeTopNews from "components/Mobile/home/HomeTopNews";
import HomeNews from "components/Mobile/home/HomeNews";
import HomeNewsWebStories from "components/Common/HomeWebStories";
import CricketNews from "components/Mobile/home/CricketNews";
import CricketNewsHome from "components/Mobile/home/CricketNewsHome";
import SpecialNews from "components/Mobile/home/SpecialNews";
import HomeNewsGallery from "components/Mobile/home/HomeNewsGallery";
import HomeNewsGalleryNew from "components/Mobile/home/HomeNewsGalleryNew";
import HomeNewsGrid from "components/Mobile/home/HomeNewsGrid";
import Breaking from "components/Common/Breaking";
import getConfig from "next/config";
// import BudgetHomeWidgetMobile from "components/Mobile/home/BudgetHomeWidget";

const { publicRuntimeConfig } = getConfig();

const HomeMobile = (props) => {
  const {
    data: {
      pageAds,
      cricketNewsHome: { live = "false" } = {},
      districtList,
      // budgetHomeData
    },
    // budgetEventSwitcher
  } = props;
  // const {
  //   homeBudgetNews = {},
  //   eventSwitchers,
  //   budgetYear,
  //   glossarySponsor,
  //   // videowallPortraitData=[],
  //   // videowallLandscapeData=[]
  // } = props.data;
  const targetting = {
    targeting: pageAds.setTargetingValues,
  };

  // const { budget_home_widget_live = false } = budgetEventSwitcher || {};

  return (
    <>
      <Breaking data={props.data?.breaking} isMobile={true} isAmp={true} />
      {/* {budget_home_widget_live === "1" && (
        <BudgetHomeWidgetMobile
          homeBudgetNews={budgetHomeData}
          eventSwitches={budgetEventSwitcher}
          isMobile={true}
          isAmp={true}
        />
      )} */}
      <ExclusiveNews exnews={props.data?.exnews} isMobile={true} isAmp={true} />
      <HomeTopNews
        props={props.data ? props.data : {}}
        trendStory={props.data.homeTrendStory}
        isAmp={true}
      />

      <div className="container">
        <SpecialNews isAmp={true} NewsData={props.data?.specialNews} />
        <div className="clearfix add container-ad">
          <div className="addinner-box addinner_box_300x250">
            <span>विज्ञापन</span>
            <amp-ad
              width={336}
              height={280}
              type="doubleclick"
              data-multi-size-validation="false"
              data-lazy-fetch="true"
              data-loading-strategy="1"
              data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_HOME_AMP/NW18_HIND_HOME_HOME_AMP/NW18_HIND_AMP_HP_ATF_300"
              data-multi-size="300x250"
              json={JSON.stringify(targetting || "")}
              rtc-config='{
                "vendors": {
                  "openwrap": {
                  "PROFILE_ID" : "2059",
                  "PUB_ID" : "113941"
                  },
                  "aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }
                },
                "timeoutMillis": 1000
              }'
            ></amp-ad>
          </div>
        </div>

        {live && live == "true" ? (
          <CricketNewsHome
            sportsNews={props.data?.cricketNewsHome}
            isMobile={true}
            isAmp={true}
            sponsors={props.data?.cricketWidgetSponsorsData}
          />
        ) : (
          <CricketNews isAmp={true} NewsData={props.data?.getCricketArticles} />
        )}
        <HomeNews
          newsType={"bollywood-news"}
          isAmp={true}
          News={props.data?.getBollywoodArticles}
        />
        <HomeNews
          newsType={"pradesh-news"}
          isAmp={true}
          News={props.data?.pradeshNews}
          lineUp={props.data?.pradeshLineUp}
          districtList={districtList}
        />

        <div className="clearfix add container-ad">
          <div className="addinner-box addinner_box_300x250">
            <span>विज्ञापन</span>
            <amp-ad
              width={300}
              height={250}
              type="doubleclick"
              data-multi-size-validation="false"
              data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_HOME_AMP/NW18_HIND_HOME_HOME_AMP/NW18_HIND_AMP_HP_BTF_300"
              data-multi-size="336x280"
              json={JSON.stringify(targetting || "")}
              data-lazy-fetch="true"
              data-loading-strategy="1"
              rtc-config='{
								"vendors": {
								  "openwrap": {
									"PROFILE_ID" : "2059",
									"PUB_ID" : "113941"
								  },
                  "aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }
								},
								"timeoutMillis": 1000
							  }'
            ></amp-ad>
          </div>
        </div>
        <HomeNewsWebStories
          isMobile={true}
          newsType={"web-stories-news"}
          isAmp={true}
          webStories={props.data?.webStoriesSsr}
        />
        <HomeNews
          newsType={"money-news"}
          isAmp={true}
          News={props.data?.getMoneyArticles}
        />
        <HomeNews
          newsType={"sports-news"}
          isAmp={true}
          News={props.data?.getSportsArticles}
        />
        <HomeNews
          newsType={"mobile-tech"}
          isAmp={true}
          News={props.data?.techNewsSSR}
        />
        <HomeNewsGrid
          newsType={"knowledge-news"}
          isAmp={true}
          News={props.data?.KnowledgeNews}
        />
        <HomeNews
          newsType={"job-news"}
          isAmp={true}
          News={props.data?.JobNews}
        />

        <HomeNews
          newsType={"food-news"}
          isAmp={true}
          News={props.data?.foodDataSsr}
        />
        <HomeNews
          newsType={"world-news"}
          isAmp={true}
          News={props.data?.WorldNews}
        />
        <HomeNewsGallery
          newsType={"photoGallery-news"}
          isAmp={true}
          News={props.data?.photogalleryNews}
        />
        <HomeNews
          newsType={"health-news"}
          isAmp={true}
          News={props.data?.HealthNews}
        />
        <HomeNews
          newsType={"career-news"}
          isAmp={true}
          News={props.data?.CareerNews}
        />
        <HomeNews
          newsType={"sahitya"}
          isAmp={true}
          News={props.data?.Sahitya}
        />
        <HomeNews
          newsType={"ajab-gajab"}
          isAmp={true}
          News={props.data?.AjabGajab}
        />
        <HomeNewsGrid
          newsType={"auto-news"}
          isAmp={true}
          News={props.data?.AutoNews}
        />

        <HomeNews
          newsType={"nation-news"}
          isAmp={true}
          News={props.data?.AutoNews}
        />
        <HomeNewsGrid
          newsType={"dharm-news"}
          isAmp={true}
          News={props.data?.DharmNews}
        />
        <HomeNews
          newsType={"lifestyle-news"}
          isAmp={true}
          News={props.data?.LifeStyleNews}
        />

        <HomeNewsGalleryNew
          data={props.data?.originalVideos}
          isAmp={true}
          heading={"टॉप वीडियो"}
          link={publicRuntimeConfig.siteUrl + "videos/originals/"}
          key={`videosOrgCat`}
        />
        {/* <HomeNewsGalleryNew
          data={props.data?.videogallerySsr}
          isAmp={true}
          heading={'टॉप वीडियो'}
          link={publicRuntimeConfig.siteUrl + "videos/"}
          key={`videosCat`}
        /> */}
        <HomeNews
          newsType={"crime-news"}
          isAmp={true}
          News={props.data?.CrimeNews}
        />
      </div>

      <amp-embed
        data-loading-strategy="prefer-viewability-over-views"
        data-lazy-fetch="true"
        width="100"
        height="100"
        type="taboola"
        layout="responsive"
        data-publisher="network18media-news18hindi"
        data-mode="thumbnails-a"
        data-placement="Below Home Thumbnails AMP"
        data-target_type="mix"
        data-homepage="auto"
        data-url=""
      ></amp-embed>
      <style jsx global>
        {`
          @font-face {
            font-family: "Mukta";
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
              format("woff2");
          }
          .taboola_home {
            height: 240px;
          }
          .container {
            position: relative;
            overflow: hidden;
          }
          .add {
            background: #dbdde3;
          }
          .add,
          .add2 {
            background: #dbdde3;
            position: relative;
            padding: 16px 0;
            line-height: 0;
            text-align: center;
            z-index: 1;
            margin-bottom: 20px;
          }
          .clearfix:after,
          .clearfix:before {
            content: "";
            display: block;
            clear: both;
            visibility: hidden;
            line-height: 0;
            height: 0;
          }
          div.addinner_box_300x250 {
            height: 268px;
            width: 300px;
          }
          .addinner-box {
            background: #e8e9ed;
            min-width: 250px;
            display: inline-block;
            margin: 0 auto;
            text-align: center;
            min-height: auto;
            padding: 0;
            box-sizing: border-box;
          }
          .addinner-box span {
            color: #797e90;
            font-size: 11px;
            text-align: center;
            padding: 2px 0 0;
            display: block;
            line-height: 16px;
          }
          .container-ad {
            width: 100%;
            left: 50%;
            transform: translateX(-50%);
          }
          .align {
            text-align: center;
          }
          .quiz-heading {
            margin-boottom: 5px;
          }
        `}
      </style>
    </>
  );
};

export default HomeMobile;
