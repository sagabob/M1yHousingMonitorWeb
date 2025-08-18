import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/app-landing-page";
import ClientHome from "./pages/client-home";
import NotFound from "./pages/not-found";

const router = createBrowserRouter([  
  {
    path: "/",   
    element: <Home />,
  },  
  {
    path: "/:alias",
    element: <ClientHome />,
  },
]);

export default router;