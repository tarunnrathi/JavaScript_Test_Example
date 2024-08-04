import { getArticleList } from "api/global/Common";
import LazyLoadImage from "components/Common/CustomImage";
import EventDateWidgetMobile from "components/Common/Olympics/EventDateWidgetMobile";
import { useState } from "react";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Taboola from "widgets/Common/Responsive/Taboola";
import { olympics_year } from "api/Constant";
import PageNavigations from "components/Common/Olympics/PageNavigations";

const NewsMobile = (props) => {
    const { breadCrumbArray, lomp_sdl_with_date, date } = props.data;
    const leadStory = props?.data?.latestStories?.slice(0, 1);
    const [loadMoreData, setLoadMoreData] = useState(props?.data?.latestStories?.length > 0 ? props?.data?.latestStories?.slice(1, props?.data?.latestStories?.length - 1) : 0);
    const [hideLoadMore, setHideLoadMore] = useState(false);
    const loadMore = async () => {
        let tempData = await getArticleList({
            count: 20,
            offset: loadMoreData?.length > 0 ? loadMoreData?.length + 1 : 0,
            filter: { post_type: "text", 'tags.slug': `${olympics_year}-paris-olympics` },
            fields: 'display_headline,weburl_r,images,weburl',
        }, true);
        if (tempData?.length === 0) {
            setHideLoadMore(true);
        }
        setLoadMoreData([...loadMoreData, ...tempData]);
    }
    return (
        <>
            <EventDateWidgetMobile lomp_sdl_with_date={lomp_sdl_with_date}
                date={date}
            />
            <div className="outer">
                <div className="CN-pageWrapper">
                    <div className="add">
                        <div className="addinner-box">
                            <SiteAd
                                slotId="Mobile_ATF_320"
                                width={336}
                                height={280}
                                adUnit={props?.pageAds?.ATF_320}
                                sizes={[
                                    [300, 250],
                                    [336, 280],
                                    [250, 250]
                                ]}
                                lazyload={true}
                            ></SiteAd>
                        </div>
                    </div>
                    <div className="CN-section">
                        <div className="CN-sec-l">
                            <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
                            <PageNavigations title="न्यूज" />
                            {/* CN-innersection start */}
                            <div className="CN-innersection">
                                <div className="cn-heading-1">
                                    <div className="headinner">
                                        <h1>OLYMPICS {olympics_year} <span>News</span></h1>
                                    </div>
                                    <div className="icon"></div>
                                </div>
                                {/*CN-listing-wrap-Mobile START----*/}
                                {/* CN-LeadStory start */}
                                <div className="CN-LeadStory">

                                    <a href={leadStory[0]?.weburl_r || ""} className="CN-LeadHead">
                                        {leadStory[0]?.display_headline}
                                    </a>

                                    <figure>
                                        <a href={leadStory[0]?.weburl_r}>
                                            <LazyLoadImage
                                                src={leadStory[0]?.images.url}
                                                width={360}
                                                height={240}
                                                alt={leadStory[0]?.display_headline}
                                                isLazyLoad={true}
                                            />
                                        </a>
                                    </figure>
                                </div>
                                {/* CN-LeadStory end */}
                                {/* CN-Thumbstory-2 end */}
                                <div>
                                    <ul className="CN-Thumbstory-2">
                                        {loadMoreData?.length > 0 && loadMoreData?.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <a href={item?.weburl_r}>
                                                        <div className="text">
                                                            <p>
                                                                {item?.display_headline}
                                                            </p>
                                                        </div>
                                                        <div className="imgwrap">
                                                            <LazyLoadImage
                                                                src={item?.images.url}
                                                                width={110}
                                                                height={73}
                                                                alt={item?.display_headline}
                                                                isLazyLoad={true}
                                                            />
                                                        </div>
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    {!hideLoadMore && (
                                        <button type="button" onClick={loadMore} className="load_more">
                                            Load More
                                        </button>
                                    )}
                                    <div className="add">
                                        <div className="addinner-box">
                                            <SiteAd
                                                slotId="Mobile_BTF_300"
                                                width={336}
                                                height={280}
                                                adUnit={props?.pageAds?.BTF_300}
                                                sizes={[
                                                    [300, 250],
                                                    [336, 280],
                                                    [250, 250]
                                                ]}
                                                lazyload={true}
                                            ></SiteAd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* CN-innersection end */}
                        </div>
                    </div>
                    <Taboola
                        mode={props?.data?.taboolaList?.rhs?.mode}
                        id={props?.data?.taboolaList?.rhs?.id}
                        container={props?.data?.taboolaList?.rhs?.container}
                        placement={props?.data?.taboolaList?.rhs?.placement}
                    />
                </div>
            </div>
            <style jsx global>{`
          .load_more {
            width: 130px;
            height: 38px;
            background: #ed1c24;
            border-radius: 19px;
            font-size: 17px;
            color: #ffffff;
            line-height: 38px;
            border: none;
            display: table;
            margin: auto;
            cursor: pointer;
            margin-top: 35px;
            margin-bottom: 20px;
          }
          .headinner h1 {
            font-size:24px; line-height: 29px; border-bottom: 1px solid #d8d8d8;
            padding-bottom: 5px;
          }
            .mobinner-ad{display:none;}
            .adbox{display:none;}
            @media (max-width:768px){
              .mobinner-ad{display:block;} 
              .inner-ad{display:none;}
              .wrap-ad{display:none;} 
              .adbox {background: #dbdde3!Important;padding: 16px 0;position: relative;display:block;}
            }
            .outer { max-width: 1244px; margin: 0 auto;padding: 0;clear: both;overflow: hidden;}
                body .CN-pageWrapper > div {margin-bottom: 0px!important;}
                body .CN-section, body .CN-section * {font-family: 'Mukta',sans-serif !important;}
                .CN-section {display: flex;justify-content: space-between;}
                .CN-section .CN-sec-l {	width: 924px;min-width: 924px;}
                .CN-breadcum {font-size: 14px;padding: 4px 0;background: none;border-bottom: 1px dotted #939393;margin-bottom: 10px;line-height: 13px;color: #292929;text-transform: uppercase;}
                .CN-breadcum h1, .CN-breadcum h2 {display: inline-block;}
                .CN-breadcum h1 {font-size: 14px;font-weight: 400;font-family: 'Mukta',sans-serif !important;}
                .newadd{background: #efefef;line-height: 0; display: table; margin: auto;}
                .newadd span{display: block;font-size: 12px;color: #8E8E8E;text-align: center;height: 20px;line-height: 20px;width: 100%;}
                .adbox {
                    background: #dbdde3!Important;
                    padding: 16px 0;
                    position: relative;
                }
                .vsp20 {margin-top: 20px;}
                @media (max-width:768px){
                    * { padding: 0; margin: 0; list-style: none; box-sizing: border-box; text-decoration: none; line-height: 19px; border-collapse: collapse; } body { font-family: 'Mukta',sans-serif!important; margin: 0; padding: 0; font-size: 13px; line-height: 19px; font-weight: 400; } .outer { width: 100%; display: block; overflow: auto !important; } .CN-section{display: block !important;width: 100%;} .CN-section .CN-sec-l { width: 100% !important; min-width: auto !important; } 
                    .CN-breadcum { font-size: 13px; height: 34px; background: none; border-top: none; border-bottom: 1px dashed rgb(147 147 147 / 57%); display: flex; overflow: scroll; padding: 8px 10px 5px 10px; margin-bottom: 0;    line-height: 1.4; } .CN-breadcum a { padding: 0 4px; flex-shrink: 0; } body .CN-breadcum a span { padding: 0 4px 0 0; } body .CN-breadcum h1, body .CN-breadcum h2 { font-size: 13px; line-height: 19px; flex-shrink: 0; }
                    .CN-sec-r {display: none;}
                }
          .cn-heading-1{padding: 0 10px; margin-bottom: 10px; border: none;}
                            .cn-heading-1 div {font-size: 22px;line-height: 20px;color: #e1261d;font-weight: bold;background: #fff;	position: relative;	top: 8px;padding-right: 4px;display: block;text-transform: uppercase;}
                            .cn-heading-1 div span {color: #001D42!important;top: 0;}
                            .pageContent {padding: 10px 10px;font-size: 16px;line-height: 1.5 !important;}
                .CN-LeadStory { margin-bottom: 10px; } .CN-LeadStory .CN-LeadHead { font-size: 18px; line-height: 24px; background: none; padding: 10px;  position: relative; display: block; } .CN-LeadStory .CN-LeadHead a { line-height: 24px; color: #001d42; } .CN-LeadStory figure { height: 240px; overflow: hidden; } .CN-LeadStory figure a { display: block; position: relative; } .CN-LeadStory figure a img { width: 100%; display: block; }
                .CN-Thumbstory-2 { padding: 0 10px; } .CN-Thumbstory-2 li { padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px solid #d7d7d7; } .CN-Thumbstory-2 li { min-height: 85px; } .CN-Thumbstory-2 li a { display: flex; justify-content: space-between; } .CN-Thumbstory-2 li a .text p { font-size: 16px; line-height: 1.5; } .CN-Thumbstory-2 li a .imgwrap { flex: 0 0 110px; margin-left: 10px; height: 73px; overflow: hidden; border-radius: 0; display: flex; align-items: center; justify-content: center; } .CN-Thumbstory-2 li a .imgwrap img { display: block; }		
                
              .add{text-align: center;}
                `}</style>
        </>
    );
}
export default NewsMobile;