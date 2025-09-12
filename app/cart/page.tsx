"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { lazy, Suspense, useState } from "react";
import { ProductCardProps } from "../types/types";
import LoadingSpinner from "../UI/LoadingSpinner";
// import OrderSummary from "../components/cartComponents/OrderSummary";
// import { CartTable } from "../components";
const CartTable = lazy(() => import("../components/cartComponents/CartTable"));
const OrderSummary = lazy(
  () => import("../components/cartComponents/OrderSummary")
);

const CartPage = () => {
  const [cart, setCart] = useState<ProductCardProps[]>([]);

  return (
    <div className="md:px-[8.5%] sm:px-[5%] py-6 md:grid md:grid-cols-[66%_30%] justify-between">
      <section>
        <div className="border-b border-gray-300 pb-6 mb-6 flex justify-between items-center">
          <h1 className="text-3xl">
            <span className="text-gray-500">Your</span>{" "}
            <span className="text-orange">Cart</span>
          </h1>
          <p className="text-xl text-gray-400">{cart.length} Items</p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <CartTable cart={cart} setCart={setCart} />
        </Suspense>
        <Link href={"../"} className="flex gap-2 text-orange-700 mt-6">
          <ArrowLeft /> Continue Shopping{" "}
        </Link>
      </section>
      <Suspense fallback={<LoadingSpinner />}>
        <OrderSummary cart={cart} />
      </Suspense>
    </div>
  );
};

export default CartPage;
