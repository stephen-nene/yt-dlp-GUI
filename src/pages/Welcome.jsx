import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { message } from "antd";

export const Welcome = () => {
  const [YtLink, setYtLink] = useState("");
  const [formats, setFormats] = useState({});
  const [error, setError] = useState("");

  // Function to validate YouTube URL
  const validateLink = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube|youtu|vimeo)\.(com|be)\/.*$/;
    return regex.test(url);
  };

  async function greet(e) {
    e.preventDefault();

    if (!validateLink(YtLink)) {
      setError("Please enter a valid YouTube link.");
      message.destroy();
      message.error("Please enter a valid YouTube link.");
      return;
    }

    setError("");
    // Show loading message
    const loadingMessage = message.loading(`Searching for ${YtLink}`, 0);

    try {
      // Invoke the Tauri command to fetch the video formats from yt-dlp
      const videoFormats = await invoke("get_video_formats", { url: YtLink });

      // Hide the loading message and show success
      loadingMessage();
      message.success(`Formats fetched for ${YtLink}`);
      setFormats(videoFormats);
    } catch (err) {
      // Hide the loading message and show error
      loadingMessage();
      setError("Failed to fetch video formats.");
      message.error("Failed to fetch video formats.");
      console.error(err);
    }
  }

  // Helper function to parse the format data into columns
  const parseFormats = (formatsData) => {
    console.log(formatsData[0]); // Debug log to inspect the first line
  
    return formatsData.map((format, index) => {
      // Use regex to split by spaces and trim the values
      const details = format.trim().split(/\s+/);  // Split by one or more spaces
  
      // If the details array doesn't have enough elements, we can skip or handle it gracefully
      if (details.length < 13) return null; // Handle incomplete data
  
      return {
        id: details[0],
        ext: details[1],
        resolution: details[2],
        fps: details[3],
        filesize: details[4],
        tbr: details[5],
        proto: details[6],
        vcodec: details[7],
        vbr: details[8],
        acodec: details[9],
        abr: details[10],
        asr: details[11],
        moreInfo: details[12],
      };
    }).filter(format => format !== null);  // Filter out null values if any
  };
  
  

  return (
    <div className="flex flex-col pt-5 items-center min-h-screen bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to yt-dlp-GUI</h1>
        <p className="mb-6">Enter a YouTube link below</p>
      </div>

      <form
        className={`flex items-center ${
          error && "border border-rose-500"
        } bg-gray-900 p-2.5 rounded-md x-auto mt-14`}
        onSubmit={greet}
      >
        <span className="text-green-500 text-2xl mr-2">&gt;</span>
        <input
          type="text"
          className="bg-gray-900 text-white p-2 outline-none ml-2 w-full rounded-md"
          onChange={(e) => setYtLink(e.currentTarget.value)}
          placeholder="Enter a YouTube link here..."
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400"
        >
          Fetch Formats
        </button>
      </form>

      {/* Error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Show formats in a table if available */}
      {formats.length > 0 && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Available Formats:</h3>
          <table className="table-auto w-full text-left text-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">EXT</th>
                <th className="px-4 py-2">Resolution</th>
                <th className="px-4 py-2">FPS</th>
                <th className="px-4 py-2">Filesize</th>
                <th className="px-4 py-2">TBR</th>
                <th className="px-4 py-2">Proto</th>
                <th className="px-4 py-2">VCodec</th>
                <th className="px-4 py-2">VBR</th>
                <th className="px-4 py-2">ACodec</th>
                <th className="px-4 py-2">ABR</th>
                <th className="px-4 py-2">ASR</th>
                <th className="px-4 py-2">More Info</th>
              </tr>
            </thead>
            <tbody>
              {parseFormats(formats).map((format, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{format.id}</td>
                  <td className="px-4 py-2">{format.ext}</td>
                  <td className="px-4 py-2">{format.resolution}</td>
                  <td className="px-4 py-2">{format.fps}</td>
                  <td className="px-4 py-2">{format.filesize}</td>
                  <td className="px-4 py-2">{format.tbr}</td>
                  <td className="px-4 py-2">{format.proto}</td>
                  <td className="px-4 py-2">{format.vcodec}</td>
                  <td className="px-4 py-2">{format.vbr}</td>
                  <td className="px-4 py-2">{format.acodec}</td>
                  <td className="px-4 py-2">{format.abr}</td>
                  <td className="px-4 py-2">{format.asr}</td>
                  <td className="px-4 py-2">{format.moreInfo}</td>
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
