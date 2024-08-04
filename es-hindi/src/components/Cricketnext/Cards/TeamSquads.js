import PlaceholderCard from "./PlaceholderCard";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import LazyImage from "components/Common/LazyLoadImage";
import { getPlayerUrl } from "includes/article.util";
import { useEffect } from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const TeamSquads = ({ data, config, score, isMobile, pageAds }) => {
  if(!Object.keys(data?.teams?.[data?.teama_id]?.players || {}).length > 0) {
    return null;
  }
  if (config.isLoading) {
    return <PlaceholderCard />;
  }
  const teamDetails = [];
  if(data?.teams[data?.teama_id]) {
    teamDetails.push(data?.teams[data?.teama_id]);
  }
  if(data?.teams[data?.teamb_id]) {
    teamDetails.push(data?.teams[data?.teamb_id]);
  }

  let head2head = [];
  if(data?.h2h?.heade2head.length > 0) {
    head2head = data?.h2h?.heade2head;
  }

  let head2headTopPerformer = [];
  if(data?.h2h?.heade2headTopPerformer.length > 0) {
    head2headTopPerformer = data?.h2h?.heade2headTopPerformer;
  }

  useEffect(() => {
    const b = document.querySelectorAll(".CN-accordion-toggle");
    if (b && b.length && isMobile) {
      b.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const { target } = e;
          target.classList.toggle("active");
          const next = target.nextElementSibling;
          if(next) {
            next.classList.toggle("active");
          }
        });
      });
    }
  }, []);
  return (
    <>
      <div className="scoreCard-main matchinfowrap">
        {teamDetails?.length > 0 && (
          <div className="squadWrap">
            {teamDetails.map((team, key) => {
              const teamName = team?.name || null;
              const teamId = key == 0 ? data.teama_id : data.teamb_id;
              return (
                <>
                <div className="squad-boxes">
                  <a className="heading CN-accordion-toggle active">
                    <div className="flag">
                      <LazyImage
                        holder={publicRuntimeConfig.flagHolder}
                        src={`${publicRuntimeConfig.cricketImageFlagBase}${teamId}.png`}
                        alt={teamName}
                        title={teamName}
                        height={17}
                        width={32}
                        dontAlter={true}
                      />
                    </div>
                    <div className="teamname">{teamName} स्क्वाड</div>
                    {isMobile && <div className="dropbtn"></div>}
                  </a>
                  <ul className="CN-accordion-content active" id={`content-${key + 1}`}>
                    {team?.playerDetails?.map((player, key) => {
                      return (
                        <li key={key}>
                          <a href={getPlayerUrl(player.name_eng, player.id)}>
                            <div className="img">
                              <LazyImage
                                holder={publicRuntimeConfig.capHolder}
                                src={`${publicRuntimeConfig.cricketImageProfileBase}${player.id}.png`}
                                alt={player.name}
                                title={player.name}
                                height={30}
                                width={30}
                                dontAlter={true}
                              />
                            </div>
                            <div className="txt">
                              <h3 className="playername">
                                {player?.name}
                                <span className="livebtn">
                                  {data?.teamids?.includes(player.id)
                                    ? "*"
                                    : ""}
                                </span>
                              </h3>
                              <p className="playstatus">{player?.skill_name}</p>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {pageAds?.ATF_300 && key == 0 ? (
                  <div className="ad-container">
                    <div className="addinner-box">
                      <SiteAd
                        width={300}
                        height={250}
                        slotId="mobileAdNew300x250_1"
                        adUnit={pageAds.ATF_300}
                        lazyload={true}
                        sizes={[

                          [300, 250]

                        ]}
                      ></SiteAd>
                    </div>
                  </div>
                ) : null}
                </>
              );
            })}
          </div>
        )}
      </div>
      <div className="match-infotableWrap">
        {head2head.length > 0 && (
          <table className="matchinfo-table">
            <tbody>
              <tr>
                <th>HEAD TO HEAD</th>
                <th>{data?.teama}</th>
                <th>{data.teamb}</th>
              </tr>
              {
                head2head.map((item, index) => {
                  return (
                    <tr>
                      <td>{item?.title}</td>
                      <td>{item?.valueA}</td>
                      <td>{item?.valueB}</td>
                    </tr>
                  );
                })
              }
            </tbody>
            <tbody></tbody>
          </table>
        )}
        {head2headTopPerformer.length > 0 && (
          <table className="matchinfo-table">
            <tbody>
              <tr>
                <th>TOP PERFORMERS</th>
                <th>{data?.teama}</th>
                <th>{data.teamb}</th>
              </tr>
              {
                head2headTopPerformer.map((item, index) => {
                  return (
                    <tr>
                      <td>{item?.title}</td>
                      <td>{item?.valueA}</td>
                      <td>{item?.valueB}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        )}
      </div>
      {pageAds?.BTF_300 ?
        <div className="ad-container">
          <SiteAd
            slotId="cricket_next_ad"
            adUnit={pageAds.BTF_300}
            sizes={[
              [300, 250],
              [336, 280],
            ]}
            width={336}
            height={300}
            lazyload={true}
          />
        </div> : null}
      <style>{`
        .scoreCard-main {
            background: #F5F5F5;
            padding: 15px;
            border-radius: 15px;
        }
        .scoreCard-main.matchinfowrap {margin-bottom: 30px;}
        .matchinfowrap .squadWrap{display: flex;justify-content: space-between;}
        .matchinfowrap .squadWrap .squad-boxes{width: 49%;background: #FFFFFF;padding: 10px 20px;border-radius: 15px;box-sizing: border-box;border: 1px solid #D8D8D8;box-shadow: 0 5px 7px #D8D8D8;background-color: white;}
        .matchinfowrap .squadWrap .squad-boxes .heading{display: flex;border-bottom: 1px solid #D8D8D8;padding-bottom: 5px;}
        .matchinfowrap .squadWrap .squad-boxes .heading .flag{width: 32px;margin-right: 8px; display: flex; align-items: center;}
        .matchinfowrap .squadWrap .squad-boxes .heading .flag img{display: block;}
        .matchinfowrap .squadWrap .squad-boxes .heading .teamname{font-family: 'Mukta',sans-serif !important;font-weight: bold;text-transform: uppercase;font-size: 20px;color: #FF5148;}
        .matchinfowrap .squadWrap .squad-boxes ul{display: flex;justify-content: space-between;flex-wrap: wrap;padding:12px 0 0;}
        .matchinfowrap .squadWrap .squad-boxes ul li{width:49%;margin-bottom: 25px;}
        .matchinfowrap .squadWrap .squad-boxes ul li a{display: flex;align-items: flex-start;}
        .matchinfowrap .squadWrap .squad-boxes ul li a .img {width: 30px;height: 30px;margin-right: 15px;border-radius: 50%;background: #fff;overflow: hidden;box-shadow: 0 1px 8px #3336;}
        .matchinfowrap .squadWrap .squad-boxes ul li a .txt .playername {color: #001D42;font-size: 13px;text-transform: uppercase;font-family: 'Karma',serif !important;}
        .matchinfowrap .squadWrap .squad-boxes ul li a .txt .playstatus {margin: 0;color: #909090;font-size: 12px;}
        .matchinfo-table {width: 100%;    margin-bottom: 30px;}
        .matchinfo-table tr{border-bottom: 1px solid #D8D8D8;}
        .matchinfo-table tr td {padding: 9px 0;color: #202020;background: #F5F5F5;font-size: 13px;padding-right: 10px;}
        .matchinfo-table tr th:first-child, .matchinfo-table tr td:first-child {padding-left: 20px;width: 25%;}
        .matchinfo-table tr td:first-child {font-family: 'Mukta',sans-serif !important;font-weight: bold;}
        .matchinfo-table tr th {width:33%;background: #001D42;text-transform: uppercase;color: #fff;font-family: 'Mukta',sans-serif !important;padding: 13px 0;font-size: 13px;text-align: left;padding-right: 10px;font-weight: normal;}

        .CN-PageWrap.CN-Mobile-PageWrap .matchinfowrap .squadWrap{flex-direction: column;}
        .CN-PageWrap.CN-Mobile-PageWrap .matchinfowrap .squadWrap .squad-boxes{width: 100%;margin-bottom: 10px;padding:0;}
        .CN-PageWrap.CN-Mobile-PageWrap .matchinfowrap .squadWrap .squad-boxes:last-child{margin-top:10px;}
        .CN-PageWrap.CN-Mobile-PageWrap .squadWrap .CN-accordion-content {display: none;padding: 10px 10px 5px;}
        .CN-PageWrap.CN-Mobile-PageWrap .squadWrap .CN-accordion-content.active {display: flex;}
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-main{background: #f5f5f5;padding: 10px;margin-left: -10px;margin-right: -10px;border-radius: 0;}
        .CN-PageWrap.CN-Mobile-PageWrap .matchinfowrap .squadWrap .squad-boxes .heading{position:relative;border-bottom: 0;padding:10px 10px 5px;}
        .CN-PageWrap.CN-Mobile-PageWrap .matchinfowrap .squadWrap .squad-boxes .heading .teamname{color: #464646;font-size: 14px;}
        .CN-PageWrap.CN-Mobile-PageWrap .dropbtn {width: 12px;height: 21px;position: absolute;right: 10px;}
        .CN-PageWrap.CN-Mobile-PageWrap .dropbtn::before {content: "";border-bottom: 2px solid #000;border-left: 2px solid #000;width: 6px;height: 6px;transform: rotate(-45deg);position: absolute;left: 3px;top: 5px;}
        .CN-PageWrap.CN-Mobile-PageWrap .CN-accordion-toggle.active .qs-btnwrap .dropbtn {transform: rotate(-180deg);}
        .CN-PageWrap.CN-Mobile-PageWrap .squadWrap .CN-accordion-toggle.active .qs-btnwrap .dropbtn{margin-top: -54px;}
        .CN-PageWrap.CN-Mobile-PageWrap .matchinfowrap .squadWrap .squad-boxes .heading.active{border-bottom: 1px solid #D8D8D8;}
        .CN-PageWrap.CN-Mobile-PageWrap .matchinfowrap .squadWrap .squad-boxes ul li a .txt .playername{font-family: 'Karma',serif !important;}
        .CN-PageWrap.CN-Mobile-PageWrap .matchinfo-table{border-collapse: collapse;}
        .CN-PageWrap.CN-Mobile-PageWrap .matchinfo-table tr th{padding: 4px 0;font-size: 11px;width: 35%;}
        .CN-PageWrap.CN-Mobile-PageWrap .matchinfo-table tr td:first-child, .CN-PageWrap.CN-Mobile-PageWrap .matchinfo-table tr th:first-child{padding-left: 10px;}
        .CN-PageWrap.CN-Mobile-PageWrap .matchinfo-table tr td{font-size: 12px;}
        .CN-PageWrap.CN-Mobile-PageWrap .matchinfo-table tr td:first-child{font-size: 13px;}
        .CN-PageWrap.CN-Mobile-PageWrap .match-infotableWrap{margin-left: -10px;margin-right: -10px;}
        a.heading.CN-accordion-toggle.active .dropbtn {transform: rotate(-180deg);}
        `}</style>
    </>
  );
};

export default TeamSquads;
