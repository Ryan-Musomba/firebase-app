import React from 'react';

function Step2({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B4513] to-[#A0522D]">Personal Information</h3>
        <p className="text-sm text-gray-600 mt-1">Enter your contact details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name*</label>
          <input
            type="text"
            className="w-full pl-10 pr-3 py-3 border border-[#8B4513]/20 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all duration-200"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email*</label>
          <input
            type="email"
            className="w-full pl-10 pr-3 py-3 border border-[#8B4513]/20 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all duration-200"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone*</label>
          <input
            type="tel"
            className="w-full pl-10 pr-3 py-3 border border-[#8B4513]/20 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all duration-200"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth*</label>
          <input
            type="date"
            className="w-full pl-10 pr-3 py-3 border border-[#8B4513]/20 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all duration-200"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address*</label>
        <input
          type="text"
          className="w-full pl-10 pr-3 py-3 border border-[#8B4513]/20 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all duration-200"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
}

export default Step2;