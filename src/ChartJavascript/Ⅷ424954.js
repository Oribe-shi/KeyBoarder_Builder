ChartSetup("rgb(200,200,200)");

//譜面
function ChartInfo() {
    switch (OtherData.SetDifficulty) {
    case 0:
        break;
    case 1:
        switch (Past) {
            case 0:
    
                BPMset(155, 0);
    
                Chart_Setting.JudgementFrame().Add(0, 0);
                Chart_Setting.JudgementFrame().MoveY(1, 180, 180, 0, 0, "linear", EasingType[0], false);
                Chart_Setting.JudgementFrame().MoveX(1, 0, 600, MeasureTime(3), 0, function() {
                    return function(dt) {
                        return ((dt - 1) ** 2) * Math.round(Math.sin(64 * Math.PI * dt))
                    }
                });

    
                Chart_Setting.DragNote().Add(0, 0, 0, 0);
                Chart_Setting.DragNote().MoveY(1, 1000, 1000, 0, 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().MoveY(1, -500, 180, MeasureTime(3), MeasureTime(2), "linear", EasingType[0], false);
    
                break;
            case 4:
    
                PlayMusic(ChartMusic[Music]); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる
    
                Chart_Setting.DragNote().Eva(1, true, MeasureTime(1));
    
                break;
            case 5:
    
                Chart_Setting.DragNote().Add(0, 0, 0, 0);
                Chart_Setting.DragNote().MoveY(2, -180, 180, MeasureTime(2), 0, "easeInSine", EasingType[0], false);
                Chart_Setting.DragNote().Angle(2, 0, 360, MeasureTime(2), 0, "easeOutSine", EasingType[0], false);
                Chart_Setting.DragNote().Eva(2, true, MeasureTime(2));
    
                break;
            case 7:
    
                Chart_Setting.DragNote().Add(0, 0, 0, 0);
                Chart_Setting.DragNote().MoveY(3, -180, 180, MeasureTime(2), 0, "easeInSine", EasingType[0], false);
                Chart_Setting.DragNote().Angle(3, 0, 360, MeasureTime(2), 0, "easeOutSine", EasingType[0], false);
                Chart_Setting.DragNote().Eva(3, true, MeasureTime(2));
    
                break;
            case 156:
    
                isChartLoad = false;
    
                break;
            }

        break;
    case 2:
        switch (Past) {
        case 0:

            BPMset(155, 0);
            Chart_Setting.Frame().Add(0, 0);
            Chart_Setting.Frame().Scale(1, 0, 1.7, MeasureTime(3), 0, "easeOutSine", EasingType[0], false);

            Chart_Setting.JudgementFrame().Add(1, 0);
            Chart_Setting.JudgementFrame().MoveY(1, 120, 120, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.DragNote().Add(1, 0, 0, 0);
            Chart_Setting.DragNote().MoveY(1, 0, ["JudgementFrame", 1, 1, 0], MeasureTime(2), MeasureTime(2), "easeInCubic", EasingType[0], false);

            break;
        case 4:

            PlayMusic(ChartMusic[Music]); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる

            Chart_Setting.DragNote().Eva(1, true, 0);
            Chart_Setting.DragNote().Opacity(1, 0, 0, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(1, 0, 0, 0);

            Chart_Setting.Frame().MoveX(1, -420, 420, MeasureTime(32), 0, function() {
                return function(dt) {
                    return (1/3) * (Math.floor(32 * dt) - 4 * Math.floor(8 * dt))
                }
            }, EasingType[0], false);

            break;
        case 16:
        
            Chart_Setting.Note().MoveY(1, ["Note", 1, 1, 0], ["JudgementFrame", 1, 1, 0], MeasureTime(4), 0, function() {
                return function(dt) {
                    return Math.ceil(4 * dt) * dt - ((1/2) * Math.ceil(4 * dt - 1) + (1/2) * Math.ceil(2 * dt - 1) + Math.ceil(dt - (3/4))) 
                }
            }, EasingType[0], false);

            break;
        case 20:

            Chart_Setting.Note().Eva(1, true, 0);
            Chart_Setting.Note().Opacity(1, 0, 0, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(1, 22, 22, 0);
            for (let i = 0; i != 3; i++) Chart_Setting.Note().Add(1, 9, 9, 0);

            for (let i = 0; i != 4; i++) {
                Chart_Setting.Note().Opacity(2 + i, 0, 1, MeasureTime(16), 0, function() {
                    return function(dt) {
                        return Math.ceil(-Math.abs(4 * dt - Math.floor(4 * dt) - ((1 + 2 * i)/8)) + (1/8))
                    }
                }, EasingType[0], false);
            }

            break;
        case 156:

            isChartLoad = false;

            break;
        }

        break;
    case 3:
        switch (Past) {
        case 0:

            BPMset(155, 0);
            Chart_Setting.Frame().Add(0, 0);
            Chart_Setting.Frame().Add(1, 0);
            Chart_Setting.Frame().Add(2, 0);

            Chart_Setting.Frame().Opacity(3, 0.5, 0.5, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Frame().MoveY(1, 100, 0, MeasureTime(3), 0, "easeOutSine", EasingType[0], false);

            Chart_Setting.LongNote().Add(1, 0, 0, 0);
            Chart_Setting.LongNote().Length(1, 220, 220, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Length(1, 220, 0, MeasureTime(4), MeasureTime(16), "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(1, 90, 90, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Scale(1, 5, 5, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(1, -560, -560, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(1, 450, 450, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(1, 0, 0, 0);
            Chart_Setting.Note().Angle(2, 90, 90, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(2, -700, -450, MeasureTime(4), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.Note().MoveY(2, 197, 197, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(2, ["Note", 2, 0, 0], 0, MeasureTime(32), MeasureTime(4), "easeInOutSine", EasingType[0], false);

            break;
        case 4:

            PlayMusic(ChartMusic[Music]); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる

            Chart_Setting.Frame().MoveX(2, 0, -4500, MeasureTime(32), 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Add(3, 0, 0, 0);
            Chart_Setting.LongNote().Scale(3, 5, 5, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(3, 45, 45, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(3, 500, 500, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(3, 800, 800, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(3, 550, 550, 0, MeasureTime(13), "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(3, 2500, 2500, 0, MeasureTime(13), "linear", EasingType[0], false);

            Chart_Setting.LongNote().Add(3, 0, 0, 0);
            Chart_Setting.LongNote().Scale(4, 5, 5, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(4, 45, 45, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(4, 600, 600, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(4, 1000, 1000, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(4, 630, 630, 0, MeasureTime(16), "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(4, 3200, 3200, 0, MeasureTime(16), "linear", EasingType[0], false);

            Chart_Setting.DragNote().Add(2, 0, 0, 0);
            Chart_Setting.DragNote().Angle(1, 90, 90, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveY(1, 177, 177, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().Scale(1, 1.1, 1.1, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(1, 1100, 200, MeasureTime(32), 0, "linear", EasingType[0], false);

            for (let i = 0; i != 11; i++) {
                Chart_Setting.DragNote().Add(3, 0, 0, 0);
            }
            Chart_Setting.DragNote().MoveY(2, -200, -200, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(2, 1000, 200, MeasureTime(32), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveY(3, -220, -220, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(3, 1500, 300, MeasureTime(32), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveY(4, -185, -185, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(4, 1750, 550, MeasureTime(32), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveY(5, -205, -205, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(5, 2000, 800, MeasureTime(32), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveY(6, -180, -180, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(6, 2400, 1200, MeasureTime(32), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveY(7, -195, -195, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(7, 3000, 1800, MeasureTime(32), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveY(8, -235, -235, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(8, 3300, 2100, MeasureTime(32), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveY(9, -200, -200, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(9, 3950, 2750, MeasureTime(32), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveY(10, -215, -215, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(10, 4200, 3000, MeasureTime(32), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveY(11, -170, -170, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(11, 4600, 3400, MeasureTime(32), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveY(12, -250, -250, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(12, 4900, 3700, MeasureTime(32), 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Add(2, 0, 0, 0);
            Chart_Setting.LongNote().Scale(5, 0.5, 0.5, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Length(5, 1000, 1000, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(5, 180, 180, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(5, 150, 150, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(5, 1870, 970, MeasureTime(32), 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Add(2, 0, 0, 0);
            Chart_Setting.LongNote().Scale(6, 0.5, 0.5, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Length(6, 1000, 1000, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(6, 180, 180, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(6, 80, 80, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(6, 2070, 1170, MeasureTime(32), 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Add(2, 0, 0, 0);
            Chart_Setting.LongNote().Scale(7, 0.5, 0.5, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Length(7, 1000, 1000, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(7, 180, 180, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(7, 10, 10, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(7, 2270, 1370, MeasureTime(32), 0, "linear", EasingType[0], false);

            Chart_Setting.DragNote().Add(2, 0, 0, 0);
            Chart_Setting.DragNote().MoveY(13, 150, 150, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(13, 1870, 970, MeasureTime(32), 0, "linear", EasingType[0], false);

            Chart_Setting.DragNote().Add(2, 0, 0, 0);
            Chart_Setting.DragNote().MoveY(14, 80, 80, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(14, 2070, 1170, MeasureTime(32), 0, "linear", EasingType[0], false);

            Chart_Setting.DragNote().Add(2, 0, 0, 0);
            Chart_Setting.DragNote().MoveY(15, 10, 10, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().MoveX(15, 2270, 1370, MeasureTime(32), 0, "linear", EasingType[0], false);

            for (let i = 0; i != 5; i++) {
                Chart_Setting.LongNote().Add(2, 0, 0, 0);
            }
            Chart_Setting.LongNote().Length(9, 395, 395, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(9, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(9, 300, 300, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(9, 2600, 1700, MeasureTime(32), 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Length(10, 75, 75, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(10, 180, 180, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(10, -300, -300, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(10, 2600, 1700, MeasureTime(32), 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Length(11, 100, 100, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(11, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(11, 300, 300, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(11, 3200, 2300, MeasureTime(32), 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Length(12, 380, 380, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(12, 180, 180, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(12, -300, -300, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(12, 3200, 2300, MeasureTime(32), 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Length(5, 390, 390, 0, MeasureTime(18), "linear", EasingType[0], false);
            Chart_Setting.LongNote().Scale(5, 1, 1, 0, MeasureTime(18), "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(5, 0, 0, 0, MeasureTime(18), "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(5, 300, 300, 0, MeasureTime(18), "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(5, 3800 - 900 * (18/32), 2900, MeasureTime(14), MeasureTime(18), "linear", EasingType[0], false);

            Chart_Setting.LongNote().Length(6, 100, 100, 0, MeasureTime(18), "linear", EasingType[0], false);
            Chart_Setting.LongNote().Scale(6, 1, 1, 0, MeasureTime(18), "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(6, 180, 180, 0, MeasureTime(18), "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(6, -300, -300, 0, MeasureTime(18), "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(6, 3800 - 900 * (18/32), 2900, MeasureTime(14), MeasureTime(18), "linear", EasingType[0], false);

            Chart_Setting.LongNote().Length(7, 250, 250, 0, MeasureTime(18), "linear", EasingType[0], false);
            Chart_Setting.LongNote().Scale(7, 1, 1, 0, MeasureTime(18), "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(7, 0, 0, 0, MeasureTime(18), "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(7, 300, 300, 0, MeasureTime(18), "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(7, 4400 - 900 * (18/32), 3500, MeasureTime(14), MeasureTime(18), "linear", EasingType[0], false);

            Chart_Setting.LongNote().Length(8, 250, 250, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(8, 180, 180, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(8, -300, -300, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(8, 4400, 3500, MeasureTime(32), 0, "linear", EasingType[0], false);

            break;

        case 11:

            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], ["Note", 2, 1, -190], MeasureTime(4), 0, function() {
                return function(dt) {
                    return Math.sin(Math.PI * dt)
                }
            }, EasingType[0], false);
            Chart_Setting.Note().Angle(2, ["Note", 2, 2, 0], ["Note", 2, 2, 360], MeasureTime(4), 0, "easeInOutCubic", EasingType[0], false);

            break;
        case 16:

            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], ["Note", 2, 1, -150], MeasureTime(0.5), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], ["DragNote", 13, 1, -53], MeasureTime(0.5), MeasureTime(0.5), "easeInSine", EasingType[0], false);

            break;
        case 17:

            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], ["Note", 2, 1, -120], MeasureTime(0.5), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], ["DragNote", 14, 1, -53], MeasureTime(0.5), MeasureTime(0.5), "easeInSine", EasingType[0], false);

            break;
        case 18:

            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], ["Note", 2, 1, -120], MeasureTime(0.5), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], ["DragNote", 15, 1, -53], MeasureTime(0.5), MeasureTime(0.5), "easeInSine", EasingType[0], false);

            break;
        case 19:

            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], ["Note", 2, 1, -110], MeasureTime(1.5), 0, "easeOutCubic", EasingType[0], false);
            Chart_Setting.Note().Angle(2, ["Note", 2, 2, 0], ["Note", 2, 2, 270], MeasureTime(1.5), 0, "easeOutCubic", EasingType[0], false);

            break;
        case 21:

            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], 130, MeasureTime(3), 0, "easeInOutSine", EasingType[0], false);
            Chart_Setting.Note().Angle(2, ["Note", 2, 2, 0], 23, MeasureTime(1.5), 0, "easeInOutSine", EasingType[0], false);
            Chart_Setting.Note().Angle(2, ["Note", 2, 2, 0], 0, MeasureTime(1.5), MeasureTime(1.5), "easeInSine", EasingType[0], false);

            break;
        case 24:

            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], -140, MeasureTime(3), 0, "easeInOutSine", EasingType[0], false);
            Chart_Setting.Note().Angle(2, ["Note", 2, 2, 0], -404, MeasureTime(2), 0, "easeInOutCubic", EasingType[0], false);
            Chart_Setting.Note().Angle(2, ["Note", 2, 2, 0], 0, MeasureTime(1), MeasureTime(2), "easeInSine", EasingType[0], false);

            break;
        case 27:

            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], 0, MeasureTime(3), 0, "easeInOutSine", EasingType[0], false);
            Chart_Setting.Note().Angle(2, ["Note", 2, 2, 0], 30, MeasureTime(1), 0, "easeOutSine", EasingType[0], false);
            Chart_Setting.Note().Angle(2, ["Note", 2, 2, 0], 0, MeasureTime(2), MeasureTime(1), "easeInSine", EasingType[0], false);

            break;
        case 30:

            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], -195, MeasureTime(3), 0, "easeInSine", EasingType[0], false);
            Chart_Setting.Note().Angle(2, ["Note", 2, 2, 0], -17, MeasureTime(2), 0, "easeOutSine", EasingType[0], false);

            break;
        case 31:

            Chart_Setting.JudgementFrame().Add(1, 0);
            Chart_Setting.JudgementFrame().MoveY(1, 200, 200, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveX(1, 650, 0, MeasureTime(5), 0, "easeOutSine", EasingType[0], false);

            break;
        case 32:

            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], -240, MeasureTime(2), MeasureTime(1), "easeOutCubic", EasingType[0], false);
            Chart_Setting.Note().Angle(2, ["Note", 2, 2, 0], 720, MeasureTime(4), 0, "easeOutSine", EasingType[0], false);

            break;
        case 33:

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(13, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(13, -300, -300, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(13, true, MeasureTime(4));

            break;
        case 34:

            Chart_Setting.Note().MoveY(2, ["Note", 2, 1, 0], ["JudgementFrame", 1, 1, 0], MeasureTime(2), 0, "easeInSine", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(14, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(14, 160, 160, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(14, true, MeasureTime(4));
        
            break;
        case 35:

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(15, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(15, -200, -200, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(15, true, MeasureTime(4));

            break;
        case 36:

            Chart_Setting.Note().Eva(2, true, 0);

            Chart_Setting.JudgementFrame().MoveX(1, -300, -300, 1, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(16, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(16, 340, 340, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(16, true, MeasureTime(4));

            break;
        case 37:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 14, 0, 0], ["Note", 14, 0, 0], 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(17, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(17, -430, -430, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(17, true, MeasureTime(4));

            break;
        case 38:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 15, 0, 0], ["Note", 15, 0, 0], 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(18, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(18, -30, -30, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(18, true, MeasureTime(4));

            break;
        case 39:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 16, 0, 0], ["Note", 16, 0, 0], 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(19, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(19, 270, 270, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(19, true, MeasureTime(4));

            break;
        case 40:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 17, 0, 0], ["Note", 17, 0, 0], 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(20, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(20, 390, 390, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(20, true, MeasureTime(4));

            break;
        case 41:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 18, 0, 0], ["Note", 18, 0, 0], 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(21, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(21, -390, -390, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(21, true, MeasureTime(4));

            break;
        case 42:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 19, 0, 0], ["Note", 19, 0, 0], 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(22, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(22, -90, -90, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(22, true, MeasureTime(4));

            break;
        case 43:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 20, 0, 0], ["Note", 20, 0, 0], 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(23, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(23, 150, 150, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(23, true, MeasureTime(4));

            break;
        case 44:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 21, 0, 0], ["Note", 21, 0, 0], 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(24, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(24, -250, -250, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(24, true, MeasureTime(4));

            break;
        case 45:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 22, 0, 0], ["Note", 22, 0, 0], 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(25, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(25, 80, 80, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(25, true, MeasureTime(4));

            break;
        case 46:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 23, 0, 0], ["Note", 23, 0, 0], 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(26, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(26, 390, 390, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(26, true, MeasureTime(4));

            break;
        case 47:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 24, 0, 0], ["Note", 24, 0, 0], 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(0, 0, 0, 0);
            Chart_Setting.Note().MoveY(27, -600, 200, MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().MoveX(27, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(27, true, MeasureTime(4));

            break;
        case 48:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 25, 0, 0], ["Note", 25, 0, 0], 0, 0, "linear", EasingType[0], false);

            for (let i = 0; i != 12; i++) {
                Chart_Setting.Note().Add(1, 0, 0, 0);
                Chart_Setting.Note().MoveX(28 + i, 0, -330 + 660 * (i % 2), 0, 0, "linear", EasingType[0], false);
                Chart_Setting.Note().MoveY(28 + i, 0, 1000, 0, 0, "linear", EasingType[0], false);
                
                if (i % 3 == 0) {
                    Chart_Setting.Note().MoveY(28 + i, -600, ["JudgementFrame", 1, 1, 0], MeasureTime(4), MeasureTime(i/3), "linear", EasingType[0], false);
                    Chart_Setting.Note().Eva(28 + i, true, MeasureTime(4 + (i/3)));
                } else if (i % 3 == 1) {
                    Chart_Setting.Note().MoveY(28 + i, -600, ["JudgementFrame", 1, 1, 0], MeasureTime(4), MeasureTime((1/2) + ((i-1)/3)), "linear", EasingType[0], false);
                    Chart_Setting.Note().Eva(28 + i, true, MeasureTime(4 + (1/2) + ((i-1)/3)));
                } else {
                    Chart_Setting.Note().MoveY(28 + i, -600, ["JudgementFrame", 1, 1, 0], MeasureTime(4), MeasureTime((3/4) + ((i-2)/3)), "linear", EasingType[0], false);
                    Chart_Setting.Note().Eva(28 + i, true, MeasureTime(4 + (3/4) + ((i-2)/3)));
                }
            }

            break;
        case 49:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 26, 0, 0], ["Note", 26, 0, 0], 0, 0, "linear", EasingType[0], false);

            break;
        case 50:

            Chart_Setting.JudgementFrame().MoveX(1, ["Note", 27, 0, 0], ["Note", 27, 0, 0], 0, 0, "linear", EasingType[0], false);

            break;
        case 51:

            for (let i = 0; i != 6; i++) Chart_Setting.JudgementFrame().Add(1, 0);

            for (let i = 0; i != 6; i++) Chart_Setting.JudgementFrame().MoveY(2 + i, ["JudgementFrame", 1, 1, 0], ["JudgementFrame", 1, 1, 0], 0, 0, "linear", EasingType[0], false);
            for (let i = 0; i != 3; i++) Chart_Setting.JudgementFrame().MoveX(2 + i, -330 + 110 * i, -330 + 110 * i, 0, 0, "linear", EasingType[0], false);
            for (let i = 0; i != 3; i++) Chart_Setting.JudgementFrame().MoveX(5 + i, 110 + 110 * i, 110 + 110 * i, 0, 0, "linear", EasingType[0], false);

            break;
        case 52:

            for (let i = 0; i != 12; i++) {
                Chart_Setting.Note().Add(1, 0, 0, 0);
                Chart_Setting.Note().MoveX(40 + i, 0, -220 + 440 * (i % 2), 0, 0, "linear", EasingType[0], false);
                Chart_Setting.Note().MoveY(40 + i, 0, 1000, 0, 0, "linear", EasingType[0], false);
            
                if (i % 3 == 0) {
                    Chart_Setting.Note().MoveY(40 + i, -600, ["JudgementFrame", 1, 1, 0], MeasureTime(4), MeasureTime(i/3), "linear", EasingType[0], false);
                    Chart_Setting.Note().Eva(40 + i, true, MeasureTime(4 + (i/3)));
                } else if (i % 3 == 1) {
                    Chart_Setting.Note().MoveY(40 + i, -600, ["JudgementFrame", 1, 1, 0], MeasureTime(4), MeasureTime((1/2) + ((i-1)/3)), "linear", EasingType[0], false);
                    Chart_Setting.Note().Eva(40 + i, true, MeasureTime(4 + (1/2) + ((i-1)/3)));
                } else {
                    Chart_Setting.Note().MoveY(40 + i, -600, ["JudgementFrame", 1, 1, 0], MeasureTime(4), MeasureTime((3/4) + ((i-2)/3)), "linear", EasingType[0], false);
                    Chart_Setting.Note().Eva(40 + i, true, MeasureTime(4 + (3/4) + ((i-2)/3)));
                }
            }

            break;
        case 56:

            Chart_Setting.Frame().MoveY(1, -100, -100, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Frame().Scale(1, 1.2, 1.2, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.JudgementFrame().Opacity(2, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().Opacity(7, 0, 0, 0, 0, "linear", EasingType[0], false);

            for (let i = 0; i != 16; i++) {
                Chart_Setting.Note().Add(1, 0, 0, 0);
                Chart_Setting.Note().MoveX(52 + i, 0, -110 + 220 * (i % 2), 0, 0, "linear", EasingType[0], false);
                Chart_Setting.Note().MoveY(52 + i, 0, 1000, 0, 0, "linear", EasingType[0], false);

                Chart_Setting.Note().MoveY(52 + i, -600, ["JudgementFrame", 1, 1, 0], MeasureTime(4), MeasureTime(i/4), "linear", EasingType[0], false);
                Chart_Setting.Note().Eva(52 + i, true, MeasureTime(4 + (i/4)));
            }

            break;
        case 60:

            Chart_Setting.Frame().MoveY(1, -250, -250, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Frame().Scale(1, 1.6, 1.6, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.JudgementFrame().Opacity(3, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().Opacity(6, 0, 0, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Note().Add(1, 0, 0, 0);
            Chart_Setting.Note().MoveY(68, -600, ["JudgementFrame", 1, 1, 0], MeasureTime(4), 0, "linear", EasingType[0], false);
            Chart_Setting.Note().Eva(68, true, MeasureTime(4));

            for (let i = 0; i != 24; i++) {
                Chart_Setting.DragNote().Add(1, 0, 0, 0);
                Chart_Setting.DragNote().MoveY(16 + i, -600 - 300 * (i+1), ["JudgementFrame", 1, 1, 0], MeasureTime(4 + (i/8)), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(16 + i, true, MeasureTime(4 + (i/8)));
            }

            break;
        case 64:

            Chart_Setting.Frame().MoveY(1, ["Frame", 1, 1, 0], -1800, MeasureTime(2.9), 0, "easeInCubic", EasingType[0], false);
            Chart_Setting.Frame().Scale(1, ["Frame", 1, 3, 0], 10, MeasureTime(2.9), 0, "easeInCubic", EasingType[0], false);

            Chart_Setting.JudgementFrame().Opacity(4, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().Opacity(5, 0, 0, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.Frame().Opacity(3, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Frame().MoveX(2, 0, 0, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.DragNote().MoveX(1, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().Angle(1, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().Scale(1, 1, 1, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().Opacity(1, 0, 0, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().MoveY(1, ["LongNote", 1, 1, -230], ["LongNote", 1, 1, -230], 0, 0, "linear", EasingType[0], false);

            break;
        case 67:

            Chart_Setting.Frame().Opacity(3, 1, 1, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Frame().MoveY(1, 200, 200, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.Frame().Scale(1, 1, 1, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.JudgementFrame().Opacity(1, 0, 0, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Length(1, 220, 220, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().MoveX(5, -190, -190, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(5, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Length(5, 525, 525, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(6, 250, 250, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(6, -600, -600, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(7, -70, -70, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(7, -600, -600, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(8, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(8, -600, -600, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(8, 0, 0, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.DragNote().MoveY(1, -150, 0, MeasureTime(1), 0, "linear", EasingType[0], false);
            Chart_Setting.DragNote().Opacity(1, 1, 1, 0, 0, "linear", EasingType[0], false);

            Easing_Cooperation_Option.DragNote().EasingMoveX(2, 12, -200, 200, 0, 0, 0, 0, "linear", function(dt) {
                return dt ** 2
            }, []);
            Easing_Cooperation_Option.DragNote().EasingMoveY(2, 12, -1050, -1350, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);

            Easing_Cooperation_Option.DragNote().EasingMoveX(13, 15, 0, 200, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);
            Easing_Cooperation_Option.DragNote().EasingMoveY(13, 15, -150, -450, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);

            break;
        case 68:

            Chart_Setting.LongNote().Eva(5, true, MeasureTime(3.5), 0);
            Chart_Setting.LongNote().Length(5, 525, 0, MeasureTime(3.5), 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().MoveX(5, ["LongNote", 5, 0, 0], ["LongNote", 5, 0, -100], MeasureTime(4), 0, "easeInSine", EasingType[0], false);

            Chart_Setting.DragNote().Eva(1, true, 0);
            for (let i = 0; i != 3; i++) {
                Chart_Setting.DragNote().MoveY(13 + i, ["DragNote", 13 + i, 1, 0], 0, MeasureTime(1 + i), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(13 + i, true, MeasureTime(1 + i));
            }

            Chart_Setting.Frame().Angle(1, 0, -5, MeasureTime(4), 0, function() {
                return function(dt) {
                    return -((2 * dt - 1) ** 2) + 1
                }
            }, EasingType[0], false);

            Chart_Setting.LongNote().Angle(6, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Typically(6, MeasureTime(4), 0, MeasureTime(3.5), ["LongNote", 6, 0, 0], -600, 0);

            for (let i = 0; i != 4; i++) {
                Chart_Setting.Note().Add(2, 0, 0, 0);
            }
            Easing_Cooperation_Option.Note().EasingMoveX(69, 72, -250, 50, 0, 0, 0, 0, "linear", function(dt) {
                return dt ** 2
            }, []);
            Easing_Cooperation_Option.Note().EasingMoveY(69, 72, -600, -1050, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);
            for (let i = 0; i != 4; i++) {
                Chart_Setting.Note().MoveY(69 + i, ["Note", 69 + i, 1, 0], 0, MeasureTime(4 + i), 0, "linear", EasingType[0], false);
                Chart_Setting.Note().Eva(69 + i, true, MeasureTime(4 + i));
            }

            break;
        case 72:

            Chart_Setting.LongNote().Eva(6, true, MeasureTime(3.5), 0);

            Chart_Setting.LongNote().MoveX(6, ["LongNote", 6, 0, 0], ["LongNote", 6, 0, 150], MeasureTime(4), 0, "easeInSine", EasingType[0], false);

            Chart_Setting.Frame().Angle(1, 0, 5, MeasureTime(4), 0, function() {
                return function(dt) {
                    return -((2 * dt - 1) ** 2) + 1
                }
            }, EasingType[0], false);

            Chart_Setting.LongNote().Typically(7, MeasureTime(4), 0, MeasureTime(3.5), ["LongNote", 7, 0, 0], -600, 0);

            for (let i = 0; i != 4; i++) {
                Chart_Setting.Note().Add(2, 0, 0, 0);
            }
            Easing_Cooperation_Option.Note().EasingMoveX(73, 76, 350, 50, 0, 0, 0, 0, "linear", function(dt) {
                return dt ** 2
            }, []);
            Easing_Cooperation_Option.Note().EasingMoveY(73, 76, -600, -1050, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);
            for (let i = 0; i != 4; i++) {
                Chart_Setting.Note().MoveY(73 + i, ["Note", 73 + i, 1, 0], 0, MeasureTime(4 + i), 0, "linear", EasingType[0], false);
                Chart_Setting.Note().Eva(73 + i, true, MeasureTime(4 + i));
            }

            break;
        case 76:

            Chart_Setting.LongNote().Eva(7, true, MeasureTime(3.5), 0);

            Chart_Setting.LongNote().MoveX(7, ["LongNote", 7, 0, 0], ["LongNote", 7, 0, -250], MeasureTime(4), 0, "easeInSine", EasingType[0], false);

            Chart_Setting.Frame().Angle(1, 0, -5, MeasureTime(4), 0, function() {
                return function(dt) {
                    return -((2 * dt - 1) ** 2) + 1
                }
            }, EasingType[0], false);

            Chart_Setting.LongNote().Typically(8, MeasureTime(4), 0, MeasureTime(3.5), ["LongNote", 8, 0, 0], -600, 0);

            for (let i = 0; i != 4; i++) {
                Chart_Setting.Note().Add(2, 0, 0, 0);
            }
            Easing_Cooperation_Option.Note().EasingMoveX(77, 80, -200, 200, 0, 0, 0, 0, "linear", function(dt) {
                return dt ** 2
            }, []);
            Easing_Cooperation_Option.Note().EasingMoveY(77, 80, -600, -1050, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);
            for (let i = 0; i != 4; i++) {
                Chart_Setting.Note().MoveY(77 + i, ["Note", 77 + i, 1, 0], 0, MeasureTime(4 + i), 0, "linear", EasingType[0], false);
                Chart_Setting.Note().Eva(77 + i, true, MeasureTime(4 + i));
            }

            break;
        case 80:

            Chart_Setting.LongNote().Eva(8, true, MeasureTime(3.5), 0);

            Chart_Setting.LongNote().MoveX(8, ["LongNote", 8, 0, 0], ["LongNote", 8, 0, 350], MeasureTime(4), 0, "easeInSine", EasingType[0], false);

            Chart_Setting.Frame().Angle(1, 0, 5, MeasureTime(4), 0, function() {
                return function(dt) {
                    return -((2 * dt - 1) ** 2) + 1
                }
            }, EasingType[0], false);

            Chart_Setting.LongNote().Angle(9, 0, 0, MeasureTime(4), 0, "easeInSine", EasingType[0], false);
            Chart_Setting.LongNote().Typically(9, MeasureTime(4), 0, MeasureTime(3.5), -240, -600, 0);

            for (let i = 0; i != 5; i++) Chart_Setting.Note().Add(2, 0, 0, 0);
            Easing_Cooperation_Option.Note().EasingMoveX(81, 85, -100, 350, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);
            Easing_Cooperation_Option.Note().EasingMoveY(81, 85, -600, -1050, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);
            for (let i = 0; i != 5; i++) Chart_Setting.Note().MoveY(81 + i, ["Note", 81 + i, 1, 0], 0, MeasureTime(4 + (3 * i)/4), 0, "linear", EasingType[0], false);

            Easing_Cooperation_Option.DragNote().EasingMoveX(2, 3, ["Note", 81, 0, 0], ["Note", 81, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(2, 3, ["Note", 81, 0, 0], ["Note", 81, 0, 0], MeasureTime(1.5), 0, MeasureTime(2), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(2, 3, ["Note", 81, 1, 0], ["Note", 81, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(2 + i, ["DragNote", 2 + i, 1, 0], 0, MeasureTime(4 + (1 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(2 + i, true, MeasureTime(4 + (1 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(4, 5, ["Note", 82, 0, 0], ["Note", 82, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(4, 5, ["Note", 82, 0, 0], ["Note", 82, 0, 0], MeasureTime(1.5), 0, MeasureTime(2 + 1), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(4, 5, ["Note", 82, 1, 0], ["Note", 82, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(4 + i, ["DragNote", 4 + i, 1, 0], 0, MeasureTime(4 + (4 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(4 + i, true, MeasureTime(4 + (4 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(6, 7, ["Note", 83, 0, 0], ["Note", 83, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(6, 7, ["Note", 83, 0, 0], ["Note", 83, 0, 0], MeasureTime(1.5), 0, MeasureTime(2 + (7/4)), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(6, 7, ["Note", 83, 1, 0], ["Note", 83, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(6 + i, ["DragNote", 6 + i, 1, 0], 0, MeasureTime(4 + (7 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(6 + i, true, MeasureTime(4 + (7 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(8, 9, ["Note", 84, 0, 0], ["Note", 84, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(8, 9, ["Note", 84, 0, 0], ["Note", 84, 0, 0], MeasureTime(1.5), 0, MeasureTime(2 + (10/4)), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(8, 9, ["Note", 84, 1, 0], ["Note", 84, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(8 + i, ["DragNote", 8 + i, 1, 0], 0, MeasureTime(4 + (10 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(8 + i, true, MeasureTime(4 + (10 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(10, 12, ["Note", 85, 0, 0], ["Note", 85, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(10, 12, ["Note", 85, 0, 0], ["Note", 85, 0, 0], MeasureTime(1.5), 0, MeasureTime(2 + (13/4)), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(10, 12, ["Note", 85, 1, 0], ["Note", 85, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 3; i++) {
                Chart_Setting.DragNote().MoveY(10 + i, ["DragNote", 10 + i, 1, 0], 0, MeasureTime(4 + (13 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(10 + i, true, MeasureTime(4 + (13 + i)/4));
            }

            break;
        case 84:

            Chart_Setting.LongNote().MoveY(9, ["LongNote", 9, 1, 0], ["LongNote", 9, 1, -510], MeasureTime(4), 0, "easeInSine", EasingType[0], false);
            Chart_Setting.LongNote().Eva(9, true, MeasureTime(3.5), 0);
            Chart_Setting.JudgementFrame().MoveX(1, ["LongNote", 9, 0, 0], ["LongNote", 9, 0, 0], 0, 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveY(1, ["LongNote", 9, 1, 0], ["LongNote", 9, 1, -510], MeasureTime(4), 0, "easeInSine", EasingType[0], false);
            Chart_Setting.JudgementFrame().Opacity(1, 1, 1, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Angle(10, 0, 0, MeasureTime(4), 0, "easeInSine", EasingType[0], false);
            Chart_Setting.LongNote().Typically(10, MeasureTime(4), 0, MeasureTime(3.5), 194, -600, 0);

            for (let i = 0; i != 5; i++) Chart_Setting.Note().Eva(81 + i, true, MeasureTime((3 * i)/4));

            for (let i = 0; i != 5; i++) Chart_Setting.Note().Add(2, 0, 0, 0);
            Easing_Cooperation_Option.Note().EasingMoveX(86, 90, 80, -370, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);
            Easing_Cooperation_Option.Note().EasingMoveY(86, 90, -600, -1050, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);
            for (let i = 0; i != 5; i++) Chart_Setting.Note().MoveY(86 + i, ["Note", 86 + i, 1, 0], 0, MeasureTime(4 + (3 * i)/4), 0, "linear", EasingType[0], false);

            for (let i = 0; i != 11; i++) Chart_Setting.DragNote().Add(2, 0, 0, 0);
            Easing_Cooperation_Option.DragNote().EasingMoveX(40, 41, ["Note", 86, 0, 0], ["Note", 86, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(40, 41, ["Note", 86, 0, 0], ["Note", 86, 0, -100], MeasureTime(1.5), 0, MeasureTime(2), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(40, 41, ["Note", 86, 1, 0], ["Note", 86, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(40 + i, ["DragNote", 40 + i, 1, 0], 0, MeasureTime(4 + (1 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(40 + i, true, MeasureTime(4 + (1 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(42, 43, ["Note", 87, 0, 0], ["Note", 87, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(42, 43, ["Note", 87, 0, 0], ["Note", 87, 0, -100], MeasureTime(1.5), 0, MeasureTime(2 + 1), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(42, 43, ["Note", 87, 1, 0], ["Note", 87, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(42 + i, ["DragNote", 42 + i, 1, 0], 0, MeasureTime(4 + (4 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(42 + i, true, MeasureTime(4 + (4 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(44, 45, ["Note", 88, 0, 0], ["Note", 88, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(44, 45, ["Note", 88, 0, 0], ["Note", 88, 0, -100], MeasureTime(1.5), 0, MeasureTime(2 + (7/4)), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(44, 45, ["Note", 88, 1, 0], ["Note", 88, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(44 + i, ["DragNote", 44 + i, 1, 0], 0, MeasureTime(4 + (7 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(44 + i, true, MeasureTime(4 + (7 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(46, 47, ["Note", 89, 0, 0], ["Note", 89, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(46, 47, ["Note", 89, 0, 0], ["Note", 89, 0, -100], MeasureTime(1.5), 0, MeasureTime(2 + (10/4)), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(46, 47, ["Note", 89, 1, 0], ["Note", 89, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(46 + i, ["DragNote", 46 + i, 1, 0], 0, MeasureTime(4 + (10 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(46 + i, true, MeasureTime(4 + (10 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(48, 50, ["Note", 90, 0, 0], ["Note", 90, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(48, 50, ["Note", 90, 0, 0], ["Note", 90, 0, 150], MeasureTime(1.5), 0, MeasureTime(2 + (13/4)), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(48, 50, ["Note", 90, 1, 0], ["Note", 90, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 3; i++) {
                Chart_Setting.DragNote().MoveY(48 + i, ["DragNote", 48 + i, 1, 0], 0, MeasureTime(4 + (13 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(48 + i, true, MeasureTime(4 + (13 + i)/4));
            }

            break;
        case 88:

            Chart_Setting.LongNote().Angle(11, 0, 0, MeasureTime(4), 0, "easeInSine", EasingType[0], false);
            Chart_Setting.LongNote().Typically(11, MeasureTime(4), 0, MeasureTime(3.5), -365, -600, 0);

            Chart_Setting.LongNote().MoveY(10, ["LongNote", 10, 1, 0], ["LongNote", 10, 1, -510], MeasureTime(4), 0, "easeInSine", EasingType[0], false);
            Chart_Setting.LongNote().Eva(10, true, MeasureTime(3.5), 0);
            Chart_Setting.JudgementFrame().MoveX(2, ["LongNote", 10, 0, 0], ["LongNote", 10, 0, 0], 0, 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveY(2, ["LongNote", 10, 1, 0], ["LongNote", 10, 1, -510], MeasureTime(4), 0, "easeInSine", EasingType[0], false);
            Chart_Setting.JudgementFrame().Opacity(2, 1, 1, 0, 0, "linear", EasingType[0], false);

            for (let i = 0; i != 5; i++) Chart_Setting.Note().Eva(86 + i, true, MeasureTime((3 * i)/4));

            for (let i = 0; i != 5; i++) Chart_Setting.Note().Add(2, 0, 0, 0);
            Easing_Cooperation_Option.Note().EasingMoveX(91, 95, -260, 360, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);
            Easing_Cooperation_Option.Note().EasingMoveY(91, 95, -600, -1050, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);
            for (let i = 0; i != 5; i++) Chart_Setting.Note().MoveY(91 + i, ["Note", 91 + i, 1, 0], 0, MeasureTime(4 + (3 * i)/4), 0, "linear", EasingType[0], false);

            for (let i = 0; i != 11; i++) Chart_Setting.DragNote().Add(2, 0, 0, 0);
            Easing_Cooperation_Option.DragNote().EasingMoveX(51, 52, ["Note", 91, 0, 0], ["Note", 91, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(51, 52, ["Note", 91, 0, 0], ["Note", 91, 0, 200], MeasureTime(1.5), 0, MeasureTime(2), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(51, 52, ["Note", 91, 1, 0], ["Note", 91, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(51 + i, ["DragNote", 51 + i, 1, 0], 0, MeasureTime(4 + (1 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(51 + i, true, MeasureTime(4 + (1 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(53, 54, ["Note", 92, 0, 0], ["Note", 92, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(53, 54, ["Note", 92, 0, 0], ["Note", 92, 0, 200], MeasureTime(1.5), 0, MeasureTime(2 + 1), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(53, 54, ["Note", 92, 1, 0], ["Note", 92, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(53 + i, ["DragNote", 53 + i, 1, 0], 0, MeasureTime(4 + (4 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(53 + i, true, MeasureTime(4 + (4 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(55, 56, ["Note", 93, 0, 0], ["Note", 93, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(55, 56, ["Note", 93, 0, 0], ["Note", 93, 0, 200], MeasureTime(1.5), 0, MeasureTime(2 + (7/4)), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(55, 56, ["Note", 93, 1, 0], ["Note", 93, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(55 + i, ["DragNote", 55 + i, 1, 0], 0, MeasureTime(4 + (7 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(55 + i, true, MeasureTime(4 + (7 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(57, 58, ["Note", 94, 0, 0], ["Note", 94, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(57, 58, ["Note", 94, 0, 0], ["Note", 94, 0, 200], MeasureTime(1.5), 0, MeasureTime(2 + (10/4)), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(57, 58, ["Note", 94, 1, 0], ["Note", 94, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(57 + i, ["DragNote", 57 + i, 1, 0], 0, MeasureTime(4 + (10 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(57 + i, true, MeasureTime(4 + (10 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(59, 61, ["Note", 95, 0, 0], ["Note", 95, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(59, 61, ["Note", 95, 0, 0], ["Note", 95, 0, -300], MeasureTime(1.5), 0, MeasureTime(2 + (13/4)), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(59, 61, ["Note", 95, 1, 0], ["Note", 95, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 3; i++) {
                Chart_Setting.DragNote().MoveY(59 + i, ["DragNote", 59 + i, 1, 0], 0, MeasureTime(4 + (13 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(59 + i, true, MeasureTime(4 + (13 + i)/4));
            }

            break;
        case 92:

            Chart_Setting.LongNote().Angle(12, 0, 0, MeasureTime(4), 0, "easeInSine", EasingType[0], false);
            Chart_Setting.LongNote().Typically(12, MeasureTime(4), 0, MeasureTime(4), 0, -600, 0);

            Chart_Setting.LongNote().MoveY(11, ["LongNote", 11, 1, 0], ["LongNote", 11, 1, -510], MeasureTime(4), 0, "easeInSine", EasingType[0], false);
            Chart_Setting.LongNote().Eva(11, true, MeasureTime(3.5), 0);
            Chart_Setting.JudgementFrame().MoveX(3, ["LongNote", 11, 0, 0], ["LongNote", 11, 0, 0], 0, 0, "linear", EasingType[0], false);
            Chart_Setting.JudgementFrame().MoveY(3, ["LongNote", 11, 1, 0], ["LongNote", 11, 1, -510], MeasureTime(4), 0, "easeInSine", EasingType[0], false);
            Chart_Setting.JudgementFrame().Opacity(3, 1, 1, 0, 0, "linear", EasingType[0], false);

            for (let i = 0; i != 5; i++) Chart_Setting.Note().Eva(91 + i, true, MeasureTime((3 * i)/4));

            for (let i = 0; i != 5; i++) {
                Chart_Setting.Note().Add(2, 0, 0, 0);
                Chart_Setting.Note().MoveX(96 + i, 0, -200 + 400 * (i % 2), 0, 0, "linear", EasingType[0], false);
            }
            Easing_Cooperation_Option.Note().EasingMoveY(96, 100, -600, -1050, 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, []);
            for (let i = 0; i != 5; i++) Chart_Setting.Note().MoveY(96 + i, ["Note", 96 + i, 1, 0], 0, MeasureTime(4 + (3 * i)/4), 0, "linear", EasingType[0], false);

            for (let i = 0; i != 11; i++) Chart_Setting.DragNote().Add(2, 0, 0, 0);
            Easing_Cooperation_Option.DragNote().EasingMoveX(62, 63, ["Note", 96, 0, 0], ["Note", 96, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(62, 63, ["Note", 96, 0, 0], 0, MeasureTime(1.5), 0, MeasureTime(2), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(62, 63, ["Note", 96, 1, 0], ["Note", 96, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(62 + i, ["DragNote", 62 + i, 1, 0], 0, MeasureTime(4 + (1 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(62 + i, true, MeasureTime(4 + (1 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(64, 65, ["Note", 97, 0, 0], ["Note", 97, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(64, 65, ["Note", 97, 0, 0], 0, MeasureTime(1.5), 0, MeasureTime(2 + 1), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(64, 65, ["Note", 97, 1, 0], ["Note", 97, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(64 + i, ["DragNote", 64 + i, 1, 0], 0, MeasureTime(4 + (4 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(64 + i, true, MeasureTime(4 + (4 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(66, 67, ["Note", 98, 0, 0], ["Note", 98, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(66, 67, ["Note", 98, 0, 0], 0, MeasureTime(1.5), 0, MeasureTime(2 + (7/4)), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(66, 67, ["Note", 98, 1, 0], ["Note", 98, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(66 + i, ["DragNote", 66 + i, 1, 0], 0, MeasureTime(4 + (7 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(66 + i, true, MeasureTime(4 + (7 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(68, 69, ["Note", 99, 0, 0], ["Note", 99, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(68, 69, ["Note", 99, 0, 0], 0, MeasureTime(1.5), 0, MeasureTime(2 + (10/4)), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(68, 69, ["Note", 99, 1, 0], ["Note", 99, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 2; i++) {
                Chart_Setting.DragNote().MoveY(68 + i, ["DragNote", 68 + i, 1, 0], 0, MeasureTime(4 + (10 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(68 + i, true, MeasureTime(4 + (10 + i)/4));
            }

            Easing_Cooperation_Option.DragNote().EasingMoveX(70, 72, ["Note", 100, 0, 0], ["Note", 100, 0, 0], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveX(70, 72, ["Note", 100, 0, 0], 0, MeasureTime(1.5), 0, MeasureTime(2 + (13/4)), 100, "easeOutSine", function(dt) {return dt}, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(70, 72, ["Note", 100, 1, 0], ["Note", 100, 1, -75], 0, 0, 0, 0, "linear", function(dt) {return dt}, [0]);
            for (let i = 0; i != 3; i++) {
                Chart_Setting.DragNote().MoveY(70 + i, ["DragNote", 70 + i, 1, 0], 0, MeasureTime(4 + (13 + i)/4), 0, "linear", EasingType[0], false);
                Chart_Setting.DragNote().Eva(70 + i, true, MeasureTime(4 + (13 + i)/4));
            }

            break;
        case 96:

            Chart_Setting.LongNote().Eva(12, true, MeasureTime(4), 0);

            for (let i = 0; i != 5; i++) Chart_Setting.Note().Eva(96 + i, true, MeasureTime((3 * i)/4));

            Chart_Setting.LongNote().Add(2, 0, 0, 0);
            Chart_Setting.LongNote().Typically(101, MeasureTime(4), 0, MeasureTime(32), -350, -600, 0);

            for (let i = 0; i != 31; i++) Chart_Setting.DragNote().Add(2, 0, 0, 0);
            Easing_Cooperation_Option.DragNote().EasingMoveX(73, 103, ["LongNote", 101, 0, 0], ["LongNote", 101, 0, 700], 0, 0, 0, 0, "linear", function(dt) {
                return 1/2 * Math.sin(Math.PI * (dt - (1/2))) + 1/2
            }, [0]);
            Easing_Cooperation_Option.DragNote().EasingMoveY(73, 103, ["LongNote", 101, 1, 0], ["LongNote", 101, 1, -4800], 0, 0, 0, 0, "linear", function(dt) {
                return dt
            }, [0]);
            for (let i = 0; i != 31; i++) Chart_Setting.DragNote().MoveY(73 + i, ["DragNote", 73 + i, 1, 0], 0, MeasureTime(5 + i), 0, "linear", EasingType[0], false);

            break;
        case 100:

            Chart_Setting.LongNote().MoveX(101, ["LongNote", 101, 0, 0], ["LongNote", 101, 0, 700], MeasureTime(32), 0, function() {
                return function(dt) {
                    return 1/2 * Math.sin(Math.PI * (dt - (1/2))) + 1/2
                }
            }, EasingType[0], false);
            Chart_Setting.LongNote().Eva(101, true, MeasureTime(32), 0);

            for (let i = 0; i != 31; i++) Chart_Setting.DragNote().Eva(73 + i, true, MeasureTime(1 + i));

            break;
        case 112:

            for (let i = 0; i != 24; i++) {
                Chart_Setting.Note().Add(2, 0, 0, 0);

                if (i % 3 == 0) {
                    Chart_Setting.Note().Typically(102 + i, MeasureTime(4 + (i/3)), 0, -350, -600 - 150 * (i/3), 0);
                    Chart_Setting.Note().Eva(102 + i, true, MeasureTime(4 + (i/3)));
                } else if (i % 3 == 1) {
                    Chart_Setting.Note().Typically(102 + i, MeasureTime(4 + (1/2) + (i - 1)/3), 0, -350, -600 - 150 * (1/2) - 150 * (i - 1)/3, 0);
                    Chart_Setting.Note().Eva(102 + i, true, MeasureTime(4 + (1/2) + (i - 1)/3));
                } else if (i % 3 == 2) {
                    Chart_Setting.Note().Typically(102 + i, MeasureTime(4 + (3/4) + (i - 2)/3), 0, -350, -600 - 150 * (3/4) - 150 * (i - 2)/3, 0);
                    Chart_Setting.Note().Eva(102 + i, true, MeasureTime(4 + (3/4) + (i - 2)/3));
                }
            }

            break;
        case 120:

            for (let i = 0; i != 16; i++) {
                Chart_Setting.Note().Add(2, 0, 0, 0);

                Chart_Setting.Note().Typically(126 + i, MeasureTime(4 + (i/4)), 0, -350, -600 - 150 * (i/4), 0);
                Chart_Setting.Note().Eva(126 + i, true, MeasureTime(4 + (i/4)));

            }

            break;
        case 124:

            for (let i = 0; i != 32; i++) {
                Chart_Setting.DragNote().Add(2, 0, 0, 0);
                Chart_Setting.DragNote().Typically(104 + i, MeasureTime(4 + (i/8)), 0, -350, -600 - 150 * i, 0);
                if (i < 24) Chart_Setting.DragNote().Eva(104 + i, true, MeasureTime(4 + (i/8)));
            }

            break;
        case 131:

            for (let i = 0; i != 8; i++) {
                Chart_Setting.DragNote().MoveX(128 + i, ["DragNote", 128 + i, 0, 0], ["DragNote", 128 + i, 0, (-50 + 100 * (i%2)) * i], MeasureTime(3), 0, "easeOutQuad", EasingType[0], false);
                Chart_Setting.DragNote().MoveY(128 + i, ["DragNote", 128 + i, 1, 0], ["DragNote", 128 + i, 1, 1000], MeasureTime(3), 0, "easeInQuad", EasingType[0], false);
                Chart_Setting.DragNote().Angle(128 + i, ["DragNote", 128 + i, 2, 0], ["DragNote", 128 + i, 2, (-8 + 16 * (i%2)) * i], MeasureTime(3), 0, "easeOutSine", EasingType[0], false);
            }

            Chart_Setting.LongNote().Opacity(1, 0, 0, 0, 0, "linear", EasingType[0], false);

            Chart_Setting.LongNote().Angle(3, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Length(3, 300, 300, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(3, -660, -660, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(3, 1000, 1000, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Angle(4, 0, 0, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().Length(4, 300, 300, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveX(4, 660, 660, 0, 0, "linear", EasingType[0], false);
            Chart_Setting.LongNote().MoveY(4, 1000, 1000, 0, 0, "linear", EasingType[0], false);

            break;
        case 300:

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