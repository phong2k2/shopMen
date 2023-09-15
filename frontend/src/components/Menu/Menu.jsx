import MenuItems from "./MenuItems";
function Menu({items, onClick}) {
    return ( 
        <ul>
            {
                items?.filter((item) => item.check ).map((item, index) => {
                    return <MenuItems key={index} onClick={() => {
                        if(item.logout) {
                            onClick()
                        }
                    }} tabItem={item}/>
                })
            }
        </ul>
     );
}


export default Menu;