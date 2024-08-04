import { memo, useEffect, useState } from "react";

const moment = require("moment");

import Glide from '@glidejs/glide';

const RhsAstroPhoto = ({ astroStories = {} }) => {
  const [aapkiraskiContent, setAapkiraskiContent] = useState(astroStories['Aries'] || '');
  const [rashi, setRashi] = useState('Aries');
  const todayDate = moment().format("DD-MM-YYYY");

  useEffect(() => {
    new Glide('.rashifal-horoscope-sldier2', {
      startAt: 0,
      perView: 3,
      slidesToScroll: 3,
      gap: 5,
      slidesToShow: 3,
    }).mount();
  }, []);

  const getrashidata = (event, rashi, rashiSequence) => {
    if (astroStories) {
      document.querySelector(".brdract").classList.remove("brdract");
      document.querySelector(`#${rashi}`).classList.add("brdract");
      setAapkiraskiContent(astroStories[rashi] || "");
      setRashi(rashi);
    }
  };

  return (
    <>
      <div className="aapkiraski">
        <h2 className="ph_heading">
          <a href="/news/astro/aries/">राशिभविष्य</a>
        </h2>
        <div className="rashifal-horoscope-sldier2 glide--ltr glide--slider glide--swipeable">
          <div className="glide__track" data-glide-el="track">
            <div
              className="glide__slides"
            // style="transition: transform 0ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s; width: 1140px; transform: translate3d(-95px, 0px, 0px);"
            >
              <div
                className="cursor-pointer brdract"
                id="Aries"
                onClick={(event) => getrashidata(event, 'Aries', 1)}
              >
                <figure>
                  <em className="astro-iconsprite aries" alt="मेष" title="मेष"></em>
                </figure>
                <p>मेष</p>
              </div>
              <div
                className="cursor-pointer"
                id="Taurus"
                onClick={(event) => getrashidata(event, 'Taurus', 1)}
              >
                <figure>
                  <em
                    className="astro-iconsprite taurus"
                    alt="वृषभ"
                    title="वृषभ"
                  ></em>
                </figure>
                <p>वृषभ</p>
              </div>
              <div
                className="cursor-pointer"
                id="Gemini"
                onClick={(event) => getrashidata(event, 'Gemini', 1)}
              >
                <figure>
                  <em
                    className="astro-iconsprite gemini"
                    alt="मिथुन"
                    title="मिथुन"
                  ></em>
                </figure>
                <p>मिथुन</p>
              </div>
              <div
                className="cursor-pointer"
                id="Cancer"
                onClick={(event) => getrashidata(event, 'Cancer', 2)}
              >
                <figure>
                  <em
                    className="astro-iconsprite cancer"
                    alt="कर्क"
                    title="कर्क"
                  ></em>
                </figure>
                <p>कर्क</p>
              </div>
              <div
                className="cursor-pointer"
                id="Leo"
                onClick={(event) => getrashidata(event, 'Leo', 3)}
              >
                <figure>
                  <em className="astro-iconsprite leo" alt="सिंह" title="सिंह"></em>
                </figure>
                <p>सिंह</p>
              </div>
              <div
                className="cursor-pointer"
                id="Virgo"
                onClick={(event) => getrashidata(event, 'Virgo', 4)}
              >
                <figure>
                  <em
                    className="astro-iconsprite virgo"
                    alt="कन्या"
                    title="कन्या"
                  ></em>
                </figure>
                <p>कन्या</p>
              </div>
              <div
                className="cursor-pointer"
                id="Libra"
                onClick={(event) => getrashidata(event, 'Libra', 5)}
              >
                <figure>
                  <em
                    className="astro-iconsprite libra"
                    alt="तुला"
                    title="तुला"
                  ></em>
                </figure>
                <p>तुला</p>
              </div>
              <div
                className="cursor-pointer"
                id="Scorpio"
                onClick={(event) => getrashidata(event, 'Scorpio', 6)}
              >
                <figure>
                  <em
                    className="astro-iconsprite scorpio"
                    alt="वृश्चिक"
                    title="वृश्चिक"
                  ></em>
                </figure>
                <p>वृश्चिक</p>
              </div>
              <div
                className="cursor-pointer"
                id="Sagittarius"
                onClick={(event) => getrashidata(event, 'Sagittarius', 7)}
              >
                <figure>
                  <em
                    className="astro-iconsprite sagittarius"
                    alt="धनु"
                    title="धनु"
                  ></em>
                </figure>
                <p>धनु</p>
              </div>
              <div
                className="cursor-pointer"
                id="Capricorn"
                onClick={(event) => getrashidata(event, 'Capricorn', 8)}
              >
                <figure>
                  <em
                    className="astro-iconsprite capricorn"
                    alt="मकर"
                    title="मकर"
                  ></em>
                </figure>
                <p>मकर</p>
              </div>
              <div
                className="cursor-pointer"
                id="Aquarius"
                onClick={(event) => getrashidata(event, 'Aquarius', 9)}
              >
                <figure>
                  <em
                    className="astro-iconsprite aquarius"
                    alt="कुंभ"
                    title="कुंभ"
                  ></em>
                </figure>
                <p>कुंभ</p>
              </div>
              <div
                className="cursor-pointer"
                id="Pisces"
                onClick={(event) => getrashidata(event, 'Pisces', 10)}
              >
                <figure>
                  <em
                    className="astro-iconsprite pisces"
                    alt="मीन"
                    title="मीन"
                  ></em>
                </figure>
                <p>मीन</p>
              </div>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
              <button
                className="glide__arrow glide__arrow--left"
                data-glide-dir="<"
              >
                prev
              </button>
              <button
                className="glide__arrow glide__arrow--right"
                data-glide-dir=">"
              >
                next
              </button>
            </div>
          </div>
        </div>

        <div id="getrashi-data" className="rashifal-horoscope-tabs-right">
          <div className="aapkiraski_content">{aapkiraskiContent}{" "}
            <a
              href="https://buy.astrosage.com/service/ask-a-question?language=hi&amp;prtnr_id=AQN18"
              rel="nofollow"
            >
              प्रश्न पूछ
            </a>{" "}
            सकते हैं या अपनी{" "}
            <a
              href="https://buy.astrosage.com/service/astrosage-brihat-horoscope?language=hi&amp;prtnr_id=BKN18"
              rel="nofollow"
            >
              कुंडली
            </a>{" "}
            बनवा सकते हैं ।
          </div>
          <a
            href={`/astrology/horoscope/todays-${rashi}-horoscope-in-hindi-${todayDate}`}
            className="astromore"
          >
            <span>और भी पढ़ें</span>{" "}
          </a>
        </div>
      </div>
      <style jsx global>{`
        .astromore span:after,
        .astromore span:before {
          display: block;
          position: absolute;
          content: "";
        }
        .astromore span:after {
          border-right: 2px solid #e82d2e;
          border-top: 2px solid #e82d2e;
          width: 4px;
          height: 4px;
          transform: rotate(45deg);
          top: 8px;
          right: -4px;
        }
        .aapkiraski a.astromore {
          font-family: "Noto Sans", Roboto, sans-serif;
          text-align: center;
          margin: auto;
          display: block;
          padding-top: 15px;
        }
        ul.aapkiraski_airtcal li:last-child {
          padding-bottom: 20px;
        }
        .aapkiraski h2.ph_heading {
          color: #111;
          font-size: 16px;
          font-weight: 700;
          line-height: 28px;
          flex-shrink: 0;
          margin-right: 20px;
          text-transform: uppercase;
        }
        ul.rashi-select-dropdown {
          display: none;
          position: absolute;
          background: #f7f7f7 0 0 no-repeat padding-box;
          box-shadow: 3px 3px 3px #00000029;
          border-radius: 0 0 10px 10px;
          width: 100%;
          box-sizing: border-box;
          letter-spacing: 0;
          color: #707070;
          z-index: 1;
        }
        a.rashi-select {
          width: 100px;
          display: block;
          letter-spacing: -0.52px;
          color: #eb3d3c;
          font-size: 26px;
          font-family: Khand, sans-serif;
          font-weight: 500;
          -webkit-appearance: none;
          position: relative;
          background: 0 0;
        }
        ul.rashi-select-dropdown li a {
          letter-spacing: 0;
          color: #707070;
          font-size: 14px;
          padding: 8px 10px;
          display: block;
        }
        ul.rashi-select-dropdown li a:hover {
          background: #e6403e;
          color: #fff;
        }
        .aapkiraski {
          height: 340px; 
          overflow: hidden;
          width: 100%;
          // float: left;
          box-sizing: border-box;
          padding: 10px;
          padding-bottom: 15px;
          background: #f7f7f7 0 0 no-repeat padding-box;
          position: relative;
          box-shadow: 5px 5px 0 #0000001a;
          border-radius: 10px;
        }
        .rashifal-horoscope-sldier2 figure {
          width: 80px;
          height: 80px;
          border-radius: 100%;
          margin: auto auto 10px auto;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050c2c;
        }
        .astro-iconsprite.aquarius {
          background-position: 0 0 !important;
        }
        .astro-iconsprite.aries {
          background-position: -86px 0 !important;
        }
        .astro-iconsprite.cancer {
          background-position: -173px 0 !important;
        }
        .astro-iconsprite.capricorn {
          background-position: -257px 0 !important;
        }
        .astro-iconsprite.gemini {
          background-position: -344px 0 !important;
        }
        .astro-iconsprite.leo {
          background-position: -429px 0 !important;
        }
        .astro-iconsprite.libra {
          background-position: -516px 0 !important;
        }
        .astro-iconsprite.pisces {
          background-position: -603px 0 !important;
        }
        .astro-iconsprite.sagittarius {
          background-position: -690px 0 !important;
        }
        .astro-iconsprite.scorpio {
          background-position: -772px 0 !important;
        }
        .astro-iconsprite.taurus {
          background-position: -860px 0 !important;
        }
        .astro-iconsprite.virgo {
          background-position: -946px 0 !important;
        }
        .rashifal-horoscope-sldier2 {
          position: relative;
          width: 100%;
        }
        .rashifal-horoscope-sldier2 .glide_track {
          overflow: hidden;
        }
        .rashifal-horoscope-sldier2 .glideslides {
          box-sizing: border-box;
          padding: 5px;
          display: flex;
          overflow: hidden;
          align-items: center;
          justify-content: center;
        }
        .rashifal-horoscope-sldier2 .glideslides p {
          text-align: center;
          letter-spacing: -0.56px;
          color: #222;
          font-size: 24px;
          font-family: Khand, sans-serif;
          font-weight: 500;
        }
        .rashifal-horoscope-sldier2 a.glideslide--active figure:before {
          content: "";
          position: absolute;
          top: -4px;
          right: -4px;
          bottom: -4px;
          left: -4px;
          border: 2px solid #da4432;
          border-radius: 100%;
        }
        .rashifal-horoscope-sldier2 button.glidearrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          border: 0;
          font-size: 0;
          cursor: pointer;
          background: 0 0;
        }
        .rashifal-horoscope-sldier2 button.glidearrow:after {
          border-right: 3px solid #f94746;
          border-top: 3px solid #f94746;
          width: 9px;
          height: 9px;
          transform: rotate(45deg);
          top: 23px;
          right: 10px;
          content: "";
          position: absolute;
        }
        .rashifal-horoscope-sldier2 button.glidearrow.glidearrow--left:after {
          transform: rotate(-138deg);
          right: 5px;
        }
        .rashifal-horoscope-sldier2 button.glidearrow.glidearrow--right {
          right: 0;
          border-radius: 5px 0 0 5px;
        }
        .rashifal-horoscope-sldier2 figure em {
          display: block;
          width: 85px;
          height: 90px;
          transform: scale(0.7);
          background: url(https://images.news18.com/ibnkhabar/uploads/assests/images/astroicons-sprite-white.png)
            0 0 no-repeat;
        }
        .rashifal-horoscope-sldier2 .glidearrows {
          position: absolute;
          top: -45px;
          right: 0;
          width: 22px;
        }
        .aapkiraski_select {
          width: auto;
          position: relative;
          display: inline-block;
          padding-right: 30px;
        }
        .aapkiraski_select select {
          width: 100px;
          display: block;
          letter-spacing: -0.52px;
          color: #eb3d3c;
          font-size: 26px;
          font-family: Khand, sans-serif;
          font-weight: 500;
          -webkit-appearance: none;
          position: relative;
          background: 0 0;
        }
        .aapkiraski_select:after {
          content: "";
          display: block;
          position: relative;
          top: -48px;
          right: -47px;
          width: 10px;
          height: 10px;
          border-right: 2px solid #da4432;
          border-bottom: 2px solid #da4432;
          transform: rotate(45deg);
        }
        .aapkiraski_select span {
          letter-spacing: -0.22px;
          color: #707070;
          font-size: 11px;
          font-family: "Noto Sans", Roboto, sans-serif;
          font-weight: 600;
        }
        .aapkiraski_content {
          letter-spacing: -0.28px;
          color: #666;
          font-size: 14px;
          line-height: 24px;
          font-family: "Noto Sans", Roboto, sans-serif;
          padding-bottom: 15px;
          border-top: 1px solid rgba(112, 112, 112, 0.3);
          padding-top: 10px;
        }
        ul.aapkiraski_airtcal li a {
          display: flex;
        }
        ul.aapkiraski_airtcal li figure img {
          width: 90px;
          height: 60px;
          border-radius: 10px;
        }
        ul.aapkiraski_airtcal li h2 {
          letter-spacing: -0.3px;
          color: #666;
          font-size: 15px;
          line-height: 20px;
          padding-left: 10px;
          font-weight: 400;
        }
        ul.aapkiraski_airtcal li {
          font-family: "Noto Sans", Roboto, sans-serif;
          padding-bottom: 30px;
        }
        ul.aapkiraski_airtcal {
          border-bottom: 1px solid rgba(112, 112, 112, 0.3);
        }
        .astromore span:after,
        .astromore span:before {
          display: block;
          position: absolute;
          content: "";
        }
        .astromore span:after {
          border-right: 2px solid #e82d2e;
          border-top: 2px solid #e82d2e;
          width: 4px;
          height: 4px;
          transform: rotate(45deg);
          top: 8px;
          right: -4px;
        }
        .aapkiraski a.astromore {
          font-family: "Noto Sans", Roboto, sans-serif;
          text-align: center;
          margin: auto;
          display: block;
          padding-top: 15px;
        }
        ul.aapkiraski_airtcal li:last-child {
          padding-bottom: 20px;
        }
        .aapkiraski h2.ph_heading {
          color: #111;
          font-size: 16px;
          font-weight: 700;
          line-height: 28px;
          flex-shrink: 0;
          margin-right: 20px;
          text-transform: uppercase;
        }
        ul.rashi-select-dropdown {
          display: none;
          position: absolute;
          background: #f7f7f7 0 0 no-repeat padding-box;
          box-shadow: 3px 3px 3px #00000029;
          border-radius: 0 0 10px 10px;
          width: 100%;
          box-sizing: border-box;
          letter-spacing: 0;
          color: #707070;
          z-index: 1;
        }
        a.rashi-select {
          width: 100px;
          display: block;
          letter-spacing: -0.52px;
          color: #eb3d3c;
          font-size: 26px;
          font-family: Khand, sans-serif;
          font-weight: 500;
          -webkit-appearance: none;
          position: relative;
          background: 0 0;
        }
        ul.rashi-select-dropdown li a {
          letter-spacing: 0;
          color: #707070;
          font-size: 14px;
          padding: 8px 10px;
          display: block;
        }
        ul.rashi-select-dropdown li a:hover {
          background: #e6403e;
          color: #fff;
        }
        .rashifal-horoscope-sldier2 .brdract figure:before {
          content: "";
          position: absolute;
          top: -4px;
          right: -4px;
          bottom: -4px;
          left: -4px;
          border: 2px solid #da4432;
          border-radius: 100%;
        }
        .astromore span {
          position: relative;
          color: #e82d2e;
          font-size: 16px;
          padding-right: 10px;
        }
        .rashifal-horoscope-sldier2 button.glide_arrow {
          padding: 0;
        }
        .aapkiraski_content {
          height: 105px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .rashifal-horoscope-sldier2 .brdract figure:before {
          content: "";
          position: absolute;
          top: -4px;
          right: -4px;
          bottom: -4px;
          left: -4px;
          border: 2px solid #da4432;
          border-radius: 100%;
        }
        .rashifal-horoscope-sldier2 .glide__arrows {
          position: absolute;
          top: -45px;
          right: 0;
          width: 22px;
        }
        .rashifal-horoscope-sldier2 button.glide__arrow {
          padding: 0;
        }
        .rashifal-horoscope-sldier2 button.glide__arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          border: 0;
          font-size: 0;
          cursor: pointer;
          background: 0 0;
        }
        .rashifal-horoscope-sldier2 button.glide__arrow.glide__arrow--left:after {
          transform: rotate(-138deg);
          right: 5px;
        }
        .rashifal-horoscope-sldier2 button.glide__arrow:after {
          border-right: 3px solid #f94746;
          border-top: 3px solid #f94746;
          width: 9px;
          height: 9px;
          transform: rotate(45deg);
          top: 23px;
          right: 10px;
          content: "";
          position: absolute;
        }
        .rashifal-horoscope-sldier2 button.glide__arrow.glide__arrow--right {
          right: 0;
          border-radius: 5px 0 0 5px;
        }
        .rashifal-horoscope-sldier2 button.glide__arrow {
          padding: 0;
        }
        .rashifal-horoscope-sldier2 button.glide__arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          border: 0;
          font-size: 0;
          cursor: pointer;
          background: 0 0;
        }
        .rashifal-horoscope-sldier2 button.glide__arrow:after {
          border-right: 3px solid #f94746;
          border-top: 3px solid #f94746;
          width: 9px;
          height: 9px;
          transform: rotate(45deg);
          top: 23px;
          right: 10px;
          content: "";
          position: absolute;
        }
        .glide__slides {
          display: flex;
        }
        .glide__track {
          overflow: hidden;
          padding: 20px 0 0;
        }
        .rashifal-horoscope-sldier2 .glide__slides p {
          text-align: center;
          letter-spacing: -.56px;
          color: #222;
          font-size: 24px;
          font-family: Khand,sans-serif;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};
export default memo(RhsAstroPhoto);
