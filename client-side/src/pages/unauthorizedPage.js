import React from 'react';
import { Link } from 'react-router-dom';


const UnauthorizedPage = () => {
  return (
    <section className='error-page'>
      <div className='error-container'>
        <h1>401</h1>
        <h4>Unauthorized to access this page</h4>
        <Link to='/' className='btnn'>
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default UnauthorizedPage;
// export default UnauthorizedPage;