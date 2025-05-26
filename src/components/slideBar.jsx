import React, { useState } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { GiWoodBeam } from 'react-icons/gi';
import { 
  MdDashboard, 
  MdInventory, 
  MdShoppingCart, 
  MdLocalShipping, 
  MdBusiness, 
  MdMessage, 
  MdLogout 
} from 'react-icons/md';
import { PiBuildingsDuotone } from 'react-icons/pi';
import { TbWood } from 'react-icons/tb';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: AiOutlineDashboard, active: true },
    { name: 'Inventory', icon: TbWood, active: false },
    { name: 'Orders', icon: MdShoppingCart, active: false },
    { name: 'Supplies', icon: GiWoodBeam, active: false },
    { name: 'Suppliers', icon: PiBuildingsDuotone, active: false },
  ];

  const bottomItems = [
    { name: 'Messages', icon: MdMessage },
    { name: 'Log Out', icon: MdLogout },
  ];

  return (
    <div className="w-64 h-[calc(100vh-70px)] pt-2 bg-[#d9d9d9] flex flex-col">
      {/* Header */}
      {/* <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-600 rounded-md"></div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">WoodWise</h1>
            <p className="text-sm text-gray-600">Mill</p>
          </div>
        </div>
      </div> */}

      {/* Main Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-colors duration-200 ${
                  activeItem === item.name
                    ? 'bg-[#a86523] text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <item.icon size={30} color={activeItem === item.name ? 'white' : '#a86523'}/>
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-2">
          {bottomItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  activeItem === item.name
                    ? 'bg-[#a86523] text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <item.icon size={30} color={activeItem === item.name ? 'white' : '#a86523'} />
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}