const HomeTopTrending = ({ topTrending = [] }) => {
	if(!topTrending.length) {
		return null;
	}

	return (
		<>
			<div className="globalhd large dflex justify-space-betwwen">
				<h2>टॉप ट्रेंडिंग <span className="hastag">#</span> टॉपिक </h2>
			</div>
			{topTrending && topTrending.length ?
			<div className="trending-slider">
				<ul className="dflex">
					{topTrending?.map((item, index) => (
						<li key={index}>
								<h3><a href={item.url ? item.url.replace("https://hindi.news18.com", "") : ''}>{item.label}</a></h3>
						</li>
					))}
				</ul>
			</div>
				:null
			}
			<style jsx global>{`
			.trending-slider{background:#fbfbfb;padding:10px;position:relative}
			.trending-slider:after{content:"";position:absolute;height:50%;background:#001536;top:0;right:0;display:block;width:1px}
			.trending-slider ul{overflow:hidden;height:35px;justify-content:center;padding-top:5px}
			.trending-slider li{flex-shrink:0}
			.trending-slider li a{font-size:14px;color:#333;margin-right:10px;background:#fff;border-radius:20px;padding:5px 15px;box-shadow:0 0 2px #ccc}
			.trending-slider li a:hover{background:#ed1c24;color:#fff}
			.hastag {
				background: linear-gradient(#fffc00,red,#0a00b2);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				font-size: 28px;
				position: relative;
				top: 1px;
			}
			.globalhd {
				margin-top: 30px;
			}
      `}</style>
		</>
	);
};

export default HomeTopTrending;
