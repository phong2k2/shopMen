import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useQuery } from "react-query";
import { getAllSubCategory } from "@/services/subCategoryService";
import { getAllProducts } from "@/services/productService";
import { useMemo } from "react";
import CollectionFlashSale from "@/components/CollectionFlashSale";
import CollectionNew from "@/components/CollectionNew/CollectionNew";
import CollectionCategoryNew from "@/components/CollectionCategoryNew";

const cx = classNames.bind(styles);
function Home() {
  const { data: allListSubCategory } = useQuery({
    queryKey: "allSubCate",
    queryFn: () => getAllSubCategory(),
  });

  const { data: allProduct } = useQuery({
    queryKey: "allProduct",
    queryFn: () => getAllProducts(),
  });

  const allProductOutstanding = useMemo(() => {
    return allProduct?.filter((item) => item.hot === "hot");
  }, [allProduct]);

  const allProductFlashSeal = useMemo(() => {
    return allProduct?.filter((item) => item.salePrice);
  }, [allProduct]);

  return (
    <>
      <CollectionCategoryNew allListSubCategory={allListSubCategory} />
      <CollectionFlashSale allProductFlashSeal={allProductFlashSeal} />
      <CollectionNew allProductOutstanding={allProductOutstanding} />
    </>
  );
}

export default Home;
