import type { IdProduct } from "@/page-data/types/IdProduct"

interface MyProductButtonProps {
    products: IdProduct[]
}

const MyProductButton = ({ products }: MyProductButtonProps) => {
    return (
        <>
            {products.map((product) => (
                <a
                    key={product.id}
                    className="inline-block text-white h-11 text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 py-2 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: product.color }}
                    href={product.link}
                    target="_blank"
                    rel="noreferrer"
                    title={product.description || product.name}
                    aria-label={`Go to ${product.name}`}
                >
                    {product.name}
                </a>
            ))}
        </>
    )
}

export default MyProductButton