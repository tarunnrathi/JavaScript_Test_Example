import cryptoProps from "../../helper/cryptoProps";
import Crypterm from "./html/terms";

const crypto_samajh = ({ pageData = {} }) => {
  return (
    <>
      <Crypterm data={pageData} />
    </>
  );
};
export async function getServerSideProps(context) {
  return cryptoProps(context, false);
}
export default crypto_samajh;
