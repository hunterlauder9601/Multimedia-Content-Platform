import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import webServices from "../util/webServices";
import { useNavigate } from "react-router-dom";
import { auth } from "../util/firebase";
import { signOut } from "firebase/auth";
import { VideoForm } from "../components/admin/VideoForm";
import { AudioForm } from "../components/admin/AudioForm";
import { SortableList } from "../components/admin/SortableList";
import PhotoForm from "../components/admin/PhotoForm";
import axios from "axios";

export default function Admin() {
  const [ytID, setytID] = useState("");
  const [videoAuthor, setVideoAuthor] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [existingVideos, setExistingVideos] = useState([]);
  const [videoCategory, setVideoCategory] = useState("");

  const [audioAuthor, setAudioAuthor] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [audioTitle, setAudioTitle] = useState("");
  const [audioDate, setAudioDate] = useState("");
  const [audioDescription, setAudioDescription] = useState("");
  const [existingAudios, setExistingAudios] = useState([]);

  const [existingPhotos, setExistingPhotos] = useState([]);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [photoAuthors, setPhotoAuthors] = useState("");
  const [photo, setPhoto] = useState(null);

  const [mode, setMode] = useState("add_videos");
  const [idToken, setIdToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribeAuth;
    const fetchData = async () => {
      try {
        const [videosResponse, audiosResponse, photosResponse] =
          await Promise.all([
            webServices.getVideos(),
            webServices.getAudios(),
            webServices.getPhotos(),
          ]);
        setExistingVideos(videosResponse.data);
        setExistingAudios(audiosResponse.data);
        setExistingPhotos(photosResponse.data);
        console.log("Videos:", videosResponse.data);
        console.log("Audios:", audiosResponse.data);
        console.log("Photos:", photosResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const checkUserAndFetchData = async (user) => {
      if (user) {
        const idTokenResult = await user.getIdToken(true);
        setIdToken(idTokenResult);
        fetchData();
      } else {
        navigate("/login");
      }
    };

    unsubscribeAuth = auth.onAuthStateChanged(checkUserAndFetchData);

    // Clean up the observers when the component unmounts
    return () => {
      unsubscribeAuth();
    };
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("logout error occured");
      });
  };

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
      category: videoCategory,
    };

    // Call the postVideo method to add the video
    webServices
      .postVideo(idToken, ytID, newVideoData)
      .then((response) => {
        // console.log("New video added:", response);

        // Clear the input fields after submission
        setytID("");
        setVideoAuthor("");
        setVideoDescription("");
        setVideoCategory("");

        axios
          .get(response.headers.location)
          .then((resp) => {
            setExistingVideos((prevVideos) => [...prevVideos, resp.data]);
            alert("Video posted successfully!");
          })
          .catch((error) => {
            alert("Error getting added video");
            console.log(error)
          });
      })
      .catch((error) => {
        alert("Error adding video");
        console.log(error)
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
      creationDate: audioDate,
    };

    // Call the postVideo method to add the video
    webServices
      .postAudio(idToken, newAudioData)
      .then((response) => {
        // console.log("New audio clip added:", response);

        // Clear the input fields after submission
        setAudioURL("");
        setAudioDescription("");
        setAudioTitle("");
        setAudioAuthor("");
        setAudioDate("");

        axios
          .get(response.headers.location)
          .then((resp) => {
            setExistingAudios((prev) => [...prev, resp.data]);
            alert("Audio posted successfully!");
          })
          .catch((error) => {
            alert("Error getting added audio clip");
            console.log(error)
          });
      })
      .catch((error) => {
        alert("Error adding audio clip");
        console.log(error)
      });
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleVideoDelete = (idToDelete) => {
    // Call the deleteVideo method to delete the video
    webServices
      .deleteVideo(idToken, idToDelete)
      .then(() => {
        // Remove the deleted video from the list of existingVideos
        setExistingVideos((prevVideos) =>
          prevVideos.filter((video) => video.id !== idToDelete)
        );
        alert("Video deleted successfully!");
      })
      .catch((error) => {
        alert("Error deleting video");
        console.log(error)
      });
  };

  const handleAudioDelete = (idToDelete) => {
    // Call the deleteVideo method to delete the video
    webServices
      .deleteAudio(idToken, idToDelete)
      .then(() => {
        // Remove the deleted video from the list of existingVideos
        setExistingAudios((prev) =>
          prev.filter((clip) => clip.id !== idToDelete)
        );
        alert("Audio deleted successfully!");
      })
      .catch((error) => {
        alert("Error deleting audio");
        console.log(error)
      });
  };

  const handleVideoUpdate = (idToUpdate) => {
    // Find the video to update in existingVideos
    const videoToUpdate = existingVideos.find(
      (video) => video.id === idToUpdate
    );

    // Create the updated video data object
    const updatedVideoData = {
      author: videoToUpdate.author,
      description: videoToUpdate.description,
      category: videoToUpdate.category,
    };

    // Call the updateVideo method to update the video
    webServices
      .updateVideo(
        idToken,
        idToUpdate,
        updatedVideoData,
        videoToUpdate.youtubeID
      )
      .then((response) => {
        setExistingVideos((prevVideos) =>
          prevVideos.map((video) =>
            video.id === idToUpdate ? response.data : video
          )
        );
        alert("Video updated successfully!");
      })
      .catch((error) => {
        alert("Error updating video");
        console.log(error)
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

    webServices
      .updateAudio(idToken, idToUpdate, updatedClipData)
      .then((response) => {
        setExistingAudios((prev) =>
          prev.map((clip) => (clip.id === idToUpdate ? response.data : clip))
        );
        alert("Audio updated successfully!");
      })
      .catch((error) => {
        alert("Error updating audio");
        console.log(error)
      });
  };

  const handleAudioURLChange = (e, id) => {
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

  const handleVideoOrderChange = (newOrder) => {
    setExistingVideos(newOrder);
  };

  const handleAudioOrderChange = (newOrder) => {
    setExistingAudios(newOrder);
  };

  const saveVideoOrder = () => {
    const videoIds = existingVideos.map((video) => video.id);
    webServices
      .reorderVideos(idToken, videoIds)
      .then(() => {
        alert("Video order updated successfully.");
      })
      .catch((error) => {
        alert("Error updating video order");
        console.log(error)
      });
  };
  // console.log(existingVideos);

  const saveAudioOrder = () => {
    const audioIds = existingAudios.map((audio) => audio.id);
    webServices
      .reorderAudios(idToken, audioIds)
      .then(() => {
        alert("Audio order updated successfully.");
      })
      .catch((error) => {
        alert("Error updating audio order");
        console.log(error)
      });
  };
  // console.log(existingAudios);

  // Handle Photo Post
  const handlePhotoPost = async (e) => {
    e.preventDefault();

    if (!photo) {
      console.error("No photo selected");
      alert("No photo selected");
      return;
    }

    try {
      // Step 1: Get the secure URL from server
      const {
        data: { url, objectKey },
      } = await webServices.getSecureUrl(idToken);

      // Step 2: Upload the photo directly to S3
      await webServices.uploadPhotoToS3(url, photo);

      const imageUrl = url.split("?")[0];
      console.log(imageUrl);

      // Step 3: Send a POST request to server with the photo metadata and S3 URL
      const photoData = {
        title: photoTitle,
        description: photoDescription,
        author: photoAuthors,
        url: imageUrl,
        objectKey,
      };

      const {
        headers: { location },
      } = await webServices.postPhoto(idToken, photoData);

      // Reset form fields
      setPhotoTitle("");
      setPhotoDescription("");
      setPhotoAuthors("");
      setPhoto(null);

      axios
        .get(location)
        .then((resp) => {
          setExistingPhotos((prev) => [...prev, resp.data]);
          alert("Photo posted successfully!");
        })
        .catch((error) => {
          alert("Error getting added photo");
          console.log(error)
        });
    } catch (error) {
      alert("Error in photo upload process");
      console.log(error)
    }
  };

  // Handle Photo Update
  const handlePhotoUpdate = async (idToUpdate) => {
    const photoToUpdate = existingPhotos.find(
      (photo) => photo.id === idToUpdate
    );
    const updatedPhotoData = {
      title: photoToUpdate.title,
      description: photoToUpdate.description,
      author: photoToUpdate.author,
      url: photoToUpdate.url,
      objectKey: photoToUpdate.objectKey,
    };
    try {
      const response = await webServices.updatePhoto(
        idToken,
        idToUpdate,
        updatedPhotoData
      );
      setExistingPhotos((prev) =>
        prev.map((photo) => (photo.id === idToUpdate ? response.data : photo))
      );
      alert("Photo updated successfully!");
    } catch (error) {
      alert("Error updating photo");
      console.log(error)
    }
  };

  // Handle Photo Delete
  const handlePhotoDelete = async (idToDelete) => {
    try {
      // Find the photo to be deleted to get its object key
      const photoToDelete = existingPhotos.find(
        (photo) => photo.id === idToDelete
      );
      if (!photoToDelete) {
        throw new Error("Photo not found");
      }

      // Delete the photo metadata from the database
      await webServices.deletePhoto(idToken, idToDelete);

      // Delete the photo object from S3
      await webServices.deleteS3Object(idToken, photoToDelete.objectKey);

      // Update the state to remove the photo from the UI
      setExistingPhotos((prev) =>
        prev.filter((photo) => photo.id !== idToDelete)
      );
      alert("Photo deleted successfully!");
    } catch (error) {
      alert("Error deleting photo");
      console.log(error)
    }
  };

  // Handle Photo File Upload
  const handlePhotoUpload = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handlePhotoTitleChange = (e, id) => {
    setExistingPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, title: e.target.value } : photo
      )
    );
  };

  const handlePhotoDescriptionChange = (e, id) => {
    setExistingPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, description: e.target.value } : photo
      )
    );
  };

  const handlePhotoAuthorChange = (e, id) => {
    setExistingPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, author: e.target.value } : photo
      )
    );
  };

  const handlePhotoOrderChange = (newOrder) => {
    setExistingPhotos(newOrder);
  };

  const savePhotoOrder = () => {
    const photoIds = existingPhotos.map((photo) => photo.id);
    webServices
      .reorderPhotos(idToken, photoIds)
      .then(() => {
        alert("Photo order updated successfully.");
      })
      .catch((error) => {
        alert("Error updating photo order");
        console.log(error)
      });
  };

  const videoHandlers = {
    handleYTIDChange,
    handleVideoAuthorChange,
    handleVideoCategoryChange,
    handleVideoDescriptionChange,
    handleVideoUpdate,
    handleVideoDelete,
    handleOrderChange: handleVideoOrderChange,
    saveOrder: saveVideoOrder,
  };

  const audioHandlers = {
    handleAudioURLChange,
    handleAudioAuthorChange,
    handleAudioTitleChange,
    handleAudioDateChange,
    handleAudioDescriptionChange,
    handleAudioUpdate,
    handleAudioDelete,
    handleOrderChange: handleAudioOrderChange,
    saveOrder: saveAudioOrder,
  };

  const photoHandlers = {
    handlePhotoAuthorChange,
    handlePhotoTitleChange,
    handlePhotoDescriptionChange,
    handlePhotoUpdate,
    handlePhotoDelete,
    handleOrderChange: handlePhotoOrderChange,
    saveOrder: savePhotoOrder,
  };

  return (
    <div>
      <NavBar isAdminPage={true} handleLogout={handleLogout} />
      <div className="w-full min-h-[calc(100vh-43px)] max-h-fit bg-zinc-900 text-white flex flex-col items-center justify-center text-lg p-6">
        <h1 className="text-6xl font-bold text-blue-500 tracking-wider inline pt-[97px] text-center">
          Admin Portal
        </h1>

        {/* Mode Picker Buttons */}
        <div className="w-full max-w-3xl mt-6 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1">
          <button
            onClick={() => handleModeChange("add_videos")}
            className={`${
              mode === "add_videos" ? "bg-blue-500" : "bg-gray-500"
            } text-white px-4 py-2 hover:bg-blue-600`}
          >
            Add Video
          </button>
          <button
            onClick={() => handleModeChange("delete_update_videos")}
            className={`${
              mode === "delete_update_videos" ? "bg-blue-500" : "bg-gray-500"
            } text-white px-4 py-2 hover:bg-blue-600`}
          >
            Delete/Update Videos
          </button>
          <button
            onClick={() => handleModeChange("add_audios")}
            className={`${
              mode === "add_audios" ? "bg-blue-500" : "bg-gray-500"
            } text-white px-4 py-2 hover:bg-blue-600`}
          >
            Add Audio Clips
          </button>
          <button
            onClick={() => handleModeChange("delete_update_audios")}
            className={`${
              mode === "delete_update_audios" ? "bg-blue-500" : "bg-gray-500"
            } text-white px-4 py-2 hover:bg-blue-600`}
          >
            Delete/Update Audio Clips
          </button>
          <button
            onClick={() => handleModeChange("add_photos")}
            className={`${
              mode === "add_photos" ? "bg-blue-500" : "bg-gray-500"
            } text-white px-4 py-2 hover:bg-blue-600`}
          >
            Add Photos
          </button>
          <button
            onClick={() => handleModeChange("delete_update_photos")}
            className={`${
              mode === "delete_update_photos" ? "bg-blue-500" : "bg-gray-500"
            } text-white px-4 py-2 hover:bg-blue-600`}
          >
            Delete/Update Photos
          </button>
        </div>

        {/* Render Form for Adding Videos */}
        {mode === "add_videos" && (
          <VideoForm
            ytID={ytID}
            setytID={setytID}
            videoAuthor={videoAuthor}
            setVideoAuthor={setVideoAuthor}
            videoDescription={videoDescription}
            setVideoDescription={setVideoDescription}
            videoCategory={videoCategory}
            setVideoCategory={setVideoCategory}
            handleVideoPost={handleVideoPost}
          />
        )}

        {/* Render List of Existing Videos with Delete/Update Options */}
        {mode === "delete_update_videos" && (
          <SortableList
            items={existingVideos}
            itemType="videos"
            handlers={videoHandlers}
          />
        )}

        {/* Render Form for Adding Audio Clips */}
        {mode === "add_audios" && (
          <AudioForm
            audioURL={audioURL}
            setAudioURL={setAudioURL}
            audioAuthor={audioAuthor}
            setAudioAuthor={setAudioAuthor}
            audioTitle={audioTitle}
            setAudioTitle={setAudioTitle}
            audioDate={audioDate}
            setAudioDate={setAudioDate}
            audioDescription={audioDescription}
            setAudioDescription={setAudioDescription}
            handleAudioPost={handleAudioPost}
          />
        )}

        {/* Render List of Existing Audio clips with Delete/Update Options */}
        {mode === "delete_update_audios" && (
          <SortableList
            items={existingAudios}
            itemType="audios"
            handlers={audioHandlers}
          />
        )}

        {mode === "add_photos" && (
          <PhotoForm
            handlePhotoPost={handlePhotoPost}
            handlePhotoUpload={handlePhotoUpload}
            photoTitle={photoTitle}
            setPhotoTitle={setPhotoTitle}
            photoDescription={photoDescription}
            setPhotoDescription={setPhotoDescription}
            photoAuthors={photoAuthors}
            setPhotoAuthors={setPhotoAuthors}
          />
        )}

        {mode === "delete_update_photos" && (
          <SortableList
            items={existingPhotos}
            itemType="photos"
            handlers={photoHandlers}
          />
        )}
      </div>
    </div>
  );
}
