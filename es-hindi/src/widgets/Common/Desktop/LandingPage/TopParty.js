import { useState } from "react";
import Image from 'next/image';
import getConfig from "next/config";

export default function TopParty({ topParty }) {
  const { publicRuntimeConfig } = getConfig();
  const mainUrlParam = publicRuntimeConfig?.siteSwitch || "";
  const jsonUrl = "https://election.nw18.com/electiondata/electionjson/assembly_election_2022/:state:/top_parties_details.json";

  const [topPartyData, setTopPartyData] = useState(Object.values(topParty) || []);
  const [changeStateColor, setChangeStateColor] = useState('uttar-pradesh');

  const fetchTopPartyData = async (e, stateSlug) => {
    try {
      const replace_state = jsonUrl.replace(/:state:/g, stateSlug);
      let topPartyResult = await fetch(replace_state);
      topPartyResult = await topPartyResult.json();
      setTopPartyData(Object.values(topPartyResult) || []);
      setChangeStateColor(stateSlug);
    } catch (error) {
      console.log(error);
    }
  };

  if (topPartyData == [] || topPartyData == undefined || topPartyData == "") {
    return null;
  }
  try {
    return (
      <>
        <div className="elec-glblhd">
          <h2>प्रमुख <span>दल</span></h2>
        </div>
        <ul className="rhs_rabing top_party_ul">
          <li className= {changeStateColor == 'uttar-pradesh' ? "tab-links active":"tab-links"} key={`state-up`}>
            <a href="#" onClick={(e) => { e.preventDefault(); fetchTopPartyData(e, 'uttar-pradesh');}} >UP</a>
          </li>
          <li className= {changeStateColor == 'punjab' ? "tab-links active":"tab-links"} key={`state-pb`}>
            <a href="#" onClick={(e) => { e.preventDefault(); fetchTopPartyData(e, 'punjab');}} >PB</a>
          </li>
          <li className= {changeStateColor == 'uttarakhand' ? "tab-links active":"tab-links"} key={`state-uk`}>
            <a href="#" onClick={(e) => { e.preventDefault(); fetchTopPartyData(e, 'uttarakhand');}} >UK</a>
          </li>
          <li className= {changeStateColor == 'goa' ? "tab-links active":"tab-links"} key={`state-ga`}>
            <a href="#" onClick={(e) => { e.preventDefault(); fetchTopPartyData(e, 'goa');}} >GA</a>
          </li>
          <li className= {changeStateColor == 'manipur' ? "tab-links active":"tab-links"} key={`state-mn`}>
            <a href="#" onClick={(e) => { e.preventDefault(); fetchTopPartyData(e, 'manipur');}} >MN</a>
          </li>
        </ul>
        <div className="RHS-topParties">
          {topPartyData.map((data, index) => {
            return (
              <a key={index} href={`/assembly-elections/${data.state_slug}/${data?.party_abbr?.toLowerCase()}-${data?.party_full_name?.toLowerCase().replace(/ /g, "-")}-party-detail${mainUrlParam}`} className="partyRow">
                <div className="img">
                  <Image
                    src= {data.party_image} //{imageLoader(data.party_image,40,40,false,true)}
                    width={40}
                    height={40}
                    alt={data.party_abbr}
                    title={data.party_abbr}
                  />
                </div>
                <div className="text">{data?.party_abbr}</div>
              </a>
            );
          })}
        </div>

        <style jsx>{`
          .elec-right {
            width: 300px;
            float: right;
          }
          .elec-glblhd {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 18px;
            color: #e1261c;
            font-weight: 500;
          }
          .elec-glblhd a {
            font-size: 18px;
            font-weight: 500;
          }

          .elec-glblhd a h2 {
            font-size: 18px;
            font-weight: 500;
          }
          .elec-glblhd a h2 span {
            margin-left: 5px;
            color: #001d42;
            position: relative;
          }

          .elec-glblhd a span:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 3px;
            background: #e1261c;
            bottom: -3px;
            left: 0;
          }
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
          }
        `}</style>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
