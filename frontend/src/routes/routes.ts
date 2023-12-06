import config from '@/config';

import Dashboard from '@/pages/admin/Dashboard/Dashboard';
import HomeCate from '@/pages/admin/Categories/HomeCate'
import HomeProduct from '@/pages/admin/Products/HomeProduct';
import AddProduct from '@/pages/admin/Products/AddProduct';
import Home from '@/pages/client/Home/Home';
import Auth from '@/pages/auth/Auth';
import HeaderOnly from '@/layouts/ClientLayout/HeaderOnly';
import HomeUsers from '@/pages/admin/Users/HomeUsers';
import Product from '@/pages/client/Product/Product';
import ProductDetail from '@/pages/client/ProductDetail/ProductDetail';
import Cart from '@/pages/client/Cart/Cart';
import Order from '@/pages/client/Order/Order';
import ListOrders from '@/pages/client/ListOrders/ListOrders';
import Orders from '@/pages/admin/Orders';
import DetailOrder from '@/pages/admin/DetailOrder';
import VariantProduct from '@/pages/admin/Products/VariantProduct';
import ListProSearch from '@/pages/client/ListProSearch/ListProSearch';
import SubCategory from '@/pages/admin/SubCategories/HomeSubCate';
import VariantDetails from '@/pages/admin/Products/VariantDetails'
import ResetPersistButton from '@/Persitor';
import Payment from '@/pages/admin/Payment/Payment';
import Account from '@/pages/client/Account/Account';
import AccountLayout from '@/layouts/ClientLayout/AccountLayout';
import Address from '@/pages/client/Address/Address';
import ForGotPassword from '@/pages/client/ForGotPassword';
import ResetPassword from '@/pages/client/ResetPassword';
import NotFound from '@/pages/client/NotFound';

const adminRoutes = [
    {
        path: config.privateRouter.dashboard,
        component: Dashboard,
    },
    {
        path: config.privateRouter.indexCategory,
        component: HomeCate,
    },
    {
        path: config.privateRouter.indexSubCategory,
        component: SubCategory
    },{
        path: config.privateRouter.indexProduct,
        component: HomeProduct
    },
    {
        path: config.privateRouter.createProduct,
        component: AddProduct
    },
    {
        path: config.privateRouter.editProduct,
        component: AddProduct
    },
    {
        path: config.privateRouter.variantDetails,
        component: VariantDetails
    },
    {
        path: config.privateRouter.indexUser,
        component: HomeUsers
    },
    // {
    //     path: config.privateRouter.editUser,
    //     component: EditUser
    // },
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
    },
    {
        path: config.privateRouter.payment,
        component: Payment
    }
]

const privateRoutes = [
    {
        path: config.publicRouter.order,
        component: Order,
        layout: null,
        protected: true
    },{
        path: config.publicRouter.listOrders,
        component: ListOrders,
        layout: AccountLayout,
        protected: true
    },{
        path: config.publicRouter.account,
        component: Account,
        layout: AccountLayout,
        protected: true
    },{
        path: config.publicRouter.address,
        component: Address,
        layout: AccountLayout,
        protected: true
    },
    {
        path: config.publicRouter.resetPassword,
        component: ResetPassword,
        layout: null,
        protected: false
    },{
        path: config.publicRouter.forGotPassword,
        component: ForGotPassword,
        layout: null,
        protected: false
    },{
        path: config.publicRouter.auth,
        component: Auth,
        layout: null,
        protected: false
    }
]

const publicRoutes = [
    {
        path: config.publicRouter.home,
        component: Home,
    },{
        path: config.publicRouter.product,
        component: Product,
        layout: HeaderOnly
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
        path: config.publicRouter.search,
        component: ListProSearch,
        layout: HeaderOnly,
    }
    ,
    {
        path: config.publicRouter.persistor,
        component: ResetPersistButton,
        layout: HeaderOnly,
    },{
        path: config.publicRouter.notFound,
        component: NotFound,
        layout: HeaderOnly,
    },
]

export {
    privateRoutes,
    publicRoutes,
    adminRoutes
} ;