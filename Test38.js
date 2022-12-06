// const data = [{a1:"Text1", a2:"Text2"},{a3:"Text3",a4:"Text4"}];

// data.forEach(item => {
//     if(typeof item ==="object"){
//         fun(item);
//     }
    
// });

// function fun(param){
// let obj = Object.keys(param);
// obj.map((item)=>{
// console.log(param[item]);
// })
// }

let str = "todaiyisfriday";
// todayisfry 10
let newStr="";

for(let i=0;i<str.length;i++){   
    if(str[i] !== str[i+1]){  
        let tempStr = newStr[newStr.length-1]||""; 
        if(!tempStr.match(str[i])){
            if(str[i+1]){
                newStr= newStr+str[i];               
            }else{
                if(newStr.length>str[i].length){
                    newStr= newStr+str[i]
                }else{
                    newStr= str[i]; 
                }                
            }
        }  
    }
}

// function firstNonRepeatedCharacter(string) {
//     for (var i = 0; i < string.length; i++) {
//         var c = string.charAt(i);
//         var e = string.indexOf(c,i+1);  
//         if (string.indexOf(c) == i && string.indexOf(c,i+1) == -1) {
//             return c;
//         }
//     }
//     return null;
// }
console.log(newStr);
//console.log(firstNonRepeatedCharacter(str));

