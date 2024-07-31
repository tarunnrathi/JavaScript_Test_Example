let name ={
    firstName:"tarun",
    lastName:"rathi",   
}
const f = {
    a:1,
    b: function(){
        const v =()=>{
            console.log(this);
        }
        v();
    }
}
f.b.call(name);


console.log(delete name.firstName)
console.log( name.firstName)
console.log( name)


let arr = [1,1,1];
let arr2 = arr;
let arr3 = [...arr2];
arr2.push(4);
console.log(arr)
console.log(arr2)
console.log(arr3)





console.log(arr2 === arr);
console.log(arr2 === arr3);