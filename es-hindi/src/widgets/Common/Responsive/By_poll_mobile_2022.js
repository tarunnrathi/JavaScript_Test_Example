import { useEffect, useContext, useState } from "react";

const ByPollAcrossWidget2022 = (props) => {

	const herf_path="/bypoll-2022/";
	 const text_set="विवरण परिणामों के लिए यहां क्लिक करें";
	const headline_1= "उपचुनाव";
	const headline_2= "रिजल्ट";
    let widget_on_off = false;
let widget_raw_data = [];
    widget_on_off = true;

	useEffect(() => {

		const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://images.news18.com/static_news18/js/revamp/glide.min.js";
            document.head.appendChild(script);

        setTimeout(() => {
const url ="https://election.nw18.com/electiondata/electionjson/assembly_election_dec_2022/bypoll_totals.json";
            loadData(url);
        }, 2000);
    }, []);

async function loadData(url) {

	//console.log("hello i am call");

	 await fetch(url)
    .then((response) => response.json())
    .then((data) => {

	  widget_raw_data = data;
	 let widgetHtml='';

	Object.values(widget_raw_data).map((value) => {
		 // console.log("widget_raw_data=======>",value);

		 Object.values(value).map((valueset) => {
			// console.log("valueset  wewqew =======>",valueset);
			 let partyNames = ``;
		     let partyScores = ``;

			 Object.keys(valueset.parties_totalseats).map((valuesetnew) => {

    //  partyNames += `<th style="background:${party.colour}">${party.name}</th>`;
      partyScores += `<td className="byplpoints">${valueset.parties_totalseats[valuesetnew]}</td>`;

    });

				 Object.keys(valueset.color).map((valuesetnew1) => {

     partyNames += `<th style="background:${valueset.color[valuesetnew1]}">${valuesetnew1}</th>`;

    });

	const el_type = valueset.type;
	let el_text_1="";

		if(el_type=="Assembly") {

	  el_text_1="विधानसभा उपचुनाव";
}else if(el_type=="Lok Sabha") {
	el_text_1="लोकसभा उपचुनाव";
}
const state_name= valueset.state_name_hindi;
			  widgetHtml += `<a href=${herf_path}><li>
<div class="asmbl-globaltable">
<table cellspacing="0" cellpadding="0">
<tr>
<th><b>${state_name}</b></th>	
${partyNames}
</tr>
<tr>
<td>${el_text_1}<br/>(${valueset.currentstrength}/${valueset.totalseats})</td>
	
${partyScores}
</tr>
	
</table>	
</div>
</li></a>
`;

		  });

		  });
	 // console.log("widgetHtml==========>",widgetHtml);
	  const container_div = document.getElementById("bypoll2022");
		  container_div.innerHTML = widgetHtml;
		 glideAnimation();
    })
    .catch((error) => {
      console.log(error);
    });

}

//For adding slide effect
function glideAnimation() {
  const scriptGlide = document.createElement("script");
  scriptGlide.type = "text/javascript";
  scriptGlide.innerHTML = `
        new Glide(document.querySelector('.asmlbypl-tableslider'), {
        autoplay: 4000,
        type: 'carousel',
        perView:1,               
        // slidesToScroll: 3,
        breakpoints: { 
        600: {
        perView: 1.2
        }
        }
        }).mount();	
    `;

  document.head.appendChild(scriptGlide);
}

      return (
        <>

<div className="asmlbyplwrap">
<div className="asmlbypl">

<div className="asmlbypl-top">

<div className="asmlbypl-left" style={{ marginBottom: "5px" }}>
<h2 className="asmlbyplfhd">{headline_1}</h2>
<div className="asmlbypllogo"></div>
<h2 className="asmlbyplshd">{headline_2} <span>2022</span></h2>
</div>

<div className="asmlbypl-right">
<a href={herf_path}><h3 className="asmlbypl-righthd">{text_set}</h3></a>
</div>

</div>

<div className="asmlbypl-tableslider">
<div data-glide-el="track">
<ul id="bypoll2022">

</ul>
</div>

<div className="asmlbypl-tableslider-bullets" data-glide-el="controls[nav]">
<button data-glide-dir="=0"></button>
<button data-glide-dir="=1"></button>
<button data-glide-dir="=2"></button>
<button data-glide-dir="=3"></button>
<button data-glide-dir="=4"></button>
<button data-glide-dir="=5"></button>
</div>

</div>

</div>
</div>

            <style jsx global>{`
                .asmlbyplwrap{background: #ececec; border-top:1px solid #c6c6c6; border-bottom:1px solid #c6c6c6;    padding: 5px 0; position: relative;}	
.asmlbypl{max-width: 1244px; margin: auto;}
.asmlbypl-top{display: flex; justify-content: space-between; align-items: center;}
.asmlbypl-left{    display: flex;text-transform: uppercase;align-items: baseline;}
.asmlbyplfhd{font-size: 22px; color: #111;font-weight: normal; line-height: 16px}
.asmlbypllogo{line-height: 0; margin: 0 6px}
.asmlbypllogo img{height: 18px}
.asmlbyplshd{font-size: 22px; font-weight: bold; color: #ee1d23;line-height: 16px}
.asmlbyplshd span{font-weight: normal; color: #111}


.asmlbypl-tabs{display: none;}
.asmlbypl-tabs a{    font-size: 12px;text-transform: uppercase;color: #10162e;height: 36px;line-height: 36px;padding: 0 10px;display: inline-block;}
.asmlbypl-tabs a.active{    color: #ee1d23;border-bottom: 2px solid #ee1d23;height: 34px;font-size: 16px; font-weight: bold;}
.asmlbypl-mjrt{font-size: 11px; color: #fff;text-transform: uppercase;margin: 4px 0;}

.bypolltext{font-size: 14px}
.asmbl-globaltable{width: 100%}
.asmbl-globaltable table{width: 100%; border-collapse: collapse; text-transform: uppercase; background: #fff}
.asmbl-globaltable table th, .asmbl-globaltable table td{border:1px solid #eee; padding: 5px 10px; text-align: center; }
.asmbl-globaltable table th{font-size: 14px; color: #fff;font-weight: normal;}
.asmbl-globaltable table th:first-child, .asmbl-globaltable table td:first-child{font-size: 11px; font-weight: normal; color: #fff; background: #10162e!important; text-align: left; width: 120px}
.asmbl-globaltable table tr:last-child td{font-size: 12px; font-weight: normal; color: #fff; background: #444444;vertical-align:middle;}
.byplpoints-first{font-weight: bold;font-size: 30px;color: #fff;line-height: 24px;}
.byplpoints{font-weight: bold;font-size: 18px;color: #333;line-height: 16px;}

.asmlbypl-tableslider{position: relative; overflow: hidden;}
.asmlbypl-tableslider ul{display: flex;}
.asmlbypl-tableslider-bullets{height: 4px;display: flex;justify-content: center; margin-top:8px}
.asmlbypl-tableslider-bullets button{background: #b0b0b0;border: none;width: 35px;height: 4px;border-left: 5px solid #ececec;border-right: 5px solid #ececec;border-radius: 30px; outline: none; cursor: pointer;}
.asmlbypl-tableslider-bullets button.glide__bullet--active{background: #e2261b}
.asmlbypl-tableslider-bullets button:first-child{border-left: 15px solid #ececec; width: 45px;}
.asmlbypl-tableslider-bullets button:last-child{border-right: 15px solid #ececec; width: 45px;}
.asmlbypl-right{    display: flex;
align-items: baseline;}
.asmlbypl-right select, .asmlbypl-right input{border: none;width: 190px;height: 26px;border-radius: 6px;font-size: 13px;color: #fff;padding: 0 8px;background: #ee1d23;outline: none;}
.asmlbypl-righthd{    font-size: 12px;font-weight: bold;text-transform: uppercase;color: #ee1d23;border-bottom: 1px solid #ee1d23;position: relative;line-height: 16px;margin-right: 40px;flex-shrink: 0;}
.asmlbypl-righthd:before, .asmlbypl-righthd:after{content: ""; position: absolute;}
.asmlbypl-righthd:before{    width: 10px;height: 1px;background: #ee1d23;bottom: 8px;right: -15px;}
.asmlbypl-righthd:after{border-top: 1px solid #ee1d23;
border-right: 1px solid #ee1d23;width: 6px;height: 6px;transform: rotate(45deg);right: -15px;bottom: 5px;}
@media screen and (max-width:720px){
.asmlbyplwrap {background: #ececec;border-bottom: 3px solid #c6c6c6;padding: 5px 0 25px 0;}
.asmlbypl-top {flex-wrap: wrap;}
.asmlbypllogo img {height: 16px;}
.asmlbypl-left {margin-bottom: 8px;}
.asmlbyplfhd,.asmlbyplshd {font-size: 19px}
.asmlbypl-tabs{display: block;background: #fff;width: 50%;height: 36px;border-top: 1px solid #d0d0d0;}
.asmlbypl {padding:10px;display: block;}	
.asmlbypl-right {margin-left: 0;display: flex;width: 50%;background: #fff;padding: 4px;box-sizing: border-box;border-top: 1px solid #d0d0d0;}
.asmlbypl-righthd {position: absolute;bottom: 8px;left: 50%;right: 0;width: 215px;margin-left: -112px;}
.asmlbypl-right select, .asmlbypl-right input {margin-bottom: 0; height: 28px; width: 100%; font-size: 12px}
.bypolltext{    font-size: 11px;}
.bypolltext br{display: none;}
.byplpoints-first {font-size: 24px;}
}

            `}
            </style>
        </>
    );
};

export default ByPollAcrossWidget2022;
