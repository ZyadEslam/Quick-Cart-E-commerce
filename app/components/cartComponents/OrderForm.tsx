"use client";
import { AddressProps, ProductCardProps } from "@/app/types/types";
import { placeOrderAction } from "@/app/utils/actions";
import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import AddressSelection from "./AddressSelection";
import { useFormState } from "react-dom";
import ActionNotification from "@/app/UI/ActionNotification";
import { api } from "@/app/utils/api";

const initialState = {
  success: false,
  message: "",
};

const OrderForm = ({ cart }: { cart: ProductCardProps[] }) => {
  const [taxes, setTaxes] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<AddressProps>();
  const session = useSession();
  const [orderFormState, formAction] = useFormState(
    placeOrderAction,
    initialState
  );

  const isOrderValidToPlace =
    selectedAddress && cart.length > 0 && session.status === "authenticated";

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

  const submitHandler = async () => {
    console.log("Handler Called");
    
    if (orderFormState.success) {
      setSelectedAddress(undefined);
      localStorage.setItem("cart", JSON.stringify([]));
      await api.clearCart(session.data?.user.id as string);
    }
  };

  return (
    <form onSubmit={submitHandler} action={formAction} className="flex flex-col gap-4">
      <div className="order-summary-pair">
        <ActionNotification {...orderFormState} />
        <label className="font-medium text-gray-600">SELECT ADDRESS</label>
        <AddressSelection
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress as AddressProps}
        />
      </div>
      <div className="hidden">
        <input
          type="text"
          name="addressId"
          value={selectedAddress?._id || ""}
        />
        <input
          type="text"
          name="totalPrice"
          value={(calculatedTotal + taxes).toString()}
        />
        <input type="text" name="products" value={JSON.stringify(cart)} />
      </div>
      <div className="order-summary-pair">
        <label className="font-medium text-gray-600">PROMO CODE</label>
        <input type="text" placeholder="Enter promo code" />
        <button type="button" className="bg-orange text-white w-fit py-2 px-10">
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
      <button
        type="submit"
        className="bg-orange py-3 text-white cursor-pointer hover:bg-orange/90 disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={!isOrderValidToPlace}
      >
        {session.status === "unauthenticated"
          ? "Please Login to add orders "
          : cart.length === 0
          ? "Cart is empty"
          : "Place Order"}
      </button>
    </form>
  );
};

export default OrderForm;
