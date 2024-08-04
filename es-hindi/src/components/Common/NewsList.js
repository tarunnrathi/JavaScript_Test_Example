import { useState, useEffect } from "react";
import LazyImage from "./LazyImage";
import { getArticles } from "api/individual/Home";
import { getCompleteURL } from "util/global/Helper";

const NewsList = ({ url, title, cat, headBold, autoView, count }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      setData(
        await getArticles({ count: count || 5, category: cat }, true)
      );
    })();
  }, []);

  return (
    <>
      <div className={`${autoView ? 'auto' : 'list'}-view`}>
        <div className="globalhd">
          <h2>
            <a href={url}>{title}</a>
          </h2>
        </div>
        <ul className={`right-${autoView ? 'auto dflex justify-space-betwwen flex-wrap' : 'nl'}`}>
          {data && data.length > 1 && data.map((item, index) => (
              <li key={`rhsbar-`+cat+index}>
                <a href={getCompleteURL(item.weburl_r, item.weburl)}>
                  {index == 0 || autoView ? (
                    <LazyImage unoptimized={true} src={item.images.url} width={!autoView ? 300 : 124} height={!autoView ? 200 : 83} />
                  ) : null}
                  <h3 style={{ fontWeight: headBold && index == 0 ? 'bold' : 'normal' }}>{item.display_headline || item.headline}</h3>
                </a>
              </li>
            ))}
        </ul>
        <a href={url} className="aurbhi-button smal">
          और भी पढ़ें <span></span>
        </a>
      </div>
      <style>{`
      .right-auto li a {
        font-size: 15px;
        line-height: 1.45;
        color: #000;
        display: block;
      }
      .right-auto li {
        width: 46%;
        margin-bottom: 15px;
      }
      .right-auto {
        background: #f3f3f3;
        padding: 15px 15px 0 15px;
        border-bottom: 1px dashed #ccc;
        margin-bottom: 15px;
    }
    .right-auto li h3 {
      font-size: 15px;
    }
      .aurbhi-button span:after {
        left: 8px;
      }
      .aurbhi-button span:after, .aurbhi-button span:before {
          content: "";
          position: absolute;
          top: 7px;
          width: 4px;
          height: 4px;
          border-top: 1px solid #fff;
          border-right: 1px solid #fff;
          display: block;
          transform: rotate(
      45deg
      );
      }
      .aurbhi-button span:before {
        left: 4px;
    }
    
  .aurbhi-button span:after, .aurbhi-button span:before {
      content: "";
      position: absolute;
      top: 7px;
      width: 4px;
      height: 4px;
      border-top: 1px solid #fff;
      border-right: 1px solid #fff;
      display: block;
      transform: rotate(
  45deg
  );
  }
  .aurbhi-button.smal span {
    top: 3px;
}

.aurbhi-button span {
    background: #ed1c24;
    width: 19px;
    height: 19px;
    border-radius: 100%;
    display: inline-block;
    position: relative;
    top: 3px;
    margin-left: 4px;
}
      .right-nl {
        margin-top: 15px;
      }
      .right-nl li {
        position: relative;
        padding-left: 10px;
        margin-bottom: 15px;
      } 
      .right-nl li:first-child {
        padding-left: 0;
      }

      .right-nl li a figure {
        width: 100%;
        margin-bottom: 10px;
      }
   
      .right-nl li a {
          font-size: 16px;
          line-height: 1.45;
          color: #000;
      }

      .right-nl li:first-child a {
        font-weight: 700;
        font-size: 18px;
      }

      .right-nl li h3 {
        font-size: 16px;
        font-weight: normal;
      }
      .right-nl li:before {
        content: "";
        width: 3px;
        height: 12px;
        position: absolute;
        left: 0;
        top: 5px;
        background: #ed1c24;
    }
        div#health-view a.aurbhi-button.smal {
          clear: both;
      }
      
      .aurbhi-button.smal {
          font-size: 12px;
      }
      .aurbhi-button {
          color: #001536;
          font-size: 14px;
          font-weight: 700;
          position: relative;
          float: right;
          padding-right: 5px;
      }
      `}</style>
    </>
  );
};

export default NewsList;
