import React from 'react';
import { Link } from 'react-router-dom';
// Importing icons for a richer UI
import { IoPricetag, IoResize, IoColorPalette, IoLeaf } from 'react-icons/io5';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const FurnitureCard = ({ furniture }) => {
    // Destructure all the necessary fields with default values
    const {
        name,
        images = [],
        price,
        salePrice,
        subcategory,
        sku,
        inStock = false,
        woodType,
        color,
        dimensions = {}
    } = furniture;

    const { length, width, height } = dimensions;

    // Safely get the image URL or use a placeholder
    const imageUrl = images && images.length > 0 && images[0].url
        ? images[0].url
        : 'https://via.placeholder.com/400x400.png?text=Image+Not+Available';

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD', // Change currency as needed
        }).format(amount);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group flex flex-col h-full">
            <Link to={`/furniture/${sku}`} className="block">
                <div className="relative">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-64 object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/400x400.png?text=Image+Not+Available'; }}
                    />
                    <div className="absolute inset-0 bg-[rgba(0,0,0,0.1] group-hover:bg-[rgba(0,0,0,0.3)] transition-opacity duration-300"></div>
                    {salePrice && (
                        <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">SALE</span>
                    )}
                </div>
            </Link>

            <div className="p-5 flex-grow flex flex-col">
                <p className="text-sm text-gray-500 mb-1">{subcategory}</p>
                <h3 className="text-xl font-bold text-gray-800 truncate mb-3" title={name}>{name}</h3>
                
                {/* --- New Details Section --- */}
                <div className="space-y-2 text-gray-600 text-sm mb-4">
                    {/* Stock Status */}
                    <div className={`flex items-center font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {inStock ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
                        {inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                    {/* Wood Type */}
                    {woodType && (
                        <div className="flex items-center">
                            <IoLeaf className="mr-2 text-gray-400" />
                            <span>{woodType} Wood</span>
                        </div>
                    )}
                    {/* Color */}
                    {color && (
                        <div className="flex items-center">
                            <IoColorPalette className="mr-2 text-gray-400" />
                            <span>Color: {color}</span>
                        </div>
                    )}
                    {/* Dimensions */}
                    {length && width && height && (
                         <div className="flex items-center">
                            <IoResize className="mr-2 text-gray-400" />
                            <span>{`${length} x ${width} x ${height} (in)`}</span>
                        </div>
                    )}
                </div>
                {/* --- End of New Details --- */}

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                     {/* Price */}
                    <div>
                        {salePrice ? (
                            <>
                                <p className="text-2xl font-bold text-red-600">{formatPrice(salePrice)}</p>
                                <p className="text-md text-gray-400 line-through">{formatPrice(price)}</p>
                            </>
                        ) : (
                            <p className="text-2xl font-bold text-gray-900">{formatPrice(price)}</p>
                        )}
                    </div>
                    
                    {/* Button */}
                    <Link to={`/furniture/${sku}`} className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-amber-500 transition-colors duration-300 text-center text-sm font-semibold shadow-sm">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FurnitureCard;