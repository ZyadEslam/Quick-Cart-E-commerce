// "use client";
// import React, { useEffect, useState } from "react";
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
  // const [products, setProducts] = useState<ProductCardProps[]>([]);
  // const [filteredProducts, setFilterProducts] = useState<ProductCardProps[]>(
  //   []
  // );
  // const fetchProducts = async () => {

  try {
    const products = await api.getProducts();
    console.log("Fetched products:", products);
    // setProducts(products);
    let filteredProducts: ProductCardProps[] = [];

    if (numOfProducts) {
      filteredProducts = products.slice(0, numOfProducts);
      // setFilterProducts(filteredProducts);
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
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div>
        <p> Error loading products. Please try again later.</p>
      </div>
    );
  }
  // };
  // useEffect(() => {
  //   fetchProducts();
  // }, [numOfProducts]);

  // return (
  //   <section className={`${customClassName}`}>
  //     <div className="flex flex-wrap md:gap-4 gap-0 justify-between mb-8">
  //       {!numOfProducts
  //         ? products.map((product: ProductCardProps) => (
  //             <ProductCard key={product._id} product={product} />
  //           ))
  //         : filteredProducts.map((product: ProductCardProps) => (
  //             <ProductCard key={product._id} product={product} />
  //           ))}
  //     </div>
  //   </section>
  // );
};
export default ProductsGroup;
