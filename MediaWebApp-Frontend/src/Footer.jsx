import React from 'react';
import { FaHeart, FaSoundcloud } from "react-icons/fa";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
export const Footer = () => {
  return (
    <div className='w-auto h-max text-white text-sm bg-zinc-800 grid grid-cols-2 sm:grid-cols-3 py-1'>
        <div className='h-full flex items-center justify-evenly text-zinc-100'>
            <a href="https://www.youtube.com/channel/UCs1PNpqKxQKGbWZpGZbeJGQ" className='w-max h-max' target="_blank" rel="noopener noreferrer">
                <AiOutlineYoutube size={35} className='hover:rotate-3'/>
            </a>
            <a href="https://www.instagram.com/whatsgoodie_21/" className='w-max h-max' target="_blank" rel="noopener noreferrer">
                <AiOutlineInstagram size={35} className='hover:rotate-3'/>
            </a>
            <a href="https://soundcloud.com/goodie-201453211" className='w-max h-max' target="_blank" rel="noopener noreferrer">
                <FaSoundcloud size={35} className='hover:rotate-3'/>
            </a>
        </div>
        <div className='hidden sm:inline'></div>
        <div className='h-full flex justify-center items-center'>
            Made with <FaHeart className='text-red-500 hover:scale-110 mx-2'/> by 
            <a href="https://www.linkedin.com/in/hunter-lauder/" className='ml-1' target="_blank" rel="noopener noreferrer">Hunter Lauder</a>
        </div>
    </div>
  )
}
