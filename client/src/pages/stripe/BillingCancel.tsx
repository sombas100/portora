import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const BillingCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <FaTimesCircle className="text-4xl text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Checkout Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          It looks like you cancelled the payment. No changes were made to your
          subscription.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default BillingCancelled;
