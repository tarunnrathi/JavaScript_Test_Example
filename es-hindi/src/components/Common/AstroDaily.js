import { currentDate } from "includes/article.util";

const AstroDaily = ({ isMobile = false, isAmp = false, astroDataAmp = {} }) => {
  let panchangAmp, suntimeAmp;

  if (isAmp) {
    const [day, month, year] = currentDate().split("/");
    if (astroDataAmp) {
      panchangAmp =
        astroDataAmp?.["hindi"]?.[year]?.[month]?.[day]?.["today_panchang"];
      suntimeAmp =
        astroDataAmp?.["hindi"]?.[year]?.[month]?.[day]?.["sun_moon_time"]?.[
        "sunrise_time"
        ];
    }
  }

  const data = isAmp ? { panchang: panchangAmp, suntime: suntimeAmp } : { panchang: astroDataAmp?.today_panchang, suntime: astroDataAmp?.sun_moon_time?.sunrise_time };

  return (
    <>
      <div className="clearfix vsp20"></div>
      <div className="today_panchang">
        <div className="astro-rgtroundicon">
          <span className="side_icon-sprite panchang"></span>
        </div>
        <p className="panchan_title">आज का पंचांग</p>
        {!isMobile && !isAmp ? (
          <div className="panchan_info">
            <p>
              <strong>सूर्योदय</strong>:
              <span>{data?.suntime || "..."}</span>
            </p>
            <p>
              <strong>तिथि</strong>:
              <span>{data?.panchang?.["today_date"] || "..."}</span>
            </p>
            <p>
              <strong>नक्षत्र</strong>:
              <span>{data?.panchang?.["today_nakshatra"] || "..."}</span>
            </p>
            <p>
              <strong>करण</strong>:{" "}
              <span>{data?.panchang?.["today_karan"] || "..."}</span>
            </p>
            <p>
              <strong>पक्ष</strong>:
              <span>{data?.panchang?.["today_paksh"] || "..."}</span>
            </p>
            <p>
              <strong>योग</strong>:
              <span>{data?.panchang?.["today_yog"] || "..."}</span>
            </p>
            <p>
              <strong>वार</strong>:
              <span>{data?.panchang?.["today_day"] || "..."}</span>
            </p>
          </div>
        ) :
          <div className="panchan_info">
            <p>
              <strong>सूर्योदय</strong>:
              <span>{data?.suntime || "..."}</span>
            </p>
            <p>
              <strong>तिथि</strong>:
              <span>{data?.panchang?.["today_date"] || "..."}</span>
            </p>
            <p>
              <strong>नक्षत्र</strong>:
              <span>{data?.panchang?.["today_nakshatra"] || "..."}</span>
            </p>
          </div>}
        <div className="clearfix vsp15"></div>
        <a
          href={`/astrology/todays-panchang-in-hindi-${currentDate().replace(
            /\//gi,
            "-"
          )}/`}
          className="astromore"
        >
          <span>और भी पढ़ें</span>{" "}
        </a>
        <div className="clearfix vsp20"></div>
      </div>
      <div className="clearfix vsp20"></div>

      <style jsx global>{`
        .astromore span {
          position: relative;
          color: #e82d2e;
          font-size: 16px;
          padding-right: 10px;
        }
        .today_panchang{width:100%;float:left;padding-bottom:15px;background:#f7f7f7 0 0 no-repeat padding-box;position:relative;box-shadow:5px 5px 0 #0000001A;border-radius:10px;margin-top:60px}.astro-rgtroundicon{width:80px;height:80px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:100%;position:relative;top:-40px;margin:auto;box-shadow:inset 1px -1px 0 #ccc}.side_icon-sprite.panchang{width:35px;height:35px;background-position:-10px -86px}.panchan_title{letter-spacing:-.48px;color:#f94746;font-size:24px;text-align:center;font-family:Khand;font-weight:500;margin:-25px 0 0 0}.panchan_info{width:100%;padding:0 20px;box-sizing:border-box}.panchan_info p{display:flex;font-size:15px;color:#666;align-items:center;border-bottom:1px #dbdbdb dotted;padding:15px 0}.panchan_info p strong{color:#666;padding-right:20px;width:45px}.panchan_info p span{padding-left:20px}.side_icon-sprite{background:url(https://hindi.news18.com/astrology/images/sideicon_sprites.png) 0 0 no-repeat}.side_icon-sprite.panchang{width:35px;height:35px;background-position:-10px -86px}.today_panchang a.astromore{font-family:'Noto Sans',Roboto,sans-serif;text-align:center;margin:auto;display:block;padding-top:15px}
        .panchan_info p strong {
          box-sizing: content-box;
        }

        @media screen and (max-width: 768px) {
          .vsp15 {
            margin: 0 0 15px 0;
          }
          .today_panchang {
            box-shadow: none;
            padding-bottom: 20px;
            margin-bottom: 15px;
          }
          .astromore span:after, .astromore span:before {
            display: block;
            position: absolute;
            content: "";
          }
          .astromore span:before {
            width: 6px;
            height: 2px;
            background: #e82d2e;
            right: -2px;
            top: 50%;
            transform: translateY(-50%);
          }
          .astromore span:after {
            border-right: 2px solid #e82d2e;
            border-top: 2px solid #e82d2e;
            width: 4px;
            height: 4px;
            transform: rotate(45deg) translateY(-69%);
            top: 50%;
            right: -1px;
          }
        }
      `}</style>
    </>
  );
};

export default AstroDaily;
