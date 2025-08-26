import { MAX_WIDTH } from "../constants/ui-constants"
import MyProductButton from "./my-product-button"
import { products } from "../../page-data/products"

const MyProductTab = () => {
    return (
        <div className={`max-w-${MAX_WIDTH} mx-auto px-2 sm:px-2 lg:px-4 py-2 bg-white z-10 relative`}>
            <MyProductButton products={products} />
        </div>
    )
}

export default MyProductTab