"use client";
import { ProductCardProps } from "@/app/types/types";
import React from "react";
import OrderForm from "./OrderForm";

const OrderSummary = ({ cart }: { cart: ProductCardProps[] }) => {
  return (
    <section className="bg-gray-50 p-4 ">
      <h1 className="text-2xl font-medium pb-4 ">OrderSummary</h1>
      <hr className="text-gray-300 mb-4" />
      <OrderForm cart={cart} />
    </section>
  );
};

export default OrderSummary;
