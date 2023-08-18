import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import webServices from './webServices'
import { Video } from './Video'
import { YouTube } from './YouTube'
import { HiX } from 'react-icons/hi';
import { NavBar } from './NavBar'

export const Videos = ({player, setPlayer}) => {
  const [videosDetails, setVideosDetails] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setFilter] = useState('all');
  //fix go back button bug
  const location = useLocation();

  useEffect(() => {
    setPlayer(false);
  }, [location, setPlayer]);

  useEffect(() => {
      webServices.getVideos().then((response) => {
          setVideosDetails(response.data);
          // console.log(response.data);
      });
  }, []);
  
  const handleClick = (id) => {
    setPlayer(!player);
    setSelectedId(id);
  };

  const handleExit = () => setPlayer(false);

  const filteredVideos = videosDetails.filter((vid) => {
    if (selectedFilter === 'all' || (vid.category && vid.category === selectedFilter)) {
      return vid.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  const videoArray = filteredVideos.map((vid) => (
    <Video
      key={vid.id}
      handleClick={handleClick}
      youtubeID={vid.youtubeID}
      length={vid.length}
      descr={vid.description}
      author={vid.author}
      title={vid.title}
    />
  ));

  // const videoArray = videosDetails.map(vid => <Video key={vid.id} handleClick={handleClick} videoId={vid.youtubeID} length={vid.length} descr={vid.description} author={vid.author} title={vid.title}/>);
  const selectedVideo = videosDetails.find(elem => elem.youtubeID === selectedId);
  return (
    <div>
      <div className={player ? 'hidden' : 'inline'}>
        <NavBar/>
      </div>
      <div className='w-auto min-h-[calc(100vh-108px)] max-h-fit bg-zinc-900 text-white flex items-center overflow-hidden'>
        {/* Thumbnails */}
        <div className={player ? 'hidden' : 'w-full max-w-6xl px-4 py-8 mx-auto flex flex-col'}>
            <div className='mb-8'>
                <h1 className='text-4xl font-bold border-b-4 border-red-500 tracking-wider inline'>Videos</h1>
            </div>
            <div className='w-full flex flex-col items-start mb-2'>
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-800 text-white w-full px-4 py-2 rounded-md "
              />
              <div className='my-4 flex gap-6'>
                  <button
                    onClick={() => setFilter('all')}
                    className={`${
                      selectedFilter === 'all' ? 'bg-white text-black' : 'bg-zinc-700 text-white hover:bg-zinc-600'
                    } px-4 py-2 rounded-xl duration-200 ease-linear`}
                  >
                    All
                  </button>
                  
                  <button
                    onClick={() => setFilter('interviews')}
                    className={`${
                      selectedFilter === 'interviews' ? 'bg-white text-black' : 'bg-zinc-700 text-white hover:bg-zinc-600'
                    } px-4 py-2 rounded-xl duration-200 ease-linear`}
                  >
                    Interviews
                  </button>

                  <button
                    onClick={() => setFilter('shorts')}
                    className={`${
                      selectedFilter === 'shorts' ? 'bg-white text-black' : 'bg-zinc-700 text-white hover:bg-zinc-600'
                    } px-4 py-2 rounded-xl duration-200 ease-linear`}
                  >
                    Shorts
                  </button>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
              {videoArray}
            </div>
        </div>

        {/* Player Popup */}
        <div className={!player ? 'hidden' : 'relative w-full min-h-screen max-h-fit bg-zinc-900 flex flex-col justify-center items-center'}>
            <div onClick={handleExit} className='fixed top-0 right-0 mr-1 z-10 mt-1'>
              <HiX size={30} className=' rounded-2xl bg-zinc-800 text-red-600 hover:rounded-none hover:text-zinc-800 hover:bg-red-600 duration-300 ease-linear cursor-pointer'/>
            </div>
            <div className='flex-none h-9'></div>
            <div className='w-full max-w-5xl mx-auto aspect-video z-0 '>
              <YouTube videoId={selectedId}/>
            </div>
            <div className='text-lg w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <p className='text-left'>
                Author: {selectedVideo?.author}
                <br />
                Upload Date: {selectedVideo?.creationDate}
                <br />
                Description: {selectedVideo?.description}
              </p>
              <p className='text-left sm:text-right'>
                Views: {selectedVideo?.viewCount}
                <br />
                Likes: {selectedVideo?.likeCount}
                <br />
                Comments: {selectedVideo?.commentCount}
              </p>
            </div>
            <div className='flex-none h-9'></div>
        </div>
      </div>
    </div>

  )
}
