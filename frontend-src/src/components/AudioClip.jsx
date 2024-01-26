import { useState } from "react";
import { RxChevronUp, RxDoubleArrowUp } from "react-icons/rx";

export const AudioClip = ({ url, title, author, creationDate, descr }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div
      className={
        expand
          ? "h-max my-4 bg-zinc-800 border-x-[1px] border-red-700 shadow-lg flex flex-col justify-center"
          : " h-16 my-4 bg-zinc-800 overflow-hidden cursor-pointer border-x-[1px] border-red-700 shadow-lg flex flex-col justify-center"
      }
      onClick={expand ? () => null : () => setExpand(true)}
    >
      <p
        className={
          expand ? "text-2xl font-bold mt-4 px-4" : "text-2xl font-bold px-4"
        }
      >
        {title}
      </p>
      <iframe
        title={`SoundCloud Embed - ${title}-${url}`}
        className={expand ? "py-4 px-4" : "h-0"}
        width="100%"
        height="200"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${url}&color=B91C1C&show_teaser=false&show_comments=false&show_playcount=false&show_artwork=false&visual=true&show_user=false&auto_play=false`}
      ></iframe>
      <p className={expand ? "mb-2 px-4 text-md" : "hidden"}>
        Author(s): {author}
        <br />
        Creation Date: {creationDate}
        <br />
        Description: {descr}
      </p>
      <div
        className={expand ? "my-2 flex justify-center items-center" : "hidden"}
      >
        <div className="group cursor-pointer" onClick={() => setExpand(false)}>
          <RxChevronUp size={30} className="group-hover:hidden" />
          <RxDoubleArrowUp size={30} className="hidden group-hover:inline" />
        </div>
      </div>
    </div>
  );
};
