import React from "react";
import LazyImage from "components/Common/LazyImage";
import { imageLoader } from "includes/article.util";

const HindiKeSamrat  =() =>{
    return(
        <div style={{width:"640px", margin:"0px auto"}} className="frmimg">
            <LazyImage
                width={521}
                height={287}
                src={imageLoader("https://images.news18.com/ibnkhabar/uploads/2023/09/Hindi-Ke-Samrat-image-form.png", 521, 287, true)}
                alt={""}
                title={""}
                className={""}
                lazyLoad={true}
            />
            <h2>प्रतियोगिता के बारे में</h2>
            <p>हर वर्ष 14 सितंबर को हिंदी दिवस मनाया जाता है। दरअसल, 14 सितंबर 1949 को संविधान सभा ने हिंदी को राजभाषा का दर्जा दिया था। हिंदी को ज्यादा से ज्यादा प्रचारित और प्रसारित करने के उद्देश्य से तत्कालीन सरकार ने 14 सितंबर को हिंदी दिवस के तौर पर मनाने का फैसला किया। हालांकि, पहला हिंदी दिवस 14 सितंबर 1953 को मनाया गया और ये सिलसिला आज भी जारी है|
            इस दिन को और ख़ास बनाने के लिये भारत का न. 1 न्यूज़ नेटवर्क, News18, एक बार फिर लेकर आया है हिन्दी के सम्राट प्रतियोगिता जिसमें दर्शक हिंदी मुहावरों को पूरा करने में भाग लेते हैं और उन्हें हिंदी के सम्राट का ताज पहनने का मौका मिलता है. 
            नीचे दिये गये फॉर्म में मुहावरा पूरा करें और बनें हिन्दी के सम्राट साथ ही जीतिए आकर्षक इनाम। क्योंकि भाषा नहीं अभिमान है, हिन्दी पहचान है!
            </p>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfeecrom7VfS14Y_uJgIvqWD7f4LpJujaWRiIDvVdyAazvVhA/viewform?embedded=true" width="640" height="1600" frameBorder="0" marginheight="0" marginwidth="0">Loading…</iframe>
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
export default HindiKeSamrat;