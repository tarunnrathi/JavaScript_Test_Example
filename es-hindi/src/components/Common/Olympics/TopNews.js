import LazyLoadImage from "../CustomImage";
const TopNews = (props) => {
  const { middleData, rightData, leftData, isMobile, isAMP = false } = props;
  if (isMobile || isAMP) {
    return (
      <>
        <div className="olymtpwrap">
          <div className="olymptp">
            {/* <!--Mobile top div--> */}
            <div className="olymptp_cntr mb">
              <a href={rightData[0]?.weburl_r}>
                <figure>
                  {isAMP ? (
                    <amp-img
                      src={rightData[0]?.images?.url}
                     // width={350}
                      height={255}
                      alt={rightData[0]?.display_headline}
                      title={rightData[0]?.display_headline}
                    ></amp-img>
                  ) : (
                    <LazyLoadImage
                      src={rightData[0]?.images?.url}
                      width={350}
                      height={255}
                      alt={rightData[0]?.display_headline}
                      title={rightData[0]?.display_headline}
                      isLazyLoad={true}
                    />
                  )}
                  <figcaption>
                    <h2 className="top_title">
                      {rightData[0]?.display_headline}
                    </h2>
                  </figcaption>
                </figure>
              </a>
            </div>
            {/* <!--Mobile top div--> */}

            <div className="olymptp_rl">
              <ul className="olymptptl">
                {middleData?.map((item, index) => {
                  return (
                    <li key={"middleData_" + index}>
                      <a href={item?.weburl_r}>
                        <figure>
                          {isAMP ? (
                            <amp-img
                              src={item?.images?.url}
                              width={88}
                              height={66}
                              alt={item?.display_headline}
                              title={item?.display_headline}
                            ></amp-img>
                          ) : (
                            <LazyLoadImage
                              src={item?.images?.url}
                              width={88}
                              height={66}
                              alt={item?.display_headline}
                              title={item?.display_headline}
                              isLazyLoad={true}
                            />
                          )}
                        </figure>
                        <h3 className="ttlolymp">{item?.display_headline}</h3>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="olymptp_rl">
              <ul className="olymptptl">
                {leftData?.map((item, index) => {
                  return (
                    <li key={"leftData_" + index}>
                      <a href={item?.weburl_r}>
                        <figure>
                          {isAMP ? (
                            <amp-img
                              src={item?.images?.url}
                              width={88}
                              height={66}
                              alt={item?.display_headline}
                              title={item?.display_headline}
                            ></amp-img>
                          ) : (
                            <LazyLoadImage
                              src={item?.images?.url}
                              width={88}
                              height={66}
                              alt={item?.display_headline}
                              title={item?.display_headline}
                              isLazyLoad={true}
                            />
                          )}
                        </figure>
                        <h3 className="ttlolymp">{item?.display_headline}</h3>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="load_more">
            <a href="/sports/olympics/news/">और पढ़े</a>
          </div>
        </div>

        <style jsx>{`
          .olymtpwrap {
            margin-bottom: 30px;
            padding: 10px;
          }
          .olymptp {
            width: 100%;
            display: block;
          }
          .olymptp_cntr {
            min-width: 445px;
            margin-bottom: 10px;
          }
          .olymptp_rl {
            min-width: 210px;
          }
          .olymptp_cntr figure img {
            width: 100%;
            display: block;
            height: 331px;
          }
          .olymptp_cntr figcaption {
            background-color: #f5f5f5;
            padding: 8px 15px;
          }
          .olymptp_cntr a {
            color: #001d42;
          }
          .top_title {
            font-size: 19px;
            line-height: 26px;
            font-weight: 700;
            color: #111;
          }
          .olymptp_cntr figcaption p {
            font-size: 12px;
            line-height: 18px;
            font-weight: 400;
            height: 36px;
            overflow: hidden;
          }
          .olymptp_rl .olymptptl li img {
            width: 206px;
            height: 154px;
          }
          .olymptptl li figure {
            display: none;
          }
          .olymptptl li:first-child figure {
            display: block;
          }
          .ttlolymp {
            font-size: 13px;
            line-height: 20px;
            font-weight: 400;
            color: #111;
          }
          .olymptptl li:first-child .ttlolymp {
            margin-top: 10px;
            margin-right: 10px;
          }
          .olymptptl li {
            border-bottom: 1px #dadada solid;
            padding: 15px 0;
          }
          .olymptptl li:first-child {
            padding-top: 0;
          }
          .load_more {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .load_more a {
            color: red;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 12px;
            flex-shrink: 0;
            padding: 0 15px;
            text-decoration: underline;
          }
          .load_more::before,
          .load_more::after {
            content: "";
            background: #f5f5f5;
            width: 100%;
            height: 20px;
          }
          .mb {
            display: none;
          }

          @media (max-width: 768px) {
            .olymptp_cntr {
              display: none;
            }
            .olymptp_cntr.mb,
            .olymptp_rl {
              display: block;
              min-width: 100%;
            }
            .olymptp_cntr.mb {
              border-bottom: 1px #dadada solid;
            }
            .top_title {
              font-size: 18px;
              line-height: 24px;
            }
            .olymptp_cntr figure img {
              height: 255px;
            }
            .olymptp_cntr figcaption {
              background: transparent;
              padding: 8px 0;
            }
            .olymptptl li:first-child a {
              display: flex;
              flex-direction: row-reverse;
              justify-content: space-between;
            }
            .olymptp_rl .olymptptl li img {
              width: 88px;
              height: 66px;
            }
            .ttlolymp {
              font-size: 14px;
              line-height: 20px;
              font-weight: 700;
            }
            .load_more,
            .full_table {
              border: 1px solid #c0c0c0;
              background-color: #f4f4f4;
              height: 36px;
            }
            .load_more a,
            .full_table a {
              font-size: 12px;
              color: #e1261d;
              text-decoration: none;
            }
          }
        `}</style>
      </>
    );
  } else {
    return (
      <>
        <div className="olymtpwrap">
          <div className="olymptp">
            {/* right side Data */}
            <div className="olymptp_rl">
              <ul className="olymptptl">
                {rightData?.map((item, index) => {
                  return (
                    <li key={"rightData_" + index}>
                      <a href={item?.weburl_r}>
                        <figure>
                          <LazyLoadImage
                            src={item?.images?.url}
                            width={206}
                            height={154}
                            alt={item?.display_headline}
                            title={item?.display_headline}
                            isLazyLoad={true}
                          />
                        </figure>
                        <h3 className="ttlolymp">{item?.display_headline}</h3>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* <!--DEsktop middle top div--> */}
            <div className="olymptp_cntr">
              <a href={middleData[0]?.weburl_r}>
                <figure>
                  <LazyLoadImage
                    src={middleData[0]?.images?.url}
                    width={445}
                    height={331}
                    alt={middleData[0]?.display_headline}
                    title={middleData[0]?.display_headline}
                    isLazyLoad={true}
                  />
                  <figcaption>
                    <h2 className="top_title">
                      {middleData[0]?.display_headline}
                    </h2>
                  </figcaption>
                </figure>
              </a>
            </div>

            {/* left side Data */}
            <div className="olymptp_rl">
              <ul className="olymptptl">
                {leftData?.map((item, index) => {
                  return (
                    <li key={"leftData_" + index}>
                      <a href={item?.weburl_r}>
                        <figure>
                          <LazyLoadImage
                            src={item?.images?.url}
                            width={206}
                            height={154}
                            alt={item?.display_headline}
                            title={item?.display_headline}
                            isLazyLoad={true}
                          />
                        </figure>
                        <h3 className="ttlolymp">{item?.display_headline}</h3>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="load_more">
            <a href="/sports/olympics/news/">More Stories</a>
          </div>
        </div>
      </>
    );
  }
};
export default TopNews;
