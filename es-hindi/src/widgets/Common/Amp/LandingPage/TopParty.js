import { imageLoader } from "includes/article.util";

export default function TopParty({ electionData }) {

  const {
    topParty,
    top_party_gj,
    top_party_hp,
  } = electionData;

  if(Object.keys(topParty).length == 0 || topParty == [] || topParty == undefined) {
    return null;
  }
  const mainUrlParam = "/?new_framework=true";

  return (
    <>
      <div className="elec-glblhd">
        <h2>प्रमुख <span>दल</span></h2>
      </div>
      <ul className="homewidgetTopTab party_tab">
          <li className="activeme" on="tap:AMP.setState({ top_option: 1,  option: 1, options: 1 })" data-amp-bind-class="top_option == 1 ? 'activeme' : ''" role="button" tabIndex="24">HP</li>
          <li on="tap:AMP.setState({ top_option: 2,  option: 1, options: 1 })" data-amp-bind-class="top_option == 2 ? 'activeme' : ''" role="button" tabIndex="25">GJ</li>
      </ul>
      <div className="RHS-topParties activeme" data-amp-bind-class="top_option == 1 ? 'RHS-topParties activeme' : 'RHS-topParties'">
        <div className="topParties-inner">
          { Object.keys(topParty).map((data, index) => {
            return (
              <a key={data} className="partyRow" href={`/assembly-elections/himachal-pradesh/${topParty[data]?.party_abbr?.toLowerCase()}-${topParty[data]?.party_full_name?.toLowerCase().replace(/ /g, "-")}-party-detail${mainUrlParam}`}
              >
                <div className="img">
                  <amp-img
                    src={imageLoader(topParty[data].party_image, 40, 40, false, true)}
                    src={topParty[data].party_image}
                    alt={topParty[data].party_abbr}
                    title={topParty[data].party_abbr}
                    layout="fixed"
                    width="40px"
                    height="40px"
                  />
                </div>
                <div className="text">{topParty[data] && topParty[data]?.party_abbr}</div>
              </a>
            );
          })}
        </div>
      </div>
      <div className="RHS-topParties" data-amp-bind-class="top_option == 2 ? 'RHS-topParties activeme' : 'RHS-topParties'">
        <div className="topParties-inner">
          { Object.keys(top_party_gj).map((data, index) => {
            return (
              <a key={data} className="partyRow" href={`/assembly-elections/punjab/${top_party_gj[data]?.party_abbr?.toLowerCase()}-${top_party_gj[data]?.party_full_name?.toLowerCase().replace(/ /g, "-")}-party-detail${mainUrlParam}`}
              >
                <div className="img">
                  <amp-img
                    src={imageLoader(top_party_gj[data].party_image, 40, 40, false, true)}
                    src={top_party_gj[data].party_image}
                    alt={top_party_gj[data].party_abbr}
                    title={top_party_gj[data].party_abbr}
                    layout="fixed"
                    width="40px"
                    height="40px"
                  />
                </div>
                <div className="text">{top_party_gj[data] && top_party_gj[data]?.party_abbr}</div>
              </a>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .homewidgetTopTab{overflow-x: scroll; display: flex; align-items: center; margin-bottom: 11px; height: auto;padding-left: 10px; }
        .homewidgetTopTab li {white-space: nowrap; font-weight: 400; color: #464646; font-size: 18px; padding: 0; position: relative; display: flex; background: #e5e5e5 0% 0% no-repeat padding-box; border-radius: 6px; width:37px; text-align: center; height:26px; align-items: center; justify-content: center; margin-right: 9px;font-size: 13px; }
        .homewidgetTopTab li.activeme:after {content: ""; position: absolute; width: 100%; background: #e1261c; left: 0; bottom: 0; }
        .homewidgetTopTab li.activeme {background: #e1261c; color: #fff; }
        
        .RHS-topParties.activeme {display:block;}
        .RHS-topParties {
          background: #f6f6f6;
          border: 1px solid #b6b4b4;
          padding: 15px 15px 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .RHS-topParties .partyRow {
          display: flex;
          align-items: center;
          width: 40%;
          margin-bottom: 15px;
        }
        .RHS-topParties .partyRow .img {
          width: 40px;
          height: 40px;
          overflow: hidden;
          border-radius: 50%;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .RHS-topParties .partyRow .img img {
          width: 100%;
          height: 40px;
        }
        .RHS-topParties .partyRow .text {
          text-transform: uppercase;
          color: #001d42;
          font-weight: 600;
          border-bottom: 1px #0f162d solid;
        }
        .RHS-topParties {display:none;}
        .homewidgetTopTab.party_tab {
          border: 1px solid #b6b4b4;
          margin: 0;
          padding: 10px;
          border-bottom: 0;
        }
        .topParties-inner {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      `}</style>

    </>
  );
}
