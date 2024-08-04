import React from 'react';

export default function ElectionBanner() {
	return (
		<>
		<div className="containerelection">
		{/*<!-- no need to add container also -->*/}
		<div className="rajya_jan_wrp">
				<div className="rajya_logos_wrp">
						<div className="rajya_logos_left">
						<a href='https://hindi.news18.com/assembly-elections/'>
								<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/rajya_janadesh_1646043612.svg" alt="rajokejanaadesh"/>
								<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/chunav_1646043564.svg" alt="vidhasbhaaa2022"/>
						</a>
						</div>
						<div className="rajya_logos_right">
								<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/hand_1646043657.png" alt="hand"/>
						</div>
				</div>
				<div className="states_wrp">
						<a className="state_col" href="https://hindi.news18.com/assembly-elections/uttar-pradesh/" alt="">
								<div className="state_logo_wrp">
										<img src="
										https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/UP_Map_1646043735.png
										" alt="upmap"/>
								</div>
								<p className="state_name">उत्तर प्रदेश</p>
								<svg width="19" height="19" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 25" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
						</a>
						<a className="state_col" href="https://hindi.news18.com/assembly-elections/punjab/" alt ="">
								<div className="state_logo_wrp">
										<img src="
										https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Punjab_Map_1646043717.png
										" alt="punjab" />
								</div>
								<p className="state_name">पंजाब</p>
								<svg width="19" height="19" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 25" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
						</a>
						<a className="state_col" href="https://hindi.news18.com/assembly-elections/uttarakhand/" alt="">
								<div className="state_logo_wrp">
										<img src="
										https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Uttarakhand_Map_1646043754.png
										" alt="uttrakand"/>
								</div>
								<p className="state_name">उत्तराखण्ड</p>
								<svg width="19" height="19" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 25" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
						</a>
						<a className="state_col" href="https://hindi.news18.com/assembly-elections/goa/" alt="">
								<div className="state_logo_wrp">
										<img src="
										https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Goa_Map_1646043676.png
										" alt="goa"/>
								</div>
								<p className="state_name">गोवा</p>
								<svg width="19" height="19" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 25" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
						</a>
						<a className="state_col" href="https://hindi.news18.com/assembly-elections/manipur/" alt="">
								<div className="state_logo_wrp">
										<img src="
										https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Manipur_Map_1646043696.png
										" alt="manipur"/>
								</div>
								<p className="state_name">मणिपुर</p>
								<svg width="19" height="19" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 25" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
						</a>
				</div>
		</div>
		<style type="text/css">
			{`
            *{box-sizing: border-box;}
            body{padding: 0;margin: 0;font-family: 'Mukta', sans-serif;}
            .containerelection{max-width: 1244px;margin: 0 auto;height: 60px;}
            img{vertical-align: top;}
            /* no need to copy abover css */
            .rajya_jan_wrp{background: url(
https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/desktopBG_1646043634.png
) no-repeat center center;width: 100%;display: flex;align-items: center;}
            .rajya_logos_wrp{display: inline-flex;align-items: flex-end;margin-left: 206px;}
            .rajya_logos_left{display: flex;flex-direction: column;align-items: flex-end;justify-content: flex-end;margin-right: 5px;}
            .rajya_logos_left img{margin-bottom: 5px;display:block;}
            .states_wrp{display: inline-flex;align-items: center;justify-content: flex-end;margin-left: auto;}
            .state_col{display: inline-flex;align-items: center; text-decoration: none;background: white;border-radius: 4px;overflow: hidden;margin-right: 13px;}
            .state_name{font: normal normal 600 17px/24px Mukta;color: #001D42;margin: 0;padding: 0 10px;flex-shrink: 0;}
            .state_logo_wrp{width: 34px;height: 34px;background-color: #E6E6E6;display: flex;align-items: center;justify-content: center;}
            .state_col svg{margin-right: 3px;}
			
						`}
						</style>
</div>
</>
);
}
