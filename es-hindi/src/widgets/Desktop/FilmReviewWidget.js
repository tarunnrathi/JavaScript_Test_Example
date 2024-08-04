import { useEffect } from "react";
// import getConfig from "next/config";
import Article_HELPER from "includes/article.helper.js";
// import { get_static_img } from "includes/helper";
import { getYtId } from "includes/article.util";
import LazyLoadImage from "components/Common/CustomImage";
// const { publicRuntimeConfig } = getConfig();

const FilmReviewWidget = ({ articleData }) => {
  const user_rating = "0";
  const { movie_review = {} } = articleData;
  const showarticle = () => {
    document.getElementById("stryaddclss").classList.add("act");
    document.getElementById("youaddclss").classList.remove("act");
    document.getElementById("youtube").nextSibling.style.display = "block";
    document.getElementById("youtube").nextSibling.nextSibling.style.display =
      "flex";
    document.getElementById(
      "youtube"
    ).nextSibling.nextSibling.nextSibling.style.display = "flex";
    document.getElementById("youtube").style.display = "none";
  };
  const showyoutube = () => {
    document.getElementById("stryaddclss").classList.remove("act");
    document.getElementById("youaddclss").classList.add("act");
    document.getElementById("youtube").nextSibling.style.display = "none";
    document.getElementById("youtube").nextSibling.nextSibling.style.display =
      "none";
    document.getElementById(
      "youtube"
    ).nextSibling.nextSibling.nextSibling.style.display = "none";
    document.getElementById("youtube").style.display = "block";
  };

  useEffect(() => {
    // getNewsBriefData();
  }, []);

  return (
    <>
      <div className="mvrtngtp clearfix">
        <div className="mvrtngtp-l fleft">
          <a href="javascript:void(0);">
            <LazyLoadImage
              src={articleData.images.url}
              alt={movie_review.movie_name}
              width={297}
              height={197}
              isLazyLoad={false}
            />
          </a>
        </div>
        <div className="mvrtngtp-r fright">
          <div className="mvnm fleft">{movie_review.movie_name}</div>
          <div className="mvrtngtp-star fleft">
            <div className="mvrtngtp-starl fleft">
              {Article_HELPER._getRatingArticleV2(
                5,
                movie_review.movie_rating,
                "mvrtngstars-sprite red-star"
              )}
            </div>
            <div className="mvrtngtp-starr fleft">
              {movie_review.movie_rating}/5
            </div>
          </div>

          <div className="clearfix mvrtng-tbl">
            <table cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <td>पर्दे पर</td>
                  <td>:</td>
                  <td>{movie_review.movie_release_date}</td>
                </tr>
                <tr>
                  <td>डायरेक्टर</td> <td>:</td>{" "}
                  <td>{movie_review.director}</td>
                </tr>
                <tr>
                  <td>संगीत</td> <td>:</td> <td>{movie_review.movie_music}</td>
                </tr>
                <tr>
                  <td>कलाकार</td> <td>:</td> <td>{movie_review.star_cast}</td>
                </tr>
                <tr>
                  <td>शैली</td> <td>:</td> <td>{movie_review.movie_genre}</td>
                </tr>
                <tr>
                  <td>यूजर रेटिंग</td> <td>:</td>
                  <td>
                    <div className="mvrtngtp-star2 fleft">
                      <div className="mvrtngtp-star2l fleft">
                        {Article_HELPER._getRatingArticleV2(
                          5,
                          user_rating,
                          "mvrtngstars-sprite blue-star"
                        )}
                      </div>
                      <div className="mvrtngtp-star2r fleft">
                        {user_rating}/5
                      </div>
                    </div>

                    <div className="fleft rtthismv">
                      Rate this movie
                      <div className="rtthismv-showbox">
                        <a href="javascript:void(0)">0</a>
                        <a href="javascript:void(0)">0.5</a>
                        <a href="javascript:void(0)">1</a>
                        <a href="javascript:void(0)">1.5</a>
                        <a href="javascript:void(0)">2</a>
                        <a href="javascript:void(0)">2.5</a>
                        <a href="javascript:void(0)">3</a>
                        <a href="javascript:void(0)">3.5</a>
                        <a href="javascript:void(0)">4</a>
                        <a href="javascript:void(0)">4.5</a>
                        <a href="javascript:void(0)">5</a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ul className="mvrtng-tab clearfix">
        <li
          id="stryaddclss"
          className="act"
          onClick={showarticle}
          style={{ cursor: "pointer" }}
        >
          <a href="javascript:void(0)">फिल्म</a>
        </li>
        <li
          id="youaddclss"
          className=""
          onClick={showyoutube}
          style={{ cursor: "pointer" }}
        >
          <a href="javascript:void(0)">ट्रेलर</a>
        </li>
      </ul>
      <div id="youtube">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${getYtId(
            movie_review.movie_trailer
          )}`}
          frameBorder="0"
          allowFullScreen=""
          defer="true"
        ></iframe>
      </div>
      <style jsx global>{`
        .vsp10 {
          margin-top: 10px;
        }
        #youtube {
          display: none;
        }
        .mvrtngtp {
          background: #efefef;
          padding: 20px;
          box-sizing: border-box;
          margin: 10px 0 0 0;
        }
        .clearfix:after,
        .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .mvrtngtp-l {
          width: 35%;
          background: #000;
          padding: 15px 4px;
          box-sizing: border-box;
          position: relative;
        }
        .mvrtngtp-l:after,
        .mvrtngtp-l:before {
          content: "";
          background: url(https://images.news18.com/ibnkhabar/uploads/assests/img/mvrtngbg.png)
            repeat-x;
          position: absolute;
          left: 8px;
          right: 0;
          top: 2px;
          height: 10px;
        }
        .fleft {
          float: left;
        }
        .mvrtngtp-l:after {
          bottom: 3px;
          top: auto;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .mvrtngtp-l img {
          width: 100%;
          float: left;
          border: 1px solid #d2d2d2;
          box-sizing: border-box;
        }
        .mvrtngtp-r {
          width: 62%;
          box-sizing: border-box;
        }
        .mvnm {
          font-size: 28px;
          color: #000;
          line-height: 20px;
          font-weight: 700;
        }
        .mvrtngtp-star {
          margin: 6px 0 0 16px;
        }
        .mvrtngtp-starl {
          margin-right: 8px;
          float: left;
        }
        .mvrtngtp-starl span {
          width: 16px;
          height: 15px;
          float: left;
          margin-right: 2px;
        }
        .red-star-full {
          background-position: -34px 0 !important;
        }
        .red-star {
          background-position: 0 0 !important;
        }
        .mvrtngstars-sprite {
          background: url(https://images.news18.com/ibnkhabar/uploads/assests/img/movie-ratestars.png)
            no-repeat 0 0;
          display: block;
        }
        .fright {
          float: right;
        }
        .mvrtngtp-starr {
          font-size: 12px;
          color: #000;
        }
        .mvrtng-tbl {
          padding-top: 15px;
        }
        .clearfix {
          clear: both;
        }
        .mvrtng-tbl table td:first-child {
          padding: 4px 8px 4px 0;
        }
        .mvrtng-tbl table td {
          font-size: 16px;
          color: #000;
          padding: 4px 8px;
          vertical-align: top;
        }
        .mvrtng-tbl table td:last-child {
          font-weight: 700;
          font-size: 14px;
        }
        .mvrtngtp-star2 {
          top: 3px;
          position: relative;
          font-weight: 400;
        }
        .mvrtngtp-star2l {
          margin-right: 8px;
          float: left;
        }
        .mvrtngtp-star2l span {
          width: 16px;
          height: 15px;
          float: left;
          margin-right: 2px;
        }
        .mvrtngtp-star2r {
          font-size: 12px;
          color: #000;
        }
        .rtthismv {
          margin-left: 15px;
          background: #f3f3f3;
          position: relative;
          width: 138px;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          color: #000;
          font-weight: 400;
          padding: 0 0 0 6px;
          border: 1px solid #aaa;
          z-index: 2;
          cursor: pointer;
        }
        .rtthismv:before {
          content: "";
          display: block;
          border-top: 6px solid #000;
          border-left: 6px solid transparent;
          width: 0;
          height: 0;
          position: absolute;
          right: 7px;
          transform: rotate(135deg);
          top: 6px;
        }
        .rtthismv:after {
          content: "";
          position: absolute;
          width: 20px;
          height: 22px;
          border-left: 1px solid #aaa;
          right: 0;
        }
        .rtthismv-showbox {
          position: absolute;
          top: 22px;
          border: 1px solid #aaa;
          left: -1px;
          right: -1px;
          background: #f3f3f3;
          display: none;
        }
        .rtthismv-showbox a {
          display: block;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          color: #000;
          font-weight: 400;
          border-bottom: 1px solid #aaa;
          padding: 0 6px;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .mvrtng-tab {
          position: relative;
          border-bottom: 1px solid #d7d7d7;
          background: #efefef;
          padding: 0 20px;
          margin-bottom: 10px;
        }
        .mvrtng-tab li.act {
          color: #ed1c24;
          margin-right: 10px;
          background: #fff;
          border: 1px solid #d7d7d7;
          border-bottom: 1px solid #fff;
          position: relative;
          top: 1px;
        }
        .mvrtng-tab li {
          width: 150px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          float: left;
          font-size: 16px;
          color: #000;
          margin-right: 10px;
          background: #fff;
          border: 1px solid #efefef;
        }
        li {
          list-style: none;
        }
        .mvrtng-tab li.act a {
          color: #ed1c24;
          font-weight: 700;
        }
        .blue-star {
          background-position: -51px 0 !important;
        }
      `}</style>
    </>
  );
};

export default FilmReviewWidget;
