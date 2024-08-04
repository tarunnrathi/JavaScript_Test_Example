import React from "react";
//import SiteAd from "widgets/Common/Responsive/SiteAd";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const AQIWidget = ({ isMobile = false, aqiData = [] }) => {
  //useEffect(() => {
  //   setTimeout(() => {
  //   try {
  //     const script = document.createElement("script");
  //     const showscript = document.createElement("script");
  //     const div = document.createElement("div");
  //     script.defer = true;
  //       script.innerHTML = `
  //       window.googletag = window.googletag || {cmd: []};
  //       googletag.cmd.push(function() {
  //         googletag.defineSlot('/1039154/NW18_HIND_Desktop/NW18_HIND_TRACKERS/NW18_HIND_LLOYD_IMPRSN_TRACKER', [1, 1], 'div-gpt-ad-1681135242663-0').addService(googletag.pubads());
  //         googletag.pubads().enableSingleRequest();
  //         googletag.enableServices();
  //       });
  //     `;

  //       div.setAttribute("id", 'div-gpt-ad-1681135242663-0');
  //       showscript.innerHTML = `
  //       googletag.cmd.push(function() { googletag.display('div-gpt-ad-1681135242663-0'); });
  //       `;
  //       div.appendChild(showscript);
  //       document.head.appendChild(script);
  //       document.head.appendChild(div);
  //     //}
  //   } catch {
  //     //
  //   }
  // }, 1000);
//}, []);

  return (
    <>
      <div className="air-quality-index-ad">
        {/* <SiteAd
          slotId="air-quality-index"
          adUnit={
            "NW18_HIND_Desktop/NW18_HIND_Desktop_IMPRSN_TRACKER/NW18_HIND_Desktop_Dabur_IMPRSN_TRACKER"
          }
          sizes={[[1, 1]]}
          lazyload={true}
        /> */}
         <NewSiteAd          
          slotId={"air-quality-index"}
          adUnit={"NW18_HIND_Desktop/NW18_HIND_Desktop_IMPRSN_TRACKER/NW18_HIND_Desktop_Dabur_IMPRSN_TRACKER"}
          sizes={[[1, 1]]}
          lazyLoad={true}
        ></NewSiteAd>
      </div>
      {
        aqiData && aqiData.length ? (
          <div className="aqiwidget kul mrg10">
            <div className="aqiwidgethd">
              <h2>AQI</h2>
              {/* <a
                href="http://pubads.g.doubleclick.net/gampad/clk?id=6271856365&iu=/1039154/NW18_HIND_Desktop/NW18_HIND_TRACKERS/NW18_HIND_LLOYD_CLICK_TRACKER"
                target="_blank"
                className="presentedLogo"
              >
                <div>Presented by</div>
                <img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/havelslogo_1681199405.png" />
              </a> */}
            </div>
            <ul className="aqiwidgetlist">
              {
                aqiData.map((eachData, index) => {
                  if (eachData?.cityName && eachData?.airComponents && eachData?.airComponents['1']?.sensorData) {
                    const { cityName, airComponents: { "1": { sensorData } } } = eachData;
                    const condition = sensorData >= 401 ? 'Hazardous' : sensorData >= 301 ? 'Severe' : sensorData >= 201 ? 'unhealthy' : sensorData >= 101 ? 'Poor' : sensorData >= 51 ? 'Moderate' : 'Good';
                    return <li key={`aqilist-${Math.random()}`} className={`aqistatus${condition.toLowerCase()}`}>
                      <a href={`${publicRuntimeConfig.siteUrl}aqi-india/${cityName.toLowerCase().replace(' ','-')}/`} target="_blank" rel="noreferrer">
                        <span>
                          <em className="aqiwidgetsprite aqilcn" />{cityName}
                        </span>
                        <div className={`aqicol_wrp ${condition.toLowerCase()}`}>
                          <div className="aqi-col1">
                            <div className="aqicount">{sensorData || 0}</div>
                            <div className="aqitxt">(AQI-US)</div>
                            <div className="aqicounttext aq">{condition}</div>
                          </div>
                          <div className="aqi-col2" />
                        </div>
                      </a>
                    </li>;
                  }
                })
              }
            </ul>
            <a
              href="https://www.aqi.in/"
              target="_blank"
              rel="noindex, nofollow"
              className="aqiwidgetsprite aqipwrdbylogo"
            ></a>
          </div>
        ) : ""
      }

      <style global jsx>{`
        .weatherWidgetOutter {
          margin: 10px 0 20px;
        }

        .weatherHeading {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          align-items: flex-end;
          border-bottom: 3px solid #e1261d;
          padding-bottom: 5px;
        }
        .weatherHeading h2 {
          font-size: 22px;
          line-height: 20px;
          color: #e1261d;
          background: #fff;
          display: inline-block;
          font-weight: 700;
          text-transform: uppercase;
        }
        .weatherHeading a {
          display: flex;
        }
        .tomorrow_power_by {
          color: #6c757d;
          font-size: 9px;
          text-transform: uppercase;
        }
        span#vigyapan {
          color: #797e90;
          font-size: 11px;
          text-align: center;
          padding: 2px 0 0;
          display: block;
          line-height: 16px;
          background: #eee;
        }
        .air-quality-index-ad {
          margin: 10px 0 0;
        }

        .aqiwidget{padding: 10px 0; border-bottom: 1px solid #EBEBEB; font-family: Muli,Helvetica Neue,Helvetica,Arial,sans-serif;} 
        .aqiwidgethd{display: flex; justify-content: space-between;border-bottom: 3px solid #e1261d; margin-bottom: 10px;padding-bottom: 5px;
        align-items: center;}
        .aqiwidgethd h2, aqiwidgethd h3{font-size: 20px;color: #e1261d;font-weight: 600;text-transform: uppercase; line-height: 18px;}
        .aqiwidgetsprite{background: url(/images/siteimages/aqisprite_1646460033.png) 0 0 no-repeat; display: inline-block;}
        
        .aqiwidgetsprite.aqilcn{background-position: 0px -46px;width: 9px;height: 12px;margin-right: 5px;position: relative;top: 2px;}
        .aqiwidgetsprite.aqipwrdbylogo{background-position: -325px 0px;width: 134px;height: 40px;display: block;margin: 12px auto auto;}
        .aqiwidgetlist{display: flex;justify-content: space-between;flex-wrap: wrap;gap: 12px;}
        .aqiwidgetlist li{background: #FAFAFA; padding: 8px 10px;box-shadow: 0px 2px 6px #0000001A;border: 1px solid #DFDFDF;border-radius: 6px;    box-sizing: border-box;width: 48%;}

        .aqiwidgetlist li span{color: #000000;font-size: 12px;text-align: center;display: block;}
        .aqiwidgetlist li.aqistatusgood{color: #34A12B;}
        .aqiwidgetlist li.aqistatusmoderate{color: #D4CC0F;}
        .aqiwidgetlist li.aqistatuspoor{color: #E9572A;}
        .aqiwidgetlist li.aqistatusunhealthy{color: #E84B9C;}
        .aqiwidgetlist li.aqistatussevere{color: #9858A2;}
        .aqiwidgetlist li.aqistatushazardous{color: #C11E2F;}
        .aqiwidgetlist li.aqistatusgood .aqicounttext{ background: #34A12B; }
        .aqiwidgetlist li.aqistatusmoderate .aqicounttext{ background: #D4CC0F; }
        .aqiwidgetlist li.aqistatuspoor .aqicounttext{ background: #E9572A; }
        .aqiwidgetlist li.aqistatusunhealthy .aqicounttext{ background: #E84B9C; }
        .aqiwidgetlist li.aqistatussevere .aqicounttext{ background: #9858A2; }
        .aqiwidgetlist li.aqistatushazardous .aqicounttext{ background: #C11E2F; }
        .aqiwidgetlist li>a{color: inherit;}
        .aqicounttext{height: 22px; color: #fff; line-height: 22px; text-align: center;text-shadow: 0px 3px 6px #00000029; font-size: 12px;    border-radius: 6px;}
        /*.aqicount{font-size: 36px; font-weight:bold; height: 68px;display: flex;align-items: center;    justify-content: space-around;}*/

        .aqi-col2:after{content: ""; height: 68px; display: block; background: url(/images/siteimages/aqisprite_1646460033.png) 0 0 no-repeat;}
        .aqiwidgetlist li.aqistatusgood .aqi-col2:after{background-position: -83px 0px;width: 30px;}
        .aqiwidgetlist li.aqistatusmoderate .aqi-col2:after{background-position: -114px 0px;width: 30px;}
        .aqiwidgetlist li.aqistatuspoor .aqi-col2:after{background-position: -145px 0px;width: 37px;}
        .aqiwidgetlist li.aqistatusunhealthy .aqi-col2:after{background-position: -184px 0px;width: 37px;}
        .aqiwidgetlist li.aqistatussevere .aqi-col2:after{background-position: -223px 0px;width: 40px;}
        .aqiwidgetlist li.aqistatushazardous .aqi-col2:after{background-position: -264px 0px;width: 58px;}

        .aqicount { font: 900 36px/14px Lato; letter-spacing: -0.72px; height: 44px; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-align-items: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: space-around; -webkit-justify-content: space-around; -ms-flex-pack: space-around; justify-content: space-around; }
        .aqicol_wrp{display: flex;align-items: center;}
        .aqicol_wrp .aqi-col1{flex-grow: 1;}
        .aqicol_wrp .aqi-col2{width: 58px;height: 72px;}
        .aqitxt{font: 400 10px/14px Lato;color: #5A5A5A;text-align: center;margin-bottom: 6px;}
        .presentedLogo {text-align: center; font-size: 11px;}
      `}</style>
    </>
  );
};

export default AQIWidget;
