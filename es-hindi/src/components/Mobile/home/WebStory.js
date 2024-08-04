import getConfig from 'next/config';
//import { imageLoader } from 'includes/article.util';
import LazyLoadImage from 'components/Common/LazyLoadImage';
import React, { useEffect } from 'react';
import Glide from "@glidejs/glide";
import ReadMore from '../common/ReadMore';
import GlideBtn from 'components/Common/GlideBtn';
import Heading from '../Heading';
import { getCompleteURL } from "util/global/Helper";
import { getWebstoryData, getWebstoryDataByCategory } from 'api/individual/webstories';
import ArticleListTopNav from './ArticleListTopNav';
import Skeleton from 'react-loading-skeleton';

const { publicRuntimeConfig } = getConfig();

const WebStory = ({
  isAmp = false,
  data = [],
  categoryLink
}) => {
  if (!data.length) {
    return null;
  }
  const [active, setActive] = React.useState("all");
	const [loading, setLoading] = React.useState(false);
  const [subCategory, setSubCategory] = React.useState([]);
	const [webStoriesData, setWebStoriesData] = React.useState(data);

  const filterDataByCategory = async(slug) => { 
		setActive(slug)
		setLoading(true);
		getWebstoryDataByCategory(slug === "all" ? {} : { categories: slug }, 0 , 10, true).then((res) => {
			setWebStoriesData(res);
			setLoading(false);

		})
	};
	
  const getSubMenus = async() => {
    getWebstoryData(true).then((res) => {
      setSubCategory([{
        id: "4064dds",
        label: "सभी",
        slug: "all",
        link: "filter"
        },...(res?.menuArr || []).map((itm, key) => ({
        id: "webs"+key,
        label: itm.title,
        slug: itm.slug,
        link: "filter"
      }))])
  })
};

  useEffect(() => {
    if (document.getElementsByClassName('webseries-slide-in').length) {
      new Glide(document.querySelector('.webseries-slide-in'), {
        autoplay: false,
        type: 'carousel',
        perView: 1.8,
        gap: 10,
        slidesToScroll: 1,
      }).mount();
    }
  }, [webStoriesData, loading]);

  useEffect(() => {
		getSubMenus()
    }, []);
  return (
    <>
      <Heading
          heading={`वेब स्टोरीज`}
          categoryLink={categoryLink}
      />
        <ArticleListTopNav
					topMenu = {subCategory?.length > 0 && subCategory}
					filterDataByCategory={filterDataByCategory}
					active={active}
				/>
      <div className="webseries-slide">
        {!loading ? <div className="webseries-slide-in">
          <div data-glide-el="track">
            <ul>
              {
                webStoriesData && webStoriesData.length > 0 && webStoriesData.map((item, index) => {
                  const width = 220;
                  const height = 250;
                  const imageSrc = item.feature_img + "?im=Resize,width=180,aspect=fit,type=normal";
                  const headline = item.blog_title;
                  return (
                    <li key={`webstory-`+index}>
                      <a href={getCompleteURL(item.web_url_r, item.web_url)}>
                        {
                          isAmp ?
                            <figure>
                              <amp-img
                                src={imageSrc}
                                alt={headline}
                                title={headline}
                                width={width}
                                height={height}
                                layout="responsive"
                              ></amp-img>
                            </figure>
                            :
                            <LazyLoadImage
                              lazyLoad={true}
                              width={width}
                              height={height}
                              src={imageSrc}
                              alt={headline}
                              title={headline}
                              dontAlter={true}
                            />
                        }
                        <h3>{headline}</h3>
                      </a>
                    </li>
                  );
                })
              }
            </ul>
          </div>

          <GlideBtn
            data={webStoriesData}
            className={`trndstorynewbullet`}
          />

        </div>: <Skeleton height={250} />}

        <ReadMore
          categoryLink={publicRuntimeConfig.siteUrl + "web-stories/"}
          heading={`और भी पढ़ें`}
          buttonType={false}
        />
      </div>
      <style jsx global>{`
           .webseries-slide {
            position: relative;
            background: #F5F5F5;
            padding: 10px 0;
          }
      
          .webseries-slide-in {
            overflow: hidden;
            margin: 0 0 0 10px;
          }
      
          .webseries-slide-in ul {
            display: flex;
            margin-bottom: 30px;
          }
      
          .webseries-slide-in ul li {
            background: #FFFFFF;
            box-shadow: 0px 0px 4px #0000001A;
            border: 1px solid #DBDBDB;
            border-radius: 4px;
          }
      
          .webseries-slide-in ul li a figure {
            width: 100% !important;
            height: 252px
          }
      
          .webseries-slide-in ul li a figure img {
            width: 100%;
            height: 252px;
            border-radius: 4px 4px 0 0;
          }
      
          .webseries-slide-in ul li a h3 {
            padding: 10px;
            color: #000000;
            font-size: 15px;
            line-height: 22px;
          }
      
          .webseries-slide button {
            top: 50%;
            left: 0;
            margin-top: -16px;
          }
      
          .webseries-slide button:last-child {
            right: 0;
          }
      
          .webseries-slide .moretrndstroy {
            margin-top: 0px;
          }
          @media screen and (min-device-width: 480px) and (max-device-width: 1024px)  and (orientation: landscape) {
            .webseries-slide-in ul li a figure {width: 100% !important; height: 450px !important;}
	          .webseries-slide-in ul li a figure img, .webseries-slide-in ul li a figure div {width: 100% !important; height: 450px !important;}	
          }
      `}</style>
    </>
  );
};

export default WebStory;
