import React, { useState, useEffect } from "react";
import ARTICLE_HELPER from 'includes/article.helper';

const LiveBlogCricket = (props) => {
  const [matchDetails, setMatchDetails] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {

    function tabTeamListeners(element) {
      element.addEventListener("click", () => {
        Array.from(_tabTeam).forEach(function(ele) {
          ele.classList.remove("act");
        });
        element.classList.add("act");
        const rel = element.getAttribute('rel');
        const type= element.getAttribute('data-type');
        if(type == 'test') {
          Array.from(_clickInningScore).forEach(function(ele) {
            ele.classList.remove("act");
          });
          const _relS = document.querySelector('.'+rel+'s');
          _relS.classList.add('act');
        }

          Array.from(_innings).forEach(function(ele) {
            ele.style.display ="none";
          });
          if(document.querySelector("."+rel)) {
            document.querySelector("."+rel).style.display ="block";
          }

      });
    }

    function inningScoreListners(element) {
      element.addEventListener("click", () => {
        Array.from(_clickInningScore).forEach(function(ele) {
          ele.classList.remove("act");
        });
        element.classList.add("act");
        const rel = element.getAttribute('rel');
        const tab= element.getAttribute('data-tab');
        Array.from(_innings).forEach(function(ele) {
          ele.style.display ="none";
        });
        document.querySelector("."+rel).style.display ="block";
        Array.from(_tabTeam).forEach(function(ele) {
          ele.classList.remove("act");
        });
        if(document.querySelector("."+tab+"tab")) {
          document.querySelector("."+tab+"tab").classList.add("act");
        }

      });
    }

    if (typeof (window) !== "undefined") {
      var _tabTeam = document.getElementsByClassName('tabteam');
      var _clickInningScore = document.getElementsByClassName('click_inning_score');
      var _innings = document.getElementsByClassName("innings");
      Array.from(_tabTeam).forEach(tabTeamListeners, false);
      Array.from(_clickInningScore).forEach(inningScoreListners, false);
    }

    return () => {
      if (typeof (window) !== "undefined") {
        const _tabTeam = document.getElementsByClassName('tabteam');
        const _clickInningScore = document.getElementsByClassName('click_inning_score');
        Array.from(_tabTeam).forEach(function(element) {
          element.removeEventListener('click', tabTeamListeners);
        });

        Array.from(_clickInningScore).forEach(function(element) {
          element.removeEventListener('click', inningScoreListners);
        });
      }
    };
  }, [data]);

  async function get_bowler_batsman_list(batsman, bowler, lastWicketInnings) {
    let batting = ''; let bowling = ''; let lastWicket = '';
    if(batsman.length > 0) {
      await ARTICLE_HELPER.asyncForEach(batsman.slice(0, 2), async (player) => {
        //for(let i= 0; i< batsman.length; i++){
          //let player = batsman[i];
          if(player.Striker === 'Yes') {
            batting+='<tr><td>'+player.name+'*</td><td></td><td></td><td>'+player.Runs+'</td><td>'+player.BallsFaced+'</td><td>'+player.four+'</td><td>'+player.six+'</td><td>'+player.SR+'</td></tr>';
          }else{
            batting+='<tr><td>'+player.name+'</td><td></td><td></td><td>'+player.Runs+'</td><td>'+player.BallsFaced+'</td><td>'+player.four+'</td><td>'+player.six+'</td><td>'+player.SR+'</td></tr>';
          }
      });
      // console.log('battingInner', batting)
    }

    if(bowler.length >0) {
      await ARTICLE_HELPER.asyncForEach(bowler.slice(0, 2), async (player) => {
        if(player.Bowling === 'Yes') {
          bowling+='<tr><td>'+player.name+'*</td><td>'+player.Over+'</td><td>'+player.Maiden+'</td><td>'+player.Runs+'</td><td>'+player.Wicket+'</td><td>'+player.wide+'</td><td>'+player.noball+'</td><td>'+player.Econ+'</td></tr>';
        }else{
          bowling+='<tr><td>'+player.name+'</td><td>'+player.Over+'</td><td>'+player.Maiden+'</td><td>'+player.Runs+'</td><td>'+player.Wicket+'</td><td>'+player.wide+'</td><td>'+player.noball+'</td><td>'+player.Econ+'</td></tr>';
        }
      });
    }

    if(lastWicketInnings['name']!= '') {
      lastWicket = lastWicketInnings['name']+' '+ lastWicketInnings['Runs']+ '('+lastWicketInnings['BallsFaced']+')';
    }

    //console.log('battingOuter', batting)
    const arr = [];
    arr['batting'] = batting;
    arr['bowling'] 		= bowling;
    arr['lastWicket']	= lastWicket;
    //console.log(arr)
    return arr;
  }

const [cricCount, setCricCount] = useState(true);
const [URL, setURL] = useState('');
const [URLC, setURLC] = useState('');
const [MOM, setMOM] = useState('');
let intervalId;
let _jsonp;

  useEffect(() => {
    _jsonp = (function() {
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
  }, []);
  useEffect(() => {
    if(props.checked) {
      intervalId = setInterval(() => {
        live_match();
      }, 5000);
    }

    if(intervalId && !props.checked) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [props.checked]);

  async function live_match(cFlag = false) {
    _jsonp.send('https://cricketnext.nw18.com/json/cross_'+props.match_id+'_fastest_hi.json', {
                  callbackName: 'match',
                  onSuccess: async function(response) {
                    let liveMatchListing = '';
                    const countMatch = 0;
                    const matchid = props.match_id;
                    const { teamfa } = response;
                    const { teamfb } = response;
                    const seriesName = response.seriesname;
                    const matchType = response.matchtype.toLowerCase();
                    const venue = response.venue_mov;
                    const matchTeam = new Array();
                    matchTeam[teamfa] = response.teama;
                    matchTeam[teamfb] = response.teamb;
                    const liveMatchURL = '/cricket/live-score/' + ARTICLE_HELPER.convertedToSlug(response.teama_en) + '-vs-' + ARTICLE_HELPER.convertedToSlug(response.teamb_en) + '-live-score-full-' + matchid + '.html';
                    const liveMatchURLC = '/cricket/live-score/' + ARTICLE_HELPER.convertedToSlug(response.teama_en) + '-vs-' + ARTICLE_HELPER.convertedToSlug(response.teamb_en) + '-ball-by-ball-live-commentary-' + matchid + '.html';
                    setURL(liveMatchURL);
                    setURLC(liveMatchURLC);
                    setMatchDetails({
                      venue: response.venue_mov,
                      result: response.matchresult,
                      event: response.seriesname
                    });
                    if(response.mom) { setMOM(response.mom);}

                    const matchstatus = response.status;
                    const fteamNameA = response.teamfa;
                    const fteamNameB = response.teamfb;
                    const fInnings = response.firstInnings;
                    const sInnings = response.secondInnings;
                    const tInnings = response.thirdInnings;
                    const { fourthInnings } = response;
                    const fistinningsscores = '';
                    const secondinningsscores = '';
                    const liveFlag = (response.matchresult === '')?true:false;
                    let battingTeam = '';
                    let bowlingTeam = '';
                    if (response.matchresult === '' && response.equation === '') {
                      if (response.status) {
                      var matchStatus = response.status;
                      } else{
                      var matchStatus = response.Toss_mov;
                      }
                    } else if (response.equation !== '') {
                      var matchStatus = response.equation;
                    } else{
                      var matchStatus = response.matchresult;
                    }

                    if (fInnings.status == '1') {
                      battingTeam = fInnings.Battingteam;
                      bowlingTeam = fInnings.Bowlingteam;
                      if (bowlingTeam == '') {
                        bowlingTeam = (battingTeam == fteamNameA)?fteamNameB:fteamNameA;
                      }

                       var arrBt = await get_bowler_batsman_list(fInnings.batsmen.list, fInnings.bowler.list, fInnings.LastWicket);
                      var battingFI = arrBt['batting'];
                      var bowlingFI = arrBt['bowling'];
                      var lastWicketFI = arrBt['lastWicket'];

                      var inningName = 'दूसरी पारी';

                      var firstInningsList = '';
                      var secondTab = '';
                      if (matchType == 'test') {
                        inningName = 'पहली पारी';
                        secondTab='<div class="ings-btn clearfix"><div class="flt"><a href="javascript:void(0)" class="act click_inning_score firstInningss" rel="firstInnings" data-tab="firstInnings">1st Inn</a></div><div class="frg"></div></div>';
                      }

                      var fistinningsTab='<li class="act tabteam firstInningstab" rel="firstInnings" data-type="'+matchType+'"><a href="javascript:void(0);"><b>'+battingTeam+'</b> <b>'+fInnings.Equation.Total+'/'+fInnings.Equation.Wickets+'</b> <br>('+fInnings['Equation']['Overs']+') <span>R/R: '+fInnings['Equation']['Runrate']+'</span></a></li> <li class="tabteam secondInningstab" rel="secondInnings" data-type="'+matchType+'"><a href="javascript:void(0);">'+bowlingTeam+' (YET TO BAT) </a></li>';

                      firstInningsList='<div class="firstInnings innings"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingFI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingFI+'</tbody></table></div>';
                    }

                    if (sInnings.status == '1') {
                      battingTeam = fInnings.Battingteam;
                      bowlingTeam = fInnings.Bowlingteam;
                      if (bowlingTeam == '') {
                        bowlingTeam = (battingTeam == fteamNameA)?fteamNameB:fteamNameA;
                      }

                      var arrBt = await get_bowler_batsman_list(fInnings.batsmen.list, fInnings.bowler.list, fInnings.LastWicket);
                      var battingFI = arrBt['batting'];
                      var bowlingFI = arrBt['bowling'];
                      var lastWicketFI = arrBt['lastWicket'];

                      var arrBt1 = await get_bowler_batsman_list(sInnings.batsmen.list, sInnings.bowler.list, sInnings.LastWicket);
                      var battingSI = arrBt1['batting'];
                      var bowlingSI = arrBt1['bowling'];
                      var lastWicketSI = arrBt1['lastWicket'];
                      var secondTab = '';
                      var inningName = 'दूसरी पारी';
                      if (matchType == 'test') {
                        inningName = 'पहली पारी';
                        secondTab='<div class="ings-btn clearfix"><div class="flt"><a href="javascript:void(0)" class=" click_inning_score firstInningss" rel="firstInnings" data-tab="firstInnings">1st Inn</a></div><div class="frg"><a href="javascript:void(0)" class="act click_inning_score secondInningss" rel="secondInnings" data-tab="secondInnings">1st Inn</a></div></div>';
                      }
                      var fistinningsTab='<li class="tabteam firstInningstab" rel="firstInnings" data-type="'+matchType+'"><a href="javascript:void(0);"><b>'+battingTeam+'</b> <b>'+fInnings.Equation.Total+'/'+fInnings.Equation.Wickets+'</b> <br>('+fInnings.Equation.Overs+') <span>R/R: '+fInnings.Equation.Runrate+'</span></a></li> <li class="act tabteam secondInningstab" rel="secondInnings" data-type="'+matchType+'"><a href="javascript:void(0);"><b>'+bowlingTeam+'</b> <b>'+sInnings.Equation.Total+'/'+sInnings.Equation.Wickets+' </b><br>('+sInnings.Equation.Overs+') <span>R/R: '+sInnings.Equation.Runrate+'</span></a></li>';

                      firstInningsList='<div class="firstInnings innings" style="display:none"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingFI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingFI+'</tbody></table></div>';
                      firstInningsList+='<div class="secondInnings innings"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingSI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingSI+'</tbody></table></div>';
                    }

                    if (matchType == 'test') {
                      if (tInnings.status === '1') {
                        battingTeam = fInnings.Battingteam;
                        bowlingTeam = fInnings.Bowlingteam;
                        if (bowlingTeam == '') {
                          bowlingTeam = (battingTeam == fteamNameA)?fteamNameB:fteamNameA;
                        }
                        var arrBt = await get_bowler_batsman_list(fInnings.batsmen.list, fInnings.bowler.list, fInnings.LastWicket);
                        var battingFI = arrBt['batting'];
                        var bowlingFI = arrBt['bowling'];
                        var lastWicketFI = arrBt['lastWicket'];

                        var arrBt1 = await get_bowler_batsman_list(sInnings.batsmen.list, sInnings.bowler.list, sInnings.LastWicket);
                        var battingSI = arrBt1['batting'];
                        var bowlingSI = arrBt1['bowling'];
                        var lastWicketSI = arrBt1['lastWicket'];

                        var arrBt3 = await get_bowler_batsman_list(tInnings.batsmen.list, tInnings.bowler.list, tInnings.LastWicket);
                        var battingTI = arrBt3['batting'];
                        var bowlingTI = arrBt3['bowling'];
                        var lastWicketTI = arrBt3['lastWicket'];
                        if (tInnings.Battingteam === battingTeam) {
                          var fistinningsTab='<li class="tabteam act firstInningstab" rel="firstInnings" data-type="'+matchType+'"><a href="javascript:void(0);"><b>'+battingTeam+'</b> <b>'+tInnings.Equation.Total+'/'+tInnings.Equation.Wickets+'</b> <br>('+tInnings.Equation.Overs+') & '+fInnings.Equation.Total+'/'+fInnings.Equation.Wickets+'</a></li> <li class="tabteam secondInningstab" rel="secondInnings" data-type="'+matchType+'"><a href="javascript:void(0);"><b>'+bowlingTeam+'</b> <b>'+sInnings.Equation.Total+'/'+sInnings.Equation.Wickets+' </b><br>('+sInnings.Equation.Overs+') </a></li>';
                          var secondTab='<div class="ings-btn clearfix"><div class="flt"><a href="javascript:void(0)" class=" click_inning_score firstInningss" rel="firstInnings" data-tab="firstInnings">1st Inn</a><a href="javascript:void(0)" class="act click_inning_score thirdInningss" rel="thirdInnings" data-tab="firstInnings">2nd Inn</a></div><div class="frg"><a href="javascript:void(0)" class=" click_inning_score secondInningss" rel="secondInnings" data-tab="secondInnings">1st Inn</a></div></div>';

                          firstInningsList='<div class="firstInnings innings" style="display:none"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingFI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingFI+'</tbody></table></div>';
                          firstInningsList+='<div class="secondInnings innings" style="display:none"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingSI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingSI+'</tbody></table></div>';
                          firstInningsList+='<div class="thirdInnings innings" ><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingTI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingTI+'</tbody></table></div>';

                      } else{
                        var fistinningsTab='<li class="tabteam firstInningstab" rel="firstInnings" data-type="'+matchType+'"><a href="javascript:void(0);"><b>'+battingTeam+'</b> <b>'+fInnings.Equation.Total+'/'+fInnings.Equation.Wickets+'</b></a></li> <li class="tabteam act secondInningstab" rel="secondInnings" data-type="'+matchType+'"><a href="javascript:void(0);"><b>'+bowlingTeam+'</b> <b>'+tInnings.Equation.Total+'/'+tInnings.Equation.Wickets+' <br>('+tInnings.Equation.Overs+') & '+sInnings.Equation.Total+'/'+sInnings.Equation.Wickets+' </b><br>('+sInnings.Equation.Overs+') </a></li> ';

                        var secondTab='<div class="ings-btn clearfix"><div class="flt"><a href="javascript:void(0)" class=" click_inning_score firstInningss" rel="firstInnings" data-tab="firstInnings">1st Inn</a></div><div class="frg"><a href="javascript:void(0)" class=" click_inning_score secondInningss" rel="secondInnings" data-tab="secondInnings">1st Inn</a><a href="javascript:void(0)" class="act click_inning_score thirdInningss" rel="thirdInnings" data-tab="secondInnings">2nd Inn</a></div></div>';

                        firstInningsList='<div class="firstInnings innings" style="display:none"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingFI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingFI+'</tbody></table></div>';
                        firstInningsList+='<div class="secondInnings innings" style="display:none"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingSI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingSI+'</tbody></table></div>';
                        firstInningsList+='<div class="thirdInnings innings"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingTI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingTI+'</tbody></table></div>';
                      }
                      if (fourthInnings.status === '1') {
                        battingTeam = fInnings.Battingteam;
                        bowlingTeam = fInnings.Bowlingteam;
                        if (bowlingTeam == '') {
                          bowlingTeam = (battingTeam == fteamNameA)?fteamNameB:fteamNameA;
                        }

                        var arrBt = await get_bowler_batsman_list(fInnings.batsmen.list, fInnings.bowler.list, fInnings.LastWicket);
                        var battingFI = arrBt['batting'];
                        var bowlingFI = arrBt['bowling'];
                        var lastWicketFI = arrBt['lastWicket'];

                        var arrBt1 = await get_bowler_batsman_list(sInnings.batsmen.list, sInnings.bowler.list, sInnings.LastWicket);
                        var battingSI = arrBt1['batting'];
                        var bowlingSI = arrBt1['bowling'];
                        var lastWicketSI = arrBt1['lastWicket'];

                        var arrBt3 = await get_bowler_batsman_list(tInnings.batsmen.list, tInnings.bowler.list, tInnings.LastWicket);
                        var battingTI = arrBt3['batting'];
                        var bowlingTI = arrBt3['bowling'];
                        var lastWicketTI = arrBt3['lastWicket'];

                        const arrBt4 = await get_bowler_batsman_list(fourthInnings.batsmen.list, fourthInnings.bowler.list, fourthInnings.LastWicket);
                        const battingFRI = arrBt4['batting'];
                        const bowlingFRI = arrBt4['bowling'];
                        const lastWicketFRI = arrBt4['lastWicket'];
                        if (fourthInnings.Battingteam === battingTeam) {
                          var fistinningsTab='<li class="tabteam firstInningstab" rel="firstInnings" data-type="'+matchType+'"><a href="javascript:void(0);"><b>'+battingTeam+'</b> <b>'+fourthInnings.Equation.Total+'/'+fourthInnings.Equation.Wickets+'<br>('+fourthInnings.Equation.Overs+') & '+fInnings.Equation.Total+'/'+fInnings.Equation.Wickets+'</b></a></li> <li class="tabteam act secondInningstab" rel="secondInnings" data-type="'+matchType+'"><a href="javascript:void(0);"><b>'+bowlingTeam+'</b> <b>'+tInnings.Equation.Total+'/'+tInnings.Equation.Wickets+' ('+tInnings.Equation.Overs+')& '+sInnings.Equation.Total+'/'+sInnings.Equation.Wickets+' </b><br>('+sInnings.Equation.Overs+') </a></li>';
                          var secondTab='<div class="ings-btn clearfix"><div class="flt"><a href="javascript:void(0)" class=" click_inning_score firstInningss" rel="firstInnings" data-tab="firstInnings">1st Inn</a><a href="javascript:void(0)" class="act  click_inning_score fourthInningss" rel="fourthInnings" data-tab="firstInnings">2nd Inn</a></div><div class="frg"><a href="javascript:void(0)" class=" click_inning_score secondInningss" rel="secondInnings" data-tab="secondInnings">1st Inn</a><a href="javascript:void(0)" class="click_inning_score thirdInningss" rel="thirdInnings" data-tab="secondInnings">2nd Inn</a></div></div>';

                          firstInningsList='<div class="firstInnings innings" style="display:none"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingFI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingFI+'</tbody></table></div>';
                          firstInningsList+='<div class="secondInnings innings" style="display:none"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingSI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingSI+'</tbody></table></div>';
                          firstInningsList+='<div class="thirdInnings innings" ><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingTI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingTI+'</tbody></table></div>';
                          firstInningsList+='<div class="fourthInnings innings" style="display:none"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingFRI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingFRI+'</tbody></table></div>';
                          } else{
                            var fistinningsTab='<li class="tabteam firstInningstab" rel="firstInnings" data-type="'+matchType+'"><a href="javascript:void(0);"><b>'+battingTeam+'</b> <b>'+tInnings.Equation.Total+'/'+tInnings.Equation.Wickets+' <br>('+tInnings.Equation.Overs+') & '+fInnings.Equation.Total+'/'+fInnings.Equation.Wickets+'</b></a></li> <li class="tabteam act secondInningstab" rel="secondInnings" data-type="'+matchType+'"><a href="javascript:void(0);"><b>'+bowlingTeam+'</b> <b>'+fourthInnings.Equation.Total+'/'+fourthInnings.Equation.Wickets+' ('+fourthInnings.Equation.Overs+')& '+sInnings.Equation.Total+'/'+sInnings.Equation.Wickets+' </b><br>('+sInnings.Equation.Overs+') </a></li>';

                            var secondTab='<div class="ings-btn clearfix"><div class="flt"><a href="javascript:void(0)" class=" click_inning_score firstInningss" rel="firstInnings" data-tab="firstInnings">1st Inn</a><a href="javascript:void(0)" class=" click_inning_score thirdInningss" rel="thirdInnings" data-tab="firstInnings">2nd Inn</a></div><div class="frg"><a href="javascript:void(0)" class=" click_inning_score secondInningss" rel="secondInnings" data-tab="secondInnings">1st Inn</a><a href="javascript:void(0)" class="act click_inning_score fourthInningss" rel="fourthInnings" data-tab="secondInnings">2nd Inn</a></div></div>';

                            firstInningsList='<div class="firstInnings innings" style="display:none"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingFI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingFI+'</tbody></table></div>';
                            firstInningsList+='<div class="secondInnings innings" style="display:none"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingSI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingSI+'</tbody></table></div>';
                            firstInningsList+='<div class="thirdInnings innings" style="display:none"><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingTI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingTI+'</tbody></table></div>';
                            firstInningsList+='<div class="fourthInnings innings" ><table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>बल्लेबाज़</th><th></th><th></th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>'+battingFRI+'</tbody></table>   <table class="lvblg-score-tbl" cellpadding="0" cellspacing="0" border="0"><tbody><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>WKT</th><th>WD</th><th>NB</th><th>ECON</th></tr>'+bowlingFRI+'</tbody></table></div>';				}

                      }
                    }
                    }

                    liveMatchListing+='<ul class="lvblg-cmntrtab clearfix">'+fistinningsTab+'</ul>'+secondTab+''+firstInningsList;
                    // if(cFlag){
                    //   return liveMatchListing
                    // }else{
                    //   setCricCount(false)
                    //   setData(liveMatchListing)
                    // }
                    setData(liveMatchListing);
                    //$("#match-highlight").html(liveMatchListing);
                    if ((response.length == 0 || response.status === 'Match Ended' || response.status === "मैच खत्म") && typeof intervalId !== 'undefined') {
                      clearInterval(intervalId);
                      // props.updateMatchStatus(false);
                    }

                      },
                      onTimeout: function() {
                          console.log('timeout!');
                      },
                      timeout: 5
                  });
  }
  return (
    <React.Fragment>

        <div className="lvblg-scrwdgt">
          <ul className="lvblg-scrtab clearfix">
          <li><a href={URL}>पूरा स्कोरकार्ड</a></li>
          <li><a href={URLC}>लाइव कमेंट्री </a></li>
          <li className="act"><span>लाइव ब्लॉग</span></li>
          </ul>

          <div className="lvblg-tmdtl">
          <h2>{matchDetails.event || ''}</h2>
          <h3>{matchDetails.venue || ''}</h3>
          <span>{matchDetails.result ? matchDetails.result : ''}</span>
          </div>
          { (MOM)?
          <h3 className="mn-of-mtch"> <b>Man of the Match:</b> {MOM} </h3>
          :''}

            <div id="match-highlight">
            { (data.length > 0)?
            <div dangerouslySetInnerHTML={{ __html: data }}></div> :''
            }
            </div>
        </div>

      <style jsx global>{`
        .lvblg-scrwdgt{width:100%; float:left; clear:both; padding:15px; box-sizing:border-box; margin-bottom:15px; background:#fff;}
        .lvblg-scrtab{}
        .lvblg-scrtab li{float:left; position:relative}
        .lvblg-scrtab li a{background:#f4f4f2; height:35px; line-height:35px; font-size:14px; color:#333; overflow:hidden; padding:0 15px; display:block; border-right:2px solid #fff}
        .lvblg-scrtab li.act{}
        .lvblg-scrtab li.act a{font-weight:bold; background:#d02e35; color:#fff; overflow:visible}
        .lvblg-scrtab li.act a:before{content:"";    border-bottom: 10px solid #d02e35; border-right: 10px solid transparent; position: absolute; bottom: -4px; left: 50%; margin-left: -4px; transform: rotate(-45deg)}
        .lvblg-tmdtl{ padding:15px 0 10px 0; border-bottom: 1px solid #dfdfdf; margin-bottom:10px}
        .lvblg-tmdtl h2{font-size: 16px; line-height: 18px; color: #252525; font-weight:bold}
        .lvblg-tmdtl h3{color: #828282; font-size: 14px;padding: 8px 0 5px 0;}
        .lvblg-tmdtl span{color: #e1261c; font-weight: bold; font-size:14px;}
        .mn-of-mtch {font-size: 14px; color: #474747;font-weight: normal; margin-bottom:10px}
        .lvblg-cmntrtab{margin-bottom:10px; display:flex;}
        .lvblg-cmntrtab li{width:49%; margin-left:2%; border-bottom:1px solid #dfdfdf; line-height:30px; position:relative}
        .lvblg-cmntrtab li.act{border-bottom:2px solid #d02e35}
        .lvblg-cmntrtab li:first-child{margin-left:0}
        .lvblg-cmntrtab li a{color:#262626; font-size:16px;display:block}
        .lvblg-cmntrtab li a span{color:#828282; font-size:12px; font-weight:normal}
        .lvblg-cmntrtab li a b{font-weight:normal}
        .lvblg-cmntrtab li.act a{font-size:18px;}
        .lvblg-cmntrtab li.act a b{font-weight:bold}
        .lvblg-cmntrtab li.act a:before{content:"";    border-bottom: 10px solid #d02e35; border-right: 10px solid transparent; position: absolute; bottom: -5px; left: 50%; margin-left: -4px; transform: rotate(-45deg)}
          .lvblg-cmntrtab li br{ display:none}
        .lvblg-score-tbl{width:100%}
        .lvblg-score-tbl tr.txtbold{font-weight:bold}
        .lvblg-score-tbl tr.totl td{font-weight:bold; font-size:18px; color:#333}
        .lvblg-score-tbl tr.totl td span{color:#828282; font-size:14px; font-weight:normal}
        .lvblg-score-tbl tr.totl td:last-child{ padding-left:30px}
        .lvblg-score-tbl th{background:#f3f3f3; color:#333; font-size:14px; font-weight:bold; padding:12px 15px; text-align:center}
        .lvblg-score-tbl td{color:#555; font-size:14px; padding:10px; text-align:center; border-bottom:1px solid #dfdfdf}
        .lvblg-score-tbl th:first-child, .lvblg-score-tbl td:first-child{width:50%; text-align:left; color:#333}
        .cathby{font-size:13px; color:#575757;}
        .lvblg-score-tbl td a{color:#333}
        .lvblg-score-tbl tr.bgclr{background:#f7f7f7}
        .ings-btn{ position:relative;  height: 30px;    margin:15px 0 0 0;}
        .ings-btn .flt{ position:absolute; left:0; top:0}
        .ings-btn .frg{position:absolute; left:51%; top:0}
        .ings-btn a{display:inline-block; height:29px; line-height:29px; background:#f6f6f6; padding:0 20px; margin-right:1px; font-size:11px; color:#555; text-transform:uppercase}
        .ings-btn a.act{background:#d02e35; color:#fff; font-weight:bold}
        .lvblg-scrtab li span {
          background: #f4f4f2;
          height: 35px;
          line-height: 35px;
          font-size: 14px;
          color: #333;
          overflow: hidden;
          padding: 0 15px;
          display: block;
          border-right: 2px solid #fff;
      }
      .lvblg-tmdtl h2 {
        font-size: 16px;
        line-height: 18px;
        color: #252525;
        font-weight: bold;
      }
      .lvblg-tmdtl h3 {
        color: #828282;
        font-size: 14px;
        font-weight: bold;
        padding: 8px 0;
      }
      .lvblg-tmdtl span {
        color: #e1261c;
        font-weight: bold;
        font-size: 14px;
      }
      body {
        font-family: Noto Serif, Droid Serif, sans-serif !important;
      }
      `}</style>
    </React.Fragment>
  );
};

export default LiveBlogCricket;
