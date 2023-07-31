import React from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
  return (
    <section className='error-page'>
      <div className='error-container'>
        <h1>404</h1>
        <h4>page not found</h4>
        <Link to='/' className='btnn'>
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage