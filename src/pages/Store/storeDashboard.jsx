import { Route, Routes } from "react-router-dom";
import Header from "../../components/Store/header";
import StoreSidebar from "../../components/Store/storeSideBar";
import StoreOrdersPage from "./storeOrderPage";

export default function StoreDashboard() {
    return (
        <div>
            <Header/>
            <div className="flex h-[calc(100vh-70px)] bg-[#d9d9d9]">
                <div><StoreSidebar/></div>
                    <Routes>
                        <Route path="/dashboard" element={<div className=" w-full h-full bg-white rounded-4xl p-6"><h1>Store Dashboard</h1></div>} />
                        <Route path="/inventory" element={<div className=" w-full h-full bg-white rounded-4xl p-6"><h1>Store Inventory</h1></div>} />
                        <Route path="/orders" element={<StoreOrdersPage />} />
                        <Route path="/showcase" element={<div className=" w-full h-full bg-white rounded-4xl p-6"><h1>Store suplies</h1></div>} />
                        <Route path="/messages" element={<div className=" w-full h-full bg-white rounded-4xl p-6"><h1>Store Messages</h1></div>} />
                    </Routes>
            </div>
        </div>
    )
}