async function abc(){
    const obj = { then:(f)=>f('abc')};
    return obj;
}

async function xyz(){
   const obj = { catch:(f)=>f('xyz')};    
    return obj;
}

abc().then(value=>{
    console.log(value);   //output - abc
});

// xyz().then(value=>{
//     console.log(value);   //output - {next:f}
// });

xyz().then(value=>{
    console.log(value);   //output - {next:f}
});