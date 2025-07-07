import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  CheckCircle,
  Eye,
  User,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const MessageComponent = ({
  message,
  currentUserId = "admin",
  onMarkAsRead = null,
}) => {
  const [isRead, setIsRead] = useState(
    message.readers?.includes(currentUserId) || false
  );
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSenderInfo = (senderId) => {
    const senderMap = {
      admin: { name: "Admin", color: "bg-red-100 text-red-800", icon: "👑" },
      storeStaff: {
        name: "Store Staff",
        color: "bg-blue-100 text-blue-800",
        icon: "🏪",
      },
      millStaff: {
        name: "Mill Staff",
        color: "bg-green-100 text-green-800",
        icon: "🏭",
      },
    };
    return (
      senderMap[senderId] || {
        name: senderId,
        color: "bg-gray-100 text-gray-800",
        icon: "👤",
      }
    );
  };

  const handleMarkAsRead = async () => {
    if (!isRead && onMarkAsRead && !isMarkingAsRead) {
      setIsMarkingAsRead(true);
      try {
        await onMarkAsRead(message._id);
        setIsRead(true);
      } catch (error) {
        console.error("Failed to mark as read:", error);
      } finally {
        setIsMarkingAsRead(false);
      }
    }
  };

  const senderInfo = getSenderInfo(message.senderId);
  const isOwnMessage = message.senderId === currentUserId;

  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-xs lg:max-w-md ${
          isOwnMessage ? "order-1" : "order-2"
        }`}
      >
        {/* Sender Badge */}
        {!isOwnMessage && (
          <div className="flex items-center mb-1">
            <span className="text-lg mr-1">{senderInfo.icon}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${senderInfo.color}`}
            >
              {senderInfo.name}
            </span>
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-sm ${
            isOwnMessage
              ? "bg-red-500 text-white"
              : "bg-white border border-gray-200"
          }`}
        >
          {/* Unread Indicator */}
          {!isRead && !isOwnMessage && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}

          <p
            className={`text-sm leading-relaxed ${
              isOwnMessage ? "text-white" : "text-gray-800"
            }`}
          >
            {message.message}
          </p>

          {/* Message Footer */}
          <div
            className={`flex items-center justify-between mt-2 text-xs ${
              isOwnMessage ? "text-red-100" : "text-gray-500"
            }`}
          >
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatTimestamp(message.timestamp)}</span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Read Count */}
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{message.readers?.length || 0}</span>
              </div>

              {/* Status Indicator */}
              {message.status === "read" && (
                <CheckCircle className="w-3 h-3 text-green-400" />
              )}
            </div>
          </div>
        </div>

        {/* Mark as Read Button */}
        {!isRead && !isOwnMessage && (
          <button
            onClick={handleMarkAsRead}
            disabled={isMarkingAsRead}
            className="mt-2 text-xs text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center space-x-1 disabled:opacity-50 cursor-pointer"
          >
            {isMarkingAsRead ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              <Eye className="w-3 h-3" />
            )}
            <span>{isMarkingAsRead ? "Marking..." : "Mark as read"}</span>
          </button>
        )}

        {/* Readers List (expandable) */}
        {isOwnMessage && message.readers?.length > 0 && (
          <div className="mt-2 text-xs text-right">
            <details className="cursor-pointer">
              <summary className="text-gray-500 hover:text-gray-700 transition-colors">
                Read by {message.readers.length} user
                {message.readers.length !== 1 ? "s" : ""}
              </summary>
              <div className="mt-1 space-y-1">
                {message.readers.map((readerId, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-end space-x-1"
                  >
                    <span className="text-gray-600">
                      {getSenderInfo(readerId).name}
                    </span>
                    <span>{getSenderInfo(readerId).icon}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

// Input field component for sending messages
const MessageInput = ({
  onSendMessage,
  currentUserId,
  disabled = false,
  isSending = false,
}) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isSending) {
      try {
        await onSendMessage(message.trim());
        setMessage("");
        setIsTyping(false);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled || isSending}
            rows={1}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />

          {/* Character count */}
          <div className="absolute bottom-1 right-2 text-xs text-gray-400">
            {message.length}/500
          </div>
        </div>

        <button
          type="submit"
          disabled={!message.trim() || disabled || isSending}
          className={`flex items-center justify-center w-11 h-11 rounded-lg transition-all duration-200 ${
            message.trim() && !disabled && !isSending
              ? "bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isSending ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          )}
        </button>
      </form>

      {/* Typing indicator */}
      {isTyping && !isSending && (
        <div className="mt-2 text-xs text-gray-500 flex items-center">
          <div className="flex space-x-1 mr-2">
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
            <div
              className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          Typing...
        </div>
      )}
    </div>
  );
};

// Main component with backend integration
const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const currentUserId = "admin"; // Admin user ID
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Automatically scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  // Fetch all messages from backend
  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/messages/`);
      const data = await response.json();

      if (data.success) {
        // Sort messages by timestamp (oldest first for chat display)
        const sortedMessages = data.data.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        setMessages(sortedMessages);
      } else {
        setError(data.message || "Failed to fetch messages");
      }
    } catch (err) {
      setError("Network error: Unable to fetch messages");
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mark message as read
  const handleMarkAsRead = async (messageId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: messageId,
          userId: currentUserId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the message in local state
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === messageId
              ? { ...msg, readers: data.data.readers, status: data.data.status }
              : msg
          )
        );
      } else {
        throw new Error(data.message || "Failed to mark as read");
      }
    } catch (err) {
      console.error("Error marking message as read:", err);
      throw err;
    }
  };

  // Send new message
  const handleSendMessage = async (messageText) => {
    try {
      setIsSending(true);

      const response = await fetch(`${API_BASE_URL}/messages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: currentUserId,
          messageContent: messageText,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Add the new message to local state
        setMessages((prevMessages) => [...prevMessages, data.data]);
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
      throw err;
    } finally {
      setIsSending(false);
    }
  };

  // Refresh messages
  const handleRefresh = () => {
    fetchMessages();
  };

  // Load messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Auto-refresh messages every 30 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchMessages();
  //   }, 30000);

  //   return () => clearInterval(interval);
  // }, []);

  if (loading) {
    return (
      <div className="mx-auto p-6 bg-gray-50 w-full h-full rounded-4xl overflow-auto">
        <div
          className="bg-white rounded-lg shadow-sm flex items-center justify-center"
          style={{ height: "580px" }}
        >
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-red-500 mx-auto mb-2" />
            <p className="text-gray-500">Loading messages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-15 py-6 bg-gray-50 w-full h-full rounded-4xl overflow-auto">
      <div
        className="bg-white rounded-lg shadow-sm mb-6 flex flex-col"
        style={{ height: "580px" }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Admin Messages
          </h2>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
            title="Refresh messages"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Messages Container */}
        <div 
            className="flex-1 overflow-y-auto p-4 space-y-4" 
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageComponent
                key={message._id}
                message={message}
                currentUserId={currentUserId}
                onMarkAsRead={handleMarkAsRead}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <MessageInput
          onSendMessage={handleSendMessage}
          currentUserId={currentUserId}
          disabled={!!error}
          isSending={isSending}
        />
      </div>
    </div>
  );
};

export default AdminMessages;