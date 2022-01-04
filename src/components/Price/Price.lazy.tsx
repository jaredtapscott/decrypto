import React, { lazy, Suspense } from 'react';

const LazyPrice = lazy(() => import('./Price'));

const Price = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPrice {...props} />
  </Suspense>
);

export default Price;
