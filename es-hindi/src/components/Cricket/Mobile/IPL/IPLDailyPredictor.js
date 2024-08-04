const IPLDailyPredictor = ({}) => {
  return (
    <>
        <div className="daily_predictor">
            <div className="daily_predictor_top">
                <p><span>IPL</span>Daily Predictor</p>
            </div>
        </div>
        <style jsx global>{`
        .daily_predictor {
            width: 100%;
            height: auto;
            background: #003E66 0% 0% no-repeat padding-box;
            margin: 10px 0;
        }
        .daily_predictor_top {
            display: flex;
            align-items: center;
            padding: 10px 5px 20px 15px;
            justify-content: space-between;
        }
        .daily_predictor_top p {
            color: #FFFFFF;
            font-size: 22px;
            text-transform: uppercase;
            font-weight: 300;
        }
        .daily_predictor_top p span {
            font-size: 22px;
            color: #FFAE00;
            font-weight: bold;
            line-height: 25px;
            display: block;
        }
        `}</style>
    </>
  );

};

export default IPLDailyPredictor;
