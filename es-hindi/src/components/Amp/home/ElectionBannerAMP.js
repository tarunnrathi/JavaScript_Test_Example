import React from 'react';

export default function ElectionBannerAMP() {
	return (
		<div className="cnt_el" next-page-hide={""}>
		<div className="rj_jn_wrp">
				<div className="rj_lg_wrp">
						<div className="rajya_logos_right">
								<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/hand_1646043657.png" alt='handsign'/>
						</div>
						<div className="rj_lg_lt">
							<a href='https://hindi.news18.com/amp/assembly-elections/'>
								<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/rajya_janadesh_1646043612.svg" alt='rajokajanadesh' width="169.5px"/>
								<img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/chunav_1646043564.svg" alt='vidhansbhaa2022'/>
								</a>
						</div>
				</div>
				<div className="sts_wrp">
						<a className="sts_col" href="https://hindi.news18.com/amp/assembly-elections/uttar-pradesh/">
								<div className="state_logo_wrp">
										<amp-img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/UP_Map_1646043735.png" width="19px" height="19px" alt="up"></amp-img>
								</div>
								<p className="state_name">उत्तर प्रदेश</p>
						</a>
						<a className="sts_col" href="https://hindi.news18.com/amp/assembly-elections/punjab/">
								<div className="state_logo_wrp">
										<amp-img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Punjab_Map_1646043717.png" width="18px" height="18px" alt="punjab"></amp-img>
								</div>
								<p className="state_name">पंजाब</p>
						</a>
						<a className="sts_col" href="https://hindi.news18.com/amp/assembly-elections/uttarakhand/">
								<div className="state_logo_wrp">
										<amp-img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Uttarakhand_Map_1646043754.png" width="20px" height="15.8px" alt="uttraknad"></amp-img>
								</div>
								<p className="state_name">उत्तराखण्ड</p>
						</a>
						<a className="sts_col" href="https://hindi.news18.com/amp/assembly-elections/goa/">
								<div className="state_logo_wrp">
										<amp-img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Goa_Map_1646043676.png" width="25px" height="17px" alt="goa"></amp-img>
								</div>
								<p className="state_name">गोवा</p>
						</a>
						<a className="sts_col" href="https://hindi.news18.com/amp/assembly-elections/manipur/">
								<div className="state_logo_wrp">
										<amp-img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Manipur_Map_1646043696.png" width="15px" height="16px" alt="manipur"></amp-img>
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
						.cnt_el{height:110px; padding-top:5px}
            .rj_jn_wrp{background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/mobileBG_1646043784.png) no-repeat center top;display: flex;align-items: center;box-shadow: 0px 2px 8px #0000001A;border: 2px solid #001D42;margin: 0 10px;flex-direction: column;
						background-size: 100%;}
            .rj_lg_wrp{display: inline-flex;align-items: flex-end;margin-left: 33%;}
            .rj_lg_lt{display: flex;flex-direction: column;align-items: flex-start;justify-content: flex-end;margin-right: 5px;}
            .rj_lg_lt img{margin-bottom: 5px;}
            .sts_wrp{display:flex;width: 100%;}
            .sts_col{display: inline-flex;flex-direction:column;align-items: center; text-decoration: none;background:#f0f0f0;flex-grow: 1;justify-content: flex-end;position: relative;padding-top: 3px;}
            .sts_col:before{content: '';position: absolute;top: 6px;bottom: 6px;right: 0;border-left:#D3D3D3 solid 1px;}
            .sts_col:last-child::before{display: none;}
            .state_name{font: normal normal 600 14px/24px Mukta;color: #ED1C25;margin: 0;}
            .state_logo_wrp{display: flex;align-items: center;justify-content: center;}
						`} </style>
</div>
	);
}
