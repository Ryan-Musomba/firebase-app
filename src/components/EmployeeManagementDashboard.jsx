import React, { useState, useEffect } from "react";
import { 
  HomeIcon, UsersIcon, CalendarDaysIcon, ClockIcon,
  CreditCardIcon, BellIcon, ArrowLeftOnRectangleIcon 
} from "@heroicons/react/24/outline";
import SidebarItem from './SidebarItem';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Schedule from './Schedule';
import TimeTracking from './TimeTracking';
import Payroll from './Payroll';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { signOutUser } from "../firebase/auth";

const EmployeeManagementDashboard = ({ role }) => {
  const [activeView, setActiveView] = useState("dashboard");
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [payrollData, setPayrollData] = useState(null);

  const { user, setUser } = useAuth();

  const hardcodedSchedules = [
    { id: "1", date: "2025-04-07", startTime: "07:00", endTime: "15:00", role: "Delivery", location: "Main Location" },
    { id: "2", date: "2025-04-08", startTime: "07:00", endTime: "15:00", role: "Delivery", location: "Main Location" },
    { id: "3", date: "2025-04-09", startTime: "07:00", endTime: "15:00", role: "Delivery", location: "Main Location" },
    { id: "4", date: "2025-04-10", startTime: "12:00", endTime: "20:00", role: "Delivery", location: "Branch Office" },
    { id: "5", date: "2025-04-11", startTime: "09:00", endTime: "17:00", role: "Delivery", location: "Main Location" }
  ];

  const hardcodedPayrollData = {
    currentPay: "1,500.00",
    ytdEarnings: "45,000.00",
    tips: "200.00",
    weeklyHours: "40",
    payPeriod: "April 1 - April 15, 2025",
    nextPayDate: "April 20, 2025",
    payHistory: [
      { date: "March 20, 2025", amount: "1,450.00", hours: 40 },
      { date: "March 5, 2025", amount: "1,450.00", hours: 40 },
      { date: "February 20, 2025", amount: "1,400.00", hours: 38 }
    ]
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!user || !user.uid) {
        console.log("No authenticated user found, setting minimal data");
        setEmployeeData({
          name: "Guest User",
          email: "guest@example.com",
          position: "Guest",
          address: "Unknown",
          emergencyContacts: [{ name: "N/A", relationship: "N/A", phone: "N/A" }]
        });
        setSchedules(hardcodedSchedules);
        setPayrollData(hardcodedPayrollData);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "employees", user.uid);
        const docSnap = await getDoc(docRef);
        
        let fetchedEmployeeData;
        if (docSnap.exists()) {
          const data = docSnap.data();
          fetchedEmployeeData = {
            address: data.address || "USA",
            name: data.name || "Unknown User",
            email: data.email || user.email,
            phone: data.phone || "N/A",
            dob: data.dob || "N/A",
            position: data.position || "Employee",
            emergencyContacts: data.emergencyContacts || [
              {
                name: data.emergencyContactName || "N/A",
                relationship: data.emergencyContactRelationship || "N/A",
                phone: data.emergencyContactPhone || "N/A"
              }
            ],
            experience: data.experience || "0",
            availability: data.availability || "N/A",
            applicationDate: data.applicationDate || "N/A",
            status: data.status || "N/A"
          };
        } else {
          console.log("No employee data found in Firestore, using minimal data from auth");
          fetchedEmployeeData = {
            address: "USA",
            name: user.displayName || "Unknown User",
            email: user.email || "unknown@example.com",
            phone: "N/A",
            dob: "N/A",
            position: "Employee",
            emergencyContacts: [{ name: "N/A", relationship: "N/A", phone: "N/A" }],
            experience: "0",
            availability: "N/A",
            applicationDate: new Date().toISOString(),
            status: "N/A"
          };
        }
        
        setEmployeeData(fetchedEmployeeData);
        setSchedules(hardcodedSchedules.map(schedule => ({
          ...schedule,
          role: fetchedEmployeeData.position
        })));
        setPayrollData(hardcodedPayrollData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setEmployeeData({
          address: "USA",
          name: user?.displayName || "Error User",
          email: user?.email || "error@example.com",
          phone: "N/A",
          dob: "N/A",
          position: "Employee",
          emergencyContacts: [{ name: "N/A", relationship: "N/A", phone: "N/A" }],
          experience: "0",
          availability: "N/A",
          applicationDate: new Date().toISOString(),
          status: "N/A"
        });
        setSchedules(hardcodedSchedules);
        setPayrollData(hardcodedPayrollData);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [user]);

  const handleNavigation = (view, item) => {
    setActiveView(view);
    setActiveItem(item);
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      setUser(null);
      window.location.href = '/login';
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return dateString ? new Date(dateString).toLocaleDateString(undefined, options) : "N/A";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employee data...</p>
        </div>
      </div>
    );
  }

  if (!employeeData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500">Failed to load employee data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-lg p-4 flex flex-col">
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3 font-medium">
            {employeeData.name.split(' ').map(n => n[0]).join('') || 'U'}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{employeeData.name || "Unknown User"}</p>
            <p className="text-xs text-gray-500">{employeeData.position || "Employee"}</p>
          </div>
        </div>
        <nav className="space-y-1 flex-1">
          <SidebarItem 
            icon={<HomeIcon />} 
            text="Dashboard" 
            active={activeItem === "Dashboard"} 
            onClick={() => handleNavigation("dashboard", "Dashboard")} 
          />
          <SidebarItem 
            icon={<UsersIcon />} 
            text="Profile" 
            active={activeItem === "Profile"} 
            onClick={() => handleNavigation("profile", "Profile")} 
          />
          <SidebarItem 
            icon={<CalendarDaysIcon />} 
            text="Schedule" 
            active={activeItem === "Schedule"} 
            onClick={() => handleNavigation("schedule", "Schedule")} 
          />
          <SidebarItem 
            icon={<ClockIcon />} 
            text="Time Tracking" 
            active={activeItem === "Time Tracking"} 
            onClick={() => handleNavigation("time", "Time Tracking")} 
          />
          <SidebarItem 
            icon={<CreditCardIcon />} 
            text="Payroll" 
            active={activeItem === "Payroll"} 
            onClick={() => handleNavigation("payroll", "Payroll")} 
          />
        </nav>
        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center p-3 rounded-lg text-red-600 hover:bg-red-100 cursor-pointer transition-colors duration-200"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">{activeItem}</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <BellIcon className="h-5 w-5 text-gray-600" />
              </button>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {(employeeData.name || "U").split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {activeView === "dashboard" && (
            <Dashboard 
              schedules={schedules} 
              payrollData={payrollData} 
              formatDate={formatDate} 
            />
          )}

          {activeView === "profile" && (
            <Profile employeeData={employeeData} />
          )}

          {activeView === "schedule" && (
            <Schedule schedules={schedules} formatDate={formatDate} />
          )}

          {activeView === "time" && (
            <TimeTracking />
          )}

          {activeView === "payroll" && (
            <Payroll payrollData={payrollData} />
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeeManagementDashboard;