import { setDefaultImage } from 'includes/article.util';
import React from 'react';

export default function MobileComparisons({ data =[] }) {
  return (
    <>
      <div className="spcmblcmprsn">
        <h2 className="phnglblhd">
        मोबाइल <span>की तुलना</span>
        </h2>
        <ul className="spcmblcmprsnlist">
          {data &&
            data.slice(0, 10).map((mobileData, index) => {
              return (
                <li>

                  <a className='anchor' href={mobileData?.url+"/"}>
                  <figcaption>
                    <h2>
                      <div >{mobileData?.display_headline|| mobileData?.title}</div>
                    </h2>
                  </figcaption>
                  <figure>
                    <img
                      src={mobileData?.thumbnail}
                      loading="lazy"
                      height={ index === 0 || index === 1 ? '107px' : '66px'}
                      width={index === 0 || index === 1 ? '161px' : '100px'}
                      onError={setDefaultImage}
                    />
                  </figure>
                  </a>

                </li>
              );
            })}
        </ul>
      </div>
      <style jsx global>
        {`
          .spcmblcmprsn {
            margin: 0 15px;
          }
          .spcmblcmprsnlist {
            display:flex;
            flex-wrap: wrap;
          }
          .spcmblcmprsnlist li {
            display: flex;
            justify-content: space-between;
            background: #f5f5f5;
            padding: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid #d8d8d8;
          }
          .spcmblcmprsnlist li a figcaption h2 {
            font-size: 15px;
            line-height: 20px;
          }
          .spcmblcmprsnlist li a figcaption h2 a {
            color: #001d42;
          }
          .spcmblcmprsnlist li a figcaption div span {
            display: block;
            color: #e1261d;
            font-size: 11px;
            text-transform: uppercase;
            margin-bottom: 2px;
          }
          .spcmblcmprsnlist li a figure {
            width: 100px;
            height: 67px;
            overflow: hidden;
            line-height: 0;
            flex-shrink: 0;
            margin-left: 15px;
          }
          .spcmblcmprsnlist li a  figure img {
            width: 100%;
          }
          .spcmblcmprsnlist li:nth-child(1),
          .spcmblcmprsnlist li:nth-child(2) {
            width: 48.5%;
            display: flex;
            padding: 0;
            justify-content: flex-end;
            flex-direction: column-reverse;
          }
          .spcmblcmprsnlist li:nth-child(2) {
            float: right;
            margin-left:auto;
          }
          .spcmblcmprsnlist li:nth-child(1) h2,
          .spcmblcmprsnlist li:nth-child(2) h2 {
            padding: 10px;
          }
          .spcmblcmprsnlist li:nth-child(1) figure,
          .spcmblcmprsnlist li:nth-child(2) figure {
            width: 100%;
            margin-left: 0;
            height: auto;
          }
          .spcmblcmprsnmore {
            background: #f5f5f5;
            text-align: center;
            display: block;
          }
          .spcmblcmprsnmore span {
            letter-spacing: 0.24px;
            text-decoration: underline;
            color: #e1261d;
            text-transform: uppercase;
            font-size: 12px;
            font-weight: bold;
            background: #fff;
            padding: 0 8px;
            height: 22px;
            line-height: 22px;
            display: inline-block;
          }
          .anchor{
            display:flex;
          }
          .spcmblcmprsnlist li:nth-child(1) a,
          .spcmblcmprsnlist li:nth-child(2) a{
            display: flex;
            flex-direction: column-reverse;
          }
        `}
      </style>
    </>
  );
}
