// pages
import Home from "./Home";
import Login from "./Login";
import CustomerList from "./CustomerList";
import ProductList from "./ProductList";
import OrderList from "./OrderList";
import MainLayout from "~/layout/MainLayout";

// if layout is null, page will use `EmptyLayout` in ~/layout
const pages = [
  { path: ["/", "/home"], content: Home, layout: MainLayout },
  { path: "/login", content: Login },
  { path: "/customer", content: CustomerList, layout: MainLayout },
  { path: "/product", content: ProductList, layout: MainLayout },
  { path: "/order", content: OrderList, layout: MainLayout },
];

export default pages;
