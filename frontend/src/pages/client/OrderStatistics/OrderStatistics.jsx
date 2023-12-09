import { useQuery } from "react-query";
import { getOrderStatistical } from "@/services/orderService";
import { NavLink } from "react-router-dom";

function OrderStatistics() {
  const { data: itemTotal } = useQuery({
    queryKey: "dataStatistics",
    queryFn: () => getOrderStatistical(),
  });
  console.log(
    "🚀 ~ file: OrderStatistics.jsx:9 ~ OrderStatistics ~ data:",
    itemTotal
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-12 col-12 mb-5">
          <div className="card h-100 card-lift">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h4 className="mb-0">Chờ thanh toán</h4>
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
                <h1 className=" mb-1 fw-bold ml-4">
                  {itemTotal?.totalProcessing}
                </h1>
                <NavLink to={"/order/processing"} className="mb-0">
                  <span
                    className="text-success me-2"
                    style={{ fontSize: "1.4rem" }}
                  >
                    Xem thêm...
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-12 mb-5">
          <div className="card h-100 card-lift">
            <div className="card-body">
              <div
                className="d-flex justify-content-between align-items-center
                        mb-3"
              >
                <div>
                  <h4 className="mb-0">Đang vận chuyển</h4>
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
                <h1 className="  mb-1 fw-bold ml-4">
                  {itemTotal?.totalConfirmed}
                </h1>
                <NavLink to={"/order/confirmed"} className="mb-0">
                  <span
                    className="text-success me-2"
                    style={{ fontSize: "1.4rem" }}
                  >
                    Xem thêm...
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-12 mb-5">
          <div className="card h-100 card-lift">
            <div className="card-body">
              <div
                className="d-flex justify-content-between align-items-center
                        mb-3"
              >
                <div>
                  <h4 className="mb-0">Hoàn thành</h4>
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
                <h1 className="  mb-1 fw-bold ml-4">
                  {itemTotal?.totalComplete}
                </h1>
                <NavLink to={"/order/complete"} className="mb-0">
                  <span
                    className="text-success me-2"
                    style={{ fontSize: "1.4rem" }}
                  >
                    Xem thêm...
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-12 mb-5">
          <div className="card h-100 card-lift">
            <div className="card-body">
              <div
                className="d-flex justify-content-between align-items-center
                        mb-3"
              >
                <div>
                  <h4 className="mb-0">Đã hủy</h4>
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
                <h1 className="  mb-1 fw-bold ml-4">
                  {itemTotal?.totalCancelled}
                </h1>
                <NavLink to={"/order/cancelled"} className="mb-0">
                  <span
                    className="text-success me-2"
                    style={{ fontSize: "1.4rem" }}
                  >
                    Xem thêm...
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatistics;
