//変数宣言
/**
 * 曲リスト
 */
const MusicNameList = {
    "Tutorial":{
        TMP: [1.0, "さあ、KeyBoarderを始めよう!"],
        TYP: ["null"],
        IMP: ["null"],
        SPC: ["null"]
    },
    "小さな大冒険!":{
        TMP: [1.2, ""],
        TYP: [3.6, ""],
        IMP: [7.5, ""],
        SPC: [10.9, ""]
    },
    "クリスマスボックス":{
        TMP: [2.5, ""],
        TYP: [4.5, ""],
        IMP: [11.1, ""],
        SPC: [14.9, ""]
    },
    "Ignotus":{
        TMP: [4.9, ""],
        TYP: [5.6, ""],
        IMP: [12.9, ""],
        SPC: [15.1, ""]
    },
    "Brillante":{
        TMP: [3.2, ""],
        TYP: [5.8, ""],
        IMP: [9.2, ""],
        SPC: [13.6, "点滅って案外視認性悪いね"]
    },
    "Donker nachtzicht":{
        TMP: [1.7, ""],
        TYP: [3.0, ""],
        IMP: [12.1, ""],
        SPC: [14.4, ""]
    },
    "mastermind":{
        TMP: [3.8, ""],
        TYP: [6.2, ""],
        IMP: [9.6, ""],
        SPC: [15.4, ""]
    },
    "Ⅷ424954":{
        TMP: [3.0, ""],
        TYP: [5.1, ""],
        IMP: [11.8, ""],
        SPC: [15.0, "やっぱりゲームって、楽しいよね。"]
    },
    "WHEREABOUTS":{
        TMP: [1.9, ""],
        TYP: [4.3, ""],
        IMP: [10.3, ""],
        SPC: [15.3, ""]
    },
    "Unsecretable Love":{
        TMP: [3.2, ""],
        TYP: [6.1, ""],
        IMP: [9.9, ""],
        SPC: [13.0, ""]
    },
    "PaintMusic_2021-04-15-11-26-50_FunDream":{
        TMP: [2.3, ""],
        TYP: [6.8, ""],
        IMP: [11.2, ""],
        SPC: [13.3, ""]
    },
    "PaintMusic_2021-06-17-13-05-37_暇潰しで作っていったキョークー":{
        TMP: [4.4, ""],
        TYP: [7.5, ""],
        IMP: [12.7, ""],
        SPC: [16.0, "かなり初期の曲"]
    },
    "PaintMusic_2021-09-18-06-45-00_Musicing!":{
        TMP: [2.0, ""],
        TYP: [6.0, ""],
        IMP: [10.0, ""],
        SPC: [13.7, ""]
    },
    "HachaMecha Musical♪":{
        TMP: [5.2, ""],
        TYP: [8.8, ""],
        IMP: [13.3, ""],
        SPC: [16.3, "かなり明るい初期ボス曲"]
    },
    "ほりでい":{
        TMP: [1.3, ""],
        TYP: [3.6, ""],
        IMP: [7.0, ""],
        SPC: [10.1, "毎日休みだったらな～"]
    },
    "瀞":{
        TMP: [1.1, ""],
        TYP: [2.1, ""],
        IMP: [5.0, ""],
        SPC: [8.1, "果たして音ゲーにこんな睡眠曲は採用されるのか"]
    },
    "孤独宇宙旅行記":{
        TMP: [3.9, ""],
        TYP: [8.2, ""],
        IMP: [12.5, ""],
        SPC: [15.9, ""]
    },
    "くぁｗせｄｒｆｔｇｙふじこｌｐ":{
        TMP: [4.4, ""],
        TYP: [8.7, ""],
        IMP: [10.9, ""],
        SPC: [14.7, "君もこの曲でこれを打つ練習をしよう!"]
    },
    ".ヽ(^Д^*)/. ゜":{
        TMP: [2.7, "Ｏ(≧∇≦)Ｏ"],
        TYP: [6.6, "ヽ（★>з<）。o○　○o。（>ε<☆）ノ"],
        IMP: [12.3, "(*´-ω-｀)・・・"],
        SPC: [15.6, "(# ﾟДﾟ)つ〃∩"]
    },
    "赤い夕日に向かって":{
        TMP: [2.1, ""],
        TYP: [5.0, ""],
        IMP: [11.7, ""],
        SPC: [14.9, ""]
    },
    "ただただ高速連打をさせたいという意思しかこもってない曲":{
        TMP: [4.6, "さすがにこの難易度は連打ないよ"],
        TYP: [8.0, "ひとつ前の難易度から少しノーツの割合を高くしただけ"],
        IMP: [14.7, "ひとつ前の難易度から更にノーツの割合を高くしただけ"],
        SPC: [16.1, "これが高速連打地獄"]
    },
    "Letoronian":{
        TMP: [2.4, ""],
        TYP: [6.8, ""],
        IMP: [11.9, ""],
        SPC: [13.3, ""]
    },
    "Rotation":{
        TMP: [3.4, ""],
        TYP: [7.0, ""],
        IMP: [13.3, ""],
        SPC: [14.8, ""]
    }
}; //新規に曲を追加したい場合、ここに曲情報を追加しておく(手動)
/**
 * セレクト場面に表示される曲のリスト
 */
let AddMusicList = [];
let MusicLengthNumber = 0;
let SelectMusicListNumber = 0;
/**
 * 曲の詳細データ
 */
let Data = {};
/**
 * 設定の詳細データ
 */
let OtherData = {};
const SelectPlayMode = [
    "Default",
    "Random"
];
const Byte = [
    "KB",
    "MB",
    "GB",
    "TB"
];
const Difficulty = [
    "TMP",
    "TYP",
    "IMP",
    "SPC"
];
const SortType = [
    "デフォルト順",
    "単語順",
    "難易度順",
    "スコア順"
];
/**
 * 譜面の種類 [Default, Random]
 */
const ChartType = [
    "Default",
    "Random"
];
/**
 * 現在表示されているゲーム画面
 */
const FocusID = {
    "OpeningMovie":{Focus: true},
    "StartMenu":{Focus: false},
    "SelectMenu":{Focus: false},
    "PlayingWaitMenu":{Focus: false},
    "SettingMenu":{Focus: false},
    "PlayMode":{Focus: false},
    "ResultMenu":{Focus: false}
};
const SceneChangeTime = 400;
const PlayingWaitTime = 500;
const ScrollValue = 203.5;
//変数宣言

//曲
const OpeningMusic = new Audio("Music/BackGround/Opening.mp3"); //オープニング音楽
const StartMusic = new Audio("Music/BackGround/StartingMusic.mp3"); //スタート音楽
const StartMusic2 = new Audio("Music/BackGround/StartingMusic2.mp3"); //セレクト音楽
let BackGroundMusic = {
    "OpeningMusic": {
        name: OpeningMusic,
        volume: 1
    },
    "StartMusic": {
        name: StartMusic,
        volume: 0
    },
    "StartMusic2": {
        name: StartMusic2,
        volume: 0
    }
};
//曲

//ゲーム曲
/**
 * ゲーム曲リスト
 */
const ChartMusic = [
];
for (let MusicTemp of Object.keys(MusicNameList)) {
    try {
        ChartMusic.push(new Audio("Music/Game/" + MusicTemp + ".mp3"));
    } catch {
        console.error(MusicTemp + ".mp3が存在しません。");
        continue;
    }
}
//ゲーム曲

//SE
const Select = new Audio("SE/Select.mp3"); //選択SE
const Back = new Audio("SE/Back.mp3"); //戻るSE
const Move = new Audio("SE/Move.mp3"); //移動SE
const Play = new Audio("SE/Play.mp3"); //プレイSE
//SE

function MusicNameListSort(SortMode) {
    //配列の順番が変わっていた際に、順番を合わせる
    if (SortMode == 0) {
        //配列順
        Data = Object.fromEntries(Object.keys(MusicNameList).filter(key => Data.hasOwnProperty(key)).map(key => [key, Data[key]]));
        if (OtherData.Reverse) Data = Object.fromEntries(Object.entries(Data).reverse());
    } else if (SortMode == 1) {
        //アルファベット順
        Data = Object.fromEntries(Object.keys(Data).sort((a, b) => {return a.localeCompare(b, "ja")}).map(key => [key, Data[key]]));
        if (OtherData.Reverse) Data = Object.fromEntries(Object.entries(Data).reverse());
    } else if (SortMode == 2) {
        //難易度順
        //MusicNameListのキーからDataのキーの中にあるものだけをフィルターした後、
        //MusicNameListのキーを難易度の値が数字の場合を優先・小さい順に並び替えたものをキーの順番に従ってDataオブジェクトを再構築
        Data = Object.fromEntries(
            Object.keys(MusicNameList).filter(key => Data.hasOwnProperty(key))
            .sort((a, b) => (typeof(MusicNameList[a][Difficulty[OtherData.SetDifficulty]][0]) !== "number") - (typeof(MusicNameList[b][Difficulty[OtherData.SetDifficulty]][0]) === "number"))
            .sort((a, b) => {
                return (
                    OtherData.Reverse ?
                    MusicNameList[b][Difficulty[OtherData.SetDifficulty]][0] - MusicNameList[a][Difficulty[OtherData.SetDifficulty]][0] :
                    MusicNameList[a][Difficulty[OtherData.SetDifficulty]][0] - MusicNameList[b][Difficulty[OtherData.SetDifficulty]][0]
                )
            })
            .map(key => [key, Data[key]])
        );
    } else if (SortMode == 3) {
        //スコア順
        Data = Object.fromEntries(
            Object.keys(MusicNameList).filter(key => Data.hasOwnProperty(key))
            .sort((a, b) => {
                return (
                    OtherData.Reverse ?
                    Data[b].Score[ChartType[OtherData.RandomMode]][Difficulty[OtherData.SetDifficulty]] - Data[a].Score[ChartType[OtherData.RandomMode]][Difficulty[OtherData.SetDifficulty]] :
                    Data[a].Score[ChartType[OtherData.RandomMode]][Difficulty[OtherData.SetDifficulty]] - Data[b].Score[ChartType[OtherData.RandomMode]][Difficulty[OtherData.SetDifficulty]]
                )
            })
            .map(key => [key, Data[key]])
        );
    }
    const testest = null;

    //ソートモードの文字変更
    SelectSortText.innerHTML = "開始[Enter] : 曲選択[W(↑)・S(↓)] : 難易度選択[A(←)・D(→)] : " + SortType[OtherData.SortMode] + "[Q] : " + (OtherData.Reverse ? "降順" : "昇順") + "[E]";

    //選択番号を正しい場所に移動させる
    AddMusicList = Object.keys(Data).filter(key => Data.hasOwnProperty(key) && Data[key]?.Display === true);
    for (let i of Object.keys(Data)) if (Data[i].Focus) SelectMusicListNumber = AddMusicList.indexOf(i);
}

//保存データから曲を読み込む
async function LoadData() {
    try {
        let TempData = await window.dataapi.LoadingData(); //保存内容を読み込み
        Data = TempData.MusicData || {};
    } catch (error) {
        console.log("曲の保存項目がありません。");
        Data = {}; //保存データが存在しない場合は空のリストを新規作成
    }

    try {
        let TempData = await window.dataapi.LoadingData(); //保存内容を読み込み
        OtherData = TempData.OtherData || {
            MusicVolume: 1,
            SEVolume: 1,
            BackGroundOpacity: 1,
            MusicGap: 0,
            SetDifficulty: 0,
            RandomMode: 0,
            SortMode: 0,
            Reverse: false,
            Effect: true,
            SameTiming: true
        };
    } catch (error) {
        console.log("設定の保存項目がありません。");
        OtherData = {
            MusicVolume: 1,
            SEVolume: 1,
            BackGroundOpacity: 1,
            MusicGap: 0,
            SetDifficulty: 0,
            RandomMode: 0,
            SortMode: 0,
            Reverse: false,
            Effect: true,
            SameTiming: true
        }; //保存データが存在しない場合は初期のリストを新規作成
    }

    OpeningMusic.currentTime = 0;
    OpeningMusic.volume = OtherData.MusicVolume;
    OpeningMusic.play();
} //Dataを読み込む関数

async function SaveData() {
    let TempData = {};
    TempData.MusicData = Data;
    TempData.OtherData = OtherData;
    await window.dataapi.SavingData(TempData); //進行内容を保存
} //Dataを保存する関数

async function DeleteData() {
    for (let DeleteNumber in Data) delete Data[DeleteNumber];
    await window.dataapi.SavingData(JSON.stringify(Data)); //リセット内容を保存
    await window.dataapi.CloseWindow(); //アプリケーション終了
} //Dataを削除する関数

/**
 * 読み込んだ保存データをリストとして表示する関数
 */
function LoadMusicList() {
    //新しいバージョンで追加する曲があった場合、ここに　EntryMusicData.Conditions_AddMusicInfoToData(追加する曲の解放条件(曲名), 追加する曲名)　を書いていく(手動)
    //期間限定で公開する曲があった場合、ここに　EntryMusicData.Event_AddMusicInfoToData(追加する曲の解放条件(無名関数), 追加する曲名)　を書いていく(手動)

    //テストプレイ時の確認(全曲解禁)
    const testest = null;
    for (let i of Object.keys(MusicNameList)) EntryMusicData.AddMusicInfoToData(i);
    Data["Tutorial"].HavePlayed[Difficulty[OtherData.SetDifficulty]] = true;

    //完全初期状態
    if (Object.keys(Data).length == 0) {
        EntryMusicData.AddMusicInfoToData("Tutorial");
    }

    //もし初期選択のDisplayがfalseなら、一番上の曲を初期選択にする
    for (let i of Object.keys(Data)) {
        if (Data[i].Focus && !Data[i].Display) {
            Data[i].Focus = false;
            SelectMusicListNumber = 0;
            for (let j of Object.keys(Data)) {
                if (Data[j].Display) {
                    Data[j].Focus = true;
                    break;
                }
            }
        }
    }

    //Data内の曲を読み込み
    for (let i of Object.keys(Data)) {
        if (Data[i].Display) {
            EntryMusicData.AddMusicInfoToData(i);
        }
    }

    MusicNameListSort(OtherData.SortMode);

    //Data内の曲をセレクトメニューに表示
    for (let i of Object.keys(Data)) if (Data[i].Display) CreateSelectMusicList(i);

    //スクロールの位置を適切な場所に移動
    SmoothScrollMusicSelect();
    //横スクロールアニメーションの開始
    if (document.getElementById("MusicText" + SelectMusicListNumber).offsetWidth >= 430) document.querySelector("#MusicText" + SelectMusicListNumber).classList.replace("Scroll", "TextScroll");
    
    SaveData();
} //曲を読み込む関数

/**
 * 曲情報を再読み込みする関数
 */
function ReloadMusicSelect() {
    for (let i = 0; i != MusicLengthNumber; i++) document.querySelector("#MusicSelectTemp" + i).remove();
    MusicLengthNumber = 0;
    AddMusicList = [];
    LoadMusicList();
} //曲の再読み込み関数

//曲追加関数
/**
 * 曲情報を追加するクラス
 */
class EntryMusicData {
    /**
     * 曲情報を新たにDataに追加する関数
     * @param {string} 追加する曲名
     */
    static AddMusicInfoToData(MusicName) {
        //もし曲が曲リストにないなら終了
        if (Object.keys(MusicNameList).indexOf(MusicName) == -1) {
            console.error(MusicName + "が曲リストに存在しません。\n名前が一致しているか確認してください。");
            return;
        }

        //もし既に追加されていたら終了
        if (AddMusicList.indexOf(MusicName) == -1) {
            AddMusicList.push(MusicName);
        } else {
            console.error(MusicName + "は既に追加されています。");
            return;
        }

        //もし曲がデータにないなら新規作成
        if (Object.keys(Data).indexOf(MusicName) == -1) {
            Data[MusicName] = {
                Score: {
                    Default: {
                        TMP: 0,
                        TYP: 0,
                        IMP: 0,
                        SPC: 0
                    },
                    Random: {
                        TMP: 0,
                        TYP: 0,
                        IMP: 0,
                        SPC: 0
                    }
                },
                Focus: false,
                HavePlayed: {
                    TMP: false,
                    TYP: false,
                    IMP: false,
                    SPC: false
                },
                Display: true
            } //項目を追加
        }

        //もし初期の状態なら、初期曲をセレクト状態にする
        if (!Data["Tutorial"].HavePlayed[Difficulty[OtherData.SetDifficulty]] && !Data["Tutorial"].Focus) {
            for (let i of Object.keys(Data)) Data[i].Focus = false;
            Data["Tutorial"].Display = true;
            Data["Tutorial"].Focus = true;
        }
    }
    /**
     * 条件付きで曲情報を新たにDataに追加する関数
     * @param {string} 遊んだことがあるかの対象の曲名
     * @param {string} 追加する曲名
     */
    static Conditions_AddMusicInfoToData(ConditionsMusic, MusicName) {
        if (Data[ConditionsMusic].HavePlayed[Difficulty[OtherData.SetDifficulty]] && Data[MusicName] == null) {
            EntryMusicData.AddMusicInfoToData(MusicName);
        }
    }
    /**
     * 条件に合致したときのみ曲情報をDataに追加する関数
     * @param {Function} 条件関数
     * @param {string} 追加する曲名
     */
    static Event_AddMusicInfoToData(ConditionsFunction, MusicName) {
        if (ConditionsFunction()) {
            if (Data[MusicName] == null) {
                EntryMusicData.AddMusicInfoToData(MusicName);
            } else {
                Data[MusicName].Display = true;
            }
            console.log("期間限定で曲が追加されています。");
        } else {
            if (Data[MusicName] != null) {
                Data[MusicName].Display = false;
            }
            console.log("期間限定ではありません。");
        }
    }
}

/**
 * 最終的にここでセレクトメニューのデザインが完成される
 * @param {string} 曲名
 */
function CreateSelectMusicList(MusicName) {
    const DifficultyNumber = typeof MusicNameList[MusicName][Difficulty[OtherData.SetDifficulty]][0] == "number" ?
    MusicNameList[MusicName][Difficulty[OtherData.SetDifficulty]][0].toFixed(1) :
    MusicNameList[MusicName][Difficulty[OtherData.SetDifficulty]][0];

    MusicList.insertAdjacentHTML("beforeend", '<div id="MusicSelectTemp'+MusicLengthNumber+'" class="List NotSelect" alt="'+MusicName+'"></div>');
    document.querySelector("#MusicSelectTemp" + MusicLengthNumber).insertAdjacentHTML("beforeend",
        '<img src="Image/Jacket/'+MusicName+'.png" onerror="this.src=\'Image/Jacket/NoImage.png\'" alt="'+MusicName+'" id="Jacket'+MusicLengthNumber+'" width="20px" height="20px">'+
        '<div id="Music'+MusicLengthNumber+'" class="MusicTextFrame NotSelect"><div id="MusicText'+MusicLengthNumber+'" class="Scroll MusicText">'+MusicName+''+ScoreDisplay(MusicName)[1]+'</div></div>'+
        '<div id="MusicDifficulty'+MusicLengthNumber+'" class="MusicDifficultyText NotSelect"><p>'+Difficulty[OtherData.SetDifficulty]+' : '+DifficultyNumber+'</p></div>'+
        '<p id="Score'+MusicLengthNumber+'" class="ScoreText NotSelect">'+Data[MusicName].Score[SelectPlayMode[OtherData.RandomMode]][Difficulty[OtherData.SetDifficulty]].toLocaleString()+''+ScoreDisplay(MusicName)[0]+'<p/>'
    );

    if (Data[MusicName].Focus) {
        document.querySelector("#MusicSelectTemp" + MusicLengthNumber).classList.replace("NotSelect", "SelectHeight");
        //初期選択ジャケット(何故かjsでこのように指定しないとサイズ変更が反映できない)
        anime({
            targets: "#Jacket" + MusicLengthNumber,
            width: ["20px", "75px"],
            height: ["20px", "75px"],
            duration: 0,
            easing: "linear"
        });
        document.querySelector("#Music" + MusicLengthNumber).classList.replace("NotSelect", "SelectMusic");
        document.querySelector("#MusicText" + MusicLengthNumber).classList.replace("TextOver", "MusicText");
        document.querySelector("#Score" + MusicLengthNumber).classList.replace("NotSelect", "SelectScore");
        document.querySelector("#MusicDifficulty" + MusicLengthNumber).classList.replace("NotSelect", "SelectMusicDifficultyText");
    } else {
        document.querySelector("#MusicSelectTemp" + MusicLengthNumber).classList.replace("SelectHeight", "NotSelect");
        document.querySelector("#Music" + MusicLengthNumber).classList.replace("SelectMusic", "NotSelect");
        document.querySelector("#MusicText" + MusicLengthNumber).classList.replace("MusicText", "TextOver");
        document.querySelector("#Score" + MusicLengthNumber).classList.replace("SelectScore", "NotSelect");
        document.querySelector("#MusicDifficulty" + MusicLengthNumber).classList.replace("SelectMusicDifficultyText", "NotSelect");
    }

    MusicLengthNumber++;
}

/**
 * ChartJavascriptのjsファイルの読み込み関数
 * @param {string} Javascriptファイル 
 */
function LoadChartJavascript(TargetJS) {
    const ChartName = TargetJS.replace(/\./g, "。").replace(/\s/g, "_");
    const script = document.createElement("script");
    script.src = "ChartJavascript/" + ChartName + ".js";
    script.id = "ChartJS";
    JavascriptReader.insertAdjacentElement("beforeend", script);
    console.log('<script src="'+ChartName+'.js"></script>');
} //ChartJavascriptのjsファイルの読み込み関数

/**
 * スコア表示関数
 * @param {string} 曲名
 * @returns 配列[バイト表示, zip表示]
 */
function ScoreDisplay(MusicName) {
    let ScoreByteTemp = 0;
    let zip = "";
    if (!Data[MusicName].HavePlayed[Difficulty[OtherData.SetDifficulty]]) zip = ".zip";
    for (let Comparison = 800000; Comparison <= Data[MusicName].Score[ChartType[OtherData.RandomMode]][Difficulty[OtherData.SetDifficulty]]; Comparison += 100000) ScoreByteTemp++;
    return [Byte[ScoreByteTemp], zip];
}

function SmoothScrollMusicSelect() {
    const NotSelectMusicListHeight = 26 + (1/3); //選択されていない曲リストの縦幅
    MusicList.scrollTo({
        top: NotSelectMusicListHeight * SelectMusicListNumber - ScrollValue,
        behavior: "smooth"
    });
}

function FocusIDCheck() {
    for (let id of Object.keys(FocusID)) if (FocusID[id].Focus) return id;
}

function ChangeAnimation(idname) {
    let BeforeChangeID = FocusIDCheck();
    anime({
        targets: "#" + BeforeChangeID + "ON",
        opacity: 0,
        duration: SceneChangeTime,
        easing: "linear",
        complete: function() {
            document.querySelector("#" + BeforeChangeID + "ON").id = FocusIDCheck() + "OFF";
            FocusID[BeforeChangeID].Focus = false;
            document.querySelector("#" + idname + "OFF").id = idname + "ON";

            anime({
                targets: "#" + idname + "ON",
                opacity: 1,
                duration: SceneChangeTime,
                easing: "linear",
                complete: function() {
                    FocusID[idname].Focus = true;
                }
            });
        }
    });
}

/**
 * 背景曲の音量フェードイン・フェードアウト関数
 * @param {string} 曲名
 * @param {number} 音量の最終値
 * @param {number} フェードイン開始までの遅延
 * @param {boolean} 曲をフェードアウト後に停止するか・フェードイン時に再生するか
 * @param {Function} フェードイン開始時に実行される関数
 */
function MusicVolumeAnimation(MusicName, AfterVolume, Delay, PlayMode, BeginFunction) {
    let temp = [];
    anime({
        targets: BackGroundMusic[MusicName],
        volume: [BackGroundMusic[MusicName].volume * OtherData.MusicVolume, AfterVolume * OtherData.MusicVolume],
        duration: SceneChangeTime,
        delay: Delay,
        easing: "linear",
        update: function() {
            if (PlayMode && AfterVolume) temp.push(BackGroundMusic[MusicName].volume);
            if (temp.length == 1) {
                BackGroundMusic[MusicName].name.currentTime = 0;
                BackGroundMusic[MusicName].name.play();

                try {
                    BeginFunction();
                } catch {}
            }
            BackGroundMusic[MusicName].name.volume = BackGroundMusic[MusicName].volume;
        },
        complete: function() {
            if (PlayMode && !AfterVolume) BackGroundMusic[MusicName].name.pause();
        }
    });
}

/**
 * 項目変更キーイベントクラス
 */
class SceneChange {
    /**
     * スタートメニューへ
     */
    static ToStart(click) {
        //オープニングからスタートメニュー
        if (Object.values(FocusID)[0].Focus && click.key === "S") {
            ChangeAnimation(Object.keys(FocusID)[1]);

            document.removeEventListener("keydown", SceneChange.ToStart);

            document.addEventListener("keydown", SceneChange.ToSelect);
            document.addEventListener("keydown", SceneChange.ToSetting);

            //解禁済みの曲を読み込み
            LoadMusicList();

            MusicVolumeAnimation("OpeningMusic", 0, 0, true);
            MusicVolumeAnimation("StartMusic", 1, SceneChangeTime, true, function() {
                BackGroundMusic["StartMusic2"].name.volume = 0;
                BackGroundMusic["StartMusic2"].name.play();
            });
        }

        //セレクトメニューからスタートメニュー
        if (Object.values(FocusID)[2].Focus && click.key === "b") {
            Back.pause();
            Back.currentTime = 0;
            Back.play();

            ChangeAnimation(Object.keys(FocusID)[1]);

            document.removeEventListener("keydown", SceneChange.ToStart);
            document.removeEventListener("keydown", SceneChange.SelectUpDownKey);
            document.removeEventListener("keydown", SceneChange.SelectDifficultyKey);
            document.removeEventListener("keydown", SceneChange.SelectSort);
            document.addEventListener("keydown", SceneChange.SelectRandomMode);
            document.removeEventListener("keydown", SceneChange.Play);

            document.addEventListener("keydown", SceneChange.ToSelect);
            document.addEventListener("keydown", SceneChange.ToSetting);

            MusicVolumeAnimation("StartMusic", 1, 0, false);
            MusicVolumeAnimation("StartMusic2", 0, 0, false);
        }

        //設定メニューからスタートメニュー
        if (Object.values(FocusID)[4].Focus && click.key === "b") {
            Back.pause();
            Back.currentTime = 0;
            Back.play();

            ChangeAnimation(Object.keys(FocusID)[1]);

            document.removeEventListener("keydown", SceneChange.ToStart);

            document.addEventListener("keydown", SceneChange.ToSelect);
            document.addEventListener("keydown", SceneChange.ToSetting);
        }
    }
    /**
     * セレクトメニューへ
     */
    static ToSelect(click) {
        //スタートメニューからセレクトメニュー
        if (Object.values(FocusID)[1].Focus && click.key === "a") {
            Select.pause();
            Select.currentTime = 0;
            Select.play();

            ChangeAnimation(Object.keys(FocusID)[2]);

            document.removeEventListener("keydown", SceneChange.ToSelect);
            document.removeEventListener("keydown", SceneChange.ToSetting);

            document.addEventListener("keydown", SceneChange.ToStart);
            document.addEventListener("keydown", SceneChange.SelectUpDownKey);
            document.addEventListener("keydown", SceneChange.SelectDifficultyKey);
            document.addEventListener("keydown", SceneChange.SelectSort);
            document.addEventListener("keydown", SceneChange.SelectRandomMode);
            document.addEventListener("keydown", SceneChange.Play);

            setTimeout(function() {
                //スクロールの位置を適切な場所に移動
                SmoothScrollMusicSelect();
                //横スクロールアニメーションの開始
                if (document.getElementById("MusicText" + SelectMusicListNumber).offsetWidth >= 430) document.querySelector("#MusicText" + SelectMusicListNumber).classList.replace("Scroll", "TextScroll");
            }, SceneChangeTime + 100);
            
            MusicVolumeAnimation("StartMusic", 0, 0, false);
            MusicVolumeAnimation("StartMusic2", 1, 0, false);
        }

        //リザルトメニューからセレクトメニュー
        if (Object.values(FocusID)[6].Focus && click.key === "b") {
            Back.pause();
            Back.currentTime = 0;
            Back.play();

            ChangeAnimation(Object.keys(FocusID)[2]);

            document.removeEventListener("keydown", SceneChange.ToSelect);

            document.addEventListener("keydown", SceneChange.ToStart);
            document.addEventListener("keydown", SceneChange.SelectUpDownKey);
            document.addEventListener("keydown", SceneChange.SelectDifficultyKey);
            document.addEventListener("keydown", SceneChange.SelectSort);
            document.addEventListener("keydown", SceneChange.SelectRandomMode);
            document.addEventListener("keydown", SceneChange.Play);

            //プレイ時のスコア・コンボの表示をリセット
            document.getElementById("COMBOS").innerHTML = TotalScoreList.COMBO.now + " COMBO";
            document.getElementById("ScoreByte").innerHTML = "0 KB";

            ReloadMusicSelect();

            setTimeout(function() {
                //スクロールの位置を適切な場所に移動
                SmoothScrollMusicSelect();
                //横スクロールアニメーションの開始
                if (document.getElementById("MusicText" + SelectMusicListNumber).offsetWidth >= 430) document.querySelector("#MusicText" + SelectMusicListNumber).classList.replace("Scroll", "TextScroll");
            }, SceneChangeTime + 100);
            
            MusicVolumeAnimation("StartMusic2", 1, SceneChangeTime, true, function() {
                BackGroundMusic["StartMusic"].name.volume = 0;
                BackGroundMusic["StartMusic"].name.currentTime = 0;
                BackGroundMusic["StartMusic"].name.play();
            });
        }
    }
    /**
     * 設定メニューへ
     */
    static ToSetting(click) {
        //スタートメニューから設定メニュー
        if (Object.values(FocusID)[1].Focus && click.key === "s") {
            Select.pause();
            Select.currentTime = 0;
            Select.play();

            ChangeAnimation(Object.keys(FocusID)[4]);

            document.removeEventListener("keydown", SceneChange.ToSelect);
            document.removeEventListener("keydown", SceneChange.ToSetting);

            document.addEventListener("keydown", SceneChange.ToStart);
        }
    }
    /**
     * リザルトメニューへ
     */
    static ToResult() {
        //プレイメニューからリザルトメニュー
        if (Object.values(FocusID)[5].Focus) {
            ChangeAnimation(Object.keys(FocusID)[6]);

            setTimeout(function() {
                
                PlayMovie.remove();
                ChartJS.remove();

                //曲名が長い場合、拡大率を調節して横幅を整える
                const TextPadding = 5; //横幅の斜体の余白の分を除外(px)
                const ResultTextScale = Math.min(1, (document.getElementById("ResultMusic").offsetWidth - 2 * TextPadding) / document.getElementById("ResultText").offsetWidth);
                document.getElementById("ResultText").style.scale = ResultTextScale;

            }, SceneChangeTime + 10); //誤差修正(10ms)

            document.addEventListener("keydown", SceneChange.ToSelect);
        }
    }
    /**
     * セレクトメニューでの曲選択
     */
    static SelectUpDownKey(click) {
        //セレクトメニュー上選択
        if ((click.key == "ArrowUp" || click.key === "w") && SelectMusicListNumber > 0) {
            Move.pause();
            Move.currentTime = 0;
            Move.play();

            if (document.querySelector("#MusicTextScroll") != null) MusicTextScroll.id = "Music" + SelectMusicListNumber;
            anime({
                targets: "#MusicSelectTemp" + SelectMusicListNumber,
                height: "25px",
                duration: 200,
                easing: "easeOutSine"
            });
            anime({
                targets: "#Jacket" + SelectMusicListNumber,
                width: "20px",
                height: "20px",
                duration: 200,
                easing: "easeOutSine"
            });
            if (document.getElementById("MusicText" + SelectMusicListNumber).offsetWidth >= 430) {
                document.querySelector("#MusicText" + SelectMusicListNumber).classList.replace("TextScroll", "Scroll");
                document.querySelector("#MusicText" + SelectMusicListNumber).classList.replace("MusicText", "TextOver");
            }
            anime({
                targets: "#Music" + SelectMusicListNumber,
                left: "30px",
                fontSize: "16px",
                paddingTop: "2px",
                duration: 200,
                easing: "easeOutSine"
            });
            anime({
                targets: "#Score" + SelectMusicListNumber,
                width: "100px",
                top: "-3px",
                left: "610px",
                fontSize: "16px",
                duration: 200,
                easing: "easeOutSine"
            });
            anime({
                targets: "#MusicDifficulty" + SelectMusicListNumber,
                top: "-14px",
                left: "520px",
                fontSize: "16px",
                duration: 200,
                easing: "easeOutSine"
            });
            Data[AddMusicList[SelectMusicListNumber]].Focus = false;

            SelectMusicListNumber--;

            anime({
                targets: "#MusicSelectTemp" + SelectMusicListNumber,
                height: ["25px", "80px"],
                duration: 200,
                easing: "easeOutSine"
            });
            anime({
                targets: "#Jacket" + SelectMusicListNumber,
                width: ["20px", "75px"],
                height: ["20px", "75px"],
                duration: 200,
                easing: "easeOutSine"
            });
            anime({
                targets: "#Music" + SelectMusicListNumber,
                left: ["30px", "78px"],
                fontSize: ["16px", "45px"],
                paddingTop: ["2px", "10px"],
                duration: 200,
                easing: "easeOutSine",
                complete: function() {
                    if (document.getElementById("MusicText" + SelectMusicListNumber).offsetWidth >= 430 && Data[AddMusicList[SelectMusicListNumber]].Focus) {
                        document.querySelector("#MusicText" + SelectMusicListNumber).classList.replace("Scroll", "TextScroll");
                        document.querySelector("#MusicText" + SelectMusicListNumber).classList.replace("TextOver", "MusicText");
                    }
                }
            });
            anime({
                targets: "#Score" + SelectMusicListNumber,
                width: ["100px", "200px"],
                top: ["-3px", "-10px"],
                left: ["610px", "510px"],
                fontSize: ["16px", "30px"],
                duration: 200,
                easing: "easeOutSine"
            });
            anime({
                targets: "#MusicDifficulty" + SelectMusicListNumber,
                top: ["-14px", "10px"],
                left: ["520px", "560px"],
                fontSize: ["16px", "30px"],
                duration: 200,
                easing: "easeOutSine"
            });
            Data[AddMusicList[SelectMusicListNumber]].Focus = true;
            
            SmoothScrollMusicSelect();

            SaveData();
        }

        //セレクトメニュー下選択
        if ((click.key == "ArrowDown" || click.key === "s") && SelectMusicListNumber < MusicLengthNumber - 1) {
            Move.pause();
            Move.currentTime = 0;
            Move.play();

            if (document.querySelector("#MusicTextScroll") != null) MusicTextScroll.id = "Music" + SelectMusicListNumber;
            anime({
                targets: "#MusicSelectTemp" + SelectMusicListNumber,
                height: "25px",
                duration: 200,
                easing: "easeOutSine"
            });
            anime({
                targets: "#Jacket" + SelectMusicListNumber,
                width: "20px",
                height: "20px",
                duration: 200,
                easing: "easeOutSine"
            });
            if (document.getElementById("MusicText" + SelectMusicListNumber).offsetWidth >= 430) {
                document.querySelector("#MusicText" + SelectMusicListNumber).classList.replace("TextScroll", "Scroll");
                document.querySelector("#MusicText" + SelectMusicListNumber).classList.replace("MusicText", "TextOver");
            }
            anime({
                targets: "#Music" + SelectMusicListNumber,
                left: "30px",
                fontSize: "16px",
                paddingTop: "2px",
                duration: 200,
                easing: "easeOutSine"
            });
            anime({
                targets: "#Score" + SelectMusicListNumber,
                width: "100px",
                top: "-3px",
                left: "610px",
                fontSize: "16px",
                duration: 200,
                easing: "easeOutSine"
            });
            anime({
                targets: "#MusicDifficulty" + SelectMusicListNumber,
                top: "-14px",
                left: "520px",
                fontSize: "16px",
                duration: 200,
                easing: "easeOutSine"
            });
            Data[AddMusicList[SelectMusicListNumber]].Focus = false;

            SelectMusicListNumber++;

            anime({
                targets: "#MusicSelectTemp" + SelectMusicListNumber,
                height: ["25px", "80px"],
                duration: 200,
                easing: "easeOutSine"
            });
            anime({
                targets: "#Jacket" + SelectMusicListNumber,
                width: ["20px", "75px"],
                height: ["20px", "75px"],
                duration: 200,
                easing: "easeOutSine"
            });
            anime({
                targets: "#Music" + SelectMusicListNumber,
                left: ["30px", "78px"],
                fontSize: ["16px", "45px"],
                paddingTop: ["2px", "10px"],
                duration: 200,
                easing: "easeOutSine",
                complete: function() {
                    if (document.getElementById("MusicText" + SelectMusicListNumber).offsetWidth >= 430 && Data[AddMusicList[SelectMusicListNumber]].Focus) {
                        document.querySelector("#MusicText" + SelectMusicListNumber).classList.replace("Scroll", "TextScroll");
                        document.querySelector("#MusicText" + SelectMusicListNumber).classList.replace("TextOver", "MusicText");
                    }
                }
            });
            anime({
                targets: "#Score" + SelectMusicListNumber,
                width: ["100px", "200px"],
                top: ["-3px", "-10px"],
                left: ["610px", "510px"],
                fontSize: ["16px", "30px"],
                duration: 200,
                easing: "easeOutSine"
            });
            anime({
                targets: "#MusicDifficulty" + SelectMusicListNumber,
                top: ["-14px", "10px"],
                left: ["520px", "560px"],
                fontSize: ["16px", "30px"],
                duration: 200,
                easing: "easeOutSine"
            });
            Data[AddMusicList[SelectMusicListNumber]].Focus = true;
            
            SmoothScrollMusicSelect();

            SaveData();
        }
    }
    /**
     * セレクトメニューでの難易度変更
     */
    static SelectDifficultyKey(click) {
        //セレクトメニュー左選択
        if (click.key == "ArrowLeft" || click.key === "a") {
            Move.pause();
            Move.currentTime = 0;
            Move.play();

            OtherData.SetDifficulty = (OtherData.SetDifficulty + Difficulty.length - 1) % Difficulty.length;

            ReloadMusicSelect();
        }

        //セレクトメニュー右選択
        if (click.key == "ArrowRight" || click.key === "d") {
            Move.pause();
            Move.currentTime = 0;
            Move.play();

            OtherData.SetDifficulty = (OtherData.SetDifficulty + Difficulty.length + 1) % Difficulty.length;

            ReloadMusicSelect();
        }
    }
    /**
     * セレクトメニューでの順序変更
     */
    static SelectSort(click) {
        //ソート変更
        if (click.key === "q") {
            Move.pause();
            Move.currentTime = 0;
            Move.play();

            OtherData.SortMode = (OtherData.SortMode + SortType.length + 1) % SortType.length;

            ReloadMusicSelect();
        }

        //逆順
        if (click.key === "e") {
            Move.pause();
            Move.currentTime = 0;
            Move.play();

            OtherData.Reverse = !OtherData.Reverse;

            ReloadMusicSelect();
        }
    }
    /**
     * セレクトメニューでのランダムモード選択
     */
    static SelectRandomMode(click) {
        if (click.key === "R") {
            Move.pause();
            Move.currentTime = 0;
            Move.play();

            OtherData.RandomMode = OtherData.RandomMode ? 0 : 1;

            ReloadMusicSelect();
        }
    }
    /**
     * ゲームプレイ
     */
    static Play(click) {
        //自動モード
        if (click.key === "A") AutoMode = AutoMode ? false : true;
        if (click.key == "Enter") {
            if (typeof MusicNameList[document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt")][Difficulty[OtherData.SetDifficulty]][0] != "number") {
                return;
            }
            Play.pause();
            Play.currentTime = 0;
            Play.play();

            document.removeEventListener("keydown", SceneChange.ToStart);
            document.removeEventListener("keydown", SceneChange.SelectUpDownKey);
            document.removeEventListener("keydown", SceneChange.SelectDifficultyKey);
            document.removeEventListener("keydown", SceneChange.SelectSort);
            document.removeEventListener("keydown", SceneChange.SelectRandomMode);
            document.removeEventListener("keydown", SceneChange.Play);

            PlayingWaitMenuOFF.id = "PlayingWaitMenuON";

            for (let i of Object.keys(Data)) Data[i].Focus = false;
            Data[document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt")].Focus = true;

            PlayingWaitUnderWindow.insertAdjacentHTML("beforeend",
                '<div id="PlayingWaitTemp"><img src="Image/Jacket/'+document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt")+'.png" onerror="this.src=\'Image/Jacket/NoImage.png\'" alt="'+document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt")+'" id="PlayingWaitJacket" width="200px" height="200px">'+
                '<div id="PlayingWaitMusic"><div id="PlayingWaitText" class="MusicText">'+document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt")+'</div></div>'+
                '<p id="PlayingWaitDifficultyText">'+Difficulty[OtherData.SetDifficulty]+' : '+MusicNameList[document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt")][Difficulty[OtherData.SetDifficulty]][0].toFixed(1)+'</p>'+
                '<p id="PlayingWaitMemoText">メモ :<br>'+MusicNameList[document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt")][Difficulty[OtherData.SetDifficulty]][1]+'</p></div>'
            );

            //曲名が長い場合、拡大率を調節して横幅を整える
            const TextPadding = 5; //横幅の斜体の余白の分を除外(px)
            const PlayingWaitTextScale = Math.min(1, (document.getElementById("PlayingWaitMusic").offsetWidth - 2 * TextPadding) / document.getElementById("PlayingWaitText").offsetWidth);
            document.getElementById("PlayingWaitText").style.scale = PlayingWaitTextScale;

            MusicVolumeAnimation("StartMusic", 0, 0, true);
            MusicVolumeAnimation("StartMusic2", 0, 0, true);

            anime({
                targets: "#PlayingWaitWindow",
                width: ["270px", "540px"],
                height: ["180px", "360px"],
                opacity: [0, 1],
                duration: PlayingWaitTime,
                easing: "easeOutSine",
                complete: function() {
                    anime({
                        targets: "#PlayingWaitWindow",
                        width: "1080px",
                        height: "720px",
                        duration: PlayingWaitTime,
                        delay: PlayingWaitTime,
                        easing: "easeInSine",
                        complete: function() {
                            anime({
                                targets: "#PlayingWaitWindow",
                                width: "2160px",
                                height: "1440px",
                                duration: PlayingWaitTime,
                                easing: "linear",
                                complete: function() {
                                    PlayingWaitTemp.remove();
                                    PlayingWaitMenuON.id = "PlayingWaitMenuOFF";
                                    LoadChartJavascript(document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt"));
                                }
                            });
                            ChangeAnimation(Object.keys(FocusID)[5]);
                        }
                    });
                }
            });
            anime({
                targets: "#PlayingWaitUnderWindow",
                scale: [0.5, 1],
                duration: PlayingWaitTime,
                easing: "easeOutSine",
                complete: function() {
                    anime({
                        targets: "#PlayingWaitUnderWindow",
                        scale: 2,
                        duration: PlayingWaitTime,
                        delay: PlayingWaitTime,
                        easing: "easeInSine",
                        complete: function() {
                            anime({
                                targets: "#PlayingWaitUnderWindow",
                                scale: 4,
                                duration: PlayingWaitTime,
                                easing: "linear"
                            });
                        }
                    });
                }
            });
        }
    }
}

/**
 * 最初の一回のみ実行される関数
 */
function setup() {
    LoadData();
    document.addEventListener("keydown", SceneChange.ToStart);
    StartMusic.loop = true;
    StartMusic2.loop = true;
}
setup();