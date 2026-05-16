import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Priority from "./pages/Priority";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/priority" element={<Priority />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;