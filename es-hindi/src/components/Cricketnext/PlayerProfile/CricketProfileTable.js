import React from "react";
import { PlayerProfileTabs } from "components/Cricketnext/CricketNextUtils";
import CricketPlayerBattingStats from "./CricketPlayerBattingStats";
import CricketPlayerBowlingStats from "./CricketPlayerBowlingStats";

const CricketProfileTable = ({
  currentTab,
  tableHeaders,
  tableBodyContent,
  isPlayerPersonalInfo = false,
}) => {
  const rankings = tableBodyContent?.statsData;
  return (
    <>
      <table className="CN-profileTable">
        <thead>
          <tr className={isPlayerPersonalInfo ? "personalInfo" : ""}>
            {tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className={isPlayerPersonalInfo ? "personalInfoBody" : ""}>
          {currentTab === PlayerProfileTabs.PLAYER_INFO &&
            (isPlayerPersonalInfo ? (
              <>
                <tr>
                  <td>जन्म</td>
                  <td>{tableBodyContent?.dob}</td>
                </tr>
                <tr>
                  <td>जन्म स्थान</td>
                  <td>{tableBodyContent?.place_birth}</td>
                </tr>
                <tr>
                  <td>मौजूदा उम्र</td>
                  <td>{tableBodyContent?.currentAge}</td>
                </tr>
                <tr>
                  <td>भूमिका</td>
                  <td>{tableBodyContent?.player_skill}</td>
                </tr>
                <tr>
                  <td>बैटिंग स्टाइल </td>
                  <td>{tableBodyContent?.batting_style}</td>
                </tr>
                <tr>
                  <td>बॉलिंग स्टाइल</td>
                  <td>{tableBodyContent?.bowling_style}</td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>बैटिंग</td>
                  <td>{rankings?.ODI?.ranking?.bat}</td>
                  <td>{rankings?.Test?.ranking?.bat}</td>
                  <td>{rankings?.T20I?.ranking?.bat}</td>
                </tr>
                <tr>
                  <td>बॉलिंग</td>
                  <td>{rankings?.ODI?.ranking?.bowl}</td>
                  <td>{rankings?.Test?.ranking?.bowl}</td>
                  <td>{rankings?.T20I?.ranking?.bowl}</td>
                </tr>
                <tr>
                  <td>ऑलराउंडर</td>
                  <td>{rankings?.ODI?.ranking?.allrounder}</td>
                  <td>{rankings?.Test?.ranking?.allrounder}</td>
                  <td>{rankings?.T20I?.ranking?.allrounder}</td>
                </tr>
              </>
            ))}
          {currentTab === PlayerProfileTabs.BATTING && (
            <CricketPlayerBattingStats
              playerBattingStats={tableBodyContent?.statsData}
            />
          )}
          {currentTab === PlayerProfileTabs.BOWLING && (
            <CricketPlayerBowlingStats
              playerBowlingStats={tableBodyContent?.statsData}
            />
          )}
        </tbody>
      </table>
    </>
  );
};

export default CricketProfileTable;
