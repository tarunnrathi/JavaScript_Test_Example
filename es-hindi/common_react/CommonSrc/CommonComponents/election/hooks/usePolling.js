import { useState, useEffect, useRef } from "react";

const usePolling = ({
  interval,
  dataLoader,
  intial,
  loaderParams,
  nopoll,
  manager,
}) => {
  const [data, setData] = useState(intial);

  const fresh = async () => {
    if (dataLoader) {
      try {
        let data = await dataLoader(loaderParams);
        if (data) {
          setData((prev) => manager(prev, data));
        }
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (!nopoll) {
      fresh();
    }
  }, [nopoll]);

  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = () => fresh();
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id;

    if (!id && !nopoll) {
      id = setInterval(tick, interval || 30000);
    } else {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [nopoll]);

  return [data];
};

export default usePolling;
