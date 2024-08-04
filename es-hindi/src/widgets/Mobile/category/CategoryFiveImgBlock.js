import React from "react";
import { imageLoader } from "includes/article.util";
import LazyLoadImage from 'components/Common/LazyLoadImage';
import CategoryListing from "widgets/Mobile/category/CategoryListing";

const CatgeoryFiveImgBlock = (props) => {
const smallStories = props?.data && props.data.length > 1 ? [...props.data.slice(1, props.data.length)] : [];
const NewsData = props?.data || [];
const url = props?.url || "";
return (
    <>
        <section className='pdngsxtn clearfix'>
            <div className="glblbghd-sts">
                <h2 className="hd">
                    <a title="link" href={url}>{props?.name || ""}</a>
                </h2>
            </div>
            <div id="clkbuttonpradesh">
                {
                    NewsData && NewsData.length ?
                        <div className="bigstory">
                            <a href={ (NewsData)[0]['url'] || "" }>
                                {
                                    <LazyLoadImage
                                    src={imageLoader((NewsData)[0]['thumbnail'], 360, 288)}
                                    alt={(NewsData)[0]['display_headline'] || (NewsData)[0]['title'] || ''}
                                    title={(NewsData)[0]['display_headline'] || (NewsData)[0]['title'] || ''}
                                    className={"globalmgbox"}
                                    isRes={true}
                                    />
                                }
                            </a>
                            <h3>
                                <div className="tpall">
                                    <span className="tpc">{ (NewsData)[0]['sub_category'] || ""}</span>
                                </div>
                                <a href={ (NewsData)[0]['url'] || "" }>{(NewsData)[0]['display_headline'] || (NewsData)[0]['title'] || ''}
                                </a>
                            </h3>
                        </div>
                    :""
                }
            </div>
        </section>
        {smallStories && smallStories.length ? <CategoryListing data={smallStories} url={url}/> : ""}
        <style global jsx>{`
            .bigstory h3 {
                position: absolute;
                bottom: 0px;
                left: 15px;
                right: 15px;
                background: -webkit-linear-gradient(top, transparent, rgb(17, 17, 17), rgb(0, 0, 0));
                padding: 45px 20px 10px;
            }
            .bigstory h3 a {
                display: block;
                font-size: 18px;
                line-height: 24px;
                color: rgb(255, 255, 255);
                font-weight: 700;
            }
            .tpall {
                line-height: 22px;
                margin-bottom: 8px;
            }
            .tpall span {
                background: #000;
                padding: 0 16px;
                height: 24px;
                line-height: 26px;
                border-radius: 4px;
                font-size: 12px;
                color: #fff;
                display: inline-block;
                position: absolute;
                top: -15px;
                left: 16px;
                font-weight: 400;
            }
        `}
        </style>
    </>
);
};
export default CatgeoryFiveImgBlock;
