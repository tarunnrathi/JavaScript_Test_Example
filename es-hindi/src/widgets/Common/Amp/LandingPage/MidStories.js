import { imageLoader } from "includes/article.util";

export default function MidStories({ newsData }) {

  if(newsData.length == 0 || newsData == [] || newsData == undefined) {
    return null;
  }
  const stateArray = ["उत्तर प्रदेश", "पंजाब", "उत्तराखण्ड", "गोवा", "मणिपुर"],
    tag_slug = "uttar-pradesh-elections";

  return (
    <>
      <ul className="stel-midlstories">
        <li>
          <a href={newsData[0].weburl || ""}>
            <h2>{newsData[0].headline}</h2>
            <figure>
              <amp-img
                width="360"
                height="240"
                src={imageLoader(newsData[0]?.image?.url || "", 360, 240, false, true)}
                alt={newsData[0]?.image?.alt || ""}
                title=""
              />
            </figure>
          </a>
        </li>

        {/* <Advertisement adUnit={"atf_320"}pageData={pageData} /> */}

        {newsData.map((data, index) => {
          if (index != 0) {
            return (
              <li key={`midstoreies${index}`}>
                <a href={data?.weburl || ""}>
                  <h3>{data?.headline}</h3>
                  <figure>
                    <amp-img
                      width="105"
                      height="70"
                      className=""
                      src={imageLoader(data?.image?.url || "", 105, 70, false, true)}
                      alt={data?.image?.alt || ""}
                    />
                  </figure>
                </a>
              </li>
            );
          }
        })}
      </ul>
      <a href={"https://hindi.news18.com/topics/assembly-elections/"} className="ls-listingstory-more">
        <span>{"चुनाव से जुड़ी अन्य खबरें"}</span>
      </a>

      <style jsx>{`
        .stel-midlstories {
          margin-bottom: 20px;
        }
        .stel-midlstories li {
          position: relative;
          margin-top: 15px;
          border-bottom: 1px dotted #ccc;
          padding-bottom: 10px;
        }
        .stel-midlstories li span {
          font-size: 11px;
          color: #e1261c;
          text-transform: uppercase;
        }
        .stel-midlstories li a {
          display: flex;
        }
        .stel-midlstories li:first-child a {
          display: block;
        }
        .stel-midlstories li:first-child figure {
          margin-bottom: 0;
        }
        .stel-midlstories li a figure {
          line-height: 0;
          width:107px;
          margin-bottom: 5px;
          
        }
        .stel-midlstories li a figure img {
          width: 100%;
        }
        .stel-midlstories li a h2 {
          background: #f2f2f2;
          padding: 10px;
          color: #001d42;
          font-size: 22px;
          font-weight: 900;
          line-height: 30px;
          letter-spacing: -0.44px;
        }
        .stel-midlstories li a h2 span {
          display: block;
        }
        .stel-midlstories li a h3 {
          color: #282828;
          font-size: 14px;
          line-height: 18px;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 55px;
          width: calc(100% - 105px);
          padding-right: 10px;
        }
        .stel-midlstories li a h2:hover,
        .stel-midlstories li a h3:hover {
          color: #e1261c;
        }
        .stel-midlstories li:first-child {
          border: none;
          margin-top: 0;
          margin-left:0px;
          margin-right:0px;
          padding-bottom: 0;
        }
        .ls-listingstory-more {
          position: relative;
          display: block;
          margin: 15px 0 20px;
          text-align: center;
          text-decoration: none;
        }
        .ls-listingstory-more span {
          background: #fff;
          padding: 0 30px;
          text-transform: uppercase;
          color: #e1261c;
          position: relative;
          z-index: 1;
          text-align: center;
          font-weight: 700;
          font-size: 12px;
          top: -10px;
        }
        .ls-listingstory-more:after,
        .ls-listingstory-more:before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: #ccc;
        }
        .ls-listingstory-more:before {
          top: 3px;
        }
        .ls-listingstory-more span:after,
        .ls-listingstory-more span:before {
          content: "";
          position: absolute;
          top: 1px;
          width: 3px;
          height: 15px;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          transform: rotate(20deg);
          display: block;
        }
        .ls-listingstory-more span:before {
          left: 10px;
        }
        .ls-listingstory-more span:after {
          right: 10px;
        }
      `}</style>
    </>
  );
}
