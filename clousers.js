// function curry(f) { // curry(f) does the currying transform
//     return function(a) {
//       return function(b) {
//         return f(a, b);
//       };
//     };
//   }
  
//   // usage
//   function sum(a, b) {
//     return a + b;
//   }
  
//   let curriedSum = curry(sum);
  
//   console.log( curriedSum(1)(2) )

//---------------------------------------------

function Counter(){
  var count =0;
  function incrementCount(){
    return count=+1;
  }
  return incrementCount;
}
let counter =Counter();
console.log(counter());