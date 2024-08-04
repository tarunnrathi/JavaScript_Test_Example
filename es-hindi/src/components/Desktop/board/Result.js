import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Taboola from "widgets/Common/Responsive/Taboola";
import ArticleListByCategory from "../homepage/ArticleListByCategory";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const BoardList = dynamic(() => import("components/Common/board/BoardList"));
// const TopKhabare = dynamic(() => import("components/Common/board/TopKhabare"));
// const NewsList = dynamic(() => import("components/Common/board/NewsList"));
const RhsBoard = dynamic(() => import("widgets/Common/Desktop/RhsBoard"));
// const BoardFaq = dynamic(() => import("components/Common/board/ResultFaq"));
const Result = (props) => {
  const {
    pageAds,
    photoStories,
    boardResults,
    relatedNewsData,
    EducationNews,
    CareerNews
  } = props.data;
  // const { sectionName, budgetYear, breadcrumb } = pageConfig;
  return (
    <>
      <div className="budget_container">
      <BreadcrumbCommon breadCrumbArray={[{ value: "हिंदी न्यूज", slug: "/"}, { value: "All India Board Result 2024 (बोर्ड रिजल्ट 2024)"}]} />
        <div className="budget_page">
          <div className="budget_page_left">
              <div className="brdrslthdtp">
                <h1 className="brdrslthd">All India Board Result 2024 (बोर्ड रिजल्ट 2024)</h1>
                <div className="brdrsltcls2">
                  {/* {board_page_data.length>0 ? board_page_data.map((item, index) => {
                    return index < 1 ? (
                      <>
                        <a
                          href={"/india-result/" + item.url}
                          className={
                            item.page_type == board_page_type ? "active" : ""
                          }
                        >
                          {item.class_name}
                        </a>
                      </>
                    ) : item.page_type != "Common" ? (
                      <>
                        <a
                          href={"/india-result/" + item.url}
                          className={
                            item.page_type == board_page_type ? "active" : ""
                          }
                        >
                          {item.class_name}
                        </a>
                      </>
                    ) : (
                      ""
                    );
                  }): ''} */}
                </div>
              </div>
            
            <>
                <div className="clearfix vsp10"></div>
                <div className="read_less_full">
                  <div className="read_less_containr read_full_containr">
                    <p>
                      {" "}
                      इस बार hindi.news18.com उत्तर प्रदेश, बिहार, झारखंड, आंध्र
                      प्रदेश से लेकर मध्यप्रदेश और अन्य राज्यों में होने वाली
                      बोर्ड परीक्षाओं से जुडी सभी लेटेस्ट जानकारियां और सभी
                      राज्यों की बोर्ड परीक्षाओं के नतीजों अपने पाठकों तक सबसे
                      पहले पहुंचाने के लिए विशेष कवरेज करने वाला है.
                    </p>
                    <p>
                      विद्यार्थियों को अपनी बोर्ड परीक्षाओं से जुड़ी हर लेटेस्ट
                      अपडेट के लिए हमारी वेबसाइट hindi.news18.com पर फॉर्म भर कर
                      रजिस्ट्रेशन करना होगा. उसके लिए विद्यार्थियों को अपना नाम,
                      मोबाइल नंबर, ईमेल आईडी, अपने बोर्ड का नाम, कक्षा एवं मांगी
                      गई अन्य जानकारियों को भरना होगा. फॉर्म भरने वाले
                      विद्यार्थियों को बोर्ड परीक्षा से जुड़ी सारी लेटेस्ट अपडेट
                      और रिजल्ट का उनके मोबाइल में अलर्ट मिल जाएगा.
                    </p>
                    <p>
                      हर वर्ष पूरे देश भर से अलग-अलग राज्यों के लाखों विद्यार्थी
                      बोर्ड परीक्षाएं देते हैं. मगर उनके लिए कोई ऐसा प्लेटफार्म
                      नहीं है जहां पर वह अपने बोर्ड से संबंधित परीक्षा की सभी
                      जानकारी एक जगह पर प्राप्त कर सकें. इसलिए न्यूज़ 18 इंडिया
                      हिंदी ने कदम उठाया है ताकि स्टूडेंट्स को अपने बोर्ड से
                      संबंधित सभी जरूरी जानकारी जैसे परीक्षा की तारीख, परीक्षा
                      पैटर्न, सिलेबस, परीक्षा से जुड़े अपडेट्स, टॉपर्स द्वारा
                      बताई गई परीक्षा टिप्स और परीक्षा का रिजल्ट जारी होने पर
                      सभी जानकारी उनके मोबाइल पर एसएमएस ईमेल के जरिए तुरंत भेजी
                      जा सके.
                    </p>
                  </div>
                </div>
              </>
            <div className="clearfix vsp20"></div>
            
              <BoardList
                boardList={boardResults}
                // url_slug_match={url_slug_match}
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
            {/* <div className="clearfix vsp20"></div>
            {board_page ? (
              <BoardFaq board_page_data={board_page_data} />
            ) : (
            )} */}
            <div className="clearfix vsp20"></div>
            <div className="clearfix vsp20"></div>
            <Taboola
              mode={TaboolaList.category.bottom.mode}
              id={TaboolaList.category.bottom.id}
              container={TaboolaList.category.bottom.container}
              placement={TaboolaList.category.bottom.placement}
            />
            {/* {board_page ? (
              <NewsList
                listItem=""
                board_page={board_page}
                global_keyword={global_keyword}
                global_keyword2={global_keyword2}
              />
            ) : (
              cmenus.map((item, index) => <NewsList listItem={item} />)
            )} */}
          </div>
          <RhsBoard
            pageAds={pageAds}
            budgetPhotoStories={photoStories}
            />
        </div>
      </div>
      <div className={"middlead"}>
        <SiteAd
          width={728}
          height={90}
          slotId={"board_result_news_btf"}
          adUnit={pageAds.BTF_728}
          sizes={[[728, 90]]}
          lazyload={true}
        ></SiteAd>
      </div>
      {/* <Taboola
        mode={taboolaList.bottom.mode}
        id={taboolaList.bottom.id}
        container={taboolaList.bottom.container}
        placement={taboolaList.bottom.placement}
      /> */}
      {typeof pageAds !== "undefined" &&
      typeof pageAds.Shosh_OOP_id !== "undefined" ? (
        <SiteAd
          slotId="Shosh_OOP_id_budget"
          renderOutOfThePage={true}
          adUnit={pageAds.Shosh_OOP_id}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          lazyload={true}
        />
      ) : (
        ""
      )}
      {typeof pageAds !== "undefined" &&
      typeof pageAds.PG_1x1_2 !== "undefined" ? (
        <SiteAd
          slotId="PG_1x1_2"
          adUnit={pageAds.PG_1x1_2}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          style={{ height: "0" }}
          lazyload={true}
        />
      ) : (
        ""
      )}
      {typeof pageAds !== "undefined" &&
      typeof pageAds.PG_Slider_1x1 !== "undefined" ? (
        <SiteAd
          slotId="PG_Slider_1x1"
          adUnit={pageAds.PG_Slider_1x1}
          sizes={[[1, 1]]}
          removeAdSpan={true}
          lazyload={true}
        />
      ) : null}
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
          .middlead {
            flex-direction: column;
            text-align: center;
            margin-bottom: 15px;
          }
          .adunitContainer {
            display: flex;
            justify-content: center;
          }
          
          .budget_container {
            max-width: 1244px;
            width: 100%;
            margin: auto;
            position: relative;
            z-index: 1;
          }
          .budget_page {
            max-width: 100%;
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          .budget_page_left {
            width: calc(100% - 320px);
          }
          .budget_page_right {
            width: 300px;
          }
          .budget_page_right_sticky {
            position: sticky;
            top: 40px;
          }
          .breadcrumb {
            width: 100%;
            padding: 5px 0;
            border-bottom: 1px dashed #c4c4c4;
            margin-bottom: 10px;
          }
          .breadcrumb ul {
            display: flex;
            align-items: center;
            font-size: 11px;
            list-style-type: none;
          }
          .breadcrumb ul li {
            font-size: 15px;
            margin: 0 4px;
            color: #969696;
            line-height: 24px;
          }
          .breadcrumb ul li h1 {
            font-size: 15px;
            color: #001d42;
            font-weight: normal;
          }
          .breadcrumb ul li a {
            text-decoration: none;
            color: #969696;
            font-weight: 200;
          }
          .breadcrumb ul li:first-child {
            margin-left: 0;
          }
          .landing_page_content {
            width: 100%;
          }
          .top-news-title h1 {
            font-size: 28px;
            line-height: 32px;
            color: #001d42;
            font-weight: bold;
            margin-bottom: 2px;
          }
          /*  bOARD RESULT CSS*/
          #iframe1 {
            width: 99%;
            height: 420px;
            margin: 0 auto;
            display: block;
          }
          .read_less_full .read_full_containr {
            height: auto;
          }
          .read_less_full .read_less_containr {
            display: block;
            overflow: hidden;
            position: relative;
            background: #fff;
            height: 100%;
            padding: 0 20px 0 0;
            box-sizing: border-box;
            line-height: 2;
            padding-bottom: 0;
          }
          // .read_less_full .read_less_containr p {
          //   font-size: 16px;
          //   line-height: 26px;
          // }
          .read_less_full .read_less_containr p {
            color: #333;
            font-size: 15px;
            line-height: 22px;
            margin-bottom: 15px;
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
          .brdrslthd {
            font-size: 26px;
            line-height: 24px;
            font-weight: 600;
            color: #eb3d3c;
            margin: 15px 0 15px 0;
          }
          .brdrsltintro {
            margin-bottom: 30px;
          }
          .subNavWrap {
            //display: none;
          }
          .innerSubmenu {
            display: none;
          }
          .submenu_boxwrap {
            width: auto !important;
            padding: 15px 0 15px 0 !important;
          }
          .brdrslthdtp {
            display: flex;
            align-items: center;
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
          .outterSubmenu {
            display: none;
          }
          .brdrslthdtp .brdrsltcls a {
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
export default React.memo(Result);