class Settings{
    static initialize(){
        this.mode=2;
        this.rows=12; // ステージの縦の個数
        this.columns=6; // ステージの横の個数
        this.freeFallSpeed=60;  // 自由落下のスピード
        this.playerFallSeed=1; //ユーザーにさせた落下のスピード
        this.eraseCount = 4; // 何個以上揃ったら消えるか
        this.cellSize=40; //プヨのサイズ
        this.screenWidth=27*this.cellSize;
        this.screenHeight=16*this.cellSize;;
        this.maxType=6;　//プヨの種類
        this.movementSpeed=5;
        this.maxSize=2;
        this.puyoType=["","red", "pink", "green", "orange", "white", "purple"]
        this.hintStyle='black'
        this.fieldStyle='blue'
        this.scoreStyle='yellow'
        this.fontColor= 'black';
        this.bgn=0;
        
    }

    static getMode(){
        return this.mode;
    }
    
    static getPlayerNumber(){
        if (this.mode<2) {
            return 1;
        }else {
            return 2;
        }
    }

    static getGui(){
        if (this.mode<2) {
            return [2, 5, 8, 11, 14];
        }else {
            return [0,1,3,4, 6,7,9,10, 12,13];
        }
    }

}