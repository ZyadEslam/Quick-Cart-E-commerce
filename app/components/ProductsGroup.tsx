import React from "react";
import ProductCard from "./ProductCard";
import { ProductCardProps } from "../types/types";
import { api } from "../utils/api";

const ProductsGroup = async ({
  numOfProducts,
  customClassName,
}: {
  numOfProducts?: number;
  customClassName?: string;
}) => {
  const products = await api.getProducts();
  let filteredProducts: ProductCardProps[] = [];
  if (numOfProducts) {
    filteredProducts = products.slice(0, numOfProducts);
  }

  return (
    <section className={`${customClassName}`}>
      <div className="flex flex-wrap md:gap-4 gap-0 justify-between mb-8">
        {!numOfProducts
          ? products.map((product: ProductCardProps) => (
              <ProductCard key={product._id} product={product} />
            ))
          : filteredProducts.map((product: ProductCardProps) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default ProductsGroup;
