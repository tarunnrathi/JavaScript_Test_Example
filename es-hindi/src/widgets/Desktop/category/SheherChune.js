import React, { useEffect } from "react";
import "lazysizes";

const SheherChune = (props) => {
  const seherData = props.initialData;
  let topList = {
    bihar: [
      { "/bihar/patna/": "पटना" },
      { "/bihar/muzaffarpur/": "मुजफ्फरपुर" },
      { "/bihar/gaya/": "गया" },
      { "/bihar/purnia/": "पूर्णिया" },
      { "/bihar/bhagalpur/": "भागलपुर" },
      { "/bihar/darbhanga/": "दरभंगा" },
      { "/bihar/nawada/": "नवादा" },
      { "/bihar/east-champaran/": "पूर्वी चंपारण" },
      { "/bihar/begusarai/": "बेगूसराय" },
      { "/bihar/nalanda/": "नालंदा" },
      { "/bihar/bhojpur/": "भोजपुर" },
      { "/bihar/siwan/": "सीवान" },
      { "/bihar/gopalganj/": "गोपालगंज" },
      { "/bihar/munger/": "मुंगेर" },
      { "/bihar/saharsa/": "सहरसा" },
      { "/bihar/madhepura/": "मधेपुरा" },
      { "/bihar/kishanganj/": "किशनगंज" },
      { "/bihar/madhubani/": "मधुबनी" },
      { "/bihar/samastipur/": "समस्तीपुर" },
      { "/bihar/west-champaran/": "पश्चिमी चंपारण" }

    ],
    chhattisgarh: [
      { "/chhattisgarh/raipur/": "रायपुर" },
      { "/chhattisgarh/surguja/": "सरगुजा" },
      { "/chhattisgarh/bastar/": "बस्तर" },
      { "/chhattisgarh/bilaspur/": "बिलासपुर" },
      { "/chhattisgarh/korba/": "कोरबा" },
      { "/chhattisgarh/raigarh/": "रायगढ़" },
      { "/chhattisgarh/durg/": "दुर्ग" },
      { "/chhattisgarh/bastar/": "बस्तर( जगदलपुर )" },
      { "/chhattisgarh/kanker/": "कांकेर" },
      { "/chhattisgarh/mahendragarh/": "महेन्द्रगढ़" },
      { "/chhattisgarh/mahasamund/": "महासमुंद" },
      { "/chhattisgarh/janjgir/": "जांजगीर चांपा " },

    ],
    "himachal-pradesh": [
      { "/himachal-pradesh/shimla/": "शिमला" },
      { "/himachal-pradesh/solan/": "सोलन" },
      { "/himachal-pradesh/una/": "ऊना" },
      { "/himachal-pradesh/hamirpur/": "हमीरपुर" },
      { "/himachal-pradesh/mandi/": "मंडी" },
      { "/himachal-pradesh/dharamsala/": "धर्मशाला" },
      { "/himachal-pradesh/kullu/": "कुल्‍लू" },
      { "/himachal-pradesh/chamba/": "चंबा" },
    ],
    haryana: [
      { "/haryana/chandigarh-city/": "चंडीगढ़" },
      { "/haryana/sonipat/": "सोनीपत" },
      { "/haryana/panipat/": "पानीपत" },
      { "/haryana/faridabad/": "फरीदाबाद" },
      { "/haryana/ambala/": "अंबाला" },
      { "/haryana/gurgaon/": "गुरुग्राम" },
      { "/haryana/rohtak/": "रोहतक" },
      { "/haryana/hisar/": "ह‍िसार" },
      { "/haryana/ambala/": "अंबाला" },
      { "/haryana/jind-haryana/": "जींद" }
    ],
    jharkhand: [
      { "/jharkhand/ranchi/": "रांची" },
      { "/jharkhand/dhanbad/": "धनबाद" },
      { "/jharkhand/bokaro/": "बोकारो" },
      { "/jharkhand/jamshedpur/": "जमशेदपुर" },
      { "/jharkhand/deoghar/": "देवघर" },
      { "/jharkhand/dumka/": "दुमका" },
      { "/jharkhand/ramgarh/": "रामगढ़" },
      { "/jharkhand/hazaribagh/": "हजारीबाग" },
      { "/jharkhand/palamu/": "पलामू" },
      { "/jharkhand/deoghar/": "देवघर" },
      { "/jharkhand/gumla/": "गुमला" },
      { "/jharkhand/godda/": "गोड्डा " },
      { "/jharkhand/giridih/": "गिरिडीह " },
    ],
    rajasthan: [
      { "/rajasthan/jaipur/": "जयपुर" },
      { "/rajasthan/alwar/": "अलवर" },
      { "/rajasthan/bharatpur/": "भरतपुर" },
      { "/rajasthan/bikaner/": "बीकानेर" },
      { "/rajasthan/chittorgarh/": "चित्तौड़गढ़" },
      { "/rajasthan/udaipur/": "उदयपुर" },
      { "/rajasthan/jodhpur/": "जोधपुर" },
      { "/rajasthan/kota/": "कोटा" },
      { "/rajasthan/barmer/": "बाड़मेर" },
      { "/rajasthan/karauli/": "करौली" },
      { "/rajasthan/dausa/": "दौसा" },
      { "/rajasthan/tonk/": "टोंक" },
      { "/rajasthan/sikar/": "सीकर" },
      { "/rajasthan/jaisalmer/": "जैसलमेर" },
      { "/rajasthan/dungarpur/": "डूंगरपुर" },
      { "/rajasthan/nagaur/": "नागौर" },
      { "/rajasthan/churu/": "चूरू" },
      { "/rajasthan/bhilwara/": "भीलवाड़ा" },
      { "/rajasthan/sri-ganganagar/": "श्रीगंगानगर" },
      { "/rajasthan/dholpur/": "धौलपुर" },
      { "/rajasthan/baran/": "बारां" },
      { "/rajasthan/pali/": "पाली" },
      { "/rajasthan/sawai-madhopur/": "सवाई माधोपुर" },
      { "/rajasthan/jhunjhunu/": "झुंझुनू" },
    ],
    uttarakhand: [
      { "/uttarakhand/rishikesh/": "ऋषिकेश" },
      { "/uttarakhand/dehradun/": "देहरादून" },
      { "/uttarakhand/chamoli/": "चमोली" },
      { "/uttarakhand/almora/": "अल्मोड़ा" },
      { "/uttarakhand/haldwani/": "हल्द्वानी" },
      { "/uttarakhand/nainital/": "नैनीताल" },
      { "/uttarakhand/haridwar/": "हरिद्वार" },
      { "/uttarakhand/pithoragarh/": "पिथौरागढ़" },
      { "/uttarakhand/pauri-garhwal/": "पौड़ी गढ़वाल" },
      { "/uttarakhand/bageshwar/": "बागेश्वर" },
      { "/uttarakhand/rudraprayag/": "रुद्रप्रयाग" },
      { "/uttarakhand/champawat/": "चम्पावत" },
      { "/uttarakhand/tehri-garhwal/": "टिहरी गढ़वाल" },
      { "/uttarakhand/uttarkashi/": "उत्तरकाशी" },
      { "/uttarakhand/udham-singh-nagar/": "ऊधमसिंह नगर" }
    ],
    "uttar-pradesh": [
      { "/uttar-pradesh/lucknow/": "लखनऊ" },
      { "/uttar-pradesh/varanasi/": "वाराणसी" },
      { "/uttar-pradesh/meerut/": "मेरठ" },
      { "/uttar-pradesh/agra/": "आगरा" },
      { "/uttar-pradesh/allahabad/": "इलाहाबाद" },
      { "/uttar-pradesh/kanpur/": "कानपुर" },
      { "/uttar-pradesh/bareilly/": "बरेली" },
      { "/uttar-pradesh/saharanpur/": "सहारनपुर" },

      { "/uttar-pradesh/bulandshahr/": 'बुलंदशहर' },
      { "/uttar-pradesh/barabanki/": 'बाराबंकी' },
      { "/uttar-pradesh/sahibabad/": 'साहिबाबाद' },
      { "/uttar-pradesh/azamgarh/": 'आजमगढ़' },
      { "/uttar-pradesh/pilibhit/": 'पीलीभीत' },
      { "/uttar-pradesh/ayodhya/": 'अयोध्या' },
      { "/uttar-pradesh/lakhimpur-kheri-uttar-pradesh/": 'लखीमपुर' },
    ],
    "madhya-pradesh": [
      { "/madhya-pradesh/bhopal/": "भोपाल" },
      { "/madhya-pradesh/indore/": "इंदौर" },
      { "/madhya-pradesh/vidisha-madhya-pradesh/": "विदिशा" },
      { "/madhya-pradesh/hoshangabad/": "होशंगाबाद" },
      { "/madhya-pradesh/harda/": "हरदा" },
      { "/madhya-pradesh/jabalpur/": "जबलपुर" },
      { "/madhya-pradesh/balaghat/": "बालाघाट" },
      { "/madhya-pradesh/ujjain/": "उज्जैन" },
      { "/madhya-pradesh/chhindwara/": "छिंदवाड़ा" },
      { "/madhya-pradesh/gwalior/": "ग्वालियर" },
      { "/madhya-pradesh/jabalpur/": "जबलपुर" },
      { "/madhya-pradesh/mandla/": "मंडला " },
      { "/madhya-pradesh/khargone/": "खरगोन" },
      { "/madhya-pradesh/bhind/": "भिण्ड" },
      { "/madhya-pradesh/anuppur/": "अनूपपुर " },
      { "/madhya-pradesh/jhabua/": "झाबुआ" },
      { "/madhya-pradesh/sagar/": "सागर" },
      { "/madhya-pradesh/rewa/": "रीवा" },
      { "/madhya-pradesh/shivpuri/": "शिवपुरी" },
      { "/madhya-pradesh/chhatarpur/": "छतरपुर" },
      { "/madhya-pradesh/rajgarh/": "राजगढ़" },
      { "/madhya-pradesh/guna/": "गुना" },
      { "/madhya-pradesh/balaghat/": "बालाघाट" },
      { "/madhya-pradesh/satna/": "सतना" },
      { "/madhya-pradesh/ratlam/": "रतलाम" },
      { "/madhya-pradesh/dhar/": "धार" },
      { "/madhya-pradesh/burhanpur/": "बुरहानपुर" },
      { "/madhya-pradesh/katni/": "कटनी " }

    ],
    "delhi-ncr": [
      { "/delhi-ncr/": "दिल्ली-एनसीआर" },
      { "/uttar-pradesh/ghaziabad/": "गाजियाबाद" },
      { "/uttar-pradesh/noida/": "नोएडा" },
      { "/haryana/gurgaon/": "गुड़गांव" },
      { "/haryana/faridabad/": "फरीदाबाद" },
    ],
    "default": [
      { "/delhi-ncr/": "दिल्ली-एनसीआर" },
      { "/uttar-pradesh/": "उत्तर प्रदेश" },
      { "/bihar/": "बिहार" },
      { "/madhya-pradesh/": "मध्य प्रदेश" },
      { "/rajasthan/": "राजस्थान" },
      { "/uttarakhand/": "उत्तराखंड" },
      { "/haryana/": "हरियाणा" },
      { "/jharkhand/": "झारखंड" },
      { "/chhattisgarh/": "छत्तीसगढ़" },
      { "/himachal-pradesh/": "हिमाचल प्रदेश" },
      { "/maharashtra/": "महाराष्ट्र" },
      { "/punjab/": "पंजाब" },
    ]
  };

  topList = topList[seherData?.slug] ? topList[seherData?.slug] : topList["default"];

  const selectIndividualState = (e) => {
    const eachState = e?.target?.parentNode;
    if (eachState) {
      eachState.classList.toggle("adclsallcities-forstatesection");
    }
  };

  const closeIndividualState = (e) => {
    const state = e?.target?.parentNode?.parentNode;
    if (state) {
      state.classList.toggle("adclsallcities-forstatesection");
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const isStateOpen = document.querySelector(".adclsallcities-forstatesection");
      if (!e.target.className.includes("state-dd") && isStateOpen) {
        document.querySelector(".allcities-close").click();
      }
    });
  }, []);

  return topList == undefined ? (
    ""
  ) : (
    <>
      {/* {onClick={
          (e => selectIndividualState(e),
          () =>
            ga("send", "event", "hyperlocal", "Click", `${seherData.label}`))
        }} */}
      {/* onClick={e => selectIndividualState(e)} */}
      {props.pageType == "category" || props.pageType == "state" ?
        <a
          href="javascript:void(0)"
          onClick={(e) => selectIndividualState(e)}
          className={props.pageType == "state" ? "chsstctbtn-forstatepage state-sheher-chune state-dd" : "chsstctbtn-forstatepage state-dd"}
        >
          {props.pageType == "state" ? "" : "राज्य/शहर चुनें"}
        </a>
        :
        <a
          onClick={(e) => selectIndividualState(e)}
          className="chsstct-forstatepage-inside-city state-dd"
          id="seher_chune_0"
        >
          शहर चुनें
        </a>
      }
      <div className="allcities-forstatesection state-dd" id={"all_city_id_0"}>
        <div className={"state-dd"}>
          <ul className={"state-dd"}>
            {topList.map((object1, ind) => {
              const [key, value] = [Object.keys(object1), Object.values(object1)];
              // console.log(`${key}:: ${value}`);
              return (
                <React.Fragment key={ind + "fragment"}>
                  <li className={"state-dd"}>
                    <a
                      target="_blank"
                      onClick={() =>
                        ga(
                          "send",
                          "event",
                          "hyperlocal",
                          "Click",
                          `${seherData.label}`
                        )
                      }
                      href={"/news" + key}
                      className={"state-dd"}
                    >
                      {value}
                    </a>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        <div onClick={(e) => closeIndividualState(e)} className="allcities-close state-dd">
          <span className={"state-dd"}>Close</span>
        </div>
      </div>
      <style jsx global>{`
        .chsstct-forstatepage-inside-city {
          color: #C6080F;
          font-size: 15px;
          position: absolute;
          top: 4px;
          right: 0;
          font-weight: bold;
          padding-right: 20px;
        }
        .chsstct-forstatepage-inside-city:after {
          position: absolute;
          content: "";
          width: 6px;
          height: 6px;
          border-top: 2px solid #EE1C25;
          border-left: 2px solid #EE1C25;
          -webkit-transform: rotate(-136deg);
          -ms-transform: rotate(-136deg);
          transform: rotate(-136deg);
          top: 5px;
          right: 5px;
        }
        .allcities-forstatesection {
          position: absolute;
          background: #F7F7F7;
          // box-shadow: 0px 3px 6px #00000029;
          border-radius: 8px 0px 8px 8px;
          top: ${props.pageType == "category" ? "42px" : "30px"};
          z-index: 1;
          width: 170px;
          box-sizing: border-box;
          padding: 0 12px;
          right: 0;
          height: 0px;
          overflow: hidden;
          // -webkit-transform: scale(0);
          // -ms-transform: scale(0);
          // transform: scale(0);
          -webkit-transition: all .5s ease-in-out;
          transition: all .5s ease-in-out;
        }
        .allcities-forstatesection>div {
          height: 240px;
          overflow: hidden;
        }
        .allcities-forstatesection>div ul {
          height: 240px;
          overflow: auto;
          width: 109%;
        }
        .allcities-forstatesection>div ul li {
          width: 100%;
          margin: 0px;
        }
        .allcities-forstatesection>div ul li a {
          display: block;
          color: #333333;
          font-size: 14px;
          padding: 10px 2px;
          border-bottom: 1px dotted #ccc;
        }
        .allcities-forstatesection>div {
          height: 240px;
          overflow: hidden;
        }
        .allcities-close {
          position: relative;
          background: #C6080F;
          border-radius: 0 0 8px 8px;
          height: 36px!important;
          margin: 0 -15px;
          line-height: 36px;
          color: #fff;
          font-size: 15px;
          padding-left: 30px;
          cursor: pointer;
        }
        .allcities-close:before {
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        .allcities-close:after {
          -webkit-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
        .allcities-close:before, .allcities-close:after {
          content: "";
          width: 2px;
          height: 16px;
          background: #fff;
          position: absolute;
          top: 9px;
          right: 18px;
        }
        .allcities-close span {
          position: relative;
        }
        // .allcities-close span:before {
        //   content: "";
        //   width: 8px;
        //   height: 8px;
        //   border-top: 2px solid #fff;
        //   border-left: 2px solid #fff;
        //   position: absolute;
        //   -webkit-transform: rotate(-45deg);
        //   -ms-transform: rotate(-45deg);
        //   transform: rotate(-45deg);
        //   top: 4px;
        //   left: -15px;
        // }
        .adclsallcities-forstatesection .allcities-forstatesection {
          // -webkit-transform: scale(1);
          // -ms-transform: scale(1);
          // transform: scale(1);
          -webkit-transition: all .5s ease-in-out;
          transition: all .5s ease-in-out;
          height: 275px;
        }
        .list {
          padding: 0 5px;
        }
      `}</style>
    </>
  );
};

export default SheherChune;
