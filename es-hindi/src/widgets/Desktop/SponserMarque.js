import { Fragment } from "react";

export default function SponserMarque({
  sponserData = {},
  showFullBanner = false,
}) {
  const labelArray = {
    "co-powered-by": {
      label: "Co-Powered",
      parentClass: "associat_partner4",
      bannerBoxClass: "bannerBox3",
      noMarqueLength: 2,
    },
    "associate-partner": {
      label: "ASSOCIATE PARTNER",
      parentClass: `associat_partner3 ${
        showFullBanner ? " max_width_banner" : ""
      }`,
      bannerBoxClass: "bannerBox3",
      noMarqueLength: showFullBanner ? 5 : 2,
    },
    "co-presenting": {
      label: "co-presenting",
      parentClass: "associat_partner1",
      bannerBoxClass: "bannerBox2",
      noMarqueLength: 1,
    },
    "presenting-partner": {
      label: "PRESENTING PARTNER",
      parentClass: "associat_partner4",
      bannerBoxClass: "bannerBox1",
      noMarqueLength: 3,
    },
    "co PARTNER": {
      label: "co PARTNER",
      parentClass: "associat_partner2",
      bannerBoxClass: "bannerBox3",
      noMarqueLength: 1,
    },
    "lifestyle-partner": {
      label: "LIFESTYLE PARTNER",
      parentClass: "associat_partner5",
      bannerBoxClass: "bannerBox3",
      noMarqueLength: 1,
    },
    "technology-partner": {
      label: "TECHNOLOGY PARTNER",
      parentClass: "associat_partner5",
      bannerBoxClass: "bannerBox3",
      noMarqueLength: 1,
    },
    "presented-by": {
      label: "PRESENTING PARTNER",
      parentClass: "associat_partner4",
      bannerBoxClass: "bannerBox1",
      noMarqueLength: 1,
    },
    partner: {
      label: "PARTNER",
      parentClass: "associat_partner5",
      bannerBoxClass: "bannerBox3",
      noMarqueLength: 1,
    },
    "car-insurance-partner": {
      label: "CAR INSURANCE PARTNER",
      parentClass: `associat_partner3 ${
        showFullBanner ? " max_width_banner" : ""
      }`,
      bannerBoxClass: "bannerBox3",
      noMarqueLength: showFullBanner ? 5 : 2,
    },
    "co-partner": {
      label: "CO-POWERED",
      parentClass: "associat_partner2",
      bannerBoxClass: "bannerBox3",
      noMarqueLength: 1,
    },
    "destination-partner": {
      label: "Destination Partner",
      parentClass: "associat_partner2",
      bannerBoxClass: "bannerBox3",
      noMarqueLength: 1,
    },
    presents: {
      label: "PRESENTS",
      parentClass: "associat_partner2",
      bannerBoxClass: "bannerBox3",
      noMarqueLength: 1,
    },
    "tyre-partner":{
      label: "TYRE PARTNER",
      parentClass: "associat_partner2",
      bannerBoxClass: "bannerBox3",
      noMarqueLength: 1,
    },
  };
  const commonContent = (bannerBoxClass, sponsKey) => {
    return (
      <ul className="logowrap" key={`common-content-${sponsKey}`}>
        {(sponserData[sponsKey] || []).map((sponser, index) => (
          <li key={"logowrap" + index} style={{ color: "white" }}>
            <div id={bannerBoxClass}>
              <div
                className="heightZero"
                dangerouslySetInnerHTML={{
                  __html: sponser.impression_tracker_logo,
                }}
              />
              <a
                href={sponser.click_tracker_logo}
                target="_blank"
                rel="nofollow"
              >
                <img src={sponser?.uploaded_img_path} alt={"text"} title="" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="sponsors_Wrp elec">
        <div className="elecwrap">
          {Object.keys(sponserData).length !== 0 &&
            Object.keys(sponserData).map((sponsKey, index) => {
              if (labelArray?.[sponsKey] && sponserData[sponsKey].length) {
                const { label, bannerBoxClass, parentClass, noMarqueLength } =
                  labelArray?.[sponsKey] || {};
                if (sponsKey !== "presents") {
                  return (
                    <div
                      key={`non-presents-${sponsKey}-${index}`}
                      className={`associat_partner ${parentClass}`}
                    >
                      <h3 className="heading" style={{padding: "2px 0"}}>
                        <span>{label}</span>
                      </h3>
                      {sponserData[sponsKey].length > noMarqueLength ? (
                        <marquee scrollamount={5}>
                          {commonContent(bannerBoxClass, sponsKey)}
                        </marquee>
                      ) : (
                        <div>{commonContent(bannerBoxClass, sponsKey)}</div>
                      )}
                    </div>
                  );
                } else {
                  // for presents
                  return (
                    <Fragment key={`presents-${sponsKey}-${index}`}>
                      <div className={`associat_partner ${parentClass} presnt`}>
                        {sponserData[sponsKey].length > noMarqueLength ? (
                          <marquee scrollamount={5}>
                            {commonContent(bannerBoxClass, sponsKey)}
                          </marquee>
                        ) : (
                          <div>{commonContent(bannerBoxClass, sponsKey)}</div>
                        )}
                      </div>
                      <h3 className="presn heading">
                        <span>{label}</span>
                      </h3>
                      <a href="/elections/">
                        <img
                          style={{ height: "45px", marginTop: "4px" }}
                          src="https://images.news18.com/dlxczavtqcctuei/news18/static/images/english/election_logo_115x55.svg"
                          width="105px"
                          height="45px"
                          alt="sponser-logo"
                        ></img>
                      </a>
                    </Fragment>
                  );
                }
              }
            })}
        </div>
      </div>
      <style jsx global>
        {`
          .spons {
            background: #f7f7f7 0% 0% no-repeat padding-box;
            border: 1px solid #e2e2e2;
            border-radius: 4px;
            padding: 10px 15px;
            text-align: center;
            width: 724px;
          }
          .logowrap {
            display: flex;
            justify-content: space-between;
          }
          .max_width_banner {
            max-width: 100% !important;
          }
          .logowrap li:last-child {
            border: 0;
            padding: 0;
          }
          .logowrap li {
            border-right: 1px solid #d5d5d5;
          }
          // .logowrap li img {
          //   width: 85px;
          // }
          .sponsors_Wrp.elec {
            padding: 2px 0;
            margin: 0;
          }
          .sponsors_Wrp .elecwrap .heading {
            font-size: 9px;
            color: #727272;
            font-weight: bold;
            position: relative;
            //width: 100%;
            margin-bottom: 2px;
            text-align: left;
            margin-left: 0;
            padding: 0;
            border: 0;
          }
          .sponsors_Wrp .elecwrap {
            background-color: #f5f5f5;
            display: flex;
            justify-content: flex-end;
            padding: 2px 10px 3px;
            border: 1px solid #000;
            align-items: center;
          }
          .sponsors_Wrp .elecwrap .heading:after {
            content: "";
            display: none;
          }
          .sponsors_Wrp .elecwrap #bannerBox3 {
            display: block;
          }

          .presnt {
            margin-right: 0px;
            display: flex;
            align-items: flex-end;
            margin-left: 0;
            padding-right: 10px;
            padding-left: 0;
            border: 0;
          }
          .presn.heading {
            writing-mode: vertical-rl;
            text-orientation: mixed;
            margin: 0 7px 0 5px;
            transform: rotate(180deg);
          }

          .sponsors_Wrp.elec .associat_partner {
            padding: 0 10px;
            border-left: 1px solid#b9b2b2ab;
            margin-left: 10px;
          }
          .sponsors_Wrp.elec .associat_partner:first-child {
            border: 0;
            margin: -8px 0 0;
            padding: 0 4px 0 0;
          }
        `}
      </style>
    </>
  );
}
