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
        if (!feedbackRes) return;
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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        Project: {project?.title || "Loading..."}
      </h1>
      <FileUpload
        projectId={project?.id}
        onUploadSuccess={handleFileUploadSuccess}
      />

      <form onSubmit={handleFeedbackSubmit} className="my-6">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Leave your feedback..."
          className="w-full border p-3 rounded mb-2"
          rows={4}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Submit Feedback
        </button>
      </form>

      <div className="space-y-4">
        {feedbackList.length === 0 ? (
          <p className="text-gray-500">No feedback yet.</p>
        ) : (
          feedbackList.map((fb) => (
            <div key={fb.id} className="border rounded p-4 shadow-sm bg-white">
              <p className="text-gray-800">{fb.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(fb.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
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

export default ClientProjectDetails;
