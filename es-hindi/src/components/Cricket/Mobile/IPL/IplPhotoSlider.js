import { IPL_YEAR } from "includes/ipl.helper";
import { useState } from "react";

const IplPhotoSlider = ({ OffTheFieldArr, photoPriority }) => {
  const [selectedPhotoArticleIndex, setSelectedPhotoArticleIndex] = useState(0);
  const selectedPhotoArticle = photoPriority.length
    ? photoPriority[selectedPhotoArticleIndex]
    : {};

  const handleOnLeftClick = () => {
    const index = selectedPhotoArticleIndex - 1;
    if (index >= 0) {
      setSelectedPhotoArticleIndex(index);
    } else {
      setSelectedPhotoArticleIndex(photoPriority.length - 1);
    }
  };

  const handleOnRightClick = () => {
    const index = selectedPhotoArticleIndex + 1;
    if (index < photoPriority.length) {
      setSelectedPhotoArticleIndex(index);
    } else {
      setSelectedPhotoArticleIndex(0);
    }
  };

  return (
    <>
      <div className="CN-Sections dark-box">
        <div className="CN-heading-1">
          <div className="sponsor-with-heading">
              <div className="headinner">आईपीएल {IPL_YEAR} फोटो</div>
              <div className="icon"></div>
          </div>
        </div>

        <div className="CN-photoslider-h">
            <div data-glide-el="controls">
                <a
                  href="javascript:void(0)"
                  className="left-arrow"
                  data-glide-dir="<"
                  onClick={handleOnLeftClick}
                ></a>
                <a
                  href="javascript:void(0)"
                  className="right-arrow"
                  data-glide-dir=">"
                  onClick={handleOnRightClick}
                ></a>
            </div>
            <div className="glide__track" data-glide-el="track">
                <ul className="pht_gall_ery glide__slides">
                    <li className="glide__slide" key={selectedPhotoArticle.id}>
                      <div className="content-box">
                        <div className="counter">{selectedPhotoArticle?.gallery_count} photos</div>
                        <div className="heading">
                          <a href={selectedPhotoArticle.weburl_r}>{selectedPhotoArticle.display_headline}</a>
                        </div>
                      </div>
                        <div className="image-box">
                            <a href={selectedPhotoArticle.weburl_r}>
                                <span className="img-icon">
                                  <img
                                    src="/images/icons/Photo-Icon.svg"
                                    alt="ipl"
                                    width="39"
                                    height="39"
                                  />
                                </span>
                                  <img
                                    loading="lazy"
                                    src={`${
                                      selectedPhotoArticle.images?.url
                                      }?impolicy=website&width=340`}
                                    data-src={`${
                                      selectedPhotoArticle.images?.url
                                      }?impolicy=website&width=340`}
                                    title={selectedPhotoArticle.display_headline}
                                    alt={selectedPhotoArticle.display_headline}
                                    height="226"
                                  />
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <a href="/cricket/ipl/photos/" className="CN-morestory-btn">और फोटो देखें</a>
      </div>

      <div className="CN-Sections">
        <div className="CN-heading-1">
          <div className="sponsor-with-heading">
              <div className="headinner">ऑफ द <span>फील्ड</span></div>
              <div className="icon"></div>
          </div>
        </div>
        <ul className="CN-listbox-1">
          {OffTheFieldArr.map((data) => (
            <li key={`offTheFieldArr_`+data.id}>
                <a href={data.weburl_r}>
                  <div className="CN-listwrap">
                    <div className="innerwrap">
                      <h3 className="text-1">{data.display_headline}</h3>
                    </div>
                    <div className="imgbox">
                      <img
                        loading="lazy"
                        src={`${
                          data.images?.url
                          }?impolicy=website&width=110`}
                        data-src={`${
                          data.images?.url
                          }?impolicy=website&width=110`}
                        height="73px"
                        alt={data?.display_headline}
                      />
                      </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
	        <a href="/cricket/ipl/news/" className="CN-morestory-btn">और भी पढ़ें</a>
      </div>
        <style jsx global>{`        
          .CN-Sections.dark-box {
            background: #222222;
            padding: 10px 0;
        }
        .CN-Sections.dark-box .CN-heading-1 {
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/cn-heading-bg-2.png);
      }
      .CN-heading-1 {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 18px;
        color: #E1261C;
        padding: 0 0 0 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/cn-heading-bg.png);
        background-repeat: repeat-x;
        background-position: center;
        position: relative;
    }
    .sponsor-with-heading {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-right: 10px;
  }
  .CN-Sections.dark-box .CN-heading-1 .headinner {
    color: #FFCC00;
    background: #222;
    border-bottom-color: #989898;
}
.CN-heading-1 .headinner {
  padding: 0 5px;
  border-bottom: 1px dotted #D7D7D7;
}
.CN-Sections.dark-box .CN-heading-1 .icon {
  border-color: #ffffff;
}
.CN-heading-1 .icon {
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  width: 8px;
  height: 8px;
  -webkit-transform: rotate(-45deg);
  margin-right: 10px;
  z-index: 1;
}
.CN-Sections.dark-box .CN-heading-1:after {
  background: #222;
}
.CN-heading-1:after {
  content: '';
  position: absolute;
  width: 22px;
  height: 19px;
  right: 0;
}
.CN-photoslider-h {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  overflow: hidden;
}
.CN-photoslider-h::before {
  content: '';
  position: absolute;
  width: 40px;
  background: #e1261c;
  height: 6px;
  top: 0;
  left: 0;
}
.CN-photoslider-h .glide__track {
  overflow: hidden;
}
ul.pht_gall_ery {
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
}
.CN-photoslider-h .heading {
  margin-bottom: 5px;
}
.CN-photoslider-h .heading a {
  display: block;
  font-size: 16px;
  line-height: 22px;
  color: #fff;
  user-select: none;
    -webkit-user-drag: none;
}
.CN-photoslider-h .image-box {
  position: relative;
}
.CN-photoslider-h .image-box a, .CN-photoslider-h .image-box a img {
  display: block;
  width: 100%;
}
.CN-photoslider-h .image-box a {
  border-radius: 10px;
  overflow: hidden;
}

.CN-photoslider-h .image-box .img-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.CN-Sections.dark-box .CN-morestory-btn {
  color: #FFCC00;
  border-color: #FFCC00;
  background: #0A0A0A;
  font-weight: 600;
  text-align: center;
  display: table;
  border: 2px solid #E1261C;
  text-transform: uppercase;
  margin: 10px auto;
  border-radius: 20px;
  width: 240px;
  font-size: 14px;
    line-height: 14px;
    padding: 7px 8px 5px !important;
    box-sizing: border-box;
}
.CN-Sections .CN-listbox-1 {
  padding: 0 10px;
}
.CN-Sections .CN-listbox-1 li {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #D7D7D7;
}
.CN-Sections .CN-listbox-1 li a {
  display: block;
}
.CN-Sections .CN-listbox-1 li .CN-listwrap {
  display: flex;
}
.CN-Sections .CN-listbox-1 li .CN-listwrap .innerwrap {
  margin-right: 15px;
}
.CN-Sections .CN-listbox-1 li .CN-listwrap .text-1 {
  color: #0A0A0A;
  font-size: 13px;
  font-weight: normal;
}
.CN-Sections .CN-listbox-1 li .CN-listwrap .imgbox {
  flex: 0 0 110px;
  overflow: hidden;
  border-radius: 5px;
  align-self: flex-start;
}
.CN-Sections .CN-listbox-1 li .CN-listwrap .imgbox img {
  display: block;
  width: 100%;
}
.CN-morestory-btn {
  font-size: 14px;
  line-height: 14px;
  padding: 7px 8px 5px !important;
  box-sizing: border-box;
  width: 240px
}
.CN-photoslider-h .left-arrow,
        .CN-photoslider-h .right-arrow {
          background: rgba(0, 0, 0, 0.7);
          width: 39px;
          height: 62px;
          position: absolute;
          top: 50%;
          left: 0px;
          z-index: 3;
          transform: translate(0, -50%);
        }
        .CN-photoslider-h .left-arrow::before {
          content: "";
          border-top: 1px solid #ffffff;
          border-left: 1px solid #ffffff;
          width: 20px;
          height: 20px;
          transform: rotate(-45deg);
          position: absolute;
          left: 15px;
          top: 20px;
        }
        .CN-photoslider-h .right-arrow::before {
          content: "";
          border-bottom: 1px solid #ffffff;
          border-right: 1px solid #ffffff;
          width: 20px;
          height: 20px;
          transform: rotate(-45deg);
          position: absolute;
          right: 15px;
          top: 20px;
        }
        .CN-photoslider-h a {
          display: block;
          position: relative;
        }
        .CN-photoslider-h .right-arrow {
          left: initial;
          right: 0px;
        }
        .content-box .counter {
          display: inline-block;
          font-style: normal;
          padding: 5px 7px;
          font-size: 14px;
          line-height: 14px;
          background: #e1261c;
          color: #fff;
          margin-bottom: 5px;
        }
        `}</style>
    </>
  );
};

export default IplPhotoSlider;
