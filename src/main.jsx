import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./common/Navbar/Navbar.jsx";
import Home from "./Webpage/Home/Home.jsx"; 
import FlightSearch from "./common/FlightSearch/FlightSearch.jsx";

import DsiplayTicket from "./Webpage/DisplayTicket/DisplayTicket.jsx"; 
import { Provider } from "react-redux";
import { store } from "./services/sotre.js";
import SingleTicketDetails from "./common/SingleTicketDetails/SingleTicketDetails.jsx";
import UserReciepts from "./common/UserReciepts/UserReciepts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <FlightSearch />,
          },
        ],
      },
      {
        path: "/ticket",
        element: <DsiplayTicket />,
      },
      {
        path: "/ticket/:id",
        element: <SingleTicketDetails />,
      },
      {
        path: "/reciepts",
        element: <UserReciepts />,
      },
    ],
  },
]); 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> 
    <Provider store={store}>
      <RouterProvider router={router} /> 
    </Provider>
  </React.StrictMode>
);
