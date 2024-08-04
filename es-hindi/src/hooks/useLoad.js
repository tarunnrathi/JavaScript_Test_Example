import { useEffect, useRef, useState } from 'react';

export default function useLoad() {
  const ref = useRef(false);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    if (document.readyState === 'complete') {
      handleShow();
    } else {
      if (!ref.current) {
        ref.current = true;
        window.addEventListener('load', handleShow);
      }
    }

    return () => {
      window.removeEventListener('load', handleShow);
    };
  }, []);

  return [show];
}
