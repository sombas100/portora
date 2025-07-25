import { useState } from "react";
import client from "../../api/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CancelSubscriptionPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCancel = async () => {
    try {
      setLoading(true);
      const res = await client.post(
        "/stripe/cancel-subscription",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message || "Subscription canceled successfully");
      navigate("/");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to cancel subscription"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-red-600">
          Cancel Subscription?
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to cancel your current subscription? You’ll lose
          access to premium features at the end of your billing cycle.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-50 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Keep Subscription
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? "Cancelling..." : "Cancel Subscription"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscriptionPage;
