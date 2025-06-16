import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'invoice-generator-app.github.io/client/src/pages/authContext';
import PrivateRoute from 'invoice-generator-app.github.io/client/src/components/PrivateRoute';
import Login from 'invoice-generator-app.github.io/client/src/pages/Login';
import Register from 'invoice-generator-app.github.io/client/src/pages/Register';
import Dashboard from 'invoice-generator-app.github.io/client/src/pages/Dashboard';
import CreateInvoice from 'invoice-generator-app.github.io/client/src/pages/CreateInvoice';
import Invoice from 'invoice-generator-app.github.io/client/src/pages/Invoice';
import Navbar from 'invoice-generator-app.github.io/client/src/components/Navbar';

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
