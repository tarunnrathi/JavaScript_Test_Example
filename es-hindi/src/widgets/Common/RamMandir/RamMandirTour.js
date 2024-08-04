import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import FakeYTPlayer from "components/Common/FakeYTPlayer";
import { newVidgyorScript } from "includes/article.util";
import React, { useEffect, useState } from "react";

const imagesList = [
    "https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-map-Hindi-2024-01-991eb191df74c21b129dff410584c457.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-map-Hindi2-2024-01-5bab957a41fc3196eac2fefc722c971b.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-map-Hindi3-2024-01-c96a5c6c9990bb033d9b9ed06ebfd656.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-map-Hindi4-2024-01-0a07f27753847c99600aba565162f06f.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-map-Hindi5-2024-01-c51331c6cb43b35af31074c0af5d0641.png",
    "https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-map-Hindi6-2024-01-a17a08c40662503ce4104c5e41318302.png"
  ]
const RamMandirTour = ({ isMobile = false }) => {

    
    useEffect(() => {
        newVidgyorScript();
        
    }, []);
    return (<>
        <div className="rmpht">
            <h2 className="rmgblhd1">राम मंदिर का वर्चुअल टूर</h2>
            <p>अंदर जाकर मंदिर को देखें</p>
            <div className="rmwrp">
                <div className="shvsldn">
                    <FakeYTPlayer width={ isMobile? 350 : 800} playerId={"vidgyorPlayer9"} height= { isMobile? 300 : 504} src={"A8tfIMy0O8g"} headline={"Ram Mandir"} />

                </div>
            </div>
        </div>
        
        <style jsx>{`
        .rmpht{background: #000; padding: 20px 0; margin-bottom: 30px;}

        @media (max-width: 769px){
        .rmpht {padding: 20px 10px;}	
        .rmpht .rmwrp{display: block;}
        .rmgblhd1:after { width: 320px !important; background-size: 320px;}
        }
        .rmpht p {
            text-align: center;
            color: #f0781d;
            font-weight: bold;
        }
        .rmgblhd1{text-align: center;color: #fff;font-size: 30px;line-height: 22px; margin-bottom: 30px;}	
        .rmgblhd1:before, .rmgblhd1:after{content: ""; display: block; margin: auto;}
        .rmgblhd1:before{background: url(/images/rammandir/flag.png) 0 0 no-repeat; width: 36px; height: 38px; margin-bottom: 15px;}
        .rmgblhd1:after{background: url(/images/rammandir/Heading-Arrow.png) 0 0 no-repeat; width: 398px; height: 10px; margin-top: 10px;}
    
        .morepht { position: relative; margin: 5px 0 0; text-align: center;}
        .morepht span { height: 35px;line-height: 35px; color: #fff; background: transparent linear-gradient(180deg,#f37a1f 0%,#bc5405 100%)0%0%no-repeat padding-box; border-radius: 4px; font-size: 15px; padding: 0 30px; display: table; margin: auto; position: relative; cursor: pointer; text-decoration: none;}
        
        .rmvrtlphvd{position: relative; padding: 20px 0; margin: 30px 0; border: 1px solid #eae9ea}
        .rmvrtlphvd .rmwrp{display: flex; justify-content: space-between; z-index: 1;} 

        .shvsldn{overflow: hidden; width: 800px; margin: 10px auto;}
        .shvsldnlitm{display: flex; margin-bottom: 10px;}
        .shvsldnlitm div{overflow: hidden; }
        .shvsldnlitm div figure{width: 100%; position: relative;overflow: hidden; text-align: center;}
        .shvsldnlitm div figure img{width: 100%; border-radius: 0px; min-height: 315px;}
        .shvsldnlitm div p{padding: 10px;font-size: 15px;line-height: 22px;color: #d0d0d0; font-weight: normal;}
        .shvar button{position: absolute;top: 60%;width:35px;height: 35px;background: #f0781d;left: 18%;border-radius: 100%; border: none; outline: none; cursor: pointer;}
        .shvar button:last-child{right: 18%;left: auto;transform: rotate(180deg);}
        .shvar button:after, .shvar button:before {content: "";position: absolute;width: 8px;height: 8px;border-top: 2px solid #fff;border-left: 2px solid #fff;transform: rotate(-45deg); top: 13px; left: 12px;}
        .shvar button:after{left:17px;}
        .shvsldnlitm figure img {transform: none;}

        
        @media (max-width: 769px){
            .rmvrtlphvd .rmwrp{display: block;}
            .rmgblhd1:after { width: 320px !important; background-size: 320px;}
            .shvsldn{width: auto; }
            .shvar button:last-child{right: 12px; top: 60%;}
            .shvar button{left: 10px}
        }
`}</style>
    </>)
};

export default RamMandirTour;

