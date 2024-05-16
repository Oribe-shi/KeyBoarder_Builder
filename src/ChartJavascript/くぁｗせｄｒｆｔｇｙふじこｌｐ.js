//以下は、それぞれの譜面情報関数の説明です

//Chart_Setting  フレームや判定枠、ノーツ等を追加したり、単体で移動させたいときに使います
//Current_Value　フレームや判定枠、ノーツ等の現在の情報を取得します(X座標、Y座標、角度、拡大率、透明度)
//Easing_Cooperation_Option　複数のフレームや判定枠、ノーツ等をそれぞれ特定のイージング関数の値で配置します
//BPMset　BPMを変更します

//推奨X座標範囲[-440 < 0(中心) < 440]・推奨Y座標範囲[-250 < 0(中心) < 250]
//判定枠とフレームは曲が終了すると全て削除されるため、邪魔なとき以外は削除しなくても問題はない
//※注意　同時押しの場合、ワードフリーノーツは最初(ワードノーツより上の行)に

ChartSetup();

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

            BPMset(120, 0);
            PlayMusic(ChartMusic[Music]); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる

            Chart_Setting.Note().Add(0, 17, 17, 0);
            Chart_Setting.Note().Add(0, 1, 1, 0);
            Chart_Setting.Note().Add(0, 23, 23, 0);
            Chart_Setting.Note().Add(0, 19, 19, 0);
            Chart_Setting.Note().Add(0, 5, 5, 0);
            Chart_Setting.Note().Add(0, 4, 4, 0);
            Chart_Setting.Note().Add(0, 18, 18, 0);
            Chart_Setting.Note().Add(0, 6, 6, 0);
            Chart_Setting.Note().Add(0, 20, 20, 0);
            Chart_Setting.Note().Add(0, 7, 7, 0);
            Chart_Setting.Note().Add(0, 25, 25, 0);
            Chart_Setting.Note().Add(0, 8, 8, 0);
            Chart_Setting.Note().Add(0, 21, 21, 0);
            Chart_Setting.Note().Add(0, 10, 10, 0);
            Chart_Setting.Note().Add(0, 9, 9, 0);
            Chart_Setting.Note().Add(0, 11, 11, 0);
            Chart_Setting.Note().Add(0, 15, 15, 0);
            Chart_Setting.Note().Add(0, 12, 12, 0);
            Chart_Setting.Note().Add(0, 16, 16, 0);

            Easing_Cooperation_Option.Note().EasingMoveX(1, 19, -320, 320, 0, 0, 0, 0, "linear", function(dt) {return dt;}, []);
            Easing_Cooperation_Option.Note().EasingMoveY(1, 19, -320, -320, 0, 0, 0, 0, "linear", function(dt) {return dt;}, []);

            for (let i = 0; i != 14; i++) {
                //Chart_Setting.Note().Add()
            }

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