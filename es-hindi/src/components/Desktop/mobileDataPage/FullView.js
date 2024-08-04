import React, { useEffect, useState } from "react";
// import getConfig from "next/config";
import { scrollIntoViewIfNeeded } from "includes/article.util";
import Glide from "@glidejs/glide";
import { getMobile } from "api/global/Common";
import { imgURL } from "api/Constant";

// const { publicRuntimeConfig } = getConfig();

const FullMobileView = ({ data: mbData }) => {

  const [data, setData] = useState({});
  const [showFull, setShowFull] = useState(false);

  const [mobileId] = mbData.split(",");

  const [activeEle, setActiveEle] = useState(`ksp${ mobileId }`);

  const callApi = async () => {
    const id = mobileId;
    const data = await getMobile({id: id}, true)
    setData(data);
  };

  let glide = '';
  useEffect(() => {

    const timeOut = setTimeout(() => {
      if(document.getElementById(`${mobileId}`)) {
        glide = new Glide(`.${mobileId}`, {
          autoplay: 2000,
          type: 'slider',
          focusAt: 'center',
          perView: 1,
          slidesToScroll: 1,
          }).mount();

          glide.on(['mount.after', 'run'], function () {
            document.getElementById('current').innerHTML = `0${glide.index+1}/`;
          });
      }
    }, 2000);
    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    callApi();
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
    pixel_density,
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

  const toggle = () => {
    setShowFull(!showFull);
  };
  return (
    <div className='fullViewWidget'>
      <h2 className="sc_ttl">
        {title} <span>PHONE SPECIFICATIONS</span>
      </h2>
      <div className="tabs_wrp">
        <div className="phsp_tabs_wrp">
          <a onClick={(e) => scroll(e, `ksp${ mobileId }`)} data-name="#ksp" className={activeEle === `ksp${ mobileId }`?'active':""}>
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
      </div>
      <div id="nwnspc" className="section">
        <div className="msl_outer">
          <div className={`${mobileId} mmsli_wrapi ${mobile_images_91?.length?'':'noarrownodt'}`} id={mobileId}>
            <div data-glide-el="track">
              <ul className="glide__track mmslider">
                <li className="glide__slide">
                  <img className='fvimage' src={imgURL} alt="" />
                </li>
                {mobile_images_91?.length && mobile_images_91.map((mob) => {
                   return <li className="glide__slide">
                   <img className='fvimage' src={mob} alt="" height="360px" />
                 </li>;
                })}
              </ul>
            </div>
            <div className="controls" data-glide-el="controls">
              <div data-glide-dir="<">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7.406"
                  height="12"
                  viewBox="0 0 7.406 12"
                >
                  <path
                    id="Path_1"
                    data-name="Path 1"
                    d="M-3.984-3l-6-6,6-6,1.406,1.406L-7.219-9l4.641,4.594Z"
                    transform="translate(9.984 15)"
                    fill="#425673"
                  />
                </svg>
              </div>
              <div data-glide-dir=">">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="7.406"
                  height="12"
                  viewBox="0 0 7.406 12"
                >
                  <path
                    id="Path_2"
                    data-name="Path 2"
                    d="M-8.578-3l6-6-6-6-1.406,1.406L-5.344-9-9.984-4.406Z"
                    transform="translate(9.984 15)"
                    fill="#425673"
                  />
                </svg>
              </div>
            </div>
            <div className="glide__bullets" data-glide-el="controls[nav]">
              <button className="glide__bullet" data-glide-dir="=0"></button>
              {mobile_images_91?.length && mobile_images_91.map((mob, key) => {
                return <button className="glide__bullet" data-glide-dir={`=${key+1}`}></button>;
              }) }
            </div>

            <div className="sl_count">
              <div id='current' className="current">01/</div>
              <div>{`0${1 + (mobile_images_91?.length || 0) }`}</div>
            </div>
            <div className="prz">₹  {numberWithCommas(price)}</div>
            <div className="r_det">
            जारी करने की तारीख:{" "}
          {newReleaseDate ? (
            <span>{date + "-" + month + "-" + year}</span>
          ) : (
            "NA"
          )}
            </div>
          </div>
        </div>
        <div className="phspe">
          <div className="specs-wrap">
            <div className={showFull? 'spec-box  fullheightwdgt':'spec-box' }>
              <div className="spec-box-inner">
                <div className="table">
                  <div id={`ksp${ mobileId }`} className="specs table_row">
                    <div className="f_col">
                      <div className="th">प्रमुख विशेषताएं</div>
                    </div>
                    <div className="s_col">
                      <div className="fe_row">
                        <div className="fe_h">रैम</div>
                        <div className="fe_txt">{ram || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">प्रोसेसर </div>
                        <div className="fe_txt">4 GB</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">रियर कैमरा </div>
                        <div className="fe_txt">{rear_camera}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">फ्रंट कैमरा </div>
                        <div className="fe_txt">{front_camera}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">बैटरी </div>
                        <div className="fe_txt">{capacity}</div>
                      </div>
                    </div>
                  </div>
                  <div id={`generalNew${ mobileId }`}></div>
                  <div id="general" className="specs table_row">
                    <div className="f_col">
                      <div className="th">जनरल</div>
                    </div>
                    <div className="s_col">
                      <div className="fe_row">
                        <div className="fe_h">लॉन्च की तारीख</div>
                        <div className="fe_txt">{launch_date}(Official) </div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">ऑपरेटिंग सिस्टम</div>
                        <div className="fe_txt">{operating_system || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">कस्टम UI</div>
                        <div className="fe_txt">{custom_ui || "NA"}</div>
                      </div>
                    </div>
                  </div>
                  <div id={`performanceNew${ mobileId }`}></div>

                  <div id="performance" className="specs table_row">
                    <div className="f_col">
                      <div className="th">परफॉरमेंस</div>
                    </div>
                    <div className="s_col">
                      <div className="fe_row">
                        <div className="fe_h">चिपसेट</div>
                        <div className="fe_txt">{chipset || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h"> CPU</div>
                        <div className="fe_txt">{cpu || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">आर्किटेक्चर</div>
                        <div className="fe_txt">{architecture || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">फेब्रिकेशन</div>
                        <div className="fe_txt">{fabrication || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">ग्राफ़िक्स</div>
                        <div className="fe_txt">{graphics || "NA"} </div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">रैम</div>
                        <div className="fe_txt">{ram || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">रैम टाइप</div>
                        <div className="fe_txt">{ram_type || "NA"}</div>
                      </div>
                    </div>
                  </div>

                  <div id={`displayNew${ mobileId }`}></div>

                  <div id="display" className="specs table_row">
                    <div className="f_col">
                      <div className="th">डिस्प्ले</div>
                    </div>
                    <div className="s_col">
                      <div className="fe_row">
                        <div className="fe_h">डिस्प्ले टाइप</div>
                        <div className="fe_txt">{display_type || "NA"} </div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h"> आस्पेक्ट रेश्यो</div>
                        <div className="fe_txt">{aspect_ratio || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">ब्राइटनेस</div>
                        <div className="fe_txt">{brightness || "NA"} </div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">पिक्सल्स डेंसिटी</div>
                        <div className="fe_txt">{pixel_density || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">स्क्रीन प्रोटेक्शन</div>
                        <div className="fe_txt">{screen_protection || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">स्क्रीन साइज़</div>
                        <div className="fe_txt">{screen_size || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">रिफ्रेश रेट</div>
                        <div className="fe_txt">{refresh_rate || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">टच स्क्रीन</div>
                        <div className="fe_txt">{touch_screen || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">रेजोलूशन</div>
                        <div className="fe_txt">{resolution || "NA"}</div>
                      </div>
                    </div>
                  </div>

                  <div id={`designNew${ mobileId }`}></div>

                  <div id="design" className="specs table_row">
                    <div className="f_col">
                      <div className="th">डिज़ाइन</div>
                    </div>
                    <div className="s_col">
                      <div className="fe_row">
                        <div className="fe_h">मोटाई</div>
                        <div className="fe_txt">{thickness || "NA"} </div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h"> चौड़ाई</div>
                        <div className="fe_txt">{width || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">वज़न</div>
                        <div className="fe_txt">{weight || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">हाइट</div>
                        <div className="fe_txt">{height || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">कलर</div>
                        <div className="fe_txt">{colours || "NA"}</div>
                      </div>
                    </div>
                  </div>

                  <div id={`cameraNew${ mobileId }`}></div>

                  <div id="camera" className="specs table_row">
                    <div className="f_col">
                      <div className="th">कैमरा</div>
                    </div>
                    <div className="s_col">
                      <div className="fe_row">
                        <div className="fe_h">कैमरा फीचर्स</div>
                        <div className="fe_txt">{camera_features || "NA"} </div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h"> इमेज रेजोलूशन</div>
                        <div className="fe_txt">{image_resolution || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">सेंसर</div>
                        <div className="fe_txt">{sensor || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">ऑटो फोकस</div>
                        <div className="fe_txt">{autofocus || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">फ्लैश</div>
                        <div className="fe_txt">{flash || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">वीडियो रिकॉडिंग</div>
                        <div className="fe_txt">{video_recording || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">शूटिंग मोड्स</div>
                        <div className="fe_txt">{shooting_modes || "NA"}</div>
                      </div>
                    </div>
                  </div>

                  <div id={`batteryNew${ mobileId }`}></div>

                  <div id="battery" className="specs table_row">
                    <div className="f_col">
                      <div className="th">बैटरी</div>
                    </div>
                    <div className="s_col">
                      <div className="fe_row">
                        <div className="fe_h">फास्ट चार्जिंग</div>
                        <div className="fe_txt">{quick_charging || "NA"} </div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h"> रिमूवेबल</div>
                        <div className="fe_txt">{removable || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">यूएसबी टाइप c</div>
                        <div className="fe_txt">{usb_typec || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">टाइप</div>
                        <div className="fe_txt">{type || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">कैपेसिटी</div>
                        <div className="fe_txt">{capacity || "NA"}</div>
                      </div>
                    </div>
                  </div>

                  <div id={`networkNew${ mobileId }`}></div>

                  <div id="network" className="specs table_row">
                    <div className="f_col">
                      <div className="th">नेटवर्क</div>
                    </div>
                    <div className="s_col">
                      <div className="fe_row">
                        <div className="fe_h">वाईफाई</div>
                        <div className="fe_txt">{wifi || "NA"} </div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h"> वाईफाई फीचर्स</div>
                        <div className="fe_txt">{wifi_features || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">ब्लूटूथ</div>
                        <div className="fe_txt">{bluetooth || "NA"}</div>
                      </div>
                    </div>
                  </div>

                  <div id={`multimediaNew${ mobileId }`}></div>

                  <div id="multimedia" className="specs table_row">
                    <div className="f_col">
                      <div className="th">मल्टीमीडिया</div>
                    </div>
                    <div className="s_col">
                      <div className="fe_row">
                        <div className="fe_h">Fm रेडियो</div>
                        <div className="fe_txt">{fm_radio || "NA"} </div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h"> ऑडियो जैक</div>
                        <div className="fe_txt">{audio_jack || "NA"}</div>
                      </div>
                    </div>
                  </div>
                  <div id={`sensorsNew${ mobileId }`} className="specs table_row">
                    <div className="f_col">
                      <div className="th">सेंसर</div>
                    </div>
                    <div className="s_col">
                      <div className="fe_row">
                        <div className="fe_h">फिंगरप्रिंट सेंसर टाइप</div>
                        <div className="fe_txt">
                          {fingerprint_sensor_type || "NA"}{" "}
                        </div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h">हार्ट रेट मॉनिटर</div>
                        <div className="fe_txt">{heart_rate_monitor || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h"> अन्‍य सेंसर</div>
                        <div className="fe_txt">{other_sensors || "NA"}</div>
                      </div>
                      <div className="fe_row">
                        <div className="fe_h"> फिंगरप्रिंट सेंसर</div>
                        <div className="fe_txt">{fingerprint_sensor || "NA"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="dt_expnd" className="expnd_wrp">
        <button
          className={showFull ? "expand-toggle handleArrow" : "expand-toggle"}
          onClick={toggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="7.406"
            viewBox="0 0 12 7.406"
          >
            <path
              id="Path_93"
              data-name="Path 93"
              d="M-8.578-3l6-6-6-6-1.406,1.406L-5.344-9-9.984-4.406Z"
              transform="translate(-3 9.984) rotate(90)"
              // "translate(-3 9.984) rotate(90)"
              fill="#cecece"
            />
          </svg>
          <span className={showFull ? "hide more" : "more"}>रीड मोर</span>
          <span onClick={() => scrollIntoViewIfNeeded(`generalNew${ mobileId }`)} className={showFull ? "less" : "hide less"}>रीड लेस</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="7.406"
            viewBox="0 0 12 7.406"
          >
            <path
              id="Path_93"
              data-name="Path 93"
              d="M-8.578-3l6-6-6-6-1.406,1.406L-5.344-9-9.984-4.406Z"
              transform="translate(-3 9.984) rotate(90)"
              fill="#cecece"
            />
          </svg>
        </button>
      </div>
      <style jsx global>
        {`

.fullViewWidget{
  font-family:  Mukta, sans-serif !important;

}
          #nwnspc {
            display: flex;
            margin-bottom: 40px;
          }
          #nwnspc .l_news {
            width: 240px;
            margin-right: 40px;
            -webkit-box-shadow: 4px 4px 0 0px rgba(0, 0, 0, 0.2);
            box-shadow: 4px 4px 0 0px rgba(0, 0, 0, 0.2);
            flex-shrink: 0;
          }
          #nwnspc .phspe {
            flex-grow: 1;
            position: relative;
          }
            .phspe:before {
              content: "";
              position: absolute;
              left: 1px;
              right: 1px;
              bottom: 1px;
              background: transparent
                linear-gradient(180deg, #f6f7f700 0%, #f6f7f7 100%) 0% 0%
                no-repeat padding-box;
              height: 87px;
              z-index: 9;
            }
          .table_row {
            display: flex;
            border-bottom: 1px solid #d8d8d8;
          }
          .table_row:last-child{padding-bottom:30px}
          .table_row .f_col {
            width: 130px;
            flex-shrink: 0;
            text-align: left;
          }
          .table_row .th {
            font: bold 16px/20px Mukta, sans-serif !important;
            letter-spacing: -0.72px;
            color: #ff5a00;
            text-transform: uppercase;
            display: inline-block;
            margin: 16px 0px 0px 10px;
          }
          .table_row .s_col {
            background: #f6f7f7;
            flex-grow: 1;
            padding: 10px 20px;
          }
          .table_row .fe_row {
            display: flex;
          }
          .table_row .fe_h {
            width: 165px;
            flex-shrink: 0;
            font: bold 14px/32px Mukta, sans-serif !important;
            color: #212121;
          }
          .table_row .fe_txt {
            font: normal 14px/32px Mukta, sans-serif !important;
            color: #212121;
            white-space: normal;
          }
          .phsp_tabs_wrp {
            background: #f6f7f7;
            box-shadow: 0px 2px 4px #00000029;
            border: 1px solid #f7f7f7;
            overflow-x: scroll;
            white-space: nowrap;
            padding: 0 10px;
            position: relative;
            height: 42px;
            align-items: center;
            display: flex;
          }
          .tabs_wrp {
            position: relative;
            margin-bottom: 12px;
            margin-top: -10px;
          }
          .tabs_wrp:before {
            content: "";
            width: 63px;
            background: transparent
              linear-gradient(89deg, #ffffff00 0%, #f6f7f7 100%) 0% 0% no-repeat
              padding-box;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
          }
          .phsp_tabs_wrp a {
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 6px 10px 5px 10px;
            height: 30px;
            font: normal 14px/14px Mukta, sans-serif !important;
            color: #525252 !important;
            margin-right: 10px;
          }
          .phsp_tabs_wrp a.active,
          .phsp_tabs_wrp a:hover {
            background: #ed1c24;
            border-radius: 6px;
            color: white !important;
          }
          .phsp_tabs_wrp::-webkit-scrollbar {
            display: none;
          }
          .specs-wrap .spec-box {
            white-space: nowrap;
            overflow-y: scroll;
            --scroll-color: #999;
            --scroll--hover-color: #666;
            scrollbar-color: #999 #c3bebe;
            scrollbar-width: thin;
            position: relative;
          }
          .specs-wrap .spec-box::-webkit-scrollbar-track {
            background: -moz-linear-gradient(
              left,
              rgba(228, 245, 252, 0) 0%,
              rgba(228, 245, 251, 0) 1%,
              rgba(234, 234, 234, 0) 27%,
              rgba(234, 234, 234, 1) 28%,
              rgba(234, 234, 234, 1) 73%,
              rgba(234, 234, 234, 0) 74%,
              rgba(234, 234, 234, 0) 100%
            );
            background: -webkit-linear-gradient(
              left,
              rgba(228, 245, 252, 0) 0%,
              rgba(228, 245, 251, 0) 1%,
              rgba(234, 234, 234, 0) 27%,
              rgba(234, 234, 234, 1) 28%,
              rgba(234, 234, 234, 1) 73%,
              rgba(234, 234, 234, 0) 74%,
              rgba(234, 234, 234, 0) 100%
            );
            background: linear-gradient(
              to right,
              rgba(228, 245, 252, 0) 0%,
              rgba(228, 245, 251, 0) 1%,
              rgba(234, 234, 234, 0) 27%,
              rgba(234, 234, 234, 1) 28%,
              rgba(234, 234, 234, 1) 73%,
              rgba(234, 234, 234, 0) 74%,
              rgba(234, 234, 234, 0) 100%
            );
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00e4f5fc', endColorstr='#00eaeaea',GradientType=1 );
          }
          .specs-wrap .spec-box::-webkit-scrollbar {
            width: 4px;
          }

          .specs-wrap .spec-box::-webkit-scrollbar-thumb {
            background-color: var(--scroll-color);
            border-radius: 4px;
          }
          .specs-wrap {
            position: relative;
            border: 1px solid #d8d8d8;
          }
          .specs-wrap .spec-box {
            height: 519px;
            overflow-x: hidden;
            overflow-y: auto;
          }
          .spec-box {
            position: relative;
          }
          .spec-box-inner {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            transition: 0.4s ease all;
          }
          .msl_outer {
            width: 280px;
            border-right: none;
            position: relative;
            padding: 10px;
            border-right: none;
            border-top: 1px solid rgb(216, 216, 216);
            border-bottom: 1px solid rgb(216, 216, 216);
            border-left: 1px solid rgb(216, 216, 216);
          }
          .mmsli_wrapi {
            position: relative;
            overflow: hidden;
          }
          .mmsli_wrapi .controls {
            position: absolute;
            top: 43%;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
          }
          .mmsli_wrapi .controls div {
            padding: 10px;
            cursor: pointer;
          }
          .mmsli_wrapi .glide__bullets {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 7px;
          }
          .mmsli_wrapi .glide__bullets .glide__bullet {
            width: 5px;
            height: 5px;
            background: #bababa;
            border: none;
            border-radius: 100%;
            margin: 0 5px 5px 5px;
          }
          .mmsli_wrapi .glide__bullets .glide__bullet.glide__bullet--active {
            width: 18px;
            background: #e1261d;
            border-radius: 20px;
          }
          .mmslider {
            display: flex;
            margin-bottom: 15px;
            height: 400px;
          }
          .mmslider li {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .prz {
            font: bold 21px/20px Mukta, sans-serif !important;
            color: #0076db;
            text-align: center;
            margin-bottom: 13px;
          }
          .r_det {
            text-align: center;
            font: normal 12px/18px Mukta, sans-serif !important;
            color: #646464;
          }
          .r_det span {
            color: #212121;
          }

         

.sc_ttl {
    font: bold 18px/22px Mukta, sans-serif !important;
    color: #001D42;
    text-transform: uppercase;
    padding-bottom: 8px;
    border-bottom: #BEBEBE solid 1px;
    position: relative;
    margin-bottom: 10px;
}
.sc_ttl span{
  color: #E1261D;

}

.phsp_tabs_wrp a {
  cursor: pointer !important;
  display: inline-block !important;
  padding: 6px 10px 5px 10px !important;
  height: 25px !important;
  font: normal 12px/14px Mukta, sans-serif !important;
  color: #525252;
  margin-right: 10px !important;
}
.fvimage{
  border: none !important;
  box-shadow:none !important;
  max-width:171px !important;
  height:fit-content !important;
  margin :0px !important;
  padding: 0px !important;
  width:unset !important;
}

 .sl_count {
  display: flex;
  justify-content: center;
  align-items: center;
  font: normal normal normal 12px/1 Mukta, sans-serif !important;
  color: #9f9f9f;
  margin-bottom : 5px;
}
 .sl_count .current {
  font-size: 14px;
  color: #000;
  font-weight: bold;
}

  .noarrownodt .controls,.noarrownodt .glide__bullets ,.noarrownodt .sl_count{
  display:none;
  
}

.noarrownodt{
margin-bottom : 10px;
}

#dt_expnd .expand-toggle {
  width: 140px;
  align-items: center;
  display: inline-flex;
  justify-content: space-between;
  padding: 0 15px;
  height: 34px;
  background: #ffffff;
  box-shadow: 0px 3px 6px #00000033;
  border-radius: 17px;
  opacity: 1;
  border: none;
  font: bold 14px/20px Mukta, sans-serif;
  letter-spacing: 0px;
  color: #e1261d;
  cursor: pointer;
}
#dt_expnd .expand-toggle.btn-expnd svg {
  transform: rotate(180deg);
}
#dt_expnd.expnd_wrp {
  text-align: center;
  margin-top: -55px;
  margin-bottom: 30px;
  position: relative;
  z-index: 99;
  margin-left: 280px;
}

.hide {
  display: none;
}
.handleArrow svg {
  transform: rotate(180deg);
}

#dt_desc.expand:before {
  display: none;
}

.fullheightwdgt {height: 100% !important;}
.fullheightwdgt .spec-box-inner{position: static !important;}
        `}
      </style>
    </div>
  );
};

export default FullMobileView;
