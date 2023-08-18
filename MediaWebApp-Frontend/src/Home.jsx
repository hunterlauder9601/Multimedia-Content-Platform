import React from 'react'
import { RxChevronRight, RxDoubleArrowRight } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { NavBar } from './NavBar';

export const Home = () => {
  return (
    <div className='relative w-auto h-max text-white bg-zinc-900'>
        <div className="h-[calc(50vh+65px)] w-full bg-[url('../public/assets/damian.jpg')] bg-fixed bg-cover bg-top flex flex-col justify-center">
            <NavBar/>
            <div className='h-[50vh] flex justify-center items-end'>
                <p className='text-6xl font-bold my-[2vh] backdrop-brightness-75 backdrop-blur-md px-6 py-2'>Hi, I'm  <span className=' text-red-600'>Damian</span>.</p>
            </div>
        </div>
        <div className='w-full h-max flex flex-col items-center py-[5vh] px-4'>
            <p className='max-w-6xl text-4xl tracking-wide font-bold'> "<span className='underline decoration-yellow-500'>Everybody</span> has a <span className='underline decoration-blue-500'>story,</span> and it should be <span className='underline decoration-green-500'>told.</span>" - Damian Goodridge</p>
            <p className='max-w-6xl text-2xl pt-[2vh]'>Damian Goodridge is a reporter and multimedia producer. He is the on-camera host of OWTV's Campus Talk, a SUNY Old Westbury Media Innovation Center production, where he interviews students on various topics. Goodridge is also a regular co-host on the podcast DWIW (Do What I Want) Podcast which focuses on life experiences and social issues that affect everyone. He began his media career in 2019 at the campus radio station, OWWR, producing live shows and promos. His radio show "Whats Goodie" was nominated for two Media Award Celebration Awards, Best Show and Best Promo, in 2021.</p>
        </div>
        <div className='h-[20vh] w-full bg-[url("../public/assets/camera.jpg")] bg-fixed bg-[center_top_33vh] bg-cover flex items-center justify-center gap-6'>
                <Link to='/video'> 
                    <button className='border-2 border-zinc-200 bg-zinc-800 text-md font-bold hover:bg-red-500 hover:border-red-500 hover:text-zinc-800
                        duration-200 px-3 py-2 flex items-center group'>Videos
                        <RxChevronRight size='20' className='ml-2 group-hover:hidden'/>
                        <RxDoubleArrowRight size='20' className='ml-2 hidden group-hover:inline duration-200'/>
                    </button>
                </Link>
                <Link to='/radio'>
                    <button className='border-2 border-zinc-200 bg-zinc-800 text-md font-bold hover:bg-red-500 hover:border-red-500 hover:text-zinc-800
                        duration-200 px-3 py-2 flex items-center group'>Radio Clips
                        <RxChevronRight size='20' className='ml-2 group-hover:hidden'/>
                        <RxDoubleArrowRight size='20' className='ml-2 hidden group-hover:inline duration-200'/>
                    </button>
                </Link>
                <Link to='/contact'>
                    <button className='border-2 border-zinc-200 bg-zinc-800 text-md font-bold hover:bg-red-500 hover:border-red-500 hover:text-zinc-800
                        duration-200 px-3 py-2 flex items-center group'>Contact Me
                        <RxChevronRight size='20' className='ml-2 group-hover:hidden'/>
                        <RxDoubleArrowRight size='20' className='ml-2 hidden group-hover:inline duration-200'/>
                    </button>
                </Link>
            </div>
    </div>
  )
}
