import React, { useEffect, useState } from "react";
import { scrollIntoViewIfNeeded } from "includes/article.util";
import Glide from "@glidejs/glide";
import { getMobile } from "api/global/Common";
import { imgURL } from "api/Constant";


const FullView = ({ data: mbData }) => {

  const [data, setData] = useState({});
  const [mobileId] = mbData.split(",");

  const [activeEle, setActiveEle] = useState(`keySpec${ mobileId }`);

  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };
  const callApi = async () => {
    const id = mobileId;
    const data = await getMobile({id: id}, true)
    setData(data);
  };

  let glide = '';
  useEffect(() => {
    callApi();

   setTimeout(() => {

    glide = new Glide(`.${mobileId}`, {
      autoplay: 4000,
      type: 'slider',
      // focusAt: 'center',
      perView: 1,
      gap: 0,
      slidesToScroll: 1,
      }).mount();

      glide.on(['mount.after', 'run'], function () {
        document.getElementById('current').innerHTML = `0${glide.index+1}/`;
      });
   }, 3000);

  }, []);

  function numberWithCommas(x) {
    return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const {
    // ram_display,
    // internal_storage_display,
    price,
    release_date,
    title,
    mobile_images_91
  } = data || {};

  const { cpu, architecture, ram, chipset, fabrication, graphics, ram_type } =
    (data?.performance_specs_91?.length &&
      JSON.parse(data?.performance_specs_91[0])) ||
    {};

  // let { screen_size, display_type, pixel_density, refresh_rate } = JSON.parse(
  //   data?.display_specs_91[0]
  // );
  const { front_camera, rear_camera } =
    (data?.special_specs_91?.length && JSON.parse(data?.special_specs_91[0])) ||
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
    (data?.camera_specs_91?.length && JSON.parse(data?.camera_specs_91[0])) ||
    {};
  const { quick_charging, usb_typec, capacity, removable, type } =
    (data?.battery_specs_91?.length && JSON.parse(data?.battery_specs_91[0])) ||
    {};

  const { operating_system, launch_date, custom_ui } =
    (data?.general_specs_91?.length && JSON.parse(data?.general_specs_91[0])) ||
    {};

  const { thickness, width, weight, height, colours } =
    (data?.design_specs_91?.length && JSON.parse(data?.design_specs_91[0])) ||
    {};

  const { wifi, wifi_features, bluetooth } =
    (data?.network_connectivity_specs_91?.length &&
      JSON.parse(data?.network_connectivity_specs_91[0])) ||
    {};

  const { fm_radio, audio_jack } =
    (data?.multimedia_specs_91?.length &&
      JSON.parse(data?.multimedia_specs_91[0])) ||
    {};
  const {
    fingerprint_sensor_type,
    heart_rate_monitor,
    other_sensors,
    fingerprint_sensor,
  } =
    (data?.sensors_specs_91?.length && JSON.parse(data?.sensors_specs_91[0])) ||
    {};

  const {
    display_type,
    aspect_ratio,
    // bezelless_display,
    pixel_density,
    screen_to_body_ratio_calculated,
    screen_protection,
    screen_size,
    refresh_rate,
    touch_screen,
    resolution,
    brightness,
  } =
    (data?.display_specs_91?.length && JSON.parse(data?.display_specs_91[0])) ||
    {};

  const scroll = (e, id) => {
    setActiveEle(id);
    e.preventDefault();
    scrollIntoViewIfNeeded(id);
  };
  const newReleaseDate = release_date && "" + release_date;
  const year = newReleaseDate && newReleaseDate.slice(0, 4);
  const month = newReleaseDate && newReleaseDate.slice(5, 7);
  const date = newReleaseDate && newReleaseDate.slice(8, 10);

  return (
    <div>
      <div className="spcmbl-forartcl">
        <div className="spcspcfcn" id="spcspcfcn">
          <h2 className="phnglblhd">
            {title} <span>SPECIFICATIONS</span>
          </h2>

          <div className="spcspcfcntab">
            <a onClick={(e) => scroll(e, `keySpec${ mobileId }`)} href="#keySpec" className={activeEle === `keySpec${ mobileId }`?'active':""}>
              प्रमुख विशेषताएं
            </a>
            <a
              onClick={(e) => scroll(e, `generalNew${ mobileId }`)}
              href="#general"
              data-name="#general"
              className={activeEle === `generalNew${ mobileId }`?'active':""}
            >
              जनरल
            </a>
            <a
              onClick={(e) => scroll(e, `performanceNew${ mobileId }`)}
              href="#performance"
              data-name="#pf"
              className={activeEle === `performanceNew${ mobileId }`?'active':""}
            >
              परफॉरमेंस
            </a>
            <a
              onClick={(e) => scroll(e, `displayNew${ mobileId }`)}
              href="#display"
              data-name="#display"
              className={activeEle === `displayNew${ mobileId }`?'active':""}
            >
              डिस्प्ले
            </a>
            <a
              onClick={(e) => scroll(e, `designNew${ mobileId }`)}
              // href="#design"
              data-name="#design"
              className={activeEle === `designNew${ mobileId }`?'active':""}
            >
              डिज़ाइन
            </a>
            <a
              onClick={(e) => scroll(e, `cameraNew${ mobileId }`)}
              href="#camera"
              data-name=""
              className={activeEle === `cameraNew${ mobileId }`?'active':""}
            >
              कैमरा
            </a>
            <a
              onClick={(e) => scroll(e, `batteryNew${ mobileId }`)}
              href="#battery"
              data-name=""
              className={activeEle === `batteryNew${ mobileId }`?'active':""}
            >
              बैटरी
            </a>
            <a
              onClick={(e) => scroll(e, `networkNew${ mobileId }`)}
              href="#network"
              data-name=""
              className={activeEle === `networkNew${ mobileId }`?'active':""}
            >
              नेटवर्क & कनेक्टिविटी
            </a>
            <a
              onClick={(e) => scroll(e, `multimediaNew${ mobileId }`)}
              href="#multimedia"
              data-name=""
              className={activeEle === `multimediaNew${ mobileId }`?'active':""}
            >
              मल्टीमीडिया
            </a>
            <a
              onClick={(e) => scroll(e, `sensorsNew${ mobileId }`)}
              href="#sensors"
              data-name=""
              className={activeEle === `sensorsNew${ mobileId }`?'active':""}
            >
              सेंसर
            </a>
          </div>

          <div className="spcfcnbx keyspeswrap" id="keyspeswrap">
            <div className={`${mobileId} phnlgsld ${mobile_images_91?.length?'':'noarrownodt'}`} id={mobileId}>
              <div data-glide-el="track">
                <ul>
                  <li>
                    <img className='fvimage' src={imgURL} alt="" />
                  </li>
                  {mobile_images_91?.length && mobile_images_91.map((mob) => {
                   return <li className="glide__slide">
                   <img className='fvimage' src={mob} alt="" height="360px" />
                 </li>;
                })}
                </ul>
              </div>
              <div className="phnlgar" data-glide-el="controls">
                <button data-glide-dir="<"></button>
                <button data-glide-dir=">"></button>
              </div>
              <div data-glide-el="controls[nav]" className="phnlgblts">
                <button data-glide-dir="=0"></button>
                {mobile_images_91?.length && mobile_images_91.map((mob, key) => {
                return <button className="glide__bullet" data-glide-dir={`=${key+1}`}></button>;
              }) }
              </div>

              <div className="sl_count">
              <div id='current' className="current">01/</div>
              <div>{`0${1 + (mobile_images_91?.length || 0) }`}</div>
            </div>
            </div>

            <div className="phnprc">₹ {numberWithCommas(price)}</div>
            <div className="phnrlsdt">
              जारी करने की तारीख:{" "}
              {newReleaseDate ? (
                <span>{date + "-" + month + "-" + year}</span>
              ) : (
                "NA"
              )}
            </div>

            <div
              className="spcfcnwrap"
              style={{
                height: isActive ? "" : "280px",
                overflow: isActive ? "" : "hidden",
              }}
            >
              <div id="keySpec">
                <h3>रमुख विशेषताएं</h3>
                <div className="spcfcnbx-in">
                  <div>
                    <span>रैम</span>
                    <span>{ram || "NA"}</span>
                  </div>
                  <div>
                    <span>प्रोसेसर</span>
                    <span>{chipset}</span>
                  </div>
                  <div>
                    <span>रियर कैमरा</span>
                    <span>{rear_camera || "NA"}</span>
                  </div>
                  <div>
                    <span>फ्रंट कैमरा</span>
                    <span>{front_camera || "NA"}</span>
                  </div>
                  <div>
                    <span>बैटरी</span>
                    <span>{capacity || "NA"}</span>
                  </div>
                  <div>
                    <span>डिस्प्ले</span>
                    <span>6.5 inches</span>
                  </div>
                </div>
              </div>

              <div className="spcfcnbx gnrlwrap" id={`generalNew${ mobileId }`}>
                <h3>जनरल</h3>
                <div className="spcfcnbx-in">
                  <div>
                    <span>लॉन्च की तारीख</span>
                    <span>{launch_date} (Official)</span>
                  </div>
                  <div>
                    <span>ऑपरेटिंग सिस्टम</span>
                    <span>{operating_system}</span>
                  </div>
                  <div>
                    <span>कस्टम UI</span>
                    <span>{custom_ui || "NA"}</span>
                  </div>
                </div>
              </div>

              <div className="spcfcnbx prfrmncwrap" id={`performanceNew${ mobileId }`}>
                <h3>परफॉरमेंस</h3>
                <div className="spcfcnbx-in">
                  <div>
                    <span>चिपसेट</span>
                    <span>{chipset || "NA"}</span>
                  </div>
                  <div>
                    <span>CPU</span>
                    <span>{cpu || "NA"}</span>
                  </div>
                  <div>
                    <span>आर्किटेक्चर</span>
                    <span>{architecture || "NA"}</span>
                  </div>
                  <div>
                    <span>फेब्रिकेशन</span>
                    <span>{fabrication || "NA"}</span>
                  </div>
                  <div>
                    <span>ग्राफ़िक्स</span>
                    <span>{graphics || "NA"} </span>
                  </div>
                  <div>
                    <span>रैम</span>
                    <span>{ram || "NA"}</span>
                  </div>
                  <div>
                    <span>रैम टाइप</span>
                    <span>{ram_type || "NA"}</span>
                  </div>
                </div>
              </div>

              <div className="spcfcnbx dsplwrap" id={`displayNew${ mobileId }`}>
                <h3>डिस्प्ले</h3>
                <div className="spcfcnbx-in">
                  <div>
                    <span>डिस्प्ले टाइप</span>
                    <span>{display_type || "NA"}</span>
                  </div>
                  <div>
                    <span>स्क्रीन साइज़</span>
                    <span> {screen_size || "NA"}</span>
                  </div>
                  <div>
                    <span>रेजोलूशन</span>
                    <span>{resolution || "NA"}</span>
                  </div>
                  <div>
                    <span>आस्पेक्ट रेश्यो</span>
                    <span> {aspect_ratio || "NA"}</span>
                  </div>
                  <div>
                    <span>पिक्सल्स डेंसिटी</span>
                    <span>{pixel_density || "NA"}</span>
                  </div>
                  <div>
                    <span>स्क्रीन to Body</span>
                    <span>{screen_size || "NA"}</span>
                  </div>
                  <div>
                    <span>रेश्यो</span>
                    <span>{screen_to_body_ratio_calculated || "NA"}</span>
                  </div>
                  <div>
                    <span>स्क्रीन प्रोटेक्शन</span>
                    <span>{screen_protection || "NA"}</span>
                  </div>
                  {/* <div>
              <span>Bezel-less display</span>
              <span>{bezelless_display || "NA"}</span>
            </div> */}
                  <div>
                    <span>टच स्क्रीन</span>
                    <span>{touch_screen || "NA"}</span>
                  </div>
                  <div>
                    <span>ब्राइटनेस</span>
                    <span>{brightness || "NA"}</span>
                  </div>
                  <div>
                    <span>रिफ्रेश रेट</span>
                    <span>{refresh_rate || "NA"}</span>
                  </div>
                </div>
              </div>

              <div className="spcfcnbx dsgnwrap" id={`designNew${ mobileId }`}>
                <h3>डिज़ाइन</h3>
                <div className="spcfcnbx-in">
                  <div>
                    <span>मोटाई</span>
                    <span>{thickness || "NA"}</span>
                  </div>
                  <div>
                    <span>चौड़ाई</span>
                    <span>{width || "NA"}</span>
                  </div>
                  <div>
                    <span>वज़न</span>
                    <span>{weight || "NA"}</span>
                  </div>
                  <div>
                    <span>हाइट</span>
                    <span>{height || "NA"}</span>
                  </div>
                  <div>
                    <span>कलर</span>
                    <span>{colours || "NA"}</span>
                  </div>
                </div>
              </div>

              <div className="spcfcnbx dsgnwrap" id={`cameraNew${ mobileId }`}>
                <h3>कैमरा</h3>
                <div className="spcfcnbx-in">
                  <div>
                    <span>कैमरा फीचर्स</span>
                    <span>{camera_features || "NA"}</span>
                  </div>
                  <div>
                    <span>इमेज रेजोलूशन</span>
                    <span>{image_resolution || "NA"}</span>
                  </div>
                  <div>
                    <span>सेंसर</span>
                    <span>{sensor || "NA"}</span>
                  </div>
                  <div>
                    <span>ऑटो फोकस</span>
                    <span>{autofocus || "NA"}</span>
                  </div>
                  <div>
                    <span>फ्लैश</span>
                    <span>{flash || "NA"}</span>
                  </div>
                  <div>
                    <span>वीडियो रिकॉडिंग</span>
                    <span>{video_recording || "NA"}</span>
                  </div>
                  <div>
                    <span>शूटिंग मोड्स</span>
                    <span>{shooting_modes || "NA"}</span>
                  </div>
                </div>
              </div>

              <div className="spcfcnbx dsgnwrap" id={`batteryNew${ mobileId }`}>
                <h3>बैटरी</h3>
                <div className="spcfcnbx-in">
                  <div>
                    <span>फास्ट चार्जिंग</span>
                    <span>{quick_charging || "NA"}</span>
                  </div>
                  <div>
                    <span>रिमूवेबल</span>
                    <span>{removable || "NA"}</span>
                  </div>
                  <div>
                    <span>यूएसबी टाइप c</span>
                    <span>{usb_typec || "NA"}</span>
                  </div>
                  <div>
                    <span>टाइप</span>
                    <span>{type || "NA"}</span>
                  </div>
                  <div>
                    <span>कैपेसिटी</span>
                    <span>{capacity || "NA"}</span>
                  </div>
                </div>
              </div>

              <div className="spcfcnbx dsgnwrap" id={`networkNew${ mobileId }`}>
                <h3>नेटवर्क & कनेक्टिविटी</h3>
                <div className="spcfcnbx-in">
                  <div>
                    <span>वाईफाई</span>
                    <span>{wifi || "NA"}</span>
                  </div>
                  <div>
                    <span>वाईफाई फीचर्स</span>
                    <span>{wifi_features || "NA"}</span>
                  </div>
                  <div>
                    <span>ब्लूटूथ</span>
                    <span>{bluetooth || "NA"}</span>
                  </div>
                </div>
              </div>

              <div className="spcfcnbx dsgnwrap" id={`multimediaNew${ mobileId }`}>
                <h3>मल्टीमीडिया</h3>
                <div className="spcfcnbx-in">
                  <div>
                    <span>Fm रेडियो</span>
                    <span>{fm_radio || "NA"}</span>
                  </div>
                  <div>
                    <span>ऑडियो जैक</span>
                    <span>{audio_jack || "NA"}</span>
                  </div>
                </div>
              </div>

              <div className="spcfcnbx dsgnwrap" id={`sensorsNew${ mobileId }`}>
                <h3>सेंसर</h3>
                <div className="spcfcnbx-in">
                  <div>
                    <span>फिंगरप्रिंट सेंसर टाइप</span>
                    <span>{fingerprint_sensor_type || "NA"}</span>
                  </div>
                  <div>
                    <span>हार्ट रेट मॉनिटर</span>
                    <span>{heart_rate_monitor || "NA"}</span>
                  </div>
                  <div>
                    <span>अन्‍य सेंसर</span>
                    <span>{other_sensors || "NA"}</span>
                  </div>
                  <div>
                    <span>फिंगरप्रिंट सेंसर</span>
                    <span>{fingerprint_sensor || "NA"}</span>
                  </div>
                </div>
              </div>
            </div>

            <a
              onClick={toggleClass}
              className={!isActive ? "mrtxtbtn " : "mrtxtbtn adcls"}
            >
              <span>
                <b>रीड मोर</b>
              </span>
              <span onClick={() => scrollIntoViewIfNeeded(`generalNew${ mobileId }`)}>
                <b>रीड लेस</b>
              </span>
            </a>
          </div>
        </div>
      </div>
      <style>
        {`
    .spcmbl-forartcl{margin:0 -15px}
    .phnspc20{margin-top:20px}
    .spcspcfcntab{background: #F6F7F7;box-shadow: 0px 2px 4px #00000029;border: 1px solid #F7F7F7; padding: 8px 0; overflow: scroll;margin: 0 -15px;position: sticky;top: 32px;display:flex; z-index:1}
    .spcspcfcntab a{margin-left: 15px; font-size: 12px !important; height: 25px; line-height: 25px !important; color: #525252 !important; padding: 0 10px; display: block;flex-shrink:0; font-weight:normal !important}
    .spcspcfcntab a.active{position: sticky;right: 0; left: 0; font-weight: bold;background: #ED1C24;border-radius: 6px;color: #fff !important;}
     .spcspcfcn{margin: 0 15px 30px 15px; position: relative}
     .phnglblhd{color: #001D42;font-size: 16px!important;font-weight: bold;border-bottom: 1px solid #BEBEBE;line-height: 24px!important;padding-bottom: 10px;margin-bottom: 10px; position: relative;}
    .phnglblhd span{color: #E1261D}
    .phnglblhd:after{content: "";width: 25px;height: 4px;position: absolute;left: 0;bottom: -1px;background: #ED1C24;}
     .spcspcfcn .phnglblhd{margin-bottom: 0}
     .spcfcnwrap{ padding:0 5px 0 0}
     .spcfcnwrap.adcls{height:auto; }
    .spcfcnbx{margin: 20px 0}
    .spcfcnbx h2, .spcfcnbx h3{ display: inline-block; margin-bottom: 2px; letter-spacing: -0.56px;color: #FF5A00;text-transform: uppercase; font-size: 15px; font-weight: bold; line-height: 14px;}
    .spcfcnbx .spcfcnbx-in{background: #F6F7F7 0% 0% no-repeat padding-box;box-shadow: 0px 3px 6px #00000029;border: 1px solid #D8D8D8;}
    .spcfcnbx .spcfcnbx-in div{font-size: 13px; color: #212121; display: flex;}
    .spcfcnbx .spcfcnbx-in div span{padding: 4px 8px;display: inline-block;line-height: 28px;}
    .spcfcnbx .spcfcnbx-in div span:first-child{ width: 120px; text-align: right; background:#fff; font-weight: bold; margin-right: 8px; flex-shrink: 0}
    .spcfcnbx .spcfcnbx-in div:first-child span{padding-top: 16px}
    .spcfcnbx .spcfcnbx-in div:last-child span{padding-bottom: 16px}
    
    .phnlgsld{overflow: hidden; position: relative;}
    .phnlgsld ul{display: flex !important;line-height: 0 !important;justify-content:center; }
    .phnlgsld ul li{   display: flex;
      align-items: center;
      justify-content: center;text-align: center !important;margin: 0 !important; padding: 0 !important; min-height: auto !important;      list-style: none !important; }
    .phnlgsld ul li::marker{display:none;}
    .phnlgsld ul li img{width:85px}
    .phnlgsld ul li:before{display:none}
    .phnlgar{position: absolute;top: 50%;margin-top: -12px;left: 0px;right: 0px;}
    .phnlgar button{position: absolute;top: 0;left: 10px;width: 10px;height: 10px;transform: rotate(-45deg);border: none; outline: none;padding: 0; margin: 0;background: none;}
    .phnlgar button:before{content: ""; position: absolute;width: 12px; height: 12px; border-top:2px solid #425673; border-left:2px solid #425673;}
    .phnlgar button:last-child{left: auto;right: 10px;transform: rotate(135deg);}
    .phnprc{color: #0076DB;font-weight: bold;font-size: 18px;text-align: center;line-height: 20px;}
    .phnrlsdt{font-size: 12px;color: #646464;line-height: 18px;text-align: center;margin: 5px 0 10px 0;}
    .phnlgblts{justify-content:center; display:flex; margin:12px 0}
    .phnlgblts button{margin: 0 5px;padding: 0;width: 6px; height: 6px; background: #ccc; border: none; outline: none;border-radius: 100%}
    .phnlgblts button.glide__bullet--active{background:#E1261D; width: 18px; border-radius: 5px}
    .mrtxtbtn{ margin-top:-25px;bottom:0px;left: 0;right: 0;background: linear-gradient(transparent, #fff);display: flex;justify-content: center;align-items: flex-end;}
    .mrtxtbtn span{position: relative;background: #FFFFFF;box-shadow: 0px 3px 6px #00000033;border-radius: 17px;width: 140px;height: 34px;line-height: 34px;color: #E1261D;font-size: 14px;text-align: center;font-weight: bold;}
    .mrtxtbtn span:nth-child(2){display: none;}
    .mrtxtbtn span:before, .mrtxtbtn span:after{position: absolute;content: "";width: 6px;height: 6px;border-bottom: 2px solid #CECECE;border-left: 2px solid #CECECE;transform: rotate(-45deg);top: 11px;}
    .mrtxtbtn span:before{left: 16px}
    .mrtxtbtn span:after{right: 16px}
    .mrtxtbtn.adcls{bottom: 0}
    .mrtxtbtn.adcls span:before, .mrtxtbtn.adcls span:after {transform: rotate( 135deg);top: 15px;} 
    .mrtxtbtn.adcls span:nth-child(2){display: block;}
    .mrtxtbtn.adcls span:nth-child(1){display: none;}

    .spcspcfcn .phnglblhd {
      margin-bottom: 0;
  }

  .fvimage{
     max-height: 180px !important;
    max-width: 85px !important;
    width:unset !important;
  height:auto !important;

    
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

  .spcfcnbx .phnlgblts,.spcfcnbx .phnprc,.spcfcnbx .phnrlsdt  {
        text-align: center !important;
        justify-content: center !important;
  }
   
   
  html{scroll-behaviour:smooth}

   .noarrownodt .phnlgar,.noarrownodt .phnlgblts,.noarrownodt .sl_count  {
      display:none;
      
  }
  .noarrownodt{
    margin-bottom : 10px;
  }
    `}
      </style>
    </div>
  );
};

export default FullView;
