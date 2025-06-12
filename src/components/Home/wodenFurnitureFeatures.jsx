import React from 'react';
import { TreePine, Shield, Palette } from 'lucide-react';

export default function WoodenFurnitureFeatures() {
  const features = [
    {
      icon: <TreePine className="w-12 h-12 text-gray-600" strokeWidth={1.5} />,
      title: "Premium Solid Wood",
      description: "We use only carefully selected hardwoods like teak, oak and mahogany - renowned for nature."
    },
    {
      icon: <Shield className="w-12 h-12 text-gray-600" strokeWidth={1.5} />,
      title: "Built For Everyday Life",
      description: "Strong, Stable and Well-Constructed; our pieces are made to withstand"
    },
    {
      icon: <Palette className="w-12 h-12 text-gray-600" strokeWidth={1.5} />,
      title: "Premium Solid Wood",
      description: "We use only carefully selected hardwoods like teak, oak and mahogany - renowned for nature."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
        Why Choose Our<br />
        Wooden Furniture
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-200 rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors duration-300">
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-full p-4 shadow-sm">
                {feature.icon}
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {feature.title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}