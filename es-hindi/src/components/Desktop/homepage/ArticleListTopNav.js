import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const ArticleListTopNav = ({ topMenu, filterDataByCategory, active }) => {    
    if(!topMenu || topMenu.length === 0) {
        return null;
    }
    return (
        <>
            <div className="newbuttonlist">
                {
                    topMenu && topMenu.length > 0 && topMenu.map((item, index) => {                     
                        return (
                            item?.link && item?.link === 'external' ?
                            <a href={publicRuntimeConfig.siteUrl+item?.slug} key={`subMenuList_`+index}>{item.label}</a>
                            :
                            <a className={active === item.slug ? 'active' : ''} key={`subMenuList_`+index} onClick={() => filterDataByCategory(item.slug)}>{item.label}</a>
                        );
                    })
                }
            </div>
            <style jsx global>{`
                .newbuttonlist{display: flex; align-items: center; position:absolute;right: 0; bottom: 10px;padding-left: 7px;} 
                .newbuttonlist a{color: #2F2F2F;font-size: 14px;height: 24px;line-height: 22px;display: block;text-align: center;padding: 0 12px;margin: 0 2px; cursor: pointer}
                .newbuttonlist a.active{background: #E1271C;box-shadow: 0px 3px 6px #00000029;border: 1px solid #E1261C;border-radius: 11px; color: #fff;}
                .newbuttonlist a:last-child{margin-right: 0;}
            `}</style>
        </>
    );
};

export default ArticleListTopNav;
