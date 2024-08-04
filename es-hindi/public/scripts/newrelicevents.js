
function pageFinder(url = '', eveName = '') {
    let category = '', eventCategory = '';

    // article page
    if(url.includes('/news/') && url.split('/')[3] === 'news'){
        // feature article
        if(document.getElementsByClassName('artcl_contents_img')[0]?.children[0]?.className.includes('localvideopl')){
            switch (eveName) {
                case 'componentLoad':
                    eventCategory = 'Video_Feature_Componentload_Article_Minutely'
                    break;
                case 'componentImpression':
                    eventCategory = 'Video_Feature_Impression_Article_Minutely'
                    break;
                case 'apvImpression':
                    eventCategory = 'Video_Feature_Impression_Article_Slot_Minutely'
                    break;
                case 'apvClick':
                    eventCategory = 'VOD_Feature_Video_Minutely'
                    break;          
                default:
                    break;
            }
        }else{      // image article 
            switch (eveName) {
                case 'componentLoad':
                    eventCategory = 'Video_Embed_Componentload_Article_Minutely'
                    break;
                case 'componentImpression':
                    eventCategory = 'Video_Embed_Impression_Article_Minutely'
                    break;
                case 'apvImpression':
                    eventCategory = 'Video_Embed_Impression_Article_Slot_Minutely'
                    break;
                case 'apvClick':
                    eventCategory = 'VOD_Article_Minutely'
                    break;          
                default:
                    break;
            }
        }

        category = url.split('/')?.[4]   
       
    }else if(url.includes('/videos/') && url.split('/')[3] === 'videos'){   
        category = url.split('/')?.[4]

        // Video Page
        switch (eveName) {
            case 'componentLoad':
                eventCategory =  'Video_Embed_Componentload_Video_Minutely' 
                break;
            case 'componentImpression':
                eventCategory = 'Video_Impression_Video_Minutely'
                break;
            case 'apvImpression':
                eventCategory = 'Video_Impression_Video_Slot_Minutely'
                break;
            case 'apvClick':
                eventCategory = 'VOD_Video_Minutely'
                break;          
            default:
                break;
        }
    }else if(url.split('/')?.length < 5){
        category = 'home'
        
        // Home Page
        switch (eveName) {
            case 'componentLoad':
                eventCategory =  'Video_Componentload_Home_Minutely' 
                break;
            case 'componentImpression':
                eventCategory = 'Video_Impression_Home_Minutely'
                break;
            case 'apvImpression':
                eventCategory = 'Video_Impression_Home_Slot_Minutely'
                break;
            case 'apvClick':
                eventCategory = 'VOD_Home_Minutely'
                break;          
            default:
                break;
        }
    }else if(url.includes('/livetv/') && url.split('/')[3] === 'livetv'){
        category = 'LiveTV'
        

        // Live Tv Page
        switch (eveName) {
            case 'componentLoad':
                eventCategory =  'Video_Componentload_LiveTV_Minutely' 
                break;
            case 'componentImpression':
                eventCategory = 'Video_Impression_LiveTV_Minutely'
                break;
            case 'apvImpression':
                eventCategory = 'Video_Impression_LiveTV_Slot_Minutely'
                break;
            case 'apvClick':
                eventCategory = 'VOD_LiveTV_Minutely'
                break;          
            default:
                break;
        }
    }else{
        category = 'RestSite'
        // Rest site Page
        switch (eveName) {
            case 'componentLoad':
                eventCategory =  'Video_Componentload_RestSite_Minutely' 
                break;
            case 'componentImpression':
                eventCategory = 'Video_Impression_RestSite_Minutely'
                break;
            case 'apvImpression':
                eventCategory = 'Video_Impression_RestSite__Slot_Minutely'
                break;
            case 'apvClick':
                eventCategory = 'VOD_RestSite_Minutely'
                break;          
            default:
                break;
        }
    }
    return { category, eventCategory }
}


function onTopVideosAvailable() {
         window._tvp.addEventListener("componentLoad", function(e) {
            let { url , embed} = e?.detail || {}
            let action = 'Component_Load'
            let cat = '', evenCat = '';   
             if(url){
                let data =  pageFinder(url, 'componentLoad'  )
                cat = data?.category
                evenCat = data?.eventCategory
             }
            ga('send', 'event',`${evenCat}`, `${action}`,`Top Videos ,${embed},${cat}`); 
            // console.log(`*** got event ${e.type}  detail: ${JSON.stringify(e.detail)} ***`);
         })
         window._tvp.addEventListener("componentImpression", function(e) {
            let { url, embed } = e?.detail || {}
            let action = 'Impression'
            let cat = '', evenCat = '';  
             if(url){
                let data =  pageFinder(url, 'componentImpression')
                cat = data?.category
                evenCat = data?.eventCategory
             }   
            ga('send', 'event', `${evenCat}`, `${action}`,`Top Videos ,${embed},${cat}`)
            // console.log(`*** got event ${e.type}  detail: ${JSON.stringify(e.detail)} ***`);
         })
         window._tvp.addEventListener("apvImpression", function(e) {
            let {embed,highlight_id, counter, url } = e?.detail || {}
            let cat = '', evenCat = '';  
            let action = 'Impression' 
             if(url){
                let data =  pageFinder(url, 'apvImpression')
                cat = data?.category
                evenCat = data?.eventCategory
             }
            ga('send', 'event',`${evenCat}`, `${action}`,`Top Videos ,${embed},${highlight_id },${counter},${cat}`)
            // console.log(`*** got event ${e.type}  detail: ${JSON.stringify(e.detail)} ***`);
         })
         window._tvp.addEventListener("apvClick", function(e) {
            let { embed, highlight_id , url } = e?.detail || {}
            let action = 'Click'
            let cat = '', evenCat = '';   
             if(url){
                let data =  pageFinder(url, 'apvClick')
                cat = data?.category
                evenCat = data?.eventCategory
             }
            ga('send', 'event',`${evenCat}`, `${action}`,`Top Videos ,${embed},${ highlight_id},${cat}`)
            // console.log(`*** got event ${e.type}  detail: ${JSON.stringify(e.detail)} ***`);
         })
    }    





  