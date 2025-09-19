import LoadingSpinner from "@/app/UI/LoadingSpinner";
import React, { Suspense, lazy } from "react";
import { getBaseUrl } from "@/app/utils/api";

const ProductImagesSlider = lazy(
  () => import("../../components/ProductImagesSlider")
);
const ProductDetails = lazy(() => import("../../components/ProductDetails"));

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const response = await fetch(`${getBaseUrl()}/api/product/${id}`, {
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
        <Suspense fallback={<LoadingSpinner />}>
          <ProductImagesSlider product={data} />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <ProductDetails data={data} />
        </Suspense>
      </div>
    </div>
  );
}
