Directions of using videowall components and widgets
1. Use VideoWallWidget for Home and category page, use it like below code
    Note: This is a Desk Videos Widget
    <VideoWallWidget 
        language={"punjabi"} 
        strategy={"CSR"} 
        orientation="portrait" 
        page="category" 
        category={props?.data?._pageParam.category} 
        videoWallData={props?.data?.videoWallDataPortrait} // optional, pass only in case of strategy = SSR
        title={"ਵੀਡੀਓ"} // optional
        moreBtn={"ਹੋਰ ਵੇਖੋ"} // optional
    />
    OR
    <VideoWallHome 
        language={"punjabi"} 
        strategy={"CSR"} 
        title={"ਵੀਡੀਓ"} // optional
        moreBtn={"ਹੋਰ ਵੇਖੋ"} // optional
        orientation="portrait" 
        page="home" 
        videoWallData={props?.data?.videoWallDataPortrait} // optional, pass only in case of strategy = SSR
        />
        
    Props required for widget:
        language={"punjabi"} 
        strategy={"CSR"} 
        title={"ਵੀਡੀਓ"} // optional
        moreBtn={"ਹੋਰ ਵੇਖੋ"} // optional
        videoWallData={props?.data?.videoWallDataPortrait} // optional, pass only in case of strategy = SSR
        category = pageparam.category
        Orientation = portrait|landscape|video-wall
        page = category|home|article

    API home page
        Landscape: `${publicRuntimeConfig.nodeApiAjaxUrl}/solr?limit=5&sort=update_date&qs=video_type_s:"desk"ANDdisplay_status_s:1ANDmongo_id_s:*ANDvideo_rotation_s:2&filter=`
        Portrait: `${publicRuntimeConfig.nodeApiAjaxUrl}/solr?limit=5&sort=update_date&qs=video_type_s:"desk"ANDdisplay_status_s:1ANDmongo_id_s:*ANDvideo_rotation_s:1&filter=`
    API catrgory page
        Landscape: `${publicRuntimeConfig.nodeApiAjaxUrl}/solr?limit=5&sort=update_date&qs=video_type_s:"desk"ANDdisplay_status_s:1ANDmongo_id_s:*ANDvideo_rotation_s:2ANDcategories_slug:(${category})&filter=`
        Portrait: `${publicRuntimeConfig.nodeApiAjaxUrl}/solr?limit=5&sort=update_date&qs=video_type_s:"desk"ANDdisplay_status_s:1ANDmongo_id_s:*ANDvideo_rotation_s:1ANDcategories_slug:(${category})&filter=`

    For Desktop, Use File: common_react/CommonSrc/CommonComponents/videoWall/Desktop/VideoWallWidget
    For Mobile, use File: common_react/CommonSrc/CommonComponents/videoWall/Mobile/VideoWallWidget

2. Use VideoWallCarousel for article consumption page
    Note: This is local 18 video widget
    API if article has video wall
        `${publicRuntimeConfig.nodeApiAjaxUrl}/solr?limit=3&sort=update_date&qs=video_wall_i:1 AND ff_source:hyperlocal AND -local18_video_s:""${catId && ` AND categories_slug:(${catId})`}&filter=ff_source,local18_video_s,display_headline,post_image,thumbnail,url`

    Use code below to integrate video wall carousel on article consumption page
    {
        articleData?.video_wall && 
        <VideoWallCarousel
            language="punjabi"
            strategy="CSR"
            videowallCategory={videowallCategory}
            postId={urlParam.post_id}
        />
    }

    Pass value of category from articleProps:
    videowallCategory: catId || ""

    For Both Desktop and Mobile, use File: common_react/CommonSrc/CommonComponents/videoWall/Desktop/VideoWallCarousel
 
3. Video-wall Page: This is the page where user will land after clicking on any video item from widget or carousel
    Note: This page is for local18 videos only
    Step 1. ssrProps: In your ssrProps file, call videoWallHelper function getVideoWallProps like this:
    // sample values which are required to pass in this fn.
    let protocol = "https://";
    let host = context.req.headers.host;
    let language = "punjabi";
    let currentUrl = ignoreQueryParams(protocol + host + context.req.url, false).toLowerCase();
    const urlParam = context.query;
    
    jsonLDForWebPage and jsonLdForHomeSiteNavigation for your page seo JSON LD script data.

    await getVideoWallProps(language, currentUrl, urlParam, isAmp, isMobile, menuData, protocol, host, jsonLdForWebPage, jsonLdForHomeSiteNavigation, siteHelper.getSetTargettingValues);

    Above function will return few parameters required for our page meta, seo, ads, page content etc like this:
    { videoWalls, pageSeo, pageAds, shareUrlPrefix, orientation, category, initialPageLimit, meta }

    return above items in pageProps which will be used in your Desktop or Mobile layout and in your main component file.

    Step 2. Import MainVideoWall.js file from common_react repo folder as main component which will be passed to your DesktopLayout props and it will render the page.

    For Desktop, use File: common_react/CommonSrc/CommonComponents/videoWall/Desktop/MainVideoWall
    For Mobile, use File: common_react/CommonSrc/CommonComponents/videoWall/Mobile/MainVideoWall
    
    API Used in video list:
    If you have vidid in your query param:
        `${publicRuntimeConfig.apiUrl}/solr?limit=1&qs=video_type_s:desk AND display_status_s:1 AND mongo_id_s:${sharedVidId} AND video_rotation_s:${orientation === "landscape" ? "1" : "2"}&filter=*`

    if(orientation === "portrait" || orientation === "landscape")
        `${publicRuntimeConfig.apiUrl}/solr?limit=15&sort=update_date&qs=video_type_s:desk AND display_status_s:1 AND mongo_id_s:* AND video_rotation_s:${orientation === "landscape" ? "2" : "1"}${category && ` AND categories_slug:(${category})`}&filter=`
    else
        `${publicRuntimeConfig.apiUrl}/solr?limit=15&sort=update_date&qs=video_wall_i:1 AND ff_source:hyperlocal AND -local18_video_s:""${category && ` AND categories_slug:(${category})`}&filter=ff_source,local18_video_s,display_headline,headline,post_image,intro,id,posturl,article_data,url,thumbnail`

4. VideoWallWidget For AMP:
    Note: This is for Desk Videos Only
    // Portrait Mode Widget
    {
        props?.data?.videoWallDataPortrait && props?.data?.videoWallDataPortrait?.length > 0 && 
        <VideoWallHome 
            language="punjabi"
            orientation="portrait" 
            page="home" 
            videoWallData={props?.data?.videoWallDataPortrait} 
        />
    }
    // Landscape Mode Widget
    {
        props?.data?.videoWallDataLandscape && props?.data?.videoWallDataLandscape?.length > 0 && 
        <VideoWallHome 
            language="punjabi"
            orientation="landscape" 
            page="home" 
            videoWallData={props?.data?.videoWallDataLandscape} 
        />
    }

    Call 2 API's in homeProps and pass them in pageProps:
    let [
        videoWallDataLandscape=[],
        videoWallDataPortrait=[]
    ] = await Promise.all([
        fetchUtility(`${publicRuntimeConfig.apiUrl}/solr?limit=5&sort=update_date&qs=video_type_s:"desk"ANDdisplay_status_s:1ANDmongo_id_s:*ANDvideo_rotation_s:1&filter=`, []),
        fetchUtility(`${publicRuntimeConfig.apiUrl}/solr?limit=5&sort=update_date&qs=video_type_s:"desk"ANDdisplay_status_s:1ANDmongo_id_s:*ANDvideo_rotation_s:2&filter=`, [])
    ]);

    return these 2 props in pageData Props for SSR rendering:
    videoWallDataLandscape,
    videoWallDataPortrait,
    
	For AMP, use File: common_react/CommonSrc/CommonComponents/videoWall/Amp/VideoWallWidget

5. New Article portrait widget:
    Note: This is for Desk Videos Only
// file name: VideoWallWidget
// include this for article body parser, add after 3rd paragraph of article
    if (index == 3 && !isAjax) {
        let tags_slug = (article.tags && article.tags.length > 0) ? article.tags.map((item) => item.slug).join(',') : '';
        parsedBody.push(`<videowall device="${!isDesktop ? "mobile" : "desktop"}" tags="${tags_slug}" category="${categories && categories[0] && categories[0].slug}"></videowall>`);
    }

// include this in articlebody
    // import both desktop and mobile widget
    const VideoWallWidget = dynamic(import("../../../common_react/CommonSrc/CommonComponents/videoWall/Desktop/VideoWallWidget"));
    const VideoWallWidgetMobile = dynamic(import("../../../common_react/CommonSrc/CommonComponents/videoWall/Mobile/VideoWallWidget"));

// create a case of videowall and render actual components accordingly
    case "videowall":
              return domNode.attribs?.device == "desktop" ? (
                <div id="article-portrait-widget">
                  <VideoWallWidget
                    tags={domNode.attribs?.tags}
                    category={domNode.attribs?.category}
                    language={"punjabi"} 
                    strategy={"CSR"} 
                    orientation="portrait" 
                    page="article"
                  ></VideoWallWidget>
                </div>
              ) : (
                <div id="article-portrait-widget">
                  <VideoWallWidgetMobile
                    tags={domNode.attribs?.tags}
                    category={domNode.attribs?.category}
                    language={"punjabi"} 
                    strategy={"CSR"} 
                    orientation="portrait" 
                    page="article"
                  ></VideoWallWidgetMobile>
                </div>
              );

6. Video-wall Page for Multi Tenant: This is the page where user will land after clicking on any video item from widget or carousel
    Note: This page is for local18 videos only
    Step 1. ssrProps: In your ssrProps file, call mtvideoWallHelper function getVideoWallProps like this:
    // sample values which are required to pass in this fn.
    let protocol = "https://";
    let host = context.req.headers.host;
    let language = "punjabi";
    let currentUrl = ignoreQueryParams(protocol + host + context.req.url, false).toLowerCase();
    const urlParam = context.query;
    
    jsonLDForWebPage and jsonLdForHomeSiteNavigation for your page seo JSON LD script data.

    await getVideoWallProps(language, currentUrl, urlParam, isAmp, isMobile, menuData, protocol, host, jsonLdForWebPage, jsonLdForHomeSiteNavigation, siteHelper.getSetTargettingValues, siteConfig);

    Above function will return few parameters required for our page meta, seo, ads, page content etc like this:
    { videoWalls, pageSeo, pageAds, shareUrlPrefix, orientation, category, initialPageLimit, meta }

    return above items in pageProps which will be used in your Desktop or Mobile layout and in your main component file.

    Step 2. Import MTVideoWall.js file from common_react repo folder as main component which will be passed to your DesktopLayout props and it will render the page.

    For Desktop, use File: common_react/CommonSrc/CommonComponents/videoWall/Desktop/MTVideoWall
    For Mobile, use File: common_react/CommonSrc/CommonComponents/videoWall/Mobile/MTVideoWall