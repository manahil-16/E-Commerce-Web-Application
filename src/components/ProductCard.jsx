import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white p-5 flex flex-col shadow-md rounded-sm border border-gray-100 z-30 relative hover:shadow-lg transition-shadow">
      <p className="absolute top-2 right-2 text-gray-400 text-[10px] uppercase font-bold">{product.category}</p>
      <h2 className="text-[17px] font-bold mb-1 h-12 overflow-hidden">{product.name}</h2>
      <div className="flex justify-center items-center h-48 my-3">
        <img src={product.imageUrl} className="max-h-full max-w-full object-contain" alt={product.name} />
      </div>

      <div className="mt-auto">
        <p className="text-xl font-bold mb-3">${product.price}</p>
        
        {user?.role === 'admin' ? (
          <Link to="/admin" className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium">
            Manage Inventory
          </Link>
        ) : (
          <button 
            onClick={() => {
              addToCart(product);
              alert("Added to Cart!");
            }}
            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-lg text-sm border border-[#fcd200] font-medium shadow-sm active:scale-95 transition-all"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
export default ProductCard;