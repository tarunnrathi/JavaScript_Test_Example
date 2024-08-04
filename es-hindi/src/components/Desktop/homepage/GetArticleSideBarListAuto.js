import { getArticles } from "api/individual/Home";
import { useEffect, useState } from "react";
import { getCompleteURL } from "util/global/Helper";
import HeadingWithoutContainer from "components/Mobile/HeadingWithoutContainer";
import { TEXT } from "constant/global/Constant";
import ReadMoreWhiteBg from "components/Desktop/common/ReadMoreWhiteBg";
import LazyLoadImage from "components/Common/CustomImage";

const GetArticleSideBarListAuto = ({
  heading,
  // isSubMenu,
  category,
  // isAmp = false,
  categoryLink,
  data = [],
  item = 3,
}) => {
  const [isLoading, setLoading] = useState(data.length > 0 ? false : true);
  const [getData, setGetData] = useState(data.length > 0 ? data : []);
  const [active, setActive] = useState(category);

  const filterDataByCategory = async (slug) => {
    setActive(slug);
    setLoading(true);
    const result = await getArticles({ count: item, category: slug }, true);
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

  const first = getData.slice(0, 1);
  const second = getData.slice(1, 3);

  return (
    <>
      <div className="newglblhdwrap newsml">
        <HeadingWithoutContainer
          heading={heading}
          categoryLink={categoryLink}
        />
      </div>
      <div className="newautowrap">
        <ul className="newbottomsectionlist">
          {
            first && first.length === 1 && first.map((item, index) => {
              const title = item.display_headline || item.headline;
              const width = 280;
              const height = 185;
              return (
                <li><a href={getCompleteURL(item.weburl_r, item.weburl)}>
                  <figure width={width} height={height}>
                    <LazyLoadImage
                      src={item.images.url}
                      width={width}
                      height={height}
                      alt={item.title}
                      title={item.title}
                    />
                  </figure>
                  <h3>{title}</h3>
                </a></li>
              );
            })
          }
        </ul>
        <ul className="newhealthfitness-list">
          {
            second && second.length > 1 && second.map((item, index) => {
              const title = item.display_headline || item.headline;
              const width = 104;
              const height = 70;
              return (
                <li>
                  <a href={getCompleteURL(item.weburl_r, item.weburl)}>
                    <h3>{title}</h3>
                    <figure width={width} height={height}>
                      <LazyLoadImage
                        src={item.images.url}
                        width={width}
                        height={height}
                        alt={item.title}
                        title={item.title}
                      />
                    </figure>
                  </a>
                </li>
              );
            })
          }
        </ul>
        <ReadMoreWhiteBg
          link={categoryLink}
          label={TEXT.READ_MORE}
        />
      </div>
      <style jsx global>{`            
        .newautowrap {
          background: #F5F5F5;
          padding: 10px;
          height: 480px;
        }

        .newautowrap .newhealthfitness-list li {
          padding: 10px 0;
        }

        .newautowrap .newbottomsectionlist li a h3 {
          height: auto;
        }
        .newbottomsectionlist {}

      .newbottomsectionlist li {
        padding: 10px 15px;
        border-bottom: 1px solid #e0e0e0;
        position: relative;
      }

      .newbottomsectionlist li:before {
        content: "";
        background: #707071;
        width: 5px;
        height: 5px;
        position: absolute;
        top: 20px;
        left: 0;
        border-radius: 100%;
      }

      .newbottomsectionlist li a figure {
        width: 100%;
      }

      .newbottomsectionlist li a figure img {
        width: 100%;
      }

      .newbottomsectionlist li a h3 {
        font-size: 15px;
        line-height: 22px;
        color: #000000;
        height: 42px;
        overflow: hidden;
        font-weight: normal;
      }

      .newbottomsectionlist li:first-child {
        padding: 0;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1px solid #D6D6D6;
        border-radius: 4px;
      }

      .newbottomsectionlist li:first-child a h3 {
        padding: 5px 10px 10px 10px;
        height: 50px;
        font-weight: bold;
      }

      .newbottomsectionlist li:first-child a figure img {
        border-radius: 4px 4px 0 0;
      }
      .newbottomsectionlist li:first-child:before {
        content: "";
        display:none;
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
        display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      }

      `}</style>
    </>
  );
};

export default GetArticleSideBarListAuto;
