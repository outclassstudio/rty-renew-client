import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Space from "./pages/Space";
import Signup from "./pages/Signup";
import Userinfo from "./pages/Userinfo";
import Send from "./pages/Send";
import ShopRoutes from "./routes/ShopRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/space" element={<Space />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userinfo" element={<Userinfo />} />
        <Route path="/shop/*" element={<ShopRoutes />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </Router>
  );
}

export default App;
