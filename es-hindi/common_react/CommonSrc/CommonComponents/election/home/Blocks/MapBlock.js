import { useState, useEffect, useRef } from 'react';
import Loader from '../../Loader';
import ErrorBoundary from '../../../../../CommonUtils/errorBoundary';

const MapBlock = ({ mapData = {}, resultChunk = {} }) => {
  const {
    states = [],
    updateMapData,
    map,
    setMap,
    setMapShort,
    mapShort,
  } = mapData;
  const [currentState, setCurrentState] = useState(
    states && states.length
      ? {
          activeState: states[0].state,
          activeYear: states[0].year,
          activeIndex: 0,
          ...states[0],
        }
      : null
  );
  const tr = useRef();

  useEffect(() => {
    setMap(null);
    if (map) {
      let short = states[currentState?.activeIndex];
      if (short?.shortState) {
        updateMapData(short);
        setMapShort(short);
      }
    }
  }, [currentState?.activeIndex]);

  const handleStateChange = (e, stateName) => {
    if (!tr.current) {
      tr.current = true;
    }

    const stateFound = states[e?.target?.selectedIndex];

    if (stateFound) {
      setCurrentState({
        activeIndex: e?.target?.selectedIndex,
        activeState: stateFound.shortState,
        activeYear: stateFound.year,
        ...stateFound,
      });
    }
  };

  return (
    <ErrorBoundary>
      <div className="mapw_wrp">
        <div className="mapselect">
          {/* <select
            value={currentState?.activeYear}
            onChange={e => handleYearChange(e.target.value)}>
            {currentState && currentState?.year && currentState.year?.length
              ? currentState.year.map(eachYear => (
                  <option key={eachYear} value={eachYear}>
                    {eachYear}
                  </option>
                ))
              : null}
          </select> */}

          <select
            value={currentState?.activeIndex}
            onChange={e => handleStateChange(e, e.target.value)}>
            {states && states?.length
              ? states.map((eachState, index) => (
                  <option
                    data-year={eachState.year}
                    key={eachState.shortState}
                    value={index}>
                    {eachState.state}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="map" style={{ overflow: 'hidden' }}>
          {/* {!(map && map.length) && currentState?.type == 'dynamic_map' ? (
            <Loader />
          ) : null} */}
          {!(map && map.length) &&
          currentState?.type == 'dynamic_map' &&
          tr.current ? (
            <Loader />
          ) : null}
          {!(map && map.length) &&
          currentState?.type == 'dynamic_map' &&
          !tr.current ? (
            <img
              style={{
                width: '100%',
                height: '403px',
              }}
              src={currentState?.path}
              alt={currentState?.state}
            />
          ) : null}
          {map && map.length && currentState?.type == 'dynamic_map' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox={currentState?.viewBox || '400 -50 1 800'}
              version="1.2"
              baseProfile="tiny"
              width="100%"
              height="360"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="white"
              strokeWidth="0.5"
              style={{
                margin: 'auto',
                display: 'block',
              }}
              fill="#5b5b5b">
              <g>
                {map?.map((item, index) => {
                  let { past, selected } = item;
                  let color = past?.find(
                    p => p.year == currentState?.activeYear
                  )?.winnerColor;
                  return (
                    <path
                      d={item.d}
                      fill={color ? color : '#5b5b5b'}
                      key={index}>
                      <title>{item.consName}</title>
                    </path>
                  );
                })}
              </g>
            </svg>
          ) : null}
          {currentState?.type != 'dynamic_map' ? (
            <img
              src={currentState?.path}
              alt={currentState?.state}
              style={{
                width: '100%',
                maxHeight: '403px',
              }}
            />
          ) : null}

          {resultChunk?.[currentState?.shortState] ? (
            <div className="map-txt">
              <strong>{resultChunk?.[currentState?.shortState]?.done}</strong>/
              {resultChunk?.[currentState?.shortState]?.seats}{' '}
              {resultChunk?.[currentState?.shortState]?.slabel} (
              {resultChunk?.[currentState?.shortState]?.stw}{' '}
              {resultChunk?.[currentState?.shortState]?.stwlabel})
            </div>
          ) : null}
        </div>
      </div>
      <style jsx global>{`
        .staticMap {
          width: 260px;
          height: 220px;
        }
      `}</style>
      <style jsx>{`
        .mapw_wrp {
          max-width: 100%;
          border: 1px solid #e2e2e2;
        }
        .mapselect {
          background: #fdfdfd;
          border-bottom: 1px solid #e2e2e2;
          padding: 7px 10px;
          text-align: center;
        }
        .mapselect select {
          width: 210px;
          height: 30px;
          background: #f2f2f2
            url(https://images.news18.com/n18-elections/2024/05/up_down_arrow_wht.svg)
            no-repeat center right 10px;
          border: 1px solid #cacaca;
          border-radius: 4px;
          padding: 0 10px;
          font: bold 12px/28px Recursive;
          color: #e1261c;
          -webkit-appearance: none;
          appearance: none;
        }
        .mapselect select option {
          padding: 5px 10px;
          border-bottom: #f2f2f2 solid 1px;
          background: #fdfdfd;
        }
        .map {
          background: #fdfdfd
            url(https://images.news18.com/n18-elections/2024/05/map_bg.png)
            no-repeat center;
          background-size: cover;
          min-height: 403px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .map-txt {
          position: absolute;
          bottom: 1px;
          left: 1px;
          right: 1px;
          text-align: center;
          padding: 7px 10px;
          line-height: 12px;
          background: #e1261c;
          font-size: 14px;
          color: #fff;
          border: 1px solid #e2e2e2;
        }
        @media (max-width: 769px) {
          .mapw_wrp {
            max-width: 100%;
          }
          .map-txt {
            display: none;
          }
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default MapBlock;
