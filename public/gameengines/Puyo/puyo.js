class Puyo{
    static initialize() {
        // 新しいオブジェクトの種類を決める
        this.objTypes = Math.max(1, Math.min(6, Settings.maxType));
        this.objList = [];
        this.objList.push(this.generatePuyo());
        this.objList.push(this.generatePuyo());
        this.objList.push(this.generatePuyo());
        
    }

    static generatePuyo() {
        let center = Math.floor(Math.random() * this.objTypes) + 1;
        let rotatable = Math.floor(Math.random() * this.objTypes) + 1;
        console.log(center+" "+rotatable);
        return {
            objCenter: center,
            objRotatable: rotatable
        }
    }

    static nextObj() {
        console.log(this.objList)
        this.objList.push(this.generatePuyo());
        console.log("get next puyo")
        console.log(this.objList)
        return this.objList.shift();
    }


    static generateResult(frame) {

    }


    //#region 表示

    static renderResult(frame) {

    }
    //#endregion

}