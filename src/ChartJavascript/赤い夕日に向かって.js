ChartSetup("rgb(255,133,16)");

//譜面
function ChartInfo() {
    switch (OtherData.SetDifficulty) {
    case 0:
    //難易度0
        break;
    case 1:
    //難易度1
        break;
    case 2:
    //難易度2
        break;
    case 3:
    //難易度3
        switch (Past) {
        case 0:

            BPMset(177, 0);
            
            Chart_Setting.Frame().Add(0, 0);
            Chart_Setting.Frame().Scale(1, 50, 50, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Frame().Opacity(1, 0, 1, MeasureTime(4), 0, "linear", EasingType[0], false);
            
            Chart_Setting.JudgementFrame().Add(1, 0);
            Chart_Setting.JudgementFrame().Add(1, 0);
            Chart_Setting.JudgementFrame().Angle(2, 180, 180, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveY(1, -3, -3, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveY(2, 3, 3, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.DragNote().Add(0, 0, 0, 0);
            Chart_Setting.DragNote().Scale(1, 50, 50, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().Opacity(1, 0, 0, 0, 0, "linear", EasingType[0], false);

            break;
        case 1:

            break;
        case 4:

            PlayMusic(ChartMusic[Music]); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる

            break;

        case 8:

            break;
        case 50:

            break;
        case 68:

            Chart_Setting.Frame().Opacity(1, 1, 0, MeasureTime(32), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().Opacity(1, 0, 0.9, MeasureTime(32), MeasureTime(1), function() {
                return function(dt) {
                    return -16 * dt + 1 + Math.floor(16 * dt);
                }
            }, EasingType[0], false);

            break;
        case 88:

            break;
        case 101:

            Chart_Setting.DragNote().Opacity(1, 0, 0, 0, 0, "linear", EasingType[0], false);

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