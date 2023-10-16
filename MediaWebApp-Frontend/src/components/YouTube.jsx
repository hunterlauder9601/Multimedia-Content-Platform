export const YouTube = ({ videoId }) => (
  <div className="relative rounded-md overflow-hidden shadow-md w-full h-full">
    <iframe
      key={videoId}
      className="absolute aspect-video w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);
