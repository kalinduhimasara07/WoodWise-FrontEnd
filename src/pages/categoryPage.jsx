// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import FurnitureCard from '../components/furnitureCard';
// import Loading from '../components/loader';



// const CategoryPage = () => {
//     const [furniture, setFurniture] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchFurniture = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/furniture`);
//                 if (response.data && response.data.success) {
//                     setFurniture(response.data.data);
//                 } else {
//                     setError('Failed to fetch furniture');
//                 }
//             } catch (err) {
//                 setError('An error occurred while fetching data.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFurniture();
//     }, []);

//     const groupedFurniture = furniture.reduce((acc, item) => {
//         const category = item.category;
//         if (!acc[category]) {
//             acc[category] = [];
//         }
//         acc[category].push(item);
//         return acc;
//     }, {});

//     if (loading) {
//         return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           {/* <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" /> */}
//           <Loading/>
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">
//             Loading Furniture...
//           </h2>
//           <p className="text-gray-600">
//             Please wait while we fetch our collection
//           </p>
//         </div>
//       </div>);
//     }

//     if (error) {
//         return <div className="text-center py-10 text-red-500">{error}</div>;
//     }

//     return (
//         <div className="bg-gray-50 min-h-screen px-13">
//             <div className="container mx-auto px-4 py-8">
//                 <h1 className="text-6xl font-bold text-gray-800 text-center mb-12">Our Furniture Collection</h1>

//                 {Object.keys(groupedFurniture).map(category => (
//                     <div key={category} className="mb-16">
//                         <h2 className="text-3xl font-semibold text-gray-700 mx-10 mb-12 p-3 bg-amber-100 border-l-6 border-amber-500 pl-4">{category}</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                             {groupedFurniture[category].map(item => (
//                                 <FurnitureCard key={item._id} furniture={item} />
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FurnitureCard from '../components/furnitureCard';
import Loading from '../components/loader';
import { Tag } from "lucide-react";

const CategoryPage = () => {
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/furniture`);
        if (response.data && response.data.success) {
          setFurniture(response.data.data);
        } else {
          setError("Failed to fetch furniture");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFurniture();
  }, []);

  const groupedFurniture = furniture.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Loading />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Loading Furniture...</h2>
          <p className="text-sm sm:text-base text-gray-600">Please wait while we fetch our collection</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-10 lg:px-20 xl:px-32 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 text-center mb-10 sm:mb-16">
          Our <span className="text-amber-600">Furniture</span> Collection
        </h1>

        {Object.keys(groupedFurniture).map((category) => (
          <div
            key={category}
            className="mb-12 sm:mb-20 rounded-xl sm:rounded-2xl bg-white shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Category Title */}
            <div className="flex items-center gap-3 mb-6 sm:mb-10">
              <div className="p-2 sm:p-3 bg-amber-100 rounded-full shadow">
                <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 tracking-wide relative">
                {category}
                <span className="block w-12 sm:w-16 h-1 bg-amber-500 mt-1 sm:mt-2 rounded-full"></span>
              </h2>
            </div>

            {/* Furniture Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupedFurniture[category].map((item) => (
                <div className="w-full max-w-md mx-auto">
                  <FurnitureCard key={item._id} furniture={item} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;