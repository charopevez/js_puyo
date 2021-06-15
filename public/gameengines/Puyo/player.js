class Player {

    /**
     * right: 右に移動,
        left: 左に移動,
        rotate: 曲がり,
        fall: 落とす
     */

    static initialize() {
        //キーボードの入力を確認する
        this.keyStatus = {
            right: false,
            left: false,
            rotate: false,
            fall: false
        };
        this.player = 0;
        // ブラウザのキーボードの入力イベントリスナ
        document.addEventListener('keydown', (e) => {
            // キーボードが押された場合
            switch (e.code) {
                case "ArrowLeft": // 左向きキー
                    this.keyStatus.left = true;
                    e.preventDefault();
                    return false;
                case "ArrowUp": // 上向きキー
                    this.keyStatus.rotate = true;
                    e.preventDefault();
                    return false;
                case "ArrowRight": // 右向きキー
                    this.keyStatus.right = true;
                    e.preventDefault();
                    return false;
                case "ArrowDown": // 下向きキー
                    this.keyStatus.fall = true;
                    e.preventDefault();
                    return false;
            }
        });
        document.addEventListener('keyup', (e) => {
            // キーボードが離された場合
            switch (e.code) {
                case "ArrowLeft": // 左向きキー
                    this.keyStatus.left = false;
                    e.preventDefault(); return false;
                case "ArrowUp": // 上向きキー
                    this.keyStatus.rotate = false;
                    e.preventDefault(); return false;
                case "ArrowRight": // 右向きキー
                    this.keyStatus.right = false;
                    e.preventDefault(); return false;
                case "ArrowDown": // 下向きキー
                    this.keyStatus.fall = false;
                    e.preventDefault(); return false;
            }
        });
    }

    //#region functions
    static nextObj() {
        // オブジェクトが置けるかどうか、1番上の段の左から3つ目を確認する
        if (Board.board[this.player][0][2]) {
            // 空白でない場合は新しいぷよを置けない
            return false;
        }
        // 次のオブジェクトを作成
        this.currentObj = Puyo.nextObj();
        // オブジェクトの初期配置を定める
        this.objStatus = {
            column: 2, // 中心ぷよの位置: 左から2列目
            row: -1, // 画面上部ギリギリから出てくる
            center: this.currentObj.objCenter,
            rotate: this.currentObj.objRotatable,
            dcol: 1, // 動くオブジェクトの相対位置: 動くオブジェクトは上方向にある
            drow: 0,
        };
        // 接地時間はゼロ
        this.groundRow = Settings.rows; //12
        // ぷよを描画
        RenderEngine.renderObj(this.player);
        return true;
    }

    static actionOnField(cFrame) {
        // まず自由落下を確認する
        // 下キーが押されていた場合、それ込みで自由落下させる
        if (cFrame % Settings.freeFallSpeed == 0) {
            if (this.falling(this.keyStatus.down)) {
                // 落下が終わっていたら、ぷよを固定する
                    RenderEngine.renderObj(this.player);
                console.log("object fell")
                return 23;
            }
        }
        RenderEngine.renderObj(this.player);;
        // if (this.keyStatus.right || this.keyStatus.left) {
        //     // 左右の確認をする
        //     const cx = (this.keyStatus.right) ? 1 : -1;
        //     const x = this.puyoStatus.x;
        //     const y = this.puyoStatus.y;
        //     const mx = x + this.puyoStatus.dx;
        //     const my = y + this.puyoStatus.dy;
        //     // その方向にブロックがないことを確認する
        //     // まずは自分の左右を確認
        //     let canMove = true;
        //     if (y < 0 || x + cx < 0 || x + cx >= Config.stageCols || Stage.board[y][x + cx]) {
        //         if (y >= 0) {
        //             canMove = false;
        //         }
        //     }
        //     if (my < 0 || mx + cx < 0 || mx + cx >= Config.stageCols || Stage.board[my][mx + cx]) {
        //         if (my >= 0) {
        //             canMove = false;
        //         }
        //     }
        //     // 接地していない場合は、さらに1個下のブロックの左右も確認する
        //     if (this.groundFrame === 0) {
        //         if (y + 1 < 0 || x + cx < 0 || x + cx >= Config.stageCols || Stage.board[y + 1][x + cx]) {
        //             if (y + 1 >= 0) {
        //                 canMove = false;
        //             }
        //         }
        //         if (my + 1 < 0 || mx + cx < 0 || mx + cx >= Config.stageCols || Stage.board[my + 1][mx + cx]) {
        //             if (my + 1 >= 0) {
        //                 canMove = false;
        //             }
        //         }
        //     }
        //     if (canMove) {
        //         // 動かすことが出来るので、移動先情報をセットして移動状態にする
        //         this.actionStartFrame = frame;
        //         this.moveSource = x * Config.puyoImgWidth;
        //         this.moveDestination = (x + cx) * Config.puyoImgWidth;
        //         this.puyoStatus.x += cx;
        //         return 'moving';
        //     }
        // } else if (this.keyStatus.up) {
        //     // 回転を確認する
        //     // 回せるかどうかは後で確認。まわすぞ
        //     const x = this.puyoStatus.x;
        //     const y = this.puyoStatus.y;
        //     const mx = x + this.puyoStatus.dx;
        //     const my = y + this.puyoStatus.dy;
        //     const rotation = this.puyoStatus.rotation;
        //     let canRotate = true;
        //     let cx = 0;
        //     let cy = 0;
        //     if (rotation === 0) {
        //         // 右から上には100% 確実に回せる。何もしない
        //     } else if (rotation === 90) {
        //         // 上から左に回すときに、左にブロックがあれば右に移動する必要があるのでまず確認する
        //         if (y + 1 < 0 || x - 1 < 0 || x - 1 >= Config.stageCols || Stage.board[y + 1][x - 1]) {
        //             player.js
        //             if (y + 1 >= 0) {
        //                 // ブロックがある。右に1個ずれる
        //                 cx = 1;
        //             }
        //         }
        //         // 右にずれる必要がある時、右にもブロックがあれば回転出来ないので確認する
        //         if (cx === 1) {
        //             if (y + 1 < 0 || x + 1 < 0 || y + 1 >= Config.stageRows || x + 1 >= Config.stageCols || Stage.
        //                 board[y + 1][x + 1]) {
        //                 if (y + 1 >= 0) {
        //                     // ブロックがある。回転出来なかった
        //                     canRotate = false;
        //                 }
        //             }
        //         }
        //     } else if (rotation === 180) {
        //         // 左から下に回す時には、自分の下か左下にブロックがあれば1個上に引き上げる。まず下を確認する
        //         if (y + 2 < 0 || y + 2 >= Config.stageRows || Stage.board[y + 2][x]) {
        //             if (y + 2 >= 0) {
        //                 // ブロックがある。上に引き上げる
        //                 cy = -1;
        //             }
        //         }
        //         // 左下も確認する
        //         if (y + 2 < 0 || y + 2 >= Config.stageRows || x - 1 < 0 || Stage.board[y + 2][x - 1]) {
        //             if (y + 2 >= 0) {
        //                 // ブロックがある。上に引き上げる
        //                 cy = -1;
        //             }
        //         }
        //     } else if (rotation === 270) {
        //         // 下から右に回すときは、右にブロックがあれば左に移動する必要があるのでまず確認する
        //         if (y + 1 < 0 || x + 1 < 0 || x + 1 >= Config.stageCols || Stage.board[y + 1][x + 1]) {
        //             if (y + 1 >= 0) {
        //                 // ブロックがある。左に1個ずれる
        //                 cx = -1;
        //             }
        //         }
        //         // 左にずれる必要がある時、左にもブロックがあれば回転出来ないので確認する
        //         if (cx === -1) {
        //             if (y + 1 < 0 || x - 1 < 0 || x - 1 >= Config.stageCols || Stage.board[y + 1][x - 1]) {
        //                 if (y + 1 >= 0) {
        //                     // ブロックがある。回転出来なかった
        //                     canRotate = false;
        //                 }
        //             }
        //         }
        //     }

        //     if (canRotate) {
        //         // 上に移動する必要があるときは、一気にあげてしまう

        //         if (cy === -1) {
        //             if (this.groundFrame > 0) {
        //                 // 接地しているなら1段引き上げる
        //                 this.puyoStatus.y -= 1;
        //                 this.groundFrame = 0;
        //             }
        //             this.puyoStatus.top = this.puyoStatus.y * Config.puyoImgHeight;
        //         }
        //         // 回すことが出来るので、回転後の情報をセットして回転状態にする
        //         this.actionStartFrame = frame;
        //         this.rotateBeforeLeft = x * Config.puyoImgHeight;
        //         this.rotateAfterLeft = (x + cx) * Config.puyoImgHeight;
        //         this.rotateFromRotation = this.puyoStatus.rotation;
        //         // 次の状態を先に設定しておく
        //         this.puyoStatus.x += cx;
        //         const distRotation = (this.puyoStatus.rotation + 90) % 360;
        //         const dCombi = [[1, 0], [0, -1], [-1, 0], [0, 1]][distRotation / 90];
        //         this.puyoStatus.dx = dCombi[0];
        //         this.puyoStatus.dy = dCombi[1];
        //         return 'rotating';
        //     }
        // }
        return 20;
    }

    static falling(isDownPressed) {
        // 現状の場所の下にブロックがあるかどうか確認する
        let isBlocked = false;
        let x = this.objStatus.column;
        let y = this.objStatus.row;
        let dx = this.objStatus.dcol;
        let dy = this.objStatus.drow;
        //落ちたかどうか確認
        if (y + 1 >= Settings.rows //床に落ちた
            || Board.board[this.player][y + 1][x] //下の行に何かあるか
            || (y + dy + 1 >= 0 && (y + dy + 1 >= Settings.rows || Board.board[this.player][y + dy + 1][x + dx]))) //オブジェクトは下方向
        {
            console.log("blocked")
            isBlocked = true;
            return true;
        }
        if (!isBlocked) {
            // 下にブロックがないなら自由落下してよい。プレイヤー操作中の自由落下処理をする
            if (isDownPressed) {
                // 下キーが押されているならもっと加速する
                y += Settings.playerFallSeed;
                //得点を加算する
                //Score.addScore(1);
            }
            y += 1;
            //次の行に落ちた
            this.objStatus.row = y;
            return;
        }
        if (this.objStatus.row < Settings.rows) {
            return true;
        } else {
            this.objStatus.row = Settings.rows - 1;
            return true;
        }

    }

    static fix(startingFrame, player) {
        // 現在のぷよをステージ上に配置する
        let x = this.objStatus.column;
        let y = this.objStatus.row;
        let dx = this.objStatus.dcol;
        let dy = this.objStatus.drow;
        if (y >= 0) {
            // 画面外の真ん中オブジェクトは消してしまう
            Board.fixObj(x, y, this.currentObj.objCenter, player);
            Board.objCount[0]++;
            console.log("fix center")
        }
        if (y + dy >= 0) {
            // 画面外の回れるオブジェクトは消してしまう
            Board.fixObj(x + dx, y + dy, this.currentObj.objRotatable, player);
            Board.objCount[0]++;
            console.log("fix rotate")
        }
        //clear falling object list
        RenderEngine.fix(player)
        
    }

    //#endregion

}