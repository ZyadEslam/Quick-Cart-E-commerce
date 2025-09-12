"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AddressProps } from "@/app/types/types";

interface AddressSelectionProps {
  setSelectedAddress: (addrees: AddressProps) => void;
  selectedAddress: AddressProps;
  //   onAddressSelect?: (address: Address | null) => void;
  setSelectedAddressId: (addreesId: string) => void;
}

const AddressSelection = ({
  //   onAddressSelect,
  setSelectedAddress,
  selectedAddress,
}: AddressSelectionProps) => {
  const [addresses, setAddresses] = useState<AddressProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/order-address");
        const result = await response.json();

        if (result.success) {
          setAddresses(result.addresses);
        } else {
          setError(result.message || "Failed to fetch addresses");
        }
      } catch (error) {
        setError("Failed to fetch addresses");
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // document.addEventListener("mousedown", handleClickOutside);
    // return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddressSelect = (address: AddressProps) => {
    setSelectedAddress(address);
    // onAddressSelect?.(address);
    setIsOpen(false);
  };

  const handleDeleteAddress = async (
    addressId: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Prevent dropdown from closing

    if (!confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      const response = await fetch(`/api/order-address?id=${addressId}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.success) {
        // Remove from local state
        setAddresses((prev) => prev.filter((addr) => addr._id !== addressId));

        // If deleted address was selected, clear selection
        // if (selectedId === addressId) {
        //   setSelectedId(undefined);
        //   onAddressSelect?.(null);
        // }
      } else {
        alert(result.message || "Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address");
    }
  };

  //   const selectedAddress = addresses.find((addr) => addr._id === selectedId);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange"></div>
        <span className="ml-2 text-gray-600">Loading addresses...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
        <button
          //   onClick={fetchAddresses}
          className="mt-2 text-sm underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Shipping Address
      </h3>

      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
      >
        <div className="flex-1">
          {selectedAddress ? (
            <div>
              <div className="font-medium text-gray-900">
                {selectedAddress.name}
              </div>
              <div className="text-sm text-gray-600">
                {selectedAddress.address}, {selectedAddress.city},{" "}
                {selectedAddress.state} {selectedAddress.pinCode}
              </div>
            </div>
          ) : (
            <span className="text-gray-500">Select a shipping address</span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {addresses.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No addresses found.</p>
            </div>
          ) : (
            <div className="py-2">
              {addresses.map((address) => (
                <div key={address._id} className="relative group">
                  <button
                    onClick={() => handleAddressSelect(address)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors 
                        `}
                    // ${
                    //   selectedAddress && selectedAddress._id === address._id
                    //     ? "bg-orange-50 border-l-4 border-orange"
                    //     : ""
                    // }
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {address.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {address.address}
                        </div>
                        <div className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.pinCode}
                        </div>
                        <div className="text-sm text-gray-600">
                          Phone: {address.phone}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => handleDeleteAddress(address._id, e)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Delete address"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Address Link */}
          {/* <div className="border-t border-gray-200">
            <Link
              href="/shipping-address"
              className="block px-4 py-3 text-orange-600 hover:bg-orange-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New Address
              </div>
            </Link>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default AddressSelection;
