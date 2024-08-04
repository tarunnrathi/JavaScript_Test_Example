import React from "react";
import RightSection from "./Home/RightSection";
import QuickLinks from "./Home/QuickLinks";
import SvgIcons from "./SvgIcons";
import LazyLoadImage from "components/Common/CustomImage";

const Gallery = (props) => {
  const { photoGallery } = props.data;
  return (
    <>
      <div className="pro-main-wrapper">
        <div className="content-wrap">
          <div className="pro-breadcrumb">
            <ul className="breadcrumb-list">
              <li>
                <a href="/" title="">
                  Hindi News{" "}
                  <svg
                    viewBox="0 0 32 32"
                    width={10}
                    height={10}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <style
                        dangerouslySetInnerHTML={{
                          __html: ".cls-1{fill:#231f20;}",
                        }}
                      />
                    </defs>
                    <title />
                    <g data-name="Layer 2">
                      <path
                        className="cls-1"
                        d="M16.88,15.53,7,5.66A1,1,0,0,0,5.59,7.07l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.42,0l9.61-9.61A.85.85,0,0,0,16.88,15.53Z"
                      />
                      <path
                        className="cls-1"
                        d="M26.46,15.53,16.58,5.66a1,1,0,0,0-1.41,1.41l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.41,0l9.62-9.61A.85.85,0,0,0,26.46,15.53Z"
                      />
                    </g>
                  </svg>{" "}
                </a>
              </li>
              <li>
                <a href="/pro-kabaddi-league/" title="">
                  Pro Kabaddi News 2021{" "}
                  <svg
                    viewBox="0 0 32 32"
                    width={10}
                    height={10}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <style
                        dangerouslySetInnerHTML={{
                          __html: ".cls-1{fill:#231f20;}",
                        }}
                      />
                    </defs>
                    <title />
                    <g data-name="Layer 2">
                      <path
                        className="cls-1"
                        d="M16.88,15.53,7,5.66A1,1,0,0,0,5.59,7.07l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.42,0l9.61-9.61A.85.85,0,0,0,16.88,15.53Z"
                      />
                      <path
                        className="cls-1"
                        d="M26.46,15.53,16.58,5.66a1,1,0,0,0-1.41,1.41l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.41,0l9.62-9.61A.85.85,0,0,0,26.46,15.53Z"
                      />
                    </g>
                  </svg>
                </a>
              </li>
              <li>PKL Gallery</li>
            </ul>
            <SvgIcons />
          </div>
        </div>
      </div>
      <section className="main-block-container content-wrap top-section latest-update-wraper">
        <div className="left-section">
          {/*Schedule Main Section*/}
          <section className="schedule-main-block">
            <h1 className="double-title page-title">
              <span className="small-title" style={{ fontSize: 40 }}>
                प्रो कबड्डी गैलरी 2021-22
              </span>
              <span className="big-title">गैलरी 2021-22</span>
            </h1>

            <div className="schedule-wrap match-centre-wrap" style={{ marginTop: '10px' }}>
              <div className="media-list-wrap">
                <ul className="latest-update-media-list media-list">
                  {photoGallery?.slice(0, 3).map((item, index) => (
                    <li className="item2" key={`gallery${index}`}>
                      <div className="media-wrap">
                        <a
                          href={item.weburl_r}
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
                      <div className="date-class">{new Date(item.updated_at).toLocaleString('en-us', { weekday: 'long' })}, {new Date(item.updated_at).toLocaleString('en-us', { day: 'numeric' })} {new Date(item.updated_at).toLocaleString('en-us', { month: 'long', year: 'numeric' })}</div>
                      <h3 className="media-title">
                        <a href={item?.weburl_r} title={item?.display_headline}>
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

        </div>
        <RightSection props={props?.data} />
      </section>
      <QuickLinks />
      <style jsx global>{`.pro-main-wrapper { padding: 5px 20px 0 20px;}
              .content-wrap { max-width: 1240px; margin: 0 auto;}
              .pro-breadcrumb {display: flex; justify-content: space-between; border-bottom: 1px dotted #969696; padding: 0 0 5px; align-items: center;}
              .breadcrumb-list { display: flex; align-items: center;}
              .breadcrumb-list li {font-size: 14px; color: #001d42;font-weight: 700; text-transform: uppercase; margin: 0 5px 0 0;}
              .breadcrumb-list li a {color: #969696;font-weight: 600;}
              .social-sharing {display: flex; align-items: center;}
              .social-share-link {width: 30px;  height: 30px; display: flex; align-items: center; border: 1px solid #7f7f7f; border-radius: 50%; margin: 0 0 0 10px;}
              .fb-link svg { margin: -10px 0 0;}
              .main-block-container {display: flex; padding-top: 10px;}
			    .content-wrap {max-width: 1240px; margin: 0 auto;}
          .date-class {
            font-size: 12px;
            color: #444;
            line-height: 14px;
        }
        .media-list li:nth-child(4n) {
          margin-right: 0;
        }
        .left-section {
          width: -webkit-calc(100% - 330px);
          width: -moz-calc(100% - 330px);
          width: calc(100% - 330px);
      }
      `}</style>
    </>
  );
};

export default Gallery;
