import GlobalContext from "context";
import { useContext } from "react";
import { imageLoader } from "@/config/article.util";

export default function PhotoVideos({ pageData, highlight_data, apiKey }) {
  const { amp_news_type, mainData, subcat } = useContext(GlobalContext);
  pageData.photo_video.pop();
  if(pageData.photo_video.length == 0 || pageData.photo_video == [] || pageData.photo_video == undefined)
  {
    return null;
  }
  const nodeData = mainData[apiKey]?.news_ranking || {};
    const stateArray = mainData?.state || [];
    const tagArray = stateArray.find((o) => o.slug === subcat);
    const tag_slug = tagArray?.tag_slug || "";

  return (
    <div className="elec-container">
      <div className="elec-glblhd">
        <a
          // href="#"
          dangerouslySetInnerHTML={{
            __html: highlight_data.election_photo_video.h2_tag.mobile,
          }}
        ></a>
      </div>
      <ul className="stel-btmphtvdlist dflx">
        {pageData.photo_video.map((news) => {
          return (
            <li>
              <a href={news?.url || ""}>
                <figure>
                  <div className="ls-count">
                    +6 <span> Photo</span>
                  </div>
                  <amp-img
                    width="329"
                    height="199"
                    className=""
                    src={imageLoader(amp_news_type, news?.thumbnail || "", 198, 120, false, true)}
                    alt=""
                  />
                </figure>

                {/* <div className="ls_news_date">03 May,2021</div> */}

                <h2>{news.title || ""}</h2>
              </a>
            </li>
          );
        })}
      </ul>
      <a href={nodeData?.more_link.replace(":tag_slug:", tag_slug) || ""} className="ls-listingstory-more">
        <span>{nodeData?.more_text || ""}</span>
      </a>
      <style jsx>{`
        .stel-btmphtvdlist {
          margin-bottom: 10px;
          overflow: scroll;
          width: 100%;
        }
        .stel-btmphtvdlist li {
          width: 60%;
          background: #f5f5f5;
          border-bottom: 1px solid #d3d3d3;
          flex-shrink: 0;
          margin: 0 15px 0 0;
        }
        .stel-btmphtvdlist li a figure {
          line-height: 0;
          position: relative;
        }
        .stel-btmphtvdlist li a figure img {
          width: 100%;
          height: 119px;
          object-fit: cover;
        }
        .ls_news_date {
          float: left;
          font-size: 11px;
          color: #949494;
          text-transform: uppercase;
          width: 100%;
          margin-bottom: 5px;
          padding: 10px 10px 0;
        }
        .stel-btmphtvdlist li a h2 {
          font-size: 14px;
          color: #282828;
          font-weight: 700;
          line-height: 20px;
          padding: 0 10px;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 85px;
        }
        .stel-btmphtvdlist li a h2:hover {
          color: #e1261c;
        }
        .stel-vdicon {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #0000008a;
          color: #fff;
          border: 3px solid #fff;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .stel-vdicon:before {
          content: "";
          position: absolute;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 12px solid #fff;
          top: 7px;
          left: 11px;
        }
        .ls-count {
          position: absolute;
          top: 0;
          right: 0;
          background: #0000008a;
          color: #fff;
          opacity: 0.9;
          padding: 15px 10px 10px;
          font-weight: 700;
          font-size: 20px;
          text-align: center;
          line-height: 20px;
          z-index: 9;
        }
        .ls-count span {
          font-size: 10px;
          text-transform: uppercase;
          display: block;
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
}
