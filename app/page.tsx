import React, { Suspense, lazy } from "react";
import Link from "next/link";
import LoadingSpinner from "./UI/LoadingSpinner";
import { ProductSkeletonGroup } from "./components/productComponents/LoadingSkeleton";
const AdvBar = lazy(() => import("./components/homeComponents/AdvBar"));
const SubscriptionOffer = lazy(
  () => import("./components/homeComponents/SubscriptionOffer")
);
const FeaturedProductsList = lazy(
  () => import("./components/homeComponents/FeaturedProductsList")
);
const AdvSlider = lazy(() => import("./components/homeComponents/AdvSlider"));
const ProductsGroup = lazy(
  () => import("./components/productComponents/ProductsGroup")
);
export default function Home() {
  return (
    <div className="md:px-[8.5%] sm:px-[5%] py-6">
      <Suspense fallback={<LoadingSpinner />}>
        <AdvSlider />
      </Suspense>

      <div className="py-22">
        <h2 className="text-2xl font-medium mb-6">Popular products</h2>
        <Suspense fallback={<ProductSkeletonGroup />}>
          <ProductsGroup numOfProducts={10} />
        </Suspense>
        <div className="w-full text-center">
          <Link
            href="/shop"
            className="text-gray-400 border border-gray-300 px-10 py-2 text-sm rounded-sm"
          >
            See more
          </Link>
        </div>
      </div>

      <section>
        <h2 className="text-3xl text-center after:mx-auto font-medium underlined-header">
          Featured Products
        </h2>
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedProductsList />
        </Suspense>
      </section>
      <Suspense fallback={<LoadingSpinner />}>
        <AdvBar />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <SubscriptionOffer />
      </Suspense>
    </div>
  );
}
