import cryptoProps from "../../helper/cryptoProps";
import Cryptohome from "./html/home";

const crypto_samajh = ({ pageData = {} }) => {
  return (
    <>
      <Cryptohome data={pageData} />
    </>
  );
};
export async function getServerSideProps(context) {
  return cryptoProps(context, false);
}
export default crypto_samajh;
