import { Route, Routes } from "react-router-dom";
import AdminSidebar from "../../components/Admin/adminSidebar";
import Header from "../../components/Admin/header";
import AddUser from "./addUser";
import AddFurniture from "./addFurniture";
import AdminUserPage from "./adminUser";
import AdminFurniture from "./adminFurniture";
import AdminDashboard from "./adminDashboard";
import MillOrderPage from "../Mill/millOrderPage";
import MillSupplies from "../Mill/millSupplies";
import MillSuppliers from "../Mill/millSupliers";
import { MillDashboard } from "../Mill/millDashboard";
import { StoreDashboard } from "../Store/storeDashboard";


import StoreShowCase from "../Store/storeShowcase";
import { Edit } from "lucide-react";
import EditFurniture from "./editFurniture";
import MillInventory from "./Mill/millInventory";
import AddTimber from "./Mill/addTimber";
import StoreOrdersPage from "./Store/storeOrderPage";
import PlaceOrder from "./Store/addOrder";
import StoreInventory from "./Store/storeInventory";
import NotFoundPage from "../../components/notFoundPage";

export default function AdminHomePage() {
  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-70px)] bg-[#d9d9d9]">
        <div>
          <AdminSidebar />
        </div>
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/user" element={<AdminUserPage />} />
          <Route path="/user/add-user" element={<AddUser />} />
          <Route path="/furniture/add-furniture" element={<AddFurniture />} />
          <Route path="/furniture" element={<AdminFurniture />} />
          <Route path="/mill/dashboard" element={<MillDashboard />} />
          <Route path="/mill/inventory" element={<MillInventory />} />
          <Route path="/mill/inventory/add-timber" element={<AddTimber />} />
          <Route path="/mill/orders" element={<MillOrderPage />} />
          <Route path="/mill/supplies" element={<MillSupplies />} />
          <Route path="/mill/suppliers" element={<MillSuppliers />} />
          <Route path="/store/dashboard" element={<StoreDashboard />} />
          <Route path="/store/inventory" element={<StoreInventory />} />
          <Route path="/store/inventory/add-furniture" element={<AddFurniture />} />
          <Route path="/store/orders" element={<StoreOrdersPage />} />
          <Route path="/store/orders/add-order" element={<PlaceOrder />} />
          <Route path="/store/showcase" element={<StoreShowCase />} />
          <Route path="/furniture/edit/:sku" element={<EditFurniture />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

// function AdminDashboard() {
//   return (
//     <div className="w-full h-full bg-white rounded-4xl p-6">
//       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         <div class="bg-white shadow-lg rounded-lg p-5">
//           <h2 class="text-xl font-semibold">🧱 Orders In Production</h2>
//           <p class="text-2xl text-blue-600 mt-2">3</p>
//         </div>
//         <div class="bg-white shadow-lg rounded-lg p-5">
//           <h2 class="text-xl font-semibold">✅ Completed Orders Today</h2>
//           <p class="text-2xl text-green-600 mt-2">6</p>
//         </div>
//         <div class="bg-white shadow-lg rounded-lg p-5">
//           <h2 class="text-xl font-semibold">🪵 Timber Volume Available</h2>
//           <p class="text-lg text-gray-700 mt-2">
//             Teak: 230 ft³
//             <br />
//             Mahogany: 190 ft³
//           </p>
//         </div>
//         <div class="bg-white shadow-lg rounded-lg p-5">
//           <h2 class="text-xl font-semibold">🚨 Low Stock Alerts</h2>
//           <p class="text-red-600 mt-2">Redwood below 50 ft³!</p>
//         </div>
//         <div class="bg-white shadow-lg rounded-lg p-5">
//           <h2 class="text-xl font-semibold">📦 Ready for Pickup</h2>
//           <p class="text-2xl text-yellow-600 mt-2">2</p>
//         </div>
//       </div>

//       <div class="bg-white shadow-lg rounded-lg p-6">
//         <h2 class="text-2xl font-semibold mb-4">Ongoing Production Orders</h2>
//         <table class="min-w-full text-sm">
//           <thead class="bg-gray-200">
//             <tr>
//               <th class="py-2 px-4 text-left">Order ID</th>
//               <th class="py-2 px-4 text-left">Item</th>
//               <th class="py-2 px-4 text-left">Quantity</th>
//               <th class="py-2 px-4 text-left">Status</th>
//               <th class="py-2 px-4 text-left">Due Date</th>
//               <th class="py-2 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr class="border-b">
//               <td class="py-2 px-4">#2025-031</td>
//               <td class="py-2 px-4">Bookshelf</td>
//               <td class="py-2 px-4">3</td>
//               <td class="py-2 px-4 text-blue-600">In Progress</td>
//               <td class="py-2 px-4">June 20</td>
//               <td class="py-2 px-4 text-center">
//                 <button class="bg-green-500 text-white px-3 py-1 rounded text-xs">
//                   Mark Completed
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
