import articleHelper from "includes/article.helper.js";
import { getYtId } from "includes/article.util";
import ArticleImage from 'components/Common/ArticleImageNew';
import { useEffect, useState } from "react";

export default function FilmReviewWidgetMobile({ data = {}, isDetailed }) {
    const [showVideo, setShowVideo] = useState(false);

    const {
        "story_rating": storyRating,
        "star_cast": movieCast,
        "movie_genre": movieGenre,
        "movie_music": movieMusic,
        "director": movieDirector,
        "movie_release_date": movieDate,
        "movie_trailer": movieTrailer = '',
        screenplay,
        direction,
        music,
    } = data?.movie_review || {};

    const { intro, headline, images: { url: thumbnail, caption } = {} } = data;

    useEffect(() => {
        const ytid = getYtId(movieTrailer);
        if(ytid) {
            setShowVideo(ytid);
        }
    }, []);

    // Render detail rating box
    if(isDetailed) {
        const details = [{ n: 'कहानी', r: storyRating }, { n: 'स्क्रीनप्ले', r: screenplay }, { n: 'डायरेक्शन', r: direction }, { n: 'संगीत', r: music }];
        return (
            <>
                <div className="mv-dtlrtng">
                    <h2>डिटेल रेटिंग</h2>
                    <ul className="clearfix">
                        {details.map((item) => {
                            return (
                                <li>
                                <div className="mv-dtlrtng-l txt12 txtdarkgrey fl"><b>{item.n} <span className="fr">: </span></b></div>
                                <div className="mv-dtlrtng-r fl">
                                    <div className="mvrtng-str-grn fl">
                                        <div className="star-nmbr formvred fl">
                                            {articleHelper._getRatingArticleV2(5, item.r, 'starsprite mvred')}
                                        </div>
                                        <div className="star-pnts fl">{item.r}</div>
                                    </div>
                                </div>
                            </li>
                            );
                        })}
                    </ul>
                </div>
                <style jsx global>{`
                    .mv-dtlrtng h2 {
                        color: #212121;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .mv-dtlrtng li {
                        margin-top: 8px;
                        width: 100%;
                        float: left;
                    }
                    .mv-dtlrtng-l {
                        width: 70px;
                    }
                    .fl {
                        float: left;
                    }
                    .mv-dtlrtng {
                        padding: 0 15px;
                        margin-bottom: 15px;
                    }
                    .mvrtng-str-grn {
                        position: relative;
                        font-size: 12px;
                        margin: 1px 0 0 16px;
                    }
                    .txtdarkgrey {
                        color: #313131;
                    }
                    .txt12 {
                        font-size: 12px;
                    }
                    .star-nmbr {
                        margin-right: 4px;
                    }
                    .starsprite.mvred-full {
                        background-position: -30px -121px;
                    }
                    .formvgrn span, .formvred span, .formvyl span {
                        width: 13px;
                        height: 13px;
                        display: inline-block;
                        margin-right: 2px;
                    }
                    .starsprite {
                        background: url(https://images.news18.com/ibnkhabar/uploads/assests/pwa/images/star-sprite.png) no-repeat;
                        display: block;
                    }
                    .starsprite.mvred {
                        background-position: 0 -121px;
                    }
                    .starsprite.mvred-half {
                        background-position: -16px -121px;
                    }
                `}

                </style>
            </>
        );
    }

    return (
        <>
            {!showVideo ? <div style={{ position: 'relative' }}><ArticleImage
                headline={headline}
                image={thumbnail}
                caption={caption ? caption : ""}
                isMobile={true}
                style={{ margin: "0 -10px" }}
              /></div> :
            <div id="youtube" style={{ margin: "0 -10px" }}>
                <iframe width="100%" height="240" src={`https://www.youtube.com/embed/${showVideo}`} frameBorder="0" allowFullScreen="" defer="true"></iframe>
            </div>}
            <div className="cnsmpn-box formvcnsmpn" style={{ margin: "0 -10px" }}>
                <div className="pdngsxtn-lr clearfix">
                    <div className="mvrtngl formvcnsmpn clearfix">
                        <div className="mvrtng-str fl">
                            <div className="star-nmbr formvlg fl">
                            {articleHelper._getRatingArticleV2(5, storyRating, 'starsprite mvlg')}
                            </div>
                            <div className="star-pnts fl">{storyRating}</div>
                            </div>
                        </div>
                        <h1 className="cnsmpn-hd">{headline}</h1>
                        <h2 style={{ fontSize: "18px" }}>{intro}</h2>
                        <ul className="txt12 mvdtl" style={{ marginTop: "10px" }}>
                            <li><span>कास्ट: </span>{movieCast}</li>
                            <li><span>डायरेक्टर: </span>{movieDirector}</li>
                            <li><span>संगीत: </span>{movieMusic}</li>
                            <li><span>शैली: </span> {movieGenre} </li>
                            <li style={{ marginBottom: "0" }}><span>पर्दे पर : </span>{movieDate}</li>
                        </ul>
                    </div>
                </div>
            <style jsx global> {`
            .starsprite.mvlg-full {
                background-position: -34px 0;
            }
            .formvlg span {
                width: 17px;
                height: 17px;
                display: inline-block;
            }
            .starsprite {
                background: url(https://images.news18.com/ibnkhabar/uploads/assests/pwa/images/star-sprite.png) no-repeat;
                display: block;
            }
            .star-nmbr {
                margin-right: 4px;
            }
            
            .fl {
                float: left;
            }
            .mvrtngl.formvcnsmpn .mvrtng-str .star-pnts {
                top: -4px;
            }
            
            .mvrtngl .mvrtng-str .star-pnts {
                background: #fc4b52;
                height: 17px;
                line-height: 20px;
                color: #fff;
                font-size: 12px;
                padding: 0 8px;
                border-radius: 3px;
                margin: 0 4px;
            }
            .cnsmpn-hd {
                font-size: 24px;
                color: #303030;
                line-height: 36px;
                font-weight: 700;
                margin: 8px 0;
            }
            .pdngsxtn-lr {
                padding: 10px;
            }
            .mvdtl li {
                margin-bottom: 8px;
            }
            .mvdtl {
                color: #828282;
            }
            .txt12 {
                font-size: 12px;
            }
            .mvdtl li span {
                color: #4f4f4f;
                font-weight: 700;
            }
            .starsprite.mvlg-half {
                background-position: -18px 0;
            }
            `}
            </style>
        </>
        );
}
