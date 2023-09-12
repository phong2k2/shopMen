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
        <NavLink to={config.privateRouter.dashboard} className="nav-link">
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
              to={config.privateRouter.indexCategory}
              className="collapse-item"
            >
              Danh mục
            </NavLink>
            <NavLink
              to={config.privateRouter.createCategory}
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
              to={config.privateRouter.indexProduct}
              className="collapse-item"
            >
              Danh sách sản phẩm
            </NavLink>
            <NavLink
              to={config.privateRouter.createProduct}
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
            <NavLink to={config.privateRouter.indexUser} className="collapse-item">
              Danh sách Người dùng
            </NavLink>
            {/* <NavLink to={config.privateRouter.createProduct} className="collapse-item" >Thêm danh mục</NavLink> */}
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
        <div
          id="collapsePages"
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <a className="collapse-item" href={config?.privateRouter?.order}>
              Danh sách đơn hàng
            </a>
          </div>
        </div>
      </li>
      {/*  */}
      {/* Divider --> */}
      <hr className="sidebar-divider" />

      {/*  */}
      {/* Heading --> */}
      <div className="sidebar-heading">Addons</div>

      {/*  */}
      {/* Nav Item - Pages Collapse Menu --> */}
      

      {/* Nav Item - Charts --> */}
      <li className="nav-item">
        <a className="nav-link" href="charts.html">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Charts</span>
        </a>
      </li>

      {/* Nav Item - Tables --> */}
      <li className="nav-item">
        <a className="nav-link" href="tables.html">
          <i className="fas fa-fw fa-table"></i>
          <span>Tables</span>
        </a>
      </li>

      {/* Divider --> */}
      <hr className="sidebar-divider d-none d-md-block" />

      {/*  */}
      {/* Sidebar Toggler (Sidebar) --> */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

      {/* Sidebar Message --> */}
      <div className="sidebar-card d-none d-lg-flex">
        <img
          className="sidebar-card-illustration mb-2"
          src="img/undraw_rocket.svg"
          alt="..."
        />
        <p className="text-center mb-2">
          <strong>SB Admin Pro</strong> is packed with premium features,
          components, and more!
        </p>
        <a
          className="btn btn-success btn-sm"
          href="https://startbootstrap.com/theme/sb-admin-pro"
        >
          Upgrade to Pro!
        </a>
      </div>
    </ul>
  );
}

export default Sidebar;
