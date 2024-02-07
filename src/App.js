import "./App.css";
import { useSelector } from "react-redux";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const token = useSelector((state) => state.token);

  return (
    <Router>
      <div className="App">
        <Navbar token={token} />
        <Routes>
          <Route
            path="/"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard token={token} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
