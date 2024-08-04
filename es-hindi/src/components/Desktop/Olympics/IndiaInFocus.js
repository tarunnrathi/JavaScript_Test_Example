import LazyLoadImage from "components/Common/CustomImage";
import React from "react";

export default function IndiaInFocus({ indiaNewsByTag = [] }) {
  if (indiaNewsByTag.length < 4) return null;
  const first = indiaNewsByTag?.slice(0, 1);
  const second = indiaNewsByTag?.slice(1, 4);
  const third = indiaNewsByTag?.slice(4, 5);
  return (
    <>
      <div className="india_focus">
        <div className="olympInner">
          <h3 className="heading-1">Paris olympics 2024</h3>
          <h4 className="heading-2">इंडिया इन फोकस</h4>
        </div>
        <div className="india_focus_row">
          <div className="india_focus_left">
            <a href={first[0].weburl_r}>
              <figure>
                <LazyLoadImage
                  src={first[0].images.url}
                  alt={first[0].display_headline}
                  isLazyLoad={true}
                  width={410}
                  height={221}
                  layout="responsive"
                />
              </figure>
              <figcaption>
                <h3 className="india_focus_title">
                  {first[0].display_headline}
                </h3>
              </figcaption>
            </a>
          </div>
          <ul className="india_focus_midd">
            {second?.map((data) => (
              <li key={data.story_id}>
                <a href={data.weburl_r}>
                  <figure>
                    {/* <img src="https://images.news18.com/ibnlive/uploads/2022/06/sports-101-16561770933x2.png?impolicy=website&width=331&height=221" /> */}
                    <LazyLoadImage
                      src={data.images.url}
                      width={100}
                      height={75}
                      isLazyLoad={true}
                      alt={data.display_headline}
                    />
                  </figure>
                  <h3 className="india_focus_midd_title">
                    {data.display_headline}
                  </h3>
                </a>
              </li>
            ))}
          </ul>
          {third[0] && (
            <div className="india_focus_right">
              <div className="india_focus_story">
                <a href={third[0]?.weburl_r}>
                  <figure>
                    <LazyLoadImage
                      src={third[0].images.url}
                      width={203}
                      height={136}
                      alt={third[0].display_headline}
                    />
                  </figure>
                  <figcaption>
                    <h3 className="india_focus_story_hding">
                      {third[0].display_headline}
                    </h3>
                  </figcaption>
                </a>
              </div>
              <div className="more_india">
                <a href="/tag/india-in-focus/">और भी पढ़ें</a>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        .india_focus {
          width: 100%;
        }
        .india_focus_row {
          display: flex;
          width: 100%;
          justify-content: space-between;
        }
        .india_focus_left {
          width: 331px;
        }
        .india_focus_midd {
          width: 350px;
        }
        .india_focus_right {
          width: 203px;
        }
        .india_focus_left a {
          color: #001d42;
        }
        .india_focus_left figure img {
          width: 100%;
        }
        .india_focus_left figure img {
          width: 100%;
          display: block;
        }
        .india_focus_left figcaption {
          padding: 10px 0;
          border-bottom: 1px #dadada solid;
          box-sizing: border-box;
        }
        .india_focus_title {
          font-size: 16px;
          line-height: 20px;
          padding-bottom: 2px;
          color: #111;
          font-weight: 500;
        }
        .india_focus_left figcaption p {
          font-size: 12px;
          line-height: 18px;
          letter-spacing: 0;
          color: #636363;
          height: 55px;
          overflow: hidden;
        }
        .india_focus_midd li a {
          display: flex;
          color: #001d42;
        }
        .india_focus_midd li figure img {
          width: 100px;
          height: 75px;
          display: block;
        }
        .india_focus_midd_title {
          letter-spacing: 0;
          font-size: 15px;
          line-height: 20px;
          font-weight: 400;
          width: calc(100% - 100px);
          padding-left: 10px;
        }
        .india_focus_midd li {
          border-bottom: 1px #dadada solid;
          padding: 15px 0;
        }
        .india_focus_midd li:first-child {
          padding-top: 0;
        }
        .india_focus_story {
          width: 100%;
          border-bottom: 1px #dadada solid;
          margin-bottom: 15px;
        }
        .india_focus_story figure img {
          width: 100%;
          display: block;
        }
        .india_focus_story a {
          color: #001d42;
        }
        .india_focus_story_hding {
          font-size: 15px;
          line-height: 20px;
          font-weight: 400;
        }
        .india_focus_story figcaption {
          padding: 10px 0;
        }
        .more_india {
          height: 35px;
          background: #f4f4f2;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-bottom: 1px #dadada solid;
        }
        .more_india a {
          display: block;
          color: #e1261d;
          font-weight: 700;
          text-decoration: underline;
          letter-spacing: 0.24px;
          text-transform: uppercase;
          font-size: 12px;
          line-height: 18px;
        }
        .india_focus_story a figure {
          height: 154px;
        }
        .india_focus_story a figure img {
          width: 100%;
          height: 100%;
        }
        .india_focus .medalHopeHeadingInner {
          max-width: 100%;
          padding-left: 100px;
        }
        .india_focus .olympInner {
          max-width: 100%;
          background-image: url(/images/olympics/olympring.svg);
          background-repeat: no-repeat;
          margin-bottom: 7px;
          padding: 0 0 10px 110px;
          border-bottom: 2px solid #d2d2d2;
        }
        .india_focus .olympInner .heading-1 {
          color: red;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 3.7px;
          line-height: 12px;
        }
        .india_focus .olympInner .heading-2 {
          color: #001d42;
          font-size: 28px;
          font-weight: 600;
          line-height: 33px;
          text-transform: uppercase;
        }
        @media (max-width: 768px) {
          .india_focus {
            padding: 0 10px;
          }
          .india_focus_row {
            display: block;
            margin-bottom: 25px;
          }
          .india_focus_row > div,
          .india_focus_row > ul {
            width: 100%;
          }
          .india_focus_title {
            font-size: 18px;
            font-weight: 700;
            line-height: 24px;
          }
          .india_focus_midd li:first-child {
            padding: 15px 0;
          }
          .india_focus_midd li a {
            flex-direction: row-reverse;
          }
          .india_focus_story {
            display: none;
          }
          .india_focus_midd li:last-child {
            margin-bottom: 10px;
          }
          .india_focus_midd_title {padding: 0 10px 0 0;}  
        }
      `}</style>
    </>
  );
}
