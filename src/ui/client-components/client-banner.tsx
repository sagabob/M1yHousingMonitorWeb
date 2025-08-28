import type { Lga } from "@/page-data/types/Lga";

const ClientBanner = (lga: Lga) => {
    return (
        <section className="-my-2.5 h-52 bg-[#7513b8] border-0 z-30 relative">            <div className="max-w-6xl mx-auto px-2 sm:px-2 lg:px-4 ">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold pt-10">Explore the housing story for {lga.name}</h1>
                <p className="text-white text-base sm:text-lg md:text-xl pt-5">Understand housing supply and demand, housing diversity, affordability and availability.</p>

            </div>
        </section>
    )

}

export default ClientBanner;