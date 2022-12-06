// let input =     
// [{name:'XYZ',address:'Pune',type:'studernt'},{name:'ABC',address:'Bangalore',type:'studernt'},{name:'PQR',address:'Mumbai',type:'Professsional'},{name:'MNO',address:'Pune',type:'Professsional'}]
    
// // output =[
// // "Student":[
// // {name:'XYZ',address:'Pune',type:'studernt'},{name:'ABC',address:'Bangalore',type:'studernt'}
// // ]
// // "Professsional":[{name:'PQR',address:'Mumbai',type:'Professsional'},{name:'MNO',address:'Pune',type:'Professsional'}]

// let output =[];

// for(let item of input){    
//     output[item.type] = output[item.type]?[...output[item.type],item]  : [item];
// }\

//----------------------------------------

// var studentId ='ab73';
// function Student(){
//     this.studentId = 'b0el';
// }

// console.log(new Student().studentId);
// Student.prototype.studentId = 'kj18';
// Student.prototype.classId = '5e';
// let q = new Student();
// console.log("q = ",q);

// console.log(new Student().classId);
// console.log(new Student().studentId);

//------------------------------------------------------

// const samplePromise =()=> Promise.resolve('A');

// function f(){
//     samplePromise().then(result=>{
//         console.log(result)
//     });
//     console.log('B');
// }
// async function g(){
//     console.log(await samplePromise());
//     console.log('B');
// }

// f();
// g();
//-------------------------------



// let i;
// for (i = 0; i < 3; i++) {  
//     const log = () => {    
//         console.log(i);  
//     }  
//     setTimeout(log, 2000);
// }

// myVar;   
// //myConst; 
// console.log(myVar)
// //console.log(myConst)
// var myVar = 'value';
// const myConst = 3.14;

let arr1 = [1, 2, 3, 4, 5];
let arr2 = [1, 2, 3, 4, 5];
//arr1.splice(3); //returns [2, 3, 4]
console.log(arr1.splice(1,3)); //[1, 5]
console.log(arr1);

arr2.slice(1, 3); //returns [2, 3]
console.log(arr2); //[1, 2, 3, 4, 5]








