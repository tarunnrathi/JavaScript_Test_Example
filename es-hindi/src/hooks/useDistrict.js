import { getDistricts } from "api/global/Common";
import { useState, useEffect } from "react";

const useDistrict = () => {
  const [districtList, setDistrictList] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);
  const [state, setState] = useState("");

  useEffect(() => {
    let filterData = [];
    getDistricts()
      .then((response) => {
        const { cityData = [] } = response || {};
        if (cityData.length) {
          filterData = cityData.filter(
            (item) =>
              item.name.toLowerCase().includes(state.toLowerCase()) ||
              item.slug.toLowerCase().includes(state.toLowerCase())
          );
        }
        setDistrictList(response);
        setFilteredItems(filterData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return [districtList, filteredItems, state, setState];
};

export default useDistrict;
