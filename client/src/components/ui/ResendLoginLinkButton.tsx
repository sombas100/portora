import { useState } from "react";
import client from "../../api/client";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

interface ResendLoginLinkButtonProps {
  clientId: number;
  className?: string;
}

const ResendLoginLinkButton = ({
  clientId,
  className,
}: ResendLoginLinkButtonProps) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await client.post(
        `/clients/${clientId}/resend-login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Login link sent to ${res.data.fullName}`);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to resend login link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleResend}
      disabled={loading}
      className={`px-3 py-1 text-sm rounded cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 ${className}`}
    >
      {loading ? "Sending..." : "Resend Login Link"}
    </button>
  );
};

export default ResendLoginLinkButton;
