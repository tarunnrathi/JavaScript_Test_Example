const IPLBlogs = ({ iplBlogData }) => {
  return (
    <>
        <div className="chronicles_section">
          <div className="ipl_podcast_top">
              <div className="CN-heading-1">
                  <div className="headinner">IPL <span> ब्लॉग</span></div>
                  <div className="icon"></div>
              </div>
          </div>

          <div className="chronicles_row">
              <div className="chronicles_row_right">
                  <ul>
                    {iplBlogData && iplBlogData.map((blogData, index) => (
                      <li key={index}>
                          <a href={blogData.author_url}>
                              <div className="chronicles_img">
                                <img
                                  loading="lazy"
                                  src={blogData.author_image_url}
                                  data-src={blogData.author_image_url}
                                  alt={blogData.author_title}
                                  title={blogData.author_title}
                                  width="130"
                                  height="130"
                                />
                              </div>
                              <h3 className="chronicles_hdng">{blogData.author_name}</h3>
                              <strong className="chronicles_sub_hdng">{blogData.author_title}</strong>
                              <h3 className="chronicles_title">{blogData.aurthor_description}</h3>
                          </a>
                      </li>
                    ))}
                  </ul>
              </div>
          </div>
          <a href="/blogs/" className="CN-morestory-btn">और ब्लॉग पढ़ें</a>

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
          .chronicles_section .ipl_podcast_top .CN-heading-1 .headinner {
            border: 0;
            display: inline-grid;
          }
          .CN-heading-1 .headinner {
              background: #ffffff;
              padding: 0 5px;
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
          .chronicles_row_right {
            width: 100%;
            margin-left: 0px;
            padding: 0px 10px;
            box-sizing: border-box;
          }
          .chronicles_row_right ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          }
          .chronicles_row_right ul li {
            border-bottom: 1px #DADADA solid;
            padding: 10px 0;
            text-align: center;
            box-sizing: border-box;
            width: 47% !important;
            margin-right: 3%;
          }
          .chronicles_row_right ul li a {
            display: block !important;
          }
          .chronicles_img {
            width: 150px !important;
            border: 10px solid #F5F5F5 !important;
            border-radius: 100% !important;
            height: 150px !important;
            overflow: hidden;
            text-align: center;
            margin: 0px auto 5px;
          }
          .chronicles_img img {
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
          h3.chronicles_hdng {
            font-size: 20px;
            line-height: 24px;
            color: #08151F;
          }
          strong.chronicles_sub_hdng {
            font-size: 15px;
            line-height: 24px;
            color: #E1261D;
          }
          .chronicles_title {
            width: 100% !important;
            margin-left: 0px !important;
            font-size: 13px !important;
            font-weight: normal;
            line-height: 20px !important;
            margin: 0;
            color: #292929;
            text-align: center !important;
            max-height: 55px;
            overflow: hidden;
          }
          .chronicles_section .CN-morestory-btn {
            width: 90%;
            margin-top: 20px;
          }
          .CN-morestory-btn {
            font-weight: 600;
            text-align: center;
            display: table;
            color: #E1261C;
            border: 2px solid #E1261C;
            text-transform: uppercase;
            margin: 10px auto;
            border-radius: 20px;
            font-size: 14px;
              line-height: 14px;
              padding: 7px 8px 5px !important;
              box-sizing: border-box;
          }
        `}</style>
    </>
  );
};

export default IPLBlogs;
