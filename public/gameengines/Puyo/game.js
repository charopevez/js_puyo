// 起動されたときに呼ばれる関数を登録する
window.addEventListener("load", () => {
    // まずステージを整える
    initialize();
    // ゲームを開始する
    loop();
});

let phase; // ゲームの現在の状況
let frame; // ゲームの現在フレーム（1/60秒ごとに1追加される）

function initialize() {
    //ゲームを設定する
    Settings.initialize();
    // ステージを準備する
    Board.initialize();
    // ユーザー操作の準備をする
    Player.initialize();
    // スコア表示の準備をする
    Score.initialize();
    // ゲーム状態を初期化
    phase = [0, 0];
    // フレームを初期化する
    frame = 0;
}


function loop() {

    for (var i = 0; i < 2; i++) {
        //ゲーム状態を判定
        switch (phase[i]) {
            case 0:
                //ゲームスタート
                console.log("stage " + i + " start");
                phase[i] = 1; //プヨの転落に進む
                break;


            // #region Board管理
            case 1:
                //プヨが転落かどうか判定する
                console.log("stage " + i + " falling check");
                if (Board.isPuyoFalling(i)) {
                    //転落状態の場合は転落を確認して次のステップに進む(第二状態に進む)
                    phase[i] = 2;
                } else {
                    //転落した場合プヨ削除のステップに進む(第三状態に進む)
                    phase[i] = 3;
                }
                break;
            case 2:
                //プヨ移動して、転落したまで状態
                if (Board.isPuyoFallen(frame, i)) {
                    // すべて落ちきったら、ぷよを消せるかどうか判定する
                    phase[i] = 3;
                }
                break;
            case 3:
                // 消せるかどうか判定する
                const isErased = Board.isPuyoErased(frame, i);
                console.log("stage " + i + " erase check");
                if ( isErased ){
                    //消せたの場合
                    phase[i] = 4;
                } else {
                    /// 消せなかったら、新しいぷよを登場させる
                    phase[i] = 10;
                }
                break;
                
            case 4:
                //プヨ削除
                console.log("stage " + i + " erasing");
                if (RenderEngine.renderPuyoErase(frame, i)) {
                    //// 消し終わったら、再度落ちるかどうか判定する(第一状態に戻る)
                    phase[i] = 1;
                }
                break;
            case 9:
                // ゲーム終了画面の準備をする
                console.log("stage " + i + " prepare result");
                phase[i] = -1;
                Board.generateResult(frame, i) // ゲーム終了画面の準備をする
                break;

            // #endregion 


            // #region オブジェクトイベント管理
            case 10:
                //新しいプヨ画像表示
                console.log("stage " + i + " next Puyo");
                if (Board.nextPuyo(i)) {
                    // プレイヤーが操作可能(第二十状態に進む)
                    phase[i] = 20;
                } else {
                    // 次のプヨを作成出来なかったら、ゲームオーバー(第九状態に進む)
                    //phase[1-i]=9; //相手のゲームを終わらせる
                    phase[i] = 9;
                }
                break;
            // #endregion


            // #region ユーザー動作管理
            case 20:
                // プレイヤーが操作する
                const action = [0, 0];
                console.log("stage " + i + " checking user actions");
                action[i]= Board.actionOnField(i);
                //操作判定
                phase[i] = action[i];
            case 21:
                //プヨを移動
                console.log("stage " + i + " user moving puyo");
                if (Board.isMoving(i)) {
                    //プヨ移動して、プレイヤーが操作ステップに戻る
                    phase[i] = 20;
                }
                break;
            case 22:
                //プヨを曲がって、プレイヤーが操作ステップに戻る
                console.log("stage " + i + " user rotating puyo");
                if (Board.isRotating(i)) {
                    //プヨ移動して、プレイヤーが操作ステップに戻る
                    phase[i] = 20;
                }
                break;
            case 23:
                //// 現在の位置でぷよを固定する
                Board.fix(i);
                // 現在のぷよをステージ上に配置して、まず自由落下を確認する(第二状態に戻る)
                phase[i] = 2;
                break;
            // #endregion


            case -1:
                //ゲームを終了
                console.log("stage " + i + " display result");
                Board.renderResult(frame); //結果アニメーションを表示
                break;
        }
    }
    frame++;
    if (frame%60==0) console.log(frame/60+"second");
    if(phase[1]!=-1) {
    requestAnimationFrame(loop); // 1/60秒後にもう一度呼び出す
    }
}