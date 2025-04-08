import React from 'react';

const positions = [
  "Head Chef",
  "Server",
  "Bartender",
  "Dishwasher",
  "Delivery"
];

function Step1({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B4513] to-[#A0522D]">Position Information</h3>
        <p className="text-sm text-gray-600 mt-1">Select the position you're applying for</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Desired Position*</label>
        <select
          className="w-full pl-10 pr-3 py-3 border border-[#8B4513]/20 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all duration-200"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        >
          <option value="">Select position</option>
          {positions.map(pos => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Availability*</label>
        <select
          className="w-full pl-10 pr-3 py-3 border border-[#8B4513]/20 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all duration-200"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          required
        >
          <option value="">Select availability</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Weekends">Weekends only</option>
          <option value="Evenings">Evenings only</option>
        </select>
      </div>

      {formData.position && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)*</label>
          <input
            type="number"
            className="w-full pl-10 pr-3 py-3 border border-[#8B4513]/20 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all duration-200"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      )}
    </div>
  );
}

export default Step1;