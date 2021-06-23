class RenderEngine {

    static initialize() {
        this.drawnObjList = [];
        this.hint=[];
        this.animationsheet = new Image();
        this.objectSheet = new Image();
    }

    /**
    * @param gField ゲームステージ番号
    */
    static renderGameField(gField, defaultField = 0) {
        //render GUI
        var ctx = this.getContext();
        for (var i = gField || defaultField; i < (Settings.mode <2 ? 1:2); i++) {
            var field = Gui.guiList[i+3];
            console.log(field)
            ctx.clearRect(field.x, field.y, field.width, field.height);
        };
        //render GUI
        



    }

    static renderScore(score) {
        for (var i = 0; i < score.length; i++) {
            // render score value
            ctx = this.getContext();
            ctx.fillStyle = Settings.fontColor;
            ctx.font = "normal " + 36 * this.ratio + "px Verdana";
            ctx.fillText(score[i], obj[0] + Settings.cellSize, obj[1] + Settings.cellSize);
        };

    }

    static renderHint(player) {
        let ctx = this.getContext();
        let hField;
        switch (player) {
            case 0:
                this.hint = Player.nextObjList;
                hField =0;
                break;
            case 1:
                this.hint = Player.nextObjList;
                hField = 1;  
                break;
            case 3:
                this.hint = Player.nextObjList;
                hField = 1;
                break;
        }

        if (this.hint !== undefined) {
            let hintField = Gui.guiList[hField+9];
            for (var n = 0; n < this.hint.length; n++) {
                //真ん中の
                ctx = this.getContext();
                ctx.fillStyle = Settings.puyoType[this.hint[n].objRotatable];
                ctx.fillRect(hintField.x+Settings.cellSize*(2*n+1)/2, hintField.y+Settings.cellSize*(n*5+1)/2, Settings.cellSize , Settings.cellSize);
                //回転の
                ctx = this.getContext();
                ctx.fillStyle = Settings.puyoType[this.hint[n].objCenter];
                ctx.fillRect(hintField.x+Settings.cellSize*(2*n+1)/2, hintField.y+Settings.cellSize*(n*5+3)/2, Settings.cellSize, Settings.cellSize)
            };
        }
        
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
    static renderStatic(gField) {
        let startXY = Gui.guiList[gField+3];
        for (let i = 0; i < Settings.rows; i++) {
            for (let y = 0; y < Settings.columns; y++) {
                let plField = Board.board[gField];
                if (plField[i][y] != 0) {
                    let ctx = this.getContext();
                    let color = Settings.puyoType[plField[i][y]];

                    ctx.fillStyle = color;
                    ctx.fillRect(startXY.x + y * Settings.cellSize,
                        startXY.y + i * Settings.cellSize,
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
        let startXY = Gui.guiList[field+3];
        //clear prev obj
        for (let y = field*Settings.maxSize; y < Settings.maxSize+field*Settings.maxSize; y++) {
            if (this.drawnObjList[y]===undefined||this.drawnObjList[y]==null) {
                continue;
            }
            let ctx = this.getContext();
            ctx.fillStyle = Settings.fieldStyle;
            ctx.clearRect(
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
                startXY.x + (x) * Settings.cellSize,
                startXY.y + (y) * Settings.cellSize,
                Settings.cellSize,
                Settings.cellSize
            );
            this.drawnObjList[i + player * Settings.maxSize] = {
                y: startXY.y + (y) * Settings.cellSize,
                x: startXY.x + (x) * Settings.cellSize
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
        //全消し状態なら何もしない
        if (Board.objCount[gField]==0) {
            return true;
        }
        const elapsedFrame = frame - Board.eraseStartingFrame;
        const ratio = elapsedFrame / 60;
        var startXY = Gui.guiList[gField+3];;
        if (ratio <= 1) {
            for (const data of Board.getErasingData(gField)) {
                let ctx = this.getContext();
                ctx.clearRect(startXY.x + (data.i) * Settings.cellSize,
                    startXY.y + (data.y) * Settings.cellSize,
                    Settings.cellSize * (1),
                    Settings.cellSize * (1));
                ctx = this.getContext();
                let color = Settings.puyoType[data.object];
                ctx.fillStyle = color;  
                ctx.fillRect(startXY.x + (data.i + ratio / 2) * Settings.cellSize,
                    startXY.y + (data.y + ratio / 2) * Settings.cellSize,
                    Settings.cellSize * (1 - ratio),
                    Settings.cellSize * (1 - ratio));
            }
            return false;
        } else {
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
    * @param currentFrame アニメーションための現在のフレーム番号 
    */

    static renderResult( currentFrame, gField) {
        var startXY = Settings.fieldPlace;
        //背景再表示
        this.renderGameField(gField);
        //ゲーム結果を表示
        let ctx = this.getContext();
        ctx.fillStyle = "black";
        ctx.fillRect(startXY[gField][0] + Settings.cellSize,
            startXY[gField][1] + Settings.cellSize,
            Settings.cellSize*4,
            Settings.cellSize*4);
        //スコアを表示
        ctx = this.getContext();
        ctx.fillStyle = "white";
        ctx.font = "normal " + 36 * this.ratio + "px Verdana";
        ctx.fillText("your score"+ Score.score[gField], startXY[gField][0] + Settings.cellSize, startXY[gField][0] + Settings.cellSize);
        return true;
    }

    //#endregion

    static getContext() {
        return document.getElementById('gameLayer').getContext("2d");
    }
}

