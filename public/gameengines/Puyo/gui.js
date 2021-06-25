class Gui {
    static initialize() {
        //GUIを準備
        //ゲーム画面為カンバスを作成
        const GameScreen = document.getElementById('game');
        //背景増
        var canvas = this.createBackgroundLayer(Settings.screenWidth, Settings.screenHeight);
        GameScreen.appendChild(canvas);
        //dinamic layer
        canvas = this.createGameLayer(Settings.screenWidth, Settings.screenHeight);
        GameScreen.appendChild(canvas);
        //interactive layer
        canvas = this.createInteractiveLayer(Settings.screenWidth, Settings.screenHeight);
        GameScreen.appendChild(canvas);
        //GUIを初期化
        this.guiList = [
            {
                name: "field frame Left",
                index: 0,
                isDisplayed: false,
                x: 2 * Settings.cellSize,
                y: 1 * Settings.cellSize,
                width: Settings.cellSize * Settings.columns + 20,
                height: Settings.cellSize * Settings.rows + 20,
                mapX: 8,
                mapY: 8,
                mapWidth: 116,
                mapHeight: 192,
            },
            {
                name: "field frame Right",
                index: 1,
                isDisplayed: false,
                x: 18.5 * Settings.cellSize,
                y: 1 * Settings.cellSize,
                width: Settings.cellSize * Settings.columns + 20,
                height: Settings.cellSize * Settings.rows + 20,
                mapX: 8,
                mapY: 8,
                mapWidth: 116,
                mapHeight: 192,
            },
            {
                name: "field Center",
                index: 2,
                isDisplayed: false,
                x: 140,
                y: 90,
                width: Settings.cellSize * Settings.columns + 20,
                height: Settings.cellSize * Settings.rows + 20,
                mapX: 8,
                mapY: 8,
                mapWidth: 116,
                mapHeight: 192,
            },
            {
                name: "field left bgn",
                index: 3,
                isDisplayed: false,
                x: 2.25 * Settings.cellSize,
                y: 1.25 * Settings.cellSize,
                width: Settings.cellSize * Settings.columns,
                height: Settings.cellSize * Settings.rows,
                mapX: 593,
                mapY: 379,
                mapWidth: 100,
                mapHeight: 180,
            },
            {
                name: "field Right bgn",
                index: 4,
                isDisplayed: false,
                x: 18.75 * Settings.cellSize,
                y: 1.25 * Settings.cellSize,
                width: Settings.cellSize * Settings.columns,
                height: Settings.cellSize * Settings.rows,
                mapX: 593,
                mapY: 379,
                mapWidth: 100,
                mapHeight: 180,
            },
            {
                name: "field Center bgn",
                index: 5,
                isDisplayed: false,
                x: 150,
                y: 100,
                width: Settings.cellSize * Settings.columns,
                height: Settings.cellSize * Settings.rows,
                mapX: 593,
                mapY: 379,
                mapWidth: 100,
                mapHeight: 180,
            },
            {
                name: "hint frame Left",
                index: 6,
                isDisplayed: false,
                x: 9 * Settings.cellSize,
                y: 2 * Settings.cellSize,
                width: 3 * Settings.cellSize,
                height: 5.5 * Settings.cellSize,
                mapX: 330,
                mapY: 215,
                mapWidth: 39,
                mapHeight: 67,
            },
            {
                name: "hint frame Right",
                index: 7,
                isDisplayed: false,
                x: 15.5 * Settings.cellSize,
                y: 2 * Settings.cellSize,
                width: 2 * Settings.cellSize,
                height: 4 * Settings.cellSize,
                mapX: 8,
                mapY: 8,
                mapWidth: 116,
                mapHeight: 192,
            },
            {
                name: "hint frame Center",
                index: 8,
                isDisplayed: false,
                x: 2 * Settings.cellSize,
                y: 2 * Settings.cellSize,
                width: Settings.cellSize * Settings.columns + 20,
                height: Settings.cellSize * Settings.rows + 20,
                mapX: 8,
                mapY: 8,
                mapWidth: 116,
                mapHeight: 192,
            },
            {
                name: "hint bgn Left",
                index: 9,
                isDisplayed: false,
                x: 9 * Settings.cellSize,
                y: 2 * Settings.cellSize,
                width: 3 * Settings.cellSize,
                height: 5.5 * Settings.cellSize,
                mapX: 290,
                mapY: 216,
                mapWidth: 36,
                mapHeight: 65,
            },
            {
                name: "hint bgn Right",
                index: 10,
                isDisplayed: false,
                x: 15.5 * Settings.cellSize,
                y: 2 * Settings.cellSize,
                width: 2 * Settings.cellSize,
                height: 4 * Settings.cellSize,
                mapX: 8,
                mapY: 8,
                mapWidth: 116,
                mapHeight: 192,
            },
            {
                name: "hint bgn Center",
                index: 11,
                isDisplayed: false,
                x: 2 * Settings.cellSize,
                y: 2 * Settings.cellSize,
                width: Settings.cellSize * Settings.columns + 20,
                height: Settings.cellSize * Settings.rows + 20,
                mapX: 8,
                mapY: 8,
                mapWidth: 116,
                mapHeight: 192,
            },
            {
                name: "score Left",
                index: 12,
                isDisplayed: false,
                x: 2 * Settings.cellSize,
                y: 13.5 * Settings.cellSize,
                width: Settings.cellSize * (Settings.columns + 1),
                height: Settings.cellSize,
                mapX: 4,
                mapY: 461,
                mapWidth: 167,
                mapHeight: 28,
            },
            {
                name: "score Right",
                index: 13,
                isDisplayed: false,
                x: 18.5 * Settings.cellSize,
                y: 13.5 * Settings.cellSize,
                width: Settings.cellSize * (Settings.columns + 1),
                height: Settings.cellSize,
                mapX: 4,
                mapY: 461,
                mapWidth: 167,
                mapHeight: 28,
            },
            {
                name: "score Center",
                index: 14,
                isDisplayed: false,
                x: 2 * Settings.cellSize,
                y: 13.5 * Settings.cellSize,
                width: Settings.cellSize * (Settings.columns + 1),
                height: Settings.cellSize,
                mapX: 4,
                mapY: 461,
                mapWidth: 167,
                mapHeight: 28,
            },


        ]
        this.backgroundList = [
            {
                name: "bgn1",
                index: 0,
                isDisplayed: false,
                x: 0,
                y: 0,
                width: Settings.screenWidth,
                height: Settings.screenHeight,
                mapX: 0,
                mapY: 0,
                mapWidth: Settings.screenWidth,
                mapHeight: Settings.screenHeight,
            },
            {
                name: "bgn2",
                index: 1,
                isDisplayed: false,
                x: 260,
                y: 190,
                width: 480,
                height: 90,
                mapX: 579,
                mapY: 139,
                mapWidth: 90,
                mapHeight: 20,
            },
        ]
        this.interfacesList = [
            {
                name: "game menu",
                index: 0,
                isDisplayed: false,
                isActive: false,
                shape: "rect",
                x: 9 * Settings.cellSize,
                y: 2 * Settings.cellSize,
                width: 8 * Settings.cellSize,
                height: 8 * Settings.cellSize,
                radius: 0,
                mapX: 1,
                mapY: 1,
                mapWidth: 100,
                mapHeight: 100,
                map: [
                    {
                        name: "startBtn",
                        index: 0,
                        shape: "roundrect",
                        radius: Settings.cellSize / 2,
                        x: 2 * Settings.cellSize,
                        y: 2.5 * Settings.cellSize,
                        width: 4 * Settings.cellSize,
                        height: Settings.cellSize,
                    },
                    {
                        name: "settingsBtn",
                        index: 1,
                        shape: "circle",
                        radius: 0,
                        x: 2 * Settings.cellSize,
                        y: 5 * Settings.cellSize,
                        width: 4 * Settings.cellSize,
                        height: Settings.cellSize,
                    },
                    {
                        name: "exitBtn",
                        index: 2,
                        shape: "rect",
                        radius: 0,
                        x: 2 * Settings.cellSize,
                        y: 4.5 * Settings.cellSize,
                        width: 4 * Settings.cellSize,
                        height: Settings.cellSize,
                    }
                ]
            },
            {
                name: "end game",
                index: 1,
                isDisplayed: false,
                isActive: false,
                shape: "rect",
                radius: 0,
                x: 9 * Settings.cellSize,
                y: 5 * Settings.cellSize,
                width: 8 * Settings.cellSize,
                height: 8 * Settings.cellSize,
                mapX: 1,
                mapY: 2,
                mapWidth: 120,
                mapHeight: 50,
            },
        ]

        this.digitList = [
            {
                digit:0,
                mapX: 583,
                mapY: 10,
                mapWidth: 15,
                mapHeight: 24,
            },
            {
                digit:1,
                mapX: 603,
                mapY: 11,
                mapWidth: 11,
                mapHeight: 22,
            },
            {
                digit:2,
                mapX: 619,
                mapY: 10,
                mapWidth: 14,
                mapHeight: 23,
            },
            {
                digit:3,
                mapX: 637,
                mapY: 10,
                mapWidth: 15,
                mapHeight: 24,
            },
            {
                digit:4,
                mapX: 655,
                mapY: 10,
                mapWidth: 15,
                mapHeight: 24,
            },
            {
                digit:5,
                mapX: 674,
                mapY: 11,
                mapWidth: 14,
                mapHeight: 23,
            },
            {
                digit:6,
                mapX: 691,
                mapY: 10,
                mapWidth: 15,
                mapHeight: 24,
            },
            {
                digit:7,
                mapX: 583,
                mapY: 43,
                mapWidth: 16,
                mapHeight: 23,
            },
            {
                digit:8,
                mapX: 601,
                mapY: 42,
                mapWidth: 15,
                mapHeight: 24,
            },
            {
                digit:9,
                mapX: 618,
                mapY: 43,
                mapWidth: 16,
                mapHeight: 23,
            },

        ]

        this.backgroundSheet = new Image();
        this.guiSheet = new Image();
        this.interfaceSheet = new Image();
        this.isAssetsReady = false;
        //画像をロード
        this.loadGuiImg();
        //ゲーム画面を表示



        //マウスクリックエベントを設定
        document.getElementById('interactiveLayer').addEventListener('click', function (e) {
            var place = document.getElementById('interactiveLayer').getBoundingClientRect();
            let x = e.clientX - place.left;
            let y = e.clientY - place.top;
            console.log(x + " + " + y)

            Gui.isGuiElement(x, y);
        }, false);

        //initialize
        this.setBackground(Settings.bgn);
        this.displayInterface([0]);
    }

    static setBackground(id) {
        let ctx = this.getContext("backgroundLayer");
        let area = this.backgroundList[id];
        if (this.backgroundSheet.complete) {
            ctx.drawImage(
                this.backgroundSheet,
                //area.mapX, area.mapY, area.mapWidth, area.mapHeight,
                area.x, area.y, area.width, area.height
            );
        } else {
            this.backgroundSheet.onload = () => {
                ctx.drawImage(
                    this.backgroundSheet,
                    area.x, area.y, area.width, area.height
                );
            };
        }
        //ゲームスタートの画面を表示された処理
        this.backgroundList[id].isDisplayed = true;
    }
    static setGUI(ids) {
        //ゲームスタートの画面を表示

        for (let i = 0; i < ids.length; i++) {
            let ctx = this.getContext("backgroundLayer");
            let area = this.guiList[ids[i]];
            if (this.guiSheet.complete) {
                ctx.drawImage(
                    this.guiSheet,
                    area.mapX, area.mapY, area.mapWidth, area.mapHeight,
                    area.x, area.y, area.width, area.height
                );
            } else {
                this.guiSheet.onload = () => {
                    ctx.drawImage(
                        this.guiSheet,
                        area.mapX, area.mapY, area.mapWidth, area.mapHeight,
                        area.x, area.y, area.width, area.height
                    );
                };
            }
            //ゲームスタートの画面を表示された処理
            this.guiList[ids[i]].isDisplayed = true;
        }
    }
    static clearGUI() {
        let ctx = this.getContext("backgroundLayer");
        ctx.clearRect(0, 0, Settings.screenWidth, Settings.screenHeight)
        this.setBackground(Settings.bgn);
    }

    static displayInterface(ids, data) {
        for (let i = 0; i < ids.length; i++) {
            let ctx = this.getContext("interactiveLayer");
            let area = this.interfacesList[ids[i]];
            if (this.interfaceSheet.complete) {
                ctx.drawImage(
                    this.interfaceSheet,
                    //area.mapX, area.mapY, area.mapWidth, area.mapHeight,
                    area.x, area.y, area.width, area.height
                );
            } else {
                this.interfaceSheet.onload = () => {
                    ctx.drawImage(
                        this.interfaceSheet,
                        //area.mapX, area.mapY, area.mapWidth, area.mapHeight,
                        area.x, area.y, area.width, area.height
                    );
                };
            }
            //データを表示
            if (data) {
                console.log(data)
            }
            //ゲームスタートの画面を表示された処理
            this.interfacesList[ids[i]].isDisplayed = true;
            this.interfacesList[ids[i]].isActive = true;
        }
    }
    static hideInterface(ids) {
        for (let i = 0; i < ids.length; i++) {
            let ctx = this.getContext("interactiveLayer");
            let area = this.interfacesList[ids[i]];
            ctx.clearRect(
                area.x, area.y, area.width, area.height
            );
            //ゲームスタートの画面を表示された処理
            this.interfacesList[ids[i]].isDisplayed = false;
            this.interfacesList[ids[i]].isActive = false;
        }
    }

    //カンバスを作成
    static createBackgroundLayer(width, height) {
        this.ratio = Math.ceil(window.devicePixelRatio);
        const canvas = document.createElement('canvas');
        canvas.id = "backgroundLayer";
        canvas.width = width * this.ratio;
        canvas.height = height * this.ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.style.position = "absolute";
        canvas.style.zIndex = 0;
        canvas.getContext('2d').setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        return canvas;
    }

    //カンバスを作成
    static createGameLayer(width, height) {
        this.ratio = Math.ceil(window.devicePixelRatio);
        const canvas = document.createElement('canvas');
        canvas.id = "gameLayer";
        canvas.width = width * this.ratio;
        canvas.height = height * this.ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.style.position = "absolute";
        canvas.style.zIndex = 1;
        canvas.getContext('2d').setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        return canvas;
    }


    //カンバスを作成
    static createInteractiveLayer(width, height) {
        this.ratio = Math.ceil(window.devicePixelRatio);
        const canvas = document.createElement('canvas');
        canvas.id = "interactiveLayer";
        canvas.width = width * this.ratio;
        canvas.height = height * this.ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.style.position = "absolute";
        canvas.style.zIndex = 2;
        canvas.getContext('2d').setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        return canvas;
    }




    static getContext(id) {
        return document.getElementById(id).getContext("2d");
    }

    static loadGuiImg() {
        this.backgroundSheet.src = "./gameassets/puyo/backgroundSheet.png";
        this.guiSheet.src = "./gameassets/puyo/guiSheet.png";
        this.interfaceSheet.src = "./gameassets/puyo/interfaceSheet.png"
        console.log("assets ready")
    }


    //GUIの中で行われたか
    static isGuiElement(x, y) {
        this.interfacesList.forEach(element => {
            if (this.checkArea(x, y, element.shape, element.x, element.y, element.width, element.height, element.radius) &&
                element.isActive) {

                switch (element.index) {
                    case 0:
                        return this.clickOnMenu(x, y);

                    case 1:
                        return this.clickOnResult(x, y);

                }
            }
        })
        return false;
    }

    static clickOnMenu(x, y) {
        let startX = this.interfacesList[0].x
        let startY = this.interfacesList[0].y
        this.interfacesList[0].map.forEach(area => {
            if (this.checkArea(x, y, area.shape, startX + area.x, startY + area.y, area.width, area.height, area.radius)) {
                console.log("clicked on" + area.name)
                switch (area.index) {
                    case 0:
                        setGameStatus(1);
                        this.hideInterface([0]);
                        return true;
                    case 1:
                    case 2:
                }
            }
        })

    }

    static clickOnResult(x, y) {

        console.log("clicked on result");
        this.hideInterface([1]);
        //ゲーム情報を削除
        this.clearGUI();
        RenderEngine.renderClear();
        this.displayInterface([0]);
        return true;
    }

    static checkArea(posX, posY, shape, x, y, width, height, radius) {
        switch (shape) {
            case "rect":
                //四角をチェック
                if (posX > x &&
                    posX < x + width &&
                    posY < y + height &&
                    posY > y) {
                    return true;
                }

                break;
            case "circle":
                break;

            case "roundrect":
                return this.checkArea(posX, posY, "rect", x, y, width, height, radius)
                break
        }
        return false;
    }


}
