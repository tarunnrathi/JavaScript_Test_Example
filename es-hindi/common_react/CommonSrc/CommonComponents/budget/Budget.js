import { useEffect, useState } from "react";
import { budgetContent } from "../../../CommonHelper/budgetHelper";
import Glide from "@glidejs/glide";
// import { useAmp } from "next/amp";
import ErrorBoundary from "../../../CommonUtils/errorBoundary";

const Budget = ({
  lang: hcLang,
  mode: hcMode,
  budget,
  eventLabel,
  // width,
  // height,
} = {}) => {
  let [master, setMaster] = useState(() => budget);
  const isAmp = false;
  const [g, setG] = useState(null);

  useEffect(() => {
    updateContent();
    var inId = setInterval(() => {
      updateContent();
    }, 30000);

    return () => clearInterval(inId);
  }, []);

  useEffect(() => {
    let el = document.querySelector(".home_strip_slider");
    if (el) {
      let gIndex = 0;
      if (g) {
        gIndex = g.index;
        g.destroy();
      }
      let glide = new Glide(".home_strip_slider", {
        type: "carousel",
        draggable: true,
        autoplay: 3000,
        perView: 5,
        gap: 10,
        slidesToShow: 1,
        rewind: false,
        breakpoints: {
          767: {
            perView: 1,
            slidesToShow: 1,
            peek: {
              before: 0,
              after: 100,
            },
            gap: 1,
          },
        },
      });
      setG(glide);
      glide.mount();
    }
  }, [master]);

  const updateContent = async () => {
    try {
      let data = await budgetContent({
        mode: hcMode,
        lang: hcLang,
      });
      if (data) {
        setMaster(data);
      }
    } catch (error) {}
  };

  master = master || budget;
  let tagLink = {
    pb: "/tag/union-budget/",
    // en: "",
    gj: "/tag/budget-2024/",
    bn: "/tag/budget-2024/",
    ur: "/tag/budget/",
    kn: "/tag/budget-2024/",
    // hi: "",
    tm: "/tag/budget-2024/",
    tl: "/tag/budget/",
    od: "/tag/budget-2024/",
    as: "/tag/budget-2024/",
    ml: "/tag/budget-2024/",
    lk: "/tag/budget/",
    mr: "/tag/budget-2024/",
  };
  return (
    <ErrorBoundary>
      <div className="bgtwgt">
        <div className="bgtwgtsldr">
          <div className="bgtwgthgt">
            <div className="bgtwgthgtimg"></div>
            <div className="bugetTxt">
              <div className="bugetTxtwrap">
                <div className="bugetTxtIcon">
                  <span></span>
                  <div className="bugetTxtunion">Union</div>
                </div>
                Budget 2024
              </div>
              <h4>Highlights</h4>
            </div>
          </div>
          <section className="budgetSlider1">
            <div className="home_strip_slider">
              <div className="glide__track" data-glide-el="track">
                <div className="glide__slides">
                  {budget?.map((highlight, idx) =>
                    highlight.highlighttype == "none" ? (
                      <a
                        href={tagLink[hcLang] || "/tag/budget/"}
                        onClick={() =>
                          ga(
                            "send",
                            "event",
                            "Budget_highlights",
                            "click",
                            eventLabel
                          )
                        }
                      >
                        {" "}
                        <div className="item">
                          <p>{highlight?.headline}</p>
                        </div>
                      </a>
                    ) : highlight.highlighttype == "up" ? (
                      <a
                        href={tagLink[hcLang] || "/tag/budget/"}
                        onClick={() =>
                          ga(
                            "send",
                            "event",
                            "Budget_highlights",
                            "click",
                            eventLabel
                          )
                        }
                      >
                        <div className="item up">
                          <div className="rupeeBudget"></div>
                          <h2>
                            {highlight?.industry || highlight?.headline || ""}
                          </h2>
                        </div>
                      </a>
                    ) : (
                      <a
                        href={tagLink[hcLang] || "/tag/budget/"}
                        onClick={() =>
                          ga(
                            "send",
                            "event",
                            "Budget_highlights",
                            "click",
                            eventLabel
                          )
                        }
                      >
                        {" "}
                        <div className="item down">
                          <div className="rupeeBudget"></div>
                          <h2>
                            {highlight?.industry || highlight?.headline || ""}
                          </h2>
                        </div>
                      </a>
                    )
                  )}
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
          </section>
          <ul className="budgetLinks">
            <li>
              <a
                href={
                  hcLang == "en" || hcLang == "tl"
                    ? "https://www.news18.com/livetv/"
                    : hcLang == "hi"
                    ? "/livetv"
                    : "/live-tv"
                }
                onClick={() =>
                  ga(
                    "send",
                    "event",
                    "Budget_highlights_Live_TV",
                    "click",
                    eventLabel
                  )
                }
              >
                Live Tv
              </a>
            </li>

            <li>
              <a
                href={tagLink[hcLang] || "/tag/budget/"}
                className="detailBtn"
                onClick={() =>
                  ga("send", "event", "Budget_highlights", "click", eventLabel)
                }
              >
                Detailed View
              </a>
            </li>
          </ul>
        </div>
      </div>
      <style jsx global>{`
             *{margin:0;padding:0;text-decoration:none;list-style:none;}
             @keyframes blinker {  from { opacity: 1; }to { opacity: 0; }}
             .bgtwgt {width: 1244px;margin:0 auto;font-family: 'Fira Sans', sans-serif;}
             .bgtwgtad {width:100%;height:60px;background:#000;display:flex;align-items:center;justify-content:center; padding: 5px 0;}
             .bgtwgtad img{width: 100%; height: 60px;}
             .bgtwgtsldr {display:flex;border: 1px solid #B6B3B4;background: hsl(0, 0%, 91%);}
             .bgtwgthgt {width: 160px;align-items: center;border-right: 1px solid #B6B3B4;display: flex;background: #fff;padding: 3px;box-sizing: border-box;}
             .bgtwgthgtimg{width:48px; height: 51px; background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/budget-2022/budgetHighlight-icon1.png) 0 0 no-repeat;  margin-left: 5px;     background-size: 48px; flex-shrink: 0}
             .bgtwgthgt > .bugetTxt {flex-grow: 1;text-align: right;color: #E1261C;font-size: 15px;text-transform: uppercase;font-weight: 700;}
             .bgtwgthgt > .bugetTxt .bugetTxtwrap{text-transform: uppercase;font-size: 11px;color: #242D3C;display: flex;align-items: center;justify-content: flex-end;font-weight: 400;}
             .bgtwgthgt > .bugetTxt .bugetTxtIcon {display: flex;align-items: center;}
             .bgtwgthgt > .bugetTxt .bugetTxtIcon > span {width: 8px;height: 8px;background: #E1261C;margin-right: 4px;border-radius: 50%;animation: blinker 1s cubic-bezier(.5, 0, 1, 1) infinite alternate;}
             .budgetLinks {display: flex;border-left: 1px solid #B6B3B4;background: #fff;flex-direction: column;flex-grow: 1;align-items:center}
             .budgetLinks li {flex-grow: 1;display:flex}
             .budgetLinks li:not(:nth-child(2)) {border-bottom:1px solid #B6B3B4;}
             .budgetLinks li a {display: flex;font-size: 12px;text-transform: uppercase;padding:4px;align-items:center;font-weight:700;color:red;}
             .budgetLinks li:nth-child(2) a{color:#001D42;}
             .budgetLinks li a::before {background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/budget_sprite_1673003435.png);content: '';width: 20px;height: 20px;display: table;margin-right: 5px;background-position: 0px 1px;background-repeat: no-repeat;}
             .budgetLinks li:nth-child(2) a::before {background-position:-19px 0;}
             .budgetLinks li:last-child {display:none;}
             .bugetTxtunion {display:none;}
             
             .budgetSlider1 {position: relative;width:984px;box-sizing: border-box; padding:7px 20px;height:60px;overflow:hidden;}
              
              .rupeeBudget {width: 32px;height: 32px;flex-shrink: 0;}
             .item h2 {font-size: 18px;font-weight: bold;margin-left: 10px;}
             .item.down h2{color:#037500;}
             .item.up h2{color:#E1261C;}
             .home_strip_slider .glide__slides {display: flex;width: 100%;overflow: hidden; white-space: initial;}
             .home_strip_slider .glide__track {     overflow: hidden;     width: 100%; } 
             .home_strip_slider {     width: 100%; }
             .budgetSlider1 .item { background: #fff;border-radius: 5px;padding: 6px 10px 10px;align-items: center;position: relative;overflow: hidden;display: flex ${
               !isAmp ? "!important" : ""
             };box-sizing:border-box;min-height: 48px; max-width: 240px;}
             .budgetSlider1 .item:after {content: '';width: 100%;height: 5px;background: #001D42;position: absolute;left: 0;bottom: 0;}
             .budgetSlider1 .item.down::after {background: #037500;}
             .budgetSlider1 .item.up::after {background: #E1261C;}
             .budgetSlider1 .item h2,.budgetSlider1 .item p  {font-size: 13px;color: #001D42;font-weight: 700;
              line-height:16px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;}
              .budgetSlider1 .item.up .rupeeBudget{background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/rupeeup_1673000497.png) 0 0 no-repeat;}
              .budgetSlider1 .item.down .rupeeBudget{background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/rupeedn_1673000469.png) 0 0 no-repeat;}
              .home_strip_slider button.glide__arrow.glide__arrow--left {     position: absolute;     top: 23px;     border: 0;     border-top: 6px solid transparent;     border-bottom: 6px solid transparent;     border-right: 6px solid #222;     font-size: 0;     left: 8px;     outline: none;cursor: pointer;    padding: 0;background: transparent;}
              .home_strip_slider button.glide__arrow.glide__arrow--right {     position: absolute;     top: 23px;     border: 0;     border-top: 6px solid transparent;     border-bottom: 6px solid transparent;     border-left: 6px solid #222;     font-size: 0;     right: 8px;     outline: none;cursor: pointer;    padding: 0;background: transparent;}

             @media screen and (max-width: 768px) {
             .bgtwgtad, .bgtwgtad img {height:50px;}
             .bgtwgt {width:100%;}
             .budgetSlider1 {width:100%;padding: 10px 20px;border-bottom: 1px dashed #A2A2A2;height:69px;overflow:hidden;}
             .bgtwgtsldr {flex-direction: column;}
             .bgtwgthgt {position:relative;width: 100%;border-right: 0;border-bottom: 1px dashed #A2A2A2;}
             .bgtwgthgt::before {content: '';width: 4px;height: 100%;background: #E1261C;position: absolute;left: 0;}
             .bgtwgthgtimg{ margin-right: 8px; width: 32px;height: 34px;background-size: 32px;}
             .bgtwgthgt > .bugetTxt {display:flex;font-size:26px;}
             .bgtwgthgt > .bugetTxt .bugetTxtIcon {flex-shrink: 0;margin-right:0px;}
             .budgetLinks {flex-direction: row;border-left:0;}
             .budgetLinks li{flex-grow: 0;}
             .budgetLinks li:not(:last-child) {border-bottom:0;}
             .budgetLinks li:last-child {display:initial;margin-left: auto;}
             .budgetLinks li a {padding: 6px 8px 0  8px;position: relative;}
             .budgetLinks li a::after {content: '';width: 1px;height: 16px;background: #B6B3B4;position: absolute;right: 0;}
             .budgetLinks li a.detailBtn {background:#E33A0F;text-decoration:underline;color: #fff;padding: 7px 25px 7px 7px;}
             .budgetLinks li a.detailBtn::before {background-position: -40px 0px;top: 11px;right: 4px;position: absolute;width: 11px;height: 8px;}
             .bugetTxtunion {display:initial;}
             .bgtwgthgt > .bugetTxt .bugetTxtwrap {flex-direction:column;align-items:flex-end;justify-content:center;margin-right:5px;}         
            
            `}</style>
    </ErrorBoundary>
  );
};

export default Budget;
