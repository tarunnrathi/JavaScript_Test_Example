// var myObject = {
//     foo: "bar",
//     func: ()=> {
//         var self = this;
//         console.log("outer func: this.foo = " + this.foo);
//         console.log("outer func: self.foo = " + self.foo);

//         (function () {
//             console.log("inner func: this.foo = " + this.foo);
//             console.log("inner func: self.foo = " + self.foo);
//         }());
//     }
// };

// console.log(myObject.func());

// function fun(param){
//     console.log("param=>",param);
//     let a = Array.prototype.slice(1,2).call(param)
//     let f =a.reduce((a,b)=>a+b)
//     return f;

// }
// console.log(fun(1,2,3));


// let obj1 ={
//     name:"Tarun",
//     city:"noida"
// }
// delete obj1.city;
// console.log(obj1.city);

// let obj =  Object.create({
//     name:"Tarun",
//     city:"noida"
// })
// delete obj.city;

// console.log(obj.city);

let a = [2, 1, 99, 9, 8, 7, 8, 0, 9, 4, 3];
let s =0;

for(var i=0;i<a.length-1;i++){
    s+=1;
    if(a[i]>a[i+1]){
        let temp = a[i];
        a[i]=a[i+1];
        a[i+1]=temp;
        i=-1;
    }
}
console.log(a);
console.log("s=>",s);
n(n+1);

//------------------------------------------------------------

function isInRange(value) {
    if (typeof value !== 'number') {
        return false;
    }
    return value >= this.lower && value <= this.upper;
}

let data = [10, 20, "30", 1, 5, 'JavaScript filter', undefined, 'example'];

let range = {
    lower: 1,
    upper: 10
};

let numberInRange = data.filter(isInRange, range);

console.log(numberInRange); // [10, 1, 5]

// const person = {
//     firstName: 'John',
//     lastName: 'Doe'
// };


// // using spread ...
// let p1 = {
//     ...person
// };
// let p2 = Object.assign({}, person);

// let p3 = JSON.parse(JSON.stringify(person));

// console.log(p1);

// console.log(p2);

// console.log(p3);


//------------------------------

let person = {
    firstName: 'John',
    lastName: 'Doe',
    address: {
        street: 'North 1st street',
        city: 'San Jose',
        state: 'CA',
        country: 'USA'
    }
};


let copiedPerson = Object.assign({}, person);

copiedPerson.firstName = 'Jane'; // disconnected

copiedPerson.address.street = 'Amphitheatre Parkway'; // connected
copiedPerson.address.city = 'Mountain View'; // connected

console.log(copiedPerson);
console.log(person);