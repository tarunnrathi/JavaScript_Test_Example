//                              CREATE       READ      UPDATE      DELETE
// Object.freeze()                  No        Yes        No          No
// Object.seal()                    No        Yes        Yes         No
// Object.preventExtensions()       No        Yes        Yes         Yes

//Example -------------------------------------------------------------------------------------------
var o1 = {}, o2 = {};
Object.seal(o1);
Object.freeze(o2);

o1["a"] = "worked";
o2["a"] = "worked";

console.log(o1["a"]);   //prints "worked"
console.log(o2["a"]);   //prints "undefined"
//-----------------------------------------------------------
var o3 = {fname:"A",lname:"B"}; var o4 = {fname:"A",lname:"B"};

Object.seal(o3);
Object.freeze(o4);


