import React from "react";
// import React, { Suspense } from "react";
import {
  AdvSlider,
  AdvBar,
  FeaturedProductsList,
  SubscriptionOffer,
  ProductsGroup,
} from "../components";
import Link from "next/link";
import { getProducts } from "../utils/utilFunctions";

export default async function HomePageContent() {
  const products = await getProducts();

  return (
    <div className="md:px-[8.5%] sm:px-[5%] py-6">
      <AdvSlider />

      <div className="py-22">
        <h2 className="text-2xl font-medium mb-6">Popular products</h2>
        {/* <Suspense fallback={<div>Loading products...</div>}> */}
        <ProductsGroup products={products.slice(0, 10)} />
        {/* </Suspense> */}
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
        <FeaturedProductsList />
      </section>

      <AdvBar />
      <SubscriptionOffer />
    </div>
  );
}
React.memo(AdvSlider);
React.memo(AdvBar);
// export const experimental_ppr = true;
