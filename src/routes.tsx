import {
  createBrowserRouter,
} from "react-router-dom";
import { Suspense } from "react";
import Home from "./pages/app-landing-page";
import ClientHome from "./pages/topics/client-home";
import NotFound from "./pages/not-found";
import HomeContainer from "./ui/page-containers/home-container";
import SuspenseFallback from "./ui/components/suspense-fallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/:alias",
    element: <ClientHome />,
    errorElement: <NotFound />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<SuspenseFallback cardCount={2} message="Loading housing data..." />}>
            <HomeContainer />
          </Suspense>
        )
      },
      { 
        path: "population-households", 
        element: (
          <Suspense fallback={<SuspenseFallback cardCount={1} message="Loading population data..." />}>
            <div>population-households</div>
          </Suspense>
        )
      },
      { 
        path: "housing-and-approvals", 
        element: (
          <Suspense fallback={<SuspenseFallback cardCount={1} message="Loading approvals data..." />}>
            <div>Rentals</div>
          </Suspense>
        )
      },
      { 
        path: "housing-market", 
        element: (
          <Suspense fallback={<SuspenseFallback cardCount={1} message="Loading market data..." />}>
            <div>Sales</div>
          </Suspense>
        )
      },
      // add more child routes to match your menu-structure.json
    ],
  },
]);

export default router;