import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/authContext";
import type { Project, Feedback } from "../interfaces";
import { format } from "date-fns";
import { toast } from "react-toastify";
import FileUpload from "../components/ui/FileUpload";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<any[]>([]);

  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [editStatus, setEditStatus] = useState<string>("");
  const [editDueDate, setEditDueDate] = useState<string>("");
  const [updating, setUpdating] = useState(false);

  const fetchFiles = async () => {
    try {
      const res = await client.get(`/files/project/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(res.data);
    } catch (err) {
      console.error("Failed to fetch files:", err);
    }
  };

  useEffect(() => {
    if (!id || !token) return;
    const fetchProject = async () => {
      try {
        const res = await client.get(`/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProject(res.data);
        setEditStatus(res.data.status);
        setEditDueDate(res.data.dueDate?.split("T")[0] || "");
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFeedback = async () => {
      try {
        const res = await client.get(`/feedback/projects/${id}/feedback`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbackList(res.data);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    };

    fetchProject();
    fetchFeedback();
    fetchFiles();
  }, [id, token]);

  const handleStatusUpdate = async () => {
    if (!editStatus || !project) return;

    try {
      setUpdating(true);
      const res = await client.put(
        `/projects/${project.id}`,
        { status: editStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProject((prev) =>
        prev ? { ...prev, status: res.data.status } : prev
      );
      toast.success("Project status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDueDateUpdate = async () => {
    if (!editDueDate || !project) return;

    try {
      const res = await client.put(
        `/projects/${project.id}/due-date`,
        { dueDate: editDueDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProject((prev) =>
        prev ? { ...prev, dueDate: res.data.dueDate } : prev
      );
      toast.success("Due date updated successfully");
    } catch (error) {
      toast.error("Failed to update due date");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await client.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Project deleted successfully");
      navigate("/projects");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const handleFileUploadSuccess = () => {
    fetchFiles();
    toast.success("File uploaded successfully!");
    console.log("File uploaded! You can now refresh file list here.");
  };

  if (loading)
    return <p className="p-6 animate-spin text-gray-500">Loading project...</p>;

  if (!project) return <p className="p-6 text-gray-500">Project not found.</p>;

  const isDueDateInFuture = new Date(editDueDate) > new Date();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h1>
      <p className="text-gray-600 mb-4">{project.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* STATUS */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            className="border px-3 py-2 rounded w-full text-sm"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed" disabled={isDueDateInFuture}>
              Completed (disabled if due date is in future)
            </option>
          </select>
          <button
            onClick={handleStatusUpdate}
            disabled={updating}
            className="mt-2 cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update Status"}
          </button>
        </div>

        {/* DUE DATE */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Due Date</p>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="border px-3 py-2 rounded w-full text-sm"
          />
          <button
            onClick={handleDueDateUpdate}
            className="mt-2 cursor-pointer bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
          >
            Update Due Date
          </button>
        </div>

        {/* CLIENT INFO */}
        <div>
          <p className="text-sm text-gray-500">Client</p>
          <p className="text-gray-700 mt-1">
            {project.Client
              ? `${project.Client.firstName} ${project.Client.lastName} (${project.Client.email})`
              : "N/A"}
          </p>
        </div>

        {/* CREATED AT */}
        <div>
          <p className="text-sm text-gray-500">Created At</p>
          <p className="text-gray-700 mt-1">
            {format(new Date(project.createdAt), "PPP p")}
          </p>
        </div>

        <FileUpload
          projectId={project.id}
          onUploadSuccess={handleFileUploadSuccess}
          token={token}
        />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("/projects")}
          className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Back to Projects
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete Project
        </button>
      </div>

      {/* FEEDBACK SECTION */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Client Feedback
        </h2>

        {feedbackList.length === 0 ? (
          <p className="text-sm text-gray-500">No feedback yet.</p>
        ) : (
          <ul className="space-y-4">
            {feedbackList.map((feedback) => (
              <li
                key={feedback.id}
                className="bg-gray-50 p-4 rounded border border-gray-200"
              >
                <p className="text-gray-700 text-sm mb-1">{feedback.message}</p>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>
                    {feedback.Client
                      ? `${feedback.Client.firstName} ${feedback.Client.lastName}`
                      : "Anonymous"}
                  </span>
                  <span>{format(new Date(feedback.createdAt), "PPP p")}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Uploaded Files Section */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Uploaded Files
        </h2>
        {files.length === 0 ? (
          <p className="text-sm text-gray-500">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {files.map((file) => (
              <li
                key={file.id}
                className="p-4 bg-white border rounded shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">
                    {file.fileName}
                  </span>
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 text-sm hover:underline"
                  >
                    View File
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Uploaded by: {file.uploader}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
