import MyProductButton from "./my-product-button"
import { products } from "./types/products"

const MyProductTab = () => {
    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-4 py-2 bg-white z-10 relative">
            <MyProductButton products={products} />
        </div>
    )
}

export default MyProductTab