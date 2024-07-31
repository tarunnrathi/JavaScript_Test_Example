let a ={x:1};

let b = Object.create({
    x:1,
    y:2
})
//delete b.x;
console.log( delete b.x);
console.log(  b.x);
console.log(  b);


