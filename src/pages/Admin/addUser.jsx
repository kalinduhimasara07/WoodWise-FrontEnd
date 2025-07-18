import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Building,
  MapPin,
  CheckCircle,
  X,
} from "lucide-react";
import BackButton from "../../components/backButton";
import toast from "react-hot-toast";

function AddUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "storestaff",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Password validation function
  const validatePassword = (password) => {
    const validations = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    };
    return validations;
  };

  const passwordValidation = validatePassword(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== "";

  const handleRegister = async () => {
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        style: {
          border: "1px solid #dc2626",
          padding: "16px",
          color: "#991b1b",
          backgroundColor: "#fef2f2",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        iconTheme: {
          primary: "#dc2626",
          secondary: "#fef2f2",
        },
        duration: 5000,
      });
      return;
    }

    // Check if password meets all requirements
    const isPasswordValid = Object.values(passwordValidation).every(Boolean);
    if (!isPasswordValid) {
      toast.error("Password does not meet all requirements", {
        style: {
          border: "1px solid #dc2626",
          padding: "16px",
          color: "#991b1b",
          backgroundColor: "#fef2f2",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        iconTheme: {
          primary: "#dc2626",
          secondary: "#fef2f2",
        },
        duration: 5000,
      });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`User registered successfully`, {
          style: {
            border: "1px solid #059669",
            padding: "16px",
            color: "#065f46",
            backgroundColor: "#ecfdf5",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          iconTheme: {
            primary: "#059669",
            secondary: "#ecfdf5",
          },
          duration: 5000,
        });
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "storestaff",
        });
        // Optionally, redirect to the user list or another page
        navigate(-1); // Go back to the previous page
      } else {
        toast.error(data.message || "Error registering user", {
          style: {
            border: "1px solid #dc2626",
            padding: "16px",
            color: "#991b1b",
            backgroundColor: "#fef2f2",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          iconTheme: {
            primary: "#dc2626",
            secondary: "#fef2f2",
          },
          duration: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error registering user", {
        style: {
          border: "1px solid #dc2626",
          padding: "16px",
          color: "#991b1b",
          backgroundColor: "#fef2f2",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
        iconTheme: {
          primary: "#dc2626",
          secondary: "#fef2f2",
        },
        duration: 5000,
      });
    }
    console.log(formData);
  };

  return (
    <div className="w-full h-full bg-white rounded-4xl p-6 overflow-y-scroll">
      <BackButton />
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New User
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                User Role:
              </label>
              <div className="grid grid-cols-3 gap-4">
                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.role === "admin"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <User className="w-5 h-5 text-purple-500 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Admin</div>
                  </div>
                </label>
                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.role === "storestaff"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="storestaff"
                    checked={formData.role === "storestaff"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <User className="w-5 h-5 text-purple-500 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Store Staff</div>
                  </div>
                </label>
                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.role === "millworker"
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="millworker"
                    checked={formData.role === "millworker"}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
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
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                      formData.confirmPassword !== "" && !passwordsMatch
                        ? "border-red-500"
                        : formData.confirmPassword !== "" && passwordsMatch
                        ? "border-green-500"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword !== "" && (
                  <div className="mt-2 flex items-center text-sm">
                    {passwordsMatch ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Passwords match
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <X className="w-4 h-4 mr-1" />
                        Passwords do not match
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-2">
                Password must contain:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <div className="flex items-center">
                  {passwordValidation.length ? (
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                  ) : (
                    <X className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={passwordValidation.length ? "text-green-600" : "text-red-600"}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordValidation.uppercase ? (
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                  ) : (
                    <X className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={passwordValidation.uppercase ? "text-green-600" : "text-red-600"}>
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordValidation.lowercase ? (
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                  ) : (
                    <X className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={passwordValidation.lowercase ? "text-green-600" : "text-red-600"}>
                    One lowercase letter
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordValidation.number ? (
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                  ) : (
                    <X className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={passwordValidation.number ? "text-green-600" : "text-red-600"}>
                    One number
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-[#a86523] via-[#d98c3b] to-[#a86523] text-white py-3 px-4 rounded-lg font-medium hover:from-[#9c732b] hover:to-[#9c732b] transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#a86523] focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;