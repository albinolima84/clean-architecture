import express from "express";
import Checkout from "./application/Checkout";
import GetOrdersByCpf from "./application/GetOrdersByCpf";
import Preview from "./application/Preview";
import Item from "./domain/Item";
import ItemRepositoryMemory from "./ItemRepositoryMemory";
import OrderRepositoryMemory from "./OrderRepositoryMemory";

const app = express();
app.use(express.json());

const itemRepository = new ItemRepositoryMemory();
itemRepository.save(new Item(1, 'Notebook', 5000));
itemRepository.save(new Item(2, 'Monitor', 1000));
itemRepository.save(new Item(3, 'Teclado', 150));

const orderRepository = new OrderRepositoryMemory();

app.post("/preview", async function (req, res) {
   const preview = new Preview(itemRepository);
   const total = await preview.execute(req.body);
   res.json({ total });
});

app.post("/checkout", async function (req, res) {
    const checkout = new Checkout(itemRepository, orderRepository);
    await checkout.execute(req.body); 
 });

 app.get("/orders/:cpf", function (req, res) {
    const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
    const orders = getOrdersByCpf.execute(req.params.cpf); 
    res.json(orders);
 });

app.listen(3000);