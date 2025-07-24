import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import client from ".././api/client";
import { useClientAuth } from ".././context/clientAuthContext";

const ClientLoginPage = () => {
  const [searchParams] = useSearchParams();
  const { login } = useClientAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");

    const authenticateClient = async () => {
      if (!token) {
        setError("Missing login token.");
        setLoading(false);
        return;
      }

      try {
        const res = await client.get(
          `/clients/login-from-token?token=${token}`
        );
        login(res.data.token);
        navigate("/client-dashboard");
      } catch (err: any) {
        setError(err.response?.data?.message || "Client login failed.");
      } finally {
        setLoading(false);
      }
    };

    authenticateClient();
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-xl rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-emerald-600">
          Client Login
        </h2>

        {loading && <p className="text-gray-500 text-center">Logging in...</p>}
        {!loading && error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {!loading && !error && (
          <p className="text-center text-emerald-500 font-medium">
            Login successful. Redirecting...
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientLoginPage;
