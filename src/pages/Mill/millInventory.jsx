export default function MillInventory() {
  return (
    <div className="w-full h-full bg-white rounded-4xl p-6">
      {/* Title Section */}
      <div className="mb-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 mb-2">Timber Inventory</h1>
        <p className="text-sm text-gray-600">Manage timber stock levels, monitor thresholds, and update inventory status.</p>
      </div>

      {/* Button Section */}
      <div className="flex justify-end mb-6">
        <button className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:from-green-600 hover:to-green-800 transition duration-200 font-medium">
          + Add New Timber Entry
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-gray-50 rounded-2xl shadow-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="py-3 px-4 text-left">Material</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Available Volume (ft³)</th>
              <th className="py-3 px-4 text-left">Threshold</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Last Updated</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4">Teak</td>
              <td className="py-3 px-4">Hardwood</td>
              <td className="py-3 px-4">320</td>
              <td className="py-3 px-4">100</td>
              <td className="py-3 px-4 text-green-600 font-semibold">OK</td>
              <td className="py-3 px-4">2025-06-17</td>
              <td className="py-3 px-4 text-center">
                <button className="text-green-700 hover:text-green-900 hover:underline text-sm font-medium">Edit</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4">Redwood</td>
              <td className="py-3 px-4">Softwood</td>
              <td className="py-3 px-4">45</td>
              <td className="py-3 px-4">50</td>
              <td className="py-3 px-4 text-red-600 font-semibold">Low</td>
              <td className="py-3 px-4">2025-06-17</td>
              <td className="py-3 px-4 text-center">
                <button className="text-green-700 hover:text-green-900 hover:underline text-sm font-medium">Edit</button>
              </td>
            </tr>
            {/* Additional rows can go here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}