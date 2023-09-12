import {  Fragment} from "react";
import DefaultLayout from "@/layouts/ClientLayout/DefaultLayout";


function publicRoutes({route, children}) {
    let Layout = DefaultLayout;

        if (route.layout) {
            Layout = route.layout;
        } else if (route.layout === null) {
            Layout = Fragment;
        }

    return ( 
        <Layout>
            {children}
        </Layout>
     );
}

export default publicRoutes;