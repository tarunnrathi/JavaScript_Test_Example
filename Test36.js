const items = [
    {
      id: 1,
  
      name: "USA",
  
      values: [
        {
          id: 2,
  
          name: "Chevy",
  
          values: [
            {
              id: 3,
  
              name: "Suburban",
            },
  
            {
              id: 4,
  
              name: "Camaro",
  
              values: [],
            },
          ],
        },  
        {
          id: 5,
  
          name: "Ford",
  
          values: [],
        },
      ],
    },
  ];


  function fun(param){
    let key = Object.keys(param);
    key.map((item)=>{
        if(typeof param[item] === "object"){
            fun(param[item]);
        }else{
            if(item ==="name"){
                console.log(param[item]);

            }
        }       
    })
  }


  console.log(fun(items))
//senthil@cubera.co
//   let a = '1234567890/5';
//   let b = '7898-7*67/3';

//   function calc(param){    
//     let arr = param.split('');
//     let value = 0;
//     let sym="";
//     arr.forEach(element => { 
//         let r = Number(element);
//         if( !r){           
//             sym=element;            
//         }else{
//             if(sym){
//                 if(sym === "-"){
//                     value = value-Number(element);
//                 }
//                 if(sym === "*"){
//                     value = value*Number(element);
//                 }
//                 if(sym === "/"){
//                     value = value/Number(element);
//                 }
//                 sym="";
//             }else{
//                 value = value + Number(element);
//             }
//         }       
//     });
//     return value.toFixed(0).split('').length>1?calc(value.toFixed(0)):value;
// }
// console.log("result = ",calc(a));

// let a ="brand"
// let b = "flavors";
// console.log(a.length);
// console.log(a.charAt(a.length-1));
// console.log(b.includes("s",b.length-1));
// if(b.includes("s",b.length-1)){
//   console.log(b.slice(0,-1))
// }









  


  