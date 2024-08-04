import React, { useState } from "react";
import { scrollIntoViewIfNeeded, scrollToTarget } from "includes/article.util";

export default function SpecificationComponent({ title = '', data ={} }) {

  const [activeEle, setActiveEle] = useState('keyspeswrap');

  const { ram_display, internal_storage_display, price, release_date } =
    data || {};
  const { cpu, architecture, ram, chipset, fabrication, graphics, ram_type } =
    (data?.performance_specs_91 && JSON.parse(data?.performance_specs_91)) ||
    {};

  // let { screen_size, display_type, pixel_density, refresh_rate } = JSON.parse(
  //   data?.display_specs_91
  // );
  const { front_camera, rear_camera } =
    (data?.special_specs_91?.length && JSON.parse(data?.special_specs_91)) ||
    {};
  const {
    flash,
    camera_features,
    video_recording,
    shooting_modes,
    autofocus,
    sensor,
    image_resolution,
  } =
    (data?.camera_specs_91?.length && JSON.parse(data?.camera_specs_91)) ||
    {};
  const { quick_charging, usb_typec, capacity, removable, type } =
    (data?.battery_specs_91?.length && JSON.parse(data?.battery_specs_91)) ||
    {};

  const { operating_system, launch_date, custom_ui } =
    (data?.general_specs_91?.length && JSON.parse(data.general_specs_91)) ||
    {};
  const { thickness, width, weight, height, colours } =
    (data?.design_specs_91?.length && JSON.parse(data.design_specs_91)) ||
    {};
  const { wifi, wifi_features, bluetooth } =
    (data?.network_connectivity_specs_91?.length &&
      JSON.parse(data.network_connectivity_specs_91)) ||
    {};
  const { fm_radio, audio_jack } =
    (data?.multimedia_specs_91?.length &&
      JSON.parse(data.multimedia_specs_91)) ||
    {};
  const {
    fingerprint_sensor_type,
    heart_rate_monitor,
    other_sensors,
    fingerprint_sensor,
  } =
    (data?.sensors_specs_91?.length && JSON.parse(data.sensors_specs_91)) ||
    {};

  const {
    display_type,
    aspect_ratio,
    bezelless_display,
    pixel_density,
    screen_to_body_ratio_calculated,
    screen_protection,
    screen_size,
    refresh_rate,
    touch_screen,
    resolution,
    brightness,
  } =
    (data?.display_specs_91?.length && JSON.parse(data?.display_specs_91)) ||
    {};

  const scroll = (e, id) => {
    setActiveEle(id);
    e.preventDefault();
    scrollIntoViewIfNeeded(id);
  };
  return (
    <div>
      {/* <!-- sepcification start  --> */}
      <div className="spcspcfcn" id="spcspcfcn">
        <h2 className="phnglblhd">
          {title} <span>स्पेसिफिकेशन्स</span>
        </h2>

        {/* <!-- tab start --> */}
        <ul className="dflx spcspcfcntab">
          <li className={activeEle === 'keyspeswrap'?'active':""}>
            <a onClick={(e) => scroll(e, "keyspeswrap")} href="#keyspeswrap">
              प्रमुख विशेषताएं
            </a>
          </li>
          <li className={activeEle === 'gnrlwrap'?'active':""} >
            <a onClick={(e) => scroll(e, "gnrlwrap")} href="#gnrlwrap">
              जनरल
            </a>
          </li>
          <li className={activeEle === 'prfrmncwrap'?'active':""}>
            <a onClick={(e) => scroll(e, "prfrmncwrap")} href="#prfrmncwrap">
              परफॉरमेंस
            </a>
          </li>
          <li className={activeEle === 'dsplwrap'?'active':""}>
            <a onClick={(e) => scroll(e, "dsplwrap")} href="#dsplwrap">
              डिस्प्ले
            </a>
          </li>
          <li className={activeEle === 'dsgnwrap'?'active':""}>
            <a onClick={(e) => scroll(e, "dsgnwrap")} href="#dsgnwrap">
              डिज़ाइन
            </a>
          </li>
          <li className={activeEle === 'dsplcamera'?'active':""}>
            <a onClick={(e) => scroll(e, "dsplcamera")} href="#dsplcamera">
              कैमरा
            </a>
          </li>
          <li className={activeEle === 'dsplbattery'?'active':""}>
            <a onClick={(e) => scroll(e, "dsplbattery")} href="#dsplbattery">
              बैटरी
            </a>
          </li>
          <li className={activeEle === 'dsplnetwork'?'active':""}>
            <a onClick={(e) => scroll(e, "dsplnetwork")} href="#dsplnetwork">
              नेटवर्क & कनेक्टिविटी
            </a>
          </li>
          <li className={activeEle === 'dsplmultimedia'?'active':""}>
            <a
              onClick={(e) => scroll(e, "dsplmultimedia")}
              href="#dsplmultimedia"
            >
              मल्टीमीडिया
            </a>
          </li>
          <li className={activeEle === 'dsplsenosr'?'active':""}>
            <a onClick={(e) => scroll(e, "dsplsenosr")} href="#dsplsenosr">
              सेंसर
            </a>
          </li>
        </ul>
        {/* <!-- tab end --> */}

        {/* <!-- key specs start --> */}
        <div className="spcfcnbx keyspeswrap" id="keyspeswrap">
          <h3>प्रमुख विशेषताएं</h3>
          <ul>
            <li>
              <span>रैम</span>
              <span>{ram || "NA"}</span>
            </li>
            <li>
              <span>प्रोसेसर</span>
              <span>{chipset}</span>
            </li>
            <li>
              <span>रियर कैमरा</span>
              <span>{rear_camera || "NA"}</span>
            </li>
            <li>
              <span>फ्रंट कैमरा</span>
              <span>{front_camera || "NA"}</span>
            </li>
            <li>
              <span>बैटरी</span>
              <span>{capacity || "NA"}</span>
            </li>
            <li>
              <span>डिस्प्ले</span>
              <span>6.5 inches</span>
            </li>
          </ul>
        </div>
        {/* <!-- key specs end --> */}

        {/* <!-- GENERAL start --> */}
        <div className="spcfcnbx gnrlwrap" id="gnrlwrap">
          <h3>जनरल</h3>
          <ul>
            <li>
              <span>लॉन्च की तारीख</span>
              <span>{launch_date} (Official)</span>
            </li>
            <li>
              <span>ऑपरेटिंग सिस्टम</span>
              <span>{operating_system}</span>
            </li>
            <li>
              <span>कस्टम UI</span>
              <span>{custom_ui || "NA"}</span>
            </li>
          </ul>
        </div>
        {/* <!-- GENERAL end --> */}

        {/* <!-- PERFORMANCE start --> */}
        <div className="spcfcnbx prfrmncwrap" id="prfrmncwrap">
          <h3>परफॉरमेंस</h3>
          <ul>
            <li>
              <span>चिपसेट</span>
              <span>{chipset || "NA"}</span>
            </li>
            <li>
              <span>CPU</span>
              <span>{cpu || "NA"}</span>
            </li>
            <li>
              <span>आर्किटेक्चर</span>
              <span>{architecture || "NA"}</span>
            </li>
            <li>
              <span>फेब्रिकेशन</span>
              <span>{fabrication || "NA"}</span>
            </li>
            <li>
              <span>ग्राफ़िक्स</span>
              <span>{graphics || "NA"} </span>
            </li>
            <li>
              <span>रैम</span>
              <span>{ram || "NA"}</span>
            </li>
            <li>
              <span>रैम टाइप</span>
              <span>{ram_type || "NA"}</span>
            </li>
          </ul>
        </div>
        {/* <!-- PERFORMANCE end --> */}

        {/* <!-- PERFORMANCE start --> */}
        <div className="spcfcnbx dsplwrap" id="dsplwrap">
          <h3>डिस्प्ले</h3>
          <ul>
            <li>
              <span>डिस्प्ले टाइप</span>
              <span>{display_type || "NA"}</span>
            </li>
            <li>
              <span>स्क्रीन साइज़</span>
              <span> {screen_size || "NA"}</span>
            </li>
            <li>
              <span>रेजोलूशन</span>
              <span>{resolution || "NA"}</span>
            </li>
            <li>
              <span>आस्पेक्ट रेश्यो</span>
              <span> {aspect_ratio || "NA"}</span>
            </li>
            <li>
              <span>पिक्सल्स डेंसिटी</span>
              <span>{pixel_density || "NA"}</span>
            </li>
            <li>
              <span>स्क्रीन to Body</span>
              <span>{screen_size || "NA"}</span>
            </li>
            <li>
              <span>रेश्यो</span>
              <span>{screen_to_body_ratio_calculated || "NA"}</span>
            </li>
            <li>
              <span>स्क्रीन प्रोटेक्शन</span>
              <span>{screen_protection || "NA"}</span>
            </li>
            {/* <li>
              <span>Bezel-less display</span>
              <span>{bezelless_display || "NA"}</span>
            </li> */}
            <li>
              <span>टच स्क्रीन</span>
              <span>{touch_screen || "NA"}</span>
            </li>
            <li>
              <span>ब्राइटनेस</span>
              <span>{brightness || "NA"}</span>
            </li>
            <li>
              <span>रिफ्रेश रेट</span>
              <span>{refresh_rate || "NA"}</span>
            </li>
          </ul>
        </div>
        {/* <!-- PERFORMANCE end --> */}

        {/* <!-- Design start --> */}
        <div className="spcfcnbx dsgnwrap" id="dsgnwrap">
          <h3>डिज़ाइन</h3>
          <ul>
            <li>
              <span>मोटाई</span>
              <span>{thickness || "NA"}</span>
            </li>
            <li>
              <span>चौड़ाई</span>
              <span>{width || "NA"}</span>
            </li>
            <li>
              <span>वज़न</span>
              <span>{weight || "NA"}</span>
            </li>
            <li>
              <span>हाइट</span>
              <span>{height || "NA"}</span>
            </li>
            <li>
              <span>कलर</span>
              <span>{colours || "NA"}</span>
            </li>
          </ul>
        </div>
        {/* Camera started */}
        <div className="spcfcnbx dsplcamera" id="dsplcamera">
          <h3>कैमरा</h3>
          <ul>
            <li>
              <span>कैमरा फीचर्स</span>
              <span>{camera_features || "NA"}</span>
            </li>
            <li>
              <span>इमेज रेजोलूशन</span>
              <span>{image_resolution || "NA"}</span>
            </li>
            <li>
              <span>सेंसर</span>
              <span>{sensor || "NA"}</span>
            </li>
            <li>
              <span>ऑटो फोकस</span>
              <span>{autofocus || "NA"}</span>
            </li>
            <li>
              <span>फ्लैश</span>
              <span>{flash || "NA"}</span>
            </li>
            <li>
              <span>वीडियो रिकॉडिंग</span>
              <span>{video_recording || "NA"}</span>
            </li>
            <li>
              <span>शूटिंग मोड्स</span>
              <span>{shooting_modes || "NA"}</span>
            </li>
          </ul>
        </div>
        {/* Battery started */}
        <div className="spcfcnbx dsplbattery" id="dsplbattery">
          <h3>बैटरी</h3>
          <ul>
            <li>
              <span>फास्ट चार्जिंग</span>
              <span>{quick_charging || "NA"}</span>
            </li>
            <li>
              <span>रिमूवेबल</span>
              <span>{removable || "NA"}</span>
            </li>
            <li>
              <span>यूएसबी टाइप c</span>
              <span>{usb_typec || "NA"}</span>
            </li>
            <li>
              <span>टाइप</span>
              <span>{type || "NA"}</span>
            </li>
            <li>
              <span>कैपेसिटी</span>
              <span>{capacity || "NA"}</span>
            </li>
          </ul>
        </div>
        {/* Network Started  */}
        <div className="spcfcnbx dsplnetwork" id="dsplnetwork">
          <h3>नेटवर्क & कनेक्टिविटी</h3>
          <ul>
            <li>
              <span>वाईफाई</span>
              <span>{wifi || "NA"}</span>
            </li>
            <li>
              <span>वाईफाई फीचर्स</span>
              <span>{wifi_features || "NA"}</span>
            </li>
            <li>
              <span>ब्लूटूथ</span>
              <span>{bluetooth || "NA"}</span>
            </li>
          </ul>
        </div>
        {/* Multimedia Started */}
        <div className="spcfcnbx dsplmultimedia" id="dsplmultimedia">
          <h3>मल्टीमीडिया</h3>
          <ul>
            <li>
              <span>Fm रेडियो</span>
              <span>{fm_radio || "NA"}</span>
            </li>
            <li>
              <span>ऑडियो जैक</span>
              <span>{audio_jack || "NA"}</span>
            </li>
          </ul>
        </div>
        <div className="spcfcnbx dsplsenosr" id="dsplsenosr">
          <h3>सेंसर</h3>
          <ul>
            <li>
              <span>फिंगरप्रिंट सेंसर टाइप</span>
              <span>{fingerprint_sensor_type || "NA"}</span>
            </li>
            <li>
              <span>हार्ट रेट मॉनिटर</span>
              <span>{heart_rate_monitor || "NA"}</span>
            </li>
            <li>
              <span>अन्‍य सेंसर</span>
              <span>{other_sensors || "NA"}</span>
            </li>
            <li>
              <span>फिंगरप्रिंट सेंसर</span>
              <span>{fingerprint_sensor || "NA"}</span>
            </li>
          </ul>
        </div>
      </div>
      <style jsx global>{`
        .spcspcfcntab {
          background: #f6f7f7;
          box-shadow: 0px 2px 4px #00000029;
          border: 1px solid #f7f7f7;
          padding: 8px 0;
          overflow: scroll;
          margin: 0 -15px;
          position: sticky;
          top: 38px;
        }
        .spcspcfcntab li {
          flex-shrink: 0;
          margin-left: 15px;
          font-size: 13px;
        }
        .spcspcfcntab li a {
          height: 25px;
          line-height: 25px;
          color: #525252;
          padding: 0 10px;
          display: block;
        }
        .spcspcfcntab li.active {
          position: sticky;
          right: 0;
          left: 0;
          font-weight: bold;
          z-index:1;
        }
        .spcspcfcntab li.active a {
          background: #ed1c24;
          border-radius: 6px;
          color: #fff;
        }

        .spcspcfcn {
          margin: 0 15px 30px 15px;
          position: relative;
        }
        .spcspcfcn .phnglblhd {
          margin-bottom: 0;
        }
        .spcfcnbx {
          margin: 20px 0;
        }
        .spcfcnbx h2,
        .spcfcnbx h3 {
          padding-bottom:3px;
          display: inline-block;
          margin-bottom: 2px;
          letter-spacing: -0.56px;
          color: #ff5a00;
          text-transform: uppercase;
          font-size: 15px;
          font-weight: bold;
          line-height: 14px;
          // border-bottom: 2px solid #ff5a00;
        }
        .spcfcnbx ul {
          background: #f6f7f7 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #d8d8d8;
        }
        .spcfcnbx ul li {
          font-size: 13px;
          color: #212121;
          display: flex;
        }
        .spcfcnbx ul li span {
          padding: 4px 8px;
          display: inline-block;
          line-height: 28px;
        }
        .spcfcnbx ul li span:first-child {
          width: 135px;
          text-align: right;
          background: #fff;
          font-weight: bold;
          margin-right: 8px;
          flex-shrink: 0;
        }
        .spcfcnbx ul li:first-child span {
          padding-top: 16px;
        }
        .spcfcnbx ul li:last-child span {
          padding-bottom: 16px;
        }
      `}</style>
    </div>
  );
}
