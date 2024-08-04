import React from 'react';

const CricketPlayerBowlingStats = ({ playerBowlingStats }) => {
  // const test = playerBowlingStats?.test;
  // const oneDay = playerBowlingStats?.oneDay;
  // const tTwenty = playerBowlingStats?.tTwenty;

  const test = playerBowlingStats?.Test?.bowling;
  const oneDay = playerBowlingStats?.ODI?.bowling;
  const tTwenty = playerBowlingStats?.T20I?.bowling;

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
        <td>{test?.balls_bowled}</td>
        <td>{oneDay?.balls_bowled}</td>
        <td>{tTwenty?.balls_bowled}</td>
      </tr>
      <tr>
        <td>मेडन</td>
        <td>{test?.maidens}</td>
        <td>{oneDay?.maidens}</td>
        <td>{tTwenty?.maidens}</td>
      </tr>
      <tr>
        <td>विकेट</td>
        <td>{test?.wickets}</td>
        <td>{oneDay?.wickets}</td>
        <td>{tTwenty?.wickets}</td>
      </tr>
      <tr>
        <td>औसत</td>
        <td>{test?.average}</td>
        <td>{oneDay?.average}</td>
        <td>{tTwenty?.average}</td>
      </tr>
      <tr>
        <td>इकोनॉमी</td>
        <td>{test?.economy_rate}</td>
        <td>{oneDay?.economy_rate}</td>
        <td>{tTwenty?.economy_rate}</td>
      </tr>
      <tr>
        <td>स्ट्राइक रेट</td>
        <td>{test?.strike_rate}</td>
        <td>{oneDay?.strike_rate}</td>
        <td>{tTwenty?.strike_rate}</td>
      </tr>
      <tr>
        <td>बेस्ट बॉलिंग (पारी)</td>
        <td>{test?.best_bowling}</td>
        <td>{oneDay?.best_bowling}</td>
        <td>{tTwenty?.best_bowling}</td>
      </tr>
      <tr>
        <td>4 विकेट</td>
        <td>{test?.four_wk_hauls}</td>
        <td>{oneDay?.four_wk_hauls}</td>
        <td>{tTwenty?.four_wk_hauls}</td>
      </tr>
      <tr>
        <td>5 विकेट</td>
        <td>{test?.five_wk_hauls}</td>
        <td>{oneDay?.five_wk_hauls}</td>
        <td>{tTwenty?.five_wk_hauls}</td>
      </tr>
      <tr>
        <td>10 विकेट</td>
        <td>{test?.ten_wk_hauls}</td>
        <td>{oneDay?.ten_wk_hauls}</td>
        <td>{tTwenty?.ten_wk_hauls}</td>
      </tr>
    </>
  );
};

export default CricketPlayerBowlingStats;
