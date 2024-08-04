import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
import dynamic from 'next/dynamic';

const CountingTallyWidget = dynamic(() => import('widgets/Common/Responsive/CountingTallyWidget'));
const CountingTallySponserWidget = dynamic(() => import('widgets/Common/Responsive/CountingTallySponserWidget'));
const CountingWidgets = dynamic(() => import('widgets/Amp/CountingWidgets'));
// const ExitPollWidget  = dynamic(() => import('widgets/Common/Responsive/ExitPollWidget'));

const Election2022AcrossWidget = (props) => {
  const isAmp = props?.isAmp || false;
  const assembly_switcher_CountingDay = props?.electionData?.site_switcher_widget_assembly_election?.counting_poll || {};
  const assembly_switcher_ExitPoll = props?.electionData?.site_switcher_widget_assembly_election?.exit_poll || {};
  const env = publicRuntimeConfig.isEnv == 'production' ? 'live' : publicRuntimeConfig.isEnv;

  const ExitPollEnvStatus = assembly_switcher_ExitPoll?.status?.[`exit_poll_${env}_flag`] == "1" ? true : false;
  const CountingTallyEnvStatus = assembly_switcher_CountingDay?.status?.[`counting_${env}_flag`] == "1" ? true : false;
  const countingTallyFlag = props?.isHome && assembly_switcher_CountingDay?.across_site_tally_home == "1" ? true : (!(props?.isHome) && assembly_switcher_CountingDay?.counting_tally_across_flag == "1" ? true : false);
  const countingTallySponserFlag = props?.isHome && assembly_switcher_CountingDay?.counting_tally_sponser_home_flag == "1" ? true : (!(props?.isHome) && assembly_switcher_CountingDay?.counting_tally_sponser_across_flag == "1" ? true : false);
  // let exitPollFlag             = props?.isHome && assembly_switcher_ExitPoll?.exit_poll_home_flag == "1" ? true : (!(props?.isHome) && assembly_switcher_ExitPoll?.exit_poll_across_site_flag == "1" ? true : false);
  // let exitPollSponserFlag      = props?.isHome && assembly_switcher_ExitPoll?.exit_poll_sponser_home_flag == "1" ? true : (!(props?.isHome) && assembly_switcher_ExitPoll?.exit_poll_sponser_across_flag == "1" ? true : false);
  const countingTallyAmpFlag = isAmp && assembly_switcher_CountingDay?.counting_tally_amp_flag == '1' ? true : false;
  const countingTallySponserAmpFlag = isAmp && assembly_switcher_CountingDay?.counting_tally_sponser_amp_flag == '1' ? true : false;
  const exitPollAmpFlag = isAmp && assembly_switcher_ExitPoll?.exit_poll_amp_flag == '1' ? true : false;
  const exitPollSponserAmpFlag = isAmp && assembly_switcher_ExitPoll?.exit_poll_sponser_amp_flag == '1' ? true : false;
  const RedirectUrl = props?.electionData?.site_switcher_widget_assembly_election
    ?.story_url
    ? props?.electionData?.site_switcher_widget_assembly_election?.story_url
    : false;

  return (
    <>

      { !(isAmp) && (CountingTallyEnvStatus && countingTallyFlag) ? <CountingTallyWidget isMobile={props?.isMobile || false} RedirectUrl = {RedirectUrl} /> : "" }
      { !(isAmp) && (CountingTallyEnvStatus && countingTallySponserFlag) ? <CountingTallySponserWidget isMobile={props?.isMobile || false} /> : "" }
      {/* { !(isAmp) && ExitPollEnvStatus ? <ExitPollWidget isMobile={props?.isMobile || false} exitPollFlag={exitPollFlag} exitPollSponserFlag={exitPollSponserFlag} /> : "" } */}
      { (isAmp) && (CountingTallyEnvStatus || ExitPollEnvStatus) ? <CountingWidgets exitPollFlag={exitPollAmpFlag} exitPollSponserFlag={exitPollSponserAmpFlag} countingTallyFlag={countingTallyAmpFlag} countingTallySponserFlag={countingTallySponserAmpFlag} RedirectUrl = {RedirectUrl} /> : "" }

      <div className="vsp20px"></div>

      <style jsx global>
        {
          `.election_day_widget {max-width: 1244px; margin:0px auto 0 ${isAmp ? '' : '!important'}; padding-bottom: 30px; background: #FAFAFA 0% 0% no-repeat padding-box; border: 1px solid #D7D7D7; border-bottom: 0 #001D42 solid; padding: 10px 20px; box-sizing: border-box; } 
          .election_day_widget { height:${props?.isMobile ? '145px;' : '200px;'} max-width:1244px; margin:auto;} ${props?.isMobile ? 'overflow:hidden;' : ''}
          .vsp20px {margin-top:20px}
        `}
      </style>
    </>
  );
};

export default Election2022AcrossWidget;
