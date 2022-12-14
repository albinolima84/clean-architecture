import Dimension from "../domain/entity/Dimension";
import Order from "../domain/entity/Order";
import CouponRepository from "../domain/repository/CouponRepository";
import ItemRepository from "../domain/repository/ItemRepository";

export default class Preview {
    constructor(readonly itemRepository: ItemRepository, readonly couponRepository: CouponRepository){

    }

    async execute(input: Input): Promise<number> {
        const order = new Order(input.cpf);
        for(const orderItem of input.orderItems){
            const item = await this.itemRepository.getItem(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }
        if(input.coupon) {
            const coupon = await this.couponRepository.get(input.coupon);
            if (coupon) order.AddCoupon(coupon);
        }
        const total = order.getTotal();
        return total;
    }
}

type Input = {
    cpf: string,
    orderItems: { idItem: number, quantity: number }[],
    coupon?: string
}