const electron = require('electron');
const path = require('path');
const url = require('url');

// In development, use hot reloading react server, not flat files.  
// Also electron opens with developer tools open
const IS_DEV = (process.argv[2] === 'development');

const electronApp = electron.app;
const BrowserWindow = electron.BrowserWindow;

// global reference of the window object needed to stop garbage collection closing the window.
let mainWindow;

console.log('creating Electron')

electronApp.on('ready', createWindow);
electronApp.on('window-all-closed', function () {
  // on mac & not developing don't quit, instead stay on menu bar
  if (IS_DEV || process.platform !== 'darwin') electronApp.quit();
});

electronApp.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 768, 
    height: 768,
    webPreferences: {},
  });

  if (IS_DEV){
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.webContents.openDevTools();

  } else {
    const startUrl = url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
    mainWindow.loadURL(startUrl);
  }

  mainWindow.on('closed', function () {
    // Dereference the window object
    mainWindow = null;
  })

  console.log('created Electron');
}