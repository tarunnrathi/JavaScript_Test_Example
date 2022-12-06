

// function fact(param){
//     let temp=1;
// for(let i= param;i>=0;i--){
//     if(i!==0){
//         temp = temp*i;
//     }
//     }
//     return temp;
// }
// console.log(fact(5));
// console.log(fact(2));

// let obj ={
//     firstName:"A",
//     lastName:"B",
// }

// console.log(obj["firstName"]);

// function wait(){
//     let promise = new Promise();
//     return promise;
// }
// let result = wait();
// setTimeout(()=>{
//     result.then().catch();
// },1000);


// function wait(milliseconds) {
//     return new Promise(resolve => setTimeout(resolve, milliseconds));
//   }


var a = 4;
//this.prototype.a = 8;
console.log(this)
let b = 5
console.log(this.b)




// function a(){console.log(this)}
// console.log(a());
// const b = ()=>{console.log(this)}
// // console.log(b);

// console.log(null == undefined);
// console.log(null === undefined);

// console.log(null == false);
// console.log(undefined == false);
// let obj ={
//     firstname:"A",
//     lastName:"B"
// }

// let fun =function(...rest){
//     let a = rest;
//     console.log(this.firstname+" "+this.lastName+" "+ rest);
// }

// //fun.call(obj,"Noida","UP","INDIA");
// fun.apply(obj,["Noida","UP","INDIA"]);
// let m=  fun.bind(obj);


// var func = function() {
//     console.log(this)
// }.bind(1);

// func();


// function checkFun(a, b, c){
//     console.log(this);
//     console.log(a);
//     console.log(b);
//     console.log(c);
// }
// checkFun.apply(1,[2,3,4]);



