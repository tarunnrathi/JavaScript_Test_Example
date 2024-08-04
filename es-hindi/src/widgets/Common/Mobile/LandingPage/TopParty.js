import { useState } from "react";
import Image from "next/image";

import getConfig from "next/config";

export default function TopParty({ topParty }) {
  const { publicRuntimeConfig } = getConfig();
  const mainUrlParam = publicRuntimeConfig?.siteSwitch || "";
  const jsonUrl =
    "https://election.nw18.com/electiondata/electionjson/assembly_election_dec_2022/:state:/top_parties_details.json";

  const [topPartyData, setTopPartyData] = useState(
    Object.values(topParty) || []
  );
  const [changeStateColor, setChangeStateColor] = useState("himachal-pradesh");

  const fetchTopPartyData = async (e, stateSlug) => {
    try {
      const replace_state = jsonUrl.replace(/:state:/g, stateSlug);
      let topPartyResult = await fetch(replace_state);
      topPartyResult = await topPartyResult.json();
      setTopPartyData(Object.values(topPartyResult?.data) || []);
      setChangeStateColor(stateSlug);
    } catch (error) {
      console.log(error);
    }
  };

  if (!topPartyData) {
    return null;
  }
  try {
    return (
      <>
        <div className="elec-glblhd">
          <h2>{"प्रमुख दल"}</h2>
        </div>
        <ul className="rhs_rabing top_party_ul">
          <li
            className={
              changeStateColor == "himachal-pradesh"
                ? "tab-links active"
                : "tab-links"
            }
            key={`state-hp`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                fetchTopPartyData(e, "himachal-pradesh");
              }}
            >
              HP
            </a>
          </li>
          <li
            className={
              changeStateColor === "gujarat" ? "tab-links active" : "tab-links"
            }
            key={`state-gj`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                fetchTopPartyData(e, "gujarat");
              }}
            >
              GJ
            </a>
          </li>
        </ul>
        <div className="RHS-topParties">
          {topPartyData.map((data, index) => {
            return (
              <a
                key={index}
                href={`/assembly-elections/${
                  data.state_slug
                }/${data?.party_abbr?.toLowerCase()}-${data?.party_full_name
                  ?.toLowerCase()
                  .replace(/ /g, "-")}-party-detail${mainUrlParam}`}
                className="partyRow"
              >
                <div className="img">
                  <Image
                    src={data.party_image} // {imageLoader(data.party_image,40,40,false,true)}
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
          .elec-glblhd {
            margin-bottom: 4px;
            font-size: 17px;
            color: #e1261c;
            font-weight: 600;
            position: relative;
          }
          .elec-glblhd,
          .elec-glblhd a h2 {
            color: #e1261c;
            text-transform: uppercase;
            align-items: center;
            font-size: 17px;
          }
          .elec-glblhd span,
          .elec-glblhd a span {
            color: #001d42;
            position: relative;
          }
          .RHS-topParties {
            background: #f6f6f6;
            border: 1px solid #b6b4b4;
            padding: 15px 15px 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-bottom: 30px;
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
