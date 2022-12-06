// function fun(arg){
//     for(var i=1;i<=arg;i++){  
//         if(i%3===0||i%5===0){
//             if(i%3===0 && i%5===0){
//                 console.log("i=",i,"Apple  & Orange");  
//             }else{
//                 if(i%3===0){
//                     console.log("i=",i,"Apple"); 
//                 } 
//                 if(i%5===0){
//                     console.log("i=",i,"Orange");    
//                 }
//             }
//         }else{
//             console.log("i=",i);   
//         }
//     }
// }
// fun(20);


function fun(arg){
    for(var i=1;i<=arg;i++){  
        console.log(i%3===0 && i%5===0?`i=${i},Apple & Orrange`:i%3===0?`i=${i},Apple`:i%5===0?`i=${i},Orange`:`i=${i}`);
    }
}
fun(20);