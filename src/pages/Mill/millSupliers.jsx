import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Using axios for cleaner API calls
import { Search, Filter, Star, Phone, Mail, MapPin, Package, Eye, Edit, Plus, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MillSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterTimber, setFilterTimber] = useState('');
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const navigate = useNavigate();
  
  // New states for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use the provided URL to fetch data
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/suppliers/`);
        
        if (response.data && response.data.success) {
          setSuppliers(response.data.data);
          setFilteredSuppliers(response.data.data);
        } else {
          // Handle cases where the API returns success: false
          throw new Error(response.data.message || 'Failed to fetch suppliers');
        }
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []); // Empty dependency array ensures this runs only once on mount

  // This useEffect handles all filtering logic
  useEffect(() => {
    let filtered = suppliers.filter(supplier => {
      const matchesSearch = supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesActive = showActiveOnly ? supplier.active : true;
      
      const matchesGrade = filterGrade ? supplier.supplies.some(supply => supply.grade === filterGrade) : true;
      
      const matchesTimber = filterTimber ? supplier.supplies.some(supply => supply.timberCategory === filterTimber) : true;
      
      return matchesSearch && matchesActive && matchesGrade && matchesTimber;
    });
    
    setFilteredSuppliers(filtered);
  }, [searchTerm, filterGrade, filterTimber, showActiveOnly, suppliers]);

  // Helper functions remain the same
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Standard': return 'bg-blue-100 text-blue-800';
      case 'Economy': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return `LKR ${amount.toLocaleString()}`;
  };
  
  // Correctly parse date string from API before formatting
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const timberCategories = ['Teak', 'Oak', 'Mahogany', 'Pine', 'Walnut', 'Bamboo', 'Ash', 'Rosewood', 'Rubberwood', 'Bodhi'];
  
  // Conditional rendering for loading state
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto animate-pulse mb-4" />
          <p className="text-xl font-medium text-gray-900">Loading Suppliers...</p>
        </div>
      </div>
    );
  }

  // Conditional rendering for error state
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="text-center bg-red-50 border border-red-200 p-8 rounded-lg">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl font-medium text-red-800 mb-2">Failed to load data</p>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-4xl p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Dashboard</h1>
          <p className="text-gray-600">Manage your timber suppliers and their inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Suppliers</p>
                <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                <p className="text-2xl font-bold text-gray-900">{suppliers.filter(s => s.active).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length || 0).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {suppliers.reduce((sum, s) => sum + s.supplies.reduce((supSum, sup) => supSum + sup.stockAvailable, 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search suppliers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
            >
              <option value="">All Grades</option>
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
              <option value="Economy">Economy</option>
            </select>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterTimber}
              onChange={(e) => setFilterTimber(e.target.value)}
            >
              <option value="">All Timber Types</option>
              {timberCategories.map(timber => (
                <option key={timber} value={timber}>{timber}</option>
              ))}
            </select>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showActiveOnly}
                  onChange={(e) => setShowActiveOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Active Only</span>
              </label>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => navigate("/mill/suppliers/add-supplier")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Supplier
              </button>
            </div>
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <div key={supplier._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{supplier.companyName}</h3>
                    <p className="text-gray-600">{supplier.contactPerson}</p>
                  </div>
                  <div className="flex items-center">
                    {renderStars(supplier.rating)}
                    <span className="ml-2 text-sm text-gray-600">({supplier.rating})</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {supplier.contactNumber}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {supplier.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {supplier.address.city}, {supplier.address.province}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Supplies ({supplier.supplies.length})</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {supplier.supplies.map((supply) => (
                      <div key={supply._id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <span className="font-medium">{supply.timberCategory}</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getGradeColor(supply.grade)}`}>
                            {supply.grade}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatCurrency(supply.pricePerUnit)}</div>
                          <div className="text-gray-500">Stock: {supply.stockAvailable}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      supplier.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {supplier.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-medium text-gray-900 mb-2">No suppliers found</p>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Detailed View Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedSupplier.companyName}</h2>
                <button 
                  onClick={() => setSelectedSupplier(null)}
                  className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Contact Person</p>
                      <p className="font-medium">{selectedSupplier.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-medium">{selectedSupplier.contactNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium">{selectedSupplier.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Rating</p>
                      <div className="flex items-center">
                        {renderStars(selectedSupplier.rating)}
                        <span className="ml-2">({selectedSupplier.rating})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Address</h3>
                  <p className="text-sm text-gray-600">
                    {selectedSupplier.address.street}, {selectedSupplier.address.city}, 
                    {selectedSupplier.address.province}, {selectedSupplier.address.country}
                    {selectedSupplier.address.postalCode && ` - ${selectedSupplier.address.postalCode}`}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Timber Supplies</h3>
                  <div className="space-y-3">
                    {selectedSupplier.supplies.map((supply) => (
                      <div key={supply._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{supply.timberCategory}</h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(supply.grade)}`}>
                              {supply.grade}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{formatCurrency(supply.pricePerUnit)}</p>
                            <p className="text-sm text-gray-600">per unit</p>
                          </div>
                        </div>
                        {supply.description && (
                          <p className="text-sm text-gray-600 mb-2">{supply.description}</p>
                        )}
                        <div className="flex justify-between text-sm">
                          <span>Stock Available: <strong>{supply.stockAvailable} units</strong></span>
                          <span>Last Updated: {formatDate(supply.lastUpdated)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MillSuppliers;