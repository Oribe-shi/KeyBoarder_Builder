ChartSetup("rgb(255,255,255)");

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

            BPMset(150, 0);
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