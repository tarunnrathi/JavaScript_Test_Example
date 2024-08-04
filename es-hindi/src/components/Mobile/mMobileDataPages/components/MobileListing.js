import React from "react";
import { setDefaultImage } from "includes/article.util";
import { specificationURL } from "includes/brand.helper";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { imgURL } from "api/Constant";

export default function MobileListing({ data = [], pageAds }) {
  return (
    <>
      {" "}
      {data?.slice(0, 10)?.map((mobileData, key) => {
        const { release_date, title, price } = mobileData || {};
        const { cpu, architecture, ram, chipset } =
          (mobileData?.performance_specs_91?.length &&
            JSON.parse(mobileData?.performance_specs_91)) ||
          {};
        const { screen_size, display_type, pixel_density, refresh_rate } =
          (mobileData?.display_specs_91?.length &&
            JSON.parse(mobileData?.display_specs_91)) ||
          {};

        const { front_camera, rear_camera } =
          (mobileData?.special_specs_91?.length &&
            JSON.parse(mobileData?.special_specs_91)) ||
          {};
        const { flash } =
          (mobileData?.camera_specs_91?.length &&
            JSON.parse(mobileData?.camera_specs_91)) ||
          {};

        const { quick_charging, usb_typec, capacity } =
          (mobileData?.battery_specs_91?.length &&
            JSON.parse(mobileData?.battery_specs_91)) ||
          {};

        const { operating_system } =
          (mobileData?.general_specs_91?.length &&
            JSON.parse(mobileData?.general_specs_91)) ||
          {};
        const { osVersion } =
          (mobileData?.specs?.length &&
            JSON.parse(mobileData?.specs)) ||
          {};

        function numberWithCommas(x) {
          return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        const liveTime = (time) => {
          return time.replace(
            /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
            "$1-$2-$3 $4:$5:$6"
          );
        };
        const newReleaseDate = release_date ? "" + release_date : "";

        const year = newReleaseDate && newReleaseDate.slice(0, 4);
        const month = newReleaseDate && newReleaseDate.slice(5, 7);
        const date = newReleaseDate && newReleaseDate.slice(8, 10);

        const specificationFullURL = title?.includes('(') ?`${specificationURL}/${title?.slice(0, title?.indexOf('('))
        ?.replace(/ /g, "-")
        ?.toLowerCase()}${mobileData?.id}/`:`${specificationURL}/${title
        ?.replace(/ /g, "-")
        ?.toLowerCase()}-${mobileData?.id}/`;
        return (
          <div>
            <div className="phnresultbox">
              <div className="phnresultboxphn dflx jstbtwn algncntr">
                <figure>
                  <img
                    src={imgURL}
                    loading="lazy"
                    onError={setDefaultImage}
                    width={"38px"}
                    height={"80px"}
                  ></img>
                </figure>
                <div className="phnresultboxphntxt">
                  <h2>{title}</h2>
                  <div className="dflx tpbtmmrgn">
                    <div className="phnprc">₹ {numberWithCommas(price)}</div>
                    <div className="andrd">
                      {operating_system==='Android' || mobileData?.operating_system ==='Android' ? (
                        <>
                          <em className="dimsprite andrdicn"></em>
                          {operating_system || (mobileData?.operating_system?`${mobileData?.operating_system} v${osVersion}`:"") }
                        </>
                      ) : (
                        ""
                      )}

            { operating_system === 'iOS' || mobileData?.operating_system === 'iOS' ? <><svg id="Capa_1" width='12' version="1.1" viewBox="0 0 90 90" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><g><path d="M49.6,6.8C52.9,3,58.3,0.2,62.8,0c0.6,5.3-1.5,10.6-4.7,14.4c-3.1,3.8-8.3,6.8-13.3,6.4     C44.2,15.6,46.7,10.2,49.6,6.8z M75.3,78.8c-3.7,5.5-7.6,10.9-13.7,11.1c-6,0.1-7.9-3.6-14.8-3.6c-6.9,0-9,3.5-14.7,3.7     c-5.9,0.2-10.4-5.9-14.2-11.4C10.2,67.4,4.3,47,12.3,33.3c3.9-6.8,10.9-11.2,18.5-11.3c5.8-0.1,11.3,3.9,14.8,3.9     c3.5,0,10.2-4.8,17.2-4.1c2.9,0.1,11.1,1.2,16.4,8.9c-0.4,0.3-9.8,5.7-9.7,17.1C69.6,61.4,81.4,66,81.5,66     C81.4,66.3,79.6,72.5,75.3,78.8z" id="Apple"/></g></g></svg>{operating_system || (mobileData?.operating_system?`${mobileData?.operating_system} v${osVersion}`:"") } </> :"" }

                    </div>
                  </div>
                  <div className="phnrlsdt">
                    <span>
                      जारी करने की तारीख :{" "}
                      {newReleaseDate ? date + "-" + month + "-" + year : "NA"}
                    </span>
                  </div>
                </div>
              </div>

              <ul className="phnfourbx dflx flxwrp">
                <li>
                  <div className="icnhd">
                    <span>
                      <em className="dimsprite icnfst"></em>
                    </span>
                    परफॉरमेंस
                  </div>
                  <div className="phninsd">
                    <span>{cpu || "NA"}</span>
                    <span>{chipset || "NA"}</span>
                    <span>{ram} रैम</span>
                  </div>
                </li>
                <li>
                  <div className="icnhd">
                    <span>
                      <em className="dimsprite icnscnd"></em>
                    </span>
                    डिस्प्ले
                  </div>
                  <div className="phninsd">
                    <span>{screen_size || "NA"}</span>
                    <span>
                      {" "}
                      {pixel_density} , {display_type}{" "}
                    </span>
                    <span>{refresh_rate || "90 Hz"} Refresh Rate</span>
                  </div>
                </li>
                <li>
                  <div className="icnhd">
                    <span>
                      <em className="dimsprite icnthrd"></em>
                    </span>
                    कैमरा
                  </div>
                  <div className="phninsd">
                    <span>{rear_camera || "NA"}</span>
                    <span>{flash || "NA"}</span>
                    <span>{front_camera} फ्रंट कैमरा</span>
                  </div>
                </li>
                <li>
                  <div className="icnhd">
                    <span>
                      <em className="dimsprite icnfrth"></em>
                    </span>
                    बैटरी
                  </div>
                  <div className="phninsd">
                    <span>{capacity || "NA"}</span>
                    <span>
                      {" "}
                      {quick_charging?.includes("Yes")
                        ? "फ़ास्ट चार्जिंग"
                        : "NA"}{" "}
                    </span>
                    <span>{usb_typec ? "यूएसबी टाइप-C Port" : " NA"}</span>
                  </div>
                </li>
              </ul>

              <div className="flspcfnbtn">
              <a
                href={specificationFullURL+"/"}
                className=""
              >
                और जाने
              </a>
        </div>

            </div>
            {key === 0 && pageAds?.header_ATF_320 ? (
              <div className="add_secton">
                <div className="ad-container">
                  <div className="addinner-box">
                    <SiteAd
                       width={336}
                       height={280}
                      slotId="mobileAdNew300x250_0"
                      adUnit={pageAds?.header_ATF_320}
                      sizes={[
                        [300, 250],
                        [336, 280],
                      ]}
                      removeAdSpan={true}
                    ></SiteAd>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
