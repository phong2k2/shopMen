import { useQuery } from "react-query"
import { getAllSubCategory } from "@/services/subCategoryService"
import { getAllProducts } from "@/services/productService"
import { useMemo } from "react"
import CollectionFlashSale from "@/components/CollectionFlashSale"
import CollectionNew from "@/components/CollectionNew/CollectionNew"
import CollectionCategoryNew from "@/components/CollectionCategoryNew"

function Home() {
  const { data: allListSubCategory, isLoading: isLoadingAllSubCate } = useQuery(
    {
      queryKey: "allSubCate",
      queryFn: () => getAllSubCategory()
    }
  )

  const { data: allProduct, isLoading: isLoadingAllProduct } = useQuery({
    queryKey: "allProduct",
    queryFn: () => getAllProducts()
  })

  const allProductOutstanding = useMemo(() => {
    return allProduct?.data?.filter((item) => item.hot === "hot").slice(0, 10)
  }, [allProduct])

  const allProductFlashSeal = useMemo(() => {
    return allProduct?.data?.filter((item) => item.salePrice).slice(0, 10)
  }, [allProduct])

  return (
    <>
      <CollectionCategoryNew
        allListSubCategory={allListSubCategory}
        isLoading={isLoadingAllSubCate}
      />
      <CollectionFlashSale
        isLoading={isLoadingAllProduct}
        allProductFlashSeal={allProductFlashSeal}
      />
      <CollectionNew
        allProductOutstanding={allProductOutstanding}
        isLoading={isLoadingAllProduct}
      />
    </>
  )
}

export default Home
