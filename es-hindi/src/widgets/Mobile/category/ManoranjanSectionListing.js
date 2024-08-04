import React from "react";
import CategoryListing from "widgets/Mobile/category/CategoryListing";
import CatgeoryFiveImgBlock from "widgets/Mobile/category/CategoryFiveImgBlock";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const setGalleryAd = (adType='', ad = '', slotId="") => {
    const sizes = [[300, 250], [336, 280]];
    return (
        <div className='clearfix add cat-top-ad'>
            <div className="addinner-box">
                <SiteAd
                    slotId={slotId}
                    adUnit={ad}
                    sizes={sizes}
                    width={300}
                    height={280}
                    lazyload={true}
                />
            </div>
        </div>
    );
};

const ManoranjanSectionListing = (props) => {
    const manoranjanData = props.data;
    const manoranjanUrlData = props.urlData;
    let addIndex = 0;
    return (
        manoranjanUrlData.map((urlData, index) => {
            const dataLength = manoranjanData?.[urlData.sub_section +"_"+ urlData.section] && manoranjanData[urlData.sub_section +"_"+ urlData.section].length;
            const dataArr = dataLength ? manoranjanData[urlData.sub_section +"_"+ urlData.section] : [];
            const url = urlData?.slug ? urlData.slug.replace('?fromWhere=manoranjan', '') : '';
            if(dataLength) {
                addIndex++;
            }
            return (
                <>
                    {
                        dataLength && urlData.type == 'box'
                        ? <CatgeoryFiveImgBlock data={dataArr} name={urlData.name} url={url}/>
                        : (dataLength && urlData.type != 'box' ? <CategoryListing data={dataArr} name={urlData.name} url={url} subsection={urlData?.sub_section || ""}/> : "")
                    }
                    {addIndex == 3 ? setGalleryAd('atf', props.pageAds.BTF_300, 'ATF_300') : ''}
                    {addIndex == 6 ? setGalleryAd('btf', props.pageAds.BTF_300, 'BTF_300') : ''}
                </>
            );
        })
    );
};

export default ManoranjanSectionListing;
