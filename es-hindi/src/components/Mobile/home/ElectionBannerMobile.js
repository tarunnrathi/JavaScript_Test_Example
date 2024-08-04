import React from 'react';

export default function ElectionBannerMobile() {
	return (
		<div className="containerelection">
		{/*<!-- no need to add container also -->*/}
		<div className="rajya_jan_wrp">
				<div className="rajya_logos_wrp">
						<div className="rajya_logos_right">
								<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/hand_1646043657.png" alt="handsign"/>
						</div>
						<div className="rajya_logos_left">
							<a href="https://hindi.news18.com/assembly-elections/">
								<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/rajya_janadesh_1646043612.svg" width="169.5px" alt="rajokajanadesh"/>
								<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/chunav_1646043564.svg" alt="vidhnsabha2022"/>
								</a>
						</div>
				</div>
				<div className="states_wrp">
						<a className="state_col" href="https://hindi.news18.com/assembly-elections/uttar-pradesh/" alt="">
								<div className="state_logo_wrp">
										<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/UP_Map_1646043735.png" width="19px" alt="up"/>
								</div>
								<p className="state_name">उत्तर प्रदेश</p>
						</a>
						<a className="state_col" href="https://hindi.news18.com/assembly-elections/punjab/" alt="">
								<div className="state_logo_wrp">
										<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Punjab_Map_1646043717.png" width="18px" alt="punjab"/>
								</div>
								<p className="state_name">पंजाब</p>
						</a>
						<a className="state_col" href="https://hindi.news18.com/assembly-elections/uttarakhand/" alt="">
								<div className="state_logo_wrp">
										<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Uttarakhand_Map_1646043754.png" width="20px" alt="uttraknad"/>
								</div>
								<p className="state_name">उत्तराखण्ड</p>
						</a>
						<a className="state_col" href="https://hindi.news18.com/assembly-elections/goa/" alt="">
								<div className="state_logo_wrp">
										<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Goa_Map_1646043676.png" width="25px" alt="goa"/>
								</div>
								<p className="state_name">गोवा</p>
						</a>
						<a className="state_col" href="https://hindi.news18.com/assembly-elections/manipur/" alt="">
								<div className="state_logo_wrp">
										<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Manipur_Map_1646043696.png" width="15px" alt="manipur"/>
								</div>
								<p className="state_name">मणिपुर</p>
						</a>
				</div>
		</div>
		<style jsx global>{`
            *{box-sizing: border-box;}
            body{padding: 0;margin: 0;font-family: 'Mukta', sans-serif;}
            img{vertical-align: top;}
            /* no need to copy abover css */
						.containerelection{height:110px; padding-top:5px}
            .rajya_jan_wrp{background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/mobileBG_1646043784.png) no-repeat center top;display: flex;align-items: center;box-shadow: 0px 2px 8px #0000001A;border: 2px solid #001D42;margin: 0 10px;flex-direction: column;    background-size: 100%;}
            .rajya_logos_wrp{display: inline-flex;align-items: flex-end;margin-left: 33%;}
            .rajya_logos_left{display: flex;flex-direction: column;align-items: flex-start;justify-content: flex-end;margin-right: 5px;}
            .rajya_logos_left img{margin-bottom: 5px;}
            .states_wrp{display:flex;width: 100%;}
            .state_col{display: inline-flex;flex-direction:column;align-items: center; text-decoration: none;background:#f0f0f0;flex-grow: 1;justify-content: flex-end;position: relative;padding-top: 3px;}
            .state_col:before{content: '';position: absolute;top: 6px;bottom: 6px;right: 0;border-left:#D3D3D3 solid 1px;}
            .state_col:last-child::before{display: none;}
            .state_name{font: normal normal 600 14px/24px Mukta;color: #ED1C25;margin: 0;}
            .state_logo_wrp{display: flex;align-items: center;justify-content: center;}
						`}</style>
</div>
	);
}
