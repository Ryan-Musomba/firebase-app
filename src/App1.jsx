// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import LoginPage from './components/LoginPage';
// import SignUpPage from './components/SignUpPage';
// import Dashboard from './components/Dashboard';
// import PrivateRoute from './components/PrivateRoute';

// const App = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/customer-dashboard" element={
//             <PrivateRoute>
//               <Dashboard role="customer" />
//             </PrivateRoute>
//           } />
//           <Route path="/staff-dashboard" element={
//             <PrivateRoute>
//               <Dashboard role="staff" />
//             </PrivateRoute>
//           } />
//           <Route path="/admin-dashboard" element={
//             <PrivateRoute>
//               <Dashboard role="admin" />
//             </PrivateRoute>
//           } />
//           <Route path="/" element={<LoginPage />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;