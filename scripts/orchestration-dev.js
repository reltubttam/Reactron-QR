const Socket = require('net').Socket;
const spawn = require('child_process').spawn;
const chalk = require('chalk')

const reactProcess = spawn('npm', ['run', 'react:start:dev']);
reactProcess.stdout.on('data', (data) => {
  console.log(`${chalk.cyan('react stdout:')}    ${data.toString().trim()}`);
});

reactProcess.stderr.on('data', (data) => {
  console.log(`${chalk.cyan('react stderr:')}    ${data.toString().trim()}`);
});

reactProcess.on('close', (code) => {
  console.log(`${chalk.cyan('react exited!')}    code ${code}`);
});

const client = new Socket();

let startedElectron = false;
function tryConnection(){
  return client.connect({port: 3000}, () => {
    client.end();
    if(!startedElectron) {
        startedElectron = true;
        
        const electronProcess = spawn('npm', ['run', 'electron:start:dev']);
        electronProcess.stdout.on('data', (data) => {
          console.log(`${chalk.green('electron stdout:')} ${data.toString().trim()}`);
        });
        
        electronProcess.stderr.on('data', (data) => {
          console.log(`${chalk.green('electron stderr:')} ${data.toString().trim()}`);
        });
        
        electronProcess.on('close', (code) => {
          console.log(`${chalk.green('electron exited!')} code ${code}`);
        });
    } else {
      console.log(`${chalk.red('electron running, react is not')}`);
    }
  });
}
tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});