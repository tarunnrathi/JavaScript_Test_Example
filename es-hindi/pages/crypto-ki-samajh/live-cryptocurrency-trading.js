import cryptoProps from "../../helper/cryptoProps";
import Cryptotrading from "./html/trading";

const crypto_samajh = ({ pageData = {} }) => {
  return (
    <>
      <Cryptotrading data={pageData} />
    </>
  );
};
export async function getServerSideProps(context) {
  return cryptoProps(context, false);
}
export default crypto_samajh;
