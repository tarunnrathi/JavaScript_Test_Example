import TopPerformers from "./TopPerformers";
import ShortCommentary from "./ShortCommentary";
import QuickScoreLiveCard from "./QuickScoreLiveCard";
import PlaceholderCard from "./PlaceholderCard";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const QuickScoreCard = ({ data, score, id, config, isMobile, pageAds }) => {

  if (config.isLoading) {
    return <PlaceholderCard />;
  }

  return (
    <>
      <div className="scoreCard-main">
        {data?.isLive ? (
          <QuickScoreLiveCard data={data} score={score} isMobile={isMobile} />
        ) : (
          <TopPerformers data={data} score={score} isMobile={isMobile} />
        )}
        <hr className="line1" />
        {pageAds?.ATF_300 && (
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
        )}
        {
          data?.matchCode && data?.CommentaryURL && (
            <ShortCommentary
              slug={data?.slug}
              url={data?.CommentaryURL}
              teama={data.teamNameA}
              teamb={data.teamNameB}
              id={data.matchCode}
              isLive={data?.isLive}
              pageAds={pageAds}
              showBottomAd
              isFull={false}
            />
          )
        }
      </div>
      <style>{`
            .scoreCard-main {
                background: #F5F5F5;
                padding: 15px;
                border-radius: 15px;
            }
            .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-main{
              padding: 10px;
              margin-left: -10px;
              margin-right: -10px;
            }
        `}</style>
    </>
  );
};

export default QuickScoreCard;
