import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password,
      });
      console.log(res.data);
      const { token, user } = res.data;
      localStorage.setItem("token", token);

      // alert(`Login successful! Welcome ${user.username}`);
      // Replace the alert with this toast notification
      toast.success(`Login successful! Welcome ${user.username}`, {
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
      console.log("Login successful:", token);
      console.log("User data:", user);
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "millworker") {
        navigate("/mill/dashboard");
      } else if (user.role === "storestaff") {
        navigate("/store/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        // alert(err.response.data.message);
        // Replace the alert with this toast notification
        toast.error(err.response.data.message, {
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
            maxWidth: "400px",
          },
          iconTheme: {
            primary: "#dc2626",
            secondary: "#fef2f2",
          },
          duration: 6000,
        });
      } else {
        // alert("Login failed. Please try again.");
        // Replace the alert with this toast notification
        toast.error("Login failed. Please try again.", {
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
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Left side - Login Form */}
      <div className="w-[50%] flex-1 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h1 className="text-white text-3xl font-light mb-3">
              Welcome back!
            </h1>
            <p className="text-gray-400 text-sm">
              Enter your Credentials to access your account
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white text-sm">Password</label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-[#f39c12] hover:bg-[#f39d12d5] text-white font-medium py-3 rounded-xl transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Interior Design Scene */}
      <div className="w-[50%] flex-1 relative">
        <img
          src="/login.jpg"
          alt="Login Illustration"
          className="w-full h-full object-cover rounded-tl-[40px] rounded-bl-[40px]"
        />
      </div>
    </div>
  );
}
