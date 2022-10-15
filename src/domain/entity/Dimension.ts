export default class Dimension {
    constructor(readonly height: number, readonly width: number, readonly depth: number){
        if(!this.isValid()) throw new Error("Dimensão do produto inválida.");
    }

    isValid() {
        return (this.height > 0 && this.width > 0 && this.depth > 0);
    }
}


