import type { Lga } from "@/page-data/types/Lga";
import HousingIllustration from "@/assets/housing-illustration.svg";

const ClientBanner = (lga: Lga) => {
    return (
        <section className="-my-2.5  bg-[#7513b8] border-0 z-30 relative">
            <div className="max-w-6xl mx-auto px-2 sm:px-2 lg:px-4 ">
                <div>
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold pt-10">Explore the housing story for {lga.name}</h1>
                    <p className="text-white text-base sm:text-lg md:text-xl pt-5">Understand housing supply and demand, housing diversity, affordability and availability.</p>
                </div>
                <div className="flex justify-end">
                    <img src={HousingIllustration} alt="Illustration of housing" className="w-[300px] opacity-70" />
                </div>
            </div>
        </section>
    )

}

export default ClientBanner;