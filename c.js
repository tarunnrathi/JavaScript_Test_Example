// let obj={
//     name:"A",
//     city:"sre"
// }

// let obj1 =[{name:"P"},{city:"gzb"}];

// console.log(obj.name);

// console.log(obj['name']);

const myObj = new Object(),
      str = 'myString',
      rand = Math.random(),
      obj = new Object();

      console.log(myObj);

myObj.type              = 'Dot syntax';
myObj['date created']   = 'String with space';
myObj[str]              = 'String value';
myObj[rand]             = 'Random Number';
myObj[obj]              = 'Object';
myObj['']               = 'Even an empty string';

console.log(myObj);