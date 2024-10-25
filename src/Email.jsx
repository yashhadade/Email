import React from 'react';
import useCustomReactQuery from './getApi';

function Email() {
  const { product, loading } = useCustomReactQuery('https://flipkart-email-mock.now.sh/');

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      {product.map((email) => (
        <div key={email.id} className='EmailBlock'>
          <div className="circle">Y</div>
          <div className='EmailDetail'>
            <p>From: <b>{email.from.name}</b> &lt;{email.from.email}&gt;</p> {/* Corrected the variable usage */}
            <p>Subject: <b>{email.subject}</b></p>
            <p>{email.date}</p>
            <p>{email.short_description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Email;
