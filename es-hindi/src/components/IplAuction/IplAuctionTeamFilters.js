import React from "react";
const IplAuctionTeamFilters = ({
  teamsData,
  domain,
  iplPlayersDataArray
}) => {
  return (
    <>
      <div className="filter_by">
        <div className="filter_by_top">
          <p className="filter_title">{teamsData?.labels?.result} :</p>
        </div>
        <div className="filter_opation">
          <p className="filter_left">{teamsData?.labels?.teams} </p>
          <div className="filter_right">
            <ul className="filter_click">
              {
                iplPlayersDataArray?.length > 0 && iplPlayersDataArray.map((item, i) => {
                  i = i + 1;
                  return item !== 'top_10' && item !== 'unsold' && <li>
                    <a href={`/ipl-auction/${item}-players-list-${i}/`} key={`filter`+i}>
                      {teamsData?.teams[item]?.fullname}
                    </a>
                  </li>
                })
              }              
            </ul>
          </div>
        </div>
        <div className="filter_opation">
          <p className="filter_left">{teamsData?.labels?.highlight}</p>
          <div className="filter_right">
            <ul className="filter_click">
              <li>
                <a href={`/ipl-auction/top-10-players-list-1/`}>
                  टॉप 10 खिलाड़ी
                </a>
              </li>
              <li>
                <a href={`/ipl-auction/unsold-players-list-12/`}>
                  अनसोल्ड खिलाड़ी
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx global>{`
          .filter_by{width: 100%; border-top: 1px#c4c4c4 solid; margin-top: 20px; box-sizing: border-box;}
          .filter_by_top{display:flex;justify-content:space-between;border-bottom:1px #c4c4c4 dashed;width:calc(100% - 40px);margin:auto;padding:5px 0;margin-bottom:15px}
          .filter_by .filter_left{width: 170px;}
          .filter_by .filter_right{width:calc(100% - 140px)}
          .filter_title{letter-spacing:0;color:#e1261c;text-transform:uppercase;font-size:13px;line-height:18px;font-family:'Segoe Pro Bold'}
          .filter_opation{display:flex;align-items:baseline; padding: 0px 10px 10px;  box-sizing: border-box;}
					.filter_left{letter-spacing: 0px;  color: #464646;  text-transform: uppercase;  font-size: 13px;  font-family: 'Segoe Pro Bold'; position: relative;  width: 100%;  padding-left: 19px; margin-bottom: 10px;}
					.filter_left:before{content: ""; position: absolute;  display: block;  width: 7px;  height: 2px; background: #464646;  left: 3px;  top: 7px;}
					.filter_left:after{border-right: 2px solid #464646; border-top: 2px solid #464646;width: 4px; height: 4px;  transform: rotate(45deg);  top: 5px;  left: 6px; content: "";  position: absolute;  display: block;}
          ul.filter_click{display:flex;flex-wrap:wrap;list-style-type:none}
					ul.filter_click li{background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #DDDDDD;   border-radius: 14px; letter-spacing: 0px; color: #E1261C; font-size: 13px; line-height: 25px; font-family: 'Segoe Pro Regular'; padding: 0 15px; margin-bottom: 10px; margin-right: 10px;}
          ul.filter_click li a{color:#e1261c;text-decoration:none;display:block}
             @media (max-width:768px){
              .filter_opation {display: block;}         
              .filter_by .filter_left{width: 100%;}
              .filter_by .filter_right{width: 100%}
            }
		  `}</style>
    </>
  );
};

export default IplAuctionTeamFilters;
