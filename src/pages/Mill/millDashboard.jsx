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
            <Header/>
            <div className="flex h-[calc(100vh-70px)] bg-[#d9d9d9]">
                <div><Sidebar/></div>
                    <Routes>
                        <Route path="/dashboard" element={<MillDashboard />} />
                        <Route path="/inventory" element={<MillInventory />} />
                        <Route path="/orders" element={<MillOrderPage/>} />
                        <Route path="/supplies" element={<MillSupplies/>} />
                        <Route path="/suppliers" element={<MillSuppliers/>} />
                        <Route path="/messages" element={<MillMessages />} />
                    </Routes>
            </div>
        </div>
    )
}


function MillDashboard() {
    return (
        <div className="w-full h-full bg-white rounded-4xl p-6">
            <h1 className="text-3xl">Mill Dashboard</h1>
            <p className="mt-4 text-gray-600">This is where you can manage your mill's operations.</p>
        </div>
    );
}