import { useState, useEffect } from "react";
import { AudioClip } from "../components/AudioClip";
import webServices from "../util/webServices";

export default function Radio() {
  const [audiosDetails, setAudiosDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    webServices.getAudios().then((response) => {
      setAudiosDetails(response.data);
    });
  }, []);

  const filteredClips = audiosDetails.filter((clip) =>
    clip.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const audioArray = filteredClips.map((audio) => (
    <AudioClip
      key={audio.id}
      url={audio.url}
      title={audio.title}
      author={audio.author}
      creationDate={audio.creationDate}
      descr={audio.description}
    />
  ));

  return (
    <div className="w-full min-h-[calc(100vh-43px)] max-h-fit bg-zinc-900 text-white flex items-center">
      <div className="w-full max-w-6xl px-6 mx-auto flex flex-col pb-8 pt-[97px]">
        <div className="mb-8">
          <h1 className="text-4xl font-bold border-b-4 border-red-500 tracking-wider inline">
            Radio on Air
          </h1>
        </div>
        <input
          type="text"
          placeholder="Search audio clips..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-zinc-800 text-white w-full px-4 py-2 rounded-md mb-2 shadow-md"
        />
        {audioArray}
      </div>
    </div>
  );
}
