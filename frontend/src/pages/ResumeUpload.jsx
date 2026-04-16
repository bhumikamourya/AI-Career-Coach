import { useState } from "react";
import { uploadResume } from "../services/api";
import { useNavigate } from "react-router-dom";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState([]);

  const navigate = useNavigate();


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await uploadResume(formData);

      setText(res.data.text);
      setExtractedSkills(res.data.extractedSkills);

      localStorage.setItem("gap", JSON.stringify(res.data.gap));
      localStorage.setItem("roadmap", JSON.stringify(res.data.roadmap));

      alert("Resume Uploaded & Analyzed");

      navigate("/");
      // console.log("GAP:", res.data.gap);
      // console.log("ROADMAP:", res.data.roadmap);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="bg-white p-6 rounded-lg shadow w-full max-w-xl space-y-4">

        <button
          onClick={() => navigate("/profile")}
          className="bg-indigo-700 text-white px-4 py-2 mx-4 rounded-lg"
        >
          See Profile
        </button>

        <h2 className="text-2xl font-bold text-gray-800">
          Upload Resume
        </h2>

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>

        {text && (
          <div className="mt-4 p-3 border rounded bg-gray-100 max-h-60 overflow-y-auto">
            <h3 className="font-semibold mb-2">Extracted Text:</h3>
            <p className="text-sm whitespace-pre-line">{text}</p>
          </div>
        )}

        {extractedSkills.length > 0 && (
          <div className="mt-4 p-3 border rounded bg-green-50">
            <h3 className="font-semibold mb-2 text-green-700">
              Detected Skills:
            </h3>
            <p className="text-sm">
              {extractedSkills.join(", ")}
            </p>

            <div className="mt-2 text-sm text-gray-600">
              These skills have been added to your profile automatically.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResumeUpload;