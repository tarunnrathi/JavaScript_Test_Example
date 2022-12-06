// function welcome(name:string){
//     console.log("Hi");
//     setTimeout(()=>{
//         console.log(`I am ${name}`);  
//     });
//     console.log(`By ${name}`);  
// }
// welcome('Turing');
//-----------------------------
// class TuringPoint{
//     x:number;
//     y:number;
// }
// interface Point3d extends TuringPoint{
//     z:number;
// }
// let point3d: Point3d ={x:3,y:8,z:9}
// console.log(point3d);
//---------------------------------------
// 'unknown' vs. 'any'
//unknown is the parent type of all other types. it's a regular type in the type system.
//"unknown which is the type-safe counterpart of any."
//any means "turn off the type check". it's kind of meta programming.
// let vAny: any = 10;          // We can assign anything to any
// let vUnknown: unknown =  10; // We can assign anything to unknown just like any 
// let s1: string = vAny;     // Any is assignable to anything 
// let s2: string = vUnknown; // Invalid; we can't assign vUnknown to any other type (without an explicit assertion)
// vAny.method();     // Ok; anything goes with any
// vUnknown.method(); // Not ok; we don't know anything about this variable
// type Foo = unknown extends string ? true : false // false
// type Bar = any extends string ? true : false     // boolean - i.e. both true and false
// Unknown
// If you write a function that only passes down an input to another function, use unknown. From the perspective of the function: "I don't know, I don't wanna know". There is nothing wrong with using unknown.
// E.g.:
// function buy(item: unknown): Purchase {
//   if (item) {
//     return purchase(item);
//   } else {
//     throw new TypeError('item is missing');
//   }
// }
// Any
// If you need to call properties on that value, then any is more suited.
// Linting might not like any, suggesting you to be more specific with your input. That way, if you change the interface from isItem to isValid, typescript tells you to update your code.
// E.g.:
// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// function isItem(item: any): item is Purchase {
//   return !!item?.price;
// }
// Calling properties
// function isStuff(item: unknown): item is Stuff {
//   return (item as Stuff).it !== undefined;
// }
// function isStuff(item: any): item is Stuff {
//   return item.it !== undefined;
// }
// camelcaseKeys(item) as unknown as Item;
//----------------------------------------------------
// interface calcy{
//     mul(n:number):any;
// }
// class display implements calcy{
// x:number=0;
// mul(n: number):any {
//     this.x=n*n;
// }
// mul(n:string):any{
//     this.x=n+n;
// }
// }
// let arr =new display;
// arr.x=3;
// console.log(arr.mul(9));
//---------------------------------------
// function hello(turn:string):string{
//     console.log(turn);
//     return turn;
// }
// console.log("hi"+ hello("tarun"));
//----------------------------------------------
// let obj ={
//     x:1,
//     y:"ABC",
//     z:{a:90},
//     t:[1,2]
// }
// Object.freeze(obj);
// obj.x=10;
// obj.y="PQR",
// obj.z.a=1;
// obj.t[0]=3;
// obj.t[1]=4;
// obj.t.push(6)
// console.log(obj);
var t = 5;
t = "k";
console.log(t);

// let x =[10,2,11,3,9];
// console.log(x.slice(0,2))
// console.log(x)
// console.log(x.splice(0,2));
// console.log(x)

let x =[10,2,11,3,9];
let y =x.sort((a,b)=>{
    if(a>b) return 1;
    else return -1;

})
console.log(y);