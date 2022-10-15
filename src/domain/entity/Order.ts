import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
    orderItems: OrderItem[];
    cpf: Cpf;
    coupon?: Coupon;
    constructor(cpf: string){
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
    }

    addItem(item: Item, quantity: number) {
        const existItem = this.orderItems.find((element) => element.itemId === item.id);
        if(existItem){
            throw new Error("Item já adicionado a ordem.");            
        }
        this.orderItems.push(new OrderItem(item.id, item.value, quantity));
    }

    getTotal(): number {
        let total = this.orderItems.reduce((total, orderItem) => {
            total += orderItem.getTotal();
            return total;
        }, 0);
        
        return (this.coupon) ? total - this.coupon.calculateDiscount(total) : total;
    }

    AddCoupon(coupon: Coupon) {
        this.coupon = coupon;
    }
}