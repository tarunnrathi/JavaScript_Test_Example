import Glide from '@glidejs/glide';
import { useEffect, useState } from 'react';
import usePolling from '../hooks/usePolling';
import { fetchExitPoll } from '../../../../CommonHelper/exitPollHelper';
import ErrorBoundary from '../../../../CommonUtils/errorBoundary';

const ExitPollHome = ({
  exitPollHomeData,
  mode = 'prod',
  lang = 'en',
  isMobile = true,
}) => {
  const [g, setG] = useState(null);
  const [toggleOptions, setToggleOptions] = useState(false);

  const [exitpollData] = usePolling({
    initial: null,
    dataLoader: fetchExitPoll,
    loaderParams: {
      lang,
      mode,
      isMobile,
      csr: true,
    },
    manager: (_, fresh = {}) => fresh,
  });

  const fetchedData = exitpollData ? exitpollData : exitPollHomeData;
  useEffect(() => {
    let el = document.querySelector(`.strp_sldr`);
    let sliderActive = true;

    if (!isMobile) {
      sliderActive = fetchedData?.topAgency
        ? fetchedData?.agency?.length > 2
        : fetchedData?.agency?.length > 3;
    }
    if (
      fetchedData &&
      sliderActive &&
      fetchedData.agency &&
      Array.isArray(fetchedData.agency) &&
      fetchedData.agency.length &&
      el
    ) {
      let gIndex = 0;
      if (g) {
        gIndex = g.index;
        g.destroy();
      }
      let gValue = new Glide(el, {
        autoplay: 5000,
        type: 'carousel',
        perView: fetchedData?.topAgency ? 2 : 3,
        gap: 10,
        slidesToShow: 1,
        draggable: true,
        bound: true,
        peek: {
          before: 0,
          after: fetchedData?.topAgency ? 110 : 0,
        },
        breakpoints: {
          769: {
            perView: 1,
            slidesToShow: 1,
            gap: 10,
            peek: {
              before: 0,
              after: 70,
            },
          },
        },
        startAt: gIndex > fetchedData?.agency?.results?.length ? 0 : gIndex,
      });
      gValue.mount();
      setG(gValue);
    }
  }, [fetchedData]);
  return (
    <ErrorBoundary>
      <div className="exit-pol_top_strip">
        <div className="n18-el-body">
          <div className="n18-el-container">
            <div className="strp_col_left">
              <div className="lok_sabha_txt">
                <div className="strp_main_ttl">
                  <div className="lok-sabha-txt">
                    {fetchedData?.topWidgetTitle}{' '}
                  </div>
                  <span className="ext_pl">
                    {fetchedData?.topWidgetExitText}
                  </span>{' '}
                  <span className="year">{fetchedData?.topWidgetExitYear}</span>
                </div>
                <div className="strip_seats">
                  <span>{fetchedData?.topWidgetTotalText}</span>
                  {fetchedData?.topWidgetMajorityText
                    ? `(${fetchedData?.topWidgetMajorityText})`
                    : null}
                </div>
              </div>
              {fetchedData?.topAgency ? (
                <a
                  href={'/elections/lok-sabha/exit-poll'}
                  style={{ minWidth: '295px' }}>
                  <div className="nw18_widget">
                    <div className="nw18_head">
                      <div className="nw18_txt">
                        {fetchedData?.topAgency.name}
                      </div>
                      <div className="nw18_seats">
                        {fetchedData?.topAgency?.declaredSeatsLabel}
                      </div>
                    </div>
                    <div className="nw18w_parties">
                      {fetchedData?.topAgency.party
                        ? fetchedData?.topAgency.party
                            .filter(eachParty => eachParty?.isAlliance)
                            .filter((_, index) => index < 4)
                            .map((party, index) => (
                              <div key={party.name}>
                                <div
                                  className="nw18w_top"
                                  style={{ background: party.color }}>
                                  {party.name}
                                </div>
                                <div
                                  className="nw18w_bottom"
                                  style={{ background: party.color }}>
                                  {party.value}
                                </div>
                              </div>
                            ))
                        : null}
                    </div>
                  </div>
                </a>
              ) : null}
            </div>
            <div className="strp_col_right">
              <div className="strp_sldr">
                <div className="track" data-glide-el="track">
                  <ul className="slides">
                    {fetchedData?.agency && fetchedData?.agency.length
                      ? fetchedData?.agency.filter(Boolean).map(agencyItem => (
                          <li
                            className="slide"
                            key={agencyItem.name}
                            style={{ margin: '0 10px' }}>
                            <a
                              className="nw18_widget"
                              href={'/elections/lok-sabha/exit-poll'}>
                              <div className="nw18_head">
                                <div className="nw18_txt">
                                  {agencyItem.name}
                                </div>
                                <div className="nw18_seats">
                                  {agencyItem?.declaredSeatsLabel}
                                </div>
                              </div>
                              <div className="nw18w_parties">
                                {agencyItem.party
                                  ? agencyItem.party
                                      .filter(
                                        eachParty => eachParty?.isAlliance
                                      )
                                      .filter((_, index) => index < 4)
                                      .map((party, index) => (
                                        <div>
                                          <div
                                            className="nw18w_top"
                                            style={{
                                              background: party.color,
                                            }}>
                                            {party.name}
                                          </div>
                                          <div
                                            className="nw18w_bottom"
                                            style={{
                                              background: party.color,
                                            }}>
                                            {party.value}
                                          </div>
                                        </div>
                                      ))
                                  : null}
                              </div>
                            </a>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
                {fetchedData.agency &&
                Array.isArray(fetchedData.agency) &&
                (fetchedData.topAgency
                  ? fetchedData.agency.length > 2
                  : fetchedData.agency.length > 3) ? (
                  <div className="arrows" data-glide-el="controls">
                    <button className="arrow arrow--left" data-glide-dir="<">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8.641"
                        height="14"
                        viewBox="0 0 8.641 14">
                        <path
                          id="Path_1"
                          data-name="Path 1"
                          d="M17.992-5.141,12.633-10.5l5.359-5.359L16.352-17.5l-7,7,7,7Z"
                          transform="translate(-9.352 17.5)"
                          fill="#e1261c"
                        />
                      </svg>
                    </button>
                    <button className="arrow arrow--right" data-glide-dir=">">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8.641"
                        height="14"
                        viewBox="0 0 8.641 14">
                        <path
                          id="Path_2"
                          data-name="Path 2"
                          d="M10.008-5.141,15.367-10.5l-5.359-5.359L11.648-17.5l7,7-7,7Z"
                          transform="translate(-10.008 17.5)"
                          fill="#e1261c"
                        />
                      </svg>
                    </button>
                  </div>
                ) : null}
              </div>
              {fetchedData?.showStates &&
              fetchedData?.states &&
              fetchedData?.states?.length ? (
                <div className="strp_states">
                  {fetchedData?.widgetStatelabel ? (
                    <div>{fetchedData?.widgetStatelabel} »</div>
                  ) : null}
                  <>
                    {fetchedData?.states.map(state => (
                      <a href={state?.stateLink}>{state.stateName}</a>
                    ))}
                  </>
                  <div className="select_dropdown" id="customDropdown">
                    <div
                      className="selected"
                      onClick={() => setToggleOptions(!toggleOptions)}>
                      <span>
                        {fetchedData?.chooseStateLabel || 'CHOOSE STATE'}
                      </span>
                    </div>
                    <ul
                      className="dpdwnlist"
                      id="dropdownContent"
                      style={{ display: toggleOptions ? 'block' : 'none' }}>
                      {fetchedData?.states.map(state => (
                        <li>
                          <a href={state?.stateLink}>{state.stateName}</a>
                        </li>
                      ))}
                    </ul>
                    <svg
                      className="icon_svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="8.422"
                      height="14.5"
                      viewBox="0 0 8.422 14.5"
                      class="jsx-c650650ff3dfa465">
                      <path
                        id="up_down_arrow"
                        d="M11-2.578,8.078-5.5,6.789-4.211,11,0l4.211-4.211L13.922-5.5Zm0-9.344L13.922-9l1.289-1.289L11-14.5,6.789-10.289,8.078-9Z"
                        transform="translate(-6.789 14.5)"
                        fill="#fff"
                        class="jsx-c650650ff3dfa465"></path>
                    </svg>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .strp_sldr ul li{
          flex-shrink:0;
        }
        .exit-pol_top_strip {
          background: #f2f2f2;
          box-shadow: 0px 5px 5px #0000001a;
          margin-bottom: 15px;
          height:131px;
        }
        .exit-pol_top_strip .n18-el-body {
          background: transparent;
          padding: 0 20px;
        }
        .exit-pol_top_strip .n18-el-container {
          display: flex;
          border-left: #e1261c solid 2px;
          border-right: #e1261c solid 2px;
          justify-content: unset;
        }
        .lok-sabha-txt{width:120px;white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;}
        .strp_col_left {
          padding: 10px 15px 10px 10px;
          background: white;
          display: flex;
          flex-shrink: 0;
          height:131px;
        }
        .lok_sabha_txt {
          width: 131px;
          margin-right: 12px;
          flex-shrink: 0;
        }
        .strp_main_ttl {
          font-weight: bold;
          font-size: 12px;
          line-height: 20px;
          color: #001d42;
          text-transform: uppercase;
        }
        .strp_main_ttl .ext_pl {
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
          color: #e1261c;
        }
        .strp_main_ttl .ext_pl:lang(kn),
        .strp_main_ttl .ext_pl:lang(ta),
        .strp_main_ttl .ext_pl:lang(tl),
        .strp_main_ttl .ext_pl:lang(te),
        .strp_main_ttl .ext_pl:lang(ml) {
            font-size:13px;
          }
        .strp_main_ttl .ext_pl:lang(pa),
        .strp_main_ttl .ext_pl:lang(ur){
          font-size:18px;
        }
        .strp_main_ttl .year {
          color: #e1261c;
          padding-left: 5px;
        }
        .strip_seats {
          background: #f2f2f2;
          padding: 4px 5px;
          font-size: 11px;
          line-height: 19px;
          text-align:left;
        }
        .strip_seats:lang(ur){
          text-align:left;
        }
        .strip_seats span {
          font-weight: bold;
          font-size: 11px;
          line-height: 19px;
          color: #222222;
          display: block;
        }
        
        .strip_seats span:lang(te),
        .strip_seats span:lang(ta),
        .strip_seats span:lang(tl),
        .strip_seats span:lang(ml),
        .strip_seats:lang(te),
        .strip_seats:lang(tl),
        .strip_seats:lang(ml){
          font-size:9px;
        }
        .strip_seats:lang(ta){font-size:8px;}
        .strip_seats span:lang(kn),
        .strip_seats:lang(kn){
          font-size:11px;
        }
        .nw18_widget {
          display: inline-block;
          min-width: 295px;
          width: 100%;
          background: #ffffff;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 4px;
          padding: 5px 10px 7px;
        }
        .nw18_head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }
        .nw18_head .nw18_txt {
          font-weight: bold;
          font-size: 11px;
          line-height: 17px;
          color: #e1261c;
          max-width:58%;
          padding-right:10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nw18_head .nw18_seats {
          font-size: 11px;
          line-height: 17px;
          color: #222222;
          max-width:42%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align:right;
        }
        .nw18w_parties {
          display: flex;
          gap: 0 1px;
        }
        .nw18w_parties > div {
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          overflow: hidden;
          gap: 1px 0;
          flex:1;
        }
        .nw18w_top {
          text-align:center;
          min-width: 68px;
          height: 30px;.
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
          line-height: 32px;
          color: #ffffff;
          text-shadow: 0px 3px 6px #00000029;
          text-transform: uppercase;
        }
        .nw18w_bottom {
          min-width: 60px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
          line-height: 39px;
          color: #ffffff;
          text-shadow: 0px 3px 6px #00000029;
        }
        .strp_col_right {
          min-width: 0;
          flex-grow: 1;
        }
        .strp_sldr {
          margin: 10px 15px 0;
          position: relative;
        }
        .strp_sldr li {
          list-style: none;
        }
        // .strp_sldr li:first-child {
        //   display: none;
        // }
        .strp_sldr .track {
          overflow: hidden;
        }
        .strp_sldr .slides {
          display: flex;
          padding-bottom: 6px;
        }
        .strp_sldr .nw18w_top {
          height: 25px;
        }
        .strp_sldr .nw18w_bottom {
          height: 32px;
        }
        .strp_sldr .arrow {
          width: 20px;
          height: 40px;
          background: #ffffff;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #dedede;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 25px;
          right: -10px;
          cursor: pointer;
        }
        .strp_sldr .arrow.arrow--left {
          right: unset;
          left: -10px;
        }
        .strp_states {
          margin: 0 15px;
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 11px;
          line-height: 17px;
          color: #000000;
          margin-bottom: 5px;
        }
        .strp_states a {
          position: relative;
          color: #0067e0;
          padding-left: 24px;
        }
        .strp_states a:before {
          content: '';
          width: 5px;
          height: 5px;
          background: #0067e0;
          border-radius: 100%;
          display: inline-block;
          margin-right: 6px;
        }
        .select_dropdown {
          display: none;
        }
        @media (max-width: 769px) {
          .lok-sabha-txt{width:unset;margin-right:5px;}
          .exit-pol_top_strip {
            box-shadow: unset;
            margin-bottom: 0;
            height:172px;
          }
          .exit-pol_top_strip .n18-el-body {
            padding: 0;
          }
          .exit-pol_top_strip .n18-el-container {
            display: block;
            border: none;
            border-top: #0a2040 solid 2px;
            border-bottom: #0a2040 solid 2px;
          }
          .strp_col_left {
            padding: 4px 15px 4px 10px;
            height:28px;
          }
          .strp_col_left .nw18_widget,
          .strip_seats {
            display: none;
          }
          .strp_col_right {
            max-width: 100%;
            height:140px;
            display:inline-block;
          }
          .lok_sabha_txt {
            margin-right: 0;
            width: auto;
          }
          .strp_main_ttl,
          .strp_main_ttl .ext_pl {
            font-size: 13px;
            line-height: 20px;
            display:flex;
          }
          .strp_sldr .arrow {
            display: none;
          }
          .strp_sldr {
            margin: 6px 0 0 10px;
          }
          .strp_sldr li {
            padding: 0 10px 0 0;
          }
          .strp_states > a {
            display: none;
          }
          .nw18w_bottom {
            font-size: 13px;
          }
          /* Style for the custom dropdown */
          .select_dropdown {
            position: relative;
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            min-width: 130px;
            height: 26px;
            background: #e1261c;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #ffffff;
            border-radius: 13px;
            vertical-align: top;
            margin-left: 15px;
          }
          .select_dropdown .selected {
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 11px;
            line-height: 20px;
            color: #ffffff;
            text-transform: uppercase;
            width: 100%;
            padding: 5px 20px 5px 10px;
          }
          .select_dropdown .selected span {
            font-weight: bold;
            font-size: 11px;
            line-height: 20px;
            color: #ffffff;
            text-transform: capitalize;
            pointer-events: none;
          }
          .dpdwnlist {
            display: none;
            position: absolute;
            top: 24px;
            left: 0;
            right: 0;
            z-index: 1;
            padding: 0;
            margin: 0;
            background: white;
            border: #ccc solid 1px;
            border-radius: 4px;
            overflow: auto;
            // height: 110px;
          }
          .dpdwnlist::-webkit-scrollbar {
            width: 5px;
          }
          .dpdwnlist::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .dpdwnlist::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
          }
          .dpdwnlist::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          .dpdwnlist li {
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 13px;
            line-height: 20px;
            text-transform: uppercase;
            color: #000;
            padding: 5px 8px;
            border-bottom: #f0f0f0 solid 1px;
          }
          .strp_states a {
            padding-left: 0;
            font-size: 10px;
          }
          .strp_states a:before {
            display: none;
          }
        }
        @media (max-width: 375px) {
          .nw18_widget {
            min-width: 275px;
          }
        }
      `}</style>
      <style>
        {`
        .select_dropdown svg, .icon_svg{position:absolute;right:8px;top:5px;pointer-events: none;}
        `}
      </style>
    </ErrorBoundary>
  );
};

export default ExitPollHome;
