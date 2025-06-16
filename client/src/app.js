import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '/client/src/pages/authContext';
import PrivateRoute from '/client/src/components/PrivateRoute';
import Login from '/client/src/pages/Login';
import Register from '/client/src/pages/Register';
import Dashboard from '/client/src/pages/Dashboard';
import CreateInvoice from '/client/src/pages/CreateInvoice';
import Invoice from '/client/src/pages/Invoice';
import Navbar from '/client/src/components/Navbar';

function App() {
return (
<AuthProvider>
<Router>
<Navbar />

<Routes>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route element={<PrivateRoute />}>
<Route path="/" element={<Dashboard />} />
<Route path="/create" element={<CreateInvoice />} />
<Route path="/invoice/:id" element={<Invoice />} />

   </Route>
  </Routes>
 </Router>

</AuthProvider>

);

}
export default App;
