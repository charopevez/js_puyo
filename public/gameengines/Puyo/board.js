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
        var canvas = this.createGameScreen(Settings.screenWidth, Settings.screenHeight);
        GameScreen.appendChild(canvas);
        this.renderGameField();
        this.renderHint();


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
        this.fallingPuyo = [[], []];

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
        this.fallingPuyo[gField].length = 0;
        let isFalling = false;
        const field = JSON.parse(JSON.stringify(this.board[gField]));
        //gField検索
        for (let i = Settings.rows - 2; i >= 0; i--) {
            //行検査
            const row = field[i];
            for (let y = 0; y < row.length; y++) {
                //セール検査
                if (field[i][y] == 0) {
                    //プヨなければ次
                    continue;
                }
                if (field[i + 1][y] == 0) {
                    // このぷよは落ちるので、取り除く
                    let cell = field[i][y];
                    field[i][y] = 0;
                    let dstCell = i;
                    while (dstCell + 1 < Settings.rows && field[dstCell + 1][y] == 0) {
                        dstCell++;
                    }
                    // 最終目的地に置く
                    field[dstCell][y] = cell;
                    // 落ちるリストに入れる
                    this.fallingPuyo[gField].push({
                        object: cell,
                        row: i,
                        destinationRow: dstCell,
                        falling: true
                    });
                    // 落ちるものがあったことを記録しておく
                    isFalling = true;
                }
            }

        }

        return isFalling;

    }

    /**
    * @param gField ゲームステージ番号
    */
    static isPuyoFallen(frame, gField) {
        if (frame % Settings.freeFallingSpeed == 0) {
            console.log("stage " + gField + " fall confirmation");
            var isFallen = true;
            for (var i = 0; i < this.fallingPuyo[gField].length; i++) {
                if (this.fallingPuyo[gField][i].falling) {
                    var currentRaw = this.fallingPuyo[gField][i].row;
                    currentRaw++;
                    Board.fallingPuyo[gField][i].row = currentRaw;
                    if (Board.fallingPuyo[gField][i].row >= Board.fallingPuyo[gField][i].destinationRow) {
                        Board.fallingPuyo[gField][i].row = Board.fallingPuyo[gField][i].destinationRow;
                        Board.fallingPuyo[gField][i].falling = false;
                    }
                    isFallen = false;
                    this.board[gField]
                }
            }

            this.renderFrame(gField);
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


    //#region 表示
    static createGameScreen(width, height) {
        this.ratio = Math.ceil(window.devicePixelRatio);
        const canvas = document.createElement('canvas');
        canvas.id = "gameScreen";
        canvas.width = width * this.ratio;
        canvas.height = height * this.ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.getContext('2d').setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        return canvas;
    }

    static renderGameField() {
        //render 背景
        var ctx = this.getContext();
        ctx.fillStyle = Settings.fieldStyle;
        for (var i = 0; i < Settings.fieldPlace.length; i++) {
            var obj = Settings.fieldPlace[i];
            ctx.fillRect(obj[0], obj[1], obj[2], obj[3]);
        };
    }

    static renderScore(score) {
        for (var i = 0; i < Settings.scorePlace.length; i++) {
            // render Score frame
            var ctx = this.getContext();
            ctx.fillStyle = Settings.scoreStyle;
            var obj = Settings.scorePlace[i]
            ctx.fillRect(obj[0], obj[1], obj[2], obj[3]);
            // render score value
            ctx = this.getContext();
            ctx.fillStyle = Settings.fontColor;
            ctx.font = "normal " + 36 * this.ratio + "px Verdana";
            ctx.fillText(score[i], obj[0] + 40, obj[1] + 40);
        };

    }

    static renderHint() {
        var ctx = document.getElementById('gameScreen').getContext("2d");
        ctx.fillStyle = Settings.hintStyle;
        for (var i = 0; i < Settings.hintPlace.length; i++) {
            var obj = Settings.hintPlace[i]
            ctx.fillRect(obj[0], obj[1], obj[2], obj[3]);
        };
    }


    /**
    * @param gField ゲームステージ番号
    */
    static renderFrame(gField) {
        console.log(gField + "field");
        var ctx = this.getContext();
        ctx.fillStyle = Settings.fieldStyle;
        //render 背景
        var obj = Settings.fieldPlace[gField];
        console.log(obj);
        ctx.fillRect(obj[0], obj[1], obj[2], obj[3]);
        //render ステージ
        var startX = obj[0];
        var startY = obj[1];
        console.dir(this.board[gField]);
        for (var i = 0; i < Settings.rows; i++) {
            for (var y = 0; y < Settings.columns; y++) {
                var plField=this.board[gField];
                if (plField[i][y]!==0) {
                    ctx = this.getContext();
                    var color = Settings.puyoType[plField[i][y]];
                    ctx.fillStyle = color;
                    console.log("i " + i+ " y: "+y);
                    console.log("color: "+ color + " X: "+(startX + y * Settings.cellSize)+ " Y: "+(startY + i * Settings.cellSize));
                    ctx.fillRect( startX+y * Settings.cellSize,
                        startY + i * Settings.cellSize,
                        Settings.cellSize,
                        Settings.cellSize);
                } else {
                    continue;
                }
            }
        }

    }

    /**
     * @param gField ゲームステージ番号
     * @param frame アニメーションための現在のフレーム番号 
     */

    static renderPuyoErase(frame, gField) {
        return true;
    }

    /**
    * @param gField ゲームステージ番号
    * @param frame アニメーションための現在のフレーム番号 
    */

    static renderResult(frame, gField) {
        return true;
    }

    //#endregion

    static getContext() {
        return document.getElementById('gameScreen').getContext("2d");
    }
}
