let name ={
    firstName:"tarun",
    lastName:"rathi",   
}

let fullName = function(homeTown,State,...rest){
    console.log(this.firstName+" "+this.lastName+" "+homeTown+" "+State+" "+rest);
}

fullName.call(name,"Saharanpur","UP","Gzb","Delhi");
fullName.apply(name,["Saharanpur","UP","Gzb","Delhi"]);


let numbers = [1,3,6,4,8,10,9];
const max = Math.min.apply(null,numbers);
console.log(max);
const fn= ()=>{
    console.log(this);
}

console.log("___________");

const f = {
    a:1,
    b: function(){
        const v =()=>{
            console.log(this);
        }
        v();
    }
}
f.b.call(name);

// function sum(a){
//     return function(b){
//         return a+b;
//     }
// }
// console.log(sum(4)(5));



