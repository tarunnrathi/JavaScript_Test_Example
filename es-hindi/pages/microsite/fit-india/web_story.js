import Fit_india_webstory from "components/Microsite/Responsive/fit-india/web_story";
import fitIndiaProps from "../../../helper/fit-india/fitIndiaProps";

const web_story = ({ pageData = {} }) => {
    return (
      <>
        <Fit_india_webstory
          data={pageData}
          pageAds={pageData.pageAds}
          pageSeo={pageData.pageSeo}
        />
      </>
    );
  };
  export async function getServerSideProps(context) {
    return fitIndiaProps(context, false);
  }
  export default web_story;
