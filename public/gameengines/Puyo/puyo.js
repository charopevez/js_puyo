class Puyo{
    static initialize() {
        // 新しいオブジェクトの種類を決める
        this.objTypes = Math.max(1, Math.min(6, Settings.maxType));
        this.objList1 = [];
        this.objList2 = [];
        this.generatePuyo();
        this.generatePuyo();
        this.generatePuyo()
        
    }

    static generatePuyo() {
        let center = Math.floor(Math.random() * this.objTypes) + 1;
        let rotatable = Math.floor(Math.random() * this.objTypes) + 1;
        this.objList1.push({
            objCenter: center,
            objRotatable: rotatable
        })
        this.objList2.push({
            objCenter: center,
            objRotatable: rotatable
        })
        
    }

    static nextObj(list) {
        this.generatePuyo();
        if (list<1) {
            return this.objList1.shift();
        }
        return this.objList2.shift();
    }


    static generateResult(frame) {

    }


    //#region 表示

    static renderResult(frame) {

    }
    //#endregion

}