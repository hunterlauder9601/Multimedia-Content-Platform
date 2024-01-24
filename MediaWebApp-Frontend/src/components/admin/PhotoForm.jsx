import React from 'react';

const PhotoForm = ({ 
    handlePhotoPost,
    handlePhotoUpload,
    photoTitle,
    setPhotoTitle,
    photoDescription,
    setPhotoDescription,
    photoAuthors,
    setPhotoAuthors
 }) => {

  return (
    <form onSubmit={handlePhotoPost} className="mt-4 w-full max-w-3xl text-white text-lg">
      <div>
        <label className="block mb-2">Photo:</label>
        <input
          type="file"
          onChange={handlePhotoUpload}
          className="bg-zinc-800 text-white w-full px-4 py-2 rounded-md"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          value={photoTitle}
          onChange={(e) => setPhotoTitle(e.target.value)}
          className="bg-zinc-800 w-full px-4 py-2 rounded-md"
          placeholder="Enter title"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2">Author(s):</label>
        <input
          type="text"
          value={photoAuthors}
          onChange={(e) => setPhotoAuthors(e.target.value)}
          className="bg-zinc-800 w-full px-4 py-2 rounded-md"
          placeholder="Enter author(s)"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2">Description:</label>
        <textarea
          value={photoDescription}
          onChange={(e) => setPhotoDescription(e.target.value)}
          className="bg-zinc-800 w-full px-4 py-2 rounded-md"
          placeholder="Enter photo description"
          rows={4}
        />
      </div>

      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 mt-4 mb-8 hover:bg-blue-600"
        >
          Submit Photo
        </button>
      </div>
    </form>
  );
};

export default PhotoForm;
