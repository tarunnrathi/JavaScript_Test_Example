import { useEffect, useState } from "react";

export function useDeviceDetection(shouldCheckDevice = false) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(shouldCheckDevice);

  useEffect(() => {
    if (shouldCheckDevice) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
          navigator.userAgent
        )
      ) {
        setIsMobile(true);
        setIsLoading(false);
      } else {
        setIsMobile(false);
        setIsLoading(false);
      }
    }
  }, []);

  return [isLoading, isMobile];
}
