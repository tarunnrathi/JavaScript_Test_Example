import LazyLoadImage from "components/Common/CustomImage";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false },
);

const PointTable = (props) => {
  const { pointTableData = [] } = props.data || {};
  return (
    <>
      <div className="outer">
        <div className="CN-pageWrapper">
          {props.isMobile && (
            <>
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
            </>
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
          {!props.isMobile && (
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
          <div className="CN-section">
            <div className="CN-sec-l">
              
            <BreadcrumbCommon breadCrumbArray={[
                  { value: "NEWS18 हिंदी", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `WORLD CUP`, slug: "/world-cup/"},
                  { value: `विश्व कप 2023 पॉइंट टेबल`},
              ]}/>
              <div className="CN-innersection">
                <div className="cn-heading-1">
                  <div className="headinner">विश्व कप 2023 पॉइंट टेबल</div>
                  <div className="icon"></div>
                </div>
                <div style={{ background: "none", display: "none" }}>
                  <img
                    width="30"
                    align="absmiddle"
                    alt=""
                    src="https://images.news18.com/static_news18/pix/web/ajax-loader.gif"
                  />
                </div>
              </div>
              <div className="olympics-left">
                {pointTableData.length > 0 &&
                  pointTableData.map((item, index) => (
                    <div key={"round" + index} className="super_group">
                      <h3 className="super_group_title">
                        {item?._id?.stage_type} :{" "}
                        <span>{item?._id?.groupName}</span>
                      </h3>
                      <div className="super_group_table">
                        <table>
                          <tbody>
                            <tr>
                              <th>स्थान</th>
                              <th>टीमें</th>
                              <th>मैच</th>
                              <th>जीते</th>
                              <th>हारे</th>
                              <th>N/R</th>
                              <th>टाई</th>
                              <th>NET RR</th>
                              <th>अंक</th>
                            </tr>
                            {item?.team?.length &&
                              item.team.map((itm, idx) => (
                                <tr key={item?._id?.groupName + idx}>
                                  <td>{idx + 1}</td>
                                  <td>
                                    <div className="super_team_name">
                                      <LazyLoadImage
                                        src={`https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/160x90/${itm?.id}.png`}
                                        width={38}
                                        height={23}
                                        alt={itm?.short_name}
                                      />
                                      <p>
                                        <a
                                          href={`/cricket/teams/${itm?.short_name
                                            ?.toLowerCase()
                                            .split(" ")
                                            .join("-")}-squad-${itm.id}.html`}
                                        >
                                          {itm.name}
                                        </a>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    {parseInt(itm.w || 0) +
                                      parseInt(itm.l || 0) +
                                      parseInt(itm.t || 0) +
                                      parseInt(itm.nr || 0)}
                                  </td>
                                  <td>{itm.w || 0}</td>
                                  <td>{itm.l || 0}</td>
                                  <td>{itm.nr || 0}</td>
                                  <td>{itm.t || 0}</td>
                                  <td>{itm.nrr || 0}</td>
                                  <td>{itm.pts || 0}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
              </div>
              {props.isMobile && (
                <div className="add">
                  <div className="addinner-box">
                    <SiteAd
                      width={336}
                      height={280}
                      adUnit={props?.pageAds?.ATF_300}
                      sizes={[
                        [300, 250],
                        [336, 280],
                      ]}
                      lazyload={true}
                    ></SiteAd>
                  </div>
                </div>
              )}
              <div className="vsp20 clearfix"></div>
              <p className="pageContent">
                पॉइंट टेबल (Point Table) यानी अंकतालिका किसी भी टूर्नामेंट में
                हर टीम की स्थिति को बताती है. यानी कौन टॉप पर है और कौन सबसे
                नीचे. अंकतालिका में हर मैच के बाद बदलाव होते हैं. क्रिकेट में 4
                तरह के नतीजे (Result) संभव हैं. अंकतालिका में हर टीम के मैच का
                हिसाब होता है. यानी मैचों की संख्या, जीत, हार, ड्रॉ/रद्द, टाई और
                रनरेट और अंक. अंकों के आधार पर ही टीमों का क्रम तय होता है.
                ज्यादा अंक वाली टीमें जहां अगले राउंड में जाती है. वहीं कम अंक
                वाली टीमें बाहर हो जाती हैं. कई बार दो या इससे अधिक टीमों के अंक
                बराबर हो सकते हैं. ऐसी स्थिति होने पर नेट रनरेट महत्वपूर्ण हो
                जाता है. अच्छा रनरेट हासिल करने वाली टीमें ही बेहतर रैंक हासिल
                कर आगे बढ़ने में सफल रहती हैं.
              </p>
            </div>
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
                      [250, 250],
                    ]}
                    lazyload={true}
                  ></SiteAd>
                </div>
              </div>
            )}
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
        .olympics-left {
          width: 924px;
          margin-right: 20px;
        }
        .super_group {
          width: 100%;
          margin-bottom: 40px;
        }
        .super_group_title {
          height: 40px;
          background: #f5f5f5 0% 0% no-repeat padding-box;
          display: flex;
          align-items: center;
          padding-left: 20px;
          letter-spacing: 0px;
          text-transform: uppercase;
          color: #e1261d;
          position: relative;
          font-size: 17px;
          font-weight: bold;
        }
        .super_group_title span {
          color: #202020;
          padding-left: 7px;
        }
        .super_group_title:after {
          content: "";
          border-bottom: 1px solid #000000;
          border-right: 1px solid #000000;
          width: 5px;
          height: 5px;
          transform: rotate(-45deg);
          position: absolute;
          left: 6px;
          top: 18px;
        }
        .super_group_table {
          width: 100%;
        }
        .super_group_table table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }
        .super_group_table table tr {
          height: 50px;
          border-bottom: 1px #d8d8d8 solid;
          background: #fff;
        }
        .super_group_table table tr:nth-child(odd) {
          background: #f6f6f6;
        }
        .super_group_table table tr:first-child {
          background: #001d42 !important;
          height: 30px;
        }
        .super_group_table table tr th {
          height: 35px;
          color: #ffffff;
          font-size: 13px;
          line-height: 34px;
          font-weight: bold;
        }
        .super_group_table table tr th:first-child {
          text-align: left;
          padding-left: 10px;
          width: 60px;
        }
        .super_group_table table tr th:nth-child(2) {
          text-align: left;
          width: 30%;
        }
        .super_group_table table tr td:nth-child(1) {
          text-align: left;
          padding-left: 10px;
        }
        .super_group_table table tr td {
          letter-spacing: 0px;
          color: #202020;
          font-size: 15px;
          text-align: center;
          vertical-align: middle;
        }
        .super_team_name {
          display: flex;
          align-items: center;
          color: #001d42;
          font-size: 15px;
        }
        .super_team_name {
          display: flex;
          align-items: center;
          color: #001d42;
          font-size: 15px;
        }
        .super_team_name img {
          width: 40px;
          background: #ffffff 0% 0% no-repeat;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #e8e8e8;
        }
        .super_team_name p {
          margin-bottom: 0;
          padding-left: 10px;
        }
        .super_team_name a {
          color: #001d42;
          font-size: 15px;
        }
        .olympics-left {
          width: 924px;
          margin-right: 20px;
        }
        .super_group {
          width: 100%;
          margin-bottom: 40px;
        }
        .super_group_title {
          height: 40px;
          background: #f5f5f5 0% 0% no-repeat padding-box;
          display: flex;
          align-items: center;
          padding-left: 20px;
          letter-spacing: 0px;
          text-transform: uppercase;
          color: #e1261d;
          position: relative;
          font-size: 17px;
          font-weight: bold;
        }
        .super_group_title span {
          color: #202020;
          padding-left: 7px;
        }
        .super_group_title:after {
          content: "";
          border-bottom: 1px solid #000000;
          border-right: 1px solid #000000;
          width: 5px;
          height: 5px;
          transform: rotate(-45deg);
          position: absolute;
          left: 6px;
          top: 18px;
        }
        .super_group_table {
          width: 100%;
        }
        .super_group_table table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }
        .super_group_table table tr {
          height: 50px;
          border-bottom: 1px #d8d8d8 solid;
          background: #fff;
        }
        .super_group_table table tr:nth-child(odd) {
          background: #f6f6f6;
        }
        .super_group_table table tr:first-child {
          background: #001d42 !important;
          height: 30px;
        }
        .super_group_table table tr th {
          height: 35px;
          color: #ffffff;
          font-size: 13px;
          line-height: 34px;
          font-weight: bold;
        }
        .super_group_table table tr th:first-child {
          text-align: left;
          padding-left: 10px;
          width: 60px;
        }
        .super_group_table table tr th:nth-child(2) {
          text-align: left;
          width: 30%;
        }
        .super_group_table table tr td:nth-child(1) {
          text-align: left;
          padding-left: 10px;
        }
        .super_group_table table tr td {
          letter-spacing: 0px;
          color: #202020;
          font-size: 15px;
          text-align: center;
          vertical-align: middle;
        }
        .super_team_name {
          display: flex;
          align-items: center;
          color: #001d42;
          font-size: 15px;
        }
        .super_team_name {
          display: flex;
          align-items: center;
          color: #001d42;
          font-size: 15px;
        }
        .super_team_name img {
          width: 40px;
          background: #ffffff 0% 0% no-repeat;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #e8e8e8;
        }
        .super_team_name p {
          margin-bottom: 0;
          padding-left: 10px;
        }
        .super_team_name a {
          color: #001d42;
          font-size: 15px;
        }
        .inner-ad {
          margin-top: 42px;
        }
        .CN-section {
          margin-top: 10px;
        }
        .CN-scoreCardsection {
          overflow: hidden;
          position: relative;
          margin-bottom: 10px;
          font-family: "Mukta", sans-serif;
          background: #f5f5f5;
          padding: 0 15px;
          height: 140px;
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

export default PointTable;
