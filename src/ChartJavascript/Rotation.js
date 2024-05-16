//Chart_Setting  フレームや判定枠、ノーツ等を追加したり、単体で移動させたいときに使います
//Current_Value　フレームや判定枠、ノーツ等の現在の情報を取得します(X座標、Y座標、角度、拡大率、透明度)
//Easing_Cooperation_Option　複数のフレームや判定枠、ノーツ等をそれぞれ特定のイージング関数の値で配置します
//BPMset　BPMを変更します

//推奨X座標範囲[-440 < 0(中心) < 440]・推奨Y座標範囲[-250 < 0(中心) < 250] (拡大率が1の場合)
//判定枠やフレーム、判定のないノーツ等は曲が終了すると全て削除されるため、邪魔なとき以外は削除しなくても問題はない

ChartSetup("rgb([色(手動)])");

//譜面
function ChartInfo() {
    function Rotation(fn, x, y, ab, aa, t, func) {
        Chart_Setting.Frame().MoveX(fn, x, x, 0, 0, "linear", EasingType[0], false);
        Chart_Setting.Frame().MoveY(fn, y, y, 0, 0, "linear", EasingType[0], false);
        Chart_Setting.Frame().Angle(fn, ab, aa, t, 0, function() {
            return func;
        }, EasingType[0], false);
        Chart_Setting.Frame().Angle(fn+1, ab, aa, t, 0, function() {
            return func;
        }, EasingType[0], false);
    }
    function RotationLength(ln, lb, la, t, func) {
        for (let i = 0; i != 8; i++) Chart_Setting.LongNote().Length(ln+i, lb, la, t, 0, function() {
            return func;
        }, EasingType[0], false);
    }
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

            BPMset(133, 0);
            for (let i = 0; i != 8; i++) {
                if (i%2) {
                    Chart_Setting.Frame().Add(i, 0);
                    Chart_Setting.Frame().Opacity(i+1, 0.5, 0.5, 0, 0, "linear", EasingType[0], false);
                } else {
                    Chart_Setting.Frame().Add(0, 0);
                }

                for (let j = 0; j != 4; j++) {
                    Chart_Setting.LongNote().Add(i+1, 0, 0, 0);
                    Chart_Setting.LongNote().MoveX(4*i+j+1, Math.cos(Math.PI*Math.floor(i/2))*1000*Math.cos((Math.PI / 4)*j), Math.cos(Math.PI*Math.floor(i/2))*1000*Math.cos((Math.PI / 4)*j), 0, 0, "linear", EasingType[0], false);
                    Chart_Setting.LongNote().MoveY(4*i+j+1, -1000*Math.sin((Math.PI / 4)*j), -1000*Math.sin((Math.PI / 4)*j), 0, 0, "linear", EasingType[0], false);
                    Chart_Setting.LongNote().Angle(4*i+j+1, -Math.cos(Math.PI*Math.floor(i/2))*(45*j+90), -Math.cos(Math.PI*Math.floor(i/2))*(45*j+90), 0, 0, "linear", EasingType[0], false);
                    Chart_Setting.LongNote().Scale(4*i+j+1, 0.2, 0.2, 0, 0, "linear", EasingType[0], false);
                    Chart_Setting.LongNote().Length(4*i+j+1, 10000, 10000, 0, 0, "linear", EasingType[0], false);
                    Chart_Setting.LongNote().Opacity(4*i+j+1, 0.5, 0.5, 0, 0, "linear", EasingType[0], false);
                }
            }

            for (let i = 0; i != 3; i++) {
                Chart_Setting.Frame().Add(0, 0);
                Chart_Setting.JudgementFrame().Add(i+9, 0);
            }

            Chart_Setting.Frame().Opacity(1, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Frame().Opacity(3, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Frame().Opacity(5, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Frame().Opacity(7, 0, 0, 0, 0, "linear", EasingType[0], false);

            break;
        case 1:

            break;
        case 4:

            PlayMusic(ChartMusic[Music]); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる

            Chart_Setting.Frame().Opacity(1, 0, 1, MeasureTime(0.5), 0, "linear", EasingType[0], false);
            Rotation(1,370,200,0,20,MeasureTime(2),function(dt) {return Math.sin(Math.PI*dt);});
            RotationLength(1,4000,10000,MeasureTime(2),function(dt) {return Math.sin(0.5*Math.PI*(dt**0.5));});

            break;
        case 6:

            Rotation(1,370,200,0,-5*45,MeasureTime(10),function(dt) {return dt;});

            break;
        case 16:

            Rotation(1,370,200,-5*45,-7*45,MeasureTime(1),function(dt) {return dt**0.5;});

            break;
        case 17:

            Rotation(1,370,200,-7*45,-9*45,MeasureTime(1),function(dt) {return dt**0.5;});

            break;
        case 18:

            Rotation(1,370,200,-9*45,-25*45,MeasureTime(2),function(dt) {return dt;});
            Chart_Setting.Frame().Opacity(1, 1, 0, MeasureTime(1.5), 0, "linear", EasingType[0], false);

            break;
        case 20:

            Chart_Setting.Frame().Opacity(3, 0, 1, MeasureTime(0.5), 0, "linear", EasingType[0], false);
            Rotation(3,-370,200,0,-20,MeasureTime(2),function(dt) {return Math.sin(Math.PI*dt);});
            RotationLength(3,4000,10000,MeasureTime(2),function(dt) {return Math.sin(0.5*Math.PI*(dt**0.5));});

            break;
        case 22:

            Rotation(3,-370,200,0,5*45,MeasureTime(10),function(dt) {return dt;});

            break;
        case 32:

            Rotation(3,-370,200,5*45,7*45,MeasureTime(1),function(dt) {return dt**0.5;});

            break;
        case 33:

            Rotation(3,-370,200,7*45,9*45,MeasureTime(1),function(dt) {return dt**0.5;});

            break;
        case 34:

            Rotation(3,-370,200,9*45,25*45,MeasureTime(2),function(dt) {return dt;});
            Chart_Setting.Frame().Opacity(3, 1, 0, MeasureTime(1.5), 0, "linear", EasingType[0], false);

            Chart_Setting.Frame().MoveX(9, 420, 420, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Frame().MoveY(9, 300, 200, MeasureTime(2), 0, "easeOutSine", EasingType[0], false);

            Chart_Setting.LongNote().Add(9, 0, 0, 0);
            Chart_Setting.LongNote().Typically(33, MeasureTime(2), 0, MeasureTime(15), 0, -600, 0);
            Chart_Setting.LongNote().Length(33, 500, 500, 0, MeasureTime(2), "linear", EasingType[0], false);
            Chart_Setting.LongNote().Eva(33, true, MeasureTime(15), MeasureTime(2));

            break;
        case 36:

            Chart_Setting.Frame().Opacity(5, 0, 1, MeasureTime(0.5), 0, "linear", EasingType[0], false);
            Rotation(5,370,-200,0,20,MeasureTime(2),function(dt) {return Math.sin(Math.PI*dt);});
            RotationLength(5,4000,10000,MeasureTime(2),function(dt) {return Math.sin(0.5*Math.PI*(dt**0.5));});

            Chart_Setting.Frame().MoveY(9, ["Frame", 9, 1, 0], 280, MeasureTime(2), 0, "easeOutSine", EasingType[0], false);

            break;
        case 38:

            Rotation(5,370,-200,0,-5*45,MeasureTime(10),function(dt) {return dt;});

            break;
        case 48:

            Rotation(5,370,-200,-5*45,-7*45,MeasureTime(1),function(dt) {return dt**0.5;});

            break;
        case 49:

            Rotation(5,370,-200,-7*45,-9*45,MeasureTime(1),function(dt) {return dt**0.5;});

            break;
        case 50:

            Rotation(5,370,-200,-9*45,-25*45,MeasureTime(2),function(dt) {return dt;});
            Chart_Setting.Frame().Opacity(5, 1, 0, MeasureTime(1.5), 0, "linear", EasingType[0], false);

            Chart_Setting.Frame().MoveX(10, -420, -420, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Frame().MoveY(10, 300, 200, MeasureTime(2), 0, "easeOutSine", EasingType[0], false);

            Chart_Setting.LongNote().Add(10, 0, 0, 0);
            Chart_Setting.LongNote().Typically(34, MeasureTime(2), 0, MeasureTime(15), 0, -600, 0);
            Chart_Setting.LongNote().Length(34, 500, 500, 0, MeasureTime(2), "linear", EasingType[0], false);
            Chart_Setting.LongNote().Eva(34, true, MeasureTime(15), MeasureTime(2));

            break;
        case 52:

            Chart_Setting.Frame().Opacity(7, 0, 1, MeasureTime(0.5), 0, "linear", EasingType[0], false);
            Rotation(7,-370,-200,0,-20,MeasureTime(2),function(dt) {return Math.sin(Math.PI*dt);});
            RotationLength(7,4000,10000,MeasureTime(2),function(dt) {return Math.sin(0.5*Math.PI*(dt**0.5));});

            Chart_Setting.Frame().MoveY(10, ["Frame", 10, 1, 0], 280, MeasureTime(2), 0, "easeOutSine", EasingType[0], false);

            break;
        case 54:

            Rotation(7,-370,-200,0,5*45,MeasureTime(10),function(dt) {return dt;});

            break;
        case 64:

            Rotation(7,-370,-200,5*45,7*45,MeasureTime(1),function(dt) {return dt**0.5;});

            break;
        case 65:

            Rotation(7,-370,-200,7*45,9*45,MeasureTime(1),function(dt) {return dt**0.5;});

            break;
        case 66:

            Rotation(7,-370,-200,9*45,25*45,MeasureTime(2),function(dt) {return dt;});
            Chart_Setting.Frame().Opacity(7, 1, 0, MeasureTime(1.5), 0, "linear", EasingType[0], false);

            break;
        case 88:

            break;
        case 100:

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