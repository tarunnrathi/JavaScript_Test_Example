import { useEffect } from "react";
import Glide from '@glidejs/glide';

const FeatureSection = ({ WcFeatureData }) => {
  useEffect(() => {
    if (document.getElementsByClassName('features_section').length) {
      new Glide(document.querySelector(`#features_section`), {
        type: 'carousel',
        perView: 1,
        gap: 0,
        slidesToShow: 2,
        draggable: true,
      }).mount();
    }
  }, []);
  return (
    <>
      <div className="cricketwallah vspacer20">
        <div className="border_title">
          <h2 className="page_title">फीचर</h2>
        </div>
        <div className="features_section" id="features_section">
          <div className="glide__track" data-glide-el="track">
            <div
              className="glide__slides"
              style={{
                transition: "transform 0ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s",
                width: 6174,
                transform: "translate3d(-3528px, 0px, 0px)"
              }}
            >
              {
                WcFeatureData.length > 0 && WcFeatureData.map(story => {
                  const featureData = story.data || [];
                  return <div className="features_row">
                    <div className="cricketwallah_left">
                      <div>
                        <div className="cricketwallah_img">
                          <img
                            src={story.images}
                            alt={story.feature_name}
                          />
                        </div>

                      </div>
                      <div className="cricketwallah_content">
                        <h3>{story.feature_name}</h3>
                        <p>{story.description}</p>
                        <a href={story.text_link} className="cricketwallah_more"> अन्य लेख </a>
                      </div>
                    </div>
                    {featureData.length > 0 && featureData.map((article, index) =>
                      <ul className="cricketwallah_right">
                        <li key={`feature ${index}`}>
                          <a href={article.weburl_r}>
                            <figure>
                              <img src={article.images.url} />
                            </figure>
                            <h3 className="cricketwallah_title">
                              {article.display_headline}
                            </h3>
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                })
              }
            </div>
            <div className="bullets_row">
              <div className="glide__bullets" data-glide-el="controls[nav]">
                {WcFeatureData.length > 0 && WcFeatureData.map((story, index) =>
                  <button className="glide__bullet" data-glide-dir={`=${index}`} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureSection;




