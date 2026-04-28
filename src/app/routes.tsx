import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Learn } from "./components/Learn";
import { Stories } from "./components/Stories";
import { Resources } from "./components/Resources";
import { About } from "./components/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "learn", Component: Learn },
      { path: "stories", Component: Stories },
      { path: "resources", Component: Resources },
      { path: "about", Component: About },
    ],
  },
]);
