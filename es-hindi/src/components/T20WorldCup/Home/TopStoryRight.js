import React from "react";
import LazyLoadImage from "components/Common/CustomImage";

const TopStoryRight = ({ isAmp = false }) => {
  return (
    <div className="top_story_right">
      <ul className="cricketwallah_right">
        <li>
          <a href="https://hindi.news18.com/news/sports/cricket-shaheen-shah-afridi-injured-in-world-cup-final-will-stay-away-from-cricket-for-two-weeks-pcb-gave-big-update-4898617.html">
            <figure>
              {isAmp ? (
                <LazyLoadImage
                  isAMP={true}
                  src={
                    "https://images.news18.com/ibnkhabar/uploads/2022/11/shaheen-shah-vs-nz-kane-wicket-16679921203x2.jpg"
                  }
                  height={63}
                  width={110}
                />
              ) : (
                <img src="https://images.news18.com/ibnkhabar/uploads/2022/11/shaheen-shah-vs-nz-kane-wicket-16679921203x2.jpg?impolicy=website&amp;width=100&amp;height=63" />
              )}
            </figure>
            <h3 className="cricketwallah_title">
              टी20 वर्ल्ड कप फाइनल: चोटिल शाहीन अफरीदी दो हफ्ते क्रिकेट से
              रहेंगे दूर
            </h3>
          </a>
        </li>
        <li>
          <a href="https://hindi.news18.com/news/sports/cricket-can-you-play-50-over-world-cup-please-michael-vaughan-to-ben-stokes-after-t20-world-cup-win-4898277.html">
            <figure>
              {isAmp ? (
                <LazyLoadImage
                  isAMP={true}
                  src={
                    "https://images.news18.com/ibnkhabar/uploads/2022/11/BEN-Stokes-7-16683487623x2.jpg"
                  }
                  height={63}
                  width={110}
                />
              ) : (
                <img src="https://images.news18.com/ibnkhabar/uploads/2022/11/BEN-Stokes-7-16683487623x2.jpg?impolicy=website&amp;width=100&amp;height=63" />
              )}
            </figure>
            <h3 className="cricketwallah_title">
              इंग्लैंड के पूर्व कप्तान ने बेन स्टोक्स से की खास अपील, कही ये
              बड़ी बात
            </h3>
          </a>
        </li>
        <li>
          <a href="https://hindi.news18.com/news/sports/cricket-you-have-seen-this-video-what-is-jos-buttler-doing-on-the-beach-with-t20-world-cup-trophy-4896339.html">
            <figure>
              {isAmp ? (
                <LazyLoadImage
                  isAMP={true}
                  src={
                    "https://images.news18.com/ibnkhabar/uploads/2022/11/jos-buttler-Collab-16684225123x2.jpg"
                  }
                  height={63}
                  width={110}
                />
              ) : (
                <img src="https://images.news18.com/ibnkhabar/uploads/2022/11/jos-buttler-Collab-16684225123x2.jpg?impolicy=website&amp;width=100&amp;height=63" />
              )}
            </figure>
            <h3 className="cricketwallah_title">
              बटलर वर्ल्ड कप ट्रॉफी लेकर समंदर किनारे क्यों गए.. वायरल VIDEO
              आपने देखा क्या?
            </h3>
          </a>
        </li>
        <li>
          <a href="https://hindi.news18.com/news/sports/cricket-t20-world-cup-2022-beer-bottle-in-hand-then-someone-became-a-kangaroo-see-the-video-of-the-victory-of-the-english-team-4893187.html">
            <figure>
              {isAmp ? (
                <LazyLoadImage
                  isAMP={true}
                  src={
                    "https://images.news18.com/ibnkhabar/uploads/2022/11/england-world-champion-t20-16683484233x2.jpg"
                  }
                  height={63}
                  width={110}
                />
              ) : (
                <img src="https://images.news18.com/ibnkhabar/uploads/2022/11/england-world-champion-t20-16683484233x2.jpg?impolicy=website&amp;width=100&amp;height=63" />
              )}
            </figure>
            <h3 className="cricketwallah_title">
              हाथ में बियर की बोतल, तो कोई बना कंगारू, देखें इंग्लिश टीम के जीत
              का VIDEO
            </h3>
          </a>
        </li>
        <li>
          <a href="https://hindi.news18.com/news/sports/cricket-wasim-jaffer-insulted-pakistan-with-ms-dhoni-dialogue-on-imran-nazir-tweet-for-t20-world-cup-2022-final-4893145.html">
            <figure>
              {isAmp ? (
                <LazyLoadImage
                  isAMP={true}
                  src={
                    "https://images.news18.com/ibnkhabar/uploads/2022/11/WhatsApp-Image-2022-11-14-at-06.24.40-16683873303x2.jpeg"
                  }
                  height={63}
                  width={110}
                />
              ) : (
                <img src="https://images.news18.com/ibnkhabar/uploads/2022/11/WhatsApp-Image-2022-11-14-at-06.24.40-16683873303x2.jpeg?impolicy=website&amp;width=100&amp;height=63" />
              )}
            </figure>
            <h3 className="cricketwallah_title">
              वसीम जाफर ने एमएस धोनी के डॉयलाग से पाकिस्तान की कर दी गजब
              बेइज्जती
            </h3>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TopStoryRight;
