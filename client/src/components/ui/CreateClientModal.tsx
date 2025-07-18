import { useState } from "react";
import { toast } from "react-toastify";
import client from "../../api/client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onClientCreated: () => void;
}

const CreateClientModal = ({ isOpen, onClose, onClientCreated }: Props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });
  const [loginUrl, setLoginUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { firstName, lastName, email, company } = formData;
    if (!firstName || !lastName || !email || !company) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await client.post("/clients/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Client created successfully");
      setLoginUrl(res.data.loginUrl);
      onClientCreated();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create client");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (loginUrl) {
      navigator.clipboard.writeText(loginUrl);
      toast.success("Login link copied to clipboard");
    }
  };

  const handleClose = () => {
    setFormData({ firstName: "", lastName: "", email: "", company: "" });
    setLoginUrl(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        {!loginUrl ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Create New Client</h2>
            <div className="space-y-3">
              <input
                name="firstName"
                placeholder="First Name"
                className="w-full border px-3 py-2 rounded"
                onChange={handleChange}
              />
              <input
                name="lastName"
                placeholder="Last Name"
                className="w-full border px-3 py-2 rounded"
                onChange={handleChange}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
                onChange={handleChange}
              />
              <input
                name="company"
                placeholder="Company"
                className="w-full border px-3 py-2 rounded"
                onChange={handleChange}
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Client"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">Client Login Link</h2>
            <p className="text-sm text-gray-600 mb-2">
              Share this link with your client so they can access their
              dashboard:
            </p>
            <div className="bg-gray-100 p-2 rounded text-sm break-all mb-3">
              {loginUrl}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Copy Link
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateClientModal;
