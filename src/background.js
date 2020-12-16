'use strict'

import { app, protocol, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
// import store from '@/store'
// import { icon } from '@fortawesome/fontawesome-svg-core'
const isDevelopment = process.env.NODE_ENV !== 'production'
let logged = {}

//全局先定义broswerwindow，以便之后调用
let win
//全局定义托盘，避免作为局部变量被回收
let tray
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// async function createWindow() {
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width:280,
    height:400,
    // minHeight:500,
    // minWidth:700,
    frame:false,
    resizable:false,
    movable:true,
    fullscreenable:false,
    enableLargerThanScreen:false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      // await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

ipcMain.on('window-max',function() {
  if(win.isMaximized()){
    win.restore()
  }else{
   win.maximize(); 
  }
})
ipcMain.on('window-min',function() {
  win.minimize()
})
ipcMain.on('window-close',function() {
  console.log(logged.logined)
  console.log(logged)
    if(logged.logined){
    win.hide()
  }else{
    console.log('fdgd')
    // app.quit()
    app.exit()
  }
})
ipcMain.on('window-on-top',function() {
  if(win.isAlwaysOnTop()) {
    win.setAlwaysOnTop(false)
  }else{
    win.setAlwaysOnTop(true) 
  }
})
ipcMain.on('login',function(event,data) {
  win.setSize(850,700)
  win.setResizable(true)
  win.setMinimumSize(700,500)
  win.center()
  tray = new Tray('./src/assets/logo.png')//新建托盘，中间参数为托盘图标
  logged = data

  //菜单项
  var menuItems = [
    {
      label:'设置',
      click:() => {

      }
    },
    {
      label:'意见反馈',
      click:() => {

      }
    },
    {
      label:'帮助',
      click:() => {

      }
    },
    {
      label:'关于微信',
      click:() => {

      }
    },
    {
      label:'退出微信',
      click:function () {
        // app.quit()//失败
        app.exit()//没有回调函数，直接退出
      }
    }
  ]
  const trayContextMenu = new Menu.buildFromTemplate(menuItems)
  //鼠标划上托盘显示的内容
  tray.setToolTip('微信')
  tray.setContextMenu(trayContextMenu)
  //单机托盘显示应用
  tray.on('click',()=>{
    win.show()
  })
  
})
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
