import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null); 

  React.useEffect(()=>{
    const checkResume=async()=>{
      try{
      const email = JSON.parse(localStorage.getItem("user")).email
      if(!email) return 
      const res=await axios.get(`http://localhost:4000/api/getResume/${email}`)
      if(res.data.status){
        setResult(res.data.resume);
      }
      
      }
      catch(err){
        console.log("Check Resume Error",err)
      }
   
    }
    checkResume()
  },[])
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(`Selected file: ${e.target.files[0]?.name}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      [".pdf", ".doc", ".docx"].some((ext) => droppedFile.name.endsWith(ext))
    ) {
      setFile(droppedFile);
      setMessage(`Selected file: ${droppedFile.name}`);
    } else {
      setMessage("Invalid file type. Only .pdf, .doc, .docx are allowed.");
    }
  };

  // Handle New Resume By Deleting the pervious resume
  const handleNewResume = async () => {
    try {
      const email = JSON.parse(localStorage.getItem("user")).email
      const res = await axios.delete("http://localhost:4000/api/deleteResume",{
        data:{email:email}})
      console.log(res)
      setResult(null);
      setFile(null);
      setMessage("");

    } catch (err) {
      console.log("This is Upload new Resume Error",err)
    }

  }

  // Upload REsume and Save in Database
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post("http://localhost:4000/api/ats", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data.result)

      const email = JSON.parse(localStorage.getItem("user")).email
      const resume =res.data.result 
      const saveResume = await axios.post("http://localhost:4000/api/saveResume", { resume: resume, email: email })
      
      setResult(res.data.result);


    } catch (err) {
      // console.error(err);
      setMessage("Upload failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      {!result ? (
        <div className="border-2 border-dashed border-blue-400 w-full max-w-3xl rounded-md bg-gray-50 shadow-md">
          {/* Header */}
          <div className="bg-gray-100 border-b border-blue-400 px-6 py-3 text-gray-700 font-semibold text-sm">
            UPLOAD YOUR RESUME
          </div>

          <div className="flex flex-col items-center justify-center py-10 px-6">
            {/* Upload Icon */}
            <div className="mb-6 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0115.9 6h.1a5 5 0 010 10H7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 12v9m0 0l-3-3m3 3l3-3"
                />
              </svg>
            </div>

            {/* Drag-and-drop area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full max-w-lg p-10 border-2 border-dashed rounded-lg transition-colors duration-200 text-center ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
                }`}
            >
              <p className="text-gray-700 font-medium mb-2">
                {file
                  ? `Selected file: ${file.name}`
                  : "Drag & drop your resume here"}
              </p>
              <p className="text-gray-500 text-sm mb-6">
                or choose a file and upload
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-4 justify-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Choose File
                </label>

                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium shadow-sm disabled:opacity-50"
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>

            {/* Message */}
            {message && (
              <p className="mt-4 text-center text-gray-700 font-medium">
                {message}
              </p>
            )}

            {/* Extra Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Accepted formats: <span className="font-medium">.pdf, .doc, .docx</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        // === Dashboard Section (after response) ===
        <div className="max-w-6xl w-full bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Resume Scan Results
            </h2>
            <button
              onClick={handleNewResume}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Upload New Resume
            </button>
          </div>

          <div className="flex gap-8">
            {/* Left Column - Match Rate + Categories */}
            <div className="w-1/3 flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    stroke="#16a34a"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={
                      2 * Math.PI * 60 * (1 - result.matchRate / 100)
                    }
                    strokeLinecap="round"
                    transform="rotate(-90 64 64)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                  {result.matchRate}%
                </div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Match Rate</p>

              {/* Categories */}
              <div className="mt-6 w-full">
                {Object.entries(result.categories).map(([name, data]) => (
                  <div key={name} className="mb-4 border-b pb-3">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === name ? null : name
                        )
                      }
                    >
                      <p className="text-sm font-medium text-gray-700">
                        {name}
                      </p>
                      <span className="text-xs text-gray-500">
                        {data.issues} issues
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 h-2 rounded mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded"
                        style={{
                          width: `${Math.max(0, 100 - data.issues * 10)}%`,
                        }}
                      ></div>
                    </div>

                    {/* Show issueDetails when expanded */}
                    {expandedCategory === name && data.issueDetails.length > 0 && (
                      <ul className="mt-3 ml-2 list-disc text-sm text-gray-600 space-y-1">
                        {data.issueDetails.map((issue, i) => (
                          <li key={i}>{issue}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Detailed Checks */}
            <div className="w-2/3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Detailed Checks
              </h3>
              <div className="space-y-4">
                {result.checks.map((check, i) => (
                  <div
                    key={i}
                    className="p-4 border rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{check.title}</p>
                      <p className="text-sm text-gray-600">{check.message}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${check.status === "pass"
                          ? "bg-green-100 text-green-700"
                          : check.status === "fail"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {check.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
