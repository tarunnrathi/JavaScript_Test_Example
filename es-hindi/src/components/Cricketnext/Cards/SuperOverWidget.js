const SuperOverWidget = ({ data }) => {
  if(!data || data.length === 0) {
    return null;
  }
  return (
      <>
        {data.map((item, index) => {
            return (
                <div className="socrebox superOverWrap" id={`superOverWrap-${index + 1}`}>
                  <div className={`scrbxinr widget-team-one-${index + 1}'`}>
                    <div className="tmtx">
                      <div className="matchScore">
                        <h4 className="teamRun superScoreInnFirstL">
                          {item.teamOneScore}
                          <span>({item.teamOneValue})</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="SuperOver_text">
                    <span>
                      SUPER
                      <br />
                      OVER
                    </span>
                  </div>
                  <div className={`scrbxinr widget-team-two-${index + 1}`} >
                    <div className="tmtx">
                      <div className="matchScore">
                        <h4 className="teamRun superScoreInnFirstR">
                          {item.teamTwoScore}
                          <span>({item.teamTwoValue})</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
            );
        })}
      </>
  );
};

export default SuperOverWidget;
