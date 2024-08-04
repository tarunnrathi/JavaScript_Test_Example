import PageNavigations from "components/Common/Olympics/PageNavigations";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import { olympics_year } from "api/Constant";
import TopNews from "components/Common/Olympics/TopNews";

const Home = (props) => {
  const {
    breadCrumbArray,
    middleData,
    rightData,
    leftData,
  } = props?.data;
  return (
    <>
      <div className="olympics-wrapper">
        <div className="olympics-left">
          <div className="breadcum">
            <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
          </div>
          <PageNavigations title={`Olympics ${olympics_year} Home`} />
          <TopNews
            middleData={middleData}
            rightData={rightData}
            leftData={leftData}
            isAMP ={true}
          />
        </div>
      </div>
    </>
  )
}

export default Home;