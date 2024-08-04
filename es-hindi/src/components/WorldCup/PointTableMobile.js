import LazyLoadImage from "components/Common/CustomImage";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import dynamic from "next/dynamic";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false },
);

const PointTableMobile = (props) => {
  const { pointTableData = [] } = props.data || {};
  return (
    <>
      <div className="outer">
        <div className="CN-pageWrapper">
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
          <div className="CN-section">
            <div className="CN-sec-l">
              
            <BreadcrumbCommon breadCrumbArray={[
                  { value: "NEWS18 हिंदी", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `WORLD CUP`, slug: "/world-cup/"},
                  { value: `विश्व कप 2023 पॉइंट टेबल`},
              ]}/>
              {/* CN-innersection start */}
              <div className="CN-innersection">
                <div className="cn-heading-1">
                  <div className="headinner">
                    विश्व कप 2023 <span> - पॉइंट टेबल</span>
                  </div>
                  <div className="icon" />
                </div>
                {/* olympics-left start */}
                <div className="olympics-left">
                  {pointTableData.length > 0 &&
                    pointTableData.map((item, index) => (
                      <div key={"round" + index} className="super_group">
                        <h3 className="super_group_title">
                          {item?._id?.stage_type} :{" "}
                          <span>{item?._id?.groupName}</span>
                        </h3>
                        <div className="super_group_table">
                          <table className="wc_table">
                            <thead>
                              <tr>
                                <th>स्थान</th>
                                <th>टीमें</th>
                                <th>मैच</th>
                                <th>अंक</th>
                                <th>Nrr</th>
                              </tr>
                            </thead>
                            <tbody>
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
                                    <td>{itm.pts || 0}</td>
                                    <td>{itm.nrr || 0}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                </div>
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
                {/* olympics-left end */}
                <p className="pageContent">
                  पॉइंट टेबल (Point Table) यानी अंकतालिका किसी भी टूर्नामेंट में
                  हर टीम की स्थिति को बताती है. यानी कौन टॉप पर है और कौन सबसे
                  नीचे. अंकतालिका में हर मैच के बाद बदलाव होते हैं. क्रिकेट में
                  4 तरह के नतीजे (Result) संभव हैं. अंकतालिका में हर टीम के मैच
                  का हिसाब होता है. यानी मैचों की संख्या, जीत, हार, ड्रॉ/रद्द,
                  टाई और रनरेट और अंक. अंकों के आधार पर ही टीमों का क्रम तय होता
                  है. ज्यादा अंक वाली टीमें जहां अगले राउंड में जाती है. वहीं कम
                  अंक वाली टीमें बाहर हो जाती हैं. कई बार दो या इससे अधिक टीमों
                  के अंक बराबर हो सकते हैं. ऐसी स्थिति होने पर नेट रनरेट
                  महत्वपूर्ण हो जाता है. अच्छा रनरेट हासिल करने वाली टीमें ही
                  बेहतर रैंक हासिल कर आगे बढ़ने में सफल रहती हैं.
                </p>
              </div>
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
              {/* CN-innersection end */}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>
        {`
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
            width: 100%;
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

          table.wc_table {
            width: 100%;
          }
          table.wc_table tr {
            background: #001d42;
            color: #fff;
          }
          .wc_table tbody tr {
            border-bottom: 1px solid #d8d8d8;
            background: #fff;
          }
          .wc_table tr th:first-child,
          .wc_table tr td:first-child {
            width: 42px;
            padding-left: 10px;
          }
          .wc_table tr td {
            height: 40px;
            color: #202020;
            font-size: 13px;
            font-weight: bold;
            text-transform: uppercase;
            padding: 6px 5px;
            text-align: center;
          }
          .wc_table .wc_tableTeam {
            display: flex;
            align-items: center;
          }
          .wc_table .wc_tableTeam .name {
            color: #001d42;
            text-decoration: none !important;
            text-transform: capitalize;
            margin-left: 5px;
            font-weight: bold;
            text-transform: capitalize;
          }
          .wc_table .wc_tableTeam img {
            width: 40px;
            background: #ffffff 0% 0% no-repeat;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #e8e8e8;
          }
          .wc_table tbody tr:nth-child(even) {
            background: #f5f5f5;
            border-bottom: 1px solid #d8d8d8;
          }
          .bet__ad, .add {
            text-align: center;
          }
        `}
      </style>
    </>
  );
};

export default PointTableMobile;
