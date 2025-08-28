import type { IdProduct } from "../../page-data/types/IdProduct"

interface MyProductButtonProps {
    products: IdProduct[]
}

const MyProductButton = ({ products }: MyProductButtonProps) => {

    const productButtons = products.map((product) => (
        <a
            key={product.id}
            className={`inline-block text-white h-11 text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 py-2`}
            style={{ backgroundColor: product.color }} 
            href={product.link} 
            target="_blank"
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