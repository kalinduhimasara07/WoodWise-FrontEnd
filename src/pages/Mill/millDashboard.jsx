import { Route, Routes } from "react-router-dom";
import Header from "../../components/Mill/header";
import Sidebar from "../../components/Mill/millSlideBar";

export default function MillDashboard() {
    return (
        <div>
            <Header/>
            <div className="flex h-[calc(100vh-70px)]">
                <div><Sidebar/></div>
                    <Routes>
                        <Route path="/dashboard" element={<div className=" w-full h-full"><h1>Mill Dashboard</h1></div>} />
                        <Route path="/inventory" element={<div className=" w-full h-full"><h1>Mill Inventory</h1></div>} />
                        <Route path="/orders" element={<div className=" w-full h-full"><h1>Mill Orders</h1></div>} />
                        <Route path="/supplies" element={<div className=" w-full h-full"><h1>Mill suplies</h1></div>} />
                        <Route path="/suppliers" element={<div className=" w-full h-full"><h1>Mill suppliers</h1></div>} />
                        <Route path="/messages" element={<div className=" w-full h-full"><h1>Mill Messages</h1></div>} />
                    </Routes>
            </div>
        </div>
    )
}