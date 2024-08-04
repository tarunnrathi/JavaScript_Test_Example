import Skeleton from "components/Common/CustomSkeleton";
import { getArticles } from "api/individual/Home";
import { useEffect, useState } from "react";
import { getCompleteURL } from "util/global/Helper";
import HeadingWithoutContainer from "components/Mobile/HeadingWithoutContainer";
import ReadMoreWhiteBg from "components/Desktop/common/ReadMoreWhiteBg";
import { TEXT } from "constant/global/Constant";
import LazyLoadImage from "components/Common/CustomImage";

const GetArticleSideBarList = ({
  heading,
  category,
  isAmp = false,
  categoryLink,
  data = [],
  item: count = 5,
}) => {
  const [isLoading, setLoading] = useState(data.length > 0 ? false : true);
  const [getData, setGetData] = useState(data.length > 0 ? data : []);

  const filterDataByCategory = async (slug) => {
    setLoading(true);
    const result = await getArticles({ count: count, category: slug }, true);
    if (result.length > 0) {
      setGetData(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (data.length === 0) {
      filterDataByCategory(category);
    }
  }, []);

  return (
    <>
      <div className="newglblhdwrap newsml">
        <HeadingWithoutContainer
          heading={heading}
          categoryLink={categoryLink}
        />
      </div>
      <div className="newhealthfitness">
        {isLoading ? (
          <Skeleton height={320} />
        ) : (
          <ul className="newhealthfitness-list">
            {getData &&
              getData.length > 0 &&
              getData.map((item, index) => {
                const title = item.display_headline || item.headline;
                const width = 104;
                const height = 70;
                const imageSrc = item.images.url;
                return (
                  <li key={index}>
                    <a href={getCompleteURL(item.weburl_r, item.weburl)}>
                      <h3>{title}</h3>
                      {isAmp ? (
                        <figure width={width} height={height}>
                          <LazyLoadImage
                            src={imageSrc}
                            width={width}
                            height={height}
                            alt={title}
                            title={title}
                            isAmp={true}
                        />
                        </figure>
                      ) : (
                        <figure width={width} height={height}>                     
                          <LazyLoadImage
                              src={imageSrc}
                              width={width}
                              height={height}
                              alt={title}
                              title={title}
                          />
                        </figure>
                      )}
                    </a>
                  </li>
                );
              })}
          </ul>
        )}
        <ReadMoreWhiteBg link={categoryLink} label={TEXT.READ_MORE} />
      </div>
      <style jsx global>{`
        .newhealthfitness {
          background: #f5f5f5;
          padding-bottom: 10px;
        }
        .newhealthfitness-list li {
          border-bottom: 1px solid #e0e0e0;
          padding: 10px;
        }
        .newhealthfitness-list li a {
          display: flex;
          justify-content: space-between;
        }
        .newhealthfitness-list li a figure {
          border-radius: 4px;
          width: 104px;
          height: 70px;
          flex-shrink: 0;
          margin-left: 15px;
          font-size: 0;
          background-color: #dbdbdb;
        }
        .newhealthfitness-list li a figure img {
          width: 104px;
          height: 70px;
        }
        .newhealthfitness-list li a h3 {
          color: #000;
          line-height: 22px;
          font-size: 15px;
          padding-right: 5px;
        }
      `}</style>
    </>
  );
};

export default GetArticleSideBarList;
