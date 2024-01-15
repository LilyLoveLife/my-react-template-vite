import React, { Suspense } from "react";
import { Skeleton } from "antd-mobile";
import { Route, Routes, Navigate } from "react-router-dom";

interface IRoutesProps {
  routes: IRoute[];
}
const PageWithTitle = ({ route }: any) => {
  const { title, element: Component } = route;
  document.title = title;
  return <Component />;
};
const RouterViews: any = (routerItems: any[]) => {
  if (routerItems && routerItems.length) {
    return routerItems.map(({ path, title, element: Component, children, redirect }: any) => {
      return children && children.length ? (
        <Route
          path={path}
          key={path}
          element={
            <Suspense fallback={<Skeleton />}>
              <PageWithTitle route={{ title, element: Component }} />
            </Suspense>
          }
        >
          {/* 递归遍历子路由 */}
          {RouterViews(children)}
          {redirect ? (
            <Route path={path} element={<Navigate to={redirect} />} />
          ) : (
            <Route path={path} element={<Navigate to={children[0].path} />} />
          )}
        </Route>
      ) : (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<Skeleton />}>
              <PageWithTitle route={{ title, element: Component }} />
            </Suspense>
          }
          // element={
          //   <Suspense fallback={<Skeleton/>}>
          //     <Component/>
          //   </Suspense>
          // }
        />
      );
    });
  }
  return null;
};
const WrappedRoutes: React.FC<IRoutesProps> = (props: IRoutesProps) => {
  // if (!Array.isArray(props.routes)) return null;
  return <Routes>{RouterViews(props.routes)}</Routes>;
};

WrappedRoutes.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  routes: [],
};
export default React.memo(WrappedRoutes);
