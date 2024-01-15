/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const routes: IRoute[] = [
  {
    title: "列表title",
    path: "/",
    element: () => import("layouts/BasicLayout"),
    children: [
      {
        path: "/list",
        element: () => import("pages/list"),
        exact: true,
      },
    ],
    exact: true,
  },
  {
    title: "详情title",
    path: "/detail",
    element: () => import("layouts/BlankLayout"),
    children: [
      {
        title: "详情title",
        path: "/detail/:id",
        element: () => import("pages/detail/index"),
        exact: true,
        regx: "^/detail/[0-9]*$",
        backUrl: "/list",
      },
    ],
  },
];

function addLazyComponent(routes: IRoute[]) {
  routes.forEach((route) => {
    route.element = React.lazy(route.element);
    if (route.children) {
      addLazyComponent(route.children);
    }
  });
}
addLazyComponent(routes);
export default routes;
