import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import styles from './CategoryItem.module.scss'
import * as subCategory from '@/services/subCategoryService'
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)
function CategoryItem({idCate}) {
    const [subMenu, setSubMenu] = useState([])
    useEffect(()=> {
        const fetchSubCategory = async () => {
            try {
                const res = await subCategory.getSubCategoryByCategory(idCate)
                setSubMenu(res)
            }catch(err) {
                console.log(err)
            }
        }
        fetchSubCategory()
    },[])
    return ( 
        <ul className={cx('list-submenu')}>
            {
                subMenu?.map((itemMenu, index) => {
                    return (
                        <li className={cx('item-submenu')} key={index}>
                            <Link to={'/'+ itemMenu?.slug}>{itemMenu?.name}</Link>
                        </li>
                    )
                })
            }
        </ul>
     );
}


 CategoryItem.propTypes = {
    idCate: PropTypes.string
 }

export default CategoryItem;