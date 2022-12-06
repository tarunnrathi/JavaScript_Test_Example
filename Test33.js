// const fs = require("fs");
// setTimeout(() => {
//   fs.readFile("./BorrowComp.js", (err, data) => {
//     if (err) throw err;
//     else console.log("setTimeout = ",data);
//   });
// },0);

// setImmediate(()=>{
//     fs.readFile("./BorrowComp.js", (err, data) => {
//         if (err) throw err;
//         else console.log("setImmediate = ",data);
//       });
// });

// setInterval(() => {
//   fs.readFile("./BorrowComp.js", (err, data) => {
//     if (err) throw err;
//     else console.log("setInterval = ",data);
//   });
// }, 1000);

// fun().then((response)=>{
//     console.log("Promise response = ",response);
// });
// //console.log("a =",a);

// function fun(){
//     return new Promise((resolve,reject)=>{
//         fs.readFile("./BorrowComp.js",(err,data)=>{
//             if (err) throw err;
//             else resolve(data);
//         })
//     })
// }

// setTimeout(()=>{
//     setTimeout(()=>{
//         console.log("setTimeout = ");
//     },0);
//     setImmediate(()=>{
//         console.log("setImmediate = ");
//     });
// },0);

// setImmediate(()=>{
//     console.log("setImmediate");
// });

const helloPromise = function (value) {
  return new Promise((resolve, reject) => {
    
    if (value === "one") {
      setTimeout(() => {
        resolve("one");
      }, 3000);
    }    
    if (value === "two") {
      setTimeout(() => {
        reject("Error is there");
      }, 3000);
    }
    if (value === "three") {
      setTimeout(() => {
        resolve("three");
      }, 1000);
    }   
    
  });
};

// async function doPromise(){
//   try{
//     let msg  = await helloPromise();
//     console.log("msg = ",msg);

//   }catch(error){
//     console.log("error = ",error);
//   }
// }



// const doPromise = function () {
//   helloPromise()
//     .then((response) => {
//       console.log("Success:" + response);
//     })
//     .catch((error) => {
//       console.log("Error:" + error);
//     });
// };

//-------------------------------------------------------------

// async function doPromise(){
//   try{    
//     console.log("msg = ",await helloPromise("one"));
//     console.log("msg = ",await helloPromise("two"));
//     console.log("msg = ",await helloPromise("three"));

//   }catch(error){
//     console.log("error = ",error);
//   }
// }

const doPromise = function () {
  helloPromise("one")
    .then((response1) => {
      console.log("Success1:" + response1);
      return helloPromise("two");
    }).then(response2=>{
      console.log("Success2:" + response2);
      return helloPromise("three");
    }).then(response3=>{
      console.log("Success3:" + response3);
      return helloPromise("three");
    })
    .catch((error) => {
      console.log("Error:" + error);
    });    
};


doPromise();
