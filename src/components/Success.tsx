import React from 'react';
import Confetti from 'react-confetti';

const Success: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-500 text-white">
      {/* Confetti Effect */}
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={200}
        recycle={false}
        gravity={0.1}
      />

      <div className="max-w-md bg-white p-8 rounded-md shadow-md text-center">
        <h2 className="text-3xl font-semibold mb-4">Payment Successful!</h2>
        <p className="text-lg mb-6">Thank you for your purchase. Your payment was successful.</p>
        
        {/* Additional information or buttons can be added here */}
      </div>
    </div>
  );
};

export default Success;
