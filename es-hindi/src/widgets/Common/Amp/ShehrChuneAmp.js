import React from "react";
import { AmpSelector } from "react-amphtml";
// import "lazysizes";
const SheherChuneCommon = (props) => {
  const seherData = props.initialData;
  const { withBg } = props;
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
      { "/bihar/west-champaran/": "पश्चिमी चंपारण" },
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
      { "/chhattisgarh/durg/": "दुर्ग " },
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
      { "/haryana/jind-haryana/": "जींद" },
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
      { "/uttarakhand/udham-singh-nagar/": "ऊधमसिंह नगर" },
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

      { "/uttar-pradesh/bulandshahr/": "बुलंदशहर" },
      { "/uttar-pradesh/barabanki/": "बाराबंकी" },
      { "/uttar-pradesh/sahibabad/": "साहिबाबाद" },
      { "/uttar-pradesh/azamgarh/": "आजमगढ़" },
      { "/uttar-pradesh/pilibhit/": "पीलीभीत" },
      { "/uttar-pradesh/ayodhya/": "अयोध्या" },
      { "/uttar-pradesh/lakhimpur-kheri-uttar-pradesh/": "लखीमपुर" },
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
      { "/madhya-pradesh/katni/": "कटनी " },
    ],
    default: [
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
    ],
  };

  topList = topList[seherData?.sectionName]
    ? topList[seherData?.sectionName]
    : topList["default"];

  //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // whtbtn, topwig
  return topList === undefined ? (
    ""
  ) : (
    <>
      <div className="newchoosecitywrap topwig">
        <AmpSelector
          layout="container"
          on={`select:AMP.setState({ isDropdownOpen: !isDropdownOpen })`}
        >
          <a
            href="javascript:void(0)"
            className={
              withBg ? "newchoosecitybtn topwig" : "newchoosecitybtn whtbtn"
            }
          >
            शहर चुनें
          </a>

          <div
            className="newhdrlnghover"
            amp-bind={`[hidden]: !isDropdownOpen`}
          >
            {topList.map((object1, ind) => {
              const [key, value] = [
                Object.keys(object1),
                Object.values(object1),
              ];
              return (
                <React.Fragment key={ind + "fragment"}>
                  <a
                    target="_blank"
                    onClick={() =>
                      ga(
                        "send",
                        "event",
                        "hyperlocal",
                        "Click",
                        `${seherData.label}`,
                      )
                    }
                    href={"/news" + key}
                  >
                    {value}
                  </a>
                </React.Fragment>
              );
            })}
          </div>
        </AmpSelector>
      </div>
    </>
  );
};

export default SheherChuneCommon;
