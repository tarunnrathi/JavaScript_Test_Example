import React from 'react';
import { useEffect } from 'react';

const CricketTweet = () => {
	useEffect(() => {
		setTimeout(() => {
			const twitterScript = document.createElement('script');
			twitterScript.setAttribute('src', 'https://platform.twitter.com/widgets.js');
			twitterScript.setAttribute('async', 'true');
			twitterScript.setAttribute('charset', 'utf-8');
			document.querySelector(".twitter_right_widget").appendChild(twitterScript);
		}, 2500);
	}, []);

    return (
        <>
            <div className="twitter_right_widget" id="twitter_right_widget">
                <a className="twitter-timeline" href="https://twitter.com/News18_Sports?ref_src=twsrc%5Etfw">Tweets by cricketnext</a>
            </div>
            <style jsx global>
                {`.twitter_right_widget{ height:600px; overflow:scroll; }`}
            </style>
        </>
    );
};

export default CricketTweet;
