export const AudioForm = ({
  audioURL,
  setAudioURL,
  audioAuthor,
  setAudioAuthor,
  audioTitle,
  setAudioTitle,
  audioDate,
  setAudioDate,
  audioDescription,
  setAudioDescription,
  handleAudioPost,
}) => {
  return (
    <form onSubmit={handleAudioPost} className="mt-4 w-full max-w-3xl text-white text-lg">
      <div>
        <label className="block mb-2">SoundCloud URL:</label>
        <input
          type="text"
          value={audioURL}
          onChange={(e) => setAudioURL(e.target.value)}
          className="bg-zinc-800 text-white w-full px-4 py-2 rounded-md"
          placeholder="Enter SoundCloud track URL"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2">Author(s):</label>
        <input
          type="text"
          value={audioAuthor}
          onChange={(e) => setAudioAuthor(e.target.value)}
          className="bg-zinc-800 w-full px-4 py-2 rounded-md"
          placeholder="Enter author(s)"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          value={audioTitle}
          onChange={(e) => setAudioTitle(e.target.value)}
          className="bg-zinc-800 w-full px-4 py-2 rounded-md"
          placeholder="Enter title"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2">Creation Date:</label>
        <input
          type="text"
          value={audioDate}
          onChange={(e) => setAudioDate(e.target.value)}
          className="bg-zinc-800 w-full px-4 py-2 rounded-md"
          placeholder="Enter creation date"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2">Description:</label>
        <textarea
          value={audioDescription}
          onChange={(e) => setAudioDescription(e.target.value)}
          className="bg-zinc-800 w-full px-4 py-2 rounded-md"
          placeholder="Enter audio clip description"
          rows={4}
        />
      </div>

      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 mt-4 mb-8 hover:bg-blue-600"
        >
          Submit Audio
        </button>
      </div>
    </form>
  );
};
