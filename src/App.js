// Import necessary dependencies
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Navbar from './components/Navbar';
import { ShopContextProvider } from './context/Context';

// Wrap your entire application with the Router component
function App() {
  return (
        <div className="App">
                <ShopContextProvider>
                        <Router>
                                <Navbar />
                                <Routes>
                                        <Route  path="/" element={<Home />} />
                                        <Route path="/cart" element={<Cart />} />
                                </Routes> 
                        </Router>
                </ShopContextProvider>
                
        </div>
    
  );
}

export default App;

