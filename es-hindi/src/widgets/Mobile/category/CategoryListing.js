import React from "react";
import { imageLoader } from "includes/article.util";
import LazyLoadImage from 'components/Common/LazyLoadImage';

const CategoryListing = (props) => {
const subsection = props?.subsection || "";
return (
    <>
        <section className='pdngsxtn clearfix'>
            {
                props?.name ?
                <div className="glblbghd-sts">
                    <h2 className="hd">
                        <a title="link" href={props?.url || ""}>{props?.name || ""}</a>
                    </h2>
                </div>
                : ""
            }
            {
                props.data && props.data.length ?
                <ul className="gridview-story a">
                {
                    props.data.map((eachNews, key) => {
                    const Src = eachNews.thumbnail ? imageLoader(eachNews.thumbnail, 120, 180) : '';
                    return (
                            <>
                                <li key=''>
                                    <a title="Link" href={eachNews.url || ""}>
                                        <figure>
                                        {subsection == "film-review" &&
                                                eachNews.movie_rating != '' ? (
                                                <div className="mvrtng-uponpht">
                                                    <div className="mvrtng-xsm">
                                                        <div className="mvrtng-str fl">
                                                            <div className="star-nmbr formvxsm fl">
                                                                <span
                                                                className={`starsprite ${
                                                                    Math.floor(eachNews.movie_rating) >=
                                                                    1
                                                                    ? "mvsm-full"
                                                                    : eachNews.movie_rating > 0 &&
                                                                        eachNews.movie_rating < 1
                                                                    ? "mvsm-half"
                                                                    : "mvsm"
                                                                }`}
                                                                ></span>
                                                                <span
                                                                className={`starsprite ${
                                                                    Math.floor(eachNews.movie_rating) >=
                                                                    2
                                                                    ? "mvsm-full"
                                                                    : eachNews.movie_rating > 1 &&
                                                                        eachNews.movie_rating < 2
                                                                    ? "mvsm-half"
                                                                    : "mvsm"
                                                                }`}
                                                                ></span>
                                                                <span
                                                                className={`starsprite ${
                                                                    Math.floor(eachNews.movie_rating) >=
                                                                    3
                                                                    ? "mvsm-full"
                                                                    : eachNews.movie_rating > 2 &&
                                                                        eachNews.movie_rating < 3
                                                                    ? "mvsm-half"
                                                                    : "mvsm"
                                                                }`}
                                                                ></span>
                                                                <span
                                                                className={`starsprite ${
                                                                    Math.floor(eachNews.movie_rating) >=
                                                                    4
                                                                    ? "mvsm-full"
                                                                    : eachNews.movie_rating > 3 &&
                                                                        eachNews.movie_rating < 4
                                                                    ? "mvsm-half"
                                                                    : "mvsm"
                                                                }`}
                                                                ></span>
                                                                <span
                                                                className={`starsprite ${
                                                                    Math.floor(eachNews.movie_rating) >=
                                                                    5
                                                                    ? "mvsm-full"
                                                                    : eachNews.movie_rating > 4 &&
                                                                        eachNews.movie_rating < 5
                                                                    ? "mvsm-half"
                                                                    : "mvsm"
                                                                }`}
                                                                ></span>
                                                            </div>
                                                            <div className="star-pnts fl">
                                                                {eachNews.movie_rating || "0"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <LazyLoadImage
                                            height={120}
                                            width={180}
                                            src={Src}
                                            alt={eachNews.display_headline || eachNews.title}
                                            title={eachNews.display_headline || eachNews.title}
                                            isRes="mobile"
                                            />
                                        </figure>
                                    </a>

                                    {
                                        subsection == "film-review" ? (
                                            <>
                                                <div className="lstintro txt10 txtdarkgrey">
                                                    <div>
                                                        <b>{eachNews?.movie_genre || ""}</b>
                                                    </div>
                                                    <h4 className="txt12 vsp4">
                                                        <b>
                                                            {eachNews?.display_headline || ""}
                                                        </b>
                                                    </h4>
                                                    <div className="txtlgtgrey vsp4">
                                                        कास्ट : {eachNews?.movie_cast || ""}
                                                    </div>{" "}
                                                    <div className="vsp4">
                                                        <b>पर्दे पर </b> :{" "}
                                                        {eachNews?.movie_date || ""}
                                                    </div>{" "}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="lstintro">
                                                <h2>
                                                    <a title="Link" href={eachNews.url || ""}>
                                                        {eachNews.display_headline || eachNews.title}
                                                    </a>
                                                </h2>
                                            </div>
                                        )
                                    }
                                </li>
                            </>
                        );
                    })
                }
                </ul>
                : ""
            }
        <a title="link" href={props?.url+"page-1"} className="glblbghd-sts-mrnav">और भी पढ़ें...</a>
        </section>
    <style global jsx>{`
        .gridview-story {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;
        }
        .gridview-story li {
            border: 1px solid #ddd;
            background: #fff;
            width: 48%;
            margin-bottom: 16px;
            box-sizing: border-box;
            padding-bottom: 10px;
        }
        .gridview-story li a {
            color: #000;
            z-index: 9999;
        }
        .gridview-story li a figure img {
            height:120px;
        }
        .gridview-story li a figure {
            width: 100%;
            overflow: hidden;
            line-height: 0;
            position: relative;
            float: left;
        }
        .gridview-story li figure {
            width: 100%;
            float: left;
            line-height: 0;
            position: relative;
            margin-bottom: 8px;
        }
        .gridview-story li figure .tgtm-shr {
            top: 0;
            padding: 0;
            background: 0 0;
            display: none !important;
        }
        .tgtm-shr {
            background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), #000);
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 32px 8px 8px;
            cursor: pointer;
            color: #fff;
            height: auto;
            z-index: 9999;
        }
        .gridview-story li .lstintro {
            padding: 0 8px;
            cursor: pointer;
            margin: 0;
            clear: both;
            overflow: hidden;
        }
        .gridview-story li h2 {
            font-size: 16px;
            line-height: 1.45;
            clear: both;
            font-weight: 400;
        }
        .add {
            background: #dbdde3 !important;
        }
        .vsp16 {
            margin-top: 16px;
        }
       
        .gridview-story li.add-li {
            padding: 10px 0;
            width: 100%;
            text-align: center;
        }
        .mvrtng-uponpht, .phtcrdt {
            position: absolute;
            right: 0;
        }
        .mvrtng-uponpht {
            background: -webkit-linear-gradient(top,rgba(0,0,0,0),#000);
            bottom: 0;
            left: 0;
            padding: 32px 8px 8px;
            cursor: pointer;
            color: #fff;
            z-index: 1;
        }
        .mvrtng-xsm, .txt10 {
            font-size: 12px!important;
        }
        .fl {
            float: left;
        }
        .star-nmbr {
            display: flex;
            margin-right: 5px;
        }
        .starsprite.mvsm-full {
            background-position: -26px -19px;
        }
        .formvxsm span {
            width: 12px;
            height: 12px;
            display: inline-block;
            margin-right: 2px;
        }
        .starsprite {
            background: url(https://images.news18.com/ibnkhabar/uploads/assests/pwa/images/star-sprite.png) no-repeat;
            display: block;
        }
        .starsprite.mvsm {
            background-position: 0 -19px;
        }
        .star-pnts {
            color: #fff;
            font-size: 11px;
        }
        .txtlgtgrey {
            color: #828282;
        }
        .vsp4 {
            margin-top: 4px;
        }
    `}
    </style>
</>
    );
};
export default CategoryListing;
