import Button from "../Button/Button";
import MenuItems from "./MenuItems";
function Menu({items, onClick}) {
    return ( 
        <ul>
            {
                items.filter((item) => item.check ).map((item, index) => {
                    return <MenuItems key={index} onClick={onClick} tabItem={item}/>
                })
            }
        </ul>
     );
}


export default Menu;