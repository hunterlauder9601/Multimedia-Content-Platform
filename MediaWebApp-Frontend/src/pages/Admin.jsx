import { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import webServices from '../util/webServices';
import { useNavigate } from "react-router-dom";
import { auth } from '../util/firebase';
import { signOut } from "firebase/auth";

export default function Admin() {
  const [ytID, setytID] = useState('');
  const [videoAuthor, setVideoAuthor] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [existingVideos, setExistingVideos] = useState([]);
  const [videoCategory, setVideoCategory] = useState('');

  const [audioAuthor, setAudioAuthor] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const [audioTitle, setAudioTitle] = useState('');
  const [audioDate, setAudioDate] = useState('');
  const [audioDescription, setAudioDescription] = useState('');
  const [existingAudios, setExistingAudios] = useState([]);


  const [mode, setMode] = useState('add_videos');
  const [idToken, setIdToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribeAuth;
    const fetchData = async () => {
      try {
        const [videosResponse, audiosResponse] = await Promise.all([
          webServices.getVideos(),
          webServices.getAudios()
        ]);
        setExistingVideos(videosResponse.data);
        setExistingAudios(audiosResponse.data);
        console.log('Videos:', videosResponse.data);
        console.log('Audios:', audiosResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const checkUserAndFetchData = async (user) => {
      if (user) {
        const idTokenResult = await user.getIdToken(true);
        setIdToken(idTokenResult);
        fetchData();
      } else {
        navigate('/login');
      }
    };

    unsubscribeAuth = auth.onAuthStateChanged(checkUserAndFetchData);

    // Clean up the observers when the component unmounts
    return () => {
      unsubscribeAuth();
    };
  }, [navigate]);


  const handleLogout = () => {               
    signOut(auth).then(() => {
        navigate("/");
    }).catch((error) => {
      console.log('logout error occured');
    });
  }

  const handleYTIDChange = (e, id) => {
    setExistingVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, youtubeID: e.target.value } : video
      )
    );
  };

  const handleVideoAuthorChange = (e, id) => {
    setExistingVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, author: e.target.value } : video
      )
    );
  };

  const handleVideoCategoryChange = (e, id) => {
    setExistingVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, category: e.target.value } : video
      )
    );
  };

  const handleVideoDescriptionChange = (e, id) => {
    setExistingVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, description: e.target.value } : video
      )
    );
  };

  const handleVideoPost = (e) => {
    e.preventDefault();
  
    // Create the video data object to be posted
    const newVideoData = {
      author: videoAuthor,
      description: videoDescription,
      category: videoCategory
    };
  
    // Call the postVideo method to add the video
    webServices.postVideo(idToken, ytID, newVideoData)
      .then((response) => {
        console.log('New video added:', response);
  
        // Clear the input fields after submission
        setytID('');
        setVideoAuthor('');
        setVideoDescription('');
        setVideoCategory('');

        webServices.getVideo(response.headers.location).then((resp) => {
          setExistingVideos((prevVideos) => [...prevVideos, resp.data]);
        }).catch((error) => {
          console.error('Error getting added video:', error);
        });
      })
      .catch((error) => {
        console.error('Error adding video:', error);
      });
  };

  const handleAudioPost = (e) => {
    e.preventDefault();
  
    // Create the video data object to be posted
    const newAudioData = {
      url: audioURL,
      description: audioDescription,
      title: audioTitle,
      author: audioAuthor,
      creationDate: audioDate
    };
  
    // Call the postVideo method to add the video
    webServices.postAudio(idToken, newAudioData)
      .then((response) => {
        console.log('New audio clip added:', response);
  
        // Clear the input fields after submission
        setAudioURL('');
        setAudioDescription('');
        setAudioTitle('');
        setAudioAuthor('');
        setAudioDate('');

        webServices.getAudio(response.headers.location).then((resp) => {
          setExistingAudios((prev) => [...prev, resp.data]);
        }).catch((error) => {
          console.error('Error getting added audio clip:', error);
        });
      })
      .catch((error) => {
        console.error('Error adding audio clip:', error);
      });
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleVideoDelete = (idToDelete) => {
    // Call the deleteVideo method to delete the video
    webServices.deleteVideo(idToken, idToDelete)
      .then(() => {
        console.log('Video deleted successfully.');
  
        // Remove the deleted video from the list of existingVideos
        setExistingVideos((prevVideos) =>
          prevVideos.filter((video) => video.id !== idToDelete)
        );
      })
      .catch((error) => {
        console.error('Error deleting video:', error);
      });
  };

  const handleAudioDelete = (idToDelete) => {
    // Call the deleteVideo method to delete the video
    webServices.deleteAudio(idToken, idToDelete)
      .then(() => {
        console.log('Audio deleted successfully.');
  
        // Remove the deleted video from the list of existingVideos
        setExistingAudios((prev) =>
          prev.filter((clip) => clip.id !== idToDelete)
        );
      })
      .catch((error) => {
        console.error('Error deleting audio:', error);
      });
  };

  const handleVideoUpdate = (idToUpdate) => {
    // Find the video to update in existingVideos
    const videoToUpdate = existingVideos.find((video) => video.id === idToUpdate);
  
    // Create the updated video data object
    const updatedVideoData = {
      author: videoToUpdate.author,
      description: videoToUpdate.description,
      category: videoToUpdate.category
    };
  
    // Call the updateVideo method to update the video
    webServices.updateVideo(idToken, idToUpdate, updatedVideoData, videoToUpdate.youtubeID)
      .then((response) => {
        console.log('Video updated:', response.data);
  
        setExistingVideos((prevVideos) =>
          prevVideos.map((video) =>
            video.id === idToUpdate ? response.data : video
          )
        );
      })
      .catch((error) => {
        console.error('Error updating video:', error);
      });
  };

  const handleAudioUpdate = (idToUpdate) => {
    const clipToUpdate = existingAudios.find((clip) => clip.id === idToUpdate);
  
    const updatedClipData = {
      url: clipToUpdate.url,
      title: clipToUpdate.title,
      creationDate: clipToUpdate.creationDate,
      author: clipToUpdate.author,
      description: clipToUpdate.description, 
    };
  
    webServices.updateAudio(idToken, idToUpdate, updatedClipData)
      .then((response) => {
        console.log('Audio updated:', response);
  
        setExistingAudios((prev) =>
          prev.map((clip) =>
            clip.id === idToUpdate ? response.data : clip
          )
        );
      })
      .catch((error) => {
        console.error('Error updating audio:', error);
      });
  };

  const handleURLChange = (e, id) => {
    setExistingAudios((prev) =>
      prev.map((clip) =>
        clip.id === id ? { ...clip, url: e.target.value } : clip
      )
    );
  };

  const handleAudioAuthorChange = (e, id) => {
    setExistingAudios((prev) =>
      prev.map((clip) =>
        clip.id === id ? { ...clip, author: e.target.value } : clip
      )
    );
  };

  const handleAudioDescriptionChange = (e, id) => {
    setExistingAudios((prev) =>
      prev.map((clip) =>
        clip.id === id ? { ...clip, description: e.target.value } : clip
      )
    );
  };

  const handleAudioTitleChange = (e, id) => {
    setExistingAudios((prev) =>
        prev.map((clip) =>
        clip.id === id ? { ...clip, title: e.target.value } : clip
      )
    );
  };

  const handleAudioDateChange = (e, id) => {
    setExistingAudios((prev) =>
        prev.map((clip) =>
        clip.id === id ? { ...clip, creationDate: e.target.value } : clip
      )
    );
  };


  return (
    <div>
      <NavBar isAdminPage={true} handleLogout={handleLogout}/>
      <div className='w-full min-h-[calc(100vh-43px)] max-h-fit bg-zinc-900 text-white flex flex-col items-center justify-center'>
        <h1 className='text-6xl font-bold text-blue-500 tracking-wider inline pt-[97px]'>Admin Portal</h1>

        {/* Mode Picker Buttons */}
        <div className='mt-4'>
          <button
            onClick={() => handleModeChange('add_videos')}
            className={`${
              mode === 'add_videos' ? 'bg-blue-500' : 'bg-gray-500'
            } text-white px-4 py-2 my-4 mx-2 hover:bg-blue-600`}
          >
            Add Video
          </button>
          <button
            onClick={() => handleModeChange('delete_update_videos')}
            className={`${
              mode === 'delete_update_videos' ? 'bg-blue-500' : 'bg-gray-500'
            } text-white px-4 py-2 my-4 mx-2 hover:bg-blue-600`}
          >
            Delete/Update Videos
          </button>
          <button
            onClick={() => handleModeChange('add_audios')}
            className={`${
              mode === 'add_audios' ? 'bg-blue-500' : 'bg-gray-500'
            } text-white px-4 py-2 my-4 mx-2 hover:bg-blue-600`}
          >
            Add Audio Clips
          </button>
          <button
            onClick={() => handleModeChange('delete_update_audios')}
            className={`${
              mode === 'delete_update_audios' ? 'bg-blue-500' : 'bg-gray-500'
            } text-white px-4 py-2 my-4 mx-2 hover:bg-blue-600`}
          >
            Delete/Update Audio Clips
          </button>
        </div>

        {/* Render Form for Adding Videos */}
        {mode === 'add_videos' && (
          <form onSubmit={handleVideoPost} className='mt-4 w-full max-w-3xl'>
            <div>
              <label className='block text-white text-lg mb-2'>YouTube ID:</label>
              <input
                type='text'
                value={ytID}
                onChange={(e) => setytID(e.target.value)}
                className='bg-zinc-800 text-white w-full px-4 py-2 rounded-md'
                placeholder='Enter YouTube video ID'
              />
            </div>

            <div className='mt-4'>
              <label className='block text-white text-lg mb-2'>Author(s):</label>
              <input
                type='text'
                value={videoAuthor}
                onChange={(e) => setVideoAuthor(e.target.value)}
                className='bg-zinc-800 text-white w-full px-4 py-2 rounded-md'
                placeholder='Enter author(s)'
              />
            </div>

            <div className='mt-4'>
              <label className='block text-white text-lg mb-2'>Category:</label>
              <select
                value={videoCategory}
                onChange={(e) => setVideoCategory(e.target.value)}
                className='bg-zinc-800 text-white w-full px-4 py-2 rounded-md'
              >
                <option value='' disabled>Select a category</option>
                <option value=''>None</option>
                <option value='interviews'>Interviews</option>
                <option value='shorts'>Shorts</option>
              </select>
            </div>

            <div className='mt-4'>
              <label className='block text-white text-lg mb-2'>Description:</label>
              <textarea
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                className='bg-zinc-800 text-white w-full px-4 py-2 rounded-md'
                placeholder='Enter video description'
                rows={4}
              />
            </div>

            <div className='w-full flex justify-center'>
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 mt-4 mb-8 hover:bg-blue-600'
              >
                Submit Video
              </button>
            </div>
          </form>
        )}

        {/* Render List of Existing Videos with Delete/Update Options */}
        {mode === 'delete_update_videos' && (
          <div className='mt-4 w-full max-w-3xl'>
            <h2 className='text-3xl font-bold mb-4 text-white'>Existing Videos:</h2>
            <ul className='grid grid-cols-2 gap-4 mb-4'>
              {existingVideos.map((video) => (
                <li key={video.id}>
                  <div className='bg-zinc-800 p-4 rounded-md'>
                    <p>YouTube ID: {video.youtubeID}</p>
                    <p>Author(s): {video.author}</p>
                    <p>Description: {video.description}</p>

                    <div className='mt-2'>
                      <label className='block text-white text-lg mb-2'>New Video ID:</label>
                      <input
                        type='text'
                        value={video.youtubeID}
                        onChange={(e) => handleYTIDChange(e, video.id)}
                        className='bg-zinc-700 text-white w-full px-4 py-2 rounded-md'
                        placeholder='Enter new YouTube video ID'
                      />
                    </div>

                    <div className='mt-2'>
                      <label className='block text-white text-lg mb-2'>New Author(s):</label>
                      <input
                        type='text'
                        value={video.author}
                        onChange={(e) => handleVideoAuthorChange(e, video.id)}
                        className='bg-zinc-700 text-white w-full px-4 py-2 rounded-md'
                        placeholder='Enter new author(s)'
                      />
                    </div>

                    <div className='mt-2'>
                      <label className='block text-white text-lg mb-2'>Category:</label>
                      <select
                        value={video.category || ''}
                        onChange={(e) => handleVideoCategoryChange(e, video.id)}
                        className='bg-zinc-800 text-white w-full px-4 py-2 rounded-md'
                      >
                        <option value='' disabled>Select a category</option>
                        <option value=''>None</option>
                        <option value='interviews'>Interviews</option>
                        <option value='shorts'>Shorts</option>
                      </select>
                    </div>

                    <div className='mt-2'>
                      <label className='block text-white text-lg mb-2'>New Description:</label>
                      <textarea
                        value={video.description}
                        onChange={(e) => handleVideoDescriptionChange(e, video.id)}
                        className='bg-zinc-700 text-white w-full px-4 py-2 rounded-md'
                        placeholder='Enter new video description'
                        rows={2}
                      />
                    </div>

                    <div className='grid grid-cols-4'>
                      <button
                        onClick={() => handleVideoUpdate(video.id)}
                        className='bg-blue-500 text-white px-2 py-1 mt-2 hover:bg-blue-600'
                      >
                        Update
                      </button>

                      <div className='col-span-2'></div>

                      <button
                        onClick={() => handleVideoDelete(video.id)}
                        className='bg-red-500 text-white px-2 py-1 mt-2 hover:bg-red-600'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Render Form for Adding Audio Clips */}
        {mode === 'add_audios' && (
          <form onSubmit={handleAudioPost} className='mt-4 w-full max-w-3xl'>
            <div>
              <label className='block text-white text-lg mb-2'>Soundcloud URL:</label>
              <input
                type='text'
                value={audioURL}
                onChange={(e) => setAudioURL(e.target.value)}
                className='bg-zinc-800 text-white w-full px-4 py-2 rounded-md'
                placeholder='Enter Soundcloud track URL'
              />
            </div>

            <div className='mt-4'>
              <label className='block text-white text-lg mb-2'>Author(s):</label>
              <input
                type='text'
                value={audioAuthor}
                onChange={(e) => setAudioAuthor(e.target.value)}
                className='bg-zinc-800 text-white w-full px-4 py-2 rounded-md'
                placeholder='Enter author(s)'
              />
            </div>

            <div className='mt-4'>
              <label className='block text-white text-lg mb-2'>Title:</label>
              <input
                type='text'
                value={audioTitle}
                onChange={(e) => setAudioTitle(e.target.value)}
                className='bg-zinc-800 text-white w-full px-4 py-2 rounded-md'
                placeholder='Enter title'
              />
            </div>

            <div className='mt-4'>
              <label className='block text-white text-lg mb-2'>Creation Date:</label>
              <input
                type='text'
                value={audioDate}
                onChange={(e) => setAudioDate(e.target.value)}
                className='bg-zinc-800 text-white w-full px-4 py-2 rounded-md'
                placeholder='Enter creation date'
              />
            </div>

            <div className='mt-4'>
              <label className='block text-white text-lg mb-2'>Description:</label>
              <textarea
                value={audioDescription}
                onChange={(e) => setAudioDescription(e.target.value)}
                className='bg-zinc-800 text-white w-full px-4 py-2 rounded-md'
                placeholder='Enter audio clip description'
                rows={4}
              />
            </div>

            <div className='w-full flex justify-center'>
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 mt-4 mb-8 hover:bg-blue-600'
              >
                Submit Video
              </button>
            </div>
          </form>
        )}

        {/* Render List of Existing Audio clips with Delete/Update Options */}
        {mode === 'delete_update_audios' && (
          <div className='mt-4 w-full max-w-3xl'>
            <h2 className='text-3xl font-bold mb-4 text-white'>Existing Audio Clips:</h2>
            <ul className='grid grid-cols-2 gap-4 mb-4'>
              {existingAudios.map((clip) => (
                <li key={clip.id}>
                  <div className='bg-zinc-800 p-4 rounded-md'>
                    <p>URL: {clip.url}</p>
                    <p>Title: {clip.title}</p>
                    <p>Author(s): {clip.author}</p>
                    <p>Creation Date: {clip.creationDate}</p>
                    <p>Description: {clip.description}</p>
                    <div className='mt-2'>
                      <label className='block text-white text-lg mb-2'>New URL:</label>
                      <input
                        type='text'
                        value={clip.url}
                        onChange={(e) => handleURLChange(e, clip.id)}
                        className='bg-zinc-700 text-white w-full px-4 py-2 rounded-md'
                        placeholder='Enter soundcloud url'
                      />
                    </div>
                    <div className='mt-2'>
                      <label className='block text-white text-lg mb-2'>New Title:</label>
                      <input
                        type='text'
                        value={clip.title}
                        onChange={(e) => handleAudioTitleChange(e, clip.id)}
                        className='bg-zinc-700 text-white w-full px-4 py-2 rounded-md'
                        placeholder='Enter new title'
                      />
                    </div>
                    <div className='mt-2'>
                      <label className='block text-white text-lg mb-2'>New Author(s):</label>
                      <input
                        type='text'
                        value={clip.author}
                        onChange={(e) => handleAudioAuthorChange(e, clip.id)}
                        className='bg-zinc-700 text-white w-full px-4 py-2 rounded-md'
                        placeholder='Enter author(s)'
                      />
                    </div>
                    <div className='mt-2'>
                      <label className='block text-white text-lg mb-2'>New Creation Date:</label>
                      <input
                        type='text'
                        value={clip.creationDate}
                        onChange={(e) => handleAudioDateChange(e, clip.id)}
                        className='bg-zinc-700 text-white w-full px-4 py-2 rounded-md'
                        placeholder='Enter new audio clip creation date'
                      />
                    </div>
                    <div className='mt-2'>
                      <label className='block text-white text-lg mb-2'>New Description:</label>
                      <textarea
                        value={clip.description}
                        onChange={(e) => handleAudioDescriptionChange(e, clip.id)}
                        className='bg-zinc-700 text-white w-full px-4 py-2 rounded-md'
                        placeholder='Enter new description'
                        rows={2}
                      />
                    </div>
                    <div className='grid grid-cols-4'>
                      <button
                        onClick={() => handleAudioUpdate(clip.id)}
                        className='bg-blue-500 text-white px-2 py-1 mt-2 hover:bg-blue-600'
                      >
                        Update
                      </button>

                      <div className='col-span-2'></div>

                      <button
                        onClick={() => handleAudioDelete(clip.id)}
                        className='bg-red-500 text-white px-2 py-1 mt-2 hover:bg-red-600'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
