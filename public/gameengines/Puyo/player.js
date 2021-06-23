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
        this.directions = [[0, -1], [-1, 0], [0, 1], [1, 0]];
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
                    console.log("right pressed")
                    e.preventDefault();
                    return false;
                case "ArrowDown": // 下向きキー
                    this.keyStatus.fall = true;
                    console.log("down pressed")
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
        this.nextObjList = [];
    }



    //#region functions
    static nextObj() {
        // オブジェクトが置けるかどうか、1番上の段の左から3つ目を確認する
        if (Board.board[this.player][0][2]) {
            // 空白でない場合は新しいぷよを置けない
            return false;
        }
        // 次のオブジェクトリストを作成
        while (this.nextObjList.length < 3) {
            this.nextObjList.push(Puyo.nextObj(this.player));
        }
        this.currentObj = this.nextObjList.shift();
        //次のオブジェクトを表示する
        RenderEngine.renderHint(this.player)
        // オブジェクトの初期配置を定める
        this.objStatus = {
            column: 2, // 中心ぷよの位置: 左から2列目
            row: 1, // 画面上部ギリギリから出てくる
            center: this.currentObj.objCenter,
            rotate: this.currentObj.objRotatable,
            dcol: 0, // 動くオブジェクトの相対位置: 動くオブジェクトは上方向にある
            drow: -1,
            orientation: 90
        };
        // 接地時間はゼロ
        this.groundRow = Settings.rows; //12
        // ぷよを描画
        RenderEngine.renderObj(this.player);
        return true;
    }

    //ポインターのポジションを検索
    static getMousePos(canvas, e) {
        var place = canvas.getBoundingClientRect();
        return {
            x: e.clientX - place.left,
            y: e.clientY - place.top
        };
    }
    //四角の中で行われたか
    static isInsideRect(position, place) {
        return position.x > place.x &&
            position.x < place.x + place.width &&
            position.y < place.y + place.height &&
            position.y > place.y
    }


    static actionOnField(startingFrame) {
        // まず自由落下を確認する
        // 下キーが押されていた場合、それ込みで自由落下させる
        if (this.falling(this.keyStatus.fall, startingFrame)) {
            // 落下が終わっていたら、ぷよを固定する
            RenderEngine.renderObj(this.player);
            return 23;
        }
        RenderEngine.renderObj(this.player);
        if (this.keyStatus.right || this.keyStatus.left) {
            // 左右の確認をする
            const step = (this.keyStatus.right) ? 1 : -1;
            const centerX = this.objStatus.column;
            const centerY = this.objStatus.row;
            const rotateX = centerX + this.objStatus.dcol;
            const rotateY = centerY + this.objStatus.drow;
            // その方向にブロックがないことを確認する
            // まずは自分の左右を確認
            let canMove = true;
            //真ん中のオブジェクト左右を確認
            if (centerY < 0 || centerX + step < 0 || centerX + step >= Settings.columns || Board.board[this.player][centerY][centerX + step] != 0) {
                canMove = false;
            }
            //回転するオブジェクト左右を確認
            if (rotateY < 0 || rotateX + step < 0 || rotateX + step >= Settings.columns || Board.board[this.player][rotateY][rotateX + step] != 0) {
                canMove = false;
            }
            if (canMove) {
                // 動かすことが出来るので、移動先情報をセットして移動状態にする
                this.actionStartFrame = startingFrame;
                // this.moveSource = centerX * Settings.cellSize;
                // this.moveDestination = (centerX + step) * Settings.cellSize;
                this.objStatus.column += step;
                return 21;
            }
        } else if (this.keyStatus.rotate) {
            // 回転を確認する
            // 回せるかどうかは後で確認。まわすぞ
            const step = (this.keyStatus.right) ? 1 : -1;
            const centerX = this.objStatus.column;
            const centerY = this.objStatus.row;
            const rotateX = centerX + this.objStatus.dcol;
            const rotateY = centerY + this.objStatus.drow;
            const rotation = this.objStatus.orientation;
            let canRotate = true;
            let stepX = 0;　//周り為真ん中のオブジェクト移動
            let stepY = 0;　//周り為真ん中のオブジェクト移動
            switch (rotation) {
                case 0:
                    // 左から上に回せる
                    if (true) {

                    }
                    break;

                case 90:
                    // 上から右にに回すときに、右ににブロックがあれば左に移動する必要があるのでまず確認する

                    if (centerX + 1 >= Settings.columns || //右壁をチェック
                        (centerY >= 0 && Board.board[this.player][centerY][centerX + 1] != 0)//真ん中のオブジェクトと右のセールをチェック
                    ) {
                        if (centerX - 1 < 0 || centerY >= 0 && Board.board[this.player][centerY][centerX - 1] != 0) {
                            //真ん中オブジェクト左に壁かオブジェクトある場合回転無効
                            canRotate = false;
                        } else {
                            //真ん中オブジェクト左に移動
                            stepX = -1;
                        }
                    }
                    break;
                case 180:
                    if (centerY + 1 >= Settings.rows || //床をチェック
                        Board.board[this.player][centerY + 1][centerX] != 0 ||　  //　真ん中のオブジェクトと下のセールをチェック
                        (centerY >= 0 && Board.board[this.player][centerY][centerX + 1] != 0)//真ん中のオブジェクトと右のセールをチェック
                    ) {
                        stepY = -1;
                    }
                    break;
                case 270:
                    if (centerX - 1 < 0 || //右壁をチェック
                        (centerY >= 0 && Board.board[this.player][centerY][centerX - 1] != 0)//真ん中のオブジェクトと右のセールをチェック
                    ) {
                        if (centerX + 1 >= Settings.columns || //右壁をチェック
                            (centerY >= 0 && Board.board[this.player][centerY][centerX + 1] != 0)
                        ) {
                            //真ん中オブジェクト左に壁かオブジェクトある場合回転無効
                            canRotate = false;
                        } else {
                            //真ん中オブジェクト左に移動
                            stepX = 1;
                        }
                    }
                    break;

            }



            if (canRotate) {
                // 動かすことが出来るので、移動先情報をセットして移動状態にする
                this.actionStartFrame = startingFrame;
                this.objStatus.orientation = (this.objStatus.orientation + 90) % 360;
                const newCoord = this.directions[this.objStatus.orientation / 90];
                this.objStatus.column += stepX;
                this.objStatus.row += stepY;
                this.objStatus.dcol = newCoord[1];
                this.objStatus.drow = newCoord[0];
                return 22;
            }
        }
        return 20;
    }

    static falling(isDownPressed, curentFrame) {
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
            isBlocked = true;
            if (2 * curentFrame % Settings.freeFallSpeed == 0) {

                return true;
            }
        }

        if (!isBlocked) {
            // 下にブロックがないなら自由落下してよい。プレイヤー操作中の自由落下処理をする
            if (isDownPressed) {
                // 下キーが押されているならもっと加速する
                this.objStatus.row++;
                return;
                //得点を加算する
                //Score.addScore(1);
                return true;
            }
            if (curentFrame % Settings.freeFallSpeed == 0) {
                y += 1;
                //次の行に落ちた
                this.objStatus.row = y;
                return;
            }
        }

    }

    static fix(startingFrame) {
        // 現在のぷよをステージ上に配置する
        let x = this.objStatus.column;
        let y = this.objStatus.row;
        let dx = this.objStatus.dcol;
        let dy = this.objStatus.drow;
        console.log("falling object")
        console.log(this.objStatus)
        if (y >= 0) {
            // 画面外の真ん中オブジェクトは消してしまう
            Board.fixObj(x, y, this.currentObj.objCenter, this.player);
            Board.objCount[0]++;
            console.log("fix center")
        }
        if (y + dy >= 0) {
            // 画面外の回れるオブジェクトは消してしまう
            Board.fixObj(x + dx, y + dy, this.currentObj.objRotatable, this.player);
            Board.objCount[0]++;
            console.log("fix rotate")
        }
        //clear falling object list
        RenderEngine.fix(this.player)

    }

    static isMoving(cFrame) {
        // 移動中も自然落下はさせる
        this.falling(false, cFrame);
        if (cFrame - this.actionStartFrame < Settings.movementSpeed) {
            return false
        } else {
            return true;
        }
    }
    static isRotating(cFrame) {

        RenderEngine.renderObj(this.player)
        // 移動中も自然落下はさせる
        this.falling(false, cFrame);
        if (cFrame - this.actionStartFrame < Settings.movementSpeed) {
            return false
        } else {
            return true;
        }

    }

    //#endregion

}