import React, { useRef } from 'react'
import logo from "../../assets/SANKOLogo-02.png";
import useAuthService from '../../services/auth-service';

const Login = () => {

  const {login} = useAuthService();
  const usernameRef = useRef();
  const passwordRef = useRef();


  const handleLogin = (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller

    // Referanslardan değerleri al
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const payload = {
      username: username,
      password: password,
    }

    console.log("Username:", username);
    console.log("Password:", password);

    // Burada API çağrısı veya doğrulama işlemini gerçekleştirebilirsiniz
    login(payload)
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className='flex justify-center'> 
          <img src={logo} className='w-48' alt='sanko-logo'/>
      </div>
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Sanko Panel</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your username"
          />
        </div>
        
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>
        
        <div className='flex justify-center py-5'>
          <button
            type="submit"
            className="w-72 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Login
          </button>
        </div>
      </form>
    </div>
</div>
  )
}

export default Login
