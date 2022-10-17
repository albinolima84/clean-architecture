import Checkout from "../src/application/Checkout";
import GetOrdersByCpf from "../src/application/GetOrdersByCpf";
import Coupon from "../src/domain/entity/Coupon";
import Item from "../src/domain/entity/Item";
import CouponRepositoryMemory from "../src/infra/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../src/infra/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../src/infra/memory/OrderRepositoryMemory";

test("Deve fazer o pedido", async function(){
    const itemRepository = new ItemRepositoryMemory();
    itemRepository.save(new Item(1, 'Notebook', 5000));
    itemRepository.save(new Item(2, 'Monitor', 1000));
    itemRepository.save(new Item(3, 'Teclado', 150));

    const orderRepository = new OrderRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const cpf = "111.444.777-35";
    const checkout = new Checkout(itemRepository, orderRepository, couponRepository);
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

test("Deve fazer o pedido com cupom de desconto", async function(){
    const itemRepository = new ItemRepositoryMemory();
    itemRepository.save(new Item(1, 'Notebook', 5000));
    itemRepository.save(new Item(2, 'Monitor', 1000));
    itemRepository.save(new Item(3, 'Teclado', 150));

    const orderRepository = new OrderRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    await couponRepository.save(new Coupon("VALE20", 20));
    const coupon = await couponRepository.get("VALE20");
    expect(coupon?.percentage).toBe(20);
    const cpf = "111.444.777-35";
    const checkout = new Checkout(itemRepository, orderRepository, couponRepository);
    const input = {
        cpf: cpf,
        orderItems:[
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 1 }
        ],
        coupon: "VALE20"
    };
    await checkout.execute(input);
    const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
    const orders  = await getOrdersByCpf.execute(cpf);
    expect(orders).toHaveLength(1);
    expect(orders[0].total).toBe(4920);
});