import React, { useState, useEffect } from 'react'
import { ClockIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import Card from './Card';

function TimeTracking() {
  const [timeTracking, setTimeTracking] = useState({
    clockedIn: false,
    lastClockIn: null,
    breakStarted: false,
    breakStartTime: null,
    totalHours: 0
  });

  useEffect(() => {
    let interval;
    if (timeTracking.clockedIn && timeTracking.lastClockIn) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now - timeTracking.lastClockIn;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeTracking(prev => ({
          ...prev,
          totalHours: `${hours}h ${minutes}m`
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeTracking.clockedIn, timeTracking.lastClockIn]);

  const handleClockInOut = () => {
    if (!timeTracking.clockedIn) {
      setTimeTracking({
        ...timeTracking,
        clockedIn: true,
        lastClockIn: new Date(),
        totalHours: "0h 0m"
      });
    } else {
      setTimeTracking({
        ...timeTracking,
        clockedIn: false,
        lastClockIn: null,
        breakStarted: false,
        breakStartTime: null,
        totalHours: 0
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <ClockIcon className="h-5 w-5 mr-2 text-blue-500" /> Time Tracking
        </h2>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="mb-6 text-center">
            <p className="text-4xl font-bold mb-2">
              {timeTracking.totalHours || "0h 0m"}
            </p>
            <p className="text-gray-500">
              {timeTracking.clockedIn ? "Time worked today" : "Not clocked in"}
            </p>
          </div>
          <button
            onClick={handleClockInOut}
            className={`px-6 py-3 rounded-full text-white font-medium text-lg shadow-md transition-colors duration-200 ${
              timeTracking.clockedIn 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {timeTracking.clockedIn ? "Clock Out" : "Clock In"}
          </button>
          {timeTracking.clockedIn && (
            <p className="mt-4 text-sm text-gray-600">
              Clocked in at: {timeTracking.lastClockIn?.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <ChartBarIcon className="h-5 w-5 mr-2 text-blue-500" /> Time Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="This Week" value="40 hrs" />
          <Card title="Last Week" value="38 hrs" />
          <Card title="Overtime" value="2 hrs" />
        </div>
      </div>
    </div>
  )
}

export default TimeTracking;