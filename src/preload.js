const { contextBridge, ipcRenderer } = require("electron");

window.ipcRenderer = ipcRenderer;

// IPC通信(DataAPI関係)
contextBridge.exposeInMainWorld(
    "dataapi", {
    LoadingData: () => ipcRenderer.invoke("LoadingData"),
    SavingData: (Data) => ipcRenderer.invoke("SavingData", Data),
    SavingOtherData: (Data) => ipcRenderer.invoke("SavingOtherData", Data),
    CloseWindow: () => ipcRenderer.invoke("CloseWindow")
});

window.addEventListener("DOMContentLoaded", () => {
    // DOM要素のテキストを変更します
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) {
            element.textContent = text;
        }
    };
  
    for (const dependency of ["chrome", "node", "electron"]) {
        // HTMLページ内の文言を差し替えます
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});