const fs = require('fs');

// fs.readFile("file.json", function (err, data) {
//     if (err) {
//         console.error("error=",err);
//     }
//     console.log(data);
// });

// var callback = function (err, data) {
//     if (err) return console.error(err);
//     console.log(data);
//   };
//   fs.readFile('./index.js', callback);

let callback = function(err,data){
    if(err){
        console.log(err);
    }
    console.log(data);
    
}
  function fun(x,callback){
      console.log(3/x);
  }

  fun(0);