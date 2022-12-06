
// var myObject = {
//     name: "NW18",
//     func: ()=> {
//         var self = this;
//         console.log("cs1 " + this.name); //    NW18
//         console.log("cs2 " + self.name); //    NW18
//         (function() {
//             name: "NW17",
//             console.log("cs3 " + this.name); // undefined
//             console.log("cs4 " + self.name); // NW18
//         }());
//     }
//   };
//   myObject.func();

// function myFunction() {
//     console.log(this);
//   }
//   // Simple invocation
//   myFunction();

// const myObject = {
//     method1() {
//       console.log(this);
//     }
//   };
//   // Method invocation
//   myObject.method1();


const myObject = {
       callback:() => {
        console.log(this); // logs myObject
      }
      
  };
  myObject.callback();

//   function Car(color){
//     this.color = color
//  }

//  const redCar = new Car("red");
//   console.log(redCar instanceof Car);

//   let obj ={
//     name:"A",
//     Address:{
//         city:"Noida",
//         state:"UP"
//     }
//   }
//   delete obj.name

//  console.log( obj.name);

//  let obj = Object.create({
//     name:"A",
//     Address:{
//         city:"Noida",
//         state:"UP"
//     }
//  });
//  delete obj.name;
//  console.log( obj.name);

// const callback =()=>{
//     console.log( arguments); 
// }
// callback('a', 'b');


// function myFunction() {
//     console.log(arguments);
//   }
//   myFunction('a');


//   function myRegularFunction() {
//     const myArrowFunction = () => {
//       console.log(arguments);
//     }
//     myArrowFunction('c', 'd');
//   }
//   myRegularFunction('a', 'b');


  



