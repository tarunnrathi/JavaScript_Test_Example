let  a=[1,6,7,2,2,1,1,6,6,0,9,1];

for(let i=0;i<a.length;i++){
    for(let j=i+1;j<a.length;j++){
      if(a[j]>a[i]){

      }else{
          let temp = a[j];
          a[j]=a[i];
          a[i]=temp;
      } 
    }
}
console.log(a);


//console.log("a=",[...new Set(a)]);

const counts ={};
for(const num of a){
    counts[num]=counts[num]?counts[num]+1:1;
}
console.log((counts));
console.log(Object.keys(counts));
let h =Object.keys(counts).map(item=>{
    return parseFloat(item);
})
console.log("h= ",h);
console.log(counts[0],counts[1],counts[2],counts[6],counts[7],counts[9]);



function Student() {
    this.name = 'John';
    this.gender = 'M';
}

// var studObj = new Student();

// console.log(Student.prototype); // object
// console.log(studObj.prototype); // undefined
// console.log(studObj.__proto__); // object

// console.log(typeof Student.prototype); // object
// console.log(typeof studObj.__proto__); // object

//------------------------------------------------

var array3=[11,12,20,14,15];
console.log("array3 = ",array3.splice(2,1,"Hello","World"));
