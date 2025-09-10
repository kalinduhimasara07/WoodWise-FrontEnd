import React, { useState } from 'react';
// 1. Import useNavigate from react-router-dom for navigation
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Save, AlertCircle, CheckCircle, User, Building, Phone, Mail, MapPin, Package } from 'lucide-react';

const AddSupplier = () => {
  // 2. Initialize the navigate function
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    contactPerson: '',
    contactNumber: '',
    email: '',
    address: {
      street: '',
      city: '',
      province: '',
      country: 'Sri Lanka',
      postalCode: ''
    },
    supplies: [{
      timberCategory: '',
      grade: 'Standard',
      pricePerUnit: '',
      stockAvailable: '',
      description: ''
    }],
    rating: 3,
    active: true
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  // Timber categories from your schema
  const timberCategories = [
    'Teak', 'Oak', 'Mahogany', 'Pine', 'Walnut', 'Bamboo', 'Ash', 'Rosewood', 'Rubberwood', 'Bodhi',
    'Mango', 'Yaka', 'Halmilla', 'Vatica', 'Rambutan', 'Kumbuk', 'Balan', 'Dumbara', 'Hedar', 
    'Sassafras', 'Kachchan', 'Millettia', 'Koss', 'Lunumidella', 'Kandula', 'Berrya', 'Cinnamon', 'Ruhuna'
  ];

  const grades = ['Premium', 'Standard', 'Economy'];
  const provinces = [
    'Western', 'Central', 'Southern', 'Northern', 'Eastern', 'North Western', 
    'North Central', 'Uva', 'Sabaragamuwa'
  ];

  // Handle input changes
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Handle supply changes
  const handleSupplyChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      supplies: prev.supplies.map((supply, i) => 
        i === index ? { ...supply, [field]: value } : supply
      )
    }));
  };

  // Add new supply
  const addSupply = () => {
    setFormData(prev => ({
      ...prev,
      supplies: [...prev.supplies, {
        timberCategory: '',
        grade: 'Standard',
        pricePerUnit: '',
        stockAvailable: '',
        description: ''
      }]
    }));
  };

  // Remove supply
  const removeSupply = (index) => {
    if (formData.supplies.length > 1) {
      setFormData(prev => ({
        ...prev,
        supplies: prev.supplies.filter((_, i) => i !== index)
      }));
    }
  };

  // Form validation
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.companyName && formData.contactPerson;
      case 2:
        return formData.contactNumber && formData.email;
      case 3:
        return formData.address.street && formData.address.city && formData.address.province;
      case 4:
        return formData.supplies.every(supply => 
          supply.timberCategory && supply.pricePerUnit && supply.stockAvailable
        );
      default:
        return true;
    }
  };

  // Submit form
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Convert string numbers to actual numbers
      const processedData = {
        ...formData,
        supplies: formData.supplies.map(supply => ({
          ...supply,
          pricePerUnit: parseFloat(supply.pricePerUnit),
          stockAvailable: parseInt(supply.stockAvailable)
        }))
      };

      // 3. Replace the environment variable with your actual backend URL
      // Make sure this URL is correct and your backend server is running.
      const response = await fetch('http://your-backend-api-url.com/api/suppliers/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });
      
      const data = await response.json();
      
      if (data && data.success) {
        setSuccess(true);
        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            companyName: '',
            contactPerson: '',
            contactNumber: '',
            email: '',
            address: {
              street: '',
              city: '',
              province: '',
              country: 'Sri Lanka',
              postalCode: ''
            },
            supplies: [{
              timberCategory: '',
              grade: 'Standard',
              pricePerUnit: '',
              stockAvailable: '',
              description: ''
            }],
            rating: 3,
            active: true
          });
          setCurrentStep(1);
          setSuccess(false);
          // Optional: Navigate back to the suppliers list after successful addition
          // navigate('/suppliers');
        }, 2000);
      } else {
        throw new Error(data.message || 'Failed to add supplier');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'Premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Standard': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Economy': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <User className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter supplier name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter contact person name"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Phone className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+94 XX XXX XXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="supplier@example.com"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => handleInputChange('rating', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map(rating => (
                    <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <MapPin className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Address Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => handleInputChange('address.street', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter street address"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => handleInputChange('address.city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter city"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province *
                  </label>
                  <select
                    value={formData.address.province}
                    onChange={(e) => handleInputChange('address.province', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Province</option>
                    {provinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.address.country}
                    onChange={(e) => handleInputChange('address.country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.address.postalCode}
                    onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter postal code"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Timber Supplies</h2>
              </div>
              <button
                type="button"
                onClick={addSupply}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Supply
              </button>
            </div>
            
            <div className="space-y-6">
              {formData.supplies.map((supply, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 relative">
                  {formData.supplies.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSupply(index)}
                      className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Supply #{index + 1}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timber Category *
                      </label>
                      <select
                        value={supply.timberCategory}
                        onChange={(e) => handleSupplyChange(index, 'timberCategory', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Timber Category</option>
                        {timberCategories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grade
                      </label>
                      <select
                        value={supply.grade}
                        onChange={(e) => handleSupplyChange(index, 'grade', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {grades.map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price per Unit (LKR) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={supply.pricePerUnit}
                        onChange={(e) => handleSupplyChange(index, 'pricePerUnit', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Available *
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={supply.stockAvailable}
                        onChange={(e) => handleSupplyChange(index, 'stockAvailable', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={supply.description}
                      onChange={(e) => handleSupplyChange(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter description (optional)"
                    />
                  </div>
                  
                  {supply.timberCategory && (
                    <div className="mt-4 flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Preview:</span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(supply.grade)}`}>
                        {supply.timberCategory} - {supply.grade}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="w-full h-full bg-white rounded-4xl p-6 flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Supplier Added Successfully!</h2>
          <p className="text-gray-600 mb-6">The supplier has been added to your database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-4xl p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            {/* 4. Add onClick handler to navigate back */}
            <button 
              onClick={() => navigate(-1)} 
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Supplier</h1>
              <p className="text-gray-600">Add a new timber supplier to your network</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => handleInputChange('active', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Active Supplier</span>
            </label>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    currentStep >= step
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-24 h-0.5 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-600">Basic Info</span>
            <span className="text-xs text-gray-600">Contact</span>
            <span className="text-xs text-gray-600">Address</span>
            <span className="text-xs text-gray-600">Supplies</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <div className="flex space-x-4">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!validateStep(currentStep)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !validateStep(currentStep)}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Add Supplier
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;