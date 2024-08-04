import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Taboola from "widgets/Common/Responsive/Taboola";
import ArticleListByCategory from "components/Desktop/homepage/ArticleListByCategory";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const BoardList = dynamic(() => import("components/Common/board/BoardList"));
const TopKhabare = dynamic(() => import("components/Common/board/TopKhabare"));
const NewsList = dynamic(() => import("components/Common/board/NewsList"));
const BoardFaq = dynamic(() => import("components/Common/board/ResultFaq"));
const ResultMobile = (props) => {
  const {
    taboolaList,
    pageAds,
    photoStories,
    boardResults,
    relatedNewsData,
    EducationNews,
    CareerNews
  } = useMemo(() => props.data, [props.data]);
  // const { sectionName, budgetYear, breadcrumb } = pageConfig;
  return (
    <>
      {/* <div className="budget_container"> */}
      <BreadcrumbCommon breadCrumbArray={[{ value: "हिंदी न्यूज", slug: "/"}, { value: "All India Board Result 2024 (बोर्ड रिजल्ट 2024)"}]} />
      <div className="budget_page">
        <div className="budget_page_left">
        <h1 className="brdrslthd">All India Board Result 2024 (बोर्ड रिजल्ट 2024)</h1>
            <>
              {/* <div className="clearfix vsp20"></div> */}
              <div className="read_less_full">
                <div className="read_less_containr read_full_containr">
                  <p>
                    {" "}
                    इस बार hindi.news18.com उत्तर प्रदेश, बिहार, झारखंड, आंध्र
                    प्रदेश से लेकर मध्यप्रदेश और अन्य राज्यों में होने वाली
                    बोर्ड परीक्षाओं से जुडी सभी लेटेस्ट जानकारियां और सभी
                    राज्यों की बोर्ड परीक्षाओं के नतीजों अपने पाठकों तक सबसे
                    पहले पहुंचाने के लिए विशेष कवरेज करने वाला है.
                    <br />
                    विद्यार्थियों को अपनी बोर्ड परीक्षाओं से जुड़ी हर लेटेस्ट
                    अपडेट के लिए हमारी वेबसाइट hindi.news18.com पर फॉर्म भर कर
                    रजिस्ट्रेशन करना होगा. उसके लिए विद्यार्थियों को अपना नाम,
                    मोबाइल नंबर, ईमेल आईडी, अपने बोर्ड का नाम, कक्षा एवं मांगी
                    गई अन्य जानकारियों को भरना होगा. फॉर्म भरने वाले
                    विद्यार्थियों को बोर्ड परीक्षा से जुड़ी सारी लेटेस्ट अपडेट
                    और रिजल्ट का उनके मोबाइल में अलर्ट मिल जाएगा.
                    <br />
                    हर वर्ष पूरे देश भर से अलग-अलग राज्यों के लाखों विद्यार्थी
                    बोर्ड परीक्षाएं देते हैं. मगर उनके लिए कोई ऐसा प्लेटफार्म
                    नहीं है जहां पर वह अपने बोर्ड से संबंधित परीक्षा की सभी
                    जानकारी एक जगह पर प्राप्त कर सकें. इसलिए न्यूज़ 18 इंडिया
                    हिंदी ने कदम उठाया है ताकि स्टूडेंट्स को अपने बोर्ड से
                    संबंधित सभी जरूरी जानकारी जैसे परीक्षा की तारीख, परीक्षा
                    पैटर्न, सिलेबस, परीक्षा से जुड़े अपडेट्स, टॉपर्स द्वारा बताई
                    गई परीक्षा टिप्स और परीक्षा का रिजल्ट जारी होने पर सभी
                    जानकारी उनके मोबाइल पर एसएमएस ईमेल के जरिए तुरंत भेजी जा
                    सके.
                    <br />
                  </p>
                </div>
              </div>
            </>
          
            <BoardList
              boardList={boardResults}
            />
          
          <div className="clearfix vsp20"></div>
              <ArticleListByCategory
                heading="संबंधित खबरे"
                isSubMenu={false}
                data={relatedNewsData || []}
                categoryLink={"/tag/board-result/"}
                key={`boardCat`}
                category="board-result"
              />
              <div className="clearfix vsp20"></div>
              <ArticleListByCategory
                heading="करियर न्यूज"
                isSubMenu={false}
                data={CareerNews || []}
                categoryLink={"/news/career/"}
                key={`boardCat`}
                category="board-result"
              />
              <div className="clearfix vsp20"></div>
              <ArticleListByCategory
                heading="एजुकेशन न्यूज"
                isSubMenu={false}
                data={EducationNews || []}
                categoryLink={"/news/education/"}
                key={`boardCat`}
                category="board-result"
              />
          <div className="clearfix vsp20"></div>
          <div className="iframe_for_desktop">
            <iframe
              id="iframe2"
              frameBorder="0"
              src="https://hindi.news18.com/board-results-pubstack/career_rhs.html"
            ></iframe>
          </div>
          <div className="clearfix vsp20"></div>
        </div>
      </div>
      {/* </div> */}
      <div className="clearfix add">
        <div className="addinner-box">
          <SiteAd
            width={300}
            height={250}
            slotId={"board_result_news_second"}
            adUnit={pageAds.BTF_300_id}
            sizes={[[300, 250]]}
            loadonScroll={false}
          ></SiteAd>
        </div>
      </div>
      <Taboola
        mode={taboolaList.bottom.mode}
        id={taboolaList.bottom.id}
        container={taboolaList.bottom.container}
        placement={taboolaList.bottom.placement}
      />
      <SiteAd
        slotId="PG_1x1"
        adUnit={pageAds.PG_1x1}
        sizes={[[1, 1]]}
        removeAdSpan={true}
        loadonScroll={false}
      />
      <SiteAd
        slotId="PG_Slider_1x1"
        adUnit={pageAds.PG_Slider_1x1}
        sizes={[[1, 1]]}
        removeAdSpan={true}
        loadonScroll={false}
      />
      <style jsx global>
        {`
          body {
            margin: auto;
            background: #fff;
            font-family: "Mukta", sans-serif;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          ul,
          table,
          figure {
            margin: 0;
            padding: 0;
          }
          li {
            list-style: none;
          }
          a {
            text-decoration: none;
          }
          a img {
            border: none;
          }
          * {
            box-sizing: border-box;
          }
          .clearfix {
            clear: both;
          }
          .add {
            background: #dbdde3 !important;
            position: relative;
            padding: 16px 0;
            line-height: 0;
            text-align: center;
          }
          .clearfix::after,
          .clearfix::before {
            content: "";
            display: block;
            clear: both;
            visibility: hidden;
            line-height: 0;
            height: 0px;
          }
          figure {
            position: relative;
            line-height: 0;
            flex-shrink: 0;
            overflow: hidden;
          }
          button {
            cursor: pointer;
            font-size: 0;
            border: 0;
            outline: none;
          }
          .vsp20 {
            margin-top: 20px;
          }
          .adunitContainer {
            display: flex;
            justify-content: center;
          }
          
          .breadcrumb {
            width: calc(100% - 20px);
            padding: 4px 0;
            border-bottom: 1px dashed #c4c4c4;
            margin: auto;
            margin-bottom: 5px;
          }
          .breadcrumb ul {
            display: flex;
            align-items: center;
            font-size: 14px;
            list-style-type: none;
          }
          .breadcrumb ul li {
            letter-spacing: 0px;
            font-size: 14px;
            margin: 0 3px;
            color: #969696;
            flex-shrink: 0;
          }
          .breadcrumb ul li:first-child {
            margin-left: 0;
          }
          .breadcrumb ul li a {
            text-decoration: none;
            color: #969696;
            font-weight: 200;
          }
          .board_results_iframe {
            margin-top: 15px;
          }
          #iframe1 {
            height: 602px !important;
            min-width: 98%;
            margin: 1%;
          }
          .board_lists {
            margin: 0 0px 10px;
          }
          .board_lists h2 {
            font-size: 20px;
            padding: 10px 0 6px;
          }
          .board_lists ul {
            padding-bottom: 10px;
          }
          .board_lists ul {
            border-bottom: 0 solid #ddd;
            padding-bottom: 10px;
            box-sizing: border-box;
          }
          .flex-wrap {
            flex-wrap: wrap;
          }
          .justify-space-between {
            justify-content: space-between;
          }
          .dflex {
            display: flex;
          }
          .board_default {
            display: block;
            align-items: center;
            text-align: center;
            width: 50%;
            border: 1px rgba(0, 0, 0, 0.17) solid;
            padding: 4px 0;
            position: relative;
            border-radius: 10px;
            margin-bottom: 10px;
            padding: 10px;
            width: calc(50% - 5px);
          }
          .board_default {
            padding: 10px;
            box-sizing: border-box;
          }
          .board_default a {
            color: #000;
            display: block;
          }
          .board-left {
            position: static;
            left: 10px;
            text-align: center;
            margin: auto;
            padding-bottom: 10px;
            min-height: 68px;
          }
          .board_default figure {
            width: auto;
            margin: 0;
          }
          .board-left img {
            width: 60px;
            margin: auto;
            display: block;
          }
          .board-right {
            width: 100%;
            text-align: center;
            padding-left: 0;
          }
          .board-right h3 {
            font-size: 20px;
            line-height: 24px;
            padding-bottom: 2px;
            font-weight: 600;
            color: #707070;
          }
          .board-right p {
            min-height: unset;
            font-size: 12px;
            padding: 5px 0;
          }
          .board_default a span {
            color: #eb3d3c;
          }
          .read_less_full .read_less_containr {
            padding: 10px 0;
            height: auto;
          }
          .read_less_full .read_less_containr p {
            font-size: 16px;
            line-height: 26px;
            font-weight: 400;
            color: #000;
          }
          .related_news_sec {
            margin: 0 0 10px;
          }
          .related_news_sec h2 {
            font-size: 20px;
            padding-top: 15px;
            line-height: 20px;
            font-weight: 600;
            color: #eb3d3c;
          }
          .related_news_sec .rltd_nws {
            border-bottom: 0 solid #ddd;
            margin-top: 10px;
          }
          .related_news_sec .rltd_nws .rltd_left {
            width: 100%;
          }
          .related_news_sec
            .rltd_nws
            .rltd_left
            .trending_subLft_sec
            .tranding_nws_main_img {
            max-height: inherit;
          }
          .related_news_sec
            .rltd_nws
            .rltd_left
            .trending_subLft_sec
            .tranding_nws_main_img {
            position: relative;
            width: 100%;
            max-height: 310px;
            border-radius: 10px;
            overflow: hidden;
          }
          .related_news_sec .rltd_nws .rltd_left .trending_subLft_sec .topics {
            margin-top: 10px;
          }
          .related_news_sec
            .rltd_nws
            .rltd_left
            .trending_subLft_sec
            .topics
            .topics_stories {
            padding: 0;
            box-sizing: border-box;
          }
          .careers {
            padding: 10px 0;
            flex-direction: column;
            box-sizing: border-box;
            margin-bottom: 0;
            padding-top: 0;
            border-bottom: 1px solid #ddd;
          }
          .read_more {
            display: block;
            font-size: 14px;
            line-height: 19px;
            font-weight: 700;
            color: #eb3d3c;
            margin: 10px auto;
            width: 130px;
            position: relative;
            text-align: center;
            cursor: pointer;
          }
          .careers .career_right {
            width: 100%;
            margin-bottom: 0;
          }
          .careers .career_lft {
            width: 100%;
          }
          .careers .career_right ul {
            flex-direction: column;
          }
          .careers .career_right ul li figure {
            width: 100%;
            display: block;
            border-radius: 5px;
            overflow: hidden;
          }
          .careers .career_right ul li h3 {
            margin: 5px auto 5px;
          }
          .careers .career_right ul li p {
            font-size: 13px;
            line-height: 21px;
            font-weight: 400;
            color: #999;
          }
          .careers .career_right ul li figure img {
            width: 300px;
            height: 200px;
            display: block;
          }
          .careers .career_lft .career_rightAdds .all_n_ews li {
            margin-bottom: 10px;
            border-bottom: 1px dotted #ccc;
            padding: 0 10px 10px 0;
            box-sizing: border-box;
          }
          .budget_page {
            width: 98%;
            margin: 0 auto;
          }
          .iframe_for_desktop {
            display: block;
            height: 425px;
          }
          #iframe2 {
            width: 99%;
            height: 450px;
            margin: 0 auto;
            display: block;
          }
          .brdrslthd {
            font-size: 26px;
            line-height: 1.5;
            font-weight: 600;
            color: #eb3d3c;
            margin: 0px 0 5px 0;
          }
          .read_more .arrows {
            position: absolute;
            top: 10px;
            right: 15px;
            width: 12px;
            height: 1px;
            background-color: #eb3d3c;
          }
          .read_more .arrows:after,
          .read_more .arrows:before {
            content: "";
            position: absolute;
            width: 7px;
            height: 1px;
            top: -2px;
            right: -1px;
            background-color: #eb3d3c;
            transform: rotate(45deg);
          }
          .read_more .arrows:after {
            top: 2px;
            transform: rotate(-45deg);
          }
          .related_news_sec
            .rltd_nws
            .rltd_right
            .related_stories
            li
            a
            .text_container
            .contnts:hover {
            color: #eb3d3c;
          }
          .all-news li a .statements p:hover {
            color: #eb3d3c;
          }
          .careers
            .career_lft
            .career_rightAdds
            .all_n_ews
            li
            a
            .statements
            p:hover {
            color: #eb3d3c;
          }
          .TABOOLA {
            height: auto;
            position: relative;
            z-index: 1;
          }
          div.addinner_box_300x250 {
            height: 268px;
            width: auto;
          }
          div.addinner_box_320x50 {
            height: 68px;
            width: auto;
          }
          div.addinner_box_300x100 {
            height: 118px;
            width: auto;
          }
          .brdrsltcls2 {
            display: flex;
            margin-left: 2% !important;
          }
          .brdrsltcls2 a {
            margin-left: 12px;
            background: #343434;
            text-align: center;
            color: #fff;
            font-size: 14px;
            height: 24px;
            line-height: 24px;
            border-radius: 20px;
            padding: 0px 10px;
          }
          .brdrsltcls2 a:first-child {
            margin-left: 0px;
          }
          .brdrsltcls2 a.active,
          .brdrsltcls2 a:hover {
            background: #eb3d3c;
            color: #fff !important;
          }
          .brdrslthdtp .brdrsltcls2 a {
            font-size: 16px;
            height: 26px;
            line-height: 28px;
            border-radius: 20px;
          }
          .maindesc {
            text-align: left;
            font: normal;
            color: #333333;
            margin-bottom: 20px;
            margin-top: 20px;
            float: left;
          }
          .maindesc h1,
          .maindesc h2, .maindesc h3 {
            font-size: 18px;
            margin-top: 10px;
          }
          .maindesc ol,
          .maindesc ul {
            margin: 0px 20px;
          }
          .maindesc ol br,
          .maindesc ul br {
            display: none;
          }
          .maindesc ol li,
          .maindesc ul li {
            list-style: disc;
          }
          .maindesc table {
            width: 100%;
            border-collapse: collapse;
          }
          .maindesc table td {
            font-size: 14px;
            line-height: 20px;
            color: #333;
            border: 1px solid #ccc;
            padding: 5px 10px;
          }
          .breadcrumb {
            height: 32px;
          }
          .add {
            height: 280px;
            overflow: hidden;
          }
          .brdrsltintro p {
            color: #333333;
            font-size: 14px;
            line-height: 22px;
            margin-bottom: 15px;
          }
          .brdrsltintro p b,
          .brdrsltintro p strong {
            color: #eb3d3c;
            font-size: 16px;
          }
        `}
      </style>
    </>
  );
};
export default React.memo(ResultMobile);