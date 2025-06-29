import { Route, Routes } from "react-router-dom";
import Header from "../../components/Store/header";
import StoreSidebar from "../../components/Store/storeSideBar";
import StoreOrdersPage from "./storeOrderPage";
import StoreInventory from "./storeInventory";
import StoreShowCase from "./storeShowcase";
import StoreMessages from "./storeMessages";
import PlaceOrder from "./addOrder";

export default function StoreHome() {
  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-70px)] bg-[#d9d9d9]">
        <div>
             <StoreSidebar/>
        </div>
                    <Routes>
                        <Route path="/dashboard" element={<StoreDashboard />} />
                        <Route path="/inventory" element={<StoreInventory />} />
                        <Route path="/orders" element={<StoreOrdersPage />} />
                        <Route path="/showcase" element={<StoreShowCase/>} />
                        <Route path="/messages" element={<StoreMessages />} />
                        <Route path="/add-order" element={<PlaceOrder />} />
                    </Routes>
      </div>
    </div>
  );
}

export function StoreDashboard() {
  return (
    <div className="w-full h-full bg-white rounded-4xl p-6">
      <h1 className="text-3xl">Store Dashboard</h1>
      <p className="mt-4 text-gray-600">
        This is where you can manage your store's operations.
      </p>
    </div>
  );
}
