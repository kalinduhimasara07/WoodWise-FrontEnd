import React from 'react';

const BackButton = ({ onBack }) => {
  const handleBackClick = () => {
    // In a real app with react-router-dom, you would use:
    // navigate(-1);
    
    // For demonstration, we'll use the browser's back functionality
    // or call the provided onBack function
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out hover:shadow-md"
    >
      <svg
        className="w-4 h-4 transition-transform duration-200 ease-in-out group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>
  );
};

export default BackButton;