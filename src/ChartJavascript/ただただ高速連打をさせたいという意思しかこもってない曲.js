//Chart_Setting  フレームや判定枠、ノーツ等を追加したり、単体で移動させたいときに使います
//Current_Value　フレームや判定枠、ノーツ等の現在の情報を取得します(X座標、Y座標、角度、拡大率、透明度)
//Easing_Cooperation_Option　複数のフレームや判定枠、ノーツ等をそれぞれ特定のイージング関数の値で配置します
//BPMset　BPMを変更します

//推奨X座標範囲[-440 < 0(中心) < 440]・推奨Y座標範囲[-250 < 0(中心) < 250]
//判定枠とフレームは曲が終了すると全て削除されるため、邪魔なとき以外は削除しなくても問題はない

ChartSetup("rgb(180, 214, 40)");

//譜面
function ChartInfo() {
    const FramePositions = [
        4, 2, 3, 2,
        4, 2, 4, 2,
        4, 3, 5, 3,
        4, 6, 5, 6,
        4, 5, 4, 5,
        3, 5, 2, 4,
        3, 4, 2, 3,
        2, 4, 3, 5,
        3, 4, 3, 4,
        2, 4, 3, 5,
        3, 5, 4, 6,
        3, 4, 3, 5,
        4, 6, 5, 6,
        2, 4, 3, 4,
        3, 4, 4, 5,
        4, 5, 5, 6,
    
        5, 3, 5, 3,
        5, 3, 4, 2,
        4, 2, 4, 2,
        4, 2, 5, 3,
        6, 4, 6, 4,
        6, 4, 5, 3,
        5, 3, 5, 3,
        6, 2, 6, 2,
        6, 3, 6, 3,
        5, 2, 5, 2,
        5, 3, 5, 3,
        6, 4, 6, 5,
        6, 4, 3, 2,
        6, 5, 4, 3,
        2, 3, 4, 5,
        4, 5, 6, 5,
    
        7, 3, 5, 3,
        7, 3, 4, 3,
        6, 3, 7, 3,
        6, 3, 5, 3,
        5, 2, 7, 3,
        5, 4, 7, 2,
        3, 5, 2, 4,
        3, 4, 2, 4,
        3, 5, 4, 6,
        2, 6, 5, 7,
        2, 6, 5, 7,
        2, 3, 3, 4,
        3, 4, 4, 5,
        4, 5, 5, 6,
        5, 6, 6, 7,
    
        5, 2, 4, 3,
        6, 7, 5, 7,
        4, 6, 3, 4,
        2, 7, 4, 7,
        3, 6, 3, 7,
        2, 6, 3, 5,
        4, 7, 3, 7,
        2, 6, 2, 5,
        3, 5, 4, 6,
        4, 6, 4, 5,
        3, 7, 2, 7,
        4, 6, 3, 5,
        3, 7, 4, 6,
        5, 7, 4, 5,
        3, 5, 4, 6,
        2, 5, 3, 5,
    
        6, 5, 4, 3,
        6, 5, 3, 2,
        5, 4, 3, 2,
        3, 4, 5, 3,
        5, 4, 3, 2,
        3, 4, 5, 4,
        7, 5, 4, 3,
        5, 4, 3, 2,
        7, 6, 4, 3,
        6, 4, 3, 2,
        3, 4, 6, 4,
        2, 3, 4, 7,
        2, 3, 5, 6,
        3, 5, 6, 7,
        5, 6, 7, 6,
        3, 5, 6, 5,
    
        7, 6, 5, 4,
        7, 6, 5, 4,
        6, 5, 4, 3,
        6, 5, 4, 5,
        2, 4, 5, 4,
        2, 4, 5, 4,
        2, 4, 5, 6,
        2, 4, 5, 7,
        6, 5, 3, 6,
        7, 5, 3, 2,
        3, 5, 2, 5,
        2, 3, 5, 6,
        7, 6, 7, 6,
        7, 6, 3, 4,
        2, 3, 4, 3,
        2, 4, 6, 7,
    
        5, 4, 3, 4,
        2, 3, 4, 5,
        3, 4, 5, 7,
        4, 5, 4, 7,
        6, 4, 3, 2,
        7, 6, 4, 3,
        2, 3, 4, 6,
        3, 4, 6, 7,
        5, 3, 2, 3,
        2, 3, 5, 6,
        3, 5, 6, 5,
        7, 6, 5, 6,
        2, 4, 5, 6,
        4, 5, 6, 7,
        6, 5, 4, 2,
        7, 6, 4, 5,
    
        7, 6, 5, 4,
        6, 5, 4, 3,
        4, 5, 6, 7,
        3, 4, 5, 6,
        7, 6, 5, 4,
        6, 5, 4, 2,
        4, 5, 6, 5,
        4, 5, 6, 7,
        6, 5, 4, 3,
        5, 4, 3, 2,
        3, 4, 5, 6,
        4, 5, 6, 7
    ];
    const NoteSpeed = 70;

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

            BPMset(185, 0);
            PlayMusic(ChartMusic[Music]); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる
            Chart_Setting.Frame().Add(0, 0);
            for (let i = 0; i != 6; i++) {
                Chart_Setting.Frame().Add(1, 0);
                Chart_Setting.Frame().Opacity(i+2, 0, 0, 0, 0, "linear", EasingType[0], false);
            }
            for (let i = 0; i != 6; i++) {
                Chart_Setting.Frame().Add(i+2, 0);
                Chart_Setting.Frame().Opacity(i+8, 0, 0, 0, 0, "linear", EasingType[0], false);
            }
            Chart_Setting.Note().Add(1, 0, 0, 0);
            Chart_Setting.LongNote().Add(1, 0, 0, 0);
            Chart_Setting.DragNote().Add(1, 0, 0, 0);
            Chart_Setting.JudgementFrame().Add(1, 0);
            for (let i = 0; i != 6; i++) Chart_Setting.JudgementFrame().Add(i+2, 0);

            Chart_Setting.Note().MoveX(1, -800, 800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Angle(1, -130, -80, MeasureTime(1), 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().MoveX(2, -800, -800, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(2, -90, -90, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.DragNote().MoveX(1, -800, -800, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().Angle(1, -90, -90, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.JudgementFrame().MoveX(1, -800, -800, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().Angle(1, -90, -90, 0, 0, "linear", EasingType[0], false);

            break;
        case 1:

            Chart_Setting.LongNote().MoveX(2, -800, 800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(2, -75, -120, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 2:

            Chart_Setting.DragNote().MoveX(1, -800, 800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().Angle(1, -75, -120, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 3:

            Chart_Setting.Note().MoveX(1, -800, 800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Angle(1, -130, -80, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 4:

            Chart_Setting.LongNote().MoveX(2, -800, 800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(2, -75, -120, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 5:

            Chart_Setting.DragNote().MoveX(1, -800, 800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().Angle(1, -75, -120, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 6:

            Chart_Setting.JudgementFrame().MoveX(1, -800, 0, MeasureTime(1), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.JudgementFrame().Angle(1, -105, -90, MeasureTime(1), 0, "easeOutSine", EasingType[0], false);

            Chart_Setting.DragNote().MoveX(1, -800, 0, MeasureTime(0.5), MeasureTime(0.5), "linear", EasingType[0], false);
            Chart_Setting.DragNote().Angle(1, -75, -90, MeasureTime(0.5), MeasureTime(0.5), "linear", EasingType[0], false);
            Chart_Setting.DragNote().Eva(1, true, MeasureTime(1));

            break;
        case 7:

            Chart_Setting.JudgementFrame().MoveX(1, ["JudgementFrame", 1, 0, 0], 200, MeasureTime(3), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveY(1, ["JudgementFrame", 1, 1, 0], ["JudgementFrame", 1, 1, 400], MeasureTime(3), 0, function() {
                return function(dt) {
                    return -dt + 2 * dt ** 2;
                }
            }, EasingType[0], false);
            Chart_Setting.JudgementFrame().Angle(1, ["JudgementFrame", 1, 2, 0], ["JudgementFrame", 1, 2, 444], MeasureTime(3), 0, "easeOutSine", EasingType[0], false);

            break;
        case 8:

            Chart_Setting.Note().MoveX(1, -800, 800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Angle(1, -130, -80, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 9:

            Chart_Setting.LongNote().MoveX(2, -800, 800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(2, -75, -120, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 10:

            Chart_Setting.Note().MoveX(1, -800, 800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Angle(1, -130, -80, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 11:

            Chart_Setting.LongNote().MoveX(2, -800, 800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(2, -75, -120, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 12:

            Chart_Setting.Note().MoveX(1, -800, 800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Angle(1, -130, -80, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 13:

            Chart_Setting.LongNote().MoveX(2, -800, 800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(2, -75, -120, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 14:

            Chart_Setting.JudgementFrame().MoveX(1, -800, 0, MeasureTime(1), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveY(1, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().Angle(1, -105, -90, MeasureTime(1), 0, "easeOutSine", EasingType[0], false);

            Chart_Setting.LongNote().MoveX(2, -800, 0, MeasureTime(0.5), MeasureTime(0.5), "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(2, -75, -90, MeasureTime(0.5), MeasureTime(0.5), "linear", EasingType[0], false);
            Chart_Setting.LongNote().Eva(2, true, MeasureTime(1), MeasureTime(1));
            Chart_Setting.LongNote().Length(2, ["LongNote", 2, 5, 0], 0, MeasureTime(1), MeasureTime(1), function() {
                return function(dt) {
                    return -3 * dt + 2 * dt ** 2 + 2 * dt ** 4;
                }
            }, EasingType[0], false);

            break;
        case 15:

            Chart_Setting.LongNote().MoveX(2, 0, -80, MeasureTime(1), 0, function() {
                return function(dt) {
                    return -3 * dt + 2 * dt ** 2 + 2 * dt ** 4;
                }
            }, EasingType[0], false);

            Chart_Setting.JudgementFrame().MoveX(1, 0, -80, MeasureTime(1), 0, function() {
                return function(dt) {
                    return -3 * dt + 2 * dt ** 2 + 2 * dt ** 4;
                }
            }, EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveX(1, ["JudgementFrame", 1, 0, 0], ["JudgementFrame", 1, 0, -600], MeasureTime(1), MeasureTime(1), "easeOutSine", EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveY(1, 0, 320, MeasureTime(1), MeasureTime(1), "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().Angle(1, -90, 0, MeasureTime(1), MeasureTime(1), "easeOutSine", EasingType[0], false);

            break;
        case 17:

            Chart_Setting.Note().MoveX(1, 800, -800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Angle(1, 130, 80, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 18:

            Chart_Setting.JudgementFrame().MoveX(1, 800, -800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveY(1, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().Angle(1, 70, 100, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 19:

            Chart_Setting.Note().MoveX(1, 800, -800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Angle(1, 130, 80, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 20:

            Chart_Setting.JudgementFrame().MoveX(1, 800, -800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().Angle(1, 70, 100, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 21:

            Chart_Setting.Note().MoveX(1, 800, -800, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Angle(1, 130, 80, MeasureTime(1), 0, "linear", EasingType[0], false);

            break;
        case 22:

            Chart_Setting.JudgementFrame().MoveX(1, 800, 0, MeasureTime(1), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.JudgementFrame().Angle(1, 105, 90, MeasureTime(1), 0, "easeOutSine", EasingType[0], false);

            Chart_Setting.Note().MoveX(1, 800, 0, MeasureTime(0.5), MeasureTime(0.5), "linear", EasingType[0], false);
            Chart_Setting.Note().Angle(1, 75, 90, MeasureTime(0.5), MeasureTime(0.5), "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(1, true, MeasureTime(1));

            break;
        case 23:

            Chart_Setting.JudgementFrame().MoveX(1, ["JudgementFrame", 1, 0, 0], -200, MeasureTime(3), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveY(1, ["JudgementFrame", 1, 1, 0], ["JudgementFrame", 1, 1, 400], MeasureTime(3), 0, function() {
                return function(dt) {
                    return -dt + 2 * dt ** 2;
                }
            }, EasingType[0], false);
            Chart_Setting.JudgementFrame().Angle(1, ["JudgementFrame", 1, 2, 0], ["JudgementFrame", 1, 2, -444], MeasureTime(3), 0, "easeOutSine", EasingType[0], false);

            Chart_Setting.LongNote().Add(0, 6, 6, 0);
            Chart_Setting.LongNote().Length(3, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Length(3, 0, 1000, MeasureTime(6), MeasureTime(4), "easeInOutSine", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(3, -500, 80, MeasureTime(2), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(3, 80, -60, MeasureTime(5), MeasureTime(2), "easeInOutSine", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(3, -60, 0, MeasureTime(2), MeasureTime(7), "easeInSine", EasingType[0], false);
            Chart_Setting.LongNote().Angle(3, 0, 400, MeasureTime(5), MeasureTime(2), "easeInOutSine", EasingType[0], false);
            Chart_Setting.LongNote().Angle(3, 40, 0, MeasureTime(2), MeasureTime(7), "easeInSine", EasingType[0], false);

            const DragList = [
                [-300, 20],
                [200, 100],
                [-470, -80],
                [-200, 0],
                [475, 20],
                [120, 200],
                [-390, 85],
                [0, 160],
                [40, -100],
                [-10, 260],
                [-50, -180],
                [490, 75],
                [-450, 0],
                [195, -200],
                [-290, 185],
                [90, -160],
            ];
            for (let i = 0; i != 16; i++) {
                Chart_Setting.DragNote().Add(0, 0, 0, 0);
                Chart_Setting.DragNote().Angle(i+2, 90, 90, 0, 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().MoveX(i+2, DragList[i][0], DragList[i][0], 0, 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().MoveY(i+2, -400,-400, 0, 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().MoveY(i+2, DragList[i][1] - 400, DragList[i][1], MeasureTime(2), MeasureTime(0.4 * i), "easeOutSine", EasingType[0], false);
                Chart_Setting.DragNote().Scale(i+2, 0.5, 0.5, 0, 0, "linear", EasingType[0], false);
            }

            break;
        case 28:

            for (let i = 0; i != 57; i++) {
                Chart_Setting.Note().Add(FramePositions[56-i], 0, 0, 0);
                Chart_Setting.Note().Opacity(i+4, 0, 0, 0, 0, "linear", EasingType[0], false);
            }

            Chart_Setting.JudgementFrame().MoveX(1, -800, 0, MeasureTime(4), 0, "easeInOutCubic", EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveY(1, 230, 0, MeasureTime(4), 0, "easeInCubic", EasingType[0], false);
            Chart_Setting.JudgementFrame().Angle(1, 0, 0, 0, 0, "linear", EasingType[0], false);

            break;
        case 32:

            Chart_Setting.JudgementFrame().Opacity(1, 0, 0, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Eva(3, true, 0, 0);
            Chart_Setting.LongNote().Opacity(3, 0, 0, 0, 0, "linear", EasingType[0], false);

            for (let i = 0; i != 16; i++) Chart_Setting.DragNote().Eva(i+2, true, 0);

            for (let i = 0; i != 5; i++) {
                Chart_Setting.Frame().Opacity(i+2, 1, 1, 0, 0, "linear", EasingType[0], false);
                Chart_Setting.Frame().MoveY(i+2, 0, 240, MeasureTime(6), 0, "easeOutSine", EasingType[0], false);
            }
            Easing_Cooperation_Option.Frame().EasingMoveX(2, 6, -320, 320, MeasureTime(6), 0, 0, 0, "easeOutSine", function(dt) {return dt;}, []);
        
            Chart_Setting.Frame().Scale(1, 0.2, 0.8, MeasureTime(4), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.Frame().Scale(1, ["Frame", 1, 3, 0], 0.65, MeasureTime(10), MeasureTime(4), "easeInOutSine", EasingType[0], false);

            Chart_Setting.Frame().Angle(2, 0, -10, MeasureTime(3), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.Frame().Angle(2, ["Frame", 2, 2, 0], 3, MeasureTime(7), MeasureTime(3), "easeInOutSine", EasingType[0], false);
            Chart_Setting.Frame().Angle(2, ["Frame", 2, 2, 0], 0, MeasureTime(5), MeasureTime(10), "easeInOutSine", EasingType[0], false);

            Chart_Setting.Frame().Angle(3, 0, -5, MeasureTime(7), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.Frame().Angle(3, ["Frame", 3, 2, 0], 8, MeasureTime(6), MeasureTime(7), "easeInOutSine", EasingType[0], false);
            Chart_Setting.Frame().Angle(3, ["Frame", 3, 2, 0], 0, MeasureTime(2), MeasureTime(13), "easeInOutSine", EasingType[0], false);

            Chart_Setting.Frame().Angle(4, 0, 4, MeasureTime(6), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.Frame().Angle(4, ["Frame", 4, 2, 0], -6, MeasureTime(6), MeasureTime(6), "easeInOutSine", EasingType[0], false);
            Chart_Setting.Frame().Angle(4, ["Frame", 4, 2, 0], 0, MeasureTime(3), MeasureTime(12), "easeInOutSine", EasingType[0], false);

            Chart_Setting.Frame().Angle(5, 0, -7, MeasureTime(7), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.Frame().Angle(5, ["Frame", 5, 2, 0], 7, MeasureTime(6), MeasureTime(7), "easeInOutSine", EasingType[0], false);
            Chart_Setting.Frame().Angle(5, ["Frame", 5, 2, 0], 0, MeasureTime(2), MeasureTime(13), "easeInOutSine", EasingType[0], false);

            Chart_Setting.Frame().Angle(6, 0, 9, MeasureTime(5), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.Frame().Angle(6, ["Frame", 6, 2, 0], -8, MeasureTime(6), MeasureTime(5), "easeInOutSine", EasingType[0], false);
            Chart_Setting.Frame().Angle(6, ["Frame", 6, 2, 0], 0, MeasureTime(5), MeasureTime(11), "easeInOutSine", EasingType[0], false);

            Easing_Cooperation_Option.Note().EasingMoveY(4, 60, 0, NoteSpeed * 57 - NoteSpeed * 4, 0, 0, 0, 0, "linear", function(dt) {return dt;}, []);
            Easing_Cooperation_Option.Note().EasingOpacity(4, 60, 1, 1, 0, 0, 0, MeasureTime(1/4), "linear", function(dt) {return dt;}, []);
            for (let i = 0; i != 57; i++) {
                Chart_Setting.Note().MoveY(60-i, ["Note", 60-i, 1, 0], ["Note", 60-i, 1, -NoteSpeed * 57], MeasureTime(15), 0, "linear", EasingType[0], false);
                Chart_Setting.Note().MoveY(i+4, ["Note", i+4, 1, 0], ["Note", i+4, 1, -(NoteSpeed / 2) * 4], MeasureTime(2), MeasureTime(14), function() {
                    return function(dt) {
                        return Math.sin(Math.PI * dt);
                    }
                }, EasingType[0], false);
            }

            break;
        case 46:

            Chart_Setting.Frame().Scale(1, ["Frame", 1, 3, 0], 1, MeasureTime(1), 0, "easeInSine", EasingType[0], false);
            Chart_Setting.Frame().MoveX(1, -100, 100, MeasureTime(0.8), MeasureTime(1), function() {
                return function(dt) {
                    return (1/2) * (-dt + 1) * Math.sin(4 * Math.PI * dt) + 1/2;
                }
            }, EasingType[0], false);

            break;
        case 48:

            for (let i = 0; i != 57; i++) {
                Chart_Setting.Note().Eva(60-i, true, MeasureTime((1/4) * i));
                Chart_Setting.Note().MoveY(60-i, ["Note", 60-i, 1, 0], 0, MeasureTime((1/4) * i), 0, "linear", EasingType[0], false);
            }

            for (let i = 0; i != 71; i++) {
                Chart_Setting.Note().Add(FramePositions[i+57], 0, 0, 0);
                Chart_Setting.Note().Eva(i+58+3, true, MeasureTime((1/4) * (i+57)));
                Chart_Setting.Note().MoveY(i+58+3, -NoteSpeed * (i+57), 0, MeasureTime((1/4) * (i+57)), 0, "linear", EasingType[0], false);
            }

            Chart_Setting.LongNote().Add(0, 0, 0, 0);
            Chart_Setting.LongNote().Eva(132, true, 0, MeasureTime((1/4) * 128));
            Chart_Setting.LongNote().MoveY(132, ["Frame", 4, 1, -NoteSpeed * 128], ["Frame", 4, 1, 0], MeasureTime((1/4) * 128), 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Length(132, 1000, 1000, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Opacity(132, 0, 0, 0, MeasureTime((1/4) * 128), "linear", EasingType[0], false);

            break;
        case 76:

            for (let i = 0; i != 91; i++) {
                Chart_Setting.Note().Add(FramePositions[i+128] + 6, 0, 0, 0);
            }
            Easing_Cooperation_Option.Note().EasingMoveY(133, 223, 0, -NoteSpeed * 91, 0, 0, 0, 0, "linear", function(dt) {return dt;}, []);

            break;
        case 77:

            for (let i = 0; i != 91; i++) {
                Chart_Setting.Note().Add(FramePositions[i+219] + 6, 0, 0, 0);
            }
            Easing_Cooperation_Option.Note().EasingMoveY(224, 314, -NoteSpeed * 92, -NoteSpeed * 182, 0, 0, 0, 0, "linear", function(dt) {return dt;}, []);

            break;
        case 78:

            for (let i = 0; i != 91; i++) {
                Chart_Setting.Note().Add(FramePositions[i+310] + 6, 0, 0, 0);
            }
            Easing_Cooperation_Option.Note().EasingMoveY(315, 405, -NoteSpeed * 183, -NoteSpeed * 273, 0, 0, 0, 0, "linear", function(dt) {return dt;}, []);

            break;
        case 79:

            for (let i = 0; i != 91; i++) {
                Chart_Setting.Note().Add(FramePositions[i+401] + 6, 0, 0, 0);
            }
            Easing_Cooperation_Option.Note().EasingMoveY(405, 496, -NoteSpeed * 274, -NoteSpeed * 364, 0, 0, 0, 0, "linear", function(dt) {return dt;}, []);

            break;
        case 80:

            Chart_Setting.Frame().MoveY(7, ["Frame", 4, 1, 0], ["Frame", 4, 1, 0], 0, 0, "linear", EasingType[0], false);
            Easing_Cooperation_Option.Frame().EasingMoveX(2, 7, -360, 360, 0, 0, 0, 0, "linear", function(dt) {return dt;}, []);
            Chart_Setting.Frame().Opacity(7, 1, 1, 0, 0, "linear", EasingType[0], false);

            for (let i = 0; i != 6; i++) {
                Chart_Setting.Frame().MoveY(i+8, -100, 0, MeasureTime(1), 0, "linear", EasingType[0], false);
                Chart_Setting.Frame().Opacity(i+8, 1, 1, 0, 0, "linear", EasingType[0], false);
            }

            Chart_Setting.Frame().MoveX(1, -100, 100, MeasureTime(0.8), 0, function() {
                return function(dt) {
                    return (1/2) * (-dt + 1) * Math.sin(4 * Math.PI * dt) + 1/2;
                }
            }, EasingType[0], false);

            break;
        case 81:

            for (let i = 0; i != 60; i++) {
                Chart_Setting.Note().MoveY(i+130+3, -NoteSpeed * i, 0, MeasureTime((1/4) * i), 0, "linear", EasingType[0], false);
                Chart_Setting.Note().Eva(i+130+3, true, MeasureTime((1/4) * i));
            }

            break;
        case 92:

            for (let i = 0; i != 64; i++) {
                Chart_Setting.Note().MoveY(i+190+3, -NoteSpeed * (i + 16), 0, MeasureTime(4 + (1/4) * i), 0, "linear", EasingType[0], false);
                Chart_Setting.Note().Eva(i+190+3, true, MeasureTime(4 + (1/4) * i));
            }

            break;
        case 104:

            Chart_Setting.Frame().MoveX(1, -40, 40, MeasureTime(0.8), MeasureTime(0.5), function() {
                return function(dt) {
                    return (1/2) * (-dt + 1) * Math.sin(4 * Math.PI * dt) + 1/2;
                }
            }, EasingType[0], false);

            break;
        case 106:

            Chart_Setting.Frame().MoveX(1, -40, 40, MeasureTime(0.8), 0, function() {
                return function(dt) {
                    return (1/2) * (-dt + 1) * Math.sin(4 * Math.PI * dt) + 1/2;
                }
            }, EasingType[0], false);

            break;
        case 108:

            Chart_Setting.Frame().MoveX(1, -40, 40, MeasureTime(0.8), 0, function() {
                return function(dt) {
                    return (1/2) * (-dt + 1) * Math.sin(4 * Math.PI * dt) + 1/2;
                }
            }, EasingType[0], false);

            for (let i = 0; i != 64; i++) {
                Chart_Setting.Note().MoveY(i+254+3, -NoteSpeed * (i + 16), 0, MeasureTime(4 + (1/4) * i), 0, "linear", EasingType[0], false);
                Chart_Setting.Note().Eva(i+254+3, true, MeasureTime(4 + (1/4) * i));
            }

            Chart_Setting.LongNote().Add(7, 1, 1, 0);
            Chart_Setting.LongNote().Typically(497, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(497, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 109:

            Chart_Setting.Frame().MoveX(1, -40, 40, MeasureTime(0.8), MeasureTime(0.5), function() {
                return function(dt) {
                    return (1/2) * (-dt + 1) * Math.sin(4 * Math.PI * dt) + 1/2;
                }
            }, EasingType[0], false);

            break;
        case 110:

            Chart_Setting.Frame().MoveX(1, -40, 40, MeasureTime(0.8), MeasureTime(0.5), function() {
                return function(dt) {
                    return (1/2) * (-dt + 1) * Math.sin(4 * Math.PI * dt) + 1/2;
                }
            }, EasingType[0], false);

            break;
        case 111:

            Chart_Setting.Frame().MoveX(1, -40, 40, MeasureTime(0.8), MeasureTime(0.5), function() {
                return function(dt) {
                    return (1/2) * (-dt + 1) * Math.sin(4 * Math.PI * dt) + 1/2;
                }
            }, EasingType[0], false);

            break;
        case 112:

            Chart_Setting.LongNote().Add(6, 15, 15, 0);
            Chart_Setting.LongNote().Typically(498, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(498, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 116:

            Chart_Setting.LongNote().Add(5, 5, 5, 0);
            Chart_Setting.LongNote().Typically(499, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(499, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 120:

            Chart_Setting.LongNote().Add(4, 2, 2, 0);
            Chart_Setting.LongNote().Typically(500, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(500, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 124:

            for (let i = 0; i != 64; i++) {
                Chart_Setting.Note().MoveY(i+318+3, -NoteSpeed * (i + 16), 0, MeasureTime(4 + (1/4) * i), 0, "linear", EasingType[0], false);
                Chart_Setting.Note().Eva(i+318+3, true, MeasureTime(4 + (1/4) * i));
            }

            Chart_Setting.LongNote().Add(2, 8, 8, 0);
            Chart_Setting.LongNote().Typically(501, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(501, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 128:

            Chart_Setting.LongNote().Add(3, 16, 16, 0);
            Chart_Setting.LongNote().Typically(502, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(502, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 132:

            Chart_Setting.LongNote().Add(4, 22, 22, 0);
            Chart_Setting.LongNote().Typically(503, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(503, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 136:

            Chart_Setting.LongNote().Add(5, 18, 18, 0);
            Chart_Setting.LongNote().Typically(504, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(504, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 140:

            for (let i = 0; i != 64; i++) {
                Chart_Setting.Note().MoveY(i+382+3, -NoteSpeed * (i + 16), 0, MeasureTime(4 + (1/4) * i), 0, "linear", EasingType[0], false);
                Chart_Setting.Note().Eva(i+382+3, true, MeasureTime(4 + (1/4) * i));
            }

            Chart_Setting.LongNote().Add(6, 15, 15, 0);
            Chart_Setting.LongNote().Typically(505, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(505, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 144:

            Chart_Setting.LongNote().Add(5, 2, 2, 0);
            Chart_Setting.LongNote().Typically(506, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(506, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 148:

            Chart_Setting.LongNote().Add(4, 9, 9, 0);
            Chart_Setting.LongNote().Typically(507, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(507, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 152:

            Chart_Setting.LongNote().Add(3, 26, 26, 0);
            Chart_Setting.LongNote().Typically(508, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(508, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 156:

            for (let i = 0; i != 48; i++) {
                Chart_Setting.Note().MoveY(i+446+3, -NoteSpeed * (i + 16), 0, MeasureTime(4 + (1/4) * i), 0, "linear", EasingType[0], false);
                Chart_Setting.Note().Eva(i+446+3, true, MeasureTime(4 + (1/4) * i));
            }

            Chart_Setting.LongNote().Add(2, 19, 19, 0);
            Chart_Setting.LongNote().Typically(509, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(509, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 160:

            Chart_Setting.LongNote().Add(3, 4, 4, 0);
            Chart_Setting.LongNote().Typically(510, MeasureTime(4), 0, MeasureTime(3.5), 0, -NoteSpeed * 16, 0);
            Chart_Setting.LongNote().Eva(510, true, MeasureTime(3.5), MeasureTime(4));

            break;
        case 168:

            for (let i = 0; i != 33; i++) {
                Chart_Setting.Note().Add(4 + i % 2, 0, 0, 0);
                Chart_Setting.Note().MoveY(i+511, -NoteSpeed * ((i/2) + 16), 0, MeasureTime(4 + (1/8) * i), 0, "linear", EasingType[0], false);
                Chart_Setting.Note().Eva(i+511, true, MeasureTime(4 + (1/8) * i));
            }

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