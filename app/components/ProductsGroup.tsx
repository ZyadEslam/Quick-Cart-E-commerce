"use client";
import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductCardProps } from "../types/types";
import { api } from "../utils/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const ProductsGroup = ({
  numOfProducts,
  customClassName,
}: {
  numOfProducts?: number;
  customClassName?: string;
}) => {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Fetching products...");
      const fetchedProducts = await api.getProducts();
      console.log("Fetched products:", fetchedProducts);

      // Validate the response
      if (!Array.isArray(fetchedProducts)) {
        throw new Error(
          "Expected array of products, got: " + typeof fetchedProducts
        );
      }

      setProducts(fetchedProducts);

      if (numOfProducts) {
        const filtered = fetchedProducts.slice(0, numOfProducts);
        setFilteredProducts(filtered);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch products"
      );
    } finally {
      setIsLoading(false);
    }
  }, [numOfProducts]);

  useEffect(() => {
    fetchProducts();
  }, [numOfProducts, fetchProducts]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <section className={`${customClassName}`}>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Error loading products: {error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const productsToRender = numOfProducts ? filteredProducts : products;

  return (
    <section className={`${customClassName}`}>
      <div className="flex flex-wrap md:gap-4 gap-0 justify-between mb-8">
        {productsToRender.map((product: ProductCardProps) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsGroup;
