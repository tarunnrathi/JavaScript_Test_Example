import cryptoProps from "../../helper/cryptoProps";
import Cryptowebinar from "./html/webinar";

const crypto_samajh = ({ pageData = {} }) => {
  return (
    <>
      <Cryptowebinar data={pageData} />
    </>
  );
};
export async function getServerSideProps(context) {
  return cryptoProps(context, false);
}
export default crypto_samajh;
