import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/Dashboard/Dashboard';
import LoanCards from './components/LoanCards/LoanCards';
import Inventory from './components/Inventory/Inventory';

function App() {
  return (
    <>
      <ToastContainer hideProgressBar='true' />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/loan-cards" element={<LoanCards />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
