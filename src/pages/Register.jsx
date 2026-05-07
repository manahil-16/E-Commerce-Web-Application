import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert("Registration Successful! Please login.");
      navigate('/login');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded border border-gray-300 w-96 shadow-md">
        <h2 className="text-3xl font-semibold mb-6">Create Account</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold">Your name</label>
            <input type="text" className="w-full border p-2 rounded focus:ring-1 ring-orange-500 outline-none" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-bold">Email</label>
            <input type="email" className="w-full border p-2 rounded focus:ring-1 ring-orange-500 outline-none" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-bold">Password</label>
            <input type="password" placeholder="At least 6 characters" className="w-full border p-2 rounded focus:ring-1 ring-orange-500 outline-none" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>
          <button className="w-full bg-yellow-400 py-2 rounded shadow hover:bg-yellow-500 font-bold mt-2">Create your Amazon account</button>
        </div>
        <p className="text-xs mt-6 border-t pt-4">Already have an account? <Link to="/login" className="text-blue-700 hover:underline">Sign in</Link></p>
      </form>
    </div>
  );
};

export default Register;