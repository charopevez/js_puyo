class Assets {
    static initialize() {
        //GUIを準備
        //ゲーム画面為カンバスを作成
        const GameScreen = document.getElementById('game_container');
        //背景増
        var canvas = this.createBackgroundLayer(Settings.screenWidth, Settings.screenHeight);
        GameScreen.appendChild(canvas);
        //dinamic layer
        canvas = this.createGameLayer(Settings.screenWidth, Settings.screenHeight);
        GameScreen.appendChild(canvas);
        //interactive layer
        canvas = this.createInteractiveLayer(Settings.screenWidth, Settings.screenHeight);
        GameScreen.appendChild(canvas);

        this.menuAssetList = [
            {
                index: 0,
                mapX: 0,
                mapY: 0,
                mapWidth: 2000,
                mapHeight: 2000,
            },
        ]
        this.assetList = [
            {
                //左上の青い枠（場所：対戦画面と勝ち負け画面　背景の真ん中）
                index: 0,
                mapX: 113,
                mapY: 113,
                mapWidth: 1076,
                mapHeight: 1815,
            },
            //その横の背景3つ（場所：対戦画面と勝ち負け画面　背景の真ん中）
            {
                //ピンク↓
                index: 1,
                mapX: 1301,
                mapY: 113,
                mapWidth: 1025,
                mapHeight: 1778,
            },
            {
                //黄色↓
                index: 2,
                mapX: 840,
                mapY: 20,
                mapWidth: 380,
                mapHeight: 626,
            },
            {
                //グレー↓
                index: 3,
                mapX: 3576,
                mapY: 113,
                mapWidth: 1026,
                mapHeight: 1778,
            },
            {
                //WINER!（場所：勝ち負け画面の真ん中）
                index: 4,
                mapX: 113,
                mapY: 2041,
                mapWidth: 891,
                mapHeight: 217,
            },
            {
                //LOSER↓（場所：勝ち負け画面の真ん中）
                index: 5,
                mapX: 113,
                mapY: 2371,
                mapWidth: 888,
                mapHeight: 217,
            },
            //名前3つ（場所：対戦画面と勝ち負け画面の下）
            {
                //緑山ライム（黄色）
                index: 6,
                mapX: 113,
                mapY: 2371,
                mapWidth: 888,
                mapHeight: 217,
                R: 16
            },
            {
                //魚住水姫（ピンク）↓
                index: 7,
                mapX: 20,
                mapY: 1010,
                mapWidth: 326,
                mapHeight: 37,
                R: 16
            },
            {
                //レオ・ローレンツ（グレー）↓
                index: 8,
                mapX: 20,
                mapY: 1085,
                mapWidth: 326,
                mapHeight: 37,
                R: 16
            },
            {
                //ドロップ6つ（場所：対戦画面）
                //赤↓
                index: 9,
                mapX: 113,
                mapY: 3351,
                mapWidth: 114,
                mapHeight: 114,
            },
            {
                //黄色↓
                index: 10,
                mapX: 340,
                mapY: 3351,
                mapWidth: 114,
                mapHeight: 114,
            },
            {
                //青↓
                index: 11,
                mapX: 566,
                mapY: 3351,
                mapWidth: 114,
                mapHeight: 114,
            },
            {
                //緑↓
                index: 12,
                mapX: 793,
                mapY: 3351,
                mapWidth: 114,
                mapHeight: 114,
            },
            {
                //紫↓
                index: 13,
                mapX: 1020,
                mapY: 3351,
                mapWidth: 114,
                mapHeight: 114,
            },
            {
                //白↓
                index: 14,
                mapX: 1247,
                mapY: 3351,
                mapWidth: 114,
                mapHeight: 114,
            },
            {
                //VS（場所：対戦画面と勝ち負け画面　上下中央揃え）
                index: 15,
                mapX: 20,
                mapY: 1242,
                mapWidth: 157,
                mapHeight: 155,
            },
            //次に来るドロップの場所（場所：対戦画面と勝ち負け画面）
            {
                //2つバージョン↓
                index: 16,
                mapX: 480,
                mapY: 687,
                mapWidth: 60,
                mapHeight: 225,
            },
            {
                //1つバージョン↓
                index: 17,
                mapX: 579,
                mapY: 687,
                mapWidth: 60,
                mapHeight: 114,
            },
            //その背景3つ（場所：対戦画面と勝ち負け画面）
            {
                //2つ黄色↓
                index: 18,
                mapX: 725,
                mapY: 816,
                mapWidth: 53,
                mapHeight: 218,
            },
            {
                //2つピンク↓
                index: 19,
                mapX: 817,
                mapY: 816,
                mapWidth: 53,
                mapHeight: 218,
            },
            {
                //2つグレー↓
                index: 20,
                mapX: 910,
                mapY: 816,
                mapWidth: 53,
                mapHeight: 218,
            },
            {
                //1つ黄色↓
                index: 21,
                mapX: 725,
                mapY: 1018,
                mapWidth: 53,
                mapHeight: 107,
            },
            {
                //1つピンク↓
                index: 22,
                mapX: 817,
                mapY: 1017,
                mapWidth: 53,
                mapHeight: 107,
            },
            {
                //1つグレー↓
                index: 23,
                mapX: 910,
                mapY: 1017,
                mapWidth: 53,
                mapHeight: 107,
            },
            {
                //キャラクター3人（場所：対戦画面と勝ち負け画面）
                //緑山ライム（一番左）
                index: 24,
                mapX: 2768,
                mapY: 2004,
                mapWidth: 728,
                mapHeight: 2255,
            },
            {
                //魚住水姫↓
                index: 25,
                mapX: 3608,
                mapY: 2007,
                mapWidth: 728,
                mapHeight: 2255,
            },
            {
                //レオ・ローレンツ↓
                index: 26,
                mapX: 4448,
                mapY: 2004,
                mapWidth: 728,
                mapHeight: 2255,
            },
        ]

        //GUIを初期化
        this.guiList = [
            {
                name: "field left frame",
                index: 0,
                isDisplayed: false,
                x: 4 * Settings.cellSize,
                y: 1 * Settings.cellSize,
                width: Settings.cellSize * Settings.columns + 20,
                height: Settings.cellSize * Settings.rows + 20,
                asset: this.assetList[0],
            },
            {
                name: "field right frame",
                index: 1,
                isDisplayed: false,
                x: 16.5 * Settings.cellSize,
                y: 1 * Settings.cellSize,
                width: Settings.cellSize * Settings.columns + 20,
                height: Settings.cellSize * Settings.rows + 20,
                asset: this.assetList[0],
            },
            {
                name: "field center frame",
                index: 2,
                isDisplayed: false,
                x: 140,
                y: 90,
                width: Settings.cellSize * Settings.columns + 20,
                height: Settings.cellSize * Settings.rows + 20,
                asset: this.assetList[0],
            },
            {
                name: "field left bgn",
                index: 3,
                isDisplayed: false,
                x: 4.25 * Settings.cellSize,
                y: 1.25 * Settings.cellSize,
                width: Settings.cellSize * Settings.columns,
                height: Settings.cellSize * Settings.rows,
                asset: this.assetList[Settings.character],
            },
            {
                name: "field Right bgn",
                index: 4,
                isDisplayed: false,
                x: 16.75 * Settings.cellSize,
                y: 1.25 * Settings.cellSize,
                width: Settings.cellSize * Settings.columns,
                height: Settings.cellSize * Settings.rows,
                asset: this.assetList[3],
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
            {
                name: "character left",
                index: 15,
                isDisplayed: false,
                x: 0 * Settings.cellSize,
                y: 1 * Settings.cellSize,
                width: Settings.cellSize * 4,
                height: Settings.cellSize * 12,
                asset: this.assetList[24 + Settings.character],
            },
            {
                name: "character right",
                index: 16,
                isDisplayed: false,
                x: 23 * Settings.cellSize,
                y: 1 * Settings.cellSize,
                width: Settings.cellSize * 4,
                height: Settings.cellSize * 12,
                asset: this.assetList[24 + 2],
            },
            {
                name: "character center",
                index: 17,
                isDisplayed: false,
                x: 18.5 * Settings.cellSize,
                y: 1 * Settings.cellSize,
                width: Settings.cellSize * 2,
                height: Settings.cellSize * 2,
                asset: this.assetList[24 + Settings.character],
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
                name: "start screen",
                index: 0,
                isDisplayed: false,
                isActive: false,
                shape: "rect",
                asset: this.menuAssetList[0],
                x: 0,
                y: 0,
                width: Settings.screenWidth,
                height: Settings.screenHeight,
                radius: 0,
                map: [
                    {
                        name: "startBtn",
                        index: 0,
                        shape: "roundrect",
                        radius: Settings.cellSize / 2,
                        x: 740,
                        y: 443,
                        width: 240,
                        height: 75,
                        asset: null,
                    },
                    {
                        name: "rulesBtn",
                        index: 1,
                        shape: "roundrect",
                        radius: Settings.cellSize / 2,
                        x: 740,
                        y: 543,
                        width: 240,
                        height: 75,
                        asset: null,
                    },
                ]
            },
            // {
            //     name: "game menu",
            //     index: 1,
            //     isDisplayed: false,
            //     isActive: false,
            //     shape: "rect",
            //     x: 9 * Settings.cellSize,
            //     y: 2 * Settings.cellSize,
            //     width: 8 * Settings.cellSize,
            //     height: 8 * Settings.cellSize,
            //     radius: 0,
            //     mapX: 1,
            //     mapY: 1,
            //     mapWidth: 100,
            //     mapHeight: 100,
            //     map: [
            //         {
            //             name: "startBtn",
            //             index: 0,
            //             shape: "roundrect",
            //             radius: Settings.cellSize / 2,
            //             x: 2 * Settings.cellSize,
            //             y: 2.5 * Settings.cellSize,
            //             width: 4 * Settings.cellSize,
            //             height: Settings.cellSize,
            //         },
            //         {
            //             name: "settingsBtn",
            //             index: 1,
            //             shape: "circle",
            //             radius: 0,
            //             x: 2 * Settings.cellSize,
            //             y: 5 * Settings.cellSize,
            //             width: 4 * Settings.cellSize,
            //             height: Settings.cellSize,
            //         },
            //         {
            //             name: "exitBtn",
            //             index: 2,
            //             shape: "rect",
            //             radius: 0,
            //             x: 2 * Settings.cellSize,
            //             y: 4.5 * Settings.cellSize,
            //             width: 4 * Settings.cellSize,
            //             height: Settings.cellSize,
            //         }
            //     ]
            // },
            {
                name: "game result",
                index: 1,
                isDisplayed: false,
                isActive: false,
                shape: "rect",
                radius: 0,
                x: 0,
                y: 0,
                width: Settings.screenWidth,
                height: Settings.screenHeight,
                asset: null,
                map: [
                    {
                        name: "Left result",
                        index: 0,
                        shape: "roundrect",
                        radius: Settings.cellSize / 2,
                        x: 4 * Settings.cellSize,
                        y: 4 * Settings.cellSize,
                        width: Settings.cellSize * Settings.columns + 20,
                        height: Settings.cellSize * 2,
                        asset: null,
                    },
                    {
                        name: "Right result",
                        index: 1,
                        shape: "roundrect",
                        radius: Settings.cellSize / 2,
                        x: 16.5 * Settings.cellSize,
                        y: 4 * Settings.cellSize,
                        width: Settings.cellSize * Settings.columns + 20,
                        height: Settings.cellSize * 2,
                        asset: null,
                    },
                    {
                        name: "Center result",
                        index: 1,
                        shape: "roundrect",
                        radius: Settings.cellSize / 2,
                        x: 140,
                        y: 90,
                        width: Settings.cellSize * Settings.columns + 20,
                        height: Settings.cellSize * Settings.rows + 20,
                        asset: null,
                    },
                ]
            },
        ]

        this.digitList = [
            {
                digit: 0,
                mapX: 583,
                mapY: 10,
                mapWidth: 15,
                mapHeight: 24,
            },
            {
                digit: 1,
                mapX: 603,
                mapY: 11,
                mapWidth: 11,
                mapHeight: 22,
            },
            {
                digit: 2,
                mapX: 619,
                mapY: 10,
                mapWidth: 14,
                mapHeight: 23,
            },
            {
                digit: 3,
                mapX: 637,
                mapY: 10,
                mapWidth: 15,
                mapHeight: 24,
            },
            {
                digit: 4,
                mapX: 655,
                mapY: 10,
                mapWidth: 15,
                mapHeight: 24,
            },
            {
                digit: 5,
                mapX: 674,
                mapY: 11,
                mapWidth: 14,
                mapHeight: 23,
            },
            {
                digit: 6,
                mapX: 691,
                mapY: 10,
                mapWidth: 15,
                mapHeight: 24,
            },
            {
                digit: 7,
                mapX: 583,
                mapY: 43,
                mapWidth: 16,
                mapHeight: 23,
            },
            {
                digit: 8,
                mapX: 601,
                mapY: 42,
                mapWidth: 15,
                mapHeight: 24,
            },
            {
                digit: 9,
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

            Assets.isGuiElement(x, y);
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
                    area.asset.mapX, area.asset.mapY, area.asset.mapWidth, area.asset.mapHeight,
                    area.x, area.y, area.width, area.height
                );
            } else {
                this.guiSheet.onload = () => {
                    ctx.drawImage(
                        this.guiSheet,
                        area.asset.mapX, area.asset.mapY, area.asset.mapWidth, area.asset.mapHeight,
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

    //display interactive layer element
    static displayInterface(ids, args) {
        for (let i = 0; i < ids.length; i++) {
            let ctx = this.getContext("interactiveLayer");
            let area = this.interfacesList[ids[i]];
            //setup interface
            //check variables
            if (args != null) {
                this.setValues(area, args);
            }
            //blur layer behind
            ctx.globalAlpha = 0.3;
            ctx.fillStyle="gray"
            ctx.fillRect(0, 0, Settings.screenWidth, Settings.screenHeight);
            ctx.globalAlpha = 1.0;

            //背景を表示
            if (area.asset !== null) {
                let ctx = this.getContext("interactiveLayer");
                if (this.interfaceSheet.complete) {
                    ctx.drawImage(
                        this.interfaceSheet,
                        area.asset.mapX, area.asset.mapY, area.asset.mapWidth, area.asset.mapHeight,
                        area.x, area.y, area.width, area.height
                    );
                } else {
                    this.interfaceSheet.onload = () => {
                        ctx.drawImage(
                            this.interfaceSheet,
                            area.asset.mapX, area.asset.mapY, area.asset.mapWidth, area.asset.mapHeight,
                            area.x, area.y, area.width, area.height
                        );
                    };
                }
            }
            //パーツを表示            
            area.map.forEach(part => {
                if (part.asset !== null) {
                    let ctx = this.getContext("interactiveLayer");
                    if (this.guiSheet.complete) {
                        ctx.drawImage(
                            this.guiSheet,
                            part.asset.mapX, part.asset.mapY, part.asset.mapWidth, part.asset.mapHeight,
                            part.x, part.y, part.width, part.height
                        );
                    } else {
                        this.guiSheet.onload = () => {
                            ctx.drawImage(
                                this.guieSheet,
                                part.asset.mapX, part.asset.mapY, part.asset.mapWidth, part.asset.mapHeight,
                                part.x, part.y, part.width, part.height
                            );
                        };
                    }
                }
            })

            //データを表示
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
        this.backgroundSheet.src = "./static/images/backgroundSheet.png";
        //this.guiSheet.src = "./static/images/guiSheet.png";
        //this.interfaceSheet.src = "./static/images/interfaceSheet.png";
        this.guiSheet.src = "./static/img/puyo/assets/assetSheet.png";
        this.interfaceSheet.src = "./static/img/puyo/assets/interfaceSheet.jpg"
        console.log("assets ready")
    }


    //GUIの中で行われたか
    static isGuiElement(x, y) {
        this.interfacesList.forEach(element => {
            if (this.checkArea(x, y, element.shape, element.x, element.y, element.width, element.height, element.radius) &&
                element.isActive) {

                switch (element.index) {
                    case 0:
                        return this.clickOnStartScreen(x, y);

                    case 1:
                        return this.clickOnResult(x, y);

                }
            }
        })
        return false;
    }

    static clickOnStartScreen(x, y) {
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
                    console.log("in")
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


    static drawActiveArea(shape, x, y, width, height, radius) {
        let ctx = this.getContext("interactiveLayer");
        let color = "blue";
        ctx.fillStyle = color;
        ctx.fillRect(x,
            y,
            width,
            height);
    }

    //**
    /* iterate throw @area and replays all @area's key value with @args's key_args values
    /* 
     */
    static setValues(area, args) {
        Object.keys(args).forEach(key => {
            key = key.substring(0, key.length - 5);
            console.log("key", key)
            if (key in area) {
                if (Array.isArray(area[key])) {
                    console.log("array");
                    console.log(area[key])
                    console.log(args[key + "_args"])
                    for (let i = 0; i < area[key].length; i++) {
                        this.setValues(area[key][i], args[key + "_args"][i]);
                    }
                } else {
                    area[key] = args[key + "_args"]
                }
            }
        })
    }
}
