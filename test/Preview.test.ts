import Preview from "../src/application/Preview";
import Item from "../src/domain/entity/Item";
import CouponRepositoryMemory from "../src/infra/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../src/infra/memory/ItemRepositoryMemory";

test("Deve simular um pedido", async function(){
    const itemRepository = new ItemRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    itemRepository.save(new Item(1, 'Notebook', 5000));
    itemRepository.save(new Item(2, 'Monitor', 1000));
    itemRepository.save(new Item(3, 'Teclado', 150));
    const preview = new Preview(itemRepository, couponRepository);
    const input = {
        cpf: "111.444.777-35",
        orderItems:[
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 1 }
        ]
    };
    const total = await preview.execute(input);
    expect(total).toBe(6150);
});