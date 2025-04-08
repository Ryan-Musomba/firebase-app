import React, { useState } from "react";
import { CalendarDaysIcon, XMarkIcon, MapPinIcon, TruckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

function Schedule({ schedules, formatDate }) {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState("pending"); // pending, active, completed, cancelled

  const mockDeliveryData = {
    "1": {
      route: [
        { address: "123 Main St, New York, NY", order: "#ORD-1001", time: "07:30-08:00" },
        { address: "456 Oak Ave, Brooklyn, NY", order: "#ORD-1002", time: "08:15-08:45" }
      ],
      contact: "Dispatch: (555) 123-4567",
      notes: "Customer #ORD-1002 requested no-contact delivery"
    }
  };

  const handleViewRoute = (schedule) => {
    setSelectedSchedule(schedule);
    setDeliveryStatus("pending");
    setShowModal(true);
  };

  const handleDeliveryAction = (action) => {
    setDeliveryStatus(action);
    if (action === "completed" || action === "cancelled") {
      setTimeout(() => setShowModal(false), 1500);
    }
  };

  return (
    <div className="space-y-6 h-full overflow-hidden">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <CalendarDaysIcon className="h-5 w-5 mr-2 text-blue-500" /> Upcoming Deliveries
        </h2>
        <div className="overflow-y-auto flex-1">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stops</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(schedule.date)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{schedule.startTime} - {schedule.endTime}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{mockDeliveryData[schedule.id]?.route.length || 0}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={() => handleViewRoute(schedule)} className="text-blue-600 hover:text-blue-800 text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {deliveryStatus === "completed" ? "Delivery Completed" : 
                 deliveryStatus === "cancelled" ? "Delivery Cancelled" : "Delivery Details"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {deliveryStatus === "completed" || deliveryStatus === "cancelled" ? (
              <div className="text-center py-6">
                {deliveryStatus === "completed" ? (
                  <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                ) : (
                  <XCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                )}
                <p className="font-medium">
                  {deliveryStatus === "completed" ? "Delivery marked as complete!" : "Delivery cancelled!"}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h4 className="font-medium mb-2 flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2 text-red-500" />
                    Delivery Route
                  </h4>
                  <div className="h-48 w-full rounded-lg border border-gray-300 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">Map would display here</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <ClockIcon className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-medium">Delivery Stops:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {mockDeliveryData[selectedSchedule.id]?.route.map((stop, index) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium">{stop.order}</span> - {stop.address}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  {deliveryStatus === "pending" && (
                    <button 
                      onClick={() => handleDeliveryAction("active")}
                      className="w-full py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
                    >
                      Start Delivery
                    </button>
                  )}
                  {deliveryStatus === "active" && (
                    <>
                      <button 
                        onClick={() => handleDeliveryAction("completed")}
                        className="w-full py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                      >
                        Mark as Done
                      </button>
                      <button 
                        onClick={() => handleDeliveryAction("cancelled")}
                        className="w-full py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700"
                      >
                        Cancel Delivery
                      </button>
                    </>
                  )}
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