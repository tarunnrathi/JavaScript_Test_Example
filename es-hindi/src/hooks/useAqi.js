import { useState } from "react";
import { sorter } from 'includes/aqi.helper';

const useAqi = (majorData, citiesData, statename) => {
    const [tabBtn, setTabBtn] = useState("tab-1");
    const [listing, setListing] = useState(() => ({
        data: citiesData,
        cities: citiesData,
        main: null,
        selected: [],
        counter: 0,
        major: sorter(majorData || [], true, "name"),
    }));

    const updateTab = (t, sn) => {
        switch(t) {
          case "tab-1":
          case "tab-3":
          case "tab-2": {
            const d = sorter(listing.cities, t == "tab-2" || t == "tab-1" ? true : false, t == "tab-1" ? 'name' : 'aqi');
            setListing((prev) => {
              return {
                ...prev,
                selected: [],
                data: d
              };
            });
            break;
          }
          case "tab-4": {
            setListing((prev) => {
              return {
                ...prev,
                selected: prev.major,
              };
            });
          }
        }
        setTabBtn(t);
      };

    return [listing, updateTab, tabBtn, setListing];
};

export default useAqi;
