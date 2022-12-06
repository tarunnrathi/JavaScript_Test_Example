const {fork} = require('child_process');
const child = fork(`${__dirname}/Child.js`);
child.on('message',(m)=>{
    console.log('PARENT got message:',m);
});

child.send({hello: 'world'});