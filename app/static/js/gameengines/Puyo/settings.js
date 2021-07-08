class Settings {
    static initialize() {
        this.mode = 2;
        this.rows = 12; // ステージの縦の個数
        this.columns = 6; // ステージの横の個数
        this.freeFallSpeed = 60;  // 自由落下のスピード
        this.playerFallSeed = 1; //ユーザーにさせた落下のスピード
        this.eraseCount = 4; // 何個以上揃ったら消えるか
        this.cellSize = 40; //プヨのサイズ
        this.screenWidth = 27 * this.cellSize;
        this.screenHeight = 16 * this.cellSize;;
        this.maxType = 6;　//プヨの種類
        this.movementSpeed = 10;
        this.maxSize = 2;
        this.puyoType = ["", "red", "pink", "green", "orange", "white", "purple"]
        this.hintStyle = 'black'
        this.fieldStyle = 'blue'
        this.scoreStyle = 'yellow'
        this.fontColor = 'black';
        this.bgn = 0;
        this.fontSize = this.cellSize * 3 / 5;
        this.character = 1;

    }

    static getMode() {
        return this.mode;
    }

    static getPlayerNumber() {
        if (this.mode < 2) {
            return 1;
        } else {
            return 2;
        }
    }

    static getGui() {
        let guiList = [];
        if (this.mode < 2) {
            return [2, 5, 8, 11, 14];
        } else {

            //左のキャラクター
            guiList.push(15)
            //右のキャラクター
            guiList.push(16)
            //左の背景
            guiList.push(3)
            //右の背景
            guiList.push(4)
            //左の青い枠
            guiList.push(0)
            //右の青い枠
            guiList.push(1)


            console.log(guiList)
            return guiList;
        }
    }

    static increaseFreeFallSpeed() {
        this.freeFallSpeed -= 10;
    }

}