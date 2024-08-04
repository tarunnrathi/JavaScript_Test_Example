import React from "react";
import LazyLoadImage from "components/Common/CustomImage";

const WatchAndWinContest  =() =>{
    return(
        <div style={{width:"640px", margin:"20px auto"}} className="frmimg">
            <LazyLoadImage
                src={"/images/siteimages/Google-Form-BannerNew.jpeg"}
                alt="News18 हिंदी - Hindi News"
                height="458"
                width="640"
            />
            <h2 style={{padding: '7px 0px'}}>प्रतियोगिता के बारे में</h2>
            <p>देश का नंबर 1 हिंदी न्यूज़ चैनल News18 इंडिया लाया है अपने दर्शकों के लिए 'देखो और जीतो' कॉन्टेस्ट। आज काउंटिंग डे के दिन News18 इंडिया देखें और स्मार्ट फ़ोन जीतने का मौका पाएं। नीचे दिये गए फ़ॉर्म को भरें और फ़ॉर्म में दिये गए प्रश्न का उत्तर दें। कॉन्टेस्ट ख़त्म होने के बाद सभी विजेताओं से  संपर्क किया जायेगा। *शर्तें लागू</p>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdUaY0ps3XaT37sL1iHxxmd2iI3TpSU2OZS8NkDyBJY3mtu5Q/viewform?embedded=true" width="640" height="1250" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            <style jsx global>{`
            .frmimg figure, .frmimg figure span, .frmimg figure img {
                width: 100% !important;
                height:auto !important;
            }
            .frmimg figure{margin-bottom:10px;}
            `}</style>
        </div>
    )
}
export default WatchAndWinContest;