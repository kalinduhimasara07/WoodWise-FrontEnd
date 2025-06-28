import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash } from "lucide-react"; // Import Lucide icons
import Loading from "../../components/loader";

export default function MillInventory() {
  const [timberData, setTimberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch timber inventory data
  useEffect(() => {
    const fetchTimberData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/timber");
        const result = await response.json();
        if (result.success) {
          // Sort data in ascending order by category
          const sortedData = result.data.sort((a, b) => {
            if (a.category < b.category) return -1;
            if (a.category > b.category) return 1;
            return 0;
          });
          setTimberData(sortedData); // Set the sorted data
        } else {
          console.error("Error fetching timber data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching timber data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimberData();
  }, []);

  const handleDelete = (id) => {
    // Placeholder for delete functionality
    console.log(`Delete timber item with ID: ${id}`);
    // You would call the delete API here
  };

  return (
    <div className="w-full h-full bg-white rounded-4xl p-6">
      {/* Title Section */}
      <div className="mb-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 mb-2">
          Timber Inventory
        </h1>
        <p className="text-sm text-gray-600">
          Manage timber stock levels, monitor thresholds, and update inventory
          status.
        </p>
      </div>

      {/* Button Section */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/mill/inventory/add-timber")}
          className="bg-gradient-to-r cursor-pointer from-green-500 to-green-700 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:from-green-600 hover:to-green-800 transition duration-200 font-medium"
        >
          + Add New Timber Entry
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-gray-50 rounded-2xl shadow-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Grade</th>
              <th className="py-3 px-4 text-left">Dimensions (L x W x H)</th> {/* Moved to 3rd column */}
              <th className="py-3 px-4 text-left">Price per Unit ($)</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">SKU</th>
              <th className="py-3 px-4 text-left">In Stock</th>
              <th className="py-3 px-4 text-left">Last Updated</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  <Loading/>
                </td>
              </tr>
            ) : Array.isArray(timberData) && timberData.length > 0 ? (
              timberData.map((timber) => (
                <tr key={timber._id} className="hover:bg-gray-100">
                  <td className="py-3 px-4">{timber.category}</td>
                  <td className="py-3 px-4">{timber.grade}</td>
                  <td className="py-3 px-4">
                    {timber.dimensions.length} x {timber.dimensions.width} x {timber.dimensions.height}
                  </td>
                  <td className="py-3 px-4">{timber.pricePerUnit}</td>
                  <td className="py-3 px-4">{timber.stock}</td>
                  <td className="py-3 px-4">{timber.sku}</td>
                  <td className="py-3 px-4">
                    {timber.inStock ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(timber.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/mill/inventory/edit-timber/${timber._id}`, { state: timber })}
                      className="text-green-700 hover:text-green-900 hover:underline text-sm font-medium"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(timber._id)}
                      className="text-red-600 hover:text-red-900 hover:underline text-sm font-medium"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
