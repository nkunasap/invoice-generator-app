import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/authContext';

import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';

import Register from './pages/Register';

import Dashboard from './pages/Dashboard';

import CreateInvoice from './pages/CreateInvoice';

import Invoice from './pages/Invoice';

import Navbar from './components/Navbar';

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