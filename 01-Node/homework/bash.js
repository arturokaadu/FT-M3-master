const commands = require('./commands/index.js');

const print = function(output){process.stdout.write(output)
    process.stdout.write('\nprompt >')
}


// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  //var cmd = data.toString().trim(); // remueve la nueva línea
 /*  if(cmd === 'date') {
    process.stdout.write(Date());  
  }
  if(cmd === 'pwd') {
    process.stdout.write(process.pwd())    
  } */
let cmd = data.toString().trim().split("")
let args = args.shift()


  if ([cmd]){
    commands[cmd](args, print)
  } else print("c no funca");


 // process.stdout.write('\nprompt > ');
});