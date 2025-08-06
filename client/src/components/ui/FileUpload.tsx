import { useState } from "react";
import { toast } from "react-toastify";
import client from "../../api/client";

interface Props {
  projectId: number | undefined;
  onUploadSuccess: () => void;
  token: string | null;
  isClient?: boolean; // ✅ Add isClient to decide route
}

const FileUpload = ({
  projectId,
  onUploadSuccess,
  token,
  isClient = false,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", String(projectId));

      if (!token) {
        toast.error("Missing authentication token.");
        return;
      }

      const uploadUrl = isClient ? "/files/client/upload" : "/files/upload";

      await client.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("File uploaded successfully!");
      setFile(null);
      onUploadSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded border shadow-sm">
      <h3 className="text-md font-semibold text-gray-700 mb-2">
        Upload a File
      </h3>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-2 block w-full cursor-pointer"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;
