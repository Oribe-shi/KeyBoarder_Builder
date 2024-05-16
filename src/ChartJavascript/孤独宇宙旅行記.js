//以下は、それぞれの譜面情報関数の説明です

//Chart_Setting  フレームや判定枠、ノーツ等を追加したり、単体で移動させたいときに使います
//Current_Value　フレームや判定枠、ノーツ等の現在の情報を取得します(X座標、Y座標、角度、拡大率、透明度)
//Easing_Cooperation_Option　複数のフレームや判定枠、ノーツ等をそれぞれ特定のイージング関数の値で配置します

//推奨X座標範囲[-440 < 0(中心) < 440]・推奨Y座標範囲[-250 < 0(中心) < 250]
//判定枠とフレームは曲が終了すると全て削除されるため、邪魔なとき以外は削除しなくても問題はない
//※注意　同時押しの場合、ワードフリーノーツは最初(ワードノーツより上の行)に

VideoExist("rgb(0,0,50)");
Music = Object.keys(MusicNameList).indexOf("孤独宇宙旅行記");
AllCOMBO = 777; //全コンボ数
BPMList = {
    BPM: [136],
    TIME: [0]
}; //曲のテンポ
Time = Date.now() + Math.floor(ChartMusic[Music].duration * 1000);
Past = 0;
PastFrag = true;
Measure = MeasureTime(Past, Past + 1, BPMList);
ChartMusic[Music].currentTime = 0;

NowRhythm = Date.now();
NextRhythm = Date.now() + Measure;

//ここまでは必須項目(消さないように!)

function PastTime() {
    function SampleSet() {
        //同じような構成が続く場合、ここにそのテンプレート関数を作っておくと便利かも
    }
    if(NowRhythm >= NextRhythm) {
        Past++;    
        NextRhythm += Measure;
        PastFrag = true;
    } else {
        NowRhythm = Date.now();
    }
    if (PastFrag) {
        switch (OtherData.SetDifficulty) {
            //難易度0
            case 0:
                switch (Past) {
                    case [拍番号(手動)]:

                        function Create_Notes() {
                            //ここに追加したいノーツ・判定枠を全て書く(途中で追加することも可能ですが、動作が重くなる可能性あり)
                        }
                        Create_Notes();

                        function initial_Position() {
                            //初期位置をここで設定する
                        }
                        initial_Position();

                        //ここに譜面情報を書いていく
                        ChartMusic[Music].play(); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる
                    
                        PastFrag = false; //拍の終了
                        break;

                    case [拍番号(手動)]:

                        //ここに譜面情報を書いていく
                    
                        PastFrag = false; //拍の終了
                        break;

                    case [拍番号(手動)]:

                        //ここに譜面情報を書いていく

                        PastFrag = false; //拍の終了
                        break;
                }
                break;
            //難易度1
            case 1:
                switch (Past) {
                    case [拍番号(手動)]:

                        function Create_Notes() {
                            //ここに追加したいノーツ・判定枠を全て書く(途中で追加することも可能ですが、動作が重くなる可能性あり)
                        }
                        Create_Notes();

                        function initial_Position() {
                            //初期位置をここで設定する
                        }
                        initial_Position();

                        //ここに譜面情報を書いていく
                        ChartMusic[Music].play(); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる
                    
                        PastFrag = false; //拍の終了
                        break;

                    case [拍番号(手動)]:

                        //ここに譜面情報を書いていく
                    
                        PastFrag = false; //拍の終了
                        break;

                    case [拍番号(手動)]:

                        //ここに譜面情報を書いていく

                        PastFrag = false; //拍の終了
                        break;
                }
                break;
            //難易度2
            case 2:
                switch (Past) {
                    case [拍番号(手動)]:

                        function Create_Notes() {
                            //ここに追加したいノーツ・判定枠を全て書く(途中で追加することも可能ですが、動作が重くなる可能性あり)
                        }
                        Create_Notes();

                        function initial_Position() {
                            //初期位置をここで設定する
                        }
                        initial_Position();

                        //ここに譜面情報を書いていく
                        ChartMusic[Music].play(); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる
                    
                        PastFrag = false; //拍の終了
                        break;

                    case [拍番号(手動)]:

                        //ここに譜面情報を書いていく
                    
                        PastFrag = false; //拍の終了
                        break;

                    case [拍番号(手動)]:

                        //ここに譜面情報を書いていく

                        PastFrag = false; //拍の終了
                        break;
                }
                break;
            //難易度3
            case 3:
                switch (Past) {
                    case 1:

                        function Sample_FirstNotes(n,x) {
                            //同じような構成が続く場合、ここにそのテンプレート関数を作っておくと便利かも
                        
                            for (let i = 0; i != 3; i++) {
                                Chart_Setting.Note().MoveX(i+n,x,x,0,0,"linear",EasingType[0],false);
                                Chart_Setting.Note().MoveY(i+n,-450,200,4*Measure,i*1.5*Measure,"linear",EasingType[0],false);
                            }
                        
                        }
                    
                        function Sample_Fire_Start() {
                        
                            Chart_Setting.DragNote().MoveY(1,-55,115,650,150,"linear",EasingType[0],true);
                            Chart_Setting.DragNote().Opacity(1,1,0,650,150,"linear",EasingType[0],true);
                            Chart_Setting.DragNote().MoveY(2,-55,125,500,254,"linear",EasingType[0],true);
                            Chart_Setting.DragNote().Opacity(2,1,0,500,254,"linear",EasingType[0],true);
                            Chart_Setting.DragNote().MoveY(3,-55,135,720,129,"linear",EasingType[0],true);
                            Chart_Setting.DragNote().Opacity(3,1,0,720,129,"linear",EasingType[0],true);
                            Chart_Setting.DragNote().MoveY(4,-55,105,600,217,"linear",EasingType[0],true);
                            Chart_Setting.DragNote().Opacity(4,1,0,600,217,"linear",EasingType[0],true);
                        
                        }
                    
                        function Sample_CloudDown(n,x,t,d) {
                        
                            Chart_Setting.DragNote().MoveX(n+12,x,x,0,0,"linear",EasingType[0],false);
                            Chart_Setting.DragNote().MoveY(n+12,-450,450,t,d,"linear",EasingType[0],false);
                        
                        }
                    
                        function Sample_CloudDownLong(n,h,a,t,d) {
                        
                            Chart_Setting.LongNote().MoveX(n+24,a*800,a*800,0,0,"linear",EasingType[0],false);
                            Chart_Setting.LongNote().MoveY(n+24,-450,450,t,d,"linear",EasingType[0],false);
                            Chart_Setting.LongNote().Angle(n+24,-a*90,-a*90,0,0,"linear",EasingType[0],false);
                            Chart_Setting.LongNote().Length(n+24,h,h,0,0,"linear",EasingType[0],false);
                        
                        }
                    
                        function Sample_CloudDownFrame(n,x,a,t,d) {
                        
                            Chart_Setting.Frame().MoveX(n,x,x,0,0,"linear",EasingType[0],false);
                            Chart_Setting.Frame().MoveY(n,-650,450,t,d,"linear",EasingType[0],false);
                            Chart_Setting.Frame().Angle(n,a,a,0,0,"linear",EasingType[0],false);
                        
                        }

                        function Create_Notes() {
                            //ここに追加したいノーツ・判定枠を全て書く(途中で追加することも可能ですが、動作が重くなる可能性あり)
                        
                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.Frame().Add_Remove(0,i+1,0);
                            }
                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.Frame().Add_Remove(1,i+1,0);
                            }
                        
                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.DragNote().Add(2,0,0,false,640*Measure);
                            }
                        
                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.DragNote().Add(2,0,0,false,640*Measure);
                            }
                        
                            Chart_Setting.JudgementFrame().Add_Remove(2,1,0);
                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.JudgementFrame().Add_Remove(i+5,1,0);
                            }
                        
                            Chart_Setting.LongNote().Add(1,0,0,false,320*Measure,0);
                            Chart_Setting.LongNote().Add(2,0,0,false,640*Measure,0);
                        
                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.DragNote().Add(2,0,0,false,640*Measure);
                            }
                        
                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.DragNote().Add(4,0,0,false,640*Measure);
                            }
                        
                            for (let j = 0; j != 3; j++) {
                                for (let i = 0; i != 3; i++) {
                                    Chart_Setting.Note().Add(1,0,0,true,(20+4*j+1.5*i)*Measure);
                                }
                            }
                            Chart_Setting.Note().Add(1,0,0,true,34.5*Measure);
                            Chart_Setting.DragNote().Add(1,0,0,true,35*Measure);
                            Chart_Setting.DragNote().Add(1,0,0,true,35.5*Measure);
                            for (let j = 0; j != 2; j++) {
                                for (let i = 0; i != 3; i++) {
                                    Chart_Setting.Note().Add(1,0,0,true,(36+4*j+1.5*i)*Measure);
                                }
                            }
                            Chart_Setting.Note().Add(1,0,0,true,44*Measure);
                            Chart_Setting.Note().Add(1,0,0,true,45.5*Measure);
                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.LongNote().Add(1,0,0,true,(36+4*i)*Measure,(3+Math.floor(i/3))*Measure);
                            }
                        
                            for (let i = 0; i != 6; i++) {
                                Chart_Setting.LongNote().Add(3,0,0,false,640*Measure,0);
                            }
                        
                            for (let i = 0; i != 6; i++) {
                                Chart_Setting.LongNote().Add((i%4)+5,0,0,true,(56+4*i)*Measure,4*Measure);
                            }
                        
                            for (let i = 0; i != 128; i++) {
                                Chart_Setting.DragNote().Add(2,0,0,true,(80+i/8)*Measure);
                            }
                        
                        }
                        Create_Notes();
                        function initial_Position() {
                            //初期位置をここで設定する
                        
                            Chart_Setting.Frame().MoveX(1,0,1000,0,0,"linear",EasingType[0],false);
                            Chart_Setting.Frame().MoveX(2,0,1000,0,0,"linear",EasingType[0],false);
                            Chart_Setting.Frame().MoveY(2,0,195,0,0,"linear",EasingType[0],false);
                            Chart_Setting.Frame().MoveX(4,-180,-180,0,0,"linear",EasingType[0],false);
                            Chart_Setting.Frame().MoveY(4,-240,-220,36*Measure,0,function(temp, i, total) {
                                return function(dt) {
                                    return (1/2)*Math.sin(Math.PI*((8*dt)-1/2))+(1/2)
                                }
                            },EasingType[0],false);
                            Chart_Setting.Frame().Opacity(4,0.5,0.5,0,0,"linear",EasingType[0],false);
                        
                            Chart_Setting.LongNote().MoveX(1,-1700,-1700,0,0,"linear",EasingType[0],false);
                            Chart_Setting.LongNote().MoveY(1,250,250,0,0,"linear",EasingType[0],false);
                            Chart_Setting.LongNote().Angle(1,90,90,0,0,"linear",EasingType[0],false);
                            Chart_Setting.LongNote().Length(1,3000,3000,0,0,"linear",EasingType[0],false);
                        
                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.DragNote().MoveX(i+1,0,-22.5+(i*15),0,0,"linear",EasingType[0],false);
                                Chart_Setting.DragNote().MoveY(i+1,0,55,0,0,"linear",EasingType[0],false);
                                Chart_Setting.DragNote().Angle(i+1,0,90,0,0,"linear",EasingType[0],false);
                            }
                        
                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.JudgementFrame().MoveX(i+1+1,0,-420+((i+Math.floor(i/2))*210),0,0,"linear",EasingType[0],false);
                                Chart_Setting.JudgementFrame().MoveY(i+1+1,0,200,0,0,"linear",EasingType[0],false);
                            }
                        
                            Chart_Setting.JudgementFrame().MoveX(1,0,0,0,0,"linear",EasingType[0],false);
                            Chart_Setting.JudgementFrame().MoveY(1,0,0,0,0,"linear",EasingType[0],false);
                        
                            Chart_Setting.LongNote().MoveX(2,0,0,0,0,"linear",EasingType[0],false);
                            Chart_Setting.LongNote().MoveY(2,0,0,0,0,"linear",EasingType[0],false);
                            Chart_Setting.LongNote().Length(2,140,140,0,0,"linear",EasingType[0],false);
                        
                            for (let i = 0; i != 2; i++) {
                                Chart_Setting.DragNote().MoveX(i+4+1,0,-40+(i*80),0,0,"linear",EasingType[0],false);
                                Chart_Setting.DragNote().MoveY(i+4+1,0,-25,0,0,"linear",EasingType[0],false);
                                Chart_Setting.DragNote().Angle(i+4+1,0,-45+(i*90),0,0,"linear",EasingType[0],false);
                            }
                            for (let i = 0; i != 2; i++) {
                                Chart_Setting.DragNote().MoveX(i+6+1,0,-33+(i*66),0,0,"linear",EasingType[0],false);
                                Chart_Setting.DragNote().MoveY(i+6+1,0,5,0,0,"linear",EasingType[0],false);
                            }

                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.DragNote().MoveX(i+8+1,0,-25+((i%2)*50),0,0,"linear",EasingType[0],false);
                                Chart_Setting.DragNote().MoveY(i+8+1,0,-150+24*Math.floor(i/2),0,0,"linear",EasingType[0],false);
                                Chart_Setting.DragNote().Angle(i+8+1,0,-45+(i*90),0,0,"linear",EasingType[0],false);
                            }
                        
                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.DragNote().MoveX(i+12+1,0,0,0,0,"linear",EasingType[0],false);
                                Chart_Setting.DragNote().MoveY(i+12+1,0,0,0,0,"linear",EasingType[0],false);
                                Chart_Setting.DragNote().Angle(i+12+1,0,45+i*45,0,0,"linear",EasingType[0],false);
                            }
                        
                            for (let i = 0; i != 18; i++) {
                                Chart_Setting.Note().MoveY(i+2+1,1000,1000,0,0,"linear",EasingType[0],false);
                            }
                            for (let i = 0; i != 2; i++) {
                                Chart_Setting.DragNote().MoveY(i+16+1,1000,1000,0,0,"linear",EasingType[0],false);
                            }
                            for (let i = 0; i != 4; i++) {
                                Chart_Setting.LongNote().MoveY(i+20+1,1000,1000,0,0,"linear",EasingType[0],false);
                            }
                        
                            for (let i = 0; i != 12; i++) {
                                Chart_Setting.LongNote().MoveY(i+24+1,1000,1000,0,0,"linear",EasingType[0],false);
                            }
                        
                            for (let i = 0; i != 128; i++) {
                                Chart_Setting.DragNote().MoveX(i+18+1,0,0,0,0,"linear",EasingType[0],false);
                                Chart_Setting.DragNote().MoveY(i+18+1,0,5,0,0,"linear",EasingType[0],false);
                                Chart_Setting.DragNote().Opacity(i+18+1,0,0,0,0,"linear",EasingType[0],false);
                                Chart_Setting.DragNote().Angle(i+18+1,0,180,0,0,"linear",EasingType[0],false);
                            }
                        
                        }
                        initial_Position();
                        //ここに譜面情報を書いていく
                    
                        PastFrag = false; //拍の終了
                        break;

                    case 5:

                        //ここに譜面情報を書いていく
                        ChartMusic[Music].play(); //ここで曲が開始されるので、開始と同時にノーツを降らせたい場合はこれを開始させたい箇所に移動させる
                        Chart_Setting.Frame().MoveX(1,1000,0,36*Measure,0,"easeInOutSine",EasingType[0],false);
                        Chart_Setting.Frame().MoveX(2,1000,0,36*Measure,0,"easeInOutSine",EasingType[0],false);
                        Chart_Setting.Frame().MoveX(4,-180,-1180,36*Measure,0,"easeInOutSine",EasingType[0],false);

                        Chart_Setting.Frame().Opacity(3,0.7,0.2,80*Measure-8,0,function(temp, i, total) {
                            return function(dt) {
                                return 80*dt-Math.floor(80*dt)
                            }
                        },EasingType[0],false);
                        Chart_Setting.Frame().Opacity(4,1,0.5,80*Measure-8,0,function(temp, i, total) {
                            return function(dt) {
                                return 80*dt-Math.floor(80*dt)
                            }
                        },EasingType[0],false);
                    
                        Sample_Fire_Start();
                    
                        PastFrag = false; //拍の終了
                        break;

                    case 17:

                        //ここに譜面情報を書いていく

                        Sample_FirstNotes(3,-420);

                        PastFrag = false; //拍の終了
                        break;

                    case 21:

                        //ここに譜面情報を書いていく

                        Sample_FirstNotes(6,-210);

                        PastFrag = false; //拍の終了
                        break;

                    case 25:

                        //ここに譜面情報を書いていく

                        Sample_FirstNotes(9,-420);

                        PastFrag = false; //拍の終了
                        break;

                    case 31:

                        //ここに譜面情報を書いていく

                        Chart_Setting.Note().MoveX(12,210,210,0,0,"linear",EasingType[0],false);
                        Chart_Setting.Note().MoveY(12,-450,200,4*Measure,0.5*Measure,"linear",EasingType[0],false);
                        Chart_Setting.DragNote().MoveX(17,210,210,0,0,"linear",EasingType[0],false);
                        Chart_Setting.DragNote().MoveY(17,-450,200,4*Measure,Measure,"linear",EasingType[0],false);
                        Chart_Setting.DragNote().MoveX(18,210,210,0,0,"linear",EasingType[0],false);
                        Chart_Setting.DragNote().MoveY(18,-450,200,4*Measure,1.5*Measure,"linear",EasingType[0],false);

                        PastFrag = false; //拍の終了
                        break;

                    case 33:

                        //ここに譜面情報を書いていく

                        Sample_FirstNotes(13,420);
                        Chart_Setting.LongNote().Typically(21,4*Measure,0,3*Measure,-210,-450,200);

                        PastFrag = false; //拍の終了
                        break;
                    
                    case 37:

                        //ここに譜面情報を書いていく
            
                        Sample_FirstNotes(16,210);
                        Chart_Setting.LongNote().Typically(22,4*Measure,0,3*Measure,-420,-450,200);
            
                        PastFrag = false; //拍の終了
                        break;

                    case 41:

                        //ここに譜面情報を書いていく
            
                        Chart_Setting.Note().MoveX(19,420,420,0,0,"linear",EasingType[0],false);
                        Chart_Setting.Note().MoveY(19,-450,200,4*Measure,0,"linear",EasingType[0],false);
                        Chart_Setting.Note().MoveX(20,420,420,0,0,"linear",EasingType[0],false);
                        Chart_Setting.Note().MoveY(20,-450,200,4*Measure,1.5*Measure,"linear",EasingType[0],false);
                        Chart_Setting.LongNote().Typically(23,4*Measure,0,3*Measure,-210,-450,200);
            
                        PastFrag = false; //拍の終了
                        break;

                    case 44:

                        //ここに譜面情報を書いていく
            
                        Chart_Setting.Frame().MoveY(2,195,-1500,14*Measure,0,"easeInSine",EasingType[0],false);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 45:

                        //ここに譜面情報を書いていく
            
                        Chart_Setting.LongNote().Typically(24,4*Measure,0,4*Measure,-420,-450,200);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 50:

                        //ここに譜面情報を書いていく
            
                        Chart_Setting.Frame().MoveY(1,0,200,6*Measure,0,"easeInSine",EasingType[0],false);
            
                        Chart_Setting.Frame().MoveX(4,0,0,0,0,"linear",EasingType[0],false);
                        Chart_Setting.Frame().MoveY(4,0,0,0,0,"linear",EasingType[0],false);
                        for (let i = 0; i != 4; i++) {
                            Chart_Setting.DragNote().MoveX(i+12+1,0,0,0,0,"linear",EasingType[0],false);
                            Chart_Setting.DragNote().MoveY(i+12+1,0,1000,0,0,"linear",EasingType[0],false);
                            Chart_Setting.DragNote().Angle(i+12+1,0,0,0,0,"linear",EasingType[0],false);
                        }
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 51:

                        //ここに譜面情報を書いていく
            
                        for (let i = 0; i != 4; i++) {
                            Chart_Setting.JudgementFrame().MoveX(i+2,Current_Value.JudgeFrame_Value(i+2)[0],0,10,2*Measure,"linear",EasingType[0],false);
                            Chart_Setting.JudgementFrame().MoveY(i+2,Current_Value.JudgeFrame_Value(i+2)[1],0,10,2*Measure,"linear",EasingType[0],false);
            
                            Chart_Setting.Frame().MoveY(i+5,Current_Value.Frame_Value(i+5)[1],-650,10,2*Measure,"linear",EasingType[0],false);
                        }
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 53:

                        //ここに譜面情報を書いていく
            
                        Chart_Setting.LongNote().Typically(31,4*Measure,0,4*Measure,0,-450,0);
                        Sample_CloudDownFrame(5,170,0,4000,0);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 54:

                        //ここに譜面情報を書いていく
            
                        Chart_Setting.Frame().MoveY(2,450,80,10*Measure,0,"easeOutSine",EasingType[0],false);
            
                        Sample_CloudDown(1,-150,1800,0);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 56:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDown(2,250,1600,150);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 57:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDown(3,-80,2000,0);
            
                        Chart_Setting.LongNote().Typically(32,4*Measure,0,4*Measure,0,-450,0);
                        Sample_CloudDownFrame(6,-340,0,4000,0);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 58:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDown(4,180,1900,360);
                        Sample_CloudDown(1,-260,1700,1000);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 60:
                        //ここに譜面情報を書いていく
            
                        Sample_CloudDown(2,30,1600,540);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 61:

                        //ここに譜面情報を書いていく
            
                        Chart_Setting.LongNote().Typically(33,4*Measure,0,4*Measure,0,-450,0);
                        Sample_CloudDownFrame(7,130,0,4000,0);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 63:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDownLong(5,490,-1,2100,265);
                        Sample_CloudDown(3,-130,2000,0);
                        Sample_CloudDown(4,200,1900,120);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 65:

                        //ここに譜面情報を書いていく
            
                        Chart_Setting.Frame().MoveY(2,80,160,8*Measure,0,"easeInSine",EasingType[0],false);
            
                        Sample_CloudDown(1,290,1900,0);
                        Sample_CloudDown(2,-380,1800,400);
            
                        Chart_Setting.LongNote().Typically(34,4*Measure,0,4*Measure,0,-450,0);
                        Sample_CloudDownFrame(8,300,0,4000,0);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 66:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDownLong(6,590,1,1900,365);
                        Sample_CloudDown(3,-20,1800,0);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 67:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDown(4,-180,1700,160);
                        
                        PastFrag = false; //拍の終了
                        break;

                    case 68:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDown(1,330,1500,400);
                    
                        PastFrag = false; //拍の終了
                        break;

                    case 69:

                        //ここに譜面情報を書いていく
            
                        Chart_Setting.LongNote().Typically(35,4*Measure,0,4*Measure,0,-650,0);
                        Sample_CloudDownFrame(5,-240,0,3900,0);
                    
                        PastFrag = false; //拍の終了
                        break;

                    case 70:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDown(2,-290,1800,0);
                    
                        PastFrag = false; //拍の終了
                        break;

                    case 71:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDownLong(1,600,1,1800,0);
                        Sample_CloudDown(4,-210,1900,100);
                    
                        PastFrag = false; //拍の終了
                        break;

                    case 73:

                        //ここに譜面情報を書いていく
            
                        Chart_Setting.Frame().MoveY(2,160,240,7*Measure,0,"easeOutSine",EasingType[0],false);
            
                        Sample_CloudDownLong(2,500,-1,1700,420);
                        Sample_CloudDownLong(3,850,-1,1700,560);
                        Sample_CloudDown(3,-320,1600,0);
            
                        Chart_Setting.LongNote().Typically(36,4*Measure,0,4*Measure,0,-850,0);
                        Sample_CloudDownFrame(6,-140,0,3800,0);
                    
                        PastFrag = false; //拍の終了
                        break;

                    case 75:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDownLong(4,650,1,1600,0);
                        Sample_CloudDownLong(5,400,1,1600,130);
                        Sample_CloudDown(1,-270,1400,200);
                        Sample_CloudDown(2,-310,1300,420);
                    
                        PastFrag = false; //拍の終了
                        break;
                        
                        case 77:
                            
                        //ここに譜面情報を書いていく
            
                        Sample_CloudDownLong(6,1000,-1,1700,0);
                        Sample_CloudDownLong(1,1200,-1,1700,165);
                        Sample_CloudDownLong(2,800,-1,1700,330);
                        Sample_CloudDown(3,295,1600,600);
                    
                        PastFrag = false; //拍の終了
                        break;

                    case 78:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDown(4,-100,1550,250);
                    
                        PastFrag = false; //拍の終了
                        break;

                    case 79:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDownLong(3,750,-1,1400,160);
                        Sample_CloudDownLong(4,900,-1,1400,320);
                        Sample_CloudDown(1,330,1150,250);
                    
                        PastFrag = false; //拍の終了
                        break;

                    case 80:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDownLong(5,320,1,1100,140);
                        Sample_CloudDownLong(6,480,1,1100,230);
                        Sample_CloudDown(2,-230,1200,410);
                        Sample_CloudDown(3,-30,1000,710);
                    
                        PastFrag = false; //拍の終了
                        break;

                    case 82:

                        //ここに譜面情報を書いていく
            
                        Sample_CloudDownLong(1,650,-1,800,0);
                        Sample_CloudDownLong(2,810,-1,800,100);
                        Sample_CloudDown(4,260,950,50);
            
                        Sample_CloudDownLong(3,750,1,750,400);
                        Sample_CloudDownLong(4,1000,1,750,480);
                        Sample_CloudDownLong(5,850,1,750,560);
                    
                        PastFrag = false; //拍の終了
                        break;
            
                    case 83:

                        //ここに譜面情報を書いていく
            
                        Chart_Setting.Frame().MoveY(2,240,80,2*Measure,0,"easeInSine",EasingType[0],false);
            
                        Chart_Setting.LongNote().MoveY(1,-650,450,700,500,"linear",EasingType[0],false);
                    
                        PastFrag = false; //拍の終了
                        break;

                    case 85:
                        //ここに譜面情報を書いていく
            
                        Chart_Setting.Frame().MoveY(2,80,-200,3*Measure,0,"easeOutSine",EasingType[0],false);
                    
                        PastFrag = false; //拍の終了
                        break;
                }
                break;
        }
        if (NowRhythm > Time) { //テストプレイ時は　Past == [曲の終了拍番号(手動)]
            ChartInit(Music+1);
            clearInterval(ChartMode);
            PastFrag = false;
        }
    }
}
ChartMode = setInterval(PastTime, 0);