import { useState } from "react";
import { toast } from "react-toastify";
import client from "../../api/client";
import {
  HiUser,
  HiMail,
  HiOfficeBuilding,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

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

  const validateForm = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("freelancerToken");
      const res = await client.post("/clients/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLoginUrl(res.data.loginUrl);
      toast.success("Client created successfully");
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
    onClientCreated();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end bg-black/40"
          initial={{ x: "40%" }}
          animate={{ x: 0 }}
          exit={{ x: "60%" }}
        >
          <div className="bg-white w-full max-w-md p-6 shadow-lg h-full overflow-y-auto">
            {!loginUrl ? (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Create New Client
                </h2>
                <div className="space-y-4">
                  <div className="relative">
                    <HiOutlineUserCircle className="absolute top-3 left-3 text-gray-400" />
                    <input
                      name="firstName"
                      placeholder="First Name"
                      className="w-full pl-10 border px-3 py-2 rounded focus:outline-indigo-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative">
                    <HiUser className="absolute top-3 left-3 text-gray-400" />
                    <input
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full pl-10 border px-3 py-2 rounded focus:outline-indigo-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative">
                    <HiMail className="absolute top-3 left-3 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="w-full pl-10 border px-3 py-2 rounded focus:outline-indigo-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative">
                    <HiOfficeBuilding className="absolute top-3 left-3 text-gray-400" />
                    <input
                      name="company"
                      placeholder="Company"
                      className="w-full pl-10 border px-3 py-2 rounded focus:outline-indigo-500"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 bg-gray-100 cursor-pointer text-gray-700 rounded hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4 py-2 bg-emerald-600 cursor-pointer text-white rounded hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create Client"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Client Login Link
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  Share this link with your client:
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm break-all mb-4">
                  {loginUrl}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateClientModal;
