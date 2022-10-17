export default class Coupon {
    constructor(readonly code: string, readonly percentage: number, readonly expirationDate?: Date){
    }

    calculateDiscount(total: number){
        if(this.isExpiredDate()) return 0;
        return total * this.percentage / 100;
    }

    isExpiredDate(){
        const actualDate = new Date();
        return (this.expirationDate && this.expirationDate.getTime() < actualDate.getTime());
    }
}