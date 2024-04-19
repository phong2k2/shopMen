import config from "@/config";

import Dashboard from "@/pages/admin/Dashboard/Dashboard";
import HomeCate from "@/pages/admin/Categories/HomeCate";
import HomeProduct from "@/pages/admin/Products/HomeProduct";
import AddProduct from "@/pages/admin/Products/AddProduct";
import Home from "@/pages/client/Home/Home";
import Auth from "@/pages/auth/Auth";
import HeaderOnly from "@/layouts/ClientLayout/HeaderOnly";
import HomeUsers from "@/pages/admin/Users/HomeUsers";
import Product from "@/pages/client/Product/Product";
import ProductDetail from "@/pages/client/ProductDetail/ProductDetail";
import Cart from "@/pages/client/Cart/Cart";
import Order from "@/pages/client/Order/Order";
import ListOrders from "@/pages/client/ListOrders/ListOrders";
import Orders from "@/pages/admin/Orders";
import DetailOrder from "@/pages/admin/DetailOrder";
import VariantProduct from "@/pages/admin/Products/VariantProduct";
import ListProSearch from "@/pages/client/ListProSearch/ListProSearch";
import SubCategory from "@/pages/admin/SubCategories/HomeSubCate";
import VariantDetails from "@/pages/admin/Products/VariantDetails";
import ResetPersistButton from "@/Persitor";
import Payment from "@/pages/admin/Payment/Payment";
import Account from "@/pages/client/Account/Account";
import AccountLayout from "@/layouts/ClientLayout/AccountLayout";
import Address from "@/pages/client/Address/Address";
import ForGotPassword from "@/pages/client/ForGotPassword";
import ResetPassword from "@/pages/client/ResetPassword";
import NotFound from "@/pages/client/NotFound";
import OrderStatistics from "@/pages/client/OrderStatistics";
import ListOrderStatus from "@/pages/admin/components/ListOrderStatus";

const adminRoutes = [
  {
    path: config.PRIVATEROUTER.dashboard,
    component: Dashboard,
  },
  {
    path: config.PRIVATEROUTER.indexCategory,
    component: HomeCate,
  },
  {
    path: config.PRIVATEROUTER.indexSubCategory,
    component: SubCategory,
  },
  {
    path: config.PRIVATEROUTER.indexProduct,
    component: HomeProduct,
  },
  {
    path: config.PRIVATEROUTER.createProduct,
    component: AddProduct,
  },
  {
    path: config.PRIVATEROUTER.editProduct,
    component: AddProduct,
  },
  {
    path: config.PRIVATEROUTER.variantDetails,
    component: VariantDetails,
  },
  {
    path: config.PRIVATEROUTER.indexUser,
    component: HomeUsers,
  },
  {
    path: config.PRIVATEROUTER.order,
    component: Orders,
  },
  {
    path: config.PRIVATEROUTER.listOrderStatus.index,
    component: ListOrderStatus,
  },
  {
    path: config.PRIVATEROUTER.detailOrder,
    component: DetailOrder,
  },
  {
    path: config.PRIVATEROUTER.variant,
    component: VariantProduct,
  },
  {
    path: config.PRIVATEROUTER.payment,
    component: Payment,
  },
];

const privateRoutes = [
  {
    path: config.PUBLICROUTER.order,
    component: Order,
    layout: null,
    protected: true,
  },
  {
    path: config.PUBLICROUTER.listOrders.index,
    component: ListOrders,
    layout: AccountLayout,
    protected: true,
  },
  {
    path: config.PUBLICROUTER.orderStatistics.index,
    component: OrderStatistics,
    layout: AccountLayout,
    protected: true,
  },
  {
    path: config.PUBLICROUTER.account,
    component: Account,
    layout: AccountLayout,
    protected: true,
  },
  {
    path: config.PUBLICROUTER.address,
    component: Address,
    layout: AccountLayout,
    protected: true,
  },
  {
    path: config.PUBLICROUTER.resetPassword,
    component: ResetPassword,
    layout: null,
    protected: false,
  },
  {
    path: config.PUBLICROUTER.forGotPassword,
    component: ForGotPassword,
    layout: null,
    protected: false,
  },
  {
    path: config.PUBLICROUTER.auth,
    component: Auth,
    layout: null,
    protected: false,
  },
];

const publicRoutes = [
  {
    path: config.PUBLICROUTER.home,
    component: Home,
  },
  {
    path: config.PUBLICROUTER.product.index,
    component: Product,
    layout: HeaderOnly,
  },
  {
    path: config.PUBLICROUTER.productDetail.index,
    component: ProductDetail,
    layout: HeaderOnly,
  },
  {
    path: config.PUBLICROUTER.cart,
    component: Cart,
    layout: HeaderOnly,
  },
  {
    path: config.PUBLICROUTER.search,
    component: ListProSearch,
    layout: HeaderOnly,
  },
  {
    path: config.PUBLICROUTER.persistor,
    component: ResetPersistButton,
    layout: HeaderOnly,
  },
  // ,{
  //     path: config.PUBLICROUTER.notFound,
  //     component: NotFound,
  //     layout: HeaderOnly,
  // },
];

export { privateRoutes, publicRoutes, adminRoutes };
