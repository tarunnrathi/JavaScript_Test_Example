import { scrollIntoViewIfNeeded } from "includes/article.util";
import React, { useState } from "react";

const Specification = ({ title='', data = {} }) => {

  const [activeEle, setActiveEle] = useState('ksp');

  const { ram_display, internal_storage_display, price, release_date } =
    data || {};
  const { cpu, architecture, ram, chipset, fabrication, graphics, ram_type } =
    (data?.performance_specs_91?.length &&
      JSON.parse(data?.performance_specs_91 )) ||
    {};

  // let { screen_size, display_type, pixel_density, refresh_rate } = JSON.parse(
  //   data?.display_specs_91 
  // );
  let { front_camera, rear_camera } =
    (data?.special_specs_91?.length && JSON.parse(data?.special_specs_91 )) ||
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
    (data?.camera_specs_91?.length && JSON.parse(data?.camera_specs_91 )) ||
    {};
  let { quick_charging, usb_typec, capacity, removable, type } =
    (data?.battery_specs_91?.length && JSON.parse(data?.battery_specs_91 )) ||
    {};

  let { operating_system, launch_date, custom_ui } =
    (data?.general_specs_91?.length && JSON.parse(data?.general_specs_91 )) ||
    {};

  let { thickness, width, weight, height, colours } =
    (data?.design_specs_91?.length && JSON.parse(data?.design_specs_91 )) ||
    {};

  const { wifi, wifi_features, bluetooth } =
    (data?.network_connectivity_specs_91?.length &&
      JSON.parse(data?.network_connectivity_specs_91 )) ||
    {};

  const { fm_radio, audio_jack } =
    (data?.multimedia_specs_91?.length &&
      JSON.parse(data?.multimedia_specs_91 )) ||
    {};
  const {
    fingerprint_sensor_type,
    heart_rate_monitor,
    other_sensors,
    fingerprint_sensor,
  } =
    (data?.sensors_specs_91?.length && JSON.parse(data?.sensors_specs_91 )) ||
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
    (data?.display_specs_91?.length && JSON.parse(data?.display_specs_91 )) ||
    {};

  const scroll = (e, id) => {
    setActiveEle(id);
    e.preventDefault();
    scrollIntoViewIfNeeded(id);
  };
  const newReleaseDate = release_date && "" + release_date;

  const date = newReleaseDate && newReleaseDate.slice(-2);
  const month = newReleaseDate && newReleaseDate.slice(-4, -2);
  const year = newReleaseDate && newReleaseDate.slice(0, 4);
  return (
    <div id="fullSpecification">
      <div className="phspe">
        <h2 className="sc_ttl">
          {title} <span>फोन्‍स स्‍पेसिफिकेशंस</span>
        </h2>
        <div className="tabs_wrp">
          <div className="phsp_tabs_wrp">
            <a onClick={(e) => scroll(e, "ksp")} data-name="#ksp" className={activeEle === 'ksp'?'active':""}>
              प्रमुख विशेषताएं
            </a>
            <a
              onClick={(e) => scroll(e, "generalNew")}
              href="#general"
              data-name="#general"
              className={activeEle === 'generalNew'?'active':""}
            >
              जनरल
            </a>
            <a
              onClick={(e) => scroll(e, "performanceNew")}
              href="#performance"
              data-name="#pf"
              className={activeEle === 'performanceNew'?'active':""}
            >
              परफॉरमेंस
            </a>
            <a
              onClick={(e) => scroll(e, "displayNew")}
              href="#display"
              data-name="#display"
              className={activeEle === 'displayNew'?'active':""}
            >
              डिस्प्ले
            </a>
            <a
              onClick={(e) => scroll(e, "designNew")}
              // href="#design"
              data-name="#design"
              className={activeEle === 'designNew'?'active':""}
            >
              डिज़ाइन
            </a>
            <a className={activeEle === 'cameraNew'?'active':""} onClick={(e) => scroll(e, "cameraNew")} href="#camera" data-name="">
              कैमरा
            </a>
            <a
              onClick={(e) => scroll(e, "batteryNew")}
              href="#battery"
              data-name=""
              className={activeEle === 'batteryNew'?'active':""}
            >
              बैटरी
            </a>
            <a
              onClick={(e) => scroll(e, "networkNew")}
              href="#network"
              data-name=""
              className={activeEle === 'networkNew'?'active':""}
            >
              नेटवर्क & कनेक्टिविटी
            </a>
            <a
              onClick={(e) => scroll(e, "multimediaNew")}
              href="#multimedia"
              data-name=""
              className={activeEle === 'multimediaNew'?'active':""}
            >
              मल्टीमीडिया
            </a>
            <a
              onClick={(e) => scroll(e, "sensorsNew")}
              href="#sensors"
              data-name=""
              className={activeEle === 'sensorsNew'?'active':""}
            >
              सेंसर
            </a>
          </div>
        </div>
        <div className="specs-wrap">
          <div className="spec-box">
            <div className="spec-box-inner">
              <div className="table">
                <div id="ksp" className="specs table_row">
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
                <div id='generalNew'></div>
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
                <div id="performanceNew" ></div>
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
                <div id="displayNew" ></div>
                <div ></div>
                <div ></div>
                <div ></div>

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

                <div id="designNew" ></div>

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

                <div id="cameraNew" ></div>

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

                <div id="batteryNew" ></div>

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

                <div id="networkNew" ></div>

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

                <div id="multimediaNew" ></div>

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

                <div id="sensorsNew" ></div>

                <div id="sensors" className="specs table_row">
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
  );
};

export default Specification;
