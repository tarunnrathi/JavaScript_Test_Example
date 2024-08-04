import React from "react";
import LazyLoadImage from "components/Common/LazyLoadImage";

const OnThisDay = ({ archivesData }) => {
  return (
    <>
      <div className="cn-onthisdaywidget CN-Sections">
        <div className="CN-heading-1">
          <h2 className="headinner">
            आज का <span>किस्सा</span>
          </h2>
          <div className="icon"></div>
        </div>
        <div className="cn-smallstory-wrapper">
          {archivesData?.length
            ? archivesData.map((data, ind) => (
                <div className="cn-smallstory" key={ind}>
                  <a href={data.weburl_r}>
                    <div className="imgbox">
                      <LazyLoadImage height={73} width={110} src={data.images.url} alt={data.display_headline} title={data.display_headline} />
                    </div>
                    <div className="text-box">
                      <h3 className="heading-1 onthisday" style={{ textTransform: "none" }}>
                        {data.display_headline}
                      </h3>
                      {/* <p>{data.intro}</p> */}
                    </div>
                  </a>
                </div>
              ))
            : null}

          <a href="/tag/on-this-day" className="cn-morebtn1">
          और भी…
          </a>
        </div>
      </div>
      <style jsx global>{`
        .cn-smallstory-wrapper .cn-smallstory {
          border-bottom: 1px solid #dadada;
        }
        .cn-smallstory-wrapper .cn-smallstory:first-child a {
          padding-top: 0;
        }
        .cn-smallstory-wrapper .cn-smallstory a {
          display: flex;
          padding: 16px 0;
        }
        .cn-smallstory-wrapper .cn-smallstory .imgbox {
          flex: 0 0 110px;
          margin-right: 15px;
        }
        .cn-smallstory-wrapper .cn-smallstory .imgbox img {
          display: block;
          width: 100%;
        }
        .cn-smallstory-wrapper .cn-smallstory .text-box p {
          color: #323232;
          font-size: 13px;
          margin-top: 7px;
          line-height: 19px;
          margin-bottom: 0;
        }
        .CN-Mobile-HomeOuter .cn-onthisdaywidget .cn-smallstory-wrapper .cn-smallstory .text-box .heading-1{
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default OnThisDay;
