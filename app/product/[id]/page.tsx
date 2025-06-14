import React from "react";
import RatingStars from "../../components/RatingStars";
import ProductImagesSlider from "../../components/ProductImagesSlider";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const response = await fetch(`http://localhost:3000/api/product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
  });
  const { product: data } = await response.json();

  if (!data) {
    return <div>Product not found</div>;
  }

  return (
    <div className="w-full px-4 sm:px-[5%] md:px-[8.5%] py-4 sm:py-6 md:py-8">
      <div className="flex flex-col justify-between md:flex-row gap-4 sm:gap-6 md:gap-8">
        <ProductImagesSlider product={data} />

        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <h1 className="sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
            {data.name}
          </h1>

          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <RatingStars rating={data.rating} />
            <span className="text-xs sm:text-sm text-gray-600">
              {data.rating}
            </span>
          </div>

          <p className="md:text-[15px] sm:text-sm text-gray-600 mb-3 sm:mb-4">
            {data.description}
          </p>

          <p className="text-xl sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">
            {data.price}$
            {data.oldPrice && (
              <span className="text-gray-400 font-normal text-sm ml-2 line-through">
                {data.oldPrice}$
              </span>
            )}
          </p>

          <hr className="my-4 sm:my-5 md:my-6 border-gray-200" />

          <div className="md:space-y-1 text-[14px] sm:space-y-3 mb-4 sm:mb-6">
            <div className="flex">
              <span className="w-20 text-gray-600 sm:w-24 font-medium">
                Brand:
              </span>
              <span className="text-gray-400">{data.brand}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-600 sm:w-24 font-medium">
                Color:
              </span>
              <span className="text-gray-400">{data.color}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-600 sm:w-24 font-medium">
                Category:
              </span>
              <span className="text-gray-400">{data.category}</span>
            </div>
          </div>

          <div className="w-full flex sm:flex-col md:flex-row  sm:gap-4 mt-4 sm:mt-6">
            <button className="sm:w-auto sm:px-6 md:px-8 py-2 sm:py-3 bg-secondaryLight text-gray-600 hover:bg-gray-300 transition-colors text-sm sm:text-base">
              Add to Cart
            </button>
            <button className="sm:w-auto sm:px-6 md:px-8 py-2 sm:py-3 bg-orange text-white hover:bg-orange/90 transition-colors text-sm sm:text-base">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
