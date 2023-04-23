// pages
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import CustomerList from "~/pages/CustomerList";
import ProductList from "~/pages/ProductList";

// if layout is null, page will use `EmptyLayout` in ~/layout
const pages = [
  { path: ["/", "/home"], content: Home },
  { path: "/login", content: Login },
  { path: "/customer", content: CustomerList },
  { path: "/product", content: ProductList },
];

export default pages;
