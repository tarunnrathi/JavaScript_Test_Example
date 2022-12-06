let a= 407;

function fun(num){
    let b = Number(num).toString();
    let w = b.split('');
    let temp=0;
   for(var i=0;i<b.split('').length;i++){

    temp = temp+(Math.pow(b.split('')[i],3));
   }
   console.log(temp);
   return temp;
}

console.log(   fun(a)===a?"Armstrong Number":"Not");


// let a =9;

// function fun(num){    


//     if(num%2){
//         console.log("even");
//     }else{
//         console.log("");
//     }

// }

// fun(a);

// Employee Table
//  EMPID, EMPNAME, DOB
 
//  Salary Table
//  SALID, c, SAL_AMT, SAL_MONTH, SAL_YEAR
// write a query to get all the employees names who got third highest salary in month of march, 2021