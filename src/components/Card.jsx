import React from 'react'

const Card = ({ title, value, icon, className = "" }) => (
  <div className={`p-4 rounded-lg shadow-sm border border-gray-200 ${className}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold mt-1">{value}</p>
      </div>
      {icon && (
        <div className="p-2 rounded-full bg-blue-50 text-blue-500">
          {React.cloneElement(icon, { className: "h-5 w-5" })}
        </div>
      )}
    </div>
  </div>
);

export default Card;