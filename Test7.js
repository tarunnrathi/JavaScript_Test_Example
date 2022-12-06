// const arr = [2,3,1,2,2,2,2,4,4,3,3,32,2,3,1,13,3,3,4,6,7,3,2];

// const count ={}

// for(var item of  arr){
//     count[item] = count[item]?count[item]+1:1;
// }

// console.log(count);

// //Find the value of k in the given object , k may be on nth level.

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

// // Check of balanced parenthesis in the expression
//  //{[{[[{{())}}]]

//  let x = "fog"
// function first(){
// console.log(x)
// }

// x = "dog"
// function sec(){
// 	let x = "dog";
// 	first()
// }

// let green;
// greeen =false;

// console.log(greeen)

// let a = [2, 1, 99, 9, 8, 7, 8, 0, 9, 4, 3];
// let s =0;

// for(var i=0;i<a.length-1;i++){
//     s+=1;
//     if(a[i]>a[i+1]){
//         let temp = a[i];
//         a[i]=a[i+1];
//         a[i+1]=temp;
//         i=-1;
//     }
// }
// console.log(a);
// console.log("s=>",s);