import React from "react";
import { imageLoader } from "includes/article.util";
import ampHelper from "includes/Amp/ampHelper";
import Head from "next/head";
import getConfig from "next/config";
import Slider from 'react-slick/lib';
import categoryHelper from "includes/category.helper";

const { publicRuntimeConfig } = getConfig();

const getURL = (isAmp = false, url) => {
    return url ? url.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl+`${isAmp ? "amp/" : ''}`) : '';
};
const CategoryTopPage = (props) => {
  const {
    currentUrl,
    data: {
      _pageParam: { category = "", subCategory = "" } = {},
    } = {},
  } = props;
  const [leftCat, rightCat] = [props.data.topPriorityData];
  const categoryStoriesList = props?.data?.categoryStoriesList || [];
  // let section = subCategory ? subCategory : category;
  const topRecord = props?.data?.topPriorityData?.topRecord ? props?.data?.topPriorityData?.topRecord : leftCat.leftCat;
  const bottomRecord = props?.data?.topPriorityData?.bottomRecord ? props?.data?.topPriorityData?.bottomRecord : leftCat.rightCat;

  const ampAds = ampHelper.get_amp_ad_article(
    props?.data?._pageParam?.subCategory,
    props?.data?._pageParam?.category,
    "listing"
  );

  const settings = {
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		focusOnSelect: true,
		infinite: false,
		autoplay: true,
		autoplaySpeed: 3000,
		gap: 0,
	};

  const getCategoryTopSliderAndBottomBoxList = subCategory
    ? categoryHelper.getCategoryTopSliderAndBottomBoxList(subCategory)
    : categoryHelper.getCategoryTopSliderAndBottomBoxList(category);

  let bottomListing = [];
  if (getCategoryTopSliderAndBottomBoxList != undefined) {
    bottomListing = getCategoryTopSliderAndBottomBoxList.bottomListing;
  }
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width"/>
   </Head>

    <Slider className="photowidget-slider" {...settings}>
        {topRecord && topRecord.length && topRecord.map((topNews, key) => {
          const width = 450;
          const height = 300;
          return (
            <div className="slide">
              <a href={getURL(true, topNews.url)}>
                <figure>
                  {topNews["content_type"] == "photogallery" ? (
                        <span className="sprite phticnl"></span>
                      ) : (
                        ""
                      )}
                      {(topNews?.ff_source == "Hyperlocal" && topNews?.local18_video_s != '') ? <span className="nwvideoicon"></span> : ""}

                    <amp-img
                      width={width}
                      height={height}
                      src={imageLoader(topNews["thumbnail"], 320, 220)}
                      alt={topNews["display_headline"] || topNews["headline"]}
                      layout="responsive"
                    ></amp-img>
                  </figure>
              </a>
              <div className="chmpntpnwshd">
                  <h2><a href={getURL(true, topNews?.url)}>{topNews["display_headline"] || topNews["headline"]}
                  <div className="tpall"><span className="tpc">{topNews['content_type']}</span></div>
                  </a></h2>
              </div>
            </div>
          );
        })
      }
    </Slider>

    <div className="clearfix add">
      <div className="addinner-box">
        <div className="ad-container go">
              <amp-ad width={336} height={280} type="doubleclick" data-slot={ampAds.topAd} data-multi-size="300x250" data-enable-refresh="30" data-lazy-fetch="true"
				      data-loading-strategy="1">
              </amp-ad>
        </div>
      </div>
    </div>
    <ul className="listview-story clearfix">
    {bottomRecord && bottomRecord.length ? bottomRecord.map((eachData, index) => {
    return index < 5 ? (
      <li className="forpurplebg" key={index}>
				<a title="Link" href={getURL(true, eachData['url'])}>
          <figure className={(eachData["content_type"] == "photogallery" || eachData.url?.includes("photogallery"))? "relative photoicon" : ((eachData?.ff_source == "Hyperlocal" && eachData?.local18_video_s != '') || eachData.url?.includes("videos"))? "relative videoicon" : ""}>
              <amp-img
              alt={eachData["display_headline"] || ''}
              src={imageLoader(eachData["thumbnail"], 360, 288)}
              width={157}
              height={100}
              layout="responsive"
              >
          </amp-img>
          </figure>
        </a>
        <div className="lstintro">
          <div className="tag-tm"><span className="tg fl">{eachData["content_type"]}</span></div>
          <h2>
            <a title={eachData["display_headline"] || ""} href={getURL(true, eachData['url'])}>
              {eachData["display_headline"] || ""}
            </a>
          </h2>
        </div>
      </li>
      ) : (
        ""
      );
    })
  : ""}
    <a title="Link" href={currentUrl.replace("amp/", "")} className="rdmr">और भी पढ़ें</a>
    </ul>
      {categoryStoriesList && categoryStoriesList.length ? (
      <>

    <div className="pdngsxtn-lr">
      <div className="glblbghd-sts">
          <h2 className="hd"> अन्य ख़बरें </h2>
      </div>
      <ul className="gridview-story">
      {categoryStoriesList.map((eachNews, key) => {
      return (
        <>
          {key > 5 ? <>
            <li key={key}>
              <a href={getURL(true, eachNews.url)}>
                <figure
                  className={
                    eachNews.url?.includes("photogallery")
                      ? "relative photoicon"
                      : eachNews.url?.includes("videos")
                      ? "relative videoicon"
                      : ""
                  }
                >
                  {(eachNews?.ff_source == "Hyperlocal" && eachNews?.local18_video_s != '') ? <span className="nwvideoicon"></span> : ""}
                  <amp-img
                    alt={eachNews.display_headline || ""}
                    src={imageLoader(eachNews["thumbnail"], 180, 120)}
                    width={180}
                    height={120}
                    layout="responsive"
                  ></amp-img>
                </figure>
              </a>
              <div className="lstintro">
                <h2>
                  <a href={getURL(true, eachNews.url)}>
                    {eachNews.display_headline || ""}
                  </a>
                </h2>
              </div>
            </li>
          </> : null}
        </>
      );
    })}
    </ul>
    </div>
    <a title="Aur bhi Dekhe" href={currentUrl.replace("amp/", "")} className="rdmr">और भी देखें</a>
    </>
    ) : (
        ""
    )}
    </>
  );
};

export default CategoryTopPage;
