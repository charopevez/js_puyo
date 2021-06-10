class RenderEngine {
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
        console.log(gField || defaultField + "  field");
        this.renderGameField();
        //render ステージ
        this.renderStatic(0);
        this.renderStatic(1);
        this.renderEvents(0);
        this.renderEvents(1);


    }


    /**
    * @param gField ゲームステージ番号
    */
    static renderStatic(gField, defaultField = 0) {
        var startXY = Settings.fieldPlace;
        for (var i = 0; i < Settings.rows; i++) {
            for (var y = 0; y < Settings.columns; y++) {
                var plField = Board.board[gField];
                if (plField[i][y] != 0 && plField[i][y] != -1) {
                    let ctx = this.getContext();
                    var color = Settings.puyoType[plField[i][y]];

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
        var startXY = Settings.fieldPlace;
        for (let i = gField * 2; i < gField * 2 + 2; i++) {
            var puyoImg = Board.fallingObj[i];
            let ctx = this.getContext();
            var color = Settings.puyoType[puyoImg.object];
            ctx.fillStyle = color;
            ctx.fillRect(startXY[gField][0] + puyoImg.column * Settings.cellSize,
                startXY[gField][1] + puyoImg.row * Settings.cellSize,
                Settings.cellSize,
                Settings.cellSize);
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

