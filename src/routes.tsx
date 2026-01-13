import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "@/pages/AppLandingPage";
import ClientHome from "@/pages/topics/ClientHome";
import RouteError from "@/components/common/RouteError";
import HomeContainer from "@/features/home/pages/HomeContainer";
import { ROUTES } from "@/lib/constants";
import HousingSupplyContainer from "@/features/housing-supply/HousingSupplyContainer";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
    errorElement: <RouteError />,
  },
  {
    path: ROUTES.CLIENT,
    element: <ClientHome />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomeContainer /> },            // /:alias
      { path: ROUTES.HOUSING_SUPPLY, element: <HousingSupplyContainer /> },    // /:alias/overview
      // /:alias/rentals
      { path: ROUTES.HOUSING_MARKET, element: <div>Housing Market</div> },             // /:alias/sales
      // add more child routes to match your menu-structure.json
      { path: ROUTES.HOUSING_CONSUMPTION, element: <div>Housing Consumption</div> },
    ],
  },
]);

export default router;