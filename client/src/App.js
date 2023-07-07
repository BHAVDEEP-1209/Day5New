
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login"
import Register from "./pages/Register"
import Homepage from "./pages/Homepage"
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
