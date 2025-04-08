import React from 'react';
import { CalendarDaysIcon, ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Card from './Card';

function Dashboard({ schedules = [], payrollData = {}, formatDate }) {
  // Ensure schedules is an array and has at least one item
  const hasSchedules = Array.isArray(schedules) && schedules.length > 0;
  const nextShift = hasSchedules 
    ? `${formatDate(schedules[0].date)}\n${schedules[0].startTime} - ${schedules[0].endTime}`
    : "No upcoming shifts";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          title="Next Shift" 
          value={nextShift} 
          icon={<CalendarDaysIcon />}
        />
        <Card 
          title="Hours This Week" 
          value={`${payrollData.weeklyHours || "0"} hrs`} 
          icon={<ClockIcon />}
        />
        <Card 
          title="Next Paycheck" 
          value={`$${payrollData.currentPay || "0.00"}`} 
          icon={<CurrencyDollarIcon />}
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Upcoming Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hasSchedules ? (
                schedules.slice(0, 3).map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(schedule.date)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{schedule.startTime} - {schedule.endTime}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{schedule.role || "N/A"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{schedule.location || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
                    No schedules available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;