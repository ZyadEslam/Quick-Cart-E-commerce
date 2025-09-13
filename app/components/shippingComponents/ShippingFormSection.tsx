"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { shippingFormAction } from "@/app/utils/actions";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitBtn";

const initialState = {
  success: false,
  message: "",
};

const ShippingFormComponent = () => {
  const [state, formAction] = useFormState(shippingFormAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <form
        ref={formRef}
        action={formAction}
        className="space-y-5 md:w-[80%] sm:mb-5 md:mb-0"
      >
        {state.message && (
          <div
            className={`mb-4 p-3  ${
              state.success
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {state.message}
          </div>
        )}
        <div>
          <label htmlFor="name" className="address-form-label">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="address-form-input"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="address-form-label">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="address-form-input"
            placeholder="1234567890"
            required
          />
        </div>

        <div>
          <label htmlFor="pinCode" className="address-form-label">
            Pin Code *
          </label>
          <input
            type="text"
            id="pinCode"
            name="pinCode"
            className="address-form-input"
            placeholder="12345"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="address-form-label">
            Street Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="address-form-input"
            placeholder="123 Main Street, Apartment 4B"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="address-form-label">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="address-form-input"
              placeholder="New York"
              required
            />
          </div>

          <div>
            <label htmlFor="state" className="address-form-label">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="address-form-input"
              placeholder="NY"
              required
            />
          </div>
        </div>

        <SubmitButton />
      </form>
    </motion.div>
  );
};

export default ShippingFormComponent;
