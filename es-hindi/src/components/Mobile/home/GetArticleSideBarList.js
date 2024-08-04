import Heading from "../Heading";
import Skeleton from "components/Common/CustomSkeleton";
import { getArticles } from "api/individual/Home";
import { useEffect, useState } from "react";
import { getCompleteURL } from "util/global/Helper";
import { imageLoader } from "includes/article.util";
import ReadMore from "../common/ReadMore";
//import Image from "next/image";
import { TEXT } from "constant/global/Constant";
import LazyLoadImage from "components/Common/CustomImage";

const GetArticleSideBarList = ({
    heading,
    isSubMenu,
    category,
    isAmp = false,
    categoryLink,
    data = [],
    isDisplayTopBar = false,
    item = 5,
    // isMobile = false
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

    return (
        <>
            <Heading
                heading={heading}
                categoryLink={categoryLink}
            />
            <div className="greybg with10pdng mrg10">
                {
                    isLoading ? (
                        <Skeleton height={320} />
                    ) : (
                        <ul className={isDisplayTopBar ? 'nwnewsstorieswithphoto withwhitebg forfirststorylarge' : 'nwnewsstorieswithphoto withwhitebg'}>
                            {
                                getData && getData.length > 0 && getData.map((item, index) => {
                                    const title = item.display_headline || item.headline;
                                    const width = index === 0 && isDisplayTopBar ? 372 : 104;
                                    const height = index === 0 && isDisplayTopBar ? 228 : 70;
                                    const imageSrc = imageLoader(item.images.url, width, height);
                                    return (
                                        <li>
                                            <a href={getCompleteURL(item.weburl_r, item.weburl)}>
                                                <h3>{title}</h3>
                                                {
                                                  isAmp 
                                                  ?
                                                    <figure>
                                                      <LazyLoadImage
                                                          src={imageSrc}
                                                          width={width}
                                                          height={height}
                                                          alt={title}
                                                          title={title}
                                                          isAMP={true}
                                                        />
                                                        {/* <amp-img
                                                            src={imageSrc}
                                                            alt={title}
                                                            title={title}
                                                            width={width}
                                                            height={height}
                                                            layout="responsive"
                                                        ></amp-img> */}
                                                      </figure>
                                                    :
                                                    <figure>
                                                      <LazyLoadImage
                                                          src={imageSrc}
                                                          width={width}
                                                          height={height}
                                                          alt={title}
                                                          title={title}
                                                      />
                                                        {/* <Image
                                                            width={width}
                                                            height={height}
                                                            src={imageSrc}
                                                            alt={title}
                                                        /> */}
                                                    </figure>
                                                }
                                            </a>
                                        </li>
                                    );
                                })
                            }

                        </ul>
                    )
                }
                <ReadMore
                    categoryLink={categoryLink}
                    heading={TEXT.READ_MORE}
                    buttonType={false}
                />
            </div>
            <style jsx global>{`
          .nwnewsstorieswithphoto li {
            border-top: 1px solid #e0e0e0;
            padding: 12px 10px;
            position: relative;
          }
      
          .nwnewsstorieswithphoto li:first-child {
            border-top: none;
          }
      
          .nwnewsstorieswithphoto li:last-child {
            border-bottom: 1px solid #e0e0e0;
          }
      
          .nwnewsstorieswithphoto li a {
            display: flex;
          }
      
          .nwnewsstorieswithphoto li a figure {
            width: 104px;
            height: 70px;
            margin-left: 12px;
          }
      
          .nwnewsstorieswithphoto li a figure img {
            width: 104px;
            height: 70px;
          }
      
          .nwnewsstorieswithphoto li a h2,
          .nwnewsstorieswithphoto li a h3 {
            color: #000;
            line-height: 22px;
            font-size: 15px ${!isAmp ? ' !important' : ''};
          }
      
          .nwnewsstorieswithphoto.fortopstories li a h2,
          .nwnewsstorieswithphoto.fortopstories li a h3 {
            color: #000;
            line-height: 24px;
            font-size: 17px
          }
      
          .nwnewsstorieswithphoto.forfirststorylarge li:first-child {
            border-top: 0px solid #e0e0e0;
            padding-top: 0;
          }
      
          .nwnewsstorieswithphoto.forfirststorylarge li:first-child a {
            flex-wrap: wrap;
            flex-direction: column-reverse;
          }
      
          .nwnewsstorieswithphoto.forfirststorylarge li:first-child a figure {
            width: 100%;
            height: 228px;
            margin-left: 0;
            margin-bottom: 5px;
          }
      
          .nwnewsstorieswithphoto.forfirststorylarge li:first-child a figure img {
            width: 100%;
            height: 228px;
          }
      
          .nwnewsstorieswithphoto.forfirststorylarge li:first-child a h2,
          .nwnewsstorieswithphoto.forfirststorylarge li:first-child a h3 {
            color: #000;
            line-height: 26px;
            font-size: 18px
          }
     
          .nwnewsstorieswithphoto.forfirststorylarge.withwhitebg li {
            padding: 12px 0;
          }
      
          .nwnewsstorieswithphoto.forfirststorylarge.withwhitebg li:first-child {
            padding-top: 0;
            background: #fff;
            border: 1px solid #D6D6D6;
            border-radius: 4px;
          }
      
          .nwnewsstorieswithphoto.forfirststorylarge.withwhitebg li:first-child a h2,
          .nwnewsstorieswithphoto.forfirststorylarge.withwhitebg li:first-child a h3 {
            line-height: 22px;
            font-size: 15px;
            padding: 5px 10px 0 10px;
          }
      
          .nwnewsstorieswithphoto.forfirststorylarge.withwhitebg li:first-child a figure {
            margin-bottom: 0;
          }
            `}</style>
        </>
    );
};

export default GetArticleSideBarList;
