class Gui {
    static initialize() {
        //GUIを準備
        //ゲーム画面為カンバスを作成
        const GameScreen = document.getElementById('game');
        var canvas = this.createGameScreen(Settings.screenWidth, Settings.screenHeight);
        GameScreen.appendChild(canvas);

        //GUIを初期化
        this.interfaceList = [
            {
                name: "windowStart",
                index: 0,
                isDisplayed: true,
                x: 260,
                y: 190,
                width: 480,
                height: 90,
                mapX: 579,
                mapY: 139,
                mapWidth: 90,
                mapHeight: 20,
            },
            {
                name: "field  Left",
                index: 1,
                isDisplayed: false,
                x: Settings.screenWidth/8,
                y: Settings.screenWidth/16,
                width: Settings.cellSize*Settings.columns,
                height: Settings.cellSize*Settings.rows,
                mapX: 8,
                mapY: 8,
                mapWidth: 116,
                mapHeight: 192, 
            }   
        ]
        this.backgroundList=[
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
        
        this.background= new Image();
        this.spritemap = new Image();
        //画像をロード
        console.log("Loading")
        this.loadGuiImg();
        //ゲーム画面を表示
        //this.setBackground(Settings.bgn);
        this.displayInterface(0);


        //マウスクリックエベントを設定
        document.getElementById('gameScreen').addEventListener('click', function (e) {
            var place = document.getElementById('gameScreen').getBoundingClientRect();
            let x = e.clientX - place.left;
            let y = e.clientY - place.top;
            console.log(x + " + " + y)

            Gui.isGuiElement(x, y);
        }, false);
    }

    static displayInterface(id) {
        //ゲームスタートの画面を表示
        let ctx = this.getContext();
        let area = this.interfaceList[id];
        if (this.spritemap.complete) {
            ctx.drawImage(
                this.spritemap,
                area.mapX, area.mapY, area.mapWidth, area.mapHeight,
                area.x, area.y, area.width, area.height
            );
        } else {
            this.spritemap.onload =  () => {
                ctx.drawImage(
                    this.spritemap,
                    area.mapX, area.mapY, area.mapWidth, area.mapHeight,
                    area.x, area.y, area.width, area.height
                );    
            };
        } 
        //ゲームスタートの画面を表示された処理
        this.interfaceList[id].isDisplayed=true;
    }

    static setBackground(id){
        let ctx = this.getContext();
        //ctx.globalCompositeOperation = 'destination-over';
        let area = this.backgroundList[id];
        console.log(area)
        if (this.background.complete) {
            ctx.drawImage(
                this.background,
                area.mapX, area.mapY, area.mapWidth, area.mapHeight,
                area.x, area.y, area.width, area.height
            );
        } else {
            this.background.onload =  () => {
                ctx.drawImage(
                    this.background,
                    area.x, area.y, area.width, area.height
                );    
            };
        } 
        //ゲームスタートの画面を表示された処理
        this.backgroundList[id].isDisplayed=true;
    }

    static refreshGameScreen() {
        console.log("refresh screen")
        this.displayInterface(1);

    }

    //カンバスを作成
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
    static getContext() {
        return document.getElementById('gameScreen').getContext("2d");
    }

    static loadGuiImg() {
        this.spritemap.src = "./gameassets/puyo/spritemap.png";
        this.background.src = "./gameassets/puyo/background.png";
    }


    //GUIの中で行われたか
    static isGuiElement(x, y) {
        this.interfaceList.forEach(element => {
            if (x > element.x &&
                x < element.x + element.width &&
                y < element.y + element.height &&
                y > element.y &&
                element.isDisplayed) {
                console.log("clicked on " + element.name);
                switch (element.index) {
                    case 0:
                        setGameStatus(1);
                        element.isDisplayed = false;
                        break;
                }
            }
        })

    }

}