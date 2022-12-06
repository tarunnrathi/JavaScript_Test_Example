function binomial(n){
    let fact = 1;
    let temp="";
    let mainExpression ="";
    let sign = "+";
    let initialValue = "x";
    for (let i = 1; i <= n; i++) {
        if(temp){
            temp = temp +("*"+initialValue);            
            fact *= i;  
            if(i%2){ 
                sign = sign==="+"?"-":"+";           
                let m = (sign + temp)+"/"+fact.toString();
                mainExpression= mainExpression + m; 
            }        
        }else{
            fact *= i
            temp = initialValue 
            mainExpression = temp;            
        }
    }
    return mainExpression;
}
console.log(binomial(11));


// function binomial(n){
//     let fact = 1;
//     let temp="";
//     let mainExpression ="";
//     let sign = "+";
//     let initialValue = 4;
//     for (let i = 1; i <= n; i++) {
//         if(temp){
//             temp *=initialValue;            
//             fact *= i;  
//             if(i%2){ 
//                 sign = sign==="+"?"-":"+";    
//                 if(sign==="+"){
//                     mainExpression = mainExpression + (temp/fact); 
//                 }else{
//                     mainExpression = mainExpression - (temp/fact);    
//                 } 
//             }        
//         }else{
//             fact *= i
//             temp = initialValue 
//             mainExpression = temp;            
//         }
//     }
//     return mainExpression;
// }
// console.log(binomial(15));