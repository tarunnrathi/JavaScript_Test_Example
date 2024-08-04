import MidStories from 'widgets/Common/Amp/LandingPage/MidStories';
import ElectionHighlights from 'widgets/Common/Amp/LandingPage/ElectionHighlights';
import ElectionGraphics from 'widgets/Common/Amp/LandingPage/ElectionGraphics';
import ElectionTrivia from 'widgets/Common/Amp/LandingPage/ElectionTrivia';
import TopParty from "widgets/Common/Amp/LandingPage/TopParty";
import FeaturedConstituency from "widgets/Common/Amp/LandingPage/FeaturedConstituency";

const ElectionHomeChunk = ({ electionData }) => {
    return (
        <>
            <div>
                <div className="elec-container clearfix">
                    <FeaturedConstituency featureData={electionData?.featureData} />
                    <ElectionHighlights highlightsData={electionData?.highlightsData} elecSponserData = {electionData.elecSponserData?.highlights} />
                    <ElectionGraphics graphicsData={electionData?.graphicsData} elecSponserData = {electionData.elecSponserData?.graphics} />
                    <ElectionTrivia triviaData={electionData?.triviaData} elecSponserData = {electionData.elecSponserData?.trivia} />
                    <TopParty electionData={electionData} />
                </div>
                {/* <ConstituencyResultTable electionData={electionData} /> */}
                <div className="elec-container2 clearfix">
                    <div className="clearfix"></div>
                    <MidStories newsData={electionData.newsData} />
                </div>
                {/* <DanceofDemocracy DODData={electionData.DODData} /> */}
            </div>
            <style jsx global>{`
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
                .dflx {
                display: flex;
                }
                .elec-container {
                position: relative;
                padding: 0 15px;
                }
            `}</style>
        </>
    );
};

export default ElectionHomeChunk;
