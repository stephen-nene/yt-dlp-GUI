import React from "react";
import { formatFileSize } from "../utils/utils";

const FormatTable = ({ formats, onRowClick }) => (
  <div className="mt-6 w-full max-w-4xl overflow-x-auto">
    <table className="table-auto w-full text-left text-gray-300">
      <thead>
        <tr>
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
            onClick={() => onRowClick(format)}
          >
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
);

export default FormatTable;
