import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-[500px] max-w-4xl mx-auto  sm:px-6">
      <div className="relative">
        <Search 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5d6679]"
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search product, supplier, order"
          className="w-full h-12 pl-12 pr-4  sm:py-4 text-sm sm:text-base md:text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#a86523] focus:ring-2 focus:ring-[#a86523b9] transition-all duration-200 placeholder-[#5d6679]"
        />
      </div>
    </div>
  );
}
