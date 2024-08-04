import Image from "next/image";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { imageLoader } from "includes/article.util";

function News_ranking({ newsData }) {

  try {

    return (
      <>
        <ul className="stel-midlstories" id="electionNews">
          <li>
            <a href={(newsData && newsData[0].weburl) || ""} target="_blank">
              {/* <span className="newsrank_cat">{newsData[0].categories ? newsData[0]?.categories[0]?.name : " "}</span> */}
              <h2>{newsData.length > 0 && newsData[0].headline ? newsData[0].headline : " "}</h2>
              {newsData.length > 0 && newsData[0].image.url ? (
                <figure>
                  <Image
                    src = {imageLoader(newsData[0]?.image?.url || "", 360, 240, false, true)}
                    width={360}
                    height={240}
                    alt={newsData[0].headline}
                    title={newsData[0].headline}
                    priority={true}
                    layout="responsive"
                    unoptimized={true}
                  />
                </figure>
              ) : null}
            </a>
          </li>
          <div className="clearfix vsp20">
            <SiteAd
              adUnit={"NW18_HIND_PWA/NW18_HIND_HOME_PWA/NW18_HIND_HOME_HOME_PWA/NW18_HIND_PWA_HP_ATF_300"}
              adSizes={[
                [300, 250],
                [336, 280]
              ]}
              width= {300}
              height={280}
              lazyload={true}
            />
          </div>
          {newsData.map((data, index) => {
            if(index !== 0) {
              return (
                <li key={index}>
                  <a href={data?.weburl || ""} target="_blank">
                    {/* <span className="newsrank_cat">{data.categories ? data?.categories[0]?.name : " "}</span> */}
                    <h3>{data && data.headline ? data.headline : " "}</h3>
                    {data && data.headline ? (
                      <figure>
                        <Image
                          src = {imageLoader(data?.image?.url || "", 105, 70, false, true)}
                          width={105}
                          height={70}
                          alt={data?.headline}
                          title={data?.headline}
                          priority={true}
                          layout="responsive"
                          unoptimized={true}
                        />
                      </figure>
                    ) : null}
                  </a>
                </li>
              );
            }
          })}
        </ul>
        <div className="ls-btn">
          <a href="https://hindi.news18.com/topics/assembly-elections-2022/" className="ls-more" target="_blank">
            <span>{"चुनाव से जुड़ी अन्य खबरें"}</span>
          </a>
        </div>
        <style jsx>{`
          .clearfix {
            clear: both;
          }
          .clearfix:after,
          .clearfix:before {
            content: "";
            display: block;
            clear: both;
            visibility: hidden;
            line-height: 0;
            height: 0;
          }
          .vsp20 {
            margin-top: 20px;
          }
          .stel-midlstories {
            margin-bottom: 20px;
          }
          .stel-midlstories li {
            position: relative;
            margin-top: 15px;
            border-bottom: 1px dotted #ccc;
            padding-bottom: 10px;
          }
          .stel-midlstories li a {
            display: flex;
            justify-content: space-between;
          }
          .stel-midlstories li:first-child a {
            display: block;
          }
          .stel-midlstories li:first-child figure {
            margin-bottom: 0;
            margin-left: 0;
            width: 100%!important;
          }
          .stel-midlstories li a figure {
            line-height: 0;
            width: 105px;
            flex-shrink: 0;
          }
          
          .stel-midlstories li a figure img {
            width: 100%;
          }
          
          .stel-midlstories li a h2 {
            background: #f2f2f2;
            padding: 10px;
            color: #001d42;
            font-size: 22px;
            font-weight: 600;
            line-height: 28px;
            //font-family: "Playfair Display", serif;
            letter-spacing: -0.36px;
          }

          .sub_title {
            height: 22px;
            border-radius: 0px 4px 4px 0px;
            background: #e1261c;
            display: table;
            text-align: center;
            line-height: 22px;
            color: #fff;
            font-size: 11px;
            text-transform: uppercase;
            font-weight: bold;
            padding: 0 10px;
            margin-left: -15px;
            //font-family: "Recursive", sans-serif;
          }

          .stel-midlstories li a h3 {
            color: #282828;
            font-size: 14px;
            line-height: 18px;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            min-height: 55px;
            margin-right: 10px;
            text-align: left;
          }
          .stel-midlstories li a h3 span {
            color: #e1261c;
            text-transform: uppercase;
            font-size: 11px;
            font-weight: bold;
            display: block;
          }
          .stel-midlstories li a h2:hover,
          .stel-midlstories li a h3:hover {
            color: #e1261c;
          }
          .stel-midlstories li:first-child {
            border: none;
            margin-top: 0;
            margin-left: -15px;
            margin-right: -15px;
            padding-bottom: 0px;
          }
          .ls-listingstory-more {
            position: relative;
            display: block;
            margin: 15px 0 20px 0;
            text-align: center;
            text-decoration: none;
          }
          .sub_title {
            height: 22px;
            border-radius: 0px 4px 4px 0px;
            background: #e1261c;
            display: table;
            text-align: center;
            line-height: 22px;
            color: #fff;
            font-size: 11px;
            text-transform: uppercase;
            font-weight: bold;
            padding: 0 10px;
            margin-left: -15px;
            //font-family: "Recursive", sans-serif;
          }
          .ls-listingstory-more span {
            background: #fff;
            padding: 0 30px;
            text-transform: uppercase;
            color: #e1261c;
            position: relative;
            z-index: 1;
            text-align: center;
            font-weight: bold;
            font-size: 12px;
            top: -10px;
          }
          .ls-listingstory-more:before,
          .ls-listingstory-more:after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            height: 1px;
            background: #cccccc;
          }
          .ls-listingstory-more:before {
            top: 3px;
          }
          .ls-listingstory-more span:before,
          .ls-listingstory-more span:after {
            content: "";
            position: absolute;
            top: 1px;
            width: 3px;
            height: 15px;
            border-left: 1px solid #cccccc;
            border-right: 1px solid #cccccc;
            transform: rotate(20deg);
            display: block;
          }
          .ls-listingstory-more span:before {
            left: 10px;
          }
          .ls-listingstory-more span:after {
            right: 10px;
          }
        `}</style>
      </>
    );
  } catch (e) {
    console.log("news ranking error ", e);
    return null;
  }
}

export default News_ranking;
