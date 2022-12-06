let arr = [5,1,4,2,8];
let s=0;



//console.log( arr.reduce((a,b)=>a+b));

// using single loop
for(var i=0;i<arr.length;i++){
    s=s+1;
    if(arr[i]>arr[i+1]){
        let temp = arr[i];
        arr[i]=arr[i+1];
        arr[i+1] = temp;
        i=-1;
    }
}

console.log(s);



10
