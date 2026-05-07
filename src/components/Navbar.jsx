import { ShoppingCart, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const cartCount = cart.reduce((qty, item) => qty + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchInput}`);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#131921] flex items-center p-1 py-2 flex-grow space-x-4 px-4 text-white">
        <Link to="/" className="mt-2 flex items-center hover:outline outline-1 p-1">
          <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" width={95} alt="amazon" />
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center h-10 rounded-md flex-grow bg-[#febd69] hover:bg-[#f3a847]">
          <input 
            className="p-2 h-full flex-grow rounded-l-md outline-none px-4 text-black text-sm" 
            type="text" 
            placeholder="Search Amazon"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="p-3"><Search className="text-black" size={20} /></button>
        </form>

        <div className="flex items-center text-xs space-x-6 mx-6 whitespace-nowrap font-bold">
          {/* AUTH SECTION */}
          <div className="hover:outline outline-1 p-2 cursor-pointer">
            {user ? (
              <div onClick={logout}>
                <p className="font-normal text-gray-400">Hello, {user.name}</p>
                <p className="md:text-sm text-white">Sign Out</p>
              </div>
            ) : (
              <Link to="/login">
                <p className="font-normal text-gray-400">Hello, sign in</p>
                <p className="md:text-sm text-white">Account & Lists</p>
              </Link>
            )}
          </div>

          {/* DUAL VIEW LOGIC */}
          {user?.role === 'admin' ? (
            <Link to="/admin" className="hover:outline outline-1 p-2 border border-yellow-500 rounded">
              <p className="text-yellow-500">Admin</p>
              <p className="md:text-sm text-white">Dashboard</p>
            </Link>
          ) : (
            <>
              <Link to="/orders" className="hover:outline outline-1 p-2">
                <p className="font-normal text-gray-400">Returns</p>
                <p className="md:text-sm text-white">& Orders</p>
              </Link>

              <Link to="/cart" className="relative flex items-center hover:outline outline-1 p-2">
                <span className="absolute top-1 left-5 bg-[#131921] text-[#febd69] rounded-full h-4 w-5 flex items-center justify-center font-bold">{cartCount}</span>
                <ShoppingCart size={34} />
                <p className="hidden md:inline mt-3 ml-1 text-white">Cart</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;