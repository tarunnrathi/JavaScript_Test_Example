import React, { useState } from 'react';
import { logEvent } from 'includes/googleAnalytic';
import DistrictDesktopStyles from '../../components/Desktop/DistrictDesktop.module.css';
import { districtList } from 'includes/district.helper';

export default function SelectStateLHS(props) {
  const { currentDistrict } = props.topPriorityData;
  const [stateDetail, setStateDetail] = useState(currentDistrict.parent);
  const [state, setState] = useState('');
  // const districtList = districtList;

  const filteredItems = districtList.filter(
    (item) =>
      item.href.toLowerCase().indexOf(state.toLowerCase()) != -1 ||
      item.hi.indexOf(state.toLowerCase()) != -1 ||
      item.en.indexOf(state.toLowerCase()) != -1
  );

  const handleChange = ({ target }) => {
    setState(target.value);
  };
  const showStateDetail = (target) => {
    setStateDetail((prev) => (target == prev ? -1 : target));
  };
  const handleEvent = (name) => {
    logEvent('Local18_Select', 'Click ', name);
  };
  return (
    <>
      <div className={DistrictDesktopStyles.bltnnews_left}>
        <div className={DistrictDesktopStyles.bltnnews_lefttp}>
          <h2>अपना जिला चुनें</h2>
          <div className={DistrictDesktopStyles.bltnnews_lefttp_bynm}>
            <input
              type="text"
              placeholder="Search district"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="bltnnews_lefttp_ctlists">
          <ul>
            {state && !filteredItems.length ? (
              <li key={-1} style={{ width: 'auto' }} className="noarrow">
                No filtered items
              </li>
            ) : null}

            {filteredItems&& filteredItems.length
              ? filteredItems.map((item, index) => {
                  return (
                    <li
                      key={`${item.id_index}`}
                      className={
                        item.href === props.topPriorityData.urlParam.district
                          ? 'red-background noarrow'
                          : 'noarrow'
                      }
                    >
                      <a onClick={() => {
                              logEvent('Local18_Select', 'Click ', item.name);
                            }}
                          href={`/news/${item.slug}/`}>
                            {item.name}
                          </a>
                    </li>
                  );
                })
              : null}

            {state == '' || !state ? (
              <>
                <li className="noarrow">
                  <a href="/news/delhi-ncr/" onClick={() => {
                              logEvent('Local18_Select', 'Click ', ' दिल्ली-एनसीआर');
                            }}>दिल्ली-एनसीआर</a>
                </li>
                <li
                  onClick={() => showStateDetail(0)}
                  className={stateDetail == 0 && 'showinsddstct'}
                >
                  उत्तर प्रदेश
                  <div className="insddstct">
                    <a
                      href="/news/uttar-pradesh/lucknow/"
                      className={
                        currentDistrict.href == 'uttar-pradesh/lucknow' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("लखनऊ");}}
                    >
                      लखनऊ
                    </a>
                    <a
                      href="/news/uttar-pradesh/kanpur/"
                      className={
                        currentDistrict.href == 'uttar-pradesh/kanpur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("कानपुर");}}
                    >
                      कानपुर
                    </a>
                    <a
                      href="/news/uttar-pradesh/meerut/"
                      className={
                        currentDistrict.href == 'uttar-pradesh/meerut' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("मेरठ");}}
                    >
                      मेरठ
                    </a>
                    <a
                      href="/news/uttar-pradesh/agra/"
                      className={
                        currentDistrict.href == 'uttar-pradesh/agra' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("आगरा");}}
                    >
                      आगरा
                    </a>
                    <a
                      href="/news/uttar-pradesh/varanasi/"
                      className={
                        currentDistrict.href == 'uttar-pradesh/varanasi' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("वाराणसी");}}
                    >
                      वाराणसी
                    </a>
                    <a
                      href="/news/uttar-pradesh/gorakhpur/"
                      className={
                        currentDistrict.href == 'uttar-pradesh/gorakhpur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("गोरखपुर");}}
                    >
                      गोरखपुर
                    </a>
                    <a
                      href="/news/uttar-pradesh/noida/"
                      className={
                        currentDistrict.href == 'uttar-pradesh/noida' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("नोएडा");}}
                    >
                      नोएडा
                    </a>
                    <a
                      href="/news/uttar-pradesh/ghaziabad/"
                      className={
                        currentDistrict.href == 'uttar-pradesh/ghaziabad' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("गाजियाबाद");}}
                    >
                      गाजियाबाद
                    </a>
                    <a
                      href="/news/uttar-pradesh/allahabad/"
                      className={
                        currentDistrict.href == 'uttar-pradesh/allahabad' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("इलाहाबाद");}}
                    >
                      इलाहाबाद
                    </a>
                    <a
                      href="/news/uttar-pradesh/aligarh/"
                      className={
                        currentDistrict.href == 'uttar-pradesh/aligarh' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("अलीगढ़");}}
                    >
                      अलीगढ़
                    </a>
                    <a
                      href="/news/uttar-pradesh/jhansi/"
                      className={
                        currentDistrict.href == 'uttar-pradesh/jhansi' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("झांसी");}}
                    >
                      झांसी
                    </a>
                    <a
                      href="/news/uttar-pradesh/hapur/"
                      className={
                        currentDistrict.href == 'uttar-pradesh/hapur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("हापुड़");}}
                    >
                      हापुड़
                    </a>
                  </div>
                </li>
                <li
                  onClick={() => showStateDetail(1)}
                  className={stateDetail == 1 && 'showinsddstct'}
                >
                  बिहार
                  <div className="insddstct">
                    <a
                      href="/news/bihar/patna/"
                      className={
                        currentDistrict.href == 'bihar/patna' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("पटना");}}
                    >
                      पटना
                    </a>
                    <a
                      href="/news/bihar/muzaffarpur/"
                      className={
                        currentDistrict.href == 'bihar/muzaffarpur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("मुजफ्फरपुर");}}
                    >
                      मुजफ्फरपुर
                    </a>
                    <a
                      href="/news/bihar/gaya/"
                      className={
                        currentDistrict.href == 'bihar/gaya' && 'red-background'
                      }
                      onClick={() => {handleEvent("गया");}}
                    >
                      गया
                    </a>
                    <a
                      href="/news/bihar/purnia/"
                      className={
                        currentDistrict.href == 'bihar/purnia' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("पूर्णिया");}}
                    >
                      पूर्णिया
                    </a>
                    <a
                      href="/news/bihar/bhagalpur/"
                      className={
                        currentDistrict.href == 'bihar/bhagalpur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("भागलपुर");}}
                    >
                      भागलपुर
                    </a>
                    <a
                      href="/news/bihar/darbhanga/"
                      className={
                        currentDistrict.href == 'bihar/darbhanga' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("दरभंगा");}}
                    >
                      दरभंगा
                    </a>
                    <a
                      href="/news/bihar/nawada/"
                      className={
                        currentDistrict.href == 'bihar/nawada' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("नवादा");}}
                    >
                      नवादा
                    </a>
                    <a
                      href="/news/bihar/east-champaran/"
                      className={
                        currentDistrict.href == 'bihar/east-champaran' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("पूर्वी चंपारण");}}
                    >
                      पूर्वी चंपारण
                    </a>
                  </div>
                </li>
                <li
                  onClick={() => showStateDetail(2)}
                  className={stateDetail == 2 && 'showinsddstct'}
                >
                  मध्य प्रदेश
                  <div className="insddstct">
                    <a
                      href="/news/madhya-pradesh/bhopal/"
                      className={
                        currentDistrict.href == 'madhya-pradesh/bhopal' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("भोपाल");}}
                    >
                      भोपाल
                    </a>
                    <a
                      href="/news/madhya-pradesh/indore/"
                      className={
                        currentDistrict.href == 'madhya-pradesh/indore' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("इंदौर");}}
                    >
                      इंदौर
                    </a>
                    <a
                      href="/news/madhya-pradesh/vidisha-madhya-pradesh/"
                      className={
                        currentDistrict.href ==
                          'madhya-pradesh/vidisha-madhya-pradesh' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("विदिशा");}}
                    >
                      विदिशा
                    </a>
                    <a
                      href="/news/madhya-pradesh/hoshangabad/"
                      className={
                        currentDistrict.href == 'madhya-pradesh/hoshangabad' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("होशंगाबाद");}}
                    >
                      होशंगाबाद
                    </a>
                    <a
                      href="/news/madhya-pradesh/harda/"
                      className={
                        currentDistrict.href == 'madhya-pradesh/harda' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("हरदा");}}
                    >
                      हरदा
                    </a>
                    <a
                      href="/news/madhya-pradesh/jabalpur/"
                      className={
                        currentDistrict.href == 'madhya-pradesh/jabalpur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("जबलपुर");}}
                    >
                      जबलपुर
                    </a>
                    <a
                      href="/news/madhya-pradesh/balaghat/"
                      className={
                        currentDistrict.href == 'madhya-pradesh/balaghat' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("बालाघाट");}}
                    >
                      बालाघाट
                    </a>
                    <a
                      href="/news/madhya-pradesh/gwalior/"
                      className={
                        currentDistrict.href == 'madhya-pradesh/gwalior' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("ग्वालियर");}}
                    >
                      ग्वालियर
                    </a>
                  </div>
                </li>
                <li
                  onClick={() => showStateDetail(3)}
                  className={stateDetail == 3 && 'showinsddstct'}
                >
                  राजस्थान
                  <div className="insddstct">
                    <a
                      href="/news/rajasthan/jaipur/"
                      className={
                        currentDistrict.href == 'rajasthan/jaipur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("जयपुर");}}
                    >
                      जयपुर
                    </a>
                    <a
                      href="/news/rajasthan/alwar/"
                      className={
                        currentDistrict.href == 'rajasthan/alwar' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("अलवर");}}
                    >
                      अलवर
                    </a>
                    <a
                      href="/news/rajasthan/bharatpur/"
                      className={
                        currentDistrict.href == 'rajasthan/bharatpur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("भरतपुर");}}
                    >
                      भरतपुर
                    </a>
                    <a
                      href="/news/rajasthan/bikaner/"
                      className={
                        currentDistrict.href == 'rajasthan/bikaner' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("बीकानेर");}}
                    >
                      बीकानेर
                    </a>
                    <a
                      href="/news/rajasthan/chittorgarh/"
                      className={
                        currentDistrict.href == 'rajasthan/chittorgarh' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("चित्तौड़गढ़");}}
                    >
                      चित्तौड़गढ़
                    </a>
                    <a
                      href="/news/rajasthan/dholpur/"
                      className={
                        currentDistrict.href == 'rajasthan/dholpur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("धौलपुर");}}
                    >
                      धौलपुर
                    </a>
                  </div>
                </li>
                <li
                  onClick={() => showStateDetail(4)}
                  className={stateDetail == 4 && 'showinsddstct'}
                >
                  उत्तराखंड
                  <div className="insddstct">
                    <a
                      href="/news/uttarakhand/rishikesh/"
                      className={
                        currentDistrict.href == 'uttarakhand/rishikesh' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("ऋषिकेश");}}
                    >
                      ऋषिकेश
                    </a>
                    <a
                      href="/news/uttarakhand/dehradun/"
                      className={
                        currentDistrict.href == 'uttarakhand/dehradun' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("देहरादून");}}
                    >
                      देहरादून
                    </a>
                    <a
                      href="/news/uttarakhand/chamoli/"
                      className={
                        currentDistrict.href == 'uttarakhand/chamoli' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("चमोली");}}
                    >
                      चमोली
                    </a>
                    <a
                      href="/news/uttarakhand/almora/"
                      className={
                        currentDistrict.href == 'uttarakhand/almora' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("अल्मोड़ा");}}
                    >
                      अल्मोड़ा
                    </a>
                    <a
                      href="/news/uttarakhand/haldwani/"
                      className={
                        currentDistrict.href == 'uttarakhand/haldwani' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("हल्द्वानी");}}
                    >
                      हल्द्वानी
                    </a>
                    <a
                      href="/news/uttarakhand/nainital/"
                      className={
                        currentDistrict.href == 'uttarakhand/nainital' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("नैनीताल");}}
                    >
                      नैनीताल
                    </a>
                    <a
                      href="/news/uttarakhand/haridwar/"
                      className={
                        currentDistrict.href == 'uttarakhand/haridwar' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("हरिद्वार");}}
                    >
                      हरिद्वार
                    </a>
                    <a
                      href="/news/uttarakhand/pithoragarh/"
                      className={
                        currentDistrict.href == 'uttarakhand/pithoragarh' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("पिथौरागढ़");}}
                    >
                      पिथौरागढ़
                    </a>
                    <a
                      href="/news/uttarakhand/pauri-garhwal/"
                      className={
                        currentDistrict.href == 'uttarakhand/pauri-garhwal' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("पौड़ी गढ़वाल");}}
                    >
                      पौड़ी गढ़वाल
                    </a>
                    <a
                      href="/news/uttarakhand/bageshwar/"
                      className={
                        currentDistrict.href == 'uttarakhand/bageshwar' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("बागेश्वर");}}
                    >
                      बागेश्वर
                    </a>
                    <a
                      href="/news/uttarakhand/rudraprayag/"
                      className={
                        currentDistrict.href == 'uttarakhand/rudraprayag' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("रुद्रप्रयाग");}}
                    >
                      रुद्रप्रयाग
                    </a>
                    <a
                      href="/news/uttarakhand/champawat/"
                      className={
                        currentDistrict.href == 'uttarakhand/champawat' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("चम्पावत");}}
                    >
                      चम्पावत
                    </a>
                    <a
                      href="/news/uttarakhand/tehri-garhwal/"
                      className={
                        currentDistrict.href == 'uttarakhand/tehri-garhwal' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("टिहरी गढ़वाल");}}
                    >
                      टिहरी गढ़वाल
                    </a>
                    <a
                      href="/news/uttarakhand/uttarkashi/"
                      className={
                        currentDistrict.href == 'uttarakhand/uttarkashi' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("उत्तरकाशी");}}
                    >
                      उत्तरकाशी
                    </a>
                    <a
                      href="/news/uttarakhand/udham-singh-nagar/"
                      className={
                        currentDistrict.href ==
                          'uttarakhand/udham-singh-nagar' && 'red-background'
                      }
                      onClick={() => {handleEvent("ऊधमसिंह नगर");}}
                    >
                      ऊधमसिंह नगर
                    </a>
                  </div>
                </li>
                <li
                  onClick={() => showStateDetail(5)}
                  className={stateDetail == 5 && 'showinsddstct'}
                >
                  हरियाणा
                  <div className="insddstct">
                    <a
                      href="/news/haryana/chandigarh-city/"
                      className={
                        currentDistrict.href == 'haryana/chandigarh-city' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("चंडीगढ़");}}
                    >
                      चंडीगढ़
                    </a>
                    <a
                      href="/news/haryana/sonipat/"
                      className={
                        currentDistrict.href == 'haryana/sonipat' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("सोनीपत");}}
                    >
                      सोनीपत
                    </a>
                    <a
                      href="/news/haryana/panipat/"
                      className={
                        currentDistrict.href == 'haryana/panipat' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("पानीपत");}}
                    >
                      पानीपत
                    </a>
                    <a
                      href="/news/haryana/faridabad/"
                      className={
                        currentDistrict.href == 'haryana/faridabad' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("फरीदाबाद");}}
                    >
                      फरीदाबाद
                    </a>
                    <a
                      href="/news/haryana/ambala/"
                      className={
                        currentDistrict.href == 'haryana/ambala' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("अंबाला");}}
                    >
                      अंबाला
                    </a>
                    <a
                      href="/news/haryana/gurgaon/"
                      className={
                        currentDistrict.href == 'haryana/gurgaon' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("गुरुग्राम");}}
                    >
                      गुरुग्राम
                    </a>
                  </div>
                </li>
                <li
                  onClick={() => showStateDetail(6)}
                  className={stateDetail == 6 && 'showinsddstct'}
                >
                  झारखंड
                  <div className="insddstct">
                    <a
                      href="/news/jharkhand/ranchi/"
                      className={
                        currentDistrict.href == 'jharkhand/ranchi' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("रांची");}}
                    >
                      रांची
                    </a>
                    <a
                      href="/news/jharkhand/dhanbad/"
                      className={
                        currentDistrict.href == 'jharkhand/dhanbad' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("धनबाद");}}
                    >
                      धनबाद
                    </a>
                    <a
                      href="/news/jharkhand/bokaro/"
                      className={
                        currentDistrict.href == 'jharkhand/bokaro' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("बोकारो");}}
                    >
                      बोकारो
                    </a>
                    <a
                      href="/news/jharkhand/jamshedpur/"
                      className={
                        currentDistrict.href == 'jharkhand/jamshedpur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("जमशेदपुर");}}
                    >
                      जमशेदपुर
                    </a>
                    <a
                      href="/news/jharkhand/deoghar/"
                      className={
                        currentDistrict.href == 'jharkhand/deoghar' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("देवघर");}}
                    >
                      देवघर
                    </a>
                    <a
                      href="/news/jharkhand/dumka/"
                      className={
                        currentDistrict.href == 'jharkhand/dumka' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("दुमका");}}
                    >
                      दुमका
                    </a>
                  </div>
                </li>
                <li
                  onClick={() => showStateDetail(7)}
                  className={stateDetail == 7 && 'showinsddstct'}
                >
                  छत्तीसगढ़
                  <div className="insddstct">
                    <a
                      href="/news/chhattisgarh/raipur/"
                      className={
                        currentDistrict.href == 'chhattisgarh/raipur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("रायपुर");}}
                    >
                      रायपुर
                    </a>
                    <a
                      href="/news/chhattisgarh/surguja/"
                      className={
                        currentDistrict.href == 'chhattisgarh/surguja' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("सरगुजा");}}
                    >
                      सरगुजा
                    </a>
                    <a
                      href="/news/chhattisgarh/bastar/"
                      className={
                        currentDistrict.href == 'chhattisgarh/bastar' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("बस्तर");}}
                    >
                      बस्तर
                    </a>
                    <a
                      href="/news/chhattisgarh/bilaspur/"
                      className={
                        currentDistrict.href == 'chhattisgarh/bilaspur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("बिलासपुर");}}
                    >
                      बिलासपुर
                    </a>
                    <a
                      href="/news/chhattisgarh/korba/"
                      className={
                        currentDistrict.href == 'chhattisgarh/korba' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("कोरबा");}}
                    >
                      कोरबा
                    </a>
                    <a
                      href="/news/chhattisgarh/raigarh/"
                      className={
                        currentDistrict.href == 'chhattisgarh/raigarh' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("रायगढ़");}}
                    >
                      रायगढ़
                    </a>
                  </div>
                </li>
                <li
                  onClick={() => showStateDetail(8)}
                  className={stateDetail == 8 && 'showinsddstct'}
                >
                  हिमाचल प्रदेश
                  <div className="insddstct">
                    <a
                      href="/news/himachal-pradesh/shimla/"
                      className={
                        currentDistrict.href == 'himachal-pradesh/shimla' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("शिमला");}}
                    >
                      शिमला
                    </a>
                    <a
                      href="/news/himachal-pradesh/solan/"
                      className={
                        currentDistrict.href == 'himachal-pradesh/solan' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("सोलन");}}
                    >
                      सोलन
                    </a>
                    <a
                      href="/news/himachal-pradesh/una/"
                      className={
                        currentDistrict.href == 'himachal-pradesh/una' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("ऊना");}}
                    >
                      ऊना
                    </a>
                    <a
                      href="/news/himachal-pradesh/hamirpur/"
                      className={
                        currentDistrict.href == 'himachal-pradesh/hamirpur' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("हमीरपुर");}}
                    >
                      हमीरपुर
                    </a>
                    <a
                      href="/news/himachal-pradesh/mandi/"
                      className={
                        currentDistrict.href == 'himachal-pradesh/mandi' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("मंडी");}}
                    >
                      मंडी
                    </a>
                    <a
                      href="/news/himachal-pradesh/dharamsala/"
                      className={
                        currentDistrict.href == 'himachal-pradesh/dharamsala' &&
                        'red-background'
                      }
                      onClick={() => {handleEvent("धर्मशाला");}}
                    >
                      धर्मशाला
                    </a>
                  </div>
                </li>
                <li className="noarrow">
                  <a href="/news/maharashtra/"
                      onClick={() => {handleEvent("महाराष्ट्र");}}
                      >महाराष्ट्र</a>
                </li>
                <li className="noarrow">
                  <a href="/news/punjab/"
                      onClick={() => {handleEvent("पंजाब");}}
                      >पंजाब</a>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
      <style jsx global>{`
        .bltnnews_lefttp_ctlists {
          font-family: 'Montserrat', sans-serif;
          min-height: 350px;
          overflow: hidden;
        }
        .adcls_bltnnews_lefttp_ctlists {
          height: auto;
        }
        .bltnnews_lefttp_ctlists ul li {
          font-size: 14px;
          font-weight: 500;
          color: #000000;
          padding: 12px 0 12px 40px;
          position: relative;
        }
        .bltnnews_lefttp_ctlists ul li:before,
        .bltnnews_lefttp_ctlists ul li:after {
          content: '';
          position: absolute;
          display: block;
          z-index: 1;
        }
        .bltnnews_lefttp_ctlists ul li:before {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/ctlisticon_smal_1614855192.png)
            0px 0px no-repeat;
          width: 20px;
          height: 20px;
          left: 12px;
          top: 11px;
        }
        .bltnnews_lefttp_ctlists ul li:after {
          width: 5px;
          height: 5px;
          top: 16px;
          right: 15px;
          border-left: 2px solid #999;
          border-bottom: 2px solid #999;
          transform: rotate(-45deg);
        }
        .bltnnews_lefttp_ctlists ul li a {
          display: block;
        }
        .bltnnews_lefttp_ctlists ul li:hover,
        .bltnnews_lefttp_ctlists ul li.showinsddstct {
          background: #ee1b24;
          font-weight: 800;
          color: #fff;
        }
        .bltnnews_lefttp_ctlists ul li div a.red-background {
          background: #ee1b24;
          font-weight: 800;
          color: #fff;
          position: relative;
        }
        .bltnnews_lefttp_ctlists ul li div a.red-background:before {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/ctlisticon_smal_1614855192.png)
            0px 0px no-repeat;
          width: 20px;
          height: 20px;
          left: 12px;
          top: 11px;
          position: absolute;
          content: '';
          filter: brightness(0) invert(1) !important;
        }
        .bltnnews_lefttp_ctlists ul li:hover:before,
        .bltnnews_lefttp_ctlists ul li:hover:after,
        .bltnnews_lefttp_ctlists ul li.showinsddstct:before,
        .bltnnews_lefttp_ctlists ul li.showinsddstct:after {
          filter: brightness(0) invert(1);
        }
        .bltnnews_lefttp_ctlists ul li:hover a {
          filter: brightness(0) invert(1);
        }
        .insddstct {
          display: none;
          background: #f5f5f5;
          margin: 12px 0 -12px -40px;
          padding: 12px 12px 12px 32px;
        }
        .insddstct a {
          display: block;
          font-size: 15px;
          font-weight: 500;
          color: #000000;
          padding: 8px 0 8px 40px;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/ctlisticon_smal_1614855192.png)
            12px 8px no-repeat;
          filter: none !important;
        }
        .bltnnews_lefttp_ctlists ul li.showinsddstct .insddstct {
          display: block;
        }
        .noarrow::after {
          display: none !important;
        }
        // .red-background {
        //     background: #ee1b24;
        //     font-weight: 800;
        //     filter: brightness(0) invert(1);
        // }
        // // .red-background {
        // // }
      `}</style>
    </>
  );
}
