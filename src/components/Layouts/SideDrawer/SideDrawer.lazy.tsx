import React, { lazy, Suspense } from 'react';

const LazySideDrawer = lazy(() => import('./SideDrawer'));

const SideDrawer = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySideDrawer {...props} />
  </Suspense>
);

export default SideDrawer;
