import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Package } from 'lucide-react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', description: '', imageUrl: '' });

  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/api/products');
    setProducts(data);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchProducts(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/products', newProduct, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setShowAddForm(false);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded shadow-sm border-l-4 border-yellow-500">
          <h1 className="text-3xl font-bold flex items-center gap-2"><Package /> Inventory Control</h1>
          <button onClick={() => setShowAddForm(!showAddForm)} className="bg-yellow-400 px-4 py-2 rounded font-bold hover:bg-yellow-500">
            {showAddForm ? "Close" : "Add Product"}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAdd} className="bg-white p-6 rounded shadow-md mb-8 grid grid-cols-2 gap-4">
            <input type="text" placeholder="Name" className="p-2 border rounded" onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
            <input type="number" placeholder="Price" className="p-2 border rounded" onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
            <input type="text" placeholder="Category" className="p-2 border rounded" onChange={e => setNewProduct({...newProduct, category: e.target.value})} required />
            <input type="text" placeholder="Image URL" className="p-2 border rounded" onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} required />
            <button className="col-span-2 bg-blue-600 text-white py-2 rounded font-bold">Save Product</button>
          </form>
        )}

        <div className="bg-white rounded shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr><th className="p-4">Image</th><th className="p-4">Product</th><th className="p-4">Price</th><th className="p-4">Action</th></tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} className="border-b">
                  <td className="p-4"><img src={p.imageUrl} className="w-12 h-12 object-contain" /></td>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 font-bold text-blue-800">${p.price}</td>
                  <td className="p-4"><button onClick={() => handleDelete(p._id)} className="text-red-500"><Trash2 /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;