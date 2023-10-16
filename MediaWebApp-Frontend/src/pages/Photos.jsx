import { useState, useEffect, useCallback } from "react";
import Photo from "../components/Photo";
import Brandon from "../images/Brandon.jpg";
import Jessica from "../images/Jessica.jpg";
import PassionFruit from "../images/PassionFlower.jpg";
import Zinnia from "../images/Zinnia.jpg";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const Photos = ({ selectedPhotoIndex, setSelectedPhotoIndex }) => {
  const [photosDetails, setPhotosDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const samplePhotos = [
      {
        id: 1,
        author: "Damian Goodridge",
        title: "Brandon Ortega",
        descr:
          "Brandon Ortega, a media communication alumni at SUNY Old Westbury, continues to excel in visual storytelling. In a compelling photo, he skillfully wields the XA 30 camera to collect captivating B-roll footage.",
        imageUrl: Brandon,
      },
      {
        id: 2,
        author: "Damian Goodridge",
        title: "Jessica L. Janssen",
        descr:
          "Jessica L. Janssen, a media communication senior at SUNY Old Westbury, is a dedicated video producer for MIC (Media Innovation Center). In a captivating photo, she braves strong winds while gripping her camera. Her unwavering commitment to capturing perfect shots, even in challenging conditions, mirrors her determination in bringing stories to life. Jessica's passion for videography shines brightly despite the wind's challenges, making her an invaluable asset to MIC and an inspiration to her peers.",
        imageUrl: Jessica,
      },
      {
        id: 3,
        author: "Damian Goodridge",
        title: "Passion Flower",
        descr:
          "The passion flower plant, with its intricate and exotic blooms, has become a cherished part of the Goodridge family's garden for generations. Its vibrant colors and unique, intricate design have captured their hearts, symbolizing unity and creativity within the family. Its presence reminds them of the importance of nurturing both nature and family bonds, making it a beloved and cherished flower in their home.",
        imageUrl: PassionFruit,
      },
      {
        id: 4,
        author: "Damian Goodridge",
        title: "Zinnia",
        descr:
          "In this striking photo, a vibrant zinnia bursts with a kaleidoscope of colors. Each petal is a testament to nature's artistry, blending shades that range from fiery reds to cool purples and sunny yellows. The zinnia's intricate patterns and brilliant hues are a testament to the beauty found in the natural world, capturing the essence of life's colorful tapestry in a single frame.",
        imageUrl: Zinnia,
      },
    ];
    setPhotosDetails(samplePhotos);
    //TODO: use db to store images for dynamic data
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
      <>
        <div
          onClick={() => {
            setSelectedPhotoIndex(null);
          }}
          className="h-screen bg-zinc-900 p-4 relative text-white"
        >
          <img
            src={selectedPhoto.imageUrl}
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
                  Description: {selectedPhoto.descr}
                </p>
              </div>
            </div>
          )}
        </div>
      </>
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
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          {filteredPhotos.map((photo, index) => (
            <Photo
              key={photo.id}
              setSelectedPhotoIndex={setSelectedPhotoIndex}
              index={index}
              url={photo.imageUrl}
              title={photo.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Photos;
