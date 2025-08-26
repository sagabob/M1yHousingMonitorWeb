import MyBanner from "./ui/core-components/my-banner"
import MyHeader from "./ui/core-components/my-header"
import MyHeading from "./ui/core-components/my-heading"
import MyListLga from "./ui/core-components/my-list-lga"
import MyProductTab from "./ui/core-components/my-product-tab"
import MyWrapper from "./ui/core-components/my-wrapper"


function App() {
  return (
    <MyWrapper>
      <MyHeader />
      <MyHeading />
      <MyProductTab />
      <MyBanner />
      <MyListLga />
    </MyWrapper>
  )
}

export default App