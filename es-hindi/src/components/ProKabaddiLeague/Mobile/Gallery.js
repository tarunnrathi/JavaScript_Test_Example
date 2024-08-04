import React from "react";
import LazyLoadImage from "components/Common/CustomImage";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import ProKabaddiScoreWidget from "widgets/Common/Responsive/ProKabaddiScoreWidget";

const Gallery = (props) => {
  const { photoGallery, pageAds } = props?.data;
  return (
    <>
      <div className="wrapper">
        {/*Breadcrumb start*/}
        <div className="bredcrum">
          <div className="bredcrum-txt">
            <a href="/">
              <span className="">Hindi News</span>{" "}
            </a>
            <a href="/pro-kabaddi-league/">
              {" "}
              ›› <span className="">Pro Kabaddi News 2021</span>{" "}
            </a>
            <a>
              ›› <span className="pagetitle">pkl gallery</span>{" "}
            </a>
          </div>
        </div>
        {/* Breadcrumbs end*/}
        <div className="add clearfix">
          <div
            className="addinner-box"
            style={{ height: 268, width: 300, margin: "0 auto" }}
          >
            <span id="first">विज्ञापन</span>
            <SiteAd
              width={336}
              height={280}
              adUnit={pageAds?.ATF_300}
              sizes={[
                [300, 250],
                [336, 280],
                [250, 250]
              ]}
              lazyload={true}
            ></SiteAd>
          </div>
        </div>
        <ProKabaddiScoreWidget isMobile={true} />
      </div>
      <ul className="latest-update-media-list media-list">
        {photoGallery.slice(0, 3).map((item, index) => (
          <li className={`${index == 0 ? "item1" : "item2"}`} key={`photo${index}`}>
            <div className="media-wrap">
              <a href={item.weburl_r} title={item.display_headline}>
                <LazyLoadImage
                  src={item.images?.src}
                  alt={item.display_headline}
                  title={item.display_headline}
                  height={252}
                  width={448}
                />
              </a>
            </div>
            <h3 className="media-title">
              <a href={item.weburl_r} title={item.display_headline}>
                {item.display_headline}
              </a>
            </h3>
          </li>
        ))}
      </ul>
      <div className="add clearfix">
        <div
          className="addinner-box"
          style={{ height: 280, width: 300, margin: "0 auto" }}
        >
          <span id="first">विज्ञापन</span>
          <SiteAd
            width={336}
            height={280}
            adUnit={pageAds?.BTF_300}
            sizes={[
              [300, 250],
              [336, 280],
              [250, 250]
            ]}
            lazyload={true}
          ></SiteAd>
        </div>
      </div>
      <style jsx global>
        {`
            
            h1.mainhead {font-size: 24px;line-height: 28px;color: #001d42; text-transform: uppercase; font-weight: bold; border-bottom: 1px solid #ccd2d9;  padding-bottom: 5px; margin-top: 25px;}
            .addinner-box {background: #efefef; line-height: 0;display: table; margin: 10px auto; height: 270px;}
					.addinner-box span {display: block; font-size: 12px; color: #8E8E8E; text-align: center; height: 20px;line-height: 20px;width: 100%;}
					.add {background: #dbdde3; position: relative; padding: 16px 0; line-height: 0; text-align: center; height: 300px;}
          .addinner-box {background: #efefef; line-height: 0;display: table; margin: 10px auto; height: 270px;}
					.addinner-box span {display: block; font-size: 12px; color: #8E8E8E; text-align: center; height: 20px;line-height: 20px;width: 100%;}
          .wrapper { margin: 0px auto;}
          .double-title.page-title {
            align-items: flex-end;
            margin-bottom: 10px;
          }
      
          .media-list {padding: 0 0 20px 0;}
				.media-list li {margin-bottom: 20px;}
				.media-list li:nth-child(4n) {margin-right: 0;}
				.media-list li .media-wrap {position: relative; overflow: hidden; height: auto;margin-bottom: 10px;}
				.media-wrap img {width: 100%;}
				.media-title{font-size: 16px; line-height: 30px; background: #ff2759; color: #fff; padding: 7px 10px; margin-top: -10px;}				
				.media-title a {display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;color: #fff;text-decoration: none;	z-index: 0;}
				.date-class {display:none;}
        
          `}
      </style>
    </>
  );
};

export default Gallery;
