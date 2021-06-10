class Board {
    static initialize() {
        const GameScreen = document.getElementById('game');
        var canvas = RenderEngine.createGameScreen(Settings.screenWidth, Settings.screenHeight);
        GameScreen.appendChild(canvas);
        RenderEngine.renderGameField();
        RenderEngine.renderHint();


        // メモリを準備する
        this.board = [
            [
                [0, 0, 4, 0, 0, 0],
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
                [0, 2, 3, 0, 0, 0],
                [0, 1, 3, 0, 0, 0],
                [0, 5, 3, 0, 0, 0],
                [0, 3, 1, 0, 0, 0],
            ]
        ];
        this.objCount=0;
        this.fallingObj = [];
        this.erasingObjData = [];

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
                    let id=2 * gField + puyoCell;
                    console.log("id " + id);
                    this.board[gField][dstCell][y] = -1-id;
                    // 落ちるリストに入れる
                    this.fallingUpdate(id, {
                        object: cell,
                        row: i,
                        column: y,
                        destinationRow: dstCell,
                        falling: true
                    });
                    puyoCell++;
                    //落ちるものがあったことを記録しておく
                    isFalling = true;
                }
            }

        }
        console.log(this.fallingObj);
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
                if (this.fallingObj[i].falling) {
                    var currentRaw = this.fallingObj[i].row;
                    currentRaw++;
                    this.fallingObj[i].row = currentRaw;
                    if (this.fallingObj[i].row >= this.fallingObj[i].destinationRow) {
                        this.fallingObj[i].row = this.fallingObj[i].destinationRow;
                        this.fallingObj[i].falling = false;
                    }
                    isFallen = false;
                }
            }
            RenderEngine.renderFrame(gField);
            return isFallen;
        }
        return false;
    }

    /**
    * @param gField ゲームステージ番号
    * @param startingFrame アニメーションための現在のフレーム番号 
    */
    static isPuyoErased(startingFrame, gField) {
        console.log("frame " + startingFrame + " field " + gField);
        //変数を宣言と初期化
        this.eraseStartingFrame = startingFrame;
        this.erasingObjData.length = 0;

        // 何色のぷよを消したかを記録する
        const erasingObj = {};
        // 隣接ぷよを確認する関数内関数を作成
        const connectedObjData = [];
        const existingObjData = [];
        console.log("erasing obg check" + gField+ " field");
        console.log(this.board[gField])
        const checkConnectedObj = (i, y, gField) => {
            // ぷよがあるか確認する
            const boardData = this.board[gField][y][i]<0 ?this.fallingObj[-1-this.board[gField][y][i]].object : this.board[gField][y][i];
            if (boardData==0) {
                // ないなら何もしない
                return;
            }
            console.log("researched value"+boardData);
            // あるなら一旦退避して、メモリ上から消す
            const obj = this.board[gField][y][i]<0 ?this.fallingObj[-1-this.board[gField][y][i]].object : this.board[gField][y][i];
            connectedObjData.push({
                i: i,
                y: y,
                object: obj
            });
            this.board[gField][y][i] = 0;


            // 四方向の周囲ぷよを確認する
            const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]];
            for (let dir = 0; dir < direction.length; dir++) {
                console.log("checkin dir "+direction[dir])
                const dirX = i + direction[dir][0];
                const dirY = y + direction[dir][1];
                if (dirX < 0 || dirY < 0 || dirX >= Settings.columns || dirY >= Settings.rows) {
                    // ステージの外にはみ出た
                    continue;
                }
                //if  value in sell less then 0 then take data from falling block
                const cell = this.board[gField][y][i]<0 ?this.fallingObj[-1-this.board[gField][y][i]].object : this.board[gField][y][i];
                if (!cell || cell !== boardData) {
                    console.log("didnt mathc")
                    // ぷよの色が違う
                    continue;
                }
                // そのぷよのまわりのぷよも消せるか確認する
                checkConnectedObj(dirX, dirY, gField);
            };
        }
        // 実際に削除できるかの確認を行う
        for (let y = 0; y < Settings.rows; y++) {
            for (let x = 0; x < Settings.columns; x++) {
                //clear connected obj array
                connectedObjData.length = 0;
                const obj = this.board[gField][y][x];
                checkConnectedObj(x, y, gField);
                console.log(connectedObjData)
                if (connectedObjData.length == 0 || connectedObjData.length < Settings.eraseCount) {
                    // 連続して並んでいる数が足りなかったので消さない
                    if (connectedObjData.length) {
                        // 退避していたぷよを消さないリストに追加する
                        existingObjData.push(...connectedObjData);
                    }
                } else {
                    // これらは消して良いので消すリストに追加する
                    this.erasingObjData.push(...connectedObjData);
                    erasingObj[obj] = true;
                }
            }
        }

        this.objCount -= this.erasingObjData.length;
        console.log(existingObjData);
        // 消さないリストに入っていたぷよをメモリに復帰させる
        for (const info of existingObjData) {
            this.board[gField][info.y][info.i] = info.object;
        }
        if (this.erasingObjData.length) {
            // もし消せるならば、消えるぷよの個数と色の情報をまとめて返す
            return {
                piece: this.erasingObjData.length,
                color: Object.keys(erasingObj).length
            };
        }
        return null;
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
        this.fallingObj[id] = objects;
    }

    static getCellValue(gField,y,i){
        return this.board[gField][y][i]<0 ?this.fallingObj[-1-this.board[gField][y][i]].object : this.board[gField][y][i];
    }
}
