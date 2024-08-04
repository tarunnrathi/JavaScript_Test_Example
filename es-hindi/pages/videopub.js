import React, { useEffect } from "react";
import { pubStackApi, scriptLoader } from "includes/article.util";

const videopub = ({ guid, platform, lang,
	section_name, article_id, city_name,
	district_name, state_name, language,
	video_type }) => {
	useEffect(() => {
		setTimeout(() => {
			loadSmartPlayer();
			loadComscore();
		}, 2000);

	}, []);
	const loadSmartPlayer = () => {
		const players = {
			"gujarati": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-gujrati/v2/prod-player.js",
			"punjabi": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-punjab/v2/prod-player.js?v=3",
			"bengali": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-bangla/v2/prod-player.js?v=3",
			"tamil": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-tamil/v2/prod-player.js?v=2",
			"lokmat": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-lokmat/v2/prod-player.js?v=1",
			"kannada": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-kannada/v2/prod-player.js?v=1",
			"telugu": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-telugu/v2/prod-player.js?v=1",
			"tamilWithAd": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-tamil/v2/test-tags-prod-player.js?v=1.1",
			"tamilWithAdProd": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-tamil/v2/prod-player.js?v=2.1",
			"hindiWithAdProd": pubStackApi(),
			"gujaratiWithAdDev": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-gujrati/v2/test-tags-prod-player.js?v=1.1",
			"lokmatWithAdDev": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-lokmat/v2/test-prod-player.js?v=1.0",
			"kannadaWithAdProd": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-kannada/v2/prod-player.js?v=3",
			"teluguWithAd": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-telugu/v2/test-tags-prod-player.js?v=1.0",
			"teluguWithAdProd": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-telugu/v2/prod-player.js?v=1.1",
			"gujaratiWithAdProd": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-gujrati/v2/prod-player.js?v=1.1",
			"lokmatWithAdProd": "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-lokmat/v2/prod-player.js?v=2.1",
		};
		scriptLoader(players[lang]);
	};
	const loadComscore = () => {
		const s = document.createElement("script");
		const el = document.getElementsByTagName("script")[0];
		s.id = "comScore";
		s.innerHTML = `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            
            ga('create', 'UA-156703-3', 'auto'); // news18 english
            
            var _comscore = _comscore || [];
                    _comscore.push({ c1: "2", c2: "6683813",
                                });
                    (function() {
                        var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                        s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
                        el.parentNode.insertBefore(s, el);
                    })();
        `;
		el.parentNode.insertBefore(s, el);
	};

	return (
		<>
			<div
				data-pubstack-player="true"
				data-pubstack-config="video-embed"
				data-pubstack-guid={guid}
				data-property-category=""
				data-property-platform={platform}
				data-property-keywords=""
				data-embed-mode="manual"
				style={{
					position: "absolute",
					width: "100%",
				}}
				data-pubstack-version="v1"
				language={language}
				city_name={city_name}
				section_name={section_name}
				article_id={article_id}
				district_name={district_name}
				state_name={state_name}
				video_type={video_type}
				dangerouslySetInnerHTML={{
					__html: `
<img id="${guid}" onload="!function(){var e=setInterval(function(){
	try {
		if(window.pubstackJSLoaded){
			clearInterval(e)
			window.refreshPubstackPlayers()
		}
} 
catch(err){}
},1e3)}();" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="100%" />`,
				}}>
			</div>
		</>
	);
};
export async function getServerSideProps(context) {
	const {
		guid, platform,
		lang, section_name = "",
		article_id = "", city_name = "",
		district_name = "", state_name = "",
		language = "", video_type = "",
	} = context.query;

	return {
		props: {
			guid, platform, lang,
			section_name, article_id, city_name,
			district_name, state_name, language,
			video_type
		}
	};
}
export default videopub;
