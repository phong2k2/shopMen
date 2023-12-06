import { useEffect, useRef, useState } from "react";
import "./Dashboard.scss";
import Chart from "chart.js/auto";
import { useQuery } from "react-query";
import * as dashboardService from "@/services/dashboardService";
import { formatPrice } from "@/components/formatData/formatData";

function Dashboard() {
  const acquisitionsRef = useRef();
  const [myChart, setMyChart] = useState(null);

  const { data: revenueData } = useQuery({
    queryKey: "monthlyRevenue",
    queryFn: () => dashboardService.getRevenueChart(),
  });

  const revenueChart = async (revenueData) => {
    if (myChart) {
      myChart.destroy();
    }
    let newChart = new Chart(acquisitionsRef?.current, {
      type: "bar",
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Doanh thu mỗi tháng",
            padding: {
              top: 10,
              bottom: 30,
            },
          },
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
      },
      data: {
        labels: Object.keys(revenueData?.monthly),
        datasets: [
          {
            label: `Doanh thu`,
            data: Object.values(revenueData?.monthly),
          },
        ],
      },
    });
    setMyChart(newChart);

    return myChart;
  };

  useEffect(() => {
    const monthlyRevenue = revenueData ? revenueData : {};
    revenueChart(monthlyRevenue);
  }, [revenueData]);

  const dashboardQuery = useQuery({
    queryKey: "dashboard",
    queryFn: () => dashboardService.getAllInformation(),
  });

  const { data: itemDashboard } = dashboardQuery;

  return (
    <div className="app-content-area">
      <div className="bg-primary pt-10 pb-21 mt-n6 mx-n4"></div>
      <div className="container-fluid mt-n22">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Dashboard</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-12 col-12 mb-5">
            <div className="card h-100 card-lift">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="mb-0">Sản phẩm</h4>
                  </div>
                  <div className="icon-shape icon-md bg-primary-soft text-primary rounded-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-briefcase"
                    >
                      <rect
                        x="2"
                        y="7"
                        width="20"
                        height="14"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                </div>
                <div className="lh-1">
                  <h1 className=" mb-1 fw-bold">
                    {itemDashboard?.totalProducts}
                  </h1>
                  <p className="mb-0">
                    <span className="text-success me-2">Xem thêm...</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12 col-12 mb-5">
            <div className="card h-100 card-lift">
              <div className="card-body">
                <div
                  className="d-flex justify-content-between align-items-center
                        mb-3"
                >
                  <div>
                    <h4 className="mb-0">Khách hàng</h4>
                  </div>
                  <div
                    className="icon-shape icon-md bg-primary-soft text-primary
                        rounded-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-list"
                    >
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </div>
                </div>
                <div className="lh-1">
                  <h1 className="  mb-1 fw-bold">
                    {itemDashboard?.totalUsers}
                  </h1>
                  <p className="mb-0">
                    <span className="text-success me-2">Xem thêm...</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12 col-12 mb-5">
            <div className="card h-100 card-lift">
              <div className="card-body">
                <div
                  className="d-flex justify-content-between align-items-center
                        mb-3"
                >
                  <div>
                    <h4 className="mb-0">Đơn hàng</h4>
                  </div>
                  <div
                    className="icon-shape icon-md bg-primary-soft text-primary
                        rounded-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-users"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                </div>
                <div className="lh-1">
                  <h1 className="  mb-1 fw-bold">
                    {itemDashboard?.totalOrders}
                  </h1>
                  <p className="mb-0">
                    <span className="text-success me-2">Xem thêm...</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12 col-12 mb-5">
            <div className="card h-100 card-lift">
              <div className="card-body">
                <div
                  className="d-flex justify-content-between align-items-center
                        mb-3"
                >
                  <div>
                    <h4 className="mb-0">Doanh thu</h4>
                  </div>
                  <div
                    className="icon-shape icon-md bg-primary-soft text-primary
                        rounded-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-target"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                </div>
                <div className="lh-1">
                  <h1 className="  mb-1 fw-bold">
                    {formatPrice(itemDashboard?.totalPriceOrder)}
                  </h1>
                  <p className="mb-0">
                    <span className="text-success me-2">Xem thêm...</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-8 col-12 mb-5">
            <div className="card">
              <div className="card-header ">
                <h4 className="mb-0">Active Projects</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive table-card">
                  {/* Biểu đồ doanh thu */}
                  <div style={{ width: "800px" }}>
                    <canvas ref={acquisitionsRef} id="acquisitions"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-12 col-md-12 col-12 mb-5 ">
            <div className="card h-100">
              <div
                className="card-header d-flex align-items-center
                                justify-content-between"
              >
                <div>
                  <h4 className="mb-0">Tasks Performance </h4>
                </div>

                <div className="dropdown dropstart">
                  <a
                    className="btn btn-icon btn-ghost btn-sm rounded-circle"
                    href="#!"
                    role="button"
                    id="dropdownTask"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-more-vertical icon-xs"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownTask">
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Another action
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#!"
                    >
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-around">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-check-circle icon-sm text-success"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h1 className="fs-2 mb-0 ">76%</h1>
                    <p>Completed</p>
                  </div>
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-trending-up icon-sm text-warning"
                    >
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                    <h1 className="fs-2 mb-0 ">32%</h1>
                    <p>In-Progress</p>
                  </div>
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-trending-down icon-sm text-danger"
                    >
                      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                      <polyline points="17 18 23 18 23 12"></polyline>
                    </svg>
                    <h1 className="fs-2 mb-0 ">13%</h1>
                    <p>Behind</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Order */}
        <div className="row">
          <div className="col-xl-6 col-lg-12 col-md-12 col-12 mb-5 mb-xl-0">
            <div className="card h-100">
              {/* <!-- card header  --> */}
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">My Task </h4>
                <div className="dropdown">
                  <a
                    className="btn btn-outline-white btn-sm dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Task
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <!-- table  --> */}
              <div className="card-body">
                <div className="table-responsive table-card">
                  <table className="table text-nowrap mb-0 table-centered table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Deadline</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check">
                            <label className="form-check-label">
                              Design a FreshCart Home page
                            </label>
                          </div>
                        </td>
                        <td>Today</td>
                        <td>
                          <span className="badge badge-success-soft">
                            Approved
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
