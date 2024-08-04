import React, { useState } from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import LazyLoadImage from "components/Common/CustomImage";
import ProKabaddiScoreWidget from "widgets/Common/Responsive/ProKabaddiScoreWidget";

const LatestNews = (props) => {
  const { latestNews, pageAds } = props?.data;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const totalItems = latestNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const onPageChange = (pageNumber) => {
    let pageN;
    if (pageNumber == "prev" && currentPage !== 1) {
      pageN = currentPage - 1;
    } else if (pageNumber == "next" && currentPage !== totalPages) {
      pageN = currentPage + 1;
    } else {
      pageN = pageNumber;
    }
    setCurrentPage(pageN);
  };

  const displayedData = latestNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="wrapper">
        {/*Breadcrumb start*/}
        <div className="bredcrum">
          <div className="bredcrum-txt">
            <a href="/">
              <span>Hindi News</span>{" "}
            </a>
            <a href="/pro-kabaddi-league/">
              {" "}
              ›› <span>Pro Kabaddi News 2021</span>{" "}
            </a>
            <a href="">
              {" "}
              ›› <span className="pagetitle">pkl News</span>{" "}
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
              adUnit={pageAds?.ATF_320}
              sizes={[
                [300, 250],
                [336, 280],
                [250, 250]
              ]}
              lazyload={true}
            ></SiteAd>
          </div>
        </div>
        <ProKabaddiScoreWidget isMobile={true}/>

        {/*  */}
        <h1 className="mainhead">प्रो कबड्डी लेटेस्ट अपडेट</h1>

      </div>
      <div className="wrapper">
        <ul className="latest_news">
          {displayedData.map((item, index) =>
            <li key={index}>
              <a href={item.weburl_r} title={item.display_headline}>
                <div className="gallery_cnt">
                  {item.display_headline}
                </div>
                <div className="latest_big">
                  <LazyLoadImage
                    src={`${item?.images?.url}`}
                    width={index == 0 ? 355 : 110}
                    height={index == 0 ? 236 : 73}
                    alt={item.display_headline}
                  />
                </div>
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className="pagination-div">
        <li>
          {currentPage !== 1 &&
            <a
              onClick={() => onPageChange('prev')}
              className="prv"
            >

              ❮
            </a>
          }
        </li>
        {pageNumbers.map((pageNo) => <li className={`${pageNo == currentPage ? "active" : ""}`}>
          <a onClick={() => onPageChange(pageNo)}>{pageNo}</a>
        </li>)}

        <li>
          {currentPage !== totalPages &&
            <a onClick={() => onPageChange('next')} className="nxt">
              ❯
            </a>}
        </li>
      </div>

      <style jsx global>
        {`
            
            h1.mainhead {font-size: 24px;line-height: 28px;color: #001d42; text-transform: uppercase; font-weight: bold; border-bottom: 1px solid #ccd2d9;  padding-bottom: 5px; margin-top: 25px;}
            .addinner-box {background: #efefef; line-height: 0;display: table; margin: 10px auto; height: 270px;}
					.addinner-box span {display: block; font-size: 12px; color: #8E8E8E; text-align: center; height: 20px;line-height: 20px;width: 100%;}
					.add {background: #dbdde3; position: relative; padding: 16px 0; line-height: 0; text-align: center; height: 300px;}
          .addinner-box {background: #efefef; line-height: 0;display: table; margin: 10px auto; height: 270px;}
					.addinner-box span {display: block; font-size: 12px; color: #8E8E8E; text-align: center; height: 20px;line-height: 20px;width: 100%;}
          .wrapper {
            margin: 0px auto;
        }
        .wrapper {
            margin: 0 auto;
            position: relative;
            padding: 0 10px;
            box-sizing: border-box;
        }
        .latest_news li {
            border-bottom: 1px solid #dadada;
            padding-bottom: 10px;
            margin-bottom: 10px;
        }
        .latest_news li:first-child a {
            display: block;
        }
        .latest_news li a {
            display: flex;
        }
        .latest_news li:first-child a .gallery_cnt {
            font-size: 18px;
            line-height: 24px;
            padding-bottom: 5px;
        }
        
        .latest_news li a .gallery_cnt {
            width: 100%;
            font-size: 16px;
            line-height: 22px;
            font-weight: bold;
            color: #001d42;
        }
        .latest_news li:first-child a .latest_big {
            width: 100%;
            margin-left: 0;
        }
        
        .latest_news li a .latest_big {
            width: 110px;
            flex-shrink: 0;
            margin-left: 10px;
        }
        .pagination-div {display: flex;justify-content: center; padding: 20px 0;left: 0!important;}
			.pagination-div li {margin: 0 1px;}
			.pagination-div li a {color: #464646; float: left;padding: 8px 13px; text-decoration: none;background: #f5f5f5;border: 1px solid #d8d8d8;font-size: 16px;}
			.pagination-div li.active a {background: #e1261d; color: #fff;border-color: #e1261d;}
          `}
      </style>
    </>

  );
};

export default LatestNews;
