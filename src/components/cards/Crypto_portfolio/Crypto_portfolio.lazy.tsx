import React, { lazy, Suspense } from 'react';

const LazyCrypto_portfolio = lazy(() => import('./Crypto_portfolio'));

const Crypto_portfolio = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCrypto_portfolio {...props} />
  </Suspense>
);

export default Crypto_portfolio;
