import { useState } from "react";
const T20WorldCupMenu = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const menu = [
        {
            "label": "T20 WORLD CUP",
            "url": "/cricket/icc-t20-world-cup/",
            "is_new_window": "1"
        },
        {
            "label": "शेड्यूल",
            "url": "/cricket/icc-t20-world-cup/schedule/",
            "is_new_window": "1"
        }
    ]
    return (
        <>
        <div className="CN-menu2-wrapper">
            <div className="CN-menu2-inner">
                <ul className="CN-menu2">
                    {menu?.map((item, index) => {
                        return (
                            index === 0
                                ? <li>
                                    <a
                                    
                                        href={item?.url}
                                        onClick={() => {
                                            setActiveIndex(index);
                                            ga("send", "event", "Navigation", "Click", `Top Nav - ${item.label}`)
                                        }}
                                        className="series-navBtn"
                                    >{item.label}</a>

                                </li>
                                : <li className={activeIndex === index ? "active" : ""}>
                                    <a
                                        href={item?.url}
                                        onClick={() => {
                                            setActiveIndex(index);
                                            ga("send", "event", "Navigation", "Click", `Top Nav - ${item.label}`)
                                        }}
                                    >{item.label}</a>
                                </li>
                        )
                    })}
                </ul>
            </div>
        </div>
        <style jsx global>{`
        .CN-menu2-wrapper .series-navBtn{
            font-size: 14px;
            font-family: 'Mukta',sans-serif;
            font-weight: bold;
            padding: 4px 10px;
            background: #e1261d;
            color: #fff;
            display: flex;
            text-transform: uppercase;
            border-radius: 5px;
            margin-right: 15px;
            align-self: center;
          }

        `}</style>
        </>

    )

};

export default T20WorldCupMenu;
