import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { setDefaultImage } from "includes/article.util";
import { imgURL } from "api/Constant";

export default function KeySpecs({ data = {} }) {

  let glide = '';

  const {
    ram_display,
    internal_storage_display,
    price,
    release_date,
    volte,
    splashproof,
    gorilla_glass3,
    finger_print_sensor,
    no_of_sim_cards,
    fm_radio,
    sim_size,
    mobile_images_91
  } = data || {};

  useEffect(() => {
    setTimeout(() => {

      const elm = document?.querySelector(`.phnlgsld`);
      if (mobile_images_91?.length && elm) {
        glide = new Glide(".phnlgsld", {
          autoplay: 4000,
          type: "slider",
          perView: 1,
      focusAt: "center",

          // gap:50,
          slidesToScroll: 1,
        })?.mount();

        glide.on(['mount.after', 'run'], function () {
          document.getElementById('current').innerHTML = `0${glide.index+1}/`;
        });
      }

    }, 2000);
  }, []);
  function numberWithCommas(x) {
    return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const { expandableStorageUpto, simType, osVersion } =
    (data?.specs?.length && JSON.parse(data?.specs)) || {};

  const fourG = (data?.specs?.length && JSON.parse(data?.specs)["4g"]) || {};

  const { operating_system } =
    (data.general_specs_91?.length && JSON.parse(data.general_specs_91)) ||
    {};
  const { cpu, architecture, ram, chipset } =
    (data?.performance_specs_91?.length &&
      JSON.parse(data?.performance_specs_91)) ||
    {};

  const { screen_size, display_type, pixel_density, refresh_rate } =
    (data?.display_specs_91?.length && JSON.parse(data?.display_specs_91)) ||
    {};

  const { front_camera, rear_camera } =
    (data?.special_specs_91?.length && JSON.parse(data?.special_specs_91)) ||
    {};

  const { flash } =
    (data?.camera_specs_91?.length && JSON.parse(data?.camera_specs_91)) ||
    {};

  const { quick_charging, usb_typec, capacity } =
    (data?.battery_specs_91?.length && JSON.parse(data?.battery_specs_91)) ||
    {};

  const { expandable_memory, internal_memory } =
    (data?.storage_specs_91?.length && JSON.parse(data?.storage_specs_91)) ||
    {};

  const newReleaseDate = release_date ? "" + release_date : "";
  const year = newReleaseDate && newReleaseDate.slice(0, 4);
  const month = newReleaseDate && newReleaseDate.slice(5, 7);
  const day = newReleaseDate && newReleaseDate.slice(8, 10);

  return (
    <div>
      <div className="spcovrw" id="spcovrw">
        <div className="spcky dflx jstbtwn algncntr">
          <h2>प्रमुख विशेषताएं</h2>
        </div>
        <div className="andrd">
           { operating_system ==='Android' || data?.operating_system ==='Android' ? <em className="dimsprite andrdicn"></em> :"" }
           { operating_system === 'iOS' || data?.operating_system === 'iOS' ? <svg id="Capa_1" width='12' version="1.1" viewBox="0 0 90 90" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><g><path d="M49.6,6.8C52.9,3,58.3,0.2,62.8,0c0.6,5.3-1.5,10.6-4.7,14.4c-3.1,3.8-8.3,6.8-13.3,6.4     C44.2,15.6,46.7,10.2,49.6,6.8z M75.3,78.8c-3.7,5.5-7.6,10.9-13.7,11.1c-6,0.1-7.9-3.6-14.8-3.6c-6.9,0-9,3.5-14.7,3.7     c-5.9,0.2-10.4-5.9-14.2-11.4C10.2,67.4,4.3,47,12.3,33.3c3.9-6.8,10.9-11.2,18.5-11.3c5.8-0.1,11.3,3.9,14.8,3.9     c3.5,0,10.2-4.8,17.2-4.1c2.9,0.1,11.1,1.2,16.4,8.9c-0.4,0.3-9.8,5.7-9.7,17.1C69.6,61.4,81.4,66,81.5,66     C81.4,66.3,79.6,72.5,75.3,78.8z" id="Apple"/></g></g></svg> :"" }

          {operating_system || (`${data?.operating_system} v${osVersion}`) }
        </div>

        {mobile_images_91?.length? <div className="phnlgsld">
          <div data-glide-el="track">
            <ul>
              <li>
                <img
                  src={imgURL }
                  alt=""
                  loading="lazy"
                  onError={setDefaultImage}
                  // width={'200px'}
                  height={'300px'}
                  className='overviewImage'
                />
              </li>
              {mobile_images_91?.length && mobile_images_91.map((image, key) => {
                   return <li className="glide__slide">
                   <img
                     src={
                      imgURL || imgURL
                     }
                     alt=""
                     // max-width="170px"
                     height="400"
                     onError={setDefaultImage}
                     loading="lazy"
                     className='overviewImage'

                   />
                 </li>;
                })}
            </ul>
          </div>
          <div className="phnlgar" data-glide-el="controls">
            <button data-glide-dir="<"></button>
            <button data-glide-dir=">"></button>
          </div>
          <div data-glide-el="controls[nav]" className="phnlgblts dflx jstcntr">
            <button data-glide-dir="=0"></button>
            {mobile_images_91?.length && mobile_images_91.map ((image, key) => {
                return <button className="glide__bullet" data-glide-dir={`=${key+1}`}></button>;
              }) }
          </div>
          <div className="sl_count">
              <div id='current' className="current">01/</div>
              <div>{`0${1 + (mobile_images_91?.length || 0) }`}</div>
            </div>
        </div> :
            <ul>
              <li>
                <img
                  src={imgURL }
                  alt=""
                  loading="lazy"
                  onError={setDefaultImage}
                  // width={'200px'}
                  height={'300px'}
                  className='overviewImage'
                />
              </li></ul>}

        <div className="phnprc">₹ {numberWithCommas(price)}</div>
        <div className="phnrlsdt">
          जारी करने की तारीख: <span>{day + "-" + month + "-" + year}</span>
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
              <span>{refresh_rate || "90 Hz"} रिफ्रेश रेट</span>
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
              <span>{rear_camera || "NA"} </span>
              <span>{flash} फ्लैश</span>
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
                {quick_charging?.includes("Yes") ? "फ़ास्ट चार्जिंग" : "NA"}
              </span>
              <span>{usb_typec ? "यूएसबी टाइप-C Port" : "NA"}</span>
            </div>
          </li>
        </ul>
        <ul className="phnflspcfn">
          <li className={!internal_memory ? "icon_deactive_overview" : ""}>
            <span>
              <em className={internal_memory?"dimsprite icnram":"dimsprite icnram light"}></em>
            </span>
            {internal_memory ? `${internal_memory} इंटरनल मेमोरी` : "NA"}
            {expandableStorageUpto
              ? ` + ${expandableStorageUpto} एक्सपैंडेबल`
              : ""}
          </li>
          <li className={!volte ? "icon_deactive_overview" : ""}>
            <span>
              <em
                className={volte ? "dimsprite icnvolt" : "dimsprite light icnvolt "}
              ></em>
            </span>
            VoLTE
          </li>
          <li className={!splashproof ? "icon_deactive_overview" : ""}>
            <span>
              <em
                className={
                  splashproof
                    ? "dimsprite icnsplsh"
                    : "dimsprite icnsplsh light"
                }
              ></em>
            </span>
            स्प्लैश प्रूफ
          </li>
          <li className={!fourG ? "icon_deactive_overview" : ""}>
            <span>
              <em
                className={
                  fourG ? "dimsprite icnsprbrnd" : "dimsprite icnsprbrnd light"
                }
              ></em>
            </span>
            4G सपोर्टेड
          </li>
          <li className={no_of_sim_cards !== 2 ? "icon_deactive_overview" : ""}>
            <span>
              <em
                className={
                  no_of_sim_cards === 2
                    ? "dimsprite icnsim"
                    : "dimsprite icnsim light"
                }
              ></em>
            </span>
            डुअल सिम {simType ? `: ${simType}` : ""}
          </li>
          <li className={!finger_print_sensor ? "icon_deactive_overview" : ""}>
            <span>
              <em
                className={
                  finger_print_sensor
                    ? "dimsprite icnfngrprt"
                    : "dimsprite icnfngrprt light"
                }
              ></em>
            </span>
            फिंगरप्रिंट सेंसर
          </li>
          <li className={!fm_radio ? "icon_deactive_overview" : ""}>
            <span>
              <em
                className={
                  fm_radio ? "dimsprite icnfmrd" : "dimsprite icnfmrd light"
                }
              ></em>
            </span>
            FM रेडियो
          </li>
          <li className={!gorilla_glass3 ? "icon_deactive_overview" : ""}>
            <span>
              <em
                className={
                  gorilla_glass3
                    ? "dimsprite icngrlgls"
                    : "dimsprite icngrlgls light"
                }
              ></em>
            </span>
            गोरिल्ला ग्लास 3
          </li>
        </ul>
        <div className="flspcfnbtn">
          <a href={`#spcspcfcn`}>सभी स्‍पेसिफिकेशंस</a>
        </div>
      </div>

      <style>{`
        .light{
          opacity: 0.5;
         }

         .icon_deactive_overview{position: relative;}
       .icon_deactive_overview svg, .icon_deactive_overview div{opacity: 0.3;}
       .icon_deactive_overview:before{content: '';width: 1px;background-color: #ff0000;position: absolute;top: 4px;bottom: 3px;transform: rotate(45deg);left:10px}

       
       .overviewImage{
        //  object-fit:contain;
        max-width: 142px !important;
        display: block;
        height: auto;
        max-height: 400px;
        margin: auto;
        
       }

       .sl_count {
        display: flex;
        justify-content: center;
        align-items: center;
        font: normal normal normal 12px/1 "Fira Sans";
        color: #9f9f9f;
        margin-bottom : 5px;
      }
       .sl_count .current {
        font-size: 14px;
        color: #000;
        font-weight: bold;
      }
       
       `}</style>
    </div>
  );
}
