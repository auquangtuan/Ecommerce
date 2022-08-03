import HomeAdmin from "../pages/Admin/HomeAdmin/HomeAdmin";
import Product from "../pages/Admin/Product/Product";
import User from "../pages/Admin/User/User";
import Cart from "../pages/Cart/Cart";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import RenderUser from "../pages/RenderUser/RenderUser";
import Shop from "../pages/Shop/Shop";
import ShopDetails from "../pages/ShopDetails/ShopDetails";
import AdminTemplate from "../Templates/AdminTemplate/AdminTemplate";
import TemplateFull from "../Templates/TemplateFull/TemplateFull";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component : Login},
    { path: '/register', component : Register},
    { path: '/product/:id', component : ShopDetails},
    { path: '/shop', component : Shop},
    { path: '/cart', component : Cart},
    { path: '/admin', component : HomeAdmin, layout : AdminTemplate},
    { path: '/admin/products', component : Product, layout : AdminTemplate},
    { path: '/admin/users', component : User, layout : AdminTemplate},
    { path: '/render', component : RenderUser, layout : AdminTemplate},

];

const privateRoutes = [
    
];

export { publicRoutes, privateRoutes };