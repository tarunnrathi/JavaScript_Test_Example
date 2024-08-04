import React from "react";
import ampHelper from "includes/Amp/ampHelper";
import validator from "includes/Amp/validator";
import getConfig from "next/config";
import { imageLoader } from "includes/article.util";
import Byline from "widgets/Amp/Byline";

const { publicRuntimeConfig } = getConfig();

const DistrictArticleCard = (props) => {
    const { article, index, isMobile, activeDistrict } = props;
    const {
        display_headline,
        images,
        updateDate,
        headline,
        url,
        weburl,
        youtubeid,
        intro,
        ff_source,
        tags = [],
    } = article || {};
    const body = validator(ampHelper.getAMPCodes(article.body));

    const firstHalf = body.length > 200 ? body.slice(0, 200) : body;

    let outBrainUrl = (url || weburl).replace(
        /(https|http):\/\/(stg|beta)?hindi.news18.com\//,
        publicRuntimeConfig.siteUrl
    );
    outBrainUrl =
    publicRuntimeConfig.siteUrl+"amp" + outBrainUrl.replace(publicRuntimeConfig.siteUrl, "/").trim();
    const shareUrl = outBrainUrl.substring(1);
    // if (ff_source == "Hyperlocal") {
    //     shareUrl = `amp/news/${outBrainUrl}`;
    //     outBrainUrl = outBrainUrl.replace(/\/.*\//, "");
    //     outBrainUrl = `${publicRuntimeConfig.siteUrl}amp/news/${outBrainUrl}`;
    //     // console.log({outBrainUrl});
    // } else {
    //     outBrainUrl = outBrainUrl.split("-");
    //     outBrainUrl.splice(outBrainUrl.length - 1, 0, "desk");
    //     outBrainUrl = `${publicRuntimeConfig.siteUrl}amp${outBrainUrl.join(
    //         "-"
    //     )}`;
    //     // console.log({ outBrainUrl });
    //     // outBrainUrl = outBrainUrl.join('-')
    //     // console.log({outBrainUrl});
    //     // shareUrl = `news/${currentDistrictSlug}/${outBrainUrl}`;
    //     // outBrainUrl = outBrainUrl.substring(1);
    // }

    // const outBrainUrl = (url || weburl)
    //     .replace(/https:\/\/(stg|beta)?hindi.news18.com\//, ``)
    //     .replace(/[^\/][-a-zA-Z]*/, ``)
    //     .replace(
    //         /[\/][-a-zA-Z-0-9]*/,
    //         `${publicRuntimeConfig.siteUrl}amp/news/${
    //             (activeDistrict || {}).href
    //         }`
    //     );

    return (
        <div className="newdscrtcardbox">
            {youtubeid ? (
                <amp-youtube
                    data-videoid={youtubeid}
                    layout="responsive"
                    width="360"
                    height="240"
                ></amp-youtube>
            ) : (
                <figure>
                    {/* <span className="newdscrt-vdicon"></span> */}
                    <amp-img
                        src={
                            imageLoader(
                                images.url,
                                // props.isFill ? props.imgw : props.width,
                                // props.isFill ? props.imgh : props.height,
                                "360",
                                "240"
                            ) ||
                            publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
                        }
                        width="3"
                        height="2"
                        layout="responsive"
                    ></amp-img>
                    <h3
                        className="article_title"
                        hidden
                        id={`fullcontent${index}caption`}
                    >
                        {images.caption}
                    </h3>
                </figure>
            )}

            <div className="newdscrtcardbox-content">
                <h1>{headline}</h1>
                <div className="newdscrtcardbox-date">
                    <b>LAST UPDATED: </b>
                    {"  " + updateDate}
                </div>
                <div className="newbyeline">
                    <ul className="newbyeline_agency">
                        <Byline bylineData={article} isDistrict={true} />
                    </ul>
                    {/* <ul className={DistrictArticleCardStyle.newbyeline_author}>
                        <BylineAuthor
                            authorByline={authorByline}
                            author={author}
                            isMobile={false}
                        />
                    </ul> */}
                </div>
                <div className="newdscrtcardbox-contentparra">
                    <div
                        id={`halfcontent${index}`}
                        dangerouslySetInnerHTML={{
                            __html: "<h2>" + intro + "</h2>",
                        }}
                    ></div>
                    <div id={`fullcontent${index}`} hidden>
                        <div
                            dangerouslySetInnerHTML={{
                                __html:
                                    "<h2>" +
                                    intro +
                                    "</h2>" +
                                    "<br><br>" +
                                    body,
                            }}
                        />

                        <div className="page_tag">
                            {tags && tags.length
                                ? tags.map((tags, key) => {
                                      return (
                                          <a
                                              key={key}
                                              href={"/tag/" + tags.slug + "/"}
                                          >
                                              {tags.name}
                                          </a>
                                      );
                                  })
                                : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="newdscrtcardbox-btm">
                <div className="newdscrtcardbox-btmshare">
                    <a
                        href={
                            isMobile
                                ? `whatsapp://send?text=${headline} - ${outBrainUrl}`
                                : `https://web.whatsapp.com/send?text=${headline} - ${outBrainUrl}`
                        }
                        className="newdscrt-sharesprite wtsap"
                    ></a>
                    <a
                        href={`https://www.facebook.com/sharer.php?u=${outBrainUrl}&t= 
                    ${headline}`}
                        className="newdscrt-sharesprite fcbk"
                    ></a>
                    <a
                        href={`https://twitter.com/share?text=${headline}&url=${outBrainUrl}`}
                        className="newdscrt-sharesprite twtr"
                    ></a>
                    {/* this only works on https. ref- https://stackoverflow.com/questions/57605848/amp-social-share-type-system-doesnt-seem-to-work-on-chrome-android*/}
                    <amp-social-share
                        type="system"
                        className="newdscrt-sharesprite shr"
                        width="16"
                        height="19"
                        data-param-title={headline}
                        data-param-url={outBrainUrl}
                        aria-label="Share by System"
                    ></amp-social-share>
                </div>
                {body.length > 200 ? (
                    <span
                        className="newdscrtcardbox-btmmore"
                        data-amp-bind-class="visible ? 'newdscrtcardbox-btmmore newdscrtcardbox-btmmore-rotate': 'newdscrtcardbox-btmmore'"
                        role="button"
                        on={`tap:fullcontent${index}.toggleVisibility,halfcontent${index}.toggleVisibility,AMP.setState({visible: !visible}),fullcontent${index}caption.toggleVisibility`}
                        tabIndex="0"
                    >
                        पूरा बुलेटिन पढ़ें
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export default DistrictArticleCard;
