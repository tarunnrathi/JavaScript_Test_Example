import News_ranking from "widgets/Common/Mobile/LandingPage/News_ranking";
import ElectionHighlights from "widgets/Common/Mobile/LandingPage/ElectionHighlightsComponent";
import ElectionGraphicsComponent from "widgets/Common/Mobile/LandingPage/ElectionGraphicsComponent";
import ElectionTrivia from "widgets/Common/Mobile/LandingPage/ElectionTriviaComponent";
import ConstituencyResultTable from "widgets/Common/Mobile/LandingPage/ConstituencyResultTable";
import FeaturedConstituency from "widgets/Common/Mobile/LandingPage/FeaturedConstituencyComponent";
import TopParty from "widgets/Common/Mobile/LandingPage/TopParty";

const ElectionHomeChunk = ({ electionData }) => {
    return (
        <>
            <div className="mhindi_elec_widget">
                <div className="elec-container clearfix">
                    <div className="clearfix vsp20"></div>
                    <div className="elec-middle-left">
                        <FeaturedConstituency featureData={electionData.featureData} />
                        <ElectionHighlights highlightsData={electionData.highlightsData} elecSponserData = {electionData.elecSponserData?.highlights} />
                        <ElectionGraphicsComponent graphicsData={electionData.graphicsData} elecSponserData = {electionData.elecSponserData?.graphics} />
                        <ElectionTrivia triviaData={electionData.triviaData} elecSponserData = {electionData.elecSponserData?.trivia} />
                        {/* <ElectionResultsOnMap /> */}
                    </div>
                </div>
                <TopParty topParty={electionData.topParty} />
                <ConstituencyResultTable
                    objectStoreConstRes={electionData.objectStoreConstRes}
                    storeConstRes={electionData.storeConstRes}
                />

                <News_ranking newsData={electionData.newsData} />
                {/* <Dance_of_democracy DODData={electionData.DODData} /> */}
            </div>
            <style jsx>{`
                .elec-container {
                    position: relative;
                    padding: 0 15px;
                }
                .clearfix {
                clear: both;
                }
                .clearfix:after,
                .clearfix:before {
                content: "";
                display: block;
                clear: both;
                visibility: hidden;
                line-height: 0;
                height: 0;
                }
                .vsp20 {
                margin-top: 20px;
                }
                .elec-rgtad {
                display: flex;
                justify-content: center;
                line-height: 0;
                margin-bottom: 30px;
                }
            `}</style>
        </>
    );
};
export default ElectionHomeChunk;
