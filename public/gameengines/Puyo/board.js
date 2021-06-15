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
                [0, 0, 0, 6, 6, 0],
                [0, 2, 0, 5, 0, 0],
                [0, 0, 2, 0, 5, 6],
                [0, 1, 0, 2, 4, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 5],
                [2, 2, 2, 4, 4, 4],
            ],
            [
                [0, 2, 3, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 2, 0],
                [0, 2, 0, 3, 0, 0],
                [0, 2, 3, 0, 0, 6],
                [0, 3, 3, 0, 0, 6],
            ]
        ];
        this.objCount = [0, 0];
        this.fallingObjList = [];
        this.erasingObjData0 = [];
        this.erasingObjData1 = [];

    }
    //#region 状態functions

    /**
    * @param gField ゲームステージ番号
    * @param startingFrame 現在ゲームフレーム番号
    */
    // 画面とメモリ両方に puyo をセットする
    static fixObj(x,y, type, gField) {
        // メモリにセットする
        this.board[gField][y][x] = type;
        console.log(this.board[gField])
    }

    /**
    * @param gField ゲームステージ番号
    */
    //次ぷよを作成し
    static nextPuyo(gField) {
        if (gField < 1) {
            console.log("player")
            return Player.nextObj();
        } else {
            console.log("opponent")
            return true;
            return Settings.mode < 3 ? Bot.nextObj() : Human.nextObj();
        }

    }

    /**
     * @param gField ゲームステージ番号
     */
    static isObjFalling(gField) {
        let isFalling = false;
        this.fallingObjList.length = 0;
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
                    this.board[gField][dstCell][y] = cell;
                    // 落ちるリストに入れる
                    this.fallingObjList.push({
                        object: cell,
                        row: i,
                        destinationRow: dstCell,
                        falling: true
                    });
                    //落ちるものがあったことを記録しておく
                    isFalling = true;
                }
            }

        }
        return isFalling;

    }

    /**
    * @param gField ゲームステージ番号
    */
    static isObjFell(gField) {
        let isFalling = true;
        for (const obj of this.fallingObjList) {
            if (!obj.falling) {
                // すでに自由落下が終わっている
                continue;
            }
            let position = obj.row;
            position += Settings.freeFallingSpeed;
            if (position >= obj.destinationRow) {
                // 自由落下終了
                position = obj.destinationRow;
                obj.falling = false;
            } else {
                // まだ落下しているぷよがあることを記録する
                isFalling = true;
            }
            // 新しい位置を保存する
            obj.row = position;
        }
        RenderEngine.renderFrame(gField);
        return isFalling;
    }

    /**
    * @param gField ゲームステージ番号
    * @param startingFrame アニメーションための現在のフレーム番号 
    */
    static isPuyoErased(startingFrame, gField) {
        //変数を宣言と初期化
        this.eraseStartingFrame = startingFrame;
        this.clearErasingObjData(gField)

        // 何色のぷよを消したかを記録する
        const erasingObj = {};
        // 隣接ぷよを確認する関数内関数を作成
        const connectedObjData = [];
        const existingObjData = [];
        const checkConnectedObj = (i, y, gField) => {
            // ぷよがあるか確認する
            const boardData = this.board[gField][y][i];
            if (boardData == 0) {
                // ないなら何もしない
                return;
            }
            // あるなら一旦退避して、メモリ上から消す
            const obj = this.board[gField][y][i];
            connectedObjData.push({
                i: i,
                y: y,
                object: obj
            });
            this.board[gField][y][i] = 0;

            // 四方向の周囲ぷよを確認する
            const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]];
            for (let dir = 0; dir < direction.length; dir++) {
                const dirX = i + direction[dir][0];
                const dirY = y + direction[dir][1];
                if (dirX < 0 || dirY < 0 || dirX >= Settings.columns || dirY >= Settings.rows) {
                    // ステージの外にはみ出た
                    continue;
                }
                //if  value in sell less then 0 then
                const cell = this.board[gField][dirY][dirX];
                if (cell !== boardData) {
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
                if (connectedObjData.length == 0 || connectedObjData.length < Settings.eraseCount) {
                    // 連続して並んでいる数が足りなかったので消さない
                    if (connectedObjData.length) {
                        // 退避していたぷよを消さないリストに追加する
                        existingObjData.push(...connectedObjData);
                    }
                } else {
                    // これらは消して良いので消すリストに追加する
                    if (gField == 0) {
                        this.erasingObjData0.push(...connectedObjData);
                    } else {
                        this.erasingObjData1.push(...connectedObjData);
                    }
                    erasingObj[obj] = true;
                }
            }
        }
        if (gField == 0) {
            this.objCount[gField] -= this.erasingObjData0.length;
        } else {
            this.objCount[gField] -= this.erasingObjData1.length;
        }
        // 消さないリストに入っていたぷよをメモリに復帰させる
        for (const info of existingObjData) {
            this.board[gField][info.y][info.i] = info.object;
        }
        if (this.erasingObjData0.length) {
            // もし消せるならば、消えるぷよの個数と色の情報をまとめて返す
            return {
                piece: this.erasingObjData0.length,
                color: Object.keys(erasingObj).length
            };
        }
        if (this.erasingObjData1.length) {
            // もし消せるならば、消えるぷよの個数と色の情報をまとめて返す
            return {
                piece: this.erasingObjData1.length,
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
    * @param cFrame 現在ゲームフレーム番号
    */
    static actionOnField(gField, cFrame) {
        if (gField < 1) {
            return Player.actionOnField(cFrame);
        } else {
            //return true;
            return Settings.mode < 3 ? Bot.actionOnField(cFrame) : Human.actionOnField(cFrame);
        }
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
    * @param cFrame 現在ゲームフレーム番号
    */
    static fix(gField, cFrame) {
        if (gField < 1) {
            return Player.fix(cFrame, 0);
        } else {
            return true;
           return Settings.mode < 3 ? Bot.fix(cFrame, 1) : Human.fix(cFrame, 1);
        }
    }


    //#endregion

    /**
    * @param gField ゲームステージ番号
    */
    static getErasingData(gField) {
        if (gField == 0) {
            return this.erasingObjData0;
        } else {
            return this.erasingObjData1;
        }
    }

    static clearErasingObjData(gField) {
        if (gField == 0) {
            this.erasingObjData0.length = 0;
        } else {
            this.erasingObjData1.length = 0;
        }
    }
}
