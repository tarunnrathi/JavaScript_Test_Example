import LazyImage from "components/Common/LazyImage";
import { imageLoader } from "includes/article.util";
import { memo, useEffect, useState } from "react";
import Heading from "components/Desktop/common/Heading";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import ReadMore from "components/Desktop/common/ReadMore";
import { getCompleteURL } from "util/global/Helper";
import Glide from "@glidejs/glide";

const EventSlider = ({
    eventSlider = []
}) => {

    // if (!Object.keys(eventSlider).length) {
    //     return null;
    // }

    useEffect(() => {
        // if (eventSlider.result && eventSlider.result.length) {
            if (document.getElementsByClassName('newhindiplus').length) {
                new Glide(document.querySelector('.newhindiplus'), {
                    autoplay: false,
                    type: 'slider',
                    perView: 1.2,
                    gap: 15,
                    slidesToScroll: 1,
                }).mount();
            }
        // }
    }, []);

    return (
        <>

            <div className="newglblhdwrap">
                <Heading
                    heading={`न्यूज 18 हिंदी प्लस`}
                />
                <ReadMore
                    link={publicRuntimeConfig.siteUrl+'blogs/'}
                    label={`और भी पढ़ें`}
                />
            </div>
            <div className="newhindiplus">
                <div data-glide-el="track">
                    <ul>
                        <li><a href="#">
                            <figure>
                                <img
                                    src="https://images.news18.com/ibnkhabar/uploads/2022/11/why-rhino-horns-shorter-16673857773x2.jpg"
                                    alt="#" title="#" />
                            </figure>
                            <h3>समय के साथ छोटी क्यों होती जा रही है गैंडों की सींघ? शोधकर्ताओं ने किया चौंकाने वाला दावा</h3>
                        </a></li>

                        <li><a href="#">
                            <figure>
                                <img src="https://images.news18.com/ibnkhabar/uploads/2022/11/rasoi-16673015073x2.jpg" alt="#"
                                    title="#" />
                            </figure>
                            <h3>रसोई में मौजूद ये 4 चीज़ें सेहत की हैं दुश्मन, कम करें इनका सेवन वरना होंगे बड़े नुकसान</h3>
                        </a></li>

                        <li><a href="#">
                            <figure>
                                <img
                                    src="https://images.news18.com/ibnkhabar/uploads/2022/11/why-rhino-horns-shorter-16673857773x2.jpg"
                                    alt="#" title="#" />
                            </figure>
                            <h3>समय के साथ छोटी क्यों होती जा रही है गैंडों की सींघ? शोधकर्ताओं ने किया चौंकाने वाला दावा</h3>
                        </a></li>

                        <li><a href="#">
                            <figure>
                                <img src="https://images.news18.com/ibnkhabar/uploads/2022/11/rasoi-16673015073x2.jpg" alt="#"
                                    title="#" />
                            </figure>
                            <h3>रसोई में मौजूद ये 4 चीज़ें सेहत की हैं दुश्मन, कम करें इनका सेवन वरना होंगे बड़े नुकसान</h3>
                        </a></li>
                    </ul>
                </div>
                <div className="newhindiplus-arrow" data-glide-el="controls">
                    <button data-glide-dir="<"></button>
                    <button data-glide-dir=">"></button>
                </div>
            </div>

            <style jsx global>{`
                        .newhindiplus {
                            position: relative;
                            margin: 0 40px;
                          }
                  
                          .newhindiplus>div {
                            overflow: hidden;
                          }
                  
                          .newhindiplus ul {
                            display: flex;
                            padding: 0 0 5px 0;
                          }
                  
                          .newhindiplus ul li {
                            background: #F3F3F3;
                            box-shadow: 0px 2px 4px #0000001a;
                            border: 1px solid #DBDBDB;
                            border-radius: 4px;
                          }
                  
                          .newhindiplus ul li a figure {
                            height: 104px;
                            margin-bottom: 5px;
                          }
                  
                          .newhindiplus ul li a figure img {
                            width: 100%;
                            height: 104px;
                            border-radius: 4px 4px 0 0;
                          }
                  
                          .newhindiplus ul li a h2,
                          .newhindiplus ul li a h3 {
                            font-size: 15px;
                            line-height: 22px;
                            font-weight: bold;
                            color: #000;
                            padding: 0px 10px 20px 10px;
                          }
                  
                  
                          .newhindiplus-arrow button {
                            width: 25px;
                            background: #F7F7F7;
                            position: absolute;
                            left: -40px;
                            top: 0;
                            bottom: 4px;
                            border:none;
                          }
                  
                          .newhindiplus-arrow button:before,
                          .newhindiplus-arrow button:after {
                            content: "";
                            border-top: 2px solid #ED1C24;
                            border-left: 2px solid #ED1C24;
                            width: 6px;
                            height: 6px;
                            transform: rotate(-45deg);
                            position: absolute;
                            top: 50%;
                            margin-top: -3px;
                          }
                  
                          .newhindiplus-arrow button:last-child {
                            left: auto;
                            right: -40px;
                            transform: rotate(180deg);
                          }
                  
                          .newhindiplus-arrow button:before {
                            left: 8px;
                          }
                  
                          .newhindiplus-arrow button:after {
                            left: 13px;
                          }
                          .newglblhdwrap h2 { width: 70% !important}
            `}</style>
        </>
    );
};

export default EventSlider;
