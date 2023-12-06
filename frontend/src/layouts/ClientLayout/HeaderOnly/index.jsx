import Footer from "@/layouts/ClientLayout/components/Footer/Footer";
import Header from "../components/Header/Header";
import "./HeaderOnly.css";

function HeaderOnly({ children }) {
  return (
    <div className="main-body">
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}

export default HeaderOnly;
