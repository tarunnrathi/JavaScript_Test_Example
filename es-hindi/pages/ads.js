import React from "react";
import { getRedisDataWithKey } from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";

export default function Ads(props) {
  const data = props?.adtxt_data?.split("\r\n") || [];
  return (
    <>
      {data?.map((item, index) => {
        return (
          <p className={item ? "no-margin" : ""} key={index}>
            {item}
          </p>
        );
      })}
      <style jsx>{`
        .no-margin {
          margin: 0;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps() {
  const adsConfigTxt = await getRedisDataWithKey(
    REDIS_KEYS.ADS_TXT_KEY,
    false,
    false
  );
  const adtxt_data = adsConfigTxt?.adtxt_data || "";
  return {
    props: { adtxt_data },
  };
}
