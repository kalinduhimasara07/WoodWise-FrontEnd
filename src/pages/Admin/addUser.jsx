import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building, MapPin, CheckCircle } from 'lucide-react';

function AddUser() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'storestaff',
    });

    const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('User created successfully!');
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    role: 'storestaff',
                });
            } else {
                alert(data.message || 'Registeration failed.');
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        }
        console.log(formData);
    };

   return (
    <div className="w-full h-full bg-white rounded-4xl p-6 overflow-y-scroll">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New User</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">User Role:</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.role === 'owner' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="owner"
                    checked={formData.role === 'owner'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <User className="w-5 h-5 text-purple-500 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Owner</div>
                  </div>
                </label>
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.role === 'storestaff' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="storestaff"
                    checked={formData.role === 'storestaff'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <User className="w-5 h-5 text-purple-500 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Store Staff</div>
                  </div>
                </label>
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.role === 'millworker' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="millworker"
                    checked={formData.role === 'millworker'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <Building className="w-5 h-5 text-purple-500 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Mill Worker</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-2">Password must contain:</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                  At least 8 characters
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                  One uppercase letter
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                  One lowercase letter
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                  One number
                </div>
              </div>
            </div>

            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


    export default AddUser;