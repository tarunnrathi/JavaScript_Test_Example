import React from "react";
import Head from "next/head";
import LazyLoadImage from "components/Common/CustomImage";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";

const getGalleryAd = (adUnit, slotId = 0) => {
    return (
        <NewSiteAd
            slotId={"Desktop_Static_Ad_" + slotId}
            adUnit={adUnit}
            sizes={[[300, 250]]}
            width={300}
            height={219}
            removeAdSpan={true}
            lazyLoad={true}
        />
    );
};
const PhotogalleryTopPriority = (props) => {
    if (!props.sliderFlag) {
        return false;
    }
    return (
        <>
            <Head>
                <script src="https://images.hindi.news18.com/ibnkhabar/uploads/assests/js/glide.min.js"></script>
            </Head>
            <div className="clearfix vsp10"></div>
            <div className="photoGalleryWrapper">
                <div className=" top_phg_widget">
                    <h2 className=" ph_main_ttl">NEWS18 PHOTOS</h2>
                    <div className=" top_phgw_wrp">
                        <div className="col_side">
                            {props?.data?.rightCat?.slice(0, 2).map((topNews, key) => {
                                return (
                                    <div className="col" key={"col_side" + key}>
                                        <div className=" img_wrp">
                                            <a href={topNews?.weburl} >
                                                <LazyLoadImage
                                                    src={topNews?.images?.url}
                                                    width="306" height="204"
                                                    alt={topNews?.display_headline}
                                                    title={topNews?.display_headline}
                                                />
                                            </a></div>
                                        <div className="content_wrp">
                                            <ul className=" count">
                                                <li className=""><img src="/images/siteimages/newphotoicon_1669352291.png" width="19" height="16" className="" /></li>
                                                <li className=""><span className="">{topNews?.categories? topNews?.categories[0]?.slug?.toUpperCase():null}</span></li>
                                            </ul>
                                            <div className="copy"><a href={topNews?.weburl}>{topNews?.display_headline}</a></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className=" col_middle">
                            {props?.data?.leftCat.slice(0, 4).map((topNews, index) => {
                                return (
                                    <div className=" col" key={"col_middle" + index}>
                                        <div className="img_wrp"><a href={topNews?.weburl}>
                                            <LazyLoadImage
                                                src={topNews?.images?.url}
                                                width={index == 0 ? "612" : "197"}
                                                height={index == 0 ? "408" : "131"}
                                                className=" ls-is-cached lazyloaded"
                                                alt={topNews?.display_headline}
                                                title={topNews?.display_headline}
                                            />
                                        </a></div>
                                        <div className="content_wrp">
                                            <ul className=" count">
                                                <li className="">
                                                    <img src="/images/siteimages/newphotoicon_1669352291.png" width="19" height="16" className="" />
                                                </li>
                                                <li className=""><span className="">{topNews?.categories ? topNews?.categories[0]?.slug?.toUpperCase():null}</span></li>
                                            </ul>
                                            <div className="copy"><a href={topNews?.weburl}>{topNews?.display_headline}</a></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className=" col_side">
                            {props?.data?.rightCat.slice(1, 3)?.map((topNews, key) => {
                                return (
                                    key === 0
                                        ? (
                                            <div className="col" key={"col_side_right" + key}>
                                                <div className="shosh_ad"> {getGalleryAd(props.pageAds.ATF_300_id, 0)} </div>
                                            </div>
                                        )
                                        : (<div className="col" key={"col_side_right" + key}>
                                            <div className=" img_wrp">

                                                <a href={topNews?.weburl} >
                                                    <LazyLoadImage
                                                        src={topNews?.images?.url}
                                                        width="306" height="204"
                                                        alt={topNews?.display_headline}
                                                        title={topNews?.display_headline}
                                                    />
                                                </a>
                                            </div>
                                            <div className="content_wrp">
                                                <ul className=" count">
                                                    <li className=""><img src="/images/siteimages/newphotoicon_1669352291.png" width="19" height="16" className="" /></li>
                                                    <li className=""><span className="">{topNews?.categories ? topNews?.categories[0]?.slug?.toUpperCase():null}</span></li>
                                                </ul>
                                                <div className="copy"><a href={topNews?.weburl}>{topNews?.display_headline}</a></div>
                                            </div>
                                        </div>
                                        )
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
            .photoGalleryWrapper {
                margin-bottom: 30px;
            }
            .photoGalleryContainer {
                max-width: 1284px;
                margin: 0 auto;
                background: #fff;
                padding: 20px;
            }
            .top_phgw_wrp {
                  display: flex;
                  justify-content: space-between;
                  padding-bottom: 20px;
                  border-bottom: #d9d9d9 solid 4px;
                  margin-bottom: 20px;
                }
                .top_phgw_wrp .col_side {
                  max-width: 306px;
                }
                .top_phgw_wrp .col {
                  background: white;
                  box-shadow: 0px 3px 6px #00000029;
                  position: relative;
                }
                .top_phgw_wrp .col .img_wrp {
                  line-height: 0;
                }
                .top_phgw_wrp .col:first-child {
                  margin-bottom: 10px;
                }
                .top_phgw_wrp .col_side .col {
                  min-height: 306px;
                }
                .top_phgw_wrp .content_wrp {
                  padding: 7px 10px 3px;
                  background: white;
                }
                .top_phgw_wrp .count {
                  display: flex;
                  align-items: center;
                  margin-bottom: 8px;
                }
                .top_phgw_wrp .count li {
                  display: flex;
                  align-items: center;
                  font-size: 12px;
                  line-height: 11px;
                  color: #ec2028;
                  text-shadow: 0px 3px 6px #00000029;
                }
                .top_phgw_wrp .count li span {
                  font-size: 12px;
                  line-height: 11px;
                  color: #ec2028;
                  text-shadow: 0px 3px 6px #00000029;
                  padding-top: 4px;
                }
                .top_phgw_wrp .count img {
                  margin-right: 5px;
                }
                .top_phgw_wrp .count li:last-child::before {
                  content: "";
                  width: 4px;
                  height: 4px;
                  background: #a5a5a5;
                  display: inline-block;
                  margin: 0 10px;
                  border-radius: 10px;
                }
                .top_phgw_wrp .copy {
                  font-weight: bold;
                  font-size: 14px;
                  line-height: 20px;
                  color: #001d42;
                }
                .top_phgw_wrp .col_middle {
                  max-width: 612px;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                }
                .top_phgw_wrp .col_middle .col {
                  width: 197px;
                }
                .top_phgw_wrp .col_middle .col:first-child {
                  width: 100%;
                  box-shadow: unset;
                }
                .top_phgw_wrp .col_middle .col:first-child .content_wrp {
                  position: absolute;
                  bottom: 5px;
                  left: 5px;
                  right: 5px;
                }
                .top_phgw_wrp .col_middle .col:not(:first-child) .copy {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 2;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                }
                .phg_bottom_wrp {
                  display: flex;
                }
            `}</style>
        </>
    );
};
export default PhotogalleryTopPriority;
