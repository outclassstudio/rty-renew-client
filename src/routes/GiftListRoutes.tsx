import { Routes, Route } from "react-router-dom";
import Buy from "../components/Buy";
import Shop from "../pages/Shop";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return (
    <Routes>
      <Route path="/sent" element={<Shop />} />
      <Route path="/received" element={<Buy />} />
    </Routes>
  );
}
