// let arr = [1,"Turing",{x:2},[3,4]];
// for(let i=0;i<arr.length;i++){
//     if(arr[i]==="Turing"){
//         arr.splice(1,1);        
//     }else{
//         console.log(arr[i]);
//     }
// }

//------------------------------

// let a ={y:1};
// a.x=a;
// console.log("a=",a);
// let out = JSON.stringify(a);
// console.log("out=",out);

//---------------------------------------

// let obj ={
//     x:1,
//     y:"Turing",
//     z:{a:99},
//     t:[1,2]
// }
// Object.freeze(obj);
// obj.x =10;
// obj.y ="Typescript";
// obj.z.a =1;
// obj.t[0]=3;
// obj.t[1]=4;
// console.log(obj);

//--------------------------------
let lng =["java","php","typescript"];
lng.length =0;
lng.push("golng");
console.log(lng);