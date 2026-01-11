import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "@/pages/AppLandingPage";
import ClientHome from "@/pages/topics/ClientHome";
import RouteError from "@/components/common/RouteError";
import HomeContainer from "@/features/home/pages/HomeParams";
import { ROUTES } from "@/lib/constants";

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
      { path: ROUTES.POPULATION_HOUSEHOLDS, element: <div>population-households</div> },       // /:alias/overview
      { path: ROUTES.HOUSING_APPROVALS, element: <div>Housing Approvals</div> },         // /:alias/rentals
      { path: ROUTES.HOUSING_MARKET, element: <div>Housing Market</div> },             // /:alias/sales
      // add more child routes to match your menu-structure.json
    ],
  },
]);

export default router;