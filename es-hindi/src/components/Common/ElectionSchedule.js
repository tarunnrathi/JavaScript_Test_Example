import { useState } from "react";

const ElectionSchedule = () => {
  const [currentIndex, setIndex] = useState(0);

  const events = [
    "मतदान कार्यक्रम",
    "अधिसूचना जारी होने की तारीख",
    "नामांकन की अंतिम तारीख",
    "नामांकन पत्रों की जांच",
    "नामांकन वापसी की अंतिम तारीख",
    "मतदान",
    "मतगणना",
    "चुनाव प्रक्रिया समापन"
  ];

  const electionData = [
    {
      stateName: 'राजस्थान चुनाव',
      stateSubHeading: 'राजस्थान विधानसभा 2023 चुनाव तारीख',
      stateData: [
        "सभी 200 निर्वाचन क्षेत्र",
        "30 अक्टूबर, 2023",
        "6 नवंबर, 2023",
        "7 नवंबर, 2023",
        "9 नवंबर, 2023",
        "25 नवंबर, 2023",
        "3 दिसंबर, 2023",
        "5 दिसंबर, 2023"
      ]
    },
    {
      stateName: 'मध्य प्रदेश चुनाव',
      stateSubHeading: 'मध्य प्रदेश विधानसभा 2023 चुनाव तारीख',
      stateData: [
        "सभी 230 निर्वाचन क्षेत्र",
        "21 अक्टूबर, 2023",
        "30 अक्टूबर, 2023",
        "31 अक्टूबर, 2023",
        "2 नवंबर, 2023",
        "17 नवंबर, 2023",
        "3 दिसंबर, 2023",
        "5 दिसंबर, 2023"
      ]
    },
    {
      stateName: 'छत्तीसगढ़ चुनाव',
      stateSubHeading: 'छत्तीसगढ़ विधानसभा 2023 चुनाव तारीख',
      stateData: [
        "प्रथम चरण (20 निर्वाचन क्षेत्र)",
        "13 अक्टूबर, 2023",
        "20 अक्टूबर, 2023",
        "21 अक्टूबर, 2023",
        "23 अक्टूबर, 2023",
        "7 नवंबर, 2023",
        "3 दिसंबर, 2023",
        "5 दिसंबर, 2023",
        "द्वितीय चरण (70 निर्वाचन क्षेत्र)",
        "21 अक्टूबर, 2023",
        "30 अक्टूबर, 2023",
        "31 अक्टूबर, 2023",
        "2 नवंबर, 2023",
        "17 नवंबर, 2023",
        "3 दिसंबर, 2023",
        "5 दिसंबर, 2023"
      ]
    },
    {
      stateName: 'मिज़ोरम चुनाव',
      stateSubHeading: 'मिज़ोरम विधानसभा 2023 चुनाव तारीख',
      stateData: [
        "सभी 40 निर्वाचन क्षेत्र",
        "13 अक्टूबर, 2023",
        "20 अक्टूबर, 2023",
        "21 अक्टूबर, 2023",
        "23 अक्टूबर, 2023",
        "7 नवंबर, 2023",
        "4 दिसंबर, 2023",
        "5 दिसंबर, 2023"
      ]
    },
    {
      stateName: 'तेलंगाना चुनाव',
      stateSubHeading: 'तेलंगाना विधानसभा 2023 चुनाव तारीख',
      stateData: [
        "सभी 119 निर्वाचन क्षेत्र",
        "3 नवंबर, 2023",
        "10 नवंबर, 2023",
        "13 नवंबर, 2023",
        "15 नवंबर, 2023",
        "30 नवंबर, 2023",
        "3 दिसंबर, 2023",
        "5 दिसंबर, 2023"
      ]
    }
  ];
  const changeTable = (tablePosition) => {

    if (tablePosition >= 0 && tablePosition !== 5)
      setIndex(tablePosition);
  }
  return (
    <>
      <div className="widgetContainer">
        <table className="elec_tab">
          <tbody>
            <tr className="arrow_ico">
              <th colSpan={electionData[currentIndex]?.stateName === "छत्तीसगढ़ चुनाव" ? 3 : 2}>
                <span className="arr_lf" onClick={() => changeTable(currentIndex - 1)}></span>
                {electionData[currentIndex].stateName}
                <span className="arr_rt" onClick={() => changeTable(currentIndex + 1)}></span>
              </th>
            </tr>
            <tr>
              <td colSpan={electionData[currentIndex]?.stateName === "छत्तीसगढ़ चुनाव" ? 3 : 2}>
                {electionData[currentIndex]?.stateSubHeading}
              </td>
            </tr>

            {electionData[currentIndex]?.stateName !== "छत्तीसगढ़ चुनाव" ? electionData[currentIndex]?.stateData?.map((item, index) =>
              <tr key={`state-${index}`}>
                <td>{events[index]}</td>
                <td>{item}</td>
              </tr>
            ) :
              electionData[currentIndex]?.stateData?.slice(0, 8).map((item, index) =>
                <tr key={`state-${index}`}>
                  <td>{events[index]}</td>
                  <td>{item}</td>
                  <td>{electionData[currentIndex]?.stateData[8 + index]}</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      <style jsx global>
        {`
        .widgetContainer {
          margin: 10px 0px;
        }
        .elec_tab {          
          border-collapse: collapse;
          width: 100%;
          text-align: center;
          line-height: 1.3;
        }        
        .elec_tab td, #elec_tab th {
          border: 1px solid #b3b0b0;
          padding: 8px;
          font-size: 12px;
        }
        .elec_tab th {
          padding-top: 12px;
          padding-bottom: 12px;  
          background-color: #f73f00;
          color: white;
          font-size: 20px;
        }
        .elec_tab tr:nth-child(2), #elec_tab tr:nth-child(3){font-weight: bold;}
        tr.arrow_ico {
            position: relative;
        }
        span.arr_lf {
            position: absolute;
            width: 15px;
            height: 15px;
            border-bottom: 5px solid;
            border-left: 5px solid;
            transform: rotate(45deg);
            left: 15px;
            top: 14px;
            border-color: #fff;
            cursor:pointer;
        }
        span.arr_rt {
            position: absolute;
            width: 15px;
            height: 15px;
            border-bottom: 5px solid;
            border-right: 5px solid;
            transform: rotate(-45deg);
            right: 12px;
            top: 14px;
            cursor:pointer;
        }
        @media (max-width:768px){
          .widgetContainer {
            margin: 0px 10px;
          }
        }
        .elec_tab tr:nth-child(8) {
          font-weight: bold;
        }
      `}
      </style>
    </>
  )
}

export default ElectionSchedule;