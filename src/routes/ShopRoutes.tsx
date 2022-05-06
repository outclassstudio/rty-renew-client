import { Routes, Route } from "react-router-dom";
import Buy from "../components/Buy";
import Shop from "../pages/Shop";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/my" element={<Buy />} />
    </Routes>
  );
}
