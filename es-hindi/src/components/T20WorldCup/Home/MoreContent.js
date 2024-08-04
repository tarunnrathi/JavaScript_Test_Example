const MoreContent = props => {

  return (
    <>
      <div className="read_less_containr read_full_containr">
        <p className="pageContent">न्यूज18 हिंदी (News18 Hindi) के स्पेशल टी20 वर्ल्ड कप पेज पर आपका स्वागत है. इस पेज पर वर्ल्ड कप से जुड़ी वो सभी बातें और अपडेट मिलेंगे, जो आप चाहते हैं. पल-पल की ताजा खबरें और तस्वीरें, मैचों के लाइव स्कोर (Live Score), फुल स्कोरकार्ड (Full Scorecard), लाइव अपडेट (Live Update), हर बॉल की कॉमेंट्री और मैच रिपोर्ट सब कुछ यहां मिलेगा. वर्ल्ड कप की स्पेशल स्टोरी भी होंगी. </p>
        <div className="buttonGrp rd_full">
          {/* <button type="button">और पढ़ें</button>
          <div className="arrows"></div> */}
        </div>
      </div>
      <style jsx global>{`

      .read_less_containr { display: block; overflow: hidden; position: relative; height:${!props?.isHeight ? "144px" : null}; } body .pageContent { font-size: 16px; line-height: 1.5; margin-top: 10px; } .buttonGrp { position: relative; width: 136px; margin: 10px auto 10px; } .buttonGrp button { background-color: #1799BC; border: none; width: 100%; padding: 10px 15px 10px 0px; box-sizing: border-box; border-radius: 20px; cursor: pointer; color: #fff; font-size: 14px; line-height: 19px; font-family: "Noto Sans", devanagari; font-weight: 400; outline: none; } .buttonGrp button { background-color: #EB3D3C; text-transform: capitalize; } .buttonGrp .arrows { position: absolute; top: 20px; right: 12px; width: 12px; height: 1px; background-color: #fff; } .buttonGrp .arrows { width: 13px; transform: rotate(89deg); } .buttonGrp .arrows:before, .buttonGrp .arrows:after { content: ""; position: absolute; width: 7px; height: 1px; top: -2px; right: -1px; background-color: #fff; transform: rotate(45deg); } .buttonGrp .arrows:after { top: 2px; transform: rotate(-45deg);}
      @media (max-width:768px){p.pageContent {padding: 10px 10px;font-size: 16px;	line-height: 1.5 !important;}.buttonGrp.rd_full {position: relative;margin: 10px auto 10px;background: linear-gradient(transparent, #fff, #fff);padding-top: 40px;margin-top: -40px;}}
    
    `}</style>
    </>
  );
};

export default MoreContent;
