import React from 'react';

const SubscriptionPage: React.FC = () => {
  const handleSignOut = () => {
    // Implement your signout logic here
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-3xl bg-white p-8 rounded-md shadow-md">
        <div className="flex space-x-8 mb-6">
          <div className="flex-1 border border-gray-300 rounded-md p-6">
            <h2 className="text-3xl font-semibold mb-4">Monthly Plan</h2>
            <p className="text-lg mb-4">Get premium access for a month and enjoy these features:</p>
            <ul className="list-disc pl-6">
              <li>Unlimited access to all content</li>
              <li>Exclusive features and updates</li>
              <li>Priority customer support</li>
              <li>Special discounts on premium events</li>
            </ul>
            <button className="w-full bg-blue-700 text-white p-3 rounded-md mt-6 hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-300">
              Subscribe Monthly
            </button>
          </div>

          <div className="flex-1 border border-gray-300 rounded-md p-6">
            <h2 className="text-3xl font-semibold mb-4">Yearly Plan</h2>
            <p className="text-lg mb-4">Save 17% with our yearly plan and enjoy these enhanced features:</p>
            <ul className="list-disc pl-6">
              <li>Unlimited access to all content</li>
              <li>Exclusive features and updates</li>
              <li>Priority customer support</li>
              <li>Special discounts on premium events</li>
            </ul>
            <button className="w-full bg-blue-800 text-white p-3 rounded-md mt-6 hover:bg-blue-900 focus:outline-none focus:ring focus:border-blue-300">
              Subscribe Yearly
            </button>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          className="w-full bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
