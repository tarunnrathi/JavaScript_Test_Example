import LazyLoadImage from "components/Common/CustomImage";
import { shortDateConversion } from "../../../../helper/global";

const ShortNewsHome = ({ short_news_rhs: data = [],isMobile=false }) => {
    return (
        <>
            <div className="nw_sht">
                <div className="nws_hdr">
                    <div className="sht_hdr_lhs">
                        <a className="nws_hdrlgo" href="/short-news/">
                            <img className="nw_lgo" src={isMobile ? "/images/Impactshortmb.svg?impolicy=website&amp;width=140&amp;height=50" :"/images/impactShort/Impactshorts.svg?impolicy=website&amp;width=140&amp;height=50"} width={"84px"} height={"30px"} />
                        </a>
                    </div>
                </div>
                <div className="crd_cnt_wrp">
                    <div className="crd_stk_wrp swiper-container">
                        <div className="crd_stk_ul swiper-wrapper" style={isMobile?{"height":"454px"}:null}>
                            <div className="crd_stk_li swiper-slide">
                                <figure>
                                    <LazyLoadImage
                                        src={data[0]?.images?.url}
                                        width={326}
                                        height={181}
                                        alt={data[0]?.headline}
                                        title={data[0]?.headline}
                                        isLazyLoad={true}
                                    />
                                    {isMobile && <div className="dte">{shortDateConversion(data[0]?.created_at)}</div>}
                                </figure>
                                <div className="stk_cnt">
                                {!isMobile && <div className="dte">{shortDateConversion(data[0]?.created_at)}</div>}
                                  <h2 className="story-title">{data[0]?.display_headline || data[0]?.headline}</h2>
                                  {data[0]?.shorts_bulletin?.length > 0 && data[0]?.shorts_bulletin?.map((item, index) => {
                                      return (
                                          <h2 className="bullt" key={index} >{item}</h2>
                                      )
                                  })}
                                  {isMobile &&<a href={data[0]?.weburl_r} className="mStory">पूरी कहानी पड़े</a> }
                                </div>                          
                            </div>
                        </div>
                    </div>
                    <div className="bar"></div>
                </div>
                <a href={`/short-news/`} className="moretrndstroy">और भी पढ़ें</a>
            </div>
            
            <style jsx global>{`
            .mStory{
            display: flex;
            justify-content: center;
            color: #fff;
            font-size: 14px;
            text-align: center;
            font-weight: bold;
            background: #e1261c;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #fff;
            border-radius: 16px;
            display: table;
            margin: 10px auto;
            width: 140px;
            height: 32px;
            line-height: 32px;
            }
        html,
        body {
          position: relative;
          height: 100%;
        }
        body {
          color: #000;
          margin: 0;
          padding: 0;
        }
        .swiper-container {
          width: 100%;
          height: 100%;
        }
        .swiper-slide {
          text-align: center;
          background: #fff;
        }

        .crd_cnt_wrp {
          margin: auto;
          height: calc(calc(var(--vh, 1vh) * 100) - 191px);
          max-height: 450px;
          max-width: 350px;
          position: relative;
          width: 100%;
        }

        .crd_stk_wrp {
          border-radius: 6px;
          box-shadow: 0px 1px 3px 0px #00000040;
          position: relative;
          overflow: hidden;
          z-index: 1;
          background-color: #fff;
        }

        .crd_stk_li {
          font-size: 16px;
          width: 100%;
          line-height: 24px;
          font-weight: 700;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          text-align: left;
          height: 100%;
        }
        .stk_cnt {
          padding: 12px;
        }
        .crd_stk_li figure {
          margin: 0 0 0;
          overflow: hidden;
          max-height: 184px;
          width: 100%;
        }
        .crd_stk_li figure img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .crd_stk_li .story-title {
          color: #000000;
          font-size: 18px;
          font-weight: 600;
          line-height: 25px;
          margin: 0 0 10px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .dte {
          color: #5c6b88;
          font-size: 11px;
          line-height: 17px;
          margin: 0 0 5px;
        }
        .bullt {
          color: #000000;
          font-size: 15px;
          font-weight: 400;
          line-height: 24px;
          margin: 0 0 5px;
          padding: 0 0 0 20px;
          position: relative;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .bullt:before {
          content: "";
          background-image: url(https://hindi.news18.com/images/impactShort/bullets.svg);
          background-repeat: no-repeat;
          width: 16px;
          height: 16px;
          display: block;
          position: absolute;
          left: 0;
          top: 5px;
        }
        .fttr {
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin: auto 0 0 0;
          width: 100%;
        }
        .fttr .mre {
          background-color: #ecf1fc;
          border-radius: 28px;
          color: #2fa7df;
          display: inline-block;
          font-size: 14px;
          line-height: 18px;
          font-weight: 500;
          padding: 5px 32px 7px 17px;
          position: relative;
        }
        .mre:after {
          content: "";
          display: block;
          border: solid #2fa7df;
          border-width: 0 2px 2px 0;
          display: inline-block;
          padding: 3px;
          position: absolute;
          top: 11px;
          right: 17px;
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          -webkit-transition: all ease-in-out 0.3s;
          -ms-transition: all ease-in-out 0.3s;
          -o-transition: all ease-in-out 0.3s;
          transition: all ease-in-out 0.3s;
        }
        .shr span {
          color: #fff;
          border: 1px solid #fff;
          border-radius: 100%;
          position: relative;
        }

        .bar {
          border-radius: 6px;
          bottom: -8px;
          content: "";
          display: block;
          height: 100%;
          position: absolute;
          width: 100%;
          z-index: 0;
          pointer-events: none;
          opacity: 1;
          -webkit-transition: all ease-in-out 0.4s;
          -moz-transition: all ease-in-out 0.4s;
          -ms-transition: all ease-in-out 0.4s;
          transition: all ease-in-out 0.4s;
        }
        .bar::before {
          background-color: #A7A7A7;
          border-radius: 0 0 6px 6px;
          box-shadow: 0px 3px 20px #00000029;
          content: "";
          display: block;
          height: 12px;
          width: 100%;
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          margin: 0 auto;
          max-width: 95%;
        }
        .bar::after {
          background-color: #6B6B6B;
          border-radius: 0 0 6px 6px;
          box-shadow: 0px 3px 20px #00000029;
          content: "";
          display: block;
          height: 10px;
          width: 100%;
          position: absolute;
          bottom: -12px;
          left: 0;
          right: 0;
          margin: 0 auto;
          max-width: 85%;
        }
        
        .shr_lst {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 32px;
        }
        .shr_icn {
          display: block;
          margin: 0 0 10px;
        }
        .shr_icn img {
          height: auto;
          width: auto;
          object-fit: cover;
          display: block;
        }
        
        .nw_sht {
          align-items: center;
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          padding: 10px 30px 25px;
          background-image: url(/images/impactShort/mobilsv.svg);
          background-repeat: no-repeat;
          margin: 15px 0;
          position:relative;
         
        }
        .nw_sht:before {
          content: "";
          position: absolute;
          top: 13px;
          right: 10px;
          left: 16px;
          background-color: #f1f1f1;
          height: 95.5%;
          width: 90%;
          z-index: -1;
          bottom: 0;
        }
        .nws_hdr {
          align-items: center;
          display: flex;
          justify-content: center;
          margin: 15px 10px 0;
          width: 100%;
        }
        .nws_hdrlgo {
          display: block;
        }
        .nw_lgo {
          max-width: 140px;
        }
        .nw_sht .moretrndstroy {
          color: #e82d2e;
          font-size: 14px;
          display: block;
          text-align: center;
          line-height: 24px;
          margin: 30px 0 0;
          font-weight: bold;
      }
        .nw_sht .moretrndstroy:after {
          content: "";
          background: url(/images/siteimages/newiconsprite_1669351342.svg)-162px 0px no-repeat;
          width: 11px;
          height: 11px;
          display: inline-block;
          margin-left: 6px;
        }
        @media (max-width: 767px) {
          .nw_sht {
            background-color: #032043;
            padding: 10px 30px 20px;
            background-image: unset;
          }
          .crd_cnt_wrp {
            box-shadow: 0px 3px 15px #00000029;
            border-radius: 28px;
            max-height: 515px;
            height: calc(calc(var(--vh,1vh)*100) - 100px);
          }
          .nw_sht .moretrndstroy {
            color: #fff;
            background: transparent;
            border: 0;
            margin: 40px 0 0;
            height: auto;
          }
          .bar::before{background-color: #D8D8D8;}
          .bar::after{background-color: #ABABAB;}
          .dte {
            color: #5c6b88;
            font-size: 9px;
            line-height: 17px;
            margin: 0 0 5px;
            position: absolute;
            left: 10px;
            bottom: 10px;
            border-radius: 8px;
            background-color: #F4F4F4;
            width: 65px;
            height: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .crd_stk_li figure {min-height: 200px;}
        }
        
      `}</style>
        </>
    )
}

export default ShortNewsHome;
