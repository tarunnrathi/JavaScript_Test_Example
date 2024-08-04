import { getEngDistrictList } from "api/global/Common";
import { formatText } from "includes/_app.util";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { getDistrictListArr } from "api/Constant";

const StateDistrictSelect = (props) => {
    const router = useRouter();
    const [list, setList] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [urlCity, setUrlCity] = useState(router?.query.city);
    const urlState = router?.query?.state;

    const handleStateSelect = (itm) => {
        setSelectedState(itm)
        document.getElementById("newhdrlnghover").style.display = "none"

        setSelectedDistrict(list.filter(item => item.statename === itm));
        setSelectedCity("");
        setUrlCity("");
    };

    const handleMouseEnter = (text = "") => {
        if (text === "city") {
            document.getElementById("cityDropDown").style.display = "block"
        } else {
            document.getElementById("newhdrlnghover").style.display = "block"
        }
    }
    const handleMouseOut = () => {
        document.getElementById("newhdrlnghover").style.display = "none"
    }

    useEffect(() => {
        (async () => {
            const data = await getEngDistrictList();
            setList(data || []);
            if (urlCity) {
                setSelectedDistrict(data.filter(item => item.statename === formatDisplayText(urlState)));
            }
        })();
    }, []);

    const formatDisplayText = (text) => {
        if (text && text != undefined)
            return text
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());
        else return "";
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        if (selectedState || urlState) {
            // Update the URL with both state and city
            router.push(`/local18/?state=${formatText(selectedState || urlState)}&city=${formatText(city)}`, undefined, { shallow: true });
        }
        document.getElementById("cityDropDown").style.display = "none"
    };
    return (
        <>
            <div className="selec_drp">
                <h3>SEARCH YOUR STATE/DISTRICT:</h3>
                <div className="seldrp_wrp">
                    <div className="newchoosecitywrap" onMouseLeave={handleMouseOut} onMouseEnter={handleMouseEnter}>
                        <span className="newchoosecitybtn" onClick={handleMouseEnter}>{selectedState || formatDisplayText(urlState) || "Select State"}</span>
                        {list.length > 0 ? <div id="newhdrlnghover" className="newhdrlnghover">
                            <div>
                                {getDistrictListArr.map((item, index) =>
                                    <span onClick={() => handleStateSelect(item)} key={`stglst-${index}`}>{item}</span>
                                )}
                            </div>
                        </div> : ""}
                    </div>
                    <div className="newchoosecitywrap">
                        <span className={`newchoosecitybtn ${selectedState || urlCity ? 'activeCityBtn' : 'nonActiveCity'}`} onMouseEnter={() => handleMouseEnter("city")}>{selectedCity || formatDisplayText(urlCity) || "Select City"}</span>
                        {selectedDistrict.length > 0 ? <div className="newhdrlnghover" >
                            <div id="cityDropDown">
                                {selectedDistrict.map((item, index) =>
                                    <a onClick={() => handleCitySelect(item.districtname)} target="_blank">{item.districtname}</a>
                                )}
                            </div>
                        </div> : <div></div>}
                    </div>
                </div>
            </div>
            <style jsx>{`
        .selec_drp{ background-color: #E6E6E6; border: 1px solid #E8E8E8; height:49px; width:100%; display: flex;  align-items: center; justify-content: center;margin-top: -4px;border-bottom-left-radius: 6px;   border-bottom-right-radius: 6px; margin-bottom:15px;}
        .selec_drp h3{color: #101010; font-size:16px; line-height:19px; margin: 0 10px 0 0;}
        
        .newchoosecitybtn{width: 200px;height: 28px; line-height: 28px; color: #FC0D00; font-size: 14px;font-weight: bold; border-radius: 14px; display: block; padding: 0 12px 0 10px; position: relative; background: #FFFFFF 0% 0% no-repeat; box-shadow: 0px 3px 6px #00000029;border: 1px solid #B5B5BF;}  
        .newchoosecitybtn:after {content: ""; background-position: -250px 0px; right: 12px;background: url(https://hindi.news18.com/images/siteimages/newiconsprite_1669351342.svg) 0 0 no-repeat;width: 8px; height: 13px;position: absolute;top: 6px;}
        .newchoosecitybtn .newiconsprite.choosebtn {top: 4px;left: 10px;}
        .newchoosecitywrap:hover .newchoosecitybtn{border-radius: 4px; background: #fff;}
        .newchoosecitywrap:hover .newhdrlnghover{display: block; left: 0;right: 0; background: #fff; top: 24px}
        .newhdrlnghover div{height: 190px; overflow: auto; width: 111%;}
        .newchoosecitywrap .newiconsprite.newarrow{    background-position: -250px 0px; right: 10px;}
        .newhdrlnghover{position: absolute; overflow: hidden; background: #fff;top: 20px;left: -1px;box-shadow: 0px 2px 4px #0000001a;border: 1px solid #C4C4C4;border-radius: 0 0 4px 4px;display: none;right: -1px;border-top: none;     z-index: 1;}
        .newhdrlnghover a{font-size:13px; margin:5px 0; font-weight: normal; padding: 0 8px;color:#6A6A6A; display: block;}
        .newhdrlnghover a:hover{background: #FC0D00; color: #fff;}
        .newhdrlnghover span{font-size:13px; margin:5px 0; font-weight: normal; padding: 0 8px;color:#6A6A6A; display: block;}
        .newhdrlnghover span:hover{background: #FC0D00; color: #fff;}
        
        .newhdrlng:hover .newhdrlnghover{display:block}
        .newchoosecitywrap{position:relative; margin: 0 10px 0 0; cursor: pointer;}
        .seldrp_wrp {display: flex;}
    	@media (max-width:768px){
			.selec_drp{
				padding: 20px;
				flex-wrap: wrap;
				height: auto !important;
				display: block !important;
				text-align: center;
			}
			.seldrp_wrp {
				display: flex;
				align-items: center;
				justify-content: space-between;
				text-align: left;
				margin-top: 10px;
			}
			.seldrp_wrp .newchoosecitywrap, .seldrp_wrp .newchoosecitybtn{width: 165px;margin: 0;}
            .newhdrlnghover{border:0;}
		}
        .activeCityBtn {
            color: #FC0D00;
        }
        .nonActiveCity{
            color: #fc0d007d;
            background-color: #f3f3f3dd;
        }
        .newchoosecitywrap:hover .nonActiveCity.newchoosecitybtn {
            background: #f3f3f3dd;
            border-radius: 14px;
        }
        
        `}</style>
        </>
    )
};

export default StateDistrictSelect;