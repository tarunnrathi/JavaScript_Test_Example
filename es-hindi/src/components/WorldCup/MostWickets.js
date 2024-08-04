import LazyLoadImage from "components/Common/CustomImage";
import CricketTweet from "widgets/Common/Responsive/CricketTweet";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false },
);

const MostWickets = (props) => {
  const { mostWicketdata: { leaderboard = [] } = {} } = props.data || {};
  return (
    <>
      <div className="outer">
        <div className="CN-pageWrapper">
          {props.isMobile && (
            <div className="bet__ad">
              <SiteAd
                slotId="Mobile_ScoreCard_ad"
                adUnit={props.pageAds?.scoreCard_Ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan={true}
                lazyload={true}
              />
            </div>
          )}
          <div
            id="topScoreWidget_data"
            style={{
              minHeight: 115,
              background: "rgb(0 0 0 / 13%)",
              marginBottom: 15,
            }}
          >
            <DynamicCrTopScoreWidgetWithNoSSR seriesID={5612} />
          </div>
          {!props?.isMobile && (
            <div
              style={{
                minHeight: "60px",
                background: "#00000021",
                marginTop: "10px",
              }}
            >
              <SiteAd
                slotId="Desktop_ScoreCard_ad"
                adUnit={props.pageAds?.ScoreCard_ad}
                sizes={[[1244, 60]]}
                width={1244}
                height={60}
                removeAdSpan={true}
                lazyload={true}
              />
            </div>
          )}
          {props?.isMobile && (
            <div className="add">
              <div className="addinner-box">
                <SiteAd
                  width={336}
                  height={280}
                  adUnit={props?.pageAds?.ATF_320}
                  sizes={[
                    [300, 250],
                    [336, 280],
                    [250, 250],
                  ]}
                  lazyload={true}
                ></SiteAd>
              </div>
            </div>
          )}
          <div className="CN-section">
            <div className="CN-sec-l">
              
            <BreadcrumbCommon breadCrumbArray={[
                  { value: "NEWS18 हिंदी", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `WORLD CUP`, slug: "/world-cup/"},
                  { value: `विश्व कप 2023 - सर्वाधिक विकेट`},
              ]}/>
              <div className="CN-innersection">
                <div className="cn-heading-1">
                  <div className="headinner">
                    विश्व कप 2023 - सर्वाधिक विकेट
                  </div>
                  <div className="icon"></div>
                </div>
                <table className="most-ran-table orange-cap">
                  <tbody>
                    <tr>
                      <th>स्थान</th>
                      <th>खिलाड़ी</th>
                      <th>टीम</th>
                      <th>मैच</th>
                      <th>विकेट</th>
                    </tr>
                    {leaderboard.map((item, index) => (
                      <tr key={item} style={{ height: 38 }}>
                        <td>{index + 1}</td>
                        <td>
                          <a
                            href={`https://hindi.news18.com/cricket/profile/${item.player_name
                              ?.split(" ")
                              ?.join("-")}/${item.player_id}.html`}
                          >
                            <div className="playerbox">
                              <LazyLoadImage
                                src={`https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/players/64X64/${item?.player_id}.png`}
                                alt={item?.player_name}
                                height={30}
                                width={30}
                              />
                              <div className="txt">
                                <h3 className="playername">
                                  {item.player_name}
                                </h3>
                              </div>
                            </div>
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void();">
                            {item.team_short_name}
                          </a>
                        </td>
                        <td>{item.matches_played}</td>
                        <td>{item.wickets}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {props.isMobile && (
                  <div className="add">
                    <div className="addinner-box">
                      <SiteAd
                        width={336}
                        height={280}
                        adUnit={props?.pageAds?.BTF_300}
                        sizes={[
                          [300, 250],
                          [336, 280],
                        ]}
                        lazyload={true}
                      ></SiteAd>
                    </div>
                  </div>
                )}
                <p class="pageContent">
                  वर्ल्ड कप 2023 में सबसे ज्यादा विकेट हासिल करने वाले गेंदबाजों
                  (Highest Wickets) की सूची यहां मिलेगी. हर दिन तकरीबन 3 मैच
                  होंगे. यानी एक दिन में 66 खिलाड़ी मैदान पर उतरेंगे. इन
                  खिलाड़ियों का उद्देश्य अपनी टीम को जीत दिलाना होगा. जीत हर
                  किसी की चाहत हो सकती है, लेकिन यह उसी टीम को मिलती है, जिसके
                  खिलाड़ी बेहतर प्रदर्शन करें. हम सब जानते हैं कि क्रिकेट में
                  जीत-हार का पैमाना मुख्य रूप से रन या विकेट से तय होता है.
                  ज्यादा विकेट लेने वाली टीमें ही मैच जीतती हैं. ऐसे में उन
                  गेंदबाजों का महत्व बढ़ जाता है, जो फॉर्म में हैं. यहां से
                  गेंदबाज के अच्छे प्रदर्शन का अंदाजा लगाया जा सकेगा.
                </p>
              </div>
            </div>
            <div className="CN-sec-r">
              {!props?.isMobile && (
                <SiteAd
                  slotId="cn-add-section-1"
                  adUnit={props?.pageAds?.ATF_300_id}
                  lazyload={true}
                  sizes={[[300, 250]]}
                  width={300}
                  height={250}
                  removeAdSpan
                />
              )}
              <div className="cn-add-section-2" style={{ minHeight: 600 }}>
                <div className="vsp20"></div>
                <CricketTweet />
              </div>
              {!props?.isMobile && props?.pageAds?.BTF_300_id && (
                <div style={{ marginTop: "10px" }}>
                  <SiteAd
                    slotId="cn-add-section-2"
                    adUnit={props?.pageAds?.BTF_300_id}
                    sizes={[
                      [300, 250],
                      [336, 280],
                      [300, 600],
                    ]}
                    width={300}
                    height={250}
                    lazyload={true}
                    removeAdSpan
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @font-face {
          font-family: "Mukta";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
            format(url("woff2"));
          src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
            format("woff2");
          unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
            U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
        }
        body {
          margin: auto;
          font-family: "Mukta", sans-serif;
          background: #fff;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        ul,
        ol,
        header,
        footer,
        nav,
        article,
        aside,
        figure,
        figcaption {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        a {
          text-decoration: none;
          color: #000;
        }
        a img {
          border: none;
        }
        a,
        abbr,
        acronym,
        address,
        applet,
        article,
        aside,
        audio,
        big,
        blockquote,
        body,
        canvas,
        caption,
        center,
        cite,
        code,
        dd,
        del,
        details,
        dfn,
        div,
        dl,
        dt,
        embed,
        fieldset,
        figcaption,
        figure,
        footer,
        form,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        header,
        hgroup,
        html,
        iframe,
        img,
        ins,
        kbd,
        label,
        legend,
        li,
        mark,
        menu,
        nav,
        object,
        ol,
        output,
        p,
        pre,
        q,
        ruby,
        s,
        samp,
        section,
        small,
        span,
        strike,
        strong,
        summary,
        table,
        tbody,
        td,
        tfoot,
        th,
        thead,
        time,
        tr,
        tt,
        u,
        ul,
        var,
        video {
          margin: 0;
          padding: 0;
          border: 0;
          font: inherit;
          vertical-align: baseline;
        }
        img {
          border: none;
          max-width: 100%;
        }
        .mobinner-ad {
          display: none;
        }
        .adbox {
          display: none;
        }
        @media (max-width: 768px) {
          .mobinner-ad {
            display: block;
          }
          .inner-ad {
            display: none;
          }
          .wrap-ad {
            display: none;
          }
          .adbox {
            background: #dbdde3 !important;
            padding: 16px 0;
            position: relative;
            display: block;
          }
        }
        .outer {
          max-width: 1244px;
          margin: 0 auto;
          padding: 0;
          clear: both;
          overflow: hidden;
        }
        body .CN-pageWrapper > div {
          margin-bottom: 0px !important;
        }
        body .CN-section,
        body .CN-section * {
          font-family: "Mukta", sans-serif !important;
        }
        .CN-section {
          display: flex;
          justify-content: space-between;
        }
        .CN-section .CN-sec-l {
          width: 924px;
          min-width: 924px;
        }
        .CN-breadcum {
          font-size: 14px;
          padding: 4px 0;
          background: none;
          border-bottom: 1px dotted #939393;
          margin-bottom: 10px;
          line-height: 13px;
          color: #292929;
          text-transform: uppercase;
        }
        .CN-breadcum h1,
        .CN-breadcum h2 {
          display: inline-block;
        }
        .CN-breadcum h1 {
          font-size: 14px;
          font-weight: 400;
          font-family: "Mukta", sans-serif !important;
        }
        .newadd {
          background: #efefef;
          line-height: 0;
          display: table;
          margin: auto;
        }
        .newadd span {
          display: block;
          font-size: 12px;
          color: #8e8e8e;
          text-align: center;
          height: 20px;
          line-height: 20px;
          width: 100%;
        }
        .adbox {
          background: #dbdde3 !important;
          padding: 16px 0;
          position: relative;
        }
        .vsp20 {
          margin-top: 20px;
        }
        @media (max-width: 768px) {
          * {
            padding: 0;
            margin: 0;
            list-style: none;
            box-sizing: border-box;
            text-decoration: none;
            //line-height: 19px !important;
            border-collapse: collapse;
          }
          body {
            font-family: "Mukta", sans-serif !important;
            margin: 0;
            padding: 0;
            font-size: 13px;
            line-height: 19px;
            font-weight: 400;
          }
          .outer {
            width: 100%;
            display: block;
            overflow: auto !important;
          }
          .CN-section {
            display: block !important;
            width: 100%;
          }
          .CN-section .CN-sec-l {
            width: 100% !important;
            min-width: auto !important;
          }
          .CN-breadcum {
            font-size: 13px;
            height: 34px;
            background: none;
            border-top: none;
            border-bottom: 1px dashed rgb(147 147 147 / 57%);
            display: flex;
            overflow: scroll;
            padding: 8px 10px 5px 10px;
            margin-bottom: 0;
            line-height: 1.4;
          }
          .CN-breadcum a {
            padding: 0 4px;
            flex-shrink: 0;
          }
          body .CN-breadcum a span {
            padding: 0 4px 0 0;
          }
          body .CN-breadcum h1,
          body .CN-breadcum h2 {
            font-size: 13px;
            line-height: 19px;
            flex-shrink: 0;
          }
          .CN-sec-r {
            display: none;
          }
        }
        .cn-heading-1 {
          border-bottom: 3px solid #e1261d;
          margin-bottom: 10px;
        }
        .cn-heading-1 div {
          font-size: 22px;
          line-height: 20px;
          color: #e1261d;
          font-weight: bold;
          background: #fff;
          position: relative;
          top: 8px;
          padding-right: 4px;
          display: inline-block;
          text-transform: uppercase;
        }
        .cn-heading-1 div span {
          color: #001d42 !important;
          top: 0;
        }
        .pageContent {
          font-size: 16px;
          line-height: 1.5;
          margin-top: 10px;
        }
        @media (max-width: 768px) {
          .cn-heading-1 {
            padding: 0 0 0 10px;
            margin-bottom: 10px;
            border: none;
          }
          .CN-schedule-main {
            padding: 0 10px;
          }
          .pageContent {
            padding: 10px 10px;
            font-size: 16px;
            line-height: 1.5;
          }
        }
        .most-ran-table {
          width: 100%;
          font-family: "Segoe Pro Regular";
          font-size: 13px;
          border-collapse: collapse;
          border-spacing: 0;
          margin-bottom: 30px;
        }
        .most-ran-table tr {
          background: #f5f5f5;
          border-bottom: 1px solid #d8d8d8;
        }
        .most-ran-table tbody tr:nth-child(odd) {
          background: #fff;
        }
        .most-ran-table tr th {
          background: #001d42;
          text-transform: uppercase;
          color: #fff;
          font-family: "Segoe Pro Bold";
          padding: 9px 0;
          line-height: 13px;
          font-size: 11px;
        }
        body .most-ran-table tr th {
          font-weight: bold;
          font-size: 13px;
          background: #001d42 !important;
        }
        .most-ran-table tr th:first-child,
        .most-ran-table tr td:first-child {
          width: 60px;
          padding-right: 20px;
        }
        .most-ran-table.purple-cap tr th {
          background: #60398f;
        }
        .most-ran-table tr th:first-child,
        .most-ran-table tr td:first-child {
          width: 60px;
          padding-right: 20px;
        }
        .most-ran-table tr td {
          text-align: center;
          padding: 7px 0;
          vertical-align: middle;
          color: #001d42;
        }
        .most-ran-table tr th:nth-child(2),
        .most-ran-table tr td:nth-child(2) {
          text-align: left;
        }
        body .most-ran-table tr td .playerbox .txt .playername,
        body .most-ran-table tr td a {
          font-weight: bold;
          text-decoration: none;
          font-size: 14px;
        }
        .most-ran-table tr td a {
          color: #001d42;
          font-size: 13px;
          text-transform: capitalize;
          font-family: "Segoe Pro Bold";
          text-decoration: underline;
        }
        .most-ran-table tr td .playerbox {
          display: flex;
          align-items: center;
        }
        .most-ran-table tr td .playerbox .img {
          width: 30px;
          height: 30px;
          margin-right: 15px;
          border-radius: 50%;
          background: #fff;
          overflow: hidden;
          box-shadow: 0 1px 8px #3336;
        }
        .most-ran-table tr td .playerbox .txt .playername {
          color: #001d42;
          font-size: 13px;
          text-transform: capitalize;
          font-family: "Segoe Pro Bold";
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          .most-ran-table tr td a {
            font-weight: normal !important;
          }
          .most-ran-table tr th {
            font-size: 12px !important;
          }
          .most-ran-table tbody tr:nth-child(odd) {
            background: #f5f5f5 !important;
          }
          .most-ran-table tr th:first-child,
          .most-ran-table tr td:first-child {
            width: 45px;
            padding-right: 0;
          }
        }
        .CN-section .CN-sec-r {
          width: 300px;
          min-width: 300px;
        }
        .inner-ad {
          margin-top: 42px;
        }
        .CN-section {
          margin-top: 10px;
        }
        .bet__ad,
        .add {
          text-align: center;
        }
        .CN-scoreCardsection {
          overflow: hidden;
          position: relative;
          margin-bottom: 10px;
          font-family: "Mukta", sans-serif;
          background: #f5f5f5;
          padding: 0 15px;
          height: ${props.isMobile ? "180px !important" : "140px"};
        }
        .CN-scoreCard .slick-prev::before {
          content: "";
          border-top: 2px solid#909090;
          border-left: 2px solid#909090;
          width: 8px;
          height: 8px;
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
          position: absolute;
          left: 10px !important;
          top: 3px;
        }
        .CN-scoreCard .slick-next::before {
          right: 12px !important;
        }
        .CN-scoreCard .slick-track .teamscoreWrap {
          padding: 7px 0 12px !important;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox .text .runrate {
          font-size: 10px !important;
        }
        .CN-scoreCard .slick-track .teamscoreWrap .scorebox .text .score-2 {
          font-size: 16px !important;
        }
        .lazyload-wrapper {
          margin: 0px 0px 10px 0px;
        }
      `}</style>
    </>
  );
};

export default MostWickets;
