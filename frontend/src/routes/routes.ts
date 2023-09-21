import config from '@/config';

import Dashboard from '@/pages/admin/Dashboard/Dashboard';
import HomeCate from '@/pages/admin/Categories/HomeCate'
import CreateCate from '@/pages/admin/Categories/CreateCate';
import EditCate from '@/pages/admin/Categories/EditCate';
import CreateProduct from '@/pages/admin/Products/CreateProduct';
import HomeProduct from '@/pages/admin/Products/HomeProduct';
import EditProduct from '@/pages/admin/Products/EditProduct';
import Home from '@/pages/client/Home/Home';
import Auth from '@/pages/auth/Auth';
import HeaderOnly from '@/layouts/ClientLayout/HeaderOnly';
import HomeUsers from '@/pages/admin/Users/HomeUsers';
import Category from '@/pages/client/Category/Category';
import ProductDetail from '@/pages/client/ProductDetail/ProductDetail';
import Cart from '@/pages/client/Cart/Cart';
import Order from '@/pages/client/Order/Order';
import ListOrders from '@/pages/client/ListOrders/ListOrders';
import Orders from '@/pages/admin/Orders';
import DetailOrder from '@/pages/admin/DetailOrder';
import Profile from '@/pages/client/Profile';
import VariantProduct from '@/pages/admin/Products/VariantProduct';
import ListProSearch from '@/pages/client/ListProSearch/ListProSearch';


const privateRoutes = [
    {
        path: config.privateRouter.dashboard,
        component: Dashboard,
    },
    {
        path: config.privateRouter.indexCategory,
        component: HomeCate,
    },
    {
        path: config.privateRouter.createCategory,
        component: CreateCate
    },{
        path: config.privateRouter.editCategory,
        component: EditCate
    },{
        path: config.privateRouter.indexProduct,
        component: HomeProduct
    },
    {
        path: config.privateRouter.createProduct,
        component: CreateProduct
    },
    {
        path: config.privateRouter.editProduct,
        component: EditProduct
    },
    {
        path: config.privateRouter.indexUser,
        component: HomeUsers
    },
    {
        path: config.privateRouter.order,
        component: Orders
    },
    {
        path: config.privateRouter.detailOrder,
        component: DetailOrder
    },
    {
        path: config.privateRouter.variant,
        component: VariantProduct
    }
]

const publicRoutes = [
    {
        path: config.publicRouter.home,
        component: Home,
    },{
        path: config.publicRouter.category,
        component: Category,
        layout: HeaderOnly
    },{
        path: config.publicRouter.auth,
        component: Auth,
        layout: HeaderOnly,
        auth: true
    },
    {
        path: config.publicRouter.productDetail,
        component: ProductDetail,
        layout: HeaderOnly
    },
    {
        path: config.publicRouter.cart,
        component: Cart,
        layout: HeaderOnly
    },
    {
        path: config.publicRouter.order,
        component: Order,
        layout: null
    },
    {
        path: config.publicRouter.listOrders,
        component: ListOrders,
        layout: HeaderOnly
    },
    {
        path: config.publicRouter.profile,
        component: Profile,
        layout: HeaderOnly
    },
    {
        path: config.publicRouter.search,
        component: ListProSearch,
        layout: HeaderOnly,
    }
]

export {
    privateRoutes,
    publicRoutes
} ;