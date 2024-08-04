import React from 'react';
import Glide from '@glidejs/glide';
import { useEffect } from 'react';

function HeaderSponsors({ budgetSales, isDesktop, isMobile, isAmp }) {
    budgetSales = budgetSales[0] || [];
    const {
        "sponserdata": {
            "co-presenting": coPresenting = [],
            "associate-partner": associatePartner = [],
            "presented-by": presentedBy = []
        } = {}
		} = budgetSales;

    const processImpression = (item) => {
        try {
            const script = document.createElement('script');
            const adDiv = document.createElement('div');
            let data = item.impression_tracker_logo.replace(/<\/?script>/gsim, '').replace(/<script .*>/gsim, '');
            let adData = data.match(/<div id[\s\S]*<\/div>/gsim);
            adData = adData && adData[0] || null;

            if(adData) {
                adDiv.innerHTML = adData.replace(/<\/?div>/sgim, '');
                document.head.appendChild(adDiv);
                data = data.replace(/<div id[\s\S]*<\/div>/sgim, '');
                script.innerHTML = data;
                document.head.appendChild(script);
            }
        } catch {
            //
        }

    };
		useEffect(() => {
			if(isMobile) {
					new Glide('.spnsrd-slider', {
						type: 'carousel',
						perView: 1,
						autoplay: 2000,
						gap: 0
				}).mount();
			}

			if(coPresenting.length && !isAmp) {
				coPresenting.forEach((item) => {
					if(item.impression_tracker_logo && item.impression_tracker_logo != '') {
                        processImpression(item);
					}
				});
            }

            if(presentedBy.length && !isAmp) {
				presentedBy.forEach((item) => {
					if(item.impression_tracker_logo && item.impression_tracker_logo != '') {
						processImpression(item);
					}
				});
            }

            if(associatePartner.length && !isAmp) {
				associatePartner.forEach((item) => {
					if(item.impression_tracker_logo && item.impression_tracker_logo != '') {
						processImpression(item);
					}
				});
			}

		}, []);

    return (
        <>
            {isDesktop && <div className="iplhdr-sponsors">
                {presentedBy && presentedBy.length > 0 && (
                    <ul>
                        <li><span>PRESENTED BY</span></li>
                        {presentedBy.map((item) => <li><a href={item.click_tracker_logo} target="_blank"><img src={item.uploaded_img_path} alt={item.image_alt} title=""/></a></li>)}
                    </ul>
                )}
                {coPresenting && coPresenting.length > 0 && (
                    <ul>
                        <li><span>CO PRESENTING</span></li>
                        {coPresenting.map((item) => <li><a href={item.click_tracker_logo} target="_blank"><img src={item.uploaded_img_path} alt={item.image_alt} title=""/></a></li>)}
                    </ul>
                )}
                {associatePartner && associatePartner.length > 0 && (
                    <ul>
                        <li><span>ASSOCIATE PARTNERS</span></li>
                        {associatePartner.map((item) => <li><a href={item.click_tracker_logo} target="_blank"><img src={item.uploaded_img_path} alt={item.image_alt} title=""/></a></li>)}
                    </ul>
                )}
            </div>}
            {isMobile && <div className="spnsrd-slider">
                <div data-glide-el="track">
                    <ul>
                            {presentedBy && presentedBy.length > 0 && (
                                    presentedBy.map((item) => <li><a href={item.click_tracker_logo} target="_blank"><span>PRESENTED BY</span><img src={item.upload_image_mobile} alt={item.image_alt} title=""/></a></li>)
                            )}
                            {coPresenting && coPresenting.length > 0 && (
                                    coPresenting.map((item) => <li><a href={item.click_tracker_logo} target="_blank"><span>CO PRESENTING</span><img src={item.upload_image_mobile} alt={item.image_alt} title=""/></a></li>)
                            )}
                            {associatePartner && associatePartner.length > 0 && (
                                    associatePartner.map((item) => <li><a href={item.click_tracker_logo} target="_blank"><span>ASSOCIATE PARTNERS</span><img src={item.upload_image_mobile} alt={item.image_alt} title=""/></a></li>)
                            )}
                    </ul>
                </div>
            </div>}
            {isAmp && <div className="sponsor-div">
                <div className="spnsrd-slider">
                    <amp-carousel width="105" height="55" layout="responsive" type="slides" autoplay='' delay="2000" role="region" aria-label="Carousel with autoplay">
                        {presentedBy && presentedBy.length > 0 && (
                                presentedBy.map((item) => <a className="slide" href={item.click_tracker_logo} target="_blank"><div className="caption">PRESENTED BY</div><amp-img src={item.upload_image_mobile} width="105" height="45" layout="responsive" alt="a sample image"></amp-img></a>)
                        )}
                        {coPresenting && coPresenting.length > 0 && (
                                coPresenting.map((item) => <a className="slide" href={item.click_tracker_logo} target="_blank"><div className="caption">CO PRESENTING</div><amp-img src={item.upload_image_mobile} width="105" height="45" layout="responsive" alt="a sample image"></amp-img></a>)
                        )}
                        {associatePartner && associatePartner.length > 0 && (
                                associatePartner.map((item) => <a className="slide" href={item.click_tracker_logo} target="_blank"><div className="caption">ASSOCIATE PARTNERS</div><amp-img src={item.upload_image_mobile} width="105" height="45" layout="responsive" alt="a sample image"></amp-img></a>)
                        )}
                    </amp-carousel>
                    </div>
                </div>
            }
            {!isAmp ? <style jsx global>{`
            .iplhdr-sponsors {
                font-size: 0px;
                max-width: 250px;
                margin-left: auto;
                display: flex;
                justify-content: flex-end;
                margin-top: 25px;
                font-size: 0px;
            }
            .iplhdr-sponsors ul {
                justify-content: flex-start;
                display: flex;
                position: relative;
                margin-left: 30px;
            }
            .iplhdr-sponsors ul li:first-child {
                position: absolute;
                top: -18px;
                left: 0;
                right: 0px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .iplhdr-sponsors ul li {
                margin-left: 0;
            }
            .iplhdr-sponsors ul li {
                color: #fff;
                font-size: 11px;
                text-transform: uppercase;
            }
            .iplhdr-sponsors ul li:first-child:after {
                content: "";
                width: 100%;
                height: 2px;
                background: rgba(225,225,225,.7);
            }
            li a img {
                background: #fff;
            }
            
            .iplhdr-sponsors ul li a img {
                width: 105px;
                height: 45px;
            }
            a img {
                border: none;
            }
            .iplhdr-sponsors ul li a {
                display: block;
                overflow: hidden;
                background: #fff;
                margin-right: 5px;
            }
            
            .iplhdr-sponsors ul li a {
                line-height: 0;
            }
            .iplhdr-sponsors ul li:first-child span {
                margin-right: 5px;
                flex-shrink: 0;
            }

						
            .spnsrd-slider {position: relative;overflow: hidden;width: 105px;margin-left: 10px;font-size: 0px; background-color: #ffffff;}
            .spnsrd-slider ul {display: flex;font-size: 0px;}
            .spnsrd-slider ul li {margin: 0px !important;}
            .spnsrd-slider ul li a {line-height: 0;}
            .spnsrd-slider ul li a span {background: #202020;display: block;color: #fff;text-transform: uppercase;font-size: 9px;line-height: 13px;text-align: center;}
            .spnsrd-slider ul li a img {width: auto;height: auto;  margin: auto; display: block;}
            ${isMobile ? `img {
                max-width:100%;
            }` : ''}
			`}

            </style> :
            <style jsx global>
                {`            
                .spnsrd-slider ul li a span{background:none; color: #4d4d4d;font-size: 9px;}
                .spnsrd-slider {position: absolute; top: 0; right: 0;height: 52px;width: 105px;}
			    .spnsrd-slider .amp-carousel-button{display: none;}
                .spnsrd-slider .caption{display: block; color: #fff; text-transform: uppercase; font-size: 9px; line-height: 13px; text-align: center;}
                `}
            </style>
            }

        </>
    );
}

export default React.memo(HeaderSponsors);
