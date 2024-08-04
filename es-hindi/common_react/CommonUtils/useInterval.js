import { useEffect, useState, useRef } from 'react';

const useInterval = ({ cb, interval = 20000, checkedv = true }) => {
  const [counter, setCounter] = useState(30);
  let [checked, setChecked] = useState(checkedv);
  const timerCallback = useRef();
  const one = useRef();

  useEffect(() => {
    timerCallback.current = () => {
      setCounter(prev => {
        if (prev > 0) {
          one.current = true;
          return prev - 1;
        } else {
          if (one.current) {
            cb();
          }
          one.current = false;
          return 30;
        }
      });
    };
  });

  useEffect(() => {
    function seconds() {
      timerCallback.current();
    }

    let id;

    if (checked && !id) {
      id = setInterval(seconds, 1000);
    } else {
      clearInterval(id);
    }

    return () => {
      clearInterval(id);
    };
  }, [checked]);

  return [counter, setCounter, setChecked, checked];
};

export default useInterval;
