// select * from Students where CHARINDEX('t',StdName)=1
// and polyfills in sql

// let a = "LAY’S® MINI SHEPHERD’S PIES";
// let b = a.split(' ');
// let c = b.map((item)=>{
//     let e = item.charAt(0).toUpperCase()+item.toLocaleLowerCase().slice(1);
//     return e;
// })
// console.log(c.join(' '));

const productTitleConvert = (str) => {
    if (!str) return "";
    else {
      return str
        .split(" ")
        .map((item) => {
          return item.charAt(0).toUpperCase() + item.toLocaleLowerCase().slice(1);
        })
        .join(" ")
        .toString();
    }
};


console.log(productTitleConvert("LAY’S® MINI SHEPHERD’S PIES"));

// //console.log(a.slice(1));


// let sum = a;                            
// console.log(sum)     //prints undefined
// let a = 5;

// let sum = a + 5;        //---------
// //some other code       //         | ------>  this is TDZ(Temporal Dead Zone) for variable a
//                         //         |
// console.log(sum)        //---------
// let a = 5;

//Temporal Dead Zone is a zone before your variable is declared,
