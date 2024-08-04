import { useState } from "react";
import { getNumberFormatter } from "util/global/Helper";

const TableDesktop = ({ id, data, teamsData }) => {
  const first10 = data.slice(0, 10);
  const moreResults = data.slice(11, data.length);
  const [loadMore, setLoadMore] = useState(false);
  const handleLoadMore = () => {
    setLoadMore(loadMore ? false : true);
  };


  return (
    <div className={`result_table_info squad_table ${id}`}>
      <table id={id}>
        <tbody>
          <tr style={{background: teamsData?.colour}}>
            <th>टीम 2024 {id}</th>
            <th>(टीम में भूमिका)</th>
            <th>कीमत (करोड़ रुपए) </th>
            <th>कीमत $(000) </th>
            <th>टीम 2023</th>
          </tr>
          {first10?.length > 0 && first10.map((playerName, i) => (
            <tr key={i}>
              <td style={{textAlign: 'left'}}>{playerName.playername}</td>
              <td style={{textAlign: 'left'}}>{playerName.type}</td>
              <td style={{textAlign: 'right'}}>
                <strong>{id === 'unsold' ? getNumberFormatter(playerName.basepriceinr) : playerName.costinrcr}</strong>
              </td>
              <td style={{textAlign: 'right'}}>
                <strong>{id === 'unsold' ? getNumberFormatter(playerName.basepriceusd) : getNumberFormatter(playerName.costusdth)}</strong>
              </td>
              <td style={{textAlign: 'left'}}>{playerName.ipl2024team}</td>
            </tr>
          ))}
          {loadMore && moreResults?.length > 0 && moreResults.map((playerName, i) => (
            <tr key={i}>
              <td style={{textAlign: 'left'}}>{playerName.playername}</td>
              <td style={{textAlign: 'left'}}>{playerName.type}</td>
              <td style={{textAlign: 'right'}}>
                <strong>{id === 'unsold' ? getNumberFormatter(playerName.basepriceinr) : playerName.costinrcr}</strong>
              </td>
              <td style={{textAlign: 'right'}}>
                <strong>{id === 'unsold' ? getNumberFormatter(playerName.basepriceusd) : getNumberFormatter(playerName.costusdth)}</strong>
              </td>
              <td style={{textAlign: 'left'}}>{playerName.ipl2024team}</td>
            </tr>
          ))}
        </tbody>
      </table>
          <a
            onClick={() => handleLoadMore()}
            className="show_more show_more_unsold"
          >{`${
            loadMore === false
              ? "+ अन्य खिलाड़ी भी दिखाएं:"
              : "- सीमित खिलाड़ी दिखाएं:"
          }`}</a>
    </div>
  );
  };
  
  export default TableDesktop;
  