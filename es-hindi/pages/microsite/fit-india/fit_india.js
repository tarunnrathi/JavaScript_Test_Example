import Fit_India from "components/Microsite/Responsive/fit-india/fit_india_index";
import fitIndiaProps from "../../../helper/fit-india/fitIndiaProps";

const fit_india = ({ pageData = {} }) => {
    return (
      <>
        <Fit_India
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
  export default fit_india;
