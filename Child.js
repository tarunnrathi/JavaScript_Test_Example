const {fork} = require('child_process');
const process = fork(`${__dirname}/Parent.js`);

process.on("message", (m) => {
  console.log("CHILD got message:", m);
});

process.send({ foo: "bar" });
