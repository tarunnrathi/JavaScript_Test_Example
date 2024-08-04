import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { setDefaultImage } from "includes/article.util";
import { imgURL } from "api/Constant";

const { specificationURL } = require("/src/includes/brand.helper");

const MobileListingV = ({
  needTitle = true,
  title = "",
  data = "",
  idForLanding = "",
}) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let demoClass = "trndm_wrp_tren";

  switch (idForLanding) {
    case "upcomingMobile":
      demoClass = "trndm_wrp_up";
      break;
    case "trendingMobile":
      demoClass = "trndm_wrp_tren";
      break;
    case "otherMobile":
      demoClass = "trndm_wrp_other";
      break;

    default:
      demoClass = "trndm_wrp_other";

      break;
  }

  useEffect(() => {
    if (data && data.length) {
      new Glide(`.${demoClass}`, {
        autoplay: 4000,
        type: "carousel",
        perView: 4,
        slidesToScroll: 1,
        gap: 20,
      }).mount();
    }
  }, []);

  return (
    <div id={idForLanding || ""}>
      <div id="trndm" className="section">
        {needTitle ? (
          <h2 className="sc_ttl">
            {title} <span>मोबाइल</span>
          </h2>
        ) : (
          ""
        )}

        <div className={demoClass}>
          <div data-glide-el="track">
            <ul className="trndsdr">
              {data &&
                data.map((mobile) => {
                  let { operating_system } =
                    JSON.parse(mobile?.general_specs_91 || '{}') || {};
                  let { osVersion } =
                   ( mobile.specs && JSON.parse(mobile?.specs || "{}") )    || {};

                  const {
                    title = "",
                    price = 0,
                    release_date = "",
                    internal_storage_display = "",
                    volte = "",
                    no_of_sim_cards = "",
                    finger_print_sensor = "",
                    fm_radio = "",
                  } = mobile || {};

                  const newReleaseDate = release_date && "" + release_date;

                  const year = newReleaseDate && newReleaseDate.slice(0, 4);
                  const month = newReleaseDate && newReleaseDate.slice(5, 7);
                  const date = newReleaseDate && newReleaseDate.slice(8, 10);

                 const specificationFullURL = title?.includes('(') ?`${specificationURL}/${title?.slice(0, title?.indexOf('('))
                 ?.replace(/ /g, "-")
                 ?.toLowerCase()}${mobile?.id}`:`${specificationURL}/${title
                 ?.replace(/ /g, "-")
                 ?.toLowerCase()}-${mobile?.id}/`;

                  return (
                    <li className="glide__slide">
                      <a
                        href={specificationFullURL+"/"}
                        className="trndthmb_wrp"
                        title={title}
                      >
                        <div className="trndthmb_ttl">{(title?.length || 0)>40? `${(title || "").slice(0, 35)}...` :title}</div>

                          <div className="trndthmb_and">
                          { operating_system ==='Android' || mobile?.operating_system ==='Android' ? <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11.648"
                            height="14"
                            viewBox="0 0 11.648 14"
                          >
                            <path
                              id="Path_92"
                              data-name="Path 92"
                              d="M9.086-12.824H8.512v-.6h.574Zm-2.926,0H5.586v-.6H6.16Zm3.227-1.668.766-.766a.3.3,0,0,0,0-.41.3.3,0,0,0-.41,0l-.848.875a3.436,3.436,0,0,0-1.559-.355,3.436,3.436,0,0,0-1.559.355L4.9-15.668a.252.252,0,0,0-.383.027.239.239,0,0,0,0,.383l.738.766a3.612,3.612,0,0,0-1.039,1.217,3.371,3.371,0,0,0-.383,1.6h7a3.277,3.277,0,0,0-.4-1.6A3.758,3.758,0,0,0,9.387-14.492Zm2.9,3.418a.818.818,0,0,0-.6.246.953.953,0,0,0-.273.629v4.074a.953.953,0,0,0,.273.629.835.835,0,0,0,.615.246.835.835,0,0,0,.615-.246.852.852,0,0,0,.246-.629V-10.2a.852.852,0,0,0-.246-.629A.852.852,0,0,0,12.285-11.074Zm-9.9,0a.852.852,0,0,0-.629.246.852.852,0,0,0-.246.629v4.074a.852.852,0,0,0,.246.629.835.835,0,0,0,.615.246A.835.835,0,0,0,2.988-5.5a.953.953,0,0,0,.273-.629V-10.2a.953.953,0,0,0-.273-.629A.818.818,0,0,0,2.387-11.074ZM3.836-5.25A.556.556,0,0,0,4-4.84a.556.556,0,0,0,.41.164h.6v2.051A.852.852,0,0,0,5.258-2a.835.835,0,0,0,.615.246A.835.835,0,0,0,6.488-2a.953.953,0,0,0,.273-.629V-4.676H7.91v2.051A.953.953,0,0,0,8.184-2,.835.835,0,0,0,8.8-1.75.835.835,0,0,0,9.414-2a.852.852,0,0,0,.246-.629V-4.676h.6a.556.556,0,0,0,.41-.164.556.556,0,0,0,.164-.41v-5.824h-7Z"
                              transform="translate(-1.512 15.75)"
                              fill="#97c02f"
                            ></path>
                          </svg>:""}
                { operating_system === 'iOS' || mobile?.operating_system === 'iOS' ? <svg id="Capa_1" width='12' version="1.1" viewBox="0 0 90 90" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><g><path d="M49.6,6.8C52.9,3,58.3,0.2,62.8,0c0.6,5.3-1.5,10.6-4.7,14.4c-3.1,3.8-8.3,6.8-13.3,6.4     C44.2,15.6,46.7,10.2,49.6,6.8z M75.3,78.8c-3.7,5.5-7.6,10.9-13.7,11.1c-6,0.1-7.9-3.6-14.8-3.6c-6.9,0-9,3.5-14.7,3.7     c-5.9,0.2-10.4-5.9-14.2-11.4C10.2,67.4,4.3,47,12.3,33.3c3.9-6.8,10.9-11.2,18.5-11.3c5.8-0.1,11.3,3.9,14.8,3.9     c3.5,0,10.2-4.8,17.2-4.1c2.9,0.1,11.1,1.2,16.4,8.9c-0.4,0.3-9.8,5.7-9.7,17.1C69.6,61.4,81.4,66,81.5,66     C81.4,66.3,79.6,72.5,75.3,78.8z" id="Apple"/></g></g></svg> :"" }

                          {operating_system || (mobile?.operating_system ?`${mobile?.operating_system} v${osVersion}` :'') }
                        </div>
                        <img
                          src={
                            imgURL ||
                            "https://www.forbes.com/uk/advisor/wp-content/uploads/2020/11/phones-switch-apps.jpg"
                          }
                          alt=""
                          className="trndthmb_img"
                          style={{ width: "64px", height: "133px" }}
                          onError={setDefaultImage}
                          loading="lazy"
                        />
                        <div className="trndthmb_prz">
                          ₹ {numberWithCommas(price)}
                        </div>
                        {idForLanding === "upcomingMobile" ? (
                          <>
                            <div className="exp">(Expected)</div>
                            <div className="r_det">
                              जारी करने की तारीख:{" "}
                              {newReleaseDate
                                ? date + "-" + month + "-" + year
                                : "NA"}
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        <ul className="trndfe_list">
                          <li className={
                          !internal_storage_display? "icon_deactive" : ""
                        } >
                            <div className= {internal_storage_display?"sprite bg-card trnd_bg":"light sprite bg-card trnd_bg"} ></div>
                            <div className="txt">{internal_storage_display ||"NA"}</div>
                          </li>
                          <li className={
                          !volte? "icon_deactive" : ""
                        }>
                            <div
                              className={
                                volte
                                  ? "sprite bg-4g trnd_bg"
                                  : "sprite bg-4g light trnd_bg"
                              }
                            ></div>
                          </li>
                          <li className={
                          no_of_sim_cards !== 2 ? "icon_deactive" : ""
                        }>
                            <div
                              className={
                                no_of_sim_cards === 2
                                  ? "sprite bg-dual_sim trnd_bg"
                                  : "sprite light bg-dual_sim trnd_bg"
                              }
                            ></div>
                          </li>
                          <li className={
                          !finger_print_sensor ? "icon_deactive" : ""
                        }>
                            <div
                              className={
                                finger_print_sensor
                                  ? "sprite bg-fingerprint trnd_bg"
                                  : "sprite bg-fingerprint light trnd_bg"
                              }
                            ></div>
                          </li>
                          <li className={
                          !fm_radio? "icon_deactive" : ""
                        }>
                            <div
                              className={
                                fm_radio
                                  ? "sprite bg-fm trnd_bg"
                                  : "sprite bg-fm light trnd_bg"
                              }
                            ></div>
                          </li>
                        </ul>
                        <div className="trndbtn_wrp">
                          <a
                            href={specificationFullURL+"/"}
                            className="rd_mr"
                          >
                            रीड मोर
                          </a>
                        </div>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="trnd_ctrls">
            <div className="controls" data-glide-el="controls">
              <div data-glide-dir="<">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.203"
                  height="13.203"
                  viewBox="0 0 13.203 13.203"
                >
                  <path
                    id="Path_95"
                    data-name="Path 95"
                    d="M16.68-8.32V-6.68h-10L11.25-2.07,10.078-.9l-6.6-6.6,6.6-6.6L11.25-12.93,6.68-8.32Z"
                    transform="translate(-3.477 14.102)"
                    fill="#707070"
                  />
                </svg>
              </div>
            </div>
            <div className="glide__bullets" data-glide-el="controls[nav]">
              <button className="glide__bullet" data-glide-dir="=0"></button>
              <button className="glide__bullet" data-glide-dir="=1"></button>
              <button className="glide__bullet" data-glide-dir="=2"></button>
              <button className="glide__bullet" data-glide-dir="=3"></button>
              <button className="glide__bullet" data-glide-dir="=4"></button>
              <button className="glide__bullet" data-glide-dir="=5"></button>
            </div>
            <div className="controls" data-glide-el="controls">
              <div data-glide-dir=">">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.203"
                  height="13.203"
                  viewBox="0 0 13.203 13.203"
                >
                  <path
                    id="Path_96"
                    data-name="Path 96"
                    d="M3.32-8.32V-6.68h10L8.75-2.07,9.922-.9l6.6-6.6-6.6-6.6L8.75-12.93,13.32-8.32Z"
                    transform="translate(-3.32 14.102)"
                    fill="#707070"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>
        {`
    
       .light{
        opacity: 0.5;
       }
       .r_det{
        list-style: none;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        text-align: center;
        font: normal 12px/18px Mukta, sans-serif;
        color: #FF5A00;
        margin-bottom: 14px;
       }

       .icon_deactive{position: relative;}
       .icon_deactive svg, .icon_deactive div{opacity: 0.3;}
       .icon_deactive:before{content: '';width: 1px;background-color: #ff0000;position: absolute;top: -3px;bottom: -2px;transform: rotate(45deg);left:16px}

       
      `}
      </style>
    </div>
  );
};

export default MobileListingV;
