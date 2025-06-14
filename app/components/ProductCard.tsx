import React from "react";
import Image, { StaticImageData } from "next/image";
import { assets } from "@/public/assets/assets";
import Link from "next/link";

interface ProductCardProps {
  product: {
    _id?: number;
    name: string;
    description: string;
    rating: number;
    price: string;
    oldPrice?: string;
    discount?: string;
    imgSrc: StaticImageData[];
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`http://localhost:3000/product/${product._id}`}
      className="md:w-1/6 sm:w-[48%] h-[320px]"
    >
      <div className="relative bg-secondaryLight rounded-lg mb-2">
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
          <Image
            src={assets.heart_icon}
            alt="heart_icon"
            width={12}
            height={12}
          />
        </div>
        <Image
          src={`/api/product/image/${product._id}?index=0`}
          alt={`${product.name}`}
          width={300}
          height={300}
          className="w-full h-full hover:scale-[1.05] transition-all duration-300"
        />
      </div>
      <p className="font-medium">{product.name}</p>
      <p className="text-[12px] font-light text-gray-400 truncate">
        {product.description}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-[12px] ">{product.rating}</span>
        <span className="flex items-center gap-1">
          {Array.from({ length: product.rating }).map((_, index) => (
            <Image
              key={"product star" + index}
              src={assets.star_icon}
              width={12}
              height={12}
              alt="star_icon"
            />
          ))}
          {Array.from({ length: Math.ceil(5 - product.rating) }).map(
            (_, index) => (
              <Image
                key={"product star" + index}
                src={assets.star_dull_icon}
                width={12}
                height={12}
                alt="star_icon"
              />
            )
          )}
        </span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="font-semibold ">{product.price}</span>
        <span className="text-[12px] border border-gray-200 rounded-full px-4 py-1 text-gray-500">
          Buy now
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
