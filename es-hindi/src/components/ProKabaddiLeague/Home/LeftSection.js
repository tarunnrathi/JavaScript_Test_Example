import React, { useState } from "react";
import LazyLoadImage from "components/Common/CustomImage";

const LeftSection = (props) => {
  const { latestNews, dataLength, paramObj } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const totalItems = latestNews?.length||0;
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

  const displayedData = latestNews?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="left-section">
        {/*Schedule Main Section*/}
        <section className="schedule-main-block">
          <h1 className="double-title page-title">
            <span className="small-title" style={{ fontSize: 40 }}>
              प्रो कबड्डी लेटेस्ट अपडेट
            </span>
            <span className="big-title">लेटेस्ट अपडेट</span>
          </h1>
          <div className="schedule-wrap match-centre-wrap">
            <div className="media-list-wrap">
              <ul className="latest-update-media-list media-list">
                {displayedData?.map((item, index) => (
                  <li className="item2" key={`image${index}`}>
                    <div className="media-wrap">
                      <a
                        href={item?.weburl_r}
                        title={item?.display_headline}
                      >
                        <LazyLoadImage
                          height={143}
                          width={214}
                          src={item?.images?.url}
                          alt={item?.display_headline}
                          title={item?.display_headline}
                        />
                      </a>
                    </div>
                    <h3 className="media-title">
                      <a href={item.weburl_r} title={item?.display_headline}>
                        {item?.display_headline}
                      </a>
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
            <div className="vsp20 clearfix" />
          </div>
        </section>
        {/*Schedule Main Section*/}
        {/*PAGINATION-START*/}

        <div className="pagination-div">
          <li>

            {currentPage !== 1 &&
              <a
                href={void (0)}
                onClick={() => onPageChange('prev')}
                className="prv"
              >

                ❮
              </a>
            }
          </li>
          {pageNumbers.map((pageNo) => <li className={`${pageNo == currentPage && "active"}`}>
            <a onClick={() => onPageChange(pageNo)}>{pageNo}</a>
          </li>)}

          <li>
            {currentPage !== totalPages &&
              <a onClick={() => onPageChange('next')} className="nxt">
                ❯
              </a>}
          </li>
        </div>
      </div >
      <style jsx global>
        {`.pagination-div {display: flex;justify-content: center; padding: 20px 0;left: 0!important;}
					.pagination-div li {margin: 0 1px;}
					.pagination-div li a {color: #464646; float: left;padding: 8px 13px; text-decoration: none;background: #f5f5f5;border: 1px solid #d8d8d8;font-size: 16px;}
					.pagination-div li.active a {background: #e1261d; color: #fff;border-color: #e1261d;}
          .left-section {width: calc(100% - 330px);}
				.double-title.page-title {align-items: flex-end; margin-bottom: 10px;}
				.double-title {font-weight: 500; display: flex; align-items: flex-start;text-transform: uppercase; border-bottom: 1px solid #ccd2d9; position: relative;}
				.double-title.page-title .small-title {font-size: 36px; line-height: 44px; font-weight: bold;}
				.small-title {font-size: 24px; font-weight: normal; text-transform: uppercase; color: #001d42; padding: 0 0 10px; line-height: 18px;}
				.big-title, .tags-big-title { font-size: 40px; color: rgba(0, 29, 66, 0.1); margin: -3px 0 0 -8px; display: none;}
				.double-title.page-title .big-title { font-size: 40px; margin: 0;}
				
				.media-list {padding: 0 0 20px 0;display: flex; flex-wrap: wrap;}
				.media-list li {margin-bottom: 20px; width: 23.5%; margin-right: 2%;}
				.media-list li:nth-child(4n) {margin-right: 0;}
				.media-list li .media-wrap {position: relative; overflow: hidden; height: 140px;margin-bottom: 10px;}
				.media-list li .media-wrap img {transform: scale(1); transition: all .5s ease-in-out;}
				.media-list li:hover .media-wrap img {transform: scale(1.2); transition: all .5s ease-in-out;}
				.media-wrap img {width: 100%;height: 100%;}
				.media-title, .media-title a {font-size: 16px;color: #333;line-height: 24px; margin: 5px 0 0;font-weight: bold;}
				.date-class {font-size: 12px; color: #444;line-height: 14px;}
        .pagination-div li {cursor:pointer}
    `}
      </style>
    </>
  );
};

export default LeftSection;
