import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import React, { Fragment } from "react";
import { longDateConversion } from "../../../helper/global";
import LazyLoadImage from "components/Common/CustomImage";
import { STATIC_IMAGE } from "constant/global/Constant";
import AmpAnalyticsGA4Events from "./AmpAnalyticsGA4Events";

const Byline = (props) => {
  const {
    created_at,
    updated_at,
    agency,
    // author,
    // translated_by,
  } = props.bylineData || {};
  // const authorName = author.name ? author.name.replace(/_/g, "-") : null;
  let inHindi = "", inEnglish = "";
  if (agency) {
    inHindi = props.agencyFull?.hindi || "";
    inEnglish =
      props.agencyFull?.english !== ""
        ? props.agencyFull.english.toLowerCase().replace(/\s/g, "-") + "/"
        : "";
  }
  const isMobile = true;
  const count = props?.authors?.reduce((prev, next) => {
    return (prev += next[Object.keys(next)]?.length);
  }, 0);
  //console.log("bylinedata44",props.bylineData)
  const auths = props?.authorByline?.filter(
    (item) => item.nicename?.toLowerCase() !== "news18hindi"
  );
  let { authors } = props;
  if (auths?.length) {
    authors = [
      {
        auths,
      },
    ];
  }

  return (
    <>
      <div className="a_bl_s">
        <ul className="a_bln">
          {agency == "moneycontrol" ? (
            <li>
              <span>
                <a
                  href="https://www.moneycontrol.com/"
                  rel="nofollow"
                  target="_blank"
                  id="moneycontrolevent"
                >
                  <span className="money_agency">moneycontrol</span>
                </a>
              </span>
              <AmpAnalyticsGA4Events
                id="byline_agency_cp"
                event_name={"byline_agency_cp"}
                cta_name={"moneycontrol"}
                section={props?.category}
                subsection={props?.bylineData?.subsection?.length > 0 ? props?.bylineData?.subsection?.reduce((prev, next) => prev + "," + next) : ""}
                article_id={props?.bylineData?.story_id}
                type_of_article={props?.bylineData?.post_type === "text" ? "article" : ""}
                local18_district={(props?.bylineData?.ff_source === "hyperlocal" || props?.bylineData?.ff_source === "Hyperlocal") ? `local18-${props?.bylineData?.city_name}` : "No"}
                domain="https://hindi.news18.com/"
              />
            </li>
          ) : agency ? (
            <li>
              <span>
                <a id="byline_agency_cp" href={`${publicRuntimeConfig.siteUrl}agency/${inEnglish}`}>
                  {inHindi}
                </a>
              </span>
              <AmpAnalyticsGA4Events
                id="byline_agency_cp"
                event_name={"byline_agency_cp"}
                cta_name={inHindi}
                section={props?.category}
                subsection={props?.bylineData?.subsection?.length > 0 ? props?.bylineData?.subsection?.reduce((prev, next) => prev + "," + next) : ""}
                article_id={props?.bylineData?.story_id}
                type_of_article={props?.bylineData?.post_type === "text" ? "article" : ""}
                local18_district={(props?.bylineData?.ff_source === "hyperlocal" || props?.bylineData?.ff_source === "Hyperlocal") ? `local18-${props?.bylineData?.city_name}` : "No"}
                domain="https://hindi.news18.com/"
              />
              &nbsp;
              {/* <div class="artclbyeline-author-intro _web-inspector-hide-shortcut_"><span className="auth_head_img">Translated by :::</span><a href="/byline/nikhil-suryavanshi-2610.html"><span>{translated_by}</span></a> </div> */}
            </li>
          ) : (
            <li>
              <span>
                <a id="byline_agency_cp" href="https://hindi.news18.com/agency/news18hindi/">
                  News18 हिंदी
                </a>
              </span>
              <AmpAnalyticsGA4Events
                id="byline_agency_cp"
                event_name={"byline_agency_cp"}
                cta_name={"News18 हिंदी"}
                section={props?.category}
                subsection={props?.bylineData?.subsection?.length > 0 ? props?.bylineData?.subsection?.reduce((prev, next) => prev + "," + next) : ""}
                article_id={props?.bylineData?.story_id}
                type_of_article={props?.bylineData?.post_type === "text" ? "article" : ""}
                local18_district={(props?.bylineData?.ff_source === "hyperlocal" || props?.bylineData?.ff_source === "Hyperlocal") ? `local18-${props?.bylineData?.city_name}` : "No"}
                domain="https://hindi.news18.com/"
              />
            </li>
          )}
          {!props.isDistrict && (
            <>
              <li>
                <b>Last Updated : </b>
                <time dateTime={updated_at ? updated_at : created_at}>
                  {updated_at
                    ? longDateConversion(updated_at)
                    : longDateConversion(created_at)}
                </time>
              </li>
              <div
                style={{ borderBottom: "#939393 dotted 1px", margin: "7px 0" }}
              ></div>
            </>
          )}

          {authors?.map((type) => {
            const head = Object.keys(type);
            const arr = type[head];

            return arr.map((bylineAuthor, key) => {
              if (
                bylineAuthor &&
                bylineAuthor.status == 1 &&
                bylineAuthor.nicename &&
                bylineAuthor.nicename.toLowerCase() !== "news18hindi"
              ) {
                const link = `/byline/${bylineAuthor.nicename.replace(
                  "_",
                  "-"
                )}-${bylineAuthor.id}.html`;
                return (
                  <Fragment key={key}>
                    <li className="authr_mob_li">
                      <>
                        <a
                          href={link}
                          className={
                            bylineAuthor.avtar && count <= 1 ? "authr_icon" : ""
                          }
                        >
                          <LazyLoadImage
                            isAMP={true}
                            src={
                              bylineAuthor.avtar ||
                              STATIC_IMAGE.AUTH_DEFAULT_IMAGE_AMP
                            }
                            alt="Editor picture"
                            title="Editor picture"
                            width={25}
                            height={25}
                            id={
                              count <= 1
                                ? "uniqueAuthor"
                                : "newbyelineAuthordefault"
                            }
                            style={
                              bylineAuthor.avtar && count <= 1
                                ? {}
                                : {
                                  marginRight: "8px",
                                  width: "25px",
                                  height: "25px",
                                }
                            }
                            defaultImageURL={
                              STATIC_IMAGE.AUTH_DEFAULT_IMAGE_AMP
                            }
                            isByline={true}
                          />
                        </a>
                      </>
                      <div className="art-at-it">
                        <span
                          className={
                            auths.length
                              ? ""
                              : (bylineAuthor.avtar && count <= 1) || isMobile
                                ? "auth_head_img"
                                : "auth_head"
                          }
                        >
                          {auths.length
                            ? ""
                            : bylineAuthor.avtar && count <= 1 && !isMobile
                              ? head
                              : `${head} :`}
                        </span>
                        <a href={link} id={`author_byline_cp`}>
                          <span>
                            {bylineAuthor.language_name
                              ? bylineAuthor.language_name
                              : bylineAuthor.english_name}
                          </span>
                        </a>{" "}
                        <AmpAnalyticsGA4Events
                          id="author_byline_cp"
                          event_name={"author_byline_cp"}
                          cta_name={bylineAuthor.language_name
                            ? bylineAuthor.language_name
                            : bylineAuthor.english_name}
                          section={props?.category}
                          subsection={props?.bylineData?.subsection?.length > 0 ? props?.bylineData?.subsection?.reduce((prev, next) => prev + "," + next) : ""}
                          article_id={props?.bylineData?.story_id}
                          type_of_article={props?.bylineData?.post_type === "text" ? "article" : ""}
                          local18_district={(props?.bylineData?.ff_source === "hyperlocal" || props?.bylineData?.ff_source === "Hyperlocal") ? `local18-${props?.bylineData?.city_name}` : ""}
                          domain="https://hindi.news18.com/"
                        />
                        {bylineAuthor.company}
                      </div>
                    </li>
                  </Fragment>
                );
              }
            });
          })}
        </ul>
      </div>
      <style jsx global>{`
        .newbyeline-agency {
          ${props.isDistrict
          ? "display: flex; justify-content: flex-start; align-items: center; order: 1;width: 100%; border-top: none"
          : "border-top: 1px solid #cdcdcd; padding: 10px 0; border-bottom: 1px dashed #939393; order: 1; width: 100%;"}
        }

        .newbyeline-agency li {
          position: relative;
          color: #949494;
          text-transform: uppercase;
          font-size: 12px;
          ${props.isDistrict
          ? "padding: 3px 15px 3px 14px;"
          : "padding: 3px 0 3px 14px;"}
        }

        .newbyeline-agency li b {
          color: #4f4f4f;
        }

        .newbyeline-agency li a {
          color: #949494;
        }

        .newbyeline-agency li span {
          position: relative;
          padding-left: 15px;
          display: inline-block;
          margin-left: 30px;
        }

        .newbyeline-agency li span a {
          color: #e1261c;
          font-weight: bold;
        }

        .newbyeline-agency li:before,
        .newbyeline-agency li span:before {
          content: "";
          background: #858585;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          position: absolute;
          top: 8px;
          left: 0px;
        }

        .newbyeline-agency li span:before {
          top: 4px;
        }

        .newbyeline-agency {
          margin-bottom: 0;
          border-bottom: none;
        }

        .newbyeline-agency li span {
          padding-left: 0;
          margin-left: 0;
        }

        .newbyeline-agency li span:before {
          display: none;
        }
        .auth_head_img {
          display: inline-block;
          text-transform: uppercase;
          font-weight: 400;
          color: #454545;
          font-family: "Mukta";
          margin-right: 8px;
        }
      `}</style>
    </>
  );
};

export default Byline;
