import { useState } from 'react';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StoreOrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('Order History');
  const itemsPerPage = 7;

  const orderData = [
    { product: 'Maggi', orderValue: 'Rs 4306', quantity: '43 Packets', orderId: '7535', deliveredDate: '11/12/22', status: 'Delayed', statusColor: 'text-orange-500' },
    { product: 'Bru', orderValue: 'Rs ₹2557', quantity: '22 Packets', orderId: '5724', deliveredDate: '21/12/22', status: 'Successful', statusColor: 'text-green-500' },
    { product: 'Red Bull', orderValue: 'Rs 4075', quantity: '36 Packets', orderId: '2775', deliveredDate: '5/12/22', status: 'Returned', statusColor: 'text-red-500' },
    { product: 'Bourn Vita', orderValue: 'Rs 5052', quantity: '14 Packets', orderId: '2275', deliveredDate: '8/12/22', status: 'Successful', statusColor: 'text-green-500' },
    { product: 'Horlicks', orderValue: 'Rs 5370', quantity: '5 Packets', orderId: '2427', deliveredDate: '9/1/23', status: 'Returned', statusColor: 'text-red-500' },
    { product: 'Harpic', orderValue: 'Rs 6065', quantity: '10 Packets', orderId: '2578', deliveredDate: '9/1/23', status: 'Successful', statusColor: 'text-green-500' },
    { product: 'Ariel', orderValue: 'Rs 4078', quantity: '23 Packets', orderId: '2757', deliveredDate: '15/12/23', status: 'Delayed', statusColor: 'text-orange-500' },
    { product: 'Scotch Brite', orderValue: 'Rs 3559', quantity: '43 Packets', orderId: '3757', deliveredDate: '6/6/23', status: 'Successful', statusColor: 'text-green-500' },
    { product: 'Coca cola', orderValue: 'Rs 2055', quantity: '41 Packets', orderId: '2474', deliveredDate: '11/11/22', status: 'Delayed', statusColor: 'text-orange-500' },
    { product: 'Nestlé Milo', orderValue: 'Rs 3890', quantity: '30 Packets', orderId: '8632', deliveredDate: '12/3/23', status: 'Successful', statusColor: 'text-green-500' },
    { product: 'Pepsi', orderValue: 'Rs 2980', quantity: '25 Packets', orderId: '8621', deliveredDate: '18/2/23', status: 'Delayed', statusColor: 'text-orange-500' },
    { product: 'Dettol', orderValue: 'Rs 4520', quantity: '20 Packets', orderId: '8712', deliveredDate: '22/1/23', status: 'Returned', statusColor: 'text-red-500' },
    { product: 'Tide', orderValue: 'Rs 4999', quantity: '18 Packets', orderId: '8891', deliveredDate: '2/5/23', status: 'Successful', statusColor: 'text-green-500' },
    { product: 'Nescafé', orderValue: 'Rs 4100', quantity: '24 Packets', orderId: '8456', deliveredDate: '9/4/23', status: 'Delayed', statusColor: 'text-orange-500' },
    { product: 'Sprite', orderValue: 'Rs 3305', quantity: '28 Packets', orderId: '8590', deliveredDate: '10/3/23', status: 'Successful', statusColor: 'text-green-500' },
    { product: 'Vim Liquid', orderValue: 'Rs 3888', quantity: '12 Bottles', orderId: '8743', deliveredDate: '5/2/23', status: 'Returned', statusColor: 'text-red-500' },
    { product: 'Lux Soap', orderValue: 'Rs 3220', quantity: '40 Packets', orderId: '8977', deliveredDate: '11/6/23', status: 'Successful', statusColor: 'text-green-500' },
    { product: 'Dove Shampoo', orderValue: 'Rs 4785', quantity: '16 Bottles', orderId: '8112', deliveredDate: '15/6/23', status: 'Delayed', statusColor: 'text-orange-500' },
    { product: 'Vim Liquid', orderValue: 'Rs 3888', quantity: '12 Bottles', orderId: '8743', deliveredDate: '5/2/23', status: 'Returned', statusColor: 'text-red-500' },
    { product: 'Lux Soap', orderValue: 'Rs 3220', quantity: '40 Packets', orderId: '8977', deliveredDate: '11/6/23', status: 'Successful', statusColor: 'text-green-500' },
    { product: 'Dove Shampoo', orderValue: 'Rs 4785', quantity: '16 Bottles', orderId: '8112', deliveredDate: '15/6/23', status: 'Delayed', statusColor: 'text-orange-500' }
  ];

  // Pagination logic
  const totalPages = Math.ceil(orderData.length / itemsPerPage);
  const paginatedOrders = orderData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
};


  return (
    <div className="w-full px-6 py-2 bg-gray-50 h-[clac(100vh-70px)] overflow-y-auto rounded-4xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 ">
        <h1 className="text-2xl font-bold text-gray-900">Store Orders</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          On Going Orders
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-2 ">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Overall Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {/* Total Orders */}
          <div className="bg-white p-3 border-r-2">
            <div className="text-blue-500 font-semibold mb-1">Total Orders</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">37</div>
            <div className="text-sm text-gray-500">Last 7 days</div>
          </div>

          {/* Total Received */}
          <div className="bg-white p-3 border-r-2 ">
            <div className="text-orange-500 font-semibold mb-1">Total Received</div>
            <div className='flex'>
                <div className=''>
                    <div className="text-2xl font-bold text-gray-900 mb-2">32</div>
                    <div className="text-sm text-gray-500">Last 7 days</div>
                </div>
                <div className="text-right ml-20">
                <div className="text-sm text-gray-500">Revenue</div>
                <div className="font-semibold text-gray-900">Rs 25000</div>
                </div>
            </div>
          </div>

          {/* Total Returned */}
          <div className="bg-white p-3 border-r-2 ">
            <div className="text-blue-500 font-semibold mb-1">Total Returned</div>
            <div className='flex '>
                <div className=''>
                    <div className="text-2xl font-bold text-gray-900 mb-2">5</div>
                    <div className="text-sm text-gray-500">Last 7 days</div>
                </div>
                <div className="text-right ml-20">
                <div className="text-sm text-gray-500">Cost</div>
                <div className="font-semibold text-gray-900">Rs 2500</div>
                </div>
            </div>
          </div>

          {/* Processing */}
          <div className="bg-white p-3">
            <div className="text-orange-500 font-semibold mb-1">Processing</div>
            <div className='flex '>
                <div className=''>
                    <div className="text-2xl font-bold text-gray-900 mb-2">12</div>
                    <div className="text-sm text-gray-500">Ordered</div>
                </div>
                <div className="text-right ml-20">
                <div className="text-sm text-gray-500">Cost</div>
                <div className="font-semibold text-gray-900">Rs 2356</div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order History Section */}
      <div className="bg-white rounded-lg shadow-sm ">
        {/* Section Header */}
        <div className="flex justify-between items-center p-2 ">
          <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              Filters
            </button>
            <button className="bg-[#a86523e7] hover:bg-[#a86523] text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Order History
            </button>
          </div>
        </div>

        {/* Order History Table */}
      <div className="bg-white mt-4 rounded-md shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden">
            <thead className="bg-gray-50 border-b-2 border-gray-300">
              <tr>
                <th className="text-left px-6 py-2 font-semibold text-gray-900">Products</th>
                <th className="text-left px-6 py-2 font-semibold text-gray-900">Order Value</th>
                <th className="text-left px-6 py-2 font-semibold text-gray-900">Quantity</th>
                <th className="text-left px-6 py-2 font-semibold text-gray-900">Order ID</th>
                <th className="text-left px-6 py-2 font-semibold text-gray-900">Delivered Date</th>
                <th className="text-left px-6 py-2 font-semibold text-gray-900">Status</th>
                <th className="text-left px-6 py-2 font-semibold text-gray-900">Operation</th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
  <motion.tbody
    key={currentPage}
    initial={pageTransition.initial}
    animate={pageTransition.animate}
    exit={pageTransition.exit}
    transition={pageTransition.transition}
  >
    {paginatedOrders.map((order, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-2 font-medium text-gray-900">{order.product}</td>
                  <td className="px-6 py-2 text-gray-700">{order.orderValue}</td>
                  <td className="px-6 py-2 text-gray-700">{order.quantity}</td>
                  <td className="px-6 py-2 text-gray-700">{order.orderId}</td>
                  <td className="px-6 py-2 text-gray-700">{order.deliveredDate}</td>
                  <td className="px-6 py-2">
                    <span className={`font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-2">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      View More
                    </button>
                  </td>
                </tr>
              ))}
  </motion.tbody>
</AnimatePresence>
          </table>
        </div>
        </div>


        {/* Pagination */}
        {/* Pagination Controls */}
        <div className="flex justify-between items-center px-6 py-1 border-t">
          <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className={`flex items-center gap-2 px-4 text-gray-700 font-bold hover:text-gray-900 disabled:opacity-50 ${
            currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
          Previous
        </button>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        className={`flex items-center gap-2 px-4 text-gray-700 font-bold hover:text-gray-900 disabled:opacity-50 ${
          currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight size={16} />
      </button>

          
        </div>
    </div>
        </div>
  );
}