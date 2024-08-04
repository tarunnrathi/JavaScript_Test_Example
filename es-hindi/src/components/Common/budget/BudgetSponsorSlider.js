import React, { useEffect } from 'react';
import Glide from "@glidejs/glide";

const BudgetSponsorSlider = ({ sponsor = {}, sliderId = 'sliderId', isMobile = false }) => {
  const sponsorData = Object.keys(sponsor);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sponsorData && sponsorData.length !== 0) {
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
      <>
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
                            {sponsorPartner?.uploaded_img_on_off ? (
                              <a href={sponsorPartner.click_tracker_sponser} target="_blank" className="report_logo" key={key + sliderId}>
                                <img src={isMobile ? sponsorPartner.mobile_img : sponsorPartner.desktop_img}
                                  width={sliderId === 'glossaryWidget' ? 105 : 80}
                                  height={sliderId === 'glossaryWidget' ? 45 : 35}
                                  alt={sponsorPartner?.sponser_name}
                                  title={sponsorPartner?.sponser_name}
                                />
                                {sponsorPartner.impression_tracker_sponser != '' ? <div dangerouslySetInnerHTML={{ __html: sponsorPartner.impression_tracker_sponser }}></div> : ''}
                              </a>
                            ) : ''}
                          </>
                        );
                      })
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div >
        <style jsx global>{`
           .report_logo_row {
             width: 80px;
             display: flex;
           }
           .report_slide {
             position: absolute; 
             top: 0; 
             right: -20px;
             height: 45px; 
             overflow: hidden; 
             width:140px; 
             margin: 10px 0; 
           }
           .report_logo_slidein {
             margin: 0px 30px;
           }
           .report_logo_slidein > div {
             overflow: hidden;
           }
           @media screen and (max-width: 700px) {
             .report_slide{width:100px; margin:0;right:0} 
             .report_logo_slidein{margin: 0px 10px;}
           }
           `}</style>
      </>
    );
  } else {
    return '';
  }

};

export default BudgetSponsorSlider;
