const IPLPointTable = ({ tableData }) => {

    const headerArr = [
        { id: 2, name: "Teams" },
        { id: 3, name: "Matches" },
        { id: 4, name: "Points" },
        { id: 5, name: "NRR" },
    ];
    const teamsURLIdByTeamId = {
        2955: "gujarat-titans-gt",
        1110: "rajasthan-royals-rr",
        2954: "lucknow-super-giants-lsg",
        1105: "royal-challengers-bangalore-rcb",
        1109: "delhi-capitals-dc",
        1107: "punjab-kings-pbks",
        1106: "kolkata-knight-riders-kkr",
        1379: "sunrisers-hyderabad-srh",
        1108: "chennai-super-kings-csk",
        1111: "mumbai-indians-mi",
      };

    return (
        <>
        <div className="iplcaps-table">
            <h3 className="ipl_headin_g">अंक तालिका</h3>
            <table className="match-table">
                <tbody>
                    <tr>
                        {headerArr.map((col) => (
                            <th key={col.id}>{col.name}</th>
                        ))}
                    </tr>
                    {tableData.map((data) => {
                        const redirectionURL = teamsURLIdByTeamId[data.id] + "/";
                        return (
                            <tr key={data.id}>
                                <td>
                                    <a href={`/cricket/ipl/${redirectionURL}`}>
                                        <div className="playerbox">
                                            <div className="img flag_s">
                                                <img
                                                    loading="lazy"
                                                    src={`https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/${data.id}.png`}
                                                    data-src={`https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/90x50/${data.id}.png`}
                                                    alt="ipl"
                                                    width="42"
                                                    height="24"
                                                />
                                            </div>
                                            <div className="txt">
                                                <h3 className={`playername team_name_${data.id}`}>{data.name}</h3>
                                            </div>
                                        </div>
                                    </a>
                                </td>
                                <td>{data.p}</td>
                                <td>{data.pts}</td>
                                <td>{data.nrr}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <a href="/cricket/ipl/points-table/" className="full_tbl">पूरी तालिका [+]</a>
	    </div>
        <div className="clearfix vsp20"></div>
        <style jsx global>{`
        .iplcaps-table {
            border-bottom: 4px solid #eeeeee;
        }
        .ipl_headin_g {
            margin-bottom: 4px;
            padding: 0 10px;
            font-size: 26px;
            line-height: 24px;
            color: #eb3d3c;
            position: relative;
            font-weight: 700;
            text-transform: uppercase;
        }
        .match-table {
            width: 100%;
            font-size: 13px;
        }
        .match-table tr th {
            background: #001D42 !important;
            color: #fff !important;
            text-transform: uppercase;
            padding: 10px;
            line-height: 14px;
            font-size: 12px;
        }
        .match-table tr:nth-child(odd) {
            background: #F5F5F5;
        }
        .match-table tr th:nth-child(1), .match-table tr td:nth-child(1) {
            text-align: left;
        }
        .match-table tr td .playerbox {
            display: flex;
            align-items: center;
        }
        .flag_s {
            width: 42px!important;
            height: 24px!important;
            background: 0 0!important;
            border-radius: initial!important;
            box-shadow: none!important;
        }
        .match-table tr td .playerbox .img img {
            width: 100%;
        }
        .match-table tr td .playerbox .txt .playername {
            font-size: 13px;
            text-transform: capitalize;
            text-decoration: underline;
        }
        .team_name_2955 {
            color: #ff4233 !important;
        }
        .team_name_1110 {
            color: #1f3a76 !important;
        }
        .team_name_2954 {
            color: #ff4233 !important;
        }
        .team_name_1105 {
            color: #1e1e1e !important;
        }
        .team_name_1109 {
            color: #0355a2 !important;
        }
        .team_name_1107 {
            color: #d33f25 !important;
        }
        .team_name_1106 {
            color: #482863 !important;
        }
        .team_name_1379 {
            color: #ff4233 !important;
        }
        .match-table tr td .playerbox .img {            
            margin-right: 15px;            
            overflow: hidden;
        }
        .match-table tr td {
            padding: 5px 10px;
            height: 30px;
            vertical-align: middle;
            color: #001d42;
            border-bottom: 2px solid #D8D8D8;
            text-align: center;
        }
        .full_tbl {
            display: block;
            text-align: center;
            margin: 10px auto;
            width: 60%;
            border: 2px solid #E1261C;
            border-radius: 20px;
            height: 28px;
            line-height: 28px;
            color: #E1261C;
            font-size: 14px;
            font-weight: bold;
        }
        `}</style>
    </>
  );

};

export default IPLPointTable;
