"use client";
import React, { useEffect, useState, useMemo } from "react";
import { AddressProps, ProductCardProps } from "../../types/types";
import AddressSelection from "./AddressSelection";
import { placeOrderAction } from "@/app/utils/actions";

const OrderSummary = ({ cart }: { cart: ProductCardProps[] }) => {
  const [taxes, setTaxes] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<AddressProps>();

  // Calculate total based on cart items and their quantities
  const calculatedTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + item.price * (item.quantityInCart || 1);
    }, 0);
  }, [cart]);

  // Calculate total quantity of items
  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + (item.quantityInCart || 1);
    }, 0);
  }, [cart]);

  useEffect(() => {
    setTaxes((calculatedTotal * 2) / 100);
  }, [calculatedTotal]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formData.append("addressId", selectedAddress?._id || "");
    formData.append("totalPrice", (calculatedTotal + taxes).toString());
    formData.append("products", JSON.stringify(cart));
    const result = await placeOrderAction(formData);
    if (result.success) {
      alert("Order placed successfully!");
      // Optionally, you can redirect the user or clear the cart here
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <section className="bg-gray-50 p-4 ">
      <h1 className="text-2xl font-medium pb-4 ">OrderSummary</h1>
      <hr className="text-gray-300 mb-4" />
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div className="order-summary-pair">
          <label className="font-medium text-gray-600">SELECT ADDRESS</label>
          <AddressSelection
            setSelectedAddress={setSelectedAddress}
            selectedAddress={selectedAddress as AddressProps}
          />
        </div>
        <div className="order-summary-pair">
          <label className="font-medium text-gray-600">PROMO CODE</label>
          <input type="text" placeholder="Enter promo code" />
          <button
            type="button"
            className="bg-orange text-white w-fit py-2 px-10"
          >
            Apply
          </button>
        </div>
        <hr />
        <div className="order-summary-pair font-medium">
          <div className="flex justify-between">
            <p className="text-gray-500">ITEMS {totalItems}</p>
            <p>${calculatedTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Shipping Fee</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Tax (2%)</p>
            <p>${taxes.toFixed(2)}</p>
          </div>
        </div>
        <hr />
        <div className="flex justify-between font-medium text-xl">
          <p>Total</p>
          <p>${(calculatedTotal + taxes).toFixed(2)}</p>
        </div>
        <input
          type="submit"
          value="Place Order"
          className="bg-orange py-3 text-white cursor-pointer hover:bg-orange/90 "
        />
      </form>
    </section>
  );
};

export default OrderSummary;
