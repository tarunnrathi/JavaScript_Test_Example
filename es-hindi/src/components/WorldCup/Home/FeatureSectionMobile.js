import { useEffect } from "react";
import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";

const FeatureSectionMobile = ({ WcFeatureData }) => {
  useEffect(() => {
    if (document.getElementsByClassName("features_section").length) {
      new Glide(document.querySelector(`#features_section`), {
        type: "carousel",
        perView: 1,
        gap: 0,
        slidesToShow: 2,
        draggable: true,
      }).mount();
    }
  }, []);
  return (
    <>
      <div className="featuresWidget">
        <h3 className="featureTitle">
          <span>फीचर</span>
        </h3>
        <div className="features_section" id="features_section">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {WcFeatureData.length > 0 && WcFeatureData.map((story,index) => {
                const featureData = story.data || [];
                return <li key={`feature ${index}`}>
                  <div className="featureWrapper">
                    <div className="featureAuthor">
                      <div className="image">
                        <LazyLoadImage
                          src={story.images}
                          alt={story.feature_name}
                          height={90}
                          width={90}
                        />
                      </div>
                      <h4 className="text">{story.feature_name}</h4>
                    </div>
                    <div className="content">{story.description}</div>
                    <div className="featurestoryWrap">
                      {featureData.length > 0 && featureData.map(article =>
                        <div className="featurestory">
                          <a href={article.weburl_r}>
                            <LazyLoadImage
                              src={article.images.url}
                              height={100}
                              width={100}
                            />
                            <h3 className="featureStoryTitle">{article.display_headline}</h3>
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="load_more">
                      <a href={story.text_link}>अन्य लेख</a>
                    </div>
                  </div>
                </li>
              })}
            </ul>
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
      <style jsx global>
        {`
      .features_section { width: 100%; } .features_section .glide__track { overflow: hidden; } .features_section .glide__slides { display: flex; }
			.featuresWidget{margin-bottom:30px;position:relative;background:#f5f5f5;border-top:1px solid #e9e9e9;padding-top:10px}
			.featuresWidget .featureTitle {color:#e1261d; line-height:22px; font-size:22px; padding-left:10px; font-weight:bold; font-family:'khand',sans-serif }
			.featureWrapper{padding:0 20px}
			.featureWrapper .featureAuthor{display:flex;border-bottom:5px solid #e3e3e3;padding-bottom:15px;margin-bottom:15px;align-items:center}
			.featureWrapper .featureAuthor .image{width:110px;height:110px;border-radius:50%;border:10px solid #fff;overflow:hidden; flex-shrink:0; background:#fff; outline:1px solid #ccc; margin-top:15px; box-shadow:0 0 15px #ccc}
			.featureWrapper .featureAuthor .image img{width:100%;height:100%;object-fit:cover}
			.featureWrapper .featureAuthor .text{color:#3279ba;font-weight:bold;font-size:20px;line-height:25px;margin-left:20px}
			.featureWrapper .content{color:#292929;font-size:16px;line-height:1.5;margin-bottom:10px}
			.featurestoryWrap{display:flex;justify-content:space-between;border-bottom:5px solid #e3e3e3;padding-bottom:10px}
			.featurestoryWrap .featurestory{width:150px}
			.featurestoryWrap .featurestory a{display:block}
			.featurestoryWrap .featurestory img{width:100%;display:block;margin-bottom:7px}
			.featurestoryWrap .featurestory .featureStoryTitle{ color:#282828;font-size:16px;line-height:1.5;font-weight:600; font-family: "Mukta",sans-serif;}
			.load_more{width:100%;text-align:center;background:#f5f5f5;display:flex;justify-content:center;padding:10px 0;height:auto !important}
			.load_more a{border:2px solid #e1261c;background:#fff;padding:5px 12px 2px; border-radius:30px; color:#e1261c; font-size:13px; line-height:19px; font-weight:600; text-transform:uppercase}
			.bullets_row { width: 100%; position: relative; } .bullets_row .glide__bullets { position: relative; background: #f5f5f5; z-index: 2; width: 110px; display: inherit; margin: 20px auto 0; text-align: center; } .bullets_row:after { content: ""; position: absolute; background: #D1D1D1; height: 2px; width: 200px; margin: auto; top: 8px; right: 0; left: 0; z-index: 1; } .bullets_row button.glide__bullet.glide__bullet--active { background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/features-icon-color.svg); } .bullets_row button.glide__bullet { width: 17px; height: 17px; margin: 0 5px; border: 0; background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/features-icon.svg); outline: none; cursor: pointer; position: relative; z-index: 1; background-color: whitesmoke; }
    `}
      </style>
    </>
  );
};

export default FeatureSectionMobile;
