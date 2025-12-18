import PageWrapper from "@/layouts/PageWrapper";
import MyBanner from "@/features/home/components/HomeBanner";
import BaseHeader from "@/layouts/BaseHeader";
import MyHeading from "@/components/common/PageHeading";
import MyListLga from "@/features/home/components/LgaList";
import MyProductTab from "@/features/home/components/ProductTab";

const AppLandingPage = () => {
    return (
        <PageWrapper>
            <BaseHeader />
            <MyHeading />
            <MyProductTab />
            <MyBanner />
            <MyListLga />
        </PageWrapper>
    )
}

export default AppLandingPage;