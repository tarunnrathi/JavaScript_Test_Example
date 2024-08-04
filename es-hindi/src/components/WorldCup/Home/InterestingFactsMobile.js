import { imageLoader, setDefaultImage } from "includes/article.util";
import { memo, useState } from "react";
import LazyLoadImage from "components/Common/CustomImage";
import { getArticleList } from "api/global/Common";

const InterestingFactsMobile = ({ tabList, interestingFacts }) => {
    if (!interestingFacts || interestingFacts.length === 0) {
        return null;
    }
    const [active, setActive] = useState("kisse-india-pak-ke");
    const [data, setData] = useState(interestingFacts);
    const [dataList, setDataList] = useState({
        left: data.slice(0, 3),
        right: data.slice(3, 11)
    });

    const filterDataByState = async (slug) => {
        setActive(slug);
        const result = await getArticleList({count: 11, filter: {'tags.slug':`${slug}`}, fields: 'id,display_headline,weburl_r,images,headline'}, true);
        if (result.length > 0) {
            setData(result);
            setDataList({ left: result.slice(0, 3), right: result.slice(3, 11) });
        } else {
            setData([]);
            setDataList({ left: [], right: [] });
        }
    };

    return (
        <>
            <ul className="listnavitem">
                {
                    tabList && tabList.length > 0 && tabList.map((item, index) =>
                        <li className={active === item.slug ? 'active' : ''} key={`pradeshBottomMenu` + index}><a onClick={() => filterDataByState(item.slug)}>{item.name}</a></li>
                    )
                }
            </ul>
            <div className="mrg10">
                <ul className="newpradesh-stories">
                    {
                        dataList.left && dataList.left.length > 0 && dataList.left.map((item, index) => {
                            const width = index === 2 ? 72 : 172;
                            const height = index === 2 ? 54 : 137;

                            const imageSrc = imageLoader(item.images.url, width, height);
                            const title = item.headline || item.display_headline;
                            return (
                                <li key={`pradeshRightitem-` + index}>
                                    <a href={item.weburl_r}>
                                        <LazyLoadImage
                                            width={width}
                                            height={height}
                                            src={imageSrc}
                                            alt={title}
                                            title={title}
                                        />
                                        <h3>{title}</h3>
                                    </a>
                                </li>
                            );
                        }
                        )
                    }
                </ul>

                <ul className="nwdotstorieslist">
                    {
                        dataList.right && dataList.right.length > 0 && dataList.right.map((item, index) =>
                            <li key={`pradeshILefttem-` + index}>
                                <a href={item.weburl_r}><h3>{item.display_headline}</h3></a>
                            </li>
                        )
                    }
                </ul>
            </div>
            <style jsx global>{`                          
                   .newpradesh-stories {
                     display: flex;
                     justify-content: space-between;
                     flex-wrap: wrap;
                     margin-bottom: 5px;
                   }
               
                   .newpradesh-stories li {
                     position: relative;
                     width: 49%;
                     background: #F3F3F3;
                     border: 1px solid #DBDBDB;
                     border-radius: 4px;
                   }
               
                   .newpradesh-stories li a figure {
                     width: 100%;
                     height: 110px;
                   }
               
                   .newpradesh-stories li a figure img {
                     width: 100%;
                     height: 110px;
                     border-radius: 4px 4px 0 0;
                   }
               
                   .newpradesh-stories li a h3 {
                     color: #000;
                     line-height: 22px;
                     font-size: 15px;
                     padding: 10px;
                   }
               
                   .newpradesh-stories li:last-child {
                     width: 100%;
                     padding: 10px;
                     margin-top: 10px;
                   }
               
                   .newpradesh-stories li:last-child a h3 {
                     padding: 0;
                   }
               
                   .newpradesh-stories li:last-child a {
                     display: flex;
                     flex-direction: row-reverse;
                   }
               
                   .newpradesh-stories li:last-child a figure {
                     width: 148px !important';
                     height: 54px !important';
                     margin-left: 12px;
                   }
               
                   .newpradesh-stories li:last-child a figure img {
                     width: 100%;
                     height: 54px !important;
                     max-width: 80px;
                     border-radius: 4px;
                   }

                   .nwdotstorieslist {}

                   .nwdotstorieslist li {
                     padding: 10px 15px;
                     border-bottom: 1px solid #e0e0e0;
                     position: relative;
                   }
               
                   .nwdotstorieslist li:before {
                     content: "";
                     background: #707071;
                     width: 5px;
                     height: 5px;
                     position: absolute;
                     top: 20px;
                     margin-top: -3px;
                     left: 0;
                     border-radius: 100%;
                     margin-left: 5px;
                   }
               
                   .nwdotstorieslist li a h3 {
                     font-size: 15px;
                     line-height: 22px;
                     color: #000000;
                     font-weight: normal;
                   }

                   .listnavitem {
                    display: flex;
                    height: 40px;
                    background: #F4F4F4;
                    overflow: scroll;
                    padding: 0 10px;
                    align-items: center;
                    border-bottom: 1px solid #D3D2D2;
                  }
              
                  .listnavitem li {
                    flex-shrink: 0;
                    height: 22px;
                    margin-right: 20px;
                  }
              
                  .listnavitem li a {
                    color: #2F2F2F;
                    font-size: 14px;
                    height: 22px;
                    line-height: 22px;
                    display: block;
                    text-align: center;
                    cursor: pointer;
                  }
              
                  .listnavitem li.active a {
                    background: #E1271C;
                    box-shadow: 0px 3px 6px #00000029;
                    border: 1px solid #E1261C;
                    border-radius: 11px;
                    color: #fff;
                    padding: 0 12px;
                  }
                .mrg10 {
                    margin-bottom: 30px;
                }                       
            `}</style>
        </>
    );
};

export default memo(InterestingFactsMobile);
