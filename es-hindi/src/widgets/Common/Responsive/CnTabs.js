const CnTabs = (props) => {

    const isAmp = props?.isAmp;
    return (
            <>
            {!isAmp? <> <ul className="tmrnk-tab">
                {props.tabs.map((tab) => {
                    const active = (tab === props.selected ?"active":'');
                    return (
                        <li className={`cnTabLinks ${active}`} key={tab} onClick={() => props.selectHandler(tab)}>
                            <a> {tab}</a>
                        </li>
                    );
                })}
            </ul>
            {props.children}</> : <>
            <ul className="tmrnk-tab">
                {props.tabs.map((tab) => {
                    const active = (tab === props.selected ?"active":'');
                    return (tab === 'टी20'?
                            <li className={`cnTabLinks ${active}`} key={tab} onClick={() => props.selectHandler(tab)}>
                            <a> {tab}</a>
                        </li> :<li >
                            <a href={tab==='टेस्ट'?'/cricket/test-ranking.html' :"/cricket/odi-ranking.html" } > {tab}</a>
                        </li>

                    );
                })}
            </ul>
            {props.children}
            </> }

            </>
    );
};

export default CnTabs;
