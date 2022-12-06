// // var myCallback = function(data) {
// //     console.log('got data: '+data);
// //   };
  
// //   var usingItNow = function(callback) {
// //     callback('get it?');
// //   };
// //   usingItNow(myCallback);

//   let name ={
//     firstName:"tarun",
//     lastName:"rathi",   
// }

// let fullName = function(){
//   console.log(this.firstName+" "+this.lastName);
// }


// fullName.(name);


// const addCurry =(a)=>{
//   return (b)=>{
//     return (c)=>{
//       return a+b+c;
//     }
//   }
// }

// console.log(addCurry(1)(2)(3));


var array=[1,2,3,4,5];
// console.log(array.slice(2));
// console.log(array.splice(2));

console.log(array.shift());

// const sum =(a,...param)=>{    
//     let b = param[0];   
//     if(typeof param === "object"){
//         return (b)=>{
//             return a+b
//         }
//     }   
// }

// console.log("sum=",sum(2)(3))
// console.log("sum=",sum(2,3))

// let a = [2,3,4,5,6,7,8,9,10];
// for(var i=0;i<a.length-1;i++){
//     if(a[i]/a[i]===1 &&(a[i]===2 || a[i]===3)){
//         console.log(a[i]);
//     }
//     if(a[i+1]/a[i]){
//         console.log((a[i+1]/a[i]>1));
//     }    
// }