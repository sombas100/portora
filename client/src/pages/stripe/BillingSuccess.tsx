import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const BillingSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <FaCheckCircle className="text-4xl text-emerald-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for upgrading your subscription! Your account has been
          updated.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default BillingSuccess;
