import LazyLoadImage from "components/Common/CustomImage";
import React, { useState } from "react";

const timeLineArray = [
    { time: "100 BC", label : "मान्यता है कि सम्राट चंद्रगुप्त ने अयोध्या में भव्य मंदिर का निर्माण कराया.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-1-2024-01-b743484d207a1917ce93c4ffa97398fe.jpg"},
    { time: "1528", label : "बाबर के एक सेनापति मीर बाकी ने मंदिर तोड़कर वहां मस्जिद बनाई.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-2-2024-01-c561a27ac5aba7e88b8c4c75b4dc5384.jpg"},
    { time: "1853", label : "संन्यासियों का मंदिर के लिए संघर्ष, अंग्रेजों ने दोनों पक्षों में जमीन बांटी.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-3-2024-01-5f7908fcba3a477fc853ce261e70be88.jpg"},
    { time: "1859", label : "परिसर के बाहरी हिस्से में पूजा और गुंबद के नीचे नमाज की अनुमति.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-4-2024-01-b9163f8118e50e03d9253544322caf5f.jpg"},
    { time: "1949", label : "गुंबद में मूर्ति के प्रकट होने का दावा, विवाद बढ़ने पर डीएम ने ताला लगवाया.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-5-2024-01-0965b6e88aa7babbee492a9d59c4f80b.jpg"},
    { time: "1950", label : "गोपाल सिंह विशारद और फिर रामचंद्र परमहंस ने मुकदमे दायर किए.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-6-2024-01-09f74abeadd59d4523cbb0ec726d745f.jpg"},
    { time: "1961", label : "सुन्नी वफ़्फ़ बोर्ड ने भी जमीनों पर दावेदारी का मुकदमा डाला.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-7-2024-01-327be761bb2f61f204c4019ac72c2282.jpg"},
    { time: "1986", label : "पीएम राजीव गांधी ने मंदिर का ताला खुलवाया.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-8-2024-01-7266e776270feb2a149c77d8a747d150.jpg"},
    { time: "1990", label : "एल के अडवाणी की रथ यात्रा शुरू हुई. अक्टूबर 90 में ही कारसेवकों पर गोली चलाने को लेकर बवाल.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-9-2024-01-8a19e5607501d0d51e1282e803a76fac.jpg"},
    { time: "1992", label : "कारसेवकों ने 6 दिसंबर को विवादित ढांचा गिरा दिया.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-10-2024-01-7a4e21aed9ed96d4e11c049f888d7df4.jpg"},
    { time: "2002", label : "हाईकोर्ट का एएसआई को मंदिर के होने या ना होने के सबूत खोजने के आदेश.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-11-2024-01-4ba92a350d4ef1ee6251cf9c96c30217.jpg"},
    { time: "2010", label : "इलाहाबाद हाईकोर्ट ने विवादित जमीन को वक्‍फ बोर्ड, निर्मोही अखाड़ा व रामलला के बीच बांट दिया.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-12-2024-01-b19f953942b86c32783b9e46175caf45.jpg"},
    { time: "2019", label : "सुप्रीम कोर्ट का पूरी विवादित जगह को रामलला को सौंपने का आदेश.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-13-2024-01-ccdc03764f795649df489eec0cb0d6fb.jpg"},
    { time: "2020", label : "पीएम मोदी ने नए मंदिर का भूमि पूजन किया.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-14-2024-01-82e4fbf4ec89cf9cc58048ee01c7e450.jpg"},
    { time: "2024", label : "पीएम की मौजूदगी में रामलला प्राण प्रतिष्ठा 22 जनवरी को.", image: "https://images.news18.com/ibnkhabar/uploads/2024/01/IMAGE-15-2024-01-60c9cff74e4148d574a6d6ee7fe564ae.jpg"},
]
const RamMandirTimeLine = (props) => {
    const [active, setActive] = useState(false)
    return( <>
    <h2 className="rmgblhd">राम मंदिर टाइम लाइन</h2>
<ul className="rmtmln">
{(timeLineArray.slice(0, active ? timeLineArray.length : 7)).map((itm, index) => (
<li key={index+"timeline"}>
    <a href="javascript:void(0)">
    <div className="rmtmlnl"><span>{itm.time}</span><figure>
        <LazyLoadImage src={itm.image} width={70} height={70} />
        </figure>
    </div>
    <section>{itm.label}</section>	
</a></li>
))}
	
</ul>
<span onClick={() => setActive(!active)} className={active ? "rmtmlnminim" : "rmtmlnexpnd"}>{active ? "बंद करें" : "और पढ़ें"}</span>

<style jsx>{`.rmgblhd{text-align: center;color: #000000;font-size: 30px;line-height: 22px; margin-bottom: 30px;}	
.rmgblhd:before, .rmgblhd:after{content: ""; display: block; margin: auto;}
.rmgblhd:before{background: url(/images/rammandir/flag.png) 0 0 no-repeat; width: 36px; height: 38px; margin-bottom: 15px;}
.rmgblhd:after{background: url(/images/rammandir/hdbtmarw.svg) 0 0 no-repeat; width: 398px; height: 10px; margin-top: 10px;}
.rmtmln{position: relative; float: left; clear: both; width: 100%;}
.rmtmln:before{content: "";position: absolute;background: #e2dfdf;left: 50%;top: 0;bottom: 0;width: 7px;border-radius: 10px;margin-left: -3px;}
.rmtmln li{position: relative;width: 50%;clear: both; padding: 10px 30px;}
.rmtmln li:nth-child(even){float: left;}
.rmtmln li:nth-child(odd){float: right;}
.rmtmln li:before{content: "";width: 14px;height: 14px;border: 2px solid #F37A1F;position: absolute;left: -8px;border-radius: 100%;background: #fff;top: 50%;margin-top: -9px;}
.rmtmln li a{display: flex; justify-content: space-between; gap: 25px}
.rmtmlnl{display: flex; align-items: center; gap: 20px;}
.rmtmlnl figure{width: 70px; height: 70px;}
.rmtmlnl figure img{width: 70px; height: 70px;}
.rmtmlnl span{color: #000000;font-size: 18px;font-weight: bold;}
.rmtmln li a section{width: 100%;color: #555;font-size: 16px;line-height: 24px;font-weight: normal;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;}
.rmtmln li:nth-child(even) a, .rmtmln li:nth-child(even) .rmtmlnl{flex-direction: row-reverse;}
.rmtmln li:nth-child(even) a section{text-align: right;}
.rmtmln li:nth-child(even):before{left: auto;right: -8px}
.rmtmlnexpnd, .rmtmlnminim{cursor: pointer; background: #ECECEC;border: 1px solid #707070;border-radius: 5px;width: 58px;height: 45px;display: table;margin: auto;color: #666;font-size: 12px;text-align: center;font-weight: bold;margin-bottom: 55px;}
.rmtmlnexpnd:before, .rmtmlnminim:before{content: "";width: 10px;height: 10px;display: block;border-top: 2px solid #666;border-left: 2px solid #666;transform: rotate(-135deg);margin: 4px auto 2px auto;}
.rmtmlnminim:before{transform: rotate(45deg);margin-top: 8px;}
.rmtmln li:first-child span {
    margin-right: 11px;
}
@media (max-width: 769px){
.rmtmln:before{left: 30px}
.rmtmln li {width: 100%;float: left!Important;padding: 10px 10px 10px 50px!important;}	
.rmtmln li:before {left: 21px!Important;}
.rmtmln li a {gap: 10px;flex-direction: row!Important;}
.rmtmlnl {gap: 15px;flex-direction: row!Important;}
.rmgblhd:after { width: 320px !important; background-size: 320px;}
.rmtmlnexpnd, .rmtmlnminim {border-radius: 30px;
    width: 130px;
    height: 35px;
    line-height: 35px;
    display: table;
    margin: auto;
    font-size: 15px;
    margin-bottom: 35px;
}
.rmtmlnexpnd:before {
    display: inline-block;
    margin: 2px 10px;
}
.rmtmlnminim:before{display: inline-block;  margin: -4px 10px;}
// .rmgblhd {
//     font-size: 20px;
//     line-height: 15px;
// }
.rmtmln li:nth-child(even) a section{text-align: left;}
.rmtmln li a section{font-size: 15px;}
}
`}</style>
    </>)
};

export default RamMandirTimeLine;