import React from "react";
import { setDefaultImage } from "includes/article.util";
import { specificationURL } from "includes/brand.helper";
import { imgURL } from "api/Constant";

export default function HomePageListing(props) {
  function numberWithCommas(x) {
    return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div>
      {props?.GlideId && (
        <div className={`${props.GlideId} psrlhdn`}>
          <div data-glide-el="track">
            <ul className="dflx">
              {props.data &&
                props.data.map((mobile, index) => {
                  const { operating_system } = (mobile.general_specs_91?.length && JSON.parse(
                    mobile.general_specs_91[0]
                  )) || {};
                  const { release_date } = mobile || {};
                  const newReleaseDate = release_date ? ("" + release_date) : "";

                  const {
                    title,
                    price,
                    internal_storage_display,
                    volte,
                    no_of_sim_cards,
                    finger_print_sensor,
                    fm_radio,
                  } = mobile || {};

                  const year = newReleaseDate && newReleaseDate.slice(0, 4);
                  const month = newReleaseDate && newReleaseDate.slice(5, 7);
                  const date = newReleaseDate && newReleaseDate.slice(8, 10);
                  return (
                    <li key={index}>
                      <a href={`${specificationURL}/${title
                        .replace(/ /g, "-")
                        .toLowerCase()}-${mobile?.id}/`}>
                        <div className={(props?.GlideId === 'phnupcmngsld') ? 'upcomingMobiles' : "glblphnbx"}>
                          <h2>{title}</h2>
                          <div className="andrd">
                            <em className="dimsprite andrdicn"></em>
                            {operating_system}
                          </div>
                          <figure>
                            <img
                              src={
                                imgURL ||
                                "https://www.forbes.com/uk/advisor/wp-content/uploads/2020/11/phones-switch-apps.jpg"
                              }
                              loading="lazy"
                              onError={setDefaultImage}
                            />
                          </figure>
                          <div className="phnprc">
                            {" "}
                            ₹ {numberWithCommas(price)}
                          </div>
                          {props?.upcomingMobiles && (
                            <>
                              <div className="phnexpctd">(Expected)</div>
                              <div className="rlgdtorng">
                                जारी करने की तारीख:
                                <span>{newReleaseDate ? (date + "-" + month + "-" + year) : 'NA'}</span>
                              </div>
                            </>
                          )}
                          <div className="glblphnicn">
                            <span className={!internal_storage_display ? "icon_deactive" : ""} >
                              <em className={internal_storage_display ? "dimsprite icnram" : "dimsprite icnram light"}></em>
                              <b>{internal_storage_display || "NA"}</b>
                            </span>
                            <span className={!volte ? "icon_deactive dsbld" : "dsbld"} >
                              <em
                                className={
                                  volte
                                    ? "dimsprite icnvolt"
                                    : "dimsprite icnvolt light"
                                }
                              ></em>
                            </span>
                            <span className={no_of_sim_cards !== 2 ? "icon_deactive" : ""}>
                              <em
                                className={
                                  no_of_sim_cards === 2
                                    ? "dimsprite icnsim"
                                    : "dimsprite icnsim light"
                                }
                              ></em>
                            </span>
                            <span className={!finger_print_sensor ? "icon_deactive" : ""}>
                              <em
                                className={
                                  finger_print_sensor
                                    ? "dimsprite icnfngrprt"
                                    : "dimsprite icnfngrprt light"
                                }
                              ></em>
                            </span>
                            <span className={!fm_radio ? "icon_deactive" : ""}>
                              <em
                                className={
                                  fm_radio
                                    ? "dimsprite icnfmrd"
                                    : "dimsprite icnfmrd light"
                                }
                              ></em>
                            </span>
                          </div>
                          <a
                            href={`${specificationURL}/${title
                              .replace(/ /g, "-")
                              .toLowerCase()}-${mobile?.id}/`}
                          >
                            <span>रीड मोर</span>
                          </a>
                        </div>
                      </a>

                    </li>
                  );
                })}
            </ul>
          </div>
          <div data-glide-el="controls[nav]" className="phnlgblts dflx jstcntr">
            <button data-glide-dir="=0"></button>
            <button data-glide-dir="=1"></button>
            <button data-glide-dir="=2"></button>
            <button data-glide-dir="=3"></button>
          </div>
        </div>
      )}
    </div>
  );
}
