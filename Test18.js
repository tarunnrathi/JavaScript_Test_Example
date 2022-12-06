let arr =[1,3,7,2,4,9,6,1,3,5,7,9];
let occurence={};
//let occurence=[];
for(let item of arr){
occurence[item] = occurence[item]?occurence[item]+1:1;
//occurence[item] = occurence[item]?[...occurence[item],item]:[item];
}
console.log(occurence);

// function f(param){

// let keys = Object.keys(param).sort((a,b)=>{

// if(occurence[a]>occurence[b]){
// return 1;
// }
// else{
// return -1;
// }
// })

// return keys;

// }
// console.log(f(occurence));