"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [objectId, setObjectId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [fileURL, setFileURL] = useState(null); // Store the public URL of the file after upload
  const [usermail, setUsermail] = useState(null);
  const [firstname, setfirstname] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const storedUsermail = localStorage.getItem('usermail');
    if (storedUsermail) {
      setUsermail(storedUsermail);
    }
  }, []);

  useEffect(() => {
    const storedfirstname = localStorage.getItem('username');
    if (storedfirstname) {
      setfirstname(storedfirstname);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setObjectId(null); // Reset objectId on file change
    setProgress(0); // Reset progress on file change
    setFileURL(null); // Reset file URL on file change

    if (selectedFile) {
      console.log(`File Name: ${selectedFile.name}`);
      console.log(`File Size: ${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`);
      console.log(`File Type: ${selectedFile.type}`);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }
    if (!usermail) {
      console.error('No user email found');
      return;
    }
    if (!firstname) {
      console.error('No firstname found');
      return;
    }
    setIsLoading(true);

    // Simulate file upload and get public file URL
    let uploadedBytes = 0;
    const totalBytes = file.size;

    const interval = setInterval(() => {
      uploadedBytes += totalBytes * 0.1; // Simulate 10% progress on each interval
      const percentCompleted = Math.min(
        Math.round((uploadedBytes * 100) / totalBytes),
        100
      );
      setProgress(percentCompleted);

      if (percentCompleted === 100) {
        clearInterval(interval);
        setIsLoading(false);
        setObjectId("mock-object-id"); // Set mock ObjectID after completion

        // Simulate getting a public URL after uploading to a server
        const simulatedURL = URL.createObjectURL(file);
        setFileURL(simulatedURL); // Update fileURL state with the uploaded file's public URL
        console.log('File successfully uploaded', simulatedURL);
      }
    }, 300);
  };

  const handleReupload = () => {
    setFile(null);
    setObjectId(null);
    setProgress(0);
    setFileURL(null);
  };

  const handleDone = () => {
    router.push('/dashboard');
  };

  // Function to render the uploaded file based on its type
  const renderFile = () => {
    if (!fileURL) return null;

    const fileType = file.type;

    if (fileType.startsWith('image/')) {
      // Render image
      return (
        <div className="mt-4">
          <p>Preview Image:</p>
          <img src={fileURL} alt="Uploaded file" className="max-w-full h-auto" />
        </div>
      );
    } else if (fileType === 'application/pdf') {
      // Render PDF viewer
      return (
        <div className="mt-4">
          <p>Preview PDF:</p>
          <iframe
            src={fileURL}
            className="w-full h-96"
            title="PDF Preview"
            frameBorder="0"
          />
        </div>
      );
    } else if (
      fileType === 'application/vnd.ms-powerpoint' || // ppt
      fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' // pptx
    ) {
      // Render PowerPoint using Google Docs Viewer
      return (
        <div className="mt-4">
          <p>Preview PowerPoint:</p>
          <iframe
            src={`https://docs.google.com/gview?url=${fileURL}&embedded=true`}
            className="w-full h-96"
            title="PPT Preview"
            frameBorder="0"
          />
        </div>
      );
    } else if (
      fileType === 'application/msword' || // doc
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // docx
    ) {
      // Render Word document using Google Docs Viewer
      return (
        <div className="mt-4">
          <p>Preview Word Document:</p>
          <iframe
            src={`https://docs.google.com/gview?url=${fileURL}&embedded=true`}
            className="w-full h-96"
            title="Word Document Preview"
            frameBorder="0"
          />
        </div>
      );
    } else if (fileType.startsWith('audio/')) {
      // Render audio
      return (
        <div className="mt-4">
          <p>Preview Audio:</p>
          <audio controls className="w-full mt-4">
            <source src={fileURL} type={fileType} />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    } else if (fileType.startsWith('video/')) {
      // Render video
      return (
        <div className="mt-4">
          <p>Preview Video:</p>
          <video controls className="w-full mt-4">
            <source src={fileURL} type={fileType} />
            Your browser does not support the video element.
          </video>
        </div>
      );
    } else {
      return (
        <div className="mt-4">
          <p className="text-red-600">Unsupported file type: {fileType}</p>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-blue-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-2/3 max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">File Upload</h1>
          <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            <p className="mt-2 text-sm text-gray-500">Drag and drop or <a href="#" className="text-blue-600 hover:underline">browse</a> your files.</p>
          </div>
          {file && (
            <div className="mb-4">
              <p className="mb-1 text-sm text-gray-700">{file.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-1 text-sm text-gray-500">{`${(file.size / (1024 * 1024)).toFixed(2)} MB`}</p>
              {isLoading && <p className="mt-1 text-sm text-gray-500">Uploading... {progress}%</p>}
            </div>
          )}
          <button
            onClick={handleFileUpload}
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg mt-4 hover:bg-purple-700 transition-colors"
          >
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
          {fileURL && renderFile()}
          {objectId && (
            <div className="mt-4">
              <button
                onClick={handleReupload}
                className="w-full bg-yellow-500 text-white py-2 rounded-lg mt-2 hover:bg-yellow-600 transition-colors"
              >
                Reupload
              </button>
              <button
                onClick={handleDone}
                className="w-full bg-green-600 text-white py-2 rounded-lg mt-2 hover:bg-green-700 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
