export const VideoForm = ({
  ytID,
  setytID,
  videoAuthor,
  setVideoAuthor,
  videoDescription,
  setVideoDescription,
  videoCategory,
  setVideoCategory,
  handleVideoPost,
}) => {
  return (
    <form onSubmit={handleVideoPost} className="mt-4 w-full max-w-3xl">
      <div>
        <label className="block text-white text-lg mb-2">YouTube Video ID:</label>
        <input
          type="text"
          value={ytID}
          onChange={(e) => setytID(e.target.value)}
          className="bg-zinc-800 text-white w-full px-4 py-2 rounded-md"
          placeholder="Enter YouTube video ID"
        />
      </div>

      <div className="mt-4">
        <label className="block text-white text-lg mb-2">Author(s):</label>
        <input
          type="text"
          value={videoAuthor}
          onChange={(e) => setVideoAuthor(e.target.value)}
          className="bg-zinc-800 text-white w-full px-4 py-2 rounded-md"
          placeholder="Enter author(s)"
        />
      </div>

      <div className="mt-4">
        <label className="block text-white text-lg mb-2">Category:</label>
        <select
          value={videoCategory}
          onChange={(e) => setVideoCategory(e.target.value)}
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

      <div className="mt-4">
        <label className="block text-white text-lg mb-2">Description:</label>
        <textarea
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
          className="bg-zinc-800 text-white w-full px-4 py-2 rounded-md"
          placeholder="Enter video description"
          rows={4}
        />
      </div>

      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 mb-8 hover:bg-blue-600"
        >
          Submit Video
        </button>
      </div>
    </form>
  );
};
