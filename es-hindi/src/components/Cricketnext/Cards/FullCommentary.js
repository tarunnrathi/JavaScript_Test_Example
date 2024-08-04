import LazyImage from "components/Common/LazyLoadImage";
import getConfig from "next/config";
import ShortCommentary from "./ShortCommentary";
import { useState, useEffect, useRef } from "react";
import PlaceholderCard from "./PlaceholderCard";
import Loader from "react-loader-spinner";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const { publicRuntimeConfig } = getConfig();

const FullCommentary = ({
  data,
  score,
  comments = [],
  fullList = [],
  summary = [],
  pageAds = {},
  isMobile
}) => {
  const [commentaryData, setCommentaryData] = useState({
    comments,
    summary,
    fullList,
  });

  const [current, setCurrent] = useState(data.currentInnings);
  const [liveLoader, setLiveLoader] = useState(false);

  const updateLiveData = async (url, live) => {
    try {
      if (live) {
        setLiveLoader(true);
      }
      let c = await fetch(url || data.CommentaryURL, { timeout: 5000 });
      c = await c.json();
      c = c?.Commentary;
      if (c) {
        let first = c.find((item) => item.Over);
        if (first) {
          const prv = c.find(
            (item) => Number(item.Id) > Number(first.Id) && item.Over
          );
          if (prv) {
            first = c[0];
          }
        } else {
          first = c[0];
        }

        const noSum =
          c.filter((item) => Number(item.Id) <= Number(first.Id)) || [];

        const sum =
          c.filter((item) => Number(item.Id) > Number(first.Id)) || [];

        if (live) {
          setCommentaryData((prev) => {
            const ids = prev.comments.map((item) => item.Id);
            const present = noSum.filter((item) => ids.includes(item.Id));
            const pids = present.map((item) => item.Id);

            const update = noSum.filter(
              (item) =>
                !ids.includes(item.Id) &&
                Number(item.Id) >
                  Number(prev.comments[prev.comments.length - 1]?.Id || 0)
            );

            prev.comments = prev.comments.map((item) => {
              if (pids.includes(item.Id)) {
                return present.find((i) => i.Id == item.Id);
              }

              return item;
            });

            return {
              comments: [...update, ...prev.comments],
              fullList: noSum,
              summary: sum,
              isLoading: false,
            };
          });
          setLiveLoader(false);
        } else {
          setCommentaryData((prev) => ({
            comments: [...prev.comments, ...noSum].slice(0, 16),
            fullList: noSum,
            summary: sum,
            isLoading: false,
          }));
        }
      } else {
        setCommentaryData((prev) => ({ ...prev, isLoading: false }));
        setLiveLoader(false);
      }
    } catch (error) {
      setCommentaryData((prev) => ({ ...prev, isLoading: false }));
      setLiveLoader(false);
      console.log(error);
    }
  };

  const handleSwitch = () => {
    setCommentaryData({
      comments: [],
      fullList: [],
      summary: [],
      isLoading: true,
    });
    setCurrent((prev) => {
      const tempPrev = prev === 2 || prev === 4 ? prev - 1 : prev + 1;
      updateLiveData(data.CommentaryURL.replace(/_\d{1}_/gi, `_${tempPrev}_`));
      return prev;
    });
  };

  const handleClick = () => {
    setCommentaryData((prev) => {
      const last = prev.comments[prev.comments.length - 1];
      return {
        ...prev,
        comments: [
          ...prev.comments,
          ...prev.fullList
            .filter((item) => Number(item.Id) < Number(last ? last.Id : 0))
            .slice(0, 16),
        ],
      };
    });
  };

  useEffect(() => {
    if (!comments.length) {
      setCommentaryData({
        comments: [],
        fullList: [],
        summary: [],
        isLoading: true,
      });
      updateLiveData();
    }
  }, []);

  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = () =>
      updateLiveData(
        data.CommentaryURL.replace(
          /_\d{1}_/gi,
          `_${current || data.currentInnings}_`
        ),
        true
      );
  });

  useEffect(() => {
    // function tick() {
    //   savedCallback.current();
    // }
    const tick = () => {
      savedCallback.current();
    };
    let id;

    if (data.isLive && !id) {
      id = setInterval(tick, 10000);
    } else {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, []);

  const firstInnings = data?.firstInnings || {};
  const secondInnings = data?.secondInnings || {};

  return (
    <>
      {commentaryData.isLoading ? (
        <PlaceholderCard />
      ) : (
        <div className="scoreCard-main">
          <ul className="commentary-team">
            <li
              className={`cnTabLinks ${
                (current || data.currentInnings) % 2 == 1 ? "active" : ""
              }`}
              id="TeamsAList"
              rel={data.teamNameA}
              onClick={handleSwitch}
            >
              <a>
                <div className="teamWrapper">
                  <div className="flag">
                    <LazyImage
                      src={`${publicRuntimeConfig.cricketImageFlagBase}${firstInnings?.battingTeamId}.png`}
                      alt={firstInnings?.Battingteam}
                      holder={publicRuntimeConfig.flagHolder}
                      dontAlter={true}
                    />
                  </div>
                  <div className="teamname">
                    {firstInnings?.Battingteam}{" "}
                    {!isMobile &&
                      <span>{firstInnings?.Equation?.Total}
                        {firstInnings?.Equation?.Wickets && <span>/{firstInnings?.Equation?.Wickets}</span>}
                    </span>}
                  </div>
                </div>
                <div className="over">
                {isMobile &&
                  <span>{firstInnings?.Equation?.Total}
                    {firstInnings?.Equation?.Wickets && <span>/{firstInnings?.Equation?.Wickets}</span>}
                </span>
                }
                {firstInnings?.Equation?.Overs && <span>({firstInnings?.Equation?.Overs})</span>} { firstInnings?.Equation?.Runrate && <span>RR {firstInnings?.Equation?.Runrate}</span>}
                </div>
                <div className="inning"></div>
              </a>
            </li>
            <li
              className={`cnTabLinks ${
                (current || data.currentInnings) % 2 == 0 ? "active" : ""
              }`}
              id="TeamsBList"
              rel={data.teamNameB}
              onClick={handleSwitch}
            >
              <a>
                <div className="teamWrapper">
                  <div className="flag">
                    <LazyImage
                      src={`${publicRuntimeConfig.cricketImageFlagBase}${firstInnings?.Bowlingteam_id}.png`}
                      alt={firstInnings?.Bowlingteam}
                      holder={publicRuntimeConfig.flagHolder}
                      dontAlter={true}
                    />
                  </div>
                  <div className="teamname">
                    {firstInnings?.Bowlingteam}{" "}
                    {!isMobile &&
                      <span>{secondInnings?.Equation?.Total}
                        {secondInnings?.Equation?.Wickets && <span>/{secondInnings?.Equation?.Wickets}</span>}
                    </span>}
                  </div>
                </div>
                <div className="over">
                  {isMobile &&
                    <span>{secondInnings?.Equation?.Total}
                      {secondInnings?.Equation?.Wickets && <span>/{secondInnings?.Equation?.Wickets}</span>}
                  </span>
                  }
                  {secondInnings?.Equation?.Overs && <span>({secondInnings?.Equation?.Overs})</span>} { secondInnings?.Equation?.Runrate && <span>RR {secondInnings?.Equation?.Runrate}</span>}
                </div>
                <div className="inning"></div>
              </a>
            </li>
          </ul>
          {commentaryData.comments?.length ? (
            <>
              <div className={"commentary-content"}>
                <h4 className="heading">
                  The full commentary may be delayed by up to 6 deliveries.
                </h4>
                {commentaryData.summary.map((sum) => (
                  <p className={"cmntry-dtls"}>{sum.Commentary}</p>
                ))}
              </div>
              <hr className="line1" />
            </>
          ) : null}
          {liveLoader ? (
            <div style={{ textAlign: "center", marginBottom: "5px" }}>
              <Loader
                type="Oval"
                color="#00BFFF"
                height={40}
                width={40}
                timeout={5000}
              />
            </div>
          ) : null}
          <ShortCommentary
            teama={data.teamNameA}
            teamb={data.teamNameB}
            isLive={(score || data)?.isLive}
            pageAds={pageAds}
            isFull={true}
            data={commentaryData.comments || comments}
            url={data?.CommentaryURL}
          />
          {commentaryData.comments.length < commentaryData.fullList.length ? (
            <div className="score-cardbtnwrap">
              <a
                className="score-loadmore-btn rdmr"
                onClick={handleClick}
              >
                LOAD MORE
              </a>
            </div>
          ) : null}
          {pageAds?.BTF_300 ? (
            <div className="ad-container">
              <div className="addinner-box">
                <SiteAd
                  slotId="mobileAdNew300x250_2"
                  adUnit={pageAds.BTF_300}
                  sizes={[
                    [300, 250],
                    [336, 280],
                  ]}
                  width={336}
                  height={280}
                  lazyload={true}
                />
              </div>
            </div>
          ) : null}
        </div>
      )}
      <style>{`
        .score-cardbtnwrap a:hover {color: #fff !important;}
        .scoreCard-main{background:#f5f5f5;padding:15px;border-radius:15px}.scoreCard-main .commentry-list{position:relative}.scoreCard-main .commentry-list ul>li{display:flex;border-radius:15px;overflow:hidden;box-shadow:0 5px 7px #d8d8d8;margin-bottom:20px}.scoreCard-main .commentry-list ul>li .box-l{flex:0 0 65px;background:#001d42;text-align:center;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;padding:12px 0}.scoreCard-main .commentry-list ul>li .box-r{padding:10px 20px;background:#fff;width:100%}.scoreCard-main .commentry-list ul>li .box-l .ball{color:#d8d8d8;font-family:'Segoe Pro Regular';width:100%}.scoreCard-main .commentry-list ul>li .box-l .run{background:#fff;font-family:'Segoe Pro Bold';width:35px;text-align:center;height:35px;display:flex;justify-content:center;align-items:center;border-radius:50%;color:#202020;font-size:12px}.scoreCard-main .commentry-list ul>li .box-r p{font-size:15px;margin:0;font-family:'Segoe Pro Regular';color:#202020}.scoreCard-main .commentry-list ul>li .box-r p span{color:#202020;font-family:'Segoe Pro Bold'}.score-cardbtnwrap{display:flex;justify-content:center}.scoreCard-main .commentary-team{display:flex;justify-content:space-between;margin-bottom:20px}.scoreCard-main .commentary-team li{width:49%}.scoreCard-main .commentary-team li a{padding:10px 20px;background:#fff;border:1px solid #d8d8d8;border-radius:25px;display:block}.scoreCard-main .commentary-team li a .teamWrapper{display:flex;align-items:center;margin-bottom:5px}.scoreCard-main .commentary-team li a .flag{width:32px;margin-right:8px}.scoreCard-main .commentary-team li a .flag img{display:block}.scoreCard-main .commentary-team li a .teamname{color:#464646;font-family: 'Mukta',sans-serif !important;font-weight: bold;text-transform:uppercase;font-size:14px}.scoreCard-main .commentary-team li a .teamname span{color:#464646;margin-left:2px;font-family:'Segoe Pro Regular'}.scoreCard-main .commentary-team li a .over{color:#909090;font-size:14px;display:inline-block;margin-right:5px}.scoreCard-main .commentary-team li a .over span{color:#464646}.scoreCard-main .commentary-team li a .inning{color:#464646;text-transform:uppercase;font-size:14px;display:inline-block}.scoreCard-main .commentary-team li.active a{box-shadow:0 5px 7px #d8d8d8;padding: 4px 12px;}.scoreCard-main .commentary-team li.active a .teamname{font-size:20px;color:#ff5148}.scoreCard-main .commentary-team li.active a .teamname span{color:#001d42;font-family:'Segoe Pro Bold'}.score-loadmore-btn{background:#e1261d;font-size:12px;text-transform:uppercase;color:#fff;font-family:'Segoe Pro Bold';padding:10px 16px;border-radius:20px}.scoreCard-main .commentary-content .heading{font-size:13px;font-family: 'Mukta',sans-serif !important;font-weight: bold;color:#202020;margin-bottom:15px}.scoreCard-main .commentary-content p{font-family: 'Karma',serif !important;font-size: 14px;line-height: 1.5;margin-bottom:15px}.cmntry-dtls{font-size:14px;margin-bottom:0;padding-bottom:15px}   
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-main{
          padding: 10px;
          margin-left: -10px;
          margin-right: -10px;
          border-radius: 0;
        }
        .scoreCard-main .commentary-team li a .commentary-btnwrap .over span {
          color: #464646;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-main .commentary-team li a .over{
          font-size: 12px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-main .commentary-team li.active a .over span{
          font-size: 20px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-main .commentary-team li a .over span{
          font-weight: bold;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-main .commentary-team li a{
          text-align: center;
          padding: 10px 4px;
          border-radius: 10px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-main .commentary-team li.active a{
          padding: 3px 4px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-main .commentary-team li a .teamWrapper{
          justify-content: center;
          margin-bottom:0;
          line-height:1.2;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-main .commentary-content p{
          font-size: 13px;
        }
      `}</style>
    </>
  );
};

export default FullCommentary;
