import { Route, Routes } from "react-router-dom";
import Header from "../../components/Mill/header";
import Sidebar from "../../components/Mill/millSlideBar";
import MillInventory from "./millInventory";
import MillOrderPage from "./millOrderPage";
import MillSupplies from "./millSupplies";
import MillSuppliers from "./millSupliers";
import MillMessages from "./millMessages";

export default function MillHomePage() {
  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-70px)] bg-[#d9d9d9]">
        <div>
          <Sidebar />
        </div>
        <Routes>
          <Route path="/dashboard" element={<MillDashboard />} />
          <Route path="/inventory" element={<MillInventory />} />
          <Route path="/orders" element={<MillOrderPage />} />
          <Route path="/supplies" element={<MillSupplies />} />
          <Route path="/suppliers" element={<MillSuppliers />} />
          <Route path="/messages" element={<MillMessages />} />
        </Routes>
      </div>
    </div>
  );
}

function MillDashboard() {
  return (
    <div className="w-full h-full bg-white rounded-4xl p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white shadow-lg rounded-lg p-5">
          <h2 class="text-xl font-semibold">🧱 Orders In Production</h2>
          <p class="text-2xl text-blue-600 mt-2">3</p>
        </div>
        <div class="bg-white shadow-lg rounded-lg p-5">
          <h2 class="text-xl font-semibold">✅ Completed Orders Today</h2>
          <p class="text-2xl text-green-600 mt-2">6</p>
        </div>
        <div class="bg-white shadow-lg rounded-lg p-5">
          <h2 class="text-xl font-semibold">🪵 Timber Volume Available</h2>
          <p class="text-lg text-gray-700 mt-2">
            Teak: 230 ft³
            <br />
            Mahogany: 190 ft³
          </p>
        </div>
        <div class="bg-white shadow-lg rounded-lg p-5">
          <h2 class="text-xl font-semibold">🚨 Low Stock Alerts</h2>
          <p class="text-red-600 mt-2">Redwood below 50 ft³!</p>
        </div>
        <div class="bg-white shadow-lg rounded-lg p-5">
          <h2 class="text-xl font-semibold">📦 Ready for Pickup</h2>
          <p class="text-2xl text-yellow-600 mt-2">2</p>
        </div>
      </div>

      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Ongoing Production Orders</h2>
        <table class="min-w-full text-sm">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-2 px-4 text-left">Order ID</th>
              <th class="py-2 px-4 text-left">Item</th>
              <th class="py-2 px-4 text-left">Quantity</th>
              <th class="py-2 px-4 text-left">Status</th>
              <th class="py-2 px-4 text-left">Due Date</th>
              <th class="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="py-2 px-4">#2025-031</td>
              <td class="py-2 px-4">Bookshelf</td>
              <td class="py-2 px-4">3</td>
              <td class="py-2 px-4 text-blue-600">In Progress</td>
              <td class="py-2 px-4">June 20</td>
              <td class="py-2 px-4 text-center">
                <button class="bg-green-500 text-white px-3 py-1 rounded text-xs">
                  Mark Completed
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
