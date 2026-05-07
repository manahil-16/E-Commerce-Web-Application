import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(data.user, data.token);
      navigate('/');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Invalid Credentials. Please check your email/password or Register first.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh] bg-white md:bg-gray-100">
      <div className="mb-6">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" width={100} alt="logo" />
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 border border-gray-300">
        <h2 className="text-3xl font-normal mb-6">Sign-In</h2>
        
        <label className="block mb-1 font-bold text-sm">Email</label>
        <input 
          type="email" 
          className="w-full p-2 border border-gray-400 rounded mb-4 outline-none focus:ring-1 ring-orange-400" 
          onChange={(e)=>setEmail(e.target.value)} 
          required 
        />
        
        <label className="block mb-1 font-bold text-sm">Password</label>
        <input 
          type="password" 
          className="w-full p-2 border border-gray-400 rounded mb-6 outline-none focus:ring-1 ring-orange-400" 
          onChange={(e)=>setPassword(e.target.value)} 
          required 
        />
        
        <button className="w-full bg-amazon_yellow py-2 rounded shadow hover:bg-yellow-500 font-bold border border-yellow-600">
          Continue
        </button>

        <p className="text-xs mt-6 leading-tight">
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
      </form>

      <div className="w-96 mt-6">
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs">New to Amazon?</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <Link to="/register" className="w-full block text-center bg-gray-100 py-1 rounded shadow-sm border border-gray-300 text-sm hover:bg-gray-200">
          Create your Amazon account
        </Link>
      </div>
    </div>
  );
};

export default Login;