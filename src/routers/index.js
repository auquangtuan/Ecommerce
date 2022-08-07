import DonHang from "../components/DonHang/DonHang";
import Categories from "../components/ProductCategories/Categories";
import Analytics from "../pages/Admin/Analytics/Analytics";
import Confirm from "../pages/Admin/Confirm/Confirm";
import HomeAdmin from "../pages/Admin/HomeAdmin/HomeAdmin";
import NewProduct from "../pages/Admin/NewProduct/NewProduct";
import AllProduct from "../pages/Admin/Product/AllProduct";
import Product from "../pages/Admin/Product/Product";
import User from "../pages/Admin/User/User";
import Cart from "../pages/Cart/Cart";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import RenderUsers from "../pages/RenderUser/RenderUser";
import RenderUser from "../pages/RenderUser/RenderUser";
import Search from "../pages/Search/Search";
import Shop from "../pages/Shop/Shop";
import ShopDetails from "../pages/ShopDetails/ShopDetails";
import AdminTemplate from "../Templates/AdminTemplate/AdminTemplate";
import TemplateFull from "../Templates/TemplateFull/TemplateFull";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/search/:name', component: Search },
    { path: '/search/', component: Search },
    { path: '/login', component : Login},
    { path: '/register', component : Register},
    { path: '/product/:id', component : ShopDetails},
    { path: '/shop', component : Shop},
    { path: '/cart', component : Cart},
    { path: '/admin', component : HomeAdmin, layout : AdminTemplate},
    { path: '/admin/newProduct', component : NewProduct, layout : AdminTemplate},
    { path: '/admin/analytics', component : Analytics, layout : AdminTemplate},
    { path: '/admin/products/:id', component : Product, layout : AdminTemplate},
    { path: '/admin/products', component : AllProduct, layout : AdminTemplate},
    { path: '/admin/confirm', component : Confirm, layout : AdminTemplate},
    { path: '/admin/users', component : RenderUsers, layout : AdminTemplate},
    { path: '/admin/users/:id', component : User, layout : AdminTemplate},
    { path: '/render', component : RenderUser, layout : AdminTemplate},
    { path: '/donhang', component : DonHang},
    { path: '/categories/:id/:name', component : Categories},

];

const privateRoutes = [
    
];

export { publicRoutes, privateRoutes };