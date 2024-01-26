import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";

export const SortableAudioItem = ({
  id,
  clip,
  handleAudioURLChange,
  handleAudioAuthorChange,
  handleAudioTitleChange,
  handleAudioDateChange,
  handleAudioDescriptionChange,
  handleAudioUpdate,
  handleAudioDelete,
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
          <h3 className="text-2xl font-bold tracking-wide">{clip.title}</h3>

          <button {...attributes} {...listeners}>
            <MdDragIndicator size={32} />
          </button>
        </div>

        <div className="mt-2">
          <label className="block text-white text-lg mb-2">
            SoundCloud URL:
          </label>
          <input
            type="text"
            value={clip.url}
            onChange={(e) => handleAudioURLChange(e, clip.id)}
            className="bg-zinc-700 text-white w-full px-4 py-2 rounded-md"
            placeholder="Enter new SoundCloud URL"
          />
        </div>

        <div className="mt-2">
          <label className="block text-white text-lg mb-2">Title:</label>
          <input
            type="text"
            value={clip.title}
            onChange={(e) => handleAudioTitleChange(e, clip.id)}
            className="bg-zinc-700 text-white w-full px-4 py-2 rounded-md"
            placeholder="Enter new title"
          />
        </div>
        <div className="mt-2">
          <label className="block text-white text-lg mb-2">Author(s):</label>
          <input
            type="text"
            value={clip.author}
            onChange={(e) => handleAudioAuthorChange(e, clip.id)}
            className="bg-zinc-700 text-white w-full px-4 py-2 rounded-md"
            placeholder="Enter new author(s)"
          />
        </div>
        <div className="mt-2">
          <label className="block text-white text-lg mb-2">
            Creation Date:
          </label>
          <input
            type="text"
            value={clip.creationDate}
            onChange={(e) => handleAudioDateChange(e, clip.id)}
            className="bg-zinc-700 text-white w-full px-4 py-2 rounded-md"
            placeholder="Enter new creation date"
          />
        </div>
        <div className="mt-2">
          <label className="block text-white text-lg mb-2">Description:</label>
          <textarea
            value={clip.description}
            onChange={(e) => handleAudioDescriptionChange(e, clip.id)}
            className="bg-zinc-700 text-white w-full px-4 py-2 rounded-md"
            placeholder="Enter new description"
            rows={2}
          />
        </div>
        <div className="grid grid-cols-4">
          <button
            onClick={() => handleAudioUpdate(clip.id)}
            className="bg-blue-500 text-white px-2 py-1 mt-2 hover:bg-blue-600"
          >
            Update
          </button>

          <div className="col-span-2"></div>

          <button
            onClick={() => handleAudioDelete(clip.id)}
            className="bg-red-500 text-white px-2 py-1 mt-2 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
