class Settings{
    static initialize(){
        this.screenWidth=1000;
        this.screenHeight=680;
        this.mode=2;
        this.rows=12; // ステージの縦の個数
        this.columns=6; // ステージの横の個数
        this.freeFallSpeed=60;  // 自由落下のスピード
        this.playerFallSeed=1; //ユーザーにさせた落下のスピード
        this.eraseCount = 4; // 何個以上揃ったら消えるか
        this.cellSize=40; //プヨのサイズ
        this.maxType=6;　//プヨの種類
        this.movementSpeed=5;
        this.maxSize=2;
        this.puyoType=["","red", "pink", "green", "orange", "white", "purple"]
        this.hintStyle='black'
        this.fieldStyle='blue'
        this.scoreStyle='yellow'
        this.fontColor= 'black';
        this.bgn=0;

        if (this.mode>1) {
            this.fieldPlace= [
                    [100, 20, this.columns*this.cellSize, this.rows*this.cellSize],
                    [this.screenWidth-100-this.columns*this.cellSize, 20, this.columns*this.cellSize, this.rows*this.cellSize]
                ]
            
            this.scorePlace= [
                    [100-this.cellSize/2, 20+this.rows*this.cellSize, (this.columns+1)*this.cellSize, 60],
                    [this.screenWidth-100-(this.columns+0.5)*this.cellSize, 20+this.rows*this.cellSize, (this.columns+1)*this.cellSize, 60]
                ]

            this.hintPlace= [
                    [100+this.columns*this.cellSize, 20, 3*this.cellSize, 6*this.cellSize],
                    [this.screenWidth-100-this.columns*this.cellSize-3*this.cellSize, 20, 3*this.cellSize, 6*this.cellSize]
                ]
        } else {
            this.fieldPlace= [
                    [(this.screenWidth-this.columns*this.cellSize)/2, 20, 3*this.cellSize, 6*this.cellSize]
                ]

            this.scorePlace= [
                    [(this.screenWidth-(this.columns+1)*this.cellSize)/2, 20+this.rows*this.cellSize, (this.columns+1)*this.cellSize, 60]
                ]
                
            this.hintPlace= [
                    [(this.screenWidth-(this.columns+1)*this.cellSize)/2, 20+this.rows*this.cellSize, 3*this.cellSize, 6*this.cellSize]
                ]
        }
        
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

}