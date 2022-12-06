// let a = [2,2,3];

// function calc(param){
//     let startNumber = 0;
//     let countNumber = 0;
//     for(let i=0;i<param.length;i++){
//         if(param[i]>0 && param[i+1]>0){
//             if(!isPrime(param[i]+param[i+1])){
//                 countNumber=countNumber+1;  
//             }
//         }             
//     }
//     //param.splice(startNumber,countNumber);
//     param.splice(startNumber,countNumber);

//     return param;
// }
// console.log([...new Set(calc(a))].reverse());

// function isPrime(num){
//     let count=0;
//     for(let i=1;i<=num;i++){
//         if(i!==1 && i!==num){
//             if(num%i===0){
//                 count=count+1;                
//             }
//             if(num%i!==0){
//                 count=count;
//             }
//         }        
//     }
//     return count === 0?true:false;
// }




// function isPrime(num){
//     let count=0;
//     for(let i=1;i<=num;i++){
//         if(i!==1 && i!==num){
//             if(num%i===0){
//                 count=count+1;                
//             }
//             if(num%i!==0){
//                 count=count;
//             }
//         }        
//     }
//     return count === 0?"Number is prime":"Number is not prime";
// }
// console.log(isPrime(7));

//--------------------------------------------------------------------------

// let arr =[6,1,3,4,3,2,1];
// let finalArray=[];

// function minimumCandies(param){
//     //initial Assignment
//     for(let i=0;i<param.length;i++){
//         finalArray.push(1);
//     }

//     for(let i=0;i<param.length;i++){
//         if(param[i]>param[i+1]){
//             finalArray[i] = finalArray[i]+1;
//         }
//         if(param[i]> param[i-1]){
//             finalArray[i] = finalArray[i]+1;
//         }       
//     }

//     return finalArray;
// }

// console.log(minimumCandies(arr).reduce((a,b)=> a+b));

// find given coordinates are square or not
let coodinates =[        
    
    {x:6,y:2},
    {x:2,y:2},
    {x:2,y:-2},
    {x:6,y:-2},
];

function isSquare(param){
    let lengthX;
    let lengthY;
    let temp1;
    let temp2;
    if(param.filter(t=>t.x>0 && t.y>0).length>0){
        temp1 = param.filter(t=>t.x>0 && t.y>0).sort((a,b)=>{
            if(a.x<b.x) return -1;
            else return 1;
        });
        lengthX = temp1[1].x-temp1[0].x;
        console.log(lengthX);
    }
    if(param.filter(t=>t.x>0 && t.y<0).length>0){
        temp2 =  param.filter(t=>t.x>0 && t.y<0).sort((a,b)=>{
            if(a.x<b.x) return -1;
            else return 1;
        });

        let min_temp1 = temp1.reduce((a,b)=>{87654321` `
            if(a.x>b.x){
                return b;
            }else{
                return a;
            }
        });

        let min_temp2 = temp2.reduce((a,b)=>{
            if(a.x>b.x){
                return b;
            }else{
                return a;
            }
        });
        lengthY = min_temp1.y- min_temp2.y;        
    }
    return lengthX === lengthY?"Yes":"No";

}
console.log("Square = ",isSquare(coodinates));