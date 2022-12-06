// let student_1 = {
//     subject: 'JS',
//     marks: 100,
//     details: {
//         name: 'developer',
//         age: 23
//     }
// }

// let student_2 = {...student_1}
// let student_3 = Object.assign({},student_1);
// let student_4 = JSON.parse(JSON.stringify(student_1));


// student_2.marks=50;
// student_2.details.age=34;

// console.log(student_1);
// console.log(student_2);
// console.log(student_3);
// console.log(student_4);

let o1 ={marks:90};
let o2 ={marks:100};

Object.seal(o1);
Object.freeze(o2);
// CREATE - not possible in both cases
// Object.assign(o1,{name:"Ram"})
// Object.assign(o2,{name:"Ram"})

// console.log(o1);
// console.log(o2);

//UPDATE - possible in seal only
// o1.marks=50;
// o2.marks=60;

// console.log(o1);
// console.log(o2);


// program to print the text


// let greet = function() {
//    return function call(){
//         b=4;
//         console.log(b);
//     }
//     let b;
//     console.log('Hi, there.');
//     call();
// }

// let r =greet();
// r();
let a =[1,2,3,2,1,4,5,2,3];
console.log("a= ",[...new Set(a)]);

