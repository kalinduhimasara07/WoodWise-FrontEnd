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
import MillSuppliers from "./Mill/millSupliers";
import AddSupplier from "./Mill/addsupplier";
import EditStoreFurniture from "./Store/editFurniture";


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
    return null; 
  }

  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-70px)] bg-gradient-to-r from-[#f5e9da] via-[#f7f3ee] to-[#e7d3bc] shadow h-[70px]">
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
          <Route path="/mill/suppliers" element={<MillSuppliers />} />
          <Route path="/mill/suppliers/add-supplier" element={<AddSupplier />} />

          {/* Store */}
          <Route path="/store/dashboard" element={<StoreDashboard />} />
          <Route path="/store/inventory" element={<StoreInventory />} />
          <Route path="/store/inventory/edit/:sku" element={<EditStoreFurniture />} />
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