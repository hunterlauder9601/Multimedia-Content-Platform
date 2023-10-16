import { UseProgressiveImage } from "../util/UseProgressiveImage";
import placeholderDamian from "../images/placeholderDamian.jpg";
import placeholderCamera from "../images/placeholderCamera.jpg";
import camera from "../images/camera-min.jpg";
import damian from "../images/damian-min.jpg";
import { RxChevronRight, RxDoubleArrowRight } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function Home() {
  const damianLoaded = UseProgressiveImage(damian);
  const cameraLoaded = UseProgressiveImage(camera);

  return (
    <div className="relative w-auto h-fit text-white bg-zinc-900">
      <div className="w-full h-[calc(50vh+65px)] flex items-center justify-center text-white relative">
        <div
          className={`h-full w-full absolute bg-cover bg-top ${
            !damianLoaded && "blur-sm"
          }`}
          style={{
            backgroundImage: `url(${damianLoaded || placeholderDamian})`,
          }}
        ></div>
        <div className="h-[50vh] flex justify-center items-end relative">
          <p className="text-6xl font-bold my-[2vh] backdrop-brightness-75 backdrop-blur-md px-6 py-2">
            Hi, I'm <span className=" text-red-600">Damian</span>.
          </p>
        </div>
      </div>

      <div className="w-full h-max flex flex-col items-center py-[5vh] px-4">
        <p className="max-w-6xl text-4xl tracking-wide font-bold">
          {" "}
          "<span className="underline decoration-yellow-500">
            Everybody
          </span>{" "}
          has a <span className="underline decoration-blue-500">story,</span>{" "}
          and it should be{" "}
          <span className="underline decoration-green-500">told.</span>" -
          Damian Goodridge
        </p>
        <p className="max-w-6xl text-2xl pt-[2vh]">
          Damian Goodridge is a reporter and multimedia producer. He is the
          on-camera host of OWTV's Campus Talk, a SUNY Old Westbury Media
          Innovation Center production, where he interviews students on various
          topics. Goodridge is also a regular co-host on the podcast DWIW (Do
          What I Want) Podcast which focuses on life experiences and social
          issues that affect everyone. He began his media career in 2019 at the
          campus radio station, OWWR, producing live shows and promos. His radio
          show "Whats Goodie" was nominated for two Media Award Celebration
          Awards, Best Show and Best Promo, in 2021.
        </p>
      </div>

      <div className="w-full h-[20vh] flex items-center justify-center gap-6 text-white relative">
        <div
          className={`absolute h-full w-full bg-fixed bg-[center_top_33vh] bg-cover ${
            !cameraLoaded && "blur-sm"
          }`}
          style={{
            backgroundImage: `url(${cameraLoaded || placeholderCamera})`,
          }}
        />
        <Link to="/video" className="relative">
          <button
            className="border-2 border-zinc-200 bg-zinc-800 text-md font-bold hover:bg-red-500 hover:border-red-500 hover:text-zinc-800
                        duration-200 px-3 py-2 flex items-center group"
          >
            Videos
            <RxChevronRight size="20" className="ml-2 group-hover:hidden" />
            <RxDoubleArrowRight
              size="20"
              className="ml-2 hidden group-hover:inline duration-200"
            />
          </button>
        </Link>
        <Link to="/radio" className="relative">
          <button
            className="border-2 border-zinc-200 bg-zinc-800 text-md font-bold hover:bg-red-500 hover:border-red-500 hover:text-zinc-800
                        duration-200 px-3 py-2 flex items-center group"
          >
            Radio Clips
            <RxChevronRight size="20" className="ml-2 group-hover:hidden" />
            <RxDoubleArrowRight
              size="20"
              className="ml-2 hidden group-hover:inline duration-200"
            />
          </button>
        </Link>
        <Link to="/contact" className="relative">
          <button
            className="border-2 border-zinc-200 bg-zinc-800 text-md font-bold hover:bg-red-500 hover:border-red-500 hover:text-zinc-800
                        duration-200 px-3 py-2 flex items-center group"
          >
            Contact Me
            <RxChevronRight size="20" className="ml-2 group-hover:hidden" />
            <RxDoubleArrowRight
              size="20"
              className="ml-2 hidden group-hover:inline duration-200"
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
