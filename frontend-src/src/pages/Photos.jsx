import { useState, useEffect, useCallback } from "react";
import Photo from "../components/Photo";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import webServices from "../util/webServices";
import Loading from "../components/Loading";

const Photos = ({ selectedPhotoIndex, setSelectedPhotoIndex }) => {
  const [photosDetails, setPhotosDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const response = await webServices.getPhotos();
        setPhotosDetails(response.data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchPhotos();
  }, []);

  const filteredPhotos = photosDetails.filter((photo) =>
    photo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToNextPhoto = useCallback(() => {
    if (
      selectedPhotoIndex !== null &&
      selectedPhotoIndex < filteredPhotos.length - 1
    ) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  }, [selectedPhotoIndex, filteredPhotos.length, setSelectedPhotoIndex]);

  const goToPreviousPhoto = useCallback(() => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  }, [selectedPhotoIndex, setSelectedPhotoIndex]);

  const selectedPhoto =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        goToNextPhoto();
      } else if (e.key === "ArrowLeft") {
        goToPreviousPhoto();
      } else if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedPhotoIndex,
    filteredPhotos.length,
    goToNextPhoto,
    goToPreviousPhoto,
    setSelectedPhotoIndex,
  ]);

  const [showText, setShowText] = useState(false);

  const toggleShowText = () => {
    setShowText(!showText);
  };

  if (selectedPhoto) {
    return (
      <div
        onClick={() => {
          setSelectedPhotoIndex(null);
        }}
        className="h-screen bg-zinc-900 p-4 relative text-white"
      >
        <img
          src={selectedPhoto.url}
          alt={selectedPhoto.title}
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90%] max-h-[80%] object-cover cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleShowText();
          }}
        />
        <HiArrowLeft
          size={30}
          onClick={(e) => {
            e.stopPropagation();
            goToPreviousPhoto();
          }}
          className={`absolute cursor-pointer left-4 bottom-[5%] lg:top-1/2 ${
            selectedPhotoIndex === 0 && "opacity-25 cursor-not-allowed"
          }`}
        ></HiArrowLeft>
        <HiArrowRight
          size={30}
          onClick={(e) => {
            e.stopPropagation();
            goToNextPhoto();
          }}
          className={`absolute cursor-pointer right-4 bottom-[5%] lg:top-1/2 ${
            selectedPhotoIndex === filteredPhotos.length - 1 &&
            "opacity-25 cursor-not-allowed"
          }`}
        ></HiArrowRight>
        {showText && (
          <div
            className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit bg-zinc-200 shadow-lg flex flex-col items-center justify-center rounded-2xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className="absolute top-4 right-4 bg-red-500 py-1 px-4 rounded-2xl hover:bg-red-700 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                toggleShowText();
              }}
            >
              X
            </button>

            <div className="flex flex-col items-center justify-center text-black text-xl py-8 px-4 min-w-[80vw] md:min-w-[30rem]">
              <p className="text-2xl font-bold mb-2">{selectedPhoto.title}</p>
              <p className="text-md">
                Author(s): {selectedPhoto.author}
                <br />
                Description: {selectedPhoto.description}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-auto min-h-[calc(100vh-43px)] max-h-fit bg-zinc-900 text-white flex items-center">
      <div className="w-full max-w-6xl px-6 mx-auto flex flex-col pb-8 pt-[97px]">
        <div className="mb-8">
          <h1 className="text-4xl font-bold border-b-4 border-red-500 tracking-wider inline">
            Photography
          </h1>
        </div>
        <input
          type="text"
          placeholder="Search photos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-zinc-800 shadow-sm w-full px-4 py-2 rounded-md mb-6"
        />
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Loading />
          </div>
        ) : error ? (
          <div className="w-full flex justify-center text-lg">{error}</div>
        ) : (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
            {filteredPhotos.map((photo, index) => (
              <Photo
                key={photo.id}
                setSelectedPhotoIndex={setSelectedPhotoIndex}
                index={index}
                url={photo.url}
                title={photo.title}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Photos;
