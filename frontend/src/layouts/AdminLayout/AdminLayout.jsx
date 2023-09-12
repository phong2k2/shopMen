import classNames from "classnames/bind"
import styles from "./AdminLayout.module.scss"
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import Footer from "./components/Footer/Footer"

// type AdminLayoutProps = {
//     children: React.ReactNode
// }
const  cx = classNames.bind(styles)

function AdminLayout({children}) {
    return (
        <div id="wrapper" className={cx('wrapper')}>
                <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content" className={cx('contents')}>
                    <Header/>
                    {children}
                </div>
                <Footer/>    
            </div>   
                  
        </div>
    )
}

export default AdminLayout