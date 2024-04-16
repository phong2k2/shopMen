import { NavLink } from "react-router-dom";
import config from "@/config";
function Sidebar() {
  return (
    //  <!-- Sidebar -->
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand --> */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">
          Admin <sup>2</sup>
        </div>
      </a>

      {/* Divider --> */}
      <hr className="sidebar-divider my-0" />

      {/*  */}
      {/* Nav Item - Dashboard --> */}
      <li className="nav-item active">
        <NavLink to={config.PRIVATEROUTER.dashboard} className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </NavLink>
      </li>

      {/*  */}
      {/* Divider --> */}
      <hr className="sidebar-divider" />

      {/*  */}
      {/* Heading --> */}
      <div className="sidebar-heading">Interface</div>

      {/*  */}
      {/* Nav Item - Pages Collapse Menu --> */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-fw fa-cog"></i>
          <span>Danh mục</span>
        </a>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <NavLink
              to={config.PRIVATEROUTER.indexCategory}
              className="collapse-item"
            >
              Danh mục
            </NavLink>
            <NavLink
              to={config.PRIVATEROUTER.createCategory}
              className="collapse-item"
            >
              Thêm danh mục
            </NavLink>
          </div>
        </div>
      </li>

      {/*  */}
      {/* Nav Item - Utilities Collapse Menu --> */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>Sản Phẩm</span>
        </a>
        <div
          id="collapseUtilities"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <NavLink
              to={config.PRIVATEROUTER.indexProduct}
              className="collapse-item"
            >
              Danh sách sản phẩm
            </NavLink>
            <NavLink
              to={config.PRIVATEROUTER.createProduct}
              className="collapse-item"
            >
              Thêm Sản Phẩm
            </NavLink>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseExample"
          aria-expanded="true"
          aria-controls="collapseExample"
        >
          <i className="fas fa-fw fa-wrench"></i>
          <span>Người Dùng</span>
        </a>
        <div
          id="collapseExample"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <NavLink
              to={config.PRIVATEROUTER.indexUser}
              className="collapse-item"
            >
              Danh sách Người dùng
            </NavLink>
            {/* <NavLink to={config.PRIVATEROUTER.createProduct} className="collapse-item" >Thêm danh mục</NavLink> */}
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="true"
          aria-controls="collapsePages"
        >
          <i className="fas fa-fw fa-folder"></i>
          <span>Đơn hàng</span>
        </a>
        <div id="collapsePages" className="collapse">
          <div className="bg-white py-2 mb-1 collapse-inner rounded">
            <NavLink className="collapse-item" to={`/admin/order/processing`}>
              Processing
            </NavLink>
          </div>
          <div className="bg-white py-2 mb-1 collapse-inner rounded">
            <NavLink className="collapse-item" to={`/admin/order/confirmed`}>
              Confirmed
            </NavLink>
          </div>
          <div className="bg-white py-2 mb-1 collapse-inner rounded">
            <NavLink className="collapse-item" to={`/admin/order/shipped`}>
              Shipped
            </NavLink>
          </div>
          <div className="bg-white py-2 mb-1 collapse-inner rounded">
            <NavLink className="collapse-item" to={`/admin/order/complete`}>
              Complete
            </NavLink>
          </div>
          <div className="bg-white py-2 mb-1 collapse-inner rounded">
            <NavLink className="collapse-item" to={`/admin/order/cancelled`}>
              Cancelled
            </NavLink>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseMethod"
          aria-expanded="true"
          aria-controls="collapseMethod"
        >
          <i className="fas fa-fw fa-folder"></i>
          <span>Phương thức thanh toán</span>
        </a>
        <div
          id="collapseMethod"
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <NavLink
              className="collapse-item"
              to={config?.PRIVATEROUTER?.payment}
            >
              Danh sách phương thức
            </NavLink>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default Sidebar;
