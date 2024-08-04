import React from "react";

const IplLatestNews = ({ latestNews }) => {
  const topNews = latestNews.slice(0, 1);
  const bottomNews = latestNews.slice(1, 6);

  return (
    <>
      <div className="CN-Sections">
          <div className="CN-storyWrap">
            <div className="CN-heading-1">
              <div className="headinner">ताजा <span>खबरें</span></div>
              <div className="icon"></div>
            </div>
            {
                topNews.map((data, index) =>
                    <div className="CN-LeadStory" key={`latestNews${index}`}>
                        <h2 className="CN-LeadHead">
                          <a href={data.weburl_r}>{data.display_headline}</a>
                        </h2>
                      <figure>
                          <a href={data.weburl}>
                              <img
                                  loading="lazy"
                                  src={`${
                                    data.images?.url
                                    }?impolicy=website&width=375`}
                                  data-src={`${
                                    data.images?.url
                                    }?impolicy=website&width=375`}
                                  title={data.display_headline}
                                  alt={data.display_headline}
                                  height={250}
                              />
                          </a>
                      </figure>
                  </div>
                )
            }

            <div>
                <ul className="CN-Thumbstory-2">
                {
                    bottomNews.map((data, index) =>
                      <li key={data.id}>
                        <a href={data.weburl_r}>
                            <div className="text">
                                <p>{data.display_headline}</p>
                            </div>
                            <div className="imgwrap">
                              <img
                                  loading="lazy"
                                  src={`${
                                    data.images?.url
                                    }?impolicy=website&width=110`}
                                  data-src={`${
                                    data.images?.url
                                    }?impolicy=website&width=110`}
                                  title={data.display_headline}
                                  alt={data.display_headline}
                                  height={75}
                              />
                            </div>
                        </a>
                    </li>
                    )
                }
                </ul>
            </div>
            <a href="/cricket/ipl/news/" className="CN-morestory-btn">और भी पढ़ें</a>
        </div>
      </div>
      <style jsx global>{`        
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
    .CN-heading-1 .headinner {
      background: #ffffff;
      padding: 0 5px;
      border-bottom: 1px dotted #D7D7D7;
  }
  .CN-heading-1 .headinner span {
    color: #001D42;
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
.CN-heading-1:after {
  content: '';
  position: absolute;
  background: #fff;
  width: 22px;
  height: 19px;
  right: 0;
}
.CN-LeadStory {
  margin-bottom: 10px;
}
.CN-LeadStory .CN-LeadHead {
  font-size: 18px;
  line-height: 24px;
  background: #001e44;
  padding: 20px 10px 15px 10px;
  position: relative;
}
.CN-LeadStory .CN-LeadHead:before {
  content: '';
  position: absolute;
  width: 40px;
  background: #e1261c;
  height: 6px;
  top: 10px;
  left: 0;
}
.CN-LeadStory .CN-LeadHead a {
  color: #fff;
  display: block;
}
.CN-LeadStory figure a {
  display: block;
  position: relative;
}
.CN-LeadStory figure a img {
  width: 100%;
  display: block;
}
.CN-Thumbstory-2 {
  padding: 0 10px;
}
.CN-Thumbstory-2 li {
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #D7D7D7;
}
.CN-Thumbstory-2 li a, a:hover {
  text-decoration: none;
}
.CN-Thumbstory-2 li a {
  display: flex;
}
.CN-Thumbstory-2 li a .text {
  width: 100%;
}
.CN-Thumbstory-2 li a .text p {
  color: #0A0A0A;
  font-size: 13px;
}
.CN-Thumbstory-2 li a .imgwrap {
  flex: 0 0 110px;
  margin-left: 10px;
  height: 73px;
  overflow: hidden;
  border-radius: 5px;
}
.CN-Thumbstory-2 li a .imgwrap img {
  display: block;
  max-width: 100%;
  border: 0;
  border-radius: inherit;
}
.CN-morestory-btn {
  font-size: 14px;
  line-height: 14px;
  padding: 7px 8px 5px !important;
  box-sizing: border-box;
  width: 240px;
  text-transform: uppercase;
  margin: 10px auto;
  border-radius: 20px;
  font-weight: 600;
  text-align: center;
  display: table;
  color: #E1261C;
  border: 2px solid #E1261C;
}

      `}</style>
    </>
  );
};

export default IplLatestNews;
