const electron = require('electron');
const path = require('path');
const url = require('url');

// In development, use hot reloading react server, not flat files.  
// Also electron opens with developer tools open
const IS_DEV = (process.argv[2] === 'development')

// Module to control application life.
const electronApp = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

console.log('creating Electron')

createElectron();

function createElectron (){

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  electronApp.on('ready', createWindow);

  // Quit when all windows are closed.
  electronApp.on('window-all-closed', function () {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
          app.quit()
      }
  });

  electronApp.on('activate', function () {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) {
          createWindow()
      }
  });
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 768, 
    height: 768,
    webPreferences: {},
  });

  // and load the index.html of the app or point to react dev server.
  let startUrl = 'http://localhost:3000/'
  if (!IS_DEV){
    startUrl = url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  }

  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  if (IS_DEV){
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
  })

  console.log('created Electron')
}