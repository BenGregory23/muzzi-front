import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page.tsx";
import Home from "./routes/home.tsx";
import UserMusics from "./routes/user-musics.tsx";
import SignIn from "./routes/auth/signin.tsx";
import SignUp from "./routes/auth/signup.tsx";
import LearnMore from "./routes/learn-more.tsx";
import "./i18n";
import Settings from "./routes/settings.tsx";
import NotFound from "./routes/not-found.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/musics",
        element: <UserMusics />,
      },
      {
        path: "/auth/signin",
        element: <SignIn />,
      },
      {
        path: "/auth/signup",
        element: <SignUp />,
      },
      {
        path: "/learn-more",
        element: <LearnMore />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
