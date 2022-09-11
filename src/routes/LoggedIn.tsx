import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Space from "../pages/Space";
import Userinfo from "../pages/Userinfo";
import Send from "../pages/Send";
import GiftList from "../pages/GiftList";
import Visit from "../pages/Visit";
import Find from "../pages/Find";
import Shop from "../pages/Shop";
import NotFound from "../pages/NotFound";

export default function LoggedIn() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Space />} />
        <Route path="/userinfo" element={<Userinfo />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/send" element={<Send />} />
        <Route path="/giftlist" element={<GiftList />} />
        <Route path="/visit/:id" element={<Visit />} />
        <Route path="/find" element={<Find />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
