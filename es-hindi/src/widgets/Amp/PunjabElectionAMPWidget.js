import { useEffect, useContext } from "react";
import UserContext from 'widgets/Common/Responsive/GlobalContext';

const PunjabElectionAMPWidget = () => {
    const { pageData } = useContext(UserContext);

    const { punjabElecData, paramObj } = pageData;
    function _convert_to_slug(Text)
    {
        if(Text) {
            return Text
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
}
    }
    function _punWidgetData(countingData) {
        let _pnElecList = '';
        if(typeof countingData !== 'undefined') {
            for (const key in countingData) {
                if (countingData.hasOwnProperty(key)) {
                    const value = countingData[key];
                    if(value.onoff == '1') {
                        const _distSlug = _convert_to_slug(value.name);
                        let firstTr = '';
                        let secondTr = '';

                        for(let widgetindex = 0; widgetindex < value.party.length; widgetindex++) {
                            const values = value.party[widgetindex];
                            firstTr += '<td style="background:'+values.colour+'">'+values.party+'</td>';
                            secondTr += '<td style="background:'+values.colour+'">'+values.seats+'</td>';
                        }
                        _pnElecList+= '<div><a href="/punjab-local-body-elections-2021/'+_distSlug+'-elections-result-live/"><div class="mobile-winsleads">'+value.name+' '+value.type+'('+value.count+'/'+value.total+')<b>WINS + LEADS</b> </div>									<div class="wrap_table">													<table>											<tr>												'+firstTr+'											</tr>											<tr>'+secondTr+'</tr></table>		</div></a></div>';
                    }
                }
            }
        }
        return _pnElecList;
    }
    const _punState = _punWidgetData(punjabElecData.punjab_panchayat_election.state);
    const _punCorp = _punWidgetData(punjabElecData.punjab_panchayat_election.corporation);
    const _punjEleURL = (punjabElecData.punjab_panchayat_election.hindi_url)?punjabElecData.punjab_panchayat_election.hindi_url:'/punjab-local-body-elections-2021/';
    useEffect(() => {
        //Start acrossScript Script

        //End acrossScript Script
    }, []);

    return (
        <>
        {(punjabElecData.punjab_panchayat_election.hindi_onoff == '1' && paramObj.category == 'punjab')?
            <div className="hyd_top_bg">
            <div className="wrap">

                    <div className="hyd_top_strip">

                        <div className="hyd_logo">
                        <a href={_punjEleURL}><amp-img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/Punjab_Local_Body_Elections_2021_Hindi.svg" alt="Punjab Local Body Elections 2021 Results Live" title="Punjab Local Body Elections 2021 Results Live" className="gm-loaded gm-observing gm-observing-cb" width="240" height="50"></amp-img></a>
                        </div>
                        <amp-carousel height="100" layout="fixed-height" type="slides" role="region" aria-label="type=\'slides\' carousel" dangerouslySetInnerHTML={{ __html: _punState + _punCorp }}>
                        </amp-carousel>

                        <div><a className="view_detailbtn" href={_punjEleURL}>विस्तृत परिणाम के लिए यहां क्लिक करें<span clasName="arrow"></span></a></div>
                    </div>

                </div>
            </div>:''}

            <style jsx global>{`
                @font-face { 	font-family: 'Segoe Pro Regular'; 	font-style: normal; 	font-weight: normal; 	src: local('Segoe Pro Regular'), url('https://images.news18.com/static_news18/pix/ibnhome/news18/assembly-election-2019/fonts/SegoePro-Regular.woff') format('woff') }  @font-face { 	font-family: 'Segoe Pro Cond Bold'; 	font-style: normal; 	font-weight: normal; 	src: local('Segoe Pro Cond Bold'), url('https://images.news18.com/static_news18/pix/ibnhome/news18/assembly-election-2019/fonts/SegoePro-CondBold.woff') format('woff') }  @font-face { 	font-family: 'Segoe Pro Bold'; 	font-style: normal; 	font-weight: normal; 	src: local('Segoe Pro Bold'), url('https://images.news18.com/static_news18/pix/ibnhome/news18/assembly-election-2019/fonts/SegoePro-Bold.woff') format('woff') }  .hyd_top_bg {font-family: 'Segoe Pro Regular';background: #ececec;padding: 5px 10px;border-top: 4px #001D42 solid;border-bottom: 1px #DBDBDB solid;}
                .hyd_top_bg .wrap {     max-width: 1244px;     margin: 0 auto;     position: relative; }  .hyd_top_strip {     display: block;   }   .hyd_logo {     width: 100%; }  .wrap_table {     width: 100%;     padding-left: 0; }  .wrap_table table {     width: 100%;     border-collapse: collapse;     border-spacing: 0;     margin: 0;     padding: 0; }  .hyd_logo img {     width: 100%;     display: block; }  .wrap_table tbody tr:first-child td {     letter-spacing: 0px;     color: #FFFFFF;     font-size: 12px;     text-align: center;     font-family: 'Segoe Pro Bold';     padding: 1px 0;     margin: 0;     height: 25px; }    .wrap_table table tr td {     border: 1px solid #d7d7d7;     color: #fff;     text-align: center;     font-size: 20px;     font-family: 'Segoe Pro Bold';     padding: 6px 0;     width: 20%; }  .wrap_table tbody tr td:first-child p {     padding: 0;     margin: 0;     display: flex;     justify-content: space-between;     align-items: center;     font-size: 11px; }  .hyd_logo a {     display: block; }span.wards {font-size: 11px;display: block;}.mobile-winsleads{padding:3px 5px; text-transform: uppercase; background: #474747;font-size: 11px;color:#fff}.hyd_top_bg .view_detailbtn {text-align:center;font-size: 12px;color: #E1261C;font-family: 'Segoe Pro Bold';text-transform: uppercase;display: block;text-decoration: underline;position: relative;}
                .mobile-winsleads b{float:right}
                .hyd_top_strip a{text-decoration:none}
                .hyd_top_bg .view_detailbtn .arrow {
                    position: relative;
                    right: 0;
                    z-index: 3;
                    top: 3px;
                    transform: translate(0, -50%);
                    width: 11px;
                    height: 11px;
                    color: transparent;
                }
                
                .hyd_top_bg .view_detailbtn .arrow::before {
                    content: '';
                    border-top: 2px solid #E1261C;
                    border-left: 2px solid #E1261C;
                    width: 6px;
                    height: 6px;
                    transform: rotate(132deg);
                    position: absolute;
                    right: -18px;
                    top: 2px;
                }
                
                .hyd_top_bg .view_detailbtn .arrow::after {
                    content: '';
                    width: 10px;
                    height: 2px;
                    position: absolute;
                    background: #E1261C;
                    top: 5px;
                    left: 8px;
                }
                .hyd_top_bg .amp-carousel-button{display:none}
            `}</style>
        </>
    );
};

export default PunjabElectionAMPWidget;
