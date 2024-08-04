import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../../GlobalStore";
import { imageLoader } from "includes/article.util";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const RhsPhotoGalleryNew = ({ topStories = [] }) => {
  const { globalState = {}, updateData } = useContext(GlobalContext);
  const { pgts = [] } = globalState;

  if (!(topStories.length || pgts.length)) {
    return null;
  }

  if (!pgts.length) {
    updateData(topStories, "pgts");
  } else {
    topStories = pgts;
  }

  return (
    <>
      <div className="newphtcnsmpn-right">
        <div className="newglblhdwrap forwhite newsml">
          <h2 className="newglblhd">
            <a href="/photogallery/">फोटो</a>
          </h2>
        </div>
        <ul className="newrgtphotolist">
          {topStories?.length &&
            topStories.map((item, index) => {
              if (index < 3) {
                return (
                  <li key={"topStories" + index}>
                    <a href={item.weburl}>
                      <figure>
                        <img
                          loading="lazy"
                          width={298}
                          height={200}
                          src={imageLoader(item.thumbnail, 298, 200)}
                          //src={item.images.url}
                          alt={item.title}
                          title={item.title}
                        ></img>
                        {item?.gallery?.length ? (
                          <span>
                            <img
                              src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/photoiconrgt_1669352580.svg"
                              alt=""
                            />
                            {item.gallery?.length} <b>फोटो</b>
                          </span>
                        ) : (
                          ""
                        )}
                      </figure>
                      <h3>{item.title}</h3>
                    </a>
                  </li>
                );
              }
            })}
        </ul>
        <a
          href={publicRuntimeConfig.siteUrl + "photogallery"}
          className="morestorybtn"
        >
          और देखें
        </a>
      </div>
      <style jsx>{`
        .newphtcnsmpn-right {
          width: 300px;
          flex-shrink: 0;
        }
        .newrgtphotolist {
        }
        .newrgtphotolist li {
          background: #000;
          margin-bottom: 10px;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid #4a4a4a;
        }
        .newrgtphotolist li a figure,
        .newrgtphotolist li a figure img {
          height: 200px;
          width: 100%;
          border-radius: 0;
        }
        .newrgtphotolist li a figure span {
          position: absolute;
          background: #ff4a4a;
          height: 26px;
          line-height: 26px;
          border: 1px solid #fff;
          border-right: none;
          border-radius: 3px 0 0 3px;
          bottom: 5px;
          display: block;
          font-size: 16px;
          color: #fff;
          right: 0;
          padding: 0 6px;
          font-weight: bold;
        }
        .newrgtphotolist li a figure span img {
          height: 13px;
          width: 14px;
          display: inline-block;
          marginRight: 5px;
          position: relative;
          top: 1px;
        }
        .newrgtphotolist li a figure span b {
          font-size: 10px;
          font-weight: normal;
        }
        .newrgtphotolist li li a figure img {
        }
        .newrgtphotolist li a h3 {
          padding: 10px;
          font-size: 14px;
          line-height: 18px;
          color: #fff;
        }
        .morestorybtn {
          background: #2e2e2e;
          height: 25px;
          line-height: 25px;
          color: #dcdcdc;
          font-size: 14px;
          display: block;
          text-align: center;
          color: #f8be01;
          font-weight: bold;
          margin-bottom: 30px;
        }

        .newglblhdwrap {
          border-bottom: 1px solid #d9d9d9;
          position: relative;
          margin-bottom: 6px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .newglblhdwrap:before {
          content: "";
          background: #ed1c24;
          width: 25px;
          height: 4px;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .newglblhdwrap .newglblhd,
        .newglblhdwrap .newglblhd a {
          font-size: 20px;
          line-height: 38px;
          color: #000;
          font-weight: bold;
          display: flex;
          align-items: end;
        }
        .newglblhdwrap .newglblhd span,
        .newglblhdwrap .newglblhd a span {
          color: #ed1c24;
          marginRight: 5px;
        }
        .newglblhdwrap .newglblhd em,
        .newglblhdwrap .newglblhd a em {
          color: #868686;
          font-weight: normal;
          text-transform: uppercase;
          font-style: normal;
          font-size: 12px;
          position: relative;
          top: 2px;
          margin-left: 10px;
        }
        .newglblhdwrap.newsml .newglblhd,
        .newglblhdwrap.newsml .newglblhd a {
          font-size: 18px;
          line-height: 34px;
        }
        .newglblhdwrap.forwhite {
          border-bottom: 1px solid #555555;
        }
        .newglblhdwrap.forwhite .newglblhd,
        .newglblhdwrap.forwhite .newglblhd a {
          color: #fff;
        }
      `}</style>
    </>
  );
};
export default RhsPhotoGalleryNew;
