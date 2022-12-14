import Order from "../domain/entity/Order";
import CouponRepository from "../domain/repository/CouponRepository";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";

export default class Checkout {
    constructor(
        readonly itemRepository: ItemRepository, 
        readonly orderRepository: OrderRepository,
        readonly couponRepository: CouponRepository){

    }

    async execute(input: Input): Promise<void> {
        const order = new Order(input.cpf);
        for(const orderItem of input.orderItems){
            const item = await this.itemRepository.getItem(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }

        if(input.coupon){
            const coupon = await this.couponRepository.get(input.coupon);
            if (coupon) {
                order.AddCoupon(coupon);
            }
        }
        await this.orderRepository.save(order);
    }
}

type Input = {
    cpf: string,
    orderItems: { idItem: number, quantity: number }[],
    coupon?: string
}
