import { products } from "@/page-data/products";
import { MAX_WIDTH } from "../constants/ui-constants";
import MyProductButton from "../core-components/my-product-button";

const ClientProducts = () => {
    return (
        <div className={`max-w-${MAX_WIDTH} mx-auto px-2 sm:px-2 lg:px-4 py-2 bg-white z-10 relative`}>
            <MyProductButton products={products} />
        </div>
    )
}

export default ClientProducts;  