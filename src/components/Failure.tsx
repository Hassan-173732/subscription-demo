import React from 'react';

const Failure: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-500 text-white">
      <div className="max-w-md bg-white p-8 rounded-md shadow-md text-center">
        <h2 className="text-3xl font-semibold mb-4">Payment Failed</h2>
        <p className="text-lg mb-6">Unfortunately, your payment was not successful or has been cancelled.</p>

        {/* Big Cross Icon */}
        <div className="text-6xl mb-6">&#10006;</div>

        {/* Additional information or buttons can be added here */}
      </div>
    </div>
  );
};

export default Failure;