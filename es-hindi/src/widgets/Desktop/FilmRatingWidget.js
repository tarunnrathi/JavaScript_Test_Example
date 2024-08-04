import React from "react";
import Article_HELPER from "includes/article.helper.js";

const FilmRatingWidget = (props) => {
    const {movie_review = {}} = props.article_data;
    return (
        <>
            <div className="vsp10 clearfix"></div>
            <div className="mvrtngdtl-tbl clearfix">
                <h2>डिटेल्ड रेटिंग</h2>
                <table cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr>
                            <td>कहानी</td>
                            <td>:</td>
                            <td>
                                <div className="mvrtngtp-star2 fleft">
                                    <div className="mvrtngtp-star2l fleft">{Article_HELPER._getRatingArticleV2(5, movie_review.story_rating, "mvrtngstars-sprite green-star")}</div>
                                    <div className="mvrtngtp-star2r fleft">{movie_review.story_rating}/5</div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>स्क्रिनप्ल</td>
                            <td>:</td>
                            <td>
                                <div className="mvrtngtp-star2 fleft">
                                    <div className="mvrtngtp-star2l fleft">{Article_HELPER._getRatingArticleV2(5, movie_review.screenplay, "mvrtngstars-sprite orange-star")}</div>
                                    <div className="mvrtngtp-star2r fleft">{movie_review.screenplay}/5</div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>डायरेक्शन</td>
                            <td>:</td>
                            <td>
                                <div className="mvrtngtp-star2 fleft">
                                    <div className="mvrtngtp-star2l fleft">{Article_HELPER._getRatingArticleV2(5, movie_review.direction, "mvrtngstars-sprite green-star")}</div>
                                    <div className="mvrtngtp-star2r fleft">{movie_review.direction}/5</div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>संगीत</td>
                            <td>:</td>
                            <td>
                                <div className="mvrtngtp-star2 fleft">
                                    <div className="mvrtngtp-star2l fleft">{Article_HELPER._getRatingArticleV2(5, movie_review.music, "mvrtngstars-sprite red-star")}</div>
                                    <div className="mvrtngtp-star2r fleft">{movie_review.music}/5</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <style jsx global>{`
                .vsp10 {
                    margin-top: 10px;
                }
                .mvrtngdtl-tbl {
                    padding: 15px 0;
                }
                .clearfix {
                    clear: both;
                }
                .clearfix:after, .clearfix:before {
                    content: "";
                    display: block;
                    clear: both;
                    visibility: hidden;
                    line-height: 0;
                    height: 0;
                }
                .mvrtngdtl-tbl h2 {
                    font-size: 24px;
                    color: #212121;
                    font-weight: 700;
                }
                #article_body table {
                    width: 100%;
                    border-collapse: collapse;
                }
                #article_body table {
                    max-height: 400px;
                    overflow: auto;
                    display: block;
                }
                .mvrtngdtl-tbl table {
                    vertical-align: text-top;
                }
                #article_body table tr th, #article_body table tr:first-of-type td {
                    background: #666;
                    color: #fff;
                    font-weight: 700;
                }
                #article_body table tr td, #article_body table tr th {
                    padding: 10px;
                    vertical-align: top;
                    font-size: 14px;
                    border: 1px solid #eee;
                    text-align: left;
                }
                .mvrtngtp-star2 {
                    top: 3px;
                    position: relative;
                    font-weight: 400;
                }
                .fleft {
                    float: left;
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
                .green-star-full {
                    background-position: -182px 0!important;
                }
                .mvrtngstars-sprite {
                    background: url(https://images.news18.com/ibnkhabar/uploads/assests/img/movie-ratestars.png) no-repeat 0 0;
                    display: block;
                }
                .green-star {
                    background-position: -148px 0!important;
                }
                .mvrtngtp-star2r {
                    font-size: 12px;
                    color: #000;
                }
                #article_body table tr td {
                    color: #555;
                }
                #article_body table tr td, #article_body table tr th {
                    padding: 10px;
                    vertical-align: top;
                    font-size: 14px;
                    border: 1px solid #eee;
                    text-align: left;
                }
                .mvrtngdtl-tbl table td {
                    font-size: 16px;
                    color: #4f4f4f;
                    padding: 0 8px 12px 8px;
                    font-weight: 700;
                }
                .orange-star-full {
                    background-position: -233px 0!important;
                }
                .orange-star {
                    background-position: -199px 0!important;
                }
                .red-star-half {
                    background-position: -17px 0!important;
                }
            `}</style>
        </>
    );
};

export default FilmRatingWidget;
