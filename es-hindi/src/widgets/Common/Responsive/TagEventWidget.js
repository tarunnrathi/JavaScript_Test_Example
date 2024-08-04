import { memo } from "react";
import { imageLoader } from 'includes/article.util';
import siteConfig from 'config/site.config';

const TagEventCommon = (props) => {
    const device = props.name;
    const data = props.dataList;

    const setDefaultImage = ({ target }) => {
        target.src = target.dataset?.src;
        target.srcset = target.dataset?.src;
        target.onError = '';
    };

    return (
        <>
            {
                (props.topic=='warrior-mothers' && device=='desktop') ? (
                    <>
                        <div className="clearfix">
                            <img src="https://images.news18.com/ibnkhabar/uploads/assests/images/warrier-mother-desktop.jpg" alt="MOTHER'S DAY 2020 (मदर्स डे) " title="MOTHER'S DAY 2020 (मदर्स डे) " style={{ width: "100%" }} />
                        </div>
                    </>
                ): (props.topic== 'world-environment-day' && Object.keys(data).length > 0 && device=='desktop') ? (
                    <>
                        <div className="tag-with-heading-intro">
                            <figure>
                                <a href="javascript:void(0)">
                                <img
                                    src={imageLoader(data.term_image, 542, 363, false, true)}
                                    width="542"
                                    height="363"
                                    data-src={`${siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}?impolicy=website&width=542`}
                                    onError={setDefaultImage}
                                    alt={data.term_name}
                                    title={data.term_name}
                                />
                                </a>
                            </figure>
                            <div className="tag-with-intro">
                                <div className="tag-with-intro-sharewrap">
                                    <h2>World Environment Day</h2>
                                    <div className="tag-with-intro-share">
                                        <a href="https://www.facebook.com/sharer.php?u=" target="_blank"><img src="https://images.news18.com/ibnkhabar/uploads/2016/12/fb-nw.png" title="Follow on Facebook" alt="Facebook" /></a>
                                        <a href="https://twitter.com/share?url=" target="_blank"><img src="https://images.news18.com/ibnkhabar/uploads/2016/12/tw-nw.png" title="Follow on Twitter" alt="Twitter"/></a>
                                        <a href="https://www.linkedin.com/shareArticle/?mini=true&url=" target="_blank" rel="nofollow"><img src="https://images.news18.com/ibnkhabar/uploads/assests/img/lk-nw.png" title="Follow on LinkedIn" alt="LinkedIn"/></a>
                                    </div>
                                </div>
                                <div className="scrollforcontent">
                                    <div className="scrollforcontent-in">
                                        <ul className="tag-ocpn">
                                        </ul>
                                        <p>{data.term_description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (props.topic== '' && device=='desktop-rhs') ? (
                    <>

                    </>
                ) :null
            }
        </>
    );
};
export default memo(TagEventCommon);
