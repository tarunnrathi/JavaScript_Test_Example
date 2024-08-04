import React from "react";

const BudgetGlossaryAMPSlider = (props) => {
    const sponsorData = props?.sponsor && Object.keys(props?.sponsor);
    return (
        <>
            {props?.glossary?.length > 0 &&
                <amp-carousel id="carousel" width="400" height="300" layout="responsive" type="slides" controls="" role="" aria-live="polite">
                    {props?.glossary.map((item, index) => {
                        return (
                            <div>
                                <div className="glossary_section_row" key={index}>
                                    <span>
                                        {item.headline}
                                    </span>
                                    <p>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </amp-carousel>
            }
            {props?.sponsor &&
                <div className="report_slide">

                    <amp-carousel id="carousel12345" height="200" layout="fixed-height" type="slides" controls="" loop="" autoplay="" delay="2000" aria-live="polite">
                        {sponsorData.map((item, index) => {
                            return (
                                props?.sponsor[item] && props?.sponsor[item].map((sponsorPartner, key) => {
                                    return (
                                        <div className='glossary_section_row'>{
                                            sponsorPartner?.uploaded_img_on_off ? (
                                                <a href={sponsorPartner?.click_tracker_sponsor} target="_blank" key={index}>
                                                    <amp-img
                                                        src={sponsorPartner?.mobile_img || ""}
                                                        width={80}
                                                        height={35}
                                                        alt={sponsorPartner?.sponser_name}
                                                        title={sponsorPartner?.sponser_name}
                                                    />
                                                </a>
                                            ) : ''
                                        }</div>
                                    );
                                })
                            );
                        })}
                    </amp-carousel>
                </div>
            }

            <style jsx global>{`            
        #carousel{overflow: visible;}        
        .glossary_section_row {
            color: #fff;
            font-size: 13px;
            line-height: 24px;
            padding: 0 15px;
        }
        .glossary_section_row p{ 
            max-height: 170px;
            overflow: hidden;
            line-height: 24px;
            margin:0px;
            }
            .amp-carousel-button-prev {
            position: absolute;
            background-color: transparent;
            top: 70%;
            left: 0;
            outline: 0;
            border: 0;
            }
            .amp-carousel-button-next {
            position:absolute;
            background-color: transparent;
            top: 70%;
            right: 0;
            outline: 0;
            border: 0;
            }          
            
        .report_slide {
            position: absolute;
            top: 0;
            right: '-20px';
            height: 35px;
            overflow: hidden;
            width: 140px;
            margin: 10px 0;
          }
          .report_logo_slidein {
            margin: 0px 30px;
          }
          .report_logo_slidein > div {
            overflow: hidden;
          }
          @media screen and (max-width: 700px) {
            .report_slide{width:100px; right:0;}
          }
        `}</style>
        </>
    );

};
export default BudgetGlossaryAMPSlider;
