let a = "lays-2345677-25-345-ounces-pack-234234?"
let r = a.substring(a.lastIndexOf("-") + 1);
let e = r.match(/(\d+)/);
console.log(e[0]);