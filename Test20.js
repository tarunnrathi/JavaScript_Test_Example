// var name = ['Jane', 'John Doe', 'Lorem ipsum'];
// let newArray =[];

// function fun(param){
//     let temp={};
//     let i =0;

//     param.forEach(element => {
//         temp[element]=i;
//         newArray.push(temp);
//         temp={};
//         i++;       
//     });
    

// }
// fun(name)

// console.log(newArray);

// O/p = > [{Jane: 0}, {John Doe: 1}, {Lorem ipsum: 2}]

// let obj ={
//     firstName:"A",
//     lastName:"B",
//     fullName:"AB"
// }

// const {firstName,...lastName} = obj;
// console.log(lastName)


// function sum(...args) {  
//     let sum = 0;  
//     for (let i of args) {  
//         sum += i;  
//     }  
//     console.log("Sum = "+sum);  // 60
//   }

// We are expecting the sum as 60

// sum(30,30);
// b();
// var b = function(){
//     console.log("hello");
// }

// for(let i=1;i<10;i++){
//     console.log(i);
//     setTimeout(()=>{
//         console.log(i);
//     },10);
// }



let b = function(){
    let  i =3;
    if(true){
        let i=6;
        console.log(i)
    }
    console.log(i)
}
b();

let arr =[1,3,7,2,4,9,6,1,3,5,7,9];
console.log([...new Set(arr)]);