import Tag from "components/Microsite/Responsive/electral-hydration/electral_hydration_index";
import electralProps from "../../../helper/electralProps";

const electral_hydration = ({ pageData = {} }) => {
    return (
      <>
        <Tag
          data={pageData}
          pageSeo={pageData.pageSeo}
        />
      </>
    );
  };
  export async function getServerSideProps(context) {
    return electralProps(context, false);
  }
  export default electral_hydration;
