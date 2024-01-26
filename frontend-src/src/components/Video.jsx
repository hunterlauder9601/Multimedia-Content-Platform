export const Video = ({
  handleClick,
  youtubeID,
  length,
  descr,
  author,
  title,
}) => {
  const thumbnail = `https://i.ytimg.com/vi/${youtubeID}/maxresdefault.jpg`;
  return (
    <div
      onClick={() => handleClick(youtubeID)}
      className="bg-gray-800 hover:scale-110 duration-200 ease-in shadow-xl group cursor-pointer rounded-md"
    >
      <div
        className="overflow-auto bg-scroll bg-contain bg-center bg-no-repeat w-full aspect-video
        scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-zinc-800 rounded-md"
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        <div
          className="w-full min-h-full max-h-max group-hover:backdrop-blur-sm group-hover:backdrop-brightness-50
            duration-300 ease-in flex flex-col justify-center"
        >
          <div
            className="mx-2 opacity-0 group-hover:opacity-100 duration-300 ease-in
                  text-white"
          >
            <p className="text-2xl font-bold">{title}</p>
            <p className="text-md">
              Author(s): {author}
              <br />
              Length: {length}
              <br />
              Description: {descr}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
