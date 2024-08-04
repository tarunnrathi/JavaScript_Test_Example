import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import LazyLoadImage from "components/Common/CustomImage";
import { flagUrl, IccT20TeamList } from "api/Constant";
import { t20_world_cup_year } from "api/Constant";
import dynamic from "next/dynamic";
const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);

const PointTableMobile = (props) => {
  const data = props?.data?.pointsTableData?.length > 0 ? props?.data?.pointsTableData:[];
  const newArray = [];
  newArray.push(data[4]);
  newArray.push(data[5]);
  newArray.push(data[0]);
  newArray.push(data[1]);
  newArray.push(data[2]);
  newArray.push(data[3]);

  return (
    <>
      <div className="outer">
        <div className="CN-pageWrapper">
          <div className="add">
            <div className="addinner-box">
              <NewSiteAd
                slotId={"Mobile_ScoreCard_ad_ATF_320"}
                adUnit={props?.pageAds?.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                  [250, 250]
                ]}
                width={336}
                height={280}
                lazyLoad={true}
              />
            </div>
          </div>
          <div
            style={{
              height: "160px",
              overflow: "hidden",
              padding: "0 10px",
            }}
          >
            <DynamicCrTopScoreWidgetWithNoSSR isT20={true} />
          </div>
          <div className="CN-section">
            <div className="CN-sec-l">
              <BreadcrumbCommon breadCrumbArray={[
                { value: "हिंदी समाचार", slug: "/" },
                { value: "क्रिकेट", slug: "/cricket/" },
                { value: `t20 world cup ${t20_world_cup_year}`, slug: "/cricket/icc-t20-world-cup/" },
                { value: `T20 World Cup अंक तालिका` },
              ]} />
              {/* CN-innersection start */}
              <div className="CN-innersection">
                <div className="cn-heading-1">
                  <div className="headinner"><h1>ICC Men's T20 World Cup {t20_world_cup_year} <span>अंक तालिका</span></h1></div>
                  <div className="icon" />
                </div>
                {/* olympics-left start */}
                <div className="olympics-left">
                  {newArray?.length > 0 && newArray?.map((item, index) => {
                    return (
                      <div className="super_group" key={index}>
                        <h3 className="super_group_title">
                          राउंड-{index<=1?2:1} : <span>{item?._id?.stage_type}    {item?._id?.groupName}</span>
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
                              {item?.team?.map((team, idx) => {
                                const teamUrl = IccT20TeamList.find((x) => x?.teamId === team?.id)?.teamUrl;
                                return (
                                  <tr key={"team" + idx}>
                                    <td>{team?.pos}</td>
                                    <td>
                                      <div className="super_team_name">
                                        <LazyLoadImage
                                          src={
                                            `${flagUrl}/${team?.id}.png`
                                          }
                                          width={68}
                                          height={38}
                                          alt={item?.name}
                                        />
                                        <p>
                                          <a href={teamUrl}>
                                            {team?.name}
                                          </a>
                                        </p>
                                      </div>
                                    </td>
                                    <td>{team?.p}</td>
                                    <td>{team?.pts}</td>
                                    <td>{team?.nrr}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="add">
                  <div className="addinner-box">
                    <NewSiteAd
                      slotId={"Mobile_ScoreCard_ad_ATF_300"}
                      adUnit={props?.pageAds?.ATF_300}
                      sizes={[
                        [300, 250],
                        [336, 280],
                      ]}
                      width={336}
                      height={280}
                      lazyLoad={true}
                    />
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
                  <NewSiteAd
                    slotId={"Mobile_ScoreCard_ad_BTF_300"}
                    adUnit={props?.pageAds?.BTF_300}
                    sizes={[
                      [300, 250],
                      [336, 280],
                      [250, 250]
                    ]}
                    width={336}
                    height={280}
                    lazyLoad={true}
                  />
                </div>
              </div>
              {/* CN-innersection end */}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>
        {`
        .headinner h1 {
          font-size: 22px;border-bottom: 1px solid #d8d8d8;
          padding-bottom: 5px; line-height: 25px;
        }
	.mobinner-ad{display:none;}
			.adbox{display:none;}
			@media (max-width:768px){
				.mobinner-ad{display:block;} 
				.inner-ad{display:none;}
				.wrap-ad{display:none;} 
				.adbox {background: #dbdde3!Important;padding: 16px 0;position: relative;display:block;}
			}
			.outer { max-width: 1244px; margin: 0 auto;padding: 0;clear: both;overflow: hidden;}
			body .CN-pageWrapper > div {margin-bottom: 0px!important;}
			body .CN-section, body .CN-section * {font-family: 'Mukta',sans-serif !important;}
			.CN-section {display: flex;justify-content: space-between;}
			.CN-section .CN-sec-l {	width: 924px;min-width: 924px;}
			.CN-breadcum {font-size: 14px;padding: 4px 0;background: none;border-bottom: 1px dotted #939393;margin-bottom: 10px;line-height: 13px;color: #292929;text-transform: uppercase;}
			.CN-breadcum h1, .CN-breadcum h2 {display: inline-block;}
			.CN-breadcum h1 {font-size: 14px;font-weight: 400;font-family: 'Mukta',sans-serif !important;}
			.newadd{background: #efefef;line-height: 0; display: table; margin: auto;}
			.newadd span{display: block;font-size: 12px;color: #8E8E8E;text-align: center;height: 20px;line-height: 20px;width: 100%;}
			.adbox {
				background: #dbdde3!Important;
				padding: 16px 0;
				position: relative;
			}
			.vsp20 {margin-top: 20px;}	
			@media (max-width:768px){
				* { padding: 0; margin: 0; list-style: none; box-sizing: border-box; text-decoration: none; border-collapse: collapse; } body { font-family: 'Mukta',sans-serif!important; margin: 0; padding: 0; font-size: 13px; line-height: 19px; font-weight: 400; } .outer { width: 100%; display: block; overflow: auto !important; } .CN-section{display: block !important;width: 100%;} .CN-section .CN-sec-l { width: 100% !important; min-width: auto !important; } 
				.CN-breadcum { font-size: 13px; height: 34px; background: none; border-top: none; border-bottom: 1px dashed rgb(147 147 147 / 57%); display: flex; overflow: scroll; padding: 8px 10px 5px 10px; margin-bottom: 0;    line-height: 1.4; } .CN-breadcum a { padding: 0 4px; flex-shrink: 0; } body .CN-breadcum a span { padding: 0 4px 0 0; } body .CN-breadcum h1, body .CN-breadcum h2 { font-size: 13px; line-height: 19px; flex-shrink: 0; }
				.CN-sec-r {display: none;}
			}
			.cn-heading-1 {border-bottom: 3px solid #e1261d;margin-bottom: 10px;}
						.cn-heading-1 div {font-size: 22px;line-height: 20px;color: #e1261d;font-weight: bold;background: #fff;	position: relative;	top: 8px;padding-right: 4px;display: inline-block;text-transform: uppercase;}
						.cn-heading-1 div span {color: #001D42!important;top: 0;}
						.pageContent {font-size: 16px;line-height: 1.5; margin-top: 10px;}
						@media (max-width:768px){
							.cn-heading-1{padding: 0 0 0 10px; margin-bottom: 10px; border: none;}
							.CN-schedule-main {padding: 0 10px;}
							.pageContent {padding: 10px 10px;font-size: 16px;line-height: 1.5;}
						}
						.olympics-left {width: 100%; margin-right: 20px;}
							.super_group {width: 100%; margin-bottom: 40px;}
							.super_group_title {height: 40px; background: #F5F5F5 0% 0% no-repeat padding-box; display: flex; align-items: center; padding-left: 20px; letter-spacing: 0px; text-transform: uppercase; color: #E1261D; position: relative; font-size: 17px; font-weight: bold;}
							.super_group_title span {color: #202020; padding-left: 7px;}
							.super_group_title:after {content: ''; border-bottom: 1px solid #000000; border-right: 1px solid #000000; width: 5px; height: 5px; transform: rotate(-45deg); position: absolute; left: 6px; top: 18px;}
							.super_group_table {width: 100%;}
							
							.super_team_name {display: flex; align-items: center; color: #001D42; font-size: 15px;} .super_team_name {display: flex; align-items: center; color: #001D42; font-size: 15px;} .super_team_name img {width: 40px; background: #FFFFFF 0% 0% no-repeat; box-shadow: 0px 3px 6px #00000029; border: 1px solid #E8E8E8;}
							.super_team_name p {margin-bottom: 0; padding-left: 10px;}
							.super_team_name a {color: #001D42; font-size: 15px;}
							
							table.wc_table { width: 100%; } table.wc_table tr { background: #001D42; color: #fff;line-height: 2.4; } .wc_table tbody tr { border-bottom: 1px solid #D8D8D8; background: #fff; } .wc_table tr th:first-child, .wc_table tr td:first-child { width: 42px; padding-left: 10px; } .wc_table tr td { height: 40px; color: #202020; font-size: 13px; font-weight: bold; text-transform: uppercase; padding: 6px 5px; text-align: center; } .wc_table .wc_tableTeam { display: flex; align-items: center; } .wc_table .wc_tableTeam .name { color: #001D42; text-decoration: none!important; text-transform: capitalize; margin-left: 5px; font-weight: bold; text-transform: capitalize; } .wc_table .wc_tableTeam img { width: 40px; background: #FFFFFF 0% 0% no-repeat; box-shadow: 0px 3px 6px #00000029; border: 1px solid #E8E8E8; } .wc_table tbody tr:nth-child(even) { background: #f5f5f5; border-bottom: 1px solid #D8D8D8; }
              .add{text-align: center;}
		`}
      </style>
    </>
  );
};

export default PointTableMobile;
