export default function ConstituencyResultTable({ electionData }) {

  const {
    objectStoreConstRes, storeConstRes,
    objectStoreConstRes_pb, storeConstRes_pb,
    objectStoreConstRes_uk, storeConstRes_uk,
    objectStoreConstRes_ga, storeConstRes_ga,
    objectStoreConstRes_mn, storeConstRes_mn,
  } = electionData;

  if(Object.keys(objectStoreConstRes).length == 0 || objectStoreConstRes == [] || objectStoreConstRes == undefined) {
    return null;
  }

  const redirect_url = "/assembly-elections/:state:/:cons_name:-election-result-:CONS_ID:/?new_framework=true";
  const consName = "CONS_NAME_HINDI";
  const consTitle = "विधानसभा सीट";
  const winnerNode = "WINNER_:year:_PARTY_COLOR";
  const partyName = "WINNER_";
  const tempKeys = Object.keys(storeConstRes);
  const tempKeys_pb = Object.keys(storeConstRes_pb);
  const tempKeys_uk = Object.keys(storeConstRes_uk);
  const tempKeys_ga = Object.keys(storeConstRes_ga);
  const tempKeys_mn = Object.keys(storeConstRes_mn);

  return (
    <div className="constOuter">
      <div className="elec-glblhd">
        <h2>विधानसभाः<span>सीटवार नतीजे</span></h2>
      </div>

      <ul className="homewidgetConstTab">
        <li className="activeme" on="tap:AMP.setState({ options: 1, top_option: 1,  option: 1 })" data-amp-bind-class="options == 1 ? 'activeme' : ''" role="button" tabIndex="24">UP</li>
        <li on="tap:AMP.setState({ options: 2, top_option: 1,  option: 1 })" data-amp-bind-class="options == 2 ? 'activeme' : ''" role="button" tabIndex="25">PB</li>
        <li on="tap:AMP.setState({ options: 3, top_option: 1,  option: 1 })" data-amp-bind-class="options == 3 ? 'activeme' : ''" role="button" tabIndex="26">UK</li>
        <li on="tap:AMP.setState({ options: 4, top_option: 1,  option: 1 })" data-amp-bind-class="options == 4 ? 'activeme' : ''" role="button" tabIndex="27">GA</li>
        <li on="tap:AMP.setState({ options: 5, top_option: 1,  option: 1 })" data-amp-bind-class="options == 5 ? 'activeme' : ''" role="button" tabIndex="28">MN</li>
      </ul>

      <div className="brcountday-tallymap-const activeme" data-amp-bind-class="options == 1 ? 'brcountday-tallymap-const activeme' : 'brcountday-tallymap-const'">
        <div className="tableWrap">
          <table cellSpacing="0" cellPadding="0">
            <tr>
              <th>{consTitle}</th>
              <th>2017</th>
              <th>2012</th>
            </tr>
            { objectStoreConstRes.map((object_data, index) => {
              return (
                object_data && (
                  <tr key={`${index}table`}>
                    <td>
                      <a href={redirect_url.replace(":state:", 'uttar-pradesh').replace(":cons_name:", object_data.CONS_NAME.replace(" ", "-").toLowerCase()).replace(':CONS_ID:', tempKeys[index])}>
                        <h3>{object_data[consName]}</h3>
                      </a>
                    </td>
                    {[2017, 2012].map((year, index) => {
                      return (
                        <td style={{ background: object_data[winnerNode.replace(":year:", year)], color: "#fff" }}>
                          {object_data[partyName+year]}
                        </td>
                      );
                    })}
                  </tr>
                )
              );
            })}
          </table>
        </div>
      </div>
      <div className="brcountday-tallymap-const" data-amp-bind-class="options == 2 ? 'brcountday-tallymap-const activeme' : 'brcountday-tallymap-const'">
        <div className="tableWrap">
          <table cellSpacing="0" cellPadding="0">
            <tr>
              <th>{consTitle}</th>
              <th>2017</th>
              <th>2012</th>
            </tr>
            { objectStoreConstRes_pb.map((object_data, index) => {
              return (
                object_data && (
                  <tr key={`${index}table`}>
                    <td>
                      <a href={redirect_url.replace(":state:", 'punjab').replace(":cons_name:", object_data.CONS_NAME.replace(" ", "-").toLowerCase()).replace(':CONS_ID:', tempKeys_pb[index])}>
                        <h3>{object_data[consName]}</h3>
                      </a>
                    </td>
                    {[2017, 2012].map((year, index) => {
                      return (
                        <td style={{ background: object_data[winnerNode.replace(":year:", year)], color: "#fff" }}>
                          {object_data[partyName+year]}
                        </td>
                      );
                    })}
                  </tr>
                )
              );
            })}
          </table>
        </div>
      </div>
      <div className="brcountday-tallymap-const" data-amp-bind-class="options == 3 ? 'brcountday-tallymap-const activeme' : 'brcountday-tallymap-const'">
        <div className="tableWrap">
          <table cellSpacing="0" cellPadding="0">
            <tr>
              <th>{consTitle}</th>
              <th>2017</th>
              <th>2012</th>
            </tr>
            { objectStoreConstRes_uk.map((object_data, index) => {
              return (
                object_data && (
                  <tr key={`${index}table`}>
                    <td>
                      <a href={redirect_url.replace(":state:", 'uttarakhand').replace(":cons_name:", object_data.CONS_NAME.replace(" ", "-").toLowerCase()).replace(':CONS_ID:', tempKeys_uk[index])}>
                        <h3>{object_data[consName]}</h3>
                      </a>
                    </td>
                    {[2017, 2012].map((year, index) => {
                      return (
                        <td style={{ background: object_data[winnerNode.replace(":year:", year)], color: "#fff" }}>
                          {object_data[partyName+year]}
                        </td>
                      );
                    })}
                  </tr>
                )
              );
            })}
          </table>
        </div>
      </div>
      <div className="brcountday-tallymap-const" data-amp-bind-class="options == 4 ? 'brcountday-tallymap-const activeme' : 'brcountday-tallymap-const'">
        <div className="tableWrap">
          <table cellSpacing="0" cellPadding="0">
            <tr>
              <th>{consTitle}</th>
              <th>2017</th>
              <th>2012</th>
            </tr>
            { objectStoreConstRes_ga.map((object_data, index) => {
              return (
                object_data && (
                  <tr key={`${index}table`}>
                    <td>
                      <a href={redirect_url.replace(":state:", 'goa').replace(":cons_name:", object_data.CONS_NAME.replace(" ", "-").toLowerCase()).replace(':CONS_ID:', tempKeys_ga[index])}>
                        <h3>{object_data[consName]}</h3>
                      </a>
                    </td>
                    {[2017, 2012].map((year, index) => {
                      return (
                        <td style={{ background: object_data[winnerNode.replace(":year:", year)], color: "#fff" }}>
                          {object_data[partyName+year]}
                        </td>
                      );
                    })}
                  </tr>
                )
              );
            })}
          </table>
        </div>
      </div>
      <div className="brcountday-tallymap-const" data-amp-bind-class="options == 5 ? 'brcountday-tallymap-const activeme' : 'brcountday-tallymap-const'">
        <div className="tableWrap">
          <table cellSpacing="0" cellPadding="0">
            <tr>
              <th>{consTitle}</th>
              <th>2017</th>
              <th>2012</th>
            </tr>
            { objectStoreConstRes_mn.map((object_data, index) => {
              return (
                object_data && (
                  <tr key={`${index}table`}>
                    <td>
                      <a href={redirect_url.replace(":state:", 'manipur').replace(":cons_name:", object_data.CONS_NAME.replace(" ", "-").toLowerCase()).replace(':CONS_ID:', tempKeys_mn[index])}>
                        <h3>{object_data[consName]}</h3>
                      </a>
                    </td>
                    {[2017, 2012].map((year, index) => {
                      return (
                        <td style={{ background: object_data[winnerNode.replace(":year:", year)], color: "#fff" }}>
                          {object_data[partyName+year]}
                        </td>
                      );
                    })}
                  </tr>
                )
              );
            })}
          </table>
        </div>
      </div>
      <style jsx global>{`
        .homewidgetConstTab{overflow-x: scroll; display: flex; align-items: center; margin-bottom: 11px; height: auto;padding-left: 10px; }
        .homewidgetConstTab li {white-space: nowrap; font-weight: 400; color: #464646; font-size: 18px; padding: 0; position: relative; display: flex; background: #e5e5e5 0% 0% no-repeat padding-box; border-radius: 6px; width:37px; text-align: center; height:26px; align-items: center; justify-content: center; margin-right: 9px;font-size: 13px; }
        .homewidgetConstTab li.activeme:after {content: ""; position: absolute; width: 100%; background: #e1261c; left: 0; bottom: 0; }
        .homewidgetConstTab li.activeme {background: #e1261c; color: #fff; }
        .brcountday-tallymap-const {display:none;}
        .brcountday-tallymap-const.activeme {display:block;}

        .constOuter {
          background: #f6f6f6;
          padding: 6px 0 0;
          margin-bottom: 30px;
        }
        .constOuter .elec-glblhd {
          padding: 2px 10px 0;
        }
        .tableWrap {
          max-height: 400px;
          overflow: auto;
        }
        .tableWrap table {
          width: 100%;
          border-collapse: collapse;
        }
        .tableWrap table td,
        .tableWrap table th {
          border: 1px solid #d7d7d7;
          padding: 10px 6px;
          text-align: center;
        }
        .tableWrap table td {
          text-transform: uppercase;
          font-size: 13px;
          max-width: 70px;
        }
        .tableWrap table td:first-child {
          text-transform: initial;
        }
        .tableWrap table td a {
          color: #fff;
        }
        .tableWrap table td:first-child a {
          color: #464646;
        }
        .tableWrap table th {
          background: #001d42;
          position: sticky;
          left: 0;
          top: 0;
          padding: 10px 8px;
          font-size: 11px;
          border-top: 4px transparent;
          text-transform: uppercase;
          color: #fff;
          font-weight: 700;
          text-align: center;
        }
        .tableWrap table td:nth-child(1),
        .tableWrap table th:nth-child(1) {
          width: 100px;
          text-align: left;
        }
        .jh_filterddown {
          margin-bottom: 5px;
          padding: 0 10px;
        }
        .multi-select-container {
          position: relative;
          display: block;
        }
        .multi-select-menu {
          position: absolute;
          left: 0;
          top: 104%;
          z-index: 1;
          float: left;
          min-width: 100%;
          background: #fff;
          border: 1px solid #cacaca;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          display: none;
        }
        .multi-select-button {
          text-transform: capitalize;
          display: block;
          padding: 8px 10px;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: -0.5em;
          background-color: #fff;
          border: 1px solid #cacaca;
          cursor: default;
          box-sizing: border-box;
          font-size: 14px;
          outline: 0;
        }
        .multi-select-button:after {
          content: "";
          width: 10px;
          height: 16px;
          position: absolute;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/state-2021-election/dropdown_icon.png);
          top: 10px;
          right: 7px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
