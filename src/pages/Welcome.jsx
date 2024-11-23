import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { message } from "antd";

const Welcome = () => {
  const [ytLink, setYtLink] = useState("");
  const [formats, setFormats] = useState([]);
  const [error, setError] = useState("");

  // Function to validate YouTube URL
  const validateLink = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube|youtu|vimeo)\.(com|be)\/.*$/;
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateLink(ytLink)) {
      setError("Please enter a valid YouTube link.");
      message.error("Please enter a valid YouTube link.");
      return;
    }

    setError("");
    setFormats([])
    const loadingMessage = message.loading(
      `Fetching formats for ${ytLink}...`,
      0
    );

    try {
      const videoInfo = await invoke("get_video_formats", { url: ytLink });

      const parsedInfo = JSON.parse(videoInfo);
      const filteredFormats = parsedInfo.formats.filter(
        (format) =>
          format.protocol === "https" && // Only https
          // format.resolution !== "audio only" && 
          !format.format_note.includes("storyboard") // Skip storyboard formats
      );
      console.log(filteredFormats);
      setFormats(filteredFormats);
      loadingMessage();
      message.success(`Formats fetched successfully for ${ytLink}`);
    } catch (err) {
      console.error("Error fetching formats:", err);
      loadingMessage();
      setError("Failed to fetch video formats. Please try again.");
      message.error("Failed to fetch video formats.");
    }
  };

  // Function to format file size in MB/GB
  const formatFileSize = (sizeInBytes) => {
    if (!sizeInBytes) return "N/A";
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB >= 1024
      ? `${(sizeInMB / 1024).toFixed(2)} GB`
      : `${sizeInMB.toFixed(2)} MB`;
  };

  // Function to handle row click
  const handleRowClick = (item) => {
    console.log(item)
    message.success(`Successfully clicked on format with ID: ${item.format_id}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white pt-5">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to yt-dlp-GUI</h1>
        <p className="mb-6">
          Enter a YouTube link below to fetch available formats.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className={`flex items-center ${
          error ? "border border-red-500" : "border-transparent"
        } bg-gray-900 p-3 rounded-md w-4/5 max-w-lg`}
      >
        <input
          type="text"
          value={ytLink}
          onChange={(e) => setYtLink(e.target.value)}
          placeholder="Enter a YouTube link here..."
          className="flex-grow bg-gray-800 text-white p-2 rounded-md outline-none"
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400"
        >
          Fetch Formats
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Table to display the formats */}
      {formats.length > 0 && (
        <div className="mt-6 w-full max-w-4xl overflow-x-auto">
          <table className="table-auto w-full text-left text-gray-300">
            <thead>
              <tr>
                {/* <th className="px-4 py-2">Format ID</th> */}
                {/* <th className="px-4 py-2">Protocol</th> */}
                <th className="px-4 py-2">Resolution</th>
                <th className="px-4 py-2">Format</th>
                <th className="px-4 py-2">File Size</th>
                <th className="px-4 py-2">Format Note</th>
              </tr>
            </thead>
            <tbody>
              {formats.map((format) => (
                <tr
                  key={format.format_id}
                  className="cursor-pointer hover:bg-gray-700"
                  onClick={() => handleRowClick(format)}
                >
                  {/* <td className="px-4 py-2">{format.format_id}</td> */}
                  {/* <td className="px-4 py-2">{format.protocol || "N/A"}</td> */}
                  <td className="px-4 py-2">{format.resolution || "N/A"}</td>

                  <td className="px-4 py-2">{format.format}</td>
                  <td className="px-4 py-2">
                    {formatFileSize(format.filesize || format.filesize_approx)}
                  </td>
                  <td className="px-4 py-2">{format.format_note || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Welcome;
