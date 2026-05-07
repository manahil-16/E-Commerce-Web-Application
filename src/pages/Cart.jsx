import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-gray-100 flex flex-col md:flex-row p-5 max-w-[1500px] mx-auto">
      <div className="flex-grow m-5 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold border-b pb-4 mb-4">Your Shopping Basket</h1>
        {cart.map((item, index) => (
          <div key={index} className="flex border-b py-5 items-center">
            <img src={item.imageUrl} className="h-40 w-40 object-contain" alt="" />
            <div className="ml-5 flex-grow">
              <p className="font-bold text-lg">{item.name}</p>
              <p className="text-green-600 font-bold">${item.price}</p>
              <button onClick={() => removeFromCart(item._id)} className="text-blue-500 hover:underline mt-2">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-10 shadow-sm flex flex-col w-full md:w-80 h-fit">
        <h2 className="whitespace-nowrap font-bold">Subtotal ({cart.length} items): ${total.toFixed(2)}</h2>
        <button className="bg-yellow-400 rounded-sm w-full py-2 mt-4 hover:bg-yellow-500 border border-yellow-500">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;