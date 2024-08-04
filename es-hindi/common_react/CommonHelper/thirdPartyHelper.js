export const gaFun = (load) => { 
    if(load){
        return ` (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            (i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments);
            }),
            (i[r].l = 1 * new Date());
            (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m);
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga'); 
        `
    }
}

export const gtmFun = (load, code) => {
    if(load){
        return `
            (function (w, d, s, l, i) {
                w[l] = w[l] || []; w[l].push(
                { 'gtm.start': new Date().getTime(), event: 'gtm.js' }
                ); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', '${(code) ? code : 'GTM-PBM75F9'}');
        `;
    }
}

export const comscoreLoad = (load, code) =>{ 
    if(load){
        return ` var _comscore = _comscore || [];
        _comscore.push({
            c1: "2",
            c2: "${(code) ? code : '6683813'}"
        });
        (function () {
            var s = document.createElement("script"), el = document
            .getElementsByTagName("script")[0];
            s.async = true;
            s.src = (document.location.protocol == "https:" ? "https://sb"
            : "http://b")
            + ".scorecardresearch.com/beacon.js";
            el.parentNode.insertBefore(s, el);
        })(); `
    }
}



export const taboola = (load, offset, url, pageType) =>{   
    if(load){      
        return ` 
        function _loadTaboola() {
            let pageYOffset = window.pageYOffset;
            if(pageYOffset > ${offset}) {
                window._taboola = window._taboola || [];
                _taboola.push({${pageType || "category"} :'auto'});
                !function (e, f, u, i) {
                    if (!document.getElementById(i)){
                        e.async = 1;
                        e.src = u;
                        e.id = i;
                        f.parentNode.insertBefore(e, f);
                    }
                }(
                    document.createElement('script'),
                    document.getElementsByTagName('script')[0],
                    '${(url) ? url : '//cdn.taboola.com/libtrc/network18media-news18english/loader.js'}',
                    'tb_loader_script'
                );
                if(window.performance && typeof window.performance.mark == 'function'){
                    window.performance.mark('tbl_ic');
                }
                window.removeEventListener('scroll', _loadTaboola);
            }
        }
        window.addEventListener('scroll', _loadTaboola); `
    }
}

export const chartbeatMabFun = (load, chartbeatCan) =>{   
    if(load){  
        return ` 
        window.addEventListener("load", () => {
            var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
            _sf_async_config.uid = 20831;
            _sf_async_config.domain = 'news18.com';
            let canonical_url = "${chartbeatCan}"
            if(canonical_url !== "")   {
              _sf_async_config.useCanonical = true;
              _sf_async_config.useCanonicalDomain = true;
            } else {
              let location_path = window.location.href;
              location_path = location_path.replace("http://", '').replace("https://", '').replace("www.", '');
              _sf_async_config.path = location_path;
            }
            _sf_async_config.flickerControl = false;
            function loadChartbeatMab() {
                var e = document.createElement('script');
                var n = document.getElementsByTagName('script')[0];
                e.type = 'text/javascript';
                e.async = true;
                e.src = '//static.chartbeat.com/js/chartbeat_mab.js';
                n.parentNode.insertBefore(e, n);
            }
            loadChartbeatMab();
        }); 
      `
    }
}

export const chartbeatFun = (load, section, webstoryCat, authorNames, page) =>{   
    if(load){  
        return ` 
        window.addEventListener("load", () => {
            var _sf_async_config  = (window._sf_async_config || {});
            _sf_async_config.sections = "${
                section || webstoryCat
            }";
            _sf_async_config.authors = "${
                authorNames || "No author"
            }";
            _sf_async_config.type = "${page} page";
            function loadChartbeat() {
              var e = document.createElement('script');
              var n = document.getElementsByTagName('script')[0];
              e.type = 'text/javascript';
              e.async = true;
              e.src = '//static.chartbeat.com/js/chartbeat.js';
              n.parentNode.insertBefore(e, n);
            }
            loadChartbeat();
        });
          `
    }
}

export const load3rdPartyJS = (config) => {
    const { chartbeat, chartbeatMab, taboola, ga, gtm, izooto, outputType, comscore } = config || {};
    const { section, webstoryCat, authorNames, page, chartbeat_load } = chartbeat || {};
    const { chartbeatCan, chartbeatMab_load } = chartbeatMab || {};
    const { taboola_load, offset, taboola_src, pageType } = taboola || {};
    const { gtm_load, gtm_code } = gtm || {};
    const { comscore_load, comscore_code } = comscore || {};
    let thirdPartyOutput = ``;
    try{
        thirdPartyOutput = ` 
            ${chartbeat_load ? chartbeatFun(chartbeat_load, section, webstoryCat, authorNames, page) : ' '} 
            ${chartbeatMab_load ? chartbeatMabFun(chartbeatMab_load, chartbeatCan) : ' '} 
            ${taboola_load ? taboola(taboola_load, offset, taboola_src, pageType) : ' '} 
            ${ga ? gaFun(ga) : ' '} 
            ${gtm_load ? gtmFun(gtm_load, gtm_code) : ' '} 
            ${comscore_load ? comscoreLoad(comscore_load, comscore_code) : ' '} 
        `
    } catch(e) {
        console.log(e);
    }
    return (outputType == "scriptTag") ? <script type="text/javascript" dangerouslySetInnerHTML={{ __html: thirdPartyOutput }} /> : thirdPartyOutput;
}