import Button from "../Button";

function MenuItems({tabItem, onClick}) {
    return ( 
        <li>
            <Button to={tabItem?.to} onClick={onClick}>{tabItem?.title}</Button>
        </li> 
    );
}

export default MenuItems;