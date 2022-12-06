let arr = [
    { id: 1, name: "Amit", compon: 1000, city: "Noida" },
    { id: 2, name: "Mohan", compon: 2000, city: "Delhi" },
    { id: 3, name: "Raj", compon: 3000, city: "Delhi" },
    { id: 4, name: "Kamal", compon: 4000, city: "Gurugram" },
]
let f = {
    "Nodia":[{}],
    "Delhi":[
        {},
        {}
    ],
    "Gurugram":[{}]
}

let count = {}

for(const item of arr){
    let f =count[item.city];
    count[item.city]= count[item.city]?[...count[item.city],item]:[item];
}
console.log(count);

let arr1 = [1, 2, 3, [4, 5, [6, 7,[8,9,[10,11,12,[13]]]]]];
let neeArr = [];

function fun(param) {
    param.map(item => {
        if (typeof item === "number") {
            neeArr.push(item);
        } else {
            fun(item);
        }
    })
    return false;
}
console.log("neeArr= ", neeArr, fun(arr1));