var obj={
    x:1,
    y:"ABC",
    z:{a:1},
    t:[1,2]
    }
    
    Object.freeze(obj);
    
    obj.x=3;
    obj.y="PQR";
    obj.z.a=3;
    obj.t[0]=3;
    obj.t[1]=4;

    console.log(obj);

    //let x = [1,2,3,4,5];
// x.unshift(x.pop());
// x.unshift(x.pop());
// x.unshift(x.pop());
// console.log(x);


//----------------------------
// let a = ["9", "1", "9", "3", "3", "9"];
// let unique = a.filter((item,i,arr)=>{    
//     return arr.indexOf(item)===i;
// })
// let g = unique.sort((a,b)=>{
//     debugger
//     if( parseFloat(b)>parseFloat(a)){
//         return 1
//     }else{
//         return -1 
//     }   
// })
// console.log(g);

//----------------------------
const sourceStr = 'I learned to play the Ukulele in Lebanon.';
const searchStr = 'le';
const indexes =  [...sourceStr.matchAll(new RegExp(searchStr,'ig'))].map(x=>x.index);
console.log(indexes);

//----------------------------------------------------------

for (let index = 1; index <= 3; index++) {
    setTimeout(function () {
        console.log('after ' + index + ' second(s):' + index);
    }, index * 1000);
}

//----------
// spread operator
 // Defination - Iterate the value of an array over one or moe arguments.

function sum(x,y,z){
    return x+y+z;
}
let x = [1,2,3,4];
console.log(sum(...x));
//------
let f = [1,2,3];
let g = [2,3,4];

let h= [...f,...g];
console.log(h);

//-----
const myVehicle = {
    brand: 'Ford',
    model: 'Mustang',
    color: 'red'
  }
  
  const updateMyVehicle = {
    type: 'car',
    year: 2021, 
    color: 'yellow'
  }
  
const myUpdatedVehicle = {...myVehicle, ...updateMyVehicle}
console.log(myUpdatedVehicle);

// Rest operator
function gh(x,y,...a){
    return a
}
console.log(gh(1,2,3,4,5))

//-----------------------------------------

