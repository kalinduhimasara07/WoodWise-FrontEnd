import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ track login state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent double submit
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password }
      );
      const { token, user } = res.data;
      localStorage.setItem("token", token);

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
        iconTheme: { primary: "#059669", secondary: "#ecfdf5" },
        duration: 5000,
      });
      // console.log("user", user.email);
      if (user.role === "admin")
        navigate("/admin/dashboard", {
          state: { userEmail: user.email, userName: user.username },
        });
      else if (user.role === "millworker")
        navigate("/mill/dashboard", {
          state: { userEmail: user.email, userName: user.username },
        });
      else if (user.role === "storestaff")
        navigate("/store/dashboard", {
          state: { userEmail: user.email, userName: user.username },
        });
    } catch (err) {
      if (err.response?.data.message) {
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
          iconTheme: { primary: "#dc2626", secondary: "#fef2f2" },
          duration: 6000,
        });
      } else {
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
          iconTheme: { primary: "#dc2626", secondary: "#fef2f2" },
          duration: 5000,
        });
      }
    } finally {
      setLoading(false); // ✅ reset button state
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Left side - Login Form */}
      <div className="w-[50%] flex-1 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h1 className="text-white text-8xl font-semibold mb-10">
              WoodWise
            </h1>
            <h1 className="text-white text-3xl font-light mb-3">
              Welcome back!
            </h1>
            <p className="text-gray-400 text-sm">
              Enter your Credentials to access your account
            </p>
          </div>

          {/* ✅ Wrap inputs in a <form> */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Password"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* ✅ Button reacts to "loading" state */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-medium py-3 rounded-xl transition-colors
                ${
                  loading
                    ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                    : "bg-[#f39c12] hover:bg-[#f39d12d5] text-white"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="flex items-center justify-center mt-6 space-x-4 text-white">
            <p>or</p>
          </div>
          <div className="text-center">
            <button className="px-6 py-1 bg-green-600 text-white font-semibold rounded-2xl shadow-md hover:bg-green-700 transition-all duration-300 ease-in-out justify-center item-center mt-5" onClick={() => navigate('/')}>
            Go to Showcase
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
