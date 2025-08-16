
import type { IdProduct } from "./types/products"

interface MyProductButtonProps {
    products: IdProduct[]
}

const MyProductButton = ({ products }: MyProductButtonProps) => {

    const productButtons = products.map((product) => (
        <a
            key={product.name}
            
            className={`inline-block text-white h-10 text-[16px] px-4 py-2`}
            style={{ backgroundColor: product.color }} href={product.link} target="_blank"
        >
            {product.name}
        </a>
    ))

    return (
        <>
            {productButtons}
        </>


    )
}

export default MyProductButton