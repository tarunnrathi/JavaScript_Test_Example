// // *
// // **
// // ***
// // ****
// // *****

// // function print(i) {
// //     switch (i) {
// //         case 1:
// //             console.log('*')
// //             return null
// //         case 2:
// //             console.log('**')
// //             return null
// //         case 3:
// //             console.log('***')
// //             return null
// //         case 4:
// //             console.log('****')
// //             return null
// //         case 5:
// //             console.log('*****')
// //             return null;
// //         default:
// //             return null;
// //     }
// // }

// // for (var i = 1; i <= 5; i++) {
// //     print(i);
// // }

// function print(i) {  
//   for (let j = 1; j <= i; j++) {
//     let temp = "";
//     for (let k = 1; k <= j; k++) {
//       temp = temp + get();
//     }
//     console.log(temp);
//   }
// }
// function get() {
//   return '* ';
// }
// print(7);
// //---------------------------------------

// // function distinct(value,index,self){
// //   let r =  self.indexOf(value);

// //   return r === index?true:false;

// // }

// // let year = [2016, 2017, 2017, 2016, 2019, 2018, 2019];

// // const distinctYear = year.filter(distinct);

// // console.log(distinctYear);


// //---------------------------------------------

let obj = {
  sourceId: "Kroger",
  loyaltyId: "",
};

const defaultParam = {
  LanguagePreference: "en",
  Version: "1.1.1",
  DomainName: "US site",
  LocationId: "1234",
};

Object.assign(defaultParam,{
    ...(obj.sourceId && {source:obj.sourceId})
})

Object.assign(defaultParam,{
    ...(obj.sourceId && obj.loyaltyId &&  {loyaltyId:obj.loyaltyId})
})


console.log("defaultParam=> ",defaultParam);
// //-----------------------------------------------------

// let arr = [1,1,1];
// let arr2 = arr;
// let arr3 = [...arr2];

// console.log(arr2===arr);
// console.log(arr2===arr3);


//--------------------------------------




