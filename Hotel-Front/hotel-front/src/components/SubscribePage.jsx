
import React from 'react';
import SubscribeButton from './SubscribeButton';


const SubscribePage = () => {
  return (
    <div className="container py-5 text-center">
      <h2 className="text-primary mb-3">🚫 Free Limit Reached</h2>
      <p className="lead">
        You've saved 5 notes. Upgrade to premium to create unlimited notes.
      </p>
      <SubscribeButton />
    </div>
  );
};

export default SubscribePage;
