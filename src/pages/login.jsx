import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: email,
        password: password,
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token);

      alert(`Login successful! Welcome ${user.username}`);
      // navigate('/');

    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('Login failed. Please try again.');
      }
    }
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Left side - Login Form */}
      <div className="w-[50%] flex-1 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h1 className="text-white text-3xl font-light mb-3">Welcome back!</h1>
            <p className="text-gray-400 text-sm">Enter your Credentials to access your account</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm mb-2">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white text-sm">Password</label>
                <button type="button" className="text-gray-400 text-sm hover:text-white transition-colors">
                  forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-orange-500 bg-transparent border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
              />
              <label htmlFor="remember" className="ml-2 text-gray-400 text-sm">
                Remember for 30 days
              </label>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-[#f39c12] hover:bg-[#f39d12d5] text-white font-medium py-3 rounded-xl transition-colors"
            >
              Login
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <button className="text-white hover:underline">Sign Up</button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Interior Design Scene */}
      <div className='w-[50%] flex-1 relative'>
        <img src="/login.jpg" alt="Login Illustration" className='w-full h-full object-cover rounded-tl-[40px] rounded-bl-[40px]' />
      </div>
    </div>
  );
}