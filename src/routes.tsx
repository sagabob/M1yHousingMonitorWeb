import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/app-landing-page";
import ClientHome from "./pages/topics/client-home";
import NotFound from "./pages/not-found";

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
      { index: true, element: <div>Overview</div> },            // /:alias
      { path: "population-households", element: <div>population-households</div> },       // /:alias/overview
      { path: "housing-and-approvals", element: <div>Rentals</div> },         // /:alias/rentals
      { path: "housing-market", element: <div>Sales</div> },             // /:alias/sales
      // add more child routes to match your menu-structure.json
    ],
  },
]);

export default router;