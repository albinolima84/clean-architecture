import Checkout from "../src/application/Checkout";
import GetOrdersByCpf from "../src/application/GetOrdersByCpf";
import Item from "../src/domain/Item";
import ItemRepositoryMemory from "../src/ItemRepositoryMemory";
import OrderRepositoryMemory from "../src/OrderRepositoryMemory";

test("Deve fazer o pedido", async function(){
    const itemRepository = new ItemRepositoryMemory();
    itemRepository.save(new Item(1, 'Notebook', 5000));
    itemRepository.save(new Item(2, 'Monitor', 1000));
    itemRepository.save(new Item(3, 'Teclado', 150));

    const orderRepository = new OrderRepositoryMemory();
    const cpf = "111.444.777-35";
    const checkout = new Checkout(itemRepository, orderRepository);
    const input = {
        cpf: cpf,
        orderItems:[
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 1 }
        ]
    };
    await checkout.execute(input);
    const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
    const orders  = await getOrdersByCpf.execute(cpf);
    expect(orders).toHaveLength(1);
    expect(orders[0].total).toBe(6150);
});