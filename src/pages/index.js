// pages
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import CustomerList from "~/pages/CustomerList";
import ProductList from "~/pages/ProductList";
import MainLayout from "~/layout/MainLayout";

// if layout is null, page will use `EmptyLayout` in ~/layout
const pages = [
  { path: ["/", "/home"], content: Home, layout: MainLayout },
  { path: "/login", content: Login },
  { path: "/customer", content: CustomerList, layout: MainLayout },
  { path: "/product", content: ProductList, layout: MainLayout },
];

export default pages;
