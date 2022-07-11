import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import { useAppContext } from "./AppProvider";

function App() {
  const { user } = useAppContext();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user.email ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user.email ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/account"
          element={!user.email ? <Navigate to="/login" /> : <Account />}
        />
      </Routes>
    </>
  );
}

export default App;
