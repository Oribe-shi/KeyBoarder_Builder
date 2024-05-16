//ノーツ情報変数宣言
let FrameNumber = 0;
let JudgeNumber = 0;
let NoteNumber = 0;
let DragNoteNumber = 0;
let AllNoteNumber = 0;
const NotesPicture = [
    "Notes.png",
    "SameTiming_Notes.png"
];
const Words = [
    "none",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
];
/**
 * ノーツ情報リスト
 */
let NoteInfoList = {
    /**
     * それぞれの英単語が入る 優先度は判定範囲に入った順　例:[a,t,a,none]
     */
    WordList: [],
    /**
     * それぞれの英単語番号 同じ場合は数字が1ずつ増える　例:a,t,a,noneの場合[1,1,2,1]
     */
    SameNumberList: [],
    /**
     * それぞれのノーツの反応するタイミング
     */
    TimingList: [],
    /**
     * 全てのノーツの反応するタイミング
     */
    AllTimingList: [],
    /**
     * 範囲内にあるノーツ番号　例:範囲内に5,6,7番目のノーツがある場合[5,6,7]
     */
    WithInRangeNumberList: [],
    /**
     * それぞれのノーツのキーのリスト
     */
    NotetypeList: {
        Note: {},
        LongNote: {},
        DragNote: {}
    }
};
/**
 * 譜面のロード時
 */
let isChartLoad = false;
/*
let NoteInfoWords = []; //それぞれの英単語が入る。優先度は判定範囲に入った順　例:[a,t,a,none]
let NoteInfoNumber = []; //それぞれの英単語番号。同じ場合は数字が1ずつ増える　例:a,t,a,noneの場合[1,1,2,1]
let NoteInfo = []; //範囲内にあるノーツ番号　例:範囲内に5,6,7番目のノーツがある場合[5,6,7]
*/
const JudgeScore = [
    "OK!",
    "PERFECT",
    "EARLY",
    "LATE",
    "BAD",
    "MISS"
];
/**
 * スコアによるクリア判定
 */
const JudgeCheck = [
    "AutoPlay",
    "ALLPERFECT",
    "FULLCOMBO",
    "CLEAR",
    "FAILED"
];
/**
 * プレイ中のスコアリスト
 */
let TotalScoreList = {
    COMBO: {
        now: 0,
        max: 0
    },
    SCORE: 0,
    PERFECT: 0,
    EARLY: 0,
    LATE: 0,
    BAD: 0,
    MISS: 0
};
const EasingType = [
    "normal",
    "alternate",
    "reverse"
]; //イージング関数のタイプを簡単に選択できる
/**
 * ノーツの現在の値を取得する
 */
class Current_Value {
    /**
     * フレームの現在の値を取得する
     * @param {Number} 取得したいフレーム番号 
     * @returns 配列の番号で指定　[0]:X座標　[1]:Y座標　[2]:角度　[3]:拡大率　[4]:透明度
     */
    static Frame_Value(EditNumber) {
        try {
            return [
                new WebKitCSSMatrix(document.querySelector("#FrameMoveX" + EditNumber).style.transform).m41,
                new WebKitCSSMatrix(document.querySelector("#FrameMoveY" + EditNumber).style.transform).m42,
                -Math.atan2(new WebKitCSSMatrix(document.querySelector("#FrameAngle" + EditNumber).style.transform).m21, new WebKitCSSMatrix(document.querySelector("#FrameAngle" + EditNumber).style.transform).m11) * (180 / Math.PI),
                new WebKitCSSMatrix(document.querySelector("#FrameScale" + EditNumber).style.transform).m11,
                Number(window.getComputedStyle(document.querySelector("#FrameOpacity" + EditNumber)).opacity)
            ]
        } catch {
            return 0;
        }
    }
    /**
     * 判定枠の現在の値を取得する
     * @param {Number} 取得したい判定枠番号 
     * @returns 配列の番号で指定　[0]:X座標　[1]:Y座標　[2]:角度　[3]:拡大率　[4]:透明度
     */
    static JudgeFrame_Value(EditNumber) {
        try {
            return [
                new WebKitCSSMatrix(document.querySelector("#JudgementFrameMoveX" + EditNumber).style.transform).m41 - CenterX,
                new WebKitCSSMatrix(document.querySelector("#JudgementFrameMoveY" + EditNumber).style.transform).m42 - CenterY,
                -Math.atan2(new WebKitCSSMatrix(document.querySelector("#JudgementFrameAngle" + EditNumber).style.transform).m21, new WebKitCSSMatrix(document.querySelector("#JudgementFrameAngle" + EditNumber).style.transform).m11) * (180 / Math.PI),
                new WebKitCSSMatrix(document.querySelector("#JudgementFrameScale" + EditNumber).style.transform).m11,
                Number(window.getComputedStyle(document.querySelector("#JudgementFrameOpacity" + EditNumber)).opacity)
            ]
        } catch {
            return 0;
        }
    }
    /**
     * ノーツの現在の値を取得する
     * @param {Number} 取得したいノーツ番号 
     * @returns 配列の番号で指定　[0]:X座標　[1]:Y座標　[2]:角度　[3]:拡大率　[4]:透明度
     */
    static Note_Value(EditNumber) {
        try {
            return [
                new WebKitCSSMatrix(document.querySelector("#NoteMoveX" + EditNumber).style.transform).m41 - CenterX,
                new WebKitCSSMatrix(document.querySelector("#NoteMoveY" + EditNumber).style.transform).m42 - CenterY,
                -Math.atan2(new WebKitCSSMatrix(document.querySelector("#NoteAngle" + EditNumber).style.transform).m21, new WebKitCSSMatrix(document.querySelector("#NoteAngle" + EditNumber).style.transform).m11) * (180 / Math.PI),
                new WebKitCSSMatrix(document.querySelector("#NoteScale" + EditNumber).style.transform).m11,
                Number(window.getComputedStyle(document.querySelector("#NoteOpacity" + EditNumber)).opacity)
            ]
        } catch {
            return 0;
        }
    }
    /**
     * ロングノーツの現在の値を取得する
     * @param {Number} 取得したいロングノーツ番号 
     * @returns 配列の番号で指定　[0]:X座標　[1]:Y座標　[2]:角度　[3]:拡大率　[4]:透明度　[5]:長さ
     */
    static LongNote_Value(EditNumber) {
        try {
            return [
                new WebKitCSSMatrix(document.querySelector("#LongNoteMoveX" + EditNumber).style.transform).m41 - CenterX,
                new WebKitCSSMatrix(document.querySelector("#LongNoteMoveY" + EditNumber).style.transform).m42 - CenterY,
                -Math.atan2(new WebKitCSSMatrix(document.querySelector("#LongNoteAngle" + EditNumber).style.transform).m21, new WebKitCSSMatrix(document.querySelector("#LongNoteAngle" + EditNumber).style.transform).m11) * (180 / Math.PI),
                new WebKitCSSMatrix(document.querySelector("#LongNoteScale" + EditNumber).style.transform).m11,
                Number(window.getComputedStyle(document.querySelector("#LongNoteOpacity" + EditNumber)).opacity),
                document.querySelector("#LongNoteLength" + EditNumber).clientHeight
            ]
        } catch {
            return 0;
        }
    }
    /**
     * ドラッグノーツの現在の値を取得する
     * @param {Number} 取得したいドラッグノーツ番号 
     * @returns 配列の番号で指定　[0]:X座標　[1]:Y座標　[2]:角度　[3]:拡大率　[4]:透明度
     */
    static DragNote_Value(EditNumber) {
        try {
            return [
                new WebKitCSSMatrix(document.querySelector("#DragNoteMoveX" + EditNumber).style.transform).m41 - CenterX,
                new WebKitCSSMatrix(document.querySelector("#DragNoteMoveY" + EditNumber).style.transform).m42 - CenterY,
                -Math.atan2(new WebKitCSSMatrix(document.querySelector("#DragNoteAngle" + EditNumber).style.transform).m21, new WebKitCSSMatrix(document.querySelector("#DragNoteAngle" + EditNumber).style.transform).m11) * (180 / Math.PI),
                new WebKitCSSMatrix(document.querySelector("#DragNoteScale" + EditNumber).style.transform).m11,
                Number(window.getComputedStyle(document.querySelector("#DragNoteOpacity" + EditNumber)).opacity)
            ]
        } catch {
            return 0;
        }
    }
} //ノーツの現在の値を取得するクラス

/**
 * 配列から現在の値の取得
 * @param {Array} 配列
 */
function ConvertCurrentValue(arr) {
    if (arr instanceof Array) {
        if (arr[0] == "Frame") arr = Current_Value.Frame_Value(arr[1])[arr[2]] + arr[3];
        if (arr[0] == "JudgementFrame") arr = Current_Value.JudgeFrame_Value(arr[1])[arr[2]] + arr[3];
        if (arr[0] == "Note") arr = Current_Value.Note_Value(arr[1])[arr[2]] + arr[3];
        if (arr[0] == "LongNote") arr = Current_Value.LongNote_Value(arr[1])[arr[2]] + arr[3];
        if (arr[0] == "DragNote") arr = Current_Value.DragNote_Value(arr[1])[arr[2]] + arr[3];
    }
    return arr;
}

let AutoMode = false;
/**
 * 中心座標[X]
 */
const CenterX = 442;
/**
 * 中心座標[Y]
 */
const CenterY = 261.3;
/**
 * 判定幅[ms]
 */
const Judge_Time = {
    MISSEARLY: 15,
    BADEARLY: 25,
    EARLY: 85,
    PERFECT: 200,
    LATE: 85,
    BADLATE: 25,
    MISSLATE: 15
};
/**
 * 判定によるポイント加算
 */
const EvaluationPoint = {
    PERFECT: 1,
    EARLY: 0.75,
    LATE: 0.75,
    BAD: 0.5,
    MISS: 0
};
/**
 * ロングノーツの判定甘さ[ms]
 */
const LongNoteJudge_Time = 180;
/**
 * ノーツ消滅までの時間[ms]
 */
const NoteOpacityTime = 150;
/**
 * 図形エフェクトのループ時間[ms]
 */
const EffectLoopTime = 200;
/**
 * 音ズレ調節時間[ms]
 */
const LoadDelayTime = 1000;
/**
 * 出現してからの最大透明度時間[ms]
 */
const BeginOpacityTime = 10;
//ノーツ情報変数宣言

//譜面に使用する変数
let Music;
let AllCOMBO = 0;
let BPMList = {BPM: [], TIME: []};
let NowRhythm;
let NextRhythm;
let Time;
let Past;
let PastFrag;
let ChartMode;
let SameTimingNoneNoteCount = 0;
let SameTimingFirstFrag = false;
//譜面に使用する変数

//キーカウント
let keyCount = 0;
const keys = {};
function Key_Counter() {
    document.addEventListener("keydown", function(event) {
        // 英単語以外のキーの場合・既に押されているキーが押された場合はカウントしない
        if (!(event.key.charCodeAt(0) >= 97 && event.key.charCodeAt(0) <= 122) || keys[event.key]) return;
        
        // キーが押された場合はカウントを増やす
        keys[event.key] = true;
        keyCount++;
    }, true); //trueにすることで、キーイベントの実行を優先的に行う
    document.addEventListener("keyup", function(event) {
        delete keys[event.key];
    });
}
Key_Counter();
//キーカウント

//関数
/**
 * 背景動画設定関数
 * @param {string} 動画がない場合の背景色設定　指定しない場合は白
 */
function VideoExist(BackGroundColor) {
    let url = "Movie/" + document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt") + ".mp4";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            BackGroundMovie.insertAdjacentHTML("afterbegin", '<video src="Movie/' + document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt") + '.mp4" id="PlayMovie" autoplay muted></video>');
        }
    };
    // エラー時の処理を追加
    xhr.onerror = function () {
        BackGroundMovie.insertAdjacentHTML("afterbegin", '<div id="PlayMovie"></div>');
        PlayMovie.style.backgroundColor = BackGroundColor;
    };
    // 中断時の処理を追加
    xhr.onabort = function () {
        BackGroundMovie.insertAdjacentHTML("afterbegin", '<div id="PlayMovie"></div>');
        PlayMovie.style.backgroundColor = BackGroundColor;
    };
    xhr.send();
}

let PlayedMusicFlag = false;
function ChartSetup(SetupBackGroundColor) {
    Past = 0;
    PastFrag = false;

    VideoExist(SetupBackGroundColor);
    Music = Object.keys(MusicNameList).indexOf(document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt"));
    Time = Date.now() + Math.floor(ChartMusic[Music].duration * 1000) + LoadDelayTime;

    //一度譜面のBPMとノーツの種類の情報を読み込み
    isChartLoad = true;
    while (isChartLoad) {
        ChartInfo();
        if (PlayedMusicFlag) {
            Time += MeasureTime(Past);
            PlayedMusicFlag = false;
        }
        Past++;
    }
    Past = 0;
    NoteNumber = 0;
    DragNoteNumber = 0;

    NowRhythm = Date.now();
    NextRhythm = Date.now() + MeasureTime(1);
}

/**
 * 経過時間計測関数
 */
function PastTime() {
    if (NowRhythm >= NextRhythm) {
        NextRhythm += MeasureTime(1);
        PastFrag = true;
    
        let ConsolePast = Past;
        setTimeout(function() {
            console.log("Past : " + ConsolePast + "拍目");
        }, LoadDelayTime + OtherData.MusicGap + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
    } else {
        NowRhythm = Date.now();
    }
    if (PastFrag) {
        ChartInfo();
        PastFrag = false;
        Past++;
    }
}

/**
 * BPM関数
 * @param {object} オブジェクト設定　BPM:[] TIME:[]
 * @param {number} 拍数
 */
function BPMFunction(ListObject, x) {
    const MS = 1000;
    let tmax = 0;
    const ObjectLength = ListObject.BPM.length;
    if (ObjectLength != ListObject.TIME.length) return console.error("BPMとTIMEの配列数が一致しません。");

    for (let i = 0; i != ObjectLength; i++) {

        const LastTime = ListObject.TIME[i + 1] || Infinity;
        
        if (ListObject.TIME[i] <= x && x <= LastTime) {

            return (MS * 60 / ListObject.BPM[i]) * (x - ListObject.TIME[i]) + tmax;

        }
        tmax += (MS * 60 / ListObject.BPM[i]) * (LastTime - ListObject.TIME[i]);

    }
}

/**
 * 拍数から経過時間を求める処理
 * @param {number} 経過拍数
 * @returns 経過時間[ms]
 */
function MeasureTime(PastNumber) {
    return BPMFunction(BPMList, Past + PastNumber) - BPMFunction(BPMList, Past);
}

/**
 * 曲再生関数
 * @param {string} 曲名
 */
function PlayMusic(MusicName) {
    //読み込みの場合は実行しない
    if (isChartLoad) {
        PlayedMusicFlag = true;
        return;
    }

    setTimeout(function() {
        MusicName.play();
    }, LoadDelayTime + OtherData.MusicGap + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
}

/**
 * BPMを設定
 * @param {number} 変更後のBPMの値
 * @param {number} その小節での遅延時間
 */
function BPMset(InputBPM, InputDelay) {
    //読み込みの場合のみ実行
    if (!isChartLoad) return;
    BPMList.BPM.push(InputBPM);
    BPMList.TIME.push(Past + InputDelay);
}

/**
 * 譜面情報初期化関数
 */
function ChartInit(StopMusic) {
    const Sleep = ms => new Promise(func => setTimeout(func, ms));
    async function Delay() {

        await Sleep(LoadDelayTime);

        //全ドラッグノーツ・ロングノーツ・ノーツ・判定枠・フレームを削除
        for (let DragNoteReset = 1; DragNoteReset <= DragNoteNumber; DragNoteReset++) {
            if (document.querySelector("#DragNote" + DragNoteReset) != null) document.querySelector("#DragNote" + DragNoteReset).remove();
            console.log("DragNoteRemoving...");
        }
        console.log("AllDragNoteRemoved!");
        for (let LongNoteReset = 1; LongNoteReset <= NoteNumber; LongNoteReset++) {
            if (document.querySelector("#LongNote" + LongNoteReset) != null) document.querySelector("#LongNote" + LongNoteReset).remove();
            console.log("LongNoteRemoving...");
        }
        console.log("AllLongNoteRemoved!");
        for (let NoteReset = 1; NoteReset <= NoteNumber; NoteReset++) {
            if (document.querySelector("#Note" + NoteReset) != null) document.querySelector("#Note" + NoteReset).remove();
            console.log("NoteRemoving...");
        }
        console.log("AllNoteRemoved!");
        for (let JudgeReset = 1; JudgeReset <= JudgeNumber; JudgeReset++) {
            if (document.querySelector("#Judge" + JudgeReset) != null) document.querySelector("#Judge" + JudgeReset).remove();
            console.log("JudgeRemoving...");
        }
        console.log("AllJudgeRemoved!");
        for (let FrameReset = 1; FrameReset <= FrameNumber; FrameReset++) {
            if (document.querySelector("#Frame" + FrameReset) != null) document.querySelector("#FrameID" + FrameReset).remove();
            console.log("FrameRemoving...");
        }
        console.log("AllFrameRemoved!");
        //全ドラッグノーツ・ロングノーツ・ノーツ・判定枠・フレームを削除

        //スコアの記録を更新
        let BeforeScore = Data[document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt")].Score[ChartType[OtherData.RandomMode]][Difficulty[OtherData.SetDifficulty]];
        console.log(document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt"));

        Data[document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt")].HavePlayed[Difficulty[OtherData.SetDifficulty]] = true;
        document.getElementById("MusicText" + SelectMusicListNumber).innerHTML = document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt");
        let ScoreByte = 0;
        for (let Comparison = 800000; Comparison <= Math.round(TotalScoreList.SCORE); Comparison += 100000) ScoreByte++;
        if (TotalScoreList.SCORE > BeforeScore) {
            Data[document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt")].Score[ChartType[OtherData.RandomMode]][Difficulty[OtherData.SetDifficulty]] = Math.round(TotalScoreList.SCORE);
            document.getElementById("Score" + SelectMusicListNumber).innerHTML = Data[document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt")].Score[ChartType[OtherData.RandomMode]][Difficulty[OtherData.SetDifficulty]].toLocaleString()+Byte[ScoreByte];
        }
        //スコアの記録を更新

        //結果ウィンドウを更新
        let PlusMinus = "-";
        let JudgeCheckTemp = 0;
        if (Math.round(TotalScoreList.SCORE) >= BeforeScore) PlusMinus = "+";
        if (AutoMode) JudgeCheckTemp = 0;
        else if (AllCOMBO == TotalScoreList.PERFECT) JudgeCheckTemp = 1;
        else if (AllCOMBO == TotalScoreList.PERFECT + TotalScoreList.EARLY + TotalScoreList.LATE) JudgeCheckTemp = 2;
        else if (Math.round(TotalScoreList.SCORE) >= 800000) JudgeCheckTemp = 3;
        else JudgeCheckTemp = 4;
        document.getElementById("ResultText").innerHTML = document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt");
        ResultJacket.insertAdjacentHTML("afterend", '<div id="ResultJacketTemp"><img src="Image/Jacket/' + document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt") + '.png" onerror="this.src=\'Image/Jacket/NoImage.png\'" class="Size0" style="width:210px; height:210px;" alt="ResultJacket"></div>');
        document.getElementById("ResultTOTALCOMBO").innerHTML = "最大コンボ数 : " + TotalScoreList.COMBO.max + " / " + AllCOMBO;
        document.getElementById("ResultBeforeScore").innerHTML = "過去最高スコア : " + BeforeScore.toLocaleString() + " ( " + PlusMinus + (Math.abs(Math.round(TotalScoreList.SCORE)-BeforeScore)).toLocaleString() + " )";
        document.getElementById("ResultScore").innerHTML = Math.round(TotalScoreList.SCORE).toLocaleString() + Byte[ScoreByte];
        document.getElementById("ResultJudge").innerHTML = JudgeCheck[JudgeCheckTemp];
        document.getElementById("ResultAllPERFECT").innerHTML = "PERFECT : " + TotalScoreList.PERFECT;
        document.getElementById("ResultAllEARLY").innerHTML = "EARLY : " + TotalScoreList.EARLY;
        document.getElementById("ResultAllLATE").innerHTML = "LATE : " + TotalScoreList.LATE;
        document.getElementById("ResultAllBAD").innerHTML = "BAD : " + TotalScoreList.BAD;
        document.getElementById("ResultAllMISS").innerHTML = "MISS : " + TotalScoreList.MISS;
        //結果ウィンドウを更新

        //AutoModeの場合は保存しない
        if (AutoMode) Data[document.querySelector("#MusicSelectTemp" + SelectMusicListNumber).getAttribute("alt")].Score[ChartType[OtherData.RandomMode]][Difficulty[OtherData.SetDifficulty]] = BeforeScore;
        if (!AutoMode) SaveData();

        SceneChange.ToResult();

        //譜面情報の初期化
        FrameNumber = 0;
        JudgeNumber = 0;
        NoteNumber = 0;
        DragNoteNumber = 0;
        AllNoteNumber = 0;
        TotalScoreList.PERFECT = 0;
        TotalScoreList.EARLY = 0;
        TotalScoreList.LATE = 0;
        TotalScoreList.BAD = 0;
        TotalScoreList.MISS = 0;
        TotalScoreList.COMBO.now = 0;
        TotalScoreList.COMBO.max = 0;
        TotalScoreList.SCORE = 0;
        AllCOMBO = 0;
        BPMList = {BPM: [], TIME: []};
        NoteInfoList = {
            /**
             * それぞれの英単語が入る 優先度は判定範囲に入った順　例:[a,t,a,none]
             */
            WordList: [],
            /**
             * それぞれの英単語番号 同じ場合は数字が1ずつ増える　例:a,t,a,noneの場合[1,1,2,1]
             */
            SameNumberList: [],
            /**
             * それぞれのノーツの反応するタイミング
             */
            TimingList: [],
            /**
             * 全てのノーツの反応するタイミング
             */
            AllTimingList: [],
            /**
             * 範囲内にあるノーツ番号　例:範囲内に5,6,7番目のノーツがある場合[5,6,7]
             */
            WithInRangeNumberList: [],
            /**
             * それぞれのノーツのキーのリスト
             */
            NotetypeList: {
                Note: {},
                LongNote: {},
                DragNote: {}
            }
        };
        SameTimingNoneNoteCount = 0;
        StopMusic.pause();
        StopMusic.currentTime = 0;
        AutoMode = false;
        keyCount = 0;
        isChartLoad = true;
        //譜面情報の初期化
    }
    Delay();
}

/**
 * スコア加算処理関数
 * @param {number} その曲の全コンボ数
 * @param {number} 判定による点数の加算具合 0～1
 */
function ScoreProcess(ALLTOTALCOMBO, EvaTemp) {
    TotalScoreList.COMBO.max = Math.max(TotalScoreList.COMBO.max, TotalScoreList.COMBO.now); //最大コンボ数更新
    let = ScoreByteTemp = 0;
    TotalScoreList.SCORE += 1000000 / ALLTOTALCOMBO * EvaTemp; //1,000,000 / 全コンボ数
    for (let Comparison = 800000; Comparison <= Math.round(TotalScoreList.SCORE); Comparison += 100000) ScoreByteTemp++;
    document.getElementById("COMBOS").innerHTML = TotalScoreList.COMBO.now + " COMBO";
    document.getElementById("ScoreByte").innerHTML = Math.round(TotalScoreList.SCORE).toLocaleString() + Byte[ScoreByteTemp];
}

/**
 * スコア更新関数(プレイ時)
 * @param {number} 判定番号
 */
function ReloadScore(Result) {
    switch (Result) {
        case 1:
            TotalScoreList.COMBO.now++;
            ScoreProcess(AllCOMBO, EvaluationPoint.PERFECT);
            TotalScoreList.PERFECT++;
            break;
        case 2:
            TotalScoreList.COMBO.now++;
            ScoreProcess(AllCOMBO, EvaluationPoint.EARLY);
            TotalScoreList.EARLY++;
            break;
        case 3:
            TotalScoreList.COMBO.now++;
            ScoreProcess(AllCOMBO, EvaluationPoint.LATE);
            TotalScoreList.LATE++;
            break;
        case 4:
            TotalScoreList.COMBO.now = 0;
            ScoreProcess(AllCOMBO, EvaluationPoint.BAD);
            TotalScoreList.BAD++;
            break;
        default:
            TotalScoreList.COMBO.now = 0;
            ScoreProcess(AllCOMBO, EvaluationPoint.MISS);
            TotalScoreList.MISS++;
            break;
    }
}

/** 
 * 判定表示関数
 * @param {string} ノーツの種類
 * @param {number} ノーツ番号
 * @param {string} 判定表示文字
 * @param {boolean} エフェクトを表示させるか
 * @param {boolean} ロングノーツかどうか
*/
function Evaluation(NoteType, TargetNoteNumber, Evaluation, isEffect, isLongNote) {
    if (!isLongNote) {
        document.querySelector("#" + NoteType + "Image" + TargetNoteNumber).remove();
        document.querySelector("#Word" + NoteType + TargetNoteNumber).remove();

        setTimeout(function() {
            document.querySelector("#" + NoteType + TargetNoteNumber).remove();
        }, NoteOpacityTime + 1000);
    }

    switch (NoteType) {
        case "Note":
            Chart_Setting.Note().MoveX(TargetNoteNumber, Current_Value.Note_Value(TargetNoteNumber)[0], Current_Value.Note_Value(TargetNoteNumber)[0], 1000, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveY(TargetNoteNumber, Current_Value.Note_Value(TargetNoteNumber)[1], Current_Value.Note_Value(TargetNoteNumber)[1], 1000, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Angle(TargetNoteNumber, Current_Value.Note_Value(TargetNoteNumber)[2], Current_Value.Note_Value(TargetNoteNumber)[2], 1000, 0, "linear", EasingType[0], false);
            break;
        case "LongNote":
            //ロングノーツは位置を固定させない
            break;
        case "DragNote":
            Chart_Setting.DragNote().MoveX(TargetNoteNumber, Current_Value.DragNote_Value(TargetNoteNumber)[0], Current_Value.DragNote_Value(TargetNoteNumber)[0], 1000, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveY(TargetNoteNumber, Current_Value.DragNote_Value(TargetNoteNumber)[1], Current_Value.DragNote_Value(TargetNoteNumber)[1], 1000, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().Angle(TargetNoteNumber, Current_Value.DragNote_Value(TargetNoteNumber)[2], Current_Value.DragNote_Value(TargetNoteNumber)[2], 1000, 0, "linear", EasingType[0], false);
            break;
    }

    const NotePath = document.querySelector("#" + NoteType + "Extinguishment" + TargetNoteNumber);
    NotePath.insertAdjacentHTML("beforeend",
        '<p id="'+NoteType+'Evaluation'+TargetNoteNumber+'" class="Evaluationsize">'+Evaluation+'</p>'
    );

    anime({
        targets: "#" + NoteType + "Evaluation" + TargetNoteNumber,
        translateY: "-30px",
        opacity: 0,
        duration: 400,
        easing: "linear"
    });

    EvaluationEffect(NoteType, TargetNoteNumber, isEffect);
}

/**
 * 判定エフェクト関数
 * @param {string} ノーツの種類
 * @param {number} ノーツ番号
 * @param {boolean} エフェクトを表示させるか
 */
function EvaluationEffect(NoteType, TargetNoteNumber, isEffect) {
    if (!isEffect || !OtherData.Effect) return;

    const RanQty = Math.floor(Math.random() * 3) + 9;
    for (let i = 0; i != RanQty; i++) {
        let shape = document.createElement("div");
        shape.classList.add("shape");
        RanShapeCreate(shape);
        document.getElementById(NoteType + "Effect" + TargetNoteNumber).appendChild(shape);

        anime({
            targets: shape,
            top: Math.floor(Math.random() * 15) + "px",
            rotate: Math.floor(Math.random() * 360) - 180 + "deg",
            opacity: 0,
            duration: 200 * (Math.floor(Math.random() * 3) + 2),
            easing: "easeOutQuad",
            complete: function(anim) {
                document.getElementById(NoteType + "Effect" + TargetNoteNumber).removeChild(anim.animatables[0].target);
            }
        });
    }
}

/**
 * ランダムモノクロカラー関数
 * @returns rgb()
 */
function RanColor() {
    const ColorMin = 0;
    const ColorMax = 165;
    const GrayScale = Math.floor(Math.random() * (ColorMax - ColorMin + 1)) + ColorMin;
    return "rgb(" + GrayScale + "," + GrayScale + "," + GrayScale + ")";
}

/**
 * ランダム図形生成関数
 * @param {string} shape 
 */
function RanShapeCreate(shape) {
    const ShapeType = Math.random() < 0.5 ? "circle" : "square";
    const ShapeRanScale = Math.random() * 7 + 5;
    const ShapeMaxScale = 12;
    const ShapePadding = 26;
    const ShapeDisplayWidth = 136 - 2 * ShapePadding; //136px - 2 * ShapePadding

    shape.style.position = "absolute";
    shape.style.width = ShapeRanScale + "px";
    shape.style.height = ShapeRanScale + "px";
    shape.style.backgroundColor = RanColor();
    shape.style.borderRadius = ShapeType === "circle" ? "50%" : "0%";
    shape.style.left = Math.floor(Math.random() * (ShapeDisplayWidth - ShapeMaxScale)) + ShapePadding + "px";
    shape.style.top = "38px"; //76.5px / 2  & 微調整
}

/**
 * 譜面製作の設定
 */
class Chart_Setting {
    /**
     * フレーム情報関数
     */
    static Frame() {
        return {
            /**
             * フレーム追加関数
             * @param {number} 追加したいフレーム番号を指定 ※どのフレームにも入れない場合は0(番号が大きい程奥に表示されます)
             * @param {number} 判定までに掛かる遅延時間(ms) ※MeasureTime([拍数])
             */
            Add(AddFrameNumber, Delay) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    FrameNumber++;
                    const AddPoint = AddFrameNumber > 0 ? document.querySelector("#Frame" + AddFrameNumber) : document.querySelector("#ChartMode_Frame");
                    AddPoint.insertAdjacentHTML("beforeend",
                        '<div id="FrameID'+FrameNumber+'">'+
                        '<div id="FrameMoveX'+FrameNumber+'" class="Size0">'+
                        '<div id="FrameMoveY'+FrameNumber+'" class="Size0">'+
                        '<div id="FrameAngle'+FrameNumber+'" class="FrameOriginCenter">'+
                        '<div id="FrameScale'+FrameNumber+'" class="FrameOriginCenter">'+
                        '<div id="FrameOpacity'+FrameNumber+'" class="Size0">'+
                        '<div id="Frame'+FrameNumber+'">'+
                        '</div></div></div></div></div></div></div>'
                    );

                    anime({
                        targets: "#FrameMoveX" + FrameNumber,
                        translateX: 0,
                        duration: 0,
                        easing: "linear",
                        direction: EasingType[0]
                    });
                    anime({
                        targets: "#FrameMoveY" + FrameNumber,
                        translateY: 0,
                        duration: 0,
                        easing: "linear",
                        direction: EasingType[0]
                    });
                    anime({
                        targets: "#Frame" + FrameNumber,
                        opacity: [0, 1],
                        duration: 10,
                        delay: BeginOpacityTime,
                        easing: "linear",
                        direction: EasingType[0]
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //フレーム追加関数
            /**
             * フレーム削除関数
             * @param {number} 対象の判定枠番号を入力
             * @param {number} 判定までに掛かる遅延時間(ms) ※MeasureTime([拍数])
             */
            Remove(EditNumber, Delay) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;
                
                setTimeout(function() {
                    
                    FrameNumber--;
                    document.querySelector("#FrameID" + EditNumber).remove();

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //フレーム削除関数
            /**
             * フレームアニメーション関数(座標移動[X])
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のフレーム番号を入力
             * @param {number} 移動前のX座標(px)
             * @param {number} 移動後のX座標(px)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            MoveX(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#FrameMoveX" + EditNumber,
                        translateX: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //フレームアニメーション関数(座標移動[X])
            /**
             * フレームアニメーション関数(座標移動[Y])
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のフレーム番号を入力
             * @param {number} 移動前のY座標(px)
             * @param {number} 移動後のY座標(px)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            MoveY(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#FrameMoveY" + EditNumber,
                        translateY: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //フレームアニメーション関数(座標移動[Y])
            /**
             * フレームアニメーション関数(角度)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のフレーム番号を入力
             * @param {number} 移動前の角度(deg)
             * @param {number} 移動後の角度(deg)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Angle(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#FrameAngle" + EditNumber,
                        rotate: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //フレームアニメーション関数(角度)
            /**
             * フレームアニメーション関数(拡大率)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のフレーム番号を入力
             * @param {number} 移動前の倍率
             * @param {number} 移動後の倍率
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Scale(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);
                    
                    anime({
                        targets: "#FrameScale" + EditNumber,
                        scale: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //フレームアニメーション関数(拡大率)
            /**
             * フレームアニメーション関数(透明度)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のフレーム番号を入力
             * @param {number} 移動前の透明度(0～1)
             * @param {number} 移動後の透明度(0～1)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Opacity(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#FrameOpacity" + EditNumber,
                        opacity: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            } //フレームアニメーション関数(透明度)
        } //フレーム
    }
    /**
     * 判定枠情報関数
     */
    static JudgementFrame() {
        return {
            /**
             * 判定枠追加関数
             * @param {number} 追加したいフレーム番号を指定 ※どのフレームにも入れない場合は0
             * @param {number} 判定までに掛かる遅延時間(ms) ※MeasureTime([拍数])
             */
            Add(AddFrameNumber, Delay) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    JudgeNumber++;
                    const AddPoint = AddFrameNumber > 0 ? document.querySelector("#Frame" + AddFrameNumber) : document.querySelector("#ChartMode_Frame");
                    AddPoint.insertAdjacentHTML("beforeend",
                        '<div id="Judge'+JudgeNumber+'">'+
                        '<div id="JudgementFrameMoveX'+JudgeNumber+'" class="Size0">'+
                        '<div id="JudgementFrameMoveY'+JudgeNumber+'" class="Size0">'+
                        '<div id="JudgementFrameAngle'+JudgeNumber+'" class="OriginCenter">'+
                        '<div id="JudgementFrameScale'+JudgeNumber+'" class="OriginCenter">'+
                        '<div id="JudgementFrameOpacity'+JudgeNumber+'" class="Size0">'+
                        '<img src="Image/NoteType/JudgementFrame.png" class="Size0" style="width:136px; height:76.5px;" alt="test">'+
                        '</div></div></div></div></div></div>'
                    );

                    anime({
                        targets: "#JudgementFrameMoveX" + JudgeNumber,
                        translateX: CenterX,
                        duration: 0,
                        easing: "linear",
                        direction: EasingType[0]
                    });
                    anime({
                        targets: "#JudgementFrameMoveY" + JudgeNumber,
                        translateY: CenterY,
                        duration: 0,
                        easing: "linear",
                        direction: EasingType[0]
                    });
                    anime({
                        targets: "#Judge" + JudgeNumber,
                        opacity: [0, 1],
                        duration: 10,
                        delay: BeginOpacityTime,
                        easing: "linear",
                        direction: EasingType[0]
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //判定枠追加関数
            /**
             * 判定枠削除関数
             * @param {number} 対象の判定枠番号を入力
             * @param {number} 判定までに掛かる遅延時間(ms) ※MeasureTime([拍数])
             */
            Remove(EditNumber, Delay) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {
                    
                    JudgeNumber--;
                    document.querySelector("#Judge" + EditNumber).remove();

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //判定枠削除関数
            /**
             * 判定枠アニメーション関数(座標移動[X])
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象の判定枠番号を入力
             * @param {number} 移動前のX座標(px)
             * @param {number} 移動後のX座標(px)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            MoveX(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#JudgementFrameMoveX" + EditNumber,
                        translateX: [AniBefore+CenterX, AniAfter+CenterX],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //判定枠アニメーション関数(座標移動[X])
            /**
             * 判定枠アニメーション関数(座標移動[Y])
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象の判定枠番号を入力
             * @param {number} 移動前のY座標(px)
             * @param {number} 移動後のY座標(px)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            MoveY(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#JudgementFrameMoveY" + EditNumber,
                        translateY: [AniBefore+CenterY, AniAfter+CenterY],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //判定枠アニメーション関数(座標移動[Y])
            /**
             * 判定枠アニメーション関数(角度)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象の判定枠番号を入力
             * @param {number} 移動前の角度(deg)
             * @param {number} 移動後の角度(deg)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Angle(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#JudgementFrameAngle" + EditNumber,
                        rotate: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //判定枠アニメーション関数(角度)
            /**
             * 判定枠アニメーション関数(拡大率)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象の判定枠番号を入力
             * @param {number} 移動前の倍率
             * @param {number} 移動後の倍率
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Scale(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#JudgementFrameScale" + EditNumber,
                        scale: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //判定枠アニメーション関数(拡大率)
            /**
             * 判定枠アニメーション関数(透明度)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象の判定枠番号を入力
             * @param {number} 移動前の透明度(0～1)
             * @param {number} 移動後の透明度(0～1)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Opacity(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {
                    
                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#JudgementFrameOpacity" + EditNumber,
                        opacity: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            } //判定枠アニメーション関数(透明度)
        }
    }
    /**
     * ノーツ情報関数
     */
    static Note() {
        return {
            /**
             * ノーツ追加関数
             * @param {number} 追加したいフレーム番号を指定 ※どのフレームにも入れない場合は0
             * @param {number} ノーツの種類を入力 0ならnone、1～26はアルファベット順
             * @param {number} ノーツの見た目を入力 0ならnone、1～26はアルファベット順 
             * @param {number} 判定までに掛かる遅延時間(ms) ※MeasureTime([拍数])
             */
            Add(AddFrameNumber, Notetype, NoteLooks, Delay) {
                //読み込みの場合は実行しない
                if (isChartLoad) {
                    NoteNumber++;
                    NoteInfoList.AllTimingList.push("Note" + NoteNumber);
                    return;
                }

                setTimeout(function() {

                    //同時押しノーツかどうか
                    AllNoteNumber++;
                    const isSameTiming = NoteInfoList.AllTimingList.filter((Pastms) => Pastms === NoteInfoList.AllTimingList[AllNoteNumber - 1]).length >= 2 && OtherData.SameTiming ? 1 : 0;

                    //ランダムモード
                    if (OtherData.RandomMode) {
                        const RandomWord = Math.floor(Math.random() * Words.length);
                        Notetype = RandomWord;
                        NoteLooks = RandomWord;
                    }

                    NoteNumber++;
                    const NoteJudge = NoteNumber; //このノーツに現在のノーツ番号を振り付け
                    const AddPoint = AddFrameNumber > 0 ? document.querySelector("#Frame" + AddFrameNumber) : document.querySelector("#ChartMode_Frame");
                    AddPoint.insertAdjacentHTML("beforeend",
                        '<div id="Note'+NoteNumber+'">'+
                        '<div id="NoteMoveX'+NoteNumber+'" class="Size0">'+
                        '<div id="NoteMoveY'+NoteNumber+'" class="Size0">'+
                        '<div id="NoteAngle'+NoteNumber+'" class="OriginCenter">'+
                        '<div id="NoteScale'+NoteNumber+'" class="OriginCenter">'+
                        '<div id="NoteExtinguishment'+NoteNumber+'" class="Size0">'+
                        '<div id="NoteEffect'+NoteNumber+'" class="EffectSize"></div></div>'+
                        '<div id="NoteOpacity'+NoteNumber+'" class="Size0">'+
                        '<img src="Image/NoteType/Note/'+NotesPicture[isSameTiming]+'" id="NoteImage'+NoteNumber+'" class="Size0" style="width:136px; height:76.5px;" alt="test">'+
                        '<img src="Image/NoteType/Word/'+Words[NoteLooks]+'.png" id="WordNote'+NoteNumber+'" class="Size0" style="width:136px; height:76.5px;" alt="test">'+
                        //'<p class="Size0">'+(AllNoteNumber-1)+'</p>'+
                        '</div></div></div></div></div></div>'
                    );

                    anime({
                        targets: "#NoteMoveX" + NoteJudge,
                        translateX: CenterX,
                        duration: 0,
                        easing: "linear",
                        direction: EasingType[0]
                    });
                    anime({
                        targets: "#NoteMoveY" + NoteJudge,
                        translateY: CenterY,
                        duration: 0,
                        easing: "linear",
                        direction: EasingType[0]
                    });
                    anime({
                        targets: "#Note" + NoteJudge,
                        opacity: [0, 1],
                        duration: 10,
                        delay: BeginOpacityTime,
                        easing: "linear",
                        direction: EasingType[0]
                    });

                    NoteInfoList.NotetypeList.Note[NoteJudge] = Notetype;

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ノーツ追加関数
            /**
             * ノーツ判定関数
             * @param {number} 対象のノーツ番号を入力 ※ロングノーツ番号と共有されているので注意
             * @param {boolean} 判定させるならtrue、装飾用ならfalse 
             * @param {number} 判定までに掛かる遅延時間(ms) ※MeasureTime([拍数])
             */
            Eva(EditNumber, Authenticity, Delay) {
                //読み込みの場合はAllCOMBOに追加し、いつ反応するかのタイミングの情報も追加する
                if (isChartLoad) {
                    NoteInfoList.AllTimingList.splice(NoteInfoList.AllTimingList.indexOf("Note" + EditNumber), 1, MeasureTime(Past) + Delay);
                    if (Authenticity) {
                        AllCOMBO++;
                        NoteInfoList.TimingList.push(MeasureTime(Past) + Delay);
                    }
                    return;
                }

                setTimeout(function() {
                    anime({
                        targets: "#NoteImage" + EditNumber + ",#WordNote" + EditNumber,
                        opacity: 0,
                        duration: NoteOpacityTime,
                        easing: "linear"
                    });
                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);

                if (Authenticity) {
                    const Judge = ms => new Promise(func => setTimeout(func, ms));
                    async function Judgement() {

                        const TAP_SE = new Audio("SE/TAP.mp3");

                        if (!AutoMode) {

                            let Keydown_Event = true;

                            await Judge(LoadDelayTime + Delay);

                            const BeforekeyCount = keyCount;

                            const Notetype = NoteInfoList.NotetypeList.Note[EditNumber];

                            NoteInfoList.WordList.push(Words[Notetype]);
                            NoteInfoList.SameNumberList.push(NoteInfoList.WordList.filter((value) => { return value === Words[Notetype] }).length);
                            NoteInfoList.WithInRangeNumberList.push(EditNumber);

                            //同時押しでワードフリーノーツが優先されていた場合の処理
                            let SumSameTiming = NoteInfoList.TimingList.filter((Pastms) => Pastms === NoteInfoList.TimingList[SameTimingNoneNoteCount]).length;
                            //同じタイミングのノーツが2個以上の場合
                            if (SumSameTiming >= 2) {
                            
                                const myNoteInfo = NoteInfoList.WithInRangeNumberList.indexOf(EditNumber);
                                const firstSameTimingNoteInfo = myNoteInfo - SameTimingNoneNoteCount;
                            
                                //同時押しの最初がワードノーツだった場合、入れ替えの必要がないためその情報を削除
                                if (SameTimingNoneNoteCount == 0 && NoteInfoList.WordList[myNoteInfo] !== Words[0]) {
                                    NoteInfoList.TimingList.splice(0, 1);
                                    SameTimingFirstFrag = true;
                                }

                                //自身がワードノーツであり、かつ同じタイミングで自身より前にワードフリーノーツがいた場合、一番先頭のものと入れ替える
                                if (NoteInfoList.WordList[myNoteInfo] !== Words[0] && NoteInfoList.WordList[firstSameTimingNoteInfo] === Words[0]) {
                                    
                                    [NoteInfoList.WordList[myNoteInfo], NoteInfoList.WordList[firstSameTimingNoteInfo]] = [NoteInfoList.WordList[firstSameTimingNoteInfo], NoteInfoList.WordList[myNoteInfo]];
                                    [NoteInfoList.SameNumberList[myNoteInfo], NoteInfoList.SameNumberList[firstSameTimingNoteInfo]] = [NoteInfoList.SameNumberList[firstSameTimingNoteInfo], NoteInfoList.SameNumberList[myNoteInfo]];
                                    [NoteInfoList.WithInRangeNumberList[myNoteInfo], NoteInfoList.WithInRangeNumberList[firstSameTimingNoteInfo]] = [NoteInfoList.WithInRangeNumberList[firstSameTimingNoteInfo], NoteInfoList.WithInRangeNumberList[myNoteInfo]];
                                
                                    //先頭がワードノーツになったため、TimingListの先頭情報を削除する
                                    NoteInfoList.TimingList.splice(0, 1);
                                    SumSameTiming--;

                                } else {
                                
                                    SameTimingNoneNoteCount++;
                                
                                }
                            
                                //最後の同時押しノーツの場合
                                if (SumSameTiming == SameTimingNoneNoteCount) {
                                
                                    //同時押しの情報を全て削除
                                    NoteInfoList.TimingList.splice(0, SameTimingNoneNoteCount);
                                    SameTimingNoneNoteCount = 0;
                                
                                }
                            
                            }

                            //スプレッド演算子を使用してNoteInfoList.WordListのコピーを作成
                            let EvaNoteInfoList = [...NoteInfoList.WordList];

                            /**
                             * ノーツが叩かれたときに実行される関数
                             * @param {number} 判定番号
                             * @param {number} 判定時間
                             */
                            function NoteKeyEvent(Result, JudgeTime) {
                                document.body.addEventListener("keydown", Keydown, false);
                                //JudgeTimeの時間だけ判定させる
                                setTimeout(function() {
                                    document.body.removeEventListener("keydown", Keydown);
                                }, JudgeTime);

                                function Keydown(NoteTAP) {
                                    //ワードノーツの場合
                                    if (Notetype) {

                                        //もし範囲内にワードフリーノーツがあった場合は判定させない
                                        //if (NoteInfoList.WordList.indexOf(Words[0]) >= 0 && NoteInfoList.WordList.indexOf(Words[0]) < NoteInfoList.WithInRangeNumberList.indexOf(EditNumber)) Keydown_Event = false;
                                        //console.log(NoteInfoList.WordList.indexOf(Words[0]) >= 0 && NoteInfoList.WordList.indexOf(Words[0]) < NoteInfoList.WithInRangeNumberList.indexOf(EditNumber))

                                        if (NoteTAP.key === Words[Notetype] && keyCount > BeforekeyCount && Keydown_Event) {

                                            //もし目的のノーツが範囲内に2つ以上ある場合、一番先頭のノーツのみ判定させる
                                            if (NoteInfoList.SameNumberList[NoteInfoList.WithInRangeNumberList.indexOf(EditNumber)] == 1) {
                                                TAP_SE.play();
                                                Evaluation("Note", EditNumber, JudgeScore[Result], true, false);
                                            
                                                ReloadScore(Result);
                                            
                                                //叩かれた配列を削除
                                                NoteInfoList.WordList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                                NoteInfoList.SameNumberList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                                NoteInfoList.WithInRangeNumberList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                            
                                                Keydown_Event = false;
                                                document.body.removeEventListener("keydown", Keydown);
                                            } else {
                                                NoteInfoList.SameNumberList[NoteInfoList.WithInRangeNumberList.indexOf(EditNumber)]--;
                                            }

                                        }

                                    //ワードフリーノーツの場合
                                    } else {

                                        //同時押しの場合は対象の部分のコピーを再び作成(最初がワードノーツの場合は、その次のワードフリーノーツを省く)
                                        if (SumSameTiming >= 2 && !SameTimingFirstFrag) {
                                            EvaNoteInfoList = [...NoteInfoList.WordList.slice(0, SumSameTiming)];
                                            SameTimingFirstFrag = false;
                                        }
                                    
                                        //もし押したキーが範囲内にあれば、その範囲内にあるノーツを反映させないようにする
                                        let isSameNote = false;
                                        for (let EvaWordList of EvaNoteInfoList) if (NoteTAP.key === EvaWordList) isSameNote = true;

                                        if (NoteTAP.key.charCodeAt(0) >= 97 && NoteTAP.key.charCodeAt(0) <= 122 && keyCount > BeforekeyCount && Keydown_Event && !isSameNote) {

                                            //もし目的のノーツが範囲内に2つ以上ある場合、一番先頭のノーツのみ判定させる
                                            if (NoteInfoList.SameNumberList[NoteInfoList.WithInRangeNumberList.indexOf(EditNumber)] == 1) {
                                                TAP_SE.play();
                                                Evaluation("Note", EditNumber, JudgeScore[Result], true, false);

                                                ReloadScore(Result);

                                                //叩かれた配列を削除
                                                NoteInfoList.WordList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                                NoteInfoList.SameNumberList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                                NoteInfoList.WithInRangeNumberList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                            
                                                Keydown_Event = false;
                                                document.body.removeEventListener("keydown", Keydown);
                                            } else {
                                                NoteInfoList.SameNumberList[NoteInfoList.WithInRangeNumberList.indexOf(EditNumber)]--;
                                            }
                                        }
                                    }
                                }
                            }

                            //MISSEARLY
                            NoteKeyEvent(5, Judge_Time.MISSEARLY);

                            await Judge(Judge_Time.MISSEARLY);

                            //BADEARLY
                            NoteKeyEvent(4, Judge_Time.BADEARLY);

                            await Judge(Judge_Time.BADEARLY);

                            //EARLY
                            NoteKeyEvent(2, Judge_Time.EARLY);

                            await Judge(Judge_Time.EARLY);

                            //PERFECT
                            NoteKeyEvent(1, Judge_Time.PERFECT);

                            await Judge(Judge_Time.PERFECT);

                            //LATE
                            NoteKeyEvent(3, Judge_Time.LATE);

                            await Judge(Judge_Time.LATE);

                            //BADLATE
                            NoteKeyEvent(4, Judge_Time.BADLATE);

                            await Judge(Judge_Time.BADLATE);

                            //MISSLATE
                            if (Keydown_Event) {
                                Evaluation("Note", EditNumber, JudgeScore[5], false, false);

                                ReloadScore(5);

                                //叩き損ねたノーツと一致したワードのNoteInfoList.SameNumberListを1減らす
                                for (let i = 0; i != NoteInfoList.WordList.length; i++) if (NoteInfoList.WordList[i] === Words[Notetype]) NoteInfoList.SameNumberList[i]--;

                                //叩かれた配列を削除
                                NoteInfoList.WordList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                NoteInfoList.SameNumberList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                NoteInfoList.WithInRangeNumberList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                            
                                Keydown_Event = false;
                            }

                        //AutoMode
                        } else {

                            await Judge(LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);

                            TAP_SE.play();
                            Evaluation("Note", EditNumber, JudgeScore[1], true, false);
                                            
                            ReloadScore(1);

                        }
                    }
                    Judgement();
                }
            }, //ノーツ判定関数
            /**
             * ノーツアニメーション関数(座標移動[X])
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のノーツ番号を入力 ※ロングノーツ番号と共有されているので注意
             * @param {number} 移動前のX座標(px)
             * @param {number} 移動後のX座標(px)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            MoveX(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                      targets: "#NoteMoveX" + EditNumber,
                      translateX: [AniBefore+CenterX, AniAfter+CenterX],
                      duration: Duration,
                      easing: Easing,
                      direction: Direction,
                      loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ノーツアニメーション関数(座標移動[X])
            /**
             * ノーツアニメーション関数(座標移動[Y])
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のノーツ番号を入力 ※ロングノーツ番号と共有されているので注意
             * @param {number} 移動前のY座標(px)
             * @param {number} 移動後のY座標(px)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            MoveY(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#NoteMoveY" + EditNumber,
                        translateY: [AniBefore+CenterY, AniAfter+CenterY],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ノーツアニメーション関数(座標移動[Y])
            /**
             * ノーツアニメーション関数(角度)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のノーツ番号を入力 ※ロングノーツ番号と共有されているので注意
             * @param {number} 移動前の角度(deg)
             * @param {number} 移動後の角度(deg)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Angle(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#NoteAngle" + EditNumber,
                        rotate: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ノーツアニメーション関数(角度)
            /**
             * ノーツアニメーション関数(拡大率)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象の判定枠番号を入力
             * @param {number} 移動前の拡大率(倍率)
             * @param {number} 移動後の拡大率(倍率)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Scale(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#NoteScale" + EditNumber,
                        scale: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ノーツアニメーション関数(拡大率)
            /**
             * ノーツアニメーション関数(透明度)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のノーツ番号を入力 ※ロングノーツ番号と共有されているので注意
             * @param {number} 移動前の透明度(0～1)
             * @param {number} 移動後の透明度(0～1)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Opacity(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#NoteOpacity" + EditNumber,
                        opacity: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ノーツアニメーション関数(透明度)
            /**
             * 通常ノーツ関数 ノーツを等速で移動・判定させます(X座標は固定)
             * @param {number} 対象のノーツ番号を入力 ※ロングノーツ番号と共有されているので注意
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {number} 配置するX座標を指定
             * @param {number} 移動前のY座標(px)
             * @param {number} 移動後のY座標(px)
             */
            Typically(EditNumber, Duration, Delay, X, YBefore, YAfter) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                Chart_Setting.Note().MoveX(EditNumber, X, X, 0, 0, "linear", EasingType[0], false);
                Chart_Setting.Note().MoveY(EditNumber, YBefore, YAfter, Duration, Delay, "linear", EasingType[0], false);
            } //通常ノーツ関数
        } //ノーツ
    }
    /**
     * ロングノーツ情報関数
     */
    static LongNote() {
        return {
            /**
             * ロングノーツ追加関数
             * @param {number} 追加したいフレーム番号を指定 ※どのフレームにも入れない場合は0
             * @param {number} ロングノーツの種類を入力 0ならnone、1～26はアルファベット順
             * @param {number} ロングノーツの見た目を入力 0ならnone、1～26はアルファベット順 
             * @param {number} 判定までに掛かる時間(ms) ※MeasureTime([拍数])
             */
            Add(AddFrameNumber, Notetype, NoteLooks, Delay) {
                //読み込みの場合は実行しない
                if (isChartLoad) {
                    NoteNumber++;
                    NoteInfoList.AllTimingList.push("LongNote" + NoteNumber);
                    return;
                }

                setTimeout(function() {

                    //同時押しノーツかどうか
                    AllNoteNumber++;
                    const isSameTiming = NoteInfoList.AllTimingList.filter((Pastms) => Pastms === NoteInfoList.AllTimingList[AllNoteNumber - 1]).length >= 2 && OtherData.SameTiming ? 1 : 0;

                    //ランダムモード
                    if (OtherData.RandomMode) {
                        const RandomWord = Math.floor(Math.random() * Words.length);
                        Notetype = RandomWord;
                        NoteLooks = RandomWord;
                    }

                    NoteNumber++;
                    const LongNoteJudge = NoteNumber; //このロングノーツに現在のノーツ番号を振り付け
                    const AddPoint = AddFrameNumber > 0 ? document.querySelector("#Frame" + AddFrameNumber) : document.querySelector("#ChartMode_Frame");
                    AddPoint.insertAdjacentHTML("beforeend",
                        '<div id="LongNote'+NoteNumber+'">'+
                        '<div id="LongNoteMoveX'+NoteNumber+'" class="Size0">'+
                        '<div id="LongNoteMoveY'+NoteNumber+'" class="Size0">'+
                        '<div id="LongNoteAngle'+NoteNumber+'" class="OriginCenter">'+
                        '<div id="LongNoteScale'+NoteNumber+'" class="OriginCenter">'+
                        '<div id="LongNoteExtinguishment'+NoteNumber+'" class="Size0">'+
                        '<div id="LongNoteEffect'+NoteNumber+'" class="EffectSize"></div></div>'+
                        '<div id="LongNoteOpacity'+NoteNumber+'" class="Size0 LongNoteLengthZ_Index">'+
                        '<div id="LongNoteContrast'+NoteNumber+'" class="Size0 LongNoteContrast100%">'+
                        '<img src="Image/NoteType/Note/'+NotesPicture[isSameTiming]+'" id="LongNoteImage'+NoteNumber+'" class="Size0" style="width:136px; height:76.5px;" alt="test">'+
                        '<img src="Image/NoteType/Word/'+Words[NoteLooks]+'.png" class="Size0" style="width:136px; height:76.5px;" alt="test">'+
                        //'<p class="Size0">'+(AllNoteNumber-1)+'</p>'+
                        '<div id="LongNoteLength'+NoteNumber+'" class="LongNoteLength">'+
                        '</div></div></div></div></div></div></div></div>'
                    );

                    anime({
                        targets: "#LongNoteMoveX" + LongNoteJudge,
                        translateX: CenterX,
                        duration: 0,
                        easing: "linear",
                        direction: EasingType[0]
                    });
                    anime({
                        targets: "#LongNoteMoveY" + LongNoteJudge,
                        translateY: CenterY,
                        duration: 0,
                        easing: "linear",
                        direction: EasingType[0]
                    });
                    anime({
                        targets: "#LongNote" + LongNoteJudge,
                        opacity: [0, 1],
                        duration: 10,
                        delay: BeginOpacityTime,
                        easing: "linear",
                        direction: EasingType[0]
                    });

                    NoteInfoList.NotetypeList.LongNote[LongNoteJudge] = Notetype;

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            },
            /**
             * ロングノーツ判定関数
             * @param {number} 対象のロングノーツ番号を入力 ※ノーツ番号と共有されているので注意
             * @param {boolean} 判定させるならtrue、装飾用ならfalse 
             * @param {number} 長押しの判定時間(ms) ※MeasureTime([拍数])
             * @param {number} 判定までに掛かる遅延時間(ms) ※MeasureTime([拍数])
             */
            Eva(EditNumber, Authenticity, DurationDisplayTime, Delay) {
                //読み込みの場合はAllCOMBOに追加し、いつ反応するかのタイミングの情報も追加する
                if (isChartLoad) {
                    NoteInfoList.AllTimingList.splice(NoteInfoList.AllTimingList.indexOf("LongNote" + EditNumber), 1, MeasureTime(Past) + Delay);
                    if (Authenticity) {
                        AllCOMBO++;
                        NoteInfoList.TimingList.push(MeasureTime(Past) + Delay);
                    }
                    return;
                }

                //ロングノーツ終了時の透明化
                setTimeout(function() {
                    anime({
                        targets: "#LongNoteContrast" + EditNumber,
                        opacity: 0,
                        duration: NoteOpacityTime,
                        easing: "linear"
                    });
                }, LoadDelayTime + DurationDisplayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                //判定文字の消えた後に削除するための遅延時間
                const AfterEvaTime = 1000;
                setTimeout(function() {
                    document.querySelector("#LongNote" + EditNumber).remove();
                }, LoadDelayTime + DurationDisplayTime + Delay + NoteOpacityTime + AfterEvaTime + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                //ロングノーツ終了時の透明化

                if (Authenticity) {
                    const Judge = ms => new Promise(func => setTimeout(func, ms));
                    async function Judgement() {

                        const TAP_SE = new Audio("SE/TAP.mp3");
                        /**
                         * エフェクトのループ演出
                         */
                        let LoopEffect;

                        if (!AutoMode) {

                            let Keydown_Event = true;
                            let Keyup_Event = true;

                            await Judge(LoadDelayTime + Delay);

                            const BeforekeyCount = keyCount;

                            const Notetype = NoteInfoList.NotetypeList.LongNote[EditNumber];

                            NoteInfoList.WordList.push(Words[Notetype]);
                            NoteInfoList.SameNumberList.push(NoteInfoList.WordList.filter((value) => { return value === Words[Notetype] }).length);
                            NoteInfoList.WithInRangeNumberList.push(EditNumber);

                            //同時押しでワードフリーノーツが優先されていた場合の処理
                            let SumSameTiming = NoteInfoList.TimingList.filter((Pastms) => Pastms === NoteInfoList.TimingList[SameTimingNoneNoteCount]).length;
                            //同じタイミングのノーツが2個以上の場合
                            if (SumSameTiming >= 2) {
                            
                                const myNoteInfo = NoteInfoList.WithInRangeNumberList.indexOf(EditNumber);
                                const firstSameTimingNoteInfo = myNoteInfo - SameTimingNoneNoteCount;
                            
                                //同時押しの最初がワードノーツだった場合、入れ替えの必要がないためその情報を削除
                                if (SameTimingNoneNoteCount == 0 && NoteInfoList.WordList[myNoteInfo] !== Words[0]) {
                                    NoteInfoList.TimingList.splice(0, 1);
                                    SameTimingFirstFrag = true;
                                }
                            
                                //自身がワードノーツであり、かつ同じタイミングで自身より前にワードフリーノーツがいた場合、一番先頭のものと入れ替える
                                if (NoteInfoList.WordList[myNoteInfo] !== Words[0] && NoteInfoList.WordList[firstSameTimingNoteInfo] === Words[0]) {
                                
                                    [NoteInfoList.WordList[myNoteInfo], NoteInfoList.WordList[firstSameTimingNoteInfo]] = [NoteInfoList.WordList[firstSameTimingNoteInfo], NoteInfoList.WordList[myNoteInfo]];
                                    [NoteInfoList.SameNumberList[myNoteInfo], NoteInfoList.SameNumberList[firstSameTimingNoteInfo]] = [NoteInfoList.SameNumberList[firstSameTimingNoteInfo], NoteInfoList.SameNumberList[myNoteInfo]];
                                    [NoteInfoList.WithInRangeNumberList[myNoteInfo], NoteInfoList.WithInRangeNumberList[firstSameTimingNoteInfo]] = [NoteInfoList.WithInRangeNumberList[firstSameTimingNoteInfo], NoteInfoList.WithInRangeNumberList[myNoteInfo]];
                                
                                    //先頭がワードノーツになったため、TimingListの先頭情報を削除する
                                    NoteInfoList.TimingList.splice(0, 1);
                                    SumSameTiming--;

                                } else {
                                
                                    SameTimingNoneNoteCount++;
                                
                                }
                            
                                //最後の同時押しノーツの場合
                                if (SumSameTiming == SameTimingNoneNoteCount) {
                                
                                    //同時押しの情報を全て削除
                                    NoteInfoList.TimingList.splice(0, SameTimingNoneNoteCount);
                                    SameTimingNoneNoteCount = 0;
                                
                                }
                            
                            }

                            //スプレッド演算子を使用してNoteInfoList.WordListのコピーを作成
                            let EvaNoteInfoList = [...NoteInfoList.WordList];

                            //ロングノーツが指定時間まで押されているか(指定時間が150ms以下の場合はtrue)
                            let LongNoteCondition = DurationDisplayTime <= LongNoteJudge_Time ? true : false;
                            const LongNoteConditionTimeout = setTimeout(function() {
                                LongNoteCondition = true;
                            }, Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT + DurationDisplayTime - LongNoteJudge_Time);

                            //指定時間後のロングノーツの処理
                            let isLongNoteOK = true;
                            let EndResult;
                            setTimeout(function() {
                                if (isLongNoteOK) {
                                    if (DurationDisplayTime > LongNoteJudge_Time) {
                                        Evaluation("LongNote", EditNumber, JudgeScore[0], true, true);
                                        
                                        ReloadScore(EndResult);
                                    }

                                    clearInterval(LoopEffect);
                                }
                            }, DurationDisplayTime + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);

                            /**
                             * ノーツが叩かれたときに実行される関数
                             * @param {number} 判定番号
                             * @param {number} 判定時間
                             */
                            function LongNoteKeyEvent(Result, JudgeTime) {
                                document.body.addEventListener("keydown", Keydown, false);
                                //JudgeTimeの時間だけ判定させる
                                setTimeout(function() {
                                    document.body.removeEventListener("keydown", Keydown);
                                }, JudgeTime);

                                function Keydown(LongNoteTAP) {
                                    //ワードノーツの場合
                                    if (Notetype) {

                                        //もし範囲内にワードフリーノーツがあった場合は判定させない
                                        //if (NoteInfoList.WordList.indexOf(Words[0]) >= 0 && NoteInfoList.WordList.indexOf(Words[0]) < NoteInfoList.WithInRangeNumberList.indexOf(EditNumber)) Keydown_Event = false;

                                        if (LongNoteTAP.key === Words[Notetype] && keyCount > BeforekeyCount && Keydown_Event) {

                                            //もし目的のノーツが範囲内に2つ以上ある場合、一番先頭のノーツのみ判定させる
                                            if (NoteInfoList.SameNumberList[NoteInfoList.WithInRangeNumberList.indexOf(EditNumber)] == 1) {
                                                TAP_SE.play();
                                                EndResult = Result;
                                                Evaluation("LongNote", EditNumber, JudgeScore[Result], DurationDisplayTime <= LongNoteJudge_Time, true);

                                                //押し続けてる間はエフェクトを出す
                                                if (DurationDisplayTime > LongNoteJudge_Time) {
                                                    LoopEffect = setInterval(function() {
                                                        EvaluationEffect("LongNote", EditNumber, true);
                                                    }, EffectLoopTime);
                                                }

                                                Keydown_Event = false;
                                                document.body.removeEventListener("keydown", Keydown);
                                            
                                                //MISSEARLYの場合はここでミス判定
                                                if (Result == 5) {

                                                    clearTimeout(LongNoteConditionTimeout);
                                                    clearInterval(LoopEffect);

                                                    ReloadScore(5);
                                                    document.querySelector("#LongNoteContrast" + EditNumber).classList.replace("LongNoteContrast100%", "LongNoteContrast");

                                                    isLongNoteOK = false;

                                                } else {

                                                    //キーを離すまでの処理
                                                    document.addEventListener("keyup", function Keyup(LongNoteTAP) {

                                                        if (LongNoteTAP.key === Words[Notetype] && Keyup_Event) {

                                                            if (!LongNoteCondition) {
                                                                Evaluation("LongNote", EditNumber, JudgeScore[5], true, true);

                                                                clearTimeout(LongNoteConditionTimeout);
                                                                clearInterval(LoopEffect);

                                                                ReloadScore(5);
                                                                document.querySelector("#LongNoteContrast" + EditNumber).classList.replace("LongNoteContrast100%", "LongNoteContrast");

                                                                isLongNoteOK = false;
                                                            }
                                                            Keyup_Event = false;
                                                            document.body.removeEventListener('keydown', Keydown);
                                                            document.body.removeEventListener('keyup', Keyup);
                                                        }
                                                    });
                                                }
                                            
                                                //叩かれた配列を削除
                                                NoteInfoList.WordList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                                NoteInfoList.SameNumberList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                                NoteInfoList.WithInRangeNumberList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                            } else {
                                                NoteInfoList.SameNumberList[NoteInfoList.WithInRangeNumberList.indexOf(EditNumber)]--;
                                            }

                                        }

                                    //ワードフリーノーツの場合
                                    } else {
                                    
                                        //同時押しの場合は対象の部分のコピーを再び作成
                                        if (SumSameTiming >= 2 && !SameTimingFirstFrag) {
                                            EvaNoteInfoList = [...NoteInfoList.WordList.slice(0, SumSameTiming)];
                                            SameTimingFirstFrag = false;
                                        }
                                    
                                        //もし押したキーが範囲内にあれば、その範囲内にあるノーツを反映させないようにする
                                        let isSameNote = false;
                                        for (let EvaWordList of EvaNoteInfoList) if (LongNoteTAP.key === EvaWordList) isSameNote = true;

                                        if (LongNoteTAP.key.charCodeAt(0) >= 97 && LongNoteTAP.key.charCodeAt(0) <= 122 && keyCount > BeforekeyCount && Keydown_Event && !isSameNote) {

                                            //もし目的のノーツが範囲内に2つ以上ある場合、一番先頭のノーツのみ判定させる
                                            if (NoteInfoList.SameNumberList[NoteInfoList.WithInRangeNumberList.indexOf(EditNumber)] == 1) {
                                                TAP_SE.play();
                                                EndResult = Result;
                                                Evaluation("LongNote", EditNumber, JudgeScore[Result], DurationDisplayTime <= LongNoteJudge_Time, true);

                                                //押し続けてる間はエフェクトを出す
                                                if (DurationDisplayTime > LongNoteJudge_Time) {
                                                    LoopEffect = setInterval(function() {
                                                        EvaluationEffect("LongNote", EditNumber, true);
                                                    }, EffectLoopTime);
                                                }

                                                Keydown_Event = false;
                                                document.body.removeEventListener("keydown", Keydown);
                                            
                                                //MISSEARLYの場合はここでミス判定
                                                if (Result == 5) {

                                                    clearTimeout(LongNoteConditionTimeout);
                                                    clearInterval(LoopEffect);

                                                    ReloadScore(5);
                                                    document.querySelector("#LongNoteContrast" + EditNumber).classList.replace("LongNoteContrast100%", "LongNoteContrast");

                                                    isLongNoteOK = false;

                                                } else {

                                                    //キーを離すまでの処理
                                                    document.addEventListener("keyup", function Keyup() {

                                                        if (Object.keys(keys).length == 0 && Keyup_Event) {

                                                            if (!LongNoteCondition) {
                                                                Evaluation("LongNote", EditNumber, JudgeScore[5], true, true);

                                                                clearTimeout(LongNoteConditionTimeout);
                                                                clearInterval(LoopEffect);

                                                                ReloadScore(5);
                                                                document.querySelector("#LongNoteContrast" + EditNumber).classList.replace("LongNoteContrast100%", "LongNoteContrast");

                                                                isLongNoteOK = false;
                                                            }
                                                            Keyup_Event = false;
                                                            document.body.removeEventListener('keydown', Keydown);
                                                            document.body.removeEventListener('keyup', Keyup);
                                                        }
                                                    });
                                                }
                                            
                                                //叩かれた配列を削除
                                                NoteInfoList.WordList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                                NoteInfoList.SameNumberList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                                NoteInfoList.WithInRangeNumberList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                            } else {
                                                NoteInfoList.SameNumberList[NoteInfoList.WithInRangeNumberList.indexOf(EditNumber)]--;
                                            }
                                        }
                                    }
                                }
                            }

                            //MISSEARLY
                            LongNoteKeyEvent(5, Judge_Time.MISSEARLY);

                            await Judge(Judge_Time.MISSEARLY);

                            //BADEARLY
                            LongNoteKeyEvent(4, Judge_Time.BADEARLY);

                            await Judge(Judge_Time.MISSEARLY);

                            //EARLY
                            LongNoteKeyEvent(2, Judge_Time.EARLY);

                            await Judge(Judge_Time.EARLY);

                            //PERFECT
                            LongNoteKeyEvent(1, Judge_Time.PERFECT);

                            await Judge(Judge_Time.PERFECT);

                            //LATE
                            LongNoteKeyEvent(3, Judge_Time.LATE);

                            await Judge(Judge_Time.LATE);

                            //BADLATE
                            LongNoteKeyEvent(4, Judge_Time.BADLATE);

                            await Judge(Judge_Time.BADLATE);

                            //MISSLATE
                            if (Keydown_Event) {
                                EndResult = 5;
                                Evaluation("LongNote", EditNumber, JudgeScore[5], false, true);

                                clearTimeout(LongNoteConditionTimeout);

                                ReloadScore(5);
                                document.querySelector("#LongNoteContrast" + EditNumber).classList.replace("LongNoteContrast100%", "LongNoteContrast");

                                //叩き損ねたノーツと一致したワードのNoteInfoList.SameNumberListを1減らす
                                for (let i = 0; i != NoteInfoList.WordList.length; i++) if (NoteInfoList.WordList[i] === Words[Notetype]) NoteInfoList.SameNumberList[i]--;

                                isLongNoteOK = false;

                                //叩かれた配列を削除
                                NoteInfoList.WordList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                NoteInfoList.SameNumberList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                                NoteInfoList.WithInRangeNumberList.splice(NoteInfoList.WithInRangeNumberList.indexOf(EditNumber), 1);
                            
                                Keydown_Event = false;
                            }
                        
                        //AutoMode
                        } else {

                            await Judge(LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);

                            TAP_SE.play();
                            Evaluation("LongNote", EditNumber, JudgeScore[1], DurationDisplayTime <= LongNoteJudge_Time, true);

                            LoopEffect = setInterval(function() {
                                EvaluationEffect("LongNote", EditNumber, true);
                            }, EffectLoopTime);

                            await Judge(DurationDisplayTime);

                            if (DurationDisplayTime > LongNoteJudge_Time) Evaluation("LongNote", EditNumber, JudgeScore[0], true, true);

                            clearInterval(LoopEffect);

                            ReloadScore(1);

                        }
                    }
                    Judgement();
                }
            }, //ロングノーツ判定関数
            /**
             * ロングノーツアニメーション関数(座標移動[X])
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のロングノーツ番号を入力 ※ノーツ番号と共有されているので注意
             * @param {number} 移動前のX座標(px)
             * @param {number} 移動後のX座標(px)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合
             */
            MoveX(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#LongNoteMoveX" + EditNumber,
                        translateX: [AniBefore+CenterX, AniAfter+CenterX],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ロングノーツアニメーション関数(座標移動[X])
            /**
             * ロングノーツアニメーション関数(座標移動[Y])
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のロングノーツ番号を入力 ※ノーツ番号と共有されているので注意
             * @param {number} 移動前のY座標(px)
             * @param {number} 移動後のY座標(px)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            MoveY(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function () {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#LongNoteMoveY" + EditNumber,
                        translateY: [AniBefore+CenterY, AniAfter+CenterY],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ロングノーツアニメーション関数(座標移動[Y])
            /**
             * ロングノーツアニメーション関数(角度)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のロングノーツ番号を入力 ※ノーツ番号と共有されているので注意
             * @param {number} 移動前の角度(deg)
             * @param {number} 移動後の角度(deg)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Angle(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#LongNoteAngle" + EditNumber,
                        rotate: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ロングノーツアニメーション関数(角度)
            /**
             * ロングノーツアニメーション関数(拡大率)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象の判定枠番号を入力
             * @param {number} 移動前の拡大率(倍率)
             * @param {number} 移動後の拡大率(倍率)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Scale(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout( function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#LongNoteScale" + EditNumber,
                        scale: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ロングノーツアニメーション関数(拡大率)
            /**
             * ロングノーツアニメーション関数(透明度)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のロングノーツ番号を入力 ※ノーツ番号と共有されているので注意
             * @param {number} 移動前の透明度(0～1)
             * @param {number} 移動後の透明度(0～1)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Opacity(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#LongNoteOpacity" + EditNumber,
                        opacity: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ロングノーツアニメーション関数(透明度)
            /**
             * ロングノーツ長さ調節関数
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のロングノーツ番号を入力 ※ノーツ番号と共有されているので注意
             * @param {number} 移動前の長さ(px)
             * @param {number} 移動後の長さ(px)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Length(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#LongNoteLength" + EditNumber,
                        height: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ロングノーツ長さ調節関数
            /**
             * 通常ロングノーツ関数 ロングノーツを等速で移動・判定させます(X座標は固定)
             * @param {number} 対象のロングノーツ番号を入力 ※ノーツ番号と共有されているので注意 
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {number} 長押しの判定時間(ms) ※MeasureTime([拍数])
             * @param {number} 配置するX座標を指定
             * @param {number} 移動前のY座標(px)
             * @param {number} 移動後のY座標(px)
             */
            Typically(EditNumber, Duration, Delay, EndDisplayTime, X, YBefore, YAfter) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                Chart_Setting.LongNote().MoveX(EditNumber, X, X, 0, 0, "linear", EasingType[0], false);
                Chart_Setting.LongNote().MoveY(EditNumber, YBefore, YAfter, Duration, Delay, "linear", EasingType[0], false);
                Chart_Setting.LongNote().Length(EditNumber, Math.abs(YAfter - YBefore) / Duration * EndDisplayTime, Math.abs(YAfter - YBefore) / Duration * EndDisplayTime, Duration, 0, "linear", EasingType[0], false);
                Chart_Setting.LongNote().Length(EditNumber, Math.abs(YAfter - YBefore) / Duration * EndDisplayTime, 0, EndDisplayTime, Duration + Delay, "linear", EasingType[0], false);
            } //通常ロングノーツ関数
        }
    }
    /**
     * ドラッグノーツ情報関数
     */
    static DragNote() {
        return {
            /**
             * ドラッグノーツ追加関数
             * @param {number} 追加したいフレーム番号を指定 ※どのフレームにも入れない場合は0
             * @param {number} ドラッグノーツの種類を入力 0ならnone、1～26はアルファベット順
             * @param {number} ドラッグノーツの見た目を入力 0ならnone、1～26はアルファベット順 
             * @param {number} 判定までに掛かる時間(ms) ※MeasureTime([拍数])
             */
            Add(AddFrameNumber, Notetype, NoteLooks, Delay) {
                //読み込みの場合は実行しない
                if (isChartLoad) {
                    DragNoteNumber++;
                    NoteInfoList.AllTimingList.push("DragNote" + DragNoteNumber);
                    return;
                }

                setTimeout(function() {

                    AllNoteNumber++;

                    //ランダムモード
                    if (OtherData.RandomMode) {
                        const RandomWord = Math.floor(Math.random() * Words.length);
                        Notetype = RandomWord;
                        NoteLooks = RandomWord;
                    }

                    DragNoteNumber++;
                    const DragNoteJudge = DragNoteNumber; //このノーツに現在のノーツ番号を振り付け
                    const AddPoint = AddFrameNumber > 0 ? document.querySelector("#Frame" + AddFrameNumber) : document.querySelector("#ChartMode_Frame");
                    AddPoint.insertAdjacentHTML("beforeend",
                        '<div id="DragNote'+DragNoteNumber+'">'+
                        '<div id="DragNoteMoveX'+DragNoteNumber+'" class="Size0">'+
                        '<div id="DragNoteMoveY'+DragNoteNumber+'" class="Size0">'+
                        '<div id="DragNoteAngle'+DragNoteNumber+'" class="OriginCenter">'+
                        '<div id="DragNoteScale'+DragNoteNumber+'" class="OriginCenter">'+
                        '<div id="DragNoteExtinguishment'+DragNoteNumber+'" class="Size0">'+
                        '<div id="DragNoteEffect'+DragNoteNumber+'" class="EffectSize"></div></div>'+
                        '<div id="DragNoteOpacity'+DragNoteNumber+'" class="Size0">'+
                        '<img src="Image/NoteType/Drag/Drag.png" id="DragNoteImage'+DragNoteNumber+'" class="Size0" style="width:136px; height:76.5px;" alt="test">'+
                        '<img src="Image/NoteType/Word/'+Words[NoteLooks]+'.png" id="WordDragNote'+DragNoteNumber+'" class="Size0" style="width:136px; height:76.5px;" alt="test">'+
                        //'<p class="Size0">'+(AllNoteNumber-1)+'</p>'+
                        '</div></div></div></div></div></div>'
                    );

                    anime({
                        targets: "#DragNoteMoveX" + DragNoteJudge,
                        translateX: CenterX,
                        duration: 0,
                        easing: "linear",
                        direction: EasingType[0]
                    });
                    anime({
                        targets: "#DragNoteMoveY" + DragNoteJudge,
                        translateY: CenterY,
                        duration: 0,
                        easing: "linear",
                        direction: EasingType[0]
                    });
                    anime({
                        targets: "#DragNote" + DragNoteJudge,
                        opacity: [0, 1],
                        duration: 10,
                        delay: BeginOpacityTime,
                        easing: "linear",
                        direction: EasingType[0]
                    });

                    NoteInfoList.NotetypeList.DragNote[DragNoteJudge] = Notetype;

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ドラッグノーツ追加関数
            /**
             * ドラッグノーツ判定関数
             * @param {number} 対象のドラッグノーツ番号を入力
             * @param {boolean} 判定させるならtrue、装飾用ならfalse 
             * @param {number} 判定までに掛かる遅延時間(ms) ※MeasureTime([拍数])
             */
            Eva(EditNumber, Authenticity, Delay) {
                //読み込みの場合はAllCOMBOに追加だけ行う
                if (isChartLoad) {
                    NoteInfoList.AllTimingList.splice(NoteInfoList.AllTimingList.indexOf("DragNote" + EditNumber), 1, MeasureTime(Past) + Delay);
                    if (Authenticity) {
                        AllCOMBO++;
                        NoteInfoList.TimingList.push(MeasureTime(Past) + Delay);
                    }
                    return;
                }

                setTimeout(function() {
                    anime({
                        targets: "#DragNoteImage" + EditNumber + ",#WordDragNote" + EditNumber,
                        opacity: 0,
                        duration: NoteOpacityTime,
                        easing: "linear"
                    });
                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);

                if (Authenticity) {
                    const Judge = ms => new Promise(func => setTimeout(func, ms));
                    async function Judgement() {

                        const DRAG_SE = new Audio("SE/Drag.mp3");

                        let Keydown_Event = true;

                        await Judge(LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY);

                        /**
                         * ドラッグノーツのPERFECTまでに指定のキーが押されたか(AutoModeの場合はtrue)
                         */
                        let DragNoteFrag = AutoMode ? true : false;

                        const Notetype = NoteInfoList.NotetypeList.DragNote[EditNumber];

                        /**
                         * ノーツが押されているかの確認関数
                         */
                        function DragNoteKeyEvent() {
                            //ワードノーツの場合
                            if (Notetype) {

                                if (keys[Words[Notetype]] != null && !DragNoteFrag) {

                                    DragNoteFrag = true;

                                }

                            //ワードフリーノーツの場合
                            } else {

                                if (Object.keys(keys).length && !DragNoteFrag) {

                                    DragNoteFrag = true;

                                }
                            }
                        }

                        /**
                         * ドラッグノーツPERFECT判定関数
                         */
                        function DragNotePERFECTEvaluation() {
                            if (DragNoteFrag) {
                                DRAG_SE.play();
                                Evaluation("DragNote", EditNumber, JudgeScore[0], true, false);

                                clearInterval(isPushedDragNoteKey);
                                clearInterval(DragNoteEvaluationInterval);

                                ReloadScore(1);

                                Keydown_Event = false;
                                DragNoteFrag = false;
                            }
                        }

                        //EARLY、PERFRCT、LATEの間はOK判定
                        const isPushedDragNoteKey = setInterval(DragNoteKeyEvent, 0);

                        await Judge(Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);

                        //PERFECTのタイミングに判定開始
                        const DragNoteEvaluationInterval = setInterval(DragNotePERFECTEvaluation, 0);

                        await Judge(0.5 * Judge_Time.PERFECT + Judge_Time.LATE);

                        //MISSLATE(BADLATE以降はMISS判定)
                        if (Keydown_Event) {
                            Evaluation("DragNote", EditNumber, JudgeScore[5], false, false);

                            clearInterval(isPushedDragNoteKey);
                            clearInterval(DragNoteEvaluationInterval);

                            ReloadScore(5);
                        }
                    }
                    Judgement();
                }
            }, //ドラッグノーツ判定関数
            /**
             * ドラッグノーツアニメーション関数(座標移動[X])
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のドラッグノーツ番号を入力
             * @param {number} 移動前のX座標(px)
             * @param {number} 移動後のX座標(px)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            MoveX(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#DragNoteMoveX" + EditNumber,
                        translateX: [AniBefore+CenterX, AniAfter+CenterX],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ドラッグノーツアニメーション関数(座標移動[X])
            /**
             * ドラッグノーツアニメーション関数(座標移動[Y])
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のドラッグノーツ番号を入力
             * @param {number} 移動前のY座標(px)
             * @param {number} 移動後のY座標(px)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            MoveY(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#DragNoteMoveY" + EditNumber,
                        translateY: [AniBefore+CenterY, AniAfter+CenterY],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ドラッグノーツアニメーション関数(座標移動[Y])
            /**
             * ドラッグノーツアニメーション関数(角度)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のドラッグノーツ番号を入力
             * @param {number} 移動前の角度(deg)
             * @param {number} 移動後の角度(deg)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Angle(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#DragNoteAngle" + EditNumber,
                        rotate: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ドラッグノーツアニメーション関数(角度)
            /**
             * ドラッグノーツアニメーション関数(拡大率)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のドラッグノーツ番号を入力
             * @param {number} 移動前の拡大率(倍率)
             * @param {number} 移動後の拡大率(倍率)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Scale(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#DragNoteScale" + EditNumber,
                        scale: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ドラッグノーツアニメーション関数(拡大率)
            /**
             * ドラッグノーツアニメーション関数(透明度)
             * @see https://easings.net/#  ←イージングの詳しい情報はこちら
             * @param {number} 対象のドラッグノーツ番号を入力
             * @param {number} 移動前の透明度(0～1)
             * @param {number} 移動後の透明度(0～1)
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {string} イージングを指定
             * @param {string} 移動のオプションを指定 'normal' or 'alternate' or 'reverse'
             * @param {*} ループさせる回数を指定 ※一度もループさせない場合はfalse、何度もループさせる場合はtrue
             */
            Opacity(EditNumber, AniBefore, AniAfter, Duration, Delay, Easing, Direction, Loop) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                setTimeout(function() {

                    AniBefore = ConvertCurrentValue(AniBefore);
                    AniAfter = ConvertCurrentValue(AniAfter);

                    anime({
                        targets: "#DragNoteOpacity" + EditNumber,
                        opacity: [AniBefore, AniAfter],
                        duration: Duration,
                        easing: Easing,
                        direction: Direction,
                        loop: Loop
                    });

                }, LoadDelayTime + Delay + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
            }, //ドラッグノーツアニメーション関数(透明度)
            /**
             * 通常ドラッグノーツ関数 ドラッグノーツを等速で移動・判定させます(X座標は固定)
             * @param {number} 対象のドラッグノーツ番号を入力
             * @param {number} 移動までに掛かる時間(ms) ※MeasureTime([拍数])
             * @param {number} 移動が始まるまでの時間(ms) ※MeasureTime([拍数]) 
             * @param {number} 配置するX座標を指定
             * @param {number} 移動前のY座標(px)
             * @param {number} 移動後のY座標(px)
             */
            Typically(EditNumber, Duration, Delay, X, YBefore, YAfter) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                Chart_Setting.DragNote().MoveX(EditNumber, X, X, 0, 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().MoveY(EditNumber, YBefore, YAfter, Duration, Delay, "linear", EasingType[0], false);
            } //通常ドラッグノーツ関数
        }
    }
}

function SumArray(arr, num) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] += num;
    }
    return arr;
}
/**
 * イージング連携の設定
 */
class Easing_Cooperation_Option {
    /**
     * フレーム情報関数
     */
    static Frame() {
        return {
            /**
             * フレーム連続イージング配置関数(座標移動[X])
             * @param {number} 指定開始フレーム番号
             * @param {number} 指定終了フレーム番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingMoveX(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["Frame", TargetNumber, 0, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#FrameMoveX" + TargetNumber,
                                translateX: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //フレーム連続イージング配置関数(座標移動[X])
            /**
             * フレーム連続イージング配置関数(座標移動[Y])
             * @param {number} 指定開始フレーム番号
             * @param {number} 指定終了フレーム番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingMoveY(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["Frame", TargetNumber, 1, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#FrameMoveY" + TargetNumber,
                                translateY: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //フレーム連続イージング配置関数(座標移動[Y])
            /**
             * フレーム連続イージング配置関数(角度)
             * @param {number} 指定開始フレーム番号
             * @param {number} 指定終了フレーム番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingAngle(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["Frame", TargetNumber, 2, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#FrameAngle" + TargetNumber,
                                rotate: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //フレーム連続イージング配置関数(角度)
            /**
             * フレーム連続イージング配置関数(拡大率)
             * @param {number} 指定開始フレーム番号
             * @param {number} 指定終了フレーム番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingScale(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["Frame", TargetNumber, 3, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#FrameScale" + TargetNumber,
                                scale: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //フレーム連続イージング配置関数(拡大率)
            /**
             * フレーム連続イージング配置関数(透明度)
             * @param {number} 指定開始フレーム番号
             * @param {number} 指定終了フレーム番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingOpacity(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["Frame", TargetNumber, 4, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#FrameOpacity" + TargetNumber,
                                opacity: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            } //フレーム連続イージング配置関数(透明度)
        }
    }
    /**
     * 判定枠情報関数
     */
    static JudgementFrame() {
        return {
            /**
             * 判定枠連続イージング配置関数(座標移動[X])
             * @param {number} 指定開始判定枠番号
             * @param {number} 指定終了判定枠番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingMoveX(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["JudgementFrame", TargetNumber, 0, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#JudgementFrameMoveX" + TargetNumber,
                                translateX: [InitPosition + CenterX, ResultPosition + CenterX],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //判定枠連続イージング配置関数(座標移動[X])
            /**
             * 判定枠連続イージング配置関数(座標移動[Y])
             * @param {number} 指定開始判定枠番号
             * @param {number} 指定終了判定枠番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingMoveY(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["JudgementFrame", TargetNumber, 1, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#JudgementFrameMoveY" + TargetNumber,
                                translateY: [InitPosition + CenterY, ResultPosition + CenterY],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //判定枠連続イージング配置関数(座標移動[Y])
            /**
             * 判定枠連続イージング配置関数(角度)
             * @param {number} 指定開始判定枠番号
             * @param {number} 指定終了判定枠番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingAngle(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["JudgementFrame", TargetNumber, 2, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#JudgementFrameAngle" + TargetNumber,
                                rotate: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //判定枠連続イージング配置関数(角度)
            /**
             * 判定枠連続イージング配置関数(拡大率)
             * @param {number} 指定開始判定枠番号
             * @param {number} 指定終了判定枠番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingScale(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["JudgementFrame", TargetNumber, 3, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#JudgementFrameScale" + TargetNumber,
                                scale: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //判定枠連続イージング配置関数(拡大率)
            /**
             * 判定枠連続イージング配置関数(透明度)
             * @param {number} 指定開始判定枠番号
             * @param {number} 指定終了判定枠番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingOpacity(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["JudgementFrame", TargetNumber, 4, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#JudgementFrameOpacity" + TargetNumber,
                                opacity: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            } //判定枠連続イージング配置関数(透明度)
        }
    }
    /**
     * ノーツ情報関数
     */
    static Note() {
        return {
            /**
             * ノーツ連続イージング配置関数(座標移動[X])
             * @param {number} 指定開始ノーツ番号
             * @param {number} 指定終了ノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingMoveX(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["Note", TargetNumber, 0, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#NoteMoveX" + TargetNumber,
                                translateX: [InitPosition + CenterX, ResultPosition + CenterX],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //ノーツ連続イージング配置関数(座標移動[X])
            /**
             * ノーツ連続イージング配置関数(座標移動[Y])
             * @param {number} 指定開始ノーツ番号
             * @param {number} 指定終了ノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingMoveY(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["Note", TargetNumber, 1, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#NoteMoveY" + TargetNumber,
                                translateY: [InitPosition + CenterY, ResultPosition + CenterY],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //ノーツ連続イージング配置関数(座標移動[Y])
            /**
             * ノーツ連続イージング配置関数(角度)
             * @param {number} 指定開始ノーツ番号
             * @param {number} 指定終了ノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingAngle(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["Note", TargetNumber, 2, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#NoteAngle" + TargetNumber,
                                rotate: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //ノーツ連続イージング配置関数(角度)
            /**
             * ノーツ連続イージング配置関数(拡大率)
             * @param {number} 指定開始ノーツ番号
             * @param {number} 指定終了ノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingScale(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["Note", TargetNumber, 3, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#NoteScale" + TargetNumber,
                                scale: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //ノーツ連続イージング配置関数(拡大率)
            /**
             * ノーツ連続イージング配置関数(透明度)
             * @param {number} 指定開始ノーツ番号
             * @param {number} 指定終了ノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingOpacity(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["Note", TargetNumber, 4, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#NoteOpacity" + TargetNumber,
                                opacity: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            } //ノーツ連続イージング配置関数(透明度)
        }
    }
    /**
     * ロングノーツ情報関数
     */
    static LongNote() {
        return {
            /**
             * ロングノーツ連続イージング配置関数(座標移動[X])
             * @param {number} 指定開始ロングノーツ番号
             * @param {number} 指定終了ロングノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingMoveX(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["LongNote", TargetNumber, 0, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#LongNoteMoveX" + TargetNumber,
                                translateX: [InitPosition + CenterX, ResultPosition + CenterX],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //ロングノーツ連続イージング配置関数(座標移動[X])
            /**
             * ロングノーツ連続イージング配置関数(座標移動[Y])
             * @param {number} 指定開始ロングノーツ番号
             * @param {number} 指定終了ロングノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingMoveY(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["LongNote", TargetNumber, 1, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#LongNoteMoveY" + TargetNumber,
                                translateY: [InitPosition + CenterY, ResultPosition + CenterY],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //ロングノーツ連続イージング配置関数(座標移動[Y])
            /**
             * ロングノーツ連続イージング配置関数(角度)
             * @param {number} 指定開始ロングノーツ番号
             * @param {number} 指定終了ロングノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingAngle(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["LongNote", TargetNumber, 2, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#LongNoteAngle" + TargetNumber,
                                rotate: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //ロングノーツ連続イージング配置関数(角度)
            /**
             * ロングノーツ連続イージング配置関数(拡大率)
             * @param {number} 指定開始ロングノーツ番号
             * @param {number} 指定終了ロングノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingScale(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["LongNote", TargetNumber, 3, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#LongNoteScale" + TargetNumber,
                                scale: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //ロングノーツ連続イージング配置関数(拡大率)
            /**
             * ロングノーツ連続イージング配置関数(透明度)
             * @param {number} 指定開始ロングノーツ番号
             * @param {number} 指定終了ロングノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingOpacity(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["LongNote", TargetNumber, 4, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#LongNoteOpacity" + TargetNumber,
                                opacity: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            } //ロングノーツ連続イージング配置関数(透明度)
        }
    }
    /**
     * ドラッグノーツ情報関数
     */
    static DragNote() {
        return {
            /**
             * ドラッグノーツ連続イージング配置関数(座標移動[X])
             * @param {number} 指定開始ドラッグノーツ番号
             * @param {number} 指定終了ドラッグノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingMoveX(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["DragNote", TargetNumber, 0, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#DragNoteMoveX" + TargetNumber,
                                translateX: [InitPosition + CenterX, ResultPosition + CenterX],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //ドラッグノーツ連続イージング配置関数(座標移動[X])
            /**
             * ドラッグノーツ連続イージング配置関数(座標移動[Y])
             * @param {number} 指定開始ドラッグノーツ番号
             * @param {number} 指定終了ドラッグノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingMoveY(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["DragNote", TargetNumber, 1, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#DragNoteMoveY" + TargetNumber,
                                translateY: [InitPosition + CenterY, ResultPosition + CenterY],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //ドラッグノーツ連続イージング配置関数(座標移動[Y])
            /**
             * ドラッグノーツ連続イージング配置関数(角度)
             * @param {number} 指定開始ドラッグノーツ番号
             * @param {number} 指定終了ドラッグノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingAngle(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["DragNote", TargetNumber, 2, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#DragNoteAngle" + TargetNumber,
                                rotate: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //ドラッグノーツ連続イージング配置関数(角度)
            /**
             * ドラッグノーツ連続イージング配置関数(拡大率)
             * @param {number} 指定開始ドラッグノーツ番号
             * @param {number} 指定終了ドラッグノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingScale(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["DragNote", TargetNumber, 3, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#DragNoteScale" + TargetNumber,
                                scale: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            }, //ドラッグノーツ連続イージング配置関数(拡大率)
            /**
             * ドラッグノーツ連続イージング配置関数(透明度)
             * @param {number} 指定開始ドラッグノーツ番号
             * @param {number} 指定終了ドラッグノーツ番号
             * @param {number} 指定のイージングの開始地点
             * @param {number} 指定のイージングの終了地点
             * @param {number} アニメーションに掛かる時間
             * @param {number} アニメーションに掛かる遅延
             * @param {number} それぞれの開始に掛かる時間
             * @param {number} それぞれの開始に掛かる遅延
             * @param {number} 移動のイージング関数の定義
             * @param {number} 形状のイージング関数の定義
             * @param {number} スキップする配列番号の定義
             */
            EasingOpacity(StartEditNumber, EndEditNumber, StartPosition, EndPosition, Duration, Gap, Delay, DelayGap, Easing, PositionFunction, SkipNumber) {
                //読み込みの場合は実行しない
                if (isChartLoad) return;

                let TempSkipNumber = 0;
                SkipNumber = SumArray(SkipNumber, StartEditNumber);

                for (let TempEditNumber = StartEditNumber; TempEditNumber != EndEditNumber + SkipNumber.length + 1; TempEditNumber++) {
                    if (SkipNumber.indexOf(TempEditNumber) == -1) {
                        setTimeout(function() {

                            const TargetNumber = TempEditNumber - TempSkipNumber;
                            const TempStartPosition = ConvertCurrentValue(StartPosition);
                            const TempEndPosition = ConvertCurrentValue(EndPosition);
                            const InitPosition = ConvertCurrentValue(["DragNote", TargetNumber, 4, 0]);
                            const ResultPosition = TempStartPosition + (TempEndPosition - TempStartPosition) * PositionFunction((TempEditNumber - StartEditNumber) / (EndEditNumber + SkipNumber.length - StartEditNumber));
        
                            anime({
                                targets: "#DragNoteOpacity" + TargetNumber,
                                opacity: [InitPosition, ResultPosition],
                                duration: Duration + Gap * (TempEditNumber - StartEditNumber),
                                easing: Easing,
                                direction: EasingType[0]
                            });
        
                        }, LoadDelayTime + Delay + DelayGap * (TempEditNumber - StartEditNumber) + Judge_Time.MISSEARLY + Judge_Time.BADEARLY + Judge_Time.EARLY + 0.5 * Judge_Time.PERFECT);
                    } else {
                        TempSkipNumber++;
                    }
                }
            } //ドラッグノーツ連続イージング配置関数(透明度)
        }
    }
}

//新規に曲を追加したい場合、新しいJavascriptファイル(曲名.js)をChartJavascriptフォルダ内に作成し、以下のプログラムをコピペしてください(手動)
/*

//以下は、それぞれの譜面情報関数の説明です

//Chart_Setting  フレームや判定枠、ノーツ等を追加したり、単体で移動させたいときに使います
//Current_Value　フレームや判定枠、ノーツ等の現在の情報を取得します(X座標、Y座標、角度、拡大率、透明度)
//Easing_Cooperation_Option　複数のフレームや判定枠、ノーツ等をそれぞれ特定のイージング関数の値で配置します
//BPMset　BPMを変更します

//推奨X座標範囲[-440 < 0(中心) < 440]・推奨Y座標範囲[-250 < 0(中心) < 250] (拡大率が1の場合)
//判定枠やフレーム、判定のないノーツ等は曲が終了すると全て削除されるため、邪魔なとき以外は削除しなくても問題はない

ChartSetup("rgb([色(手動)])");

//譜面
function ChartInfo() {
    switch (OtherData.SetDifficulty) {
    case 0:
        break;
    case 1:
        break;
    case 2:
        break;
    case 3:
        switch (Past) {
        case 0:

            BPMset(177, 0);
            PlayMusic(ChartMusic[Music]); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる
            Chart_Setting.Frame().Add(0, 0);
            Chart_Setting.Note().Add(1, 0, 0, 0);

            break;
        case 1:

            Chart_Setting.JudgementFrame().Add(0, 0);

            Chart_Setting.Note().MoveY(1, -500, 0, MeasureTime(3), 0, "linear", EasingType[0], false);


            break;
        case 4:

            Chart_Setting.Note().Eva(1, true, 0);
            Chart_Setting.JudgementFrame().Add(1, 0);
            Chart_Setting.JudgementFrame().MoveX(2, 0, 400, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Add(1, 0, 0, 0);
            Chart_Setting.LongNote().Typically(2, MeasureTime(4), 0, MeasureTime(8), 0, -350, 0);

            break;

        case 8:

            Chart_Setting.LongNote().Eva(2, true, MeasureTime(8), 0);

            break;
        case 50:

            break;
        case 88:

            break;
        case 100:

            BPMset(354, 0);

            break;
        case 156:

            isChartLoad = false;
            break;
        }
        break;
    }
    if (NowRhythm > Time) { //テストプレイ時は　Past == [曲の終了拍番号(手動)]
        ChartInit(ChartMusic[Music]);
        clearInterval(ChartMode);
        PastFrag = false;
    }
}

ChartMode = setInterval(PastTime, 0);
*/