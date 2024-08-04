import React, { useState, useEffect } from "react";
import Glide from '@glidejs/glide';

const RhsScorecard = (props) => {
    function _convertedToSlug(Text)
    {
        if(Text) {
            return Text
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
}
    }

    function getWidgetActiveTeam(teamAScore, teamBScore, urlTeam, teamA, teamB) {
        let activeTeamName='';
        let activeTeamTotalRun='';
        let activeTeamWickets='';
        let activeTeamOvers='';

        for(let b=0; b < teamBScore.length; b++) {
            const activeStatus=teamBScore[b].active;
            if(activeStatus==1) {
                activeTeamName=teamBScore[b].team;
                activeTeamTotalRun=teamBScore[b].scores;
                activeTeamWickets=teamBScore[b].wickets;
                activeTeamOvers=teamBScore[b].overs;
            }
        }
        if(activeTeamName=='') {
            for(let b=0; b < teamAScore.length; b++) {
                const activeStatus=teamAScore[b].active;
                if(activeStatus==1) {
                    activeTeamName=teamAScore[b].team;
                    activeTeamTotalRun=teamAScore[b].scores;
                    activeTeamWickets=teamAScore[b].wickets;
                    activeTeamOvers=teamAScore[b].overs;
                }
            }
        }
        if(activeTeamName!='') {
            return { activeTeamName: activeTeamName, activeTeamTotalRun: activeTeamTotalRun, activeTeamWickets: activeTeamWickets, activeTeamOvers: activeTeamOvers, urlTeam: urlTeam, teamA: teamA, teamB: teamB };
        }else{
            return '';
        }
        //console.log(activeTeamName+"="+activeTeamTotalRun+"="+activeTeamWickets+"=="+activeTeamOvers);
    }

    const _jsonp = (function() {
        const that = {};
        that.send = function(src, options) {
          const callback_name = options.callbackName || 'callback',
            on_success = options.onSuccess || function() {},
            on_timeout = options.onTimeout || function() {},
            timeout = options.timeout || 10; // sec

          const timeout_trigger = window.setTimeout(function() {
            window[callback_name] = function() {};
            on_timeout();
          }, timeout * 1000);

          window[callback_name] = function(data) {
            window.clearTimeout(timeout_trigger);
            on_success(data);
          };

          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = src;

          document.getElementsByTagName('head')[0].appendChild(script);
        };
        return that;
      })();

    const [data, setData] = useState({});

    // useEffect(() => {
    //     setInterval(() => {

    //         _jsonp.send('//cricketnext.nw18.com/json/crosslivescores.json', {
    //         callbackName: 'scores',
    //         onSuccess: function(response){
    //                 const matchData = {};
    //                 matchData['allMatches'] = [];
    //                 let matchesDetails = response.matches;
    //                 if(matchesDetails.length > 0){
    //                     Object.keys(matchesDetails).forEach(function(key) {
    //                         let liveMatches = matchesDetails[key];
    //                         let fteamNameA = liveMatches.hometeam;
    //                         let fteamNameB = liveMatches.awayteam;
    //                         let fMatchId = liveMatches.matchid;
    //                         let series 	= liveMatches.series.toLowerCase();
    //                         series 	= series.replace(",","");
    //                         series 	= series.replace(/\s+/g,"-");

    //                         let urlTeam 		= _convertedToSlug(fteamNameA)+'-'+_convertedToSlug(fteamNameB);

    //                         //if(i==0){
    //                             //console.log(liveMatchesD);
    //                         //	let flscorelink = '/scorecard/full/'+urlTeam+'/'+fMatchId+'.html';
    //                             //$('.top_live_score a').attr('href', flscorelink);
    //                         //}
    //                         let teamAScore=liveMatches.teama.scores;
    //                         let teamBScore=liveMatches.teamb.scores;
    //                         //let seriesFullName = liveMatches.series;
    //                         let fullScoreCardLink = '/scorecard/full/'+urlTeam+'/'+fMatchId+'.html';
    //                         let liveMatchData = getWidgetActiveTeam(teamAScore,teamBScore,fullScoreCardLink, fteamNameA, fteamNameB);

    //                         if(liveMatchData){
    //                             matchData['allMatches'].push(liveMatchData);
    //                         }
    //                     })
    //                 }
    //                 setData(matchData['allMatches']);
    //             },
    //             onTimeout: function(){
    //                 console.log('timeout!');
    //             },
    //             timeout: 5
    //         });

    //     }, 10000)
    // }, []);

    //console.log(data);
    useEffect(() => {
        if(Object.keys(data).length > 0)
            new Glide('.glide', {
                type: 'carousel',
                startAt: 0,
                perView: 1
            }).mount();
    }, [data]);

    return (
        Object.keys(data).length > 0 ? <>
            <div className="mcricket_widget ptop15">
                <div className="live_cwidget glide">
                    <h2 className="msc_h2">LIVE Now</h2>
                    <div className="lcinner glide__track" data-glide-el="track" >
                        <span className="sprite_img cricket_icon pcimg"></span>
                        <a href="#" className="sprite_img lc_larrow scoreMidArrow" data-type="left"></a> <a href="#" className="sprite_img lc_rarrow scoreMidArrow" data-type="right"></a>
                        <ul id="mobileLiveScoreCard" className="glide__slides">

                            {Object.keys(data).map((key) => {
                                return <li key={'matchrhs'+key} className="glide__slide">
                                    <a href={data[key].urlTeam}>{data[key].teamA} vs {data[key].teamB} </a>
                                    <div className="score">
                                        <a href={data[key].urlTeam}>
                                            {data[key].activeTeamName} <span></span>
                                        </a>
                                        <a href={data[key].urlTeam}>{data[key].activeTeamTotalRun}/{data[key].activeTeamWickets}</a>
                                        {data[key].activeTeamOvers} Overs
                                    </div>
                                </li>;
                            })}

                        </ul>
                    </div>

                    <div className="glide__arrows" data-glide-el="controls">
                        <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                        <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                    </div>
                </div>
                <div className="clearfix vsp10"></div>
            </div>
            <style jsx>{`
            .live_cricketpup{background:#fff!important;border-radius:6px;padding:4px 41px 4px 4px;position:fixed;top:165px;left:-495px;color:#fff;z-index:4}.live_cwidget{background:#2b2b2b;position:relative;padding-bottom:4px;height:91px}.live_cwidget h2{font-size:18px;padding:4px 10px;background:#ec1c23;text-transform:uppercase;font-weight:400;color:#fff!important}.live_cwidget h2.msc_h2{font-size:14px;font-weight:700}.live_cwidget .lcinner{margin:6px 24px 6px 64px;overflow:hidden}.live_cwidget ul li{float:left;width:300px;line-height:14px!important;padding:5px 0 0;border-bottom:none;font-size:15px}.live_cwidget ul li .score{font-size:16px;color:#fff;line-height:28px}.live_cwidget ul li .score span{font-size:23px;padding:0 6px}.live_cwidget a{color:#fff!important}.mcricket_widget{background:#fff;display:block;position:absolute;top:40px;left:10px;z-index:0;width:22px;height:33px}.lc_larrow,.lc_rarrow{width:10px;height:16px;position:absolute;top:52px}
            .cwidget-box{display:none}@media(max-width:600px){.cwidget-box{display:block;margin-top:20px}.mcricket_widget{width:100%}}
            `}</style>
        </> : <p></p>
    );
};
export default RhsScorecard;
