import React from 'react'

const SidebarItem = ({ icon, text, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
      active ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    <span className="flex items-center justify-center w-6">
      {React.cloneElement(icon, { className: "h-5 w-5" })}
    </span>
    <span className="ml-3">{text}</span>
  </div>
);

export default SidebarItem;