// if (true) {
//     var x = "hello";
//   }
//   console.log(x);  // hello
  
//   if (true) {
//     let x = "hello";  
//   }
//   console.log(x);  // reference error
  
//   for (var i=0; i < 10; i++) {
//     // doing something here
//   }
//   console.log(i);  10
  
//   for (let i=0; i < 10; i++) {
//     // doing something here
//   }
//   console.log(i);    // reference error


// var a = { "student": "stname", "status": "passed"}

// delete a.student


// var a = 1;
// function a() {
//     return 2;
// }
// console.log(a)  //2
// console.log(a()) // 2



var myObject = {
    name: "NW18",
    func: function() {
        var self = this;
        console.log("cs1 " + this.name); //    NW18
        console.log("cs2 " + self.name); //    NW18
        (function() {
            name: "NW18",
            console.log("cs3 " + this.name); // undefined
            console.log("cs4 " + self.name); // NW18
        }());
    }
  };
  myObject.func();


  