import React, { useEffect } from 'react';
import Glide from "@glidejs/glide";

const BudgetSectorialSponsorSlider = ({ sponsor = {}, sliderId = 'sliderId', isMobile = false, runScripts = false }) => {
  const sponsorData = Object.keys(sponsor);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!runScripts && sponsorData && sponsorData.length !== 0) {
        new Glide(document.querySelector(`#${sliderId}`), {
          autoplay: 3000,
          type: "carousel",
          perView: 1,
          gap: 0,
          slidesToScroll: 1,
        }).mount();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (sponsorData && sponsorData.length !== 0) {
    return (
      <div className="report_slide">
        <div className="report_logo_slidein" id={sliderId}>
          <div data-glide-el="track">
            <div className="report_logo_row">
              {
                sponsorData.map((item) => {
                  return (
                    sponsor[item] && sponsor[item].map((sponsorPartner, key) => {
                      return (
                        <>
                          {Boolean(sponsorPartner?.uploaded_img_on_off) && (
                            runScripts ? (
                              sponsorPartner.impression_tracker_sponser != '' ? <div dangerouslySetInnerHTML={{ __html: sponsorPartner.impression_tracker_sponser }}></div> : ''
                            ) : (
                              <a href={sponsorPartner.click_tracker_sponser} target="_blank" className="report_logo" key={key + sliderId}>
                                <img src={isMobile ? sponsorPartner.mobile_img : sponsorPartner.desktop_img}
                                  width={80}
                                  height={35}
                                  alt={sponsorPartner?.sponser_name}
                                  title={sponsorPartner?.sponser_name}
                                />
                              </a>
                            )
                          )}
                        </>
                      );
                    })
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return '';
  }

};

export default BudgetSectorialSponsorSlider;
