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
  },
]);

export default router;