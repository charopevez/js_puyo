class Score {
    // static score{Player1:0, PLayer2:0};
    static initialize() {
        this.score = [0,0];
        this.showScore();
    }

    // スコアを表示
    static showScore() {
        let score = this.score;
        //RenderEngine.renderScore(score);

    }

    // スコアを計算
    static calculateScore (player, combination, piece, obj) {
        combination = Math.min(combination, Score.combinationBonus.length - 1);
        piece = Math.min(piece, Score.sizeBonus.length - 1);
        obj = Math.min(obj, Score.objBonus.length - 1);
        console.log ("bonus"+combination+" "+piece+" "+obj )
        let bonus = Score.combinationBonus[combination] + Score.sizeBonus[piece] + Score.objBonus[obj];
        bonus=bonus? bonus:1;
        this.addScore(bonus * piece * 10, player);
    }

    //スコアを更新
    static addScore (score, player) {
        this.score[player] += score;
        console.log(this.score[0], this.score[1])
        this.showScore();
    }
   };
   Score.sizeBonus =  [0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 10, 10];
   Score.combinationBonus = [0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608, 640, 672];
   Score.objBonus = [0, 0, 3, 6, 12, 24];

