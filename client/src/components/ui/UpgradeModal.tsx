import { useState } from "react";
import client from "../../api/client";
import { toast } from "react-toastify";
import { FaRocket, FaGem, FaCrown, FaLeaf } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    label: "Free",
    value: "free",
    icon: <FaLeaf className="text-green-500 text-2xl" />,
    description: "Basic features — 1 client only",
  },
  {
    label: "Starter",
    value: "starter",
    icon: <FaRocket className="text-indigo-500 text-2xl" />,
    description: "Get started — up to 3 clients",
  },
  {
    label: "Pro",
    value: "pro",
    icon: <FaGem className="text-purple-500 text-2xl" />,
    description: "Advanced tools — up to 5 clients",
  },
  {
    label: "Enterprise",
    value: "enterprise",
    icon: <FaCrown className="text-yellow-500 text-2xl" />,
    description: "Full power — up to 10 clients",
  },
];

const UpgradeModal = ({ isOpen, onClose }: Props) => {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      if (selectedPlan === "free") {
        const confirmed = window.confirm(
          "Are you sure you want to switch to the Free plan?\nYou will lose access to premium features."
        );
        if (!confirmed) {
          setLoading(false);
          return;
        }

        await client.post(
          "/billing/downgrade",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Successfully switched to Free Plan");
        window.location.reload();
        return;
      }

      const res = await client.post(
        "/stripe/create-checkout-session",
        { plan: selectedPlan },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      window.location.href = res.data.url;
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] max-w-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Choose Your Plan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {plans.map((plan) => (
            <div
              key={plan.value}
              onClick={() => setSelectedPlan(plan.value)}
              className={`cursor-pointer border rounded-md p-4 text-center transition transform hover:scale-105 ${
                selectedPlan === plan.value
                  ? "border-indigo-600 ring-2 ring-indigo-300 bg-indigo-50"
                  : "border-gray-300"
              }`}
            >
              <div className="mb-2">{plan.icon}</div>
              <h3 className="font-semibold text-gray-700">{plan.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleCheckout}
            className="px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : selectedPlan === "free"
              ? "Switch to Free"
              : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
