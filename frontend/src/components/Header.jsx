import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  return (
    <header>
      <nav>
        {user ? (
          <>
            <Link to="/products">Products</Link> >{' '}
            <Link to="/purchase-history">Purchases</Link> >{' '}
            <Link to="/sales-history">Sales</Link> >{' '}
            <Link to="/reports">Reports</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> > <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
