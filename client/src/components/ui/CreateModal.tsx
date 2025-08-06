import { useState } from "react";
import client from "../../api/client";
import type { FC } from "react";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  clientId: number | null;
  onProjectCreated: () => void;
}

const CreateProjectModal: FC<Props> = ({
  isOpen,
  onClose,
  clientId,
  onProjectCreated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;

    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("freelancerToken");
      await client.post(
        "/projects/create",
        {
          title,
          description,
          status,
          dueDate: dueDate || null,
          clientId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Project successfully created!");
      setTitle("");
      setDescription("");
      setStatus("Pending");
      setDueDate("");
      onProjectCreated();
      onClose();
    } catch (err: any) {
      console.error("Error creating project:", err);
      setError(err.response?.data?.message || "Failed to create project.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Create New Project
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-emerald-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-emerald-500"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              className="w-full border cursor-pointer rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-emerald-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date (optional)
            </label>
            <input
              type="date"
              className="w-full border rounded cursor-pointer px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-emerald-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded cursor-pointer text-gray-600 hover:bg-gray-100"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 cursor-pointer text-white rounded hover:bg-emerald-600 transition"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
