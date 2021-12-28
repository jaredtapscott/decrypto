import React, { lazy, Suspense } from 'react';

const LazySettings = lazy(() => import('./Settings'));

const Settings = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySettings {...props} />
  </Suspense>
);

export default Settings;
