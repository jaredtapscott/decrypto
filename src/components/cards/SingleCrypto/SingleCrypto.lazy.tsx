import React, { lazy, Suspense } from 'react';

const LazySingleCrypto = lazy(() => import('./SingleCrypto'));

const SingleCrypto = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySingleCrypto {...props} />
  </Suspense>
);

export default SingleCrypto;
