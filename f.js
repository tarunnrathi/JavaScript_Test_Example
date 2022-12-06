// function welcome(name:string){
//     console.log('hi');
//     setTimeout(()=>{
//         console.log(`I am ${name}`);
//     },0);
//     console.log(`Bye ${name}`);
// }
// welcome('Turing');
//ANS: 
// hi
// Bye Turing
// I am Turing
//------------------------
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// class Tp{
//     x:number;
//     y:number;
// }
// interface Point extends Tp{
//     z:number;
// }
// let point: Point={x:3,y:8,z:9};
// console.log(point);
//------------------------------------
var obj1 = { food: 'pizza', car: 'ford' };
var obj2 = { animal: 'dog' };
var obj3 = __assign(__assign({}, obj1), obj2);
console.log(obj3);
//------------------------------------
var str1 = 'This is Apple';
var regStr1 = /is/.exec(str1);
var regStr2 = /is/.test(str1);
console.log("exec = ", regStr1);
console.log("test = ", regStr2);
//------------------------------------
var nature = {
    tree: 1,
    lake: 3,
    pond: 4
};
var tree = nature.tree, lake = nature.lake;
console.log("tree =", tree);
