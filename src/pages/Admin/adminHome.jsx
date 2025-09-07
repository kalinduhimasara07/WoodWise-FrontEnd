import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/adminSidebar";
import Header from "../../components/Admin/header";
import AddUser from "./addUser";
import AddFurniture from "./addFurniture";
import AdminUserPage from "./adminUser";
import AdminFurniture from "./adminFurniture";
import AdminDashboard from "./adminDashboard";
import PosterGenerator from "./posterGenerator";
import MillOrderPage from "../Mill/millOrderPage";
import MillSupplies from "../Mill/millSupplies";
import MillSuppliers from "../Mill/millSupliers";
import { MillDashboard } from "../Mill/millDashboard";
import { StoreDashboard } from "../Store/storeDashboard";

import { Edit } from "lucide-react";
import EditFurniture from "./editFurniture";
import MillInventory from "./Mill/millInventory";
import AddTimber from "./Mill/addTimber";
import StoreOrdersPage from "./Store/storeOrderPage";
import PlaceOrder from "./Store/addOrder";
import StoreInventory from "./Store/storeInventory";
import NotFoundPage from "../../components/notFoundPage";
import StoreShowCase from "./Store/storeShowcase";
import ProductOverview from "./Store/productOverViewPage";
import AdminMessages from "./adminMessage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/loader";

export default function AdminHomePage() {
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setStatus("unauthenticated");
        toast.error("Please login first");
        navigate("/login", { replace: true });
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.role !== "admin") {
          setStatus("unauthorized");
          toast.error("You are not authorized to access this page");
          navigate("/login", { replace: true });
        } else {
          setStatus("authenticated");
        }
      } catch (err) {
        console.log(err);
        setStatus("unauthenticated");
        toast.error("You are not authenticated, please login");
        navigate("/login", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]); // ✅ no [status] loop

  if (status === "loading") {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (status !== "authenticated") {
    return null; // ✅ don’t render layout until authenticated
  }

  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-70px)] bg-[#d9d9d9]">
        <div>
          <AdminSidebar />
        </div>
        <Routes>
          {/* Admin */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/user" element={<AdminUserPage />} />
          <Route path="/user/add-user" element={<AddUser />} />
          <Route path="/furniture/add-furniture" element={<AddFurniture />} />
          <Route path="/furniture" element={<AdminFurniture />} />
          <Route path="/furniture/edit/:sku" element={<EditFurniture />} />
          <Route path="/messages" element={<AdminMessages />} />
          <Route path="/poster-generator" element={<PosterGenerator />} />

          {/* Mill */}
          <Route path="/mill/dashboard" element={<MillDashboard />} />
          <Route path="/mill/inventory" element={<MillInventory />} />
          <Route path="/mill/inventory/add-timber" element={<AddTimber />} />
          <Route path="/mill/orders" element={<MillOrderPage />} />
          <Route path="/mill/supplies" element={<MillSupplies />} />
          <Route path="/mill/suppliers" element={<MillSuppliers />} />

          {/* Store */}
          <Route path="/store/dashboard" element={<StoreDashboard />} />
          <Route path="/store/inventory" element={<StoreInventory />} />
          <Route
            path="/store/inventory/add-furniture"
            element={<AddFurniture />}
          />
          <Route path="/store/orders" element={<StoreOrdersPage />} />
          <Route path="/store/orders/add-order" element={<PlaceOrder />} />
          <Route path="/store/showcase" element={<StoreShowCase />} />
          <Route path="/store/showcase/:id" element={<ProductOverview />} />

          {/* Fallback */}
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
