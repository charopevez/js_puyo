class Board {
    // static plField1;
    // static plField2;
    // static plHint1;
    // static plHint2;
    // static plScore1;
    // static plScore2;


    static initialize() {
        // HTML からステージの元となる要素を取得し、大きさを設定する
        // 
        // const plField1 = document.getElementsByClassName("plfield")[0];
        // const plHint1 = document.getElementsByClassName("plHint")[0];
        // const plScore1 = document.getElementsByClassName("plScore")[0];
        // this.plField1=plField1;
        // this.plHint1=plHint1;
        // this.plScore1=plScore1;
        // if (Settings.getMode()) {
        //     const plField2 = document.getElementsByClassName("field"+Settings.getMode())[0];
        //     const plHint1=document.getElementsByClassName("plHint"+Settings.getMode())[0];
        //     const plScore1=document.getElementsByClassName("plScore"+Settings.getMode())[0];
        //     this.plField2=plField1;
        //     this.plHint2=plHint1;
        //     this.plScore2=plScore1;
        // }

        const GameScreen = document.getElementById('game');
        var canvas = RenderEngine.createGameScreen(Settings.screenWidth, Settings.screenHeight);
        GameScreen.appendChild(canvas);
        RenderEngine.renderGameField();
        RenderEngine.renderHint();


        // メモリを準備する
        this.board = [
            [
                [0, 0, 1, 0, 0, 0],
                [0, 0, 2, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
            ],
            [
                [0, 2, 3, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 1, 3, 0, 0, 0],
                [0, 2, 2, 0, 0, 0],
                [0, 3, 1, 0, 0, 0],
                [0, 5, 2, 0, 0, 0],
                [0, 3, 3, 0, 0, 0],
            ]
        ];
        this.fallingPuyo = new Array(4);

    }
    //#region 状態functions

    /**
     * @param gField ゲームステージ番号
     */
    //次ぷよを作成し
    static generatePuyo(gField) {
        this.nextPuyou = Puyo.generatePuyo;
    }

    /**
    * @param gField ゲームステージ番号
    */
    // ぷよ配置する
    static nextPuyo(gField) {

    }

    /**
     * @param gField ゲームステージ番号
     */
    static isPuyoFalling(gField) {
        var isFalling = false;
        let puyoCell = 0;
        //const field = JSON.parse(JSON.stringify(this.board[gField]));
        //gField検索
        for (let i = Settings.rows - 2; i >= 0; i--) {
            //行検査
            const row = this.board[gField][i];
            for (let y = 0; y < row.length; y++) {
                //セール検査
                if (this.board[gField][i][y] == 0) {
                    //プヨなければ次
                    continue;
                }
                if (this.board[gField][i + 1][y] == 0) {
                    // このぷよは落ちるので、取り除く
                    let cell = this.board[gField][i][y];
                    this.board[gField][i][y] = 0;
                    let dstCell = i;
                    while (dstCell + 1 < Settings.rows && this.board[gField][dstCell + 1][y] == 0) {
                        dstCell++;
                    }
                    // 最終目的地に置く
                    this.board[gField][dstCell][y] = -1;
                    // 落ちるリストに入れる
                    this.fallingUpdate(2 * gField + puyoCell, {
                        object: cell,
                        row: i,
                        destinationRow: dstCell,
                        falling: true
                    });
                    puyoCell++;
                    //落ちるものがあったことを記録しておく
                    isFalling = true;
                }
            }

        }
        console.log(this.board[gField]);
        return isFalling;

    }

    /**
    * @param gField ゲームステージ番号
    */
    static isPuyoFallen(frame, gField) {
        if (frame % Settings.freeFallingSpeed == 0) {
            console.log("stage " + gField + " fall confirmation");
            var isFallen = true;
            for (var i = 2 * gField; i < 2 * gField + 2; i++) {
                console.log(this.fallingPuyo[i]);
                if (this.fallingPuyo[i].falling) {
                    var currentRaw = this.fallingPuyo[i].row;
                    currentRaw++;
                    this.fallingPuyo[i].row = currentRaw;
                    if (this.fallingPuyo[i].row >= this.fallingPuyo[i].destinationRow) {
                        this.fallingPuyo[i].row = this.fallingPuyo[i].destinationRow;
                        this.fallingPuyo[i].falling = false;
                        console.log("fallen");
                    }
                    isFallen = false;
                }
            }
            console.log(this.fallingPuyo);
            RenderEngine.renderFrame(gField);
            return isFallen;
        }
        return false;
    }

    /**
    * @param gField ゲームステージ番号
    * @param frame アニメーションための現在のフレーム番号 
    */
    static isPuyoErased(frame, gField) {
        return true;
    }

    /**
     * @param gField ゲームステージ番号
     * @param frame アニメーションための現在のフレーム番号 
     */
    static generateResult(frame, gField) {
        return true;
    }

    /**
    * @param gField ゲームステージ番号 
    */
    static actionOnField(gField) {
        return true;
    }

    /**
    * @param gField ゲームステージ番号
    */
    static isMoving(gField) {
        return true;
    }
    /**
    * @param gField ゲームステージ番号
    */
    static isRotating(gField) {
        return true;
    }
    /**
    * @param gField ゲームステージ番号
    */
    static fix(gField) {
        return true;
    }


    //#endregion

    //#region アニメーション関数

    static erase(frame) {
        return true;
    }

    //#endregion

    static fallingUpdate(id, objects) {
        this.fallingPuyo[id] = objects;
    }
}
