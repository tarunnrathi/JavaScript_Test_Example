// import LazyImage from "components/Common/LazyImage";
import { imageLoader } from "includes/article.util";
// import LazyLoadImage from "components/Common/CustomImage";
import LazyImage from "components/Common/LazyImage";
// import { useState } from "react";
// pageAds = {}
const HomeTopNews = ({ topNews = {} }) => {
  // const skinning = topNews?.skinning == 1;

  // const [showRelArt, setShowRelArt] = useState(false);

  // let previous = "";
  // const toggleRelatedArticle = (e) => {
  //   if (previous && previous !== e) {
  //     document.getElementById(`${previous}`).classList.remove("adcls");
  //     document
  //       .getElementById(`${previous}`)
  //       .nextElementSibling?.classList?.remove("active-related-article");
  //   }
  //   previous = e;
  //   document.getElementById(`${e}`).classList.toggle("adcls");
  //   document
  //     .getElementById(`${e}`)
  //     .nextElementSibling?.classList?.toggle("active-related-article");
  // };
  const { left = [], middle = [], right = [] } = topNews;
  const leftFirst = left[0] || {};
  const leftSecond = left[1] || {};
  return (
    <>
      <div className="globalhd large dflex justify-space-betwwen">
        <h2 className="">
          <a href="/news/" className="">
            टॉप <span> न्यूज़ </span>
          </a>
        </h2>
      </div>
      <div className="top_nws_section">
        <ul className="top_nws lft_side">
          <li className="">
            <a
              href={leftFirst.weburl_r || leftFirst.weburl}
              className=""
              data-label="1"
            >
              <figure className="img-figure">
                <LazyImage
                  src={imageLoader(leftFirst?.images?.url || "", 303, 221)}
                  loading="lazy"
                  alt={leftFirst.display_headline || leftFirst.headline || ""}
                  title={leftFirst.display_headline || leftFirst.headline || ""}
                  width={303}
                  height={221}
                />

                {/* <img
                  src={leftFirst.images ? `${leftFirst.images.url}?impolicy=website&amp;width=303&amp;height=221` : }
                  data-original={leftFirst.images ? `${leftFirst.images.url}?impolicy=website&amp;width=303&amp;height=221` : ''}
                  alt= {leftFirst.title || leftFirst.display_headline }
                  title={leftFirst.title || leftFirst.display_headline}
                  onError={(e)=>{e.target.onerror = null; e.target.src="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=303&height=221"}}
                /> */}
              </figure>
              <figcaption className="">
                <h3 className="">{leftFirst.display_headline}</h3>
                <p className="top_nws_desc">{leftFirst.intro} </p>
              </figcaption>
            </a>
          </li>
          <li className="">
            <a
              href={leftSecond.weburl_r || leftSecond.weburl}
              className=""
              data-label="2"
            >
              <figure className="img-figure">
                <LazyImage
                  src={imageLoader(leftSecond?.images?.url || "", 100, 67)}
                  loading="lazy"
                  alt={leftSecond.display_headline || leftSecond.headline || ""}
                  title={
                    leftSecond.display_headline || leftSecond.headline || ""
                  }
                  width={100}
                  height={67}
                />
              </figure>
              <figcaption className="">
                <h3 className="">{leftSecond.display_headline}</h3>
              </figcaption>
            </a>
          </li>
        </ul>
        <ul className="top_nws middl_side">
          {middle.map((itm, key) => (
            <li key={"list" + key} className="">
              <a href={itm.weburl_r || itm.weburl} className="" data-label="3">
                <figure className=" img-figure">
                  <LazyImage
                    src={imageLoader(itm?.images?.url || "", 100, 67)}
                    loading="lazy"
                    alt={itm.display_headline || itm.headline || ""}
                    title={itm.display_headline || itm.headline || ""}
                    width={100}
                    height={67}
                  />

                  {/* <img
                    src={`${itm.images.url}?impolicy=website&amp;width=100&amp;height=67`}
                    data-original={`${itm.images.url}?impolicy=website&amp;width=100&amp;height=67`}
                    alt={itm.title || itm.display_headline}
                    title={itm.title || itm.display_headline}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=100&height=67";
                    }}
                  /> */}
                </figure>
                <figcaption className="">
                  <h3 className="">{itm.display_headline}</h3>
                </figcaption>
              </a>
            </li>
          ))}
        </ul>
        <ul className="top_nws rght_side">
          {right.map((itm, key) => (
            <li key={"rlist" + key} className="">
              <a href={itm.weburl_r || itm.weburl} className="" data-label="8">
                <figure className="img-figure">
                  <LazyImage
                    src={imageLoader(itm.images.url || "")}
                    alt={itm?.display_headline || ""}
                    title={itm?.display_headline || ""}
                    // lazyLoad={true}
                    width={203}
                    height={135}
                    loading="lazy"
                  />
                </figure>
                <figcaption className="">
                  <h3 className="">{itm.display_headline}</h3>
                </figcaption>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="adhik_pdhen_link">
        <a
          href="/news/"
          data-cat="aur_padhein_D"
          className="aurbhi-button events_ana"
        >
          अधिक पढ़ें ...
        </a>
      </div>
      <style jsx global>{`
        .new_s_secton {
          margin-bottom: 20px;
        }
        .globalhd {
          border-bottom: 1px solid #585858;
          padding-bottom: 4px;
          position: relative;
          margin-bottom: 5px;
          margin-top: 10px;
        }
        .globalhd.large h2 {
          font-size: 22px;
          font-weight: 800;
          line-height: 34px;
        }
        .globalhd h2 a {
          color: #001d42;
        }
        .globalhd h2 a span {
          color: #e1261d;
        }
        .globalhd::after {
          content: "";
          width: 25px;
          height: 4px;
          position: absolute;
          bottom: -2px;
          left: 0px;
          background: rgb(237, 28, 36);
        }
        .top_nws_section {
          display: flex;
          justify-content: space-between;
        }
        .top_nws {
          margin-bottom: 10px;
        }
        .lft_side {
          margin: 10px 0px;
          width: 331px;
        }
        .middl_side {
          width: 350px;
          margin: 10px 10px;
        }
        .rght_side {
          margin: 10px 10px;
          width: 203px;
        }
        .top_nws li {
          padding: 5px 0;
        }
        .top_nws li a {
          display: flex;
          font-weight: 700;
          color: #000;
          padding: 10px;
          background: #f6f7f7;
          border-bottom: 1px solid #d2d2d2;
        }
        .top_nws li figure {
          position: relative;
          width: 100px;
          height: 67px;
          margin-right: 12px;
          flex-shrink: 0;
        }
        .top_nws li figure img {
          width: 100%;
          height: 100%;
        }
        .top_nws li a h3 {
          font-size: 15px;
          font-weight: 700;
          line-height: 20px;
          min-height: 60px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .lft_side li:first-child a {
          flex-wrap: wrap;
          padding: 0px;
        }
        .lft_side li:first-child figure {
          width: 331px;
          height: 221px;
          position: relative;
          margin: 0;
          margin-bottom: 5px;
        }
        .lft_side li:first-child figure img {
          height: 100%;
          width: 100%;
        }
        .lft_side li:first-child a figcaption {
          padding: 4px 10px 4px;
          min-height: 156px;
        }
        .lft_side li:first-child a h3 {
          font-size: 22px;
          font-weight: 700;
          line-height: 28px;
          max-height: 84px;
          min-height: unset;
        }
        .top_nws_desc {
          font-size: 12px;
          line-height: 21px;
          color: #636363;
          font-weight: 400;
          overflow: hidden;
          height: 64px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .rght_side li a {
          display: block;
          padding: 0px;
        }
        .rght_side li a figure {
          width: 203px;
          height: 135px;
          margin-bottom: 5px;
        }
        .rght_side li a figcaption {
          padding: 5px 10px;
          height: 94px;
          overflow: hidden;
        }
        .adhik_pdhen_link {
          position: relative;
          display: block;
          text-align: center;
          margin: 0 auto;
          background: #f5f5f5;
        }
        .aurbhi-button {
          font-size: 14px;
          font-weight: 700;
          background: #fff;
          width: 86px;
          height: 20px;
          margin: 0 auto;
          display: block;
          color: #e1261d;
        }
        .adhik_pdhen_link {
          position: relative;
          display: block;
          text-align: center;
          margin: 0 auto;
          background: #f5f5f5;
        }
      `}</style>
    </>
  );
};

export default HomeTopNews;
