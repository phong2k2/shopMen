import AdminLayout from "@/layouts/AdminLayout";
import Unauthorized from "@/pages/auth/404/Unauthorized";
import { useSelector } from "react-redux";
// import { Fragment } from "react";


function PrivateRoutes({children}) {
    let Layout
    const user = useSelector((state) => state.auth.login.currentUser)
    
    const roleAdmin = user?.data?.role
    if(roleAdmin === 1) {
        Layout = AdminLayout
    }else {
       Layout = Unauthorized
    }
    // if (route.layout) {
    //     Layout = route.layout;
    // } else if (route.layout === null) {
    //     Layout = Fragment;
    // }
    
    return ( 
        <Layout>
            {children}
        </Layout>
     );
}

export default PrivateRoutes;