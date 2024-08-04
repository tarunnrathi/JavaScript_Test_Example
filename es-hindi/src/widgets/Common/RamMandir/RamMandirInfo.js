import React from "react";

const RamMandirInfo = (props) => {

    return (<>
    <div className="rmabt">
        <div className="rmwrp">
        <div className="rmabtl">
        <h2 className="rmgblhd">राम मंदिर की जगह</h2>
        <div className="rmabtlcn">
        <p>राम मंदिर<span>अयोध्या</span></p>	
        </div>
        </div>

        <div className="rmabtr">
        <h2 className="rmgblhd">राम मंदिर का परिचय</h2>
        <div className="rmabt-intro">
        <p>अवधपुरी मम पुरी सुहावनि। उत्तर दिसि बह सरजू पावनि॥ <br></br>   जा मज्जन ते बिनहिं प्रयासा। मम समीप नर पावहिं बासा॥</p>
 

    <p>रामचरित मानस में बाबा तुलसी ने श्रीराम के मुख से ही कहलवाया है कि उनकी नगरी अयोध्या बड़ी सुहावनी है और इसकी उत्तर दिशा में पवित्र सरयू नदी बहती है जिसमें स्नान भर कर लेने से अनायास ही मनुष्य को मोक्ष मिल जाता है। विडंबना देखिए कि ऐसी जगतारिणी नदी के तट पर बसी ऐसी महिमावंत नगरी जिसकी महिमा से महिमावंत हुई वह पाँच शताब्दी तक अपने लिए एक ठौर को तरसता रहा. जो चराचर सृष्टि का  संचालक है, पुरुषार्थ प्राप्ति के लिए संतों का एकमेव आश्रय है वह आधी सहस्राब्दी तक स्वयं बेआसरा रहा. निस्संदेह काल के चक्र में यह खंड अद्भुत अनुपमेय है जिसमें लंबे संघर्ष, विवाद, बलिदान और तदनंतर न्यायिक उठापटक के बाद वह अतिविशिष्ट घड़ी आने वाली है जब रामसनेहीजन अपने राम को भव्य मंदिर में विराजमान देखेंगे.
    </p><p>
    मान्यता के अनुसार ईसा से सौ वर्ष पहले बनाए गए श्रीराम मंदिर को 1528 में बाबर के सेनापति मीर बाँकी ने ध्वस्त कर दिया था. 1853 में संन्यासियों के संघर्ष के बाद परिसर के बाहरी हिस्से में हिंदुओं के पूजा की अनुमति मिली. संघर्ष फिर भी चलता रहा. 1948 में मुख्य गुंबद में श्रीराम के प्राकट्य के दावे के बाद वहाँ ताला लगा दिया गया. 1951 से मुकदमेबाजी शुरू हो गई. करीब 70 वर्ष बाद 2019 में सुप्रीम कोर्ट ने मंदिर के पक्ष में फैसला दिया और 2020 में पीएम मोदी ने मंदिर का भूमि पूजन किया. इसके तीन साल बाद 22 जनवरी का सुअवसर आया.
        </p>

        </div>
        </div>	
        </div>	
        </div>

        <style jsx>{`
        .rmgblhd{text-align: center;color: #000000;font-size: 30px;line-height: 22px; margin-bottom: 30px;}	
        .rmgblhd:before, .rmgblhd:after{content: ""; display: block; margin: auto;}
        .rmgblhd:before{background: url(/images/rammandir/flag.png) 0 0 no-repeat; width: 36px; height: 38px; margin-bottom: 15px;}
        .rmgblhd:after{background: url(/images/rammandir/hdbtmarw.svg) 0 0 no-repeat; width: 398px; height: 10px; margin-top: 10px;}
        
        .rmabt{position: relative; padding: 20px 0;}
.rmabt:before, .rmabt:after{content: ""; position: absolute;top: 0; bottom: 0; width: 50%;}
.rmabt:before{background: #FFEDDF;left: 0;z-index: -1;}
.rmabt:after{background: #FBE1CD; right: 0; z-index: -1;}
.rmabt .rmwrp{display: flex; justify-content: space-between; z-index: 1;}	
.rmabtl{width: 50%;  padding: 20px 50px;}
.rmabtlcn{width: 472px;height: 258px;background: url(/images/rammandir/locationbg.png) 0 0 no-repeat;margin: auto;position: relative;}
.rmabtlcn p{color: #000000;font-size: 30px;line-height: 24px;position: absolute;font-weight: bold;text-align: center;top: 65px;right: 20px;}
.rmabtlcn p span{display: block; color: #8A8A8A; font-size: 14px;}
.rmabtr{width: 50%;padding: 20px 50px;}
.rmabt-intro{height: 275px; overflow-y: scroll; padding-right: 25px;}
.rmabt-intro p{color: #9F6D46;font-size: 16px;line-height: 22px;margin-bottom: 20px;text-align: center;}
.mdladd{line-height: 0; display: flex; justify-content: center;padding: 20px 0;}
@media (max-width: 769px){
.rmabt .rmwrp{display: block;}
.rmabtl, .rmabtr{width: 100%; padding: 20px 10px;}
.rmabt:before, .rmabt:after{display: none;}
.rmabtl{background: #FFEDDF;}
.rmabtr{background: #FBE1CD;}	
.rmabtlcn {width: 250px;height: 140px;background-size: 250px;}
.mdladd{display: none;}
.rmabtlcn p {
    font-size: 16px;
    line-height: 16px;
    top: 30px;
    right: 10px;
}
.rmgblhd:after { width: 320px !important; background-size: 320px;}
}
`}</style>
    </>)
};

export default RamMandirInfo;