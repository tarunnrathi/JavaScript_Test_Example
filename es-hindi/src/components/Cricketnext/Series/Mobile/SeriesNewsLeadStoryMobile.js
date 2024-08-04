import ImageFallback from "components/Common/ImageFallback";
import { CricketNextImgUrls } from "components/Cricketnext/CricketNextUtils";

const SeriesNewsLeadStoryMobile = ({ news={} }) => {
  const newsArticleHeadling = news?.display_headline ? news?.display_headline : news?.headline;
  const newsArticleUrl = news?.weburl_r || "";

  return (
    <>
      {news && (
        <div className="CN-LeadStory">
          <h2 className="CN-LeadHead">
            <a href={newsArticleUrl}>{newsArticleHeadling}</a>
          </h2>
          <figure>
            <a href={newsArticleUrl}>
              <ImageFallback
                src={news?.images?.url}
                fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                height={220}
                width={360}
                alt={newsArticleHeadling}
                title={newsArticleHeadling}
              />
            </a>
          </figure>
        </div>
      )}
      <style jsx global>
        {`
          .CN-LeadStory {
            margin-bottom: 10px;
          }
          .CN-LeadHead {
            font-size: 20px;
            line-height: 24px;
            background: none;
            padding: 5px 10px 10px 10px;
            font-weight: bold;
            position: relative;
          }
          .CN-LeadHead a {
            line-height: 24px;
            color: #001d42;
          }
          .CN-LeadStory figure a {
            display: block;
            position: relative;
          }
          .CN-LeadStory figure div {
            width: 100%;
          }
          .CN-LeadStory figure a img {
            width: 100%;
            display: block;
          }
         
        `}
      </style>
    </>
  );
};

export default SeriesNewsLeadStoryMobile;
