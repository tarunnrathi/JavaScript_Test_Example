import { getRedisDataByKeyWithCache } from "api/global/Common";
import useScrollBar from "hooks/useScrollBar";
import { useEffect, useState } from "react";
import { getFilterMenu } from "util/global/Helper";
import StickyMenuItems from "widgets/Common/StickyMenuItems";

const StickyFooterMenu = ({ isMobile, isAMP, toggeleHandler }) => {
  const [scroll, scrollTop] = useScrollBar(true);
  const [isScroll, setIsScroll] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [timeOutId, setTimeOutId] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const getStickyFooterData = async () => {
    if (menuItems.length) return;
    const result = await getRedisDataByKeyWithCache(
      "msf",
      "KHABARN18-",
      true,
      100
    );
    const filterData = getFilterMenu(result, isMobile, isAMP);
    if (filterData.length > 0) {
      setMenuItems(filterData);
    }
  };

  useEffect(() => {
    if (!timeOutId) {
      if (scrollTop && scroll > 0) {
        setIsScroll(true);
        setScrollPosition(scroll);
      } else {
        setIsScroll(false);
        if (scroll > 0) {
          setScrollPosition(scroll);
        }
      }
    }
    if (timeOutId) clearTimeout(timeOutId);
    const timeout = setTimeout(() => {
      if (scroll - scrollPosition > 0) {
        if (scroll > 0) {
          setIsScroll(false);
          setScrollPosition(scroll);
        }
      } else if (scroll - scrollPosition < 0) {
        setIsScroll(true);
        if (scroll > 0) setScrollPosition(scroll);
      }
    }, 100);
    setTimeOutId(timeout);
  }, [scrollTop, scrollPosition, scroll]);

  useEffect(() => {
    getStickyFooterData();
  }, []);

  return (
    <>
      {isScroll && menuItems.length > 0 && (
        <StickyMenuItems
          isAMP={isAMP}
          menuItems={menuItems}
          toggeleHandler={toggeleHandler}
        />
      )}
    </>
  );
};
export default StickyFooterMenu;
