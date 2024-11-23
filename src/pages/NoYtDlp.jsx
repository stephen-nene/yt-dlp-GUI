import React from 'react';

const NoYtDlp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          You Need yt-dlp to Use This Application
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          In order to use this service, you must have the terminal-based yt-dlp software installed.
          It's an open-source tool for downloading videos and audio from YouTube and other platforms.
        </p>
        <a
          href="https://github.com/yt-dlp/yt-dlp#installation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg transition duration-200"
        >
          Download yt-dlp
        </a>
      </div>
    </div>
  );
};

export default NoYtDlp;
