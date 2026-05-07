import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Package } from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/orders/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-b pb-4">Your Orders</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white p-8 text-center rounded shadow">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl">You haven't placed any orders yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded shadow-sm mb-6 overflow-hidden border">
              {/* Order Header */}
              <div className="bg-gray-50 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs uppercase text-gray-600 border-b">
                <div>
                  <p>Order Placed</p>
                  <p className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p>Total</p>
                  <p className="font-bold">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p>Ship To</p>
                  <p className="font-bold text-blue-500 hover:underline cursor-pointer">{user?.name}</p>
                </div>
                <div className="text-right">
                  <p>Order # {order._id.slice(-8)}</p>
                  <span className={`px-2 py-1 rounded text-white text-[10px] ${
                    order.status === 'delivered' ? 'bg-green-500' : 'bg-orange-500'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 mb-4 items-center">
                    <img 
                      src={item.product?.imageUrl} 
                      alt="" 
                      className="w-20 h-20 object-contain border p-2" 
                    />
                    <div className="flex-grow">
                      <p className="text-[#007185] font-bold text-sm hover:underline cursor-pointer">
                        {item.product?.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-orange-700">${item.price}</p>
                    </div>
                    <button className="hidden md:block bg-amazon_yellow hover:bg-amazon_orange px-4 py-1 rounded text-xs font-medium border border-yellow-500">
                      Buy it again
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;