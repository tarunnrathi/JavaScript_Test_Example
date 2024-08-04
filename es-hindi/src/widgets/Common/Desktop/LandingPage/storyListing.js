import Image from "next/image";
import { imageLoader } from "includes/article.util";

const StoryListing = ({ newsData }) => {

  if (newsData == [] || newsData == undefined || newsData == "") {
    return null;
  }

  try {
    return (
      <div className="elec-middle-right">
        <ul className="stel-midlstories dflx jstbtwn flxwrp">
          <li key="landing-feature-image">
            <a href={(newsData && newsData[0].weburl) || ""} target="_blank">
              <figure>
                <Image
                  src={imageLoader(newsData[0]?.image?.url || "", 540, 339, false, true)}
                  width={540}
                  height={339}
                  alt={newsData[0]?.image?.alt}
                  title={newsData[0]?.image?.alt}
                  priority={true}
                  layout="responsive"
                  unoptimized={true}
                />
              </figure>
              <h2>
                {/* <span className="newsrank_cat">{newsData[0].categories ? newsData[0]?.categories[0]?.name : " "}</span> */}
                {newsData.length > 0 ? newsData[0]?.headline : " "}
              </h2>
            </a>
          </li>

          {newsData.map((data, index) => {
            if (index != 0) {
              return (
                <li key={index}>
                  <a href={data?.weburl || ""} target="_blank">
                    <figure>
                      <Image
                        src={imageLoader(data?.image?.url || "", 166, 111, false, true)}
                        width={166}
                        height={111}
                        alt={data?.image?.alt}
                        title={data?.headline}
                        priority={true}
                        layout="responsive"
                        unoptimized={true}
                      />
                    </figure>
                    {/* <span className="newsrank_cat">{data.categories ? data?.categories[0]?.name : " "}</span> */}
                    <h3>{data.headline ? data.headline : " "}</h3>
                  </a>
                </li>
              );
            }
          })}
        </ul>
        <a href="https://www.hindi.news18.com/topics/assembly-elections-2022/" className="ls-listingstory-more" target="_blank">
          <span>{"चुनाव से जुड़ी अन्य खबरें"}</span>
        </a>
        <style jsx global>{`
          .elec-middle-right {
            width: 100%;
            padding-left: 40px;
            box-sizing: border-box;
          }
          .stel-midlstories {
            margin-bottom: 20px;
          }
          .stel-midlstories li {
            width: 30%;
            position: relative;
            margin-top: 20px;
            border-bottom: 1px dotted #ccc;
          }
          .stel-midlstories li span {
            font-size: 11px;
            color: #e1261c;
            text-transform: uppercase;
          }
          .stel-midlstories li a {
            text-decoration: none;
          }
          .stel-midlstories li:nth-child(1) figure {
            margin-bottom: 0;
            height: 380px;
          }
          .stel-midlstories li a figure {
            line-height: 0;
            width: 100%;
            margin-bottom: 5px;
            height: 110px;
            overflow: hidden;
          }
          .stel-midlstories li a figure img {
            width: 100%;
            transform: scale(1);
            transition: all 0.5s ease-in-out;
          }
          .stel-midlstories li a figure:hover img {
            transform: scale(1.1);
            transition: all 0.5s ease-in-out;
          }
          .stel-midlstories li a h2 {
            position: absolute;
            bottom: 0;
            background: #f2f2f2;
            padding: 10px;
            width: 95%;
            right: 0;
            color: #001d42;
            font-size: 24px;
            font-weight: bold;
            line-height: 30px;
          }
          .stel-midlstories li a h2 span {
            display: block;
          }
          .stel-midlstories li a h3 {
            color: #001d42;
            font-size: 14px;
            line-height: 22px;
            padding: 0px 0 10px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            height: 69px;
          }
          .stel-midlstories li a h2:hover,
          .stel-midlstories li a h3:hover {
            color: #e1261c;
          }
          .stel-midlstories li:first-child {
            width: 100%;
            border: none;
            margin-top: 0;
          }
          .dflx {
            display: flex;
          }
          .jstbtwn {
            justify-content: space-between;
          }
          .flxwrp {
            flex-wrap: wrap;
          }
          .ls-listingstory-more {
            position: relative;
            display: block;
            margin: 20px 0 0 0;
            text-align: center;
            text-decoration: none;
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
      </div>
    );
  } catch (e) {
    // console.log(e);
    return null;
  }
};
export default StoryListing;
