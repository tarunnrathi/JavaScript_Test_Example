import { imageLoader } from "includes/article.util";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const ElectionGraphicsComponent = ({ electionGraphicsData, elecSponserData }) => {

  const mainUrlParam = publicRuntimeConfig?.siteSwitch || "";
  let sponsorDataForWidgetsGraphics = "";
  if(elecSponserData != undefined && Object.keys(elecSponserData).length !== 0) {
    sponsorDataForWidgetsGraphics = Object.values(elecSponserData);
  }
  if (electionGraphicsData == []|| electionGraphicsData == undefined||electionGraphicsData == "") {
    return null;
  }

  console.log("electionGraphicsData: ", electionGraphicsData);

  return (
    <>
      <div className="elec-glblhd-highlight under_border">
        <div>
          <a href={`/assembly-elections/graphics${mainUrlParam}`} target="_blank">
            <h2>ग्राफिक्स</h2>
          </a>
        </div>
        { sponsorDataForWidgetsGraphics != "" && sponsorDataForWidgetsGraphics != undefined && sponsorDataForWidgetsGraphics[0] != undefined &&
        sponsorDataForWidgetsGraphics[0][0].uploaded_img_on_off == "1" &&
          <div className="add_rhs">
            <span>{sponsorDataForWidgetsGraphics[0][0].sponser_name}</span>
            <div className="add_rhs_row">
              <a href={sponsorDataForWidgetsGraphics[0][0].click_tracker_sponser}>
                <img src={sponsorDataForWidgetsGraphics[0][0].desktop_img} alt={sponsorDataForWidgetsGraphics[0][0].sponser_name} title={sponsorDataForWidgetsGraphics[0][0].sponser_name} />
              </a>
              {sponsorDataForWidgetsGraphics[0][0].impression_tracker_sponser !== "" ? (
                <div dangerouslySetInnerHTML={{ __html: sponsorDataForWidgetsGraphics[0][0].impression_tracker_sponser }}></div>
              ) : ("")}
            </div>
          </div>
        }
      </div>
      <div className="election_graphics">
        <a href={`/assembly-elections/graphics${mainUrlParam}`} target="_blank">
          <figure>
            {electionGraphicsData[0].image ? (
              // <Image
              //   src={ imageLoader(electionGraphicsData[0]?.image || '', 298, 400, true, true) }
              //   title={electionGraphicsData[0]?.image_caption || ""}
              //   width={298}
              //   height={400}
              //   alt={electionGraphicsData[0].headline || ""}
              // />
              <img
                src={ imageLoader(electionGraphicsData[0]?.image || '', 298, 400, true, true) }
                title={electionGraphicsData[0]?.image_caption || ""}
                alt={electionGraphicsData[0].headline || ""}
              />
              ): null }
            <figcaption>
              {/* { electionGraphicsData[0]?.date_time ? (
                <span>{moment(electionGraphicsData[0].date_time).format("MMMM DD,YYYY")}</span>
              ) :null} */}
              { electionGraphicsData[0].headline ? (
                <h3 className="election_graphics_title">
                  {electionGraphicsData[0].headline || ""}
                </h3>
              ) : null}
            </figcaption>
          </figure>
        </a>
      </div>
      <style jsx>{`
        .elec-glblhd-highlight {
          display: flex;
          margin-bottom: 10px;
          font-size: 18px;
          color: #e1261c;
          font-weight: 500;
        }
        .elec-glblhd-highlight a {
          display: flex;
          color: #e1261c;
          text-transform: uppercase;
          align-items: center;
          font-size: 13px;
          font-weight: 500;
        }
        .elec-glblhd-highlight a span {
          margin-left: 5px;
          color: #001d42;
          position: relative;
        }
        .elec-glblhd-highlight a span:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          background: #e1261c;
          bottom: -3px;
          left: 0;
        }
        .election_graphics {
          width: 100%;
          background: #f6f6f6 0% 0% no-repeat padding-box;
          border: 1px solid #b6b4b4;
          margin-bottom: 20px;
        }
        .election_graphics img {
          width: 100%;
          display: block;
        }
        .election_graphics figcaption {
          padding: 10px;
        }
        .election_graphics span {
          color: #949494;
          font-size: 12px;
          padding-bottom: 5px;
          display: block;
        }
        .election_graphics_title {
          color: #282828;
          font-size: 15px;
        }
      `}</style>
    </>
  );
};
export default ElectionGraphicsComponent;
