import AmritRatnaTemp from "components/Microsite/Responsive/amrit-ratna/amrit_ratna_index";
import amritRatnaProps from "../../helper/amrit-ratna/amritRatnaProps";

const amrit_ratna = ({ pageData = {} }) => {
    return (
      <>
        <AmritRatnaTemp
          data={pageData}
          pageSeo={pageData.pageSeo}
          pageAds={pageData.pageAds}
        />
      </>
    );
  };
  export function getServerSideProps(context) {
    return amritRatnaProps(context);
  }
  export default amrit_ratna;
