import { Routes, Route } from "react-router-dom";
import Buy from "../components/Buy";
import Shop from "../pages/Shop";

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/my" element={<Buy />} />
    </Routes>
  );
}
