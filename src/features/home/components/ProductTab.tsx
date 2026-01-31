import { MAX_WIDTH } from "@/ui/constants/ui-constants"
import ProductButton from "./ProductButton"
import { products } from "@/page-data/products"

const MyProductTab = () => {
    return (
        <div className={`max-w-${MAX_WIDTH} mx-auto px-2 sm:px-2 lg:px-4 py-2 bg-white z-10 relative flex flex-wrap gap-1`}>
            <ProductButton products={products} />
        </div>
    )
}

export default MyProductTab