import LazyLoadImage from "components/Common/CustomImage";
import Skeleton from "react-loading-skeleton";
import LazyLoadCustomImage from "components/Common/CustomImage";

const LatestNews = ({ latestData = [], isMobile }) => {
  const updatedLatestData = latestData?.length && (isMobile ? [...latestData.slice(1, latestData.length)] : latestData) || [];
  return (
    <>
      <div className="CN-heading-1">
        <h2 className="headinner">
          लेटेस्ट <span>न्यूज</span>
        </h2>
        <div className="icon"></div>
      </div>
      {isMobile && latestData?.length ? (
        <div className="CN-LeadStory">
          <h2 className="CN-LeadHead">
            <a href={latestData[0].weburl_r || ""} title={latestData[0].display_headline}>
              {latestData[0].display_headline}
            </a>
          </h2>
          <figure>
            <a href={latestData[0].weburl_r}>
              <LazyLoadCustomImage
                src={latestData[0].images.url}
                width={140}
                height={210}
                alt={latestData[0].display_headline}
                title={latestData[0].display_headline}
                defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                isLazyLoad={true}
              />
            </a>
          </figure>
        </div>
      ) : null}
      <ul className="CN-latestStory-widget">
        {updatedLatestData && updatedLatestData.length ? (
          updatedLatestData.map((latest, index) => (
            <li key={`map_${index}`}>
              <a href={latest.weburl_r}>
                <div className="image-box" style={{ height: !isMobile && "144px" }}>
                  <LazyLoadCustomImage
                    src={latest.images?.url}
                    width={isMobile ? 110 : 217}
                    height={isMobile ? 73 : 144}
                    alt={latest.display_headline}
                    title={latest.display_headline}
                    defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                    isLazyLoad={true}
                  />
                </div>
                <div>
                  <p className="description">{latest.display_headline}</p>
                </div>

              </a>
            </li>
          ))
        ) : (
          <>
            <li>
              {" "}
              <Skeleton height={144} />
            </li>
            <li>
              {" "}
              <Skeleton height={144} />
            </li>
            <li>
              {" "}
              <Skeleton height={144} />
            </li>
            <li>
              {" "}
              <Skeleton height={144} />
            </li>
            <li>
              {" "}
              <Skeleton height={144} />
            </li>
            <li>
              {" "}
              <Skeleton height={144} />
            </li>
            <li>
              {" "}
              <Skeleton height={144} />
            </li>
            <li>
              {" "}
              <Skeleton height={144} />
            </li>
            <li>
              {" "}
              <Skeleton height={144} />
            </li>
            <li>
              {" "}
              <Skeleton height={144} />
            </li>
            <li>
              {" "}
              <Skeleton height={144} />
            </li>
            <li>
              {" "}
              <Skeleton height={144} />
            </li>
          </>
        )}
      </ul>
      {latestData && latestData.length ? (
        <a href="/cricket/news/" className="cn-morebtn1 CN-morestory-round-btn">
          आर्काइव...
        </a>
      ) : null}
      <style jsx global>{`
        .CN-section .CN-sec-l {
          font-family: Mukta,sans-serif !important;
          width: 924px;
          min-width: 924px;
        }
        .CN-latestStory-widget {
          display: grid;
          grid-template-columns: 217px 217px 217px 217px;
          column-gap: 19px;
          row-gap: 19px;
          border-bottom: 1px solid #dadada;
          padding-bottom: 20px;
        }
        .CN-latestStory-widget li a {
          display: block;
        }
        .CN-latestStory-widget li a .image-box img {
          display: block;
          width: 100%;
        }
        .CN-latestStory-widget li  {
          padding-bottom:10px;
          border-bottom: 1px #939393 dotted;
        }
        .cn-morebtn1 {
          background: #f5f5f5;
          display: block;
          text-align: center;
          text-transform: uppercase;
          color: #e1261d;
          font-weight: bold;
          font-size: 13px;
          padding: 11px 0;
        }
        .cn-morebtn1:hover{
          color: #e1261d !important;
        }
        .CN-Mobile-HomeOuter .CN-latestStory-widget {
          display: block;
          padding: 0 10px;
          border-bottom: none;
        }
        .CN-Mobile-HomeOuter .CN-latestStory-widget li {
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #d7d7d7;
        }
        .CN-Mobile-HomeOuter .CN-latestStory-widget li a {
          display: flex;
          flex-direction: row-reverse;
        }
        .CN-Mobile-HomeOuter .CN-latestStory-widget li .image-box {
          flex: 0 0 110px;
          margin-left: 10px;
          overflow: hidden;
          border-radius: 5px;
        }
        .CN-Mobile-HomeOuter .CN-latestStory-widget li a p {
          width: 100%;
          font-size: 16px;
          line-height: 1.5;
        }
        .description {
          font-family: 'Mukta',sans-serif !important;
          font-size: 16px;
          color: #282828;
          line-height: 24px;
          font-family: 'Fira Sans';
          font-weight: bold;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-top: 10px;
      }
      `}</style>
    </>
  );
};

export default LatestNews;
