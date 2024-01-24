import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";

export const SortableVideoItem = ({
  id,
  video,
  handleVideoDelete,
  handleYTIDChange,
  handleVideoAuthorChange,
  handleVideoCategoryChange,
  handleVideoDescriptionChange,
  handleVideoUpdate,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="bg-zinc-800 p-4 rounded-md flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold tracking-wide">{video.title}</h3>

          <button {...attributes} {...listeners}>
            <MdDragIndicator size={32} />
          </button>
        </div>

        <div className="mt-2">
          <label className="block text-white text-lg mb-2">
            YouTube Video ID:
          </label>
          <input
            type="text"
            value={video.youtubeID}
            onChange={(e) => handleYTIDChange(e, video.id)}
            className="bg-zinc-700 text-white w-full px-4 py-2 rounded-md"
            placeholder="Enter new YouTube video ID"
          />
        </div>

        <div className="mt-2">
          <label className="block text-white text-lg mb-2">Author(s):</label>
          <input
            type="text"
            value={video.author}
            onChange={(e) => handleVideoAuthorChange(e, video.id)}
            className="bg-zinc-700 text-white w-full px-4 py-2 rounded-md"
            placeholder="Enter new author(s)"
          />
        </div>

        <div className="mt-2">
          <label className="block text-white text-lg mb-2">Category:</label>
          <select
            value={video.category || ""}
            onChange={(e) => handleVideoCategoryChange(e, video.id)}
            className="bg-zinc-800 text-white w-full px-4 py-2 rounded-md"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="">None</option>
            <option value="freelance">Freelance</option>
            <option value="shorts">Shorts</option>
          </select>
        </div>

        <div className="mt-2">
          <label className="block text-white text-lg mb-2">Description:</label>
          <textarea
            value={video.description}
            onChange={(e) => handleVideoDescriptionChange(e, video.id)}
            className="bg-zinc-700 text-white w-full px-4 py-2 rounded-md"
            placeholder="Enter new video description"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-4">
          <button
            onClick={() => handleVideoUpdate(video.id)}
            className="bg-blue-500 text-white px-2 py-1 mt-2 hover:bg-blue-600"
          >
            Update
          </button>

          <div className="col-span-2"></div>

          <button
            onClick={() => handleVideoDelete(video.id)}
            className="bg-red-500 text-white px-2 py-1 mt-2 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
