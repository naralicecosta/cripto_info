import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Detail } from "./pages/detail";
import { NotFoud } from "./pages/notfound";

const router = createBrowserRouter([
    {
        children:[
            {
                path: "/",
                element: <Home />
            }
        ]
    }
])
export { router }