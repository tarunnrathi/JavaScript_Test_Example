import GlobalContext from "context";
import { useContext } from "react";
import { imageLoader } from "@/config/article.util";

const ElectionPhotoVideo = ({ pageData, highlight_data }) => {
  const { amp_news_type } = useContext(GlobalContext);
  return (
    <div className="elec-container">
      {/* <!-- photo and video start  --> */}
      <div className="elec-glblhd">
        <a
          href="#"
          dangerouslySetInnerHTML={{
            __html: highlight_data?.election_photo_video?.h2_tag?.mobile || "",
          }}
        ></a>
        {/* <a href="#">Election <span>Photo/Video</span></a> */}
      </div>
      <ul className="stel-btmphtvdlist dflx">
        {pageData.photo_video.map((news) => {
          console.log("images amp: ", [amp_news_type, news?.thumbnail]);
          return (
            <li>
              <a href="#">
                <figure>
                  <div className="ls-count">
                    +6 <span> Photo</span>
                  </div>
                  <amp-img
                    width="198"
                    height="120"
                    layout="responsive"
                    className=""
                    src={imageLoader(amp_news_type, news?.thumbnail || "", 198, 120, false, true)}
                    alt=""
                  />
                </figure>

                {/* <div className="ls_news_date"> {format_date_pd(news && news.update_date.slice(0,8) || "")}</div> */}
                <div className="ls_news_date">03 May,2021</div>

                <h2>{news.title || ""}</h2>
              </a>
            </li>
          );
        })}
      </ul>
      <a href="#" className="ls-listingstory-more">
        <span>More Election News</span>
      </a>
      {/* <!-- photo and video end  --> */}
    </div>
  );
};
export default ElectionPhotoVideo;
