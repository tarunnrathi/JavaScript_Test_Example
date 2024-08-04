import getConfig from "next/config";

export default function ElectionGraphics({ graphicsData, elecSponserData }) {
  const { publicRuntimeConfig } = getConfig();
  const mainUrlParam = publicRuntimeConfig?.siteSwitch || "";
  let sponsorDataForWidgetsGraphics = "";
  if(elecSponserData != undefined && Object.keys(elecSponserData).length !== 0) {
    sponsorDataForWidgetsGraphics = Object.values(elecSponserData);
  }

  if (graphicsData == []|| graphicsData == undefined|| graphicsData == "") {
    return null;
  }

  return (
    <>
      <div className="elec-glblhd under_border">
        <a href={`/assembly-elections/graphics/${mainUrlParam}`} target="_blank">
          <h2>ग्राफिक्स</h2>
        </a>
        { sponsorDataForWidgetsGraphics != "" && sponsorDataForWidgetsGraphics != undefined && sponsorDataForWidgetsGraphics[0] != undefined &&
        sponsorDataForWidgetsGraphics[0][0].uploaded_img_on_off == "1" &&
          <div className="add_rhs">
            <span>{sponsorDataForWidgetsGraphics[0][0].sponser_name}</span>
            <div className="add_rhs_row">
              <a href={sponsorDataForWidgetsGraphics[0][0].click_tracker_sponser}>
                <amp-img src={sponsorDataForWidgetsGraphics[0][0].desktop_img} alt={sponsorDataForWidgetsGraphics[0][0].sponser_name} title={sponsorDataForWidgetsGraphics[0][0].sponser_name} width={94} height={40} />
              </a>
              {sponsorDataForWidgetsGraphics[0][0].amp_tracker_sponser !== "" ? (
                <div style={{ height: "1px" }} dangerouslySetInnerHTML={{ __html: sponsorDataForWidgetsGraphics[0][0].amp_tracker_sponser }}></div>
              ) : ("")}
            </div>
          </div>
        }
      </div>
      <div className="election_graphics">
        {graphicsData[0].image ? (
          <amp-img
            width="519"
            height="363"
            src={graphicsData[0].image}
            title={graphicsData[0].image_caption}
            alt={graphicsData[0].image_caption}
          />
        ) : null}
        <div className="sa">
          {/* <span>{graphicsData[0].date_time || ""}</span> */}
          <h3 className="election_graphics_title">
            {graphicsData[0].headline || ""}
          </h3>
        </div>
      </div>
      <style jsx>{`
        .election_graphics {
          width: 100%;
          background: #f6f6f6 0 0 no-repeat padding-box;
          border: 1px solid #b6b4b4;
          margin-bottom:20px;
        }
        .election_graphics img {
          width: 100%;
          display: block;
        }
        .election_graphics span {
          color: #949494;
          font-size: 12px;
          padding-bottom: 5px;
          display: block;
        }
        .election_graphics_title {
          color: #282828;
          font-size: 18px;
          line-height: 22px;
          letter-spacing: -0.36px;
        }
      `}</style>
    </>
  );
}
