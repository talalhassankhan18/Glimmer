'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../Components/Sidebar';
const AddServices: React.FC = () => {
  const router = useRouter();

  // State to track active menu
  const [activeMenu, setActiveMenu] = useState<string>('Add Services');

  // Navigation handler
  const navigateTo = (path: string, label: string) => {
    setActiveMenu(label);
    router.push(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
       {/* Sidebar */}
       <Sidebar activeMenu={activeMenu} onMenuClick={setActiveMenu} />

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center p-6">
        {/* Add Services Form */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-purple-700">Add Services</h2>
          <form>
            {/* Service Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="serviceName">
                Service Name
              </label>
              <input
                type="text"
                id="serviceName"
                placeholder="E.g., Haircut, Facial"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-purple-400"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Provide a brief description of the service"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-purple-400"
                required
              ></textarea>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="price">
                Price (in $)
              </label>
              <input
                type="number"
                id="price"
                placeholder="E.g., 50"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-purple-400"
                required
              />
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="duration">
                Duration (in minutes)
              </label>
              <input
                type="number"
                id="duration"
                placeholder="E.g., 60"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-purple-400"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="serviceImage">
                Upload Service Image
              </label>
              <input
                type="file"
                id="serviceImage"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-purple-400"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-600 transition duration-300"
            >
              Save Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddServices;
