class Player {

    /**
     * right: 右に移動,
        left: 左に移動,
        rotate: 曲がり,
        fall: 落とす
     */

    static initialize() {
        //キーボードの入力を確認する
        this.keyStatus = {
            right: false,
            left: false,
            rotate: false,
            fall: false
        };
        // ブラウザのキーボードの入力イベントリスナ
        document.addEventListener('keydown', (e) => {
            // キーボードが押された場合
            switch (e.code) {
                case "ArrowLeft": // 左向きキー
                    this.keyStatus.left = true;
                    e.preventDefault(); 
                    return false;
                case "ArrowUp": // 上向きキー
                    this.keyStatus.rotate = true;
                    e.preventDefault(); 
                    return false;
                case "ArrowRight": // 右向きキー
                    this.keyStatus.right = true;                  
                    e.preventDefault(); 
                    return false;
                case "ArrowDown": // 下向きキー
                    this.keyStatus.fall = true;
                    e.preventDefault(); 
                    return false;
            }
        });
        document.addEventListener('keyup', (e) => {
            // キーボードが離された場合
            switch (e.code) {
                case "ArrowLeft": // 左向きキー
                    this.keyStatus.left = false;
                    e.preventDefault(); return false;
                case "ArrowUp": // 上向きキー
                    this.keyStatus.rotate = false;
                    e.preventDefault(); return false;
                case "ArrowRight": // 右向きキー
                    this.keyStatus.right = false;
                    e.preventDefault(); return false;
                case "ArrowDown": // 下向きキー
                    this.keyStatus.fall = false;
                    e.preventDefault(); return false;
            }
        });
    }

}