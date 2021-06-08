class Score {
    // static score{Player1:0, PLayer2:0};
    static initialize() {
        this.score = [0,0];
        this.showScore();
    }

    // スコアを表示
    static showScore() {
        let score = this.score;
        RenderEngine.renderScore(score);
        // var plScore1 = Board.plScore1;
        // var plScore2 = Board.plScore2;
        // plScore1 = plScore1.getContext("2d");
        // plScore2 = plScore2.getContext("2d");
        // // まず最初に、plScore の中身を空っぽにする
        // // スコアを表示
        // plScore1.font = "normal 36px Verdana";
        // plScore2.font = "normal 36px Verdana";
        // plScore1.fillText(score[0], 50, 40);
        // plScore2.fillText(score[1], 50, 40);
    }

    // スコアを計算
    static calculateScore (player1, player2) {
        player1 = Math.min(player1, Score.sizeBonus.length - 1);
        player2 = Math.min(player2, Score.sizeBonus.length - 1);
    this.addScore([player1, player2]);
    }

    //スコアを更新
    static addScore (score) {
        //player１の
        this.score[0] += score[0];
        //player２の
        this.score[1] += score[1];
        //
        console.log(this.score[0], this.score[1])
        this.showScore();
    }
   };
   Score.sizeBonus =  [0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 10, 10];

