import React from 'react';

function Profile({ employeeData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Employee Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Name</p>
            <p className="text-gray-800">{employeeData.name || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Email</p>
            <p className="text-gray-800">{employeeData.email || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Phone</p>
            <p className="text-gray-800">{employeeData.phone || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Date of Birth</p>
            <p className="text-gray-800">{employeeData.dob || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Address</p>
            <p className="text-gray-800">{employeeData.address || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Position</p>
            <p className="text-gray-800">{employeeData.position || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Experience</p>
            <p className="text-gray-800">{employeeData.experience || "0"} years</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Availability</p>
            <p className="text-gray-800">{employeeData.availability || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Application Date</p>
            <p className="text-gray-800">{employeeData.applicationDate || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Status</p>
            <p className="text-gray-800">{employeeData.status || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Emergency Contacts</h2>
        {employeeData.emergencyContacts && Array.isArray(employeeData.emergencyContacts) && employeeData.emergencyContacts.length > 0 ? (
          employeeData.emergencyContacts.map((contact, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <p className="text-sm font-medium text-gray-600">Name</p>
              <p className="text-gray-800">{contact.name || "N/A"}</p>
              <p className="text-sm font-medium text-gray-600 mt-2">Relationship</p>
              <p className="text-gray-800">{contact.relationship || "N/A"}</p>
              <p className="text-sm font-medium text-gray-600 mt-2">Phone</p>
              <p className="text-gray-800">{contact.phone || "N/A"}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No emergency contacts available</p>
        )}
      </div>
    </div>
  );
}

export default Profile;