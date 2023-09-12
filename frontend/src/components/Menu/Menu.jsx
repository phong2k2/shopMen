import Button from "../Button/Button";
function Menu({items, onClick}) {
    return ( 
            items?.map((item, index) => {
                return (
                    <li key={index}>
                        <Button to={item?.to} onClick={onClick}>{item.title}</Button>
                    </li>
                )
            })
     );
}

export default Menu;