const ArticleListTopNav = ({ topMenu, filterDataByCategory, active }) => {
    if(!topMenu || topMenu.length === 0) {
        return null;
    }
    return (
        <>
            <ul className="listnavitem">
                {
                    topMenu && topMenu.length > 0 && topMenu.map((item, index) => {
                        return (
                            <li className={active === item.slug ? 'active' : ''} key={`subMenuList_`+index} onClick={() => filterDataByCategory(item.slug)}><a>{item.label}</a></li>
                        );
                    })
                }
            </ul>
            <style jsx global>{`
                .listnavitem{display: flex;height: 40px;background: #F4F4F4;overflow: scroll;padding: 0 10px;align-items: center;border-bottom: 1px solid #D3D2D2;}
                .listnavitem li {flex-shrink: 0;    height: 22px; margin-right: 20px;}
                .listnavitem li a {color: #2F2F2F;font-size: 14px;height: 22px;line-height: 22px;display: block;text-align: center;}
                .listnavitem li.active a{background: #E1271C;box-shadow: 0px 3px 6px #00000029;border: 1px solid #E1261C;border-radius: 11px;color: #fff;padding: 0 12px;}
            `}</style>
        </>
    );
};

export default ArticleListTopNav;
