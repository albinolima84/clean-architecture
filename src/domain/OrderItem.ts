import Dimension from "./Dimension";

export default class OrderItem {
    
    constructor(readonly itemId: number, readonly price: number, readonly quantity: number/*, readonly dimension: Dimension, readonly weight: number*/){
        if(quantity < 1) throw new Error("Quantidade inválida.");
        // if(weight < 0) throw new Error("Peso não pode ser negativo.");
    }

    getTotal() {
        return this.quantity * this.price;
    }
}