import { getCricketData, getCricketDataDirect } from "api_dns/global/Common";
const WORLD_CUP_ID = "5612";

export const getPointTableData = async () => {
  return await getCricketData(`standing/${WORLD_CUP_ID}`);
};

export const getMostRunData = async () => {
  return await getCricketDataDirect(`stat/2/${WORLD_CUP_ID}`);
};

export const getMostWicketData = async () => {
  return await getCricketDataDirect(`stat/13/${WORLD_CUP_ID}`);
};

export const getStatsData = async () => {
  return await getCricketData(`tournament/${WORLD_CUP_ID}`);
};

export const getResultData = async () => {
  return await getCricketData(`series-result/${WORLD_CUP_ID}`);
};

export const getScheduleData = async () => {
  return await getCricketData(`schedule/series/${WORLD_CUP_ID}`);
};
