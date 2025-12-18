import PageWrapper from "../layouts/PageWrapper";
import MyBanner from "../features/home/components/HomeBanner";
import MyHeader from "../layouts/Header";
import MyHeading from "../components/common/PageHeading";
import MyListLga from "../features/home/components/LgaList";
import MyProductTab from "../features/home/components/ProductTab";

const AppLandingPage = () => {
    return (
        <PageWrapper>
            <MyHeader />
            <MyHeading />
            <MyProductTab />
            <MyBanner />
            <MyListLga />
        </PageWrapper>
    )
}

export default AppLandingPage;