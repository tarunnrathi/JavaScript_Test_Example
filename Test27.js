// Shallow Copy - Shallow copy is a bit-wise copy of an object. A new object is created that has an exact copy of the     values in the original object.
//1.Example

let list = ['a', 'b', 'c', 'd'];
let box = list.slice();
console.log("list-> ",list, "box-> ", box);

console.log("After changing some values ");

list[2] = 'e';
box[3] = 'f';
console.log("list-> ",list, "box-> ", box);

//------------------------------------------------------------------------------------

//2.Example

// let list = ['a', 'b', 'c', 'd'];
// let box = [].concat(list);
// console.log("list-> ",list, "box-> ", box);

// console.log("After changing some values ");

// list[2] = 'e';
// box[3] = 'f';
// console.log("list-> ",list, "box-> ", box);
//-------------------------------------------------------------------------------------

//3.Example
// let list = ['a', 'b', 'c', 'd'];
// let box = [...list];  // Method 3: ES6 Spread operator
// console.log("list-> ",list, "box-> ", box);

// console.log("After changing some values ");

// list[2] = 'e';
// box[3] = 'f';
// console.log("list-> ",list, "box-> ", box);
//-------------------------------------------------------------------------------------
//Deep Copy

//1.Example

let student = {
    subject: 'JS',
    marks: 100,
    details: {
        name: 'developer',
        age: 23
    }
}

let record = {...student}; //Method 2: Use ES6 Spread Operator
console.log("student",student, "\nrecord", record);

console.log("After changing some values ")

student.details.age = 30;
record.marks = 50;
console.log("student", student, "\nrecord", record);


const obj = { name: 'Version 1', additionalInfo: { version: 1 } };

const shallowCopy1 = { ...obj };
const shallowCopy2 = Object.assign({}, obj);

shallowCopy1.name = 'Version 2';
shallowCopy1.additionalInfo.version = 2;

shallowCopy2.name = 'Version 2';
shallowCopy2.additionalInfo.version = 3;

//console.log(obj); // { name: 'Version 1', additionalInfo: { version: 2 } }
console.log(shallowCopy1); // { name: 'Version 2', additionalInfo: { version: 2 } }
console.log(shallowCopy2); // { name: 'Version 2', additionalInfo: { version: 2 } }

console.log(obj);



