import React, { useState } from 'react';

export default function MobileDescription({ title = '', specificationDescription ={} }) {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div>
      <div className="spcabt" id="spcabt">
        <h2 className="phnglblhd">
        {title} <span>डिटेल्‍स</span>
        </h2>
        <div className={!isActive ? 'spcabttxt' : 'spcabttxt adcls'}>
          <div className="spcabttxt-first">
            <p style={{ height: isActive?'':('100px'), overflow: isActive?'':'hidden' }}>
            {specificationDescription?.mobile_description}
            </p>
          </div>
        </div>
        <span
          className={!isActive ? 'mrtxtbtn ' : 'mrtxtbtn adcls'}
          onClick={toggleClass}
        >
          <span>
            <b>रीड मोर</b>
          </span>
          <span>
            <b>रीड लेस</b>
          </span>
        </span>
      </div>

    </div>
  );
}
