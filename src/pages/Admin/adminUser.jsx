import React, { useState, useEffect } from "react";
import { Trash2, UserPlus, Search, AlertTriangle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loader";
import toast from "react-hot-toast";

export default function AdminUserPage() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    // Replace with your navigation logic
    console.log("Navigate to:", path);
    navigate(path);
    // Example: window.location.href = path;
  };
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Fetch users from backend
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/`) // Replace with your actual API endpoint
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  // Filter users based on search term and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      // Simulate API delete call
      setUsers(users.filter((user) => user._id !== userToDelete._id));
      setShowDeleteModal(false);
      setUserToDelete(null);
      // You would replace this with actual API call:
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/auth/${userToDelete._id}`);
      toast.success(`User deleted successfully`, {
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
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "millworker":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "storestaff":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-white rounded-4xl p-6">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-3xl p-6 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-colors shadow-lg hover:shadow-xl"
          onClick={() => handleNavigation("/admin/user/add-user")}
        >
          <UserPlus className="h-5 w-5" />
          Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="text-blue-800 text-sm font-medium">Total Users</div>
          <div className="text-2xl font-bold text-blue-900">{users.length}</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="text-purple-800 text-sm font-medium">Admin</div>
          <div className="text-2xl font-bold text-purple-900">
            {users.filter((u) => u.role === "admin").length}
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="text-green-800 text-sm font-medium">Store Staff</div>
          <div className="text-2xl font-bold text-green-900">
            {users.filter((u) => u.role === "storestaff").length}
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="text-orange-800 text-sm font-medium">
            Mill Workers
          </div>
          <div className="text-2xl font-bold text-orange-900">
            {users.filter((u) => u.role === "millworker").length}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search users by username or email..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-40"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="millworker">Mill Worker</option>
          <option value="storestaff">Store Staff</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="flex-1 overflow-hidden bg-gray-50 rounded-xl border border-gray-200">
        <div className="overflow-y-auto h-full">
          <table className="w-full">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Username
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Role
                </th>
                <th className="text-left p-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-white transition-colors border-b border-gray-200 last:border-b-0"
                  >
                    <td className="p-4">
                      <div className="font-medium text-gray-900">
                        {user.username}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-600">{user.email}</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.role === "admin" ? null : (
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="Delete user"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <div className="text-lg font-medium">No users found</div>
                    <div className="text-sm">
                      Try adjusting your search or filters
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Delete User</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete user "{userToDelete?.username}"?
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
