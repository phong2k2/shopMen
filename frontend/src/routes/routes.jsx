import Home from "@/pages/client/Home/Home"
import Auth from "@/pages/auth/Auth"
import HeaderOnly from "@/layouts/HeaderOnly"
import Product from "@/pages/client/Product/Product"
import ProductDetail from "@/pages/client/ProductDetail/ProductDetail"
import Cart from "@/pages/client/Cart/Cart"
import Order from "@/pages/client/Order/Order"
import ListOrders from "@/pages/client/ListOrders/ListOrders"
import ListProSearch from "@/pages/client/ListProSearch/ListProSearch"
import ResetPersistButton from "@/Persitor"
import Account from "@/pages/client/Account/Account"
import AccountLayout from "@/layouts/AccountLayout"
import Address from "@/pages/client/Address/Address"
import ForGotPassword from "@/pages/client/ForGotPassword"
import ResetPassword from "@/pages/client/ResetPassword"
import OrderStatistics from "@/pages/client/OrderStatistics"
import Social from "@/pages/auth/Social"
import { PUBLICROUTER } from "@/config/routes"
import NotFound from "@/pages/client/NotFound"

const privateRoutes = [
  {
    path: PUBLICROUTER.order,
    component: Order,
    layout: null,
    protected: true
  },
  {
    path: PUBLICROUTER.listOrders.index,
    component: ListOrders,
    layout: AccountLayout,
    protected: true
  },
  {
    path: PUBLICROUTER.orderStatistics.index,
    component: OrderStatistics,
    layout: AccountLayout,
    protected: true
  },
  {
    path: PUBLICROUTER.account,
    component: Account,
    layout: AccountLayout,
    protected: true
  },
  {
    path: PUBLICROUTER.address,
    component: Address,
    layout: AccountLayout,
    protected: true
  },
  {
    path: PUBLICROUTER.resetPassword,
    component: ResetPassword,
    layout: null,
    protected: false
  },
  {
    path: PUBLICROUTER.forGotPassword,
    component: ForGotPassword,
    layout: null,
    protected: false
  },
  {
    path: PUBLICROUTER.auth,
    component: Auth,
    layout: null,
    protected: false
  }
]

const publicRoutes = [
  {
    path: PUBLICROUTER.home,
    component: Home
  },
  {
    path: PUBLICROUTER.product.index,
    component: Product,
    layout: HeaderOnly
  },
  {
    path: PUBLICROUTER.productDetail.index,
    component: ProductDetail,
    layout: HeaderOnly
  },
  {
    path: PUBLICROUTER.cart,
    component: Cart,
    layout: HeaderOnly
  },
  {
    path: PUBLICROUTER.search,
    component: ListProSearch,
    layout: HeaderOnly
  },
  {
    path: PUBLICROUTER.persistor,
    component: ResetPersistButton,
    layout: HeaderOnly
  },
  {
    path: PUBLICROUTER.social,
    component: Social,
    layout: null
  },
  ,
  {
    path: PUBLICROUTER.notFound,
    component: NotFound,
    layout: HeaderOnly
  }
]

export { privateRoutes, publicRoutes }
