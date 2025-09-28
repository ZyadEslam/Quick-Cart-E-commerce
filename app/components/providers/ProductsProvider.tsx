"use client";
import { useState, useMemo, useEffect } from "react";
import { ProductCardProps } from "@/app/types/types";
import { useSession } from "next-auth/react";
import { api } from "@/app/utils/api";
import { ProductsContext } from "@/app/context/productsCtx";

interface ProductsProviderProps {
  children: React.ReactNode;
}

const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const { data: session } = useSession();
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Migrate anonymous wishlist to user wishlist when user logs in
  useEffect(() => {
    const getProductsFromServer = async () => {
      if (session?.user?.id && typeof window !== "undefined") {
        try {
          setIsLoading(true);
          const serverProducts = await api.getProducts();
          console.log("Server Products: ", serverProducts);

          setProducts(serverProducts);
          setIsLoading(false);
        } catch (error) {
          console.error("Error migrating wishlist:", error);
          setError(
            error instanceof Error ? error.message : "Error Fetching Products"
          );
        } finally {
          setIsLoading(false);
          setError(null);
        }
      }
    };
    getProductsFromServer();
  }, []);

  const contextValue = useMemo(
    () => ({
      products,
      isLoading,
      error,
      setProducts,
      setIsLoading,
      setError,
    }),
    [products, isLoading, error]
  );

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
