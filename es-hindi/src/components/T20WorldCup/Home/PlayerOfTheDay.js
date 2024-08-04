import React from "react";
import LazyLoadImage from "components/Common/CustomImage";

const PlayerOfTheDay = ({ isAmp = false }) => {
  return (
    <div className="play_of_day">
      <h2 className="page_title">
        प्लेयर <span> ऑफ द डे</span>
      </h2>
      <div className="of_day_img">
        <div className="day_img">
          <LazyLoadImage
            isLazyLoad={false}
            isAMP={isAmp}
            src={`https://images.news18.com/ibnkhabar/uploads/assets/images/1668342675_AP22317326994636.jpg`}
            height={209}
            width={313}
          />
        </div>
      </div>
      <div className="day_intro">
        <p>
          आईसीसी टी20 विश्व कप के फाइनल में पाकिस्तान को 5 विकेट से हराकर
          इंग्लैंड ने ट्रॉफी अपनी नाम की. इस मैच के हीरो रहे सैम करेन जिन्होंने
          4 ओवर में 12 रन देकर 3 विकेट चटकाए. इस प्रदर्शन के लिए उनको प्लेयर ऑफ
          द मैच चुना गया. टूर्नामेंट में 6 मैच खेलकर इस गेंदबाज ने कुल 13 विकेट
          चटकाए प्लेयर ऑफ द टूर्नामेंट का अवार्ड भी उड़े.
        </p>
        <div className="day_icon">
          <LazyLoadImage
            src={`https://images.news18.com/static_news18/pix/ibnhome/news18/cricket-silhouette.svg`}
            height={46}
            width={130}
          />
        </div>
        
      </div>
    </div>
  );
};

export default PlayerOfTheDay;
