import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./Features/Navbar";
import Home from "./Features/Home";
import Menus from "./Features/Menus";
import Cart from "./Features/Cart";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import CalendarComponent from "./Features/Calendar";
import EmployeeManagementDashboard from "./components/EmployeeManagementDashboard";
import WizardForm from "./Wizard2/WizardForm";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (meal) => setCart([...cart, meal]);
  const removeFromCart = (idMeal) =>
    setCart(cart.filter((meal) => meal.idMeal !== idMeal));
  const clearCart = () => setCart([]);

  return (
    <AuthProvider>
      <Router>
        <Navbar cartCount={cart.length} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/menus" element={<Menus addToCart={addToCart} />} />
          <Route path="/apply" element={<WizardForm />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            }
          />
          <Route path="/calendar" element={<CalendarComponent />} />

          {/* Private Routes */}
          <Route
            path="/customer-dashboard"
            element={
              <PrivateRoute>
                <Dashboard role="customer" />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <Dashboard role="admin" />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoute>
                <EmployeeManagementDashboard role="staff" />
              </PrivateRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;