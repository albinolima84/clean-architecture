import Order from "./domain/Order";
import OrderRepository from "./OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];
    
    constructor(){
        this.orders = [];
    }
    async getByCpf(cpf: string): Promise<Order[]> {
        return this.orders.filter(order => order.cpf.value === cpf);
    }
    
    async save(order: Order): Promise<void> {
        this.orders.push(order);
    }

}