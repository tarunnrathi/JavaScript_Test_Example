import ReadMore from "components/Desktop/common/ReadMore";
import { memo } from "react";
import Heading from "../common/Heading";
import getConfig from "next/config";
import { getCompleteURL } from "util/global/Helper";
import LazyLoadImage from "components/Common/CustomImage";

const { publicRuntimeConfig } = getConfig();

const VideoList = ({
    data,
    heading,
    link
}) => {
    if(!data || data.length === 0) {
        return null;
    }
    return (
        <>
            <div className="newcontainer clearfix">
                <div className="newglblhdwrap">
                    <Heading
                        categoryLink={link}
                        heading={heading}
                    />
                </div>
                <div className="newvideowrap">
                    <ul className="newvideolist">
                    {
                        data && data.length > 0 && data.map((item, index) => {
                            const title = item?.display_headline || item?.headline;
                            const Width = 224;
                            const Height = 148;
                            return (
                                <li key={`homePage`+index}>
                                    <a href={getCompleteURL(item?.weburl_r, item?.weburl)}>
                                        <figure width={Width} height={Height}>       
                                            <LazyLoadImage
                                                src={item?.images?.url}
                                                alt={title}
                                                title={title}
                                                width={Width}
                                                height={Height}
                                            />
                                        </figure>
                                        <h3>{title}</h3>
                                    </a>
                                </li>
                            );
                        })
                    }
                    </ul>
                    <div className="newvideolistbtn">
                        <ReadMore
                            link={link}
                            label={`और भी वीडियो देखें`}
                        />
                    </div>
                </div>

                <div className="vsp40 clearfix"></div>
            </div>
            <style jsx global>{`
                .newcontainer {
                    max-width: 1244px;
                    margin: auto;
                }
                .clearfix {
                    clear: both;
                }
                .newvideowrap{background: #212121;border-radius: 4px; padding: 20px 20px 10px 20px;} 
                .newvideolist{display: flex; gap: 20px;}
                .newvideolist li{border: 1px solid #5C5C5C;border-radius: 4px; background: #000000; position: relative;}
                .newvideolist li a figure{width: 224px; height: 146px; border-radius: 0;border-bottom: 1px solid #5C5C5C; overflow: hidden;}
                .newvideolist li a figure:after{position: absolute; top: 0; right: 0; bottom: 0; left: 0;background: #000000;border-radius: 4px 4px 0px 0px;opacity: 0.1; content: "";}
                .newvideolist li a figure:before{content: "";position: absolute;top: 35%;left: 50%;background: url(/images/siteimages/videoicon_1669351679.svg) 0 0 no-repeat;width: 32px;height: 32px;margin: -16px 0 0 -16px; z-index: 1;}
                .newvideolist li a figure img{width: 224px; height: 148px; transform:scale(1);transition:.3s ease-in-out;  min-height: 148px;  max-height: 148px;}
                .newvideolist li:hover a figure img{transform:scale(1.2); transition:.3s ease-in-out;}
                .newvideolist li a h3{color: #fff;font-size: 15px;line-height: 22px;padding:10px;white-space: break-spaces; word-break: break-all;}
                .newvideolistbtn{background: #E1261D;box-shadow: 0px 3px 6px #00000029;border: 1px solid #FFFFFF;border-radius: 15px;display: table;margin: 15px auto 5px auto;height: 30px;padding: 3px 20px 0 20px;}
                .newvideolistbtn *{filter: brightness(0) invert(1);}                
            `}</style>
        </>
    );
};

export default memo(VideoList);
