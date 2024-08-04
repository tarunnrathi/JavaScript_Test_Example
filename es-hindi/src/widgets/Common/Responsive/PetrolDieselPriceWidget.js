import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import dateFormat from "dateformat";
import { getPetrolDieselPrices } from "api/global/Common";
import LazyLoadImage from "components/Common/CustomImage";

const petrol_diesel_Arr = [
  {
    id: 1,
    base: "Petrol / 1 Lt",
    key: "petrol",
    image_url: "/images/petrol_diesel/petrol_icon.png",
    diff_key: "petrol_diff",
  },
  {
    id: 2,
    base: "Diesel / 1 Lt",
    key: "diesel",
    image_url: "/images/petrol_diesel/diesel_icon.png",
    diff_key: "diesel_diff",
  },
  {
    id: 3,
    base: "Gold / 1 gm",
    key: "gold_22_carat",
    image_url: "/images/petrol_diesel/Gold_icon.png",
    diff_key: "gold_22_carat_diff",
    typeText: "22 K"
  },
  {
    id: 4,
    base: "Gold / 1 gm",
    key: "gold_24_carat",
    image_url: "/images/petrol_diesel/Gold_icon.png",
    diff_key: "gold_24_carat_diff",
    typeText: "24 K"
  },
  {
    id: 5,
    base: "Silver / 1 kg",
    key: "silver_1_kg",
    image_url: "/images/petrol_diesel/Silver_icon.png",
    diff_key: "silver_1_kg_diff",
    typeText: "Standard"
  },
  {
    id: 6,
    base: "Silver / 1 gm",
    key: "silver_1_gram",
    image_url: "/images/petrol_diesel/Silver_icon.png",
    diff_key: "silver_1_gram_diff",
    typeText: "Standard"
  },
];

const PetrolDieselPriceWidget = ({ isMobile=false, city = "", perView = 3, hi_subCategory = "", islocal18W = false, hi_category = "" }) => {
  const [priceData, setPriceData] = useState({});
  useEffect(() => {
    if (city) {
      getPetrolDieselPrices({ city: city })
        .then((data) => {
          if (data.length) {
            const timestampPriceDate = dateFormat(
              data[0].price_date,
              islocal18W? "dd mmm yyyy" : "dd-mmmm-yyyy"
            );
            setPriceData({ ...data[0], timestampPriceDate });
          }
        })
        .catch((error) => {
          setPriceData({});
          console.log(error);
        });
    }
  }, [city]);
  useEffect(() => {
    if (Object.keys(priceData).length) {
      try {
        new Glide(document.querySelector(".pdsldr"), {
          autoplay: 5000,
          type: "carousal",
          perView: perView,
          gap: 10,
          slidesToScroll: 1,
        }).mount();
      } catch (error) {
        console.log(error);
      }
    }
  }, [priceData]);

  if (Object.keys(priceData).length) {
    return (
      <>
        <div className="pdwrap">
          <div className="pdbox1">
            <LazyLoadImage src="/images/petrol_diesel/locicon.png" height={12} width={12} />
            <h3>{hi_subCategory || priceData.city_name}   {!isMobile && islocal18W ? <img src="/images/districts/downArrow.svg"/> : ""}</h3>
            <span style={{display: isMobile && islocal18W ? "inline" : "block"}}>{ hi_category ? <><span style={{marginRight: "4px"}}>{`(${hi_category})`}</span> {`${priceData.timestampPriceDate}`}</> : priceData.timestampPriceDate || ""}</span>
          </div>
          <div className="pdbox2">
            <div className="pdsldr">
              <div className="pdsldrin" data-glide-el="track">
                <ul>
                  {petrol_diesel_Arr.map((data) => (<>
                    <li key={data.id}>
                      <div className="tile">
                        <span className="tiicon">
                          <LazyLoadImage src={data.image_url} height={24} width={24} />

                        </span>
                        <div className="tidata">
                          <div className="tiline">
                              <h2>₹{priceData[data.key]} {data.typeText ? <span className="hdbyline">({data.typeText})</span> : ""} </h2>
                              {data.diff_key in priceData &&
                                priceData[data.diff_key] !== 0 && (
                                  <div
                                    className={`clrtab ${
                                      priceData[data.diff_key] >= 0 ? "green" : ""
                                    }`}
                                  >
                                    <span
                                      className={`arr_d ${
                                        priceData[data.diff_key] < 0 ? "" : "arr_u"
                                      }`}
                                    ></span>
                                    {priceData[data.diff_key]?.toFixed(2)}
                                  </div>
                                )}
                            </div>
                            <span className="tilrate">{data.base}</span>
                            {data.typeText ? <span className="hdbylinemob">({data.typeText})</span> : ""}
                            {data.diff_key in priceData &&
                                priceData[data.diff_key] !== 0 && (
                                  <div
                                    className={`clrtabmob ${
                                      priceData[data.diff_key] >= 0 ? "green" : ""
                                    }`}
                                  >
                                    <span
                                      className={`arr_d ${
                                        priceData[data.diff_key] < 0 ? "" : "arr_u"
                                      }`}
                                    ></span>
                                    {priceData[data.diff_key]?.toFixed(2)}
                                  </div>
                                )}
                        </div>
                      </div>
                      <div className="spons">
                        <span>Powered by</span>
                        <span>
                          <LazyLoadImage src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/moneycontrol_logo_1591703617.png" height={20} width={100} />
                        </span>
                      </div>
                    </li>
                    </>
                  ))}
                  {/* <li>
                      <div className="tile aq">
                        <span className="tiicon"><img src="/images/petrol_diesel/AQI_icon.png"/></span>
                        <div className="tidata">
                          <div className="tiline">
                            <h2>47</h2>
                          </div>
                          <span className="tilrate">(AQI-IN)</span>
                        </div>
                        <div className="mdbtn">Good</div>
                        <div className="aqimg"><img src="/images/petrol_diesel/Mgroup1.png"/></div>
                        <div className="mdbtn mdbtnmob">Good</div>
                      </div>
                      <div className="spons">
                        <span>Powered by</span>
                        <a href=""><img src="/images/petrol_diesel/PureLogic_icon.png"/></a>
                      </div>
                    </li> */}
                </ul>
              </div>
              <div data-glide-el="controls[nav]" className="teamsquadbulet">
                <button type="button" data-glide-dir="=0"></button>
                <button type="button" data-glide-dir="=1"></button>
                <button type="button" data-glide-dir="=2"></button>
                <button type="button" data-glide-dir="=3"></button>
                <button type="button" data-glide-dir="=4"></button>
                <button type="button" data-glide-dir="=5"></button>
              </div>
            </div>
          </div>
        </div>
        <style jsx global>
          {`
            .pdwrap {
              width: 100%;
              min-height: ${isMobile ? "210px" : "146px"}
              min-height: 146px;
              padding: 10px;
              display: flex;
              background-color: #efefef;
              margin-bottom: 20px;
            }
            .pdbox1 {
              width: ${islocal18W ? "25%" : "20%" };
              position: relative;
            }
            .pdbox2 {
              width: ${islocal18W ? "75%" : "80%" };
            }
            .pdbox1 img {
              display: inline-block;
            }
            .pdbox1 h3 {
              font-size: ${islocal18W && !isMobile ? "30px" : "17px" };
              line-height: 30px;
              display: inline-block;
              margin-left: 5px;
            }
            .pdbox1 span {
              font-size: 13px;
              line-height: 22px;
              color: #626262;
            }
            .pdbox1:after {
              content: "";
              border: 1px solid #dfdfdf;
              width: 0px;
              height: 100%;
              display: block;
              position: absolute;
              right: 0;
              top: 0;
              margin-right: 10px;
            }
            .pdsldr {
              position: relative;
              margin: 0;
            }
            .pdsldrin {
              overflow: hidden;
            }
            .pdsldr ul {
              display: flex;
              justify-content: start;
            }
            .pdsldr ul li {
              height: 100%;
              min-height: 1px;
              text-align: center;
              flex-shrink: 0;
            }
            .teamsquadbulet {
              display: flex;
              gap: 6px;
              justify-content: center;
              margin-top: 10px;
            }
            .teamsquadbulet button {
              width: 6px;
              height: 6px;
              background: #d6d6d6;
              border-radius: 3px;
              display: block;
              line-height: 20px;
              border: 0;
            }
            .teamsquadbulet button.glide__bullet--active {
              background: #ed1c24;
              border-radius: 3px;
              width: 17px;
              height: 6px;
            }
            .tile{display:flex;background:#fafafa;border:1px solid #dfdfdf;height:70px;padding:10px}
					.tiicon{flex-grow:0;min-width:46px;height:100%}
					.tidata{text-align:left;width: 100%;}
					.tidata h2{color:#0065a1;font-size:20px;flex-grow: 2;line-height: 14px;padding: 4px 0;}
					.tilrate{color:#5a5a5a;font-size:11px;font-weight:bold}		
          .clrtab, .clrtabmob{width:auto;height:22px;background-color:#e1261c;border-radius:4px;color:#fff;font-size:12px;text-align:center;padding:2px;display:flex;line-height:18px;     flex-grow: 0;}
					.clrtabmob {display: none;}
          .tiline {display: flex; justify-content: flex-start;}
					.hdbyline, .hdbylinemob { font-size: 12px; line-height: 14px; color: #000000;}	
          
          .aqimg {margin-top: -4px;}
					.aq .tidata {width: auto;}
					.aq .tidata h2 {color: #34A12B;}
					
					.whttemp .tidata {width: auto;}
					.whttemp .tilrate {color: #464646; font-weight: normal;}
					.whttemp .tidata h2 span {font-size: 16px;letter-spacing: -0.32px;color: #989898;}
					.mdwhth { display: block;justify-content: space-around; border-left: 1px solid #C7C7C7;   border-right: 1px solid #C7C7C7;margin: 0 10px;padding: 0 10px;}
					.tile.whttemp {justify-content: space-between;}
					.mdwhth img {width: 25px; height: 20px; display: block;margin: 0 auto 3px;}
					.mdwhth span {font-size: 11px; line-height: 14px; color: #464646;width: 100%;}
					.deg {display: flex; align-items: flex-end; margin: 2px 0 10px; justify-content: space-evenly;}
					.deg h3 { font-size: 16px;line-height: 14px; color: #0065A1;margin-right: 6px;}
					.deg h3 span {letter-spacing: -0.28px; color: #989898; font-size: 14px;line-height: 14px; font-weight: normal;}
					.deg .temp {font-size: 11px;line-height: 12px;color: #464646;}

					.arr_d{box-sizing:border-box;position:relative;transform:scale(var(--ggs,1));width:15px;height:17px}
					.arr_d::after,.arr_d::before{content:"";display:block;box-sizing:border-box;position:absolute;bottom:4px}
					.arr_d::after{width:6px;height:6px;border-bottom:2px solid;border-left:2px solid;transform:rotate(-45deg);left:5px}
					.arr_d::before{width:2px;height:8px;left:7px;background:currentColor}
					.spons{align-items:center;display:flex;margin-top:5px; justify-content: flex-end;}
					.spons span{display:block;font-size:10px;color:#8a8989;padding-right:6px;padding-bottom:4px;     border-right: 1px solid #919191; margin-right: 6px;}
					.spons span{display:block;text-align:left}
					.spons img{width:87px}
          .hdbylinemob {display: none;}

					.arr_u{transform:rotate(180deg)}
					.gren{background-color:#037500}
            @media (max-width: 768px) {
              .hdbyline { display:none; }
              .pdbox1,
              .pdbox2 {
                width: 100%;
              }
              .pdwrap {
                margin-top: 20px;
                min-height: 210px;
              }
              .tidata h2 {
                font-size: 18px;
                padding-bottom: 0; 
              }
              .tile {
                height: 105px;
              }
              .pdwrap {
                display: block;
              }
              .pdbox1 h3,
              .pdbox1 span {
                display: inline-block;
              }
              .pdbox1:after {
                border: 0;
              }
              .pdbox1 span {
                margin-left: 5px;
              }
              .clrtab{display: none;}
              .clrtabmob {max-width: 67px; display: flex;}
              .hdbylinemob {display: block; margin: 0px 0 4px; font-size: 11px;}
              .hdbyline {display: none;}
              .tilrate{line-height: 14px; display: block;margin-top: 5px;}
              .mdwhth{display: none;}              
              .tiicon{height: auto; text-align: left; }            
              .rgtwhth {width: 100%; margin-top: 10px;}
              .whttemp .tidata {width: calc(100% - 46px); display: inline-block;}
              .whttemp .rgtwhth {display: block; padding-left: 40px;margin-top: 5px;}
              .whttemp .tiicon {display: inline-block; vertical-align: top;}
              .tile.whttemp {display: block;}
              .whttemp .deg {display: inline-block; text-align: left;}
              .whttemp .deg:first-child {border-right: 1px solid #ddd;  margin: 0 13px 0 0;  padding: 0 14px 0 0;}
              .whttemp .deg h3{margin: 0;}
              .mdbtnmob {position: absolute; bottom: 6px;left: 0;right: 0; display: block;}
              .tile.aq { position: relative;}
            }
            
          `}
        </style>
      </>
    );
  } else {
    return <></>;
  }
};
export default PetrolDieselPriceWidget;