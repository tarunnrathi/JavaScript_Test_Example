import React, { useEffect, useState } from "react";
import SingleMobileListingH from "./components/brandPage/SingleMobileListingH";

const { specificationURL } = require("/src/includes/brand.helper");

import { InView } from 'react-intersection-observer';
import { logEvent } from "includes/googleAnalytic";
import { getMobile } from "api/global/Common";

const QuickView = ({ data: mbData, headline }) => {
  const [mobileData, setMobileData] = useState({});
  const [mobileId] = mbData.split(",");

  const callApi = async () => {
    const id = mobileId;
    const data = await getMobile({ id: id }, true);
    setMobileData(data);
  };

  useEffect(() => {
    callApi();
  }, []);

  const redirectToSpec =() => {

    logEvent('Article_embed_click', 'Click', headline);
    window.location.href = mobileData?.title.includes('(') ?`${specificationURL}/${mobileData?.title?.slice(0, mobileData?.title?.indexOf('('))
                 .replace(/ /g, "-")
                 .toLowerCase()}${mobileId}`:`${specificationURL}/${mobileData?.title
                 .replace(/ /g, "-")
                 .toLowerCase()}-${mobileId}/`;
  };

  return (
    <div className='quickViewWidget' onClick={redirectToSpec}>
      <InView
       as="div"
       threshold={0.1}
       onChange={(inView) =>
         inView &&
         logEvent('Article_embed_view', 'View', headline)
       }
      >
      <SingleMobileListingH mobileData={mobileData} quickView={true} headline={headline} />
      </InView>

      <style jsx global>
        {`

        .quickViewWidget{
          font-family:  Mukta, sans-serif !important;

        }
          .cmp_mobile {
            margin-bottom: 30px;
          }
          .ph_row {
            background: #ffffff;
            border: 1px solid #d8d8d8;
            display: flex;
          }
          .ph_row:nth-last-child(2) {
            margin-bottom: 40px;
          }
          .ph_galri {
            text-align: center;
            text-decoration: underline;
            font: normal normal bold 11px/1 Mukta, sans-serif !important;
            color: #e1261d;
            margin-bottom: 7px;
          }
          .ml_cnt {
            width: 175px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          .mr_cnt {
            border-left: 1px solid #d8d8d8;
            flex-grow: 1;
          }
          .mc_h {
            border: #f7f7f7 solid 1px;
            background: #f6f7f7;
            padding: 14px 20px;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
            position: relative;
          }
          .mc_h:before {
            content: "";
            width: 25px;
            height: 4px;
            background: #ed1c24;
            position: absolute;
            left: 20px;
            bottom: 0;
          }
          .mc_h .m_prize {
            font: 700 21px/20px Mukta, sans-serif !important;
            color: #0076db;
            margin-left: 40px;
          }
          .mc_h .os {
            font: normal 12px/13px Mukta, sans-serif !important;
            color: #001d42;
            display: flex;
            align-items: center;
            margin-left: 40px;
          }
          .mc_h .os span {
            margin-left: 8px;
          }
          .mc_h .ttl {
            font: bold 18px/20px Mukta, sans-serif !important;
            color: #001d42;
            text-transform: uppercase;
            margin-right: auto;
          }
          .mc_h .ttl span {
            color: #e1261d;
          }
          .mc_b {
            padding: 0 20px;
          }
          .mc_b .ph_details {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 33px;
            gap: 10px 30px;
          }
          .mc_b .ph_details .col {
            flex-grow: 1;
            // padding: 0 10px;
          }
          .ph_details .col:last-child {
            padding-right: 0;
            border: none;
          }
          .ph_details .col:first-child {
            padding-left: 0;
          }
          .ph_details .dt_img {
            margin-bottom: 15px;
            width: 30px;
            height: 30px;
            float:left;
            margin-right: 10px;
          }
          .ph_details .dt_ttl {
            font: 700 14px/14px Mukta, sans-serif !important;
            color: #ff5a00;
            margin-top: 8px;

          }
          .ph_details .dt_list{
            clear: both;
          }
          .ph_details .dt_list li {
            font: normal 12px/18px Mukta, sans-serif !important;
            color: #646464;
            padding: 0 0 5px 10px;
            position: relative;
            width: 153px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .ph_details .dt_list li:before {
            content: "";
            width: 5px;
            height: 5px;
            background: #bababa;
            border-radius: 10px;
            position: absolute;
            top: 6px;
            left: 0;
          }
          .ph_details .dt_list li:last-child {
            padding-bottom: 0;
          }
          .mc_f {
            background: #f6f7f7 0% 0% no-repeat padding-box;
            border: 1px solid #f7f7f7;
            height: 50px;
            display: flex;
            padding: 0 20px;
            align-items: center;
            justify-content: flex-end;
          }
          .mc_f .ps_dtl {
            margin-right: 68px;
          }
          .mc_f .psdtl_h {
            font: normal 12px/18px Mukta, sans-serif !important;
            color: #646464;
          }
          .mc_f .psdtl_f {
            font: normal 14px/18px Mukta, sans-serif !important;
            color: #212121;
          }
          .phfe_list {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-right: auto;
          }
          .phfe_list li {
            display: flex;
            align-items: center;
            padding: 0 6px;
            display: none;
          }
          .phfe_list li:first-child {
            padding-left: 0;
          }

          .phfe_list li:nth-child(1),
          .phfe_list li:nth-child(2),
          .phfe_list li:nth-child(3),
          .phfe_list li:nth-child(4),
          .phfe_list li:nth-child(5){
             display: flex;
          }

          .phfe_list .txt {
            font: normal 11px/11px Mukta, sans-serif !important;
            color: #212121;
            width: 14px;
          }
          .phfe_bg {
            width: 20px;
            height: 20px;
          }
          .phfe_bg.bg-w_charging {
            background-size: 128px;
            background-position: -61px -32px;
          }
          .phfe_deactiv {
            opacity: 0.3;
          }
          .ph_thmb {
            margin-bottom: 5px;
          }
          // .ph_redet {
          //   display: -webkit-box;
          //   display: -webkit-flex;
          //   display: -ms-flexbox;
          //   display: flex;
          //   -webkit-align-items: center;
          //   -webkit-box-align: center;
          //   -ms-flex-align: center;
          //   align-items: center;
          //   -webkit-flex-direction: column;
          //   -ms-flex-direction: column;
          //   flex-direction: column;
          //   margin-bottom: 10px;
          //   font: normal 12px/18px Mukta, sans-serif !important;
          //   color: #646464;
          // }
          .ph_redet span {
            display: block;
            color: #212121;
            font-size: 14px;
          }
          .phfl_spe {
            // width: 170px;
            height: 28px;
            background: #e1261d;
            border-radius: 14px;
            border: none;
            cursor: pointer;
            font: bold 14px/17px Mukta, sans-serif !important;
            color: #ffffff;
            display: flex !important;
            justify-content: space-between;
            align-items: center;
            padding: 0 32px;
            // line-height: 0 !important;
          }

          .phfl_spe span {
            color: white;
            margin-top:3px;
        }
         

          .light{
            opacity: 0.5;
           }
  
           .icon_deactive_brandPage{position: relative;}
              .icon_deactive_brandPage svg, .icon_deactive_brandPage div{opacity: 0.3;}
              .icon_deactive_brandPage:before{content: '';width: 1px;background-color: #ff0000;position: absolute;top: -3px;bottom: -2px;transform: rotate(45deg);left:16px}
         

              .sprite {
                background: url("https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/sprite_1643807363.png");
              }
              .bg-card {
                background-position: -10px -180px;
              }
              .bg-lte {
                background-position: -240px -10px;
              }
              .bg-splash {
                background-position: -240px -90px;
              }
              .bg-4g {
                background-position: -190px -105px;
              }
              .bg-dual_sim {
                background-position: -50px -180px;
              }
              .bg-fingerprint {
                background-position: -90px -180px;
              }
              .bg-fm {
                background-position: -130px -180px;
              }
              .bg-g_glass {
                background-position: -170px -180px;
              }
              .bg-w_charging {
                background-position: -130px -70px;
              }
              .bg-performance {
                background-position: -190px -10px;
              }
              .bg-display {
                background-position: -110px -130px;
              }
              .bg-camera {
                background-position: -60px -130px;
              }
              .bg-battery {
                background-position: -10px -130px;
              }
              .bg-android_b {
                background-position: -70px -10px;
              }
              .bg-mobile {
                background-position: -70px -70px;
              }
              .bg-ram {
                background-position: -130px -10px;
              }
              .bg-fingerprint_b {
                background-position: -10px -70px;
              }
              .bg-5g {
                background-position: -10px -10px;
              }

            .ph_row:nth-last-child(2) {
              margin-bottom: 40px;
          }

        .quickViewWidget:hover{
           cursor: pointer;
        }

        .qvimage{
          border: none !important;
          box-shadow:none !important;
          width: 115px !important;
          height: 260px !important;
        }
        .ph_galri {
          text-align: center;
          text-decoration: underline;
          font: normal normal bold 11px/1 Mukta,sans-serif;
          color: #E1261D;
          margin-bottom: 7px;
      }

      .ph_redet {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        margin-right: 40px;
        font: normal 12px/18px Mukta,sans-serif;
        color: #646464;
    }
       
        `}
      </style>
    </div>
  );
};

export default QuickView;
