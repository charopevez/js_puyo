class RenderEngine {

    static initialize() {
        this.drawnObjList = [];
    }

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


    /**
    * @param gField ゲームステージ番号
    */
    static renderGameField(gField, defaultField = 0) {
        //render 背景
        var ctx = this.getContext();
        ctx.fillStyle = Settings.fieldStyle;
        for (var i = gField || defaultField; i < Settings.fieldPlace.length; i++) {
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
    static renderFrame(gField, defaultField = 0) {
        this.renderGameField(gField);
        //render ステージ
        this.renderStatic(0);
        this.renderStatic(1);
    }


    /**
    * @param gField ゲームステージ番号
    */
    static renderStatic(gField, defaultField = 0) {
        let startXY = Settings.fieldPlace;
        for (let i = 0; i < Settings.rows; i++) {
            for (let y = 0; y < Settings.columns; y++) {
                let plField = Board.board[gField];
                if (plField[i][y] != 0) {
                    let ctx = this.getContext();
                    let color = Settings.puyoType[plField[i][y]];

                    ctx.fillStyle = color;
                    ctx.fillRect(startXY[gField][0] + y * Settings.cellSize,
                        startXY[gField][1] + i * Settings.cellSize,
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
    */
    static renderEvents(gField, defaultField = 0) {
        let startXY = Settings.fieldPlace;
        for (let i = gField * 2; i < gField * 2 + 2; i++) {
            let puyoImg = Board.fallingObj[i];
            let ctx = this.getContext();
            let color = Settings.puyoType[puyoImg.object];
            ctx.fillStyle = color;
            ctx.fillRect(startXY[gField][0] + puyoImg.column * Settings.cellSize,
                startXY[gField][1] + puyoImg.row * Settings.cellSize,
                Settings.cellSize,
                Settings.cellSize);
        }
    }

    /**
    * @param gField ユーザー番号
    */
    static renderObj(player) {
        let obj;
        let field;
        switch (player) {
            case 0:
                obj = Player.objStatus;
                field = 0;
                break;
            case 1:
                obj = Bot.objStatus;
                field = 1;
                break;
            case 3:
                obj = Human.objStatus;
                field = 1;
                break;
        }
        let startXY = Settings.fieldPlace[field];
        //clear prev obj
        for (let y = field*Settings.maxSize; y < Settings.maxSize+field*Settings.maxSize; y++) {
            if (this.drawnObjList[y]===undefined||this.drawnObjList[y]==null) {
                continue;
            }
            let ctx = this.getContext();
            ctx.fillStyle = Settings.fieldStyle;
            ctx.fillRect(
                this.drawnObjList[y].x,
                this.drawnObjList[y].y,
                Settings.cellSize,
                Settings.cellSize
            );

        }
        // draw current one
        for (let i = 0; i < Settings.maxSize; i++) {
            let x = obj.column+i*obj.dcol;
            let y = obj.row+i*obj.drow;
            if (y < 0 || y >= Settings.rows ) {
                continue;
            }
            let ctx = this.getContext();
            if (i==0) {
                ctx.fillStyle = Settings.puyoType[obj.center];
            }else {
                ctx.fillStyle = Settings.puyoType[obj.rotate];
            }
            ctx.fillRect(
                startXY[0] + (x) * Settings.cellSize,
                startXY[1] + (y) * Settings.cellSize,
                Settings.cellSize,
                Settings.cellSize
            );
            this.drawnObjList[i + player * Settings.maxSize] = {
                y: startXY[1] + (y) * Settings.cellSize,
                x: startXY[0] + (x) * Settings.cellSize
            }

        }
    }


    /**
     * @param gField ゲームステージ番号
     * @param frame アニメーションための現在のフレーム番号 
     */

    static renderErase(frame, gField) {
        //this.renderGameField
        //render existing/
        //render animation
        const elapsedFrame = frame - Board.eraseStartingFrame;
        const ratio = elapsedFrame / 60;
        var startXY = Settings.fieldPlace;
        if (ratio <= 1) {
            for (const data of Board.getErasingData(gField)) {
                let ctx = this.getContext();
                ctx.fillStyle = Settings.fieldStyle;
                ctx.fillRect(startXY[gField][0] + (data.i) * Settings.cellSize,
                    startXY[gField][1] + (data.y) * Settings.cellSize,
                    Settings.cellSize * (1),
                    Settings.cellSize * (1));
                ctx = this.getContext();
                let color = Settings.puyoType[data.object];
                ctx.fillStyle = color;
                ctx.fillRect(startXY[gField][0] + (data.i + ratio / 2) * Settings.cellSize,
                    startXY[gField][1] + (data.y + ratio / 2) * Settings.cellSize,
                    Settings.cellSize * (1 - ratio),
                    Settings.cellSize * (1 - ratio));
            }

            return false;
        } else {
            console.log("end animation")
            return true;
        }
    }

    /**
    * @param gField ゲームステージ番号 
    */
     static fix(gField){
        for (let cell=Settings.maxSize*gField; cell<Settings.maxSize+Settings.maxSize*gField; cell++){
            this.drawnObjList[cell]=null;
        }

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

