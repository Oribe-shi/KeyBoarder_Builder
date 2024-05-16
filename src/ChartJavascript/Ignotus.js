ChartSetup("rgb(20,20,20)");

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
        function Fall_Note(fn, nt, n, x, d) {
            Chart_Setting.Note().Add(fn, nt, nt, 0);
            Chart_Setting.Note().MoveX(n, 0, x, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(n, true, MeasureTime(d));
        }
        function Fall_Drag(fn, nt, n, x, d) {
            Chart_Setting.DragNote().Add(fn, nt, nt, 0);
            Chart_Setting.DragNote().MoveX(n, 0, x, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().Eva(n, true, MeasureTime(d));
        }
        switch (Past) {
        case 0:

            BPMset(128, 0);
            PlayMusic(ChartMusic[Music]); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる

            Chart_Setting.Frame().Add(0,0);

            Fall_Note(0, 0, 1, -400, 4);
            Fall_Note(0, 1, 2, -300, 4.1);
            Fall_Note(0, 0, 3, -200, 6);
            Fall_Note(0, 0, 4, -100, 6);
            Fall_Note(0, 1, 5, 0, 6);

            //Fall_Drag(0, 0, 1, 100, 4.1);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveX(6,200, 200,0,0,"linear",EasingType[0],false);

            Chart_Setting.LongNote().Add(1, 0, 0, 0);
            Chart_Setting.LongNote().Angle(7,90, 90,0,0,"linear",EasingType[0],false);
            Chart_Setting.LongNote().MoveX(7,-1000, -1000,0,0,"linear",EasingType[0],false);
            Chart_Setting.LongNote().Length(7,20000, 20000,0,0,"linear",EasingType[0],false);
            Chart_Setting.LongNote().Scale(7,0.2, 0.2,0,0,"linear",EasingType[0],false);

            Chart_Setting.LongNote().Add(1, 0, 0, 0);
            Chart_Setting.LongNote().MoveY(8,1000, 1000,0,0,"linear",EasingType[0],false);
            Chart_Setting.LongNote().Length(8,20000, 20000,0,0,"linear",EasingType[0],false);
            Chart_Setting.LongNote().Scale(8,0.2, 0.2,0,0,"linear",EasingType[0],false);

            Chart_Setting.Frame().Angle(1,0,360,MeasureTime(16),0,"linear",EasingType[0],false);

            break;
        case 1:

            break;
        case 4:

            break;

        case 8:

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