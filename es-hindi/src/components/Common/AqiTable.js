import { getStatus, sorter, trans } from "includes/aqi.helper";
import { useState } from "react";
import { arrayOnly, firePV, } from "includes/article.util";
import { logPageViewLiveScore } from 'includes/googleAnalytic';
const AirPollution = ({ data, toggel }) => {
  const [count, setCount] = useState(21);
  const [fired, setFired] = useState([]);
  const [newData,setNewData] = useState([]);
  const [flag,setFlag] = useState(false);
  const sortIt = (dir, field, data) => {    
    if(field === "name"){
      dir? data.sort((a,b)=>{
        if(a.locationName < b.locationName) { return -1; }
      }):
      data.sort((a,b)=>{
        if(a.locationName > b.locationName) { return -1; }
      })
      setNewData(data);
      setFlag(!flag);
    }
    if(field === "aqi"){
      dir? data.sort((a, b) => {
        return parseInt(b?.airComponents[0]?.sensorData || b?.airComponents[1]?.sensorData) - parseInt(a?.airComponents[0]?.sensorData || a?.airComponents[1]?.sensorData)
      }
      ):
      data.sort((a, b) => {
        return parseInt(a?.airComponents[0]?.sensorData || a?.airComponents[1]?.sensorData) - parseInt(b?.airComponents[0]?.sensorData || b?.airComponents[1]?.sensorData)
      }
      );
      setNewData(data);
      setFlag(!flag);
    }
    if(field === "temp"){
      dir? data.sort((a,b)=>{
        if(a.weatherData > b.weatherData) { return -1; }
      }):
      data.sort((a,b)=>{
        if(a.weatherData < b.weatherData) { return -1; }
      })
      setNewData(data);
      setFlag(!flag);
    }
    if(field === "humid"){
      dir? data.sort((a,b)=>{
        if(a.humidity > b.humidity) { return -1; }
      }):
      data.sort((a,b)=>{
        if(a.humidity < b.humidity) { return -1; }
      })
      setNewData(data);
      setFlag(!flag);
    }
    if(field === "pm25"){      
      dir?  data.sort((a, b) => {                
        let A = null;
        let B = null;
        if (Array.isArray(a?.airComponents))
          A = a?.airComponents?.find((e) => e.sensorName === "pm25");
        else {
          A = Object.keys(a.airComponents).map((key) => a.airComponents[key]);
          A = A?.find((e) => e.sensorName === "pm25")||{
            "sensorName": "pm25",
            "sensorData": 0,
            "senDevId": "pm25",
            "sensorUnit": "µg/m³"
            };
        }
        if (Array.isArray(b?.airComponents))
          B = b?.airComponents?.find((e) => e.sensorName === "pm25");
        else {
          B = Object.keys(b.airComponents).map((key) => b.airComponents[key]);
          B = B?.find((e) => e.sensorName === "pm25")||{
            "sensorName": "pm25",
            "sensorData": 0,
            "senDevId": "pm25",
            "sensorUnit": "µg/m³"
            };
        }        
        return B?.sensorData - A?.sensorData;
      }):
      data.sort((a, b) => {                
        let A = null;
        let B = null;
        if (Array.isArray(a?.airComponents))
          A = a?.airComponents?.find((e) => e.sensorName === "pm25");
        else {
          A = Object.keys(a.airComponents).map((key) => a.airComponents[key]);
          A = A?.find((e) => e.sensorName === "pm25")||{
            "sensorName": "pm25",
            "sensorData": 0,
            "senDevId": "pm25",
            "sensorUnit": "µg/m³"
            };
        }
        if (Array.isArray(b?.airComponents))
          B = b?.airComponents?.find((e) => e.sensorName === "pm25");
        else {
          B = Object.keys(b.airComponents).map((key) => b.airComponents[key]);
          B = B?.find((e) => e.sensorName === "pm25")||{
            "sensorName": "pm25",
            "sensorData": 0,
            "senDevId": "pm25",
            "sensorUnit": "µg/m³"
            };
        }        
        return A?.sensorData - B?.sensorData;
      });
      setNewData(data);
      setFlag(!flag);
    }
    if(field === "pm10"){      
      dir?  data.sort((a, b) => {                
        let A = null;
        let B = null;
        if (Array.isArray(a?.airComponents))
          A = a?.airComponents?.find((e) => e.sensorName === "pm10");
        else {
          A = Object.keys(a.airComponents).map((key) => a.airComponents[key]);
          A = A?.find((e) => e.sensorName === "pm10")||{
            "sensorName": "pm10",
            "sensorData": 0,
            "senDevId": "pm10",
            "sensorUnit": "µg/m³"
            };
        }
        if (Array.isArray(b?.airComponents))
          B = b?.airComponents?.find((e) => e.sensorName === "pm10");
        else {
          B = Object.keys(b.airComponents).map((key) => b.airComponents[key]);
          B = B?.find((e) => e.sensorName === "pm10")||{
            "sensorName": "pm10",
            "sensorData": 0,
            "senDevId": "pm10",
            "sensorUnit": "µg/m³"
            };
        }      
        return B?.sensorData - A?.sensorData;
      }):
      data.sort((a, b) => {                
        let A = null;
        let B = null;
        if (Array.isArray(a?.airComponents))
          A = a?.airComponents?.find((e) => e.sensorName === "pm10");
        else {
          A = Object.keys(a.airComponents).map((key) => a.airComponents[key]);
          A = A?.find((e) => e.sensorName === "pm10")||{
            "sensorName": "pm10",
            "sensorData": 0,
            "senDevId": "pm10",
            "sensorUnit": "µg/m³"
            };
        }
        if (Array.isArray(b?.airComponents))
          B = b?.airComponents?.find((e) => e.sensorName === "pm10");
        else {
          B = Object.keys(b.airComponents).map((key) => b.airComponents[key]);
          B = B?.find((e) => e.sensorName === "pm10")||{
            "sensorName": "pm10",
            "sensorData": 0,
            "senDevId": "pm10",
            "sensorUnit": "µg/m³"
            };
        }        
        return A?.sensorData - B?.sensorData;
      });
      setNewData(data);
      setFlag(!flag);
    }     
  };  
  // const anchorHandler = (e, name) => {
  //   e.preventDefault();
  //   history.replaceState(
  //     {},
  //     "",
  //     `/aqi-india/${name.toLowerCase().replace(/\s/gi, "-")}`
  //   );
  //   if (!fired.includes(name)) {
  //     setTimeout(() => logPageViewLiveScore(name), 500);
  //     self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "6683813" });
  //     if (typeof OBR !== "undefined") {
  //       OBR.extern.researchWidget();
  //     }
  //     firePV();
  //     setFired((p) => [...p, name]);
  //   }
  //   setListing((prev) => ({
  //     ...prev,
  //     main: prev.data.find((i) => i.locationName == name),
  //     // selected: prev.cities.filter((i) => i.stateName == name),
  //     stateName: name,
  //   }));
  //   return false;
  // };
  // console.log("data=>>>",data);
  // console.log("data Slice=>>>",data.slice(0,count));
  return (
    <>
      <table className="aqiTable">
        <thead>
          <tr>
            <th>
              <div className="tableHeading">
                <div className="txt">locations</div>
                <div className="filterIcon">
                  <button onClick={() => sortIt(true, "name", data)}></button>
                  <button onClick={() => sortIt(false, "name", data)}></button>
                </div>
              </div>
            </th>
            <th>
              <div className="tableHeading">
                <div className="txt">status</div>
                <div className="filterIcon">
                  <button onClick={() => sortIt(true, "aqi", data)}></button>
                  <button onClick={() => sortIt(false, "aqi", data)}></button>
                </div>
              </div>
            </th>
            <th>
              <div className="tableHeading">
                <div className="txt">aqi-us</div>
                <div className="filterIcon">
                  <button onClick={() => sortIt(true, "aqi", data)}></button>
                  <button onClick={() => sortIt(false, "aqi", data)}></button>
                </div>
              </div>
            </th>
            <th>
              <div className="tableHeading">
                <div className="txt">pm2.5</div>
                <div className="filterIcon">
                  <button onClick={() => sortIt(true, "pm25", data)}></button>
                  <button onClick={() => sortIt(false, "pm25", data)}></button>
                </div>
              </div>
            </th>
            <th>
              <div className="tableHeading">
                <div className="txt">pm10</div>
                <div className="filterIcon">
                  <button onClick={() => sortIt(true, "pm10", data)}></button>
                  <button onClick={() => sortIt(false, "pm10", data)}></button>
                </div>
              </div>
            </th>
            <th>
              <div className="tableHeading">
                <div className="txt">temp</div>
                <div className="filterIcon">
                  <button onClick={() => sortIt(true, "temp", data)}></button>
                  <button onClick={() => sortIt(false, "temp", data)}></button>
                </div>
              </div>
            </th>
            <th>
              <div className="tableHeading">
                <div className="txt">humid</div>
                <div className="filterIcon">
                  <button onClick={() => sortIt(true, "humid", data)}></button>
                  <button onClick={() => sortIt(false, "humid", data)}></button>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {(toggel? data || [] : flag? newData || [] : data || [])?.slice(0,count).map((item) => {
              item.airComponents = arrayOnly(item.airComponents);
              const air = item.airComponents.find(
                (i) => i.sensorUnit == "AQI-US"
              );
              const pm2 = item.airComponents.find((i) => i.sensorName == "pm25");
              const pm10 = item.airComponents.find((i) => i.sensorName == "pm10");
              const t = item.weatherData;
              const h = item.humidity;
              const status = getStatus(air?.sensorData);
              if (!air) {
                return null;
              }
              return (
                <tr key={item.locationName?.toLowerCase().replace(/ /gi, "-")}>
                  <td>
                    <a
                      // onClick={(e) => anchorHandler(e, item.locationName)}
                      href={`/aqi-india/${item.locationName
                        .toLowerCase()
                        .replace(/\s/gi, "-")}/`}
                    >
                      {trans(item.locationName)}
                    </a>
                  </td>
                  <td className={status}>
                    {`${status[0].toUpperCase()}${status.slice(1)}`}{" "}
                  </td>
                  <td className={`aqi_us ${status}`}>{air?.sensorData}</td>
                  <td> {pm2?.sensorData} </td>
                  <td> {pm10?.sensorData} </td>
                  <td> {t} </td>
                  <td> {h} </td>
                </tr>
              );
            })}            
        </tbody>
      </table>
      {count < (toggel? data || [] : flag? newData || [] : data || []).length ? (
        <div
          className="load-more-btn-sec"
          onClick={() => setCount((prev) => prev * 2)}
        >
          <a className="load-more-btn">Load More+</a>
        </div>
      ) : null}
      <style>{`
        .load-more-btn {
            color: #FFFFFF;
            text-transform: uppercase;
            font-size: 12px;
            width: auto;
            padding: 5px 10px;
            background: #E1261D 0% 0% no-repeat padding-box;
            border-radius: 5px;
            cursor: pointer;
        }
        .load-more-btn-sec {
            text-align: center;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
            margin-top: 10px;
        }
        .load-more-btn:hover {
            color: #fff;
        }
      `}</style>
    </>
  );
};
export default AirPollution;