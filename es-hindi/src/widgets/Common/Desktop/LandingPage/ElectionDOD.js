import Slider from "react-slick";

function Election_photos({ DODData }) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dotsClass: "button__bar",
    arrows: false,
  };
  if (DODData == []|| DODData == undefined||DODData == "") {
    return null;
  }

  return (
    <>
      <div className="stel-battlenews">
        <div className="stel-battlenews-slider">
          <span>{"लोकतंत्र का उत्सव"}</span>
          <Slider {...settings}>
            {DODData.map((data, i) => {
              return (
                <div key={i} className="slider-st">
                  <a href={data.weburl ? data.weburl : " "} target="_blank">
                    {data.headline ? data.headline : ''}
                  </a>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <style jsx>{`
        .elec-left {
          float: left;
          width: calc(100% - 320px);
        }
        .stel-btmphtvdlist{margin-bottom:10px}
        .elec-glblhd {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 18px;
          color: #e1261c;
          font-weight: 500;
        }
        .elec-glblhd a {
          display: flex;
          color: #e1261c;
          text-transform: uppercase;
          align-items: center;
        }
        .elec-glblhd a span {
          margin-left: 5px;
          color: #001d42;
          position: relative;
        }
        .elec-glblhd a span:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          background: #e1261c;
          bottom: -3px;
          left: 0;
        }
        .ls-listingstory-more {
          position: relative;
          display: block;
          margin: 20px 0 0 0;
          text-align: center;
          text-decoration: none;
        }
        .ls-listingstory-more span {
          background: #fff;
          padding: 0 30px;
          text-transform: uppercase;
          color: #e1261c;
          position: relative;
          z-index: 1;
          text-align: center;
          font-weight: bold;
          font-size: 12px;
          top: -10px;
        }
        .ls-listingstory-more:before,
        .ls-listingstory-more:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: #cccccc;
        }
        .ls-listingstory-more:before {
          top: 3px;
        }
        .ls-listingstory-more span:before,
        .ls-listingstory-more span:after {
          content: "";
          position: absolute;
          top: 1px;
          width: 3px;
          height: 15px;
          border-left: 1px solid #cccccc;
          border-right: 1px solid #cccccc;
          transform: rotate(20deg);
          display: block;
        }
        .ls-listingstory-more span:before {
          left: 10px;
        }
        .ls-listingstory-more span:after {
          right: 10px;
        }
        .middlead {
          display: flex;
          justify-content: center;
          line-height: 0;
        }
      `}</style>
    </>
  );
}

export default Election_photos;
