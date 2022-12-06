

// https://codesandbox.io/s/vanilla
// Anooj Agarwal2:25 PM
// https://codesandbox.io/s/cipher-wizard-assesment-51lkc0
// Anooj Agarwal2:26 PM
// https://docs.google.com/document/d/1GfM5jltXzF1DkAbattP951ib7rGWD0rRmzi-J0M2JLs/edit#

//descriptors

//freez and sealed

// class ND function

//debouncers
// prototype
//------------------------------------------
// let obj ={
//     firstName:"A",
//     lastName:"B",
//     address:{
//         city:"C",
//         state:"S",
//         country:"I"
//     }
// }
// Object.seal(obj);
// obj.firstName = "P"
// obj.address.city ="Q"
// // console.log(obj);
// delete obj.lastName;
// console.log(obj.lastName);
// console.log(obj);

// let obj1 = Object.create({
//     firstName:"A",
//     lastName:"B",
//     address:{
//         city:"C",
//         state:"S",
//         country:"I"
//     }
// })
// console.log("-----------------------------------")
// delete obj1.lastName;
// console.log(obj1.lastName);
// console.log(obj1);
// //Make a property read-only
//-----------------------------
//You can make a property read-only by using the Object.defineProperty(obj, prop, descriptor) static function.
// var movieTicket = {
//     movie: 'Mad Max',
//     hall: 1
// };
// Object.defineProperty(movieTicket,'movie',{
//     // value: 'Mad Max',
//     writable: false
// });
// movieTicket.movie = 'Star Wars';
// console.log(movieTicket);

// let movieTicket = {
//     movie: {
//       title: 'Mad Max',
//       year: 2015
//     },
//     hall: 1
// };

// Object.defineProperty(movieTicket, 'movie', {
//     value: {
//       title: 'Mad Max',
//       year: 2015
//     },
//     writable: false
//   });
// movieTicket.movie.title = 'Sicario'
// console.log(movieTicket);

//----------------------------------------------------
//read only object
 obj = {

};
console.log(obj);

