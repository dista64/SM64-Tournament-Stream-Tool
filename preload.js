const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('electron', {
  fs,
  path,
  ipcRenderer,
  sendTimerUpdate: (timerValue) => ipcRenderer.send('timer-update', timerValue),
  onTimerSync: (callback) => ipcRenderer.on('timer-sync', (event, timerValue) => callback(timerValue)),
});