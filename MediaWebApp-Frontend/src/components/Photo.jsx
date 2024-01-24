const Photo = ({ setSelectedPhotoIndex, index, url, title }) => {
  return (
    <div
      onClick={() => setSelectedPhotoIndex(index)}
      className="bg-gray-800 hover:scale-105 duration-200 ease-in shadow-xl group cursor-pointer rounded-md"
    >
      <div
        className="overflow-auto bg-scroll bg-cover bg-center bg-no-repeat w-full aspect-video
        scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-zinc-800 rounded-md"
        style={{ backgroundImage: `url(${url})` }}
      >
        <div
          className="w-full min-h-full max-h-max group-hover:backdrop-blur-sm group-hover:backdrop-brightness-50
            duration-300 ease-in flex flex-col justify-center items-center"
        >
          <div
            className="mx-2 opacity-0 group-hover:opacity-100 duration-300 ease-in
                  text-white"
          >
            <p className="text-2xl font-bold">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photo;
