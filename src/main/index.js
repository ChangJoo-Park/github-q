'use strict'
import axios from 'axios'
import { app, BrowserWindow, ipcMain } from 'electron'
require('dotenv').config()

const GITHUB_SCOPES = process.env.GITHUB_SCOPES.split(',')
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window OPTIONS
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

ipcMain.on('request-access-token', (event, arg) => {
  const OPTIONS = {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    scopes: GITHUB_SCOPES
  }
  const authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false })
  const githubUrl = 'https://github.com/login/oauth/authorize?'
  const authUrl = githubUrl + 'client_id=' + OPTIONS.client_id + '&scope=' + OPTIONS.scopes
  authWindow.loadURL(authUrl)
  authWindow.show()

  function handleCallback (url) {
    const rawCode = /code=([^&]*)/.exec(url) || null
    const code = (rawCode && rawCode.length > 1) ? rawCode[1] : null
    const error = /\?error=(.+)$/.exec(url)

    if (code || error) {
      // Close the browser if code found or error
      authWindow.destroy()
    }
    console.log('code => ', code, ' url => ', url)
    debugger
    // If there is a code, proceed to get token from github
    if (code) {
      requestGithubToken(OPTIONS, code)
    } else if (error) {
      alert('Oops! Something went wrong and we couldn\'t' +
        'log you in using Github. Please try again.')
    }
  }

  function requestGithubToken (options, code) {
    axios({
      headers: {
        Accept: 'application/json'
      },
      url: 'https://github.com/login/oauth/access_token',
      method: 'POST',
      data: {
        client_id: options.client_id,
        client_secret: options.client_secret,
        code: code
      }
    })
      .then(response => {
        console.log(response)
        const data = response.data
        console.log('data => ', data.access_token)
        event.sender.send('recieve-access-token', data.access_token)
      })
      .catch(error => {
        console.log(error)
      })
  }
  // Handle the response from GitHub - See Update from 4/12/2015

  authWindow.webContents.on('will-navigate', function (event, url) {
    handleCallback(url)
  })

  authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
    handleCallback(newUrl)
  })

  // Reset the authWindow on close
  authWindow.on('close', function () {
    authWindow.destroy()
  }, false)
})
