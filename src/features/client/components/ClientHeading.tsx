import { MAX_WIDTH } from "@/ui/constants/ui-constants"
import type { Lga } from "@/page-data/types/Lga";

// Helper to load client logo images dynamically
const getLgaImage = (id: string) => {
    return new URL(`../../../assets/img/client-logos/${id}.png`, import.meta.url).href;
};

const ClientHeading = ({ lga }: { lga: Lga }) => {
    const imageUrl = getLgaImage(lga.id);

    return (
        <div className={`max-w-${MAX_WIDTH} mx-auto px-2 sm:px-2 lg:px-4 py-2 bg-white flex justify-between items-center`}>
            <h1 className="text-3xl text-gray-900">{lga.name}<span className="inline-block border-l-2 border-gray-300 pl-2 ml-2 text-housing">housing monitor</span></h1>
            <div>
                <img
                    data-main-image=""
                    style={{ objectFit: "cover", opacity: 1 }}
                    sizes="100vw"
                    decoding="async"
                    loading="lazy"
                    src={imageUrl}
                    srcSet={`${imageUrl} 200w`}
                    alt={`${lga.name} image`}
                    className="max-w-[200px] h-auto"
                />
            </div>
        </div>

    )
}

export default ClientHeading;