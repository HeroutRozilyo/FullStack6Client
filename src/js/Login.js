import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css'; // import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add a state variable to track loading state
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Show loading indicator
      setLoading(true);

      const response = await fetch(`http://localhost:3001/api/users?username=${username}`);

      if (!response.ok) {
        // Handle network errors
        throw new Error('Network error');
      }

      const users = await response.json();
      const user = users[0];
      console.log(user)

      const res = await fetch(`http://localhost:3001/api/passwords/${user.username}`);
      const pswrd = await res.json();

      if (user && password === pswrd.password) {
        localStorage.setItem('user', JSON.stringify(user));
        history(`/users/${user && user.username}`);
      } else {
        // Handle API errors
        throw new Error('Invalid login credentials');
      }
    } catch (error) {
      // Show error message to user
      alert(`Error: ${error.message}`);
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
  };
  
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <div className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div >
        <button type="submit">{loading ? 'Loading...' : 'Login'}</button> {/* Update button text based on loading state */}
      </form>
     
    </div>
  );
}

export default Login;