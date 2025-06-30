import React, { useState } from "react";
import toast from "react-hot-toast";
import BackButton from "../../../components/backButton";

export default function PlaceOrder() {
  const [furnitureItems, setFurnitureItems] = useState([
    { sku: "", quantity: 1, unitPrice: "", note: "" },
  ]);

  const [order, setOrder] = useState({
    totalAmount: 0,
    advanceAmount: "",
    customerInfo: {
      name: "",
      contactNumber: "",
      email: "",
      address: "",
    },
    orderedBy: "Store Manager",
    status: "Pending",
    millWorker: "Not Assigned",
    notes: "",
  });

  const updateItem = (index, field, value) => {
    const updated = [...furnitureItems];
    updated[index][field] = value;
    setFurnitureItems(updated);
  };

  const addItem = () => {
    setFurnitureItems([
      ...furnitureItems,
      { sku: "", quantity: 1, unitPrice: 0, note: "" },
    ]);
  };

  const removeItem = (index) => {
    setFurnitureItems(furnitureItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate total amount from furniture items
    const totalAmount = furnitureItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    // Construct the final order payload
    const orderPayload = {
      ...order,
      furnitureItems,
      totalAmount,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);

        toast.error(
          "Failed to submit order: " + errorData.message || "Unknown error",
          {
            style: {
              border: "1px solid #dc2626",
              padding: "16px",
              color: "#991b1b",
              backgroundColor: "#fef2f2",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              maxWidth: "400px",
            },
            iconTheme: {
              primary: "#dc2626",
              secondary: "#fef2f2",
            },
            duration: 6000,
          }
        );
        return;
      }

      const result = await response.json();
      console.log("Order submitted successfully:", result);
      toast.success(`Order submitted successfully!`, {
        style: {
          border: "1px solid #059669",
          padding: "16px",
          color: "#065f46",
          backgroundColor: "#ecfdf5",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        iconTheme: {
          primary: "#059669",
          secondary: "#ecfdf5",
        },
        duration: 5000,
      });

      // Optional: reset form after successful submission
      setFurnitureItems([{ sku: "", quantity: 1, unitPrice: 0, note: "" }]);
      setOrder({
        totalAmount: 0,
        advanceAmount: 0,
        customerInfo: {
          name: "",
          contactNumber: "",
          email: "",
          address: "",
        },
        orderedBy: "Store Manager",
        status: "Pending",
        millWorker: "Not Assigned",
        notes: "",
      });
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to connect to server.");
    }
  };

  return (
    <div className="w-full mx-auto p-8 bg-white shadow-md rounded-3xl overflow-auto">
      <BackButton />
      <div className="mt-3 px-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Place New Order
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Fill in the details below to place a new furniture order
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Info */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-2">
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={order.customerInfo.name}
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      customerInfo: {
                        ...order.customerInfo,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Contact Number *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={order.customerInfo.contactNumber}
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      customerInfo: {
                        ...order.customerInfo,
                        contactNumber: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={order.customerInfo.email}
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      customerInfo: {
                        ...order.customerInfo,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={order.customerInfo.address}
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      customerInfo: {
                        ...order.customerInfo,
                        address: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Furniture Items */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-2">
              Furniture Items
            </h3>
            {furnitureItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 mb-2 items-end"
              >
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    SKU *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={item.sku}
                    onChange={(e) => updateItem(index, "sku", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Qty *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "quantity",
                        parseInt(e.target.value || "1", 10)
                      )
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Unit Price *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={item.unitPrice}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "unitPrice",
                        parseInt(e.target.value || "0", 10)
                      )
                    }
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">
                    Note
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={item.note}
                    onChange={(e) => updateItem(index, "note", e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="text-red-500 text-sm hover:underline"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 text-sm hover:underline mt-1"
              onClick={addItem}
            >
              + Add Another Item
            </button>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Advance Amount *
              </label>
              <input
                type="number"
                required
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={order.advanceAmount}
                onChange={(e) =>
                  setOrder({
                    ...order,
                    advanceAmount: parseInt(e.target.value || "0", 10),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Ordered By
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={order.orderedBy}
                onChange={(e) =>
                  setOrder({ ...order, orderedBy: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={order.status}
                onChange={(e) => setOrder({ ...order, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="In Production">In Production</option>
                <option value="Ready for Delivery">Ready for Delivery</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Mill Worker
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={order.millWorker}
                onChange={(e) =>
                  setOrder({ ...order, millWorker: e.target.value })
                }
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 mb-1 text-sm">
              Additional Notes
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-24 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={order.notes}
              onChange={(e) => setOrder({ ...order, notes: e.target.value })}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
