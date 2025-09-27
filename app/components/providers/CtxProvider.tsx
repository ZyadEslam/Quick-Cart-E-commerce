"use client";

import CartProvider from "./CartProvider";
import WishlistProvider from "./WishlistProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

const CtxProviders = ({ children }: AppProvidersProps) => {
  return (
    <CartProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartProvider>
  );
};

export default CtxProviders