// let obj = {
//     sourceId: "Kroger",
//     loyaltyId: "123",
//   };
  
//   const defaultParam = {
//     LanguagePreference: "en",
//     Version: "1.1.1",
//     DomainName: "US site",
//     LocationId: "1234",
//   };
//   defaultParam.source = obj.sourceId;

//   Object.assign(defaultParam,{
//     ...(obj.sourceId && obj.loyaltyId && {
//         loyaltyId:obj.loyaltyId 
//     })
//   })
  
//  console.log("defaultParam = ",defaultParam)


//------------------------------------------------------------------

let arr = [1,1,1];
let arr2 = arr;
let arr3 = [...arr2];

console.log(arr2===arr);
console.log(arr2===arr3);

console.log("arr2",arr2);
console.log("arr3",arr3);

// arr2.push(9);
// console.log(arr2);
// console.log(arr)

// let lng =["java","php","typescript"];
// lng.length =0;
// lng.push("golng");
// console.log(lng);


//-------------------------------------
let a =  {k:{k:{k:{k:{k:3}}}}};
function fun(param){
    if(typeof param!=="number"){
        let x = Object.keys(param);
        console.log("x=",x);
        console.log("param[x]=",param[x]);
        fun(param[x]);
    }else{
        console.log(param);
    }
}
fun(a);

//------------------------------------------
// let data = [10, 20, "30", 1, 5, 'JavaScript filter', undefined, 'example'];

// function Isrange(value){
//     if(typeof value!== 'number'){
//         return false;
//     }else{
//         return value>=this.lower && value<=this.upper
//     }
// }

// let range ={
//     lower:1,
//     upper:10
// }

// let newArray = data.filter(Isrange,range);
// console.log(newArray);

// console.log(3%2);
// console.log(2%2);


var [c, ...m] = [1,2,3,4,5];

console.log(c);
console.log(m);
//-----------------------------------
var array=[1,2,3,4,5];
console.log(array.slice(2));
console.log(array);
