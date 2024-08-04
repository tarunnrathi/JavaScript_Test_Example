import { useEffect, useState } from "react";
import { generateAdTags } from "config/ads.config";
import { NextSeo } from "next-seo";
import DesktopLayout from "layouts/Desktop/DesktopLayout";
import MobileLayout from "layouts/Mobile/MobileLayout";
import { useDeviceDetection } from "../../../helper/hooks/useDeviceDetection";

const ErrorPage = ({ comp, title, desc, status, props }) => {
  const [pageAds, setPageAds] = useState("");
  const [isLoading, isMobile] = useDeviceDetection(true);
  useEffect(() => {
    setPageAds(generateAdTags("", status));
  }, []);

  if (!isLoading) {
    return (
      <>
        <NextSeo title={title} description={desc} />
        {isMobile ? (
          <MobileLayout
            data={{ ...props, menuData: props.mobileMenu }}
            mainComponent={comp}
            pageAds={pageAds}
            pageSeo={{
              title,
            }}
            error={true}
            config={props.config}
          />
        ) : (
          <DesktopLayout
            data={props}
            mainComponent={comp}
            pageAds={pageAds}
            pageSeo={{
              title,
            }}
            error={true}
            config={props.config}
          />
        )}
      </>
    );
  } else {
    return null;
  }
};

export default ErrorPage;
