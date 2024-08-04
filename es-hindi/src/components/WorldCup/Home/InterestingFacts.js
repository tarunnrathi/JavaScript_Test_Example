import { memo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getArticleList } from "api/global/Common";
import LazyLoadImage from "components/Common/CustomImage";

const InterestingFacts = ({ interestingFacts, tabList }) => {
    if (!interestingFacts || interestingFacts.length === 0) {
        return null;
    }
    const [isLoading, setLoading] = useState(false);
    const [active, setActive] = useState("kisse-india-pak-ke");
    const [data, setData] = useState(interestingFacts);
    const [dataList, setDataList] = useState({
        left: data.slice(0, 3),
        right: data.slice(3, 11)
    });

    const filterDataByState = async (slug) => {
        setActive(slug);
        setLoading(true);
        const result = await getArticleList({count: 11, filter: {'tags.slug':`${slug}`}, fields: 'id,display_headline,weburl_r,images,headline'}, true);
        if (result.length > 0) {
            setData(result);
            setDataList({ left: result.slice(0, 3), right: result.slice(3, 11)});
        } else {
            setData([]);
            setDataList({ left: [], right: []});
        }
        setLoading(false);
    };

    return (
        <>
            {
                tabList && tabList.length > 0 && (
                    <div className="newpradeshlist">
                        <ul>
                            {
                                tabList.map((item, index) =>
                                    <li key={`pradeshBottomMenu` + index}><a className={active === item.slug ? 'active' : ''} onClick={() => filterDataByState(item.slug)}>{item.name}</a></li>
                                )
                            }
                        </ul>
                    </div>
                )
            }

            {
                !isLoading ? (
                    <div className="newpradeshwrap">
                        <ul className="newpradesh-left">
                            {
                                dataList.left && dataList.left.length > 0 && dataList.left.map((item, index) => {
                                    const width = index === 2 ? 85 : 205;
                                    const height = index === 2 ? 54 : 137;
                                    const imageSrc = item?.images?.url;
                                    const title = item?.headline || item?.display_headline;
                                    return (
                                        <li key={`pradeshRightitem-` + index}>
                                            <a href={item.weburl_r}>
                                                <figure width={width} height={height}>
                                                    <LazyLoadImage
                                                        src={imageSrc}
                                                        width={width}
                                                        height={height}
                                                        alt={item.title}
                                                        title={item.title}
                                                    />
                                                </figure>
                                                <h3>{title}</h3>
                                            </a>
                                        </li>
                                    );
                                }
                                )
                            }
                        </ul>
                        <ul className="newpradesh-right">
                            {
                                dataList.right && dataList.right.length > 0 && dataList.right.map((item, index) =>
                                    <li key={`pradeshILefttem-` + index}>
                                        <a href={item.weburl_r}><h3>{item.display_headline}</h3></a>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                ) : (
                    <Skeleton height={358} />
                )
            }
            <style jsx global>{`
                .newpradeshlist{margin-top: 40px; position: relative;background: #F4F4F4;height: 40px;}
                .newpradeshlist:after{content: "";background: #D3D2D2;height: 1px;position: absolute;left: -15px;right: 0px;bottom: -2px;}
                .newpradeshlist > div{overflow: hidden;}
                .newpradeshlist ul{display: flex;  height: 40px;align-items: center;} 
                .newpradeshlist ul li{flex-shrink: 0; width: auto !important; }
                .newpradeshlist ul li a{color: #2F2F2F;font-size: 17px;height: 22px;line-height: 22px;display: block;text-align: center;padding: 0 12px;margin: 0 5px;cursor:pointer;}
                .newpradeshlist ul li a.active {background: #E1271C;box-shadow: 0px 3px 6px #00000029;border: 1px solid #E1261C;border-radius: 11px; color: #fff;}
                .newpradeshlistarrow{}
                .newpradeshlistarrow button{position: absolute;top: 0px;width: 14px;height: 40px;background: #E3E3E3;left: -15px; border: 0; cursor: pointer;}
                .newpradeshlistarrow button:last-child{right: -15px;left: auto;transform: rotate(180deg);}
                .newpradeshlistarrow button:before {content: "";position: absolute;width: 5px;height: 5px;border-top: 1px solid #000;border-left: 1px solid #000;transform: rotate(-45deg);top: 17px;left: 6px;}
                .newpradeshlistarrow button:after{left:8px}   
                .newpradeshwrap{display: flex; justify-content: space-between; margin-top: 15px;}
                .newpradesh-right{width: 470px;border-left: 1px solid #e0e0e0;padding-left: 20px;}
                .newpradesh-right li{padding: 10px 15px;border-bottom: 1px solid #e0e0e0;position: relative;}
                .newpradesh-right li:last-child{border: none;}
                .newpradesh-right li:before{content: "";background: #707071;width: 5px;height: 5px;position: absolute;top: 50%;margin-top: -3px;left: 0;border-radius: 100%;}
                .newpradesh-right li a h3{-webkit-line-clamp: 1;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 15px;line-height: 22px;color: #000000;font-weight: normal;}
                .newpradesh-left li:last-child a figure, .newpradesh-left li:last-child a figure img {
                    max-width: 85px;
                    min-width: 85px;
                    min-height: 54px;    
                    max-height: 54px;
                    margin-right: 10px;
                    border-radius: 4px !important;
                } 
                .newpradesh-left{width: 430px; flex-shrink: 0; display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap;}
                .newpradesh-left li{position: relative; width: 205px; background: #F3F3F3; border: 1px solid #DBDBDB; border-radius: 4px; overflow: hidden;}
                .newpradesh-left li a figure{width: 205px; height: 137px;}
                .newpradesh-left li a figure img{width: 205px; height: 137px; border-radius: 4px 4px 0 0;}
                .newpradesh-left li a h3{color: #000;line-height: 22px;font-size: 15px; padding:5px 10px 10px 10px;}
                .newpradesh-left li:last-child{width: 100%;    padding: 10px;}
                .newpradesh-left li:last-child a h3{padding: 0;}
                .newpradesh-left li:last-child a{display: flex;}
                .newpradesh-left li:last-child a figure{width: 80px !important; height: 54px !important; margin-right: 12px}
                .newpradesh-left li:last-child a figure img{width: 80px !important; height: 54px !important; max-width: 80px; border-radius: 4px;}        
            `}</style>
        </>
    );
};

export default memo(InterestingFacts);
