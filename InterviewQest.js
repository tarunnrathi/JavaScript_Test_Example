1.
var myObject = {
    foo: "bar",
    func: function(){
        var self = this;
        console.log("outer func: this.foo = " + this.foo);
        console.log("outer func: self.foo = " + self.foo);

        (function () {
            console.log("inner func: this.foo = " + this.foo);
            console.log("inner func: self.foo = " + self.foo);
        }());
    }
};

console.log(myObject.func());
//-----------------------------------------------------------------------------
2.
// var myObject = {
//     foo: "bar",
//     func: ()=> {
//         var self = this;
//         console.log("outer func: this.foo = " + this.foo);
//         console.log("outer func: self.foo = " + self.foo);

//         (function () {
//             console.log("inner func: this.foo = " + this.foo);
//             console.log("inner func: self.foo = " + self.foo);
//         }());
//     }
// };
// console.log(myObject.func());
//---------------------------------------------------------------------------------
3.
// let obj ={
//     x:1,
//     y:"ABC",
//     z:{a:90},
//     t:[1,2]
// }
// Object.freeze(obj);
// obj.x=10;  
// obj.y="PQR";
// obj.z.a=1;
// obj.t[0]=3;
// obj.t[1]=4;
// obj.t.push(6)
// console.log(obj);

//------------------------------------
//4. Difference in useMemeo(),useCallback(),and React.memo()

//5. PureComponent

//6 .how to apply purecomponent in functional component

//7. call apply and bind method

// 8. class MyComponent extends Component{
//     constructor(props){
//         super();
//     }
//     render(){
//         return(
//             <div>{props.Name}</div>
//         )
//     }
// }

//9. call by value and call by reference in react.js

//10. [1,2,3,4,5] --->[3,4,5,1,2]
//11. filter and find
//12. Memory leackage
//13. error boundary
//14. Lazy Loading --->suspanse
//15. interceptor -> encrption decryption
//16. state management
//17  passing data from child to parent component
//18. forward ref
//19. redux flow -> dispatch ? reducers?
//20. which one is execute first promise or setTimeOut
//21. console.lo(7>6>5); why?
//22. [1,6,7,2,2,1,1,6,6,0,9,1] filter the array and find the occurence of a number how many time.

23 //console.log(typeof undefined);
//console.log(typeof null);



let obj1 ={
    name:"Tarun",
    city:"noida"
}
delete obj1.city;
console.log(obj1.city);

let obj =  Object.create({
    name:"Tarun",
    city:"noida"
})
delete obj.city;

console.log(obj.city);