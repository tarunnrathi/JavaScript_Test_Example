// import { imageLoader } from "includes/article.util";
import moment from 'moment-timezone';
import Slider from 'react-slick/lib';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LazyLoadImage from "components/Common/CustomImage";

const PodcastSlider = ({ latestPodcastData = [] }) => {
	const settings = {
    	dots: true,
    	infinite: false,
    	speed: 300,
    	arrows: false,
    	slidesToShow: 2,
    	slidesToScroll: 2,
    	responsive: [{
    			breakpoint: 768,
    			settings: {
    				slidesToShow: 1,
    				slidesToScroll: 1,
    				infinite: true,
    				dots: true
    			}
    		},
    	]
    };

    const liveTime = (time) => {
      return time.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5:$6");
    };

  return (
    <>
      {
        latestPodcastData && latestPodcastData.length ?
         <>
          <div className="latest_podcast">
            <h2 className="latest_podcast_title">लेटेस्ट पोडकास्ट</h2>
            <div
              className="podcast_container latest_podcast_slider slick-initialized slick-slider slick-dotted"
            >
              <div className="slick-list draggable">
                  <Slider className="slick-track" {...settings}>
                    {
                      latestPodcastData.map((ele, key) => {
                        return (
                          <div
                            className="latest_podcast_row"
                            key={"latestPodcastData"+key}
                          >
                            <div className="latest_podcast_left">
                              <figure>
                                <LazyLoadImage
                                  width={320}
                                  height={180}
                                  src={ele?.thumbnail || ele?.images?.url}
                                  alt="news18"
                                  title={ele.title || ele?.display_headline}
                                />
                              </figure>
                              {/* <img
                                src={imageLoader(ele?.thumbnail || ele?.images?.url, 320, 180)}
                                alt="news18"
                                title={ele.title || ele?.display_headline}
                              /> */}
                            </div>
                            <div className="latest_podcast_right">
                              <ul className="time_location">
                                <li>{moment(liveTime(ele?.created_at.toString())).tz("Asia/Kolkata").format("MMMM DD, YYYY, HH:mm a")}</li>
                              </ul>
                              <h2>
                                <a
                                  href={ele?.url || ele?.weburl}
                                >
                                  {ele?.title || ele?.display_headline}
                                </a>
                              </h2>
                            </div>
                          </div>
                        );
                      })
                    }
                  </Slider>
              </div>
            </div>
          </div>
          <style jsx global>{`
            /* devanagari */
            @font-face {
              font-family: "Khand";
              font-style: normal;
              font-weight: 500;
              font-display: swap;
              src: local("Khand Medium"), local("Khand-Medium"),
                url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKhcWExbQe3_w.woff2)
                  format("woff2");
              unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
                U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
            }
            /* latin-ext */
            @font-face {
              font-family: "Khand";
              font-style: normal;
              font-weight: 500;
              font-display: swap;
              src: local("Khand Medium"), local("Khand-Medium"),
                url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKhcWE-bQe3_w.woff2)
                  format("woff2");
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
                U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
              font-family: "Khand";
              font-style: normal;
              font-weight: 500;
              font-display: swap;
              src: local("Khand Medium"), local("Khand-Medium"),
                url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKhcWEwbQc.woff2)
                  format("woff2");
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
                U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
                U+2212, U+2215, U+FEFF, U+FFFD;
            }
            /* devanagari */
            @font-face {
              font-family: "Khand";
              font-style: normal;
              font-weight: 600;
              font-display: swap;
              src: local("Khand SemiBold"), local("Khand-SemiBold"),
                url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKNdmExbQe3_w.woff2)
                  format("woff2");
              unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
                U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
            }
            /* latin-ext */
            @font-face {
              font-family: "Khand";
              font-style: normal;
              font-weight: 600;
              font-display: swap;
              src: local("Khand SemiBold"), local("Khand-SemiBold"),
                url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKNdmE-bQe3_w.woff2)
                  format("woff2");
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
                U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
              font-family: "Khand";
              font-style: normal;
              font-weight: 600;
              font-display: swap;
              src: local("Khand SemiBold"), local("Khand-SemiBold"),
                url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKNdmEwbQc.woff2)
                  format("woff2");
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
                U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
                U+2212, U+2215, U+FEFF, U+FFFD;
            }

            /* devanagari */
            @font-face {
              font-family: "Khand";
              font-style: normal;
              font-weight: 700;
              font-display: swap;
              src: local("Khand Bold"), local("Khand-Bold"),
                url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bLpd2ExbQe3_w.woff2)
                  format("woff2");
              unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
                U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
            }
            /* latin-ext */
            @font-face {
              font-family: "Khand";
              font-style: normal;
              font-weight: 700;
              font-display: swap;
              src: local("Khand Bold"), local("Khand-Bold"),
                url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bLpd2E-bQe3_w.woff2)
                  format("woff2");
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
                U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
              font-family: "Khand";
              font-style: normal;
              font-weight: 700;
              font-display: swap;
              src: local("Khand Bold"), local("Khand-Bold"),
                url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bLpd2EwbQc.woff2)
                  format("woff2");
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
                U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
                U+2212, U+2215, U+FEFF, U+FFFD;
            }
            .latest_podcast {
              width: 100%;
              background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/latest_podcast_bg_1591686542.png);
              float: left;
              background-size: cover;
              height: 300px;
              display: flex;
              align-items: center;
              position: relative;
              margin: 30px 0;
            }
            .latest_podcast_title {
              position: absolute;
              top: -12px;
              left: 0;
              right: 0;
              margin: auto;
              text-align: center;
              display: inline-block;
              width: 245px;
              height: 53px;
              background: #fff;
              border-radius: 10px;
              font-family: "Khand", sans-serif;
              line-height: 66px;
              letter-spacing: 0px;
              color: #eb3d3c;
              font-size: 36px;
              font-weight: bold;
            }
            .latest_podcast .podcast_container {
              display: block;
              margin-top: 81px;
            }
            .podcast_container.latest_podcast_slider {
              overflow: hidden;
            }
            .latest_podcast .podcast_container {
              display: block;
            }
            .latest_podcast .podcast_container {
              display: flex;
            }
            .podcast_container {
              margin: auto;
              max-width: 1245px;
              padding: 0 10px;
              position: relative;
              clear: both;
              margin-bottom: 30px;
            }
            .latest_podcast_slider ul.slick-dots {
              display: block;
              width: 100%;
              text-align: center;
              margin-top: 20px;
            }
            .latest_podcast_slider ul.slick-dots li {
              display: inline-block;
              margin-right: 10px;
            }
            .latest_podcast_slider ul.slick-dots li.slick-active button {
              background: #eb3d3c;
              border-color: #eb3d3c;
              border: 2px solid rgba(0, 0, 0, 0.3);
            }
            .latest_podcast_slider ul.slick-dots li button {
              border: 0;
              font-size: 0px;
              width: 15px;
              height: 15px;
              // border: 1px #000 solid;
              border-radius: 100px;
              background: #eb3d3c;
              padding: 0;
              margin: 0;
            }
            button {
              background: #ed1b24;
              color: #fff;
              padding: 10px 20px;
              color: #fff;
              font-size: 13px;
              border: none;
              cursor: pointer;
              text-transform: uppercase;
            }
            .latest_podcast_slider .slick-track {
              display: flex;
              padding-bottom : 20px;
            }
            .latest_podcast_row:nth-child(1) {
              margin-left: 0;
            }
            .latest_podcast_row {
              display: flex  !important;
              margin: 0 10px;
            }
            .latest_podcast_right {
              width: 53%;
              min-height: 180px;
              background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/latest_podcast_icon_1591695161.png);
              color: #fff;
              padding: 10px;
              box-sizing: border-box;
              padding-right: 0;
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
              left: -19px;
              position: relative;
              padding-left: 24px;
              height: 100%;
            }
            .latest_podcast_right ul.time_location {
              color: #fff;
              padding-bottom: 10px;
            }
            ul.time_location {
              display: flex;
              align-items: center;
              list-style: none;
              letter-spacing: -0.24px;
              color: #696969;
              text-transform: uppercase;
              font-size: 12px;
              font-weight: normal;
              padding: 0;
              padding-top: 5px;
            }
            .latest_podcast_right ul.time_location li {
              padding-left: 12px;
              padding-right: 8px;
              font-family: "Noto Sans", sans-serif;
            }
            ul.time_location li {
              position: relative;
              padding-left: 10px;
              padding-right: 15px;
            }
            ul.time_location li::after {
              width: 6px;
              height: 6px;
              content: "";
              position: absolute;
              left: 0;
              background: #eb3d3c 0% 0% no-repeat padding-box;
              border-radius: 10px;
              top: 6px;
            }
            .latest_podcast_right h2 {
              letter-spacing: -0.36px;
              color: #ffffff;
              font-size: 18px;
              line-height: 32px;
              font-family: "Noto Sans", sans-serif;
            }
            .latest_podcast_right::after {
              content: "";
              position: absolute;
              width: 40px;
              height: 40px;
              margin: auto;
              left: -28px;
              border-radius: 100px;
              background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/podcast_icon_1591679506.png)
                #eb3d3c;
              background-size: 15px;
              background-repeat: no-repeat;
              background-position: center;
              top: 50%;
              transform: translateY(-50%);
            }
            .latest_podcast_right h2 a {
              color: #fff;
            }
            .latest_podcast_left img {
              height: 100%;
              width: 100%;
              display: block;
              border-radius: 10px;
              object-fit: cover;
            }
            .latest_podcast .slick-dots {
              bottom: 0px;
            }
            .latest_podcast .slick-dots li button::before {
              font-size: 0px;
            }

            @media screen and (max-width: 768px) {
              .latest_podcast_title {
                font-size: 22px;
                width: 150px;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
              }
              .latest_podcast_right ul.time_location {
                padding-bottom: 0;
              }
              .latest_podcast_right h2 {
                font-size: 14px;
                // height: 54px;
                overflow: hidden;
                line-height: 25px;
                font-weight: 300;
              }
              .latest_podcast_right::after {
                width: 20px;
                height: 20px;
                background-size: 8px;
                left: -12px;
                top: 50%;
              }
              .latest_podcast_left {
                width: 45%;
              }
              .latest_podcast_right ul.time_location li {
                font-size: 10px;
              }
              .latest_podcast_right {
                width: 55%;
                padding-right: 10px;
                padding-left: 18px;
                left: 0;
                margin-left: -13px;
                height: auto;
                min-height: 120px;
              }
              .latest_podcast {
                height: auto;
                display: block;
              }
              .latest_podcast_row {
                width: 104%;
                margin: 0;
                transform: translateX(-49%);
                position: relative;
                left: 50%;
              }
              .latest_podcast .podcast_container {
                margin-top: 5px;
                margin-bottom: 10px;
              }
              .latest_podcast_slider .slick-track {
                padding-bottom: 10px;
              }
            }

            @media screen and (max-width: 470px) { 
              .latest_podcast_slider .slick-track {
                padding-bottom: 20px;
              }
              .latest_podcast_slider ul.slick-dots li {
                margin-right: 5px;
              }
            }
          `}</style>
         </> : ''
      }
    </>
  );
};

export default PodcastSlider;
