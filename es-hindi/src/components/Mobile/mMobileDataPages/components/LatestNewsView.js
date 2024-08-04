import React, { useEffect } from 'react';
import Glide from '@glidejs/glide';
import { setDefaultImage } from 'includes/article.util';
import { getCompleteURL } from 'util/global/Helper';

const { newsURL } = require("/src/includes/brand.helper");

export default function LatestNewsView({ data = [] }) {

    useEffect(() => {
      setTimeout(() => {
        const elm = document?.querySelector('.phnspcnwsphnsld-in');
        if (elm) {
          new Glide('.phnspcnwsphnsld-in', {
            autoplay: 4000,
            type: 'carousel',
            perView: 1.9,
            gap: 0,
            slidesToScroll: 1,
          })?.mount();
        }
      }, 2000);
    }, []);

  return (
    <div>
      <div id='newsWidget' className="spcnwsphn">
        <h2 className="phnglblhd">लेटेस्‍ट मोबाइल न्‍यूज </h2>

        {/* <!-- large photo slider start --> */}
        <div className="phnspcnwsphnsld">
          <div className="phnspcnwsphnsld-in psrlhdn">
            <div data-glide-el="track">
              <ul className="dflx">
                {data?.map((news) => {
                  return (
                    <li >
                      <a href={getCompleteURL(news?.weburl_r,news?.weburl)+"/"}>
                      <div className="phnnwsbx">
                        <figure>
                          <img
                            src={news?.images?.url}
                            alt={news?.headline||news?.display_headline}
                            className="lnw_img"
                            loading="lazy"
                            onError={setDefaultImage}
                          />
                        </figure>
                        <h3>{news?.display_headline}</h3>
                      </div>
                      </a>

                    </li>
                  );
                })}
              </ul>
            </div>

            <div data-glide-el="controls[nav]" className="phnlgblts dflx jstcntr">
              <button data-glide-dir="=0"></button>
              <button data-glide-dir="=1"></button>
              <button data-glide-dir="=2"></button>
              <button data-glide-dir="=3"></button>
              <button data-glide-dir="=4"></button>
              <button data-glide-dir="=5"></button>
            </div>
          </div>
          <a href={`${newsURL}/`} className="phnmrnwsbtn">
            अन्‍य खबरें
          </a>
        </div>

        {/* <!-- large photo slider end --> */}
      </div>
      <style jsx global>
        {`
          .spcnwsphn {
          }
          .spcnwsphn .phnglblhd {
            background: #e1261d;
            color: #fff;
            padding: 10px 15px;
            overflow: hidden;
            margin-bottom: 0;
            border: none;
          }
          .spcnwsphn .phnglblhd span {
            color: #fff;
          }
          .phnspcnwsphnsld {
            background: #3e3e3e;
            padding: 15px 0;
            margin-bottom: 30px;
          }
          .phnspcnwsphnsld-in {
          }
          .phnnwsbx {
            height: 230px;
            background: #1a1a1a;
            box-shadow: 0px 2px 4px #00000029;
            margin-left: 15px;
            position: relative;
            border: 1px solid #9b9b9b;
          }
          .phnnwsbx h2,
          .phnnwsbx h3 {
            font-size: 15px;
            line-height: 20px;
            font-weight: bold;
            color: #fff;
            margin: 10px;
          }
          .phnnwsbx figure {
            width: 100%;
            height: 115px;
            line-height: 0;
            overflow: hidden;
          }
          .phnnwsbx figure img {
            width: 100%;
          }
          .phnmrnwsbtn {
            background: #ed1c24;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #ffffff;
            border-radius: 18px;
            width: 98px;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: #ffffff;
            text-transform: uppercase;
            font-weight: bold;
            display: block;
            margin: auto;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}
