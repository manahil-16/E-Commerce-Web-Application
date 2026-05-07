import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="p-10">Loading product...</div>;

  return (
    <div className="max-w-6xl mx-auto p-10 flex flex-col md:row gap-10 bg-white mt-10 shadow-lg rounded-lg">
      <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 object-contain h-96" />
      <div className="flex-grow">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 text-lg mb-6">{product.description}</p>
        <p className="text-3xl font-bold text-gray-900 mb-6">${product.price}</p>
        <button 
          onClick={() => addToCart(product)}
          className="bg-yellow-400 px-8 py-3 rounded-full font-bold hover:bg-yellow-500 shadow-md transform active:scale-95 transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;