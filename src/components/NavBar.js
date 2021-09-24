import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary mb-3">
        <div className="container">
          <Link className="link" to="/"><h1 className="navbar-brand">Home</h1></Link>
          <Link className="link" to="/schools"><h1 className="navbar-brand">Universities</h1></Link>
        </div>
      </nav>
    </div>
  );
}
