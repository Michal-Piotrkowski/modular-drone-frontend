import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./home/Home";
import LiveFlight from "./pages/LiveFlight";
import MapData from "./pages/mapdata/MapData";
import Modules from "./pages/Modules";
import Alerts from "./pages/Alerts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Navigate to="/live-flight" replace />,
      },
      {
        path: "live-flight",
        element: <LiveFlight />,
      },
      {
        path: "map-data",
        element: <MapData />,
      },
      {
        path: "modules",
        element: <Modules />,
      },
      {
        path: "alerts",
        element: <Alerts />,
      },
    ],
  },
]);