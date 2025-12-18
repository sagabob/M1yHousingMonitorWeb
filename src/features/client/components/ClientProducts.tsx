import { products } from "@/page-data/products";
import { MAX_WIDTH } from "@/ui/constants/ui-constants";
import ProductButton from "@/features/home/components/ProductButton";

const ClientProducts = () => {
    return (
        <div className={`max-w-${MAX_WIDTH} mx-auto px-2 sm:px-2 lg:px-4 py-2 bg-white z-10 relative`}>
            <ProductButton products={products} />
        </div>
    )
}

export default ClientProducts;  