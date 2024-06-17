import "./App.css";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import Login from "./components/Login";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Shimmer from "./components/Shimmer";
import React, { lazy, Suspense } from "react";
import Contact from "./components/Contact";
import "font-awesome/css/font-awesome.min.css";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Grocery = lazy(() => import("./components/Grocery"));

const App = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <About />,
                children: [
                    {
                        path: "me",
                        element: <Contact />,
                    },
                ],
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/grocery",
                element: (
                    <Suspense fallback={<Shimmer />}>
                        <Grocery />
                    </Suspense>
                ),
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />,
            },
        ],
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
