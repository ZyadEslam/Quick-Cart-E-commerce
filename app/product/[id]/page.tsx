"use client";
import { ProductCardProps } from "@/app/types/types";
import LoadingSpinner from "@/app/UI/LoadingSpinner";
import React, { Suspense, lazy, useEffect } from "react";

const ProductImagesSlider = lazy(
  () => import("../../components/ProductImagesSlider")
);
const ProductDetails = lazy(() => import("../../components/ProductDetails"));

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ProductPage({ params }: Props) {
  const [data, setData] = React.useState<ProductCardProps>();
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { id } = await params;
        const response = await fetch(
          `http://localhost:3000/api/product/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            next: {
              revalidate: 60,
            },
          }
        );
        const { product } = await response.json();
        setData(product);
        return (
          <div className="w-full px-4 sm:px-[5%] md:px-[8.5%] py-4 sm:py-6 md:py-8">
            <div className="flex flex-col justify-between md:flex-row gap-4 sm:gap-6 md:gap-8">
              <Suspense fallback={<LoadingSpinner />}>
                <ProductImagesSlider product={data as ProductCardProps} />
              </Suspense>
              <Suspense fallback={<LoadingSpinner />}>
                <ProductDetails data={data as ProductCardProps} />
              </Suspense>
            </div>
          </div>
        );
      } catch (err) {
        console.log(err);
        return <div>Product not found</div>;
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params, data]);
  if (loading) {
    return <LoadingSpinner />;
  }
}
