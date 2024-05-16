// アプリケーション作成用のモジュールを読み込み
const { app, BrowserWindow, ipcMain } = require("electron");

const Store = require("electron-store");

const KeyBoarderData = new Store({name: "KeyBoarderData"}); //Dataを格納しておくStore

// メインウィンドウ
let mainWindow;

const createWindow = () => {
    // メインウィンドウを作成します
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 600,
        resizable: false,
        minimizable: false,
        webPreferences: {
            // プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行され、
            // レンダラーのグローバル（window や document など）と Node.js 環境の両方にアクセスできます。
            nodeIntegration: false,
            contextIsolation: true,
            preload: __dirname + "/preload.js",
            devTools: true // 開発者ツールを無効化
        },
    });

    // 開発者ツールを開くためのショートカットキーの定義
    const { globalShortcut } = require("electron");
    globalShortcut.register("CommandOrControl+Shift+I", () => {
        mainWindow.webContents.openDevTools();
    });

    // メインウィンドウに表示するURLを指定します
    mainWindow.loadURL(`file://${__dirname}/GameWindow.html`);

    // メインウィンドウが閉じられたときの処理
    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    mainWindow.setMenu(null);

};

// 初期化が完了した時の処理
app.whenReady().then(() => {
    createWindow();

    // アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
    app.on("activate", () => {
        // メインウィンドウが消えている場合は再度メインウィンドウを作成する
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// アプリの二重起動防止
const SecondWindow = app.requestSingleInstanceLock();
if (!SecondWindow) {
    app.quit();
}

// 全てのウィンドウが閉じたときの処理
app.on("window-all-closed", () => {
    // macOSのとき以外はアプリケーションを終了させます
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// IPC通信(DataAPI関係)

//LoadingData(Data取得処理)
ipcMain.handle("LoadingData", async () => {
    return KeyBoarderData.get("KeyBoarderData", {}); //KeyBoarderDataがあれば取り出し、なければ空のリストを返す
});

//SavingData(Data保存処理)
ipcMain.handle("SavingData", async (event, Data) => {
    KeyBoarderData.set("KeyBoarderData", Data); // 保存
});

//CloseWindow(アプリケーション終了)
ipcMain.handle("CloseWindow", async () => {
    app.quit();
});