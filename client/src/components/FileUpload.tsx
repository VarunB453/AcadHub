import {
  useState,
} from "react";

import {
  toast,
} from "sonner";

const FileUpload = () => {
  const [
    file,
    setFile,
  ] = useState<File | null>(
    null
  );

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    uploadedUrl,
    setUploadedUrl,
  ] = useState("");

  const downloadUploadedFile = async () => {
    try {
      const response = await fetch(uploadedUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acadhub_auth_token") || ""}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to download uploaded file.");
      }

      const objectUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "acadhub-upload";
      link.click();
      URL.revokeObjectURL(objectUrl);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Download failed.");
    }
  };

  /* =========================================
     HANDLE UPLOAD
  ========================================= */
  const handleUpload =
    async () => {

      if (!file) {
        toast.error(
          "Please select a file."
        );

        return;
      }

      try {

        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const response =
          await fetch(
            `${import.meta.env.VITE_API_BASE_URL || "/api"}/upload`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("acadhub_auth_token") || ""}`,
              },
              body: formData,
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Upload failed."
          );
        }

        setUploadedUrl(
          data.fileUrl
        );

        toast.success(
          "File uploaded successfully."
        );

      } catch (error: any) {

        toast.error(
          error.message
        );

      } finally {

        setUploading(false);
      }
    };

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] ||
              null
          )
        }
      />

      <button
        onClick={
          handleUpload
        }
        disabled={
          uploading
        }
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {uploading
          ? "Uploading..."
          : "Upload File"}
      </button>

      {uploadedUrl && (
        <div className="space-y-2">
          <p className="font-medium">
            Uploaded File:
          </p>

          <button
            type="button"
            onClick={downloadUploadedFile}
            className="text-blue-600 underline"
          >
            Download Uploaded File
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;