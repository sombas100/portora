import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../../api/client";
import { useClientAuth } from "../../context/clientAuthContext";
import { toast } from "react-toastify";
import type { Project, Feedback } from "../../interfaces";
import FileUpload from "../../components/ui/FileUpload";

const ClientProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useClientAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [newMessage, setNewMessage] = useState("");

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
    const fetchProjectAndFeedback = async () => {
      try {
        const res = await client.get(`/projects/client/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(res.data);
      } catch {
        toast.error("Failed to load project");
      }

      try {
        const feedbackRes = await client.get(
          `/feedback/projects/${id}/feedback`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFeedbackList(feedbackRes.data);
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchProjectAndFeedback();
    fetchFiles();
  }, [id, token]);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await client.post(
        "/feedback",
        { message: newMessage, projectId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFeedbackList((prev) => [res.data, ...prev]);
      setNewMessage("");
      toast.success("Feedback submitted");
    } catch (err) {
      toast.error("Failed to submit feedback");
    }
  };

  const handleFileUploadSuccess = () => {
    fetchFiles();
    toast.success("File uploaded successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Project Details</h1>

      {project && (
        <div className="bg-white rounded shadow p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            {project.title}
          </h2>
          <p className="text-sm text-gray-600 mt-2">{project.description}</p>
          {project.dueDate && (
            <p className="text-sm text-gray-500 mt-1">
              Due by:{" "}
              <span className="font-medium">
                {new Date(project.dueDate).toLocaleDateString()}
              </span>
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Status:{" "}
            <span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium">
              {project.status}
            </span>
          </p>
        </div>
      )}

      {/* File Upload Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Upload Files
        </h2>
        <FileUpload
          projectId={project?.id}
          onUploadSuccess={handleFileUploadSuccess}
          token={token}
          isClient={true}
        />
      </div>

      {/* Feedback Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Leave Feedback
        </h2>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your feedback here..."
            className="w-full border p-3 rounded mb-2 resize-none focus:outline-none focus:ring focus:ring-indigo-300"
            rows={4}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Feedback Messages */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Project Feedback
        </h2>
        {feedbackList.length === 0 ? (
          <p className="text-gray-500">No feedback submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {feedbackList.map((fb) => (
              <div
                key={fb.id}
                className="bg-white p-4 rounded shadow-sm border border-gray-200"
              >
                <p className="text-gray-700">{fb.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(fb.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Uploaded Files */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Uploaded Files
        </h2>
        {files.length === 0 ? (
          <p className="text-sm text-gray-500">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {files.map((file) => (
              <li
                key={file.id}
                className="p-4 bg-gray-50 rounded border flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {file.fileName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Uploaded by: {file.uploader}
                  </p>
                </div>
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline text-sm"
                >
                  View File
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ClientProjectDetails;
