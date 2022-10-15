export default class Coupon {
    constructor(readonly code: string, readonly percentage: number, readonly expirationDate: Date){
        if(this.isExpiredDate()) throw new Error("Cupom vencido.");
    }

    calculateDiscount(total: number){
        return total * this.percentage / 100;
    }

    isExpiredDate(){
        const actualDate = new Date();
        return (this.expirationDate.getTime() < actualDate.getTime());
    }
}