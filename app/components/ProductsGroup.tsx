import React from "react";
import ProductCard from "./ProductCard";
import { StaticImageData } from "next/image";
export interface ProductsGroupProps {
  _id?: number;
  name: string;
  description: string;
  rating: number;
  price: string;
  oldPrice?: string;
  discount?: string;
  imgSrc: StaticImageData[];
}
const ProductsGroup = ({
  products,
  customClassName,
}: {
  products: ProductsGroupProps[];
  customClassName?: string;
}) => {
  return (
    <section className={`${customClassName}`}>
      <div className="flex flex-wrap md:gap-4 gap-0 justify-between mb-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsGroup;
