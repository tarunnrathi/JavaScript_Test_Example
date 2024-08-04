import Fit_India_categaory from "components/Microsite/Responsive/fit-india/category";
import fitIndiaProps from "../../../helper/fit-india/categoryProps";

const category = ({ pageData = {} }) => {
    return (
      <>
        <Fit_India_categaory
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
  export default category;
