import LazyImage from "components/Common/LazyLoadImage";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const TopPerformers = ({ data, isMobile, score }) => {

  if (!data?.topPlayer?.length) {
    return null;
  }

  const manOFTheMatch = data && data?.topPlayer?.find((item) => {
    return item?.playerNameText === 'Player of the match';
  });

  const topBatsman = data && data?.topPlayer?.filter((item) => {
    return item?.playerNameText === 'Top Batsman';
  });

  const topBowler = data && data?.topPlayer?.filter((item) => {
    return item?.playerNameText === 'Top Bowler';
  });

  return (
    <>
      <h3 className="scoreHeading1">टॉप परफॉर्मर</h3>
      <ul className="top-performers">
        { manOFTheMatch?.id && Object.keys(manOFTheMatch).length > 0 && (
          <li>
            <a
              href={`${
                publicRuntimeConfig.siteUrl
              }cricket/profile/${manOFTheMatch.playerName_en
                ?.toLowerCase()
                ?.split(" ")
                ?.join("-")}/${manOFTheMatch.id}.html`}
            >
              <div className="content">
                <div className="player-top">Player of the match</div>
                <div className="player-name">{manOFTheMatch.name}</div>
                <ul className="strike-rate">
                  {manOFTheMatch?.skill === 'बल्लेबाज़' || manOFTheMatch?.skill === 'विकेट किपर' && <li>
                    <div className="box">
                      {manOFTheMatch?.Runs} <span>({manOFTheMatch?.BallsFaced})</span>
                    </div>
                    <div className="box">SR : {manOFTheMatch.SR}</div>
                  </li>}
                  {manOFTheMatch?.skill === 'गेंदबाज़' && <li>
                    <div className="box">
                      {manOFTheMatch?.Wicket && `${manOFTheMatch?.Wicket}/`}{manOFTheMatch?.Runs} <span>({manOFTheMatch?.Over || manOFTheMatch?.BallsFaced})</span>
                    </div>
                    <div className="box">{manOFTheMatch?.Econ ? `ER : ${manOFTheMatch?.Econ}` : `SR : ${manOFTheMatch?.SR}`}</div>
                  </li>}
                </ul>
              </div>
              <div className="image">
                <LazyImage
                  src={`${publicRuntimeConfig.cricketImageProfileBase}${manOFTheMatch?.id}.png`}
                  title={manOFTheMatch?.name}
                  alt={manOFTheMatch?.name}
                  dontAlter={true}
                  holder={publicRuntimeConfig.capHolder}
                  height={64}
                  width={64}
                />
              </div>
            </a>
          </li>
        )}

        {topBatsman && topBatsman?.length > 0 && topBatsman.map((item) => {
            return (
                <li>
                  <a
                    href={`${
                      publicRuntimeConfig.siteUrl
                    }cricket/profile/${item.playerName_en
                      ?.toLowerCase()
                      ?.split(" ")
                      ?.join("-")}/${item.id}.html`}
                  >
                    <div className="content">
                      <div className="player-top">Top Batsman</div>
                      <div className="player-name">{item?.name}</div>
                      <ul className="strike-rate">
                        <li>
                          <div className="box">
                            {item?.Runs} <span>({item?.BallsFaced})</span>
                          </div>
                          <div className="box">SR : {item?.SR}</div>
                        </li>
                      </ul>
                    </div>
                    <div className="image">
                      <LazyImage
                        src={`${publicRuntimeConfig.cricketImageProfileBase}${item?.id}.png`}
                        title={item.name}
                        alt={item.name}
                        dontAlter={true}
                        holder={publicRuntimeConfig.capHolder}
                        height={64}
                        width={64}
                      />
                    </div>
                  </a>
                </li>
              );
            })}

            {topBowler && topBowler.length > 0 && topBowler.map((item) => {
              return (
                <li>
                  <a
                    href={`${
                      publicRuntimeConfig.siteUrl
                    }cricket/profile/${item.playerName_en
                      ?.toLowerCase()
                      ?.split(" ")
                      ?.join("-")}/${item.id}.html`}
                  >
                    <div className="content">
                      <div className="player-top">Top Bowler</div>
                      <div className="player-name">{item.name}</div>
                      <ul className="strike-rate">
                        <li>
                          <div className="box">
                            {item.Wicket}/{item.Runs} <span>({item.Over})</span>
                          </div>
                          <div className="box">ER : {item.Econ}</div>
                        </li>
                      </ul>
                    </div>
                    <div className="image">
                      <LazyImage
                        src={`${publicRuntimeConfig.cricketImageProfileBase}${item.id}.png`}
                        title={item.name}
                        alt={item.name}
                        dontAlter={true}
                        holder={publicRuntimeConfig.capHolder}
                        height={64}
                        width={64}
                      />
                    </div>
                  </a>
                </li>
              );
            })}
      </ul>
      <style jsx global>{`
        .top-performers {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .top-performers > li {
          width: 49%;
          border-radius: 15px;
          background: #fff;
          margin-bottom: 13px;
          box-shadow: 0 5px 7px #d8d8d8;
        }
        .top-performers > li a {
          display: flex;
          padding: 15px;
          justify-content: space-between;
        }
        .top-performers > li a .content {
          width: 80%;
          line-height: 18px;
        }
        .top-performers > li a .image {
          width: 64px;
          background: #b2b2b2;
          height: 64px;
          border-radius: 50%;
          overflow: hidden;
        }
        .top-performers > li a .image img {
          width: 100%;
        }
        .top-performers > li a .content .player-top {
          color: #ff5148;
          font-size: 12px;
          font-family: 'Karma',serif !important;
          border-bottom: 1px solid #d8d8d8;
          line-height: 16px;
          margin-bottom: 5px;
          text-align: right;
        }
        .top-performers > li a .content .player-name {
          color: #001d42;
          font-size: 18px;
          font-family: 'Mukta',sans-serif !important;
          text-transform: uppercase;
          margin-bottom: 3px;
          text-align: right;
          font-weight: bold;
        }
        .top-performers > li a .content .strike-rate {
          display: flex;
          font-size: 14px;
          font-family: 'Mukta',sans-serif !important;
          justify-content: flex-end;
        }
        .top-performers > li a .content .strike-rate li {
          display: flex;
          width: auto;
          margin-right: 16px;
        }
        .top-performers > li a .content .strike-rate li .box {
          margin-right: 4px;
        }
        .top-performers > li a .content .strike-rate li .box:last-child {
          margin-right: 0;
        }
        .top-performers > li a .content .strike-rate li .box span {
          font-size: 12px;
          color: #909090;
        }
        .top-performers > li a .content .strike-rate li:last-child {
          margin-right: 0;
        }
        .top-performers > li:nth-child(2n) a .content {
          order: 2;
        }
        .top-performers > li:nth-child(2n) a .image {
          order: 1;
        }
        .top-performers > li:nth-child(2n) a .content .player-top {
          text-align: left !important;
        }
        .top-performers > li:nth-child(2n) .content .player-name {
          text-align: left !important;
        }
        .top-performers > li:nth-child(2n) .content .strike-rate {
          justify-content: flex-start !important;
        }

        .CN-PageWrap.CN-Mobile-PageWrap .scoreCardPage .top-performers li{
          width: 100%;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCardPage .top-performers li a{
          padding: 10px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCardPage .top-performers > li a .image{
          order : 1;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCardPage .top-performers > li a .content{
          order : 2;
          margin-left: 5px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .top-performers>li a .content .player-top{
          text-align: left;
          margin-bottom: 1px;
          
        }
        .CN-PageWrap.CN-Mobile-PageWrap .top-performers>li a .content .player-name{
          font-size: 16px;
          margin-bottom: 0;
          text-align: left;
          margin-top: 5px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .top-performers>li a .content .strike-rate li .box{
          font-size: 12px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .top-performers>li a .content .strike-rate li{
          margin-right: 0;
        }
      `}</style>
    </>
  );
};

export default TopPerformers;
