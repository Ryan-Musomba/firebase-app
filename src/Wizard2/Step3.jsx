import React from 'react';

function Step3({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B4513] to-[#A0522D]">References & Submission</h3>
        <p className="text-sm text-gray-600 mt-1">Provide references and submit your application</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name*</label>
        <input
          type="text"
          className="w-full pl-10 pr-3 py-3 border border-[#8B4513]/20 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all duration-200"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Relationship*</label>
          <input
            type="text"
            className="w-full pl-10 pr-3 py-3 border border-[#8B4513]/20 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all duration-200"
            name="emergencyContactRelationship"
            value={formData.emergencyContactRelationship}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone*</label>
          <input
            type="tel"
            className="w-full pl-10 pr-3 py-3 border border-[#8B4513]/20 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all duration-200"
            name="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Previous Experience Details</label>
        <textarea
          className="w-full pl-10 pr-3 py-3 border border-[#8B4513]/20 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513] transition-all duration-200"
          name="experienceDetails"
          value={formData.experienceDetails}
          onChange={handleChange}
          placeholder="Describe your previous restaurant experience"
          rows="4"
        />
      </div>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="agreeTerms"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-[#8B4513]/20 rounded"
          required
        />
        <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-700">
          I agree to the terms and conditions*
        </label>
      </div>
    </div>
  );
}

export default Step3;