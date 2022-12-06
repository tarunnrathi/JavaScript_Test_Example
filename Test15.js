let obj = {
    name:"abc",
    marks:123,
    menu:{
    subMenu1:"submenu1",
    subMenu2:{
        subsubMenu1:"subsubMenu1",
        subsubMenu2:{
            subsubsubMenu1:"subsubsubMenu1",  
            subsubsubMenu2:{
                subsubsubsubMenu1:"subsubsubsubMenu1"
            } 
        },
    }

    }
    }
    
    
    // abc 123 submenu1 subsubMenu1 subsubsubMenu1 subsubsubsubMenu1
    let temp="";
    
    function fun(param){
    let m = Object.keys(param);
    for(let item of m){
    if(typeof param[item] === "object" ){
     fun(param[item]);
    }else{
    temp = temp+param[item]+ " ";
    }    
    }
    return temp;
}
    
    console.log(fun(obj));
    