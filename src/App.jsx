import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import Events from "./pages/Events";
import "./index.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
