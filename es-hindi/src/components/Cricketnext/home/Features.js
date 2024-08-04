import React from "react";
import LazyLoadImage from "components/Common/LazyLoadImage";

const Features = ({ featuresData }) => {

  return (
    <>
        <div className="cn-featurewidget CN-Sections">
            <div className="CN-heading-1">
                <h2 className="headinner">
                    नंबर <span>गेम</span>
                </h2>
                <div className="icon"></div>
            </div>
            <div className="cn-smallstory-wrapper">
                {featuresData?.length
                ? featuresData.map((data, ind) => {
                    return (
                    <div className="cn-smallstory" key={ind}>
                        <a href={data.weburl_r}>
                        <div className="imgbox">
                            <LazyLoadImage height={73} width={110} src={data.images.url} alt={data.display_headline} title={data.display_headline} />
                        </div>
                        <div className="text-box">
                            {/* <span className="pressbox-name">{data.author || data.agency || 'News18 हिंदी'}</span> */}
                            <h3 className="heading-1">{data.display_headline}</h3>
                        </div>
                        </a>
                    </div>
                    );
                })
                : null}
                <a href="/tag/number-game/" className="cn-morebtn1">और भी…</a>
            </div>
        </div>
        <style jsx global>{`
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
            .cn-smallstory-wrapper .cn-smallstory .text-box .pressbox-name {
                font-size: 11px;
                background: #e1261d;
                color: #ffffff;
                font-family: 'Karma',serif !important;
                padding: 3px 5px;
                display: table;
                margin-bottom: 6px;
                text-transform: uppercase;
            }
            .CN-Mobile-HomeOuter .cn-featurewidget .cn-smallstory .text-box .pressbox-name{
                display: none;          
            }
        `}</style>
    </>
  );
};

export default Features;
