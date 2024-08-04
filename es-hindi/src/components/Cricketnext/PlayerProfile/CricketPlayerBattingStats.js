import React from 'react';

const CricketPlayerBattingStats = ({ playerBattingStats }) => {
  const test = playerBattingStats?.Test?.batting;
  const oneDay = playerBattingStats?.ODI?.batting;
  const tTwenty = playerBattingStats?.T20I?.batting;
  return (
    <>
      <tr>
        <td>मैच</td>
        <td>{test?.matches}</td>
        <td>{oneDay?.matches}</td>
        <td>{tTwenty?.matches}</td>
      </tr>
      <tr>
        <td>पारी</td>
        <td>{test?.innings}</td>
        <td>{oneDay?.innings}</td>
        <td>{tTwenty?.innings}</td>
      </tr>
      <tr>
        <td>रन</td>
        <td>{test?.runs}</td>
        <td>{oneDay?.runs}</td>
        <td>{tTwenty?.runs}</td>
      </tr>
      <tr>
        <td>बॉल</td>
        <td>{test?.balls_faced}</td>
        <td>{oneDay?.balls_faced}</td>
        <td>{tTwenty?.balls_faced}</td>
      </tr>
      <tr>
        <td>सर्वोच्च</td>
        <td>{test?.hs}</td>
        <td>{oneDay?.hs}</td>
        <td>{tTwenty?.hs}</td>
      </tr>
      <tr>
        <td>औसत</td>
        <td>{test?.average}</td>
        <td>{oneDay?.average}</td>
        <td>{tTwenty?.average}</td>
      </tr>
      <tr>
        <td>स्ट्राइक रेट</td>
        <td>{test?.strike_rate}</td>
        <td>{oneDay?.strike_rate}</td>
        <td>{tTwenty?.strike_rate}</td>
      </tr>
      <tr>
        <td>नाबाद</td>
        <td>{test?.not_outs}</td>
        <td>{oneDay?.not_outs}</td>
        <td>{tTwenty?.not_outs}</td>
      </tr>
      <tr>
        <td>चौके</td>
        <td>{test?.fours}</td>
        <td>{oneDay?.fours}</td>
        <td>{tTwenty?.fours}</td>
      </tr>
      <tr>
        <td>छक्के</td>
        <td>{test?.sixes}</td>
        <td>{oneDay?.sixes}</td>
        <td>{tTwenty?.sixes}</td>
      </tr>
      <tr>
        <td>अर्धशतक</td>
        <td>{test?.fifties}</td>
        <td>{oneDay?.fifties}</td>
        <td>{tTwenty?.fifties}</td>
      </tr>
      <tr>
        <td>शतक</td>
        <td>{test?.hundreds}</td>
        <td>{oneDay?.hundreds}</td>
        <td>{tTwenty?.hundreds}</td>
      </tr>
    </>
  );
};

export default CricketPlayerBattingStats;
