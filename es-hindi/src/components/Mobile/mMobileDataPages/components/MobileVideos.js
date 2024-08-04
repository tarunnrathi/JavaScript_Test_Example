import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { setDefaultImage } from "includes/article.util";
import { getCompleteURL } from "util/global/Helper";
export default function MobileVideos({ data = [] }) {
  useEffect(() => {
    setTimeout(() => {
      const elm = document?.querySelector(".spcvideossld");
      if (elm) {
        new Glide(".spcvideossld", {
          autoplay: 4000,
          type: "carousel",
          perView: 1.5,
          gap: 0,
          focusAt: "center",
          slidesToScroll: 1,
        })?.mount();
      }
    }, 2000);
  }, []);

  return (
    <div className="spcvideos">
      <h2 className="phnvideohd">
        <span>न्‍यूज18 मोबाइल </span>
        वीडियोज
      </h2>

      <div className="spcvideossld psrlhdn">
        <div data-glide-el="track">
          <ul className="dflx">
            {data &&
              data.map((mobileData) => {
                return (
                  <li>
                    <a href={getCompleteURL(mobileData?.weburl_r,mobileData?.weburl)+"/"}>
                      <figure>
                        <img
                          src={mobileData?.images?.url}
                          height={"139px"}
                          width={"207px"}
                          loading="lazy"
                          onError={setDefaultImage}
                        />
                        <div className="vi_wrp">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                        >
                          <g
                            id="Component_12"
                            data-name="Component 12"
                            transform="translate(-5 -5)"
                          >
                            <g
                              id="Ellipse_7"
                              data-name="Ellipse 7"
                              transform="translate(5 5)"
                              fill="#ed1c24"
                              stroke="#fff"
                              strokeWidth="2"
                            >
                              <circle cx="20" cy="20" r="20" stroke="none" />
                              <circle cx="20" cy="20" r="19" fill="none" />
                            </g>
                            <g
                              id="Polygon_1"
                              data-name="Polygon 1"
                              transform="translate(38.533 11) rotate(90)"
                              fill="none"
                            >
                              <path
                                d="M10.7,4.847a4,4,0,0,1,6.61,0l6.431,9.433a4,4,0,0,1-3.3,6.253H7.569a4,4,0,0,1-3.3-6.253Z"
                                stroke="none"
                              />
                              <path
                                d="M 14 5.100551605224609 C 13.32824993133545 5.100551605224609 12.72595977783203 5.418861389160156 12.3475399017334 5.973871231079102 L 5.916099548339844 15.40666103363037 C 5.303359985351562 16.30535125732422 5.631000518798828 17.14749145507812 5.800310134887695 17.46785163879395 C 5.969619750976562 17.78821182250977 6.480850219726562 18.5333309173584 7.568559646606445 18.5333309173584 L 20.43144035339355 18.5333309173584 C 21.51914978027344 18.5333309173584 22.03038024902344 17.78821182250977 22.1996898651123 17.46785163879395 C 22.36899948120117 17.14749145507812 22.69664001464844 16.30535125732422 22.08388900756836 15.40666103363037 L 15.6524600982666 5.973880767822266 C 15.27404022216797 5.41887092590332 14.67173957824707 5.100551605224609 14 5.100551605224609 M 14 3.100547790527344 C 15.2554874420166 3.100547790527344 16.5109748840332 3.682765960693359 17.30490875244141 4.847200393676758 L 23.73635101318359 14.27999114990234 C 25.54673957824707 16.93522071838379 23.6451301574707 20.5333309173584 20.43144035339355 20.5333309173584 L 7.568559646606445 20.5333309173584 C 4.354869842529297 20.5333309173584 2.45326042175293 16.93522071838379 4.263639450073242 14.27999114990234 L 10.69508934020996 4.847200393676758 C 11.4890251159668 3.682765960693359 12.7445125579834 3.100547790527344 14 3.100547790527344 Z"
                                stroke="none"
                                fill="#fff"
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                      </figure>
                      <h2>
                        <div>
                          {mobileData?.display_headline || mobileData?.headline}
                        </div>
                      </h2>
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
        </div>
      </div>
      {/* <a href={`/tag/mobile/videos/`} class="phnmrnwsbtn">
      अन्‍य वीडियो
      </a> */}

      <style jsx global>
        {`
          .spcvideos {
            background: #202020;
            padding: 10px 0;
            margin: 30px 0;
          }
          .phnvideohd {
            color: #ff9122;
            font-size: 28px;
            line-height: 22px;
            text-align: center;
            border-bottom: 1px solid #585858;
            padding-bottom: 12px;
            margin: 0 15px 15px 15px;
          }
          .spcvideossld ul li{
            border-left: 1px solid #585858;
          }
          .spcvideossld ul li a {
            display:block; 
            padding: 0 15px;
            // border-left: 1px solid #585858;
          }
          .spcvideossld ul li a h2,
          .spcvideossld ul li a h3 {
            color: #ffffff;
            font-size: 15px;
            font-weight: bold;
            text-align: center;
            line-height: 20px;
            padding: 10px 5px;
          }
          .spcvideossld ul li a h2 a,
          .spcvideossld ul li a h3 a {
            color: #ffffff;
          }
          .spcvideossld ul li a figure {
            // width:172px;
            // height:115px;
            position: relative;
            line-height: 0;
            border: 1px solid #585858;
          }
          .spcvideossld ul li a figure:before {
            content: "";
            position: absolute;
            width: 40px;
            height: 40px;
            background: url(spcmbl-vdicn.svg) 0 0 no-repeat;
            top: 50%;
            left: 50%;
            margin: -20px 0 0 -20px;
          }
          .spcvideossld ul li a figure img {
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

          .phnvideohd span {
            display: block;
            // letter-spacing: 3.3px;
            color: #FFFFFF;
            text-transform: uppercase;
            font-weight: normal;
            font-size: 15px;
            margin-bottom : 12px;
        }

          .vi_wrp {
            position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
        }

        
        `}
      </style>
    </div>
  );
}
