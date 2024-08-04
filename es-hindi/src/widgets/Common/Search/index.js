import React, { useEffect, useState,useContext } from "react";
import SearchActivationScreen from "./SearchActivationScreen";
import SearchInitializationScreen from "./SearchInitializationScreen";
import SearchResultScreen from "./SearchResultScreen";
import { logEventNew } from "includes/googleAnalytic";
import { getTagsSearchList } from "api/global/Common";
import HindiGlobalContext from "HindiGlobalContext";


function highlightText(searchTerm, text) {
    // Get all the list items
    const searchTermLower = searchTerm.toLowerCase();
    const textLower = text.toLowerCase();
    const startIndex = textLower.indexOf(searchTermLower);
    if (startIndex < 0) {
        return text;
    }
    const endIndex = startIndex + searchTermLower.length;
    return text.slice(0, startIndex) + '<b>' + 
        text.slice(startIndex, endIndex) + '</b>' + 
        text.slice(endIndex);
     
}

  
var timer = null;
const Search = ( { isMobile, handleClose ,pageType: pType}) => {
    let { pageType } = useContext(HindiGlobalContext);
    if(pType) {
        pageType = pType
    }
    const [step, setStep] = useState(1);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [suggestionList, setSuggestionList] = useState([]);

    const localStorageUpdate = (slug) => {
        const searchTerm = (slug || search).trim();
        let searchItem = JSON.parse(localStorage.getItem("searchItem") || "[]");
        if(searchItem.indexOf(searchTerm) > -1) {
            const tempIndex = searchItem.indexOf(search);
            searchItem.splice(tempIndex, 1);
            searchItem.push(searchTerm)
        } else if(searchItem.length === 5) {
            searchItem = searchItem.slice(1,5);
            searchItem.push(searchTerm);
        } else {
            searchItem.push(searchTerm)
        }
        localStorage.setItem("searchItem", JSON.stringify(searchItem))
    }
    const handleSearch = () => {
        if(search.length > 3) {
            // setSuggestionList([]);
            setError("")
            setStep(3);
            // handle store search in localStorage
            localStorageUpdate();
            setSuggestionList([]);
            
        } else {
            setError("कृपया खोजने के लिए न्यूनतम 4 अक्षर दर्ज करें")
        }
    };
    const handleRecentclick = ({ value = ""}) => {
        logEventNew("Search Button", "click", `${pageType}, हाल की खोज : ${value},  ,${isMobile ? "mobile" : "desktop"}`)
        setSearch(value);
        setError("")
        setStep(3);
        // handle store search in localStorage
        localStorageUpdate();
      
    }
    const handleTopicSearch = (slug) => {
        localStorageUpdate(slug);
        window.location.href = "/tag/"+slug+"/"
    };
    const callSuggestionApi = (value) => {
        //call api and save result
        getTagsSearchList(value?.toLowerCase()).then(res => {
            step !== 3 && setSuggestionList(res);
        })
    }
    const handleOnChange = ({ value }, e) => {
        if(e?.keyCode === 13) {
            handleSearch();
            setSuggestionList([]);
            return;
        }
        setStep(2)
        setSearch(value)
    }
    useEffect(() => {
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
        // call api;
            search.length > 2 ? callSuggestionApi(search) : setSuggestionList([]);
            timer = null;
        }, 300)
    
    }, [search])
    useEffect(() => {
        logEventNew("Search Button", "click", `${pageType}, popup box open, ${isMobile ? "mobile" : "desktop"}`)
        setStep(1);
        document.body.style.overflow = "hidden";

        document.getElementById("overlay").style.display = "block";
        document.getElementById("search-input") && document.getElementById("search-input")
            .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("search-input").value.length > 3 && logEventNew("Search Button", "click", `${pageType}, search term: ${document.getElementById("search-input").value}, ${isMobile ? "mobile" : "desktop"}`)
                document.getElementById("search-button").click();
                setSuggestionList([]);
            }
        });
        return () => {
            document.body.style.overflow = "auto";
            document.getElementById("search-input") && document.getElementById("search-input")
            .removeEventListener("keyup")
            logEventNew("Search Button", "click", `${pageType}, popup box closed, ${isMobile ? "mobile" : "desktop"}`)
            
        }
    }, [])
    
    return(<>
    {/* <div className="ovrly_box"></div> */}
    <div id="overlay"></div>

    <div id="search-box">
        <span className="mclose" onClick={() => handleClose()}></span>
        {isMobile ?<>
            <div className="mob_srchwrap">
                <span className="sarrow-left" onClick={() => handleClose()}></span>
                <div className={`${suggestionList.length > 0 ? "search_open" : ""} srch_wrap`}>
                    <input type="text" id="search-input" placeholder="Search News, Videos, Photos and More" value={search} onFocus={() => setStep(search.length > 0 ? (step === 3 ? 3 : 2) : 2)} onChange={(e) => handleOnChange(e.target, e)}  />
                    {error && <p className="err_msg">{error}</p>}
                    <ul className="srsult" id="tag-result">
                        { step !==3 && suggestionList.length > 0 && suggestionList.map((item, index) => (
                        
                                <li onClick={() => handleTopicSearch(item.slug)} key={`searc-${index}`}>
                                    <span onClick={() => handleTopicSearch(item.slug)} dangerouslySetInnerHTML={{ __html: highlightText(search, item.name) }}></span>
                                </li>
                            
                        ))}
                    </ul>
                    <button className="srch_btn" id="search-button" onClick={handleSearch}></button>
                    {search.length > 0 && <span className="sclose" onClick={() => {setSearch(); setStep(2);}}></span>}
                </div>
            </div>
        </> :
        <div className={`${suggestionList.length > 0 ? "search_open" : ""} srch_wrap search_search_term`}>
            <input type="text" id="search-input" placeholder="Search News, Videos, Photos and More" value={search} onFocus={() => setStep(2)} onChange={(e) => handleOnChange(e.target, e)} className="search_search_term"  />
            {error && <p className="err_msg">{error}</p>}
            <ul className="srsult" id="tag-result">
                { step !==3 && suggestionList.length > 0 && suggestionList.map((item, index) => (
                
                        <li onClick={() => handleTopicSearch(item.slug)} key={`searc-${index}`}>
                            <span dangerouslySetInnerHTML={{ __html: highlightText(search, item.name) }}></span>
                        </li>
                    
                ))}
            </ul>
            <button className="srch_btn" id="search-button" onClick={handleSearch}></button>
            {search.length > 0 && <span className="sclose" onClick={() => {setSearch(""); setStep(2);}}>Clear</span>}
        </div>}
        {/* <SearchInitializationScreen /> */}
        {step === 1 && <div className="grid_wrap"><SearchInitializationScreen pageType={pageType} isMobile={isMobile} /> </div>}
        {step === 2 && <div className="grid_wrap"><SearchActivationScreen setSuggestionList={() => setSuggestionList([])} pageType={pageType} isMobile={isMobile} handleSearch={handleRecentclick} /> </div>}
        {step === 3 && <div className="grid_wrap"><SearchResultScreen pageType={pageType} search={search} /></div> } 
    </div>
    <style jsx global>{`
        #overlay {
            position: fixed;
            display: none;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 50;
            cursor: pointer;
        }
        .ovrly_box{
            background-color:#707070; 
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 0;
        }
        #search-box {
            position: fixed;
            background: #fff;
            padding: 10px 10px 0 10px;
            display: block;
            box-shadow: 0 1px 2px #ccc;
            z-index: 99;
            width: 1000px;
            height: 546px;
            border-radius: 10px;
            padding: 35px 20px 20px;
            box-shadow: 0px 3px 6px #00000029;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
        
        .srch_wrap{position: relative;}
        .srch_wrap input{
            border: 1px solid #00000029;
            width: 100%;
            background-color: #fff;
            border-radius: 50px;
            height: 50px;
            padding: 0 45px;
            font-size: 14px;
            line-height: 23px;
            color: #707070;
        }
        .srch_btn {
            box-sizing: border-box;
            position: relative;
            display: block;
            transform: scale(var(--ggs,1));
            width: 14px;
            height: 14px;
            border: 2px solid;
            border-radius: 100%;
            margin-left: -4px;
            margin-top: -4px;
            position: absolute;
            top: 21px;
            left: 24px;
            background-color: #fff;
            border-color: #707070;
        }
        .srch_btn::after {
            content: "";
            display: block;
            box-sizing: border-box;
            position: absolute;
            border-radius: 3px;
            width: 2px;
            height: 7px;
            background: #707070;
            transform: rotate(-45deg);
            top: 8px;
            left: 12px
        }
        .mclose {
            cursor: pointer;
            box-sizing: border-box;
            position: relative;
            display: block;
            transform: scale(var(--ggs,1));
            width: 22px;
            height: 22px;
            border: 2px solid transparent;
            border-radius: 40px;
            position: absolute;
            right: 25px;
            top: 12px;
        }
        .sclose {
            color: #fff;
            background-color: #999999;
            -webkit-border-radius: 26px;
            -moz-border-radius: 26px;
            border-radius: 26px;
            width: auto;
            padding: 3px 13px;
            height: 30px;
            top: 10px;
            right: 7px;
            font-size: 15px;
            position: absolute;
            cursor: pointer;
            box-shadow: -1px 2px 5px 0px rgb(0 0 0 / 57%);
        }
        .sclose:hover {
            background-color: #101010a6;
        }
           
        .mclose::after,
        .mclose::before {
            content: "";
            display: block;
            box-sizing: border-box;
            position: absolute;
            width: 16px;
            height: 2px;
            background: #ffffff;
            transform: rotate(45deg);
            border-radius: 5px;
            top: 8px;
            left: 1px;
        }
        .srch_wrap.search_open > input {
            -webkit-box-shadow: 0 0 0px 1000px #fff inset;
            border-radius: 5px 5px 0 0;
        }
         .mclose::after {
            transform: rotate(-45deg)
        } 
        .err_msg{font-size: 13px;  padding: 10px 30px; color: red;}
        .grid_wrap{    
            overflow-y: auto;
            max-height: 399px;
            overflow-x: hidden;
            margin-top: 20px;
        }
        .mclose {
            background-color: #3f3f3f;
            top: 5px;
            right: 5px;
        }
        .mclose::after,
        .mclose::before { background: #fff;left: 3px;width: 13px;}

        /* scrollbar css below */        
        .grid_wrap::-webkit-scrollbar {
        width: 10px;
        }
        .grid_wrap::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #DEDEDE;
        }
        .grid_wrap::-webkit-scrollbar-thumb {
        background-color: #BCBBBB;
        border-radius: 2px;
        height: 180px;
        }
        .grid_wrap::-webkit-scrollbar-thumb:hover {
        background: #898989;
        }
        figure img{border-radius: 5px !important;}
        .rslt_rhs .wgd_l .rltdnw:first-child a .topNewImgContainer figure, .rslt_rhs .wgd_l .rltdnw:first-child a .topNewImgContainer figure img {width: 400px; height: 283px;}
        .srsult {
            margin: -1px 0;
            position: relative;
            z-index: 9;
            background-color: #fff;
            border-radius: 0 0 5px 5px;
            position: absolute;
            width: 100%;
        }
        .srsult li{    cursor: pointer;
            color: #585858;
            padding: 7px 10px 7px 45px;
            border-bottom: 1px solid#0000001f;
            position: relative;}
        .srsult li:last-child {
                border-bottom: none;
            }
        .srsult li:before {
            content: "";
            box-sizing: border-box;
            position: absolute;
            display: block;
            transform: scale(var(--ggs,1));
            width: 10px;
            height: 10px;
            border: 2px solid;
            border-radius: 100px;
            color: #ddd;
            left: 20px;
            top: 16px;
        }
        .srsult li b{font-weight: 800;}
        .srsult li:hover{ color: #000; background-color: #f1f1f1;}
        .srch_wrap.search_open > .srsult{border: 1px solid #00000029; border-top: 0;}

        @media (max-width: 768px) {
            #search-box {
                width: 100%;
                right: 0;
                left: 0;
                height: 100%;
                top: 0px;
                position: fixed;
                padding: 0px 0 20px;
                z-index: 9999;
            }
            .sclose, .mclose{display: none;}
            .srch_wrap {
                flex: 1;
                position: unset;
            }
            .grid_wrap {
                overflow-y: auto;
                max-height: 100%;
                overflow-x: hidden;
                margin-top: 6px;
                padding-bottom: 66px;
            }
            .mob_srchwrap {
                padding: 8px 10px;
                background-color: #F1F1F1;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .sarrow-left {
            box-sizing: border-box;
            position: relative;
            display: block;
            transform: scale(var(--ggs,1));
            width: 15px;
            height: 22px;
            margin-right: 11px;
            }
            
            .sarrow-left::after,
            .sarrow-left::before {
            content: "";
            display: block;
            box-sizing: border-box;
            position: absolute;
            left: 3px
            }
            
            .sarrow-left::after {
            width: 8px;
            height: 8px;
            border-bottom: 2px solid;
            border-left: 2px solid;
            transform: rotate(45deg);
            bottom: 7px;
            }
            
            .sarrow-left::before {
            width: 12px;
            height: 2px;
            bottom: 10px;
            background: currentColor
            }
            .rslt_rhs .wgd_r {
                margin-bottom: 50px;
            } 
            .grid_wrap{max-height: 100%; background-color: #fff;}
            .rslt_rhs .wgd_l .rltdnw:first-child a .topNewImgContainer figure, .rslt_rhs .wgd_l .rltdnw:first-child a .topNewImgContainer figure img{ width: 104px; height: 70px; border-radius: 5px;}
            .srsult li {
                padding: 0 10px 10px 39px;
                margin: 10px 0;
                border-bottom: 1px solid #0000001f;
                position: relative;
            }
            .srsult li:last-child {
                border-bottom: none;
            }
            .srsult{left: 0; right: 0;}
            .srch_btn{top: 30px; left: 15%;     padding: 0;}
            .srsult li:before {
                content: "";
                box-sizing: border-box;
                position: absolute;
                display: block;
                transform: scale(var(--ggs,1));
                width: 10px;
                height: 10px;
                border: 2px solid;
                border-radius: 100px;
                color: #ddd;
                left: 15px;
                top: 9px;
            }
        }
    `}</style>
    </>);
};

export default Search;