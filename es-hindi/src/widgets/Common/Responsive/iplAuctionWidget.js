import { useEffect } from "react";

const IplAuctionWidget = ({ isAmp = false, iplAuctionList = {} }) => {
  useEffect(() => {
    if (!isAmp && iplAuctionList.switchOnOff) {
      //Start acrossScript Script
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://images.news18.com/ibnkhabar/uploads/assests/js/glide.min.js";
      document.body.appendChild(script);

      const acrossScript = document.createElement("script");
      //acrossScript.src = "https://images.news18.com/ibnkhabar/uploads/assets/event/common/js/iplAuctionWidget_2022.js";
      acrossScript.src = "https://images.news18.com/dlxczavtqcctuei/news18/prod/js/iplAuctionWidget_2023.js?v=12";
      acrossScript.defer = true;
      document.body.appendChild(acrossScript);
      //End acrossScript Script
    }
  }, []);

  return (
    <>
      {!isAmp && iplAuctionList.switchOnOff ? (
        <>
          <div id="ipl-widget"></div>
          <style global jsx>{`
          #ipl-widget{height: 80px;}
          @media only screen and (max-width: 720px) {
            #ipl-widget{height: 155px;}
          }
          `
          }</style>
        </>
      ) : (
        <>
          {iplAuctionList && iplAuctionList?.playersArray?.length ? (
            <>
              <div id="ipl-widget" style={{ height: "155px" }}>
                <div className="ipl_widget_outter ">
                  <div className="ipl_widget">
                    <div className="ipl_widget_left">
                      <a href="/ipl-auction/">
                        <p className="iwt " id="ipl_widget_text">
                          Live Updates<span>आईपीएल ऑक्शन 2023</span>
                        </p>
                        <i>
                          <amp-img
                            width="28px"
                            height="40px"
                            src="/images/logos/ipl.svg"
                            alt="News18 Hindi"
                            title="News18 Hindi"
                          ></amp-img>
                        </i>
                      </a>
                      <a href="/ipl-auction/" className="detailedview ">
                        विस्तार से पढ़ें
                      </a>
                    </div>
                    <div className="iwm">
                      <div>
                        <div className="iws">
                          <div id="players-list">
                            {iplAuctionList.playersArray.map((eachData, index) => {
                              return (
                                <div
                                  className={`ipwr ${eachData.ipl2023team.toLowerCase()}`}
                                  style={{ width: "295px", margin: "5px" }}
                                >
                                  <a href={eachData.teamplayerurl}>
                                    <div className="ipwrl">
                                      <p>{eachData.playernamehindi || ""}</p>
                                      <span>
                                        {eachData.ipl2023team || ""} |{" "}
                                        {eachData.typehindi || ""}
                                      </span>
                                    </div>
                                    <p className="ipwrr">
                                      ₹ {eachData.costinrcr || "0"}
                                      <span>(करोड़)</span>
                                    </p>
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="iwr">
                    <a href={iplAuctionList.specialURL} className="ipl_liveblog">आईपीएल ऑक्शन लाइव ब्लॉग</a>
                      <button
                        on="tap:find_squad_open.toggleClass(class='show')"
                        className="find_squad"
                      >
                        सर्च करें
                      </button>
                      <ul className="find_squad_open" id="find_squad_open">
                        <li>
                          <a href="/ipl-auction/top-10-players-list-1/">
                            Top 10 खिलाड़ी
                          </a>
                        </li>
                        <li>
                          <a href="/ipl-auction/gt-players-list-2/">
                            गुजरात टाइटन्स
                          </a>
                        </li>
                        <li>
                          <a href="/ipl-auction/csk-players-list-3/">
                            चेन्नई सुपर किंग्स
                          </a>
                        </li>
                        <li>
                          <a href="/ipl-auction/dc-players-list-4/">
                            दिल्ली कैपिटल्स
                          </a>
                        </li>
                        <li>
                          <a href="/ipl-auction/kkr-players-list-5/">
                            कोलकाता नाइट राइडर्स
                          </a>
                        </li>
                        <li>
                          <a href="/ipl-auction/pbks-players-list-6/">
                            पंजाब किंग्स
                          </a>
                        </li>
                        <li>
                          <a href="/ipl-auction/lsg-players-list-7/">
                            लखनऊ सुपर जायंट्स
                          </a>
                        </li>
                        <li>
                          <a href="/ipl-auction/mi-players-list-8/">
                            मुंबई इंडियंस
                          </a>
                        </li>
                        <li>
                          <a href="/ipl-auction/rcb-players-list-9/">
                            रॉयल चैलेंजर्स बैंगलोर
                          </a>
                        </li>
                        <li>
                          <a href="/ipl-auction/rr-players-list-10/">
                            राजस्थान रॉयल्स
                          </a>
                        </li>
                        <li>
                          <a href="/ipl-auction/srh-players-list-11/">
                            सनराइजर्स हैदराबाद
                          </a>
                        </li>
                        <li>
                          <a href="/ipl-auction/unsold-players-list-12/">
                            अनसोल्ड खिलाड़ी
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <style global jsx>{`
                @keyframes mymove {0%{background: #FF5148; } 50%{background: #fff; } 100%{background:#FF5148; } }
                .iwt span a {
                  text-decoration: none;
                  color: #fff;
                }
                #ipl_widget {
                  min-height: 62px;
                }

                .ipwrr span {
                  display: block;
                }
                div#ipl-widget {
                  clear: both;
                  width: 100%;
                  background: #f5f5f5;
                }
                .ipl_widget_outter {
                  background: #fff;
                  max-width: 1284px;
                  margin: auto;
                  padding: 0;
                  box-sizing: border-box;
                }
                .ipl_widget {
                  display: flex;
                  max-width: 1244px;
                  height: 60px;
                  margin: auto;
                  background: #f5f5f5 0% 0% no-repeat padding-box;
                  border: 1px solid #d0d0d0;
                  align-items: center;
                  width: 100%;
                  height: auto;
                  display: block;
                  box-sizing: border-box;
                  border: 0;
                  flex-wrap: wrap;
                }
                .ipl_widget_left {
                  width: 230px;
                  height: 60px;
                  background: #ff5148 0% 0% no-repeat padding-box;
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                  padding-right: 10px;
                  box-sizing: border-box;
                  width: 100%;
                  justify-content: flex-start;
                  padding-left: 10px;
                  position: relative;
                  height: 45px;
                }
                .ipl_widget_left a:first-child {
                  display: flex;
                  color: #fff;
                  align-items: center;
                }
                .iwt {
                  text-align: right;
                  display: block;
                  padding-right: 10px;
                  color: #fff;
                  text-transform: uppercase;
                  font-size: 14px;
                  font-family: "Segoe Pro Regular";
                  position: relative;
                  line-height: 18px;
                  margin: 0;
                }
                .iwt span {
                  display: block;
                  font-family: "Segoe Pro Bold";
                  font-size: 18px;
                }
                .iwt::after {
                  content: "";
                  position: absolute;
                  width: 6px;
                  height: 6px;
                  background: #fff;
                  border-radius: 100px;
                  right: 112px;
                  top: 7px;
                  animation-name: mymove;
                  animation-duration: 1s;
                  animation-iteration-count: infinite;
                }
                ipl_widget_left i {
                  position: relative;
                  top: 3px;
                }
                .detailedview {
                  display: block;
                  color: #ffffff;
                  text-transform: uppercase;
                  font-size: 12px;
                  position: absolute;
                  right: 15px;
                  bottom: 3px;
                  font-family: "Segoe Pro Bold";
                  padding-right: 9px;
                  text-decoration: underline;
                }
                .detailedview:after,
                .detailedview:before {
                  display: block;
                  position: absolute;
                  content: "";
                }
                .detailedview:before {
                  width: 6px;
                  height: 2px;
                  background: #fff;
                  right: -2px;
                  top: 8px;
                }
                .iwm {
                  width: 100%;
                  padding: 0;
                  padding-left: 10px;
                  box-sizing: border-box;
                  min-width: inherit;
                }
                .iws .glide__bullets {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 1px 0 10px;
                }
                .iws {
                  overflow: scroll;
                }
                .iws #players-list {
                  overflow: scroll;
                  padding: 9px 0;
                  height: auto;
                  display: flex;
                }
                .iwr {
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  height: auto;
                  align-items: center;
                  border-top: 1px dashed #c4c4c4;
                  background: #fff;
                  box-shadow: 0px 3px 6px #00000029;
                  padding: 0 10px;
                  position: relative;
                  border-left: 1px #d0d0d0 solid;
                  box-sizing: border-box;
                }
                a.ipl_liveblog {
                  color: #e1261d;
                  font-size: 11px;
                  position: relative;
                  font-family: "Segoe Pro Bold";
                  text-align: center;
                  display: block;
                  padding: 4px 4px 5px 22px;
                  border-bottom: 1px #d0d0d0 solid;
                  margin-bottom: 4px;
                  line-height: 16px;
                  text-transform: uppercase;
                  text-decoration: underline;
                  font-size: 12px;
                }
                a.ipl_liveblog {
                  border: 0;
                  padding-left: 20px;
                  font-size: 11px;
                  margin: 0;
                  line-height: 17px;
                  text-transform: uppercase;
                  text-decoration: underline;
                }
                a.ipl_liveblog:after {
                  background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/live_blog_1612899802.svg);
                  background-repeat: no-repeat;
                  background-position: left center;
                  content: "";
                  position: absolute;
                  left: 0;
                  width: 18px;
                  height: 18px;
                }
                a.ipl_liveblog:after {
                  background-size: 13px;
                  width: 13px;
                  top: 5px;
                }
                .find_squad {
                  width: 160px;
                  height: 24px;
                  background: #001d42 0% 0% no-repeat padding-box;
                  border-radius: 2px;
                  color: #fff;
                  background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/dropdown_arrow_1609752439.png);
                  background-position: 96% center;
                  appearance: none;
                  font-size: 11px;
                  padding: 0 5px 0 6px;
                  font-family: "Segoe Pro Bold";
                  text-transform: uppercase;
                  border: 0;
                  text-align: left;
                  outline: none;
                  font-size:12px;
                }
                ul.find_squad_open {
                  list-style: none;
                  background: #001d42 0% 0% no-repeat padding-box;
                  position: absolute;
                  width: 160px;
                  border-radius: 2px;
                  top: 52px;
                  display: none;
                  z-index: 99;
                }
                ul.find_squad_open {
                  right: 10px;
                  top: 24px;
                }
                li {
                  list-style: none;
                }
                ul.find_squad_open li a {
                  color: #fff;
                  font-size: 11px;
                  text-decoration: none;
                  position: relative;
                  font-family: "Segoe Pro Regular";
                  text-transform: uppercase;
                  padding: 9px 6px 9px 14px;
                  display: block;
                  border-bottom: 1px rgb(255 255 255 / 31%) solid;
                }
                .detailedview:after,
                .detailedview:before {
                  display: block;
                  position: absolute;
                  content: "";
                }
                .detailedview:after {
                  border-right: 2px solid #fff;
                  border-top: 2px solid #fff;
                  width: 4px;
                  height: 4px;
                  transform: rotate(45deg);
                  top: 6px;
                  right: -4px;
                }
                .ipwr.csk,
                .csk .ipwrl span {
                  border-color: #fdb913;
                }
                .ipwr {
                  height: 48px;
                  background: #ffffff 0% 0% no-repeat padding-box;
                  box-shadow: 0px 3px 6px #0000003d;
                  border-radius: 4px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  border-bottom: 4px #000 solid;
                  overflow: hidden;
                  flex-shrink: 0;
                }
                .ipwr a {
                  display: flex;
                  justify-content: space-between;
                  width: 100%;
                  align-items: center;
                  text-decoration: none;
                }
                .ipwrl {
                  width: calc(100% - 58px);
                  padding-left: 10px;
                  padding-top: 5px;
                  box-sizing: border-box;
                }
                .ipwrl p {
                  color: #464646;
                  font-size: 15px;
                  font-family: "Segoe Pro Bold";
                  line-height: 15px;
                  padding-bottom: 3px;
                  margin: 0;
                }
                .ipwrl span {
                  border-left: 4px #b32524 solid;
                  letter-spacing: 0px;
                  color: #464646;
                  text-transform: uppercase;
                  font-family: "Segoe Pro Regular";
                  font-size: 13px;
                  padding-left: 3px;
                  line-height: 10px;
                  display: inline-block;
                }
                .ipwrr {
                  width: 58px;
                  height: 44px;
                  background: #efefef 0% 0% no-repeat padding-box;
                  border-radius: 0px 4px 0px 0px;
                  text-align: center;
                  color: #464646;
                  font-family: "Segoe Pro Bold";
                  line-height: 16px;
                  padding-top: 7px;
                  margin: 0;
                }
                ul.find_squad_open.show {
                  display: block;
                }
                .ipwr.rcb,
                .rcb.ipwrl span {
                  border-color: #db1316;
                }
                .ipwr.kkr,
                .kkr .ipwrl span {
                  border-color: #3d2256;
                }
                .ipwr.kxip,
                .kxip .ipwrl span {
                  border-color: #b32524;
                }
                .ipwr.csk,
                .csk .ipwrl span {
                  border-color: #fdb913;
                }
                .ipwr.dc,
                .dc .ipwrl span {
                  border-color: #004c93;
                }
                .ipwr.rr,
                .rr .ipwrl span {
                  border-color: #004b8c;
                }
                .ipwr.mi,
                .mi .ipwrl span {
                  border-color: #005ea0;
                }
                .ipwr.srh,
                .srh .ipwrl span {
                  border-color: #fb653f;
                }
              `}</style>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default IplAuctionWidget;
