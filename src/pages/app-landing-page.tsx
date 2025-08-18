import MyBanner from "../ui/my-banner";
import MyHeader from "../ui/my-header";
import MyHeading from "../ui/my-heading";
import MyListLga from "../ui/my-list-lga";
import MyProductTab from "../ui/my-product-tab";

const AppLandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <MyHeader />
            <MyHeading />
            <MyProductTab />
            <MyBanner />
            <MyListLga />
        </div>
    )
}

export default AppLandingPage;