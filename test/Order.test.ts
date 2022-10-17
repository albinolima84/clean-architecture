import Coupon from "../src/domain/entity/Coupon";
import Dimension from "../src/domain/entity/Dimension";
import Item from "../src/domain/entity/Item";
import Order from "../src/domain/entity/Order";

test("Não deve criar uma ordem com CPF inválido", function (){
    expect(() => new Order('12345678901')).toThrow(new Error("CPF inválido."));
});

test("Deve criar um pedido com 3 itens", function(){
    const order = new Order('111.444.777-35');
    order.addItem(new Item(1, 'Notebook', 5000), 1/*, new Dimension(10, 10, 10), 10*/);
    order.addItem(new Item(2, 'Monitor', 1000), 1/*, new Dimension(10, 10, 10), 10*/);
    order.addItem(new Item(3, 'Teclado', 150), 1/*, new Dimension(10, 10, 10), 10*/);

    expect(order.getTotal()).toBe(6150);
});

test("Deve criar um pedido com cupom de desconto", function(){
    const discount = 15;
    const order = new Order('111.444.777-35');
    order.addItem(new Item(1, 'Notebook', 5000), 1/*, new Dimension(10, 10, 10), 10*/);
    order.addItem(new Item(2, 'Monitor', 1000), 1/*, new Dimension(10, 10, 10), 10*/);
    order.addItem(new Item(3, 'Teclado', 150), 1/*, new Dimension(10, 10, 10), 10*/);
    order.AddCoupon(new Coupon("PrimeiraCompra", discount));

    expect(order.getTotal()).toBe(5227.5);
});

test("Não deve adicionar item a ordem com quantidade negativa", function(){
    const order = new Order('111.444.777-35');
    order.addItem(new Item(1, 'Notebook', 5000), 1/*, new Dimension(10, 10, 10), 10*/);
    expect(() => order.addItem(new Item(2, 'Monitor', 1000), 0/*, new Dimension(10, 10, 10), 10*/)).toThrow(new Error("Quantidade inválida."));
    expect(order.getTotal()).toBe(5000);
});

test("Não deve adicionar o mesmo item mais de uma vez a mesma ordem", function(){
    const order = new Order('111.444.777-35');
    order.addItem(new Item(1, 'Notebook', 5000), 1/*, new Dimension(10, 10, 10), 10*/);
    expect(() => order.addItem(new Item(1, 'Notebook', 5000), 1/*, new Dimension(10, 10, 10), 10*/)).toThrow(new Error("Item já adicionado a ordem."));
    expect(order.getTotal()).toBe(5000);
});

// test("Não deve adicionar item com dimensões negativas a ordem", function(){
//     const order = new Order('111.444.777-35');
//     expect(() => order.addItem(new Item(1, 'Notebook', 5000), new Dimension(-10, 20, 20), 1, 10)).toThrow(new Error("Dimensão do produto inválida."));
//     expect(order.getTotal()).toBe(0);
// });

// test("Não deve adicionar item com peso negativo a ordem", function(){
//     const order = new Order('111.444.777-35');
//     expect(() => order.addItem(new Item(1, 'Notebook', 5000), new Dimension(10, 20, 20), 1, -1)).toThrow(new Error("Peso não pode ser negativo."));
//     expect(order.getTotal()).toBe(0);
// });