export function getOnlyVenue(venue) {
    let actualVenueName = '';
    if(typeof venue!=='undefined') {
        const venueArr			= venue.split(',');
        venueArr.shift();
        const actualVenue			= venueArr.join(' ');
        actualVenueName			= actualVenue;
    }
    return actualVenueName.trim();
}
export function get_ipl_teams_full(teamFullName) {
	const teamArr = new Array();
	teamArr['Kolkata']			= 'Kolkata Knight Riders';
	teamArr['Mumbai']			= 'Mumbai Indian';
	teamArr['Hyderabad']		= 'Sunrisers Hyderabad';
	teamArr['Punjab']			= 'Kings XI Punjab';
	teamArr['Bangalore']		= 'Royal Challengers Bangalore';
	teamArr['Delhi']			= 'Delhi  Daredevils';
	teamArr['Pune']				= 'Rising Pune Supergiant';
	teamArr['Gujarat']			= 'Gujarat Lions';
	teamArr['Royals']			= 'Rajasthan Royals';
	teamArr['Chennai']			= 'Chennai Super Kings';
	teamArr['TBC']				= 'TBC';
	if(teamFullName in teamArr) {
		return teamArr[teamFullName];
	}else{
		return teamFullName;
	}
}

export function get_ipl_teams_full_nw18(teamFullName) {
	const teamArr = new Array();
	teamArr['Kolkata Knight Riders']			= 'Kolkata';
	teamArr['Mumbai Indian']					= 'Mumbai';
	teamArr['Sunrisers Hyderabad']				= 'Hyderabad';
	teamArr['Kings XI Punjab']					= 'Punjab';
	teamArr['Royal Challengers Bangalore']		= 'Bangalore';
	teamArr['Delhi Capitals']					= 'Delhi';
	teamArr['Rajasthan Royals']					= 'Rajasthan';
	teamArr['Chennai Super Kings']				= 'Chennai';
	teamArr['TBC']								= 'TBC';
	if(teamFullName in teamArr) {
		return teamArr[teamFullName];
	}else{
		return teamFullName;
	}
}

export function get_ipl_teams_short(teamFullName) {
	const teamArr = new Array();
	teamArr['Kolkata']		= 'KKR';
	teamArr['KOL']			= 'KKR';
	teamArr['MUM']			= 'MI';
	teamArr['Mumbai']		= 'MI';
	teamArr['HYD']			= 'SRH';
	teamArr['Hyderabad']	= 'SRH';
	teamArr['PUN']			= 'RPS';
	teamArr['Punjab']		= 'KXIP';
	teamArr['PNJ']			= 'KXIP';
	teamArr['Bangalore']	= 'RCB';
	teamArr['BLR']			= 'RCB';
	teamArr['Delhi']		= 'DD';
	teamArr['DEL']			= 'DD';
	teamArr['Pune']			= 'RPS';
	teamArr['Gujarat']		= 'GL';
	teamArr['GUJ']			= 'GL';
	teamArr['TBC']			= 'TBC';

	if(teamFullName in teamArr) {
		return teamArr[teamFullName];
	}else{
		return teamFullName;
	}
}

export function convertToSlugNew(Text) {
    if(Text!='' && Text!='undefined') {
        return Text.replace(" (W)", "").replace(" (C)", "").toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    }else{
        const a = '';
        return a;
    }
}

export function UrlExists(url) {
    // let http = new XMLHttpRequest();
    // http.open('HEAD', url, false);
    // http.send();
    // if (http.status == 404){
    //     return 'https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/DefaultFlag-90x50-new.png';
    // }else{
        return url;
    // }
}

// inningwise live scores function
export function get_live_team_scores(scoresData) {
    const teamAfullName			= scoresData.teama.name_full;//change
    const teamAname			= scoresData.teama.name;
    const teamAflag = '';
    const teamBflag = '';
    const teamAscores			= scoresData.teama.scores;
    const teamBfullName			= scoresData.teamb.name_full;
    const teamBname			= scoresData.teamb.name;
    const teamBscores			= scoresData.teamb.scores;
    const matchType			= scoresData.matchtype;
    var teamAScoreHtml = '';
    var teamBScoreHtml ='';
    let liveMatchScoreHtml = '';
    // CALCULATE TEAM A SCORES
    const teamATotalInnings	= scoresData.teama.scores.length;
    if(teamATotalInnings > 0) {
        let x 	= 1;
        let innerBoxHtmlA = '';
        for(let b = 0; b < teamATotalInnings; b++) {
            const teamARuns			= teamAscores[b].run;//change
            const teamAWickets		= teamAscores[b].wickets;
            const teamAOvers			= teamAscores[b].overs;
            const activeAStatus		= teamAscores[b].active;
            const teamArunrate		= teamAscores[b].runrate;

            if(scoresData.matchtype=='test') {
                innerBoxHtmlA = innerBoxHtmlA+'<div class="score-'+x+'">'+teamARuns+'/'+teamAWickets+'</div><div class="runrate">('+teamAOvers+') RR '+teamArunrate+'</div>';
            }else if(scoresData.hasOwnProperty('isso') && scoresData.isso=='yes' && teamATotalInnings > 1) {
                innerBoxHtmlA = innerBoxHtmlA+'<div class="score-'+x+'">'+teamARuns+'/'+teamAWickets+'</div>';
            }else{
                innerBoxHtmlA = innerBoxHtmlA+'<div class="score-2">'+teamARuns+'/'+teamAWickets+'</div><div class="runrate">('+teamAOvers+') RR '+teamArunrate+'</div>';
            }
            x++;
        }
        var teamAScoreHtml = '<div class="scorebox"><div class="text">'+innerBoxHtmlA+'</div><div class="flagWrap"><h3 class="heading">'+teamAname+'</h3><div class="flag"><img src="'+teamAflag+'" alt="'+teamAfullName+'"></div></div></div>';
    }
    // CALCULATE TEAM B SCORES
    const teamBTotalInnings	= scoresData.teamb.scores.length;
    if(teamBTotalInnings > 0) {
        let y 	= 1;
        let innerBoxHtmlB = '';
        for(let c = 0; c < teamBTotalInnings; c++) {
            const teamBRuns			= teamBscores[c].run;//change
            const teamBWickets		= teamBscores[c].wickets;
            const teamBOvers			= teamBscores[c].overs;
            const activeBStatus		= teamBscores[c].active;
            const teamBrunrate		= teamBscores[c].runrate;
            if(teamBTotalInnings==1) {
                y = 2;
            }
            if(scoresData.matchtype=='test') {
                innerBoxHtmlB = innerBoxHtmlB+'<div class="score-'+y+'">'+teamBRuns+'/'+teamBWickets+'</div><div class="runrate">('+teamBOvers+') RR '+teamBrunrate+'</div>';
            }else if(scoresData.hasOwnProperty('isso') && scoresData.isso=='yes' && teamBTotalInnings > 1) {
                innerBoxHtmlB = innerBoxHtmlB+'<div class="score-'+y+'">'+teamBRuns+'/'+teamBWickets+'</div>';
            }else{
                innerBoxHtmlB = innerBoxHtmlB+'<div class="score-2">'+teamBRuns+'/'+teamBWickets+'</div><div class="runrate">('+teamBOvers+') RR '+teamBrunrate+'</div>';
            }
            y++;
        }
        var teamBScoreHtml = '<div class="scorebox"><div class="flagWrap"><h3 class="heading">'+teamBname+'</h3><div class="flag"><img src="'+teamBflag+'" alt="'+teamBfullName+'"></div></div><div class="text">'+innerBoxHtmlB+'</div></div>';
    }else{
        var teamBScoreHtml		= '<div class="scorebox"><div class="flagWrap"><h3 class="heading">'+teamBname+'</h3><div class="flag"><img src="'+teamBflag+'" alt="'+teamBfullName+'"></div></div><div class="text"><div class="score-2">0/0</div><div class="runrate">(Yet To Bat)</div></div></div>';
    }
    liveMatchScoreHtml	= '<div class="teamscoreWrap">'+teamAScoreHtml+'<div class="vs"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/vs-icon-2.png" height="22px" width="14px" alt=""></div>'+teamBScoreHtml+'</div>';
    return liveMatchScoreHtml;
}

// inningwise live scores function
export function get_live_team_scoresOLD(scoresData) {
    const teamAfullName = scoresData.teama.full_name;
    const teamAname = scoresData.teama.name;
    const teamAflag = UrlExists(scoresData.teama.image);
    const teamBflag = UrlExists(scoresData.teamb.image);
    const teamAscores			= scoresData.teama.scores;
    const teamBfullName			= scoresData.teamb.full_name;
    const teamBname			= scoresData.teamb.name;
    const teamBscores			= scoresData.teamb.scores;
    const matchType			= scoresData.matchtype;
    var teamAScoreHtml = '';
    var teamBScoreHtml ='';
    // CALCULATE TEAM A SCORES
    const teamATotalInnings	= scoresData.teama.scores.length;
    if(teamATotalInnings > 0) {
        let x 	= 1;
        let innerBoxHtmlA = '';
        for(let b = 0; b < teamATotalInnings; b++) {
            const teamARuns			= teamAscores[b].scores;
            const teamAWickets		= teamAscores[b].wickets;
            const teamAOvers			= teamAscores[b].overs;
            const activeAStatus		= teamAscores[b].active;
            const teamArunrate		= teamAscores[b].runrate;

            if(scoresData.matchtype=='test') {
                innerBoxHtmlA = innerBoxHtmlA+'<div class="score-'+x+'">'+teamARuns+'/'+teamAWickets+'</div><div class="runrate">('+teamAOvers+') RR '+teamArunrate+'</div>';
            }else if(scoresData.hasOwnProperty('isso') && scoresData.isso=='yes' && teamATotalInnings > 1) {
                innerBoxHtmlA = innerBoxHtmlA+'<div class="score-'+x+'">'+teamARuns+'/'+teamAWickets+'</div>';
            }else{
                innerBoxHtmlA = innerBoxHtmlA+'<div class="score-2">'+teamARuns+'/'+teamAWickets+'</div><div class="runrate">('+teamAOvers+') RR '+teamArunrate+'</div>';
            }
            x++;
        }
        var teamAScoreHtml = '<div class="scorebox"><div class="text">'+innerBoxHtmlA+'</div><div class="flagWrap"><h3 class="heading">'+teamAname+'</h3><div class="flag"><img src="'+teamAflag+'" alt="'+teamAfullName+'"></div></div></div>';
    }
    // CALCULATE TEAM B SCORES
    const teamBTotalInnings	= scoresData.teamb.scores.length;
    if(teamBTotalInnings > 0) {
        let y 	= 1;
        let innerBoxHtmlB = '';
        for(let c = 0; c < teamBTotalInnings; c++) {
            const teamBRuns			= teamBscores[c].scores;
            const teamBWickets		= teamBscores[c].wickets;
            const teamBOvers			= teamBscores[c].overs;
            const activeBStatus		= teamBscores[c].active;
            const teamBrunrate		= teamBscores[c].runrate;
            if(teamBTotalInnings==1) {
                y = 2;
            }
            if(scoresData.matchtype=='test') {
                innerBoxHtmlB = innerBoxHtmlB+'<div class="score-'+y+'">'+teamBRuns+'/'+teamBWickets+'</div><div class="runrate">('+teamBOvers+') RR '+teamBrunrate+'</div>';
            }else if(scoresData.hasOwnProperty('isso') && scoresData.isso=='yes' && teamBTotalInnings > 1) {
                innerBoxHtmlB = innerBoxHtmlB+'<div class="score-'+y+'">'+teamBRuns+'/'+teamBWickets+'</div>';
            }else{
                innerBoxHtmlB = innerBoxHtmlB+'<div class="score-2">'+teamBRuns+'/'+teamBWickets+'</div><div class="runrate">('+teamBOvers+') RR '+teamBrunrate+'</div>';
            }
            y++;
        }
        var teamBScoreHtml = '<div class="scorebox"><div class="flagWrap"><h3 class="heading">'+teamBname+'</h3><div class="flag"><img src="'+teamBflag+'" alt="'+teamBfullName+'"></div></div><div class="text">'+innerBoxHtmlB+'</div></div>';
    }else{
        var teamBScoreHtml		= '<div class="scorebox"><div class="flagWrap"><h3 class="heading">'+teamBname+'</h3><div class="flag"><img src="'+teamBflag+'" alt="'+teamBfullName+'"></div></div><div class="text"><div class="score-2">0/0</div><div class="runrate">(Yet To Bat)</div></div></div>';
    }
    liveMatchScoreHtml	= '<div class="teamscoreWrap">'+teamAScoreHtml+'<div class="vs"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/vs-icon-2.png" height="22px" width="14px" alt=""></div>'+teamBScoreHtml+'</div>';
    return liveMatchScoreHtml;
}
