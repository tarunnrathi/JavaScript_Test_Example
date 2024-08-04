import { useEffect } from "react";
import TableDesktop from "components/IplAuction/TableDesktop";
import TableMobile from "components/IplAuction/TableMobile";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import IplAuctionSocialShare from "components/IplAuction/IplAuctionSocialShare";
import IplAuctionTeamFilters from "components/IplAuction/IplAuctionTeamFilters";
import { getMeta, getNumberFormatter } from "util/global/Helper";
import dynamic from "next/dynamic";
const RhsCommon = dynamic(() => import("widgets/Common/Desktop/RhsCommon"));

const IplAuction = (props) => {
  const sectionId = props.data.currentUrl.split('/').slice(-2)[0].split('-').slice(-1)[0] || 0;
  const domain = props.data.currentUrl.split("/ipl-auction")[0];
  const topStories = props?.data?.rhsTopStory;
  const photoStories = props?.data?.rhsPhotoGallery;

  const iplPlayersData = props?.data?.iplPlayersData;
  const iplPlayersDataArray = Object.keys(iplPlayersData);
  const iplTeamsData = props?.data?.iplTeamsData[0];
  const iplTeamsDataOnly = iplTeamsData?.teams;
  const isMobile = props?.data?.isMobile;

  useEffect(() => {
		let previousScroll = 0;
		let isbackScoll = false;
		let currentHash = "/ipl-auction/";
		window.addEventListener('scroll', async (e) => {
			let currentScroll = window.pageYOffset;
			if (typeof document.getElementsByClassName('ipl-auction-2021-div') !== 'undefined') {
				Object.values(document.getElementsByClassName('ipl-auction-2021-div')).forEach(function (element) {
					let viewportTop = window.pageYOffset;
					let elementTop = element.offsetTop;
					let title = element.getAttribute('title');
					let hash = element.getAttribute('rel');
					let distanceBetween = viewportTop - elementTop;
					if (distanceBetween < 10 && distanceBetween > -10 && currentHash != hash) {
						currentHash = hash;
						document.title = title;
						history.replaceState({}, '', currentHash);						
					}
					if (viewportTop < 100 && isbackScoll == true) {
						history.replaceState({}, '', '/ipl-auction/');
						document.title = props?.data?.pageSeo?.title || title;
					}
				});
			}

			if (currentScroll < previousScroll) {
				isbackScoll = true;
			} else {
				isbackScoll = false;
			}

			previousScroll = currentScroll;
		});

	}, []);

  const scrollToElement = (sectionId) => {
    sectionId = sectionId.replace("link", "");
    const targetElement = document.getElementById(sectionId);
    document.title = targetElement?.getAttribute('title');
    if (targetElement) {
      const distance = isMobile ? 70 : 300;
      window.scrollTo({
        top: targetElement.offsetTop + distance,
        behavior: 'smooth',
      });
    }
  }
  useEffect(() => {
    if (sectionId > 0) {
      scrollToElement("ipl-auction-2021-" + sectionId);
    }
  }, []);

  return (
    <>
      <div className="newcontainer clearfix">
        <div className="newleftwrap">
          <div className="breadcrumb">
            <ul>
              <li>
                <a href="/">NEWS18 HINDI</a>
              </li>{" "}
              »<li>{iplTeamsData?.labels?.iplplayerauction}</li>
            </ul>
          </div>
          {props?.data?.isMobile && (
            <div className="add">
              <div className="addinner-box">
                <NewSiteAd
                  slotId="ATF_320_id"
                  adUnit={props?.pageAds?.ATF_320}
                  sizes={[[300, 250]]}
                  width={300}
                  height={250}
                  lazyLoad={true}
                />
              </div>
            </div>
          )}
          <div className="ipl_top">
            <h1 className="ipl_heading">{iplTeamsData?.labels?.liveupdates}: {iplTeamsData?.labels?.iplplayerauction}</h1>
            <h3 className="ipl_suub_heading" style={{ fontSize: 20 }}>
              टीम और खिलाड़ी
            </h3>
            <ul>
              <li>
              {iplTeamsData?.labels?.noofsquads}: <span>10</span>
              </li>
              <li>
              {iplTeamsData?.labels?.playersbought}: <span>{iplTeamsData?.players_bought}/{iplTeamsData?.total_players}</span>
              </li>
              <li>
              {iplTeamsData?.labels?.slotsavailable}:<span>{iplTeamsData?.slots_available}/{iplTeamsData?.total_slots}</span>
              </li>
            </ul>
            <p />
            <p>{iplTeamsData?.main_description}</p>
          </div>
          {
            iplPlayersDataArray?.length > 0 && iplPlayersDataArray.map((item, indexOuter) => {
              let pindex = indexOuter + 1;
              let topUrl = item === 'top_10' ? 'top-10' : item;
              let url = `/ipl-auction/${topUrl}-players-list-${pindex}/`;
              let dataItems = iplPlayersData[item];
              let teamsData =  iplTeamsDataOnly[item];
              return (
                <div className="results_info_section ipl-auction-2021-div show" id={`ipl-auction-2021-${pindex}`} rel={url} title={getMeta(item).title}>
                  <div className="results_info">
                    <p className="results_info_title"><i>{iplTeamsData?.text}:</i>आईपीएल ऑक्शन <b>2024:</b><span>{teamsData?.fullname || teamsData?.team}</span></p>
                    <p className="results_info_p">{teamsData?.description}</p>
                  </div>
                  {
                    item && item !== 'top_10' && item !== 'unsold' && (
                      <div className="ipl_budget">
                          <div className="ipl_budget_row">
                            <p className="total_budget">बजट (शेष) </p>
                            <ul className="budget_list">
                              <li>
                                <p>
                                  <sup>₹</sup>{teamsData?.remaininginrcr} <sub>{iplTeamsData?.labels?.crorelabel && (`(${iplTeamsData?.labels?.crorelabel})`)}</sub>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <sup>$</sup>{teamsData?.remainingusdth} <sub>(000)</sub>
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="ipl_budget_row">
                            <p className="total_budget">बजट (खर्च)</p>
                            <ul className="budget_list">
                              <li>
                                <p>
                                  <sup>₹</sup>{teamsData?.spentinrcr} <sub>{iplTeamsData?.labels?.crorelabel && (`(${iplTeamsData?.labels?.crorelabel})`)}</sub>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <sup>$</sup>{teamsData?.spentusdth} <sub>(000)</sub>
                                </p>
                              </li>
                            </ul>
                          </div>
                      </div>
                    )
                  }                

                  <div className="result_table">
                    <IplAuctionSocialShare                      
                      title={getMeta(item).title}
                      url={url}
                      isMobile={isMobile}
                      domain={domain}
                    />          
                    <div className="result_table_info ">
                      {
                        item && item === 'top_10' ? (
                          <table id={item}>
                            <tbody>
                              <tr>
                                <th>#</th>
                                {props?.data?.isMobile ? (
                                  <>
                                    <th>खिलाड़ी | टीम | (टीम में भूमिका)</th>
                                    <th>कीमत</th>
                                  </>
                                ) : (
                                  <>
                                    <th>खिलाड़ी | टीम</th>
                                    <th>(टीम में भूमिका)</th>
                                    <th>कीमत (करोड़ रुपए) </th>
                                    <th>कीमत $(000) </th>
                                    <th>टीम 2023</th>
                                  </>
                                )}
                              </tr>
                              {dataItems?.length > 0 && dataItems.map((players, index) => (
                                index < 10 && <tr key={index}>
                                  <td>{index + 1}.</td>
                                  {props?.data?.isMobile ? (
                                    <>
                                      <td>
                                        <span>{players.playername}</span>
                                        <br /> {players.ipl2024team} | {players.type}
                                      </td>
                                      <td>
                                        <strong>
                                          ₹ {players.costinrcr} <span>{iplTeamsData?.labels?.crorelabel && (`(${iplTeamsData?.labels?.crorelabel})`)}</span>
                                        </strong>
                                        <strong>
                                          $ {getNumberFormatter(players.costusdth)} <span>(000)</span>
                                        </strong>
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td style={{textAlign: 'left'}}>
                                        {players.playername} <span style={{textTransform: 'uppercase'}}>{players.ipl2024team ? ' | '+players.ipl2024team : ''}</span>
                                      </td>
                                      <td style={{textAlign: 'left'}}>{players.type}</td>
                                      <td style={{textAlign: 'right'}}>
                                        <strong>{players.costinrcr}</strong>
                                      </td>
                                      <td style={{textAlign: 'right'}}>
                                        <strong>{getNumberFormatter(players.costusdth)}</strong>
                                      </td>
                                      <td style={{textAlign: 'left'}}>{players.ipl2023team}</td>
                                    </>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          !props?.data?.isMobile ? (
                            <TableDesktop id={item} data={dataItems} teamsData={teamsData} />
                          ) : (
                            <TableMobile id={item} data={dataItems} teamsData={iplTeamsData} />
                          )
                        )
                      }
                    </div>
                  </div>
                  <IplAuctionTeamFilters domain={domain} teamsData={iplTeamsData} iplPlayersDataArray={iplPlayersDataArray} />
                </div>
              )
            })
          }          
        </div>
        <div className="newrightwrap">
          <div className="artcl_rght">
            <RhsCommon
              pageAds={props?.pageAds}
              photoStories={photoStories}
              topStories={topStories}
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
          .newcontainer{max-width:1244px; margin:auto;background-color: #fff; padding: 0 10px}
          .newleftwrap{width: calc(100% - 325px);float: left;position: relative; padding: 15px 0;}
          .newrightwrap {width: 300px;float: right;padding: 15px 0;}
          .ipl_heading {color: #E1261C; text-align: center; font-size: 36px; padding-bottom: 5px; letter-spacing: -0.64px; font-weight: bold;}
          .ipl_suub_heading {color: #001D42; text-align: center; font-size: 25px; text-transform: uppercase;}
          .ipl_top ul { height: 18px;	background: #F1F1F1 0% 0% no-repeat padding-box;width: 100%; display: flex; justify-content: center; list-style-type: none; margin: 15px 0 10px;}
          .ipl_top ul li {color: #838383;	font-size: 14px;border-right: 1px solid rgb(131 131 131 / 48%); padding: 0 14px;	background: #fff;}
          .ipl_top ul li span {color: #464646; font-size: 15px; padding-left: 7px; font-weight: bold; vertical-align: unset;}
          .ipl_top p {color: #464646;	font-size: 15px; line-height: 23px; padding-bottom: 20px;}
          .ipl_page_left p {margin: 0;}
          .results_info_section{width:100%;background:#f1f1f1;border-top:5px #001d42 solid;padding-top:10px;border-bottom:1px solid #ddd;padding-bottom:20px}
					.results_info{padding:0 20px}
					.ipl_page_left p{margin:0}
          .results_info_title{font-size:22px;font-style:italic;color:#282828;text-transform:uppercase;padding-bottom:10px;position:relative;padding-left:15px}
					.results_info_title i{font-weight:300;color:#e1261c;padding-right:5px}
					.results_info_title span{color:#e1261c;text-decoration:underline;padding-right:5px}
					.results_info_title:after{content:"";position:absolute;left:0;width:8px;height:8px;background:#e1261c 0 0 no-repeat padding-box;border-radius:100px;top:10px}
					.results_info_title:after{animation-name:mymove;animation-duration:1s;animation-iteration-count:infinite}
          @keyframes mymove {
            0% {
                background: #E1261C;
            }
        
            50% {
                background: #fff;
            }
        
            100% {
                background: #E1261C;
            }
          }
					.results_info_p{color:#464646;font-size:14px;line-height:22px;padding-bottom:10px}
					.result_table{display:flex;padding:0 20px}					
					 a img{border:0}.result_table_info{width:calc(100% - 50px)}
					.result_table_info table{width:100%;border-collapse:collapse}
					.result_table_info table tr:first-child{background:#464646;height:30px}
					.result_table_info table tr{height:36px;background:#efefef}
					.result_table_info table tr th{color:#fff;text-align:center;font-size:13px;font-weight:bold;text-transform:uppercase;border:1px solid #d7d7d7;vertical-align:middle}
					.result_table_info table tr:nth-child(even){background:#fff}
					.result_table_info tr td{ border:1px solid #d7d7d7;height:12px;text-align:center;font-size:14px;color:#464646;padding:5px 10px;vertical-align:middle}
					
          .pwa_filter.active { display: block;}        
          .pwa_filter {position: fixed; width: 100%; bottom: 52px; background: #F1F1F1; z-index: 99; border-bottom: 0.5px solid #DDDDDD; display: none; left: 0;}
          .clear_filter {letter-spacing: 0px; color: #464646; text-transform: uppercase; font-style: normal; font-size: 13px; font-family: 'Segoe Pro Regular';  position: relative;  cursor: pointer;border: 1px #464646 solid;   display: block; width: 20px;height: 20px;border-radius: 100px; text-align: center;}
          .clear_filter:after, .clear_filter:before { position: absolute; left: 9px; content: ' ';  height: 13px; width: 1px; background-color: #565656; top: 3px;}
          .clear_filter:before {transform: rotate(45deg);}
          .clear_filter:after {transform: rotate(-45deg);}
					.ipl_ad {width: 728px; min-height: 90px; background: #e0e0e0; margin: 30px auto;}
          .ipl_budget {display: flex;	justify-content: center; max-width: 836px;	margin: auto;margin-bottom: 15px;}
					.ipl_budget_row {width: 407px;	background: #FFFFFF 0% 0% no-repeat padding-box;box-shadow: 0px 3px 6px #00000029;	border: 1px solid #D6D6D6;	border-radius: 4px;	margin: 0 10px;	padding: 8px 10px; box-sizing: border-box;}
					.total_budget {color: #464646;	text-transform: uppercase; font-size: 12px;	border-bottom: 1px #DDDDDD solid;}
					ul.budget_list {list-style-type: none;	display: flex; justify-content: space-evenly; align-items: center; margin-top: 8px;}
					ul.budget_list li {	width: 50%;border-right: 1px #D8D8D8 solid;margin-right: 10px;}
					ul.budget_list li p {color: #001D42; font-size: 30px; font-weight: bold; line-height: 16px;}
					ul.budget_list li p sup {font-size: 18px; color: #464646; position: relative; padding-right: 3px;top: 4px;		font-weight: normal;}
					ul.budget_list li p sub {font-size: 12px;color: #464646;position: relative;	top: -7px;left: 5px;}					
          td {text-align: center;}  
          .breadcrumb {
            width: 100%;
            padding: 5px 0;
            border-bottom: 1px dashed #C4c4c4;
            margin-bottom: 10px;
          }
          .breadcrumb ul {
            display: flex;
            align-items: center;
            font-size: 11px;
            font-family: "Mukta",sans-serif
            list-style-type: none;
            text-transform: uppercase;
          }
          .breadcrumb ul li:first-child {
            margin-left: 0;
          }
          .breadcrumb ul li {
            letter-spacing: 0px;
            font-size: 11px;
            margin: 0 7px;
            color: #969696;
          }
          .breadcrumb ul li a {
            text-decoration: none;
            color: #969696;
            font-weight: 200;
            font-family: "Mukta",sans-serif
          } 
          .breadcrumb ul li:last-child {
            color: #001D42;
            line-height: 12px;
          }
          .show_more {
            height: 30px;
            background: #474747 0% 0% no-repeat padding-box;
            text-align: center;
            width: 100%;
            display: block;
            line-height: 30px;
            text-transform: uppercase;
            font-size: 12px;
            font-family: 'Segoe Pro Bold';
            color: #fff;
            text-decoration: none;
            cursor:pointer;
          }
          .myad {
            margin: 0 auto;
            display: block;
            max-width: 300px;
          }
          @media (max-width:768px){
            .newrightwrap{display:none;}
            .newleftwrap {width: 100%;}
          }
        @media (max-width:768px){						
          .ipl_heading {font-size: 26px; line-height: 32px; font-weight: 400;}
          .ipl_suub_heading {font-weight: 400; border-bottom: 1px solid #DDDDDD;}
          .ipl_top ul{height: auto; background: #F1F1F1 0% 0% no-repeat padding-box; margin: 5px 0 10px; flex-wrap: wrap;}
          .ipl_top ul li {color: #838383;	font-size: 13px; background: #fff; padding: 0 12px;border: none;}
          .ipl_top ul li:last-child {border: 0; width: 258px;	text-align: center;}
          .ipl_top p {font-size: 16px;line-height: 22px;}
        }
        @media (max-width:768px){
          .results_info_title i {width: 100%;	display: block;	font-size: 14px; font-weight: bold;}
          .results_info_title {font-size: 21px;}
          .result_table {display: block;}          
          .pwa_filter {display: none;}
          
          .result_table_info {width: 100%;}
          .result_table_info table tr th {font-size: 11px;}
          .result_table_info tr td {padding: 7px;	font-size: 13px;}
          .results_info_section table tbody td:nth-child(2), .results_info_section table tbody td:nth-child(3) {text-align: left;}
          .results_info_section table tbody td:nth-child(2) {	width: 61%;	font-size: 13px;}
          .result_table_info tr td strong {color: #464646;display: block;}
          .result_table_info tr td strong span {font-size: 12px;color: #A5A5A5;padding-left: 6px;}
        }
        @media (max-width:768px){.ipl_ad{display:none;}}
        @media (max-width:768px){
          .ipl_budget{display:flex;justify-content:center;width:calc(100% - 30px);margin:auto;margin-bottom:15px;background:#fff 0 0 no-repeat padding-box;box-shadow:0 3px 6px #00000029;border:1px solid #d6d6d6;border-radius:4px;margin-right:10px}
          .ipl_budget_row:first-child{margin-left:0}
          .ipl_budget_row:last-child{border-right:0}
          .ipl_budget_row{margin:10px 0;padding:0 10px;box-sizing:border-box;width:50%;border:0;border-right:1px #ddd solid;box-shadow:unset;border-radius:0}
          .total_budget{color:#464646;text-transform:uppercase;font-size:12px;border-bottom:1px #ddd solid;padding-bottom:2px;display:block}
          ul.budget_list{margin-top:10px;display:block}
          ul.budget_list li{width:100%;line-height:13px;display:block;border:0}
          ul.budget_list li p{font-size:22px}
          ul.budget_list li p sup{font-size:18px;color:#464646;position:relative;padding-right:3px;top:7px}
          ul.budget_list li p sub{font-size:12px;color:#a5a5a5;position:relative;top:-7px;left:5px}
          ul.budget_list li:last-child{border:0;margin:0} 
          .filter_opation {display: block;}    
        }
        .add {
          padding: 15px;
          margin: 20px 0px;
          text-align: center;
          display: flex;
          overflow: hidden;
          background: #dbdde3;
          justify-content: center;
          min-height: 280px;
        }
      `}</style>
    </>
  );
};
export default IplAuction;
