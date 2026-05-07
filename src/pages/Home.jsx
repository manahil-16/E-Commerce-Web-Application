import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Hook to get the search query from the URL (?search=...)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search') || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Updated API call to include search parameter
        const { data } = await axios.get(`http://localhost:5000/api/products?search=${searchTerm}`);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]); // Re-run whenever the search term in the URL changes

  return (
    <div className="bg-[#eaeded] min-h-screen">
      {/* Banner */}
      <div className="relative max-w-[1500px] mx-auto">
        <div className="banner-mask relative">
          <img 
            src="https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg" 
            className="w-full h-[250px] md:h-[600px] object-cover" 
            alt="hero" 
          />
        </div>

        {/* Product Grid - Overlapping the banner */}
        <div className="px-6 pb-10 -mt-20 md:-mt-60 lg:-mt-80 relative z-30">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amazon_blue"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.length > 0 ? (
                products.map((p) => <ProductCard key={p._id} product={p} />)
              ) : (
                <div className="col-span-full bg-white p-10 text-center rounded shadow">
                  <h3 className="text-xl font-bold">No products found matching "{searchTerm}"</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;