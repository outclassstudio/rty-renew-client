import { Routes, Route } from "react-router-dom";
import Shop from "../pages/Shop";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return (
    <Routes>
      <Route path="/sent" element={<Shop />} />
    </Routes>
  );
}
