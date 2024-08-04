import LazyLoadImage from "components/Common/CustomImage";
import React from "react";
import { getCompleteURL } from "util/global/Helper";

const News18Viral = ({ data = [], title = "", readMore }) => {
  return (
    <div className='news18viral'>
      <h2 className="rgtglobahd">{title}</h2>
      <ul className="photostorylist">
        {data.map((ele) => {
          return (
            <li>
              <a href={getCompleteURL(ele?.weburl_r, ele?.weburl)}>
                <figure>
                  <LazyLoadImage
                    src={ele?.images?.url}
                    width={120}
                    height={66}
                    alt={ele?.display_headline}
                  />  
                </figure>
                <figcaption>{ele?.display_headline || ele?.title}</figcaption>
              </a>
            </li>
          );
        })}
      </ul>
      <a href={readMore+"/"} className="morestorybtn">
        और देखें
      </a>
    </div>
  );
};

export default News18Viral;
