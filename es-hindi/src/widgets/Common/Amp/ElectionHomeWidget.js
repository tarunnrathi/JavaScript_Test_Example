import ReactHtmlParser from "react-html-parser";
import getConfig from "next/config";

const ElectionHomeWidget = ({ seatData, keyCandidatesData, switcher_exitpoll, switcher_CountingDay, counting_day_widgets_data }) => {
    let _allianceResultsTop = '',
        _allianceResults = '',
        _partyResultsTop = '',
        _partyResults = '',
        _blogCustomText = counting_day_widgets_data[0].custom_field || "लाइव ब्लॉग",
        _blogTitle = counting_day_widgets_data[0].article_headline_ranking,
        _blogURL = counting_day_widgets_data[0].custom_url,
        _allCandidates = "",
        _cn = 0;
    const { publicRuntimeConfig } = getConfig();
    const mainUrlParam = publicRuntimeConfig?.siteSwitch || "";
    const countingTallyHomeSponsAmpFlag = switcher_CountingDay?.maintally_home_page_sponsor_switcher;

    seatData = seatData.substring(27, seatData.lastIndexOf(")"));
    const parsedJson = JSON.parse(seatData);

    keyCandidatesData = keyCandidatesData.substring(18, keyCandidatesData.lastIndexOf(")"));
    const keyParsedJson = JSON.parse(keyCandidatesData);

    const stateArr ={
        "himachal-pradesh": "हिमाचल प्रदेश",
        "gujarat": "गुजरात",
    };

    for (const [key, stateData] of Object.entries(parsedJson)) {

        let _alliance 	= stateData.alliance,
            _party 		= stateData.party,
            _totalSeats = stateData.total_seats,
            _needToWin 	= parseInt(_totalSeats.seats / 2) + 1,
            _allianceNames = '',
            _allianceWL = '',
            _partyNames = '',
            _partyWL = '',
            _pn = 0,
            _an = 0,
            _allCandidates= '';

        _alliance.forEach((val) => {
            _allianceNames += `<th style="background:${val.color}">${val.display_name}</th>`;
            _allianceWL += `<td style="background:${val.color}">${val.wonlead}</td>`;
            if(_an == 3) { return false;}
            _an++;
        });
        _party.forEach((val) => {
            if(_pn == 5) { return false;}
            _partyNames += `<th style="background:${val.color}">${val.name}</th>`;
            _partyWL += `<td style="background:${val.color}">${val.wonlead}</td>`;
            _pn++;
        });

        const _extraLine = ""; //(_cn == 4) ? '<div class="brcountday-tallymap-details"></div>':'';
        if(key == 'himachal-pradesh' || key == 'uttarakhand') {
            _allianceResultsTop += `<div class="brcountday-tallymap-left">
				<div class="brcountday-rslttally-hd">
                    <h2>${stateArr[key]}</h2>
                    <h3><span id="widget-seat-count">${_totalSeats['wonlead']}</span>/${_totalSeats['seats']} सीटें</h3>
                    <p>(${_needToWin} सीट बहुमत के लिए)</p>
				</div>
				<div class="brcountday-tallywidget-table">
				    <a href="/assembly-elections/${key}/alliance-wise-tally-results/${mainUrlParam}" style="position:absolute; height:100%; width:100%; display:block; z-index:999;"></a>
                    <table cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <th>गठबंधन</th>
                                ${_allianceNames}
                            </tr>
                            <tr>
                                <td>जीत + बढ़त</td>
                                ${_allianceWL}
                            </tr>
                        </tbody>
                    </table>
				    <div class="brcountday-tallywidget-right"></div>
				</div>
				${_extraLine}
			</div>`;

            _partyResultsTop += `<div class="brcountday-tallymap-left">
                <div class="brcountday-rslttally-hd">
                    <h2>${stateArr[key]}</h2>
                    <h3><span id="widget-seat-count">${_totalSeats['wonlead']}</span>/${_totalSeats['seats']} सीटें</h3>
                    <p>(${_needToWin} सीट बहुमत के लिए)</p>
                </div>
                <div class="brcountday-tallywidget-table">
                    <a href="/assembly-elections/${key}/alliance-wise-tally-results/${mainUrlParam}" style="position:absolute; height:100%; width:100%; display:block; z-index:999;"></a>
                    <table cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <th>पार्टी</th>
                                ${_partyNames}
                            </tr>
                            <tr>
                                <td>जीत + बढ़त</td>
                                ${_partyWL}
                            </tr>
                        </tbody>
                    </table>
                    <div class="brcountday-tallywidget-right"></div>
                </div>
                ${_extraLine}
            </div>`;
        }else{
            _allianceResults += `<div class="brcountday-tallymap-left">
				<div class="brcountday-rslttally-hd">
                    <h2>${stateArr[key]}</h2>
                    <h3><span id="widget-seat-count">${_totalSeats['wonlead']}</span>/${_totalSeats['seats']} सीटें</h3>
                    <p>(${_needToWin} सीट बहुमत के लिए)</p>
				</div>
				<div class="brcountday-tallywidget-table">
				    <a href="/assembly-elections/${key}/alliance-wise-tally-results/${mainUrlParam}" style="position:absolute; height:100%; width:100%; display:block; z-index:999;"></a>
                    <table cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <th>गठबंधन</th>
                                ${_allianceNames}
                            </tr>
                            <tr>
                                <td>जीत + बढ़त</td>
                                ${_allianceWL}
                            </tr>
                        </tbody>
                    </table>
				    <div class="brcountday-tallywidget-right"></div>
				</div>
				${_extraLine}
			</div>`;

            _partyResults += `<div class="brcountday-tallymap-left">
                <div class="brcountday-rslttally-hd">
                    <h2>${stateArr[key]}</h2>
                    <h3><span id="widget-seat-count">${_totalSeats['wonlead']}</span>/${_totalSeats['seats']} सीटें</h3>
                    <p>(${_needToWin} सीट बहुमत के लिए)</p>
                </div>
                <div class="brcountday-tallywidget-table">
                    <a href="/assembly-elections/${key}/alliance-wise-tally-results/${mainUrlParam}" style="position:absolute; height:100%; width:100%; display:block; z-index:999;"></a>
                    <table cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <th>पार्टी</th>
                                ${_partyNames}
                            </tr>
                            <tr>
                                <td>जीत + बढ़त</td>
                                ${_partyWL}
                            </tr>
                        </tbody>
                    </table>
                    <div class="brcountday-tallywidget-right"></div>
                </div>
                ${_extraLine}
            </div>`;
        }

        _cn++;
    }

    for (const [key, keyData] of Object.entries(keyParsedJson)) {
        for (const [keycand, keycandData] of Object.entries(keyData)) {

            let _candStatus = keycandData['CANDI_STATUS'] || '',
                _candStatusClass = 'awaited',
                _candStatusVal = _candStatus || 'नतीजे बाकी';

            if(_candStatus) {
                if(_candStatus.toLowerCase() == 'won') {
                    _candStatusClass = 'won';
                    _candStatusVal = 'विजयी';
                }else if(_candStatus.toLowerCase() == 'lost') {
                    _candStatusClass = 'lost';
                    _candStatusVal = 'पराजित';
                }else if(_candStatus.toLowerCase() == 'leading') {
                    _candStatusClass = 'leading';
                    _candStatusVal = "आगे";
                }else if(_candStatus.toLowerCase() == 'trailing') {
                    _candStatusClass = 'trailing';
                    _candStatusVal = "पीछे";
                }
            }
            const keyCandImage = keycandData['cand_image'] != "" ? keycandData['cand_image'] : "https://images.news18.com/static_news18/pix/ibnhome/news18/election-2022/candidate_default_img.png";
            _allCandidates += `<li>
                <a href="${keycandData['cand_url_hindi']}" class="cndt-lost" style="border-bottom: 5px solid #f97d09">
                <figure style="background:#f97d09;">
                    <amp-img src="${keyCandImage}" width="60" height="60" alt="${keycandData['cand_name']}" title="${keycandData['cand_name']}"></amp-img>
                </figure>
                <div class="candidateslider-details">
                    <h3><b class="widgetcandi_name">${keycandData['candidate_name_hi']}</b> <span> ${keycandData['ABBR']} | ${keycandData['cons_name_hindi']}</span></h3>
                    <p class="p-status ${_candStatusClass}"><span>${_candStatusVal}</span></p>
                </div>
                </a>
            </li>`;
        }
    }

    return (
        <>
            <div className="brcountdaywrap" id="LiveResults">
	            <div className="brcountday-container">
                    <h2 className="brcountday-tophd">
                        <div className="brcount-tophdLive"><i className="dots-div blink nw-dots blink2"></i>{_blogCustomText}</div>
                        <a href={_blogURL}>{ _blogTitle }</a>
                    </h2>
                    { countingTallyHomeSponsAmpFlag == "1" &&
                        <div className="adwrapper">
                            <amp-ad
                                width={360}
                                height={50}
                                type="doubleclick"
                                data-slot={`/1039154/NW18_HIND_AMP/NW18_HIND_Election_AMP/NW18_HIND_Election_EXITPOLL_AMP/NW18_HIND_ELECT_EXTPOL_AMP_ROS_ATF_LOGO`}
                                data-multi-size="360x50"
                                data-multi-size-validation="false"
                                data-lazy-fetch="true"
				                data-loading-strategy="1"
                                rtc-config={`\'{"vendors": {"openwrap": {"PROFILE_ID" : "2045","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}\'`}
                            />
                        </div>
                    }
                    {/* election Adcode goes here */}

                    {/*  */}
                    {/* <ul className="homewidgetTab">
                        <li className="active" on="tap:AMP.setState({ option: 1, options: 1, top_option: 1 })" data-amp-bind-class="option == 1 ? 'active' : ''" role="button" tabindex="22">{"गठबंधन टैली"}</li>
                        <li on="tap:AMP.setState({ option: 2, options: 1, top_option: 1})" data-amp-bind-class="option == 2 ? 'active' : ''" role="button" tabindex="23">{"पार्टी टैली"}</li>
                    </ul> */}

                    {/* <!---result tally start---> */}
                    <div className="brcountday-tallymap" data-amp-bind-hidden="option != 1">
                        {ReactHtmlParser(_allianceResultsTop + _allianceResults)}
                    </div>
                    <div className="brcountday-tallymap" hidden data-amp-bind-hidden="option != 2">
                        {ReactHtmlParser(_partyResultsTop + _partyResults)}
                    </div>
                    {/* <!---result tally end---> */}

                    {/* <!-- candidates slider start --> */}
                    <div className="prominment_section" >
                        <div className="ls_mainhead mb10">
                            <h3 className="ls_pageheading"><a href={`/assembly-elections/key-candidates/${mainUrlParam}`}>प्रमुख  <span>चेहरे</span></a></h3>
                        </div>
                        <ul className="prominment_row">
                            {ReactHtmlParser(_allCandidates)}
                        </ul>
                        <div className="moreBtn"><a href={`/assembly-elections/key-candidates/${mainUrlParam}`}>अन्य उम्मीदवार</a></div>
                    </div>
                    {/* <!-- candidates slider end --> */}
                </div>
            </div>

            <style jsx global>{`
                @keyframes blinker{from{opacity:1}to{opacity:0}}.brcountdaywrap{position:relative;background:#fff;width:100%;box-shadow:inset 0 1px 4px #e7e6e6}.dots-div{content:"";background:#e1261c;width:8px;height:8px;border-radius:100%;display:inline-block;margin-right:5px}.dots-div.blink{animation:blinker 1s cubic-bezier(.5,0,1,1) infinite alternate}.brcountday-tallymap{background:#fff;margin-bottom:10px;border-bottom:5px solid #b4b4b4;padding:0 10px}.brcountday-tallymap-left{width:100%;box-sizing:border-box;margin-bottom:8px}.brcountday-rslttally-hd{display:flex;text-transform:uppercase;align-items:center;line-height:20px;margin-bottom:0px}.brcountday-rslttally-hd h2{color:#e04034;font-size:13px;font-weight:600;margin-right:10px}.brcountday-rslttally-hd h3{font-weight:400;color:#767676;font-size:12px;margin-right:5px}.brcountday-rslttally-hd h3 span{color:#474747;font-weight:600}.brcountday-rslttally-hd p{color:#a7a7a7;font-size:11px;margin-right:auto}.brcountday-tallywidget-table{position:relative;padding-right:22px}.brcountday-tallywidget-right{background:#e7e7e7;width:22px;position:absolute;right:0;top:0;border-bottom:3px solid #d0d0d0;bottom:0}.brcountday-tallywidget-right:after,.brcountday-tallywidget-right:before{content:"";position:absolute}.brcountday-tallywidget-right:before{width:14px;height:2px;margin-top:4px;margin-left:-9px;background:#464646;top:50%;left:50%}.brcountday-tallywidget-right:after{width:8px;height:8px;background:0 0;margin-top:0;margin-left:-4px;border-top:2px solid #464646;border-right:2px solid #464646;transform:rotate(45deg);left:50%;top:50%}.brcountday-tallywidget-table table{width:100%;background:#e7e7e7;border-collapse:collapse}.brcountday-tallywidget-table table tr td,.brcountday-tallywidget-table table tr th{padding:2px;border:1px solid #f6f6f6;text-align:center;text-transform:uppercase;min-width:52px;text-shadow:0 0 10px #333333a6}.brcountday-tallywidget-table table tr:nth-child(2) td{font-size:24px;padding:4px 0;color:#fff;vertical-align:middle;font-weight:600}.brcountday-tallywidget-table table tr td:nth-child(1){font-weight:700;font-size:11px;color:#464646;width:110px;background:#e7e7e7;font-weight:500;line-height:11px}.brcountday-tallywidget-table table tr th{font-size:12px;font-weight:400;color:#fff;}.brcountday-tallywidget-table table tr th:nth-child(1){min-width:22px;color:#464646;font-size:11px;background:#e7e7e7;font-weight:500}.brcountday-tallywidget-table table tr td:nth-child(1),.brcountday-tallywidget-table table tr th:nth-child(1){text-shadow:initial}.brcountday-tallymap-details{color:#929292;font-size:12px;padding-top:6px;font-style:italic;}.mb10{margin-bottom:10px}.ls_pageheading{text-transform:uppercase;font-size:17px}.ls_pageheading a{color:#e1261c;text-decoration:none;}.ls_pageheading a span{color:#001d42;position:relative;display:inline-flex;padding-bottom:4px}.ls_pageheading a span:after{content:'';position:absolute;bottom:0;width:100%;height:3px;background:#e1261c;left:0;z-index:9}.homewidgetTab{overflow-x:scroll;display:flex;align-items:center;padding:8px 0 0;background:#f4f4f4;border-bottom:1px solid #d5d5d5;border-top:1px solid #d5d5d5;margin-bottom:10px}.homewidgetTab li{padding:0 15px;white-space:nowrap;font-weight:400;color:#464646;font-size:16px;padding-bottom:5px;position:relative;display:block}.homewidgetTab li.active{font-weight:600;color:#e1261c}.homewidgetTab li.active::after{content:'';position:absolute;height:3px;width:100%;background:#e1261c;left:0;bottom:0}.cd-watchlive{border:1px solid #b6b4b4;margin:0 10px;margin-bottom:10px}.cd-watchlive .cd-watchlive-hd{padding:10px 15px 10px 30px;background:#f6f6f6;position:relative;display:flex;align-items:center}.cd-watchlive .nw-dots{position:absolute;top:40px;left:15px}.cd-watchlive-hd .liveTvTxtWrap{text-transform:uppercase;font-weight:500;color:#464646;margin-right:10px}.cd-watchlive-hd .liveTvTxtWrap .boldTxt{color:#e1261c;font-size:22px;font-weight:600;}.cd-watchlive-hd .liveTvTxtWrap .boldTxt span{font-size:14px;color:#858585;font-weight:400;text-transform:initial}.brcountday-bypollslider{width:100%;padding:0 10px 10px;background:#ececec;border-top:1px solid #c5c5c5;border-bottom:3px solid #c5c5c5}.bypoll_section{display:flex;justify-content:space-between;padding-top:10px;margin-bottom:5px}.bypollSlider{}.bypollTable{width:100%;background:#f6f6f6;border-collapse:collapse}.bypollTable tr td{padding:5px;border:1px solid #ddd;font-size:11px;text-transform:uppercase;width:63px;vertical-align:middle;line-height:13px;text-align:center}.bypollTable tr td:first-child{width:185px;text-align:left;background:#10162e;color:#fff}.bypollTable tr:first-child td:nth-child(1){font-weight:500}.bypollTable tr:first-child td:not(:nth-child(1)){font-size:12px;background:#464646;color:#fff}.bypollTable tr:nth-child(2) td:not(:first-child){font-size:18px;color:#464646;font-weight:600}.bypollTable tr:nth-child(3) td:not(:first-child){font-size:12px;background:#444;color:#dcdcdc}.bypoll_rigth{display:flex;align-items:center}.as_dropdownWrap{position:relative;margin-right:auto;z-index:999}.as_dropdownWrap .as_seat_text{background:#e1261d;border:none;width:150px;height:26px;line-height:26px;color:#fff;border-radius:5px;font-size:12px;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url(https://images.news18.com/static_news18/pix/ibnhome/news18/state-2021-election/dropdown-icon.png);background-repeat:no-repeat;background-position:center right 5px;padding-right:13px;padding-left:5px;cursor:pointer}.as_dropdownWrap .as_seat_dropbox{width:100%;height:230px;background:#e1261d;position:absolute;right:0;overflow-x:auto;z-index:9;display:none}.as_dropdownWrap .as_seat_dropbox.open{display:block}.as_dropdownWrap .as_seat_dropbox ul{margin:0;padding:0}.as_dropdownWrap .as_seat_dropbox ul li{list-style:none}.as_dropdownWrap .as_seat_dropbox ul li a{font-size:12px;text-decoration:none;color:#fff;padding:4px 10px;display:block;text-transform:initial;font-weight:400;margin:0;text-align:left}.bypoll_rigth a{margin-right:13px;text-transform:uppercase;color:#e1261c;z-index:1;text-align:center;font-weight:600;font-size:12px;position:relative;border-bottom:1px #e1261c solid;padding-bottom:3px;line-height:14px;}.bypoll_rigth a:after,.bypoll_rigth a:before{content:"";position:absolute}.bypoll_rigth a:before{width:8px;height:2px;background:#d42b23;top:7px;right:-12px}.bypoll_rigth a:after{width:4px;height:4px;border-bottom:2px solid #d42b23;border-right:2px solid #d42b23;transform:rotate(-45deg);top:5px;right:-12px}.bypollSlider .amp-carousel-button{display:none}.countingresultMap{display:block;border:1px solid #b6b4b4;margin-top:10px}#playerContainer{overflow:hidden}.election_top_stroy{width:100%;background:#f5f5f5 0 0 no-repeat padding-box;box-shadow:0 0 6px #00000033;border:1px solid #d7d7d7;border-radius:0 5px 5px 0;line-height:30px;padding-top:5px}.ls-listingstory-more{position:relative;display:block;margin:15px 0 0 0;text-align:center;font-family:'Fira Sans'}.ls-listingstory-more:after,.ls-listingstory-more:before{content:"";position:absolute;left:0;right:0;height:1px;background:#ccc}.ls-listingstory-more:after,.ls-listingstory-more:before{content:"";position:absolute;left:0;right:0;height:1px;background:#ccc}.ls-listingstory-more:before{top:3px}.ls-listingstory-more span{background:#fff;padding:0 30px;text-transform:uppercase;color:#e1261c;position:relative;z-index:1;text-align:center;font-weight:700;font-size:12px;top:-10px}.ls-listingstory-more span:after,.ls-listingstory-more span:before{content:"";position:absolute;top:1px;width:3px;height:15px;border-left:1px solid #ccc;border-right:1px solid #ccc;transform:rotate(20deg);display:block;right:10px}.ls-listingstory-more span:before{left:10px}a{color:#001d42;text-decoration:none}.story_title{text-align:left;letter-spacing:-.4px;color:#001d42;font-size:22px;font-weight:700;padding:10px 10px}.election_top_stroy img{width:100%;display:block}.story_list{list-style:none;font-family:'Fira Sans';padding:0 10px}.story_list li{display:block;border-bottom:1px #939393 dashed;padding:10px 0}ul.story_list li a{display:flex;align-items:end}.story_list_img{max-width:160px;height:80px;margin-right:10px}.story_list_img img{width:100%;display:block;border-radius:8px;height:100%;object-fit:cover}.story_list_right{width:100%}.story_list_right_title{color:#001d42;font-size:14px;line-height:22px}.sub_title{height:22px;border-radius:0 4px 4px 0;background:#e1261c;display:table;text-align:center;line-height:22px;color:#fff;font-size:11px;text-transform:uppercase;font-weight:700;padding:0 10px}.prominment_section{padding:10px}ul.prominment_row{display:block;list-style:none;overflow-x:scroll;overflow-y:hidden;-webkit-overflow-scrolling:touch;white-space:nowrap;margin:0;display:-webkit-inline-box;width:100%}ul.prominment_row li{background:#fff;border:1px solid #d6d6d6;overflow:hidden;border-radius:6px;padding:0;align-items:center;box-sizing:border-box;margin:0 5px;width:290px;float:none}ul.prominment_row li a{display:flex;align-items:center;padding:6px 10px}ul.prominment_row li a figure{width:60px;height:60px;border-radius:50%;flex-shrink:0;margin-right:10px;overflow:hidden;border:1px solid #ddd}ul.prominment_row li a figure img{width:100%;border-radius:100px}.candidateslider-details{width:calc(100% - 60px);padding-left:10px}.candidateslider-details h3{    font-size: 15px;
color: #010101;font-weight: 700;margin-bottom: 6px;padding-top: 10px;}.candidateslider-details h3 span{display:block;font-weight:400;color:#474747;padding:4px 0;font-size:12px}.p-status{color:#464646;margin:0;font-size:20px;font-weight:600;line-height:22px}.p-status.won{color:#004d21}.p-status.lost{color:#e1261c}.p-status.leading{color:#6d9a48}.p-status.trailing{color:#e6635b}.prominment_section .moreBtn{display:flex;margin-top:6px;justify-content:center}.prominment_section .moreBtn a{color:#e1261c;font-size:12px;font-weight:600;position:relative}.prominment_section .moreBtn a:after,.prominment_section .moreBtn a:before{content:"";position:absolute}.prominment_section .moreBtn a:before{width:8px;height:2px;background:#d42b23;top:7px;right:-12px}.prominment_section .moreBtn a:after{width:4px;height:4px;border-bottom:2px solid #d42b23;border-right:2px solid #d42b23;transform:rotate(-45deg);top:5px;right:-12px}
                .brcountdaywrap {position: relative;background: #ffffff;width: 100%;box-shadow: inset 0px 1px 4px #e7e6e6;}
                .brcountday-tophd {color: #001e44;font-size: 18px;line-height: 27px;font-weight: bold;padding: 5px 9px;text-align: center;display: block;background: #f6f6f6;border-bottom: 1px #c7c6c6 solid;}
                .add_rhs {
                    display: none;
                }

                .elec-glblhd a span:after{ opacity:0;}

                .elec-glblhd, .elec-glblhd a h2{ padding: 0;line-height: 13px;}
                .adwrapper{
                    display:flex;
                    justify-content: center;
                }

                .sa {
                    padding: 10px;
                }
                .stel-hglgt .amp-carousel-button {
                    margin: 0;
                }

                .triviaSlider a {
                    font-weight: 600;
                    display: block;
                    overflow: hidden;
                    font-size: 14px;
                    color: #001d42;
                    line-height: 22px;
                    text-align: center;
                }
                
                .triviaSlider .amp-carousel-button {
                    margin: 0;
                }
                .brcount-tophdLive {font-size: 12px;color: #E1261C;font-style: initial;line-height: 16px;text-transform: uppercase;}
                .widgetcandi_name {}
                .p-status {}
                .brcountday-rslttally-hd h3, .brcountday-rslttally-hd h2 {
                    margin: 0;
                }
                
                .brcountday-rslttally-hd h2, .brcountday-rslttally-hd p {
                    margin: 0;
                    padding: 0;
                }
                
                .brcountday-rslttally-hd p {
                    padding-left: 10px;
                }
                
                .brcountday-rslttally-hd h3 {
                    padding-left: 10px;
                }     
                 
                .elec-container .elec-glblhd, .elec-container .elec-glblhd a h2 {
                    line-height: initial;
                    margin: 0;
                }

                .ls_pageheading a span:after {
                    display: none;
                }
                
                .prominment_section .ls_pageheading a {
                    margin: 0;
                }
                
                .prominment_section .ls_pageheading {
                    line-height: 9px;
                }

                .election_graphics{     overflow: hidden;}
                
            `}</style>
        </>
    );
};

export default ElectionHomeWidget;
