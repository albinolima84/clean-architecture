import Checkout from "./application/Checkout";
import GetOrdersByCpf from "./application/GetOrdersByCpf";
import Preview from "./application/Preview";
import Coupon from "./domain/entity/Coupon";
import Item from "./domain/entity/Item";
import OrderController from "./infra/controller/OrderController";
import HapiAdapter from "./infra/http/HapiAdapter";
import CouponRepositoryMemory from "./infra/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "./infra/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "./infra/memory/OrderRepositoryMemory";

const itemRepository = new ItemRepositoryMemory();
itemRepository.save(new Item(1, 'Notebook', 5000));
itemRepository.save(new Item(2, 'Monitor', 1000));
itemRepository.save(new Item(3, 'Teclado', 150));

const orderRepository = new OrderRepositoryMemory();
const couponRepository = new CouponRepositoryMemory();
couponRepository.save(new Coupon("VALE20", 20));
const checkout = new Checkout(itemRepository, orderRepository, couponRepository);
const preview = new Preview(itemRepository, couponRepository);
const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
// const httpServer = new ExpressAdapter();
const httpServer = new HapiAdapter();
new OrderController(httpServer, preview, checkout, getOrdersByCpf);
httpServer.listen(3000);