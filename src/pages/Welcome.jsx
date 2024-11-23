import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { message } from "antd";
import { validateLink } from "../utils/utils";
import FormatTable from "../components/FormatTable";

const Welcome = () => {
  const [ytLink, setYtLink] = useState("");
  const [formats, setFormats] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateLink(ytLink)) {
      setError("Please enter a valid YouTube link.");
      message.warning(" Please enter a valid YouTube link.🚨");
      return;
    }
  
    setError("");
    setFormats([]);
    const loadingMessage = message.loading(`🚀 Fetching formats for ${ytLink}...`, 0);
  
    try {
      // Log the start of the Tauri function
      console.log("Invoking Tauri to fetch video formats...");
      const videoInfo = await invoke("get_video_formats", { url: ytLink });
      console.log("Received video info:", videoInfo);  // Debug log for the video info
      
      const parsedInfo = JSON.parse(videoInfo);
      const filteredFormats = parsedInfo.formats.filter(
        (format) =>
          format.protocol === "https" &&
          !format.format_note.includes("storyboard")
      );
  
      setFormats(filteredFormats);
      loadingMessage();  // Close loading message
      message.success(`🎉 Formats fetched successfully for ${ytLink}`);
    } catch (err) {
      console.error("Error fetching formats:", err);
      loadingMessage();  // Close loading message
      setError("❌ Failed to fetch video formats. Please try again.");
      message.error("❌ Failed to fetch video formats.");
    }
  };
  

  const handleRowClick = (item) => {
    console.log(item);
    message.success(` Successfully clicked on format with ID: ${item.format_id} ✅`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white pt-5">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to yt-dlp-GUI</h1>
        <p className="mb-6">Enter a YouTube link below to fetch available formats.</p>
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
      {formats.length > 0 && <FormatTable formats={formats} onRowClick={handleRowClick} />}
    </div>
  );
};

export default Welcome;
