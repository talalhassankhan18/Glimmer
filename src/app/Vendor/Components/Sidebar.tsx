'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  activeMenu: string;
  onMenuClick: (label: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, onMenuClick }) => {
  const router = useRouter();

  const menuItems = [
    { label: 'Add Profile', path: '/Vendor/AddProfile' },
    { label: 'Add Services', path: '/Vendor/AddServices' },
    { label: 'Add Salon About', path: '/Vendor/AddAbout' },
    { label: 'Add Products', path: '/Vendor/AddProducts' },
    { label: 'View Service Orders', path: '/Vendor/ViewServiceOrders' },
    { label: 'View Product Orders', path: '/Vendor/ViewProductOrders' },
    { label: 'View Reviews', path: '/Vendor/ViewReviews' },
    { label: 'View Analytics', path: '/Vendor/ViewAnalytics' },
  ];

  const handleMenuClick = (item: { label: string; path: string }) => {
    onMenuClick(item.label); // Update active menu
    router.push(item.path); // Navigate to the respective page
  };

  return (
    <div className="w-1/5 bg-purple-700 text-white p-6 flex flex-col">
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer text-center p-2 rounded transition duration-300 ${
              activeMenu === item.label
                ? 'bg-white text-purple-700 font-bold'
                : 'hover:bg-purple-500/20'
            }`}
            onClick={() => handleMenuClick(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
