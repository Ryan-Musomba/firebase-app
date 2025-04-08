import React, { useState } from "react";
import { CalendarDaysIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

function Schedule({ schedules, formatDate }) {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [requestReason, setRequestReason] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredShift, setPreferredShift] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleRequestChange = (schedule) => {
    setSelectedSchedule(schedule);
    setShowChangeModal(true);
  };

  const submitChangeRequest = () => {
    console.log("Change request submitted:", {
      originalSchedule: selectedSchedule,
      reason: requestReason,
      preferredDate,
      preferredShift,
    });

    setRequestSubmitted(true);
    setTimeout(() => {
      setShowChangeModal(false);
      setRequestSubmitted(false);
      setRequestReason("");
      setPreferredDate("");
      setPreferredShift("");
    }, 2000);
  };

  const handleSwapRequest = () => {
    // Swap request logic would go here
    console.log(
      `Looking for potential swaps for shift on ${formatDate(
        selectedSchedule.date
      )}`
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <CalendarDaysIcon className="h-5 w-5 mr-2 text-blue-500" /> Upcoming
          Shifts
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Shift
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {formatDate(schedule.date)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {schedule.startTime} - {schedule.endTime}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {schedule.role}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {schedule.location}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      onClick={() => handleRequestChange(schedule)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Request Change
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    
      {showChangeModal && selectedSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Request Shift Change</h3>
              <button
                onClick={() => setShowChangeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {requestSubmitted ? (
              <div className="text-center py-6">
                <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="font-medium">Your request has been submitted!</p>
                <p className="text-sm text-gray-600 mt-1">
                  You'll be notified when it's processed.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Current Shift Details:</h4>
                  <div className="bg-gray-50 p-3 rounded">
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {formatDate(selectedSchedule.date)}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span>{" "}
                      {selectedSchedule.startTime} - {selectedSchedule.endTime}
                    </p>
                    <p>
                      <span className="font-medium">Role:</span>{" "}
                      {selectedSchedule.role}
                    </p>
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {selectedSchedule.location}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for change
                    </label>
                    <textarea
                      value={requestReason}
                      onChange={(e) => setRequestReason(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      rows="3"
                      placeholder="Please explain why you need this change"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred shift time
                    </label>
                    <input
                      type="text"
                      value={preferredShift}
                      onChange={(e) => setPreferredShift(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      placeholder="e.g. Morning, Afternoon, or specific times"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={handleSwapRequest}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300"
                    >
                      Find Swap Options
                    </button>
                    <button
                      onClick={submitChangeRequest}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Schedule;
