// let u = [6,[2,3, [4,5]],4]
// let sum = 0;
// let level = 0;
// let len=0;

// call(u,level);
// function call(x,level){
//    if(Array.isArray(x)){      
//        x.map((item,i,ar)=>{
//            if(Array.isArray(item)){                                      
//             subCall(item,level);
//            }else{
//                sum=sum+item*(level+1);                                          
//                console.log(sum);
//            }
//        })
//    }  
// }

// function subCall(x,level){
//     if(Array.isArray(x)){ 

//     }

// }

let name ={
    firstName:"tarun",
    lastName:"rathi",   
}
let fullName = function(homeTown,state,...rest){
    console.log(this.firstName+" "+this.lastName+"  from "+homeTown+" , "+ state +" , "+rest);
}
fullName.call(name,"Saharanpur","UP");

let name2 ={
    firstName:"ritika",
    lastName:"rathi",    
}
fullName.call(name2,"Dehradun","UK","India","Asia");
fullName.apply(name2,["Dehradun","UK"]);
let printMyData = fullName.bind(name,"Saharanpur","UP");
console.log(printMyData);
printMyData();








// function call(){
//     var a=b=10;
// }
// call();
// var a;
// console.log(b);
// console.log(a);

// undefined
// 10


// function f(a){
// const{x,y,z}=[...a];
// }

// f([1,2,3])


// const fun=()=>{
//     const [name,setName]= useState('');

//     const clickHandler=()=>{
//         let f = name;
//     }
// }

let x = [6,[2,3, [4,5]],4]
let sum = 0;

function call(x,z){
    let y = x.map((item,i)=>{
        if(item.length>=1){
            sum=sum+call(item,i)   
    
        }else{
            sum=sum+item*(z+1);      
        }
        return sum
    })
}

call (x,0)
console.log(sum)



var myObject = {
    foo: "bar",
    func: function () {
        var self = this;
        console.log("outer func: this.foo = " + this.foo); // bar
        console.log("outer func: self.foo = " + self.foo); // bar

        (function () {
            console.log("inner func: this.foo = " + this.foo); undefined
            console.log("inner func: self.foo = " + self.foo); 
        }());
    }
};


var myObject = {
    foo: "bar",
    func: ()=> {
        var self = this;
        console.log("outer func: this.foo = " + this.foo);
        console.log("outer func: self.foo = " + self.foo);

        (function () {
            console.log("inner func: this.foo = " + this.foo);
            console.log("inner func: self.foo = " + self.foo);
        }());
    }
};
// console.log(myObject.func())

// bar
// bar
// undefined
// bar




