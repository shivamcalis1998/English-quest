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
import CreateBooks from "./components/create books/CreateBooks";

function App() {
  const token = useSelector((state) => state.token);

  return (
    <Router>
      <div className="App">
        <Navbar token={token} />
        <Routes>
          <Route
            path="/"
            element={
              token ? <Dashboard token={token} /> : <Navigate to="/login" />
            }
          />
          {token && (
            <Route path="/dashboard" element={<Dashboard token={token} />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/createbooks" element={<CreateBooks token={token} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
