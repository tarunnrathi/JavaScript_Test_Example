// // // let name ={
// // //     firstName:"tarun",
// // //     lastName:"rathi",   
// // // }
// // // let fullName = function(homeTown,state,...rest){
// // //     console.log(this.firstName+" "+this.lastName+"  from "+homeTown+" , "+ state +" , "+rest);
// // // }


// // // // fullName.call(name,"Saharanpur","UP","MCA","BSC");
// // // // fullName.apply(name,[])

// // // let printMyData = fullName.bind(name,"Saharanpur","UP");
// // // // console.log(printMyData);
// // // printMyData();

// // // const myObj = new Object(),
// // //       str = 'myString',
// // //       rand = Math.random(),
// // //       obj = new Object();

// // //     //   console.log(myObj);

// // // myObj.type              = 'Dot syntax';
// // // myObj['date created']   = 'String with space';
// // // myObj[str]              = 'String value';
// // // myObj[rand]             = 'Random Number';
// // // myObj[obj]              = 'Object';
// // //myObj['']               = 'Even an empty string';

// // // console.log(myObj);


// // // var array3=[11,11,9,8,9,12,20,14,15];
// // // console.log(Set)



// // // let a ={x:1};

// // // let b = Object.create({
// // //     x:1,
// // //     y:2
// // // })
// // // //delete b.x;
// // // console.log(  b,a);
// // // console.log( delete b.x, delete a.x);
// // // console.log(  b.x,a.x);


// // // let obj ={
// // //     x:1,
// // //     y:"ABC",
// // //     z:{a:90},
// // //     t:[1,2]
// // // }
// // // Object.freeze(obj);
// // // obj.x=10;  
// // // obj.y="PQR";
// // // obj.z.a=1;
// // // obj.t[0]=3;
// // // obj.t[1]=4;
// // // obj.t.push(6)
// // // console.log(obj);


// // // let person = {
// // //     firstName: 'John',
// // //     lastName: 'Doe',
// // //     address: {
// // //         street: 'North 1st street',
// // //         city: 'San Jose',
// // //         state: 'CA',
// // //         country: 'USA'
// // //     }
// // // };


// // // let copiedPerson = Object.assign({}, person);

// // // copiedPerson.firstName = 'Jane'; // disconnected

// // // copiedPerson.address.street = 'Amphitheatre Parkway'; // connected
// // // copiedPerson.address.city = 'Mountain View'; // connected

// // // console.log(copiedPerson);
// // // console.log(person);


// // let a = [-1,0,1,2,-1,-4];
// // let temp;
// // let outPut =[];

// // for(var i=0;i<a.length-1;i++){
// //     temp =[];
// //     if(a[i]+a[i+1]+a[i+2]=== 0){
// //         temp.push(a[i]);
// //         temp.push(a[i+1])
// //         temp.push(a[i+2]);
// //         outPut.push(temp);
// //     }
// // }
// // //console.log(outPut);

// // var [c, ...m] = [1,2,3,4,5];

// // // console.log(c);
// // // console.log(m);


// // let arr1 = [1, 2, 3, 4, 5];
// // let arr2 = [1, 2, 3, 4, 5];
// // //arr1.splice(3); //returns [2, 3, 4]
// // console.log(arr1.splice(1,3)); //[1, 5]
// // console.log(arr1);

// // arr2.slice(1, 3); //returns [2, 3]
// // console.log(arr2); //[1, 2, 3, 4, 5]


// // let name ={
// // //     firstName:"tarun",
// // //     lastName:"rathi",   
// // // }
// // // let fullName = function(homeTown,state,...rest){
// // //     console.log(this.firstName+" "+this.lastName+"  from "+homeTown+" , "+ state +" , "+rest);
// // // }


// // // // fullName.call(name,"Saharanpur","UP","MCA","BSC");
// // // // fullName.apply(name,[])

// // // let printMyData = fullName.bind(name,"Saharanpur","UP");
// // // // console.log(printMyData);
// // // printMyData();

// // // const myObj = new Object(),
// // //       str = 'myString',
// // //       rand = Math.random(),
// // //       obj = new Object();

// // //     //   console.log(myObj);

// // // myObj.type              = 'Dot syntax';
// // // myObj['date created']   = 'String with space';
// // // myObj[str]              = 'String value';
// // // myObj[rand]             = 'Random Number';
// // // myObj[obj]              = 'Object';
// // //myObj['']               = 'Even an empty string';

// // // console.log(myObj);


// // // var array3=[11,11,9,8,9,12,20,14,15];
// // // console.log(Set)



// // // let a ={x:1};

// // // let b = Object.create({
// // //     x:1,
// // //     y:2
// // // })
// // // //delete b.x;
// // // console.log(  b,a);
// // // console.log( delete b.x, delete a.x);
// // // console.log(  b.x,a.x);


// // // let obj ={
// // //     x:1,
// // //     y:"ABC",
// // //     z:{a:90},
// // //     t:[1,2]
// // // }
// // // Object.freeze(obj);
// // // obj.x=10;  
// // // obj.y="PQR";
// // // obj.z.a=1;
// // // obj.t[0]=3;
// // // obj.t[1]=4;
// // // obj.t.push(6)
// // // console.log(obj);


// // // let person = {
// // //     firstName: 'John',
// // //     lastName: 'Doe',
// // //     address: {
// // //         street: 'North 1st street',
// // //         city: 'San Jose',
// // //         state: 'CA',
// // //         country: 'USA'
// // //     }
// // // };


// // // let copiedPerson = Object.assign({}, person);

// // // copiedPerson.firstName = 'Jane'; // disconnected

// // // copiedPerson.address.street = 'Amphitheatre Parkway'; // connected
// // // copiedPerson.address.city = 'Mountain View'; // connected

// // // console.log(copiedPerson);
// // // console.log(person);


// // let a = [-1,0,1,2,-1,-4];
// // let temp;
// // let outPut =[];

// // for(var i=0;i<a.length-1;i++){
// //     temp =[];
// //     if(a[i]+a[i+1]+a[i+2]=== 0){
// //         temp.push(a[i]);
// //         temp.push(a[i+1])
// //         temp.push(a[i+2]);
// //         outPut.push(temp);
// //     }
// // }
// // //console.log(outPut);

// // var [c, ...m] = [1,2,3,4,5];

// // // console.log(c);
// // // console.log(m);


// // let arr1 = [1, 2, 3, 4, 5];
// // let arr2 = [1, 2, 3, 4, 5];
// // //arr1.splice(3); //returns [2, 3, 4]
// // console.log(arr1.splice(1,3)); //[1, 5]
// // console.log(arr1);

// // arr2.slice(1, 3); //returns [2, 3]
// // console.log(arr2); //[1, 2, 3, 4, 5]


// let obj ={
//     f:20,
//     radius(){
//         let r = this.f
//         let a = this.f * 2;
//         return a;
//     },
//     perimeter:()=>{
//         let d = this.f;
//         let e = this.f*3.14*2;
//         return this.f*3.14*2;
//     }
//   }
//   console.log(obj.radius());
//   console.log(obj.perimeter());


//   let b = function(){
//     let  i =3;
//     if(true){
//         let i=6;
//         console.log(i)
//     }
//     console.log(i)
// }
// b();

// let arr =[200,3,7,2,4,9,6,1,3,5,7,9,200];
// console.log([...new Set(arr)]);


const obj = { name: 'Version 1', additionalInfo: { version: 1 } };

const shallowCopy1 = { ...obj };
const shallowCopy2 = Object.assign({}, obj);

shallowCopy1.name = 'Version 2';
//shallowCopy1.additionalInfo.version = 2;

shallowCopy2.name = 'Version 2';
//shallowCopy2.additionalInfo.version = 2;

console.log(obj); // { name: 'Version 1', additionalInfo: { version: 2 } }
console.log(shallowCopy1); // { name: 'Version 2', additionalInfo: { version: 2 } }
console.log(shallowCopy2); // { name: 'Version 2', additionalInfo: { version: 2 } }
