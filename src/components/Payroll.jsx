import React from "react";
import {
  CreditCardIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ReceiptRefundIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import Card from "./Card";

function Payroll({ payrollData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <CreditCardIcon className="h-5 w-5 mr-2 text-blue-500" /> Payroll
          Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card
            title="Current Pay Period"
            value={`$${payrollData.currentPay}`}
            icon={<CurrencyDollarIcon />}
          />
          <Card
            title="YTD Earnings"
            value={`$${payrollData.ytdEarnings}`}
            icon={<ChartBarIcon />}
          />
          <Card
            title="Tips"
            value={`$${payrollData.tips}`}
            icon={<ReceiptRefundIcon />}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            title="Pay Period"
            value={payrollData.payPeriod}
            className="bg-blue-50 border-blue-100"
          />
          <Card
            title="Next Pay Date"
            value={payrollData.nextPayDate}
            className="bg-green-50 border-green-100"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <CalendarDaysIcon className="h-5 w-5 mr-2 text-blue-500" /> Pay
          History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Pay Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Hours
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payrollData.payHistory.map((pay, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">{pay.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">${pay.amount}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {pay.hours} hrs
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payroll;
