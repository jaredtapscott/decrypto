import React, { lazy, Suspense } from 'react';

const LazyTotal = lazy(() => import('./Total'));

const Total = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTotal {...props} />
  </Suspense>
);

export default Total;
