import { useEffect } from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import StoryListing from "widgets/Common/Desktop/LandingPage/storyListing";
import ElectionHighlights from "widgets/Common/Desktop/LandingPage/ElectionHighlightsComponent";
import ElectionTrivia from "widgets/Common/Desktop/LandingPage/ElectionTriviaComponent";
import ElectionGraphicsComponent from "widgets/Common/Desktop/LandingPage/ElectionGraphicsComponent";
import ConstituencyResultTable from "widgets/Common/Desktop/LandingPage/ConstituencyResultTable";
import FeaturedConstituency from "widgets/Common/Desktop/LandingPage/FeaturedConstituencyComponent";
import { loadTvfn } from "includes/article.util";

const ElectionHomeChunk = ({ electionData }) => {

    useEffect(() => {
        setTimeout(() => {
            loadTvfn();
        }, 2000);
    }, []);

    return (
        <>
            <div className="elec-container hindi_elec_widget clearfix">
                <div className="elec-left">
                    <div className="elec-middle">
                        <div className="elec-middle-left">
                            {/* <!-- livetv widget start --> */}
                            <div className="cd-watchlive">
                                <div className="cd-watchlive-hd">
                                    <i className="dots-div blink nw-dots blink2"></i>
                                    <a href="https://hindi.news18.com/livetv" className="liveTvTxtWrap" target="_blank" title="live tv">
                                        <span style={{ color: "#464646", fontSize: "22px", fontWeight: "600" }}>देखें</span>
                                        <div className="boldTxt">लाइव टीवी</div>
                                    </a>

                                    <div className="nhilivetv">
                                        <a href="javascript:void(0);" className="widget_livetv map_select">News18 इंडिया</a>
                                        <div className="widget_livetv_inner">
                                            <a href="https://hindi.news18.com/livetv/news18-uttar-pradesh-uttarakhand/" target="_blank">News18 उत्तर प्रदेश, उत्तराखंड</a>
                                            <a href="https://punjab.news18.com/live-tv/" target="_blank">News18 पंजाब, हरियाणा</a>
                                            <a href="https://hindi.news18.com/livetv/news18-bihar-jharkhand/" target="_blank">News18 बिहार, झारखंड</a>
                                            <a href="https://hindi.news18.com/livetv/news18-madhya-pradesh-chhattisgarh/" target="_blank">News18 मध्य प्रदेश, छत्तीसगढ़</a>
                                            <a href="https://hindi.news18.com/livetv/news18-rajasthan/" target="_blank">News18 राजस्थान</a>
                                            <a href="https://www.news18.com/livetv/" target="_blank">CNN News18</a>
                                            <a href="https://bengali.news18.com/live-tv/" target="_blank">News18 Bengali</a>
                                            <a href="https://lokmat.news18.com/live-tv/" target="_blank">News18 Lokmat</a>
                                            <a href="https://gujarati.news18.com/live-tv/" target="_blank">News18 Gujarati</a>
                                            <a href="https://kannada.news18.com/live-tv/" target="_blank">News18 Kannada</a>
                                            <a href="https://tamil.news18.com/live-tv/" target="_blank">News18 Tamil</a>
                                            <a href="https://malayalam.news18.com/live-tv/" target="_blank">News18 Malayalam</a>
                                            <a href="https://urdu.news18.com/live-tv/" target="_blank">News18 Urdu</a>
                                            <a href="https://assam.news18.com/live-tv/" target="_blank">News18 Assam</a>
                                            <a href="https://odia.news18.com/live-tv/" target="_blank">News18 Odia</a>
                                        </div>
                                    </div>
                                </div>
                                <figure>
                                    <div id="vidgyor_parent" className="livetvelection 1" style={{ background: "black", height: '220px', width: '100%' }} >
                                        <img id="tvposterhome" src="https://images.news18.com/static_news18/pix/ibnhome/news18/election-2022/Live_TV_BG_Hindi.jpg" alt="News18 India Livetv" title="News18 India Livetv" width="100%" />
                                        <div id="vidgyor_container" >
                                            <div id="closeButtonContainer"></div>
                                        </div>
                                    </div>
                                </figure>
                            </div>
                            <FeaturedConstituency featureData={electionData.featureData} />
                            <ElectionHighlights highlightsData={electionData.highlightsData} elecSponserData = {electionData.elecSponserData?.highlights} />
                            <ElectionTrivia triviaData={electionData.triviaData} elecSponserData = {electionData.elecSponserData?.trivia}/>
                            <ElectionGraphicsComponent electionGraphicsData={electionData.graphicsData} elecSponserData = {electionData.elecSponserData?.graphics} />
                            {/* <ResultMap pastYear={pastYear} assemblyData={assemblyData}  /> */}
                        </div>
                        <StoryListing newsData={electionData.newsData}/>
                    </div>
                    {/* <ElectionDOD DODData={electionData.DODData}/> */}
                    <div className="clearfix vsp20"></div>
                </div>
                <div className="elec-right">

                    <div className="elec-rgtad">
                        <SiteAd
                            slotId = {"elctc_chunk_atf_300"}
                            adUnit={"NW18_HIND_Desktop/NW18_HIND_HOME/NW18_HIND_HOME_HOME/NW18_HIND_HP_BTF_300"}
                            sizes={[[300, 250]]}
                            width={300}
                            height={250}
                            lazyload={true}
                        />
                    </div>
                    <ConstituencyResultTable
                        objectStoreConstRes={electionData.objectStoreConstRes}
                        storeConstRes={electionData.storeConstRes}
                    />

                    {/* <TopParty topParty={electionData.topParty} /> */}

                    {/* <div className="elec-rgtad">
                        <SiteAd
                            slotId = {"elctc_chunk_btf_300"}
                            adUnit={"NW18_ENG_Desktop/NW18_ENG_Election/NW18_ENG_Election_HOME/NW18_ENG_ELECT_HOM_BTF_300"}
                            sizes={[[300, 250]]}
                            width={300}
                            height={250}
                        />
                    </div> */}
                </div>
            </div>
            <div className="clearfix vsp20"></div>
            <style jsx global>{`
                .elec-container {
                    max-width: 1244px;
                    margin: auto;
                    position: relative;
                }
                .vsp20 {
                margin-top: 20px;
                }
                .clearfix {
                clear: both;
                }

                .elec-left {
                float: left;
                width: calc(100% - 320px);
                }
                .elec-right {
                width: 300px;
                float: right;
                }
                .elec-middle {
                display: flex;
                justify-content: space-between;
                }
                .elec-middle-left {
                width: 330px;
                flex-shrink: 0;
                }
                .middlead {
                display: flex;
                justify-content: center;
                line-height: 0;
                }
                .vsp20 {
                margin-top: 20px;
                }
                .widget_livetv {
                    width: 150px;
                    height: 28px;
                    background: #E1261C 0% 0% no-repeat padding-box;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                    letter-spacing: -0.28px;
                    color: #FFFFFF;
                    font-size: 14px;
                    font-weight: bold;
                }
    
                .cd-watchlive .cd-watchlive-hd {
                    justify-content: space-between;
                }
    
                .nhilivetv > div {
                    position: absolute;
                    background: #E1261C 0% 0% no-repeat padding-box;
                    width: 150px;
                    left: 0;
                    top: 24px;
                    display: none;
                }
    
                .nhilivetv > div a {
                    display: block;
                }
    
                .nhilivetv > div a {
                    color: #fff;
                    font-size: 13px;
                    margin: 8px 7px;
                    display: block;
                    border-radius: 10px;
                }
    
                .nhilivetv {
                    position: relative;
                }
            `}</style>
        </>
    );
};
export default ElectionHomeChunk;
